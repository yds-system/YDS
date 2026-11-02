import '../form-group/form-group.css';
import '../button/button.css';
import './text-input.css';

export default {
  title: '컴포넌트/입력/텍스트 입력',
  argTypes: {
    label: {
      control: 'text',
      description: '레이블 텍스트',
      table: { category: '내용' },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더',
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
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'search', 'number', 'email', 'tel'],
      description: '입력 타입',
      table: { category: '종류' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력창 크기',
      table: { category: '크기' },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'information'],
      description: '상태',
      table: { category: '상태' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: '상태' },
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용',
      table: { category: '상태' },
    },
  },
  args: {
    label: '레이블',
    placeholder: '내용을 입력하세요',
    hint: '도움말 텍스트입니다.',
    required: false,
    type: 'text',
    size: 'large',
    state: 'default',
    disabled: false,
    readonly: false,
  },
};

/* 폼 그룹 생성 헬퍼 */
function formGroup({ label, required, size, state, type, placeholder, disabled, readonly, hint, message, extra = '' }) {
  const stateClass = state && state !== 'default'
    ? ` ds-form-content--${state === 'error' ? 'error' : state === 'success' ? 'success' : 'info'}`
    : '';
  const hintClass = state === 'error' ? 'ds-form-hint ds-form-hint--error'
    : state === 'success' ? 'ds-form-hint ds-form-hint--success'
    : state === 'information' ? 'ds-form-hint ds-form-hint--info'
    : 'ds-form-hint';
  const hintText = message || hint || '';
  const inputId = `input-${Math.random().toString(36).slice(2, 7)}`;
  const sizeClass = size !== 'large' ? ` ds-input--${size}` : '';

  return `
    <div class="ds-form-group">
      <div class="ds-form-label">
        <label for="${inputId}">${label}${required ? '<span class="ds-form-label__required" aria-hidden="true">필수</span>' : ''}</label>
      </div>
      <div class="ds-form-content${stateClass}${extra}">
        <input
          type="${type}"
          id="${inputId}"
          class="ds-input${sizeClass}"
          placeholder="${placeholder}"
          ${disabled ? 'disabled' : ''}
          ${readonly ? 'readonly' : ''}
        >
      </div>
      ${hintText ? `<p class="${hintClass}">${hintText}</p>` : ''}
    </div>
  `;
}

const wrap = (content) =>
  `<div class="ds-fieldset" style="max-width:48rem;">${content}</div>`;

/* ── Playground ──────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: (args) => wrap(formGroup(args)),
};

/* ── 기본 -────────────────────────────────── */
export const 기본 = {
  name: '기본 (Default)',
  parameters: { controls: { include: ['size'] } },
  render: ({ size }) => wrap(`
    ${formGroup({ label: '이름', size, type: 'text', placeholder: '이름을 입력하세요', hint: '실명으로 입력해 주세요.' })}
    ${formGroup({ label: '이메일', required: true, size, type: 'email', placeholder: 'example@domain.com', hint: '' })}
  `),
};

/* ── 크기 ────────────────────────────────── */
export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${formGroup({ label: 'Small', size: 'small', type: 'text', placeholder: 'Small 입력창' })}
    ${formGroup({ label: 'Medium', size: 'medium', type: 'text', placeholder: 'Medium 입력창' })}
    ${formGroup({ label: 'Large', size: 'large', type: 'text', placeholder: 'Large 입력창' })}
  `),
};

/* ── 상태 ────────────────────────────────── */
export const 상태 = {
  name: '상태 (State)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${formGroup({ label: '기본', size: 'large', type: 'text', placeholder: '기본 상태', hint: '도움말이 표시됩니다.' })}
    ${formGroup({ label: '비활성화', size: 'large', type: 'text', placeholder: '비활성화 상태', disabled: true, hint: '' })}
    ${formGroup({ label: '읽기 전용', size: 'large', type: 'text', placeholder: '읽기 전용', readonly: true, hint: '수정할 수 없습니다.' })}
    ${formGroup({ label: '에러', size: 'large', type: 'text', placeholder: '에러 상태', state: 'error', message: '입력값을 확인해 주세요.' })}
    ${formGroup({ label: '성공', size: 'large', type: 'text', placeholder: '성공 상태', state: 'success', message: '사용 가능한 아이디입니다.' })}
    ${formGroup({ label: '정보', size: 'large', type: 'text', placeholder: '정보 상태', state: 'information', message: '영문, 숫자 조합 8자 이상을 권장합니다.' })}
  `),
};

