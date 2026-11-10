import '../checkbox/checkbox.css';
import '../form-group/form-group.css';
import './table.css';

export default {
  title: 'Components/Table',
  argTypes: {
    caption: {
      control: 'text',
      description: '표 설명 (스크린리더 전달)',
      table: { category: '내용' },
    },
    showCaption: {
      control: 'boolean',
      description: 'caption 시각적 표시',
      table: { category: '내용' },
    },
    mobileType: {
      control: { type: 'select' },
      options: ['scroll', 'card'],
      description: '모바일 처리 방식',
      table: { category: '반응형' },
    },
  },
  args: {
    caption: '공지사항 목록으로 번호, 제목, 작성자, 게시일로 구성되어 있습니다.',
    showCaption: false,
    mobileType: 'scroll',
  },
};

/* ─── 샘플 데이터 ───────────────────────────── */

const listHeaders = ['번호', '제목', '작성자', '게시일'];
const listRows = [
  ['1', '서비스 점검 안내 (2026-11-01)', '관리자', '2026-10-28'],
  ['2', '개인정보 처리방침 개정 안내', '관리자', '2026-10-20'],
  ['3', '시스템 업데이트 완료', '운영팀', '2026-10-15'],
  ['4', '신규 기능 출시 안내', '기획팀', '2026-10-10'],
  ['5', '이용 약관 변경 안내', '관리자', '2026-10-01'],
];

const colRows = [
  { label: '이름', value: '홍길동' },
  { label: '이메일', value: 'gildong@example.com' },
  { label: '연락처', value: '010-1234-5678' },
  { label: '부서', value: '디지털서비스팀' },
  { label: '직급', value: '선임 연구원' },
  { label: '입사일', value: '2022년 3월 2일' },
];

const checkboxRows = [
  { no: '1', title: '서비스 점검 안내', author: '관리자', date: '2026-10-28' },
  { no: '2', title: '개인정보 처리방침 개정 안내', author: '관리자', date: '2026-10-20' },
  { no: '3', title: '시스템 업데이트 완료', author: '운영팀', date: '2026-10-15' },
  { no: '4', title: '신규 기능 출시 안내', author: '기획팀', date: '2026-10-10' },
];

/* ─── HTML 생성 헬퍼 ────────────────────────── */

function wrapClass(mobileType) {
  return `yds-table-wrap${mobileType === 'card' ? ' yds-table-wrap--mobile-card' : ''}`;
}

function captionEl(text, visible) {
  const cls = visible
    ? ' class="yds-table__caption yds-table__caption--visible"'
    : ' class="yds-table__caption"';
  return `<caption${cls}>${text}</caption>`;
}

/* 목록형 (thead + tbody) */
function renderListTable({ caption, showCaption, mobileType, headers = listHeaders, rows = listRows }) {
  const colgroup = headers.map(() => '<col>').join('');
  const headCells = headers.map(h => `<th scope="col">${h}</th>`).join('');
  const bodyRows = rows.map(row =>
    `<tr>${row.map((cell, ci) =>
      `<td data-label="${headers[ci]}">${cell}</td>`
    ).join('')}</tr>`
  ).join('');

  return `
    <div class="${wrapClass(mobileType)}">
      <table class="yds-table yds-table--data">
        ${captionEl(caption, showCaption)}
        <colgroup>${colgroup}</colgroup>
        <thead><tr>${headCells}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
}

/* 가로 헤더형 (thead + tbody th[scope=row]) */
function renderColTable({ caption, showCaption, mobileType, colHeaders = ['항목', '내용'], rows = colRows }) {
  const headCells = colHeaders.map(h => `<th scope="col">${h}</th>`).join('');
  const bodyRows = rows.map(row => `
    <tr>
      <th scope="row">${row.label}</th>
      <td data-label="${row.label}">${row.value}</td>
    </tr>`).join('');

  return `
    <div class="${wrapClass(mobileType)}">
      <table class="yds-table yds-table--data yds-table--row-header">
        ${captionEl(caption, showCaption)}
        <colgroup>
          <col style="width:25%;">
          <col>
        </colgroup>
        <thead><tr>${headCells}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
}

