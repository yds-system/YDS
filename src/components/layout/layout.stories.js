import './layout.scss';
import '../button/button.scss';
import '../icon/icon.scss';
import { initPcGnb, initMobileGnb } from '../main-menu/gnb-init.js';

export default {
  title: 'Patterns/Basic Layout',
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
  return `<div id="yds-skip-link">
  <a href="#main-content">본문 바로가기</a>
</div>`;
}

function renderPcGnb() {
  const items = MENU.map((m, mi) => {
    if (m.link) {
      return `<li>
        <a href="#" class="yds-main-menu__trigger yds-main-menu__trigger--link" data-trigger="gnb">${m.label}</a>
      </li>`;
    }

    const subList = m.items.map((sub, si) => {
      if (sub.link) {
        return `<li>
          <a href="#" class="yds-main-menu__sub-trigger yds-main-menu__sub-trigger--link" data-trigger="gnb">${sub.label}</a>
        </li>`;
      }
      return `<li>
        <button type="button" class="yds-main-menu__sub-trigger" data-trigger="gnb"
                aria-expanded="false" aria-controls="yds-gnb-sub-${mi}-${si}">
          ${sub.label}
        </button>
        <div class="yds-main-menu__sub-list" id="yds-gnb-sub-${mi}-${si}" role="region" aria-label="${sub.label}">
          <div class="yds-main-menu__sub-content">
            <h2 class="yds-main-menu__sub-title">${sub.label}</h2>
            <ul>
              ${sub.sub.map(s => `<li><a href="#" class="yds-main-menu__sub-link">${s}</a></li>`).join('')}
            </ul>
          </div>
        </div>
      </li>`;
    }).join('');

    return `<li>
      <button type="button" class="yds-main-menu__trigger" data-trigger="gnb"
              aria-expanded="false" aria-haspopup="true"
              aria-controls="yds-gnb-panel-${mi}">
        ${m.label}
      </button>
      <div class="yds-main-menu__dropdown" id="yds-gnb-panel-${mi}" role="group" aria-label="${m.label}">
        <div class="yds-main-menu__panel" data-has-submenu="true">
          <ul>${subList}</ul>
        </div>
      </div>
    </li>`;
  }).join('');

  return `<nav class="yds-main-menu" aria-label="주요 메뉴">
  <div class="yds-container">
    <ul class="yds-main-menu__list" role="menubar">${items}</ul>
  </div>
</nav>
<div class="yds-main-menu__backdrop" aria-hidden="true"></div>`;
}

function renderMobileGnb() {
  const mainItems = MENU.map((m, mi) =>
    `<li>
      <a href="#mGnb-anchor${mi}" class="yds-main-menu-mobile__trigger"
         data-index="${mi}">${m.label}</a>
    </li>`
  ).join('');

  const subItems = MENU.map((m, mi) => {
    const links = m.link
      ? `<li><a href="#" class="yds-main-menu-mobile__sub-trigger">${m.label}</a></li>`
      : m.items.map(sub =>
          `<li><a href="#" class="yds-main-menu-mobile__sub-trigger">${sub.label}</a></li>`
        ).join('');

    return `<div class="yds-main-menu-mobile__sub-list" id="mGnb-anchor${mi}" aria-labelledby="mGnb-hd${mi}">
      <h2 class="yds-main-menu-mobile__sub-title" id="mGnb-hd${mi}">${m.label}</h2>
      <ul>${links}</ul>
    </div>`;
  }).join('');

  return `<div id="mobile-nav" class="yds-main-menu-mobile"
     aria-modal="true" role="dialog" aria-label="전체 메뉴">
  <div class="yds-main-menu-mobile__panel">
    <div class="yds-main-menu-mobile__header">
      <div class="yds-main-menu-mobile__utils">
        <ul class="yds-utility-list yds-utility-list--start">
          <li><button type="button" class="yds-btn yds-btn--xsmall yds-btn--text">로그인</button></li>
          <li><button type="button" class="yds-btn yds-btn--xsmall yds-btn--text">회원가입</button></li>
        </ul>
      </div>
      <div class="yds-main-menu-mobile__login">
        <button type="button" class="yds-btn yds-btn--large yds-btn--text">로그인을 해주세요</button>
      </div>
      <div class="yds-main-menu-mobile__service-menu">
        <a href="#" class="yds-main-menu-mobile__service-link">나의GOV</a>
        <a href="#" class="yds-main-menu-mobile__service-link">공지사항</a>
        <a href="#" class="yds-main-menu-mobile__service-link">자료실</a>
        <a href="#" class="yds-main-menu-mobile__service-link">검색</a>
      </div>
      <button type="button" class="yds-btn yds-btn--medium yds-btn--icon" id="close-nav"
              aria-label="전체 메뉴 닫기">
        <i class="yds-icon yds-ico-modal-close" aria-hidden="true"></i>
      </button>
    </div>
    <div class="yds-main-menu-mobile__body">
      <div class="yds-main-menu-mobile__menu">
        <div class="yds-main-menu-mobile__nav-list">
          <ul role="tablist" aria-label="대메뉴">${mainItems}</ul>
        </div>
        <div class="yds-main-menu-mobile__sub-panel" aria-live="polite">${subItems}</div>
      </div>
      <div class="yds-main-menu-mobile__bottom">
        <a href="#" class="yds-btn yds-btn--medium yds-btn--text">사이트맵</a>
      </div>
    </div>
  </div>
</div>`;
}

