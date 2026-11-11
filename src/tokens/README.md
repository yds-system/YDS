# 디자인 토큰 구조

> **수정 규칙**: CSS 토큰을 수정할 때 `src/docs/token-data.js`도 함께 수정하고, `npm run check:tokens`으로 일치 여부를 확인한다.
>
> 추후 JSON + Style Dictionary 체계로 전환되면 `token-data.js`는 자동 생성 파일로 대체될 예정이다.
>
> **중복 방지**: 이름만 다르고 값이 같은 토큰은 만들지 않는다. 값이 동일하면 기존 토큰 하나로 통일한다.

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
mode.css        → 모드 색상 (라이트·다크·시스템 — :root + [data-mode])
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

- `data-mode="system"` 설정 후 OS가 **라이트**이면 `:root` 기본값이 그대로 유지된다.
- KRDS 선명한 화면(고대비)이 필요한 프로젝트는 프로젝트 테마에서 별도 추가한다.

---

## Figma 변수(Variables) 가져오기

```
npm run export:figma
```

`figma-tokens/` 디렉터리에 W3C DTCG 형식의 JSON 파일을 생성한다.  
토큰이 바뀔 때마다 재실행해서 Figma에 다시 가져온다.

### 출력 파일

| 파일 | Figma 컬렉션 | 변수 수 |
|---|---|---|
| `primitive.json` | Primitive | 157 |
| `responsive.pc.json` | Responsive / PC 모드 | 62 |
| `responsive.mobile.json` | Responsive / Mobile 모드 | 62 |
| `mode.light.json` | Mode / Light 모드 | 88 |
| `mode.dark.json` | Mode / Dark 모드 | 88 |
| `semantic.json` | Semantic | 32 |

### Figma 가져오기 순서

참조 방향(`semantic → mode → responsive → primitive`)에 따라 아래 순서로 가져온다.  
순서가 틀리면 참조 변수를 찾지 못할 수 있다.

> **중요**: Primitive 컬렉션 이름은 정확히 `Primitive`로 지정해야 한다.  
> aliasData의 `targetVariableSetName: "Primitive"`와 일치해야 Figma가 참조를 연결한다.

```
1. Primitive          ← primitive.json
2. Responsive         ← responsive.pc.json (PC 모드)
                      ← responsive.mobile.json (Mobile 모드)
3. Mode               ← mode.light.json (Light 모드)
                      ← mode.dark.json (Dark 모드)
4. Semantic           ← semantic.json
```

### 변환 규칙

| CSS 값 | Figma $value | $type |
|---|---|---|
| `#1e2124` | `"#1e2124"` | color |
| `#000000bf` | `"#000000bf"` | color |
| `1.6rem` | `16` (px 숫자) | dimension |
| `2px` | `2` (숫자) | dimension |
| `700` | `700` | number |
| `1.5` | `1.5` | number |
| `'Pretendard GOV', …` | `"Pretendard GOV"` | string |
| `var(--color-gray-90)` | `{color.gray.90}` | (참조 대상 타입) |

**제외 토큰**: `--font-letter-spacing-*` (em 단위), `--transition-*` (복합 값), `--shadow-*` (복합 값 — Figma shadow 토큰은 별도 처리)
