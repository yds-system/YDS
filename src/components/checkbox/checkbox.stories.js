import '../form-group/form-group.css';
import './checkbox.css';

export default {
  title: 'Components/Checkbox',
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
      options: ['default', 'checked', 'indeterminate', 'disabled', 'error'],
      description: '상태',
      table: { category: '상태' },
    },
  },
  args: {
    label: '체크박스',
    subText: '',
    hint: '',
    required: false,
    size: 'medium',
    state: 'default',
  },
};

/* 단일 체크박스 아이템 HTML 생성 */
function checkItem({ id, label, size = 'medium', checked = false, disabled = false, subText = '' }) {
  return `
    <div class="yds-check-item yds-check-item--${size}">
      <input type="checkbox" id="${id}"
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}>
      <label for="${id}">${label}</label>
      ${subText ? `<div class="yds-check-item__desc"><p class="yds-check-item__text">${subText}</p></div>` : ''}
    </div>
  `;
}

/* fieldset 그룹 래퍼 */
function checkGroup({ legend, required = false, layout = 'row', hint = '', state = 'default', size = 'medium', items }) {
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
          ${items.map(item => checkItem({ ...item, size })).join('')}
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
            ${checkItem({ id: 'pg-chk', label, size, checked, disabled: isDisabled, subText })}
          </div>
        </div>
        ${hint ? `<p class="${hintClass}">${hint}</p>` : ''}
      </fieldset>
    `);
  },
  play: async ({ canvasElement, args }) => {
    if (args.state === 'indeterminate') {
      const input = canvasElement.querySelector('#pg-chk');
      if (input) input.indeterminate = true;
    }
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
          ${checkItem({ id: 'st-default', label: '기본 (미선택)', size })}
          ${checkItem({ id: 'st-checked', label: '선택됨', size, checked: true })}
          ${checkItem({ id: 'st-indet',   label: '중간 선택 (Indeterminate)', size })}
          ${checkItem({ id: 'st-dis',     label: '비활성화', size, disabled: true })}
          ${checkItem({ id: 'st-dis-chk', label: '선택된 비활성화', size, checked: true, disabled: true })}
        </div>
      </div>
    </fieldset>
    <fieldset class="yds-form-group">
      <legend class="yds-form-label"><span>에러 상태</span></legend>
      <div class="yds-form-content yds-form-content--error">
        <div class="yds-check-group yds-check-group--column">
          ${checkItem({ id: 'st-err', label: '에러 상태', size })}
        </div>
      </div>
      <p class="yds-form-hint yds-form-hint--error">하나 이상 선택해 주세요.</p>
    </fieldset>
  `),
  play: async ({ canvasElement }) => {
    const indet = canvasElement.querySelector('#st-indet');
    if (indet) indet.indeterminate = true;
  },
};

/* ── 그룹 ─────────────────────────────────── */
export const 그룹 = {
  name: '그룹 (Group)',
  parameters: { controls: { include: ['size', 'hint'] } },
  render: ({ size, hint }) => wrap(`
    ${checkGroup({
      legend: '가로 배치 (기본)',
      layout: 'row',
      size,
      hint,
      items: [
        { id: 'gr-h1', label: '항목 1' },
        { id: 'gr-h2', label: '항목 2', checked: true },
        { id: 'gr-h3', label: '항목 3' },
      ],
    })}
    ${checkGroup({
      legend: '세로 배치',
      layout: 'column',
      size,
      hint,
      items: [
        { id: 'gr-v1', label: '항목 1' },
        { id: 'gr-v2', label: '항목 2', checked: true },
        { id: 'gr-v3', label: '항목 3' },
      ],
    })}
    ${checkGroup({
      legend: '부가 설명 포함',
      layout: 'column',
      size,
      items: [
        { id: 'gr-s1', label: '항목 1', checked: true, subText: '이 항목에 대한 부가 설명이 들어갑니다.' },
        { id: 'gr-s2', label: '항목 2', subText: '이 항목에 대한 부가 설명이 들어갑니다.' },
      ],
    })}
  `),
};

