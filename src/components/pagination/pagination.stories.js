import './pagination.css';

export default {
  title: 'Components/Pagination',
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, step: 1 },
      description: '전체 페이지 수',
      table: { category: '데이터' },
    },
    currentPage: {
      control: { type: 'number', min: 1, step: 1 },
      description: '현재 페이지 번호',
      table: { category: '데이터' },
    },
    pageGroupSize: {
      control: { type: 'select' },
      options: [3, 5, 7],
      description: '한 번에 표시할 페이지 번호 수',
      table: { category: '표시' },
    },
    showFirstLast: {
      control: 'boolean',
      description: '"처음" / "마지막" 버튼 표시',
      table: { category: '표시' },
    },
  },
  args: {
    totalPages: 10,
    currentPage: 4,
    pageGroupSize: 5,
    showFirstLast: true,
  },
};

/* ─── 페이지 목록 계산 ──────────────────────── */

function getPageItems(currentPage, totalPages, groupSize) {
  if (totalPages <= 1) return [{ type: 'page', page: 1 }];

  const items = [];
  const half = Math.floor(groupSize / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + groupSize - 1);

  /* 끝에 걸린 경우 start 재조정 */
  if (end - start < groupSize - 1) {
    start = Math.max(1, end - groupSize + 1);
  }

  /* 앞: 첫 페이지 + 말줄임 */
  if (start > 1) {
    items.push({ type: 'page', page: 1 });
    if (start > 2) items.push({ type: 'dot' });
  }

  /* 페이지 윈도우 */
  for (let p = start; p <= end; p++) {
    items.push({ type: 'page', page: p });
  }

  /* 뒤: 말줄임 + 마지막 페이지 */
  if (end < totalPages) {
    if (end < totalPages - 1) items.push({ type: 'dot' });
    items.push({ type: 'page', page: totalPages });
  }

  return items;
}

/* ─── HTML 생성 헬퍼 ────────────────────────── */

function renderPagination({ totalPages, currentPage, pageGroupSize = 5, showFirstLast = true }) {
  const cp = Math.max(1, Math.min(currentPage, totalPages));
  const isFirst = cp === 1;
  const isLast = cp === totalPages;
  const items = getPageItems(cp, totalPages, pageGroupSize);

  const pageLinksHtml = items.map(item => {
    if (item.type === 'dot') {
      return '<span class="ds-pagination__link ds-pagination__link--ellipsis" aria-hidden="true"></span>';
    }
    const isActive = item.page === cp;
    if (isActive) {
      return `<span class="ds-pagination__link ds-pagination__link--current" aria-current="page"><span class="sr-only">현재페이지 </span>${item.page}</span>`;
    }
    return `<a class="ds-pagination__link" href="#" data-page="${item.page}">${item.page}</a>`;
  }).join('');

  const naviFirst = showFirstLast
    ? (isFirst
      ? '<span class="ds-pagination__move-btn ds-pagination__move-btn--first ds-pagination__move-btn--disabled" aria-disabled="true">처음</span>'
      : '<a class="ds-pagination__move-btn ds-pagination__move-btn--first" href="#" data-navi="first">처음</a>')
    : '';

  const naviLast = showFirstLast
    ? (isLast
      ? '<span class="ds-pagination__move-btn ds-pagination__move-btn--last ds-pagination__move-btn--disabled" aria-disabled="true">마지막</span>'
      : '<a class="ds-pagination__move-btn ds-pagination__move-btn--last" href="#" data-navi="last">마지막</a>')
    : '';

  const naviPrev = isFirst
    ? '<span class="ds-pagination__move-btn ds-pagination__move-btn--prev ds-pagination__move-btn--disabled" aria-disabled="true"><span class="sr-only">이전 페이지</span></span>'
    : '<a class="ds-pagination__move-btn ds-pagination__move-btn--prev" href="#" data-navi="prev"><span class="sr-only">이전 페이지</span></a>';

  const naviNext = isLast
    ? '<span class="ds-pagination__move-btn ds-pagination__move-btn--next ds-pagination__move-btn--disabled" aria-disabled="true"><span class="sr-only">다음 페이지</span></span>'
    : '<a class="ds-pagination__move-btn ds-pagination__move-btn--next" href="#" data-navi="next"><span class="sr-only">다음 페이지</span></a>';

  return `
    <nav aria-label="페이지 탐색">
      <div class="ds-pagination">
        ${naviFirst}
        ${naviPrev}
        <div class="ds-pagination__list">${pageLinksHtml}</div>
        ${naviNext}
        ${naviLast}
      </div>
    </nav>`;
}

/* ─── 인터랙션 초기화 ───────────────────────── */

function initPaginationRoot(root, initState) {
  const state = { ...initState };

  function refresh() {
    root.innerHTML = renderPagination(state);
    bind();
  }

  function bind() {
    root.querySelectorAll('.ds-pagination__link[data-page]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        state.currentPage = +el.dataset.page;
        refresh();
      });
    });

    root.querySelector('[data-navi="first"]')?.addEventListener('click', e => {
      e.preventDefault();
      state.currentPage = 1;
      refresh();
    });
    root.querySelector('[data-navi="prev"]')?.addEventListener('click', e => {
      e.preventDefault();
      state.currentPage = Math.max(1, state.currentPage - 1);
      refresh();
    });
    root.querySelector('[data-navi="next"]')?.addEventListener('click', e => {
      e.preventDefault();
      state.currentPage = Math.min(state.totalPages, state.currentPage + 1);
      refresh();
    });
    root.querySelector('[data-navi="last"]')?.addEventListener('click', e => {
      e.preventDefault();
      state.currentPage = state.totalPages;
      refresh();
    });
  }

  bind();
}

