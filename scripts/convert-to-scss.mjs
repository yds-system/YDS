/**
 * CSS → SCSS 변환 스크립트
 *
 * 변환 내용:
 * 1. .css 파일 → .scss 파일 (내용 변환 후 삭제)
 * 2. BEM modifier/state 중첩: .yds-X.yds-X--mod → .yds-X { &--mod { } }
 * 3. @media (max-width: 1279px) → @include mobile
 * 4. @import 경로의 .css → .scss
 *
 * 사용: node scripts/convert-to-scss.mjs
 */

import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── CSS 파일 목록 ────────────────────────────────────────────────────────────

const TOKEN_FILES = [
  'src/tokens/base.css',
  'src/tokens/primitive.css',
  'src/tokens/responsive.css',
  'src/tokens/mode.css',
  'src/tokens/semantic.css',
  'src/tokens/theme-project-a.css',
];

const COMPONENT_FILES = [
  'src/components/common.css',
  'src/components/accordion/accordion.css',
  'src/components/badge/badge.css',
  'src/components/breadcrumb/breadcrumb.css',
  'src/components/button/button.css',
  'src/components/card/card.css',
  'src/components/carousel/carousel.css',
  'src/components/checkbox/checkbox.css',
  'src/components/date-input/date-input.css',
  'src/components/file-upload/file-upload.css',
  'src/components/footer/footer.css',
  'src/components/form-group/form-group.css',
  'src/components/header/header.css',
  'src/components/icon/icon.css',
  'src/components/layout/layout.css',
  'src/components/link/link.css',
  'src/components/logo/logo.css',
  'src/components/main-menu/main-menu.css',
  'src/components/pagination/pagination.css',
  'src/components/select/select.css',
  'src/components/tab/tab.css',
  'src/components/table/table.css',
  'src/components/tag/tag.css',
  'src/components/textarea/textarea.css',
  'src/components/text-input/text-input.css',
  'src/components/thumbnail/thumbnail.css',
  'src/components/tooltip/tooltip.css',
];

// ── CSS 파서 ─────────────────────────────────────────────────────────────────

/**
 * CSS 텍스트를 아이템 배열로 파싱.
 * Item = { type: 'comment'|'statement'|'at'|'rule', ... }
 */
