#!/usr/bin/env node
/**
 * check-tokens.mjs
 *
 * token-data.js 에 기록된 토큰 이름·참조가
 * src/tokens/*.css 의 실제 정의와 일치하는지 검사한다.
 *
 * 실행: npm run check:tokens
 * 불일치 항목만 출력하고 종료 코드 1 반환. 모두 일치하면 0.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import {
  colorPrimGroups,
  colorSemanticGroups,
  typoPrimTokens,
  spacingPrimTokens,
  spacingSizeGroups,
  radiusPrimTokens,
  radiusSemanticTokens,
  responsiveTypoTokens,
  responsiveLayoutTokens,
  responsiveSpacingGroups,
  semanticStaticColorTokens,
  shadowColorTokens,
} from '../src/tokens/token-data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..');

// ── CSS 파싱 ──────────────────────────────────────────────────────────────────

function readCss(rel) {
  return readFileSync(resolve(root, rel), 'utf-8');
}

/** selector 에 해당하는 { } 블록 내부 텍스트를 추출한다 (중첩 고려). */
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

/** 블록 내 CSS 커스텀 프로퍼티 → Map<이름, 값> */
function parseProps(block) {
  const map = new Map();
  const re  = /--([^\s:]+)\s*:\s*([^;]+?)\s*;/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    map.set(m[1], m[2].replace(/\s+/g, ' ').trim());
  }
  return map;
}

const primRoot   = parseProps(extractBlock(readCss('src/tokens/primitive.css'),  ':root'));
const modeLight  = parseProps(extractBlock(readCss('src/tokens/mode.css'),        ':root'));
const modeDark   = parseProps(extractBlock(readCss('src/tokens/mode.css'),        '[data-mode="dark"]'));
const modeHC     = parseProps(extractBlock(readCss('src/tokens/mode.css'),        '[data-mode="high-contrast"]'));
const respRoot   = parseProps(extractBlock(readCss('src/tokens/responsive.css'),  ':root'));
const semantRoot = parseProps(extractBlock(readCss('src/tokens/semantic.css'),    ':root'));

// ── 비교 유틸 ─────────────────────────────────────────────────────────────────

const errors = [];

function norm(v) {
  return v.trim().replace(/\s+/g, ' ').replace(/"/g, "'");
}

function check(ctx, name, expected, actual) {
  if (actual === undefined) {
    errors.push(`[${ctx}] --${name}  →  CSS에 없음  (expected: ${expected})`);
  } else if (norm(expected) !== norm(actual)) {
    errors.push(`[${ctx}] --${name}  →  token-data "${expected}"  ≠  CSS "${actual}"`);
  }
}

/** font-family처럼 CSS가 fallback을 더 포함하는 경우: 첫 토큰 일치 여부만 확인 */
function checkFamily(ctx, name, expected, actual) {
  if (actual === undefined) {
    errors.push(`[${ctx}] --${name}  →  CSS에 없음`);
    return;
  }
  const firstToken = norm(expected).split(',')[0].trim();
  if (!norm(actual).includes(firstToken)) {
    errors.push(`[${ctx}] --${name}  →  token-data "${expected}"  ≠  CSS "${actual}"`);
  }
}

/** "1.3rem (13px)" 처럼 (px) 주석이 붙은 값에서 실제 단위만 추출 */
function stripNote(v) {
  return v.replace(/\s*\(.*?\)/, '').trim();
}

// ── 1. 프리미티브 색상 ────────────────────────────────────────────────────────

for (const group of colorPrimGroups) {
  for (const t of group.tokens) {
    check('프리미티브 색상', t.name, t.value, primRoot.get(t.name));
  }
}

// ── 2. 프리미티브 타이포 ──────────────────────────────────────────────────────

for (const t of typoPrimTokens) {
  if (t.name.startsWith('font-family-')) {
    checkFamily('프리미티브 타이포', t.name, t.value, primRoot.get(t.name));
  } else {
    check('프리미티브 타이포', t.name, stripNote(t.value), primRoot.get(t.name));
  }
}

// ── 3. 프리미티브 간격 ────────────────────────────────────────────────────────

for (const t of spacingPrimTokens) {
  check('프리미티브 간격', t.name, t.value, primRoot.get(t.name));
}

// ── 4. 프리미티브 모서리 ──────────────────────────────────────────────────────

for (const t of radiusPrimTokens) {
  check('프리미티브 모서리', t.name, t.value, primRoot.get(t.name));
}

// ── 5. 모드 색상: 라이트·다크·고대비 ─────────────────────────────────────────

for (const group of colorSemanticGroups) {
  for (const t of group.tokens) {
    if (t.ref)     check('모드 라이트', t.name, `var(--${t.ref})`,     modeLight.get(t.name));
    if (t.darkRef) check('모드 다크',   t.name, `var(--${t.darkRef})`, modeDark.get(t.name));
    if (t.hcRef)   check('모드 고대비', t.name, `var(--${t.hcRef})`,   modeHC.get(t.name));
  }
}

// ── 6. 모드: 그림자 색상 ─────────────────────────────────────────────────────

for (const t of shadowColorTokens) {
  check('모드 그림자색', t.name, `var(--${t.ref})`, modeLight.get(t.name));
}

// ── 7. 시멘틱: 고정 색상 ─────────────────────────────────────────────────────

for (const t of semanticStaticColorTokens) {
  check('시멘틱 고정색상', t.name, `var(--${t.ref})`, semantRoot.get(t.name));
}

// ── 8. 시멘틱: 간격 별칭 (xs·s 그룹) ────────────────────────────────────────

for (const group of spacingSizeGroups.slice(0, 2)) {
  for (const t of group.tokens) {
    check('시멘틱 간격', t.name, `var(--${t.ref})`, semantRoot.get(t.name));
  }
}

// ── 9. 시멘틱: 모서리 별칭 ───────────────────────────────────────────────────

for (const t of radiusSemanticTokens) {
  check('시멘틱 모서리', t.name, `var(--${t.ref})`, semantRoot.get(t.name));
}

// ── 10. 반응형: 타이포 ───────────────────────────────────────────────────────

for (const t of responsiveTypoTokens) {
  check('반응형 타이포', t.name, `var(--${t.pcRef})`, respRoot.get(t.name));
}

// ── 11. 반응형: 간격 (m·l·xl 그룹) ──────────────────────────────────────────

for (const group of responsiveSpacingGroups) {
  for (const t of group.tokens) {
    check('반응형 간격', t.name, `var(--${t.ref})`, respRoot.get(t.name));
  }
}

// ── 12. 반응형: 레이아웃 ─────────────────────────────────────────────────────

for (const t of responsiveLayoutTokens) {
  check('반응형 레이아웃', t.name, `var(--${t.pcRef})`, respRoot.get(t.name));
}

// ── 결과 출력 ─────────────────────────────────────────────────────────────────

if (errors.length === 0) {
  console.log('✓ 모든 토큰 일치 (token-data.js ↔ *.css)');
  process.exit(0);
} else {
  console.error(`\n✗ 불일치 ${errors.length}건:\n`);
  for (const e of errors) console.error(' ', e);
  console.error('');
  process.exit(1);
}
