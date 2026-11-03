# PROGRESS

## 네이밍 작업 진행 상황

### 완료
- 버튼 (액션)
- 체크박스·라디오 버튼 (선택)
- 텍스트 입력·선택 상자 (입력)
- form-group 공통 (ds-form-group, ds-form-label, ds-form-content, ds-form-hint)
- 글자 수 공통 블록 (ds-count, ds-count__current, ds-count__max)
- 날짜 입력 + 달력 팝업 (ds-date-input, ds-calendar)
- 파일 업로드 (ds-file-upload)
- 링크 텍스트 (ds-link — button.css 의존 제거, 독립 블록으로 분리)
- 태그 (ds-tag-group, ds-tag--link, ds-tag__delete-btn)
- 배지 (ds-badge-group, ds-badge--{스타일}-{색상}, ds-badge--large/--number/--dot)
- 툴팁 (ds-tooltip-popover--open/--box/--top/--bottom/--left/--right)
- 아코디언 (ds-accordion__item/--header/--btn/--collapse/--body, ds-accordion--line, --open)
- 표 (ds-table/ds-table--data/--row-header, ds-table__caption/--visible, ds-table-wrap--scroll/--mobile-card/--mobile-scroll)
- 캐러셀 컨트롤 (ds-carousel__indicator/--pagination/--bullet/--controller/--nav/--move-btn 등 전체 ds-carousel 변환)

### 남은 순서 (사이드바 카테고리 기준)
1. ~~**입력**: 날짜 입력, 파일 업로드~~ ✓
2. ~~**액션 + 선택**: 링크 텍스트, 태그~~ ✓
3. ~~**form-group 공통 클래스 BEM 정리**~~ ✓
4. ~~**탐색**: 브레드크럼, 탭, 페이지네이션~~ ✓
5. ~~**피드백**: 배지, 툴팁~~ ✓
6. ~~**콘텐츠**: 아코디언, 표, 캐러셀 컨트롤~~ ✓
7. ~~**기반 + 패턴**: 아이콘, 기본 레이아웃~~ ✓

### 남은 정리 항목
없음

---

## 2026-11-02 사이드바 재분류 및 컴포넌트 분리

### 사이드바 분류 변경
- 기존 6분류(탐색/액션/선택/입력/피드백/콘텐츠) → KRDS 공식 분류 기반 7분류
- 새 분류: 아이덴티티 / 탐색 / 레이아웃 및 표현 / 액션 / 선택 / 도움 / 입력
- stories.js title 변경 8개: 아코디언·배지·캐러셀→레이아웃 및 표현, 선택 상자→선택, 탭→레이아웃 및 표현, 표→레이아웃 및 표현, 툴팁→도움, 링크 텍스트→링크

### 새 컴포넌트 분리/추가
- **헤더**(header): layout.stories.js에서 분리. header.stories.js + header.mdx + header.css
- **푸터**(footer): layout.stories.js에서 분리. footer.stories.js + footer.mdx + footer.css
- **메인 메뉴**(main-menu): layout.stories.js에서 분리. main-menu.stories.js + main-menu.mdx + main-menu.css + gnb-init.js(공통 JS)
- **텍스트 영역**(textarea): text-input.stories.js에서 분리. textarea.stories.js + textarea.mdx + textarea.css
- layout.stories.js: initPcGnb/initMobileGnb를 gnb-init.js import로 교체, 헤더·푸터·전체변형 export 제거
- text-input.stories.js: textareaGroup 헬퍼 및 텍스트에어리어 관련 export 3개 제거

### naming-data.js 변경
- linkNaming: 이름 '링크 텍스트'→'링크', englishName 'Link Text'→'Link', sbPath 변경
- textInputNaming: textarea 관련 structure·elements·codeExample 제거
- textareaNaming 신규 추가 (텍스트 영역 독립 네이밍)
- selectNaming: sbPath '컴포넌트/입력/선택 상자'→'컴포넌트/선택/선택 상자'
- allComponents 배열에 textareaNaming 추가

