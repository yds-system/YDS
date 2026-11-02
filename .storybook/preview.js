import '../reference/krds/resources/css/token/krds_tokens.css';
import '../reference/krds/resources/css/common/common.css';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
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
          '기반', ['아이콘', '*'],
          '컴포넌트', [
            '탐색', ['브레드크럼', '탭', '페이지네이션', '*'],
            '액션', ['버튼', '링크 텍스트', '*'],
            '선택', ['체크박스', '라디오 버튼', '태그', '*'],
            '입력', ['텍스트 입력', '선택 상자', '날짜 입력', '파일 업로드', '*'],
            '피드백', ['배지', '툴팁', '*'],
            '콘텐츠', ['아코디언', '표', '캐러셀 컨트롤', '*'],
            '*',
          ],
          '패턴', ['기본 레이아웃', '*'],
          'Docs',
          '*',
        ],
      },
    },
  },
};

export default preview;