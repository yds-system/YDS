import '../form-group/form-group.css';
import '../button/button.css';
import './text-input.css';

export default {
  title: 'Components/Text Input',
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
    ? ` yds-form-content--${state === 'error' ? 'error' : state === 'success' ? 'success' : 'info'}`
    : '';
  const hintClass = state === 'error' ? 'yds-form-hint yds-form-hint--error'
    : state === 'success' ? 'yds-form-hint yds-form-hint--success'
    : state === 'information' ? 'yds-form-hint yds-form-hint--info'
    : 'yds-form-hint';
  const hintText = message || hint || '';
  const inputId = `input-${Math.random().toString(36).slice(2, 7)}`;
  const sizeClass = size !== 'large' ? ` yds-input--${size}` : '';

  return `
    <div class="yds-form-group">
      <div class="yds-form-label">
        <label for="${inputId}">${label}${required ? '<span class="yds-form-label__required" aria-hidden="true">필수</span>' : ''}</label>
      </div>
      <div class="yds-form-content${stateClass}${extra}">
        <input
          type="${type}"
          id="${inputId}"
          class="yds-input${sizeClass}"
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
  `<div class="yds-fieldset" style="max-width:48rem;">${content}</div>`;

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
    const sizeClass = size !== 'large' ? ` yds-input--${size}` : '';
    return wrap(`
      <div class="yds-form-group">
        <div class="yds-form-label">
          <label for="${id}">비밀번호</label>
        </div>
        <div class="yds-form-content yds-form-content--with-btn" data-delete="true">
          <input type="password" id="${id}" class="yds-input${sizeClass}"
            placeholder="8~12자의 영문자, 숫자, 특수문자 조합" value="password123" ${disabledAttr}>
          <div class="yds-form-content__actions">
            <button type="button" class="yds-btn yds-btn--medium yds-btn--icon yds-btn--pure yds-input__clear-btn"
              aria-label="내용 삭제"
              onclick="(function(btn){var inp=btn.closest('.yds-form-content').querySelector('.yds-input');inp.value='';inp.focus();})(this)">
              <span class="sr-only">내용 삭제</span>
              <i class="yds-icon yds-ico-delete-fill"></i>
            </button>
            <button type="button" class="yds-btn yds-btn--medium yds-btn--icon"
              aria-label="입력한 비밀번호 보기"
              onclick="(function(btn){var inp=btn.closest('.yds-form-content').querySelector('.yds-input');var isHidden=inp.type==='password';inp.type=isHidden?'text':'password';btn.querySelector('.sr-only').textContent=isHidden?'입력한 비밀번호 가리기':'입력한 비밀번호 보기';})(this)">
              <span class="sr-only">입력한 비밀번호 보기</span>
              <i class="yds-icon yds-ico-pw-visible"></i>
            </button>
          </div>
        </div>
        <p class="yds-form-hint">8~12자의 영문자, 숫자, 특수문자 조합으로 입력해 주세요.</p>
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
    const sizeClass = size !== 'large' ? ` yds-input--${size}` : '';
    return wrap(`
      <div class="yds-form-group">
        <div class="yds-form-label">
          <label for="${id}">검색어</label>
        </div>
        <div class="yds-form-content yds-form-content--with-btn" data-delete="true">
          <input type="search" id="${id}" class="yds-input${sizeClass}"
            placeholder="${placeholder}">
          <div class="yds-form-content__actions">
            <button type="button" class="yds-btn yds-btn--medium yds-btn--icon yds-btn--pure yds-input__clear-btn"
              onclick="(function(btn){var inp=btn.closest('.yds-form-content').querySelector('.yds-input');inp.value='';inp.focus();})(this)">
              <span class="sr-only">내용 삭제</span>
              <i class="yds-icon yds-ico-delete-fill"></i>
            </button>
            <button type="button" class="yds-btn yds-btn--medium yds-btn--icon">
              <span class="sr-only">검색</span>
              <i class="yds-icon yds-ico-sch"></i>
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
    const sizeClass = size !== 'large' ? ` yds-input--${size}` : '';
    return wrap(`
      <div class="yds-form-group">
        <div class="yds-form-label">
          <label for="count-input">제목</label>
        </div>
        <div class="yds-form-content">
          <input type="text" id="count-input" class="yds-input${sizeClass}"
            placeholder="제목을 입력하세요" maxlength="${max}"
            oninput="(function(inp){document.getElementById('count-current').textContent=inp.value.length;})(this)">
          <p class="yds-count">
            <span class="yds-count__current" id="count-current">0</span>
            <span class="yds-count__max">/ ${max}</span>
          </p>
        </div>
      </div>
    `);
  },
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