### 문서 정리
- components-naming.mdx: 새 분류 체계로 전면 재작성
- 모든 컴포넌트 mdx: guidance text 통일 ("KRDS 구성을 기준으로 ds- BEM 규칙...")
- 모든 컴포넌트 mdx: `## 개요` heading 추가 (없는 파일만)
- button.mdx: 'KRDS 기본 클래스'→'기본 클래스'
- layout.mdx: '## 구성 요소' 섹션 삭제, 삭제된 stories 참조 제거
- link.mdx: 제목 '링크 텍스트'→'링크'
- preview.js storySort: 새 분류 반영
- CLAUDE.md: 분류 규칙 업데이트

---

## 2026-11-02 작업 내역 (확인 필요 항목 정리)

- `naming-data.js`: `confirmed: false` 항목 전체 판단 완료 (18종 → 0개)
  - **원본 기록으로 전환** (confirmed: true): `ds-input--focus` / `ds-form-content--success` / `ds-form-content--info` / `ds-table-wrap` / `ds-table-wrap--scroll`(`krdsClass: 'scroll'`) / `ds-table-wrap--mobile-scroll`(`krdsClass: 'mob-scroll'`) / 캐러셀 4종(`--bg` / `--center` / `--hide-desktop` ×2)
  - **자체 추가 확정** (krdsClass 오기재 수정): `ds-form-label__required`(`'required'` → `'(자체 추가)'`, 4개 컴포넌트) / `ds-table__caption`(`'caption'` → `'(HTML 태그)'`) / `ds-table__caption--visible`(`'visible'` → `'(자체 추가)'`)
  - **자체 추가 유지 + confirmed: true 전환**: `ds-table-wrap--mobile-card` / `ds-utility-list--start` / `ds-main-menu__sub-link` / `ds-footer__sns-item` / `ds-footer__menu-link`
- `naming-data.js` 주석 수정: `confirmed: false` 정의를 "아직 판단하지 않은 것"으로 명확화
- `CLAUDE.md`: `confirmed` 필드 기준 규칙 추가 (자체 추가도 confirmed: true)

---

## 이전 작업 (2026-11-02)

- `components-naming.mdx`: import에 `headerNaming, pcGnbNaming, mobileGnbNaming, footerNaming` 추가. 탐색 섹션의 헤더·푸터·메인메뉴(PC)·메인메뉴(모바일) 정적 행을 `<CompRow comp={...} />`로 교체.
- `CLAUDE.md`: 일반 규칙에 "컴포넌트 mdx에 `## 네이밍` 섹션이 있는지 확인한다." 항목 추가.
- `layout.stories.js`: 주석 `submenu-wrap 기준 스크롤` → `ds-main-menu-mobile__sub-panel 기준 스크롤`. `gnb-sub-${mi}-${si}` → `ds-gnb-sub-${mi}-${si}`, `gnb-panel-${mi}` → `ds-gnb-panel-${mi}` (aria-controls·id 전체 교체).
- `layout.mdx`: 코드 예시 블록의 `gnb-panel-0`, `gnb-sub-0-0` → `ds-gnb-panel-0`, `ds-gnb-sub-0-0` 교체.

---

## 이전 작업 2 (2026-11-02)
- icon.mdx: `iconNaming` import + UNCONFIRMED/ElementTable/ModifierTable export 블록 + 네이밍 섹션 추가
- layout.mdx: `headerNaming/pcGnbNaming/mobileGnbNaming/footerNaming` import + 동일 export 블록 + 네이밍 섹션 추가 (헤더/PC GNB/모바일 GNB/푸터 4개 서브섹션)

---

## 결정 사항

