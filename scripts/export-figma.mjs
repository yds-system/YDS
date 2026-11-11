#!/usr/bin/env node
/**
 * scripts/export-figma.mjs
 * YDS 토큰 → Figma Variables JSON (W3C DTCG 형식)
 *
 * 사용:  npm run export:figma
 * 출력:  figma-tokens/
 *          primitive.json
 *          responsive.pc.json
 *          responsive.mobile.json
 *          mode.light.json
 *          mode.dark.json
 *          semantic.json
 *
 * 변환 규칙
 *   rem  → px 숫자 (1rem = 10px)
 *   px   → 숫자
 *   var(--X) → {X.with.dots} 참조
 * 제외
 *   --font-letter-spacing-* (em 단위 — Figma 미지원)
 *   --transition-*          (복합 값)
 *   --shadow-*              (semantic — Figma shadow 토큰은 별도 처리)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT  = join(ROOT, 'figma-tokens');

mkdirSync(OUT, { recursive: true });

// ── 유틸리티 ─────────────────────────────────────────────────────────────────

/** --color-text-default → color.text.default */
const toDotPath = v => v.replace(/^--/, '').replace(/-/g, '.');

/** 중첩 경로에 값 설정 */
function setNested(obj, dotPath, val) {
  const keys = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = val;
}

/** 토큰 이름(-- 없음)으로 $type 추론 */
function inferType(name) {
  if (name.startsWith('color-'))       return 'color';
  if (name.startsWith('font-family-')) return 'string';
  if (name.startsWith('font-weight-')) return 'number';
  if (name.startsWith('line-height-')) return 'number';
  return 'dimension';
}

/**
 * CSS 값 → { $value, $type }
 * 변환 불가 값(em, 복합 값 등)은 null 반환 → 호출부에서 제외
 */
