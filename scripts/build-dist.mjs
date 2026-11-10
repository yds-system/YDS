/**
 * YDS 배포 빌드 스크립트
 *
 * 출력: dist/yds/assets/
 *   css/yds-base.css        — 기반 스타일 (@font-face, reset)
 *   css/yds-tokens.css      — 디자인 토큰 (primitive + mode + responsive + semantic)
 *   css/yds-components.css  — 컴포넌트 스타일
 *   fonts/                  — Pretendard GOV 웹폰트
 *   images/icons/           — SVG 아이콘
 *
 * 사용: node scripts/build-dist.mjs
 */

import * as sass from 'sass';
import {
  readFileSync, writeFileSync, mkdirSync, copyFileSync,
  readdirSync, statSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist/yds/assets');

// Vite additionalData 역할: 모든 SCSS에 mobile 믹스인 주입
const MOBILE_MIXIN = '@mixin mobile { @media (max-width: 1279px) { @content; } }\n\n';

// SCSS 컴파일 (expanded 스타일)
function compileSCSS(src) {
  return sass.compileString(src, {
    style: 'expanded',
  }).css;
}

// @import 행 제거 (concat 빌드에서는 각 파일을 직접 포함하므로 중복 방지)
function stripImports(scss) {
  return scss.replace(/^@import\s+['"][^'"]+['"]\s*;?\s*$/gm, '');
}

// src/components 하위 .scss 수집 (알파벳 정렬, _로 시작하는 파셜 제외)
function collectScssFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectScssFiles(full));
    } else if (entry.endsWith('.scss') && !entry.startsWith('_')) {
      files.push(full);
    }
  }
  return files.sort();
}

// ── 1. 출력 디렉터리 생성 ─────────────────────────────────────────────────────
for (const d of ['css', 'fonts', 'images/icons']) {
  mkdirSync(join(DIST, d), { recursive: true });
}

// ── 2. 웹폰트 복사 ──────────────────────────────────────────────────────────
const fontsDir = join(ROOT, 'src/tokens/fonts');
let fontCount = 0;
for (const f of readdirSync(fontsDir)) {
  copyFileSync(join(fontsDir, f), join(DIST, 'fonts', f));
  fontCount++;
}

// ── 3. SVG 아이콘 복사 ──────────────────────────────────────────────────────
const iconsDir = join(ROOT, 'src/assets/images/icons');
let iconCount = 0;
for (const f of readdirSync(iconsDir)) {
  if (f.endsWith('.svg')) {
    copyFileSync(join(iconsDir, f), join(DIST, 'images/icons', f));
    iconCount++;
  }
}

// ── 4. yds-base.css ─────────────────────────────────────────────────────────
let baseScss = readFileSync(join(ROOT, 'src/tokens/base.scss'), 'utf8');
let baseCss = compileSCSS(baseScss);
// @font-face src 경로 수정: ./fonts/ → ../fonts/ (css/ 하위 배포 기준)
baseCss = baseCss.replace(/url\(['"]?\.\/fonts\//g, "url('../fonts/");
writeFileSync(join(DIST, 'css/yds-base.css'), baseCss, 'utf8');

// ── 5. yds-tokens.css ───────────────────────────────────────────────────────
const TOKEN_ORDER = ['primitive', 'mode', 'responsive', 'semantic'];
let tokenScss = MOBILE_MIXIN;
for (const name of TOKEN_ORDER) {
  tokenScss += readFileSync(join(ROOT, `src/tokens/${name}.scss`), 'utf8') + '\n';
}
const tokenCss = compileSCSS(tokenScss);
writeFileSync(join(DIST, 'css/yds-tokens.css'), tokenCss, 'utf8');

// ── 6. yds-components.css ───────────────────────────────────────────────────
const compFiles = collectScssFiles(join(ROOT, 'src/components'));

let compScss = MOBILE_MIXIN;
for (const f of compFiles) {
  // @import 제거 — 같은 디렉터리에 있는 파일을 직접 포함하므로 중복 방지
  compScss += stripImports(readFileSync(f, 'utf8')) + '\n';
}
let compCss = compileSCSS(compScss);

// 아이콘 경로 교체: ../../assets/images/icons/ → ../images/icons/
// (src/components/{name}/ 기준 상대경로 → dist/yds/assets/css/ 기준 상대경로)
compCss = compCss.replace(
  /url\(['"]?\.\.\/\.\.\/assets\/images\/icons\//g,
  'url(../images/icons/',
);

writeFileSync(join(DIST, 'css/yds-components.css'), compCss, 'utf8');

// ── 7. 태그 선택자 검사 ─────────────────────────────────────────────────────
const HTML_TAGS = new Set([
  'html','body','div','span','p','a','ul','ol','li',
  'h1','h2','h3','h4','h5','h6',
  'table','thead','tbody','tfoot','tr','th','td',
  'form','input','button','select','textarea',
  'img','figure','figcaption','nav','header','footer',
  'main','section','article','aside','details','summary',
]);

const tagLines = compCss.split('\n').filter(line => {
  const t = line.trim();
  if (!t || t.startsWith('/*') || t.startsWith('*') || t.startsWith('//')) return false;
  // 선택자 행: { 로 끝나거나 { 를 포함하는 행
  if (!t.includes('{')) return false;
  const firstToken = t.split(/[\s,{>+~[(:]/)[0].toLowerCase();
  return HTML_TAGS.has(firstToken);
});

// ── 결과 보고 ────────────────────────────────────────────────────────────────
const cssDir = join(DIST, 'css');
console.log('\n생성 파일 목록:');
for (const f of readdirSync(cssDir).sort()) {
  const size = statSync(join(cssDir, f)).size;
  console.log(`  dist/yds/assets/css/${f}  (${(size / 1024).toFixed(1)} KB)`);
}
console.log(`  dist/yds/assets/fonts/        (${fontCount}개)`);
console.log(`  dist/yds/assets/images/icons/ (${iconCount}개 SVG)`);

if (tagLines.length === 0) {
  console.log('\nyds-components.css 태그 선택자 없음 ✓');
} else {
  console.warn(`\n⚠ yds-components.css 태그 선택자 ${tagLines.length}건:`);
  tagLines.slice(0, 20).forEach(l => console.warn('  ' + l.trim().slice(0, 100)));
}
