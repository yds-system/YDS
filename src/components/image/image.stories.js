import './image.css';

export default {
  title: '컴포넌트/레이아웃 및 표현/이미지',
  argTypes: {
    ratio: {
      control: { type: 'select' },
      options: ['1x1', '4x3', '3x2', '16x9', '21x9'],
      description: '이미지 비율',
      table: { category: '비율' },
    },
    alt: {
      control: 'text',
      description: '대체 텍스트. 장식 이미지는 빈 문자열("")로 설정',
      table: { category: '접근성' },
    },
    width: {
      control: 'text',
      description: '컨테이너 너비 (CSS 값)',
      table: { category: '레이아웃' },
    },
  },
  args: {
    ratio: '16x9',
    alt: '산과 하늘이 보이는 풍경 사진',
    width: '48rem',
  },
};

/* ----- 헬퍼 ----- */
const ph = (label, bg = '#cdd1d5') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect fill="${bg}" width="800" height="450"/><text fill="#6d7882" font-size="28" font-family="sans-serif" x="50%" y="50%" dy=".35em" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

function imageEl({ ratio, alt, width }) {
  return `
    <div class="ds-image ds-image--${ratio}"${width ? ` style="width:${width}"` : ''}>
      <img class="ds-image__img" src="${ph(ratio)}" alt="${alt}">
    </div>`;
}

/* ─── Playground ───────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => `<div style="padding:1.6rem;">${imageEl(args)}</div>`,
};

/* ─── 비율 ─────────────────────────────────── */

export const 비율 = {
  name: '비율 (Ratio)',
  parameters: { controls: { disable: true } },
  render: () => {
    const ratios = ['1x1', '4x3', '3x2', '16x9', '21x9'];
    const colors = ['#b1cefb', '#a9dab4', '#ffc95c', '#cdd1d5', '#d3ebfd'];
    return `
      <div style="display:flex; flex-direction:column; gap:2.4rem; padding:1.6rem; max-width:72rem;">
        ${ratios.map((r, i) => `
          <div>
            <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">--${r} (${r.replace('x', ' : ')})</p>
            <div class="ds-image ds-image--${r}" style="width:48rem;">
              <img class="ds-image__img" src="${ph(r, colors[i])}" alt="${r} 비율 예시">
            </div>
          </div>`).join('')}
      </div>`;
  },
};

/* ─── 장식 이미지 ───────────────────────────── */

export const 장식이미지 = {
  name: '장식 이미지 (Decorative)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="padding:1.6rem; max-width:48rem;">
      <p style="font-size:1.3rem; color:var(--color-text-subtle); margin-bottom:1.6rem;">
        장식 목적의 이미지는 <code>alt=""</code>로 설정합니다. 스크린 리더가 건너뜁니다.
      </p>
      <div class="ds-image ds-image--16x9">
        <img class="ds-image__img" src="${ph('장식 이미지 (alt="")', '#e6e8ea')}" alt="">
      </div>
    </div>`,
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const ratios = ['1x1', '4x3', '3x2', '16x9', '21x9'];
    return `
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:2.4rem; padding:1.6rem; max-width:96rem;">
        ${ratios.map(r => `
          <div>
            <p style="font-size:1.2rem; color:var(--color-text-subtle); margin-bottom:0.8rem;">${r}</p>
            <div class="ds-image ds-image--${r}">
              <img class="ds-image__img" src="${ph(r)}" alt="${r} 비율 예시">
            </div>
          </div>`).join('')}
      </div>`;
  },
};
