import './carousel.css';
import '../icon/icon.css';

export default {
  title: 'Components/Carousel',
  argTypes: {
    paginationType: {
      control: { type: 'select' },
      options: ['bullet', 'fraction'],
      description: '페이지네이션 타입 — bullet: 점, fraction: 숫자(현재/전체)',
      table: { category: '페이지네이션' },
    },
    bulletCount: {
      control: { type: 'number', min: 2, max: 10, step: 1 },
      description: '불릿 개수 (paginationType이 bullet일 때)',
      table: { category: '페이지네이션' },
    },
    activeBullet: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: '활성 불릿 순서 (1부터 시작, paginationType이 bullet일 때)',
      table: { category: '페이지네이션' },
    },
    currentPage: {
      control: { type: 'number', min: 1, max: 99, step: 1 },
      description: '현재 페이지 (paginationType이 fraction일 때)',
      table: { category: '페이지네이션' },
    },
    totalPages: {
      control: { type: 'number', min: 2, max: 99, step: 1 },
      description: '전체 페이지 수 (paginationType이 fraction일 때)',
      table: { category: '페이지네이션' },
    },
    showController: {
      control: { type: 'boolean' },
      description: '재생/멈춤 버튼 표시',
      table: { category: '컨트롤러' },
    },
    isPlaying: {
      control: { type: 'boolean' },
      description: '현재 재생 중 (showController가 true일 때) — 재생 중이면 멈춤 버튼, 정지 중이면 재생 버튼 표시',
      table: { category: '컨트롤러' },
    },
    showNavigation: {
      control: { type: 'boolean' },
      description: '이전/다음 버튼 표시',
      table: { category: '내비게이션' },
    },
    showMore: {
      control: { type: 'boolean' },
      description: '더보기(+) 버튼 표시',
      table: { category: '내비게이션' },
    },
    prevDisabled: {
      control: { type: 'boolean' },
      description: '이전 버튼 비활성화',
      table: { category: '내비게이션' },
    },
    nextDisabled: {
      control: { type: 'boolean' },
      description: '다음 버튼 비활성화',
      table: { category: '내비게이션' },
    },
    centered: {
      control: { type: 'boolean' },
      description: '인디케이터 가운데 정렬',
      table: { category: '레이아웃' },
    },
  },
  args: {
    paginationType: 'bullet',
    bulletCount: 5,
    activeBullet: 2,
    currentPage: 2,
    totalPages: 10,
    showController: true,
    isPlaying: true,
    showNavigation: true,
    showMore: false,
    prevDisabled: false,
    nextDisabled: false,
    centered: true,
  },
};

/* ─── 렌더 헬퍼 ─────────────────────────────── */

function renderBullets({ count, active }) {
  return Array.from({ length: count }, (_, i) => {
    const isActive = i + 1 === active;
    return `<span class="yds-carousel__bullet${isActive ? ' yds-carousel__bullet--current' : ''}"></span>`;
  }).join('');
}

function renderPagination({ type, bulletCount, activeBullet, currentPage, totalPages, inIndicator = false }) {
  if (type === 'fraction') {
    const bgClass = inIndicator ? ' yds-carousel__pagination--bg' : '';
    return `<div class="yds-carousel__pagination yds-carousel__pagination--fraction${bgClass}">
  <span class="yds-carousel__pagination-current">${currentPage}</span>
  /
  <span class="yds-carousel__pagination-total">${totalPages}</span>
</div>`;
  }
  return `<div class="yds-carousel__pagination">
  ${renderBullets({ count: bulletCount, active: activeBullet })}
</div>`;
}

function renderController({ isPlaying }) {
  if (isPlaying) {
    return `<div class="yds-carousel__controller">
  <button type="button" class="yds-carousel__stop-btn" title="슬라이드 멈춤">
    <span class="yds-sr-only">슬라이드 멈춤</span>
  </button>
</div>`;
  }
  return `<div class="yds-carousel__controller">
  <button type="button" class="yds-carousel__play-btn" title="슬라이드 재생">
    <span class="yds-sr-only">슬라이드 재생</span>
  </button>
</div>`;
}

