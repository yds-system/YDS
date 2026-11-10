import './tooltip.scss';
import '../button/button.scss';

export default {
  title: 'Components/Tooltip',
  argTypes: {
    text: {
      control: { type: 'text' },
      description: '툴팁에 표시할 텍스트',
      table: { category: '내용' },
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: '툴팁이 나타나는 방향',
      table: { category: '종류' },
    },
    style: {
      control: { type: 'select' },
      options: ['inline', 'box'],
      description: '인라인형(검은 배경) / 박스형(흰 배경, 테두리)',
      table: { category: '종류' },
    },
    triggerLabel: {
      control: { type: 'text' },
      description: '트리거 버튼 레이블',
      table: { category: '내용' },
    },
  },
  args: {
    text: '툴팁 안내 텍스트입니다.',
    position: 'top',
    style: 'inline',
    triggerLabel: '툴팁 버튼',
  },
};

/* ─── 트리거 HTML ──────────────────────────── */

function trigger({ label, tooltip, position, style }) {
  return `<button type="button" class="yds-btn yds-btn--medium yds-tooltip"
            data-tooltip="${tooltip}"
            data-position="${position}"
            data-style="${style}">
    ${label}
  </button>`;
}

const wrap = (html) =>
  `<div style="display:flex; align-items:center; justify-content:center;
               min-height:16rem; padding:4rem;">${html}</div>`;

/* ─── JS 초기화 ─────────────────────────────── */

function initTooltip(canvasElement) {
  /* 팝오버 1개를 공유해서 사용 */
  let popover = canvasElement.querySelector('.yds-tooltip-popover');
  if (!popover) {
    popover = document.createElement('div');
    popover.className = 'yds-tooltip-popover';
    popover.setAttribute('role', 'tooltip');
    canvasElement.appendChild(popover);
  }

  let hideTimer = null;

  function showTooltip(trigger) {
    clearTimeout(hideTimer);

    const text     = trigger.dataset.tooltip || '';
    const position = trigger.dataset.position || 'top';
    const style    = trigger.dataset.style    || 'inline';

    /* 내용 & 클래스 갱신 */
    popover.textContent = text;
    popover.className = 'yds-tooltip-popover';
    if (style === 'box')   popover.classList.add('yds-tooltip-popover--box');
    popover.classList.add(`yds-tooltip-popover--${position}`);

    /* aria 연결 */
    if (!trigger.id) {
      trigger.id = `tooltip-trigger-${Math.random().toString(36).slice(2, 7)}`;
    }
    const popId = `${trigger.id}-popover`;
    popover.id = popId;
    trigger.setAttribute('aria-describedby', popId);

    /* 먼저 보여야 크기를 잴 수 있음 */
    popover.classList.add('yds-tooltip-popover--open');

    /* 위치 계산 */
    const gap = 12;
    const tr  = trigger.getBoundingClientRect();
    const pr  = popover.getBoundingClientRect();

    let top, left;

    if (position === 'top') {
      top  = tr.top  - pr.height - gap;
      left = tr.left + tr.width / 2 - pr.width / 2;
    } else if (position === 'bottom') {
      top  = tr.bottom + gap;
      left = tr.left + tr.width / 2 - pr.width / 2;
    } else if (position === 'left') {
      top  = tr.top + tr.height / 2 - pr.height / 2;
      left = tr.left - pr.width - gap;
    } else { /* right */
      top  = tr.top + tr.height / 2 - pr.height / 2;
      left = tr.right + gap;
    }

    /* 뷰포트 경계 보정 */
    const margin = 8;
    left = Math.max(margin, Math.min(left, window.innerWidth  - pr.width  - margin));
    top  = Math.max(margin, Math.min(top,  window.innerHeight - pr.height - margin));

    popover.style.top  = `${top}px`;
    popover.style.left = `${left}px`;
  }

  function hideTooltip(trigger) {
    hideTimer = setTimeout(() => {
      popover.classList.remove('yds-tooltip-popover--open');
      if (trigger) trigger.removeAttribute('aria-describedby');
    }, 100);
  }

  /* Escape 키 닫기 */
  function onKeydown(e) {
    if (e.key === 'Escape') {
      popover.classList.remove('yds-tooltip-popover--open');
      document.removeEventListener('keydown', onKeydown);
    }
  }

  canvasElement.querySelectorAll('.yds-tooltip').forEach(el => {
    el.addEventListener('mouseenter', () => {
      showTooltip(el);
      document.addEventListener('keydown', onKeydown);
    });
    el.addEventListener('mouseleave', () => hideTooltip(el));
    el.addEventListener('focus',      () => {
      showTooltip(el);
      document.addEventListener('keydown', onKeydown);
    });
    el.addEventListener('blur',       () => hideTooltip(el));
  });
}

