/**
 * KRDS 컴포넌트 네이밍 데이터
 *
 * 유일한 진실 공급원(source of truth).
 * - src/docs/components-naming.mdx (전체 정의서)
 * - 각 컴포넌트 .mdx 의 "네이밍" 섹션
 * 모두 이 파일의 데이터를 가져와 표시합니다.
 * 네이밍을 수정할 때는 이 파일만 고치면 양쪽에 반영됩니다.
 *
 * confirmed: true  → KRDS reference 코드에서 확인된 클래스명
 * confirmed: false → 추측 클래스명 ("확인 필요" 표시)
 *
 * class    → 디자인 시스템에서 실제로 사용하는 클래스명 (ds- 접두사)
 * krdsClass → KRDS reference 원본 클래스명 (krds- 접두사)
 */

// ─── 버튼 (Button) ─────────────────────────────────────────────────────────

export const buttonNaming = {
  name: '버튼',
  englishName: 'Button',
  sbPath: '컴포넌트/액션/버튼',
  baseClass: 'ds-btn',
  krdsBaseClass: 'krds-btn',
  description: '사용자 액션을 트리거하는 버튼',

  /** 구조도: 들여쓰기 기반 텍스트 */
  structure: `button.ds-btn [ds-btn--종류] [ds-btn--크기]
├── [텍스트]
└── i.ds-icon.ds-ico-*          ← 아이콘 (선택)

아이콘 전용 버튼:
button.ds-btn.ds-btn--icon [ds-btn--크기] [ds-btn--border]
├── span.sr-only              ← 숨김 텍스트 (필수)
└── i.ds-icon.ds-ico-*`,

  /** 클래스명 표 */
  elements: [
    {
      element: '버튼',
      class: 'ds-btn',
      krdsClass: 'krds-btn',
      description: '버튼 루트 요소. 종류·크기·상태 modifier를 공백으로 이어 붙인다.',
      confirmed: true,
    },
    {
      element: '아이콘',
      class: 'ds-icon ds-ico-*',
      krdsClass: 'svg-icon ico-*',
      description: 'CSS mask-image 기반 SVG 아이콘. ds-ico-* 자리에 아이콘명 입력. (선택)',
      confirmed: true,
    },
    {
      element: '숨김 텍스트',
      class: 'sr-only',
      krdsClass: 'sr-only',
      description: '스크린 리더 전용 설명 텍스트. 아이콘 전용 버튼(.ds-btn--icon)에 반드시 포함.',
      confirmed: true,
    },
  ],

  /** 변형(modifier) 표 */
  modifiers: [
    // 종류
    { category: '종류', class: 'ds-btn--primary',   krdsClass: 'primary',   description: '가장 중요한 주요 액션 버튼', confirmed: true },
    { category: '종류', class: 'ds-btn--secondary', krdsClass: 'secondary', description: 'Primary와 함께 쓰는 보조 액션 버튼', confirmed: true },
    { category: '종류', class: 'ds-btn--tertiary',  krdsClass: 'tertiary',  description: '낮은 우선순위 액션 버튼 (취소·닫기 등)', confirmed: true },
    { category: '종류', class: 'ds-btn--text',      krdsClass: 'text',      description: '테두리 없이 텍스트만 표시하는 버튼', confirmed: true },
    { category: '종류', class: 'ds-btn--icon',      krdsClass: 'icon',      description: '텍스트 없이 아이콘만 표시하는 버튼 (sr-only 필수)', confirmed: true },
    // 링크 변형 — <a> 태그에 ds-btn과 함께 사용
    { category: '종류 (링크)', class: 'ds-btn--link',  krdsClass: 'link',  description: '<a> 태그에 사용. 페이지 이동 링크 버튼 스타일', confirmed: true },
    { category: '종류 (링크)', class: 'ds-btn--pure',  krdsClass: 'pure',  description: 'link와 함께 사용. 가상클래스 상태에서도 색상 고정', confirmed: true },
    { category: '종류 (링크)', class: 'ds-btn--basic', krdsClass: 'basic', description: 'link와 함께 사용. 본문 텍스트 색상 링크', confirmed: true },
    // 크기
    { category: '크기', class: 'ds-btn--xsmall', krdsClass: 'xsmall', description: 'X-Small (가장 작은 크기)', confirmed: true },
    { category: '크기', class: 'ds-btn--small',  krdsClass: 'small',  description: 'Small', confirmed: true },
    { category: '크기', class: 'ds-btn--medium', krdsClass: 'medium', description: 'Medium', confirmed: true },
    { category: '크기', class: 'ds-btn--large',  krdsClass: 'large',  description: 'Large — 크기 클래스를 생략하면 이 크기가 기본 적용된다.', confirmed: true },
    { category: '크기', class: 'ds-btn--xlarge', krdsClass: 'xlarge', description: 'X-Large (가장 큰 크기)', confirmed: true },
    // 아이콘 전용 옵션
    { category: '아이콘 전용', class: 'ds-btn--border', krdsClass: 'border', description: '.ds-btn--icon 버튼에 원형 테두리를 추가한다.', confirmed: true },
    // 상태
    { category: '상태', class: 'ds-btn--disabled', krdsClass: 'disabled', description: '<button>은 HTML disabled 속성 사용. <a> 태그·text 버튼은 .ds-btn--disabled 클래스 + aria-disabled="true" + tabindex="-1" 사용.', confirmed: true },
  ],

  /** 코드 예시 */
  codeExample: `<!-- 기본 버튼 (위계) -->
<button type="button" class="ds-btn ds-btn--primary">Primary</button>
<button type="button" class="ds-btn ds-btn--secondary">Secondary</button>
<button type="button" class="ds-btn ds-btn--tertiary">Tertiary</button>

<!-- 크기 — 클래스 생략 시 large가 기본 적용 -->
<button type="button" class="ds-btn ds-btn--primary">크기 생략 → Large</button>
<button type="button" class="ds-btn ds-btn--primary ds-btn--xsmall">XSmall</button>
<button type="button" class="ds-btn ds-btn--primary ds-btn--small">Small</button>
<button type="button" class="ds-btn ds-btn--primary ds-btn--medium">Medium</button>
<button type="button" class="ds-btn ds-btn--primary ds-btn--large">Large</button>
<button type="button" class="ds-btn ds-btn--primary ds-btn--xlarge">XLarge</button>

<!-- 아이콘 포함 — 오른쪽 아이콘 -->
<button type="button" class="ds-btn ds-btn--primary ds-btn--small">
  검색 <i class="ds-icon ds-ico-sch" aria-hidden="true"></i>
</button>

<!-- 아이콘 포함 — 왼쪽 아이콘 -->
<button type="button" class="ds-btn ds-btn--primary ds-btn--small">
  <i class="ds-icon ds-ico-sch" aria-hidden="true"></i> 검색
</button>

<!-- 아이콘 전용 버튼 (sr-only 필수) -->
<button type="button" class="ds-btn ds-btn--icon ds-btn--medium">
  <span class="sr-only">검색</span>
  <i class="ds-icon ds-ico-sch" aria-hidden="true"></i>
</button>

<!-- 아이콘 전용 + 원형 테두리 -->
<button type="button" class="ds-btn ds-btn--icon ds-btn--large ds-btn--border">
  <span class="sr-only">새로고침</span>
  <i class="ds-icon ds-ico-refresh" aria-hidden="true"></i>
</button>

<!-- 텍스트 버튼 -->
<button type="button" class="ds-btn ds-btn--text ds-btn--medium">텍스트</button>

<!-- 링크 버튼 — <a> 태그 사용 -->
<a href="https://example.com" class="ds-btn ds-btn--small ds-btn--link" target="_blank" title="새 창 열림">
  <span class="ds-btn__text">기본 링크</span>
  <i class="ds-icon ds-ico-go" aria-hidden="true"></i>
</a>
<a href="/path" class="ds-btn ds-btn--large ds-btn--link ds-btn--basic">
  <span class="ds-btn__text">본문 색상 링크</span>
</a>

<!-- 비활성화 -->
<!-- button: disabled 속성 사용 -->
<button type="button" class="ds-btn ds-btn--primary" disabled>비활성화</button>

<!-- a 태그 링크: .ds-btn--disabled 클래스 + aria-disabled + tabindex -->
<a href="#" class="ds-btn ds-btn--small ds-btn--link ds-btn--disabled" aria-disabled="true" tabindex="-1">비활성 링크</a>`,
};

