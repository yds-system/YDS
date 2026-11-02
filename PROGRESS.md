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

### 남은 순서 (사이드바 카테고리 기준)
1. ~~**입력**: 날짜 입력, 파일 업로드~~ ✓
2. **액션 + 선택**: 링크 텍스트, 태그
3. **탐색**: 브레드크럼, 탭, 페이지네이션
4. **피드백**: 배지, 툴팁
5. **콘텐츠**: 아코디언, 표, 캐러셀 컨트롤
6. **기반 + 패턴**: 아이콘, 기본 레이아웃

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

---

## 다음 할 일 / 메모

- `components-naming.mdx`의 static 행은 각 컴포넌트 네이밍 작업 시 `naming-data.js` + `<CompRow>`로 교체
- 토큰 작업 시
  - 공통 값은 `--ds-` 토큰으로 공유
  - KRDS 토큰(`--krds-*`)을 `src/tokens`로 이전
  - 범용 유틸리티 클래스(`ds-bg-*` 등) 검토
