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

import { readFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

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
  responsivePaddingCardTokens,
  responsiveGapLayoutTokens,
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

const primRoot   = parseProps(extractBlock(readCss('src/tokens/primitive.scss'),  ':root'));
const modeLight  = parseProps(extractBlock(readCss('src/tokens/mode.scss'),        ':root'));
const modeDark   = parseProps(extractBlock(readCss('src/tokens/mode.scss'),        '[data-mode="dark"]'));
const respRoot   = parseProps(extractBlock(readCss('src/tokens/responsive.scss'),  ':root'));
const semantRoot = parseProps(extractBlock(readCss('src/tokens/semantic.scss'),    ':root'));

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

// ── 5. 모드 색상: 라이트·다크 ────────────────────────────────────────────────

for (const group of colorSemanticGroups) {
  for (const t of group.tokens) {
    if (t.ref)     check('모드 라이트', t.name, `var(--${t.ref})`,     modeLight.get(t.name));
    if (t.darkRef) check('모드 다크',   t.name, `var(--${t.darkRef})`, modeDark.get(t.name));
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

// ── 8. 시멘틱: 모서리 별칭 ───────────────────────────────────────────────────

for (const t of radiusSemanticTokens) {
  check('시멘틱 모서리', t.name, `var(--${t.ref})`, semantRoot.get(t.name));
}

// ── 9. 반응형: 타이포 ────────────────────────────────────────────────────────

for (const t of responsiveTypoTokens) {
  check('반응형 타이포', t.name, `var(--${t.pcRef})`, respRoot.get(t.name));
}

// ── 10. 반응형: 간격 그룹 xs~xl 전체 ─────────────────────────────────────────

for (const group of responsiveSpacingGroups) {
  for (const t of group.tokens) {
    check('반응형 간격', t.name, `var(--${t.ref})`, respRoot.get(t.name));
  }
}

// ── 11. 반응형: 레이아웃 ─────────────────────────────────────────────────────

for (const t of responsiveLayoutTokens) {
  check('반응형 레이아웃', t.name, `var(--${t.pcRef})`, respRoot.get(t.name));
}

// ── 12. 반응형: 카드 패딩 ────────────────────────────────────────────────────

for (const t of responsivePaddingCardTokens) {
  check('반응형 카드패딩', t.name, `var(--${t.pcRef})`, respRoot.get(t.name));
}

// ── 13. 반응형: 레이아웃 조합 간격 ──────────────────────────────────────────

for (const t of responsiveGapLayoutTokens) {
  check('반응형 갭레이아웃', t.name, `var(--${t.pcRef})`, respRoot.get(t.name));
}

// ── 14. responsive.scss 문서 커버리지 경고 ───────────────────────────────────
// responsive.scss에 정의된 간격(space-*, section-*, container-*, padding-card-*, gap-layout-*)
// 토큰이 token-data.js 어디에도 없으면 경고 (오류 아님).

{
  const warnings = [];
  const documented = new Set([
    ...spacingSizeGroups.flatMap(g => g.tokens.map(t => `--${t.name}`)),
    ...responsiveLayoutTokens.map(t => `--${t.name}`),
    ...responsivePaddingCardTokens.map(t => `--${t.name}`),
    ...responsiveGapLayoutTokens.map(t => `--${t.name}`),
  ]);
  const coverageCheck = /^--(space-|section-padding-|container-padding|padding-card-|gap-layout-)/;
  for (const name of respRoot.keys()) {
    if (coverageCheck.test(`--${name}`) && !documented.has(`--${name}`)) {
      warnings.push(`[문서 누락] responsive.scss --${name} 가 Tokens 문서에 없음`);
    }
  }
  if (warnings.length > 0) {
    console.warn(`\n⚠ 경고 ${warnings.length}건 (문서 누락):\n`);
    for (const w of warnings) console.warn(' ', w);
    console.warn('');
  }
}

// ── 15. SCSS var() 미정의 참조 검사 ──────────────────────────────────────────
// 토큰 파일에 정의된 변수 목록 (전체 src/tokens/*.scss)

function collectFiles(dir) {
  const list = [];
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) list.push(...collectFiles(f));
    else list.push(f);
  }
  return list;
}

function extractDefined(src) {
  const names = new Set();
  for (const m of src.matchAll(/^\s+(--[a-z][a-z0-9-]+)\s*:/gm)) names.add(m[1]);
  return names;
}

// 토큰 파일에서 정의된 모든 변수
const tokenDefined = new Set();
for (const f of collectFiles(resolve(root, 'src/tokens')).filter(f => f.endsWith('.scss'))) {
  for (const n of extractDefined(readFileSync(f, 'utf-8'))) tokenDefined.add(n);
}

// 컴포넌트 파일 전체에서 정의된 --yds-* 변수
const compScssFiles = collectFiles(resolve(root, 'src/components')).filter(f => f.endsWith('.scss'));
const allCompDefined = new Set();
for (const f of compScssFiles) {
  for (const n of extractDefined(readFileSync(f, 'utf-8'))) {
    if (n.startsWith('--yds-')) allCompDefined.add(n);
  }
}

// 각 컴포넌트 파일에서 미정의 var() 검사
for (const f of compScssFiles) {
  const src = readFileSync(f, 'utf-8');
  const relPath = f.replace(root + '\\', '').replace(root + '/', '').replace(/\\/g, '/');
  const localDefined = extractDefined(src); // 같은 파일 안에서 정의된 변수
  for (const m of src.matchAll(/var\((--[a-z][a-z0-9-]+)/g)) {
    const name = m[1];
    if (localDefined.has(name)) continue; // 같은 파일 안에 정의됨 → OK
    if (name.startsWith('--yds-')) {
      // --yds-* 변수: 전체 컴포넌트 SCSS 어딘가에 정의돼 있어야 함 (크로스 컴포넌트 허용)
      if (!allCompDefined.has(name)) {
        errors.push(`[미정의 컴포넌트 변수] ${relPath}: ${name}`);
      }
    } else {
      // 그 외: 토큰 파일에 정의돼 있어야 함
      if (!tokenDefined.has(name)) {
        errors.push(`[미정의 토큰] ${relPath}: ${name}`);
      }
    }
  }
}

// ── 16. semantic.scss에 @media/@include mobile 금지 ──────────────────────────
// semantic.scss에는 미디어 쿼리가 없어야 한다. 반응형 값은 responsive.scss에서만 정의.

{
  const semanticSrc = readCss('src/tokens/semantic.scss');
  if (/@media\b/.test(semanticSrc) || /@include\s+mobile\b/.test(semanticSrc)) {
    errors.push('[구조] semantic.scss에 @media 또는 @include mobile 블록이 있습니다. 반응형 값은 responsive.scss에서만 정의하세요.');
  }
}

// ── 17. responsive.scss에서 semantic 토큰 역참조 금지 ─────────────────────────
// responsive.scss는 primitive만 참조해야 한다. semantic 토큰(semantRoot 정의)을 var()로 쓰면 안 된다.

{
  const responsiveSrc = readCss('src/tokens/responsive.scss');
  for (const m of responsiveSrc.matchAll(/var\((--[a-z][a-z0-9-]+)/g)) {
    const name = m[1].slice(2); // '--' 제거
    if (semantRoot.has(name)) {
      errors.push(`[구조] responsive.scss가 semantic 토큰 --${name} 을 참조합니다. primitive만 참조하세요.`);
    }
  }
}

// ── 결과 출력 ─────────────────────────────────────────────────────────────────

if (errors.length === 0) {
  console.log('✓ 모든 토큰 일치 (token-data.js ↔ *.css)');
  console.log('✓ 미정의 var() 참조 없음 (src/**/*.scss)');
  process.exit(0);
} else {
  console.error(`\n✗ 불일치 ${errors.length}건:\n`);
  for (const e of errors) console.error(' ', e);
  console.error('');
  process.exit(1);
}
