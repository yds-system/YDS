/**
 * SCSS 선택자 특이도 복구 스크립트
 *
 * &--modifier → &.yds-block--modifier
 * (더블클래스 원본의 특이도(0,2,0)를 보존)
 *
 * 사용: node scripts/fix-specificity.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// 수정 대상 파일
const COMPONENT_DIR = join(ROOT, 'src/components');

import { readdirSync, statSync } from 'fs';

function collectScss(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectScss(full));
    } else if (entry.endsWith('.scss') && !entry.startsWith('_')) {
      files.push(full);
    }
  }
  return files;
}

function countBraces(line) {
  let opens = 0, closes = 0;
  for (const ch of line) {
    if (ch === '{') opens++;
    if (ch === '}') closes++;
  }
  return { opens, closes };
}

/**
 * SCSS 파일의 &--modifier 를 &.block--modifier 로 수정.
 * - block 이름은 `.yds-X {` 패턴에서 추출
 * - 모든 중첩 깊이(media query 안쪽 포함)에서 동작
 */
function fixSpecificity(scss) {
  const lines = scss.split('\n');
  const result = [];

  // 스택: { name: string, openDepth: number }
  // openDepth = 블록이 시작될 때의 depth (해당 `{` 이전)
  const blockStack = [];
  let depth = 0;

  for (const line of lines) {
    const { opens, closes } = countBraces(line);

    // 1) .yds-block { 를 열었는가?
    //    (줄의 시작이 임의 공백 + .yds-X 패턴 + 선택적 공백 + {)
    const blockMatch = line.match(/^(\s*)(\.yds-[a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*)\s*\{/);
    if (blockMatch && opens > 0) {
      blockStack.push({ name: blockMatch[2], openDepth: depth });
    }

    // 2) &--modifier 줄인가?
    //    조건: blockStack 맨 위 블록 바로 안쪽 (depth === openDepth + 1)
    const modMatch = line.match(/^(\s*)&--([\w-]+)(.*)/);
    if (modMatch && blockStack.length > 0) {
      const top = blockStack[blockStack.length - 1];
      // 현재 depth = top.openDepth + 1 이면 직속 자식
      if (depth === top.openDepth + 1) {
        // &--large → &.yds-badge--large
        const fixed = line.replace(
          `&--${modMatch[2]}`,
          `&${top.name}--${modMatch[2]}`
        );
        result.push(fixed);
        // depth 업데이트 후 스택 정리
        depth += opens - closes;
        while (blockStack.length > 0 && blockStack[blockStack.length - 1].openDepth >= depth) {
          blockStack.pop();
        }
        continue;
      }
    }

    // 3) depth 업데이트
    depth += opens - closes;

    // 4) 닫힌 블록 팝
    while (blockStack.length > 0 && blockStack[blockStack.length - 1].openDepth >= depth) {
      blockStack.pop();
    }

    result.push(line);
  }

  return result.join('\n');
}

// ── 실행 ─────────────────────────────────────────────────────────────────────

const files = collectScss(COMPONENT_DIR);
let totalFixed = 0;
let fileCount = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const fixed = fixSpecificity(original);
  if (fixed !== original) {
    // 수정된 개수 카운트
    const origCount = (original.match(/^\s*&--[\w-]+/gm) || []).length;
    const fixedCount = (fixed.match(/^\s*&--[\w-]+/gm) || []).length;
    const changed = origCount - fixedCount;
    totalFixed += changed;
    fileCount++;
    writeFileSync(file, fixed, 'utf8');
    const rel = file.replace(ROOT + '/', '').replace(ROOT + '\\', '').replace(/\\/g, '/');
    console.log(`  ${rel}: ${changed}개 수정`);
  }
}

console.log(`\n완료: ${fileCount}개 파일, 총 ${totalFixed}개 선택자 수정\n`);
