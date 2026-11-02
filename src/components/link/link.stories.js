import './link.css';

export default {
  title: '컴포넌트/액션/링크',
  argTypes: {
    label: {
      control: { type: 'text' },
      description: '링크 텍스트',
      table: { category: '내용' },
    },
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      description: '크기',
      table: { category: '종류' },
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'basic'],
      description: '색상 — default: 링크 색상, basic: 본문 텍스트 색상',
      table: { category: '종류' },
    },
    pure: {
      control: { type: 'boolean' },
      description: '순수(pure) — 상호작용 시 색상 변경 없이 기본 색상 유지',
      table: { category: '종류' },
    },
    underline: {
      control: { type: 'select' },
      options: ['always', 'hover', 'none'],
      description: '밑줄 — always: 항상 표시, hover: 상호작용 시 표시, none: 없음',
      table: { category: '종류' },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: '외부 링크 아이콘 표시 (ds-ico-go)',
      table: { category: '종류' },
    },
    newTab: {
      control: { type: 'boolean' },
      description: '새 창에서 열기 (target="_blank")',
      table: { category: '종류' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화',
      table: { category: '상태' },
    },
  },
  args: {
    label: '링크 텍스트',
    size: 'medium',
    color: 'default',
    pure: false,
    underline: 'always',
    showIcon: false,
    newTab: false,
    disabled: false,
  },
};

/* ─── 헬퍼 ─────────────────────────────────── */

function renderLink({ label, size, color, pure, underline, showIcon, newTab, disabled }) {
  const classes = ['ds-link'];
  if (size !== 'large') classes.push(`ds-link--${size}`);   // large가 기본값
  if (color === 'basic') classes.push('ds-link--basic');
  if (pure) classes.push('ds-link--pure');
  if (disabled) classes.push('ds-link--disabled');

  let spanClass = '';
  if (underline === 'always') spanClass = 'ds-link__text';
  else if (underline === 'hover') spanClass = 'ds-link__text ds-link__text--underline-hover';

  const spanHtml = spanClass
    ? `<span class="${spanClass}">${label}</span>`
    : `<span>${label}</span>`;

  const iconHtml = showIcon ? ' <i class="ds-icon ds-ico-go" aria-hidden="true"></i>' : '';
  const targetAttr = newTab ? ' target="_blank"' : '';
  const titleAttr = newTab ? ' title="새 창 열림"' : '';
  const href = disabled ? '#!' : '#';

  return `<a href="${href}" class="${classes.join(' ')}"${targetAttr}${titleAttr}>${spanHtml}${iconHtml}</a>`;
}

const wrap = (html) => `<div style="padding: 2rem;">${html}</div>`;

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(renderLink(args)),
};

/* ─── 크기 ──────────────────────────────────── */

export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
    const rows = sizes.map(size => `
      <div style="display:flex; align-items:center; gap:1.2rem; margin-bottom:1.6rem;">
        <span style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); min-width:6rem;">${size}</span>
        ${renderLink({ label: '링크 텍스트', size, color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: '아이콘 링크', size, color: 'default', pure: false, underline: 'always', showIcon: true, newTab: true, disabled: false })}
      </div>`).join('');
    return wrap(rows);
  },
};

/* ─── 색상 ──────────────────────────────────── */

