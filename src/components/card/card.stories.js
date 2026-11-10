import './card.css';
import '../thumbnail/thumbnail.css';

export default {
  title: 'Components/Card',
  argTypes: {
    title:      { control: 'text',    description: '카드 제목',                        table: { category: '내용' } },
    meta:       { control: 'text',    description: '메타 정보 (카테고리·날짜 등)',      table: { category: '내용' } },
    desc:       { control: 'text',    description: '설명 텍스트',                      table: { category: '내용' } },
    hasMedia:   { control: 'boolean', description: '이미지 영역 표시 여부',             table: { category: '구성' } },
    ratio:      { control: { type: 'select' }, options: ['16x9', '4x3', '1x1'], description: '이미지 비율', table: { category: '구성' } },
    hasActions: { control: 'boolean', description: '액션 버튼 영역 표시 여부',          table: { category: '구성' } },
    horizontal: { control: 'boolean', description: '가로형 (--horizontal)',             table: { category: '변형' } },
    border:     { control: 'boolean', description: '테두리형 — 그림자 없음 (--border)', table: { category: '변형' } },
    link:       { control: 'boolean', description: '링크 카드 — 제목 링크가 카드 전체 클릭 영역 (--link)', table: { category: '변형' } },
  },
  args: {
    title:      '카드 제목이 들어갑니다',
    meta:       '공지사항 · 2026.11.05',
    desc:       '카드 본문 설명이 들어갑니다. 두 줄 정도의 짧은 요약 텍스트를 사용합니다.',
    hasMedia:   true,
    ratio:      '16x9',
    hasActions: false,
    horizontal: false,
    border:     false,
    link:       false,
  },
};

/* ─── 헬퍼 ──────────────────────────────────── */

const ph = (label = '', bg = '#cdd1d5') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect fill="${bg}" width="800" height="450"/><text fill="#6d7882" font-size="24" font-family="sans-serif" x="50%" y="50%" dy=".35em" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

function card({ title, meta, desc, hasMedia, ratio = '16x9', hasActions, horizontal, border, link, imgBg, imgLabel }) {
  const mods = [
    horizontal && 'ds-card--horizontal',
    border     && 'ds-card--border',
    link       && 'ds-card--link',
  ].filter(Boolean).join(' ');
  const cls = mods ? `ds-card ${mods}` : 'ds-card';
  const titleEl = link
    ? `<h3 class="ds-card__title"><a href="#">${title}</a></h3>`
    : `<h3 class="ds-card__title">${title}</h3>`;

  return `
    <article class="${cls}">
      ${hasMedia ? `
      <div class="ds-card__media">
        <div class="ds-thumbnail ds-thumbnail--${ratio}">
          <img class="ds-thumbnail__img" src="${ph(imgLabel || '', imgBg || '#cdd1d5')}" alt="${imgLabel || '카드 이미지'}">
        </div>
      </div>` : ''}
      <div class="ds-card__body">
        ${meta   ? `<p class="ds-card__meta">${meta}</p>` : ''}
        ${titleEl}
        ${desc   ? `<p class="ds-card__desc">${desc}</p>` : ''}
        ${hasActions ? `
        <div class="ds-card__actions">
          <button type="button" style="padding:0.6rem 1.4rem; border-radius:0.6rem; border:1px solid #256ef4; color:#256ef4; background:transparent; font-size:1.4rem; cursor:pointer;">자세히 보기</button>
        </div>` : ''}
      </div>
    </article>`;
}

const wrap = (html, maxWidth = '96rem') =>
  `<div style="padding:1.6rem; max-width:${maxWidth};">${html}</div>`;

const section = (title, html) => `
  <div style="margin-bottom:3.2rem;">
    <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:1.2rem;">${title}</p>
    ${html}
  </div>`;

/* ─── Playground ───────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(card(args), '36rem'),
};

/* ─── 가로형 ─────────────────────────────────  */

export const 가로형 = {
  name: '가로형 (Horizontal)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${section('기본 (세로형)',
      card({ title: '세로형 카드', meta: '공지 · 2026.11.05', desc: '기본 세로 방향 카드입니다.', hasMedia: true, ratio: '16x9', imgBg: '#b1cefb' })
    )}
    ${section('가로형 (--horizontal)',
      card({ title: '가로형 카드', meta: '공지 · 2026.11.05', desc: '이미지가 왼쪽에 고정되고 본문이 오른쪽에 배치됩니다.', hasMedia: true, ratio: '4x3', horizontal: true, imgBg: '#a9dab4' })
    )}
  `, '64rem'),
};

/* ─── 테두리형 ──────────────────────────────── */

export const 테두리형 = {
  name: '테두리형 (Border)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:2.4rem;">
      ${card({ title: '기본 그림자형', meta: '카테고리', desc: 'shadow-s 적용, hover 시 shadow-m으로 전환됩니다.', hasMedia: true, ratio: '16x9', imgBg: '#cdd1d5' })}
      ${card({ title: '테두리형', meta: '카테고리', desc: '그림자 없이 테두리로 구분합니다. hover 시 테두리 색이 진해집니다.', hasMedia: true, ratio: '16x9', border: true, imgBg: '#e6e8ea' })}
    </div>
  `, '72rem'),
};