/* 체크박스 선택형 */
function renderCheckboxTable({ caption, showCaption, prefix, rows = checkboxRows }) {
  const headers = ['번호', '제목', '작성자', '게시일'];
  const allId = `${prefix}-all`;

  const headRow = `<tr>
    <th scope="col" style="width:4rem;">
      <div class="yds-check-item yds-check-item--medium" style="justify-content:center;">
        <input type="checkbox" id="${allId}">
        <label for="${allId}"><span class="sr-only">전체 선택</span></label>
      </div>
    </th>
    ${headers.map(h => `<th scope="col">${h}</th>`).join('')}
  </tr>`;

  const bodyRows = rows.map((row, i) => {
    const chkId = `${prefix}-row-${i}`;
    return `<tr>
      <th scope="row" style="text-align:center;">
        <div class="yds-check-item yds-check-item--medium" style="justify-content:center;">
          <input type="checkbox" id="${chkId}" data-row>
          <label for="${chkId}"><span class="sr-only">${row.title} 선택</span></label>
        </div>
      </th>
      <td data-label="번호">${row.no}</td>
      <td data-label="제목">${row.title}</td>
      <td data-label="작성자">${row.author}</td>
      <td data-label="게시일">${row.date}</td>
    </tr>`;
  }).join('');

  return `
    <div class="yds-table-wrap">
      <table class="yds-table yds-table--data yds-table--row-header">
        ${captionEl(caption, showCaption)}
        <colgroup>
          <col style="width:5%;">
          <col style="width:8%;">
          <col>
          <col style="width:12%;">
          <col style="width:12%;">
        </colgroup>
        <thead>${headRow}</thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
}

/* 체크박스 select-all play 함수 */
function initSelectAll(canvasElement) {
  canvasElement.querySelectorAll('table').forEach(table => {
    const allChk = table.querySelector('thead input[type="checkbox"]');
    if (!allChk) return;
    const rowChks = Array.from(table.querySelectorAll('tbody input[data-row]'));

    function syncAll() {
      const checked = rowChks.filter(c => c.checked).length;
      allChk.indeterminate = checked > 0 && checked < rowChks.length;
      allChk.checked = checked === rowChks.length;
    }

    allChk.addEventListener('change', () => {
      rowChks.forEach(c => { c.checked = allChk.checked; });
    });
    rowChks.forEach(c => c.addEventListener('change', syncAll));
  });
}

/* ─── Playground ────────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: ({ caption, showCaption, mobileType }) =>
    renderListTable({ caption, showCaption, mobileType }),
};

/* ─── 목록형 ────────────────────────────────── */
export const 목록형 = {
  name: '목록형 (List)',
  parameters: { controls: { include: ['showCaption', 'mobileType'] } },
  render: ({ caption, showCaption, mobileType }) =>
    renderListTable({ caption, showCaption, mobileType }),
};

/* ─── 가로 헤더형 ───────────────────────────── */
export const 가로헤더형 = {
  name: '가로 헤더형 (Detail)',
  parameters: { controls: { include: ['showCaption', 'mobileType'] } },
  args: {
    caption: '사용자 상세 정보로 이름, 이메일, 연락처, 부서, 직급, 입사일로 구성되어 있습니다.',
  },
  render: ({ caption, showCaption, mobileType }) =>
    renderColTable({ caption, showCaption, mobileType }),
};

/* ─── 체크박스 선택형 ───────────────────────── */
export const 체크박스선택형 = {
  name: '체크박스 선택형 (Selectable)',
  parameters: { controls: { include: ['showCaption'] } },
  args: {
    caption: '공지사항 목록으로 선택, 번호, 제목, 작성자, 게시일로 구성되어 있습니다.',
  },
  render: ({ caption, showCaption }) =>
    renderCheckboxTable({ caption, showCaption, prefix: 'chk' }),
  play: async ({ canvasElement }) => initSelectAll(canvasElement),
};

/* ─── 반응형: 카드형 ────────────────────────── */
export const 반응형카드 = {
  name: '반응형 — 카드형 (mobile-card)',
  parameters: { controls: { disable: true } },
  render: () => `
    <p style="font-size:1.3rem; color:var(--krds-light-color-text-subtle);
               margin-bottom:1.6rem;">
      768px 이하에서 카드형으로 자동 전환됩니다. 브라우저를 좁혀 확인하세요.
    </p>
    ${renderListTable({
      caption: '공지사항 목록 (카드형 반응형 예시)',
      showCaption: false,
      mobileType: 'card',
    })}
    <p style="font-size:1.3rem; color:var(--krds-light-color-text-subtle);
               margin-top:3.2rem; margin-bottom:1.6rem;">가로 헤더형 카드 변환</p>
    ${renderColTable({
      caption: '사용자 상세 정보 (카드형 반응형 예시)',
      showCaption: false,
      mobileType: 'card',
    })}`,
};

/* ─── 전체 변형 ─────────────────────────────── */
export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, content) => `
      <section style="margin-bottom:4rem;">
        <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.6rem;
                   color:var(--krds-light-color-text-bolder);">${title}</h2>
        ${content}
      </section>`;

    return [
      section('목록형', renderListTable({ caption: '공지사항 목록', showCaption: true, mobileType: 'scroll' })),
      section('가로 헤더형', renderColTable({ caption: '사용자 상세 정보', showCaption: true, mobileType: 'scroll' })),
      section('체크박스 선택형', renderCheckboxTable({ caption: '공지사항 선택 목록', showCaption: false, prefix: 'av-chk' })),
    ].join('');
  },
  play: async ({ canvasElement }) => initSelectAll(canvasElement),
};
