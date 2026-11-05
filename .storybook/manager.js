import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'YDS',
    brandImage: './yds_logo2.svg',
    brandUrl: '/',
    brandTarget: '_self',
  }),
});