/* ─── 링크 카드 ─────────────────────────────── */

export const 링크카드 = {
  name: '링크 카드 (Link)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:2.4rem;">
      ${card({ title: '링크 카드 1', meta: '공지사항', desc: '제목의 a 태그가 카드 전체 클릭 영역으로 확장됩니다.', hasMedia: true, ratio: '16x9', link: true, imgBg: '#b1cefb', imgLabel: '클릭 가능' })}
      ${card({ title: '링크 카드 2', meta: '자료실', desc: '카드 어디를 클릭해도 링크로 이동합니다.', hasMedia: true, ratio: '16x9', link: true, imgBg: '#a9dab4', imgLabel: '클릭 가능' })}
      ${card({ title: '링크 카드 3', meta: '뉴스', desc: '접근성을 위해 제목 텍스트를 가진 a 태그를 사용합니다.', hasMedia: true, ratio: '16x9', link: true, imgBg: '#ffc95c', imgLabel: '클릭 가능' })}
    </div>
  `, '96rem'),
};

/* ─── 카드 목록 ─────────────────────────────── */

export const 카드목록 = {
  name: '카드 목록 (List)',
  parameters: { controls: { disable: true } },
  render: () => {
    const items = [
      { title: '공공 서비스 디자인 가이드', meta: '공지사항 · 2026.11.01', desc: '공공기관 웹사이트의 접근성과 사용성을 높이기 위한 디자인 가이드입니다.', imgBg: '#b1cefb' },
      { title: '2026 디지털 혁신 보고서', meta: '자료실 · 2026.10.28', desc: '디지털 정부 혁신 현황과 주요 성과를 정리한 연간 보고서입니다.', imgBg: '#a9dab4' },
      { title: '오픈 데이터 활용 사례', meta: '뉴스 · 2026.10.15', desc: '공공 데이터를 활용한 민간 서비스 개발 우수 사례를 소개합니다.', imgBg: '#ffc95c' },
      { title: '국민 참여 디자인 워크숍', meta: '행사 · 2026.09.30', desc: '국민과 함께 만들어가는 공공 서비스 UX 개선 워크숍 결과를 공유합니다.', imgBg: '#d3ebfd' },
      { title: '전자정부 표준 프레임워크', meta: '공지사항 · 2026.09.20', desc: '전자정부 표준 프레임워크 최신 버전 업데이트 사항을 안내합니다.', imgBg: '#f7afa1' },
      { title: '행정 데이터 개방 현황', meta: '자료실 · 2026.09.10', desc: '각 부처별 행정 데이터 개방 현황과 활용 방법을 안내합니다.', imgBg: '#e6e8ea' },
    ];
    return wrap(`
      <ul class="ds-card-list">
        ${items.map(it => `<li>${card({ ...it, hasMedia: true, ratio: '16x9', link: true })}</li>`).join('')}
      </ul>
    `, '100%');
  },
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${section('기본형 (이미지 + 메타 + 제목 + 설명)',
      `<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:2.4rem;">
        ${card({ title: '그림자형', meta: '공지사항', desc: '기본 그림자 카드입니다.', hasMedia: true, ratio: '16x9', imgBg: '#b1cefb' })}
        ${card({ title: '테두리형', meta: '공지사항', desc: '테두리 카드입니다.', hasMedia: true, ratio: '16x9', border: true, imgBg: '#e6e8ea' })}
        ${card({ title: '링크 카드', meta: '공지사항', desc: '전체 클릭 영역 카드입니다.', hasMedia: true, ratio: '16x9', link: true, imgBg: '#a9dab4' })}
      </div>`
    )}
    ${section('이미지 없음',
      `<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:2.4rem;">
        ${card({ title: '이미지 없는 카드', meta: '카테고리', desc: '미디어 영역 없이 텍스트만 표시합니다.', hasMedia: false })}
        ${card({ title: '액션 버튼 포함', meta: '카테고리', desc: '하단에 액션 버튼을 배치합니다.', hasMedia: false, hasActions: true })}
        ${card({ title: '메타 없음', desc: '메타 정보 없이 제목·설명만 표시합니다.', hasMedia: false })}
      </div>`
    )}
    ${section('가로형 (--horizontal)',
      `<div style="display:flex; flex-direction:column; gap:1.6rem;">
        ${card({ title: '가로형 — 그림자', meta: '자료실 · 2026.11.05', desc: '이미지와 본문을 가로로 배치합니다.', hasMedia: true, ratio: '4x3', horizontal: true, imgBg: '#ffc95c' })}
        ${card({ title: '가로형 — 테두리', meta: '공지사항 · 2026.11.01', desc: '테두리형 가로 카드입니다.', hasMedia: true, ratio: '4x3', horizontal: true, border: true, imgBg: '#e6e8ea' })}
      </div>`
    )}
  `, '96rem'),
};
