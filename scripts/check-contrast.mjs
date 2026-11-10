#!/usr/bin/env node
/**
 * check-contrast.mjs
 *
 * contrast-pairs.json에 정의된 토큰 쌍을 3개 모드(light/dark/HC)에서
 * WCAG 2.1 공식으로 대비를 계산하고 미달 항목만 출력한다.
 *
 * 임계값: type="text" → 4.5:1 / type="ui" → 3:1
 * 실행: npm run check:contrast
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve as pathResolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = pathResolve(__dirname, '..');

function readCss(rel) { return readFileSync(pathResolve(root, rel), 'utf-8'); }
function readJson(rel) { return JSON.parse(readFileSync(pathResolve(root, rel), 'utf-8')); }

// ── CSS 파싱 ────────────────────────────────────────────────────────────────────

/** selector에 해당하는 { } 블록 내부 추출 (중첩 고려) */
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

/** var(--name) 체인을 재귀적으로 풀어 실제 값(hex 등) 반환 */
function resolveVar(value, map, depth = 0) {
  if (depth > 15 || !value) return value;
  const m = value.match(/^var\(--([^,)]+)(?:\s*,\s*(.+))?\)$/);
  if (!m) return value;
  const [, name, fallback] = m;
  const resolved = map.get(name);
  if (resolved !== undefined) return resolveVar(resolved, map, depth + 1);
  if (fallback) return resolveVar(fallback.trim(), map, depth + 1);
  return value; // unresolved
}

// ── WCAG 계산 ───────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    return [parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16)];
  }
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

const primCss = readCss('src/tokens/primitive.css');
const modeCss = readCss('src/tokens/mode.css');
const semCss  = readCss('src/tokens/semantic.css');

const primRoot  = parseProps(extractBlock(primCss, ':root'));
const modeLight = parseProps(extractBlock(modeCss, ':root'));
const modeDark  = parseProps(extractBlock(modeCss, '[data-mode="dark"]'));
const modeHC    = parseProps(extractBlock(modeCss, '[data-mode="high-contrast"]'));
const semRoot   = parseProps(extractBlock(semCss,  ':root'));

// 우선순위: 모드 오버라이드 > semantic > mode light > primitive
const lightMap = mergeMap(primRoot, modeLight, semRoot);
const darkMap  = mergeMap(primRoot, modeLight, semRoot, modeDark);
const hcMap    = mergeMap(primRoot, modeLight, semRoot, modeHC);

// ── 대비 검사 ───────────────────────────────────────────────────────────────────

const pairs = readJson('scripts/contrast-pairs.json');
const errors     = [];
const excepts    = [];

const MODES = [
  { key: 'light', map: lightMap },
  { key: 'dark',  map: darkMap  },
  { key: 'HC',    map: hcMap    },
];

const THRESHOLD = { text: 4.5, ui: 3.0 };

for (const pair of pairs) {
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
      const exc = pair.exceptions?.find(e => e.mode === key);
      if (exc) {
        excepts.push(`[${pair.name}][${key}] ⚠ ${ratio.toFixed(2)}:1 — ${exc.reason}`);
      } else {
        errors.push(
          `[${pair.name}][${key}] ✗ ${ratio.toFixed(2)}:1 (${threshold}:1 미달)` +
          `  fg=${fg}  bg=${bg}`
        );
      }
    }
  }
}

if (errors.length === 0) {
  console.log(`✓ 미달 0건 / 예외 ${excepts.length}건`);
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