/* ── Password ────────────────────────────── */
export const Password = {
  name: 'Password',
  parameters: { controls: { include: ['size', 'disabled'] } },
  render: ({ size, disabled }) => {
    const id = 'pw-input';
    const disabledAttr = disabled ? 'disabled' : '';
    const sizeClass = size !== 'large' ? ` ds-input--${size}` : '';
    return wrap(`
      <div class="ds-form-group">
        <div class="ds-form-label">
          <label for="${id}">비밀번호</label>
        </div>
        <div class="ds-form-content ds-form-content--with-btn" data-delete="true">
          <input type="password" id="${id}" class="ds-input${sizeClass}"
            placeholder="8~12자의 영문자, 숫자, 특수문자 조합" value="password123" ${disabledAttr}>
          <div class="ds-form-content__actions">
            <button type="button" class="ds-btn ds-btn--medium ds-btn--icon ds-btn--pure ds-input__clear-btn"
              aria-label="내용 삭제"
              onclick="(function(btn){var inp=btn.closest('.ds-form-content').querySelector('.ds-input');inp.value='';inp.focus();})(this)">
              <span class="sr-only">내용 삭제</span>
              <i class="ds-icon ds-ico-delete-fill"></i>
            </button>
            <button type="button" class="ds-btn ds-btn--medium ds-btn--icon"
              aria-label="입력한 비밀번호 보기"
              onclick="(function(btn){var inp=btn.closest('.ds-form-content').querySelector('.ds-input');var isHidden=inp.type==='password';inp.type=isHidden?'text':'password';btn.querySelector('.sr-only').textContent=isHidden?'입력한 비밀번호 가리기':'입력한 비밀번호 보기';})(this)">
              <span class="sr-only">입력한 비밀번호 보기</span>
              <i class="ds-icon ds-ico-pw-visible"></i>
            </button>
          </div>
        </div>
        <p class="ds-form-hint">8~12자의 영문자, 숫자, 특수문자 조합으로 입력해 주세요.</p>
      </div>
    `);
  },
};

/* ── Search ──────────────────────────────── */
export const Search = {
  name: '검색 (Search)',
  parameters: { controls: { include: ['size', 'placeholder'] } },
  render: ({ size, placeholder }) => {
    const id = 'search-input';
    const sizeClass = size !== 'large' ? ` ds-input--${size}` : '';
    return wrap(`
      <div class="ds-form-group">
        <div class="ds-form-label">
          <label for="${id}">검색어</label>
        </div>
        <div class="ds-form-content ds-form-content--with-btn" data-delete="true">
          <input type="search" id="${id}" class="ds-input${sizeClass}"
            placeholder="${placeholder}">
          <div class="ds-form-content__actions">
            <button type="button" class="ds-btn ds-btn--medium ds-btn--icon ds-btn--pure ds-input__clear-btn"
              onclick="(function(btn){var inp=btn.closest('.ds-form-content').querySelector('.ds-input');inp.value='';inp.focus();})(this)">
              <span class="sr-only">내용 삭제</span>
              <i class="ds-icon ds-ico-delete-fill"></i>
            </button>
            <button type="button" class="ds-btn ds-btn--medium ds-btn--icon">
              <span class="sr-only">검색</span>
              <i class="ds-icon ds-ico-sch"></i>
            </button>
          </div>
        </div>
      </div>
    `);
  },
};

/* ── 글자 수 표시 ─────────────────────────── */
export const 글자수표시 = {
  name: '글자 수 표시',
  parameters: { controls: { include: ['size'] } },
  render: ({ size }) => {
    const max = 20;
    const sizeClass = size !== 'large' ? ` ds-input--${size}` : '';
    return wrap(`
      <div class="ds-form-group">
        <div class="ds-form-label">
          <label for="count-input">제목</label>
        </div>
        <div class="ds-form-content">
          <input type="text" id="count-input" class="ds-input${sizeClass}"
            placeholder="제목을 입력하세요" maxlength="${max}"
            oninput="(function(inp){document.getElementById('count-current').textContent=inp.value.length;})(this)">
          <p class="ds-count">
            <span class="ds-count__current" id="count-current">0</span>
            <span class="ds-count__max">/ ${max}</span>
          </p>
        </div>
      </div>
    `);
  },
};

/* ─── Textarea 헬퍼 ─────────────────────────────────────── */

