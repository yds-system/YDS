# 디자인 토큰 구조

> **수정 규칙**: CSS 토큰을 수정할 때 `src/docs/token-data.js`도 함께 수정하고, `npm run check:tokens`으로 일치 여부를 확인한다.
>
> 추후 JSON + Style Dictionary 체계로 전환되면 `token-data.js`는 자동 생성 파일로 대체될 예정이다.

---

## rem 기준

```
html { font-size: 62.5%; }   /* KRDS common.css 기준 */
1rem = 10px
```

모든 rem 값은 이 설정을 전제로 한다.  
예: `0.4rem = 4px`, `1.6rem = 16px`, `4rem = 40px`

---

## 파일 구조와 로드 순서

```
primitive.css   → 원재료 (색상·크기·폰트·간격·모서리 원시 값)
responsive.css  → 반응형 (PC 기본값 + @media 모바일 덮어쓰기)
mode.css        → 모드 색상 (라이트·다크·고대비·시스템 — :root + [data-mode])
semantic.css    → 시멘틱 (고정 타이포·간격·그림자·모서리 별칭)
```

참조 방향: `semantic / responsive / mode` → `primitive`  
역방향(primitive → semantic 등) 금지.

---

## 반응형 토큰 네이밍 규칙

토큰 이름의 숫자는 **PC 기준값(px)** 이다.

```css
--space-m-24   /* PC: 24px,  모바일: 20px */
--space-xl-80  /* PC: 80px,  모바일: 64px */
--font-size-heading-xl  /* PC: 40px,  모바일: 28px */
```

실제 모바일 값은 `responsive.css`의 `@media (max-width: 1279px)` 블록을 참고한다.  
Figma에서는 **responsive** 컬렉션의 **mobile** 모드에서 확인할 수 있다.

---

## 모드 제어

화면 모드는 `html` 요소의 `data-mode` 속성 하나로 제어한다.

| 속성값 | 적용 |
|---|---|
| (없음, 기본) | 라이트 모드 |
| `data-mode="dark"` | 다크 모드 |
| `data-mode="high-contrast"` | 고대비 (KRDS 선명한 화면, WCAG AAA 7:1) |
| `data-mode="system"` | OS 설정 연동 |

컴포넌트 CSS는 `--color-*` 시멘틱 토큰만 참조하면 모드 전환이 자동 적용된다.

### `system` 모드 동작 방식

```css
/* mode.css 내부 구조 */
@media (prefers-color-scheme: dark) {
  [data-mode="system"] { /* 다크 토큰 덮어쓰기 */ }
}
```

- `data-mode="system"` 설정 후 OS가 **다크**이면 → `@media (prefers-color-scheme: dark)` 쿼리와 결합되어 다크 토큰이 적용된다.
- OS가 **라이트**이면 → 미디어 쿼리 내부 CSS가 무시되어 `:root`의 라이트 기본값이 유지된다.
- JavaScript 없이 순수 CSS로 동작하며, OS 설정 변경 시 즉시 반응한다.

### `system` 모드와 `high-contrast` 모드의 관계

두 모드는 **완전히 별개**다. `data-mode`는 한 번에 하나의 값만 가질 수 있다.

| `data-mode` | 적용 모드 |
|---|---|
| (없음) | 라이트 |
| `"dark"` | 다크 (고정) |
| `"high-contrast"` | 고대비 (고정) |
| `"system"` | OS가 다크이면 다크, 라이트이면 라이트 |

- `system` 모드는 OS 다크/라이트만 추적한다. **OS 고대비 설정(`prefers-contrast: more`)은 별도 대응이 필요**하며, 현재는 `high-contrast`를 명시적으로 선택해야 한다.
- `high-contrast` 선택 시 Storybook decorator가 `data-krds-mode="high-contrast"`도 함께 붙여 KRDS 컴포넌트 호환을 보장한다.
