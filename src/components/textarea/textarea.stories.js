import '../form-group/form-group.css';
import '../button/button.css';
import '../text-input/text-input.css';

export default {
  title: 'Components/Textarea',
  argTypes: {
    label: { control: 'text', description: '레이블 텍스트', table: { category: '내용' } },
    placeholder: { control: 'text', description: '플레이스홀더', table: { category: '내용' } },
    hint: { control: 'text', description: '도움말 텍스트', table: { category: '내용' } },
    required: { control: 'boolean', description: '필수 입력 여부', table: { category: '내용' } },
    state: { control: { type: 'select' }, options: ['default', 'error'], description: '상태', table: { category: '상태' } },
    disabled: { control: 'boolean', description: '비활성화', table: { category: '상태' } },
    readonly: { control: 'boolean', description: '읽기 전용', table: { category: '상태' } },
    maxLength: { control: { type: 'number', min: 10, step: 10 }, description: '최대 글자 수', table: { category: '글자 수' } },
    showCount: { control: 'boolean', description: '글자 수 표시', table: { category: '글자 수' } },
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

const wrap = (content) =>
  `<div class="ds-fieldset" style="max-width:48rem;">${content}</div>`;

/* ── Playground ──────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: (args) => wrap(textareaGroup(args)),
};

/* ── 기본 ────────────────────────────────── */
export const 기본 = {
  name: '기본 (Default)',
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

/* ── 상태 ────────────────────────────────── */
export const 상태 = {
  name: '상태 (State)',
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
  render: () => wrap(`
    ${textareaGroup({
      label: '기본',
      placeholder: '내용을 입력하세요',
      hint: '최대 200자까지 입력할 수 있습니다.',
      maxLength: 200,
      showCount: true,
    })}
    ${textareaGroup({
      label: '필수 입력',
      required: true,
      placeholder: '필수 항목입니다',
      maxLength: 500,
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
      placeholder: '읽기 전용',
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
    ${textareaGroup({
      label: '글자 수 없음',
      placeholder: '글자 수 표시 없이 사용',
      showCount: false,
    })}
  `),
};
