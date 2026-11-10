# 회사 디자인 시스템

> **작업 흐름**: 작업을 시작할 때 `PROGRESS.md`를 먼저 읽고, 작업이 끝나면 `PROGRESS.md`를 업데이트한다.

Storybook 10(html-vite) 기반 디자인 시스템.
기획자·디자이너·퍼블리셔·개발자가 모두 사용하며, 프로젝트별 테마를 지원한다.
KRDS(범정부 UI/UX 디자인 시스템)를 기준으로 한다.

## 폴더 구조
- reference/krds: KRDS 원본 코드 (참고용, 수정 금지)
- src/global: reset, base 등 전역 스타일
- src/tokens: 디자인 토큰 (추후 적용)
- src/components: 컴포넌트 (컴포넌트당 폴더 1개)
- src/docs: 소개, 네이밍 정의서, 사용 규칙, 변경 이력 (mdx)

## Storybook 사이드바 분류 원칙

사이드바는 **기반 → 컴포넌트 → 패턴** 3단 구조로 구성한다.

- **기반 (Foundation)**: 아이콘·색상·타이포·간격 등 모든 컴포넌트가 공유하는 리소스
  - title 형식: `기반/항목명` (예: `기반/아이콘`)
- **컴포넌트 (Component)**: KRDS 컴포넌트를 6개 분류로 구분
  - title 형식: `컴포넌트/분류명/컴포넌트명` (예: `컴포넌트/액션/버튼`)
  - 분류: KRDS 공식 10분류를 따르고, 컴포넌트가 있는 분류만 표시한다. (현재: 아이덴티티 / 탐색 / 레이아웃 및 표현 / 액션 / 선택 / 도움 / 입력)
  - 분류 기준은 KRDS(reference/krds)를 우선으로 하고, 애매한 경우 먼저 물어본다.
- **패턴 (Pattern)**: 여러 컴포넌트를 조합한 페이지 레벨 구조
  - title 형식: `패턴/패턴명` (예: `패턴/기본 레이아웃`)

새 컴포넌트는 위 분류 원칙에 맞는 title로 만든다.

## 작성 규칙
- 순수 HTML + CSS로 작성한다. (프레임워크 사용 안 함)
- 컴포넌트 구성(HTML 구조, 종류·크기·상태)과 네이밍 원칙은 KRDS(reference/krds)를 따르되, 클래스명은 "네이밍 규칙"의 yds- 형식으로 바꿔서 쓴다.
- KRDS에 없는 컴포넌트를 추가할 때는 KRDS 네이밍 패턴을 따르고, 만들기 전에 먼저 물어본다.
- 컴포넌트는 [이름].css, [이름].stories.js, [이름].mdx 세트로 만든다.
- 스토리에는 기본, hover, disabled 등 주요 상태를 모두 포함한다.
- 접근성: label 연결, focus 스타일, aria 속성을 기본으로 챙긴다.

## 토큰 (추후 적용)
- 현재는 KRDS CSS 값을 그대로 사용한다.
- 토큰 적용 시: 색상·간격·폰트·radius는 CSS 변수로 바꾸고, 테마는 data-theme 속성으로 전환한다. (예: data-theme="project-a")
- 현재 KRDS 토큰(--krds-*)은 reference/krds에서 불러오고 있다. 토큰 작업 시 src/tokens로 옮기고 아래 규칙의 토큰 이름으로 바꾼다.

### 토큰 네이밍 규칙 (초안 — src/docs/tokens-naming.mdx 참고)

- **필수 전제**: `html { font-size: 62.5%; }` (1rem = 10px). 이 설정이 없으면 모든 rem 값이 틀어진다.
- **형식**: `--{분류}-{대상}-{역할}-{상태}` (접두사 없음)
  - 분류: `color` / `font` / `space` / `radius` / `shadow`
  - 색상 대상: `text` / `bg` / `border` / `icon`
  - 역할: `default`, `subtle`, `inverse`, `primary`, `secondary`, `danger`, `warning`, `success`, `info`, `disabled`
  - 상태: `hover`, `active`, `focus`, `disabled` (필요한 경우만)
