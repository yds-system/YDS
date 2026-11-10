/**
 * rename-titles.mjs
 * Storybook title 경로(stories.js / MDX Meta) + MDX h1 헤딩을 일괄 변경한다.
 * 실행: node scripts/rename-titles.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, '..');

// ── stories.js title 경로 변경 ────────────────────────────────────────────────
const storiesMap = [
  // Foundations
  ['Foundations/아이코노그래피',   'Foundations/Iconography'],
  // Patterns
  ['Patterns/기본 레이아웃',       'Patterns/Basic Layout'],
  // Brand
  ['Brand/로고',                   'Brand/Logo'],
  // Components (가나다 → 알파벳)
  ['Components/아코디언',          'Components/Accordion'],
  ['Components/배지',              'Components/Badge'],
  ['Components/브레드크럼',        'Components/Breadcrumb'],
  ['Components/버튼',              'Components/Button'],
  ['Components/카드',              'Components/Card'],
  ['Components/캐러셀 컨트롤',     'Components/Carousel'],
  ['Components/체크박스',          'Components/Checkbox'],
  ['Components/날짜 입력',         'Components/Date Picker'],
  ['Components/파일 업로드',       'Components/File Upload'],
  ['Components/푸터',              'Components/Footer'],
  ['Components/헤더',              'Components/Header'],
  ['Components/링크',              'Components/Link'],
  ['Components/메인 메뉴',         'Components/Main Menu'],
  ['Components/페이지네이션',      'Components/Pagination'],
  ['Components/라디오 버튼',       'Components/Radio Button'],
  ['Components/선택 상자',         'Components/Select'],
  ['Components/탭',                'Components/Tab'],
  ['Components/표',                'Components/Table'],
  ['Components/태그',              'Components/Tag'],
  ['Components/텍스트 입력',       'Components/Text Input'],
  ['Components/텍스트 영역',       'Components/Textarea'],
  ['Components/썸네일',            'Components/Thumbnail'],
  ['Components/툴팁',              'Components/Tooltip'],
];

// ── MDX <Meta title="..."> 변경 ───────────────────────────────────────────────
const mdxTitleMap = [
  // Overview
  ['Overview/네이밍 규칙',         'Overview/Naming'],
  ['Overview/소개',                'Overview/Introduction'],
  // Foundations
  ['Foundations/색상',             'Foundations/Color'],
  ['Foundations/타이포그래피',     'Foundations/Typography'],
  ['Foundations/간격',             'Foundations/Spacing'],
  ['Foundations/레이아웃',         'Foundations/Layout'],
  ['Foundations/모서리',           'Foundations/Border Radius'],
  ['Foundations/그림자',           'Foundations/Shadow'],
  ['Foundations/접근성',           'Foundations/Accessibility'],
  // Tokens
  ['Tokens/메인',                  'Tokens/Overview'],
  ['Tokens/프리미티브',            'Tokens/Primitive'],
  ['Tokens/모드',                  'Tokens/Mode'],
  ['Tokens/반응형',                'Tokens/Responsive'],
  ['Tokens/시멘틱',                'Tokens/Semantic'],
];

// ── MDX h1 헤딩 변경 (component & docs MDX) ──────────────────────────────────
// [현재 h1, 새 영문 h1, 한글 부제]
const h1Map = [
  // component MDX
  ['# 날짜 선택 (Date Input)',           '# Date Picker',   '날짜 입력'],
  ['# 라디오 버튼 (Radio Button)',       '# Radio Button',  '라디오 버튼'],
  ['# 레이아웃 (Layout)',                '# Basic Layout',  '기본 레이아웃'],
  ['# 로고 (Logo)',                      '# Logo',          '로고'],
  ['# 링크 (Link)',                      '# Link',          '링크'],
  ['# 메인 메뉴 (Main Menu)',            '# Main Menu',     '메인 메뉴'],
  ['# 배지 (Badge)',                     '# Badge',         '배지'],
  ['# 버튼 (Button)',                    '# Button',        '버튼'],
  ['# 브레드크럼 (Breadcrumb)',          '# Breadcrumb',    '브레드크럼'],
  ['# 셀렉트 (Select)',                  '# Select',        '선택 상자'],
  ['# 썸네일 (Thumbnail)',               '# Thumbnail',     '썸네일'],
  ['# 아이콘 (Icon)',                    '# Iconography',   '아이콘'],
  ['# 아코디언 (Accordion)',             '# Accordion',     '아코디언'],
  ['# 체크박스 (Checkbox)',              '# Checkbox',      '체크박스'],
  ['# 카드 (Card)',                      '# Card',          '카드'],
  ['# 캐러셀 컨트롤 (Carousel Controls)','# Carousel',      '캐러셀 컨트롤'],
  ['# 태그 (Tag)',                       '# Tag',           '태그'],
  ['# 탭 (Tab)',                         '# Tab',           '탭'],
  ['# 테이블 (Table)',                   '# Table',         '표'],
  ['# 텍스트 영역 (Textarea)',           '# Textarea',      '텍스트 영역'],
  ['# 텍스트 입력 (Text Input)',         '# Text Input',    '텍스트 입력'],
  ['# 툴팁 (Tooltip)',                   '# Tooltip',       '툴팁'],
  ['# 파일 업로드 (File Upload)',        '# File Upload',   '파일 업로드'],
  ['# 페이지네이션 (Pagination)',        '# Pagination',    '페이지네이션'],
  ['# 푸터 (Footer)',                    '# Footer',        '푸터'],
  ['# 헤더 (Header)',                    '# Header',        '헤더'],
  // docs MDX
  ['# 컴포넌트 네이밍 정의서',          '# Naming',        '컴포넌트 네이밍 정의서'],
  ['# 디자인 토큰',                     '# Token Overview','디자인 토큰'],
  ['# 모드 토큰',                       '# Mode',          '모드 토큰'],
  ['# 프리미티브 토큰',                 '# Primitive',     '프리미티브 토큰'],
  ['# 반응형 토큰',                     '# Responsive',    '반응형 토큰'],
  ['# 시멘틱 토큰',                     '# Semantic',      '시멘틱 토큰'],
  ['# 윤컴 디자인 시스템',              '# Introduction',  '윤컴 디자인 시스템'],
];

function escapeRe(s) {
  return s.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

function walk(dir, ext) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      for (const f of walk(full, ext)) files.push(f);
    } else if (entry.name.endsWith(ext)) {
      files.push(full);
    }
  }
  return files;
}

function applyMap(content, map) {
  for (const [from, to] of map) {
    content = content.replace(new RegExp(escapeRe(from), 'g'), to);
  }
  return content;
}

function applyH1Map(content, h1map) {
  for (const [from, engH1, koSub] of h1map) {
    if (content.includes(from)) {
      // "# 한글 (English)\n" → "# English\n\n한글\n"
      content = content.replace(
        new RegExp(escapeRe(from) + '(\r?\n)'),
        `${engH1}$1$1${koSub}$1`
      );
    }
  }
  return content;
}

let total = 0;

// 1. stories.js title 변경
console.log('=== stories.js title 경로 ===');
for (const file of walk(join(BASE, 'src/components'), '.stories.js')) {
  let c = readFileSync(file, 'utf-8');
  let u = applyMap(c, storiesMap);
  if (u !== c) {
    writeFileSync(file, u, 'utf-8');
    console.log('  ✓', relative(BASE, file).split('\\').join('/'));
    total++;
  }
}

// 2. docs MDX title + h1 변경
console.log('=== docs MDX (Meta title + h1) ===');
for (const file of walk(join(BASE, 'src/docs'), '.mdx')) {
  let c = readFileSync(file, 'utf-8');
  let u = applyMap(c, mdxTitleMap);
  u = applyH1Map(u, h1Map);
  if (u !== c) {
    writeFileSync(file, u, 'utf-8');
    console.log('  ✓', relative(BASE, file).split('\\').join('/'));
    total++;
  }
}

// 3. component MDX h1 변경
console.log('=== component MDX (h1) ===');
for (const file of walk(join(BASE, 'src/components'), '.mdx')) {
  let c = readFileSync(file, 'utf-8');
  let u = applyH1Map(c, h1Map);
  if (u !== c) {
    writeFileSync(file, u, 'utf-8');
    console.log('  ✓', relative(BASE, file).split('\\').join('/'));
    total++;
  }
}

console.log('\n합계:', total, '파일 변경');
