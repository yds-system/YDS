import '../reference/krds/resources/css/token/krds_tokens.css';
import '../reference/krds/resources/css/common/common.css';
import '../src/tokens/primitive.css';
import '../src/tokens/responsive.css';
import '../src/tokens/mode.css';
import '../src/tokens/semantic.css';
import '../src/tokens/theme-project-a.css';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

/** @type { import('@storybook/html-vite').Preview } */

// ── 화면 모드 툴바 ──────────────────────────────────────────────────────────────
export const globalTypes = {
  colorMode: {
    name: '화면 모드',
    description: '라이트 / 다크 / 고대비(KRDS 선명한 화면) / 시스템',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light',         title: '라이트',  right: '☀️' },
        { value: 'dark',          title: '다크',    right: '🌙' },
        { value: 'high-contrast', title: '고대비',  right: '◑'  },
        { value: 'system',        title: '시스템',  right: '💻' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

// ── 화면 모드 동기화 decorator ──────────────────────────────────────────────────
// html[data-mode] 설정 + 고대비일 때 data-krds-mode="high-contrast" 동기화
export const decorators = [
  (story, context) => {
    const mode = context.globals.colorMode || 'light';
    const html = document.documentElement;

    if (mode === 'light') {
      html.removeAttribute('data-mode');
      html.removeAttribute('data-krds-mode');
    } else if (mode === 'high-contrast') {
      html.setAttribute('data-mode', 'high-contrast');
      html.setAttribute('data-krds-mode', 'high-contrast'); // 전환 기간 KRDS 호환
    } else {
      html.setAttribute('data-mode', mode); // 'dark' | 'system'
      html.removeAttribute('data-krds-mode');
    }

    return story();
  },
];

const preview = {
  parameters: {
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        desktop: {
          name: '데스크톱 (1440px)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
    },
    docs: {
      toc: {
        title: '목차',
        headingSelector: 'h2, h3',
      },
    },

    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },

    options: {
      storySort: {
        order: [
          '디자인 토큰 정의서', ['메인', '프리미티브', '반응형', '모드', '시멘틱'],
          'Docs',
          '기반', ['아이콘', '*'],
          '컴포넌트', [
            '아이덴티티', ['헤더', '푸터', '*'],
            '탐색', ['메인 메뉴', '브레드크럼', '페이지네이션', '*'],
            '레이아웃 및 표현', ['탭', '배지', '아코디언', '표', '캐러셀 컨트롤', '*'],
            '액션', ['버튼', '링크', '*'],
            '선택', ['체크박스', '라디오 버튼', '선택 상자', '태그', '*'],
            '도움', ['툴팁', '*'],
            '입력', ['텍스트 입력', '텍스트 영역', '날짜 입력', '파일 업로드', '*'],
            '*',
          ],
          '패턴', ['기본 레이아웃', '*'],
          '*',
        ],
      },
    },
  },
};

export default preview;