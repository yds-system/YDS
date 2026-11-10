# 윤컴 디자인 시스템

KRDS(범정부 UI/UX 디자인 시스템) 기반의 Storybook 10(html-vite) 디자인 시스템.

---

## Storybook 사이드바 메뉴 규칙

### 구조 원칙
- **섹션명은 영어**, **페이지명은 한글**
- 같은 섹션 내 페이지는 **가나다순** 정렬
- 섹션 순서: Overview → Brand → Foundations → Components → Tokens → Patterns

### 섹션 정의

| 섹션 | 역할 |
|---|---|
| **Overview** | 시스템 소개, 네이밍 규칙 등 범용 가이드 |
| **Brand** | 로고 등 브랜드 아이덴티티 에셋 |
| **Foundations** | 색상·타이포그래피·간격 등 모든 컴포넌트가 공유하는 시각적 기반 |
| **Components** | KRDS 기반 UI 컴포넌트 (가나다순) |
| **Tokens** | 디자인 토큰 구조(프리미티브·모드·반응형·시멘틱) 정의서 |
| **Patterns** | 여러 컴포넌트를 조합한 페이지 레벨 레이아웃 |

### 새 페이지 추가 시 title 형식

```js
// Overview
title: 'Overview/페이지명'

// Brand
title: 'Brand/페이지명'

// Foundations
title: 'Foundations/페이지명'

// Components (컴포넌트당 1개, 분류 없이 가나다순)
title: 'Components/컴포넌트명'

// Tokens
title: 'Tokens/페이지명'

// Patterns
title: 'Patterns/패턴명'
```

### storySort 업데이트
새 페이지를 추가한 뒤 `.storybook/preview.js`의 `storySort.order`에
가나다순 위치에 맞춰 항목을 추가한다.

---

## 개발 명령어

```bash
npm run dev            # Storybook 개발 서버 실행
npm run build          # Storybook 빌드
npm run check:tokens   # 토큰 정의 검증
npm run check:contrast # WCAG 대비 검증
```
