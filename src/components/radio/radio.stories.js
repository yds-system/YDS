import '../form-group/form-group.css';
import '../checkbox/checkbox.css'; /* yds-check-item 공유 CSS */

export default {
  title: 'Components/Radio Button',
  argTypes: {
    label: {
      control: 'text',
      description: '레이블 텍스트',
      table: { category: '내용' },
    },
    subText: {
      control: 'text',
      description: '부가 설명 텍스트',
      table: { category: '내용' },
    },
    hint: {
      control: 'text',
      description: '도움말 텍스트',
      table: { category: '내용' },
    },
    required: {
      control: 'boolean',
      description: '필수 여부',
      table: { category: '내용' },
    },
    size: {
      control: { type: 'select' },
      options: ['medium', 'large'],
      description: '크기',
      table: { category: '크기' },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'checked', 'disabled', 'error'],
      description: '상태',
      table: { category: '상태' },
    },
  },
  args: {
    label: '라디오 버튼',
    subText: '',
    hint: '',
    required: false,
    size: 'medium',
    state: 'default',
  },
};

/* 단일 라디오 아이템 HTML 생성 */
function radioItem({ id, name, label, size = 'medium', checked = false, disabled = false, subText = '' }) {
  return `
    <div class="yds-check-item yds-check-item--${size}">
      <input type="radio" id="${id}" name="${name}"
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}>
      <label for="${id}">${label}</label>
      ${subText ? `<div class="yds-check-item__desc"><p class="yds-check-item__text">${subText}</p></div>` : ''}
    </div>
  `;
}

/* fieldset 그룹 래퍼 */
function radioGroup({ legend, name, required = false, layout = 'row', hint = '', state = 'default', size = 'medium', items }) {
  const isError = state === 'error';
  const stateClass = isError ? ' yds-form-content--error' : '';
  const hintClass = isError ? 'yds-form-hint yds-form-hint--error' : 'yds-form-hint';
  const layoutClass = layout === 'column' ? ' yds-check-group--column' : '';

  return `
    <fieldset class="yds-form-group">
      <legend class="yds-form-label">
        <span>${legend}${required ? '<span class="yds-form-label__required" aria-hidden="true">필수</span>' : ''}</span>
      </legend>
      <div class="yds-form-content${stateClass}">
        <div class="yds-check-group${layoutClass}">
          ${items.map(item => radioItem({ ...item, name, size })).join('')}
        </div>
      </div>
      ${hint ? `<p class="${hintClass}">${hint}</p>` : ''}
    </fieldset>
  `;
}

const wrap = (content) =>
  `<div class="yds-fieldset" style="max-width:48rem;">${content}</div>`;

/* ── Playground ───────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: ({ label, subText, hint, required, size, state }) => {
    const checked = state === 'checked';
    const isDisabled = state === 'disabled';
    const isError = state === 'error';
    const hintClass = isError ? 'yds-form-hint yds-form-hint--error' : 'yds-form-hint';

    return wrap(`
      <fieldset class="yds-form-group">
        <legend class="yds-form-label">
          <span>${label}${required ? '<span class="yds-form-label__required" aria-hidden="true">필수</span>' : ''}</span>
        </legend>
        <div class="yds-form-content${isError ? ' yds-form-content--error' : ''}">
          <div class="yds-check-group yds-check-group--column">
            ${radioItem({ id: 'rdo-pg-1', name: 'rdo-pg', label: '항목 1', size, checked, disabled: isDisabled, subText })}
            ${radioItem({ id: 'rdo-pg-2', name: 'rdo-pg', label: '항목 2', size })}
          </div>
        </div>
        ${hint ? `<p class="${hintClass}">${hint}</p>` : ''}
      </fieldset>
    `);
  },
};

/* ── 상태 ─────────────────────────────────── */
export const 상태 = {
  name: '상태 (State)',
  parameters: { controls: { include: ['size'] } },
  render: ({ size }) => wrap(`
    <fieldset class="yds-form-group">
      <legend class="yds-form-label"><span>상태</span></legend>
      <div class="yds-form-content">
        <div class="yds-check-group yds-check-group--column">
          ${radioItem({ id: 'st-r1', name: 'st-rdo', label: '기본 (미선택)', size })}
          ${radioItem({ id: 'st-r2', name: 'st-rdo', label: '선택됨', size, checked: true })}
          ${radioItem({ id: 'st-r3', name: 'st-dis', label: '비활성화', size, disabled: true })}
          ${radioItem({ id: 'st-r4', name: 'st-dis-chk', label: '선택된 비활성화', size, checked: true, disabled: true })}
        </div>
      </div>
    </fieldset>
    <fieldset class="yds-form-group">
      <legend class="yds-form-label"><span>에러 상태</span></legend>
      <div class="yds-form-content yds-form-content--error">
        <div class="yds-check-group yds-check-group--column">
          ${radioItem({ id: 'st-er1', name: 'st-err', label: '항목 1', size })}
          ${radioItem({ id: 'st-er2', name: 'st-err', label: '항목 2', size })}
        </div>
      </div>
      <p class="yds-form-hint yds-form-hint--error">항목을 선택해 주세요.</p>
    </fieldset>
  `),
};

