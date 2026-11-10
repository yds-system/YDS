import './button.css';
import '../icon/icon.css';

export default {
  title: 'Components/Button',
  argTypes: {
    label: {
      control: 'text',
      description: '버튼 레이블 텍스트',
      table: { category: '내용' },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'text'],
      description: '버튼 종류 (위계)',
      table: { category: '종류' },
    },
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      description: '버튼 크기',
      table: { category: '크기' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { category: '상태' },
    },
  },
  args: {
    label: '버튼',
    variant: 'primary',
    size: 'large',
    disabled: false,
  },
};

const row = (content) =>
  `<div style="display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center;">${content}</div>`;

/* ── Playground ─────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: ({ label, variant, size, disabled }) => {
    const cls = ['ds-btn', `ds-btn--${variant}`, `ds-btn--${size}`].join(' ');
    return `<button type="button" class="${cls}"${disabled ? ' disabled' : ''}>${label}</button>`;
  },
};

/* ── 위계 ──────────────────────────────── */
export const 위계 = {
  name: '위계 (Hierarchy)',
  args: { size: 'large', disabled: false },
  render: ({ size, disabled }) =>
    row(`
      <button type="button" class="ds-btn ds-btn--primary ds-btn--${size}"${disabled ? ' disabled' : ''}>Primary</button>
      <button type="button" class="ds-btn ds-btn--secondary ds-btn--${size}"${disabled ? ' disabled' : ''}>Secondary</button>
      <button type="button" class="ds-btn ds-btn--tertiary ds-btn--${size}"${disabled ? ' disabled' : ''}>Tertiary</button>
    `),
};

/* ── 크기 ──────────────────────────────── */
export const 크기 = {
  name: '크기 (Size)',
  args: { variant: 'primary', disabled: false },
  render: ({ variant, disabled }) =>
    row(`
      <button type="button" class="ds-btn ds-btn--${variant} ds-btn--xsmall"${disabled ? ' disabled' : ''}>XSmall</button>
      <button type="button" class="ds-btn ds-btn--${variant} ds-btn--small"${disabled ? ' disabled' : ''}>Small</button>
      <button type="button" class="ds-btn ds-btn--${variant} ds-btn--medium"${disabled ? ' disabled' : ''}>Medium</button>
      <button type="button" class="ds-btn ds-btn--${variant} ds-btn--large"${disabled ? ' disabled' : ''}>Large</button>
      <button type="button" class="ds-btn ds-btn--${variant} ds-btn--xlarge"${disabled ? ' disabled' : ''}>XLarge</button>
    `),
};

/* ── 텍스트 버튼 ────────────────────────── */
export const 텍스트버튼 = {
  name: '텍스트 버튼 (Text)',
  args: { variant: 'text', disabled: false },
  render: ({ disabled }) =>
    row(`
      <button type="button" class="ds-btn ds-btn--text ds-btn--xsmall"${disabled ? ' disabled' : ''}>XSmall</button>
      <button type="button" class="ds-btn ds-btn--text ds-btn--small"${disabled ? ' disabled' : ''}>Small</button>
      <button type="button" class="ds-btn ds-btn--text ds-btn--medium"${disabled ? ' disabled' : ''}>Medium</button>
      <button type="button" class="ds-btn ds-btn--text ds-btn--large"${disabled ? ' disabled' : ''}>Large</button>
      <button type="button" class="ds-btn ds-btn--text ds-btn--xlarge"${disabled ? ' disabled' : ''}>XLarge</button>
    `),
};

/* ── 아이콘 포함 ────────────────────────── */
export const 아이콘포함 = {
  name: '아이콘 포함 (With Icon)',
  args: { disabled: false },
  render: ({ disabled }) =>
    row(`
      <button type="button" class="ds-btn ds-btn--primary ds-btn--small"${disabled ? ' disabled' : ''}>
        검색 <i class="ds-icon ds-ico-sch"></i>
      </button>
      <button type="button" class="ds-btn ds-btn--secondary ds-btn--medium"${disabled ? ' disabled' : ''}>
        다운로드 <i class="ds-icon ds-ico-down"></i>
      </button>
      <button type="button" class="ds-btn ds-btn--tertiary ds-btn--large"${disabled ? ' disabled' : ''}>
        더보기 <i class="ds-icon ds-ico-more"></i>
      </button>
      <button type="button" class="ds-btn ds-btn--text"${disabled ? ' disabled' : ''}>
        파일다운로드 <i class="ds-icon ds-ico-down"></i>
      </button>
    `),
};

/* ── 아이콘 전용 ────────────────────────── */
export const 아이콘전용 = {
  name: '아이콘 전용 (Icon Only)',
  args: { disabled: false },
  render: ({ disabled }) =>
    row(`
      <button type="button" class="ds-btn ds-btn--icon"${disabled ? ' disabled' : ''}>
        <span class="sr-only">검색</span>
        <i class="ds-icon ds-ico-sch"></i>
      </button>
      <button type="button" class="ds-btn ds-btn--icon ds-btn--medium"${disabled ? ' disabled' : ''}>
        <span class="sr-only">도움말</span>
        <i class="ds-icon ds-ico-help"></i>
      </button>
      <button type="button" class="ds-btn ds-btn--icon ds-btn--large ds-btn--border"${disabled ? ' disabled' : ''}>
        <span class="sr-only">새로고침</span>
        <i class="ds-icon ds-ico-refresh"></i>
      </button>
    `),
};

/* ── 비활성화 ───────────────────────────── */
export const 비활성화 = {
  name: '비활성화 (Disabled)',
  args: { disabled: true },
  parameters: { controls: { include: ['variant', 'size'] } },
  render: ({ size }) =>
    row(`
      <button type="button" class="ds-btn ds-btn--primary ds-btn--${size}" disabled>Primary</button>
      <button type="button" class="ds-btn ds-btn--secondary ds-btn--${size}" disabled>Secondary</button>
      <button type="button" class="ds-btn ds-btn--tertiary ds-btn--${size}" disabled>Tertiary</button>
      <button type="button" class="ds-btn ds-btn--text ds-btn--${size}" disabled>Text</button>
    `),
};

/* ── 전체 변형 ──────────────────────────── */
export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const variants = ['primary', 'secondary', 'tertiary', 'text'];
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
    const th = (t) => `<th style="padding:0.6rem 1rem;font-size:1.3rem;text-align:center;">${t}</th>`;
    const td = (content) => `<td style="padding:0.6rem 1rem;text-align:center;">${content}</td>`;
    const rows = variants.map((v) =>
      `<tr>
        ${td(`<code style="font-size:1.2rem;">${v}</code>`)}
        ${sizes.map((s) => td(`<button type="button" class="ds-btn ds-btn--${v} ds-btn--${s}">${s}</button>`)).join('')}
        ${td(`<button type="button" class="ds-btn ds-btn--${v} ds-btn--large" disabled>disabled</button>`)}
      </tr>`
    ).join('');
    return `
      <div style="overflow:auto;">
        <table style="border-collapse:collapse;min-width:max-content;">
          <thead>
            <tr style="border-bottom:1px solid #eee;">
              ${th('variant \\ size')}${sizes.map(th).join('')}${th('disabled')}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  },
};
