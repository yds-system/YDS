import '../form-group/form-group.css';
import '../button/button.css';
import '../text-input/text-input.css';
import './date-input.css';

export default {
  title: '컴포넌트/입력/날짜 입력',
  argTypes: {
    label: {
      control: 'text',
      description: '레이블 텍스트',
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
    state: {
      control: { type: 'select' },
      options: ['default', 'error'],
      description: '상태',
      table: { category: '상태' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
      table: { category: '상태' },
    },
  },
  args: {
    label: '날짜',
    hint: '날짜를 선택하세요.',
    required: false,
    state: 'default',
    disabled: false,
  },
};

/* ─── HTML 생성 헬퍼 ────────────────────────── */

function uid() {
  return Math.random().toString(36).slice(2, 7);
}

function renderSingle({ label, hint, required, state, disabled }) {
  const id = `cal-${uid()}`;
  const stateClass = state === 'error' ? ' ds-form-content--error' : '';
  const hintClass = state === 'error' ? 'ds-form-hint ds-form-hint--error' : 'ds-form-hint';
  const dis = disabled ? ' disabled' : '';

  return `
    <div class="ds-form-group">
      <div class="ds-form-label">
        <label for="${id}">${label}${required ? '<span class="ds-form-label__required" aria-hidden="true">필수</span>' : ''}</label>
      </div>
      <div class="ds-form-content calendar-conts${stateClass}">
        <div class="calendar-input">
          <input type="text" id="${id}" class="ds-input datepicker cal"
                 placeholder="YYYY.MM.DD" readonly${dis}
                 aria-haspopup="dialog" aria-expanded="false">
          <button type="button" class="ds-btn ds-btn--medium ds-btn--icon form-btn-datepicker"${dis}
                  aria-label="달력 열기" aria-expanded="false" aria-controls="${id}-cal">
            <span class="sr-only">달력 열기</span>
            <i class="ds-icon ds-ico-calendar"></i>
          </button>
        </div>
        <div class="ds-calendar-area" id="${id}-cal">
          <div class="calendar-wrap single" role="dialog" aria-label="날짜 선택"></div>
        </div>
      </div>
      ${hint ? `<p class="${hintClass}">${hint}</p>` : ''}
    </div>`;
}

function renderRange({ label, hint, required }) {
  const id = `calr-${uid()}`;

  return `
    <div class="ds-form-group">
      <div class="ds-form-label">
        <label>${label}${required ? '<span class="ds-form-label__required" aria-hidden="true">필수</span>' : ''}</label>
      </div>
      <div class="ds-form-content calendar-conts">
        <div class="calendar-input">
          <ul class="input-group range set">
            <li>
              <input type="text" id="${id}-start" class="ds-input datepicker"
                     placeholder="시작날짜" title="시작날짜 입력" readonly aria-expanded="false">
            </li>
            <li class="mark">–</li>
            <li>
              <input type="text" id="${id}-end" class="ds-input datepicker"
                     placeholder="종료날짜" title="종료날짜 입력" readonly aria-expanded="false">
            </li>
          </ul>
          <button type="button" class="ds-btn ds-btn--medium ds-btn--icon form-btn-datepicker"
                  aria-label="달력 열기" aria-expanded="false" aria-controls="${id}-cal">
            <span class="sr-only">달력 열기</span>
            <i class="ds-icon ds-ico-calendar"></i>
          </button>
        </div>
        <div class="ds-calendar-area" id="${id}-cal">
          <div class="calendar-wrap" role="dialog" aria-label="기간 선택"></div>
        </div>
      </div>
      ${hint ? `<p class="ds-form-hint">${hint}</p>` : ''}
    </div>`;
}

/* ─── DatePicker 클래스 ─────────────────────── */

class DatePicker {
  constructor(root, isRange = false) {
    this.root = root;
    this.isRange = isRange;
    this.today = new Date();

    this.viewYear = this.today.getFullYear();
    this.viewMonth = this.today.getMonth();

    /* 선택 상태 */
    this.selectedDate = null; // 단일
    this.startDate = null;    // 기간 시작
    this.endDate = null;      // 기간 종료
    this.pickingEnd = false;  // 기간: 종료 선택 중

    /* DOM */
    this.area = root.querySelector('.ds-calendar-area');
    this.wrap = root.querySelector('.calendar-wrap');
    this.toggleBtn = root.querySelector('.form-btn-datepicker');
    this.singleInput = root.querySelector('input.cal');
    this.startInput = root.querySelector('input.datepicker:not(.cal)');
    this.endInput = root.querySelectorAll('input.datepicker:not(.cal)')[1] || null;

    this._render();
    this._bindToggle();
    this._bindOutsideClick();
  }

  /* ── 달력 그리기 ────────────────────────── */

  _render() {
    this.wrap.innerHTML = this._buildHead() + this._buildBody() + this._buildFooter();
    this._bindCalEvents();
    this._scrollYearIntoView();
  }

  _buildHead() {
    const y = this.viewYear;
    const m = this.viewMonth;

    const yearRange = Array.from({ length: 41 }, (_, i) => y - 20 + i);
    const yearItems = yearRange.map(yr =>
      `<li><button type="button"${yr === y ? ' class="active"' : ''}>${yr}년</button></li>`
    ).join('');

    const monItems = Array.from({ length: 12 }, (_, i) =>
      `<li><button type="button"${i === m ? ' class="active"' : ''}>${String(i + 1).padStart(2, '0')}월</button></li>`
    ).join('');

    return `
      <div class="calendar-head">
        <button type="button" class="btn-cal-move prev" aria-label="이전 달">
          <span class="sr-only">이전 달</span>
        </button>
        <div class="calendar-switch-wrap">
          <div class="calendar-drop-down">
            <button type="button" class="btn-cal-switch year" aria-label="연도 선택" aria-expanded="false">
              ${y}년
            </button>
            <div class="calendar-select calendar-year-wrap">
              <ul class="sel year">${yearItems}</ul>
            </div>
          </div>
          <div class="calendar-drop-down">
            <button type="button" class="btn-cal-switch month" aria-label="월 선택" aria-expanded="false">
              ${String(m + 1).padStart(2, '0')}월
            </button>
            <div class="calendar-select calendar-mon-wrap">
              <ul class="sel month">${monItems}</ul>
            </div>
          </div>
        </div>
        <button type="button" class="btn-cal-move next" aria-label="다음 달">
          <span class="sr-only">다음 달</span>
        </button>
      </div>`;
  }

  _buildBody() {
    const y = this.viewYear;
    const m = this.viewMonth;
    const firstDow = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrev = new Date(y, m, 0).getDate();

    /* 셀 목록 생성 */
    const cells = [];

    for (let i = 0; i < firstDow; i++) {
      cells.push({
        date: new Date(m === 0 ? y - 1 : y, m === 0 ? 11 : m - 1, daysInPrev - firstDow + i + 1),
        type: 'old',
      });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(y, m, d), type: 'current' });
    }
    const tail = cells.length % 7;
    if (tail > 0) {
      for (let d = 1; d <= 7 - tail; d++) {
        cells.push({
          date: new Date(m === 11 ? y + 1 : y, m === 11 ? 0 : m + 1, d),
          type: 'new',
        });
      }
    }

    /* 행 HTML 생성 */
    const rows = [];
    for (let r = 0; r < cells.length; r += 7) {
      const tds = cells.slice(r, r + 7).map((cell, col) => {
        const cls = this._cellClasses(cell, col);
        const clsAttr = cls.length ? ` class="${cls.join(' ')}"` : '';
        const dateStr = this._fmt(cell.date);
        const btnDis = cell.type !== 'current' ? ' disabled tabindex="-1"' : '';
        return `<td${clsAttr}><button type="button" class="btn-set-date"${btnDis} data-date="${dateStr}" aria-label="${this._ariaLabel(cell.date, cls)}"><span>${cell.date.getDate()}</span></button></td>`;
      });
      rows.push(`<tr>${tds.join('')}</tr>`);
    }

    return `
      <div class="calendar-body">
        <div class="calendar-table-wrap">
          <table class="calendar-tbl">
            <caption>${y}년 ${String(m + 1).padStart(2, '0')}월</caption>
            <thead>
              <tr>
                <th scope="col">일</th><th scope="col">월</th><th scope="col">화</th>
                <th scope="col">수</th><th scope="col">목</th><th scope="col">금</th><th scope="col">토</th>
              </tr>
            </thead>
            <tbody>${rows.join('')}</tbody>
          </table>
        </div>
      </div>`;
  }

  _buildFooter() {
    return `
      <div class="calendar-footer">
        <div class="calendar-btn-wrap">
          <button type="button" class="ds-btn ds-btn--small ds-btn--text btn-today">오늘</button>
          <button type="button" class="ds-btn ds-btn--small ds-btn--tertiary btn-cancel">취소</button>
          <button type="button" class="ds-btn ds-btn--small ds-btn--primary btn-confirm">확인</button>
        </div>
      </div>`;
  }

  /* ── 클래스 계산 ────────────────────────── */

  _cellClasses(cell, col) {
    const cls = [];
    if (cell.type !== 'current') cls.push(cell.type);
    if (col === 0) cls.push('day-off'); // 일요일
    if (cell.type === 'current' && this._isToday(cell.date)) cls.push('today');

    if (cell.type === 'current') {
      const d = this._strip(cell.date);

      if (this.isRange) {
        const s = this.startDate ? this._strip(this.startDate) : null;
        const e = this.endDate ? this._strip(this.endDate) : null;
        if (s && e) {
          const inRange = d >= s && d <= e;
          if (inRange) cls.push('period');
          if (d.getTime() === s.getTime()) cls.push('start');
          if (d.getTime() === e.getTime()) cls.push('end');
        } else if (s && d.getTime() === s.getTime()) {
          cls.push('period', 'start', 'end');
        }
      } else {
        if (this.selectedDate && d.getTime() === this._strip(this.selectedDate).getTime()) {
          cls.push('period', 'start', 'end');
        }
      }
    }
    return cls;
  }

  _ariaLabel(date, classes) {
    const base = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    if (classes.includes('start') && classes.includes('end') && this.isRange) return `${base}, 시작일 종료일`;
    if (classes.includes('start')) return `${base}, 시작일`;
    if (classes.includes('end')) return `${base}, 종료일`;
    if (this.isRange && classes.includes('period')) return `${base}, 기간 내`;
    return base;
  }

  /* ── 이벤트 바인딩 ──────────────────────── */

  _bindToggle() {
    const open = () => this.open();

    this.toggleBtn?.addEventListener('click', open);
    this.singleInput?.addEventListener('click', open);
    this.startInput?.addEventListener('click', open);
    this.endInput?.addEventListener('click', open);
  }

  _bindOutsideClick() {
    document.addEventListener('click', (e) => {
      if (this.isOpen() && !this.root.contains(e.target)) {
        this.close();
      }
    });
  }

  _bindCalEvents() {
    const w = this.wrap;

    /* 이전/다음 달 */
    w.querySelector('.btn-cal-move.prev')?.addEventListener('click', () => this._changeMonth(-1));
    w.querySelector('.btn-cal-move.next')?.addEventListener('click', () => this._changeMonth(1));

    /* 연도/월 드롭다운 토글 */
    w.querySelectorAll('.btn-cal-switch').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.closest('.calendar-drop-down');
        const sel = dropdown.querySelector('.calendar-select');
        const isActive = sel.classList.contains('active');
        /* 다른 드롭다운 닫기 */
        w.querySelectorAll('.calendar-select.active').forEach(s => {
          s.classList.remove('active');
          s.previousElementSibling?.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          sel.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* 연도 선택 */
    w.querySelectorAll('.calendar-year-wrap button').forEach(btn => {
      btn.addEventListener('click', () => {
        this.viewYear = parseInt(btn.textContent);
        this._render();
      });
    });

    /* 월 선택 */
    w.querySelectorAll('.calendar-mon-wrap button').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.viewMonth = i;
        this._render();
      });
    });

    /* 날짜 셀 클릭 */
    w.querySelectorAll('.btn-set-date:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const date = this._parse(btn.dataset.date);
        this._selectDate(date);
      });
    });

    /* 오늘 버튼 */
    w.querySelector('.btn-today')?.addEventListener('click', () => {
      this._selectDate(new Date(this.today));
    });

    /* 취소 */
    w.querySelector('.btn-cancel')?.addEventListener('click', () => this.close());

    /* 확인 */
    w.querySelector('.btn-confirm')?.addEventListener('click', () => {
      this._applyToInput();
      this.close();
    });

    /* 키보드 탐색 */
    w.addEventListener('keydown', (e) => this._handleKeydown(e));
  }

  /* ── 날짜 선택 로직 ────────────────────── */

  _selectDate(date) {
    if (this.isRange) {
      if (!this.pickingEnd || !this.startDate) {
        this.startDate = date;
        this.endDate = null;
        this.pickingEnd = true;
      } else {
        if (date < this.startDate) {
          this.endDate = this.startDate;
          this.startDate = date;
        } else {
          this.endDate = date;
        }
        this.pickingEnd = false;
        this._applyToInput();
        this.close();
        this._render();
        return;
      }
    } else {
      this.selectedDate = date;
      this._applyToInput();
      this.close();
    }
    this._render();
  }

  _applyToInput() {
    if (this.isRange) {
      if (this.startInput) this.startInput.value = this.startDate ? this._fmt(this.startDate) : '';
      if (this.endInput)   this.endInput.value = this.endDate   ? this._fmt(this.endDate)   : '';
    } else {
      if (this.singleInput) this.singleInput.value = this.selectedDate ? this._fmt(this.selectedDate) : '';
    }
  }

  /* ── 월 이동 ────────────────────────────── */

  _changeMonth(delta) {
    this.viewMonth += delta;
    if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++; }
    if (this.viewMonth < 0)  { this.viewMonth = 11; this.viewYear--; }
    this._render();
  }

  /* ── 열기 / 닫기 ────────────────────────── */

  isOpen() {
    return this.area.classList.contains('active');
  }

  open() {
    if (this.toggleBtn?.disabled || this.singleInput?.disabled) return;
    this.area.classList.add('active');
    this.toggleBtn?.setAttribute('aria-expanded', 'true');
    /* 현재 선택 월로 이동 */
    const ref = this.isRange
      ? (this.startDate || this.today)
      : (this.selectedDate || this.today);
    this.viewYear = ref.getFullYear();
    this.viewMonth = ref.getMonth();
    this._render();
    /* 첫 활성 날짜에 포커스 */
    const active = this.wrap.querySelector('.btn-set-date.active, .period.start .btn-set-date, .period .btn-set-date, .today .btn-set-date, .btn-set-date:not([disabled])');
    active?.focus();
  }

  close() {
    this.area.classList.remove('active');
    this.toggleBtn?.setAttribute('aria-expanded', 'false');
    this.toggleBtn?.focus();
  }

  /* ── 키보드 탐색 ────────────────────────── */

  _handleKeydown(e) {
    const { key } = e;
    if (key === 'Escape') { e.preventDefault(); this.close(); return; }

    const focused = document.activeElement;
    const isDateBtn = focused?.classList.contains('btn-set-date');
    if (!isDateBtn) return;

    const allBtns = Array.from(
      this.wrap.querySelectorAll('.btn-set-date:not([disabled])')
    );
    const idx = allBtns.indexOf(focused);
    if (idx === -1) return;

    const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };

    if (moves[key] !== undefined) {
      e.preventDefault();
      const next = allBtns[idx + moves[key]];
      if (next) {
        next.focus();
      } else {
        if (key === 'ArrowLeft' || key === 'ArrowUp') this._changeMonth(-1);
        else this._changeMonth(1);
        const newBtns = Array.from(this.wrap.querySelectorAll('.btn-set-date:not([disabled])'));
        (key === 'ArrowLeft' || key === 'ArrowUp'
          ? newBtns[newBtns.length - 1]
          : newBtns[0]
        )?.focus();
      }
    } else if (key === 'Home') {
      e.preventDefault();
      allBtns[0]?.focus();
    } else if (key === 'End') {
      e.preventDefault();
      allBtns[allBtns.length - 1]?.focus();
    } else if (key === 'PageUp') {
      e.preventDefault();
      this._changeMonth(-1);
      this.wrap.querySelector('.btn-set-date:not([disabled])')?.focus();
    } else if (key === 'PageDown') {
      e.preventDefault();
      this._changeMonth(1);
      this.wrap.querySelector('.btn-set-date:not([disabled])')?.focus();
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      focused.click();
    }
  }

  /* ── 유틸 ───────────────────────────────── */

  _fmt(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  }

  _parse(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  _strip(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  _isToday(date) {
    return this._strip(date).getTime() === this._strip(this.today).getTime();
  }

  _scrollYearIntoView() {
    const active = this.wrap.querySelector('.calendar-year-wrap .active');
    active?.scrollIntoView({ block: 'nearest' });
  }
}

/* ─── play 초기화 ──────────────────────────── */

function initAll(canvasElement) {
  canvasElement.querySelectorAll('.ds-form-group').forEach(root => {
    const isRange = root.querySelector('.input-group.range') !== null;
    new DatePicker(root, isRange);
  });
}

const play = async ({ canvasElement }) => initAll(canvasElement);

const wrap = (html) =>
  `<div style="max-width:54rem; padding-bottom:42rem;">${html}</div>`;

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(renderSingle(args)),
  play,
};

