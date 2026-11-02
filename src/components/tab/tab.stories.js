import './tab.css';

export default {
  title: '컴포넌트/탐색/탭',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['line', 'fill'],
      description: '탭 종류',
      table: { category: '종류' },
    },
    full: {
      control: 'boolean',
      description: '전체 너비 (탭이 가로를 꽉 채움)',
      table: { category: '종류' },
    },
    tabs: {
      control: 'object',
      description: '탭 목록 (label, content, disabled)',
      table: { category: '내용' },
    },
  },
  args: {
    variant: 'line',
    full: false,
    tabs: [
      { label: '탭 1', content: '탭 1 영역의 콘텐츠입니다.' },
      { label: '탭 2', content: '탭 2 영역의 콘텐츠입니다.' },
      { label: '탭 3', content: '탭 3 영역의 콘텐츠입니다.' },
    ],
  },
};

/* ─── HTML 생성 헬퍼 ────────────────────────── */

function renderTab({ prefix, variant, full, tabs }) {
  const cls = `ds-tab ds-tab--${variant}${full ? ' ds-tab--full' : ''}`;

  const liItems = tabs.map((tab, i) => {
    const isActive = i === 0 && !tab.disabled;
    const tabId = `${prefix}-tab-${i}`;
    const panelId = `${prefix}-panel-${i}`;
    const disabledAttr = tab.disabled ? 'aria-disabled="true"' : '';
    const itemClass = isActive ? 'ds-tab__item ds-tab__item--selected' : 'ds-tab__item';
    return `
      <li
        class="${itemClass}"
        id="${tabId}"
        role="tab"
        aria-selected="${isActive ? 'true' : 'false'}"
        aria-controls="${panelId}"
        ${disabledAttr}
      >
        <button type="button" class="ds-tab__btn" ${tab.disabled ? 'disabled' : ''}>
          ${tab.label}${isActive ? '<i class="sr-only created"> 선택됨</i>' : ''}
        </button>
      </li>`;
  }).join('');

  const panels = tabs.map((tab, i) => {
    const isActive = i === 0 && !tab.disabled;
    const tabId = `${prefix}-tab-${i}`;
    const panelId = `${prefix}-panel-${i}`;
    return `
      <section
        id="${panelId}"
        role="tabpanel"
        aria-labelledby="${tabId}"
        class="ds-tab__panel${isActive ? ' ds-tab__panel--selected' : ''}"
        tabindex="0"
      >
        <h3 class="sr-only">${tab.label} 영역</h3>
        <p>${tab.content || tab.label + ' 영역의 콘텐츠입니다.'}</p>
      </section>`;
  }).join('');

  return `
    <div class="${cls}">
      <div class="ds-tab__nav">
        <ul class="ds-tab__list" role="tablist" aria-label="${prefix} 탭">
          ${liItems}
        </ul>
      </div>
      <div class="ds-tab__panels">
        ${panels}
      </div>
    </div>`;
}

/* ─── 탭 동작 JS ────────────────────────────── */

function activateTab(tabList, targetLi) {
  const allTabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

  allTabs.forEach(li => {
    const isActive = li === targetLi;
    li.setAttribute('aria-selected', String(isActive));
    li.classList.toggle('ds-tab__item--selected', isActive);

    const btn = li.querySelector('.ds-tab__btn');
    const srOnly = btn?.querySelector('.sr-only.created');
    if (isActive) {
      if (btn && !srOnly) {
        const el = document.createElement('i');
        el.className = 'sr-only created';
        el.textContent = ' 선택됨';
        btn.appendChild(el);
      }
    } else {
      srOnly?.remove();
    }

    const panelId = li.getAttribute('aria-controls');
    if (panelId) {
      const panel = li.ownerDocument.getElementById(panelId);
      if (panel) panel.classList.toggle('ds-tab__panel--selected', isActive);
    }
  });
}

function initTabs(canvasElement) {
  canvasElement.querySelectorAll('[role="tablist"]').forEach(tabList => {
    /* 클릭으로 탭 전환 */
    tabList.querySelectorAll('[role="tab"] .ds-tab__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        activateTab(tabList, btn.closest('[role="tab"]'));
      });
    });

    /* 방향키·Home·End 탐색 */
    tabList.addEventListener('keydown', e => {
      const enabled = Array.from(
        tabList.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')
      );
      const active = tabList.querySelector('[role="tab"][aria-selected="true"]');
      let idx = enabled.indexOf(active);

      const moves = {
        ArrowRight: 1, ArrowDown: 1,
        ArrowLeft: -1, ArrowUp: -1,
      };

      if (moves[e.key] !== undefined) {
        e.preventDefault();
        idx = (idx + moves[e.key] + enabled.length) % enabled.length;
        activateTab(tabList, enabled[idx]);
        enabled[idx].querySelector('.ds-tab__btn')?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        activateTab(tabList, enabled[0]);
        enabled[0].querySelector('.ds-tab__btn')?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        activateTab(tabList, enabled[enabled.length - 1]);
        enabled[enabled.length - 1].querySelector('.ds-tab__btn')?.focus();
      }
    });
  });
}

