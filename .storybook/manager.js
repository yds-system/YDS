import { addons, types } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { createElement as h, useState, useEffect } from 'react';

// ── 최근 업데이트 시간 툴바 ───────────────────────────────────────────────────────
function LastUpdated() {
  const [time, setTime] = useState('');

  useEffect(() => {
    let alive = true;

    function refresh() {
      fetch('./yds-build-info.json?t=' + Date.now())
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (alive && data?.time) setTime(data.time); })
        .catch(() => {});
    }

    refresh();
    const id = setInterval(refresh, 3000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  if (!time) return null;

  return h('div', {
    title: '마지막 업데이트 시각',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '0 10px',
      fontSize: '11px',
      color: '#888',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      lineHeight: 1,
    },
  },
    h('span', null, `최근 업데이트 : ${time}`),
  );
}

addons.register('yds/last-updated', () => {
  addons.add('yds/last-updated/tool', {
    type: types.TOOL,
    title: '마지막 업데이트',
    render: LastUpdated,
  });
});

// ── 테마 ──────────────────────────────────────────────────────────────────────────
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'YDS',
    brandImage: './yds_logo_main.png',
    brandUrl: '/YDS/',
    brandTarget: '_self',
  }),
});
