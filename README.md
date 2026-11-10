# 윤컴 디자인 시스템

KRDS(범정부 UI/UX 디자인 시스템) 기반의 Storybook 10(html-vite) 디자인 시스템.

---

## Storybook 사이드바 메뉴 규칙

### 구조 원칙
- **섹션명·페이지명 모두 영어**
- 같은 섹션 내 페이지는 **알파벳순** 정렬 (Tokens 섹션 제외 — 계층 관계를 따름)
- 각 페이지 h1 아래 **한글 부제** 삽입 (예: `# Color` 아래 `색상`)
- 섹션 순서: Overview → Brand → Foundations → Components → Tokens → Patterns

### 섹션 정의

| 섹션 | 역할 |
|---|---|
| **Overview** | 시스템 소개(Introduction), 네이밍 규칙(Naming) 등 범용 가이드 |
| **Brand** | 로고(Logo) 등 브랜드 아이덴티티 에셋 |
| **Foundations** | Color·Typography·Spacing 등 모든 컴포넌트가 공유하는 시각적 기반 |
| **Components** | KRDS 기반 UI 컴포넌트 (알파벳순) |
| **Tokens** | 토큰 구조(Overview·Primitive·Responsive·Mode·Semantic) 정의서 |
| **Patterns** | 여러 컴포넌트를 조합한 페이지 레벨 레이아웃 |

### 새 페이지 추가 시 title 형식

```js
// Overview
title: 'Overview/Page Name'

// Brand
title: 'Brand/Page Name'

// Foundations (알파벳순)
title: 'Foundations/Page Name'

// Components (컴포넌트당 1개, 알파벳순)
title: 'Components/Component Name'

// Tokens
title: 'Tokens/Page Name'

// Patterns
title: 'Patterns/Pattern Name'
```

### 페이지 내 한글 부제 형식

```mdx
# Color

색상

...content...
```

### storySort 업데이트
새 페이지를 추가한 뒤 `.storybook/preview.js`의 `storySort.order`에
알파벳순 위치에 맞춰 항목을 추가한다.

---

## 개발 명령어

```bash
npm run dev            # Storybook 개발 서버 실행
npm run build          # Storybook 빌드
npm run check:tokens   # 토큰 정의 검증
npm run check:contrast # WCAG 대비 검증
```
