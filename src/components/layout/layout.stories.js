import './layout.css';

export default {
  title: '패턴/기본 레이아웃',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    siteName: {
      control: { type: 'text' },
      description: '사이트명 (로고 대체 텍스트)',
      table: { category: '내용' },
    },
    showLogin: {
      control: { type: 'boolean' },
      description: '로그인 버튼 표시 여부',
      table: { category: '상태' },
    },
  },
  args: {
    siteName: 'KRDS - Korea Design System',
    showLogin: true,
  },
};

/* ─── 메뉴 데이터 ────────────────────────────── */

const MENU = [
  {
    label: '서비스 소개',
    items: [
      { label: '기관 소개', sub: ['개요', '비전 및 목표', '연혁', '조직도'] },
      { label: '정책 안내', sub: ['주요 정책', '법령 정보', '고시·공고'] },
      { label: '바로가기', link: true },
    ],
  },
  {
    label: '민원 신청',
    items: [
      { label: '온라인 신청', sub: ['신청하기', '신청 현황 조회', '처리 결과 확인'] },
      { label: '오프라인 신청', sub: ['방문 신청 안내', '우편 신청 안내'] },
      { label: '신청 서식', sub: ['서식 다운로드', '작성 가이드'] },
    ],
  },
  {
    label: '정보 마당',
    items: [
      { label: '공지사항', sub: ['전체', '중요 공지'] },
      { label: '보도자료', sub: ['전체', '최신'] },
      { label: '자료실', sub: ['정책 자료', '통계 자료', '연구 보고서'] },
    ],
  },
  {
    label: '고객 지원',
    items: [
      { label: '자주 묻는 질문', sub: ['전체', '서비스 이용', '신청 방법'] },
      { label: '1:1 문의', sub: ['문의하기', '처리 현황'] },
    ],
  },
  {
    label: '사이트맵',
    link: true,
  },
];

/* ─── HTML 생성 헬퍼 ─────────────────────────── */

function renderSkipLink() {
  return `<div id="ds-skip-link">
  <a href="#main-content">본문 바로가기</a>
</div>`;
}

function renderPcGnb() {
  const items = MENU.map((m, mi) => {
    if (m.link) {
      return `<li>
        <a href="#" class="ds-main-menu__trigger ds-main-menu__trigger--link" data-trigger="gnb">${m.label}</a>
      </li>`;
    }

    const subList = m.items.map((sub, si) => {
      if (sub.link) {
        return `<li>
          <a href="#" class="ds-main-menu__sub-trigger ds-main-menu__sub-trigger--link" data-trigger="gnb">${sub.label}</a>
        </li>`;
      }
      return `<li>
        <button type="button" class="ds-main-menu__sub-trigger" data-trigger="gnb"
                aria-expanded="false" aria-controls="ds-gnb-sub-${mi}-${si}">
          ${sub.label}
        </button>
        <div class="ds-main-menu__sub-list" id="ds-gnb-sub-${mi}-${si}" role="region" aria-label="${sub.label}">
          <div class="ds-main-menu__sub-content">
            <h2 class="ds-main-menu__sub-title">${sub.label}</h2>
            <ul>
              ${sub.sub.map(s => `<li><a href="#" class="ds-main-menu__sub-link">${s}</a></li>`).join('')}
            </ul>
          </div>
        </div>
      </li>`;
    }).join('');

    return `<li>
      <button type="button" class="ds-main-menu__trigger" data-trigger="gnb"
              aria-expanded="false" aria-haspopup="true"
              aria-controls="ds-gnb-panel-${mi}">
        ${m.label}
      </button>
      <div class="ds-main-menu__dropdown" id="ds-gnb-panel-${mi}" role="group" aria-label="${m.label}">
        <div class="ds-main-menu__panel" data-has-submenu="true">
          <ul>${subList}</ul>
        </div>
      </div>
    </li>`;
  }).join('');

  return `<nav class="ds-main-menu" aria-label="주요 메뉴">
  <div class="inner">
    <ul class="ds-main-menu__list" role="menubar">${items}</ul>
  </div>
</nav>
<div class="ds-main-menu__backdrop" aria-hidden="true"></div>`;
}

