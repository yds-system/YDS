/**
 * KRDS 컴포넌트 네이밍 데이터
 *
 * 유일한 진실 공급원(source of truth).
 * - src/docs/components-naming.mdx (전체 정의서)
 * - 각 컴포넌트 .mdx 의 "네이밍" 섹션
 * 모두 이 파일의 데이터를 가져와 표시합니다.
 * 네이밍을 수정할 때는 이 파일만 고치면 양쪽에 반영됩니다.
 *
 * confirmed: true  → KRDS reference 코드에서 확인된 클래스명, 또는 자체 추가로 확정된 클래스명
 * confirmed: false → 아직 판단하지 않은 클래스명 ("확인 필요" 표시)
 *
 * class    → 디자인 시스템에서 실제로 사용하는 클래스명 (yds- 접두사)
 * krdsClass → KRDS reference 원본 클래스명 (krds- 접두사)
 */

// ─── 버튼 (Button) ─────────────────────────────────────────────────────────

export const buttonNaming = {
  name: '버튼',
  englishName: 'Button',
  sbPath: '컴포넌트/액션/버튼',
  baseClass: 'yds-btn',
  krdsClass: 'krds-btn',
  description: '사용자 액션을 트리거하는 버튼',

  /** 구조도: 들여쓰기 기반 텍스트 */
  structure: `button.yds-btn [yds-btn--종류] [yds-btn--크기]
├── [텍스트]
└── i.yds-icon.yds-ico-*          ← 아이콘 (선택)

아이콘 전용 버튼:
button.yds-btn.yds-btn--icon [yds-btn--크기] [yds-btn--border]
├── span.sr-only              ← 숨김 텍스트 (필수)
└── i.yds-icon.yds-ico-*`,

  /** 클래스명 표 */
  elements: [
    {
      element: '버튼',
      class: 'yds-btn',
      krdsClass: 'krds-btn',
      description: '버튼 루트 요소. 종류·크기·상태 modifier를 공백으로 이어 붙인다.',
      confirmed: true,
    },
    {
      element: '아이콘',
      class: 'yds-icon yds-ico-*',
      krdsClass: 'svg-icon ico-*',
      description: 'CSS mask-image 기반 SVG 아이콘. yds-ico-* 자리에 아이콘명 입력. (선택)',
      confirmed: true,
    },
    {
      element: '숨김 텍스트',
      class: 'sr-only',
      krdsClass: 'sr-only',
      description: '스크린 리더 전용 설명 텍스트. 아이콘 전용 버튼(.yds-btn--icon)에 반드시 포함.',
      confirmed: true,
    },
  ],

  /** 변형(modifier) 표 */
  modifiers: [
    // 종류
    { category: '종류', class: 'yds-btn--primary',   krdsClass: 'primary',   description: '가장 중요한 주요 액션 버튼', confirmed: true },
    { category: '종류', class: 'yds-btn--secondary', krdsClass: 'secondary', description: 'Primary와 함께 쓰는 보조 액션 버튼', confirmed: true },
    { category: '종류', class: 'yds-btn--tertiary',  krdsClass: 'tertiary',  description: '낮은 우선순위 액션 버튼 (취소·닫기 등)', confirmed: true },
    { category: '종류', class: 'yds-btn--text',      krdsClass: 'text',      description: '테두리 없이 텍스트만 표시하는 버튼', confirmed: true },
    { category: '종류', class: 'yds-btn--icon',      krdsClass: 'icon',      description: '텍스트 없이 아이콘만 표시하는 버튼 (sr-only 필수)', confirmed: true },
    // 크기
    { category: '크기', class: 'yds-btn--xsmall', krdsClass: 'xsmall', description: 'X-Small (가장 작은 크기)', confirmed: true },
    { category: '크기', class: 'yds-btn--small',  krdsClass: 'small',  description: 'Small', confirmed: true },
    { category: '크기', class: 'yds-btn--medium', krdsClass: 'medium', description: 'Medium', confirmed: true },
    { category: '크기', class: 'yds-btn--large',  krdsClass: 'large',  description: 'Large — 크기 클래스를 생략하면 이 크기가 기본 적용된다.', confirmed: true },
    { category: '크기', class: 'yds-btn--xlarge', krdsClass: 'xlarge', description: 'X-Large (가장 큰 크기)', confirmed: true },
    // 아이콘 전용 옵션
    { category: '아이콘 전용', class: 'yds-btn--border', krdsClass: 'border', description: '.yds-btn--icon 버튼에 원형 테두리를 추가한다.', confirmed: true },
    // 상태
    { category: '상태', class: 'yds-btn--disabled', krdsClass: 'disabled', description: '<button>은 HTML disabled 속성 사용. <a> 태그·text 버튼은 .yds-btn--disabled 클래스 + aria-disabled="true" + tabindex="-1" 사용.', confirmed: true },
  ],

  /** 코드 예시 */
  codeExample: `<!-- 기본 버튼 (위계) -->
<button type="button" class="yds-btn yds-btn--primary">Primary</button>
<button type="button" class="yds-btn yds-btn--secondary">Secondary</button>
<button type="button" class="yds-btn yds-btn--tertiary">Tertiary</button>

<!-- 크기 — 클래스 생략 시 large가 기본 적용 -->
<button type="button" class="yds-btn yds-btn--primary">크기 생략 → Large</button>
<button type="button" class="yds-btn yds-btn--primary yds-btn--xsmall">XSmall</button>
<button type="button" class="yds-btn yds-btn--primary yds-btn--small">Small</button>
<button type="button" class="yds-btn yds-btn--primary yds-btn--medium">Medium</button>
<button type="button" class="yds-btn yds-btn--primary yds-btn--large">Large</button>
<button type="button" class="yds-btn yds-btn--primary yds-btn--xlarge">XLarge</button>

<!-- 아이콘 포함 — 오른쪽 아이콘 -->
<button type="button" class="yds-btn yds-btn--primary yds-btn--small">
  검색 <i class="yds-icon yds-ico-sch" aria-hidden="true"></i>
</button>

<!-- 아이콘 포함 — 왼쪽 아이콘 -->
<button type="button" class="yds-btn yds-btn--primary yds-btn--small">
  <i class="yds-icon yds-ico-sch" aria-hidden="true"></i> 검색
</button>

<!-- 아이콘 전용 버튼 (sr-only 필수) -->
<button type="button" class="yds-btn yds-btn--icon yds-btn--medium">
  <span class="sr-only">검색</span>
  <i class="yds-icon yds-ico-sch" aria-hidden="true"></i>
</button>

<!-- 아이콘 전용 + 원형 테두리 -->
<button type="button" class="yds-btn yds-btn--icon yds-btn--large yds-btn--border">
  <span class="sr-only">새로고침</span>
  <i class="yds-icon yds-ico-refresh" aria-hidden="true"></i>
</button>

<!-- 텍스트 버튼 -->
<button type="button" class="yds-btn yds-btn--text yds-btn--medium">텍스트</button>

<!-- 버튼 외형 링크 — <a> 태그에 yds-btn 위계 modifier 적용 -->
<a href="https://example.com" class="yds-btn yds-btn--primary yds-btn--small">이동하기</a>
<a href="/path" class="yds-btn yds-btn--secondary yds-btn--medium">자세히 보기</a>
<!-- 텍스트 링크는 yds-link 컴포넌트를 사용한다 -->

<!-- 비활성화 -->
<!-- button: disabled 속성 사용 -->
<button type="button" class="yds-btn yds-btn--primary" disabled>비활성화</button>

<!-- a 태그 버튼 외형 링크: .yds-btn--disabled 클래스 + aria-disabled + tabindex -->
<a href="#" class="yds-btn yds-btn--secondary yds-btn--small yds-btn--disabled" aria-disabled="true" tabindex="-1">비활성 링크 버튼</a>`,
};

// ─── 링크 (Link) ───────────────────────────────────────────────────────────

export const linkNaming = {
  name: '링크',
  englishName: 'Link',
  sbPath: '컴포넌트/액션/링크',
  baseClass: 'yds-link',
  krdsClass: 'krds-btn link',
  description: '인라인 또는 독립형 텍스트 링크. 페이지 이동이 목적인 <a> 요소에 사용. 버튼(yds-btn)과 독립된 별도 블록',

  structure: `a.yds-link [yds-link--크기] [yds-link--basic] [yds-link--pure]
├── span.yds-link__text                            ← 밑줄 항상
│   또는
│   span.yds-link__text.yds-link__text--underline-hover  ← 밑줄 hover (같은 span에 클래스 2개)
│   (자식 span 없음 → 밑줄 없음)
└── i.yds-icon.yds-ico-*                            ← 아이콘 (선택)`,

  elements: [
    { element: '링크', class: 'yds-link', krdsClass: 'krds-btn link', description: '링크 텍스트 루트 (<a> 태그). 크기·색상·pure modifier를 공백으로 이어 붙인다. 기본 크기는 large.', confirmed: true },
    { element: '밑줄 텍스트', class: 'yds-link__text', krdsClass: 'underline', description: '텍스트에 밑줄 항상 표시', confirmed: true },
    { element: '아이콘', class: 'yds-icon yds-ico-*', krdsClass: 'svg-icon ico-*', description: 'CSS mask-image 기반 SVG 아이콘. 외부 링크 시 yds-ico-go 사용', confirmed: true },
  ],

  modifiers: [
    { category: '크기', class: 'yds-link--xsmall', krdsClass: 'xsmall', description: 'X-Small', confirmed: true },
    { category: '크기', class: 'yds-link--small',  krdsClass: 'small',  description: 'Small', confirmed: true },
    { category: '크기', class: 'yds-link--medium', krdsClass: 'medium', description: 'Medium', confirmed: true },
    { category: '크기', class: 'yds-link--large',  krdsClass: 'large',  description: 'Large — 크기 클래스를 생략하면 이 크기가 기본 적용된다.', confirmed: true },
    { category: '크기', class: 'yds-link--xlarge', krdsClass: 'xlarge', description: 'X-Large', confirmed: true },
    { category: '색상', class: 'yds-link--basic', krdsClass: 'basic', description: '본문 텍스트 색상(--krds-light-color-text-basic). 기본은 링크 색상', confirmed: true },
    { category: '색상', class: 'yds-link--pure',  krdsClass: 'pure',  description: '가상클래스 상태에서도 기본 색상 유지. yds-link--basic과 함께 쓸 수 있다.', confirmed: true },
    { category: '밑줄', class: 'yds-link__text--underline-hover', krdsClass: 'hidden-underline', description: '기본 투명 밑줄, 상호작용 시 표시. yds-link__text와 같은 span에 함께 사용', confirmed: true },
    { category: '상태', class: 'yds-link--disabled', krdsClass: 'disabled', description: '비활성화. <a> 태그는 disabled 속성이 없으므로 이 클래스 + aria-disabled="true" + tabindex="-1" 사용', confirmed: true },
  ],

  codeExample: `<!-- 기본 (밑줄 항상) -->
<a href="/path" class="yds-link">
  <span class="yds-link__text">링크 텍스트</span>
</a>

<!-- 새 창 + 아이콘 -->
<a href="https://example.com" class="yds-link" target="_blank" title="새 창 열림">
  <span class="yds-link__text">외부 링크</span>
  <i class="yds-icon yds-ico-go" aria-hidden="true"></i>
</a>

<!-- 본문 텍스트 색상 -->
<a href="/path" class="yds-link yds-link--basic">
  <span class="yds-link__text">본문 색상 링크</span>
</a>

<!-- 밑줄 hover — yds-link__text와 yds-link__text--underline-hover를 같은 span에 사용 -->
<a href="/path" class="yds-link">
  <span class="yds-link__text yds-link__text--underline-hover">hover 시 밑줄</span>
</a>

<!-- 밑줄 없음 -->
<a href="/path" class="yds-link">
  <span>밑줄 없음</span>
</a>

<!-- 순수 — 상호작용 시 색상 유지 -->
<a href="/path" class="yds-link yds-link--pure">
  <span class="yds-link__text">색상 고정 링크</span>
</a>

<!-- 크기 (medium) -->
<a href="/path" class="yds-link yds-link--medium">
  <span class="yds-link__text">Medium 링크</span>
</a>

<!-- 비활성화 -->
<a href="#" class="yds-link yds-link--disabled" aria-disabled="true" tabindex="-1">
  <span class="yds-link__text">비활성 링크</span>
</a>`,
};

// ─── 태그 (Tag) ─────────────────────────────────────────────────────────────