- **크기 표기는 풀네임**: `small` / `medium` / `large` (축약형 `sm`, `md` 금지)
- **한 단어 이름 금지**: `--primary`, `--text` 등은 다른 CSS와 충돌 우려.
- **간격**: px 숫자 그대로 (`--space-4`, `--space-8`, `--space-16` …)
- **예시**: `--color-text-default`, `--color-bg-primary-hover`, `--color-border-focus`, `--font-size-body-medium`, `--space-16`, `--radius-medium`, `--shadow-small`
- 컴포넌트 내부 변수(`--yds-btn--color-*`)와 구별하기 위해 접두사를 붙이지 않는다.
- **PC/모바일 폰트**: 같은 토큰 이름을 `:root`(PC)와 `@media (max-width: 1279px)`(모바일)에서 각각 정의. 컴포넌트는 토큰 하나만 참조.
- **프로젝트 테마**: `[data-theme="project-a"]`에서 `primary` 계열 토큰만 덮어씀.

### 화면 모드 규칙

- **화면 모드는 `html` 요소의 `data-mode` 속성 하나로 제어한다.** CSS 클래스(`.dark`, `.high-contrast` 등) 사용 금지.
- **모드 목록**:
  - 속성 없음(기본) = 라이트 모드
  - `data-mode="dark"` = 일반 다크
  - `data-mode="high-contrast"` = KRDS 선명한 화면 (고대비, 공공기관 필수)
  - `data-mode="system"` = OS 설정 연동 (`prefers-color-scheme: dark`일 때 다크 값 적용)
- **컴포넌트 CSS는 시멘틱 토큰(`--color-*`)만 참조해야 모드 전환이 자동 적용된다.** 프리미티브(`--color-gray-90` 등)를 직접 쓰면 모드가 바뀌어도 색상이 바뀌지 않는다.
- **고대비 호환**: `data-mode="high-contrast"` 설정 시 Storybook decorator가 `data-krds-mode="high-contrast"`도 함께 붙여 KRDS 컴포넌트와의 전환 기간 호환을 보장한다.
- **대비 기준**: 고대비 7:1(WCAG AAA), 다크 4.5:1(WCAG AA) 이상. disabled 상태는 대비 요건 면제.

## 문서 규칙
- 문서는 한국어로 작성한다.
- 컴포넌트 mdx 문서는 아래 순서로 구성한다.
  1. 개요
  2. 네이밍
  3. 언제 사용하는지 / 사용하지 말아야 할 때
  4. 코드 예시

## 네이밍 규칙

### 접두사 규칙 (BEM 기반)
이 디자인 시스템은 BEM 방식의 네이밍을 사용한다.

- **블록**: `yds-{컴포넌트}` (예: `yds-btn`, `yds-input`, `yds-pagination`)
- **요소**: `yds-{컴포넌트}__{요소}` (예: `yds-btn__text`, `yds-tag__delete-btn`)
- **변형(modifier)**: `yds-{컴포넌트}--{modifier}` (예: `yds-btn--primary`, `yds-btn--small`)
- **아이콘 루트**: `yds-icon` (기존 `svg-icon` 대체)
- **아이콘 종류**: `yds-ico-{이름}` (기존 `ico-*` 대체, 예: `yds-ico-sch`, `yds-ico-go`)
- **예외 — 전역 유틸리티**: `sr-only` 는 접두사 없이 그대로 사용한다.
- **CSS 컴포넌트 변수**: `--yds-{컴포넌트}--{속성}` (예: `--yds-btn--color-primary-fill`)
- **KRDS 디자인 토큰** (`var(--krds-light-color-*)`, `var(--krds-size-*)` 등)은 reference/krds에서 전역 로드되므로 그대로 참조한다.
- `reference/krds`는 원본이므로 절대 수정하지 않는다.