const play = async ({ canvasElement }) => initTabs(canvasElement);

/* ─── Playground ────────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: ({ variant, full, tabs }) =>
    renderTab({ prefix: 'pg', variant, full, tabs }),
  play,
};

/* ─── 라인형 ────────────────────────────────── */
export const 라인형 = {
  name: '라인형 (Line)',
  parameters: { controls: { disable: true } },
  render: () => renderTab({
    prefix: 'line',
    variant: 'line',
    full: false,
    tabs: [
      { label: '전체', content: '전체 목록을 표시합니다.' },
      { label: '진행 중', content: '진행 중인 항목을 표시합니다.' },
      { label: '완료', content: '완료된 항목을 표시합니다.' },
      { label: '취소', content: '취소된 항목을 표시합니다.' },
    ],
  }),
  play,
};

/* ─── 라인형 전체 너비 ─────────────────────── */
export const 라인형전체너비 = {
  name: '라인형 전체 너비 (Line Full)',
  parameters: { controls: { disable: true } },
  render: () => renderTab({
    prefix: 'line-full',
    variant: 'line',
    full: true,
    tabs: [
      { label: '개인 정보', content: '개인 정보 설정 영역입니다.' },
      { label: '보안', content: '보안 설정 영역입니다.' },
      { label: '알림', content: '알림 설정 영역입니다.' },
    ],
  }),
  play,
};

/* ─── 박스형 ────────────────────────────────── */
export const 박스형 = {
  name: '박스형 (Fill)',
  parameters: { controls: { disable: true } },
  render: () => renderTab({
    prefix: 'fill',
    variant: 'fill',
    full: false,
    tabs: [
      { label: '전체', content: '전체 목록을 표시합니다.' },
      { label: '진행 중', content: '진행 중인 항목을 표시합니다.' },
      { label: '완료', content: '완료된 항목을 표시합니다.' },
    ],
  }),
  play,
};

/* ─── 박스형 전체 너비 ─────────────────────── */
export const 박스형전체너비 = {
  name: '박스형 전체 너비 (Fill Full)',
  parameters: { controls: { disable: true } },
  render: () => renderTab({
    prefix: 'fill-full',
    variant: 'fill',
    full: true,
    tabs: [
      { label: '일', content: '일별 데이터를 표시합니다.' },
      { label: '주', content: '주별 데이터를 표시합니다.' },
      { label: '월', content: '월별 데이터를 표시합니다.' },
      { label: '연', content: '연별 데이터를 표시합니다.' },
    ],
  }),
  play,
};

/* ─── 비활성화 탭 ───────────────────────────── */
export const 비활성화탭 = {
  name: '비활성화 탭',
  parameters: { controls: { disable: true } },
  render: () => renderTab({
    prefix: 'dis',
    variant: 'line',
    full: false,
    tabs: [
      { label: '활성 탭 1', content: '첫 번째 탭 콘텐츠입니다.' },
      { label: '비활성화', content: '', disabled: true },
      { label: '활성 탭 3', content: '세 번째 탭 콘텐츠입니다.' },
    ],
  }),
  play,
};

/* ─── 전체 변형 ─────────────────────────────── */
export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const tabs3 = [
      { label: '탭 1', content: '첫 번째 탭 콘텐츠.' },
      { label: '탭 2', content: '두 번째 탭 콘텐츠.' },
      { label: '탭 3', content: '세 번째 탭 콘텐츠.' },
    ];

    const sections = [
      { prefix: 'av-line',      variant: 'line', full: false, label: '라인형' },
      { prefix: 'av-line-full', variant: 'line', full: true,  label: '라인형 전체 너비' },
      { prefix: 'av-fill',      variant: 'fill', full: false, label: '박스형' },
      { prefix: 'av-fill-full', variant: 'fill', full: true,  label: '박스형 전체 너비' },
    ];

    return sections.map(({ prefix, variant, full, label }) => `
      <section style="margin-bottom: 4rem;">
        <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.6rem;
                   color: var(--krds-light-color-text-bolder);">${label}</h2>
        ${renderTab({ prefix, variant, full, tabs: tabs3 })}
      </section>
    `).join('');
  },
  play,
};
