import './icon.css';

export default {
  title: '기반/아이콘',
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'ds-ico-angle','ds-ico-go','ds-ico-go-top','ds-ico-link','ds-ico-page-next','ds-ico-bread-home',
        'ds-ico-all','ds-ico-global','ds-ico-func','ds-ico-fold','ds-ico-toggle',
        'ds-ico-sch','ds-ico-sch-plus','ds-ico-plus','ds-ico-del','ds-ico-delete-fill',
        'ds-ico-popup-close','ds-ico-modal-close','ds-ico-more','ds-ico-ellipsis',
        'ds-ico-filter','ds-ico-reset','ds-ico-refresh','ds-ico-upload','ds-ico-down',
        'ds-ico-print','ds-ico-scrap','ds-ico-share','ds-ico-like','ds-ico-setting',
        'ds-ico-view-mode','ds-ico-file',
        'ds-ico-help','ds-ico-tooltip','ds-ico-success-fill','ds-ico-information-fill',
        'ds-ico-error-fill','ds-ico-complete-fill','ds-ico-flag','ds-ico-urgent-danger',
        'ds-ico-pw-visible','ds-ico-pw-visible-on','ds-ico-checkbox',
        'ds-ico-calendar','ds-ico-cal-move',
        'ds-ico-log','ds-ico-logout','ds-ico-join','ds-ico-my','ds-ico-login-go',
        'ds-ico-login-type01','ds-ico-login-type02','ds-ico-login-type03',
        'ds-ico-login-type04','ds-ico-login-type05','ds-ico-login-type06',
        'ds-ico-call','ds-ico-email','ds-ico-faq',
        'ds-ico-blog','ds-ico-facebook','ds-ico-instagram','ds-ico-sns-x','ds-ico-youtube',
        'ds-ico-swiper-play','ds-ico-swiper-stop',
      ],
      description: '아이콘 이름',
      table: { category: '아이콘' },
    },
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      description: '크기',
      table: { category: '종류' },
    },
    decorative: {
      control: { type: 'boolean' },
      description: '장식용 여부 — true: aria-hidden, false: role=img + aria-label 필요',
      table: { category: '접근성' },
    },
    label: {
      control: { type: 'text' },
      description: '대체 텍스트 (decorative가 false일 때 사용)',
      table: { category: '접근성' },
    },
  },
  args: {
    name: 'ds-ico-angle',
    size: 'large',
    decorative: true,
    label: '꺽쇠 화살표',
  },
};

/* ─── 아이콘 정의 목록 ───────────────────────── */

