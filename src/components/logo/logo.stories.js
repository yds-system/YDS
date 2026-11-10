import './logo.css';

export default {
  title: 'Brand/로고',
  argTypes: {
    ratio: {
      control: { type: 'select' },
      options: ['1x1', '2x1', '3x1'],
      description: '로고 비율',
      table: { category: '비율' },
    },
    grayscale: {
      control: 'boolean',
      description: '흑백 처리 (hover·focus 시 컬러로 전환)',
      table: { category: '상태' },
    },
    size: {
      control: 'text',
      description: '로고 높이 (CSS 값)',
      table: { category: '레이아웃' },
    },
    alt: {
      control: 'text',
      description: '로고 대체 텍스트 (기관명)',
      table: { category: '접근성' },
    },
  },
  args: {
    ratio: '3x1',
    grayscale: false,
    size: '6rem',
    alt: '기관명',
  },
};

/* ----- 헬퍼 ----- */

const logoSvg = (label, bg, fg) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="100"><rect fill="${bg}" width="300" height="100" rx="4"/><text fill="${fg}" font-size="20" font-weight="bold" font-family="sans-serif" x="50%" y="50%" dy=".35em" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const LOGOS = [
  { label: '기관 A', bg: '#256ef4', fg: '#fff' },
  { label: '기관 B', bg: '#228738', fg: '#fff' },
  { label: '기관 C', bg: '#de3412', fg: '#fff' },
  { label: '기관 D', bg: '#1e2124', fg: '#fff' },
  { label: '기관 E', bg: '#6d7882', fg: '#fff' },
];

function logoEl({ ratio, grayscale, size, alt, src }) {
  const gsClass = grayscale ? ' ds-logo--grayscale' : '';
  const imgSrc = src || logoSvg(alt, '#256ef4', '#fff');
  const heightStyle = size ? `height:${size}` : '';
  return `
    <div class="ds-logo ds-logo--${ratio}${gsClass}" style="${heightStyle}">
      <img class="ds-logo__img" src="${imgSrc}" alt="${alt}">
    </div>`;
}

/* ─── Playground ───────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => `<div style="padding:1.6rem;">${logoEl(args)}</div>`,
};

/* ─── 비율 ─────────────────────────────────── */

export const 비율 = {
  name: '비율 (Ratio)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="display:flex; flex-direction:column; gap:2.4rem; padding:1.6rem;">
      ${['1x1', '2x1', '3x1'].map(r => `
        <div>
          <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">--${r} (${r.replace('x', ' : ')})</p>
          ${logoEl({ ratio: r, grayscale: false, size: '6rem', alt: `${r} 비율 로고` })}
        </div>`).join('')}
    </div>`,
};

/* ─── 흑백 ─────────────────────────────────── */

export const 흑백 = {
  name: '흑백 (Grayscale)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="display:flex; flex-direction:column; gap:2.4rem; padding:1.6rem; max-width:48rem;">
      <p style="font-size:1.3rem; color:var(--color-text-subtle);">
        <code>--grayscale</code>: 기본 흑백, hover·focus 시 컬러로 전환됩니다.
      </p>
      <div style="display:flex; gap:3.2rem; align-items:center;">
        <div>
          <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">기본 (컬러)</p>
          ${logoEl({ ratio: '3x1', grayscale: false, size: '5rem', alt: '컬러 로고' })}
        </div>
        <div>
          <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">흑백 (hover 시 컬러)</p>
          ${logoEl({ ratio: '3x1', grayscale: true, size: '5rem', alt: '흑백 로고' })}
        </div>
      </div>
    </div>`,
};

/* ─── 로고 목록 ─────────────────────────────── */

export const 로고목록 = {
  name: '로고 목록 (Logo List)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="padding:1.6rem; max-width:72rem;">
      <p style="font-size:1.3rem; color:var(--color-text-subtle); margin-bottom:1.6rem;">
        협력 기관 로고 목록 예시 — <code>ds-logo-list</code> 컨테이너 사용
      </p>
      <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">컬러</p>
      <div class="ds-logo-list">
        ${LOGOS.map(l => logoEl({ ratio: '3x1', grayscale: false, size: '4rem', alt: l.label, src: logoSvg(l.label, l.bg, l.fg) })).join('')}
      </div>
      <br>
      <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">흑백 (hover 시 컬러)</p>
      <div class="ds-logo-list">
        ${LOGOS.map(l => logoEl({ ratio: '3x1', grayscale: true, size: '4rem', alt: l.label, src: logoSvg(l.label, l.bg, l.fg) })).join('')}
      </div>
    </div>`,
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="display:flex; flex-direction:column; gap:3.2rem; padding:1.6rem; max-width:72rem;">
      <div>
        <p style="font-size:1.3rem; font-weight:bold; color:var(--color-text-default); margin-bottom:1.2rem;">비율 × 컬러</p>
        <div style="display:flex; gap:2.4rem; align-items:center; flex-wrap:wrap;">
          ${['1x1', '2x1', '3x1'].map(r =>
            `<div style="text-align:center;">
               <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.6rem;">${r}</p>
               ${logoEl({ ratio: r, grayscale: false, size: '5rem', alt: `${r} 로고` })}
             </div>`
          ).join('')}
        </div>
      </div>
      <div>
        <p style="font-size:1.3rem; font-weight:bold; color:var(--color-text-default); margin-bottom:1.2rem;">흑백 (--grayscale)</p>
        <div class="ds-logo-list">
          ${LOGOS.map(l => logoEl({ ratio: '3x1', grayscale: true, size: '4rem', alt: l.label, src: logoSvg(l.label, l.bg, l.fg) })).join('')}
        </div>
      </div>
    </div>`,
};