export const 색상 = {
  name: '색상 (Color)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, nodes) => `
      <div style="margin-bottom:2.4rem;">
        <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">${title}</p>
        <div style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:center;">${nodes}</div>
      </div>`;

    return wrap(`
      ${section('default (링크 색상)', `
        ${renderLink({ label: '기본 링크', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: '아이콘 링크', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: true, newTab: true, disabled: false })}
      `)}
      ${section('basic (본문 텍스트 색상)', `
        ${renderLink({ label: '본문 링크', size: 'medium', color: 'basic', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: '아이콘 링크', size: 'medium', color: 'basic', pure: false, underline: 'always', showIcon: true, newTab: true, disabled: false })}
      `)}
    `);
  },
};

/* ─── 순수 (pure) ───────────────────────────── */

export const 순수 = {
  name: '순수 (Pure)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, nodes) => `
      <div style="margin-bottom:2.4rem;">
        <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">${title}</p>
        <div style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:center;">${nodes}</div>
      </div>`;

    return wrap(`
      ${section('일반 — 상호작용 시 색상 변경됨', `
        ${renderLink({ label: 'default', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: 'basic', size: 'medium', color: 'basic', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
      `)}
      ${section('pure — 상호작용 시 색상 유지', `
        ${renderLink({ label: 'default + pure', size: 'medium', color: 'default', pure: true, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: 'basic + pure', size: 'medium', color: 'basic', pure: true, underline: 'always', showIcon: false, newTab: false, disabled: false })}
      `)}
    `);
  },
};

/* ─── 밑줄 ──────────────────────────────────── */

export const 밑줄 = {
  name: '밑줄 (Underline)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, nodes) => `
      <div style="margin-bottom:2.4rem;">
        <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">${title}</p>
        <div style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:center;">${nodes}</div>
      </div>`;

    return wrap(`
      ${section('always — 항상 밑줄 표시', `
        ${renderLink({ label: '항상 밑줄', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
      `)}
      ${section('hover — 상호작용 시 밑줄 표시', `
        ${renderLink({ label: '가상 클래스 상태 시 밑줄', size: 'medium', color: 'default', pure: false, underline: 'hover', showIcon: false, newTab: false, disabled: false })}
      `)}
      ${section('none — 밑줄 없음', `
        ${renderLink({ label: '밑줄 없음', size: 'medium', color: 'default', pure: false, underline: 'none', showIcon: false, newTab: false, disabled: false })}
      `)}
    `);
  },
};

/* ─── 아이콘 ────────────────────────────────── */

export const 아이콘 = {
  name: '아이콘 (Icon)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, nodes) => `
      <div style="margin-bottom:2.4rem;">
        <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">${title}</p>
        <div style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:center;">${nodes}</div>
      </div>`;

    return wrap(`
      ${section('아이콘 없음', `
        ${renderLink({ label: '기본 링크', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: '기본 링크', size: 'medium', color: 'basic', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
      `)}
      ${section('외부 링크 아이콘 (ds-ico-go)', `
        ${renderLink({ label: '새 창 링크', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: true, newTab: true, disabled: false })}
        ${renderLink({ label: '새 창 링크', size: 'medium', color: 'basic', pure: false, underline: 'always', showIcon: true, newTab: true, disabled: false })}
      `)}
    `);
  },
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, nodes) => `
      <section style="margin-bottom:3.2rem;">
        <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.2rem;
                   color:var(--krds-light-color-text-bolder);">${title}</h2>
        <div style="display:flex; flex-wrap:wrap; gap:1.2rem; align-items:center;">${nodes}</div>
      </section>`;

    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

    return wrap(`
      ${section('크기 — default + 밑줄 항상', sizes.map(size =>
        renderLink({ label: size, size, color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })
      ).join(''))}
      ${section('크기 — basic + 밑줄 항상', sizes.map(size =>
        renderLink({ label: size, size, color: 'basic', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })
      ).join(''))}
      ${section('아이콘 — 크기별', sizes.map(size =>
        renderLink({ label: size, size, color: 'default', pure: false, underline: 'always', showIcon: true, newTab: true, disabled: false })
      ).join(''))}
      ${section('밑줄 변형 (medium)', `
        ${renderLink({ label: '항상 밑줄', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: '상호작용 시 밑줄', size: 'medium', color: 'default', pure: false, underline: 'hover', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: '밑줄 없음', size: 'medium', color: 'default', pure: false, underline: 'none', showIcon: false, newTab: false, disabled: false })}
      `)}
      ${section('pure 변형 (medium)', `
        ${renderLink({ label: 'default', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: 'default + pure', size: 'medium', color: 'default', pure: true, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: 'basic', size: 'medium', color: 'basic', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: false })}
        ${renderLink({ label: 'basic + pure', size: 'medium', color: 'basic', pure: true, underline: 'always', showIcon: false, newTab: false, disabled: false })}
      `)}
      ${section('비활성화', `
        ${renderLink({ label: 'default 비활성화', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: true })}
        ${renderLink({ label: 'basic 비활성화', size: 'medium', color: 'basic', pure: false, underline: 'always', showIcon: false, newTab: false, disabled: true })}
        ${renderLink({ label: '아이콘 비활성화', size: 'medium', color: 'default', pure: false, underline: 'always', showIcon: true, newTab: false, disabled: true })}
      `)}
    `);
  },
};