const ICONS = [
  // 내비게이션
  { name: 'ds-ico-angle',       label: '꺽쇠',           category: '내비게이션' },
  { name: 'ds-ico-go',          label: '이동',           category: '내비게이션' },
  { name: 'ds-ico-go-top',      label: '맨 위로',        category: '내비게이션' },
  { name: 'ds-ico-link',        label: '링크',           category: '내비게이션' },
  { name: 'ds-ico-page-next',   label: '페이지 다음',    category: '내비게이션' },
  { name: 'ds-ico-bread-home',  label: '홈(브레드크럼)', category: '내비게이션' },
  { name: 'ds-ico-all',         label: '전체 메뉴',      category: '내비게이션' },
  { name: 'ds-ico-global',      label: '글로벌/언어',    category: '내비게이션' },
  { name: 'ds-ico-func',        label: '펼치기',         category: '내비게이션' },
  { name: 'ds-ico-fold',        label: '접기/펼치기',    category: '내비게이션' },
  { name: 'ds-ico-toggle',      label: '토글',           category: '내비게이션' },
  // 액션
  { name: 'ds-ico-sch',         label: '검색',           category: '액션' },
  { name: 'ds-ico-sch-plus',    label: '검색+',          category: '액션' },
  { name: 'ds-ico-plus',        label: '추가',           category: '액션' },
  { name: 'ds-ico-del',         label: '삭제',           category: '액션' },
  { name: 'ds-ico-delete-fill', label: '삭제(채움)',     category: '액션', pure: true },
  { name: 'ds-ico-popup-close', label: '닫기(팝업)',     category: '액션' },
  { name: 'ds-ico-modal-close', label: '닫기(모달)',     category: '액션' },
  { name: 'ds-ico-more',        label: '더보기',         category: '액션' },
  { name: 'ds-ico-ellipsis',    label: '말줄임',         category: '액션' },
  { name: 'ds-ico-filter',      label: '필터',           category: '액션' },
  { name: 'ds-ico-reset',       label: '초기화',         category: '액션' },
  { name: 'ds-ico-refresh',     label: '새로고침',       category: '액션' },
  { name: 'ds-ico-upload',      label: '업로드',         category: '액션' },
  { name: 'ds-ico-down',        label: '다운로드',       category: '액션' },
  { name: 'ds-ico-print',       label: '인쇄',           category: '액션' },
  { name: 'ds-ico-scrap',       label: '스크랩',         category: '액션' },
  { name: 'ds-ico-share',       label: '공유',           category: '액션' },
  { name: 'ds-ico-like',        label: '좋아요',         category: '액션' },
  { name: 'ds-ico-setting',     label: '설정',           category: '액션' },
  { name: 'ds-ico-view-mode',   label: '보기 모드',      category: '액션' },
  { name: 'ds-ico-file',        label: '파일',           category: '액션' },
  // 상태·정보
  { name: 'ds-ico-help',            label: '도움말',    category: '상태·정보', pure: true },
  { name: 'ds-ico-tooltip',         label: '툴팁',      category: '상태·정보' },
  { name: 'ds-ico-success-fill',    label: '성공',      category: '상태·정보', pure: true },
  { name: 'ds-ico-information-fill',label: '정보',      category: '상태·정보', pure: true },
  { name: 'ds-ico-error-fill',      label: '오류',      category: '상태·정보', pure: true },
  { name: 'ds-ico-complete-fill',   label: '완료',      category: '상태·정보', pure: true },
  { name: 'ds-ico-flag',            label: '깃발',      category: '상태·정보', pure: true },
  { name: 'ds-ico-urgent-danger',   label: '긴급(위험)',category: '상태·정보' },
  // 폼
  { name: 'ds-ico-pw-visible',    label: '비밀번호 숨김', category: '폼' },
  { name: 'ds-ico-pw-visible-on', label: '비밀번호 표시', category: '폼' },
  { name: 'ds-ico-checkbox',      label: '체크박스',       category: '폼' },
  // 달력
  { name: 'ds-ico-calendar', label: '달력',      category: '달력' },
  { name: 'ds-ico-cal-move', label: '달력 이동', category: '달력' },
  // 계정
  { name: 'ds-ico-log',           label: '로그인',        category: '계정' },
  { name: 'ds-ico-logout',        label: '로그아웃',      category: '계정' },
  { name: 'ds-ico-join',          label: '회원가입',      category: '계정' },
  { name: 'ds-ico-my',            label: '나의 정보',     category: '계정' },
  { name: 'ds-ico-login-go',      label: '인증 이동',     category: '계정' },
  { name: 'ds-ico-login-type01',  label: '로그인 방식 1', category: '계정' },
  { name: 'ds-ico-login-type02',  label: '로그인 방식 2', category: '계정' },
  { name: 'ds-ico-login-type03',  label: '로그인 방식 3', category: '계정' },
  { name: 'ds-ico-login-type04',  label: '로그인 방식 4', category: '계정' },
  { name: 'ds-ico-login-type05',  label: '로그인 방식 5', category: '계정' },
  { name: 'ds-ico-login-type06',  label: '로그인 방식 6', category: '계정' },
  // 연락처
  { name: 'ds-ico-call',  label: '전화',    category: '연락처' },
  { name: 'ds-ico-email', label: '이메일',  category: '연락처' },
  { name: 'ds-ico-faq',   label: 'FAQ',    category: '연락처' },
  // SNS
  { name: 'ds-ico-blog',      label: '블로그',        category: 'SNS' },
  { name: 'ds-ico-facebook',  label: '페이스북',      category: 'SNS' },
  { name: 'ds-ico-instagram', label: '인스타그램',    category: 'SNS' },
  { name: 'ds-ico-sns-x',     label: 'X (트위터)',    category: 'SNS' },
  { name: 'ds-ico-youtube',   label: '유튜브',        category: 'SNS' },
  // 캐러셀
  { name: 'ds-ico-swiper-play', label: '슬라이드 재생', category: '캐러셀' },
  { name: 'ds-ico-swiper-stop', label: '슬라이드 멈춤', category: '캐러셀' },
];

