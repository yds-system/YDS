import './breadcrumb.css';

export default {
  title: 'Components/Breadcrumb',
  argTypes: {
    depth: {
      control: { type: 'select' },
      options: [2, 3, 4, 5],
      description: '브레드크럼 깊이 (단계 수)',
      table: { category: '종류' },
    },
    currentLabel: {
      control: { type: 'text' },
      description: '현재 페이지 레이블',
      table: { category: '내용' },
    },
  },
  args: {
    depth: 3,
    currentLabel: '서비스 신청',
  },
};

/* ─── 샘플 데이터 ───────────────────────────── */

const LABELS = ['서비스 신청', '세부 항목', '서비스 상세', '최종 단계'];

function makeItems(depth, currentLabel) {
  const items = [{ label: '홈', href: '#' }];
  for (let i = 0; i < depth - 1; i++) {
    const isLast = i === depth - 2;
    items.push({
      label: isLast ? (currentLabel || LABELS[i] || `단계 ${i + 1}`) : (LABELS[i] || `단계 ${i + 1}`),
      href: isLast ? null : '#',
    });
  }
  return items;
}

/* ─── HTML 생성 헬퍼 ────────────────────────── */

function renderBreadcrumb({ items, mobile = false }) {
  const liHtml = items.map((item, i) => {
    const isHome    = i === 0;
    const isCurrent = !item.href;
    const itemClass = isHome
      ? 'yds-breadcrumb__item yds-breadcrumb__item--home'
      : 'yds-breadcrumb__item';

    /* 현재 페이지: span + aria-current, 그 외: <a> */
    const content = isCurrent
      ? `<span class="yds-breadcrumb__link yds-breadcrumb__link--current" aria-current="page">${item.label}</span>`
      : `<a href="${item.href}" class="yds-breadcrumb__link">${item.label}</a>`;

    return `<li class="${itemClass}">${content}</li>`;
  }).join('\n      ');

  const mobileClass = mobile ? ' yds-breadcrumb--mobile' : '';
  return `<nav class="yds-breadcrumb${mobileClass}" aria-label="현재 경로">
  <ol class="yds-breadcrumb__list">
      ${liHtml}
  </ol>
</nav>`;
}

const wrap = (html) => `<div style="max-width:72rem;">${html}</div>`;

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(renderBreadcrumb({
    items: makeItems(args.depth, args.currentLabel),
  })),
};

/* ─── 깊이별 ────────────────────────────────── */

export const 깊이별 = {
  name: '깊이별 (Depth)',
  parameters: { controls: { disable: true } },
  render: () => {
    const row = (label, depth) => `
      <div style="margin-bottom:1.6rem;">
        <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle);
                  margin-bottom:0.6rem;">${label}</p>
        ${renderBreadcrumb({ items: makeItems(depth) })}
      </div>`;

    return wrap(`
      ${row('2단계 — 홈 > 현재', 2)}
      ${row('3단계 — 홈 > 중간 > 현재', 3)}
      ${row('4단계 — 홈 > 중간1 > 중간2 > 현재', 4)}
      ${row('5단계 — 홈 > 중간1 > 중간2 > 중간3 > 현재', 5)}
    `);
  },
};

/* ─── 모바일 축약 ────────────────────────────── */

export const 모바일축약 = {
  name: '모바일 축약 (Mobile Truncated)',
  parameters: { controls: { disable: true } },
  render: () => {
    const depthLabelStyle = `font-size:1.2rem; color:var(--krds-light-color-text-subtle);
      margin-bottom:0.6rem;`;

    const rows = [2, 3, 4, 5].map(depth => `
      <div style="margin-bottom:1.6rem;">
        <p style="${depthLabelStyle}">${depth}단계</p>
        ${renderBreadcrumb({ items: makeItems(depth), mobile: true })}
      </div>`).join('');

    return `<div style="max-width:72rem;">${rows}</div>`;
  },
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, html) => `
      <section style="margin-bottom:3.2rem;">
        <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.2rem;
                   color:var(--krds-light-color-text-bolder);">${title}</h2>
        ${html}
      </section>`;

    return wrap(`
      ${section('2단계', renderBreadcrumb({ items: makeItems(2) }))}
      ${section('3단계', renderBreadcrumb({ items: makeItems(3) }))}
      ${section('4단계', renderBreadcrumb({ items: makeItems(4) }))}
      ${section('5단계', renderBreadcrumb({ items: makeItems(5) }))}
    `);
  },
};
