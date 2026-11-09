# 디자인 토큰 구조

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
