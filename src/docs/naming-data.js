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

<!-- 버튼 외형 링크 — <a> 태그에 ds-btn 위계 modifier 적용 -->
<a href="https://example.com" class="ds-btn ds-btn--primary ds-btn--small">이동하기</a>
<a href="/path" class="ds-btn ds-btn--secondary ds-btn--medium">자세히 보기</a>
<!-- 텍스트 링크는 ds-link 컴포넌트를 사용한다 -->

<!-- 비활성화 -->
<!-- button: disabled 속성 사용 -->
<button type="button" class="ds-btn ds-btn--primary" disabled>비활성화</button>

<!-- a 태그 버튼 외형 링크: .ds-btn--disabled 클래스 + aria-disabled + tabindex -->
<a href="#" class="ds-btn ds-btn--secondary ds-btn--small ds-btn--disabled" aria-disabled="true" tabindex="-1">비활성 링크 버튼</a>`,
};

// ─── 링크 텍스트 (Link Text) ────────────────────────────────────────────────

export const linkNaming = {
  name: '링크 텍스트',
  englishName: 'Link Text',
  sbPath: '컴포넌트/액션/링크 텍스트',
  baseClass: 'ds-link',
  krdsBaseClass: 'krds-btn link',
  description: '인라인 또는 독립형 텍스트 링크. 페이지 이동이 목적인 <a> 요소에 사용. 버튼(ds-btn)과 독립된 별도 블록',

  structure: `a.ds-link [ds-link--크기] [ds-link--basic] [ds-link--pure]
├── span.ds-link__text                            ← 밑줄 항상
│   또는
│   span.ds-link__text.ds-link__text--underline-hover  ← 밑줄 hover (같은 span에 클래스 2개)
│   (자식 span 없음 → 밑줄 없음)
└── i.ds-icon.ds-ico-*                            ← 아이콘 (선택)`,

  elements: [
    { element: '링크', class: 'ds-link', krdsClass: 'krds-btn link', description: '링크 텍스트 루트 (<a> 태그). 크기·색상·pure modifier를 공백으로 이어 붙인다. 기본 크기는 large.', confirmed: true },
    { element: '밑줄 텍스트', class: 'ds-link__text', krdsClass: 'underline', description: '텍스트에 밑줄 항상 표시', confirmed: true },
    { element: '아이콘', class: 'ds-icon ds-ico-*', krdsClass: 'svg-icon ico-*', description: 'CSS mask-image 기반 SVG 아이콘. 외부 링크 시 ds-ico-go 사용', confirmed: true },
  ],

  modifiers: [
    { category: '크기', class: 'ds-link--xsmall', krdsClass: 'xsmall', description: 'X-Small', confirmed: true },
    { category: '크기', class: 'ds-link--small',  krdsClass: 'small',  description: 'Small', confirmed: true },
    { category: '크기', class: 'ds-link--medium', krdsClass: 'medium', description: 'Medium', confirmed: true },
    { category: '크기', class: 'ds-link--large',  krdsClass: 'large',  description: 'Large — 크기 클래스를 생략하면 이 크기가 기본 적용된다.', confirmed: true },
    { category: '크기', class: 'ds-link--xlarge', krdsClass: 'xlarge', description: 'X-Large', confirmed: true },
    { category: '색상', class: 'ds-link--basic', krdsClass: 'basic', description: '본문 텍스트 색상(--krds-light-color-text-basic). 기본은 링크 색상', confirmed: true },
    { category: '색상', class: 'ds-link--pure',  krdsClass: 'pure',  description: '가상클래스 상태에서도 기본 색상 유지. ds-link--basic과 함께 쓸 수 있다.', confirmed: true },
    { category: '밑줄', class: 'ds-link__text--underline-hover', krdsClass: 'hidden-underline', description: '기본 투명 밑줄, 상호작용 시 표시. ds-link__text와 같은 span에 함께 사용', confirmed: true },
    { category: '상태', class: 'ds-link--disabled', krdsClass: 'disabled', description: '비활성화. <a> 태그는 disabled 속성이 없으므로 이 클래스 + aria-disabled="true" + tabindex="-1" 사용', confirmed: true },
  ],

  codeExample: `<!-- 기본 (밑줄 항상) -->
