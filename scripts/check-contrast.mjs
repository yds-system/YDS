#!/usr/bin/env node
/**
 * check-contrast.mjs
 *
 * 1. 모든 컴포넌트 SCSS 파일에서 `color:` + `background-color:`가
 *    같은 규칙 블록에 함께 쓰인 조합을 자동 탐색한다.
 * 2. contrast-pairs.json 의 extra 목록(자동 탐지 불가 짝)도 추가한다.
 * 3. 각 짝을 2개 모드(light/dark)에서 WCAG 2.1 대비 계산 후 미달만 출력한다.
 *
 * 임계값: type="text" → 4.5:1 / type="ui" → 3:1
 * 실행: npm run check:contrast
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve as pathResolve, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = pathResolve(__dirname, '..');

function readText(rel) { return readFileSync(pathResolve(root, rel), 'utf-8'); }
function readJson(rel) { return JSON.parse(readFileSync(pathResolve(root, rel), 'utf-8')); }

// ── CSS/SCSS 파싱 ────────────────────────────────────────────────────────────────

function extractBlock(css, selector) {
  const idx = css.indexOf(selector);
  if (idx === -1) return '';
  const start = css.indexOf('{', idx) + 1;
  let depth = 1, i = start;
  while (i < css.length && depth > 0) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    i++;
  }
  return css.slice(start, i - 1);
}

function parseProps(block) {
  const map = new Map();
  const re = /--([^\s:]+)\s*:\s*([^;]+?)\s*;/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    map.set(m[1], m[2].replace(/\s+/g, ' ').trim());
  }
  return map;
}

function mergeMap(...maps) {
  const result = new Map();
  for (const map of maps) for (const [k, v] of map) result.set(k, v);
  return result;
}

/** var(--name) 체인을 재귀적으로 풀어 실제 hex 값 반환 */
function resolveVar(value, map, depth = 0) {
  if (depth > 15 || !value) return value;
  const m = value.match(/^var\(--([^,)]+)(?:\s*,\s*(.+))?\)$/);
  if (!m) return value;
  const [, name, fallback] = m;
  const resolved = map.get(name);
  if (resolved !== undefined) return resolveVar(resolved, map, depth + 1);
  if (fallback) return resolveVar(fallback.trim(), map, depth + 1);
  return value;
}

/** var() 체인에서 처음 나오는 color-* 시멘틱 토큰 이름 반환 */
function resolveToTokenName(value, map, depth = 0) {
  if (depth > 15 || !value) return null;
  const m = value.match(/^var\(--([^,)]+)/);
  if (!m) return null;
  const name = m[1];
  if (name.startsWith('color-')) return name;
  const next = map.get(name);
  if (!next) return null;
  return resolveToTokenName(next, map, depth + 1);
}

// ── 블록 스캔 ───────────────────────────────────────────────────────────────────

/** 중첩 블록을 제거하고 직접 속성 텍스트만 반환 */
function directProps(content) {
  let result = '';
  let depth = 0;
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') depth--;
    else if (depth === 0) result += content[i];
  }
  return result;
}

// (?:^|;)\s*color\s*: → `color:` 단독 (border-color: 등 제외)
const COLOR_RE    = /(?:^|;)\s*color\s*:\s*(var\(--[^)]+\))/gm;
const BG_COLOR_RE = /(?:^|;)\s*background-color\s*:\s*(var\(--[^)]+\))/gm;

/**
 * SCSS 전체를 스캔해 color: + background-color: 쌍이 같은 블록에 있는 경우를 모두 반환.
 * 중첩 블록을 재귀적으로 순회하므로 & 중첩 SCSS도 올바르게 처리된다.
 */
function findPairsInScss(scss) {
  const pairs = [];
  let i = 0;
  while (i < scss.length) {
    const openIdx = scss.indexOf('{', i);
    if (openIdx === -1) break;

    // 짝 중괄호 찾기
    let depth = 1, j = openIdx + 1;
    while (j < scss.length && depth > 0) {
      if (scss[j] === '{') depth++;
      else if (scss[j] === '}') depth--;
      j++;
    }

    const content = scss.slice(openIdx + 1, j - 1);
    const direct  = directProps(content); // 중첩 블록 제거 후 직접 속성만

    COLOR_RE.lastIndex    = 0;
    BG_COLOR_RE.lastIndex = 0;
    const cm = COLOR_RE.exec(direct);
    const bm = BG_COLOR_RE.exec(direct);

    if (cm && bm) {
      pairs.push({ fgVar: cm[1], bgVar: bm[1] });
    }

    i = openIdx + 1; // 중첩 내부도 순회
  }
  return pairs;
}

// ── 파일 수집 ────────────────────────────────────────────────────────────────────

function walkScss(dir) {
  const results = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) results.push(...walkScss(full));
    else if (name.endsWith('.scss')) results.push(full);
  }
  return results;
}

// ── WCAG 계산 ───────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  if (h.length === 3)
    return [parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16)];
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