function parseItems(css) {
  const items = [];
  let i = 0;
  const len = css.length;

  while (i < len) {
    // 공백 건너뜀
    if (/\s/.test(css[i])) { i++; continue; }

    // 주석 /* ... */
    if (css[i] === '/' && css[i + 1] === '*') {
      let start = i;
      i += 2;
      while (i < len - 1 && !(css[i] === '*' && css[i + 1] === '/')) i++;
      i += 2;
      items.push({ type: 'comment', value: css.slice(start, i) });
      continue;
    }

    // 헤드(selector / @-rule) 파싱 — { 또는 ; 까지
    let start = i;
    while (i < len && css[i] !== '{' && css[i] !== ';') {
      // 헤드 안의 주석 건너뜀
      if (css[i] === '/' && css[i + 1] === '*') {
        while (i < len - 1 && !(css[i] === '*' && css[i + 1] === '/')) i++;
        i += 2;
      } else {
        i++;
      }
    }

    const head = css.slice(start, i).trim();
    if (!head) { if (i < len) i++; continue; }

    // 세미콜론으로 끝나는 선언 (@import, @charset 등)
    if (css[i] === ';') {
      let val = head + ';';
      // @import 경로 .css → .scss
      val = val.replace(/(@import\s+['"])(.*?)\.css(['"])/g, '$1$2.scss$3');
      items.push({ type: 'statement', value: val });
      i++;
      continue;
    }

    // { 발견 — 균형 잡힌 body 파싱
    i++; // { 건너뜀
    let depth = 1;
    let bodyStart = i;
    while (i < len && depth > 0) {
      if (css[i] === '/' && css[i + 1] === '*') {
        while (i < len - 1 && !(css[i] === '*' && css[i + 1] === '/')) i++;
        i += 2;
      } else if (css[i] === '{') { depth++; i++; }
      else if (css[i] === '}') { depth--; i++; }
      else i++;
    }
    const body = css.slice(bodyStart, i - 1);

    if (head.startsWith('@')) {
      const m = head.match(/^@(\S+)\s*(.*?)$/s);
      items.push({ type: 'at', keyword: m[1], params: (m[2] || '').trim(), body });
    } else {
      items.push({ type: 'rule', selector: head, body });
    }
  }

  return items;
}

// ── BEM 변환기 ───────────────────────────────────────────────────────────────

// .yds-block 이름 추출 정규식 (더블 하이픈 전까지)
// 예: .yds-badge--large → block=.yds-badge, rest=--large
// 예: .yds-badge.yds-badge--large → block=.yds-badge, rest=.yds-badge--large
const BLOCK_RE = /^(\.yds-[a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*)(.*)$/;

function extractBlock(selector) {
  const m = selector.trim().match(BLOCK_RE);
  return m ? { block: m[1], rest: m[2] } : null;
}

/**
 * 단일 selector part → SCSS 중첩 selector 변환
 *
 * 단순 더블클래스 → 단일클래스로 단순화 (specificty 변경 의도적):
 *   block='.yds-badge', rest='.yds-badge--large' → '&--large'
 *
 * 복합 더블클래스(triple-class 등)는 & + rest 전체 유지 (specificity 보존):
 *   block='.yds-btn', rest='.yds-btn--primary.yds-btn--disabled' → '&.yds-btn--primary.yds-btn--disabled'
 *
 * 싱글클래스/pseudo/child:
 *   '--large' → '&--large'
 *   ':hover'  → '&:hover'
 *   ' .child' → '.child'
 */
function nestSelectorPart(block, rest) {
  if (!rest) return null; // base block 자체

  // 더블클래스: rest가 block 으로 시작
  if (rest.startsWith(block)) {
    const afterBlock = rest.slice(block.length);

    // afterBlock에 block 참조가 더 있으면 → 복합 선택자 → & + rest 전체 (specificity 보존)
    // 예: .yds-btn--primary.yds-btn--disabled, :not(.yds-btn--icon) 등
    if (afterBlock.includes(block)) {
      return '&' + rest; // &.yds-btn--primary.yds-btn--disabled → .yds-btn.yds-btn--primary.yds-btn--disabled
    }

    // 단순 더블클래스: afterBlock이 --, :, [ 로 시작하거나 비어있음
    if (!afterBlock || afterBlock.startsWith('--') || afterBlock.startsWith(':') || afterBlock.startsWith('[')) {
      return '&' + afterBlock; // &--large, &:hover 등
    }

    // 다른 블록 클래스(.yds-badge-group 등): & + rest (복합 compound selector)
    return '&' + rest;
  }

  // 싱글클래스 modifier: --mod
  if (rest.startsWith('--')) return '&' + rest;

  // 가상클래스/속성: :hover, ::before, [disabled]
  if (rest.startsWith(':') || rest.startsWith('[')) return '&' + rest;

  // 하위/자식 선택자: ' .child', '> .span', '+ .sibling'
  if (/^[\s>+~]/.test(rest)) return rest.trim();

  return '&' + rest;
}

/**
 * 쉼표 구분 selector 전체를 변환.
 * 모든 part가 같은 block이어야 중첩 가능.
 * 반환: { block, scssSelector } | null
 */
function transformSelector(selector) {
  const parts = selector.split(',').map(s => s.trim()).filter(Boolean);
  if (!parts.length) return null;

  const first = extractBlock(parts[0]);
  if (!first) return null;
  const { block } = first;

  const nested = [];
  for (const part of parts) {
    const info = extractBlock(part);
    if (!info || info.block !== block) return null; // 혼합 selector → 중첩 불가
    const n = nestSelectorPart(block, info.rest);
    nested.push(n === null ? '&' : n);
  }

  return { block, scssSelector: nested.join(',\n  ') };
}

// ── body 들여쓰기 ─────────────────────────────────────────────────────────────

function indentLines(text, indent) {
  return text
    .split('\n')
    .map(line => (line.trim() ? indent + line.trim() : ''))
    .join('\n');
}

// ── 아이템 → SCSS 직렬화 ──────────────────────────────────────────────────────

function itemsToScss(items, indent = '') {
  const out = [];

  for (const item of items) {
    if (item.type === 'comment') {
      out.push(indent + item.value);

    } else if (item.type === 'statement') {
      out.push(indent + item.value);

    } else if (item.type === 'at') {
      const isMobile = item.params === '(max-width: 1279px)';
      const atHead = isMobile ? `${indent}@include mobile` : `${indent}@${item.keyword} ${item.params}`;

      // body 안에 { } 가 있으면 → 재귀 파싱
      if (item.body.includes('{')) {
        const innerItems = parseItems(item.body);
        const innerScss = itemsToScss(innerItems, indent + '  ');
        out.push(`${atHead} {`);
        if (innerScss.trim()) out.push(innerScss);
        out.push(`${indent}}`);
      } else {
        // @font-face, @keyframes 내부처럼 선언만 있는 경우
        const bodyIndented = indentLines(item.body, indent + '  ');
        out.push(`${atHead} {`);
        if (bodyIndented.trim()) out.push(bodyIndented);
        out.push(`${indent}}`);
      }

    } else if (item.type === 'rule') {
      const result = transformSelector(item.selector);

      if (!result) {
        // 변환 불가 → 원본 유지
        const bodyIndented = indentLines(item.body, indent + '  ');
        out.push(`${indent}${item.selector} {`);
        if (bodyIndented.trim()) out.push(bodyIndented);
        out.push(`${indent}}`);
      } else {
        const { block, scssSelector } = result;
        const parts = item.selector.split(',').map(s => s.trim());
        const isBaseOnly = parts.every(p => p === block);

        if (isBaseOnly) {
          // 기본 block 선언 — 중첩 없이 그대로
          const bodyIndented = indentLines(item.body, indent + '  ');
          out.push(`${indent}${block} {`);
          if (bodyIndented.trim()) out.push(bodyIndented);
          out.push(`${indent}}`);
        } else {
          // modifier/state/child → 중첩
          const bodyIndented = indentLines(item.body, indent + '    ');
          out.push(`${indent}${block} {`);
          out.push(`${indent}  ${scssSelector} {`);
          if (bodyIndented.trim()) out.push(bodyIndented);
          out.push(`${indent}  }`);
          out.push(`${indent}}`);
        }
      }
    }
  }

  return out.join('\n');
}

// ── 파일 변환 ────────────────────────────────────────────────────────────────

function convertFile(relPath, isBem = true) {
  const cssPath = join(ROOT, relPath);
  const scssPath = cssPath.replace(/\.css$/, '.scss');

  if (!existsSync(cssPath)) {
    console.warn(`  SKIP (없음): ${relPath}`);
    return false;
  }

  const css = readFileSync(cssPath, 'utf8');
  let items = parseItems(css);
  let scss = itemsToScss(items, '');

  // 맨 앞 여분 빈 줄 정리
  scss = scss.replace(/^\n+/, '').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

  writeFileSync(scssPath, scss, 'utf8');
  unlinkSync(cssPath);
  console.log(`  OK: ${relPath} → ${relPath.replace('.css', '.scss')}`);
  return true;
}

// ── 메인 ────────────────────────────────────────────────────────────────────

console.log('\n=== CSS → SCSS 변환 시작 ===\n');

console.log('[토큰 파일]');
let tokenCount = 0;
for (const f of TOKEN_FILES) {
  if (convertFile(f, false)) tokenCount++;
}

console.log('\n[컴포넌트 파일]');
let compCount = 0;
for (const f of COMPONENT_FILES) {
  if (convertFile(f, true)) compCount++;
}

console.log(`\n변환 완료: 토큰 ${tokenCount}개, 컴포넌트 ${compCount}개\n`);
