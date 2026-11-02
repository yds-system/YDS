import '../form-group/form-group.css';
import './select.css';

export default {
  title: '컴포넌트/입력/선택 상자',
  argTypes: {
    label: {
      control: 'text',
      description: '레이블 텍스트',
      table: { category: '내용' },
    },
    placeholder: {
      control: 'text',
      description: '선택 전 안내 문구 (빈 값 옵션)',
      table: { category: '내용' },
    },
    hint: {
      control: 'text',
      description: '도움말 텍스트',
      table: { category: '내용' },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: { category: '내용' },
    },
    options: {
      control: 'object',
      description: '옵션 목록 (value, label)',
      table: { category: '내용' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '셀렉트 크기',
      table: { category: '크기' },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'disabled'],
      description: '상태',
      table: { category: '상태' },
    },
  },
  args: {
    label: '레이블',
    placeholder: '선택하세요',
    hint: '도움말 텍스트입니다.',
    required: false,
    options: [
      { value: '1', label: '항목 1' },
      { value: '2', label: '항목 2' },
      { value: '3', label: '항목 3' },
    ],
    size: 'large',
    state: 'default',
  },
};

/* 옵션 목록 → <option> 태그 문자열 */
function renderOptions(placeholder, options) {
  const placeholderOpt = `<option value="">${placeholder}</option>`;
  const opts = options
    .map(o => `<option value="${o.value}">${o.label}</option>`)
    .join('');
  return placeholderOpt + opts;
}

/* 크기 클래스 */
function sizeClass(size) {
  return size === 'large' ? '' : ` ds-select--${size}`;
}

/* onchange 핸들러: 값이 있으면 completed 클래스 추가 */
function onchangeHandler(size, extraClass = '') {
  const base = `ds-select${sizeClass(size)}${extraClass ? ` ${extraClass}` : ''}`;
  return `this.className='${base}'+(this.value?' ds-select--completed':'')`;
}

/* ds-form-group 생성 헬퍼 */
function formGroup({ id, label, required, size, state, placeholder, options, hint }) {
  const isError = state === 'error';
  const isDisabled = state === 'disabled';
  const hintClass = isError ? 'ds-form-hint ds-form-hint--error' : 'ds-form-hint';
  const errorClass = isError ? ' ds-select--error' : '';

  return `
    <div class="ds-form-group">
      <div class="ds-form-label">
        <label for="${id}">${label}${required ? '<span class="ds-form-label__required" aria-hidden="true">필수</span>' : ''}</label>
      </div>
      <div class="ds-form-content">
        <select
          id="${id}"
          class="ds-select${sizeClass(size)}${errorClass}"
          title="${placeholder}"
          ${isDisabled ? 'disabled' : ''}
          onchange="${onchangeHandler(size, errorClass.trim())}"
        >
          ${renderOptions(placeholder, options)}
        </select>
      </div>
      ${hint ? `<p class="${hintClass}">${hint}</p>` : ''}
    </div>
  `;
}

const wrap = (content) =>
  `<div class="ds-fieldset" style="max-width:48rem;">${content}</div>`;

/* ── Playground ───────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: (args) => wrap(formGroup({ id: 'sel-pg', ...args })),
};

/* ── 기본 ─────────────────────────────────── */
export const 기본 = {
  name: '기본 (Default)',
  parameters: { controls: { include: ['size', 'placeholder'] } },
  render: ({ size, placeholder }) => {
    const opts = [
      { value: '1', label: '서울' },
      { value: '2', label: '경기' },
      { value: '3', label: '인천' },
    ];
    return wrap(`
      ${formGroup({ id: 'sel-d1', label: '지역', size, state: 'default', placeholder, options: opts, hint: '거주 지역을 선택하세요.' })}
      ${formGroup({ id: 'sel-d2', label: '지역 (필수)', required: true, size, state: 'default', placeholder, options: opts, hint: '' })}
    `);
  },
};

/* ── 상태 ─────────────────────────────────── */
export const 상태 = {
  name: '상태 (State)',
  parameters: { controls: { include: ['size'] } },
  render: ({ size }) => {
    const opts = [
      { value: '1', label: '항목 1' },
      { value: '2', label: '항목 2' },
    ];
    const placeholder = '선택하세요';

    /* 선택 완료 상태는 completed 클래스를 직접 렌더링 */
    const completedId = 'sel-st-cmp';
    const completedHtml = `
      <div class="ds-form-group">
        <div class="ds-form-label"><label for="${completedId}">선택 완료</label></div>
        <div class="ds-form-content">
          <select id="${completedId}" class="ds-select${sizeClass(size)} ds-select--completed"
            title="${placeholder}"
            onchange="${onchangeHandler(size)}">
            <option value="">선택하세요</option>
            <option value="1" selected>항목 1</option>
            <option value="2">항목 2</option>
          </select>
        </div>
        <p class="ds-form-hint">항목이 선택된 상태입니다.</p>
      </div>
    `;

    return wrap(`
      ${formGroup({ id: 'sel-st-def', label: '기본', size, state: 'default', placeholder, options: opts, hint: '도움말이 표시됩니다.' })}
      ${completedHtml}
      ${formGroup({ id: 'sel-st-err', label: '에러', size, state: 'error', placeholder, options: opts, hint: '항목을 선택해 주세요.' })}
      ${formGroup({ id: 'sel-st-dis', label: '비활성화', size, state: 'disabled', placeholder, options: opts, hint: '' })}
    `);
  },
};

/* ── 크기 ─────────────────────────────────── */
export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => {
    const opts = [
      { value: '1', label: '항목 1' },
      { value: '2', label: '항목 2' },
    ];
    return wrap(`
      ${formGroup({ id: 'sel-sz-s', label: 'Small', size: 'small', state: 'default', placeholder: '선택하세요', options: opts, hint: '' })}
      ${formGroup({ id: 'sel-sz-m', label: 'Medium', size: 'medium', state: 'default', placeholder: '선택하세요', options: opts, hint: '' })}
      ${formGroup({ id: 'sel-sz-l', label: 'Large', size: 'large', state: 'default', placeholder: '선택하세요', options: opts, hint: '' })}
    `);
  },
};

/* ── 전체 변형 ───────────────────────────── */
export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const opts = [
      { value: '1', label: '항목 1' },
      { value: '2', label: '항목 2' },
      { value: '3', label: '항목 3' },
    ];
    const ph = '선택하세요';

    return wrap(`
      ${formGroup({ id: 'av-lg-def', label: 'Large / 기본', size: 'large', state: 'default', placeholder: ph, options: opts, hint: '도움말 텍스트' })}
      ${formGroup({ id: 'av-lg-err', label: 'Large / 에러', size: 'large', state: 'error',   placeholder: ph, options: opts, hint: '항목을 선택해 주세요.' })}
      ${formGroup({ id: 'av-lg-dis', label: 'Large / 비활성화', size: 'large', state: 'disabled', placeholder: ph, options: opts, hint: '' })}
      ${formGroup({ id: 'av-md-def', label: 'Medium / 기본', size: 'medium', state: 'default', placeholder: ph, options: opts, hint: '' })}
      ${formGroup({ id: 'av-sm-def', label: 'Small / 기본',  size: 'small',  state: 'default', placeholder: ph, options: opts, hint: '' })}
    `);
  },
};
