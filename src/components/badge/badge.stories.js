import './badge.css';

export default {
  title: 'Components/배지',
  argTypes: {
    label: {
      control: 'text',
      description: '배지 텍스트',
      table: { category: '내용' },
    },
    style: {
      control: { type: 'select' },
      options: ['outline', 'bg', 'bg-light'],
      description: '배지 스타일',
      table: { category: '종류' },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'gray', 'point', 'danger', 'warning', 'success', 'information', 'disabled'],
      description: '색상',
      table: { category: '종류' },
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'large'],
      description: '크기 (default: 기본)',
      table: { category: '크기' },
    },
    type: {
      control: { type: 'select' },
      options: ['label', 'number', 'dot'],
      description: '배지 유형',
      table: { category: '종류' },
    },
  },
  args: {
    label: '진행 중',
    style: 'bg-light',
    color: 'primary',
    size: 'default',
    type: 'label',
  },
};

/* ─── 헬퍼 ──────────────────────────────────── */

function badge({ label, style, color, size, type }) {
  const sizeClass = size === 'large' ? ' ds-badge--large' : '';
  const typeClass = type === 'number' ? ' ds-badge--number' : type === 'dot' ? ' ds-badge--dot' : '';
  const colorClass = `ds-badge--${style}-${color}`;
  const text = type === 'dot' ? '' : label;
  const ariaLabel = type === 'dot' ? ` aria-label="${label}"` : '';
  return `<span class="ds-badge ${colorClass}${sizeClass}${typeClass}"${ariaLabel}>${text}</span>`;
}

const wrap = (html) =>
  `<div style="display:flex; flex-direction:column; gap:2.4rem; max-width:72rem; padding:0.8rem;">${html}</div>`;

const row = (label, html) => `
  <div>
    <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle);
              margin-bottom:0.8rem;">${label}</p>
    <div class="ds-badge-group">${html}</div>
  </div>`;

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => `<div style="padding:0.8rem;">${badge(args)}</div>`,
};

/* ─── 색상 ──────────────────────────────────── */

const COLORS = ['primary', 'secondary', 'gray', 'point', 'danger', 'warning', 'success', 'information', 'disabled'];
const STATUS_LABELS = {
  primary:     '기본',
  secondary:   '보조',
  gray:        '일반',
  point:       '포인트',
  danger:      '오류',
  warning:     '주의',
  success:     '완료',
  information: '정보',
  disabled:    '비활성',
};

export const 색상 = {
  name: '색상 (Color)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${row('테두리 (outline)',
      COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'outline', color: c, size: 'default', type: 'label' })).join('')
    )}
    ${row('채우기 (bg)',
      COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'bg', color: c, size: 'default', type: 'label' })).join('')
    )}
    ${row('밝은 배경 (bg-light)',
      COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'bg-light', color: c, size: 'default', type: 'label' })).join('')
    )}
  `),
};

/* ─── 크기 ──────────────────────────────────── */

export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${row('기본 (Default)',
      COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'bg-light', color: c, size: 'default', type: 'label' })).join('')
    )}
    ${row('Large',
      COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'bg-light', color: c, size: 'large', type: 'label' })).join('')
    )}
  `),
};

/* ─── 숫자 배지 ─────────────────────────────── */

export const 숫자배지 = {
  name: '숫자 배지 (Number)',
  parameters: { controls: { disable: true } },
  render: () => {
    const counts = ['1', '5', '99', '999+'];
    return wrap(`
      ${row('Primary',
        counts.map(n => badge({ label: n, style: 'bg', color: 'primary', size: 'default', type: 'number' })).join('')
      )}
      ${row('Danger',
        counts.map(n => badge({ label: n, style: 'bg', color: 'danger', size: 'default', type: 'number' })).join('')
      )}
      ${row('Point',
        counts.map(n => badge({ label: n, style: 'bg', color: 'point', size: 'default', type: 'number' })).join('')
      )}
    `);
  },
};

/* ─── 점 배지 ───────────────────────────────── */

export const 점배지 = {
  name: '점 배지 (Dot)',
  parameters: { controls: { disable: true } },
  render: () => wrap(
    row('점 배지 (알림 표시 등)',
      COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'bg', color: c, size: 'default', type: 'dot' })).join('')
    )
  ),
};

/* ─── 상태 표시 활용 예시 ───────────────────── */

export const 상태표시 = {
  name: '상태 표시 (Status)',
  parameters: { controls: { disable: true } },
  render: () => {
    const statuses = [
      { label: '대기', style: 'bg-light', color: 'gray' },
      { label: '진행 중', style: 'bg-light', color: 'primary' },
      { label: '검토 중', style: 'bg-light', color: 'information' },
      { label: '주의', style: 'bg-light', color: 'warning' },
      { label: '완료', style: 'bg-light', color: 'success' },
      { label: '오류', style: 'bg-light', color: 'danger' },
      { label: '취소됨', style: 'bg-light', color: 'disabled' },
    ];

    return wrap(`
      <div>
        <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">밝은 배경 (bg-light) — 상태 표시 권장</p>
        <div class="ds-badge-group">
          ${statuses.map(s => badge({ ...s, size: 'default', type: 'label' })).join('')}
        </div>
      </div>
      <div>
        <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">채우기 (bg) — 강조 표시</p>
        <div class="ds-badge-group">
          ${statuses.map(s => badge({ ...s, style: 'bg', size: 'default', type: 'label' })).join('')}
        </div>
      </div>
      <div>
        <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">테두리 (outline)</p>
        <div class="ds-badge-group">
          ${statuses.map(s => badge({ ...s, style: 'outline', size: 'default', type: 'label' })).join('')}
        </div>
      </div>
    `);
  },
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, html) => `
      <section style="margin-bottom:3.2rem;">
        <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.6rem;
                   color:var(--krds-light-color-text-bolder);">${title}</h2>
        ${html}
      </section>`;

    return wrap(`
      ${section('색상 × 스타일', `
        ${row('outline',
          COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'outline', color: c, size: 'default', type: 'label' })).join('')
        )}
        ${row('bg',
          COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'bg', color: c, size: 'default', type: 'label' })).join('')
        )}
        ${row('bg-light',
          COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'bg-light', color: c, size: 'default', type: 'label' })).join('')
        )}
      `)}
      ${section('숫자 배지', `
        ${row('Primary',
          ['1', '5', '99', '999+'].map(n => badge({ label: n, style: 'bg', color: 'primary', size: 'default', type: 'number' })).join('')
        )}
        ${row('Danger',
          ['1', '5', '99', '999+'].map(n => badge({ label: n, style: 'bg', color: 'danger', size: 'default', type: 'number' })).join('')
        )}
      `)}
      ${section('점 배지',
        row('dot', COLORS.map(c => badge({ label: STATUS_LABELS[c], style: 'bg', color: c, size: 'default', type: 'dot' })).join(''))
      )}
      ${section('크기', `
        ${row('Default', COLORS.slice(0, 5).map(c => badge({ label: STATUS_LABELS[c], style: 'bg-light', color: c, size: 'default', type: 'label' })).join(''))}
        ${row('Large',   COLORS.slice(0, 5).map(c => badge({ label: STATUS_LABELS[c], style: 'bg-light', color: c, size: 'large',   type: 'label' })).join(''))}
      `)}
    `);
  },
};
