import '../layout/layout.css';
import '../button/button.css';
import '../icon/icon.css';
import { initPcGnb, initMobileGnb } from './gnb-init.js';

export default {
  title: 'Components/메인 메뉴',
  parameters: { layout: 'fullscreen' },
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
  <div class="ds-container">
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

  return `
<div id="mobile-nav" class="ds-main-menu-mobile ds-main-menu-mobile--open"
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
          <i class="ds-icon ds-ico-modal-close" aria-hidden="true"></i>
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

/* ─── PC GNB ────────────────────────────────── */

export const PC_GNB = {
  name: 'PC GNB',
  globals: { viewport: 'desktop' },
  render: () => `
    <div id="ds-header">
      ${renderPcGnb()}
    </div>`,
  play: async ({ canvasElement }) => initPcGnb(canvasElement),
};

/* ─── 모바일 GNB ────────────────────────────── */

export const 모바일_GNB = {
  name: '모바일 GNB',
  globals: { viewport: 'iphone6' },
  render: () => renderMobileGnb(),
  play: async ({ canvasElement }) => {
    /* 모바일 GNB는 헤더의 allBtn이 없으므로 직접 1depth 초기화만 */
    const mobileNav = canvasElement.querySelector('#mobile-nav');
    if (!mobileNav) return;

    const mainTriggers = Array.from(mobileNav.querySelectorAll('.ds-main-menu-mobile__nav-list .ds-main-menu-mobile__trigger'));
    const submenuWrap  = mobileNav.querySelector('.ds-main-menu-mobile__sub-panel');

    mainTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const idx    = trigger.dataset.index;
        const target = mobileNav.querySelector(`#mGnb-anchor${idx}`);
        if (!target || !submenuWrap) return;

        mainTriggers.forEach(t => t.classList.remove('ds-main-menu-mobile__trigger--open'));
        trigger.classList.add('ds-main-menu-mobile__trigger--open');
        submenuWrap.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      });
    });

    if (mainTriggers.length) mainTriggers[0].classList.add('ds-main-menu-mobile__trigger--open');
  },
};