function renderNavigation({ prevDisabled, nextDisabled, showMore }) {
  const prevClass = `yds-carousel__move-btn yds-carousel__move-btn--prev${prevDisabled ? ' yds-carousel__move-btn--disabled' : ''}`;
  const nextClass = `yds-carousel__move-btn yds-carousel__move-btn--next${nextDisabled ? ' yds-carousel__move-btn--disabled' : ''}`;
  const moreBtn = showMore
    ? `<a href="#" class="yds-carousel__more-btn"><span class="yds-sr-only">더 보기</span></a>`
    : '';
  return `<div class="yds-carousel__nav">
  <button type="button" class="${prevClass}" ${prevDisabled ? 'aria-disabled="true"' : ''}><span class="yds-sr-only">이전</span></button>
  <button type="button" class="${nextClass}" ${nextDisabled ? 'aria-disabled="true"' : ''}><span class="yds-sr-only">다음</span></button>${moreBtn ? '\n  ' + moreBtn : ''}
</div>`;
}

function renderIndicator(args) {
  const {
    paginationType, bulletCount, activeBullet, currentPage, totalPages,
    showController, isPlaying, showNavigation, showMore,
    prevDisabled, nextDisabled, centered,
  } = args;

  const centerClass = centered ? ' yds-carousel__indicator--center' : '';
  const parts = [];

  parts.push(renderPagination({
    type: paginationType, bulletCount, activeBullet,
    currentPage, totalPages, inIndicator: true,
  }));

  if (showController) parts.push(renderController({ isPlaying }));
  if (showNavigation) parts.push(renderNavigation({ prevDisabled, nextDisabled, showMore }));

  return `<div class="yds-carousel__indicator${centerClass}">
  ${parts.join('\n  ')}
</div>`;
}

const wrap = (html, bg = false) =>
  `<div style="padding:2.4rem;${bg ? ' background:#c2c2c2;' : ''}">${html}</div>`;

const section = (title, html, bg = false) => `
<section style="margin-bottom:3.2rem;">
  <h2 style="font-size:1.4rem;font-weight:bold;margin-bottom:1.2rem;
             color:var(--krds-light-color-text-bolder);">${title}</h2>
  ${bg ? `<div style="background:#c2c2c2;padding:1.6rem;border-radius:0.8rem;">${html}</div>` : html}
</section>`;

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(renderIndicator(args)),
};

/* ─── 개별 버튼 ─────────────────────────────── */

export const 개별버튼 = {
  name: '개별 버튼 (Buttons)',
  parameters: { controls: { disable: true } },
  render: () => `<div style="padding:2.4rem;">
    ${section('이전 / 다음 (prev / next)', `
      <div style="display:flex;gap:1.2rem;align-items:center;flex-wrap:wrap;">
        <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--prev"><span class="yds-sr-only">이전</span></button>
        <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--next"><span class="yds-sr-only">다음</span></button>
        <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--prev yds-carousel__move-btn--disabled" aria-disabled="true"><span class="yds-sr-only">이전 (비활성)</span></button>
        <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--next yds-carousel__move-btn--disabled" aria-disabled="true"><span class="yds-sr-only">다음 (비활성)</span></button>
      </div>
    `)}
    ${section('재생 / 멈춤 (play / stop)', `
      <div style="display:flex;gap:1.2rem;align-items:center;">
        <button type="button" class="yds-carousel__play-btn"><span class="yds-sr-only">슬라이드 재생</span></button>
        <button type="button" class="yds-carousel__stop-btn"><span class="yds-sr-only">슬라이드 멈춤</span></button>
      </div>
    `)}
    ${section('더보기 (more)', `
      <div style="display:flex;gap:1.2rem;align-items:center;">
        <a href="#" class="yds-carousel__more-btn"><span class="yds-sr-only">더 보기</span></a>
      </div>
    `)}
  </div>`,
};

