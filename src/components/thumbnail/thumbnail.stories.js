import './thumbnail.scss';

export default {
  title: 'Components/Thumbnail',
  argTypes: {
    ratio: {
      control: { type: 'select' },
      options: ['1x1', '4x3', '16x9'],
      description: '비율. --1x1(기본)·--4x3·--16x9',
      table: { category: '비율' },
    },
    size: {
      control: { type: 'select' },
      options: ['', 'xs', 's', 'm', 'l', 'xl'],
      description: '크기. 없으면 부모 너비를 따름',
      table: { category: '크기' },
    },
    circle: {
      control: 'boolean',
      description: '원형 (--circle). --1x1 비율과 함께 사용',
      table: { category: '모양' },
    },
    hasLabel: {
      control: 'boolean',
      description: '왼쪽 위 라벨 자리 표시',
      table: { category: '오버레이' },
    },
    labelText: {
      control: 'text',
      description: '라벨 텍스트',
      table: { category: '오버레이' },
    },
    hasBadge: {
      control: 'boolean',
      description: '오른쪽 위 배지 자리 표시',
      table: { category: '오버레이' },
    },
    badgeText: {
      control: 'text',
      description: '배지 텍스트·숫자',
      table: { category: '오버레이' },
    },
    isEmpty: {
      control: 'boolean',
      description: '로딩·실패 상태 (--empty)',
      table: { category: '상태' },
    },
    alt: {
      control: 'text',
      description: '대체 텍스트. 장식 이미지는 ""',
      table: { category: '접근성' },
    },
  },
  args: {
    ratio:     '16x9',
    size:      '',
    circle:    false,
    hasLabel:  false,
    labelText: 'NEW',
    hasBadge:  false,
    badgeText: '3',
    isEmpty:   false,
    alt:       '산과 하늘이 보이는 풍경 사진',
  },
};

/* ----- 헬퍼 ----- */

const ph = (label = '', bg = '#cdd1d5') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect fill="${bg}" width="800" height="450"/><text fill="#6d7882" font-size="24" font-family="sans-serif" x="50%" y="50%" dy=".35em" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const LABEL_STYLE = 'background:#fff; padding:0.2rem 0.8rem; border-radius:0.4rem; font-size:1.1rem; font-weight:700; color:#1a1a1a;';
const BADGE_STYLE = 'background:#ff4b4b; color:#fff; padding:0.2rem 0.6rem; border-radius:9.9rem; font-size:1.1rem; font-weight:700;';

function thumbnail({ ratio, size, circle, hasLabel, labelText, hasBadge, badgeText, isEmpty, alt, imgBg, imgLabel } = {}) {
  const mods = [
    ratio   && `yds-thumbnail--${ratio}`,
    size    && `yds-thumbnail--${size}`,
    circle  && 'yds-thumbnail--circle',
    isEmpty && 'yds-thumbnail--empty',
  ].filter(Boolean).join(' ');
  const cls = mods ? `yds-thumbnail ${mods}` : 'yds-thumbnail';

  return `
    <div class="${cls}">
      ${!isEmpty ? `<img class="yds-thumbnail__img" src="${ph(imgLabel || '', imgBg || '#cdd1d5')}" alt="${alt || ''}">` : ''}
      ${hasLabel ? `<span class="yds-thumbnail__label" style="${LABEL_STYLE}">${labelText || 'NEW'}</span>` : ''}
      ${hasBadge ? `<span class="yds-thumbnail__badge" style="${BADGE_STYLE}">${badgeText || '3'}</span>` : ''}
    </div>`;
}

const wrap = (html, maxWidth = '64rem') =>
  `<div style="padding:1.6rem; max-width:${maxWidth};">${html}</div>`;

const section = (title, html) => `
  <div style="margin-bottom:3.2rem;">
    <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:1.2rem;">${title}</p>
    ${html}
  </div>`;

/* ─── Playground ───────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => {
    const hasFixedSize = Boolean(args.size) && args.size !== 'xl';
    return `<div style="padding:1.6rem; ${hasFixedSize ? 'display:inline-block;' : 'max-width:40rem;'}">${thumbnail(args)}</div>`;
  },
};

/* ─── 비율 ─────────────────────────────────── */

