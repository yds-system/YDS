#!/usr/bin/env node
/**
 * scripts/export-figma.mjs
 * YDS 토큰 → Figma Variables JSON (Figma 직접 내보내기 형식)
 *
 * 사용:  npm run export:figma
 * 출력:  figma-tokens/
 *          primitive.json               ← 모드 이름 없음, 실제 값
 *          responsive.pc.json           ← modeName: "PC"
 *          responsive.mobile.json       ← modeName: "Mobile"
 *          mode.light.json              ← modeName: "Light"
 *          mode.dark.json               ← modeName: "Dark"
 *          semantic.json                ← modeName: "Mode 1"
 *
 * 참조 처리 (Primitive 외 파일)
 *   var(--X) → $value에 Primitive 실제 값, $extensions에 aliasData
 *   참조 대상이 Primitive에 없으면 스크립트 실패
 * 제외
 *   --font-letter-spacing-* (em 단위)
 *   --transition-*          (duration 복합 값)
 *   --shadow-*              (box-shadow 복합 값)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT  = join(ROOT, 'figma-tokens');

mkdirSync(OUT, { recursive: true });

// ── 유틸리티 ─────────────────────────────────────────────────────────────────

const toDotPath   = v => v.replace(/^--/, '').replace(/-/g, '.');
const toSlashPath = p => p.replace(/\./g, '/');

function setNested(obj, dotPath, val) {
  const keys = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = val;
}

function inferType(name) {
  if (name.startsWith('color-'))       return 'color';
  if (name.startsWith('font-family-')) return 'string';
  if (name.startsWith('font-weight-')) return 'number';
  if (name.startsWith('line-height-')) return 'number';
  return 'dimension';
}

/** hex → DTCG color object */
function hexToColor(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('') + 'ff';
  if (h.length === 6) h += 'ff';
  const r4 = n => Math.round(n * 10000) / 10000;
  return {
    colorSpace: 'srgb',
    components: [
      r4(parseInt(h.slice(0, 2), 16) / 255),
      r4(parseInt(h.slice(2, 4), 16) / 255),
      r4(parseInt(h.slice(4, 6), 16) / 255),
    ],
    alpha: r4(parseInt(h.slice(6, 8), 16) / 255),
    hex,
  };
}