/* ─── 단일 날짜 ─────────────────────────────── */

export const 단일날짜 = {
  name: '단일 날짜 (Single)',
  parameters: { controls: { disable: true } },
  render: () => wrap(renderSingle({
    label: '날짜',
    hint: '날짜를 선택하세요.',
    required: false,
    state: 'default',
    disabled: false,
  })),
  play,
};

/* ─── 기간 선택 ─────────────────────────────── */

export const 기간선택 = {
  name: '기간 선택 (Range)',
  parameters: { controls: { disable: true } },
  render: () => wrap(renderRange({
    label: '신청 기간',
    hint: '시작일과 종료일을 선택하세요.',
    required: true,
  })),
  play,
};

/* ─── 상태 ──────────────────────────────────── */

export const 상태 = {
  name: '상태 (State)',
  parameters: { controls: { disable: true } },
  render: () => wrap(`
    ${renderSingle({ label: '기본', hint: '날짜를 선택하세요.', state: 'default' })}
    ${renderSingle({ label: '비활성화', hint: '', state: 'default', disabled: true })}
    ${renderSingle({ label: '에러', hint: '날짜를 선택해 주세요.', state: 'error' })}
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
      ${section('단일 날짜', renderSingle({ label: '날짜', hint: '날짜를 선택하세요.' }))}
      ${section('기간 선택', renderRange({ label: '신청 기간', hint: '시작일과 종료일을 선택하세요.' }))}
      ${section('필수 + 에러', renderSingle({ label: '날짜', required: true, hint: '날짜를 선택해 주세요.', state: 'error' }))}
    `);
  },
  play,
};