export const 비율 = {
  name: '비율 (Ratio)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    <div style="display:flex; flex-direction:column; gap:2.4rem;">
      ${[
        { mod: '1x1',  label: '--1x1 (1:1)',   bg: '#b1cefb' },
        { mod: '4x3',  label: '--4x3 (4:3)',   bg: '#a9dab4' },
        { mod: '16x9', label: '--16x9 (16:9)', bg: '#ffc95c' },
      ].map(r => `
        <div>
          <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">${r.label}</p>
          <div class="yds-thumbnail yds-thumbnail--${r.mod}" style="width:40rem;">
            <img class="yds-thumbnail__img" src="${ph(r.mod, r.bg)}" alt="${r.label} 예시">
          </div>
        </div>`).join('')}
    </div>
  `),
};

/* ─── 크기 ─────────────────────────────────── */

export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes = [
      { mod: 'xs', px: 56,  bg: '#b1cefb' },
      { mod: 's',  px: 72,  bg: '#a9dab4' },
      { mod: 'm',  px: 104, bg: '#ffc95c' },
      { mod: 'l',  px: 160, bg: '#d3ebfd' },
    ];
    return wrap(`
      ${section('고정 크기 (1:1 원형)', `
        <div style="display:flex; gap:2.4rem; align-items:flex-end; flex-wrap:wrap;">
          ${sizes.map(s => `
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.8rem;">
              <div class="yds-thumbnail yds-thumbnail--1x1 yds-thumbnail--circle yds-thumbnail--${s.mod}">
                <img class="yds-thumbnail__img" src="${ph('', s.bg)}" alt="크기 ${s.mod}">
              </div>
              <p style="font-size:1.2rem; color:var(--color-text-subtle); margin:0;">--${s.mod} (${s.px}px)</p>
            </div>`).join('')}
        </div>
      `)}
      ${section('고정 크기 (1:1 사각형)', `
        <div style="display:flex; gap:2.4rem; align-items:flex-end; flex-wrap:wrap;">
          ${sizes.map(s => `
            <div style="display:flex; flex-direction:column; align-items:center; gap:0.8rem;">
              <div class="yds-thumbnail yds-thumbnail--1x1 yds-thumbnail--${s.mod}">
                <img class="yds-thumbnail__img" src="${ph('', s.bg)}" alt="크기 ${s.mod}">
              </div>
              <p style="font-size:1.2rem; color:var(--color-text-subtle); margin:0;">--${s.mod} (${s.px}px)</p>
            </div>`).join('')}
        </div>
      `)}
      ${section('전체 너비 (--xl)', `
        <div class="yds-thumbnail yds-thumbnail--16x9 yds-thumbnail--xl">
          <img class="yds-thumbnail__img" src="${ph('--xl · 16:9', '#e6e8ea')}" alt="전체 너비">
        </div>
      `)}
    `);
  },
};

/* ─── 라벨과 배지 ───────────────────────────── */

export const 라벨과배지 = {
  name: '라벨·배지 (Label & Badge)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:2.4rem;">
      <div>
        <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">라벨 (왼쪽 위)</p>
        <div class="yds-thumbnail yds-thumbnail--16x9">
          <img class="yds-thumbnail__img" src="${ph('', '#b1cefb')}" alt="라벨 예시">
          <span class="yds-thumbnail__label" style="${LABEL_STYLE}">NEW</span>
        </div>
      </div>
      <div>
        <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">배지 (오른쪽 위)</p>
        <div class="yds-thumbnail yds-thumbnail--16x9">
          <img class="yds-thumbnail__img" src="${ph('', '#a9dab4')}" alt="배지 예시">
          <span class="yds-thumbnail__badge" style="${BADGE_STYLE}">3</span>
        </div>
      </div>
      <div>
        <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">라벨 + 배지</p>
        <div class="yds-thumbnail yds-thumbnail--16x9">
          <img class="yds-thumbnail__img" src="${ph('', '#ffc95c')}" alt="라벨과 배지 예시">
          <span class="yds-thumbnail__label" style="${LABEL_STYLE}">HOT</span>
          <span class="yds-thumbnail__badge" style="${BADGE_STYLE}">5</span>
        </div>
      </div>
    </div>
  `),
};

