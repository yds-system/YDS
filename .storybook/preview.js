// import '../reference/krds/resources/css/token/krds_tokens.css';  // ← --krds-* 의존 제거 완료
// import '../reference/krds/resources/css/common/common.css';       // ← --krds-* 의존 제거 완료
import '../src/tokens/base.css';
import '../src/tokens/primitive.css';
import '../src/tokens/responsive.css';
import '../src/tokens/mode.css';
import '../src/tokens/semantic.css';
import '../src/tokens/theme-project-a.css';
import '../src/components/common.css';
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
// html[data-mode] 설정
export const decorators = [
  (story, context) => {
    const mode = context.globals.colorMode || 'light';
    const html = document.documentElement;

    if (mode === 'light') {
      html.removeAttribute('data-mode');
    } else if (mode === 'high-contrast') {
      html.setAttribute('data-mode', 'high-contrast');
    } else {
      html.setAttribute('data-mode', mode); // 'dark' | 'system'
    }

    // Canvas 모드: body 전체에 배경·글자색 적용
    // Docs 모드: body는 Storybook 기본 스타일 유지, .sbdocs-preview 안쪽만 적용
    if (context.viewMode === 'story') {
      document.body.style.background = 'var(--color-bg-default)';
      document.body.style.color = 'var(--color-text-default)';
    } else {
      document.body.style.background = '';
      document.body.style.color = '';
    }

    let modeStyle = document.getElementById('yds-mode-preview-style');
    if (!modeStyle) {
      modeStyle = document.createElement('style');
      modeStyle.id = 'yds-mode-preview-style';
      document.head.appendChild(modeStyle);
    }
    modeStyle.textContent = '.sbdocs-preview { background: var(--color-bg-default) !important; color: var(--color-text-default) !important; }';

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
          'Overview',    ['Introduction', 'Directory', 'Naming', '*'],
          'Brand',       ['Logo', '*'],
          'Foundations', ['Accessibility', 'Color', 'Iconography', 'Layout', 'Radius', 'Shadow', 'Spacing', 'Typography', '*'],
          'Components',  [
            'Accordion', 'Badge', 'Breadcrumb', 'Button',
            'Card', 'Carousel', 'Checkbox',
            'Date Input', 'File Upload', 'Footer', 'Header',
            'Icon', 'Link', 'Main Menu', 'Pagination', 'Radio Button',
            'Select', 'Tab', 'Table', 'Tag',
            'Text Input', 'Textarea', 'Thumbnail', 'Tooltip', '*',
          ],
          'Patterns', ['Basic Layout', '*'],
          'Tokens',   ['Overview', 'Mode', 'Primitive', 'Responsive', 'Semantic', '*'],
          '*',
        ],
      },
    },
  },
};

export default preview;