/* ── 전체 동의 ────────────────────────────── */
export const 전체동의 = {
  name: '전체 동의 패턴',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    <fieldset class="yds-form-group">
      <legend class="yds-form-label"><span>이용 약관 동의</span></legend>
      <div class="yds-form-content">
        <div class="yds-check-group yds-check-group--column">
          <div class="yds-check-item yds-check-item--medium">
            <input type="checkbox" id="agree-all">
            <label for="agree-all"><strong>전체 동의합니다</strong></label>
          </div>
          <div class="yds-check-item yds-check-item--medium">
            <input type="checkbox" id="agree-1" data-child>
            <label for="agree-1">서비스 이용약관 동의 <strong>(필수)</strong></label>
          </div>
          <div class="yds-check-item yds-check-item--medium">
            <input type="checkbox" id="agree-2" data-child>
            <label for="agree-2">개인정보 수집·이용 동의 <strong>(필수)</strong></label>
          </div>
          <div class="yds-check-item yds-check-item--medium">
            <input type="checkbox" id="agree-3" data-child>
            <label for="agree-3">마케팅 정보 수신 동의 (선택)</label>
          </div>
        </div>
      </div>
    </fieldset>
  `),
  play: async ({ canvasElement }) => {
    const all = canvasElement.querySelector('#agree-all');
    const children = Array.from(canvasElement.querySelectorAll('[data-child]'));

    function syncAll() {
      const checkedCount = children.filter(c => c.checked).length;
      if (checkedCount === 0) {
        all.indeterminate = false;
        all.checked = false;
      } else if (checkedCount === children.length) {
        all.indeterminate = false;
        all.checked = true;
      } else {
        all.indeterminate = true;
      }
    }

    all.addEventListener('change', () => {
      children.forEach(c => { c.checked = all.checked; });
    });
    children.forEach(c => c.addEventListener('change', syncAll));
  },
};

/* ── 크기 ─────────────────────────────────── */
export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${checkGroup({
      legend: 'Medium (기본)',
      layout: 'column',
      size: 'medium',
      items: [
        { id: 'sz-m1', label: 'Medium 항목 1' },
        { id: 'sz-m2', label: 'Medium 항목 2', checked: true },
      ],
    })}
    ${checkGroup({
      legend: 'Large',
      layout: 'column',
      size: 'large',
      items: [
        { id: 'sz-l1', label: 'Large 항목 1' },
        { id: 'sz-l2', label: 'Large 항목 2', checked: true },
      ],
    })}
  `),
};

/* ── 전체 변형 ───────────────────────────── */
export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${checkGroup({
      legend: '가로 / Medium',
      layout: 'row',
      size: 'medium',
      items: [
        { id: 'av-r-m1', label: '기본' },
        { id: 'av-r-m2', label: '선택됨', checked: true },
        { id: 'av-r-m3', label: '비활성화', disabled: true },
        { id: 'av-r-m4', label: '선택 비활성화', checked: true, disabled: true },
      ],
    })}
    ${checkGroup({
      legend: '세로 / Large + 부가 설명',
      layout: 'column',
      size: 'large',
      items: [
        { id: 'av-c-l1', label: '항목 A', checked: true, subText: '부가 설명이 들어갑니다.' },
        { id: 'av-c-l2', label: '항목 B', subText: '부가 설명이 들어갑니다.' },
        { id: 'av-c-l3', label: '항목 C (비활성)', disabled: true, subText: '부가 설명이 들어갑니다.' },
      ],
    })}
    ${checkGroup({
      legend: '에러 상태',
      layout: 'column',
      size: 'medium',
      state: 'error',
      hint: '하나 이상 선택해 주세요.',
      items: [
        { id: 'av-err1', label: '항목 1' },
        { id: 'av-err2', label: '항목 2' },
      ],
    })}
  `),
};