function renderHeader({ siteName = 'KRDS', showLogin = true }) {
  const loginBtn = showLogin
    ? `<a href="#" class="yds-header__action-btn yds-header__action-btn--login">로그인</a>`
    : `<button type="button" class="yds-header__action-btn yds-header__action-btn--mypage">나의GOV</button>`;

  return `<header id="yds-header">
  <div class="yds-header__inner">
    <div class="yds-header__container">
      <div class="yds-container">
        <div class="yds-header__utility" aria-label="부가 메뉴">
          <ul class="yds-utility-list">
            <li><a href="#" class="yds-btn yds-btn--small yds-btn--text">공지사항</a></li>
            <li><a href="#" class="yds-btn yds-btn--small yds-btn--text">자료실</a></li>
            <li><a href="#" class="yds-btn yds-btn--small yds-btn--text">사이트맵</a></li>
          </ul>
        </div>
        <div class="yds-header__branding">
          <h1 class="yds-header__logo">
            <a href="#">
              <span class="yds-sr-only">${siteName}</span>
            </a>
          </h1>
          <div class="yds-header__actions">
            <button type="button" class="yds-header__action-btn yds-header__action-btn--search" title="통합검색">통합검색</button>
            ${loginBtn}
            <button type="button" class="yds-header__action-btn yds-header__action-btn--join">회원가입</button>
            <button type="button" class="yds-header__action-btn yds-header__action-btn--all-menu"
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
  return `<footer id="yds-footer">
  <div class="yds-footer__quick">
    <div class="yds-container">
      <button type="button" class="yds-footer__quick-link">관련 사이트 1</button>
      <button type="button" class="yds-footer__quick-link">관련 사이트 2</button>
      <button type="button" class="yds-footer__quick-link">관련 사이트 3</button>
      <button type="button" class="yds-footer__quick-link">관련 사이트 4</button>
    </div>
  </div>
  <div class="yds-container">
    <div class="yds-footer__logo">
      <span class="yds-sr-only">KRDS - Korea Design System</span>
    </div>
    <div class="yds-footer__content">
      <div class="yds-footer__info">
        <p class="yds-footer__address">(00000) 서울특별시 종로구 세종대로 209 정부서울청사</p>
        <ul class="yds-footer__contact">
          <li>
            <strong>대표전화 1234-5678</strong>
            <span>(평일 09:00 ~ 18:00)</span>
          </li>
        </ul>
      </div>
      <div class="yds-footer__links">
        <div class="yds-footer__shortcuts">
          <a href="#" class="yds-btn yds-btn--medium yds-btn--text">찾아오시는 길</a>
          <a href="#" class="yds-btn yds-btn--medium yds-btn--text">이용안내</a>
        </div>
        <div class="yds-footer__sns">
          <a href="#" class="yds-btn yds-btn--xlarge yds-btn--icon yds-btn--border" target="_blank" title="새 창 열기">
            <span class="yds-sr-only">인스타그램</span>
          </a>
          <a href="#" class="yds-btn yds-btn--xlarge yds-btn--icon yds-btn--border" target="_blank" title="새 창 열기">
            <span class="yds-sr-only">유튜브</span>
          </a>
          <a href="#" class="yds-btn yds-btn--xlarge yds-btn--icon yds-btn--border" target="_blank" title="새 창 열기">
            <span class="yds-sr-only">X</span>
          </a>
        </div>
      </div>
    </div>
    <div class="yds-footer__bottom">
      <div class="yds-footer__bottom-text">
        <div class="yds-footer__menu">
          <a href="#" class="yds-footer__menu-link yds-footer__menu-link--emphasis">개인정보처리방침</a>
          <a href="#" class="yds-footer__menu-link">저작권 정책</a>
          <a href="#" class="yds-footer__menu-link">웹 접근성 안내</a>
        </div>
        <p class="yds-footer__copyright">© 2025 KRDS. All rights reserved.</p>
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

const play = async ({ canvasElement }) => initLayout(canvasElement);

/* ─── 전체 레이아웃 ─────────────────────────── */

function renderLayout(args) {
  return `
${renderSkipLink()}
${renderHeader(args)}
<main id="main-content" tabindex="-1">
  <div class="yds-container" style="padding-top: 4rem; padding-bottom: 8rem; min-height: 40rem;">
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