function renderMobileGnb() {
  const mainItems = MENU.map((m, mi) =>
    `<li>
      <a href="#mGnb-anchor${mi}" class="ds-main-menu-mobile__trigger"
         data-index="${mi}">${m.label}</a>
    </li>`
  ).join('');

  const subItems = MENU.map((m, mi) => {
    const links = m.link
      ? `<li><a href="#" class="ds-main-menu-mobile__sub-trigger">${m.label}</a></li>`
      : m.items.map(sub =>
          `<li><a href="#" class="ds-main-menu-mobile__sub-trigger">${sub.label}</a></li>`
        ).join('');

    return `<div class="ds-main-menu-mobile__sub-list" id="mGnb-anchor${mi}" aria-labelledby="mGnb-hd${mi}">
      <h2 class="ds-main-menu-mobile__sub-title" id="mGnb-hd${mi}">${m.label}</h2>
      <ul>${links}</ul>
    </div>`;
  }).join('');

  return `<div id="mobile-nav" class="ds-main-menu-mobile"
     aria-modal="true" role="dialog" aria-label="전체 메뉴">
  <div class="ds-main-menu-mobile__panel">
    <div class="ds-main-menu-mobile__header">
      <div class="ds-main-menu-mobile__utils">
        <ul class="ds-utility-list ds-utility-list--start">
          <li><button type="button" class="ds-btn ds-btn--xsmall ds-btn--text">로그인</button></li>
          <li><button type="button" class="ds-btn ds-btn--xsmall ds-btn--text">회원가입</button></li>
        </ul>
      </div>
      <div class="ds-main-menu-mobile__login">
        <button type="button" class="ds-btn ds-btn--large ds-btn--text">로그인을 해주세요</button>
      </div>
      <div class="ds-main-menu-mobile__service-menu">
        <a href="#" class="ds-main-menu-mobile__service-link">나의GOV</a>
        <a href="#" class="ds-main-menu-mobile__service-link">공지사항</a>
        <a href="#" class="ds-main-menu-mobile__service-link">자료실</a>
        <a href="#" class="ds-main-menu-mobile__service-link">검색</a>
      </div>
      <button type="button" class="ds-btn ds-btn--medium ds-btn--icon" id="close-nav"
              aria-label="전체 메뉴 닫기">
        <span class="ico-close" aria-hidden="true"></span>
      </button>
    </div>
    <div class="ds-main-menu-mobile__body">
      <div class="ds-main-menu-mobile__menu">
        <div class="ds-main-menu-mobile__nav-list">
          <ul role="tablist" aria-label="대메뉴">${mainItems}</ul>
        </div>
        <div class="ds-main-menu-mobile__sub-panel" aria-live="polite">${subItems}</div>
      </div>
      <div class="ds-main-menu-mobile__bottom">
        <a href="#" class="ds-btn ds-btn--medium ds-btn--text">사이트맵</a>
      </div>
    </div>
  </div>
</div>`;
}

function renderHeader({ siteName = 'KRDS', showLogin = true }) {
  const loginBtn = showLogin
    ? `<a href="#" class="ds-header__action-btn ds-header__action-btn--login">로그인</a>`
    : `<button type="button" class="ds-header__action-btn ds-header__action-btn--mypage">나의GOV</button>`;

  return `<header id="ds-header">
  <div class="ds-header__inner">
    <div class="ds-header__container">
      <div class="inner">
        <div class="ds-header__utility" aria-label="부가 메뉴">
          <ul class="ds-utility-list">
            <li><a href="#" class="ds-btn ds-btn--small ds-btn--text">공지사항</a></li>
            <li><a href="#" class="ds-btn ds-btn--small ds-btn--text">자료실</a></li>
            <li><a href="#" class="ds-btn ds-btn--small ds-btn--text">사이트맵</a></li>
          </ul>
        </div>
        <div class="ds-header__branding">
          <h1 class="ds-header__logo">
            <a href="#">
              <span class="sr-only">${siteName}</span>
            </a>
          </h1>
          <div class="ds-header__actions">
            <button type="button" class="ds-header__action-btn ds-header__action-btn--search" title="통합검색">통합검색</button>
            ${loginBtn}
            <button type="button" class="ds-header__action-btn ds-header__action-btn--join">회원가입</button>
            <button type="button" class="ds-header__action-btn ds-header__action-btn--all-menu"
                    aria-controls="mobile-nav"
                    aria-expanded="false"
                    aria-label="전체 메뉴 열기">전체메뉴</button>
          </div>
        </div>
      </div>
    </div>
    ${renderPcGnb()}
  </div>
  ${renderMobileGnb()}
</header>`;
}