<a href="/path" class="ds-link">
  <span class="ds-link__text">링크 텍스트</span>
</a>

<!-- 새 창 + 아이콘 -->
<a href="https://example.com" class="ds-link" target="_blank" title="새 창 열림">
  <span class="ds-link__text">외부 링크</span>
  <i class="ds-icon ds-ico-go" aria-hidden="true"></i>
</a>

<!-- 본문 텍스트 색상 -->
<a href="/path" class="ds-link ds-link--basic">
  <span class="ds-link__text">본문 색상 링크</span>
</a>

<!-- 밑줄 hover — ds-link__text와 ds-link__text--underline-hover를 같은 span에 사용 -->
<a href="/path" class="ds-link">
  <span class="ds-link__text ds-link__text--underline-hover">hover 시 밑줄</span>
</a>

<!-- 밑줄 없음 -->
<a href="/path" class="ds-link">
  <span>밑줄 없음</span>
</a>

<!-- 순수 — 상호작용 시 색상 유지 -->
<a href="/path" class="ds-link ds-link--pure">
  <span class="ds-link__text">색상 고정 링크</span>
</a>

<!-- 크기 (medium) -->
<a href="/path" class="ds-link ds-link--medium">
  <span class="ds-link__text">Medium 링크</span>
</a>

<!-- 비활성화 -->
<a href="#" class="ds-link ds-link--disabled" aria-disabled="true" tabindex="-1">
  <span class="ds-link__text">비활성 링크</span>
</a>`,
};

// ─── 태그 (Tag) ─────────────────────────────────────────────────────────────

export const tagNaming = {
  name: '태그',
  englishName: 'Tag',
  sbPath: '컴포넌트/선택/태그',
  baseClass: 'ds-tag-group',
  krdsBaseClass: 'krds-tag-wrap',
  description: '선택된 필터·키워드를 칩 형태로 표시하고 삭제할 수 있는 요소. 링크 태그(ds-tag--link) 포함',

  structure: `div.ds-tag-group  [ds-tag-group--크기]
└── span.ds-tag  또는  a.ds-tag.ds-tag--link
    ├── [텍스트]
    └── button.ds-tag__delete-btn        ← 삭제 버튼 (선택)
        └── span.sr-only`,

  elements: [
    { element: '태그 그룹', class: 'ds-tag-group', krdsClass: 'krds-tag-wrap', description: '태그 목록 컨테이너. 크기 modifier를 함께 사용한다.', confirmed: true },
    { element: '태그 항목', class: 'ds-tag', krdsClass: 'krds-btn-tag', description: '개별 태그. span(삭제 가능) 또는 a(링크) 태그에 적용', confirmed: true },
    { element: '삭제 버튼', class: 'ds-tag__delete-btn', krdsClass: 'btn-delete', description: '태그 내 삭제 버튼. sr-only로 텍스트 필수', confirmed: true },
    { element: '숨김 텍스트', class: 'sr-only', krdsClass: 'sr-only', description: '삭제 버튼의 스크린 리더 전용 텍스트', confirmed: true },
  ],

  modifiers: [
    { category: '크기', class: 'ds-tag-group--small',  krdsClass: 'small',  description: 'Small 크기 태그 그룹', confirmed: true },
    { category: '크기', class: 'ds-tag-group--medium', krdsClass: 'medium', description: 'Medium 크기 태그 그룹 (기본)', confirmed: true },
    { category: '크기', class: 'ds-tag-group--large',  krdsClass: 'large',  description: 'Large 크기 태그 그룹', confirmed: true },
    { category: '링크', class: 'ds-tag--link', krdsClass: 'link', description: '링크 스타일 태그. hover·active 시 밑줄. ds-tag와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 삭제 가능한 태그 -->
<div class="ds-tag-group ds-tag-group--medium">
  <span class="ds-tag">
    공지사항
    <button type="button" class="ds-tag__delete-btn">
      <span class="sr-only">공지사항 삭제</span>
    </button>
  </span>
  <span class="ds-tag">
    이벤트
    <button type="button" class="ds-tag__delete-btn">
      <span class="sr-only">이벤트 삭제</span>
    </button>
  </span>
</div>

<!-- 링크 태그 -->
<div class="ds-tag-group ds-tag-group--medium">
  <a href="#" class="ds-tag ds-tag--link">디자인 시스템</a>
  <a href="#" class="ds-tag ds-tag--link">접근성</a>
  <a href="#" class="ds-tag ds-tag--link">KRDS</a>
</div>`,
};