| 항목 | 결정 |
|---|---|
| 접두사·방식 | `ds-` 접두사, BEM — 블록 `ds-{컴포넌트}`, 요소 `__`, 변형 `--` |
| 상태 클래스 | `--error`, `--completed` 형식. `is-` 접두사 사용 안 함 |
| 아이콘 | `ds-icon ds-ico-{이름}` |
| 전역 유틸리티 | `sr-only`는 접두사 없이 그대로 |
| 요소 이름 기준 | 모양이 아니라 역할 (`__underline` → `__text`) |
| 텍스트에어리어 | A안 — `ds-textarea` 블록 안에 `textarea.ds-input` + `p.ds-count` |
| 글자 수 블록 | 공통 블록으로 분리 — `ds-count`, `ds-count__current`, `ds-count__max` |
| 링크 텍스트 | `ds-link` 독립 블록. `ds-btn--link` modifier 제거. 버튼 외형 링크는 `<a class="ds-btn ds-btn--primary">` 사용 |
| 태그 그룹 | `ds-tag-wrap` → `ds-tag-group` (ds-check-group과 통일) |
| 배지 래퍼 | `ds-badge-wrap` → `ds-badge-group` (ds-tag-group, ds-check-group 패턴 통일) |
| 배지 modifier | `large/number/dot/outline-*/bg-*` → `ds-badge--large/--number/--dot/--outline-*/--bg-*` (BEM) |
| 배지 dot | `--dot`은 KRDS 원본 없음 → naming-data.js에 `krdsClass: '(자체 추가)'`로 표시 |
| 툴팁 active | `active` → `ds-tooltip-popover--open` (`--open` 허용 상태 목록) |
| 아코디언 active | `accordion-item.active` → `ds-accordion__item--open`, `btn-accordion.active` → `ds-accordion__btn--open` |
| 아코디언 라인형 | `type-line` → `ds-accordion--line` |
| 표 클래스 | `tbl` → `ds-table`, `col` → `ds-table--row-header`, `data` → `ds-table--data` |
| 표 캡션 | `caption.visible` → `caption.ds-table__caption.ds-table__caption--visible` (기본도 `ds-table__caption` 추가) |
| 표 래퍼 모바일 | `mob-card` → `ds-table-wrap--mobile-card`, `mob-scroll` → `ds-table-wrap--mobile-scroll` |
| 캐러셀 전환 | `swiper-*` → `ds-carousel__*` 전체 변환 (Swiper.js 미사용 확인) |
| 캐러셀 --w-hide | `w-hide` → `--hide-desktop` (PC에서 숨김, 모바일에서 표시 의미 명시) |
| 캐러셀 비활성 | 기본 클래스 포함: `ds-carousel__move-btn ds-carousel__move-btn--prev ds-carousel__move-btn--disabled` |
| 툴팁 박스형 | `tooltip-box` → `ds-tooltip-popover--box` (BEM modifier) |
| 툴팁 위치 | `pos-top/bottom/left/right` → `ds-tooltip-popover--top/bottom/left/right` (pos 제거) |
| 툴팁 팝오버 | `ds-tooltip-popover` 별도 블록 유지 (JS로 트리거 바깥 canvasElement에 부착) |
| 태그 삭제 버튼 | `btn-delete` → `ds-tag__delete-btn` (줄임말 사용 안 함) |
| 밑줄 hover | `ds-link__text--hidden` → `ds-link__text--underline-hover` (역할 기반 이름) |
| 폼 그룹 세로 묶음 | `fieldset` → `ds-fieldset` 블록 |
| 폼 그룹 가로 배치 | `form-col-group` → `ds-form-row` 블록 |
| 아이콘 버튼 포함 | `btn-ico-wrap` → `ds-form-content--with-btn` modifier |
| 버튼 묶음 | `btn-group` → `ds-form-content__actions` / `ds-calendar__actions` (`__actions` 통일) |
| 기간 구분자 | `li.mark` → `ds-date-input__separator` (CSS date-input.css로 이동) |
| 기간 입력 항목 | `li:not(.mark)` → `ds-date-input__range-item` (직접 클래스 지정) |
| 아이콘 크기 | `.small/.medium/.xlarge/.xsmall` → `ds-icon--small/--medium/--xlarge/--xsmall` (BEM modifier) |
| 아이콘 방향 | `.up/.left/.right` → `ds-icon--up/--left/--right` (ds-ico-angle/func/fold과 조합) |
| utility-list 블록 분리 | `utility-list` → `ds-utility-list` (헤더·모바일 공용). 좌측 정렬은 `ds-utility-list--start` modifier |
| 헤더 액션 버튼 | `btn-navi sch/login/join/my/all` → `ds-header__action-btn ds-header__action-btn--search/login/join/mypage/all-menu` |
| 헤더 내부 요소 | `header-in` → `ds-header__inner`, `btn-navi` → `ds-header__action-btn` 등 전면 전환 |
| PC GNB 요소 | `gnb-menu/gnb-main-trigger/gnb-toggle-wrap/is-link/is-open` → `ds-main-menu__list/trigger/dropdown--modifier` |
| 3depth 링크 | 명시적 `ds-main-menu__sub-link ds-main-menu__sub-link--current` + `aria-current="page"` |
| 모바일 GNB | `gnb-wrap/is-open/is-backdrop` → `ds-main-menu-mobile__panel/--open/--backdrop` 전면 전환 |
| 푸터 요소 | `info-addr/info-cs/f-copy/link-go/link-sns` → `ds-footer__address/contact/copyright/shortcuts/sns` 전면 전환 |
| 강조 링크 | `a.point` → `ds-footer__menu-link ds-footer__menu-link--emphasis` (기본 클래스 포함) |
| krdsClass 통일 | naming-data.js의 `krdsBaseClass` 필드명 → `krdsClass` 전면 통일 |
| layoutNaming 분리 | `layoutNaming` 유지 + `headerNaming` / `pcGnbNaming` / `mobileGnbNaming` / `footerNaming` sub-export 추가 |
| components-naming CompRow | 헤더·푸터·PC GNB·모바일 GNB 정적 행 → `<CompRow>` 교체 완료 |
| mdx 네이밍 섹션 | 브레드크럼·탭·페이지네이션·아이콘·레이아웃 5개 파일에 `## 네이밍` 섹션 추가 |
| CLAUSE.md 절차 추가 | 새 컴포넌트 작업 시 mdx 네이밍 섹션 확인 단계 명시 |
| ARIA ID 정비 | layout.stories.js / layout.mdx의 `gnb-sub-*` / `gnb-panel-*` → `ds-gnb-sub-*` / `ds-gnb-panel-*` |