function renderFooter() {
  return `<footer id="ds-footer">
  <div class="ds-footer__quick">
    <div class="inner">
      <button type="button" class="ds-footer__quick-link">관련 사이트 1</button>
      <button type="button" class="ds-footer__quick-link">관련 사이트 2</button>
      <button type="button" class="ds-footer__quick-link">관련 사이트 3</button>
      <button type="button" class="ds-footer__quick-link">관련 사이트 4</button>
    </div>
  </div>
  <div class="inner">
    <div class="ds-footer__logo">
      <span class="sr-only">KRDS - Korea Design System</span>
    </div>
    <div class="ds-footer__content">
      <div class="ds-footer__info">
        <p class="ds-footer__address">(00000) 서울특별시 종로구 세종대로 209 정부서울청사</p>
        <ul class="ds-footer__contact">
          <li>
            <strong class="strong">대표전화 1234-5678</strong>
            <span class="span">(평일 09:00 ~ 18:00)</span>
          </li>
        </ul>
      </div>
      <div class="ds-footer__links">
        <div class="ds-footer__shortcuts">
          <a href="#" class="ds-btn ds-btn--medium ds-btn--text">찾아오시는 길</a>
          <a href="#" class="ds-btn ds-btn--medium ds-btn--text">이용안내</a>
        </div>
        <div class="ds-footer__sns">
          <a href="#" class="ds-btn ds-btn--xlarge ds-btn--icon ds-btn--border" target="_blank" title="새 창 열기">
            <span class="sr-only">인스타그램</span>
          </a>
          <a href="#" class="ds-btn ds-btn--xlarge ds-btn--icon ds-btn--border" target="_blank" title="새 창 열기">
            <span class="sr-only">유튜브</span>
          </a>
          <a href="#" class="ds-btn ds-btn--xlarge ds-btn--icon ds-btn--border" target="_blank" title="새 창 열기">
            <span class="sr-only">X</span>
          </a>
        </div>
      </div>
    </div>
    <div class="ds-footer__bottom">
      <div class="ds-footer__bottom-text">
        <div class="ds-footer__menu">
          <a href="#" class="ds-footer__menu-link ds-footer__menu-link--emphasis">개인정보처리방침</a>
          <a href="#" class="ds-footer__menu-link">저작권 정책</a>
          <a href="#" class="ds-footer__menu-link">웹 접근성 안내</a>
        </div>
        <p class="ds-footer__copyright">© 2025 KRDS. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>`;
}

/* ─── JS 초기화 ─────────────────────────────── */

function initLayout(canvasElement) {
  /* ── PC GNB ── */
  initPcGnb(canvasElement);
  /* ── 모바일 GNB ── */
  initMobileGnb(canvasElement);
}

