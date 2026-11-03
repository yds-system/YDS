import '../layout/layout.css';
import '../button/button.css';
import '../icon/icon.css';
import { initMobileGnb } from '../main-menu/gnb-init.js';

export default {
  title: '컴포넌트/아이덴티티/헤더',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    siteName: {
      control: { type: 'text' },
      description: '사이트명 (로고 대체 텍스트)',
      table: { category: '내용' },
    },
    showLogin: {
      control: { type: 'boolean' },
      description: '로그인 버튼 표시 여부 (false면 나의GOV 버튼)',
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

function renderHeader({ siteName = 'KRDS', showLogin = true }) {
  const loginBtn = showLogin
    ? `<a href="#" class="ds-header__action-btn ds-header__action-btn--login">로그인</a>`
    : `<button type="button" class="ds-header__action-btn ds-header__action-btn--mypage">나의GOV</button>`;

  return `<header id="ds-header">
  <div class="ds-header__inner">
    <div class="ds-header__container">
      <div class="ds-container">
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
  </div>
  ${renderMobileGnb()}
</header>`;
}

const play = async ({ canvasElement }) => initMobileGnb(canvasElement);

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => renderHeader(args),
  play,
};

/* ─── 로그인 ────────────────────────────────── */

export const 로그인 = {
  name: '로그인',
  args: { showLogin: true },
  parameters: { controls: { disable: true } },
  render: (args) => renderHeader(args),
  play,
};

/* ─── 마이페이지 ────────────────────────────── */

export const 마이페이지 = {
  name: '마이페이지',
  args: { showLogin: false },
  parameters: { controls: { disable: true } },
  render: (args) => renderHeader(args),
  play,
};