// ─── 텍스트 입력 (Text Input) ───────────────────────────────────────────────

export const textInputNaming = {
  name: '텍스트 입력',
  englishName: 'Text Input',
  sbPath: '컴포넌트/입력/텍스트 입력',
  baseClass: 'ds-input',
  krdsBaseClass: 'krds-input',
  description: '사용자가 텍스트를 직접 입력하는 폼 요소',

  structure: `div.ds-form-group
├── div.ds-form-label
│   └── label[for]  (+ span.ds-form-label__required  ← 필수 시)
├── div.ds-form-content  [ds-form-content--error|--success|--info]
│   └── input.ds-input  [ds-input--small|--medium]  [disabled] [readonly]
└── p.ds-form-hint  [ds-form-hint--error|--success|--info]

아이콘 버튼 포함 (password / search):
div.ds-form-content.btn-ico-wrap  [data-delete="true"]
├── input.ds-input
└── div.btn-group
    ├── button.ds-btn.btn-delete-input   ← 삭제 버튼
    └── button.ds-btn                   ← 보기/검색 버튼

글자 수 표시:
div.ds-form-content
├── input.ds-input  [maxlength]
└── p.ds-count
    ├── span.ds-count__current
    └── span.ds-count__max

텍스트에어리어:
div.ds-form-content  [ds-form-content--error]
└── div.ds-textarea
    ├── textarea.ds-input
    └── p.ds-count  (또는 div.ds-textarea__bottom > p.ds-form-hint--error + p.ds-count)`,

  elements: [
    { element: '폼 그룹', class: 'ds-form-group', krdsClass: 'form-group', description: '레이블·입력·메시지를 묶는 최상위 컨테이너', confirmed: true },
    { element: '레이블 영역', class: 'ds-form-label', krdsClass: 'form-tit', description: '레이블을 감싸는 영역', confirmed: true },
    { element: '필수 표시', class: 'ds-form-label__required', krdsClass: 'required', description: '필수 입력 표시 (레이블 내 span)', confirmed: false },
    { element: '입력 영역', class: 'ds-form-content', krdsClass: 'form-conts', description: '입력창을 감싸는 영역. 상태 modifier를 이 요소에 적용한다', confirmed: true },
    { element: '입력창', class: 'ds-input', krdsClass: 'krds-input', description: '텍스트 입력창 (input 또는 textarea에 적용)', confirmed: true },
    { element: '도움말', class: 'ds-form-hint', krdsClass: 'form-hint', description: '입력 안내·에러·성공 메시지 (p 태그)', confirmed: true },
    { element: '버튼 래퍼', class: 'btn-ico-wrap', krdsClass: 'btn-ico-wrap', description: '입력창 오른쪽 아이콘 버튼을 포함할 때 ds-form-content에 추가', confirmed: true },
    { element: '버튼 그룹', class: 'btn-group', krdsClass: 'btn-group', description: '삭제·보기 등 버튼 묶음', confirmed: true },
    { element: '삭제 버튼', class: 'btn-delete-input', krdsClass: 'btn-delete-input', description: '입력 내용 삭제 버튼. data-delete="true" 시 CSS로 자동 표시', confirmed: true },
    { element: '글자 수', class: 'ds-count', krdsClass: 'textarea-count', description: '글자 수 표시 컨테이너 (input·textarea 공통)', confirmed: true },
    { element: '현재 글자 수', class: 'ds-count__current', krdsClass: 'count-now', description: '현재 입력된 글자 수 (primary 컬러)', confirmed: true },
    { element: '최대 글자 수', class: 'ds-count__max', krdsClass: 'count-total', description: '최대 글자 수 표시', confirmed: true },
    { element: 'Textarea 블록', class: 'ds-textarea', krdsClass: 'textarea-wrap', description: 'textarea + 글자 수를 묶는 블록', confirmed: true },
    { element: 'Textarea 하단', class: 'ds-textarea__bottom', krdsClass: 'textarea-bottom', description: '에러 메시지와 글자 수를 가로로 배치하는 컨테이너', confirmed: true },
  ],

  modifiers: [
    { category: '크기', class: 'ds-input--small',  krdsClass: 'krds-input small',  description: 'Small 크기', confirmed: true },
    { category: '크기', class: 'ds-input--medium', krdsClass: 'krds-input medium', description: 'Medium 크기', confirmed: true },
    { category: '크기', class: 'ds-input--large',  krdsClass: 'krds-input large',  description: 'Large — 크기 클래스를 생략하면 이 크기가 기본 적용된다', confirmed: true },
    { category: '크기 (Storybook 전용)', class: 'ds-input--focus', krdsClass: 'focus', description: 'Storybook 데모 전용. 실제 포커스 스타일은 CSS :focus 가상 클래스로 처리한다', confirmed: false },
    { category: '상태 (부모)', class: 'ds-form-content--error', krdsClass: 'is-error', description: '에러 상태. ds-form-content에 적용', confirmed: true },
    { category: '상태 (부모)', class: 'ds-form-content--success', krdsClass: 'is-success', description: '성공 상태. ds-form-content에 적용', confirmed: false },
    { category: '상태 (부모)', class: 'ds-form-content--info', krdsClass: 'is-information', description: '정보 상태. ds-form-content에 적용', confirmed: false },
    { category: '힌트 메시지', class: 'ds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. ds-form-hint와 함께 사용', confirmed: true },
    { category: '힌트 메시지', class: 'ds-form-hint--success', krdsClass: 'form-hint-success', description: '성공 메시지. ds-form-hint와 함께 사용', confirmed: true },
    { category: '힌트 메시지', class: 'ds-form-hint--info', krdsClass: 'form-hint-information', description: '정보 메시지. ds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 기본 -->
<div class="ds-form-group">
  <div class="ds-form-label">
    <label for="name">이름</label>
  </div>
  <div class="ds-form-content">
    <input type="text" id="name" class="ds-input" placeholder="이름을 입력하세요">
  </div>
  <p class="ds-form-hint">실명으로 입력해 주세요.</p>
</div>

<!-- 필수 + 에러 -->
<div class="ds-form-group">
  <div class="ds-form-label">
    <label for="email">이메일 <span class="ds-form-label__required" aria-hidden="true">필수</span></label>
  </div>
  <div class="ds-form-content ds-form-content--error">
    <input type="text" id="email" class="ds-input" placeholder="이메일을 입력하세요">
  </div>
  <p class="ds-form-hint ds-form-hint--error">올바른 이메일 형식으로 입력해 주세요.</p>
</div>

<!-- Textarea + 글자 수 -->
<div class="ds-form-group">
  <div class="ds-form-label">
    <label for="desc">내용</label>
  </div>
  <div class="ds-form-content">
    <div class="ds-textarea">
      <textarea id="desc" class="ds-input" maxlength="200"
        oninput="this.closest('.ds-textarea').querySelector('.ds-count__current').textContent=this.value.length">
      </textarea>
      <p class="ds-count">
        <span class="ds-count__current" aria-live="polite">0</span>
        <span class="ds-count__max">/ 200</span>
      </p>
    </div>
  </div>
</div>`,
};

// ─── 선택 상자 (Select) ─────────────────────────────────────────────────────

export const selectNaming = {
  name: '선택 상자',
  englishName: 'Select',
  sbPath: '컴포넌트/입력/선택 상자',
  baseClass: 'ds-select',
  krdsBaseClass: 'krds-form-select',
  description: '미리 정의된 선택지 중 하나를 드롭다운으로 선택하는 폼 요소',

  structure: `div.ds-form-group
├── div.ds-form-label
│   └── label[for]  (+ span.ds-form-label__required  ← 필수 시)
├── div.ds-form-content
│   └── select.ds-select  [ds-select--small|--medium]  [ds-select--error]  [disabled]
│       ├── option[value=""]  ← placeholder (빈 값)
│       └── option[value]
└── p.ds-form-hint  [ds-form-hint--error]`,

  elements: [
    { element: '폼 그룹', class: 'ds-form-group', krdsClass: 'form-group', description: '레이블·입력·메시지를 묶는 최상위 컨테이너', confirmed: true },
    { element: '레이블 영역', class: 'ds-form-label', krdsClass: 'form-tit', description: '레이블을 감싸는 영역', confirmed: true },
    { element: '필수 표시', class: 'ds-form-label__required', krdsClass: 'required', description: '필수 입력 표시 (레이블 내 span)', confirmed: false },
    { element: '입력 영역', class: 'ds-form-content', krdsClass: 'form-conts', description: '셀렉트 영역을 감싸는 컨테이너', confirmed: true },
    { element: '셀렉트', class: 'ds-select', krdsClass: 'krds-form-select', description: 'select 태그에 적용하는 기본 클래스 (기본 large 크기)', confirmed: true },
    { element: '도움말', class: 'ds-form-hint', krdsClass: 'form-hint', description: '입력 안내·에러 메시지 (p 태그)', confirmed: true },
  ],

  modifiers: [
    { category: '크기', class: 'ds-select--small',  krdsClass: 'krds-form-select small',  description: 'Small 크기', confirmed: true },
    { category: '크기', class: 'ds-select--medium', krdsClass: 'krds-form-select medium', description: 'Medium 크기', confirmed: true },
    { category: '크기', class: 'ds-select--large',  krdsClass: 'krds-form-select large',  description: 'Large — 크기 클래스를 생략하면 이 크기가 기본 적용된다', confirmed: true },
    { category: '상태', class: 'ds-select--completed', krdsClass: 'krds-form-select completed', description: '값이 선택된 상태. JS로 onchange 시 토글한다', confirmed: true },
    { category: '상태', class: 'ds-select--error', krdsClass: 'krds-form-select is-error', description: '에러 상태. select 요소에 직접 적용', confirmed: true },
    { category: '힌트 메시지', class: 'ds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. ds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 기본 -->
<div class="ds-form-group">
  <div class="ds-form-label">
    <label for="sel-1">지역</label>
  </div>
  <div class="ds-form-content">
    <select id="sel-1" class="ds-select" title="선택하세요"
      onchange="this.classList.toggle('ds-select--completed', !!this.value)">
      <option value="">선택하세요</option>
      <option value="1">서울</option>
      <option value="2">경기</option>
    </select>
  </div>
  <p class="ds-form-hint">거주 지역을 선택하세요.</p>
</div>

<!-- 에러 -->
<div class="ds-form-group">
  <div class="ds-form-label">
    <label for="sel-2">지역 <span class="ds-form-label__required" aria-hidden="true">필수</span></label>
  </div>
  <div class="ds-form-content">
    <select id="sel-2" class="ds-select ds-select--error" title="선택하세요">
      <option value="">선택하세요</option>
    </select>
  </div>
  <p class="ds-form-hint ds-form-hint--error">항목을 선택해 주세요.</p>
</div>

<!-- 크기 -->
<select class="ds-select ds-select--small" title="선택하세요">...</select>
<select class="ds-select ds-select--medium" title="선택하세요">...</select>
<select class="ds-select" title="선택하세요">...</select>`,
};

// ─── 체크박스 (Checkbox) ────────────────────────────────────────────────────

export const checkboxNaming = {
  name: '체크박스',
  englishName: 'Checkbox',
  sbPath: '컴포넌트/선택/체크박스',
  baseClass: 'ds-check-item',
  krdsBaseClass: 'krds-form-check',
  description: '여러 항목 중 하나 이상을 선택하는 폼 요소',

  structure: `fieldset.ds-form-group
├── legend.ds-form-label
│   └── span  (+ span.ds-form-label__required  ← 필수 시)
├── div.ds-form-content  [ds-form-content--error]
│   └── div.ds-check-group  [ds-check-group--column]
│       └── div.ds-check-item  [ds-check-item--medium|--large]
│           ├── input[type=checkbox]  [checked] [disabled]
│           ├── label[for]
│           └── div.ds-check-item__desc   ← 부가 설명 (선택)
│               └── p.ds-check-item__text
└── p.ds-form-hint  [ds-form-hint--error]`,

  elements: [
    { element: '폼 그룹 (fieldset)', class: 'ds-form-group', krdsClass: 'form-group', description: '그룹 최상위 컨테이너. 체크박스 그룹은 접근성을 위해 fieldset 태그에 사용', confirmed: true },
    { element: '그룹 레이블 (legend)', class: 'ds-form-label', krdsClass: 'form-tit', description: 'legend 태그에 적용. float 트릭으로 레이아웃 유지', confirmed: true },
    { element: '필수 표시', class: 'ds-form-label__required', krdsClass: 'required', description: '필수 입력 표시 (legend 내 span)', confirmed: false },
    { element: '입력 영역', class: 'ds-form-content', krdsClass: 'form-conts', description: '체크박스 그룹을 감싸는 컨테이너', confirmed: true },
    { element: '체크 그룹', class: 'ds-check-group', krdsClass: 'krds-check-area', description: '체크박스 항목을 나열하는 컨테이너 (기본: 가로 배치)', confirmed: true },
    { element: '체크 아이템', class: 'ds-check-item', krdsClass: 'krds-form-check', description: '개별 체크박스 래퍼', confirmed: true },
    { element: '부가 설명 컨테이너', class: 'ds-check-item__desc', krdsClass: 'krds-form-check-cnt', description: '체크박스 아래 부가 설명 영역', confirmed: true },
    { element: '부가 설명 텍스트', class: 'ds-check-item__text', krdsClass: 'krds-form-check-p', description: '부가 설명 텍스트 (p 태그)', confirmed: true },
    { element: '도움말', class: 'ds-form-hint', krdsClass: 'form-hint', description: '그룹 하단 도움말·에러 메시지', confirmed: true },
  ],

  modifiers: [
    { category: '배치', class: 'ds-check-group--column', krdsClass: 'krds-check-area chk-column', description: '세로 배치. ds-check-group에 적용', confirmed: true },
    { category: '크기', class: 'ds-check-item--medium', krdsClass: 'krds-form-check medium', description: 'Medium 크기 (기본값)', confirmed: true },
    { category: '크기', class: 'ds-check-item--large',  krdsClass: 'krds-form-check large',  description: 'Large 크기', confirmed: true },
    { category: '상태 (부모)', class: 'ds-form-content--error', krdsClass: 'is-error', description: '에러 상태. ds-form-content에 적용 → 내부 체크박스 테두리 색상 변경', confirmed: true },
    { category: '힌트 메시지', class: 'ds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. ds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 세로 배치 그룹 -->
<fieldset class="ds-form-group">
  <legend class="ds-form-label">
    <span>관심사 <span class="ds-form-label__required" aria-hidden="true">필수</span></span>
  </legend>
  <div class="ds-form-content">
    <div class="ds-check-group ds-check-group--column">
      <div class="ds-check-item ds-check-item--medium">
        <input type="checkbox" id="chk-1" checked>
        <label for="chk-1">뉴스</label>
      </div>
      <div class="ds-check-item ds-check-item--medium">
        <input type="checkbox" id="chk-2">
        <label for="chk-2">스포츠</label>
        <div class="ds-check-item__desc">
          <p class="ds-check-item__text">스포츠 관련 콘텐츠를 받아봅니다.</p>
        </div>
      </div>
    </div>
  </div>
</fieldset>

<!-- 에러 상태 -->
<fieldset class="ds-form-group">
  <legend class="ds-form-label"><span>동의 항목</span></legend>
  <div class="ds-form-content ds-form-content--error">
    <div class="ds-check-group ds-check-group--column">
      <div class="ds-check-item ds-check-item--medium">
        <input type="checkbox" id="chk-err">
        <label for="chk-err">서비스 이용약관 동의</label>
      </div>
    </div>
  </div>
  <p class="ds-form-hint ds-form-hint--error">하나 이상 선택해 주세요.</p>
</fieldset>`,
};

// ─── 라디오 버튼 (Radio Button) ─────────────────────────────────────────────

export const radioNaming = {
  name: '라디오 버튼',
  englishName: 'Radio Button',
  sbPath: '컴포넌트/선택/라디오 버튼',
  baseClass: 'ds-check-item',
  krdsBaseClass: 'krds-form-check',
  description: '여러 항목 중 반드시 하나만 선택하는 폼 요소. 체크박스와 CSS를 공유한다',

  structure: `fieldset.ds-form-group
├── legend.ds-form-label
│   └── span  (+ span.ds-form-label__required  ← 필수 시)
├── div.ds-form-content  [ds-form-content--error]
│   └── div.ds-check-group  [ds-check-group--column]
│       └── div.ds-check-item  [ds-check-item--medium|--large]
│           ├── input[type=radio] [name=그룹명]  [checked] [disabled]
│           ├── label[for]
│           └── div.ds-check-item__desc   ← 부가 설명 (선택)
│               └── p.ds-check-item__text
└── p.ds-form-hint  [ds-form-hint--error]`,

  elements: [
    { element: '폼 그룹 (fieldset)', class: 'ds-form-group', krdsClass: 'form-group', description: '그룹 최상위 컨테이너. 라디오 그룹은 접근성을 위해 fieldset 태그에 사용', confirmed: true },
    { element: '그룹 레이블 (legend)', class: 'ds-form-label', krdsClass: 'form-tit', description: 'legend 태그에 적용', confirmed: true },
    { element: '필수 표시', class: 'ds-form-label__required', krdsClass: 'required', description: '필수 입력 표시 (legend 내 span)', confirmed: false },
    { element: '입력 영역', class: 'ds-form-content', krdsClass: 'form-conts', description: '라디오 그룹을 감싸는 컨테이너', confirmed: true },
    { element: '체크 그룹', class: 'ds-check-group', krdsClass: 'krds-check-area', description: '라디오 항목을 나열하는 컨테이너 (기본: 가로 배치)', confirmed: true },
    { element: '체크 아이템', class: 'ds-check-item', krdsClass: 'krds-form-check', description: '개별 라디오 버튼 래퍼', confirmed: true },
    { element: '부가 설명 컨테이너', class: 'ds-check-item__desc', krdsClass: 'krds-form-check-cnt', description: '라디오 버튼 아래 부가 설명 영역', confirmed: true },
    { element: '부가 설명 텍스트', class: 'ds-check-item__text', krdsClass: 'krds-form-check-p', description: '부가 설명 텍스트 (p 태그)', confirmed: true },
    { element: '도움말', class: 'ds-form-hint', krdsClass: 'form-hint', description: '그룹 하단 도움말·에러 메시지', confirmed: true },
  ],

  modifiers: [
    { category: '배치', class: 'ds-check-group--column', krdsClass: 'krds-check-area chk-column', description: '세로 배치. ds-check-group에 적용', confirmed: true },
    { category: '크기', class: 'ds-check-item--medium', krdsClass: 'krds-form-check medium', description: 'Medium 크기 (기본값)', confirmed: true },
    { category: '크기', class: 'ds-check-item--large',  krdsClass: 'krds-form-check large',  description: 'Large 크기', confirmed: true },
    { category: '상태 (부모)', class: 'ds-form-content--error', krdsClass: 'is-error', description: '에러 상태. ds-form-content에 적용 → 내부 라디오 테두리 색상 변경', confirmed: true },
    { category: '힌트 메시지', class: 'ds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. ds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 세로 배치 + 부가 설명 -->
<fieldset class="ds-form-group">
  <legend class="ds-form-label"><span>배송 방법</span></legend>
  <div class="ds-form-content">
    <div class="ds-check-group ds-check-group--column">
      <div class="ds-check-item ds-check-item--medium">
        <input type="radio" id="rdo-1" name="shipping" checked>
        <label for="rdo-1">일반 배송</label>
        <div class="ds-check-item__desc">
          <p class="ds-check-item__text">무료 · 2~3일 소요</p>
        </div>
      </div>
      <div class="ds-check-item ds-check-item--medium">
        <input type="radio" id="rdo-2" name="shipping">
        <label for="rdo-2">빠른 배송</label>
        <div class="ds-check-item__desc">
          <p class="ds-check-item__text">3,000원 · 익일 도착</p>
        </div>
      </div>
    </div>
  </div>
</fieldset>`,
};

// ─── 전체 목록 (components-naming.mdx 용) ──────────────────────────────────
// 새 컴포넌트를 추가하면 이 배열에도 추가한다.

export const allComponents = [buttonNaming, textInputNaming, selectNaming, checkboxNaming, radioNaming];