/* ── 그룹 ─────────────────────────────────── */
export const 그룹 = {
  name: '그룹 (Group)',
  parameters: { controls: { include: ['size', 'hint'] } },
  render: ({ size, hint }) => wrap(`
    ${radioGroup({
      legend: '가로 배치 (기본)',
      name: 'grp-h',
      layout: 'row',
      size,
      hint,
      items: [
        { id: 'gh-1', label: '항목 1', checked: true },
        { id: 'gh-2', label: '항목 2' },
        { id: 'gh-3', label: '항목 3' },
      ],
    })}
    ${radioGroup({
      legend: '세로 배치',
      name: 'grp-v',
      layout: 'column',
      size,
      hint,
      items: [
        { id: 'gv-1', label: '항목 1', checked: true },
        { id: 'gv-2', label: '항목 2' },
        { id: 'gv-3', label: '항목 3' },
      ],
    })}
    ${radioGroup({
      legend: '부가 설명 포함',
      name: 'grp-s',
      layout: 'column',
      size,
      items: [
        { id: 'gs-1', label: '일반 배송', checked: true, subText: '무료 · 2~3일 소요' },
        { id: 'gs-2', label: '빠른 배송', subText: '3,000원 · 익일 도착' },
        { id: 'gs-3', label: '직접 수령', subText: '지점 방문 후 수령' },
      ],
    })}
  `),
};

/* ── 크기 ─────────────────────────────────── */
export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${radioGroup({
      legend: 'Medium (기본)',
      name: 'sz-m',
      layout: 'column',
      size: 'medium',
      items: [
        { id: 'szm-1', label: 'Medium 항목 1', checked: true },
        { id: 'szm-2', label: 'Medium 항목 2' },
      ],
    })}
    ${radioGroup({
      legend: 'Large',
      name: 'sz-l',
      layout: 'column',
      size: 'large',
      items: [
        { id: 'szl-1', label: 'Large 항목 1', checked: true },
        { id: 'szl-2', label: 'Large 항목 2' },
      ],
    })}
  `),
};

/* ── 전체 변형 ───────────────────────────── */
export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${radioGroup({
      legend: '가로 / Medium',
      name: 'av-h-m',
      layout: 'row',
      size: 'medium',
      items: [
        { id: 'av-hm-1', label: '기본' },
        { id: 'av-hm-2', label: '선택됨', checked: true },
        { id: 'av-hm-3', label: '비활성화', disabled: true },
        { id: 'av-hm-4', label: '선택 비활성화', checked: true, disabled: true },
      ],
    })}
    ${radioGroup({
      legend: '세로 / Large + 부가 설명',
      name: 'av-v-l',
      layout: 'column',
      size: 'large',
      items: [
        { id: 'av-vl-1', label: '항목 A', checked: true, subText: '부가 설명이 들어갑니다.' },
        { id: 'av-vl-2', label: '항목 B', subText: '부가 설명이 들어갑니다.' },
        { id: 'av-vl-3', label: '항목 C (비활성)', disabled: true, subText: '부가 설명이 들어갑니다.' },
      ],
    })}
    ${radioGroup({
      legend: '에러 상태',
      name: 'av-err',
      layout: 'column',
      size: 'medium',
      state: 'error',
      hint: '항목을 선택해 주세요.',
      items: [
        { id: 'av-er1', label: '항목 1' },
        { id: 'av-er2', label: '항목 2' },
      ],
    })}
  `),
};