export const tagNaming = {
  name: '태그',
  englishName: 'Tag',
  sbPath: '컴포넌트/선택/태그',
  baseClass: 'yds-tag-group',
  krdsClass: 'krds-tag-wrap',
  description: '선택된 필터·키워드를 칩 형태로 표시하고 삭제할 수 있는 요소. 링크 태그(yds-tag--link) 포함',

  structure: `div.yds-tag-group  [yds-tag-group--크기]
└── span.yds-tag  또는  a.yds-tag.yds-tag--link
    ├── [텍스트]
    └── button.yds-tag__delete-btn        ← 삭제 버튼 (선택)
        └── span.sr-only`,

  elements: [
    { element: '태그 그룹', class: 'yds-tag-group', krdsClass: 'krds-tag-wrap', description: '태그 목록 컨테이너. 크기 modifier를 함께 사용한다.', confirmed: true },
    { element: '태그 항목', class: 'yds-tag', krdsClass: 'krds-btn-tag', description: '개별 태그. span(삭제 가능) 또는 a(링크) 태그에 적용', confirmed: true },
    { element: '삭제 버튼', class: 'yds-tag__delete-btn', krdsClass: 'btn-delete', description: '태그 내 삭제 버튼. sr-only로 텍스트 필수', confirmed: true },
    { element: '숨김 텍스트', class: 'sr-only', krdsClass: 'sr-only', description: '삭제 버튼의 스크린 리더 전용 텍스트', confirmed: true },
  ],

  modifiers: [
    { category: '크기', class: 'yds-tag-group--small',  krdsClass: 'small',  description: 'Small 크기 태그 그룹', confirmed: true },
    { category: '크기', class: 'yds-tag-group--medium', krdsClass: 'medium', description: 'Medium 크기 태그 그룹 (기본)', confirmed: true },
    { category: '크기', class: 'yds-tag-group--large',  krdsClass: 'large',  description: 'Large 크기 태그 그룹', confirmed: true },
    { category: '링크', class: 'yds-tag--link', krdsClass: 'link', description: '링크 스타일 태그. hover·active 시 밑줄. yds-tag와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 삭제 가능한 태그 -->
<div class="yds-tag-group yds-tag-group--medium">
  <span class="yds-tag">
    공지사항
    <button type="button" class="yds-tag__delete-btn">
      <span class="sr-only">공지사항 삭제</span>
    </button>
  </span>
  <span class="yds-tag">
    이벤트
    <button type="button" class="yds-tag__delete-btn">
      <span class="sr-only">이벤트 삭제</span>
    </button>
  </span>
</div>

<!-- 링크 태그 -->
<div class="yds-tag-group yds-tag-group--medium">
  <a href="#" class="yds-tag yds-tag--link">디자인 시스템</a>
  <a href="#" class="yds-tag yds-tag--link">접근성</a>
  <a href="#" class="yds-tag yds-tag--link">KRDS</a>
</div>`,
};

// ─── 글자 수 (Character Count) — 공통 블록 ─────────────────────────────────
// input·textarea 양쪽에서 재사용하는 공통 블록.
// naming-data.js 컴포넌트 항목이지만 allComponents에는 포함하지 않는다.

export const countNaming = {
  name: '글자 수',
  englishName: 'Character Count',
  description: 'input·textarea에 공통으로 사용하는 글자 수 표시 블록',
  baseClass: 'yds-count',
  krdsClass: 'textarea-count',

  elements: [
    { element: '글자 수', class: 'yds-count', krdsClass: 'textarea-count', description: '글자 수 표시 컨테이너 (input·textarea 공통)', confirmed: true },
    { element: '현재 글자 수', class: 'yds-count__current', krdsClass: 'count-now', description: '현재 입력된 글자 수 (primary 컬러). 에러 상태에서 danger 컬러로 전환됨', confirmed: true },
    { element: '최대 글자 수', class: 'yds-count__max', krdsClass: 'count-total', description: '최대 글자 수 표시', confirmed: true },
  ],

  modifiers: [],
};

// ─── 텍스트 입력 (Text Input) ───────────────────────────────────────────────

export const textInputNaming = {
  name: '텍스트 입력',
  englishName: 'Text Input',
  sbPath: '컴포넌트/입력/텍스트 입력',
  baseClass: 'yds-input',
  krdsClass: 'krds-input',
  description: '사용자가 텍스트를 직접 입력하는 폼 요소',

  structure: `div.yds-form-group
├── div.yds-form-label
│   └── label[for]  (+ span.yds-form-label__required  ← 필수 시)
├── div.yds-form-content  [yds-form-content--error|--success|--info]
│   └── input.yds-input  [yds-input--small|--medium]  [disabled] [readonly]
└── p.yds-form-hint  [yds-form-hint--error|--success|--info]

아이콘 버튼 포함 (password / search):
div.yds-form-content.yds-form-content--with-btn  [data-delete="true"]
├── input.yds-input
└── div.yds-form-content__actions
    ├── button.yds-btn.yds-input__clear-btn ← 입력값 지우기 버튼
    └── button.yds-btn                   ← 보기/검색 버튼

글자 수 표시:
div.yds-form-content
├── input.yds-input  [maxlength]
└── p.yds-count
    ├── span.yds-count__current
    └── span.yds-count__max`,

  elements: [
    { element: '폼 그룹', class: 'yds-form-group', krdsClass: 'form-group', description: '레이블·입력·메시지를 묶는 최상위 컨테이너', confirmed: true },
    { element: '레이블 영역', class: 'yds-form-label', krdsClass: 'form-tit', description: '레이블을 감싸는 영역', confirmed: true },
    { element: '필수 표시', class: 'yds-form-label__required', krdsClass: '(자체 추가)', description: '필수 입력 표시 (레이블 내 span). KRDS에 대응 클래스 없음', confirmed: true },
    { element: '입력 영역', class: 'yds-form-content', krdsClass: 'form-conts', description: '입력창을 감싸는 영역. 상태 modifier를 이 요소에 적용한다', confirmed: true },
    { element: '입력창', class: 'yds-input', krdsClass: 'krds-input', description: '텍스트 입력창 (input 또는 textarea에 적용)', confirmed: true },
    { element: '도움말', class: 'yds-form-hint', krdsClass: 'form-hint', description: '입력 안내·에러·성공 메시지 (p 태그)', confirmed: true },
    { element: '버튼 포함 영역', class: 'yds-form-content--with-btn', krdsClass: 'btn-ico-wrap', description: 'yds-form-content에 추가하는 modifier. 아이콘 버튼을 포함하는 입력창에 사용', confirmed: true },
    { element: '버튼 묶음', class: 'yds-form-content__actions', krdsClass: 'btn-group', description: '삭제·보기 등 버튼을 묶는 컨테이너', confirmed: true },
    { element: '입력값 지우기 버튼', class: 'yds-input__clear-btn', krdsClass: 'btn-delete-input', description: '입력 내용 삭제 버튼. data-delete="true" 시 CSS로 자동 표시', confirmed: true },
    // yds-count 3종은 공통 블록으로 분리 → countNaming 참고
  ],

  modifiers: [
    { category: '크기', class: 'yds-input--small',  krdsClass: 'krds-input small',  description: 'Small 크기', confirmed: true },
    { category: '크기', class: 'yds-input--medium', krdsClass: 'krds-input medium', description: 'Medium 크기', confirmed: true },
    { category: '크기', class: 'yds-input--large',  krdsClass: 'krds-input large',  description: 'Large — 크기 클래스를 생략하면 이 크기가 기본 적용된다', confirmed: true },
    { category: '크기 (Storybook 전용)', class: 'yds-input--focus', krdsClass: 'focus', description: 'Storybook 데모 전용. 실제 포커스 스타일은 CSS :focus 가상 클래스로 처리한다', confirmed: true },
    { category: '상태 (부모)', class: 'yds-form-content--error', krdsClass: 'is-error', description: '에러 상태. yds-form-content에 적용', confirmed: true },
    { category: '상태 (부모)', class: 'yds-form-content--success', krdsClass: 'is-success', description: '성공 상태. yds-form-content에 적용', confirmed: true },
    { category: '상태 (부모)', class: 'yds-form-content--info', krdsClass: 'is-information', description: '정보 상태. yds-form-content에 적용', confirmed: true },
    { category: '힌트 메시지', class: 'yds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. yds-form-hint와 함께 사용', confirmed: true },
    { category: '힌트 메시지', class: 'yds-form-hint--success', krdsClass: 'form-hint-success', description: '성공 메시지. yds-form-hint와 함께 사용', confirmed: true },
    { category: '힌트 메시지', class: 'yds-form-hint--info', krdsClass: 'form-hint-information', description: '정보 메시지. yds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 기본 -->
<div class="yds-form-group">
  <div class="yds-form-label">
    <label for="name">이름</label>
  </div>
  <div class="yds-form-content">
    <input type="text" id="name" class="yds-input" placeholder="이름을 입력하세요">
  </div>
  <p class="yds-form-hint">실명으로 입력해 주세요.</p>
</div>

<!-- 필수 + 에러 -->
<div class="yds-form-group">
  <div class="yds-form-label">
    <label for="email">이메일 <span class="yds-form-label__required" aria-hidden="true">필수</span></label>
  </div>
  <div class="yds-form-content yds-form-content--error">
    <input type="text" id="email" class="yds-input" placeholder="이메일을 입력하세요">
  </div>
  <p class="yds-form-hint yds-form-hint--error">올바른 이메일 형식으로 입력해 주세요.</p>
</div>`,
};

// ─── 텍스트 영역 (Textarea) ─────────────────────────────────────────────────

export const textareaNaming = {
  name: '텍스트 영역',
  englishName: 'Textarea',
  sbPath: '컴포넌트/입력/텍스트 영역',
  baseClass: 'yds-textarea',
  krdsClass: 'krds-textarea',
  description: '여러 줄 텍스트를 입력하는 폼 요소. 글자 수 표시(yds-count)와 함께 사용한다',

  structure: `div.yds-form-group
├── div.yds-form-label
│   └── label[for]  (+ span.yds-form-label__required  ← 필수 시)
├── div.yds-form-content  [yds-form-content--error]
│   └── div.yds-textarea
│       ├── textarea.yds-input  [maxlength]  [disabled] [readonly]
│       └── p.yds-count                              ← 글자 수 (선택)
│           ├── span.yds-count__current
│           └── span.yds-count__max
│           또는
│       div.yds-textarea__bottom                    ← 에러 + 글자 수 나란히
│           ├── p.yds-form-hint.yds-form-hint--error
│           └── p.yds-count
└── p.yds-form-hint  [yds-form-hint--error]`,

  elements: [
    { element: '폼 그룹', class: 'yds-form-group', krdsClass: 'form-group', description: '레이블·입력·메시지를 묶는 최상위 컨테이너', confirmed: true },
    { element: '레이블 영역', class: 'yds-form-label', krdsClass: 'form-tit', description: '레이블을 감싸는 영역', confirmed: true },
    { element: '필수 표시', class: 'yds-form-label__required', krdsClass: '(자체 추가)', description: '필수 입력 표시 (레이블 내 span). KRDS에 대응 클래스 없음', confirmed: true },
    { element: '입력 영역', class: 'yds-form-content', krdsClass: 'form-conts', description: '입력창을 감싸는 영역. 상태 modifier는 이 요소에 적용한다', confirmed: true },
    { element: 'Textarea 블록', class: 'yds-textarea', krdsClass: 'textarea-wrap', description: 'textarea + 글자 수를 묶는 블록', confirmed: true },
    { element: '텍스트 입력창', class: 'yds-input', krdsClass: 'krds-input', description: 'textarea 요소에 적용하는 입력창 클래스', confirmed: true },
    { element: 'Textarea 하단', class: 'yds-textarea__bottom', krdsClass: 'textarea-bottom', description: '에러 메시지와 글자 수를 가로로 배치하는 컨테이너', confirmed: true },
    { element: '글자 수', class: 'yds-count', krdsClass: 'textarea-count', description: '글자 수 표시 컨테이너 (input·textarea 공통 블록)', confirmed: true },
    { element: '현재 글자 수', class: 'yds-count__current', krdsClass: 'count-now', description: '현재 입력된 글자 수 (에러 상태에서 danger 컬러로 전환)', confirmed: true },
    { element: '최대 글자 수', class: 'yds-count__max', krdsClass: 'count-total', description: '최대 글자 수 표시', confirmed: true },
    { element: '도움말', class: 'yds-form-hint', krdsClass: 'form-hint', description: '입력 안내·에러 메시지 (p 태그)', confirmed: true },
  ],

  modifiers: [
    { category: '상태 (부모)', class: 'yds-form-content--error', krdsClass: 'is-error', description: '에러 상태. yds-form-content에 적용', confirmed: true },
    { category: '힌트 메시지', class: 'yds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. yds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 기본 Textarea -->
<div class="yds-form-group">
  <div class="yds-form-label">
    <label for="desc">내용</label>
  </div>
  <div class="yds-form-content">
    <div class="yds-textarea">
      <textarea id="desc" class="yds-input" placeholder="내용을 입력하세요"></textarea>
    </div>
  </div>
</div>

<!-- 글자 수 표시 -->
<div class="yds-form-group">
  <div class="yds-form-label">
    <label for="desc2">내용</label>
  </div>
  <div class="yds-form-content">
    <div class="yds-textarea">
      <textarea id="desc2" class="yds-input" maxlength="200"
        oninput="this.closest('.yds-textarea').querySelector('.yds-count__current').textContent=this.value.length">
      </textarea>
      <p class="yds-count">
        <span class="yds-count__current" aria-live="polite">0</span>
        <span class="yds-count__max">/ 200</span>
      </p>
    </div>
  </div>
</div>

<!-- 에러 + 글자 수 나란히 -->
<div class="yds-form-group">
  <div class="yds-form-label">
    <label for="desc3">내용</label>
  </div>
  <div class="yds-form-content yds-form-content--error">
    <div class="yds-textarea">
      <textarea id="desc3" class="yds-input" maxlength="200"></textarea>
      <div class="yds-textarea__bottom">
        <p class="yds-form-hint yds-form-hint--error">내용을 입력해 주세요.</p>
        <p class="yds-count">
          <span class="yds-count__current" aria-live="polite">0</span>
          <span class="yds-count__max">/ 200</span>
        </p>
      </div>
    </div>
  </div>
</div>`,
};

// ─── 선택 상자 (Select) ─────────────────────────────────────────────────────

export const selectNaming = {
  name: '선택 상자',
  englishName: 'Select',
  sbPath: '컴포넌트/선택/선택 상자',
  baseClass: 'yds-select',
  krdsClass: 'krds-form-select',
  description: '미리 정의된 선택지 중 하나를 드롭다운으로 선택하는 폼 요소',

  structure: `div.yds-form-group
├── div.yds-form-label
│   └── label[for]  (+ span.yds-form-label__required  ← 필수 시)
├── div.yds-form-content
│   └── select.yds-select  [yds-select--small|--medium]  [yds-select--error]  [disabled]
│       ├── option[value=""]  ← placeholder (빈 값)
│       └── option[value]
└── p.yds-form-hint  [yds-form-hint--error]`,

  elements: [
    { element: '폼 그룹', class: 'yds-form-group', krdsClass: 'form-group', description: '레이블·입력·메시지를 묶는 최상위 컨테이너', confirmed: true },
    { element: '레이블 영역', class: 'yds-form-label', krdsClass: 'form-tit', description: '레이블을 감싸는 영역', confirmed: true },
    { element: '필수 표시', class: 'yds-form-label__required', krdsClass: '(자체 추가)', description: '필수 입력 표시 (레이블 내 span). KRDS에 대응 클래스 없음', confirmed: true },
    { element: '입력 영역', class: 'yds-form-content', krdsClass: 'form-conts', description: '셀렉트 영역을 감싸는 컨테이너', confirmed: true },
    { element: '셀렉트', class: 'yds-select', krdsClass: 'krds-form-select', description: 'select 태그에 적용하는 기본 클래스 (기본 large 크기)', confirmed: true },
    { element: '도움말', class: 'yds-form-hint', krdsClass: 'form-hint', description: '입력 안내·에러 메시지 (p 태그)', confirmed: true },
  ],

  modifiers: [
    { category: '크기', class: 'yds-select--small',  krdsClass: 'krds-form-select small',  description: 'Small 크기', confirmed: true },
    { category: '크기', class: 'yds-select--medium', krdsClass: 'krds-form-select medium', description: 'Medium 크기', confirmed: true },
    { category: '크기', class: 'yds-select--large',  krdsClass: 'krds-form-select large',  description: 'Large — 크기 클래스를 생략하면 이 크기가 기본 적용된다', confirmed: true },
    { category: '상태', class: 'yds-select--completed', krdsClass: 'krds-form-select completed', description: '값이 선택된 상태. JS로 onchange 시 토글한다', confirmed: true },
    { category: '상태', class: 'yds-select--error', krdsClass: 'krds-form-select is-error', description: '에러 상태. select 요소에 직접 적용', confirmed: true },
    { category: '힌트 메시지', class: 'yds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. yds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 기본 -->
<div class="yds-form-group">
  <div class="yds-form-label">
    <label for="sel-1">지역</label>
  </div>
  <div class="yds-form-content">
    <select id="sel-1" class="yds-select" title="선택하세요"
      onchange="this.classList.toggle('yds-select--completed', !!this.value)">
      <option value="">선택하세요</option>
      <option value="1">서울</option>
      <option value="2">경기</option>
    </select>
  </div>
  <p class="yds-form-hint">거주 지역을 선택하세요.</p>
</div>

<!-- 에러 -->
<div class="yds-form-group">
  <div class="yds-form-label">
    <label for="sel-2">지역 <span class="yds-form-label__required" aria-hidden="true">필수</span></label>
  </div>
  <div class="yds-form-content">
    <select id="sel-2" class="yds-select yds-select--error" title="선택하세요">
      <option value="">선택하세요</option>
    </select>
  </div>
  <p class="yds-form-hint yds-form-hint--error">항목을 선택해 주세요.</p>
</div>

<!-- 크기 -->
<select class="yds-select yds-select--small" title="선택하세요">...</select>
<select class="yds-select yds-select--medium" title="선택하세요">...</select>
<select class="yds-select" title="선택하세요">...</select>`,
};

// ─── 체크박스 (Checkbox) ────────────────────────────────────────────────────

export const checkboxNaming = {
  name: '체크박스',
  englishName: 'Checkbox',
  sbPath: '컴포넌트/선택/체크박스',
  baseClass: 'yds-check-item',
  krdsClass: 'krds-form-check',
  description: '여러 항목 중 하나 이상을 선택하는 폼 요소',

  structure: `fieldset.yds-form-group
├── legend.yds-form-label
│   └── span  (+ span.yds-form-label__required  ← 필수 시)
├── div.yds-form-content  [yds-form-content--error]
│   └── div.yds-check-group  [yds-check-group--column]
│       └── div.yds-check-item  [yds-check-item--medium|--large]
│           ├── input[type=checkbox]  [checked] [disabled]
│           ├── label[for]
│           └── div.yds-check-item__desc   ← 부가 설명 (선택)
│               └── p.yds-check-item__text
└── p.yds-form-hint  [yds-form-hint--error]`,

  elements: [
    { element: '폼 그룹 (fieldset)', class: 'yds-form-group', krdsClass: 'form-group', description: '그룹 최상위 컨테이너. 체크박스 그룹은 접근성을 위해 fieldset 태그에 사용', confirmed: true },
    { element: '그룹 레이블 (legend)', class: 'yds-form-label', krdsClass: 'form-tit', description: 'legend 태그에 적용. float 트릭으로 레이아웃 유지', confirmed: true },
    { element: '필수 표시', class: 'yds-form-label__required', krdsClass: '(자체 추가)', description: '필수 입력 표시 (legend 내 span). KRDS에 대응 클래스 없음', confirmed: true },
    { element: '입력 영역', class: 'yds-form-content', krdsClass: 'form-conts', description: '체크박스 그룹을 감싸는 컨테이너', confirmed: true },
    { element: '체크 그룹', class: 'yds-check-group', krdsClass: 'krds-check-area', description: '체크박스 항목을 나열하는 컨테이너 (기본: 가로 배치)', confirmed: true },
    { element: '체크 아이템', class: 'yds-check-item', krdsClass: 'krds-form-check', description: '개별 체크박스 래퍼', confirmed: true },
    { element: '부가 설명 컨테이너', class: 'yds-check-item__desc', krdsClass: 'krds-form-check-cnt', description: '체크박스 아래 부가 설명 영역', confirmed: true },
    { element: '부가 설명 텍스트', class: 'yds-check-item__text', krdsClass: 'krds-form-check-p', description: '부가 설명 텍스트 (p 태그)', confirmed: true },
    { element: '도움말', class: 'yds-form-hint', krdsClass: 'form-hint', description: '그룹 하단 도움말·에러 메시지', confirmed: true },
  ],

  modifiers: [
    { category: '배치', class: 'yds-check-group--column', krdsClass: 'krds-check-area chk-column', description: '세로 배치. yds-check-group에 적용', confirmed: true },
    { category: '크기', class: 'yds-check-item--medium', krdsClass: 'krds-form-check medium', description: 'Medium 크기 (기본값)', confirmed: true },
    { category: '크기', class: 'yds-check-item--large',  krdsClass: 'krds-form-check large',  description: 'Large 크기', confirmed: true },
    { category: '상태 (부모)', class: 'yds-form-content--error', krdsClass: 'is-error', description: '에러 상태. yds-form-content에 적용 → 내부 체크박스 테두리 색상 변경', confirmed: true },
    { category: '힌트 메시지', class: 'yds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. yds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 세로 배치 그룹 -->
<fieldset class="yds-form-group">
  <legend class="yds-form-label">
    <span>관심사 <span class="yds-form-label__required" aria-hidden="true">필수</span></span>
  </legend>
  <div class="yds-form-content">
    <div class="yds-check-group yds-check-group--column">
      <div class="yds-check-item yds-check-item--medium">
        <input type="checkbox" id="chk-1" checked>
        <label for="chk-1">뉴스</label>
      </div>
      <div class="yds-check-item yds-check-item--medium">
        <input type="checkbox" id="chk-2">
        <label for="chk-2">스포츠</label>
        <div class="yds-check-item__desc">
          <p class="yds-check-item__text">스포츠 관련 콘텐츠를 받아봅니다.</p>
        </div>
      </div>
    </div>
  </div>
</fieldset>

<!-- 에러 상태 -->
<fieldset class="yds-form-group">
  <legend class="yds-form-label"><span>동의 항목</span></legend>
  <div class="yds-form-content yds-form-content--error">
    <div class="yds-check-group yds-check-group--column">
      <div class="yds-check-item yds-check-item--medium">
        <input type="checkbox" id="chk-err">
        <label for="chk-err">서비스 이용약관 동의</label>
      </div>
    </div>
  </div>
  <p class="yds-form-hint yds-form-hint--error">하나 이상 선택해 주세요.</p>
</fieldset>`,
};

// ─── 라디오 버튼 (Radio Button) ─────────────────────────────────────────────

export const radioNaming = {
  name: '라디오 버튼',
  englishName: 'Radio Button',
  sbPath: '컴포넌트/선택/라디오 버튼',
  baseClass: 'yds-check-item',
  krdsClass: 'krds-form-check',
  description: '여러 항목 중 반드시 하나만 선택하는 폼 요소. 체크박스와 CSS를 공유한다',

  structure: `fieldset.yds-form-group
├── legend.yds-form-label
│   └── span  (+ span.yds-form-label__required  ← 필수 시)
├── div.yds-form-content  [yds-form-content--error]
│   └── div.yds-check-group  [yds-check-group--column]
│       └── div.yds-check-item  [yds-check-item--medium|--large]
│           ├── input[type=radio] [name=그룹명]  [checked] [disabled]
│           ├── label[for]
│           └── div.yds-check-item__desc   ← 부가 설명 (선택)
│               └── p.yds-check-item__text
└── p.yds-form-hint  [yds-form-hint--error]`,

  elements: [
    { element: '폼 그룹 (fieldset)', class: 'yds-form-group', krdsClass: 'form-group', description: '그룹 최상위 컨테이너. 라디오 그룹은 접근성을 위해 fieldset 태그에 사용', confirmed: true },
    { element: '그룹 레이블 (legend)', class: 'yds-form-label', krdsClass: 'form-tit', description: 'legend 태그에 적용', confirmed: true },
    { element: '필수 표시', class: 'yds-form-label__required', krdsClass: '(자체 추가)', description: '필수 입력 표시 (legend 내 span). KRDS에 대응 클래스 없음', confirmed: true },
    { element: '입력 영역', class: 'yds-form-content', krdsClass: 'form-conts', description: '라디오 그룹을 감싸는 컨테이너', confirmed: true },
    { element: '체크 그룹', class: 'yds-check-group', krdsClass: 'krds-check-area', description: '라디오 항목을 나열하는 컨테이너 (기본: 가로 배치)', confirmed: true },
    { element: '체크 아이템', class: 'yds-check-item', krdsClass: 'krds-form-check', description: '개별 라디오 버튼 래퍼', confirmed: true },
    { element: '부가 설명 컨테이너', class: 'yds-check-item__desc', krdsClass: 'krds-form-check-cnt', description: '라디오 버튼 아래 부가 설명 영역', confirmed: true },
    { element: '부가 설명 텍스트', class: 'yds-check-item__text', krdsClass: 'krds-form-check-p', description: '부가 설명 텍스트 (p 태그)', confirmed: true },
    { element: '도움말', class: 'yds-form-hint', krdsClass: 'form-hint', description: '그룹 하단 도움말·에러 메시지', confirmed: true },
  ],

  modifiers: [
    { category: '배치', class: 'yds-check-group--column', krdsClass: 'krds-check-area chk-column', description: '세로 배치. yds-check-group에 적용', confirmed: true },
    { category: '크기', class: 'yds-check-item--medium', krdsClass: 'krds-form-check medium', description: 'Medium 크기 (기본값)', confirmed: true },
    { category: '크기', class: 'yds-check-item--large',  krdsClass: 'krds-form-check large',  description: 'Large 크기', confirmed: true },
    { category: '상태 (부모)', class: 'yds-form-content--error', krdsClass: 'is-error', description: '에러 상태. yds-form-content에 적용 → 내부 라디오 테두리 색상 변경', confirmed: true },
    { category: '힌트 메시지', class: 'yds-form-hint--error', krdsClass: 'form-hint-invalid', description: '에러 메시지. yds-form-hint와 함께 사용', confirmed: true },
  ],

  codeExample: `<!-- 세로 배치 + 부가 설명 -->
<fieldset class="yds-form-group">
  <legend class="yds-form-label"><span>배송 방법</span></legend>
  <div class="yds-form-content">
    <div class="yds-check-group yds-check-group--column">
      <div class="yds-check-item yds-check-item--medium">
        <input type="radio" id="rdo-1" name="shipping" checked>
        <label for="rdo-1">일반 배송</label>
        <div class="yds-check-item__desc">
          <p class="yds-check-item__text">무료 · 2~3일 소요</p>
        </div>
      </div>
      <div class="yds-check-item yds-check-item--medium">
        <input type="radio" id="rdo-2" name="shipping">
        <label for="rdo-2">빠른 배송</label>
        <div class="yds-check-item__desc">
          <p class="yds-check-item__text">3,000원 · 익일 도착</p>
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
  baseClass: 'yds-date-input',
  krdsClass: 'calendar-conts',
  description: '달력 팝업을 통해 날짜 또는 기간을 선택하는 입력 필드',

  elements: [
    { element: '컨테이너', class: 'yds-date-input', krdsClass: 'calendar-conts', description: 'yds-form-content에 병기하는 블록 클래스. gap: 0 적용', confirmed: true },
    { element: '입력 래퍼', class: 'yds-date-input__input-wrap', krdsClass: 'calendar-input', description: 'input + 달력 열기 버튼을 묶는 래퍼', confirmed: true },
    { element: '달력 열기 버튼', class: 'yds-date-input__open-btn', krdsClass: 'form-btn-datepicker', description: '입력창 우측 달력 아이콘 버튼', confirmed: true },
    { element: '기간 입력 목록', class: 'yds-date-input__range-list', krdsClass: 'input-group range set', description: '기간 선택 시 시작·종료 input을 담는 ul', confirmed: true },
    { element: '기간 입력 항목', class: 'yds-date-input__range-item', krdsClass: '(없음)', description: '기간 선택 시 시작·종료 input을 담는 li. :not() 선택 대신 직접 클래스로 지정', confirmed: true },
    { element: '구분자', class: 'yds-date-input__separator', krdsClass: 'mark', description: '기간 선택 시 – 구분 li', confirmed: true },
    { element: '날짜 input', class: 'yds-date-input__input', krdsClass: 'datepicker', description: '날짜 표시용 읽기 전용 input (JS 훅 클래스)', confirmed: true },
  ],

  modifiers: [
    { category: '단일 날짜 input', class: 'yds-date-input__input--single', krdsClass: 'cal', description: '단일 날짜 모드 input 식별자. yds-date-input__input과 함께 사용', confirmed: true },
  ],
};

// ─── 달력 팝업 (Calendar) — yds-date-input의 하위 블록 ────────────────────────
// allComponents에 포함하지 않음 (date-input 전용 서브 블록)

export const calendarNaming = {
  name: '달력',
  englishName: 'Calendar',
  description: '날짜 입력 컴포넌트의 달력 팝업 블록',
  baseClass: 'yds-calendar',
  krdsClass: 'yds-calendar-area',

  elements: [
    { element: '팝업 패널', class: 'yds-calendar__panel', krdsClass: 'calendar-wrap', description: '달력 팝업 컨테이너', confirmed: true },
    { element: '헤더', class: 'yds-calendar__head', krdsClass: 'calendar-head', description: '', confirmed: true },
    { element: '이전/다음 달 버튼', class: 'yds-calendar__move-btn', krdsClass: 'btn-cal-move', description: '방향 modifier(--prev/--next)와 함께 사용', confirmed: true },
    { element: '연월 스위치 그룹', class: 'yds-calendar__switch-group', krdsClass: 'calendar-switch-wrap', description: '', confirmed: true },
    { element: '드롭다운 컨테이너', class: 'yds-calendar__dropdown', krdsClass: 'calendar-drop-down', description: '', confirmed: true },
    { element: '연/월 스위치 버튼', class: 'yds-calendar__switch-btn', krdsClass: 'btn-cal-switch', description: '', confirmed: true },
    { element: '드롭다운 패널', class: 'yds-calendar__dropdown-panel', krdsClass: 'calendar-select', description: '연도 패널은 --year, 월 패널은 --month modifier 추가', confirmed: true },
    { element: '드롭다운 목록', class: 'yds-calendar__dropdown-list', krdsClass: 'sel', description: '', confirmed: true },
    { element: '드롭다운 항목', class: 'yds-calendar__dropdown-item', krdsClass: '(없음)', description: '연/월 선택 버튼 (기존 클래스 없음 → 새로 추가)', confirmed: true },
    { element: '달력 본문', class: 'yds-calendar__body', krdsClass: 'calendar-body', description: '', confirmed: true },
    { element: '테이블 래퍼', class: 'yds-calendar__table-wrap', krdsClass: 'calendar-table-wrap', description: '', confirmed: true },
    { element: '날짜 테이블', class: 'yds-calendar__table', krdsClass: 'calendar-tbl', description: '', confirmed: true },
    { element: '날짜 셀', class: 'yds-calendar__cell', krdsClass: '(td 직접)', description: '날짜 테이블의 모든 td에 기본 클래스로 적용', confirmed: true },
    { element: '날짜 버튼', class: 'yds-calendar__date-btn', krdsClass: 'btn-set-date', description: '', confirmed: true },
    { element: '푸터', class: 'yds-calendar__footer', krdsClass: 'calendar-footer', description: '', confirmed: true },
    { element: '액션 버튼 행', class: 'yds-calendar__actions', krdsClass: 'calendar-btn-wrap', description: '', confirmed: true },
    { element: '오늘 버튼', class: 'yds-calendar__today-btn', krdsClass: 'btn-today', description: '', confirmed: true },
    { element: '취소 버튼', class: 'yds-calendar__cancel-btn', krdsClass: 'btn-cancel', description: '', confirmed: true },
    { element: '확인 버튼', class: 'yds-calendar__confirm-btn', krdsClass: 'btn-confirm', description: '', confirmed: true },
  ],

  modifiers: [
    { category: '팝업 열림', class: 'yds-calendar--open', krdsClass: 'yds-calendar-area active', description: 'yds-calendar 블록에 적용', confirmed: true },
    { category: '하단 배치', class: 'yds-calendar__panel--bottom', krdsClass: 'calendar-wrap bottom', description: '', confirmed: true },
    { category: '단일 날짜 모드', class: 'yds-calendar__panel--single', krdsClass: 'calendar-wrap single', description: '기간 밴드(::after) 비표시', confirmed: true },
    { category: '이전 달 버튼', class: 'yds-calendar__move-btn--prev', krdsClass: 'btn-cal-move prev', description: 'yds-calendar__move-btn과 함께 사용', confirmed: true },
    { category: '다음 달 버튼', class: 'yds-calendar__move-btn--next', krdsClass: 'btn-cal-move next', description: 'yds-calendar__move-btn과 함께 사용', confirmed: true },
    { category: '스위치 버튼 열림', class: 'yds-calendar__switch-btn--open', krdsClass: 'btn-cal-switch active', description: 'yds-calendar__switch-btn과 함께 사용', confirmed: true },
    { category: '드롭다운 열림', class: 'yds-calendar__dropdown-panel--open', krdsClass: 'calendar-select active', description: 'yds-calendar__dropdown-panel과 함께 사용', confirmed: true },
    { category: '연도 패널', class: 'yds-calendar__dropdown-panel--year', krdsClass: 'calendar-year-wrap', description: 'yds-calendar__dropdown-panel과 함께 사용', confirmed: true },
    { category: '월 패널', class: 'yds-calendar__dropdown-panel--month', krdsClass: 'calendar-mon-wrap', description: 'yds-calendar__dropdown-panel과 함께 사용', confirmed: true },
    { category: '선택된 연/월 항목', class: 'yds-calendar__dropdown-item--current', krdsClass: 'button.active', description: 'yds-calendar__dropdown-item과 함께 사용', confirmed: true },
    { category: '이전 달 날짜', class: 'yds-calendar__cell--prev', krdsClass: 'old', description: 'yds-calendar__cell과 함께 사용', confirmed: true },
    { category: '다음 달 날짜', class: 'yds-calendar__cell--next', krdsClass: 'new', description: 'yds-calendar__cell과 함께 사용', confirmed: true },
    { category: '비활성 날짜', class: 'yds-calendar__cell--disabled', krdsClass: 'disabled', description: 'yds-calendar__cell과 함께 사용', confirmed: true },
    { category: '오늘', class: 'yds-calendar__cell--today', krdsClass: 'today', description: 'yds-calendar__cell과 함께 사용', confirmed: true },
    { category: '휴일/일요일', class: 'yds-calendar__cell--holiday', krdsClass: 'day-off', description: 'yds-calendar__cell과 함께 사용', confirmed: true },
    { category: '선택 기간', class: 'yds-calendar__cell--period', krdsClass: 'period', description: 'yds-calendar__cell과 함께 사용', confirmed: true },
    { category: '기간 시작일', class: 'yds-calendar__cell--start', krdsClass: 'start', description: 'yds-calendar__cell과 함께 사용', confirmed: true },
    { category: '기간 종료일', class: 'yds-calendar__cell--end', krdsClass: 'end', description: 'yds-calendar__cell과 함께 사용', confirmed: true },
  ],
};

// ─── 파일 업로드 (File Upload) ──────────────────────────────────────────────

export const fileUploadNaming = {
  name: '파일 업로드',
  englishName: 'File Upload',
  sbPath: '컴포넌트/입력/파일 업로드',
  baseClass: 'yds-file-upload',
  krdsClass: 'yds-file-upload',
  description: '드래그 앤 드롭 또는 파일 선택으로 첨부 파일을 올리는 컴포넌트',

  elements: [
    { element: '파일 업로드', class: 'yds-file-upload', krdsClass: 'yds-file-upload', description: '최상위 컨테이너', confirmed: true },
    { element: '헤드', class: 'yds-file-upload__head', krdsClass: 'file-head', description: '제목·설명 영역 (선택)', confirmed: true },
    { element: '제목', class: 'yds-file-upload__title', krdsClass: 'tit', description: '', confirmed: true },
    { element: '드롭존', class: 'yds-file-upload__dropzone', krdsClass: 'file-upload', description: '드래그 앤 드롭 영역', confirmed: true },
    { element: '설명 문구', class: 'yds-file-upload__desc', krdsClass: 'txt', description: '', confirmed: true },
    { element: '버튼 래퍼', class: 'yds-file-upload__btn-wrap', krdsClass: 'file-upload-btn-wrap', description: '파일 선택 버튼·input 묶음', confirmed: true },
    { element: '파일 목록 영역', class: 'yds-file-upload__files', krdsClass: 'file-list', description: '목록 바깥 컨테이너', confirmed: true },
    { element: '파일 수 표시', class: 'yds-file-upload__total', krdsClass: 'total', description: '현재 / 최대 첨부 수', confirmed: true },
    { element: '현재 파일 수', class: 'yds-file-upload__total-current', krdsClass: 'current', description: 'primary 컬러로 표시', confirmed: true },
    { element: '파일 목록', class: 'yds-file-upload__list', krdsClass: 'upload-list', description: '실제 파일 항목 ul', confirmed: true },
    { element: '파일 항목', class: 'yds-file-upload__item', krdsClass: '(li 직접)', description: '목록의 개별 li', confirmed: true },
    { element: '파일 정보 행', class: 'yds-file-upload__item-info', krdsClass: 'file-info', description: '파일명 + 버튼 가로 배치', confirmed: true },
    { element: '파일명', class: 'yds-file-upload__item-name', krdsClass: 'file-name', description: '한 줄 말줄임', confirmed: true },
    { element: '버튼 영역', class: 'yds-file-upload__item-actions', krdsClass: 'btn-wrap', description: '상태 아이콘 또는 삭제 버튼', confirmed: true },
    { element: '상태 아이콘', class: 'yds-file-upload__item-icon', krdsClass: 'ico-invalid', description: '완료·오류 아이콘. 상태 modifier와 함께 사용', confirmed: true },
    { element: '오류 메시지', class: 'yds-file-upload__item-hint', krdsClass: 'file-hint-invalid', description: '파일 항목 하단 오류 문구', confirmed: true },
    { element: '개별 삭제 버튼', class: 'yds-file-upload__item-delete-btn', krdsClass: 'btn-file-delete', description: '', confirmed: true },
    { element: '전체 삭제 버튼', class: 'yds-file-upload__delete-all-btn', krdsClass: 'btn-delete-all', description: '목록 우상단 절대 위치. 래퍼 div 없이 button에 직접 적용', confirmed: true },
  ],

  modifiers: [
    { category: '테두리 변형', class: 'yds-file-upload--line', krdsClass: 'yds-file-upload line', description: 'yds-file-upload 블록에 적용', confirmed: true },
    { category: '드래그 중', class: 'yds-file-upload__dropzone--dragover', krdsClass: 'file-upload active', description: 'yds-file-upload__dropzone과 함께 사용', confirmed: true },
    { category: '오류 항목', class: 'yds-file-upload__item--error', krdsClass: 'yds-file-upload__item--error', description: 'yds-file-upload__item과 함께 사용', confirmed: true },
    { category: '완료 아이콘', class: 'yds-file-upload__item-icon--completed', krdsClass: 'ico-invalid complete', description: 'yds-file-upload__item-icon과 함께 사용', confirmed: true },
    { category: '오류 아이콘', class: 'yds-file-upload__item-icon--error', krdsClass: 'ico-invalid error', description: 'yds-file-upload__item-icon과 함께 사용', confirmed: true },
    { category: '모바일 세로 배치', class: 'yds-file-upload__item-info--column', krdsClass: 'file-info m-column', description: 'yds-file-upload__item-info와 함께 사용', confirmed: true },
  ],
};

// ─── 브레드크럼 (Breadcrumb) ─────────────────────────────────────────────────

export const breadcrumbNaming = {
  name: '브레드크럼',
  englishName: 'Breadcrumb',
  sbPath: '컴포넌트/탐색/브레드크럼',
  baseClass: 'yds-breadcrumb',
  krdsClass: 'yds-breadcrumb-wrap',
  description: '현재 페이지의 위치를 계층 구조로 표시하는 내비게이션 보조 컴포넌트',

  structure: `nav.yds-breadcrumb  [yds-breadcrumb--mobile]
└── ol.yds-breadcrumb__list
    └── li.yds-breadcrumb__item  [yds-breadcrumb__item--home]
        ├── a.yds-breadcrumb__link              ← 링크 항목
        └── span.yds-breadcrumb__link.yds-breadcrumb__link--current  ← 현재 페이지`,

  elements: [
    { element: '브레드크럼 컨테이너', class: 'yds-breadcrumb', krdsClass: 'yds-breadcrumb-wrap', description: '최상위 nav 요소. CSS 변수 정의 및 레이아웃 컨테이너', confirmed: true },
    { element: '항목 목록', class: 'yds-breadcrumb__list', krdsClass: 'breadcrumb', description: '브레드크럼 항목 ol 리스트', confirmed: true },
    { element: '항목', class: 'yds-breadcrumb__item', krdsClass: '(li 직접)', description: '개별 브레드크럼 항목 li', confirmed: true },
    { element: '링크·현재 페이지', class: 'yds-breadcrumb__link', krdsClass: 'txt', description: '링크(a) 또는 현재 페이지(span)에 공통으로 적용', confirmed: true },
  ],

  modifiers: [
    { category: '홈 항목', class: 'yds-breadcrumb__item--home', krdsClass: 'home', description: '첫 번째 홈 항목 li. 홈 아이콘이 ::before로 자동 표시됨. yds-breadcrumb__item과 함께 사용', confirmed: true },
    { category: '현재 페이지', class: 'yds-breadcrumb__link--current', krdsClass: '(span aria-current="page")', description: '현재 페이지 span. aria-current="page"와 함께 사용. yds-breadcrumb__link와 함께 사용', confirmed: true },
    { category: '비활성화', class: 'yds-breadcrumb__link--disabled', krdsClass: 'disabled', description: '비활성화 링크. pointer-events: none. yds-breadcrumb__link와 함께 사용', confirmed: true },
    { category: '모바일 강제', class: 'yds-breadcrumb--mobile', krdsClass: 'is-mobile', description: '뷰포트 무관하게 모바일 축약 뷰 강제. 데모·테스트용. yds-breadcrumb에 적용', confirmed: true },
  ],

  codeExample: `<!-- 2단계 (홈 > 현재) -->
<nav class="yds-breadcrumb" aria-label="현재 경로">
  <ol class="yds-breadcrumb__list">
    <li class="yds-breadcrumb__item yds-breadcrumb__item--home">
      <a href="/home" class="yds-breadcrumb__link">홈</a>
    </li>
    <li class="yds-breadcrumb__item">
      <span class="yds-breadcrumb__link yds-breadcrumb__link--current" aria-current="page">서비스 신청</span>
    </li>
  </ol>
</nav>

<!-- 3단계 (홈 > 중간 > 현재) -->
<nav class="yds-breadcrumb" aria-label="현재 경로">
  <ol class="yds-breadcrumb__list">
    <li class="yds-breadcrumb__item yds-breadcrumb__item--home">
      <a href="/home" class="yds-breadcrumb__link">홈</a>
    </li>
    <li class="yds-breadcrumb__item">
      <a href="/service" class="yds-breadcrumb__link">서비스 신청</a>
    </li>
    <li class="yds-breadcrumb__item">
      <span class="yds-breadcrumb__link yds-breadcrumb__link--current" aria-current="page">세부 항목</span>
    </li>
  </ol>
</nav>`,
};

// ─── 탭 (Tab) ────────────────────────────────────────────────────────────────

export const tabNaming = {
  name: '탭',
  englishName: 'Tab',
  sbPath: '컴포넌트/레이아웃 및 표현/탭',
  baseClass: 'yds-tab',
  krdsClass: 'yds-tab-wrap',
  description: '하나의 화면 안에서 콘텐츠를 전환하는 탐색 컴포넌트. 라인형·박스형, 전체 너비 변형 지원',

  structure: `div.yds-tab  [yds-tab--line|--fill]  [yds-tab--full]
├── div.yds-tab__nav
│   └── ul.yds-tab__list  [role="tablist"]
│       └── li.yds-tab__item  [yds-tab__item--selected]  [role="tab"]
│           └── button.yds-tab__btn  [disabled]
└── div.yds-tab__panels
    └── section.yds-tab__panel  [yds-tab__panel--selected]  [role="tabpanel"]`,

  elements: [
    { element: '탭 블록', class: 'yds-tab', krdsClass: 'yds-tab-wrap', description: '탭 전체 래퍼. 종류(--line/--fill)·너비(--full) modifier를 이 요소에 적용', confirmed: true },
    { element: '탭 내비게이션', class: 'yds-tab__nav', krdsClass: 'yds-tab', description: '탭 리스트를 감싸는 내비게이션 영역. width: 100%', confirmed: true },
    { element: '탭 목록', class: 'yds-tab__list', krdsClass: '(ul 직접)', description: 'role="tablist" ul 요소. 가로 스크롤 허용', confirmed: true },
    { element: '탭 항목', class: 'yds-tab__item', krdsClass: '(li 직접)', description: 'role="tab" li 요소. 선택 시 --selected modifier 추가', confirmed: true },
    { element: '탭 버튼', class: 'yds-tab__btn', krdsClass: 'yds-tab-btn', description: '탭 클릭 버튼 (button 요소)', confirmed: true },
    { element: '탭 패널 묶음', class: 'yds-tab__panels', krdsClass: 'yds-tab-panel-wrap', description: '탭 패널 전체를 감싸는 컨테이너', confirmed: true },
    { element: '탭 패널', class: 'yds-tab__panel', krdsClass: 'yds-tab-panel', description: 'role="tabpanel" section 요소. 기본 display: none', confirmed: true },
  ],

  modifiers: [
    { category: '종류', class: 'yds-tab--line', krdsClass: 'yds-tab line', description: '라인형. 활성 탭에 하단 밑줄 인디케이터 표시. yds-tab에 적용', confirmed: true },
    { category: '종류', class: 'yds-tab--fill', krdsClass: 'yds-tab fill', description: '박스형. 활성 탭을 채워진 박스로 표현. yds-tab에 적용', confirmed: true },
    { category: '너비', class: 'yds-tab--full', krdsClass: 'yds-tab full', description: '전체 너비. 탭이 가로를 균등하게 채움. yds-tab에 적용 (--line/--fill과 조합)', confirmed: true },
    { category: '선택된 탭 항목', class: 'yds-tab__item--selected', krdsClass: 'active', description: '현재 선택된 탭 li. aria-selected="true"와 함께 사용. yds-tab__item과 함께 사용', confirmed: true },
    { category: '활성 패널', class: 'yds-tab__panel--selected', krdsClass: 'yds-tab-panel active', description: '표시되는 탭 패널. display: flex로 전환. yds-tab__panel과 함께 사용', confirmed: true },
  ],

  codeExample: `<div class="yds-tab yds-tab--line">
  <div class="yds-tab__nav">
    <ul class="yds-tab__list" role="tablist" aria-label="탭 이름">
      <li class="yds-tab__item yds-tab__item--selected"
          id="tab-1" role="tab"
          aria-selected="true" aria-controls="panel-1">
        <button type="button" class="yds-tab__btn">
          탭 1 <i class="sr-only created"> 선택됨</i>
        </button>
      </li>
      <li class="yds-tab__item"
          id="tab-2" role="tab"
          aria-selected="false" aria-controls="panel-2">
        <button type="button" class="yds-tab__btn">탭 2</button>
      </li>
    </ul>
  </div>
  <div class="yds-tab__panels">
    <section id="panel-1" role="tabpanel" aria-labelledby="tab-1"
             class="yds-tab__panel yds-tab__panel--selected" tabindex="0">
      <h3 class="sr-only">탭 1 영역</h3>
      탭 1 콘텐츠
    </section>
    <section id="panel-2" role="tabpanel" aria-labelledby="tab-2"
             class="yds-tab__panel" tabindex="0">
      <h3 class="sr-only">탭 2 영역</h3>
      탭 2 콘텐츠
    </section>
  </div>
</div>`,
};

// ─── 페이지네이션 (Pagination) ───────────────────────────────────────────────

export const paginationNaming = {
  name: '페이지네이션',
  englishName: 'Pagination',
  sbPath: '컴포넌트/탐색/페이지네이션',
  baseClass: 'yds-pagination',
  krdsClass: 'yds-pagination',
  description: '여러 페이지로 나뉜 콘텐츠를 탐색하는 컴포넌트',

  structure: `nav[aria-label]
└── div.yds-pagination
    ├── [span|a].yds-pagination__move-btn  [--first|--prev|--next|--last]  [--disabled]
    ├── div.yds-pagination__list
    │   ├── a.yds-pagination__link  [data-page]
    │   ├── span.yds-pagination__link.yds-pagination__link--current  [aria-current="page"]
    │   └── span.yds-pagination__link.yds-pagination__link--ellipsis  [aria-hidden="true"]
    └── [span|a].yds-pagination__move-btn  [--first|--prev|--next|--last]  [--disabled]`,

  elements: [
    { element: '페이지네이션', class: 'yds-pagination', krdsClass: 'yds-pagination', description: '전체 래퍼 div. CSS 변수 및 레이아웃 정의', confirmed: true },
    { element: '이동 버튼', class: 'yds-pagination__move-btn', krdsClass: 'page-navi', description: '처음·이전·다음·마지막 이동 버튼. 방향 modifier(--first/--prev/--next/--last)와 함께 사용. 활성: a, 비활성: span', confirmed: true },
    { element: '페이지 번호 그룹', class: 'yds-pagination__list', krdsClass: 'page-links', description: '페이지 번호 링크를 담는 컨테이너', confirmed: true },
    { element: '페이지 번호', class: 'yds-pagination__link', krdsClass: 'page-link', description: '개별 페이지 번호. 이동 가능: a, 현재/말줄임: span', confirmed: true },
  ],

  modifiers: [
    { category: '이전 버튼', class: 'yds-pagination__move-btn--prev', krdsClass: 'page-navi prev', description: '이전 페이지 버튼 (화살표 아이콘). yds-pagination__move-btn과 함께 사용', confirmed: true },
    { category: '다음 버튼', class: 'yds-pagination__move-btn--next', krdsClass: 'page-navi next', description: '다음 페이지 버튼 (화살표 아이콘). yds-pagination__move-btn과 함께 사용', confirmed: true },
    { category: '처음 버튼', class: 'yds-pagination__move-btn--first', krdsClass: 'page-navi first', description: '첫 페이지 버튼 (텍스트). yds-pagination__move-btn과 함께 사용', confirmed: true },
    { category: '마지막 버튼', class: 'yds-pagination__move-btn--last', krdsClass: 'page-navi last', description: '마지막 페이지 버튼 (텍스트). yds-pagination__move-btn과 함께 사용', confirmed: true },
    { category: '비활성 이동 버튼', class: 'yds-pagination__move-btn--disabled', krdsClass: 'page-navi disabled', description: '비활성 이동 버튼. span 태그 + aria-disabled="true"와 함께 사용. 방향 modifier와 함께 사용', confirmed: true },
    { category: '현재 페이지', class: 'yds-pagination__link--current', krdsClass: 'page-link active', description: '현재 페이지 번호. span 태그 + aria-current="page". yds-pagination__link와 함께 사용', confirmed: true },
    { category: '말줄임', class: 'yds-pagination__link--ellipsis', krdsClass: 'page-link link-dot', description: '말줄임(...) 구분자. span 태그 + aria-hidden="true". 클릭 불가. yds-pagination__link와 함께 사용', confirmed: true },
  ],

  codeExample: `<nav aria-label="페이지 탐색">
  <div class="yds-pagination">
    <a class="yds-pagination__move-btn yds-pagination__move-btn--first" href="#" data-navi="first">처음</a>
    <a class="yds-pagination__move-btn yds-pagination__move-btn--prev" href="#" data-navi="prev">
      <span class="sr-only">이전 페이지</span>
    </a>
    <div class="yds-pagination__list">
      <a class="yds-pagination__link" href="#" data-page="1">1</a>
      <span class="yds-pagination__link yds-pagination__link--ellipsis" aria-hidden="true"></span>
      <a class="yds-pagination__link" href="#" data-page="3">3</a>
      <span class="yds-pagination__link yds-pagination__link--current" aria-current="page">
        <span class="sr-only">현재페이지 </span>4
      </span>
      <a class="yds-pagination__link" href="#" data-page="5">5</a>
    </div>
    <a class="yds-pagination__move-btn yds-pagination__move-btn--next" href="#" data-navi="next">
      <span class="sr-only">다음 페이지</span>
    </a>
    <a class="yds-pagination__move-btn yds-pagination__move-btn--last" href="#" data-navi="last">마지막</a>
  </div>
</nav>`,
};

// ─── 배지 (Badge) ────────────────────────────────────────────────────────────

export const badgeNaming = {
  name: '배지',
  englishName: 'Badge',
  sbPath: '컴포넌트/레이아웃 및 표현/배지',
  baseClass: 'yds-badge',
  krdsClass: 'krds-badge',
  description: '상태·카테고리·숫자 등 짧은 정보를 강조해 표시하는 레이블 요소',

  structure: `span.yds-badge [yds-badge--스타일-색상] [yds-badge--large] [yds-badge--number|--dot]

묶음:
div.yds-badge-group`,

  elements: [
    {
      element: '배지',
      class: 'yds-badge',
      krdsClass: 'krds-badge',
      description: '배지 루트 요소. 스타일·크기·유형 modifier를 공백으로 이어 붙인다.',
      confirmed: true,
    },
    {
      element: '배지 그룹',
      class: 'yds-badge-group',
      krdsClass: 'krds-badge-wrap',
      description: '배지를 가로로 나열하는 flex 컨테이너',
      confirmed: true,
    },
  ],

  modifiers: [
    // 색상 — outline
    { category: '색상 (테두리)', class: 'yds-badge--outline-primary',     krdsClass: 'outline-primary',     description: '테두리 — 기본', confirmed: true },
    { category: '색상 (테두리)', class: 'yds-badge--outline-secondary',   krdsClass: 'outline-secondary',   description: '테두리 — 보조', confirmed: true },
    { category: '색상 (테두리)', class: 'yds-badge--outline-gray',        krdsClass: 'outline-gray',        description: '테두리 — 일반', confirmed: true },
    { category: '색상 (테두리)', class: 'yds-badge--outline-point',       krdsClass: 'outline-point',       description: '테두리 — 포인트', confirmed: true },
    { category: '색상 (테두리)', class: 'yds-badge--outline-danger',      krdsClass: 'outline-danger',      description: '테두리 — 오류', confirmed: true },
    { category: '색상 (테두리)', class: 'yds-badge--outline-warning',     krdsClass: 'outline-warning',     description: '테두리 — 주의', confirmed: true },
    { category: '색상 (테두리)', class: 'yds-badge--outline-success',     krdsClass: 'outline-success',     description: '테두리 — 완료', confirmed: true },
    { category: '색상 (테두리)', class: 'yds-badge--outline-information', krdsClass: 'outline-information', description: '테두리 — 정보', confirmed: true },
    { category: '색상 (테두리)', class: 'yds-badge--outline-disabled',    krdsClass: 'outline-disabled',    description: '테두리 — 비활성', confirmed: true },
    // 색상 — bg
    { category: '색상 (채우기)', class: 'yds-badge--bg-primary',     krdsClass: 'bg-primary',     description: '채우기 — 기본', confirmed: true },
    { category: '색상 (채우기)', class: 'yds-badge--bg-secondary',   krdsClass: 'bg-secondary',   description: '채우기 — 보조', confirmed: true },
    { category: '색상 (채우기)', class: 'yds-badge--bg-gray',        krdsClass: 'bg-gray',        description: '채우기 — 일반', confirmed: true },
    { category: '색상 (채우기)', class: 'yds-badge--bg-point',       krdsClass: 'bg-point',       description: '채우기 — 포인트', confirmed: true },
    { category: '색상 (채우기)', class: 'yds-badge--bg-danger',      krdsClass: 'bg-danger',      description: '채우기 — 오류', confirmed: true },
    { category: '색상 (채우기)', class: 'yds-badge--bg-warning',     krdsClass: 'bg-warning',     description: '채우기 — 주의 (어두운 텍스트 적용)', confirmed: true },
    { category: '색상 (채우기)', class: 'yds-badge--bg-success',     krdsClass: 'bg-success',     description: '채우기 — 완료', confirmed: true },
    { category: '색상 (채우기)', class: 'yds-badge--bg-information', krdsClass: 'bg-information', description: '채우기 — 정보', confirmed: true },
    { category: '색상 (채우기)', class: 'yds-badge--bg-disabled',    krdsClass: 'bg-disabled',    description: '채우기 — 비활성', confirmed: true },
    // 색상 — bg-light
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-primary',     krdsClass: 'bg-light-primary',     description: '밝은 배경 — 기본 (상태 표시 권장)', confirmed: true },
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-secondary',   krdsClass: 'bg-light-secondary',   description: '밝은 배경 — 보조', confirmed: true },
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-gray',        krdsClass: 'bg-light-gray',        description: '밝은 배경 — 일반', confirmed: true },
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-point',       krdsClass: 'bg-light-point',       description: '밝은 배경 — 포인트', confirmed: true },
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-danger',      krdsClass: 'bg-light-danger',      description: '밝은 배경 — 오류', confirmed: true },
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-warning',     krdsClass: 'bg-light-warning',     description: '밝은 배경 — 주의', confirmed: true },
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-success',     krdsClass: 'bg-light-success',     description: '밝은 배경 — 완료', confirmed: true },
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-information', krdsClass: 'bg-light-information', description: '밝은 배경 — 정보', confirmed: true },
    { category: '색상 (밝은 배경)', class: 'yds-badge--bg-light-disabled',    krdsClass: 'bg-light-disabled',    description: '밝은 배경 — 비활성', confirmed: true },
    // 크기
    { category: '크기', class: 'yds-badge--large', krdsClass: 'large', description: '큰 크기 배지. 크기 클래스를 생략하면 기본 크기가 적용된다.', confirmed: true },
    // 유형
    { category: '유형', class: 'yds-badge--number', krdsClass: 'number', description: '숫자 배지 — pill 형태, 최소 너비 보장', confirmed: true },
    { category: '유형', class: 'yds-badge--dot', krdsClass: '(자체 추가)', description: '점 배지 — 텍스트 없음, aria-label 필수. KRDS 원본에 없음', confirmed: true },
  ],

  codeExample: `<!-- 기본 배지 -->
<span class="yds-badge yds-badge--bg-light-primary">진행 중</span>

<!-- 채우기 -->
<span class="yds-badge yds-badge--bg-success">완료</span>

<!-- 테두리 -->
<span class="yds-badge yds-badge--outline-danger">오류</span>

<!-- Large 크기 -->
<span class="yds-badge yds-badge--large yds-badge--bg-light-information">정보</span>

<!-- 숫자 배지 -->
<span class="yds-badge yds-badge--bg-danger yds-badge--number">5</span>
<span class="yds-badge yds-badge--bg-primary yds-badge--number">999+</span>

<!-- 점 배지 -->
<span class="yds-badge yds-badge--bg-danger yds-badge--dot" aria-label="알림 있음"></span>

<!-- 묶음 표시 -->
<div class="yds-badge-group">
  <span class="yds-badge yds-badge--bg-light-primary">기본</span>
  <span class="yds-badge yds-badge--bg-light-success">완료</span>
  <span class="yds-badge yds-badge--bg-light-danger">오류</span>
</div>`,
};

// ─── 툴팁 (Tooltip) ──────────────────────────────────────────────────────────

export const tooltipNaming = {
  name: '툴팁',
  englishName: 'Tooltip',
  sbPath: '컴포넌트/도움/툴팁',
  baseClass: 'yds-tooltip',
  krdsClass: 'krds-tooltip',
  description: '요소에 마우스를 올리거나 포커스 시 짧은 안내 텍스트를 팝오버로 표시하는 컴포넌트',

  structure: `[button|span].yds-tooltip
  data-tooltip="텍스트"
  data-position="top|bottom|left|right"
  data-style="inline|box"

팝오버 (JS 동적 생성, 트리거 바깥 canvasElement에 부착):
div.yds-tooltip-popover [yds-tooltip-popover--open] [yds-tooltip-popover--box]
  [yds-tooltip-popover--top|--bottom|--left|--right]`,

  elements: [
    {
      element: '트리거',
      class: 'yds-tooltip',
      krdsClass: 'krds-tooltip',
      description: '트리거 요소에 부여하는 마커 클래스. data-tooltip / data-position / data-style 속성으로 동작 설정',
      confirmed: true,
    },
    {
      element: '팝오버',
      class: 'yds-tooltip-popover',
      krdsClass: '(자체 구현)',
      description: '팝오버 컨테이너 (JS가 생성, position: fixed). role="tooltip" 부여. 트리거 바깥에 단독 배치',
      confirmed: true,
    },
  ],

  modifiers: [
    { category: '팝오버 표시', class: 'yds-tooltip-popover--open',   krdsClass: 'active',       description: '팝오버 표시 상태. yds-tooltip-popover에 적용', confirmed: true },
    { category: '박스형',     class: 'yds-tooltip-popover--box',    krdsClass: 'tooltip-box',  description: '흰 배경·테두리 박스형 팝오버. yds-tooltip-popover에 적용', confirmed: true },
    { category: '위치',       class: 'yds-tooltip-popover--top',    krdsClass: 'pos-top',      description: '트리거 위에 표시. yds-tooltip-popover에 적용', confirmed: true },
    { category: '위치',       class: 'yds-tooltip-popover--bottom', krdsClass: 'pos-bottom',   description: '트리거 아래에 표시. yds-tooltip-popover에 적용', confirmed: true },
    { category: '위치',       class: 'yds-tooltip-popover--left',   krdsClass: 'pos-left',     description: '트리거 왼쪽에 표시. yds-tooltip-popover에 적용', confirmed: true },
    { category: '위치',       class: 'yds-tooltip-popover--right',  krdsClass: 'pos-right',    description: '트리거 오른쪽에 표시. yds-tooltip-popover에 적용', confirmed: true },
  ],

  codeExample: `<!-- 버튼 트리거 -->
<button type="button" class="yds-btn yds-btn--medium yds-tooltip"
        data-tooltip="툴팁 안내 텍스트입니다."
        data-position="top"
        data-style="inline">
  버튼 레이블
</button>

<!-- 텍스트 요소 트리거 -->
<span class="yds-tooltip"
      tabindex="0"
      data-tooltip="span 요소의 툴팁입니다."
      data-position="right"
      data-style="inline">
  텍스트 요소
</span>

<!-- JS가 자동 생성하는 팝오버 -->
<div id="tooltip-trigger-xxxxx-popover"
     class="yds-tooltip-popover yds-tooltip-popover--top yds-tooltip-popover--open"
     role="tooltip">
  툴팁 안내 텍스트입니다.
</div>`,
};

// ─── 아코디언 (Accordion) ────────────────────────────────────────────────────

export const accordionNaming = {
  name: '아코디언',
  englishName: 'Accordion',
  sbPath: '컴포넌트/레이아웃 및 표현/아코디언',
  baseClass: 'yds-accordion',
  krdsClass: 'krds-accordion',
  description: '제목 클릭으로 콘텐츠를 접었다 펼치는 패널 컴포넌트',

  structure: `div.yds-accordion  [yds-accordion--line]  [data-type="multiOpen"]
└── div.yds-accordion__item  [yds-accordion__item--open]
    ├── h2.yds-accordion__header
    │   └── button.yds-accordion__btn  [yds-accordion__btn--open]
    ├── div.yds-accordion__collapse
    │   └── div.yds-accordion__body`,

  elements: [
    { element: '아코디언 컨테이너', class: 'yds-accordion',           krdsClass: 'krds-accordion',    description: '아코디언 최상위 컨테이너. 라인형 modifier를 공백으로 이어 붙인다.', confirmed: true },
    { element: '항목',             class: 'yds-accordion__item',    krdsClass: 'accordion-item',    description: '개별 아코디언 항목', confirmed: true },
    { element: '헤더',             class: 'yds-accordion__header',  krdsClass: 'accordion-header',  description: '헤딩 요소 래퍼 (시맨틱 제목 계층 적용)', confirmed: true },
    { element: '헤더 버튼',        class: 'yds-accordion__btn',     krdsClass: 'btn-accordion',     description: '클릭 시 패널을 열고 닫는 버튼. aria-expanded로 상태 표현', confirmed: true },
    { element: '패널',             class: 'yds-accordion__collapse',krdsClass: 'accordion-collapse',description: '접이식 패널 (닫힘 기본: max-height:0, visibility:hidden)', confirmed: true },
    { element: '패널 본문',        class: 'yds-accordion__body',    krdsClass: 'accordion-body',    description: '패널 내 실제 콘텐츠 영역', confirmed: true },
  ],

  modifiers: [
    { category: '종류', class: 'yds-accordion--line',          krdsClass: 'type-line', description: '라인형 — 테두리 없이 구분선만 표시', confirmed: true },
    { category: '상태', class: 'yds-accordion__item--open',   krdsClass: 'active',    description: '열린 상태 항목', confirmed: true },
    { category: '상태', class: 'yds-accordion__btn--open',    krdsClass: 'active',    description: '열린 상태 버튼 (배경색 변경, 화살표 아이콘 180° 회전)', confirmed: true },
  ],

  codeExample: `<!-- 기본형 -->
<div class="yds-accordion">
  <div class="yds-accordion__item">
    <h2 class="yds-accordion__header">
      <button type="button" class="yds-accordion__btn"
              aria-controls="pnl-1" aria-expanded="false">
        아코디언 타이틀
      </button>
    </h2>
    <div class="yds-accordion__collapse" id="pnl-1" role="region" aria-labelledby="">
      <div class="yds-accordion__body">내용</div>
    </div>
  </div>
</div>

<!-- 라인형 -->
<div class="yds-accordion yds-accordion--line">
  <!-- yds-accordion__item 구조 동일 -->
</div>

<!-- 여러 개 동시 열기 -->
<div class="yds-accordion" data-type="multiOpen">
  <!-- yds-accordion__item 구조 동일 -->
</div>

<!-- 열린 상태 -->
<div class="yds-accordion__item yds-accordion__item--open">
  <h2 class="yds-accordion__header">
    <button type="button" class="yds-accordion__btn yds-accordion__btn--open"
            aria-expanded="true">타이틀</button>
  </h2>
  <div class="yds-accordion__collapse">
    <div class="yds-accordion__body">내용</div>
  </div>
</div>`,
};

// ─── 표 (Table) ──────────────────────────────────────────────────────────────

export const tableNaming = {
  name: '표',
  englishName: 'Table',
  sbPath: '컴포넌트/레이아웃 및 표현/표',
  baseClass: 'yds-table-wrap',
  krdsClass: 'krds-table-wrap',
  description: '구조화된 데이터를 행과 열로 표현하는 컴포넌트',

  structure: `div.yds-table-wrap  [yds-table-wrap--scroll|--mobile-card|--mobile-scroll]
└── table.yds-table  [yds-table--data]  [yds-table--row-header]
    ├── caption.yds-table__caption  [yds-table__caption--visible]
    ├── colgroup
    ├── thead > tr > th[scope="col"]
    └── tbody > tr
        ├── th[scope="row"]   ← yds-table--row-header 사용 시
        └── td[data-label]`,

  elements: [
    { element: '래퍼',     class: 'yds-table-wrap',         krdsClass: 'krds-table-wrap', description: '가로 스크롤 컨테이너. 모바일 반응형 modifier를 함께 사용한다.', confirmed: true },
    { element: '표',       class: 'yds-table',              krdsClass: 'tbl',             description: '데이터 표 루트 요소. yds-table--data modifier 필수', confirmed: true },
    { element: '설명',     class: 'yds-table__caption',     krdsClass: '(HTML 태그)',     description: '표 설명 (기본: sr-only 처리, --visible modifier로 시각 표시). KRDS는 <caption> 태그 자체를 사용하며 클래스 없음', confirmed: true },
  ],

  modifiers: [
    { category: '표 종류',       class: 'yds-table--data',                krdsClass: 'data',          description: '데이터 표 스타일 적용 (thead + tbody 구조)', confirmed: true },
    { category: '표 종류',       class: 'yds-table--row-header',          krdsClass: 'col',           description: 'tbody 행 헤더(th[scope="row"])가 있는 키-값 레이아웃. yds-table--data와 함께 사용', confirmed: true },
    { category: '설명',          class: 'yds-table__caption--visible',    krdsClass: '(자체 추가)',   description: 'caption을 시각적으로 표시 (기본 sr-only 해제). KRDS에 대응 클래스 없음', confirmed: true },
    { category: '래퍼 — PC',     class: 'yds-table-wrap--scroll',         krdsClass: 'scroll',        description: 'PC에서도 가로 스크롤 강제 적용', confirmed: true },
    { category: '래퍼 — 모바일', class: 'yds-table-wrap--mobile-card',    krdsClass: '(자체 추가)',   description: '모바일에서 행을 카드 형태로 변환. td에 data-label 속성 필요', confirmed: true },
    { category: '래퍼 — 모바일', class: 'yds-table-wrap--mobile-scroll',  krdsClass: 'mob-scroll',    description: '모바일에서 셀을 nowrap으로 유지해 가로 스크롤 강제', confirmed: true },
  ],

  codeExample: `<!-- 목록형 -->
<div class="yds-table-wrap">
  <table class="yds-table yds-table--data">
    <caption class="yds-table__caption">공지사항 목록</caption>
    <colgroup><col style="width:8%;"><col><col style="width:12%;"><col style="width:12%;"></colgroup>
    <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">제목</th>
        <th scope="col">작성자</th>
        <th scope="col">게시일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="번호">1</td>
        <td data-label="제목">서비스 점검 안내</td>
        <td data-label="작성자">관리자</td>
        <td data-label="게시일">2026-10-28</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- 가로 헤더형 (키-값) -->
<div class="yds-table-wrap">
  <table class="yds-table yds-table--data yds-table--row-header">
    <caption class="yds-table__caption">사용자 상세 정보</caption>
    <colgroup><col style="width:25%;"><col></colgroup>
    <thead><tr><th scope="col">항목</th><th scope="col">내용</th></tr></thead>
    <tbody>
      <tr><th scope="row">이름</th><td data-label="이름">홍길동</td></tr>
    </tbody>
  </table>
</div>

<!-- 캡션 시각 표시 -->
<caption class="yds-table__caption yds-table__caption--visible">공지사항 목록</caption>

<!-- 모바일 카드형 -->
<div class="yds-table-wrap yds-table-wrap--mobile-card">
  <table class="yds-table yds-table--data">...</table>
</div>`,
};

// ─── 캐러셀 컨트롤 (Carousel Controls) ─────────────────────────────────────

export const carouselNaming = {
  name: '캐러셀 컨트롤',
  englishName: 'Carousel Controls',
  sbPath: '컴포넌트/레이아웃 및 표현/캐러셀 컨트롤',
  baseClass: 'yds-carousel',
  krdsClass: 'swiper-indicator',
  description: '슬라이드 탐색·제어를 위한 버튼 및 인디케이터 UI. Swiper.js 등 외부 슬라이더 라이브러리와 조합 사용.',

  structure: `div.yds-carousel__indicator  [yds-carousel__indicator--center]  [yds-carousel__indicator--hide-desktop]
├── div.yds-carousel__pagination  [yds-carousel__pagination--fraction]  [yds-carousel__pagination--bg]
│   ├── span.yds-carousel__bullet  [yds-carousel__bullet--current]        ← 불릿형
│   ├── span.yds-carousel__pagination-current                             ← 분수형
│   └── span.yds-carousel__pagination-total                              ← 분수형
├── div.yds-carousel__controller
│   ├── button.yds-carousel__play-btn
│   └── button.yds-carousel__stop-btn
└── div.yds-carousel__nav  [yds-carousel__nav--hide-desktop]
    ├── button.yds-carousel__move-btn.yds-carousel__move-btn--prev  [--disabled]
    ├── button.yds-carousel__move-btn.yds-carousel__move-btn--next  [--disabled]
    └── a.yds-carousel__more-btn`,

  elements: [
    { element: '인디케이터 래퍼',    class: 'yds-carousel__indicator',          krdsClass: 'swiper-indicator',          description: '페이지네이션 + 컨트롤러 + 내비게이션 전체 래퍼', confirmed: true },
    { element: '페이지네이션',       class: 'yds-carousel__pagination',         krdsClass: 'swiper-pagination',         description: '불릿(점) 또는 분수 형태의 슬라이드 위치 표시', confirmed: true },
    { element: '불릿',               class: 'yds-carousel__bullet',             krdsClass: 'swiper-pagination-bullet',  description: '개별 점(dot) 요소', confirmed: true },
    { element: '현재 페이지 숫자',   class: 'yds-carousel__pagination-current', krdsClass: 'swiper-pagination-current', description: '분수형 현재 페이지 숫자 (강조 색상)', confirmed: true },
    { element: '전체 페이지 숫자',   class: 'yds-carousel__pagination-total',   krdsClass: 'swiper-pagination-total',   description: '분수형 전체 페이지 숫자', confirmed: true },
    { element: '컨트롤러',           class: 'yds-carousel__controller',         krdsClass: 'swiper-controller',         description: '재생/멈춤 버튼 그룹', confirmed: true },
    { element: '재생 버튼',          class: 'yds-carousel__play-btn',           krdsClass: 'swiper-button-play',        description: '자동 재생 시작 버튼', confirmed: true },
    { element: '멈춤 버튼',          class: 'yds-carousel__stop-btn',           krdsClass: 'swiper-button-stop',        description: '자동 재생 멈춤 버튼', confirmed: true },
    { element: '내비게이션',         class: 'yds-carousel__nav',                krdsClass: 'swiper-navigation',         description: '이전/다음/더보기 버튼 그룹', confirmed: true },
    { element: '이전/다음 버튼',     class: 'yds-carousel__move-btn',           krdsClass: 'swiper-button-prev/next',   description: '이전·다음 슬라이드 이동 버튼. 방향 modifier(--prev/--next) 필수', confirmed: true },
    { element: '더보기 버튼',        class: 'yds-carousel__more-btn',           krdsClass: 'swiper-button-more',        description: '전체 목록으로 이동하는 링크 버튼', confirmed: true },
  ],

  modifiers: [
    { category: '이전/다음 방향',   class: 'yds-carousel__move-btn--prev',             krdsClass: 'swiper-button-prev',              description: '이전 버튼 아이콘 방향 (90° 회전)', confirmed: true },
    { category: '이전/다음 방향',   class: 'yds-carousel__move-btn--next',             krdsClass: 'swiper-button-next',              description: '다음 버튼 아이콘 방향 (-90° 회전)', confirmed: true },
    { category: '상태',             class: 'yds-carousel__move-btn--disabled',         krdsClass: 'swiper-button-disabled',          description: '이전/다음 버튼 비활성 상태. aria-disabled="true" 필수', confirmed: true },
    { category: '불릿 상태',        class: 'yds-carousel__bullet--current',            krdsClass: 'swiper-pagination-bullet-active', description: '현재 슬라이드에 해당하는 활성 불릿', confirmed: true },
    { category: '페이지네이션 종류',class: 'yds-carousel__pagination--fraction',       krdsClass: 'swiper-pagination-fraction',      description: '분수형 페이지네이션 (숫자 형태)', confirmed: true },
    { category: '페이지네이션 종류',class: 'yds-carousel__pagination--bg',             krdsClass: 'swiper-pagination-bg',            description: '인디케이터 내 분수형에 배경 추가', confirmed: true },
    { category: '인디케이터 정렬',  class: 'yds-carousel__indicator--center',          krdsClass: 'text-center',                     description: '인디케이터 가운데 정렬 (기본: 우측 정렬)', confirmed: true },
    { category: '반응형',           class: 'yds-carousel__indicator--hide-desktop',    krdsClass: 'w-hide',                          description: 'PC에서 숨겨진 인디케이터를 모바일에서 강제 표시', confirmed: true },
    { category: '반응형',           class: 'yds-carousel__nav--hide-desktop',          krdsClass: 'w-hide',                          description: 'PC에서 숨겨진 내비게이션을 모바일에서 강제 표시', confirmed: true },
  ],

  codeExample: `<!-- 개별 버튼 -->
<button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--prev">
  <span class="sr-only">이전</span>
</button>
<button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--next">
  <span class="sr-only">다음</span>
</button>

<!-- 비활성 버튼 -->
<button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--prev yds-carousel__move-btn--disabled"
        aria-disabled="true">
  <span class="sr-only">이전</span>
</button>

<!-- 불릿 페이지네이션 -->
<div class="yds-carousel__pagination">
  <span class="yds-carousel__bullet"></span>
  <span class="yds-carousel__bullet yds-carousel__bullet--current"></span>
  <span class="yds-carousel__bullet"></span>
</div>

<!-- 분수 페이지네이션 -->
<div class="yds-carousel__pagination yds-carousel__pagination--fraction">
  <span class="yds-carousel__pagination-current">2</span>
  /
  <span class="yds-carousel__pagination-total">10</span>
</div>

<!-- 전체 인디케이터 -->
<div class="yds-carousel__indicator yds-carousel__indicator--center">
  <div class="yds-carousel__pagination">
    <span class="yds-carousel__bullet yds-carousel__bullet--current"></span>
    <span class="yds-carousel__bullet"></span>
  </div>
  <div class="yds-carousel__controller">
    <button type="button" class="yds-carousel__stop-btn">
      <span class="sr-only">슬라이드 멈춤</span>
    </button>
  </div>
  <div class="yds-carousel__nav">
    <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--prev">
      <span class="sr-only">이전</span>
    </button>
    <button type="button" class="yds-carousel__move-btn yds-carousel__move-btn--next">
      <span class="sr-only">다음</span>
    </button>
  </div>
</div>`,
};

// ─── 아이콘 (Icon) ─────────────────────────────────────────────────────────

export const iconNaming = {
  name: '아이콘',
  englishName: 'Icon',
  sbPath: '기반/아이콘',
  baseClass: 'yds-icon',
  krdsClass: 'svg-icon',
  description: 'CSS mask-image 기반 SVG 아이콘',

  structure: `i.yds-icon.yds-ico-{이름} [yds-icon--크기] [yds-icon--방향/상태]`,

  elements: [
    { element: '아이콘',   class: 'yds-icon',          krdsClass: 'svg-icon',  description: '아이콘 루트. yds-ico-{이름}과 항상 함께 사용', confirmed: true },
    { element: '아이콘명', class: 'yds-ico-{이름}',    krdsClass: 'ico-{이름}', description: '아이콘 종류 지정 (예: yds-ico-sch, yds-ico-angle)', confirmed: true },
  ],

  modifiers: [
    { category: '크기',   class: 'yds-icon yds-icon--xsmall', krdsClass: 'svg-icon xsmall', description: '매우 작은 크기 (--krds-icon--size-xsmall)', confirmed: true },
    { category: '크기',   class: 'yds-icon yds-icon--small',  krdsClass: 'svg-icon small',  description: '작은 크기 (--krds-icon--size-small)', confirmed: true },
    { category: '크기',   class: 'yds-icon yds-icon--medium', krdsClass: 'svg-icon medium', description: '중간 크기 (--krds-icon--size-medium)', confirmed: true },
    { category: '크기',   class: 'yds-icon (기본)',           krdsClass: 'svg-icon',        description: '기본 크기 large (--krds-icon--size-large)', confirmed: true },
    { category: '크기',   class: 'yds-icon yds-icon--xlarge', krdsClass: 'svg-icon xlarge', description: '매우 큰 크기 (--krds-icon--size-xlarge)', confirmed: true },
    { category: '방향',   class: 'yds-ico-angle yds-icon--up',       krdsClass: 'ico-angle up',    description: '꺽쇠 위 방향 (rotate 180°)', confirmed: true },
    { category: '방향',   class: 'yds-ico-angle yds-icon--left',     krdsClass: 'ico-angle left',  description: '꺽쇠 왼쪽 방향 (rotate 90°)', confirmed: true },
    { category: '방향',   class: 'yds-ico-angle yds-icon--right',    krdsClass: 'ico-angle right', description: '꺽쇠 오른쪽 방향 (rotate -90°)', confirmed: true },
    { category: '방향',   class: 'yds-ico-func yds-icon--up',        krdsClass: 'ico-func up',     description: '펼치기 위 방향 (rotate -90°)', confirmed: true },
    { category: '방향',   class: 'yds-ico-fold yds-icon--right',     krdsClass: 'ico-fold right',  description: '접기 오른쪽 방향 (rotate -180°)', confirmed: true },
    { category: '상태',   class: 'yds-ico-angle yds-icon--disabled', krdsClass: 'ico-angle disabled', description: '비활성 꺽쇠 (별도 SVG, pure 방식)', confirmed: true },
  ],

  codeExample: `<!-- 기본 아이콘 (large, 장식용) -->
<i class="yds-icon yds-ico-sch" aria-hidden="true"></i>

<!-- 크기 modifier -->
<i class="yds-icon yds-ico-sch yds-icon--small" aria-hidden="true"></i>
<i class="yds-icon yds-ico-sch yds-icon--medium" aria-hidden="true"></i>

<!-- 방향 modifier -->
<i class="yds-icon yds-ico-angle yds-icon--up" aria-hidden="true"></i>
<i class="yds-icon yds-ico-angle yds-icon--left" aria-hidden="true"></i>
<i class="yds-icon yds-ico-angle yds-icon--right" aria-hidden="true"></i>

<!-- 의미 있는 아이콘 (버튼 내) -->
<button type="button">
  <i class="yds-icon yds-ico-sch" aria-hidden="true"></i>
  <span class="sr-only">검색</span>
</button>`,
};

// ─── 헤더 (Header) ─────────────────────────────────────────────────────────────

export const headerNaming = {
  name: '헤더',
  englishName: 'Header',
  sbPath: '패턴/기본 레이아웃',
  baseClass: 'yds-header',
  krdsClass: 'header-container',
  description: '사이트 최상단 글로벌 헤더 (유틸리티 바 + 브랜딩). yds-utility-list는 헤더·모바일 메뉴 공통 블록',

  structure: `#yds-header
└── .yds-header__inner
    └── .yds-header__container > .yds-container
        ├── .yds-header__utility > ul.yds-utility-list [yds-utility-list--start]
        └── .yds-header__branding
            ├── h1.yds-header__logo
            └── .yds-header__actions
                └── button.yds-header__action-btn [--search/--login/--join/--mypage/--all-menu]`,

  elements: [
    { element: '유틸리티 목록',  class: 'yds-utility-list',         krdsClass: 'utility-list',     description: '헤더·모바일 메뉴 공통 블록 (기본: 우측 정렬)', confirmed: true },
    { element: '헤더 내부',      class: 'yds-header__inner',         krdsClass: 'header-in',        description: '헤더 전체 래퍼', confirmed: true },
    { element: '헤더 컨테이너',  class: 'yds-header__container',     krdsClass: 'header-container', description: '유틸리티 바 + 브랜딩 영역', confirmed: true },
    { element: '유틸리티 영역',  class: 'yds-header__utility',       krdsClass: 'header-utility',   description: '상단 유틸리티 링크 영역 (PC 전용)', confirmed: true },
    { element: '브랜딩',         class: 'yds-header__branding',      krdsClass: 'header-branding',  description: '로고 + 액션 버튼 행', confirmed: true },
    { element: '로고',           class: 'yds-header__logo',          krdsClass: 'logo',             description: '헤더 로고 (h1 또는 h2)', confirmed: true },
    { element: '액션 버튼 그룹', class: 'yds-header__actions',       krdsClass: 'header-actions',   description: '오른쪽 액션 버튼 그룹', confirmed: true },
    { element: '액션 버튼',      class: 'yds-header__action-btn',    krdsClass: 'btn-navi',         description: '아이콘+텍스트 형태의 헤더 버튼. 종류 modifier 필수', confirmed: true },
  ],

  modifiers: [
    { category: '정렬',           class: 'yds-utility-list--start',         krdsClass: '(자체 추가)',   description: '좌측 정렬 (모바일 메뉴 내부)', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn--search',  krdsClass: 'btn-navi sch', description: '검색 버튼', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn--login',   krdsClass: 'btn-navi login', description: '로그인 버튼/링크', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn--join',    krdsClass: 'btn-navi join', description: '회원가입 버튼 (PC 전용)', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn--mypage',  krdsClass: 'btn-navi my', description: '나의GOV 버튼 (로그인 후, PC 전용)', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn--all-menu', krdsClass: 'btn-navi all', description: '전체메뉴 버튼 (모바일 전용)', confirmed: true },
  ],

  codeExample: `<!-- 헤더 액션 버튼 -->
<div class="yds-header__actions">
  <button type="button" class="yds-header__action-btn yds-header__action-btn--search">통합검색</button>
  <a href="#" class="yds-header__action-btn yds-header__action-btn--login">로그인</a>
  <button type="button" class="yds-header__action-btn yds-header__action-btn--all-menu"
          aria-controls="mobile-nav" aria-expanded="false">전체메뉴</button>
</div>

<!-- 유틸리티 목록 (헤더: 우측 정렬) -->
<ul class="yds-utility-list">
  <li><a href="#">공지사항</a></li>
</ul>

<!-- 유틸리티 목록 (모바일 GNB: 좌측 정렬) -->
<ul class="yds-utility-list yds-utility-list--start">
  <li><a href="#">로그인</a></li>
</ul>`,
};

// ─── PC GNB (Main Menu PC) ─────────────────────────────────────────────────────

export const pcGnbNaming = {
  name: '메인 메뉴 (PC)',
  englishName: 'Main Menu PC',
  sbPath: '패턴/기본 레이아웃',
  baseClass: 'yds-main-menu',
  krdsClass: 'yds-main-menu',
  description: 'PC용 글로벌 내비게이션 메뉴 (메가 메뉴)',

  structure: `nav.yds-main-menu
└── ul.yds-main-menu__list
    └── li > button.yds-main-menu__trigger [--link/--open]
        └── .yds-main-menu__dropdown [--open]
            └── .yds-main-menu__panel
                └── button.yds-main-menu__sub-trigger [--link/--open]
                    └── .yds-main-menu__sub-list [--open/--single]
                        └── .yds-main-menu__sub-content
                            ├── .yds-main-menu__sub-title
                            └── a.yds-main-menu__sub-link [--current]
.yds-main-menu__backdrop [--open]`,

  elements: [
    { element: 'PC GNB',         class: 'yds-main-menu',              krdsClass: 'yds-main-menu',     description: 'PC GNB 래퍼 (nav 요소)', confirmed: true },
    { element: '1depth 목록',    class: 'yds-main-menu__list',        krdsClass: 'gnb-menu',         description: '1depth 항목 ul 목록', confirmed: true },
    { element: '1depth 트리거',  class: 'yds-main-menu__trigger',     krdsClass: 'gnb-main-trigger', description: '1depth 버튼 또는 링크', confirmed: true },
    { element: '드롭다운',       class: 'yds-main-menu__dropdown',    krdsClass: 'gnb-toggle-wrap',  description: '드롭다운 패널 (기본 숨김)', confirmed: true },
    { element: '드롭다운 내부',  class: 'yds-main-menu__panel',       krdsClass: 'gnb-main-list',    description: '2depth 목록 컨테이너', confirmed: true },
    { element: '2depth 트리거',  class: 'yds-main-menu__sub-trigger', krdsClass: 'gnb-sub-trigger',  description: '2depth 버튼 또는 링크', confirmed: true },
    { element: '3depth 목록',    class: 'yds-main-menu__sub-list',    krdsClass: 'gnb-sub-list',     description: '3depth 패널', confirmed: true },
    { element: '3depth 제목',    class: 'yds-main-menu__sub-title',   krdsClass: 'sub-title',        description: '3depth 섹션 제목', confirmed: true },
    { element: '3depth 콘텐츠',  class: 'yds-main-menu__sub-content', krdsClass: 'gnb-sub-content',  description: '3depth 링크 그리드 영역', confirmed: true },
    { element: '3depth 링크',    class: 'yds-main-menu__sub-link',    krdsClass: '(자체 추가)',      description: '3depth 개별 링크/버튼', confirmed: true },
    { element: 'GNB 배너',       class: 'yds-main-menu__sub-banner',  krdsClass: 'gnb-sub-banner',   description: '3depth 배너 영역 (선택)', confirmed: true },
    { element: '백드롭',         class: 'yds-main-menu__backdrop',    krdsClass: 'gnb-backdrop',     description: 'GNB 열림 시 배경 딤 레이어', confirmed: true },
  ],

  modifiers: [
    { category: 'PC GNB 1depth',   class: 'yds-main-menu__trigger--link',        krdsClass: 'gnb-main-trigger is-link',  description: '링크 직접 이동 (화살표 없음)', confirmed: true },
    { category: 'PC GNB 1depth',   class: 'yds-main-menu__trigger--open',        krdsClass: 'gnb-main-trigger active',   description: '1depth 메뉴 열림 상태', confirmed: true },
    { category: 'PC GNB 드롭다운', class: 'yds-main-menu__dropdown--open',       krdsClass: 'gnb-toggle-wrap is-open',   description: '드롭다운 패널 열림', confirmed: true },
    { category: 'PC GNB 2depth',   class: 'yds-main-menu__sub-trigger--link',    krdsClass: 'gnb-sub-trigger is-link',   description: '2depth 직접 링크 (more 아이콘)', confirmed: true },
    { category: 'PC GNB 2depth',   class: 'yds-main-menu__sub-trigger--open',    krdsClass: 'gnb-sub-trigger active',    description: '2depth 선택 상태', confirmed: true },
    { category: 'PC GNB 3depth',   class: 'yds-main-menu__sub-list--open',       krdsClass: 'gnb-sub-list active',       description: '3depth 패널 표시 상태', confirmed: true },
    { category: 'PC GNB 3depth',   class: 'yds-main-menu__sub-list--single',     krdsClass: 'gnb-sub-list single-list',  description: '2depth 없이 3depth 바로 표시', confirmed: true },
    { category: 'PC GNB 3depth',   class: 'yds-main-menu__sub-link--current',    krdsClass: 'selected',                  description: '현재 페이지 링크 (aria-current="page" 필수)', confirmed: true },
    { category: '백드롭',          class: 'yds-main-menu__backdrop--open',        krdsClass: 'gnb-backdrop active',       description: '딤 레이어 표시 상태', confirmed: true },
  ],

  codeExample: `<!-- PC GNB 3depth 현재 페이지 -->
<a href="#" class="yds-main-menu__sub-link yds-main-menu__sub-link--current" aria-current="page">비전 및 목표</a>`,
};

// ─── 모바일 GNB (Main Menu Mobile) ────────────────────────────────────────────

export const mobileGnbNaming = {
  name: '메인 메뉴 (모바일)',
  englishName: 'Main Menu Mobile',
  sbPath: '패턴/기본 레이아웃',
  baseClass: 'yds-main-menu-mobile',
  krdsClass: 'yds-main-menu-mobile',
  description: '모바일용 글로벌 내비게이션 메뉴 (슬라이드 패널)',

  structure: `#mobile-nav.yds-main-menu-mobile [--open/--backdrop]
└── .yds-main-menu-mobile__panel
    ├── .yds-main-menu-mobile__header
    │   ├── .yds-main-menu-mobile__utils > ul.yds-utility-list.yds-utility-list--start
    │   ├── .yds-main-menu-mobile__login
    │   └── .yds-main-menu-mobile__service-menu
    │       └── a.yds-main-menu-mobile__service-link
    ├── .yds-main-menu-mobile__body
    │   └── .yds-main-menu-mobile__menu
    │       ├── .yds-main-menu-mobile__nav-list
    │       │   └── a.yds-main-menu-mobile__trigger [--open]
    │       └── .yds-main-menu-mobile__sub-panel
    │           └── .yds-main-menu-mobile__sub-list [--open]
    │               └── a.yds-main-menu-mobile__sub-trigger [--current]
    └── .yds-main-menu-mobile__bottom`,

  elements: [
    { element: '모바일 GNB',             class: 'yds-main-menu-mobile',                    krdsClass: 'yds-main-menu-mobile', description: '모바일 GNB 래퍼 (position fixed)', confirmed: true },
    { element: '패널',                   class: 'yds-main-menu-mobile__panel',             krdsClass: 'gnb-wrap',            description: '슬라이드 흰 패널', confirmed: true },
    { element: '헤더',                   class: 'yds-main-menu-mobile__header',            krdsClass: 'gnb-header',          description: '상단 유틸리티·로그인·서비스 메뉴', confirmed: true },
    { element: '유틸리티 래퍼',          class: 'yds-main-menu-mobile__utils',             krdsClass: 'gnb-utils',           description: '유틸리티 목록 래퍼 (yds-utility-list--start와 조합)', confirmed: true },
    { element: '로그인 영역',            class: 'yds-main-menu-mobile__login',             krdsClass: 'gnb-login',           description: '로그인 상태 표시 영역', confirmed: true },
    { element: '서비스 메뉴',            class: 'yds-main-menu-mobile__service-menu',      krdsClass: 'gnb-service-menu',    description: '주요 서비스 바로가기 목록', confirmed: true },
    { element: '서비스 링크',            class: 'yds-main-menu-mobile__service-link',      krdsClass: 'link',                description: '서비스 바로가기 링크', confirmed: true },
    { element: 'GNB 본문',               class: 'yds-main-menu-mobile__body',              krdsClass: 'gnb-body',            description: '1depth/2depth 메뉴 스크롤 영역', confirmed: true },
    { element: '메뉴 래퍼',              class: 'yds-main-menu-mobile__menu',              krdsClass: 'gnb-menu',            description: '좌(1depth) + 우(2depth) 레이아웃', confirmed: true },
    { element: '1depth 탭 목록',         class: 'yds-main-menu-mobile__nav-list',          krdsClass: 'menu-wrap',           description: '왼쪽 1depth 탭 목록 래퍼', confirmed: true },
    { element: '1depth 트리거 (모바일)', class: 'yds-main-menu-mobile__trigger',           krdsClass: 'gnb-main-trigger',    description: '1depth 탭 링크', confirmed: true },
    { element: '2depth 패널',            class: 'yds-main-menu-mobile__sub-panel',         krdsClass: 'submenu-wrap',        description: '오른쪽 2depth 콘텐츠 패널', confirmed: true },
    { element: '2depth 목록',            class: 'yds-main-menu-mobile__sub-list',          krdsClass: 'gnb-sub-list',        description: '2depth 항목 목록', confirmed: true },
    { element: '2depth 제목',            class: 'yds-main-menu-mobile__sub-title',         krdsClass: 'sub-title',           description: '2depth 섹션 제목', confirmed: true },
    { element: '2depth 링크',            class: 'yds-main-menu-mobile__sub-trigger',       krdsClass: 'gnb-sub-trigger',     description: '2depth 링크/버튼', confirmed: true },
    { element: 'GNB 하단',              class: 'yds-main-menu-mobile__bottom',            krdsClass: 'gnb-bottom',          description: '하단 추가 링크 영역', confirmed: true },
  ],

  modifiers: [
    { category: '모바일 GNB',    class: 'yds-main-menu-mobile--open',                krdsClass: 'yds-main-menu-mobile is-open',      description: '패널 슬라이드 인 (right: 0)', confirmed: true },
    { category: '모바일 GNB',    class: 'yds-main-menu-mobile--backdrop',            krdsClass: 'yds-main-menu-mobile is-backdrop',  description: '딤 오버레이 표시', confirmed: true },
    { category: '모바일 1depth', class: 'yds-main-menu-mobile__trigger--open',       krdsClass: 'gnb-main-trigger active',          description: '1depth 탭 선택 상태', confirmed: true },
    { category: '모바일 2depth', class: 'yds-main-menu-mobile__sub-list--open',      krdsClass: 'gnb-sub-list active',              description: '2depth 목록 표시 상태', confirmed: true },
    { category: '모바일 2depth', class: 'yds-main-menu-mobile__sub-trigger--current',krdsClass: 'gnb-sub-trigger selected',         description: '현재 페이지 링크 (aria-current="page" 필수)', confirmed: true },
  ],

  codeExample: `<div id="mobile-nav" class="yds-main-menu-mobile" aria-hidden="true">
  <div class="yds-main-menu-mobile__panel">
    <div class="yds-main-menu-mobile__header">
      <div class="yds-main-menu-mobile__utils">
        <ul class="yds-utility-list yds-utility-list--start">
          <li><a href="#">로그인</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>`,
};

// ─── 푸터 (Footer) ─────────────────────────────────────────────────────────────

export const footerNaming = {
  name: '푸터',
  englishName: 'Footer',
  sbPath: '패턴/기본 레이아웃',
  baseClass: 'yds-footer',
  krdsClass: '(KRDS 전역)',
  description: '사이트 최하단 글로벌 푸터',

  structure: `#yds-footer
├── .yds-footer__quick > .yds-footer__quick-link
└── .yds-container
    ├── .yds-footer__logo
    ├── .yds-footer__content
    │   ├── .yds-footer__info
    │   │   ├── .yds-footer__address
    │   │   └── ul.yds-footer__contact
    │   └── .yds-footer__links
    │       ├── .yds-footer__shortcuts
    │       └── ul.yds-footer__sns
    │           └── li.yds-footer__sns-item [--instagram/--youtube/--x/--facebook/--blog]
    └── .yds-footer__bottom
        └── .yds-footer__bottom-text
            ├── .yds-footer__menu
            │   └── a.yds-footer__menu-link [--emphasis]
            └── .yds-footer__copyright`,

  elements: [
    { element: '빠른 링크 바',   class: 'yds-footer__quick',         krdsClass: 'foot-quick',  description: '관련 사이트 빠른 링크 바', confirmed: true },
    { element: '빠른 링크',      class: 'yds-footer__quick-link',    krdsClass: 'link',         description: '빠른 링크 버튼/링크', confirmed: true },
    { element: '로고',           class: 'yds-footer__logo',          krdsClass: 'f-logo',       description: '푸터 로고', confirmed: true },
    { element: '콘텐츠',         class: 'yds-footer__content',       krdsClass: 'f-cnt',        description: '기관 정보 + 관련 링크 영역', confirmed: true },
    { element: '기관 정보',      class: 'yds-footer__info',          krdsClass: 'f-info',       description: '주소·연락처 등 기관 정보', confirmed: true },
    { element: '주소',           class: 'yds-footer__address',       krdsClass: 'info-addr',    description: '기관 주소', confirmed: true },
    { element: '연락처',         class: 'yds-footer__contact',       krdsClass: 'info-cs',      description: '전화·팩스 등 연락처 목록', confirmed: true },
    { element: '관련 링크',      class: 'yds-footer__links',         krdsClass: 'f-link',       description: '바로가기·SNS 링크 영역', confirmed: true },
    { element: '바로가기',       class: 'yds-footer__shortcuts',     krdsClass: 'link-go',      description: '관련 사이트 바로가기 목록', confirmed: true },
    { element: 'SNS 목록',       class: 'yds-footer__sns',           krdsClass: 'link-sns',     description: 'SNS 아이콘 링크 목록', confirmed: true },
    { element: 'SNS 항목',       class: 'yds-footer__sns-item',      krdsClass: '(자체 추가)',  description: '개별 SNS 항목 li. 플랫폼 modifier 필수', confirmed: true },
    { element: '하단 영역',      class: 'yds-footer__bottom',        krdsClass: 'f-btm',        description: '하단 메뉴·저작권 영역', confirmed: true },
    { element: '하단 텍스트 행', class: 'yds-footer__bottom-text',   krdsClass: 'f-btm-text',   description: '하단 메뉴와 저작권을 가로 배치하는 행', confirmed: true },
    { element: '하단 메뉴',      class: 'yds-footer__menu',          krdsClass: 'f-menu',       description: '개인정보처리방침 등 하단 링크 목록', confirmed: true },
    { element: '하단 링크',      class: 'yds-footer__menu-link',     krdsClass: '(자체 추가)',  description: '하단 메뉴 개별 링크', confirmed: true },
    { element: '저작권',         class: 'yds-footer__copyright',     krdsClass: 'f-copy',       description: '저작권 문구', confirmed: true },
  ],

  modifiers: [
    { category: 'SNS 종류',  class: 'yds-footer__sns-item--instagram', krdsClass: 'instagram', description: '인스타그램', confirmed: true },
    { category: 'SNS 종류',  class: 'yds-footer__sns-item--youtube',   krdsClass: 'youtube',   description: '유튜브', confirmed: true },
    { category: 'SNS 종류',  class: 'yds-footer__sns-item--x',         krdsClass: 'x',         description: 'X (트위터)', confirmed: true },
    { category: 'SNS 종류',  class: 'yds-footer__sns-item--facebook',  krdsClass: 'facebook',  description: '페이스북', confirmed: true },
    { category: 'SNS 종류',  class: 'yds-footer__sns-item--blog',      krdsClass: 'blog',      description: '블로그', confirmed: true },
    { category: '하단 링크', class: 'yds-footer__menu-link--emphasis', krdsClass: 'point',     description: '강조 링크 (굵게)', confirmed: true },
  ],

  codeExample: `<!-- 푸터 하단 강조 링크 -->
<a href="#" class="yds-footer__menu-link yds-footer__menu-link--emphasis">개인정보처리방침</a>`,
};

// ─── 레이아웃 (Layout) ─────────────────────────────────────────────────────

export const layoutNaming = {
  name: '레이아웃',
  englishName: 'Layout',
  sbPath: '패턴/기본 레이아웃',
  baseClass: 'yds-header / yds-main-menu / yds-main-menu-mobile / yds-footer',
  krdsClass: 'header-container / gnb-* / yds-main-menu-mobile / foot-*',
  description: '헤더·GNB·모바일 GNB·푸터로 구성된 사이트 전체 레이아웃',

  structure: `#yds-header
├── .yds-header__inner
│   ├── .yds-header__container > .yds-container
│   │   ├── .yds-header__utility > ul.yds-utility-list
│   │   └── .yds-header__branding
│   │       ├── h1.yds-header__logo
│   │       └── .yds-header__actions
│   │           └── button.yds-header__action-btn [--search/--login/--join/--mypage/--all-menu]
│   ├── nav.yds-main-menu
│   │   └── ul.yds-main-menu__list
│   │       └── li > button.yds-main-menu__trigger [--link/--open]
│   │           └── .yds-main-menu__dropdown [--open]
│   │               └── .yds-main-menu__panel
│   │                   └── button.yds-main-menu__sub-trigger [--link/--open]
│   │                       └── .yds-main-menu__sub-list [--open/--single]
│   │                           └── .yds-main-menu__sub-content
│   │                               └── a.yds-main-menu__sub-link [--current]
│   └── .yds-main-menu__backdrop [--open]
└── #mobile-nav.yds-main-menu-mobile [--open/--backdrop]
    └── .yds-main-menu-mobile__panel
        ├── .yds-main-menu-mobile__header
        │   └── ul.yds-utility-list.yds-utility-list--start
        ├── .yds-main-menu-mobile__body
        │   ├── .yds-main-menu-mobile__nav-list
        │   │   └── a.yds-main-menu-mobile__trigger [--open]
        │   └── .yds-main-menu-mobile__sub-panel
        │       └── .yds-main-menu-mobile__sub-list [--open]
        │           └── a.yds-main-menu-mobile__sub-trigger [--current]
        └── .yds-main-menu-mobile__bottom

#yds-footer
├── .yds-footer__quick > .yds-footer__quick-link
└── .yds-container
    ├── .yds-footer__logo
    ├── .yds-footer__content
    │   ├── .yds-footer__info
    │   │   ├── .yds-footer__address
    │   │   └── ul.yds-footer__contact
    │   └── .yds-footer__links
    │       ├── .yds-footer__shortcuts
    │       └── ul.yds-footer__sns
    │           └── li.yds-footer__sns-item [--instagram/--youtube/--x/--facebook/--blog]
    └── .yds-footer__bottom
        └── .yds-footer__bottom-text
            ├── .yds-footer__menu
            │   └── a.yds-footer__menu-link [--emphasis]
            └── .yds-footer__copyright`,

  elements: [
    // 공용
    { element: '컨테이너',        class: 'yds-container',                      krdsClass: 'inner',              description: '최대 너비 + 좌우 패딩 가운데 정렬 컨테이너 (KRDS .inner 대체)', confirmed: true },
    { element: '유틸리티 목록',   class: 'yds-utility-list',                  krdsClass: 'utility-list',      description: '헤더/모바일 GNB 공용 링크 목록 (기본: 우측 정렬)', confirmed: true },
    // 헤더
    { element: '헤더 내부',       class: 'yds-header__inner',                  krdsClass: 'header-in',         description: '헤더 전체 래퍼', confirmed: true },
    { element: '헤더 컨테이너',   class: 'yds-header__container',              krdsClass: 'header-container',  description: '유틸리티 바 + 브랜딩 영역', confirmed: true },
    { element: '유틸리티 영역',   class: 'yds-header__utility',                krdsClass: 'header-utility',    description: '상단 유틸리티 링크 영역 (PC 전용)', confirmed: true },
    { element: '브랜딩',          class: 'yds-header__branding',               krdsClass: 'header-branding',   description: '로고 + 액션 버튼 행', confirmed: true },
    { element: '로고',            class: 'yds-header__logo',                   krdsClass: 'logo',              description: '헤더 로고 (h1 또는 h2)', confirmed: true },
    { element: '액션 버튼 그룹',  class: 'yds-header__actions',                krdsClass: 'header-actions',    description: '오른쪽 액션 버튼 그룹', confirmed: true },
    { element: '액션 버튼',       class: 'yds-header__action-btn',             krdsClass: 'btn-navi',          description: '아이콘+텍스트 형태의 헤더 버튼. 종류 modifier 필수', confirmed: true },
    // PC GNB
    { element: 'PC GNB',          class: 'yds-main-menu',                      krdsClass: 'yds-main-menu',      description: 'PC GNB 래퍼 (nav 요소)', confirmed: true },
    { element: '1depth 목록',     class: 'yds-main-menu__list',                krdsClass: 'gnb-menu',          description: '1depth 항목 ul 목록', confirmed: true },
    { element: '1depth 트리거',   class: 'yds-main-menu__trigger',             krdsClass: 'gnb-main-trigger',  description: '1depth 버튼 또는 링크', confirmed: true },
    { element: '드롭다운',        class: 'yds-main-menu__dropdown',            krdsClass: 'gnb-toggle-wrap',   description: '드롭다운 패널 (기본 숨김)', confirmed: true },
    { element: '드롭다운 내부',   class: 'yds-main-menu__panel',               krdsClass: 'gnb-main-list',     description: '2depth 목록 컨테이너', confirmed: true },
    { element: '2depth 트리거',   class: 'yds-main-menu__sub-trigger',         krdsClass: 'gnb-sub-trigger',   description: '2depth 버튼 또는 링크', confirmed: true },
    { element: '3depth 목록',     class: 'yds-main-menu__sub-list',            krdsClass: 'gnb-sub-list',      description: '3depth 패널', confirmed: true },
    { element: '3depth 제목',     class: 'yds-main-menu__sub-title',           krdsClass: 'sub-title',         description: '3depth 섹션 제목', confirmed: true },
    { element: '3depth 콘텐츠',   class: 'yds-main-menu__sub-content',         krdsClass: 'gnb-sub-content',   description: '3depth 링크 그리드 영역', confirmed: true },
    { element: '3depth 링크',     class: 'yds-main-menu__sub-link',            krdsClass: '(자체 추가)',       description: '3depth 개별 링크/버튼', confirmed: true },
    { element: 'GNB 배너',        class: 'yds-main-menu__sub-banner',          krdsClass: 'gnb-sub-banner',    description: '3depth 배너 영역 (선택)', confirmed: true },
    { element: '백드롭',          class: 'yds-main-menu__backdrop',            krdsClass: 'gnb-backdrop',      description: 'GNB 열림 시 배경 딤 레이어', confirmed: true },
    // 모바일 GNB
    { element: '모바일 GNB',              class: 'yds-main-menu-mobile',                    krdsClass: 'yds-main-menu-mobile',  description: '모바일 GNB 래퍼 (position fixed)', confirmed: true },
    { element: '패널',                    class: 'yds-main-menu-mobile__panel',             krdsClass: 'gnb-wrap',             description: '슬라이드 흰 패널', confirmed: true },
    { element: '헤더',                    class: 'yds-main-menu-mobile__header',            krdsClass: 'gnb-header',           description: '상단 유틸리티·로그인·서비스 메뉴', confirmed: true },
    { element: '유틸리티 래퍼',           class: 'yds-main-menu-mobile__utils',             krdsClass: 'gnb-utils',            description: '유틸리티 목록 래퍼 (yds-utility-list--start와 조합)', confirmed: true },
    { element: '로그인 영역',             class: 'yds-main-menu-mobile__login',             krdsClass: 'gnb-login',            description: '로그인 상태 표시 영역', confirmed: true },
    { element: '서비스 메뉴',             class: 'yds-main-menu-mobile__service-menu',      krdsClass: 'gnb-service-menu',     description: '주요 서비스 바로가기 목록', confirmed: true },
    { element: '서비스 링크',             class: 'yds-main-menu-mobile__service-link',      krdsClass: 'link',                 description: '서비스 바로가기 링크', confirmed: true },
    { element: 'GNB 본문',                class: 'yds-main-menu-mobile__body',              krdsClass: 'gnb-body',             description: '1depth/2depth 메뉴 스크롤 영역', confirmed: true },
    { element: '메뉴 래퍼',               class: 'yds-main-menu-mobile__menu',              krdsClass: 'gnb-menu',             description: '좌(1depth) + 우(2depth) 레이아웃', confirmed: true },
    { element: '1depth 탭 목록',          class: 'yds-main-menu-mobile__nav-list',          krdsClass: 'menu-wrap',            description: '왼쪽 1depth 탭 목록 래퍼', confirmed: true },
    { element: '1depth 트리거 (모바일)',  class: 'yds-main-menu-mobile__trigger',           krdsClass: 'gnb-main-trigger',     description: '1depth 탭 링크', confirmed: true },
    { element: '2depth 패널',             class: 'yds-main-menu-mobile__sub-panel',         krdsClass: 'submenu-wrap',         description: '오른쪽 2depth 콘텐츠 패널', confirmed: true },
    { element: '2depth 목록',             class: 'yds-main-menu-mobile__sub-list',          krdsClass: 'gnb-sub-list',         description: '2depth 항목 목록', confirmed: true },
    { element: '2depth 제목',             class: 'yds-main-menu-mobile__sub-title',         krdsClass: 'sub-title',            description: '2depth 섹션 제목', confirmed: true },
    { element: '2depth 링크',             class: 'yds-main-menu-mobile__sub-trigger',       krdsClass: 'gnb-sub-trigger',      description: '2depth 링크/버튼', confirmed: true },
    { element: 'GNB 하단',                class: 'yds-main-menu-mobile__bottom',            krdsClass: 'gnb-bottom',           description: '하단 추가 링크 영역', confirmed: true },
    // 푸터
    { element: '빠른 링크 바',    class: 'yds-footer__quick',           krdsClass: 'foot-quick',     description: '관련 사이트 빠른 링크 바', confirmed: true },
    { element: '빠른 링크',       class: 'yds-footer__quick-link',      krdsClass: 'link',           description: '빠른 링크 버튼/링크', confirmed: true },
    { element: '로고',            class: 'yds-footer__logo',            krdsClass: 'f-logo',         description: '푸터 로고', confirmed: true },
    { element: '콘텐츠',          class: 'yds-footer__content',         krdsClass: 'f-cnt',          description: '기관 정보 + 관련 링크 영역', confirmed: true },
    { element: '기관 정보',       class: 'yds-footer__info',            krdsClass: 'f-info',         description: '주소·연락처 등 기관 정보', confirmed: true },
    { element: '주소',            class: 'yds-footer__address',         krdsClass: 'info-addr',      description: '기관 주소', confirmed: true },
    { element: '연락처',          class: 'yds-footer__contact',         krdsClass: 'info-cs',        description: '전화·팩스 등 연락처 목록', confirmed: true },
    { element: '관련 링크',       class: 'yds-footer__links',           krdsClass: 'f-link',         description: '바로가기·SNS 링크 영역', confirmed: true },
    { element: '바로가기',        class: 'yds-footer__shortcuts',       krdsClass: 'link-go',        description: '관련 사이트 바로가기 목록', confirmed: true },
    { element: 'SNS 목록',        class: 'yds-footer__sns',             krdsClass: 'link-sns',       description: 'SNS 아이콘 링크 목록', confirmed: true },
    { element: 'SNS 항목',        class: 'yds-footer__sns-item',        krdsClass: '(자체 추가)',    description: '개별 SNS 항목 li. 플랫폼 modifier 필수', confirmed: true },
    { element: '하단 영역',       class: 'yds-footer__bottom',          krdsClass: 'f-btm',          description: '하단 메뉴·저작권 영역', confirmed: true },
    { element: '하단 텍스트 행',  class: 'yds-footer__bottom-text',     krdsClass: 'f-btm-text',     description: '하단 메뉴와 저작권을 가로 배치하는 행', confirmed: true },
    { element: '하단 메뉴',       class: 'yds-footer__menu',            krdsClass: 'f-menu',         description: '개인정보처리방침 등 하단 링크 목록', confirmed: true },
    { element: '하단 링크',       class: 'yds-footer__menu-link',       krdsClass: '(자체 추가)',    description: '하단 메뉴 개별 링크', confirmed: true },
    { element: '저작권',          class: 'yds-footer__copyright',       krdsClass: 'f-copy',         description: '저작권 문구', confirmed: true },
  ],

  modifiers: [
    // 유틸리티 목록
    { category: '정렬',          class: 'yds-utility-list yds-utility-list--start',                      krdsClass: '(자체 추가)',                description: '좌측 정렬 (모바일 GNB 내부)', confirmed: true },
    // 헤더 액션 버튼
    { category: '액션 버튼 종류', class: 'yds-header__action-btn yds-header__action-btn--search',         krdsClass: 'btn-navi sch',               description: '검색 버튼', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn yds-header__action-btn--login',          krdsClass: 'btn-navi login',             description: '로그인 버튼/링크', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn yds-header__action-btn--join',           krdsClass: 'btn-navi join',              description: '회원가입 버튼 (PC 전용)', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn yds-header__action-btn--mypage',         krdsClass: 'btn-navi my',                description: '나의GOV 버튼 (로그인 후, PC 전용)', confirmed: true },
    { category: '액션 버튼 종류', class: 'yds-header__action-btn yds-header__action-btn--all-menu',       krdsClass: 'btn-navi all',               description: '전체메뉴 버튼 (모바일 전용)', confirmed: true },
    // PC GNB 상태
    { category: 'PC GNB 1depth', class: 'yds-main-menu__trigger yds-main-menu__trigger--link',           krdsClass: 'gnb-main-trigger is-link',   description: '링크 직접 이동 (화살표 없음)', confirmed: true },
    { category: 'PC GNB 1depth', class: 'yds-main-menu__trigger yds-main-menu__trigger--open',           krdsClass: 'gnb-main-trigger active',    description: '1depth 메뉴 열림 상태', confirmed: true },
    { category: 'PC GNB 드롭다운', class: 'yds-main-menu__dropdown yds-main-menu__dropdown--open',       krdsClass: 'gnb-toggle-wrap is-open',    description: '드롭다운 패널 열림', confirmed: true },
    { category: 'PC GNB 2depth', class: 'yds-main-menu__sub-trigger yds-main-menu__sub-trigger--link',   krdsClass: 'gnb-sub-trigger is-link',    description: '2depth 직접 링크 (more 아이콘)', confirmed: true },
    { category: 'PC GNB 2depth', class: 'yds-main-menu__sub-trigger yds-main-menu__sub-trigger--open',   krdsClass: 'gnb-sub-trigger active',     description: '2depth 선택 상태', confirmed: true },
    { category: 'PC GNB 3depth', class: 'yds-main-menu__sub-list yds-main-menu__sub-list--open',         krdsClass: 'gnb-sub-list active',        description: '3depth 패널 표시 상태', confirmed: true },
    { category: 'PC GNB 3depth', class: 'yds-main-menu__sub-list yds-main-menu__sub-list--single',       krdsClass: 'gnb-sub-list single-list',   description: '2depth 없이 3depth 바로 표시', confirmed: true },
    { category: 'PC GNB 3depth', class: 'yds-main-menu__sub-link yds-main-menu__sub-link--current',      krdsClass: 'selected',                   description: '현재 페이지 링크 (aria-current="page" 필수)', confirmed: true },
    { category: '백드롭',        class: 'yds-main-menu__backdrop yds-main-menu__backdrop--open',         krdsClass: 'gnb-backdrop active',        description: '딤 레이어 표시 상태', confirmed: true },
    // 모바일 GNB 상태
    { category: '모바일 GNB',    class: 'yds-main-menu-mobile yds-main-menu-mobile--open',                krdsClass: 'yds-main-menu-mobile is-open',           description: '패널 슬라이드 인 (right: 0)', confirmed: true },
    { category: '모바일 GNB',    class: 'yds-main-menu-mobile yds-main-menu-mobile--backdrop',            krdsClass: 'yds-main-menu-mobile is-backdrop',       description: '딤 오버레이 표시', confirmed: true },
    { category: '모바일 1depth', class: 'yds-main-menu-mobile__trigger yds-main-menu-mobile__trigger--open', krdsClass: 'gnb-main-trigger active',          description: '1depth 탭 선택 상태', confirmed: true },
    { category: '모바일 2depth', class: 'yds-main-menu-mobile__sub-list yds-main-menu-mobile__sub-list--open', krdsClass: 'gnb-sub-list active',         description: '2depth 목록 표시 상태', confirmed: true },
    { category: '모바일 2depth', class: 'yds-main-menu-mobile__sub-trigger yds-main-menu-mobile__sub-trigger--current', krdsClass: 'gnb-sub-trigger selected', description: '현재 페이지 링크 (aria-current="page" 필수)', confirmed: true },
    // 푸터
    { category: 'SNS 종류',      class: 'yds-footer__sns-item yds-footer__sns-item--instagram',          krdsClass: 'instagram',                  description: '인스타그램', confirmed: true },
    { category: 'SNS 종류',      class: 'yds-footer__sns-item yds-footer__sns-item--youtube',            krdsClass: 'youtube',                    description: '유튜브', confirmed: true },
    { category: 'SNS 종류',      class: 'yds-footer__sns-item yds-footer__sns-item--x',                 krdsClass: 'x',                          description: 'X (트위터)', confirmed: true },
    { category: 'SNS 종류',      class: 'yds-footer__sns-item yds-footer__sns-item--facebook',          krdsClass: 'facebook',                   description: '페이스북', confirmed: true },
    { category: 'SNS 종류',      class: 'yds-footer__sns-item yds-footer__sns-item--blog',              krdsClass: 'blog',                       description: '블로그', confirmed: true },
    { category: '하단 링크',     class: 'yds-footer__menu-link yds-footer__menu-link--emphasis',        krdsClass: 'point',                      description: '강조 링크 (굵게)', confirmed: true },
  ],

  codeExample: `<!-- 헤더 액션 버튼 -->
<div class="yds-header__actions">
  <button type="button" class="yds-header__action-btn yds-header__action-btn--search">통합검색</button>
  <a href="#" class="yds-header__action-btn yds-header__action-btn--login">로그인</a>
  <button type="button" class="yds-header__action-btn yds-header__action-btn--all-menu"
          aria-controls="mobile-nav" aria-expanded="false">전체메뉴</button>
</div>

<!-- 유틸리티 목록 (헤더: 우측 정렬) -->
<ul class="yds-utility-list">
  <li><a href="#">공지사항</a></li>
</ul>

<!-- 유틸리티 목록 (모바일 GNB: 좌측 정렬) -->
<ul class="yds-utility-list yds-utility-list--start">
  <li><a href="#">로그인</a></li>
</ul>

<!-- PC GNB 3depth 현재 페이지 -->
<a href="#" class="yds-main-menu__sub-link yds-main-menu__sub-link--current" aria-current="page">비전 및 목표</a>

<!-- 푸터 하단 강조 링크 -->
<a href="#" class="yds-footer__menu-link yds-footer__menu-link--emphasis">개인정보처리방침</a>`,
};

// ─── 카드 (Card) ─────────────────────────────────────────────────────────────

export const cardNaming = {
  name: '카드',
  englishName: 'Card',
  sbPath: '컴포넌트/레이아웃 및 표현/카드',
  baseClass: 'yds-card',
  krdsClass: '(자체 추가)',
  description: '이미지·제목·설명·액션을 묶어 하나의 콘텐츠 단위로 표시하는 컴포넌트',

  structure: `article.yds-card [--horizontal] [--border] [--link]
├── div.yds-card__media
│   └── div.yds-image.yds-image--{비율}
│       └── img.yds-image__img
└── div.yds-card__body
    ├── p.yds-card__meta
    ├── h3.yds-card__title  [a href]
    ├── p.yds-card__desc
    └── div.yds-card__actions

목록:
ul.yds-card-list
└── li > article.yds-card`,

  elements: [
    { element: '카드',      class: 'yds-card',          krdsClass: '(자체 추가)', description: '카드 루트 요소. shadow-s, radius-m 기본 적용. hover 시 shadow-m', confirmed: true },
    { element: '미디어',    class: 'yds-card__media',   krdsClass: '(자체 추가)', description: '이미지 영역. yds-image 컴포넌트를 자식으로 사용',                  confirmed: true },
    { element: '본문',      class: 'yds-card__body',    krdsClass: '(자체 추가)', description: '텍스트 콘텐츠 영역. padding-m, gap-s 적용',                       confirmed: true },
    { element: '메타',      class: 'yds-card__meta',    krdsClass: '(자체 추가)', description: '카테고리·날짜 등 보조 정보. 소형 텍스트, 보조 색상',              confirmed: true },
    { element: '제목',      class: 'yds-card__title',   krdsClass: '(자체 추가)', description: '카드 제목. 적절한 헤딩 레벨 사용. --link 시 a 태그로 감쌈',      confirmed: true },
    { element: '설명',      class: 'yds-card__desc',    krdsClass: '(자체 추가)', description: '카드 본문 설명 텍스트',                                            confirmed: true },
    { element: '액션',      class: 'yds-card__actions', krdsClass: '(자체 추가)', description: '버튼 등 액션 요소 묶음. margin-top: auto로 하단 정렬',             confirmed: true },
    { element: '카드 목록', class: 'yds-card-list',     krdsClass: '(자체 추가)', description: '카드 3열 그리드 목록. 모바일(max-width:1279px)에서 1열로 전환',   confirmed: true },
  ],

  modifiers: [
    { category: '방향', class: 'yds-card--horizontal', krdsClass: '(자체 추가)', description: '가로형. 이미지(22rem 고정)가 왼쪽, 본문이 오른쪽에 배치. 모바일에서 세로 전환', confirmed: true },
    { category: '스타일', class: 'yds-card--border',   krdsClass: '(자체 추가)', description: '테두리형. 그림자 없이 border로 구분. hover 시 테두리 색이 진해짐', confirmed: true },
    { category: '동작', class: 'yds-card--link',       krdsClass: '(자체 추가)', description: '제목 a 태그의 ::after로 카드 전체를 클릭 영역으로 확장',           confirmed: true },
  ],

  codeExample: `<!-- 기본 카드 -->
<article class="yds-card">
  <div class="yds-card__media">
    <div class="yds-image yds-image--16x9">
      <img class="yds-image__img" src="thumb.jpg" alt="썸네일 설명">
    </div>
  </div>
  <div class="yds-card__body">
    <p class="yds-card__meta">공지사항 · 2026.11.05</p>
    <h3 class="yds-card__title">카드 제목</h3>
    <p class="yds-card__desc">카드 설명 텍스트입니다.</p>
  </div>
</article>

<!-- 링크 카드 (전체 클릭 영역) -->
<article class="yds-card yds-card--link">
  <div class="yds-card__media">
    <div class="yds-image yds-image--16x9">
      <img class="yds-image__img" src="thumb.jpg" alt="">
    </div>
  </div>
  <div class="yds-card__body">
    <p class="yds-card__meta">자료실</p>
    <h3 class="yds-card__title"><a href="/detail">카드 제목</a></h3>
    <p class="yds-card__desc">카드 설명 텍스트입니다.</p>
  </div>
</article>

<!-- 카드 목록 (3열 그리드) -->
<ul class="yds-card-list">
  <li><article class="yds-card yds-card--link">...</article></li>
  <li><article class="yds-card yds-card--link">...</article></li>
  <li><article class="yds-card yds-card--link">...</article></li>
</ul>`,
};

// ─── 이미지 (Image) ──────────────────────────────────────────────────────────

export const thumbnailNaming = {
  name: '썸네일',
  englishName: 'Thumbnail',
  sbPath: '컴포넌트/레이아웃 및 표현/썸네일',
  baseClass: 'yds-thumbnail',
  krdsClass: '(KRDS 이미지 기준 적용, 라벨·배지·크기 modifier는 자체 추가)',
  description: '비율·크기 고정 이미지 컴포넌트. 라벨·배지 오버레이 자리 및 빈 상태 제공',

  structure: `div.yds-thumbnail [yds-thumbnail--비율] [yds-thumbnail--크기] [yds-thumbnail--circle] [yds-thumbnail--empty]
├── img.yds-thumbnail__img
├── span.yds-thumbnail__label  (선택 — 왼쪽 위 오버레이)
└── span.yds-thumbnail__badge  (선택 — 오른쪽 위 오버레이)`,

  elements: [
    { element: '썸네일 래퍼',  class: 'yds-thumbnail',         krdsClass: '(KRDS 이미지 기준)', description: '비율·크기·모양 modifier와 함께 사용. position: relative',       confirmed: true },
    { element: '이미지',       class: 'yds-thumbnail__img',    krdsClass: '(KRDS 이미지 기준)', description: 'img 태그. object-fit: cover. alt 필수',                        confirmed: true },
    { element: '라벨 자리',    class: 'yds-thumbnail__label',  krdsClass: '(자체 추가)',         description: '왼쪽 위 절대 위치 오버레이. 배지·태그 등 임의 콘텐츠를 담음',  confirmed: true },
    { element: '배지 자리',    class: 'yds-thumbnail__badge',  krdsClass: '(자체 추가)',         description: '오른쪽 위 절대 위치 오버레이. 카운트 배지 등을 담음',           confirmed: true },
  ],

  modifiers: [
    { category: '비율', class: 'yds-thumbnail--1x1',    krdsClass: '(자체 추가)', description: '1:1 정방형 (기본 비율)',    confirmed: true },
    { category: '비율', class: 'yds-thumbnail--4x3',    krdsClass: '(자체 추가)', description: '4:3',                       confirmed: true },
    { category: '비율', class: 'yds-thumbnail--16x9',   krdsClass: '(자체 추가)', description: '16:9 (와이드)',              confirmed: true },
    { category: '모양', class: 'yds-thumbnail--circle', krdsClass: '(자체 추가)', description: '원형. --1x1 비율과 함께 사용', confirmed: true },
    { category: '크기', class: 'yds-thumbnail--xs',     krdsClass: '(자체 추가)', description: '56px 고정 너비',             confirmed: true },
    { category: '크기', class: 'yds-thumbnail--s',      krdsClass: '(자체 추가)', description: '72px 고정 너비',             confirmed: true },
    { category: '크기', class: 'yds-thumbnail--m',      krdsClass: '(자체 추가)', description: '104px 고정 너비',            confirmed: true },
    { category: '크기', class: 'yds-thumbnail--l',      krdsClass: '(자체 추가)', description: '160px 고정 너비',            confirmed: true },
    { category: '크기', class: 'yds-thumbnail--xl',     krdsClass: '(자체 추가)', description: '너비 100% (부모에 맞춤)',    confirmed: true },
    { category: '상태', class: 'yds-thumbnail--empty',  krdsClass: '(자체 추가)', description: '로딩·실패 상태. 배경 + 이미지 없음 아이콘 가운데 표시', confirmed: true },
  ],

  codeExample: `<!-- 기본: 16:9 -->
<div class="yds-thumbnail yds-thumbnail--16x9">
  <img class="yds-thumbnail__img" src="photo.jpg" alt="사진 설명">
</div>

<!-- 원형 아바타 (m 크기) -->
<div class="yds-thumbnail yds-thumbnail--1x1 yds-thumbnail--m yds-thumbnail--circle">
  <img class="yds-thumbnail__img" src="avatar.jpg" alt="홍길동">
</div>

<!-- 라벨 + 배지 오버레이 -->
<div class="yds-thumbnail yds-thumbnail--16x9">
  <img class="yds-thumbnail__img" src="photo.jpg" alt="사진 설명">
  <span class="yds-thumbnail__label">NEW</span>
  <span class="yds-thumbnail__badge">3</span>
</div>

<!-- 로딩·실패 상태 -->
<div class="yds-thumbnail yds-thumbnail--16x9 yds-thumbnail--empty"></div>`,
};

// ─── 로고 (Logo) ─────────────────────────────────────────────────────────────

export const logoNaming = {
  name: '로고',
  englishName: 'Logo',
  sbPath: '컴포넌트/레이아웃 및 표현/로고',
  baseClass: 'yds-logo',
  krdsClass: '(자체 추가)',
  description: '비율을 유지한 채 기관·브랜드 로고를 표시하는 컴포넌트 (object-fit: contain)',

  structure: `div.yds-logo [yds-logo--비율] [yds-logo--grayscale]
└── img.yds-logo__img

목록:
div.yds-logo-list`,

  elements: [
    { element: '로고 래퍼', class: 'yds-logo',       krdsClass: '(자체 추가)', description: '비율 modifier와 함께 사용. 높이를 CSS로 지정해 크기 제어',       confirmed: true },
    { element: '로고 이미지', class: 'yds-logo__img', krdsClass: '(자체 추가)', description: 'img 태그. object-fit: contain, 가운데 정렬. alt에 기관명 필수', confirmed: true },
    { element: '로고 목록', class: 'yds-logo-list',   krdsClass: '(자체 추가)', description: '여러 로고를 가로로 나열하는 flex 컨테이너',                      confirmed: true },
  ],

  modifiers: [
    { category: '비율', class: 'yds-logo--1x1',      krdsClass: '(자체 추가)', description: '1:1 정방형 (심볼형 로고)',         confirmed: true },
    { category: '비율', class: 'yds-logo--2x1',      krdsClass: '(자체 추가)', description: '2:1 가로형 로고',                 confirmed: true },
    { category: '비율', class: 'yds-logo--3x1',      krdsClass: '(자체 추가)', description: '3:1 넓은 가로형 로고',            confirmed: true },
    { category: '효과', class: 'yds-logo--grayscale', krdsClass: '(자체 추가)', description: '흑백 처리. hover·focus 시 컬러로 전환', confirmed: true },
  ],

  codeExample: `<!-- 3:1 가로형 로고 -->
<div class="yds-logo yds-logo--3x1" style="height:5rem;">
  <img class="yds-logo__img" src="logo.svg" alt="행정안전부">
</div>

<!-- 흑백 처리 (hover 시 컬러) -->
<div class="yds-logo yds-logo--3x1 yds-logo--grayscale" style="height:5rem;">
  <img class="yds-logo__img" src="logo.svg" alt="행정안전부">
</div>

<!-- 로고 목록 -->
<div class="yds-logo-list">
  <div class="yds-logo yds-logo--3x1 yds-logo--grayscale" style="height:4rem;">
    <img class="yds-logo__img" src="logo-a.svg" alt="기관 A">
  </div>
  <div class="yds-logo yds-logo--3x1 yds-logo--grayscale" style="height:4rem;">
    <img class="yds-logo__img" src="logo-b.svg" alt="기관 B">
  </div>
</div>`,
};

// ─── 전체 목록 (components-naming.mdx 용) ──────────────────────────────────
// 새 컴포넌트를 추가하면 이 배열에도 추가한다.

export const allComponents = [
  buttonNaming,
  linkNaming,
  textInputNaming,
  textareaNaming,
  selectNaming,
  checkboxNaming,
  radioNaming,
  tagNaming,
  dateInputNaming,
  fileUploadNaming,
  breadcrumbNaming,
  tabNaming,
  paginationNaming,
  badgeNaming,
  tooltipNaming,
  accordionNaming,
  tableNaming,
  carouselNaming,
  cardNaming,
  thumbnailNaming,
  logoNaming,
  iconNaming,
  layoutNaming,
  headerNaming,
  pcGnbNaming,
  mobileGnbNaming,
  footerNaming,
];
