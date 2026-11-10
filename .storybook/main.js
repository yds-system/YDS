import remarkGfm from 'remark-gfm';

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

    // SCSS: mobile 믹스인을 모든 .scss 파일에 주입
    config.css ??= {};
    config.css.preprocessorOptions ??= {};
    config.css.preprocessorOptions.scss ??= {};
    config.css.preprocessorOptions.scss.additionalData =
      '@mixin mobile { @media (max-width: 1279px) { @content; } }\n';

    return config;
  },
};
export default config;