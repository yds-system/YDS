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
없음 — 모든 항목 완료 (2026-11-02 최종 점검 완료)

---

## 2026-11-02 작업 내역

- `components-naming.mdx`: import에 `headerNaming, pcGnbNaming, mobileGnbNaming, footerNaming` 추가. 탐색 섹션의 헤더·푸터·메인메뉴(PC)·메인메뉴(모바일) 정적 행을 `<CompRow comp={...} />`로 교체.
- `CLAUDE.md`: 일반 규칙에 "컴포넌트 mdx에 `## 네이밍` 섹션이 있는지 확인한다." 항목 추가.
- `layout.stories.js`: 주석 `submenu-wrap 기준 스크롤` → `ds-main-menu-mobile__sub-panel 기준 스크롤`. `gnb-sub-${mi}-${si}` → `ds-gnb-sub-${mi}-${si}`, `gnb-panel-${mi}` → `ds-gnb-panel-${mi}` (aria-controls·id 전체 교체).
- `layout.mdx`: 코드 예시 블록의 `gnb-panel-0`, `gnb-sub-0-0` → `ds-gnb-panel-0`, `ds-gnb-sub-0-0` 교체.

---

## 최근 작업 (2026-11-02)
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

## 추후 검토

- 필터 태그 선택 상태 (`ds-tag--selected`): KRDS 원본에 없음. 필요 시 신규 추가 협의 후 결정.
- ~~`components-naming.mdx`의 static 행은 각 컴포넌트 네이밍 작업 시 `naming-data.js` + `<CompRow>`로 교체~~ ✓ 완료 (헤더·푸터·GNB CompRow 교체)
- 토큰 작업 시
  - 공통 값은 `--ds-` 토큰으로 공유
  - KRDS 토큰(`--krds-*`)을 `src/tokens`로 이전
  - 범용 유틸리티 클래스(`ds-bg-*` 등) 검토