/* ─── 렌더 헬퍼 ─────────────────────────────── */

function renderIcon({ name, size = 'large', decorative = true, label = '' }) {
  const sizeClass = size !== 'large' ? ` ${size}` : '';
  const a11y = decorative
    ? 'aria-hidden="true"'
    : `role="img" aria-label="${label}"`;
  return `<i class="ds-icon ${name}${sizeClass}" ${a11y}></i>`;
}

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => `
    <div style="padding:2.4rem; display:flex; align-items:center; gap:2rem;">
      ${renderIcon(args)}
      <code style="font-size:1.2rem; color:var(--krds-light-color-text-subtle);">
        ${renderIcon(args).replace(/</g,'&lt;').replace(/>/g,'&gt;')}
      </code>
    </div>`,
};

/* ─── 전체 그리드 (검색 + 복사) ─────────────── */

export const 전체그리드 = {
  name: '전체 그리드 (All Icons)',
  parameters: { controls: { disable: true } },
  render: () => {
    const categories = [...new Set(ICONS.map(ic => ic.category))];

    const gridStyle = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(9.6rem, 1fr));
      gap: 0.8rem;
    `;
    const cardStyle = `
      display: flex; flex-direction: column; align-items: center;
      gap: 0.8rem; padding: 1.2rem 0.8rem;
      border: 1px solid var(--krds-light-color-border-gray-light);
      border-radius: 0.8rem; cursor: pointer;
      transition: background-color 0.2s;
      background: var(--krds-light-color-surface-white);
      text-align: center;
    `;
    const nameStyle = `font-size: 1.0rem; color: var(--krds-light-color-text-subtle); word-break: break-all; line-height: 1.4;`;

    const cards = ICONS.map(ic => `
      <button type="button"
        class="icon-card"
        data-name="${ic.name}"
        data-label="${ic.label}"
        data-category="${ic.category}"
        data-code='&lt;i class=&quot;ds-icon ${ic.name}&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;'
        data-rawcode='<i class="ds-icon ${ic.name}" aria-hidden="true"></i>'
        style="${cardStyle}"
        title="${ic.label} — 클릭하여 HTML 복사"
      >
        <i class="ds-icon ${ic.name}" aria-hidden="true" style="width:2.4rem;height:2.4rem;flex-shrink:0;"></i>
        <span style="${nameStyle}">${ic.name}</span>
        <span style="font-size:0.9rem;color:var(--krds-light-color-text-disabled);">${ic.label}</span>
      </button>`).join('');

    const sections = categories.map(cat => {
      const catCards = ICONS.filter(ic => ic.category === cat).map(ic => `
        <button type="button"
          class="icon-card"
          data-name="${ic.name}"
          data-label="${ic.label}"
          data-category="${ic.category}"
          data-rawcode='<i class="ds-icon ${ic.name}" aria-hidden="true"></i>'
          style="${cardStyle}"
          title="${ic.label} — 클릭하여 HTML 복사"
        >
          <i class="ds-icon ${ic.name}" aria-hidden="true" style="width:2.4rem;height:2.4rem;flex-shrink:0;"></i>
          <span style="${nameStyle}">${ic.name}</span>
          <span style="font-size:0.9rem;color:var(--krds-light-color-text-disabled);">${ic.label}</span>
        </button>`).join('');
      return `
        <section class="icon-section" data-category="${cat}" style="margin-bottom:3.2rem;">
          <h2 style="font-size:1.3rem;font-weight:bold;color:var(--krds-light-color-text-bolder);
                     margin-bottom:1.2rem;padding-bottom:0.6rem;
                     border-bottom:1px solid var(--krds-light-color-border-gray-light);">
            ${cat} <span class="cat-count" style="font-weight:normal;color:var(--krds-light-color-text-subtle);"></span>
          </h2>
          <div class="icon-grid" style="${gridStyle}">${catCards}</div>
        </section>`;
    }).join('');

    return `
      <div style="padding: 2.4rem;">
        <!-- 검색 -->
        <div style="margin-bottom: 2.4rem; display:flex; align-items:center; gap: 1.2rem;">
          <div style="position:relative; flex:1; max-width:40rem;">
            <input id="icon-search" type="search" placeholder="아이콘 이름 또는 한국어 검색…"
              style="width:100%; height:4rem; padding:0 1.2rem 0 3.6rem;
                     border:1px solid var(--krds-light-color-border-gray); border-radius:0.8rem;
                     font-size:1.4rem; outline:none; box-sizing:border-box;"
              aria-label="아이콘 검색" />
            <i class="ds-icon ds-ico-sch" aria-hidden="true"
               style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);
                      width:1.8rem;height:1.8rem;pointer-events:none;"></i>
          </div>
          <span id="icon-count" style="font-size:1.3rem;color:var(--krds-light-color-text-subtle);white-space:nowrap;">
            총 ${ICONS.length}개
          </span>
        </div>

        <!-- 복사 토스트 -->
        <div id="copy-toast"
          style="position:fixed;bottom:2.4rem;left:50%;transform:translateX(-50%) translateY(120%);
                 background:var(--krds-light-color-element-inverse);color:#fff;
                 padding:1rem 2rem;border-radius:2rem;font-size:1.3rem;
                 transition:transform 0.25s ease;z-index:9999;pointer-events:none;white-space:nowrap;"
          role="status" aria-live="polite">
        </div>

        <!-- 그리드 -->
        <div id="icon-sections">${sections}</div>

        <!-- 검색 결과 없음 -->
        <p id="icon-empty"
           style="display:none;padding:4rem;text-align:center;
                  font-size:1.4rem;color:var(--krds-light-color-text-disabled);">
          검색 결과가 없습니다.
        </p>
      </div>`;
  },
  play: async ({ canvasElement }) => {
    const searchInput = canvasElement.querySelector('#icon-search');
    const countEl     = canvasElement.querySelector('#icon-count');
    const toast       = canvasElement.querySelector('#copy-toast');
    const emptyMsg    = canvasElement.querySelector('#icon-empty');
    const sections    = canvasElement.querySelectorAll('.icon-section');
    const cards       = [...canvasElement.querySelectorAll('.icon-card')];

    /* 카테고리별 개수 초기 표시 */
    sections.forEach(section => {
      const cat = section.dataset.category;
      const count = section.querySelectorAll('.icon-card').length;
      const countSpan = section.querySelector('.cat-count');
      if (countSpan) countSpan.textContent = `(${count})`;
    });

    /* 카드 호버 스타일 */
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.backgroundColor = 'var(--krds-light-color-action-secondary-hover)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.backgroundColor = 'var(--krds-light-color-surface-white)';
      });
    });

    /* 클릭 → 코드 복사 */
    let toastTimer = null;
    cards.forEach(card => {
      card.addEventListener('click', async () => {
        const code = card.dataset.rawcode;
        const name = card.dataset.name;
        try {
          await navigator.clipboard.writeText(code);
        } catch {
          /* clipboard 미지원 환경 대비 */
          const ta = document.createElement('textarea');
          ta.value = code;
          ta.style.cssText = 'position:fixed;opacity:0;';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        /* 토스트 표시 */
        toast.textContent = `복사됨 · ${name}`;
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.style.transform = 'translateX(-50%) translateY(120%)';
        }, 2200);
      });
    });

    /* 검색 필터 */
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      let visible = 0;

      sections.forEach(section => {
        const sectionCards = [...section.querySelectorAll('.icon-card')];
        let sectionVisible = 0;

        sectionCards.forEach(card => {
          const match = !q
            || card.dataset.name.toLowerCase().includes(q)
            || card.dataset.label.toLowerCase().includes(q)
            || card.dataset.category.toLowerCase().includes(q);
          card.style.display = match ? '' : 'none';
          if (match) sectionVisible++;
        });

        section.style.display = sectionVisible > 0 ? '' : 'none';
        const countSpan = section.querySelector('.cat-count');
        if (countSpan) countSpan.textContent = `(${sectionVisible})`;
        visible += sectionVisible;
      });

      countEl.textContent = q ? `${visible} / ${ICONS.length}개` : `총 ${ICONS.length}개`;
      emptyMsg.style.display = visible === 0 ? '' : 'none';
    });
  },
};

/* ─── 크기 ──────────────────────────────────── */

export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
    const rows = sizes.map(size => `
      <tr>
        <td style="padding:1rem 1.6rem;font-size:1.2rem;color:var(--krds-light-color-text-subtle);">${size}</td>
        <td style="padding:1rem 1.6rem;">
          <i class="ds-icon ds-ico-sch ${size}" aria-hidden="true"></i>
        </td>
        <td style="padding:1rem 1.6rem;">
          <i class="ds-icon ds-ico-go ${size}" aria-hidden="true"></i>
        </td>
        <td style="padding:1rem 1.6rem;">
          <i class="ds-icon ds-ico-success-fill ${size}" aria-hidden="true"></i>
        </td>
        <td style="padding:1rem 1.6rem;font-family:monospace;font-size:1.1rem;color:var(--krds-light-color-text-subtle);">
          var(--krds-icon--size-${size})
        </td>
      </tr>`).join('');
    return `<div style="padding:2.4rem;">
      <table style="border-collapse:collapse;font-size:1.3rem;">
        <thead>
          <tr style="background:var(--krds-light-color-surface-gray);">
            <th style="padding:0.8rem 1.6rem;text-align:left;font-weight:bold;">크기</th>
            <th style="padding:0.8rem 1.6rem;text-align:left;">ds-ico-sch</th>
            <th style="padding:0.8rem 1.6rem;text-align:left;">ds-ico-go</th>
            <th style="padding:0.8rem 1.6rem;text-align:left;">ds-ico-success-fill (pure)</th>
            <th style="padding:0.8rem 1.6rem;text-align:left;">CSS 변수</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  },
};