/* ─── 로딩·실패 ─────────────────────────────── */

export const 로딩실패 = {
  name: '로딩·실패 (Empty)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    <div style="display:flex; gap:2.4rem; align-items:center; flex-wrap:wrap;">
      <div>
        <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">16:9</p>
        <div class="yds-thumbnail yds-thumbnail--16x9 yds-thumbnail--empty" style="width:24rem;"></div>
      </div>
      <div>
        <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">1:1 사각형 --m</p>
        <div class="yds-thumbnail yds-thumbnail--1x1 yds-thumbnail--m yds-thumbnail--empty"></div>
      </div>
      <div>
        <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">1:1 원형 --m</p>
        <div class="yds-thumbnail yds-thumbnail--1x1 yds-thumbnail--m yds-thumbnail--circle yds-thumbnail--empty"></div>
      </div>
    </div>
  `),
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${section('비율 (너비 40rem)', `
      <div style="display:flex; flex-direction:column; gap:1.6rem;">
        ${['1x1', '4x3', '16x9'].map((r, i) => {
          const colors = ['#b1cefb', '#a9dab4', '#ffc95c'];
          return `
            <div class="yds-thumbnail yds-thumbnail--${r}" style="width:40rem;">
              <img class="yds-thumbnail__img" src="${ph('--' + r, colors[i])}" alt="${r} 비율">
            </div>`;
        }).join('')}
      </div>
    `)}
    ${section('크기별 (1:1 원형)', `
      <div style="display:flex; gap:2.4rem; align-items:flex-end; flex-wrap:wrap;">
        ${[
          { mod: 'xs', px: 56,  bg: '#b1cefb' },
          { mod: 's',  px: 72,  bg: '#a9dab4' },
          { mod: 'm',  px: 104, bg: '#ffc95c' },
          { mod: 'l',  px: 160, bg: '#d3ebfd' },
        ].map(s => `
          <div style="text-align:center;">
            <div class="yds-thumbnail yds-thumbnail--1x1 yds-thumbnail--circle yds-thumbnail--${s.mod}">
              <img class="yds-thumbnail__img" src="${ph('', s.bg)}" alt="${s.mod} 크기">
            </div>
            <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-top:0.8rem;">--${s.mod} (${s.px}px)</p>
          </div>`).join('')}
      </div>
    `)}
    ${section('빈 상태 (--empty)', `
      <div style="display:flex; gap:2.4rem; align-items:center; flex-wrap:wrap;">
        <div class="yds-thumbnail yds-thumbnail--16x9 yds-thumbnail--empty" style="width:24rem;"></div>
        <div class="yds-thumbnail yds-thumbnail--1x1 yds-thumbnail--m yds-thumbnail--empty"></div>
        <div class="yds-thumbnail yds-thumbnail--1x1 yds-thumbnail--m yds-thumbnail--circle yds-thumbnail--empty"></div>
      </div>
    `)}
    ${section('라벨·배지 오버레이', `
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1.6rem;">
        <div class="yds-thumbnail yds-thumbnail--16x9">
          <img class="yds-thumbnail__img" src="${ph('', '#b1cefb')}" alt="라벨 예시">
          <span class="yds-thumbnail__label" style="${LABEL_STYLE}">NEW</span>
        </div>
        <div class="yds-thumbnail yds-thumbnail--16x9">
          <img class="yds-thumbnail__img" src="${ph('', '#a9dab4')}" alt="배지 예시">
          <span class="yds-thumbnail__badge" style="${BADGE_STYLE}">5</span>
        </div>
        <div class="yds-thumbnail yds-thumbnail--16x9">
          <img class="yds-thumbnail__img" src="${ph('', '#ffc95c')}" alt="라벨과 배지 예시">
          <span class="yds-thumbnail__label" style="${LABEL_STYLE}">HOT</span>
          <span class="yds-thumbnail__badge" style="${BADGE_STYLE}">3</span>
        </div>
      </div>
    `)}
  `, '96rem'),
};