### 상태(State) 네이밍 규칙

상태는 `is-*` 접두사를 쓰지 않는다. BEM modifier 또는 CSS 가상 클래스로 표현한다.

| 상태 | 표현 방법 | 예시 |
|---|---|---|
| 에러 | 부모에 modifier: `--error` | `yds-form-content--error`, `yds-select--error` |
| 성공 | 부모에 modifier: `--success` | `yds-form-content--success` |
| 정보 | 부모에 modifier: `--info` | `yds-form-content--info` |
| 포커스 | CSS `:focus` 가상 클래스 | `.yds-input:focus` |
| 비활성화 | HTML `disabled` 속성 + `[disabled]` 셀렉터 | `<input disabled>` |
| 읽기 전용 | HTML `readonly` 속성 | `<input readonly>` |
| 선택 완료 | 블록 modifier: `--completed` | `yds-select--completed` |
| 항목 오류 (리스트) | 항목 modifier: `--error` | `yds-file-upload__item--error` |
| 선택됨 (여러 개 중) | 요소 modifier: `--selected` | `yds-tab__item--selected` — `aria-selected="true"` 사용 |
| 현재 위치 | 요소 modifier: `--current` | `yds-breadcrumb__link--current`, `yds-pagination__link--current` — `aria-current` 사용 |

- **허용 상태 이름 목록**: `--open`, `--current`, `--selected`, `--completed`, `--error`, `--disabled`, `--dragover`. 이 목록에 없는 상태 이름을 새로 만들 때는 먼저 협의한다.
- `is-error`, `is-success`, `is-information` 등 `is-` 접두사 클래스는 사용하지 않는다.
- 힌트/에러 메시지는 BEM base+modifier 분리: `yds-form-hint yds-form-hint--error` (단일 클래스 `yds-form-hint-error` 사용 금지).
- 필수 표시는 `yds-form-label__required` (요소 클래스). `yds-required` 단독 클래스 사용 금지.

### 일반 규칙
- **요소 이름은 모양이 아니라 역할로 짓는다.** 예: `__underline`(모양) → `__text`(역할). 디자인이 바뀌어도 이름이 낡아지지 않도록 한다.
- **한 요소에는 스타일용·JS용 클래스를 따로 두지 않는다.** BEM 클래스 하나로 스타일과 JS 이벤트 선택을 모두 처리한다.
- **modifier는 항상 기본 클래스와 함께 쓴다.** 예: `yds-calendar__cell--today`만 단독으로 쓰지 않고, `yds-calendar__cell yds-calendar__cell--today`로 쓴다.
- **버튼 묶음 요소는 `__actions`로 쓴다.** 버튼 여러 개를 감싸는 컨테이너 요소의 이름은 `{블록}__actions`으로 통일한다. 예: `yds-form-content__actions`, `yds-calendar__actions`.
- **이전/다음/처음/마지막 이동 버튼 요소 이름은 `__move-btn`으로 쓴다.** 방향 modifier: `--prev`, `--next`, `--first`, `--last`. 예: `yds-pagination__move-btn--prev`, `yds-pagination__move-btn--last`, `yds-calendar__move-btn--next`.
- 모든 클래스는 KRDS 원본에 대응하는 클래스가 있어야 한다. 대응하는 원본이 없거나 추측한 경우 "확인 필요"로 표시한다.
- naming-data.js에는 yds- 클래스명과 함께 "KRDS 원본 클래스명"을 기록해 대응 관계를 유지한다.
- **`confirmed` 필드 기준**: `confirmed: true`는 KRDS reference에서 확인된 클래스명, 또는 자체 추가로 판단이 끝난 클래스명(`krdsClass: '(자체 추가)'` 포함). `confirmed: false`는 아직 판단하지 않은 것만 쓴다. 즉, 자체 추가로 확정한 클래스도 `confirmed: true`로 처리한다.
- 네이밍 데이터는 src/docs/naming-data.js 한 곳에서 관리한다.
  - components-naming.mdx(전체 정의서)와 각 컴포넌트 mdx는 이 파일을 불러와서 표시한다.
  - 네이밍을 수정할 때는 naming-data.js만 고친다. mdx에 클래스명 표를 직접 작성하지 않는다.