const play = async ({ canvasElement }) => initTooltip(canvasElement);

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(trigger({
    label:    args.triggerLabel,
    tooltip:  args.text,
    position: args.position,
    style:    args.style,
  })),
  play,
};

/* ─── 위치 ──────────────────────────────────── */

export const 위치 = {
  name: '위치 (Position)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:2.4rem; padding:6rem 4rem;">
      <div style="display:flex; align-items:center; justify-content:center; min-height:10rem;">
        ${trigger({ label: '위쪽 (top)', tooltip: '위쪽에 표시되는 툴팁입니다.', position: 'top', style: 'inline' })}
      </div>
      <div style="display:flex; align-items:center; justify-content:center; min-height:10rem;">
        ${trigger({ label: '아래쪽 (bottom)', tooltip: '아래쪽에 표시되는 툴팁입니다.', position: 'bottom', style: 'inline' })}
      </div>
      <div style="display:flex; align-items:center; justify-content:center; min-height:10rem;">
        ${trigger({ label: '왼쪽 (left)', tooltip: '왼쪽에 표시되는 툴팁입니다.', position: 'left', style: 'inline' })}
      </div>
      <div style="display:flex; align-items:center; justify-content:center; min-height:10rem;">
        ${trigger({ label: '오른쪽 (right)', tooltip: '오른쪽에 표시되는 툴팁입니다.', position: 'right', style: 'inline' })}
      </div>
    </div>`,
  play,
};

/* ─── 스타일 ─────────────────────────────────── */

export const 스타일 = {
  name: '스타일 (Style)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="display:flex; gap:4rem; align-items:center; justify-content:center;
                flex-wrap:wrap; min-height:16rem; padding:4rem;">
      ${trigger({
        label:    '인라인형 (기본)',
        tooltip:  '검은 배경의 간결한 인라인 툴팁입니다.',
        position: 'top',
        style:    'inline',
      })}
      ${trigger({
        label:    '박스형',
        tooltip:  '흰 배경과 테두리를 가진 박스형 툴팁입니다. 더 긴 안내 문구나 여러 줄 텍스트에 적합합니다.',
        position: 'top',
        style:    'box',
      })}
    </div>`,
  play,
};

/* ─── 트리거 유형 ────────────────────────────── */

export const 트리거유형 = {
  name: '트리거 유형 (Trigger Types)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="display:flex; gap:4rem; align-items:center; justify-content:center;
                flex-wrap:wrap; min-height:16rem; padding:4rem;">
      ${trigger({
        label:    '텍스트 버튼',
        tooltip:  '버튼에 연결된 툴팁입니다.',
        position: 'top',
        style:    'inline',
      })}
      <span class="yds-tooltip"
            tabindex="0"
            data-tooltip="span 요소에 연결된 툴팁입니다."
            data-position="top"
            data-style="inline"
            style="cursor:default; text-decoration:underline dotted;
                   font-size:1.4rem; color:var(--krds-light-color-text-basic);">
        텍스트 요소
      </span>
      <span style="display:inline-flex; align-items:center; gap:0.4rem;
                   font-size:1.4rem; color:var(--krds-light-color-text-basic);">
        도움말
        <button type="button"
                class="yds-tooltip"
                aria-label="자세한 도움말 보기"
                data-tooltip="도움말 아이콘 버튼에 연결된 툴팁입니다."
                data-position="right"
                data-style="inline"
                style="display:inline-flex; align-items:center; justify-content:center;
                       width:1.6rem; height:1.6rem; border:none; background:none;
                       cursor:pointer; color:var(--krds-light-color-icon-gray);">
          <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 10.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM8 9a.75.75 0 0 1-.75-.75V5.5a.75.75 0 0 1 1.5 0v2.75A.75.75 0 0 1 8 9Z"/>
          </svg>
        </button>
      </span>
    </div>`,
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

    const posRow = (style) => `
      <div style="display:flex; gap:3.2rem; flex-wrap:wrap; align-items:center;
                  padding:4rem; justify-content:center;">
        ${['top','bottom','left','right'].map(pos =>
          trigger({ label: pos, tooltip: `${pos} 방향 툴팁`, position: pos, style })
        ).join('')}
      </div>`;

    return `<div style="max-width:72rem; padding:2rem;">
      ${section('인라인형 — 위치별', posRow('inline'))}
      ${section('박스형 — 위치별', posRow('box'))}
    </div>`;
  },
  play,
};