function linearize(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(hex1, hex2) {
  const l1 = luminance(hex1), l2 = luminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// ── 토큰 맵 구성 ────────────────────────────────────────────────────────────────

const primCss = readText('src/tokens/primitive.scss');
const modeCss = readText('src/tokens/mode.scss');
const semCss  = readText('src/tokens/semantic.scss');

const primRoot  = parseProps(extractBlock(primCss, ':root'));
const modeLight = parseProps(extractBlock(modeCss, ':root'));
const modeDark  = parseProps(extractBlock(modeCss, '[data-mode="dark"]'));
const semRoot   = parseProps(extractBlock(semCss,  ':root'));

const lightBase = mergeMap(primRoot, modeLight, semRoot);
const darkBase  = mergeMap(primRoot, modeLight, semRoot, modeDark);

// 컴포넌트 CSS 변수(--yds-*) 수집 → var() 체인 해소에 필요
const compDir   = pathResolve(root, 'src/components');
const scssFiles = walkScss(compDir);
const scssContents = scssFiles.map(f => readFileSync(f, 'utf-8'));

const compVarMap = new Map();
for (const content of scssContents) {
  const re = /--([^\s:]+)\s*:\s*([^;]+?)\s*;/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    if (m[1].startsWith('yds-')) {
      compVarMap.set(m[1], m[2].replace(/\s+/g, ' ').trim());
    }
  }
}

// 풀 맵: 토큰 + 컴포넌트 변수 (컴포넌트 변수는 모드 무관 — 시멘틱 참조로 모드 반영됨)
const lightMap = mergeMap(lightBase, compVarMap);
const darkMap  = mergeMap(darkBase,  compVarMap);

// ── 짝 자동 탐색 ────────────────────────────────────────────────────────────────

const rawPairs = [];
for (const content of scssContents) {
  rawPairs.push(...findPairsInScss(content));
}

// 시멘틱 토큰 이름으로 풀어 중복 제거
// - disabled 포함 토큰은 대비 면제 → 제외
// - bg가 color-* 토큰으로 해소되지 않는 경우(transparent 등) → 제외
const pairSet = new Map(); // key: "fg::bg"
for (const { fgVar, bgVar } of rawPairs) {
  const fg = resolveToTokenName(fgVar, lightMap);
  const bg = resolveToTokenName(bgVar, lightMap);
  if (!fg || !bg) continue;
  if (fg.includes('disabled') || bg.includes('disabled')) continue;
  const key = `${fg}::${bg}`;
  if (!pairSet.has(key)) {
    pairSet.set(key, { name: `${fg} / ${bg}`, fg, bg, type: 'text' });
  }
}

const autoPairs = [...pairSet.values()];

// ── extra 짝 + 예외 로드 ────────────────────────────────────────────────────────

const { extra = [], exceptions = [] } = readJson('scripts/contrast-pairs.json');

// 예외 맵: "fg::bg::mode" → reason
const excMap = new Map();
for (const e of exceptions) {
  excMap.set(`${e.fg}::${e.bg}::${e.mode}`, e.reason);
}

const allPairs = [...autoPairs, ...extra];

// ── 대비 검사 ───────────────────────────────────────────────────────────────────

const MODES = [
  { key: 'light', map: lightMap },
  { key: 'dark',  map: darkMap  },
];
const THRESHOLD = { text: 4.5, ui: 3.0 };

const errors  = [];
const excepts = [];

for (const pair of allPairs) {
  const threshold = THRESHOLD[pair.type ?? 'text'];
  for (const { key, map } of MODES) {
    if (pair.modes && !pair.modes.includes(key)) continue;

    const fgRaw = map.get(pair.fg);
    const bgRaw = map.get(pair.bg);

    if (!fgRaw) { errors.push(`[${pair.name}][${key}] fg 토큰 없음: --${pair.fg}`);       continue; }
    if (!bgRaw) { errors.push(`[${pair.name}][${key}] bg 토큰 없음: --${pair.bg}`);       continue; }

    const fg = resolveVar(fgRaw, map);
    const bg = resolveVar(bgRaw, map);

    if (!fg?.startsWith('#')) { errors.push(`[${pair.name}][${key}] fg 해결 불가: --${pair.fg} → ${fg}`); continue; }
    if (!bg?.startsWith('#')) { errors.push(`[${pair.name}][${key}] bg 해결 불가: --${pair.bg} → ${bg}`); continue; }

    const ratio = contrastRatio(fg, bg);
    if (ratio < threshold) {
      const excKey = `${pair.fg}::${pair.bg}::${key}`;
      const reason = excMap.get(excKey);
      if (reason) {
        excepts.push(`[${pair.name}][${key}] ⚠ ${ratio.toFixed(2)}:1 — ${reason}`);
      } else {
        errors.push(
          `[${pair.name}][${key}] ✗ ${ratio.toFixed(2)}:1 (${threshold}:1 미달)` +
          `  fg=${fg}  bg=${bg}`
        );
      }
    }
  }
}

// ── 결과 출력 ───────────────────────────────────────────────────────────────────

if (errors.length === 0) {
  console.log(`✓ 자동 탐지 ${autoPairs.length}쌍 + extra ${extra.length}쌍 / 미달 0건 / 예외 ${excepts.length}건`);
  for (const e of excepts) console.log(' ', e);
  process.exit(0);
} else {
  console.error(`\n✗ 미달 ${errors.length}건 / 예외 ${excepts.length}건:\n`);
  for (const e of errors)  console.error(' ', e);
  if (excepts.length) {
    console.error('\n예외:');
    for (const e of excepts) console.error(' ', e);
  }
  console.error('');
  process.exit(1);
}