/* ─── 렌더 방식 ─────────────────────────────── */

export const 렌더방식 = {
  name: '렌더 방식 (Mask vs Pure)',
  parameters: { controls: { disable: true } },
  render: () => {
    const maskIcons  = ['ds-ico-sch', 'ds-ico-go', 'ds-ico-del', 'ds-ico-angle', 'ds-ico-setting'];
    const pureIcons  = ['ds-ico-help', 'ds-ico-success-fill', 'ds-ico-information-fill', 'ds-ico-error-fill', 'ds-ico-complete-fill', 'ds-ico-flag'];

    const iconRow = (names) => names.map(n =>
      `<div style="display:flex;flex-direction:column;align-items:center;gap:0.6rem;">
        <i class="ds-icon ${n}" aria-hidden="true" style="width:2.4rem;height:2.4rem;"></i>
        <span style="font-size:1rem;color:var(--krds-light-color-text-subtle);">${n}</span>
       </div>`).join('');

    return `<div style="padding:2.4rem;">
      <section style="margin-bottom:3.2rem;">
        <h2 style="font-size:1.4rem;font-weight:bold;margin-bottom:0.6rem;color:var(--krds-light-color-text-bolder);">
          mask 방식 (단색 · background-color 제어)
        </h2>
        <p style="font-size:1.2rem;color:var(--krds-light-color-text-subtle);margin-bottom:1.6rem;">
          mask-image + background-color 로 렌더링. 색상을 CSS로 자유롭게 변경할 수 있습니다.
        </p>
        <div style="display:flex;gap:2.4rem;flex-wrap:wrap;align-items:flex-end;margin-bottom:1.2rem;">
          ${iconRow(maskIcons)}
        </div>
        <div style="display:flex;gap:2.4rem;flex-wrap:wrap;align-items:flex-end;background:#1a73e8;padding:1rem;border-radius:0.6rem;">
          ${maskIcons.map(n =>
            `<div style="display:flex;flex-direction:column;align-items:center;gap:0.6rem;">
              <i class="ds-icon ${n}" aria-hidden="true" style="width:2.4rem;height:2.4rem;background-color:#fff;"></i>
              <span style="font-size:1rem;color:#fff;">${n}</span>
             </div>`).join('')}
        </div>
        <p style="font-size:1.1rem;color:var(--krds-light-color-text-subtle);margin-top:0.6rem;">
          ↑ 파란 배경에서 background-color를 #fff로 변경한 예시
        </p>
      </section>

      <section>
        <h2 style="font-size:1.4rem;font-weight:bold;margin-bottom:0.6rem;color:var(--krds-light-color-text-bolder);">
          pure 방식 (SVG 원본 색상)
        </h2>
        <p style="font-size:1.2rem;color:var(--krds-light-color-text-subtle);margin-bottom:1.6rem;">
          background-image 로 렌더링. SVG에 내장된 색상이 그대로 표시됩니다.
        </p>
        <div style="display:flex;gap:2.4rem;flex-wrap:wrap;align-items:flex-end;">
          ${iconRow(pureIcons)}
        </div>
      </section>
    </div>`;
  },
};

