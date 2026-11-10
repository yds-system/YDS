import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, '..');

const storiesMap = [
  ['기반/아이콘', 'Foundations/아이코노그래피'],
  ['패턴/기본 레이아웃', 'Patterns/기본 레이아웃'],
  ['컴포넌트/레이아웃 및 표현/로고', 'Brand/로고'],
  ['컴포넌트/레이아웃 및 표현/아코디언', 'Components/아코디언'],
  ['컴포넌트/레이아웃 및 표현/배지', 'Components/배지'],
  ['컴포넌트/레이아웃 및 표현/썸네일', 'Components/썸네일'],
  ['컴포넌트/레이아웃 및 표현/카드', 'Components/카드'],
  ['컴포넌트/레이아웃 및 표현/캐러셀 컨트롤', 'Components/캐러셀 컨트롤'],
  ['컴포넌트/레이아웃 및 표현/탭', 'Components/탭'],
  ['컴포넌트/레이아웃 및 표현/표', 'Components/표'],
  ['컴포넌트/선택/라디오 버튼', 'Components/라디오 버튼'],
  ['컴포넌트/선택/선택 상자', 'Components/선택 상자'],
  ['컴포넌트/선택/체크박스', 'Components/체크박스'],
  ['컴포넌트/선택/태그', 'Components/태그'],
  ['컴포넌트/아이덴티티/푸터', 'Components/푸터'],
  ['컴포넌트/아이덴티티/헤더', 'Components/헤더'],
  ['컴포넌트/액션/링크', 'Components/링크'],
  ['컴포넌트/액션/버튼', 'Components/버튼'],
  ['컴포넌트/입력/날짜 입력', 'Components/날짜 입력'],
  ['컴포넌트/입력/텍스트 영역', 'Components/텍스트 영역'],
  ['컴포넌트/입력/텍스트 입력', 'Components/텍스트 입력'],
  ['컴포넌트/입력/파일 업로드', 'Components/파일 업로드'],
  ['컴포넌트/탐색/메인 메뉴', 'Components/메인 메뉴'],
  ['컴포넌트/탐색/브레드크럼', 'Components/브레드크럼'],
  ['컴포넌트/탐색/페이지네이션', 'Components/페이지네이션'],
  ['컴포넌트/도움/툴팁', 'Components/툴팁'],
];

const mdxMap = [
  ['Docs/네이밍 정의서', 'Overview/네이밍 규칙'],
  ['디자인 토큰 정의서/메인', 'Tokens/메인'],
  ['디자인 토큰 정의서/프리미티브', 'Tokens/프리미티브'],
  ['디자인 토큰 정의서/모드', 'Tokens/모드'],
  ['디자인 토큰 정의서/반응형', 'Tokens/반응형'],
  ['디자인 토큰 정의서/시멘틱', 'Tokens/시멘틱'],
];

function escapeRe(s) {
  return s.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

function processFiles(dir, ext, mapping) {
  const files = [];
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules') walk(full);
      else if (entry.name.endsWith(ext)) files.push(full);
    }
  }
  walk(dir);

  let changed = 0;
  for (const file of files) {
    let content = readFileSync(file, 'utf-8');
    let updated = content;
    for (const [from, to] of mapping) {
      updated = updated.replace(new RegExp(escapeRe(from), 'g'), to);
    }
    if (updated !== content) {
      writeFileSync(file, updated, 'utf-8');
      console.log('  ✓', relative(BASE, file).split('\\').join('/'));
      changed++;
    }
  }
  return changed;
}

console.log('=== stories.js ===');
let total = processFiles(join(BASE, 'src/components'), '.stories.js', storiesMap);

console.log('=== MDX (docs) ===');
total += processFiles(join(BASE, 'src/docs'), '.mdx', mdxMap);

console.log('\n합계:', total, '파일 변경');