function textareaGroup({ label, required, state, placeholder, disabled, readonly, hint, maxLength, showCount }) {
  const taId = `ta-${Math.random().toString(36).slice(2, 7)}`;
  const isError = state === 'error';
  const stateClass = isError ? ' ds-form-content--error' : '';
  const hintClass = isError ? 'ds-form-hint ds-form-hint--error' : 'ds-form-hint';
  const hintText = hint || '';

  const maxAttr = maxLength ? `maxlength="${maxLength}"` : '';
  /* closest 사용: ID 충돌 없이 카운트 갱신 */
  const onInput = showCount && maxLength
    ? `oninput="this.closest('.ds-textarea').querySelector('.ds-count__current').textContent=this.value.length"`
    : '';

  const countEl = showCount && maxLength ? `
    <p class="ds-count">
      <span class="ds-count__current" aria-live="polite">0</span>
      <span class="ds-count__max">/ ${maxLength}</span>
    </p>` : '';

  let innerBottom = '';
  let outerHint = '';

  if (showCount && maxLength) {
    if (isError && hintText) {
      /* 에러 + 글자 수 나란히 */
      innerBottom = `
        <div class="ds-textarea__bottom">
          <p class="ds-form-hint ds-form-hint--error">${hintText}</p>
          ${countEl}
        </div>`;
    } else {
      innerBottom = countEl;
      if (hintText) outerHint = `<p class="${hintClass}">${hintText}</p>`;
    }
  } else {
    if (hintText) outerHint = `<p class="${hintClass}">${hintText}</p>`;
  }

  return `
    <div class="ds-form-group">
      <div class="ds-form-label">
        <label for="${taId}">${label}${required ? '<span class="ds-form-label__required" aria-hidden="true">필수</span>' : ''}</label>
      </div>
      <div class="ds-form-content${stateClass}">
        <div class="ds-textarea">
          <textarea
            id="${taId}"
            class="ds-input"
            placeholder="${placeholder}"
            ${maxAttr}
            ${onInput}
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
          ></textarea>
          ${innerBottom}
        </div>
      </div>
      ${outerHint}
    </div>`;
}

/* ── Textarea Playground ─────────────────── */
export const 텍스트에어리어Playground = {
  name: 'Textarea Playground',
  argTypes: {
    maxLength: {
      control: { type: 'number', min: 10, step: 10 },
      description: '최대 글자 수',
      table: { category: '텍스트에어리어' },
    },
    showCount: {
      control: 'boolean',
      description: '글자 수 표시',
      table: { category: '텍스트에어리어' },
    },
  },
  args: {
    label: '내용',
    placeholder: '내용을 입력하세요',
    hint: '최대 200자까지 입력할 수 있습니다.',
    required: false,
    state: 'default',
    disabled: false,
    readonly: false,
    maxLength: 200,
    showCount: true,
  },
  parameters: {
    controls: {
      include: ['label', 'placeholder', 'hint', 'required', 'state', 'disabled', 'readonly', 'maxLength', 'showCount'],
    },
  },
  render: (args) => wrap(textareaGroup(args)),
};

/* ── 텍스트에어리어 기본 ──────────────────── */
export const 텍스트에어리어기본 = {
  name: '텍스트에어리어 기본',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${textareaGroup({
      label: '문의 내용',
      placeholder: '문의할 내용을 입력하세요',
      hint: '최대 500자까지 입력 가능합니다.',
      maxLength: 500,
      showCount: true,
    })}
    ${textareaGroup({
      label: '메모',
      required: true,
      placeholder: '메모를 입력하세요',
      showCount: false,
    })}
  `),
};

/* ── 텍스트에어리어 상태 ──────────────────── */
export const 텍스트에어리어상태 = {
  name: '텍스트에어리어 상태',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${textareaGroup({
      label: '기본',
      placeholder: '기본 상태',
      hint: '도움말이 표시됩니다.',
      maxLength: 200,
      showCount: true,
    })}
    ${textareaGroup({
      label: '비활성화',
      placeholder: '비활성화 상태',
      disabled: true,
      maxLength: 200,
      showCount: true,
    })}
    ${textareaGroup({
      label: '읽기 전용',
      placeholder: '읽기 전용 상태',
      readonly: true,
      hint: '수정할 수 없습니다.',
      maxLength: 200,
      showCount: true,
    })}
    ${textareaGroup({
      label: '에러',
      placeholder: '에러 상태',
      state: 'error',
      hint: '내용을 입력해 주세요.',
      maxLength: 200,
      showCount: true,
    })}
  `),
};

/* ── 전체 변형 ───────────────────────────── */
export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const types = [
      { type: 'text', label: 'Text', placeholder: '텍스트 입력' },
      { type: 'password', label: 'Password', placeholder: '비밀번호 입력' },
      { type: 'search', label: 'Search', placeholder: '검색어 입력' },
      { type: 'number', label: 'Number', placeholder: '숫자 입력' },
      { type: 'email', label: 'Email', placeholder: 'example@domain.com' },
      { type: 'tel', label: 'Tel', placeholder: '010-0000-0000' },
    ];
    return wrap(
      types.map(({ type, label, placeholder }) =>
        formGroup({ label, size: 'large', type, placeholder })
      ).join('')
    );
  },
};
