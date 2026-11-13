import './switch.scss';

export default {
  title: 'Components/Toggle Switch',
  argTypes: {
    label: {
      control: 'text',
      description: '레이블 텍스트',
      table: { category: '내용' },
    },
    size: {
      control: 'radio',
      options: ['large', 'medium'],
      description: '크기',
      table: { category: '크기' },
    },
    checked: {
      control: 'boolean',
      description: '켜짐 여부',
      table: { category: '상태' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { category: '상태' },
    },
  },
  args: {
    label: '노출',
    size: 'large',
    checked: false,
    disabled: false,
  },
};

let _id = 0;

/** KRDS .krds-form-toggle-switch 구조를 YDS BEM으로 이식 */
function switchEl({ label = '', size = 'large', checked = false, disabled = false } = {}) {
  const id = `sw-${++_id}`;
  const sizeClass = size === 'medium' ? 'yds-switch yds-switch--medium' : 'yds-switch yds-switch--large';
  const checkedAttr = checked ? ' checked' : '';
  const disabledAttr = disabled ? ' disabled' : '';
  const labelText = label ? `\n    ${label}` : '';
  return `<div class="${sizeClass}">
  <input class="yds-switch__input" type="checkbox" id="${id}"${checkedAttr}${disabledAttr} aria-label="${label || '스위치'}">
  <label class="yds-switch__label" for="${id}">
    <span class="yds-switch__track" aria-hidden="true">
      <span class="yds-switch__thumb"></span>
    </span>${labelText}
  </label>
</div>`;
}

const row = (content) =>
  `<div style="display:flex;gap:2.4rem;flex-wrap:wrap;align-items:center;">${content}</div>`;

/* ── Playground ─────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: ({ label, size, checked, disabled }) =>
    switchEl({ label, size, checked, disabled }),
};

/* ── 크기 ───────────────────────────────── */
export const 크기 = {
  name: '크기 (Sizes)',
  parameters: { controls: { disable: true } },
  render: () => row(`
    ${switchEl({ label: 'Large (기본)', size: 'large' })}
    ${switchEl({ label: 'Medium', size: 'medium' })}
  `),
};

/* ── 상태 ───────────────────────────────── */
export const 상태 = {
  name: '상태 (States)',
  parameters: { controls: { disable: true } },
  render: () => row(`
    ${switchEl({ label: '꺼짐', size: 'large', checked: false })}
    ${switchEl({ label: '켜짐', size: 'large', checked: true })}
    ${switchEl({ label: '비활성 꺼짐', size: 'large', disabled: true })}
    ${switchEl({ label: '비활성 켜짐', size: 'large', checked: true, disabled: true })}
  `),
};

/* ── 전체 변형 ──────────────────────────── */
export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => `
    <table style="border-collapse:collapse;">
      <thead>
        <tr style="border-bottom:1px solid #eee;">
          <th style="padding:.6rem 1.6rem;font-size:1.3rem;text-align:left;">크기</th>
          <th style="padding:.6rem 1.6rem;font-size:1.3rem;text-align:left;">꺼짐</th>
          <th style="padding:.6rem 1.6rem;font-size:1.3rem;text-align:left;">켜짐</th>
          <th style="padding:.6rem 1.6rem;font-size:1.3rem;text-align:left;">비활성 꺼짐</th>
          <th style="padding:.6rem 1.6rem;font-size:1.3rem;text-align:left;">비활성 켜짐</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:.8rem 1.6rem;font-size:1.4rem;color:#666;">Large</td>
          <td style="padding:.8rem 1.6rem;">${switchEl({ label: '꺼짐', size: 'large' })}</td>
          <td style="padding:.8rem 1.6rem;">${switchEl({ label: '켜짐', size: 'large', checked: true })}</td>
          <td style="padding:.8rem 1.6rem;">${switchEl({ label: '비활성', size: 'large', disabled: true })}</td>
          <td style="padding:.8rem 1.6rem;">${switchEl({ label: '비활성', size: 'large', checked: true, disabled: true })}</td>
        </tr>
        <tr>
          <td style="padding:.8rem 1.6rem;font-size:1.4rem;color:#666;">Medium</td>
          <td style="padding:.8rem 1.6rem;">${switchEl({ label: '꺼짐', size: 'medium' })}</td>
          <td style="padding:.8rem 1.6rem;">${switchEl({ label: '켜짐', size: 'medium', checked: true })}</td>
          <td style="padding:.8rem 1.6rem;">${switchEl({ label: '비활성', size: 'medium', disabled: true })}</td>
          <td style="padding:.8rem 1.6rem;">${switchEl({ label: '비활성', size: 'medium', checked: true, disabled: true })}</td>
        </tr>
      </tbody>
    </table>
  `,
};