function convertToken(name, raw) {
  // var() 참조
  const vm = raw.match(/^var\((--.+?)\)$/);
  if (vm) return { $value: `{${toDotPath(vm[1])}}`, $type: inferType(name) };

  // hex 색상 (#rgb / #rrggbb / #rrggbbaa)
  if (/^#[0-9a-fA-F]{3,8}$/.test(raw)) return { $value: raw, $type: 'color' };

  // rem → px 숫자 (1rem = 10px)
  const rm = raw.match(/^(-?[\d.]+)rem$/);
  if (rm) {
    const px = Number((parseFloat(rm[1]) * 10).toFixed(1));
    return { $value: px, $type: 'dimension' };
  }

  // px → 숫자
  const pm = raw.match(/^(-?[\d.]+)px$/);
  if (pm) return { $value: parseFloat(pm[1]), $type: 'dimension' };

  // 순수 숫자 (font-weight, line-height 비율 등)
  if (/^-?[\d.]+$/.test(raw)) return { $value: parseFloat(raw), $type: 'number' };

  // font-family 문자열 — 첫 번째 family 이름 추출
  if (name.startsWith('font-family-')) {
    const first = raw.split(',')[0].trim().replace(/^['"]|['"]$/g, '');
    return { $value: first, $type: 'string' };
  }

  // em 단위(letter-spacing), 복합 값(transition, shadow) 등 → 제외
  return null;
}

/** CSS 텍스트에서 커스텀 프로퍼티 Map 파싱 */
function parseProps(text) {
  const map = new Map();
  const re = /^\s*(--[\w-]+)\s*:\s*(.+?)\s*;/gm;
  let m;
  while ((m = re.exec(text)) !== null) map.set(m[1], m[2].trim());
  return map;
}

/**
 * props Map → W3C DTCG 중첩 JSON 객체
 * @param {Map} props
 * @param {string[]} exclude - 접두사 목록 (--포함)
 */
function buildObj(props, exclude = []) {
  const obj = {};
  let count = 0;
  for (const [name, raw] of props) {
    if (exclude.some(p => name.startsWith(p))) continue;
    const token = convertToken(name.replace(/^--/, ''), raw);
    if (!token) continue;
    setNested(obj, toDotPath(name), token);
    count++;
  }
  return { obj, count };
}

/** JSON 파일 저장 */
function save(filename, data) {
  writeFileSync(join(OUT, filename), JSON.stringify(data, null, 2), 'utf8');
}

// ── 블록 추출 ─────────────────────────────────────────────────────────────────

/** SCSS 텍스트에서 첫 번째 :root { ... } 내용 */
function extractRoot(scss) {
  const m = scss.match(/:root\s*\{([\s\S]*?)\}/);
  return m ? m[1] : '';
}

/**
 * 특정 선택자 블록 내용 추출
 * 중첩 없는 선택자 전용 (내부에 {} 없음)
 */
function extractSelector(scss, selector) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = scss.match(new RegExp(esc + '\\s*\\{([\\s\\S]*?)\\}'));
  return m ? m[1] : '';
}

/** @include mobile { :root { ... } } 내부 :root 내용 */
function extractMobile(scss) {
  const m = scss.match(/@include\s+mobile\s*\{[\s\S]*?:root\s*\{([\s\S]*?)\}/);
  return m ? m[1] : '';
}

// ── SCSS 로드 ─────────────────────────────────────────────────────────────────

const readScss = f => readFileSync(join(ROOT, 'src/tokens', f), 'utf8');
const primScss = readScss('primitive.scss');
const respScss = readScss('responsive.scss');
const modeScss = readScss('mode.scss');
const semScss  = readScss('semantic.scss');

// ── 1. primitive.json ─────────────────────────────────────────────────────────

const primProps = parseProps(extractRoot(primScss));
const { obj: primObj, count: primCount } = buildObj(primProps, [
  '--font-letter-spacing-',  // em 단위 — Figma 미지원
  '--transition-',           // 복합 값
]);
save('primitive.json', primObj);

// ── 2. responsive.pc.json ─────────────────────────────────────────────────────

const respPcProps = parseProps(extractRoot(respScss));
const { obj: respPcObj, count: respPcCount } = buildObj(respPcProps);
save('responsive.pc.json', respPcObj);

// ── 3. responsive.mobile.json ─────────────────────────────────────────────────

const mobileProps = parseProps(extractMobile(respScss));
// PC 기본값에 mobile 덮어쓰기 적용
const respMobMap = new Map([...respPcProps, ...mobileProps]);
const { obj: respMobObj, count: respMobCount } = buildObj(respMobMap);
save('responsive.mobile.json', respMobObj);

// ── 4. mode.light.json ────────────────────────────────────────────────────────

const lightProps = parseProps(extractRoot(modeScss));
const { obj: lightObj, count: lightCount } = buildObj(lightProps);
save('mode.light.json', lightObj);

// ── 5. mode.dark.json ─────────────────────────────────────────────────────────

const darkProps = parseProps(extractSelector(modeScss, '[data-mode="dark"]'));
const { obj: darkObj, count: darkCount } = buildObj(darkProps);
save('mode.dark.json', darkObj);

// ── 6. semantic.json ──────────────────────────────────────────────────────────

const semProps = parseProps(extractRoot(semScss));
const { obj: semObj, count: semCount } = buildObj(semProps, [
  '--shadow-',  // 복합 값 — Figma shadow 토큰은 별도 처리 필요
]);
save('semantic.json', semObj);

// ── 보고 ──────────────────────────────────────────────────────────────────────

const files = [
  ['primitive.json',         primCount],
  ['responsive.pc.json',     respPcCount],
  ['responsive.mobile.json', respMobCount],
  ['mode.light.json',        lightCount],
  ['mode.dark.json',         darkCount],
  ['semantic.json',          semCount],
];

const total = files.reduce((s, [, c]) => s + c, 0);

console.log(`\nfigma-tokens/ 생성 완료\n`);
console.log('파일                       변수');
console.log('─'.repeat(36));
for (const [f, c] of files) {
  console.log(`${f.padEnd(27)} ${String(c).padStart(4)}개`);
}
console.log('─'.repeat(36));
console.log(`${'합계'.padEnd(27)} ${String(total).padStart(4)}개\n`);
