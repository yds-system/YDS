import './accordion.css';

export default {
  title: 'Components/Accordion',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'line'],
      description: '스타일 유형 (default: 박스형, line: 라인형)',
      table: { category: '종류' },
    },
    mode: {
      control: { type: 'select' },
      options: ['single', 'multi'],
      description: '하나만 열기 (single) / 여러 개 동시 열기 (multi)',
      table: { category: '종류' },
    },
    initialOpen: {
      control: { type: 'select' },
      options: [-1, 0, 1, 2],
      description: '처음부터 열어둘 항목 인덱스 (-1: 모두 닫음)',
      table: { category: '상태' },
    },
  },
  args: {
    type: 'default',
    mode: 'single',
    initialOpen: -1,
  },
};

/* ─── 샘플 데이터 ───────────────────────────── */

const ITEMS = [
  {
    title: '아코디언 타이틀 1 — 자주 묻는 질문',
    content: `<p>아코디언 내용 영역입니다. 텍스트, 이미지, 목록 등 다양한 콘텐츠를 포함할 수 있습니다.</p>
              <p style="margin-top:0.8rem;">추가 안내 문구나 링크도 자유롭게 배치할 수 있습니다.</p>`,
  },
  {
    title: '아코디언 타이틀 2 — 서비스 이용 안내',
    content: `<ul style="padding-left:1.6rem; list-style:disc;">
                <li>이용 시간: 평일 09:00 ~ 18:00</li>
                <li>점심 시간: 12:00 ~ 13:00 제외</li>
                <li>공휴일 및 주말에는 운영하지 않습니다.</li>
              </ul>`,
  },
  {
    title: '아코디언 타이틀 3 — 개인정보 처리 방침',
    content: `<p>개인정보는 서비스 제공 목적에 한하여 수집·이용되며, 관련 법령에 따라 안전하게 관리됩니다.</p>`,
  },
  {
    title: '아코디언 타이틀 4 — 문의 및 고객 지원',
    content: `<p>고객센터: 1234-5678 (평일 09:00 ~ 18:00)</p>
              <p style="margin-top:0.8rem;">이메일: support@example.com</p>`,
  },
];

/* ─── HTML 생성 헬퍼 ────────────────────────── */

function renderAccordion({ type, mode, initialOpen, items = ITEMS }) {
  const typeClass = type === 'line' ? ' ds-accordion--line' : '';
  const dataType  = mode === 'multi' ? ' data-type="multiOpen"' : '';

  const itemsHtml = items.map((item, i) => {
    const isOpen       = initialOpen === i;
    const itemOpenClass = isOpen ? ' ds-accordion__item--open' : '';
    const btnOpenClass  = isOpen ? ' ds-accordion__btn--open' : '';
    return `
      <div class="ds-accordion__item${itemOpenClass}">
        <h2 class="ds-accordion__header">
          <button type="button" class="ds-accordion__btn${btnOpenClass}">
            ${item.title}
          </button>
        </h2>
        <div class="ds-accordion__collapse">
          <div class="ds-accordion__body">
            ${item.content}
          </div>
        </div>
      </div>`;
  }).join('');

  return `<div class="ds-accordion${typeClass}"${dataType}>${itemsHtml}</div>`;
}

const wrap = (html) =>
  `<div style="max-width:72rem;">${html}</div>`;

/* ─── JS 초기화 ─────────────────────────────── */

function initAccordion(canvasElement) {
  canvasElement.querySelectorAll('.ds-accordion').forEach(container => {
    const mode  = container.dataset.type || 'singleOpen';
    const items = Array.from(container.querySelectorAll('.ds-accordion__item'));

    items.forEach((item, idx) => {
      const btn   = item.querySelector('.ds-accordion__btn');
      const panel = item.querySelector('.ds-accordion__collapse');
      if (!btn || !panel) return;

      /* aria 속성 설정 */
      const uid     = `${idx}-${Math.random().toString(36).slice(2, 7)}`;
      const headId  = `accordion-hd-${uid}`;
      const panelId = `accordion-pnl-${uid}`;

      btn.id = headId;
      btn.setAttribute('aria-controls', panelId);
      btn.setAttribute('aria-expanded', item.classList.contains('ds-accordion__item--open') ? 'true' : 'false');

      panel.id = panelId;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', headId);

      /* 클릭 핸들러 */
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        /* 하나만 열기 모드: 다른 항목 닫기 */
        if (mode !== 'multiOpen' && !isExpanded) {
          items.forEach(otherItem => {
            if (otherItem === item) return;
            const otherBtn = otherItem.querySelector('.ds-accordion__btn');
            otherBtn?.setAttribute('aria-expanded', 'false');
            otherBtn?.classList.remove('ds-accordion__btn--open');
            otherItem.classList.remove('ds-accordion__item--open');
          });
        }

        /* 현재 항목 토글 */
        const next = !isExpanded;
        btn.setAttribute('aria-expanded', String(next));
        btn.classList.toggle('ds-accordion__btn--open', next);
        item.classList.toggle('ds-accordion__item--open', next);
      });
    });
  });
}

const play = async ({ canvasElement }) => initAccordion(canvasElement);

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(renderAccordion(args)),
  play,
};

/* ─── 기본형 (박스) ──────────────────────────── */

export const 기본형 = {
  name: '기본형 (Default)',
  parameters: { controls: { disable: true } },
  render: () => wrap(renderAccordion({ type: 'default', mode: 'single', initialOpen: -1 })),
  play,
};

/* ─── 라인형 ────────────────────────────────── */

export const 라인형 = {
  name: '라인형 (Line)',
  parameters: { controls: { disable: true } },
  render: () => wrap(renderAccordion({ type: 'line', mode: 'single', initialOpen: -1 })),
  play,
};

/* ─── 여러 개 동시 열기 ──────────────────────── */

export const 여러개열기 = {
  name: '여러 개 열기 (Multi Open)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    <p style="font-size:1.3rem; color:var(--krds-light-color-text-subtle);
              margin-bottom:1.6rem;">data-type="multiOpen" — 여러 항목을 동시에 열 수 있습니다.</p>
    ${renderAccordion({ type: 'default', mode: 'multi', initialOpen: 0 })}
  `),
  play,
};

/* ─── 처음 열린 상태 ─────────────────────────── */

export const 처음열린상태 = {
  name: '처음 열린 상태 (Initially Open)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    <div style="margin-bottom:3.2rem;">
      <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">기본형 — 첫 번째 항목 열림</p>
      ${renderAccordion({ type: 'default', mode: 'single', initialOpen: 0 })}
    </div>
    <div>
      <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">라인형 — 두 번째 항목 열림</p>
      ${renderAccordion({ type: 'line', mode: 'single', initialOpen: 1 })}
    </div>
  `),
  play,
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, html) => `
      <section style="margin-bottom:4rem;">
        <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.6rem;
                   color:var(--krds-light-color-text-bolder);">${title}</h2>
        ${html}
      </section>`;

    return wrap(`
      ${section('기본형 — 하나만 열기 (Single)',
        renderAccordion({ type: 'default', mode: 'single', initialOpen: 0 })
      )}
      ${section('기본형 — 여러 개 열기 (Multi)',
        renderAccordion({ type: 'default', mode: 'multi', initialOpen: 0 })
      )}
      ${section('라인형 — 하나만 열기 (Single)',
        renderAccordion({ type: 'line', mode: 'single', initialOpen: 0 })
      )}
      ${section('라인형 — 여러 개 열기 (Multi)',
        renderAccordion({ type: 'line', mode: 'multi', initialOpen: 0 })
      )}
    `);
  },
  play,
};
