디자인 토큰을 아래 내용대로 만들어 줘. 중간 확인 질문 없이 끝까지 진행하고, 마지막에 결과만 짧게 보고해 줘.

# 사용량 절약 조건
- reference/krds에서는 색상·타이포·간격·radius·shadow 토큰 정의 파일만 읽기
- 컴포넌트 CSS 수정, build-storybook 실행, 다른 문서 점검 하지 않기
- 문서 표는 손으로 쓰지 말고 데이터 파일을 반복문으로 그리기

# 네이밍 규칙
- 프리미티브: 숫자 이름 (색-단계, spacing-px, radius-px). 원재료.
- 시멘틱: 용도 이름. 반드시 프리미티브를 var()로 참조.
- 크기 단계 xs/s/m/l/xl, 위계 primary/secondary/tertiary, 상태 hover/pressed/focus/disabled/selected
- 토큰 이름은 -- 없이 정한다 (예: bg-brand). 피그마 표기는 color/bg/brand, CSS 변수는 토큰 이름 앞에 --를 붙인다 (--bg-brand). 문서 표의 기준 열은 토큰 이름.
- 일러스트·차트 등 장식은 프리미티브, 버튼·텍스트·배경 등 UI는 시멘틱 사용
- 값은 KRDS 토큰에서 가져오고, KRDS에 없는 값은 제안값 + "자체 추가"

# 토큰 목록
1. 색상 프리미티브: gray, blue, red, orange, yellow, green 계열 (KRDS 단계 그대로, 숫자 클수록 진함), black-alpha/white-alpha 몇 단계
2. 색상 시멘틱
   txt-: primary, secondary, tertiary, disabled, inverse, on-brand, brand, link, link-visited, success, warning, danger, info
   bg-: primary, secondary, tertiary, elevated, inverse, disabled, overlay, hover, selected, brand, brand-hover, brand-pressed, brand-subtle, success-subtle, warning-subtle, danger-subtle, info-subtle
   border-: primary, secondary, strong, divider, focus, disabled, brand, success, warning, danger
   icon-: primary, secondary, disabled, inverse, brand, danger
3. 타이포: font-family-base/code, font-size-{px}, font-weight-regular/medium/bold, line-height-tight/normal/relaxed, letter-spacing-tight/normal
   텍스트 스타일(크기+굵기+행간+자간 묶음, PC/모바일 값): display-l/m, heading-xl/l/m/s, body-l/m/s, label-l/m/s, caption, code
4. 간격: spacing-0/2/4/8/12/16/20/24/32/40/48/64/80 → gap-xs~xl, padding-xs~xl, section-padding-s/m/l(모바일 축소)
5. 크기: size-control-xs~xl(버튼·입력 높이), size-icon-xs~xl, size-touch-min(44px)
6. 모서리: radius-0/2/4/6/8/12/16/24/999 → radius-xs/s/m/l/xl/circle
7. 테두리: border-width-thin/medium/thick, focus-ring-width, focus-ring-offset
8. 그림자: elevation-0/low/mid/high
9. 투명도: opacity-disabled/overlay/hover
10. 레이어: z-base 0, z-dropdown 100, z-sticky 200, z-overlay 300, z-modal 400, z-toast 500, z-tooltip 600
11. 모션: duration-fast/normal/slow(100/200/300ms), easing-standard/enter/exit
12. 레이아웃: breakpoint-mobile/tablet/desktop(지금 컴포넌트 미디어 쿼리 기준과 맞추기), container-max, container-padding, grid-columns, grid-gutter

# 만들 파일
1. src/tokens/primitive.css, src/tokens/semantic.css (모바일 값은 @media로 덮어쓰기)
2. src/tokens/theme-project-a.css: [data-theme="project-a"]에서 brand 계열(bg-brand, bg-brand-hover, bg-brand-pressed, bg-brand-subtle, txt-brand, border-brand, border-focus)만 green 계열 프리미티브로 바꾸기
3. src/tokens/token-data.js: 모든 토큰 배열 { group, figma, css, value, ref(참조 프리미티브), usage, krds }
4. src/docs/design-tokens.mdx (사이드바 "기반/디자인 토큰", 페이지 하나)
   - 맨 위: 네이밍 규칙 요약, "프리미티브는 물감, 시멘틱은 용도가 적힌 물감통" 설명, 장식/UI 사용 구분
   - 예시 섹션: 프리미티브 → 시멘틱 연결 표 (txt-primary→gray-90, bg-brand→blue-50, bg-brand-hover→blue-60, border-focus→blue-50, txt-danger→red-60, bg-danger-subtle→red-5 등)
   - 테마 비교 표: 기본 vs project-a (bg-brand blue-50 → green-50 등)
   - 그룹별 표: 견본 · 피그마 이름 · CSS 변수 · 참조 프리미티브 · 값 · 용도 · KRDS 원본
   - 견본: 색상은 색 칩, 타이포는 실제 글자, 간격은 막대, 모서리·그림자는 박스, 나머지는 값만
5. preview.js에서 primitive → semantic → theme 순서로 불러오기
6. 기존 tokens-naming.mdx 삭제

끝나면 PROGRESS.md에 한 줄 기록하고 커밋.