/* ─── 페이지네이션 ──────────────────────────── */

export const 페이지네이션 = {
  name: '페이지네이션 (Pagination)',
  parameters: { controls: { disable: true } },
  render: () => `<div style="padding:2.4rem;">
    ${section('불릿형 (Bullet) — 독립 사용', `
      <div style="display:flex;flex-direction:column;gap:1.6rem;">
        <div>
          <p style="font-size:1.2rem;color:var(--krds-light-color-text-subtle);margin-bottom:0.6rem;">3개 / 2번째 활성</p>
          <div class="yds-carousel__pagination">
            ${renderBullets({ count: 3, active: 2 })}
          </div>
        </div>
        <div>
          <p style="font-size:1.2rem;color:var(--krds-light-color-text-subtle);margin-bottom:0.6rem;">5개 / 3번째 활성</p>
          <div class="yds-carousel__pagination">
            ${renderBullets({ count: 5, active: 3 })}
          </div>
        </div>
        <div>
          <p style="font-size:1.2rem;color:var(--krds-light-color-text-subtle);margin-bottom:0.6rem;">8개 / 1번째 활성</p>
          <div class="yds-carousel__pagination">
            ${renderBullets({ count: 8, active: 1 })}
          </div>
        </div>
      </div>
    `)}
    ${section('분수형 (Fraction) — 독립 사용', `
      <div style="display:flex;flex-direction:column;gap:1.6rem;">
        <div>
          <p style="font-size:1.2rem;color:var(--krds-light-color-text-subtle);margin-bottom:0.6rem;">현재 / 전체</p>
          <div class="yds-carousel__pagination yds-carousel__pagination--fraction">
            <span class="yds-carousel__pagination-current">2</span>
            /
            <span class="yds-carousel__pagination-total">10</span>
          </div>
        </div>
      </div>
    `)}
  </div>`,
};

/* ─── 인디케이터 조합 ───────────────────────── */

export const 인디케이터 = {
  name: '인디케이터 조합 (Indicator)',
  parameters: { controls: { disable: true } },
  render: () => {
    const args = { bulletCount: 5, activeBullet: 2, currentPage: 2, totalPages: 10 };

    return `<div style="padding:2.4rem;">
      ${section('불릿 + 재생/멈춤 + 이전/다음 (가운데 정렬)', renderIndicator({
        ...args, paginationType: 'bullet',
        showController: true, isPlaying: true,
        showNavigation: true, showMore: false,
        prevDisabled: false, nextDisabled: false, centered: true,
      }))}
      ${section('분수 + 재생/멈춤 + 이전/다음 (가운데 정렬)', renderIndicator({
        ...args, paginationType: 'fraction',
        showController: true, isPlaying: true,
        showNavigation: true, showMore: false,
        prevDisabled: false, nextDisabled: false, centered: true,
      }))}
      ${section('불릿 + 이전/다음/더보기 (우측 정렬)', renderIndicator({
        ...args, paginationType: 'bullet',
        showController: false, isPlaying: false,
        showNavigation: true, showMore: true,
        prevDisabled: false, nextDisabled: false, centered: false,
      }))}
      ${section('불릿만 (가운데)', renderIndicator({
        ...args, paginationType: 'bullet',
        showController: false, isPlaying: false,
        showNavigation: false, showMore: false,
        prevDisabled: false, nextDisabled: false, centered: true,
      }))}
    </div>`;
  },
};

/* ─── 비활성 상태 ───────────────────────────── */