/* PC GNB */
function initPcGnb(root) {
  const triggers  = Array.from(root.querySelectorAll('.ds-main-menu .ds-main-menu__trigger:not(.ds-main-menu__trigger--link)'));
  const backdrop  = root.querySelector('.ds-main-menu__backdrop');
  let currentOpen = null;

  function openMenu(trigger) {
    if (currentOpen && currentOpen !== trigger) closeMenu(currentOpen);
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = panelId ? root.querySelector(`#${panelId}`) : null;
    if (!panel) return;

    trigger.classList.add('ds-main-menu__trigger--open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.classList.add('ds-main-menu__dropdown--open');
    if (backdrop) backdrop.classList.add('ds-main-menu__backdrop--open');

    /* 첫 번째 sub-trigger 활성화 */
    const firstSub = panel.querySelector('.ds-main-menu__sub-trigger');
    if (firstSub) activateSub(panel, firstSub);
    currentOpen = trigger;
  }

  function closeMenu(trigger) {
    if (!trigger) return;
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = panelId ? root.querySelector(`#${panelId}`) : null;
    trigger.classList.remove('ds-main-menu__trigger--open');
    trigger.setAttribute('aria-expanded', 'false');
    if (panel) {
      panel.classList.remove('ds-main-menu__dropdown--open');
      panel.querySelectorAll('.ds-main-menu__sub-trigger').forEach(s => deactivateSub(s));
      panel.querySelectorAll('.ds-main-menu__sub-list').forEach(l => l.classList.remove('ds-main-menu__sub-list--open'));
    }
    if (backdrop) backdrop.classList.remove('ds-main-menu__backdrop--open');
    currentOpen = null;
  }

  function activateSub(panel, subTrigger) {
    panel.querySelectorAll('.ds-main-menu__sub-trigger').forEach(s => {
      s.classList.remove('ds-main-menu__sub-trigger--open');
      s.setAttribute('aria-expanded', 'false');
    });
    panel.querySelectorAll('.ds-main-menu__sub-list').forEach(l => l.classList.remove('ds-main-menu__sub-list--open'));

    subTrigger.classList.add('ds-main-menu__sub-trigger--open');
    const subPanelId = subTrigger.getAttribute('aria-controls');
    const subPanel   = subPanelId ? root.querySelector(`#${subPanelId}`) : null;
    if (subPanel) {
      subPanel.classList.add('ds-main-menu__sub-list--open');
      subTrigger.setAttribute('aria-expanded', 'true');
    }
  }

  function deactivateSub(subTrigger) {
    subTrigger.classList.remove('ds-main-menu__sub-trigger--open');
    subTrigger.setAttribute('aria-expanded', 'false');
  }

  /* 클릭 이벤트 */
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (trigger.classList.contains('ds-main-menu__trigger--open')) {
        closeMenu(trigger);
      } else {
        openMenu(trigger);
      }
    });

    /* 키보드 이벤트 */
    trigger.addEventListener('keydown', (e) => {
      const idx = triggers.indexOf(trigger);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = triggers[(idx + 1) % triggers.length];
        next.focus();
        openMenu(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = triggers[(idx - 1 + triggers.length) % triggers.length];
        prev.focus();
        openMenu(prev);
      } else if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu(trigger);
        const panelId = trigger.getAttribute('aria-controls');
        const panel   = panelId ? root.querySelector(`#${panelId}`) : null;
        if (panel) {
          const firstSub = panel.querySelector('.ds-main-menu__sub-trigger');
          if (firstSub) firstSub.focus();
        }
      } else if (e.key === 'Escape') {
        closeMenu(trigger);
        trigger.focus();
      }
    });
  });

  /* 서브 트리거 키보드 */
  root.querySelectorAll('.ds-main-menu .ds-main-menu__sub-trigger:not(.ds-main-menu__sub-trigger--link)').forEach(sub => {
    sub.addEventListener('mouseenter', () => {
      const panel = sub.closest('.ds-main-menu__dropdown');
      if (panel && panel.classList.contains('ds-main-menu__dropdown--open')) activateSub(panel, sub);
    });

    sub.addEventListener('keydown', (e) => {
      const panel    = sub.closest('.ds-main-menu__dropdown');
      const allSubs  = panel ? Array.from(panel.querySelectorAll('.ds-main-menu__sub-trigger')) : [];
      const idx      = allSubs.indexOf(sub);
      const mainTrig = panel ? triggers.find(t => t.getAttribute('aria-controls') === panel.id) : null;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        allSubs[(idx + 1) % allSubs.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx === 0) { mainTrig?.focus(); }
        else { allSubs[idx - 1]?.focus(); }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu(mainTrig);
        mainTrig?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateSub(panel, sub);
      }
    });
  });

  /* 백드롭 클릭 */
  if (backdrop) backdrop.addEventListener('click', () => closeMenu(currentOpen));

  /* 외부 클릭 닫기 */
  document.addEventListener('click', (e) => {
    if (currentOpen && !e.target.closest('#ds-header')) closeMenu(currentOpen);
  });
}

