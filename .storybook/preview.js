import '../reference/krds/resources/css/token/krds_tokens.css';
import '../reference/krds/resources/css/common/common.css';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

/** @type { import('@storybook/html-vite').Preview } */
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