// ─── 글자 수 (Character Count) — 공통 블록 ─────────────────────────────────
// input·textarea 양쪽에서 재사용하는 공통 블록.
// naming-data.js 컴포넌트 항목이지만 allComponents에는 포함하지 않는다.

export const countNaming = {
  name: '글자 수',
  englishName: 'Character Count',
  description: 'input·textarea에 공통으로 사용하는 글자 수 표시 블록',
  baseClass: 'ds-count',
  krdsBaseClass: 'textarea-count',

  elements: [
    { element: '글자 수', class: 'ds-count', krdsClass: 'textarea-count', description: '글자 수 표시 컨테이너 (input·textarea 공통)', confirmed: true },
    { element: '현재 글자 수', class: 'ds-count__current', krdsClass: 'count-now', description: '현재 입력된 글자 수 (primary 컬러). 에러 상태에서 danger 컬러로 전환됨', confirmed: true },
    { element: '최대 글자 수', class: 'ds-count__max', krdsClass: 'count-total', description: '최대 글자 수 표시', confirmed: true },
  ],

  modifiers: [],
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
div.ds-form-content.ds-form-content--with-btn  [data-delete="true"]
├── input.ds-input
└── div.ds-form-content__actions
    ├── button.ds-btn.ds-input__clear-btn ← 입력값 지우기 버튼
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
    { element: '버튼 포함 영역', class: 'ds-form-content--with-btn', krdsClass: 'btn-ico-wrap', description: 'ds-form-content에 추가하는 modifier. 아이콘 버튼을 포함하는 입력창에 사용', confirmed: true },
    { element: '버튼 묶음', class: 'ds-form-content__actions', krdsClass: 'btn-group', description: '삭제·보기 등 버튼을 묶는 컨테이너', confirmed: true },
    { element: '입력값 지우기 버튼', class: 'ds-input__clear-btn', krdsClass: 'btn-delete-input', description: '입력 내용 삭제 버튼. data-delete="true" 시 CSS로 자동 표시', confirmed: true },
    // ds-count 3종은 공통 블록으로 분리 → countNaming 참고
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

// ─── 날짜 입력 (Date Input) ─────────────────────────────────────────────────

export const dateInputNaming = {
  name: '날짜 입력',
  englishName: 'Date Input',
  sbPath: '컴포넌트/입력/날짜 입력',
  baseClass: 'ds-date-input',
  krdsBaseClass: 'calendar-conts',
  description: '달력 팝업을 통해 날짜 또는 기간을 선택하는 입력 필드',

  elements: [
    { element: '컨테이너', class: 'ds-date-input', krdsClass: 'calendar-conts', description: 'ds-form-content에 병기하는 블록 클래스. gap: 0 적용', confirmed: true },
    { element: '입력 래퍼', class: 'ds-date-input__input-wrap', krdsClass: 'calendar-input', description: 'input + 달력 열기 버튼을 묶는 래퍼', confirmed: true },
    { element: '달력 열기 버튼', class: 'ds-date-input__open-btn', krdsClass: 'form-btn-datepicker', description: '입력창 우측 달력 아이콘 버튼', confirmed: true },
    { element: '기간 입력 목록', class: 'ds-date-input__range-list', krdsClass: 'input-group range set', description: '기간 선택 시 시작·종료 input을 담는 ul', confirmed: true },
    { element: '기간 입력 항목', class: 'ds-date-input__range-item', krdsClass: '(없음)', description: '기간 선택 시 시작·종료 input을 담는 li. :not() 선택 대신 직접 클래스로 지정', confirmed: true },
    { element: '구분자', class: 'ds-date-input__separator', krdsClass: 'mark', description: '기간 선택 시 – 구분 li', confirmed: true },
    { element: '날짜 input', class: 'ds-date-input__input', krdsClass: 'datepicker', description: '날짜 표시용 읽기 전용 input (JS 훅 클래스)', confirmed: true },
  ],

  modifiers: [
    { category: '단일 날짜 input', class: 'ds-date-input__input--single', krdsClass: 'cal', description: '단일 날짜 모드 input 식별자. ds-date-input__input과 함께 사용', confirmed: true },
  ],
};

// ─── 달력 팝업 (Calendar) — ds-date-input의 하위 블록 ────────────────────────
// allComponents에 포함하지 않음 (date-input 전용 서브 블록)

export const calendarNaming = {
  name: '달력',
  englishName: 'Calendar',
  description: '날짜 입력 컴포넌트의 달력 팝업 블록',
  baseClass: 'ds-calendar',
  krdsBaseClass: 'ds-calendar-area',

  elements: [
    { element: '팝업 패널', class: 'ds-calendar__panel', krdsClass: 'calendar-wrap', description: '달력 팝업 컨테이너', confirmed: true },
    { element: '헤더', class: 'ds-calendar__head', krdsClass: 'calendar-head', description: '', confirmed: true },
    { element: '이전/다음 달 버튼', class: 'ds-calendar__move-btn', krdsClass: 'btn-cal-move', description: '방향 modifier(--prev/--next)와 함께 사용', confirmed: true },
    { element: '연월 스위치 그룹', class: 'ds-calendar__switch-group', krdsClass: 'calendar-switch-wrap', description: '', confirmed: true },
    { element: '드롭다운 컨테이너', class: 'ds-calendar__dropdown', krdsClass: 'calendar-drop-down', description: '', confirmed: true },
    { element: '연/월 스위치 버튼', class: 'ds-calendar__switch-btn', krdsClass: 'btn-cal-switch', description: '', confirmed: true },
    { element: '드롭다운 패널', class: 'ds-calendar__dropdown-panel', krdsClass: 'calendar-select', description: '연도 패널은 --year, 월 패널은 --month modifier 추가', confirmed: true },
    { element: '드롭다운 목록', class: 'ds-calendar__dropdown-list', krdsClass: 'sel', description: '', confirmed: true },
    { element: '드롭다운 항목', class: 'ds-calendar__dropdown-item', krdsClass: '(없음)', description: '연/월 선택 버튼 (기존 클래스 없음 → 새로 추가)', confirmed: true },
    { element: '달력 본문', class: 'ds-calendar__body', krdsClass: 'calendar-body', description: '', confirmed: true },
    { element: '테이블 래퍼', class: 'ds-calendar__table-wrap', krdsClass: 'calendar-table-wrap', description: '', confirmed: true },
    { element: '날짜 테이블', class: 'ds-calendar__table', krdsClass: 'calendar-tbl', description: '', confirmed: true },
    { element: '날짜 셀', class: 'ds-calendar__cell', krdsClass: '(td 직접)', description: '날짜 테이블의 모든 td에 기본 클래스로 적용', confirmed: true },
    { element: '날짜 버튼', class: 'ds-calendar__date-btn', krdsClass: 'btn-set-date', description: '', confirmed: true },
    { element: '푸터', class: 'ds-calendar__footer', krdsClass: 'calendar-footer', description: '', confirmed: true },
    { element: '액션 버튼 행', class: 'ds-calendar__actions', krdsClass: 'calendar-btn-wrap', description: '', confirmed: true },
    { element: '오늘 버튼', class: 'ds-calendar__today-btn', krdsClass: 'btn-today', description: '', confirmed: true },
    { element: '취소 버튼', class: 'ds-calendar__cancel-btn', krdsClass: 'btn-cancel', description: '', confirmed: true },
    { element: '확인 버튼', class: 'ds-calendar__confirm-btn', krdsClass: 'btn-confirm', description: '', confirmed: true },
  ],

  modifiers: [
    { category: '팝업 열림', class: 'ds-calendar--open', krdsClass: 'ds-calendar-area active', description: 'ds-calendar 블록에 적용', confirmed: true },
    { category: '하단 배치', class: 'ds-calendar__panel--bottom', krdsClass: 'calendar-wrap bottom', description: '', confirmed: true },
    { category: '단일 날짜 모드', class: 'ds-calendar__panel--single', krdsClass: 'calendar-wrap single', description: '기간 밴드(::after) 비표시', confirmed: true },
    { category: '이전 달 버튼', class: 'ds-calendar__move-btn--prev', krdsClass: 'btn-cal-move prev', description: 'ds-calendar__move-btn과 함께 사용', confirmed: true },
    { category: '다음 달 버튼', class: 'ds-calendar__move-btn--next', krdsClass: 'btn-cal-move next', description: 'ds-calendar__move-btn과 함께 사용', confirmed: true },
    { category: '스위치 버튼 열림', class: 'ds-calendar__switch-btn--open', krdsClass: 'btn-cal-switch active', description: 'ds-calendar__switch-btn과 함께 사용', confirmed: true },
    { category: '드롭다운 열림', class: 'ds-calendar__dropdown-panel--open', krdsClass: 'calendar-select active', description: 'ds-calendar__dropdown-panel과 함께 사용', confirmed: true },
    { category: '연도 패널', class: 'ds-calendar__dropdown-panel--year', krdsClass: 'calendar-year-wrap', description: 'ds-calendar__dropdown-panel과 함께 사용', confirmed: true },
    { category: '월 패널', class: 'ds-calendar__dropdown-panel--month', krdsClass: 'calendar-mon-wrap', description: 'ds-calendar__dropdown-panel과 함께 사용', confirmed: true },
    { category: '선택된 연/월 항목', class: 'ds-calendar__dropdown-item--current', krdsClass: 'button.active', description: 'ds-calendar__dropdown-item과 함께 사용', confirmed: true },
    { category: '이전 달 날짜', class: 'ds-calendar__cell--prev', krdsClass: 'old', description: 'ds-calendar__cell과 함께 사용', confirmed: true },
    { category: '다음 달 날짜', class: 'ds-calendar__cell--next', krdsClass: 'new', description: 'ds-calendar__cell과 함께 사용', confirmed: true },
    { category: '비활성 날짜', class: 'ds-calendar__cell--disabled', krdsClass: 'disabled', description: 'ds-calendar__cell과 함께 사용', confirmed: true },
    { category: '오늘', class: 'ds-calendar__cell--today', krdsClass: 'today', description: 'ds-calendar__cell과 함께 사용', confirmed: true },
    { category: '휴일/일요일', class: 'ds-calendar__cell--holiday', krdsClass: 'day-off', description: 'ds-calendar__cell과 함께 사용', confirmed: true },
    { category: '선택 기간', class: 'ds-calendar__cell--period', krdsClass: 'period', description: 'ds-calendar__cell과 함께 사용', confirmed: true },
    { category: '기간 시작일', class: 'ds-calendar__cell--start', krdsClass: 'start', description: 'ds-calendar__cell과 함께 사용', confirmed: true },
    { category: '기간 종료일', class: 'ds-calendar__cell--end', krdsClass: 'end', description: 'ds-calendar__cell과 함께 사용', confirmed: true },
  ],
};

// ─── 파일 업로드 (File Upload) ──────────────────────────────────────────────

export const fileUploadNaming = {
  name: '파일 업로드',
  englishName: 'File Upload',
  sbPath: '컴포넌트/입력/파일 업로드',
  baseClass: 'ds-file-upload',
  krdsBaseClass: 'ds-file-upload',
  description: '드래그 앤 드롭 또는 파일 선택으로 첨부 파일을 올리는 컴포넌트',

  elements: [
    { element: '파일 업로드', class: 'ds-file-upload', krdsClass: 'ds-file-upload', description: '최상위 컨테이너', confirmed: true },
    { element: '헤드', class: 'ds-file-upload__head', krdsClass: 'file-head', description: '제목·설명 영역 (선택)', confirmed: true },
    { element: '제목', class: 'ds-file-upload__title', krdsClass: 'tit', description: '', confirmed: true },
    { element: '드롭존', class: 'ds-file-upload__dropzone', krdsClass: 'file-upload', description: '드래그 앤 드롭 영역', confirmed: true },
    { element: '설명 문구', class: 'ds-file-upload__desc', krdsClass: 'txt', description: '', confirmed: true },
    { element: '버튼 래퍼', class: 'ds-file-upload__btn-wrap', krdsClass: 'file-upload-btn-wrap', description: '파일 선택 버튼·input 묶음', confirmed: true },
    { element: '파일 목록 영역', class: 'ds-file-upload__files', krdsClass: 'file-list', description: '목록 바깥 컨테이너', confirmed: true },
    { element: '파일 수 표시', class: 'ds-file-upload__total', krdsClass: 'total', description: '현재 / 최대 첨부 수', confirmed: true },
    { element: '현재 파일 수', class: 'ds-file-upload__total-current', krdsClass: 'current', description: 'primary 컬러로 표시', confirmed: true },
    { element: '파일 목록', class: 'ds-file-upload__list', krdsClass: 'upload-list', description: '실제 파일 항목 ul', confirmed: true },
    { element: '파일 항목', class: 'ds-file-upload__item', krdsClass: '(li 직접)', description: '목록의 개별 li', confirmed: true },
    { element: '파일 정보 행', class: 'ds-file-upload__item-info', krdsClass: 'file-info', description: '파일명 + 버튼 가로 배치', confirmed: true },
    { element: '파일명', class: 'ds-file-upload__item-name', krdsClass: 'file-name', description: '한 줄 말줄임', confirmed: true },
    { element: '버튼 영역', class: 'ds-file-upload__item-actions', krdsClass: 'btn-wrap', description: '상태 아이콘 또는 삭제 버튼', confirmed: true },
    { element: '상태 아이콘', class: 'ds-file-upload__item-icon', krdsClass: 'ico-invalid', description: '완료·오류 아이콘. 상태 modifier와 함께 사용', confirmed: true },
    { element: '오류 메시지', class: 'ds-file-upload__item-hint', krdsClass: 'file-hint-invalid', description: '파일 항목 하단 오류 문구', confirmed: true },
    { element: '개별 삭제 버튼', class: 'ds-file-upload__item-delete-btn', krdsClass: 'btn-file-delete', description: '', confirmed: true },
    { element: '전체 삭제 버튼', class: 'ds-file-upload__delete-all-btn', krdsClass: 'btn-delete-all', description: '목록 우상단 절대 위치. 래퍼 div 없이 button에 직접 적용', confirmed: true },
  ],

  modifiers: [
    { category: '테두리 변형', class: 'ds-file-upload--line', krdsClass: 'ds-file-upload line', description: 'ds-file-upload 블록에 적용', confirmed: true },
    { category: '드래그 중', class: 'ds-file-upload__dropzone--dragover', krdsClass: 'file-upload active', description: 'ds-file-upload__dropzone과 함께 사용', confirmed: true },
    { category: '오류 항목', class: 'ds-file-upload__item--error', krdsClass: 'ds-file-upload__item--error', description: 'ds-file-upload__item과 함께 사용', confirmed: true },
    { category: '완료 아이콘', class: 'ds-file-upload__item-icon--completed', krdsClass: 'ico-invalid complete', description: 'ds-file-upload__item-icon과 함께 사용', confirmed: true },
    { category: '오류 아이콘', class: 'ds-file-upload__item-icon--error', krdsClass: 'ico-invalid error', description: 'ds-file-upload__item-icon과 함께 사용', confirmed: true },
    { category: '모바일 세로 배치', class: 'ds-file-upload__item-info--column', krdsClass: 'file-info m-column', description: 'ds-file-upload__item-info와 함께 사용', confirmed: true },
  ],
};

// ─── 전체 목록 (components-naming.mdx 용) ──────────────────────────────────
// 새 컴포넌트를 추가하면 이 배열에도 추가한다.

export const allComponents = [
  buttonNaming,
  linkNaming,
  textInputNaming,
  selectNaming,
  checkboxNaming,
  radioNaming,
  tagNaming,
  dateInputNaming,
  fileUploadNaming,
];