/* 모바일 GNB */
function initMobileGnb(root) {
  const allBtn    = root.querySelector('.ds-header__action-btn.ds-header__action-btn--all-menu');
  const closeBtn  = root.querySelector('#close-nav');
  const mobileNav = root.querySelector('#mobile-nav');
  if (!mobileNav) return;

  function openNav() {
    mobileNav.classList.add('ds-main-menu-mobile--open', 'ds-main-menu-mobile--backdrop');
    if (allBtn) allBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeNav() {
    mobileNav.classList.remove('ds-main-menu-mobile--open', 'ds-main-menu-mobile--backdrop');
    if (allBtn) allBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    allBtn?.focus();
  }

  allBtn?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);

  /* Escape 키 닫기 */
  mobileNav.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* dim(::after) 클릭 닫기 */
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });

  /* 1depth 탭 클릭 → 해당 submenu 스크롤 */
  const mainTriggers = Array.from(mobileNav.querySelectorAll('.ds-main-menu-mobile__nav-list .ds-main-menu-mobile__trigger'));
  const submenuWrap  = mobileNav.querySelector('.ds-main-menu-mobile__sub-panel');

  mainTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const idx    = trigger.dataset.index;
      const target = mobileNav.querySelector(`#mGnb-anchor${idx}`);
      if (!target || !submenuWrap) return;

      /* active 클래스 갱신 */
      mainTriggers.forEach(t => t.classList.remove('ds-main-menu-mobile__trigger--open'));
      trigger.classList.add('ds-main-menu-mobile__trigger--open');

      /* ds-main-menu-mobile__sub-panel 기준 스크롤 */
      submenuWrap.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    });

    /* 키보드 화살표 탐색 */
    trigger.addEventListener('keydown', (e) => {
      const idx = mainTriggers.indexOf(trigger);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        mainTriggers[(idx + 1) % mainTriggers.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        mainTriggers[(idx - 1 + mainTriggers.length) % mainTriggers.length]?.focus();
      }
    });
  });

  /* 첫 번째 탭 자동 활성화 */
  if (mainTriggers.length) mainTriggers[0].classList.add('ds-main-menu-mobile__trigger--open');
}

const play = async ({ canvasElement }) => initLayout(canvasElement);

/* ─── 전체 레이아웃 ─────────────────────────── */

function renderLayout(args) {
  return `
${renderSkipLink()}
${renderHeader(args)}
<main id="main-content" tabindex="-1">
  <div class="inner" style="padding-top: 4rem; padding-bottom: 8rem; min-height: 40rem;">
    <h1 style="font-size: var(--krds-pc-font-size-heading-large);
               font-weight: var(--krds-font-weight-bold);
               color: var(--krds-light-color-text-basic);
               margin-bottom: 1.6rem;">
      페이지 제목
    </h1>
    <p style="color: var(--krds-light-color-text-subtle); font-size: var(--krds-pc-font-size-body-medium);">
      이 영역은 페이지 본문 콘텐츠 영역입니다.<br>
      헤더의 <strong>전체메뉴</strong> 버튼(모바일)이나 상단 GNB(PC)를 클릭해 보세요.
    </p>
  </div>
</main>
${renderFooter()}`;
}

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => renderLayout(args),
  play,
};

/* ─── 헤더 ──────────────────────────────────── */

export const 헤더 = {
  name: '헤더 (Header)',
  parameters: { controls: { disable: true } },
  render: () => `
    ${renderSkipLink()}
    ${renderHeader({ siteName: 'KRDS', showLogin: true })}
    <div class="inner" style="padding: 4rem 0; color: var(--krds-light-color-text-subtle);">
      ↑ 헤더 영역 — PC에서는 GNB가 표시됩니다.
    </div>`,
  play,
};

/* ─── 푸터 ──────────────────────────────────── */

export const 푸터 = {
  name: '푸터 (Footer)',
  parameters: { controls: { disable: true } },
  render: () => renderFooter(),
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (Full Layout)',
  parameters: { controls: { disable: true } },
  render: () => renderLayout({ siteName: 'KRDS', showLogin: true }),
  play,
};
