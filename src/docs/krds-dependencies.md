# KRDS 의존성 현황

`--krds-*` 변수를 여전히 참조하는 컴포넌트 목록입니다.
YDS 토큰으로 교체가 완료된 컴포넌트는 ✓로 표시합니다.

> **제거 순서**: 사용 빈도가 낮은 컴포넌트부터, 토큰 의미가 명확한 것부터 교체한다.

---

## 교체 완료

| 컴포넌트 | 파일 | KRDS → YDS 주요 매핑 |
|---|---|---|
| 스위치 | `src/components/switch/switch.scss` | `color-element-gray` → `--color-bg-subtler`<br>`color-element-primary` → `--color-bg-primary`<br>`color-element-inverse` → `--color-bg-elevated` (라이트) / `--color-bg-inverse` (다크)<br>`color-element-disabled-light` → `--color-bg-disabled`<br>`size-height-3` → 2.0rem (medium)<br>`size-height-4` → 2.4rem (large) |

---

## 교체 대기

현재 `src/components/**/*.css`에서 `--krds-` 변수를 참조하는 컴포넌트 목록.
(`npm run check:tokens` 에서 미정의 var()로 잡히지 않는 이유: krds 토큰은 reference/krds에서 전역 로드됨)

| 컴포넌트 | 주요 의존 토큰 | 우선순위 |
|---|---|---|
| (미조사) | — | — |

> `grep -r -- '--krds-' src/components/` 명령으로 목록을 갱신한다.
