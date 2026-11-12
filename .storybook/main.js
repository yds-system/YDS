import remarkGfm from 'remark-gfm';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

/** 현재 시각을 public/yds-build-info.json 에 기록 */
function writeBuildTime() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const time = `${pad(d.getMonth()+1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  writeFileSync(resolve('./public/yds-build-info.json'), JSON.stringify({ time }), 'utf-8');
}

/** Vite 플러그인: 서버 시작 · HMR 발생 시마다 타임스탬프 갱신 */
const buildTimePlugin = {
  name: 'yds-build-time',
  buildStart() { writeBuildTime(); },
  configureServer(server) {
    writeBuildTime();
    server.watcher.on('change', () => writeBuildTime());
  },
};

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  "framework": "@storybook/html-vite",
  "staticDirs": ["../reference/krds/resources", "../public"],
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@storybook/blocks": new URL("../node_modules/@storybook/addon-docs/dist/blocks.js", import.meta.url).pathname,
    };

    // 빌드 타임스탬프 플러그인 추가
    config.plugins = [...(config.plugins ?? []), buildTimePlugin];

    // SCSS: mobile 믹스인을 모든 .scss 파일에 주입
    config.css ??= {};
    config.css.preprocessorOptions ??= {};
    config.css.preprocessorOptions.scss ??= {};
    config.css.preprocessorOptions.scss.additionalData =
      '@mixin mobile { @media (max-width: 1279px) { @content; } }\n';

    // 개발 서버: localhost ↔ 127.0.0.1 모두 허용 (Vite 8 host check 우회)
    config.server ??= {};
    config.server.allowedHosts = 'all';

    return config;
  },
};
export default config;