function initPagination(canvasElement, args) {
  const root = canvasElement.querySelector('[data-pg-root]');
  if (!root) return;
  initPaginationRoot(root, {
    currentPage: Math.max(1, Math.min(args.currentPage, args.totalPages)),
    totalPages: args.totalPages,
    pageGroupSize: args.pageGroupSize,
    showFirstLast: args.showFirstLast,
  });
}

const play = async ({ canvasElement, args }) => initPagination(canvasElement, args);

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: ({ totalPages, currentPage, pageGroupSize, showFirstLast }) =>
    `<div data-pg-root>${renderPagination({ totalPages, currentPage, pageGroupSize, showFirstLast })}</div>`,
  play,
};

/* ─── 기본 ──────────────────────────────────── */

export const 기본 = {
  name: '기본',
  parameters: { controls: { disable: true } },
  render: () =>
    `<div data-pg-root>${renderPagination({ totalPages: 10, currentPage: 4, pageGroupSize: 5, showFirstLast: true })}</div>`,
  play: async ({ canvasElement }) =>
    initPaginationRoot(canvasElement.querySelector('[data-pg-root]'),
      { totalPages: 10, currentPage: 4, pageGroupSize: 5, showFirstLast: true }),
};

/* ─── 처음 페이지 ───────────────────────────── */

export const 처음페이지 = {
  name: '처음 페이지 (이전·처음 비활성)',
  parameters: { controls: { disable: true } },
  render: () =>
    `<div data-pg-root>${renderPagination({ totalPages: 10, currentPage: 1, pageGroupSize: 5, showFirstLast: true })}</div>`,
  play: async ({ canvasElement }) =>
    initPaginationRoot(canvasElement.querySelector('[data-pg-root]'),
      { totalPages: 10, currentPage: 1, pageGroupSize: 5, showFirstLast: true }),
};

/* ─── 마지막 페이지 ─────────────────────────── */

export const 마지막페이지 = {
  name: '마지막 페이지 (다음·마지막 비활성)',
  parameters: { controls: { disable: true } },
  render: () =>
    `<div data-pg-root>${renderPagination({ totalPages: 10, currentPage: 10, pageGroupSize: 5, showFirstLast: true })}</div>`,
  play: async ({ canvasElement }) =>
    initPaginationRoot(canvasElement.querySelector('[data-pg-root]'),
      { totalPages: 10, currentPage: 10, pageGroupSize: 5, showFirstLast: true }),
};

/* ─── 많은 페이지 ───────────────────────────── */

export const 많은페이지 = {
  name: '많은 페이지 (말줄임)',
  parameters: { controls: { disable: true } },
  render: () =>
    `<div data-pg-root>${renderPagination({ totalPages: 99, currentPage: 45, pageGroupSize: 5, showFirstLast: true })}</div>`,
  play: async ({ canvasElement }) =>
    initPaginationRoot(canvasElement.querySelector('[data-pg-root]'),
      { totalPages: 99, currentPage: 45, pageGroupSize: 5, showFirstLast: true }),
};

/* ─── 처음·마지막 버튼 없음 ─────────────────── */

export const 처음마지막없음 = {
  name: '이전·다음만 표시',
  parameters: { controls: { disable: true } },
  render: () =>
    `<div data-pg-root>${renderPagination({ totalPages: 10, currentPage: 4, pageGroupSize: 5, showFirstLast: false })}</div>`,
  play: async ({ canvasElement }) =>
    initPaginationRoot(canvasElement.querySelector('[data-pg-root]'),
      { totalPages: 10, currentPage: 4, pageGroupSize: 5, showFirstLast: false }),
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const configs = [
      { title: '기본 (현재: 4/10)',              totalPages: 10, currentPage: 4,  pageGroupSize: 5, showFirstLast: true  },
      { title: '처음 페이지 — 이전·처음 비활성', totalPages: 10, currentPage: 1,  pageGroupSize: 5, showFirstLast: true  },
      { title: '마지막 페이지 — 다음·마지막 비활성', totalPages: 10, currentPage: 10, pageGroupSize: 5, showFirstLast: true  },
      { title: '많은 페이지 (45/99)',             totalPages: 99, currentPage: 45, pageGroupSize: 5, showFirstLast: true  },
      { title: '말줄임 앞만 (8/10)',              totalPages: 10, currentPage: 8,  pageGroupSize: 5, showFirstLast: true  },
      { title: '페이지 수 적음 (2/3)',            totalPages: 3,  currentPage: 2,  pageGroupSize: 5, showFirstLast: true  },
      { title: '이전·다음만 (처음·마지막 없음)',  totalPages: 10, currentPage: 4,  pageGroupSize: 5, showFirstLast: false },
    ];

    return configs.map(cfg => `
      <section style="margin-bottom:4rem;">
        <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.6rem;
                   color:var(--krds-light-color-text-bolder);">${cfg.title}</h2>
        <div data-pg-root
             data-tp="${cfg.totalPages}"
             data-cp="${cfg.currentPage}"
             data-gs="${cfg.pageGroupSize}"
             data-fl="${cfg.showFirstLast}">
          ${renderPagination(cfg)}
        </div>
      </section>`).join('');
  },
  play: async ({ canvasElement }) => {
    canvasElement.querySelectorAll('[data-pg-root]').forEach(root => {
      initPaginationRoot(root, {
        totalPages:    +root.dataset.tp,
        currentPage:   +root.dataset.cp,
        pageGroupSize: +root.dataset.gs,
        showFirstLast: root.dataset.fl !== 'false',
      });
    });
  },
};