export const 비활성상태 = {
  name: '비활성 상태 (Disabled)',
  parameters: { controls: { disable: true } },
  render: () => {
    const args = { bulletCount: 5, activeBullet: 1, currentPage: 1, totalPages: 5 };
    return `<div style="padding:2.4rem;">
      ${section('이전 비활성 (첫 번째 슬라이드)', renderIndicator({
        ...args, paginationType: 'bullet',
        showController: false, isPlaying: false,
        showNavigation: true, showMore: false,
        prevDisabled: true, nextDisabled: false, centered: true,
      }))}
      ${section('다음 비활성 (마지막 슬라이드)', renderIndicator({
        ...args, paginationType: 'bullet',
        bulletCount: 5, activeBullet: 5,
        currentPage: 5,
        showController: false, isPlaying: false,
        showNavigation: true, showMore: false,
        prevDisabled: false, nextDisabled: true, centered: true,
      }))}
    </div>`;
  },
};

/* ─── 재생/정지 전환 ────────────────────────── */

export const 재생정지 = {
  name: '재생/정지 전환 (Play/Stop)',
  parameters: { controls: { disable: true } },
  render: () => {
    const args = { bulletCount: 5, activeBullet: 2, currentPage: 2, totalPages: 5 };
    return `<div style="padding:2.4rem;">
      ${section('재생 중 (멈춤 버튼 표시)', renderIndicator({
        ...args, paginationType: 'bullet',
        showController: true, isPlaying: true,
        showNavigation: true, showMore: false,
        prevDisabled: false, nextDisabled: false, centered: true,
      }))}
      ${section('정지 중 (재생 버튼 표시)', renderIndicator({
        ...args, paginationType: 'bullet',
        showController: true, isPlaying: false,
        showNavigation: true, showMore: false,
        prevDisabled: false, nextDisabled: false, centered: true,
      }))}
    </div>`;
  },
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const baseArgs = { bulletCount: 5, activeBullet: 2, currentPage: 2, totalPages: 10 };

    return `<div style="padding:2.4rem;">
      ${section('개별 버튼', `
        <div style="display:flex;gap:1.2rem;align-items:center;flex-wrap:wrap;">
          <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--prev"><span class="yds-sr-only">이전</span></button>
          <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--next"><span class="yds-sr-only">다음</span></button>
          <button type="button" class="yds-carousel__play-btn"><span class="yds-sr-only">재생</span></button>
          <button type="button" class="yds-carousel__stop-btn"><span class="yds-sr-only">멈춤</span></button>
          <a href="#" class="yds-carousel__more-btn"><span class="yds-sr-only">더 보기</span></a>
          <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--prev yds-carousel__move-btn--disabled" aria-disabled="true"><span class="yds-sr-only">이전(비활성)</span></button>
          <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--next yds-carousel__move-btn--disabled" aria-disabled="true"><span class="yds-sr-only">다음(비활성)</span></button>
        </div>
      `)}
      ${section('인디케이터 — 불릿 + 재생 + 이전/다음', renderIndicator({
        ...baseArgs, paginationType: 'bullet',
        showController: true, isPlaying: true,
        showNavigation: true, showMore: false,
        prevDisabled: false, nextDisabled: false, centered: true,
      }))}
      ${section('인디케이터 — 분수 + 재생 + 이전/다음', renderIndicator({
        ...baseArgs, paginationType: 'fraction',
        showController: true, isPlaying: true,
        showNavigation: true, showMore: false,
        prevDisabled: false, nextDisabled: false, centered: true,
      }))}
      ${section('인디케이터 — 불릿 + 이전/다음/더보기 (우측 정렬)', renderIndicator({
        ...baseArgs, paginationType: 'bullet',
        showController: false, isPlaying: false,
        showNavigation: true, showMore: true,
        prevDisabled: false, nextDisabled: false, centered: false,
      }))}
      ${section('인디케이터 — 불릿만', renderIndicator({
        ...baseArgs, paginationType: 'bullet',
        showController: false, isPlaying: false,
        showNavigation: false, showMore: false,
        prevDisabled: false, nextDisabled: false, centered: true,
      }))}
    </div>`;
  },
};