---

## 2026-11-03 메인 메뉴 스토리 수정

- **`.ds-container` 가운데 정렬 누락**: `layout.css`에 `margin-left: auto; margin-right: auto;` 추가 → 헤더·푸터·기본 레이아웃 전체 가운데 정렬 복구
- **PC GNB backdrop z-index 수정**: `#ds-header`(z-index 70) 쌓임 맥락 안에서 backdrop(60)이 dropdown(10)을 덮는 문제 해결
  - `ds-main-menu` nav에 `z-index: 10` 추가 → 독립 쌓임 맥락 생성 (딤 위에 보임)
  - `ds-main-menu__backdrop` z-index 60 → 5 (딤이 메뉴 아래로)
  - CSS 주석으로 z-index 순서 명시: 딤(5) < PC GNB(10) < 모바일 GNB(100)
- **모바일 GNB viewport 기본값**: `main-menu.stories.js`에 커스텀 viewport 정의 추가
  - PC_GNB 스토리: `defaultViewport: 'desktop'` (1440×900)
  - 모바일_GNB 스토리: `defaultViewport: 'mobile'` (390×844)
- **main-menu.mdx viewport 안내 추가**: "PC/모바일 메뉴는 화면 너비에 따라 전환되며 툴바 Viewport로 확인" 문구 추가

---

## 2026-11-03 재점검 수정

- **ds-ico-close → ds-ico-modal-close**: `ds-ico-close`는 icon.css에 미정의. 모바일 GNB 닫기 버튼에 `ds-ico-modal-close` 적용 (header/main-menu/layout stories 3개)
- **footer.stories.js inner 잔존**: `  <div class="inner">` (2칸 들여쓰기) → `ds-container`. 이전 replace_all에서 누락된 건
- **naming-data.js structure 교체**: headerNaming·footerNaming·layoutNaming의 구조도 텍스트에서 `.inner` 4곳 → `.ds-container`
- **radio.mdx**: 접근성 섹션 `**방향키(↑↓ / ←→)**` → `<strong>방향키(↑↓ / ←→)</strong>`
- **icon.stories.js**: 데모 전용 클래스 `icon-card/icon-section/cat-count/icon-grid` → `sb-icon-card/sb-icon-section/sb-cat-count/sb-icon-grid` (sb- 접두사 도입)
- **CLAUDE.md**: "Storybook 전용 클래스는 sb- 접두사" 규칙 추가

---

## 2026-11-03 Storybook 전체 점검 반영

### 화면 깨짐 수정