/** 직접 값(hex/rem/px/number/font-family) → { $value, $type } or null */
function convertDirect(name, raw) {
  if (/^#[0-9a-fA-F]{3,8}$/.test(raw))
    return { $value: hexToColor(raw), $type: 'color' };

  const rm = raw.match(/^(-?[\d.]+)rem$/);
  if (rm) {
    const px = Number((parseFloat(rm[1]) * 10).toFixed(1));
    return { $value: { value: px, unit: 'px' }, $type: 'dimension' };
  }

  const pm = raw.match(/^(-?[\d.]+)px$/);
  if (pm)
    return { $value: { value: parseFloat(pm[1]), unit: 'px' }, $type: 'dimension' };

  if (/^-?[\d.]+$/.test(raw))
    return { $value: parseFloat(raw), $type: 'number' };

  if (name.startsWith('font-family-')) {
    const first = raw.split(',')[0].trim().replace(/^['"]|['"]$/g, '');
    return { $value: first, $type: 'string' };
  }

  return null;
}

/** CSS 텍스트 → 커스텀 프로퍼티 Map */
function parseProps(text) {
  const map = new Map();
  const re = /^\s*(--[\w-]+)\s*:\s*(.+?)\s*;/gm;
  let m;
  while ((m = re.exec(text)) !== null) map.set(m[1], m[2].trim());
  return map;
}

// ── Primitive 조회 ─────────────────────────────────────────────────────────────

let primObj = null;  // 1번 파일 완성 후 세팅

/** dot 경로로 Primitive $value 조회. 없으면 undefined. */
function resolvePrim(dotPath) {
  const keys = dotPath.split('.');
  let cur = primObj;
  for (const k of keys) {
    if (!cur || typeof cur !== 'object') return undefined;
    cur = cur[k];
  }
  return cur?.$value;
}

// ── 빌더: Primitive (직접 값만) ───────────────────────────────────────────────

const skipped = [];

function buildPrimObj(props, exclude = []) {
  const obj = {};
  let count = 0;
  for (const [name, raw] of props) {
    if (exclude.some(p => name.startsWith(p))) {
      skipped.push({ label: 'primitive', name, raw });
      continue;
    }
    const token = convertDirect(name.replace(/^--/, ''), raw);
    if (!token) { skipped.push({ label: 'primitive', name, raw }); continue; }
    setNested(obj, toDotPath(name), token);
    count++;
  }
  return { obj, count };
}

// ── 빌더: 참조 파일 (var() → Primitive 실제 값 + aliasData) ───────────────────

function buildRefObj(props, exclude = [], label = '') {
  const obj = {};
  let count = 0;
  const errors = [];

  for (const [name, raw] of props) {
    if (exclude.some(p => name.startsWith(p))) {
      skipped.push({ label, name, raw });
      continue;
    }

    const vm = raw.match(/^var\((--.+?)\)$/);
    if (vm) {
      const dotPath = toDotPath(vm[1]);
      const primVal = resolvePrim(dotPath);
      if (primVal === undefined) {
        errors.push({ label, name, ref: dotPath });
        continue;
      }
      setNested(obj, toDotPath(name), {
        $value: primVal,
        $type: inferType(name.replace(/^--/, '')),
        $extensions: {
          'com.figma.aliasData': {
            targetVariableName: toSlashPath(dotPath),
            targetVariableSetName: 'Primitive',
          },
        },
      });
      count++;
      continue;
    }

    // 직접 값 (참조 아님 — semantic의 container-max-width 등)
    const token = convertDirect(name.replace(/^--/, ''), raw);
    if (!token) { skipped.push({ label, name, raw }); continue; }
    setNested(obj, toDotPath(name), token);
    count++;
  }

  return { obj, count, errors };
}

// ── 파일 저장 ─────────────────────────────────────────────────────────────────

/**
 * @param {string}      filename
 * @param {object}      tokenObj
 * @param {string|null} modeName  null이면 $extensions 없음
 */
function save(filename, tokenObj, modeName = null) {
  let final;
  if (modeName) {
    // $extensions 를 최상단 첫 번째 키로
    final = { $extensions: { 'com.figma.modeName': modeName } };
    for (const [k, v] of Object.entries(tokenObj)) final[k] = v;
  } else {
    final = tokenObj;
  }
  writeFileSync(join(OUT, filename), JSON.stringify(final, null, 2), 'utf8');
}

// ── 블록 추출 ─────────────────────────────────────────────────────────────────

function extractRoot(scss) {
  const m = scss.match(/:root\s*\{([\s\S]*?)\}/);
  return m ? m[1] : '';
}

function extractSelector(scss, selector) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = scss.match(new RegExp(esc + '\\s*\\{([\\s\\S]*?)\\}'));
  return m ? m[1] : '';
}

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

// ── 1. primitive.json — 직접 값, 모드 이름 없음 ──────────────────────────────

const primProps = parseProps(extractRoot(primScss));
const { obj, count: primCount } = buildPrimObj(primProps, [
  '--font-letter-spacing-',
  '--transition-',
]);
primObj = obj;                     // 이후 참조 조회용
save('primitive.json', primObj);   // modeName 없음

// ── 2. responsive.pc.json ─────────────────────────────────────────────────────

const respPcProps = parseProps(extractRoot(respScss));
const { obj: respPcObj, count: respPcCount, errors: e1 } =
  buildRefObj(respPcProps, [], 'responsive.pc');
save('responsive.pc.json', respPcObj, 'PC');

// ── 3. responsive.mobile.json ─────────────────────────────────────────────────

const mobileProps  = parseProps(extractMobile(respScss));
const respMobMap   = new Map([...respPcProps, ...mobileProps]);
const { obj: respMobObj, count: respMobCount, errors: e2 } =
  buildRefObj(respMobMap, [], 'responsive.mobile');
save('responsive.mobile.json', respMobObj, 'Mobile');

// ── 4. mode.light.json ────────────────────────────────────────────────────────

const lightProps = parseProps(extractRoot(modeScss));
const { obj: lightObj, count: lightCount, errors: e3 } =
  buildRefObj(lightProps, [], 'mode.light');
save('mode.light.json', lightObj, 'Light');

// ── 5. mode.dark.json ─────────────────────────────────────────────────────────

const darkProps = parseProps(extractSelector(modeScss, '[data-mode="dark"]'));
const { obj: darkObj, count: darkCount, errors: e4 } =
  buildRefObj(darkProps, [], 'mode.dark');
save('mode.dark.json', darkObj, 'Dark');

// ── 6. semantic.json ──────────────────────────────────────────────────────────

const semProps = parseProps(extractRoot(semScss));
const { obj: semObj, count: semCount, errors: e5 } =
  buildRefObj(semProps, ['--shadow-'], 'semantic');
save('semantic.json', semObj, 'Mode 1');

// ── 참조 오류 확인 ────────────────────────────────────────────────────────────

const allErrors = [...e1, ...e2, ...e3, ...e4, ...e5];
if (allErrors.length > 0) {
  console.error('\n❌ Primitive에서 찾을 수 없는 참조:\n');
  for (const { label, name, ref } of allErrors)
    console.error(`  [${label}] ${name} → {${ref}}`);
  console.error('\n스크립트를 중단합니다. 위 토큰을 확인하세요.');
  process.exit(1);
}

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

console.log('\nfigma-tokens/ 생성 완료\n');
console.log('파일                       변수');
console.log('─'.repeat(36));
for (const [f, c] of files)
  console.log(`${f.padEnd(27)} ${String(c).padStart(4)}개`);
console.log('─'.repeat(36));
console.log(`${'합계'.padEnd(27)} ${String(total).padStart(4)}개`);

if (skipped.length > 0) {
  console.log(`\n── 제외된 토큰 (${skipped.length}개) ──`);
  for (const { label, name, raw } of skipped)
    console.log(`  [${label}] ${name}: ${raw}`);
}
