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

### 남은 순서 (사이드바 카테고리 기준)
1. ~~**입력**: 날짜 입력, 파일 업로드~~ ✓
2. ~~**액션 + 선택**: 링크 텍스트, 태그~~ ✓
3. ~~**form-group 공통 클래스 BEM 정리**~~ ✓
4. ~~**탐색**: 브레드크럼, 탭, 페이지네이션~~ ✓
5. **피드백**: 배지, 툴팁
6. **콘텐츠**: 아코디언, 표, 캐러셀 컨트롤
7. **기반 + 패턴**: 아이콘, 기본 레이아웃

### 남은 정리 항목 (해당 카테고리 작업 시 처리)
- badge.css `.large` → `ds-badge--large` (피드백)
- icon CSS `.small` / `.medium` → `ds-icon--small` / `ds-icon--medium` (기반)
- layout CSS `.btn-navi` 및 그 modifier (기반 + 패턴)

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
| 태그 삭제 버튼 | `btn-delete` → `ds-tag__delete-btn` (줄임말 사용 안 함) |
| 밑줄 hover | `ds-link__text--hidden` → `ds-link__text--underline-hover` (역할 기반 이름) |
| 폼 그룹 세로 묶음 | `fieldset` → `ds-fieldset` 블록 |
| 폼 그룹 가로 배치 | `form-col-group` → `ds-form-row` 블록 |
| 아이콘 버튼 포함 | `btn-ico-wrap` → `ds-form-content--with-btn` modifier |
| 버튼 묶음 | `btn-group` → `ds-form-content__actions` / `ds-calendar__actions` (`__actions` 통일) |
| 기간 구분자 | `li.mark` → `ds-date-input__separator` (CSS date-input.css로 이동) |
| 기간 입력 항목 | `li:not(.mark)` → `ds-date-input__range-item` (직접 클래스 지정) |

---

## 추후 검토

- 필터 태그 선택 상태 (`ds-tag--selected`): KRDS 원본에 없음. 필요 시 신규 추가 협의 후 결정.
- `components-naming.mdx`의 static 행은 각 컴포넌트 네이밍 작업 시 `naming-data.js` + `<CompRow>`로 교체
- 토큰 작업 시
  - 공통 값은 `--ds-` 토큰으로 공유
  - KRDS 토큰(`--krds-*`)을 `src/tokens`로 이전
  - 범용 유틸리티 클래스(`ds-bg-*` 등) 검토