**CSS import 누락 추가**
- `button.stories.js` → `icon.css` 추가
- `carousel.stories.js` → `icon.css` 추가
- `date-input.stories.js` → `icon.css` 추가
- `file-upload.stories.js` → `icon.css` 추가
- `footer.stories.js` → `button.css`, `icon.css` 추가
- `header.stories.js` → `button.css`, `icon.css` 추가
- `layout.stories.js` → `button.css`, `icon.css` 추가
- `main-menu.stories.js` → `button.css`, `icon.css` 추가
- `tooltip.stories.js` → `button.css` 추가

**구버전 클래스 교체**
- `class="inner"` → `class="ds-container"` (footer·header·main-menu·layout stories + layout.mdx 코드블록)
- `layout.css`: `.inner` 셀렉터 6곳 → `.ds-container`. 상단에 `.ds-container` 기본 CSS 규칙 추가 (KRDS `.inner` 대체)
- `naming-data.js`: `layoutNaming.elements`에 `ds-container` (krdsClass: 'inner') 추가
- `ico-close` → `ds-icon ds-ico-close` (header·main-menu·layout stories 3곳)
- `class="strong"` / `class="span"` → 클래스 없는 시맨틱 태그 (footer·layout stories)
- tab.stories.js + tab.mdx: `created` → `ds-tab__selected-text`

**ds-spinner 임시 CSS**
- `file-upload.css` 상단에 `.ds-spinner` + `@keyframes ds-spin` 추가
- TODO: 스피너 컴포넌트 추가 시 `spinner.css`로 이동

**미해결 (future work)**
- `.active` / `.krds-drop-wrap`: `reference/krds/resources/css/common/common.css` (read-only)에 정의. 토큰 작업 시 common.css 의존성 제거하면서 함께 해결 예정

### 문서 수정

- `pagination.mdx`: "KRDS 기본 클래스" → "기본 클래스"
- `tab.mdx`: `**굵게**` → `<strong>`, `created` 클래스 참조 → `ds-tab__selected-text`
- `radio.mdx`: `**굵게**` → `<strong>`
- `header.mdx`: "사용 기준" → "언제 사용하는지" + "사용하지 말아야 할 때" 2섹션으로 분리
- `footer.mdx`: 동일
- `main-menu.mdx`: 동일
- `layout.mdx`: "언제 사용하는지" + "사용하지 말아야 할 때" 추가, "CSS 클래스" 섹션 삭제
- `icon.mdx`: ElementTable에서 `baseClass` 제거 (아이콘 클래스가 `ds-icon__`으로 시작하지 않아 모두 공통 표시되는 문제), "언제 사용하는지" / "사용하지 말아야 할 때" / "코드 예시" 섹션 추가

### 재발 방지

- `CLAUDE.md`: 검증 체크리스트 섹션 추가 (CSS import 확인, 렌더된 HTML 확인, 구버전 클래스명 검색)

---

## 2026-11-03 작업 내역 (네이밍 정의서 UI 개선)

- **naming-components.js 생성**: UNCONFIRMED·CompRow·ElementTable·ModifierTable 공용 컴포넌트를 `src/docs/naming-components.js`로 분리 (React.createElement 사용)
- **CompRow 표시 개선**: 하위 요소·modifier를 세로 칩 목록으로 표시. 다른 블록 클래스는 구분선 + "(공통)" 표시로 구분
- **ElementTable·ModifierTable 개선**: 클래스명을 옅은 회색 칩 스타일로 표시. baseClass 기준으로 공통 블록 행을 표 하단으로 분리
- **23개 컴포넌트 mdx 일괄 업데이트**: 로컬 정의 제거, naming-components.js import, `baseClass` prop 추가 (showKrds: header·footer·main-menu)
- **추후 추가 예정 KRDS 분류 수정**: 공식 메뉴 순서 기준으로 분류 전면 교체 (마스트헤드 삭제, 피드백·설정·콘텐츠 분류 추가)
- **headerNaming.description**: "ds-utility-list는 헤더·모바일 메뉴 공통 블록" 문구 추가
- **BEM 규칙 설명 추가**: components-naming.mdx 도입부에 BEM 개념(블록·요소·변형) 설명 섹션 추가

---

## 2026-11-02 작업 내역 (네이밍 정의서 점검 반영)