- 컴포넌트 mdx의 "네이밍" 섹션 구성:
  - 구조도: HTML 구조와 각 요소의 클래스명
  - 클래스명 표: 요소 | 클래스명 | 설명
  - 변형(modifier) 표: 종류·크기·상태별 클래스명 | 설명
  - 코드 예시: 클래스명이 들어간 실제 HTML (복사 가능)
- 새 컴포넌트를 만들 때 naming-data.js에도 함께 추가한다.
- 컴포넌트 mdx에 `## 네이밍` 섹션이 있는지 확인한다. 없으면 naming-data.js 데이터를 불러와 추가한다.
- **옛 클래스 검색은 항상 src 전체의 css, js, mdx를 대상으로 한다. (CSS를 빼지 않는다)**

## Storybook 10 기준 규칙
- 문서 블록(Meta, Canvas, Story 등)은 '@storybook/addon-docs/blocks'에서 import한다.
  ('@storybook/blocks'는 Storybook 8까지의 경로라 사용 금지)
- mdx 표 안의 HTML 태그나 중괄호는 백틱(`)으로 감싼다.
- 모든 스토리는 args/argTypes로 Controls를 제공한다. (HTML은 자동 생성이 안 됨)
- 각 컴포넌트에 Playground 스토리를 둔다.
- 여러 상태를 한눈에 비교하는 All Variants 스토리를 둔다.

## Controls 규칙
- 컴포넌트에서 바꿀 수 있는 모든 항목을 Controls로 제공한다.
  - 문구·라벨·placeholder·도움말: text
  - 종류(variant)·크기(size): select 또는 radio (KRDS에 정의된 값만)
  - 상태(disabled, readonly, checked, error 등): boolean
  - 아이콘 유무·위치: select
  - 너비 100% 등 레이아웃 옵션: boolean
  - 반복 항목(셀렉트 옵션, 라디오 목록 등): object
- 각 컨트롤에는 description을 한국어로 적는다.
- 색상은 KRDS에 정의된 종류(variant) select로만 바꾼다.
- 자유 색상 확인용 컬러 피커(control: 'color')는 "Experimental" 스토리에만 둔다.

## 검증 체크리스트 (새 스토리 작성 시)

- **CSS import 확인**: 스토리에서 사용하는 컴포넌트 클래스(yds-btn, yds-icon 등)가 속한 CSS 파일을 모두 import했는지 확인한다.
  - 다른 컴포넌트 CSS를 쓴다면 해당 컴포넌트의 CSS도 함께 import한다.
  - 예: 헤더·푸터·레이아웃에서 버튼을 쓴다면 `../button/button.css`를 추가한다.
  - 예: 아이콘(yds-icon)을 쓴다면 `../icon/icon.css`를 추가한다.
- **렌더된 HTML 확인**: 소스가 아닌 브라우저 DevTools에서 실제 렌더된 HTML을 확인해 클래스명이 올바르게 출력되는지 검증한다.
- **클래스명 최신화**: `.inner`, `ico-close` 등 구버전 클래스명이 남아 있지 않은지 소스 전체(css, js, mdx)를 검색해 확인한다.
- **Storybook 전용 클래스**: 스토리 화면에서만 사용하는 데모·레이아웃 클래스는 `sb-` 접두사를 붙인다. (예: `sb-icon-card`, `sb-section`) 컴포넌트 CSS와 혼동되지 않도록 한다.