/* ─── 접근성 사용법 ─────────────────────────── */

export const 접근성 = {
  name: '접근성 (Accessibility)',
  parameters: { controls: { disable: true } },
  render: () => `
    <div style="padding:2.4rem;">
      <section style="margin-bottom:3.2rem;">
        <h2 style="font-size:1.4rem;font-weight:bold;margin-bottom:1.2rem;color:var(--krds-light-color-text-bolder);">
          장식용 아이콘 — aria-hidden="true"
        </h2>
        <p style="font-size:1.3rem;color:var(--krds-light-color-text-subtle);margin-bottom:1.2rem;">
          주변 텍스트로 의미가 충분히 전달될 때. 스크린리더가 아이콘을 읽지 않습니다.
        </p>
        <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:1.2rem;">
          <i class="ds-icon ds-ico-sch" aria-hidden="true"></i>
          <span style="font-size:1.4rem;">검색</span>
        </div>
        <pre style="background:var(--krds-light-color-surface-gray);padding:1.2rem;border-radius:0.6rem;font-size:1.2rem;overflow:auto;">&lt;button type="button"&gt;
  &lt;i class="ds-icon ds-ico-sch" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;span&gt;검색&lt;/span&gt;
&lt;/button&gt;</pre>
      </section>

      <section style="margin-bottom:3.2rem;">
        <h2 style="font-size:1.4rem;font-weight:bold;margin-bottom:1.2rem;color:var(--krds-light-color-text-bolder);">
          의미 있는 아이콘 — role="img" + aria-label
        </h2>
        <p style="font-size:1.3rem;color:var(--krds-light-color-text-subtle);margin-bottom:1.2rem;">
          아이콘만 단독으로 의미를 전달할 때. aria-label로 대체 텍스트를 제공합니다.
        </p>
        <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:1.2rem;">
          <button type="button" style="display:inline-flex;align-items:center;justify-content:center;width:4rem;height:4rem;border:1px solid var(--krds-light-color-border-gray);border-radius:0.4rem;background:none;cursor:pointer;">
            <i class="ds-icon ds-ico-sch" role="img" aria-label="검색"></i>
          </button>
        </div>
        <pre style="background:var(--krds-light-color-surface-gray);padding:1.2rem;border-radius:0.6rem;font-size:1.2rem;overflow:auto;">&lt;button type="button"&gt;
  &lt;i class="ds-icon ds-ico-sch" role="img" aria-label="검색"&gt;&lt;/i&gt;
&lt;/button&gt;</pre>
      </section>

      <section>
        <h2 style="font-size:1.4rem;font-weight:bold;margin-bottom:1.2rem;color:var(--krds-light-color-text-bolder);">
          sr-only 텍스트로 대체 — 버튼에 권장
        </h2>
        <p style="font-size:1.3rem;color:var(--krds-light-color-text-subtle);margin-bottom:1.2rem;">
          아이콘 버튼에서 가장 많이 사용하는 패턴. aria-label보다 번역·유지보수가 쉽습니다.
        </p>
        <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:1.2rem;">
          <button type="button" style="display:inline-flex;align-items:center;justify-content:center;width:4rem;height:4rem;border:1px solid var(--krds-light-color-border-gray);border-radius:0.4rem;background:none;cursor:pointer;">
            <i class="ds-icon ds-ico-sch" aria-hidden="true"></i>
            <span class="sr-only">검색</span>
          </button>
        </div>
        <pre style="background:var(--krds-light-color-surface-gray);padding:1.2rem;border-radius:0.6rem;font-size:1.2rem;overflow:auto;">&lt;button type="button"&gt;
  &lt;i class="ds-icon ds-ico-sch" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;span class="sr-only"&gt;검색&lt;/span&gt;
&lt;/button&gt;</pre>
      </section>
    </div>`,
};