- **remark-gfm 추가**: `.storybook/main.js` addon-docs 설정에 remarkPlugins 추가 → 마크다운 GFM 표 렌더링 활성화
- **기반/패턴 섹션 HTML 표 전환**: components-naming.mdx의 GFM 표 → `<table>` JSX 마크업으로 교체
- **Modifier 클래스 정리**: headerNaming·pcGnbNaming·mobileGnbNaming·footerNaming modifier에서 반복되는 기본 클래스 제거 (modifier만 표시)
- **캐러셀 baseClass 수정**: `ds-carousel__indicator` → `ds-carousel` (BEM 블록명으로 바로잡음, KRDS 원본 `swiper-indicator` 기록 유지)
- **추후 추가 예정 섹션 재작성**: 클래스명 칸 제거 + KRDS 분류 칸 추가, KRDS 공식 이름으로 변경, 신규 항목 추가 (달력/이미지/파비콘/플로팅 버튼/접근 가능한 미디어/숨긴 콘텐츠), 분류별 정렬, HTML 표로 전환
- **naming-data.js 수정**:
  - `ds-utility-list` description: "헤더·모바일 메뉴 공통 블록"으로 변경
  - `textareaNaming.elements`: ds-count / ds-count__current / ds-count__max 3종 추가
  - `pcGnbNaming.name`, `mobileGnbNaming.name`: "메인메뉴" → "메인 메뉴"

---

## 2026-11-02 작업 내역 (KRDS 분류 적용 및 문서 정리)

- **Storybook 사이드바 카테고리 전면 재편** (KRDS 공식 분류 적용):
  - 피드백 → 도움(툴팁) / 레이아웃 및 표현(배지)
  - 콘텐츠 → 레이아웃 및 표현(아코디언/표/캐러셀 컨트롤)
  - 탐색/탭 → 레이아웃 및 표현/탭
  - 입력/선택 상자 → 선택/선택 상자
  - 신규: 아이덴티티(헤더/푸터), 탐색(메인 메뉴)
- **새 컴포넌트 세트 생성** (css + stories.js + mdx): header, footer, main-menu, textarea
  - 각 폴더: src/components/header/, footer/, main-menu/, textarea/
  - 공통 GNB JS: src/components/main-menu/gnb-init.js (layout.stories.js, main-menu.stories.js 공유)
- **layout.stories.js**: 헤더/푸터/전체변형 export 제거 → Playground만 남김. gnb-init.js import로 전환
- **text-input.stories.js**: 텍스트에어리어 export 3개 제거 (textarea.stories.js로 이동)
- **text-input.mdx**: 텍스트에어리어 Canvas 섹션 제거
- **링크 텍스트 → 링크** 전면 변경: link.stories.js title, linkNaming 필드(name/englishName/sbPath)
- **textareaNaming** 신규 추가: naming-data.js에서 textInputNaming 분리, allComponents에 추가
- **naming-data.js sbPath** 일괄 갱신: tab/badge/tooltip/accordion/table/carousel/select (7종)
- **preview.js storySort**: Docs 맨 위 + 새 7분류 순서 적용
- **components-naming.mdx** 전면 재작성: KRDS 공식 분류별 정리, 미구현 컴포넌트 추후 추가 예정으로 이동
- **모든 mdx 네이밍 guidance text** 통일: "KRDS 구성을 기준으로 ds- BEM 규칙..." 문구로 교체
- **모든 mdx `## 개요` heading** 추가 (없던 파일)
- **button.mdx**: "KRDS 기본 클래스" → "기본 클래스", "링크 텍스트 컴포넌트" → "링크 컴포넌트"
- **layout.mdx**: `## 구성 요소` 섹션 삭제
- **CLAUDE.md**: 사이드바 분류 "KRDS 공식 10분류를 따르고, 컴포넌트가 있는 분류만 표시" 규칙 반영

---

## 추후 검토

- 필터 태그 선택 상태 (`ds-tag--selected`): KRDS 원본에 없음. 필요 시 신규 추가 협의 후 결정.
- ~~`components-naming.mdx`의 static 행은 각 컴포넌트 네이밍 작업 시 `naming-data.js` + `<CompRow>`로 교체~~ ✓ 완료 (헤더·푸터·GNB CompRow 교체)
- 토큰 작업 시
  - 공통 값은 `--ds-` 토큰으로 공유
  - KRDS 토큰(`--krds-*`)을 `src/tokens`로 이전
  - 범용 유틸리티 클래스(`ds-bg-*` 등) 검토
