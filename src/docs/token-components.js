/**
 * 디자인 토큰 문서 렌더링 컴포넌트
 * design-tokens.mdx에서 import해서 사용한다.
 * naming-components.js 패턴과 동일하게 React.createElement를 직접 사용한다.
 */
import { createElement as h, Fragment } from 'react';
import {
  colorPrimGroups,
  colorSemanticGroups,
  typoPrimTokens,
  typoStyleTokens,
  spacingPrimTokens,
  spacingSemanticTokens,
  radiusPrimTokens,
  radiusSemanticTokens,
} from '../tokens/token-data.js';

// ─── 내부 유틸 ────────────────────────────────────────────────────────────────

const chipStyle = {
  background: '#f1f3f5',
  padding: '1px 5px',
  borderRadius: '3px',
  fontSize: '12px',
  fontFamily: 'monospace',
  whiteSpace: 'nowrap',
};

const Chip = (txt) => h('code', { style: chipStyle }, txt);
const GrayChip = (txt) => h('code', { style: { ...chipStyle, background: 'transparent', color: '#555' } }, txt);
const KrdsChip = (txt) => h('code', { style: { ...chipStyle, background: 'transparent', color: '#999', fontSize: '11px' } }, txt);

const th = (txt) => h('th', {
  style: { padding: '5px 8px', background: '#f8f8f8', textAlign: 'left', borderBottom: '2px solid #ddd', whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 600 }
}, txt);

const td = (content, extraStyle) => h('td', {
  style: { padding: '5px 8px', borderBottom: '1px solid #eee', verticalAlign: 'middle', fontSize: '12px', ...(extraStyle || {}) }
}, content);

const ColorSwatch = (val) => h('div', {
  style: {
    width: '28px', height: '28px', background: val, borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.12)', flexShrink: 0,
  }
});

const tableStyle = { width: '100%', borderCollapse: 'collapse', marginBottom: '8px' };
const sectionStyle = { marginBottom: '32px' };
const subheadStyle = { margin: '0 0 8px', fontSize: '14px', fontWeight: 600, color: '#333' };

// ─── 프리미티브 → 시멘틱 연결 표 ──────────────────────────────────────────────

const connectionRows = [
  { semantic: '--txt-primary',      prim: '--gray-90',    value: '#1e2124', usage: '본문·제목 주요 텍스트' },
  { semantic: '--txt-danger',       prim: '--red-60',     value: '#bd2c0f', usage: '에러 메시지' },
  { semantic: '--txt-brand',        prim: '--blue-60',    value: '#0b50d0', usage: '링크·브랜드 강조 텍스트' },
  { semantic: '--bg-primary',       prim: '--gray-0',     value: '#ffffff', usage: '페이지·카드 기본 배경' },
  { semantic: '--bg-brand',         prim: '--blue-50',    value: '#256ef4', usage: '브랜드 배경 (버튼 등)' },
  { semantic: '--bg-brand-hover',   prim: '--blue-60',    value: '#0b50d0', usage: '브랜드 hover 배경' },
  { semantic: '--bg-danger-subtle', prim: '--red-5',      value: '#fdefec', usage: '에러 연한 배경' },
  { semantic: '--bg-selected',      prim: '--blue-5',     value: '#ecf2fe', usage: '선택된 항목 배경' },
  { semantic: '--border-focus',     prim: '--blue-50',    value: '#256ef4', usage: '포커스 링' },
  { semantic: '--border-danger',    prim: '--red-50',     value: '#de3412', usage: '에러 테두리' },
];

export const ConnectionTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('시멘틱 토큰'), th('프리미티브'), th('값'), th('용도'))
    ),
    h('tbody', null,
      ...connectionRows.map(r =>
        h('tr', { key: r.semantic },
          td(Chip(r.semantic)),
          td(Chip(r.prim)),
          td(h(Fragment, null,
            ColorSwatch(r.value),
            h('code', { style: { marginLeft: '6px', fontSize: '12px' } }, r.value)
          )),
          td(r.usage)
        )
      )
    )
  );

// ─── 테마 비교 표 ──────────────────────────────────────────────────────────────

const themeRows = [
  { token: '--bg-brand',         baseRef: '--blue-50',  baseVal: '#256ef4', themeRef: '--green-50', themeVal: '#228738' },
  { token: '--bg-brand-hover',   baseRef: '--blue-60',  baseVal: '#0b50d0', themeRef: '--green-60', themeVal: '#267337' },
  { token: '--bg-brand-pressed', baseRef: '--blue-70',  baseVal: '#083891', themeRef: '--green-70', themeVal: '#285d33' },
  { token: '--bg-brand-subtle',  baseRef: '--blue-5',   baseVal: '#ecf2fe', themeRef: '--green-5',  themeVal: '#eaf6ec' },
  { token: '--txt-brand',        baseRef: '--blue-60',  baseVal: '#0b50d0', themeRef: '--green-60', themeVal: '#267337' },
  { token: '--border-brand',     baseRef: '--blue-50',  baseVal: '#256ef4', themeRef: '--green-50', themeVal: '#228738' },
  { token: '--border-focus',     baseRef: '--blue-50',  baseVal: '#256ef4', themeRef: '--green-50', themeVal: '#228738' },
];

const SwatchCell = (val, refName) =>
  h(Fragment, null,
    h('div', {
      style: {
        width: '18px', height: '18px', background: val, borderRadius: '3px',
        border: '1px solid rgba(0,0,0,0.12)', display: 'inline-block',
        verticalAlign: 'middle', marginRight: '6px',
      }
    }),
    h('code', { style: { fontSize: '12px' } }, refName + ' / ' + val)
  );

export const ThemeTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('토큰'), th('기본 (blue 계열)'), th('project-a (green 계열)'))
    ),
    h('tbody', null,
      ...themeRows.map(r =>
        h('tr', { key: r.token },
          td(Chip(r.token)),
          td(SwatchCell(r.baseVal, r.baseRef)),
          td(SwatchCell(r.themeVal, r.themeRef))
        )
      )
    )
  );

// ─── 1. 색상 프리미티브 ────────────────────────────────────────────────────────

export const ColorPrimTable = () =>
  h(Fragment, null,
    ...colorPrimGroups.map(g =>
      h('div', { key: g.name, style: sectionStyle },
        h('h4', { style: subheadStyle }, g.name),
        h('table', { style: tableStyle },
          h('thead', null,
            h('tr', null, th('견본'), th('CSS 변수'), th('값'), th('용도'), th('KRDS 원본'))
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.css },
                td(ColorSwatch(t.value)),
                td(Chip(t.css)),
                td(GrayChip(t.value)),
                td(t.usage || ''),
                td(KrdsChip(t.krds))
              )
            )
          )
        )
      )
    )
  );

// ─── 2. 색상 시멘틱 ───────────────────────────────────────────────────────────

export const ColorSemanticTable = () =>
  h(Fragment, null,
    ...colorSemanticGroups.map(g =>
      h('div', { key: g.name, style: sectionStyle },
        h('h4', { style: subheadStyle }, g.name),
        h('table', { style: tableStyle },
          h('thead', null,
            h('tr', null, th('견본'), th('CSS 변수'), th('참조 프리미티브'), th('값'), th('용도'), th('KRDS 원본'))
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.css },
                td(ColorSwatch(t.value)),
                td(Chip(t.css)),
                td(t.ref ? Chip(t.ref) : h('span', { style: { color: '#aaa', fontSize: '11px' } }, '고정값')),
                td(GrayChip(t.value)),
                td(t.usage || ''),
                td(KrdsChip(t.krds))
              )
            )
          )
        )
      )
    )
  );

// ─── 3. 타이포 프리미티브 ─────────────────────────────────────────────────────

export const TypoPrimTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('CSS 변수'), th('값'), th('피그마'), th('용도'), th('KRDS 원본'))
    ),
    h('tbody', null,
      ...typoPrimTokens.map(t =>
        h('tr', { key: t.css },
          td(Chip(t.css)),
          td(GrayChip(t.value)),
          td(h('code', { style: { ...chipStyle, background: 'transparent', color: '#888', fontSize: '11px' } }, t.figma)),
          td(t.usage || ''),
          td(KrdsChip(t.krds))
        )
      )
    )
  );

// ─── 3. 텍스트 스타일 ─────────────────────────────────────────────────────────

const TypoSample = (valuePC) => {
  const parts = (valuePC || '').split(' / ');
  const szRem = parseFloat(parts[0]) || 1.7;
  const szPx = Math.min(szRem * 10, 32); // 미리보기는 최대 32px로 제한
  const wStr = parts[1] || '400';
  const fw = wStr === 'bold' ? '700' : wStr === '500' ? '500' : '400';
  return h('span', {
    style: { fontSize: szPx + 'px', fontWeight: fw, lineHeight: 1.4, color: '#1e2124', whiteSpace: 'nowrap' }
  }, '가나다 Aa');
};

export const TypoStyleTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('CSS 변수 (font-size)'), th('PC (크기/굵기/행간)'), th('모바일'), th('용도'))
    ),
    h('tbody', null,
      ...typoStyleTokens.map(t =>
        h('tr', { key: t.css },
          td(TypoSample(t.valuePC)),
          td(Chip(t.css)),
          td(GrayChip(t.valuePC)),
          td(t.valuePC === t.valueMobile
            ? h('span', { style: { color: '#aaa', fontSize: '11px' } }, '동일')
            : h('code', { style: { ...chipStyle, background: '#fff8e0' } }, t.valueMobile)
          ),
          td(t.usage || '')
        )
      )
    )
  );

// ─── 4. 간격 프리미티브 ───────────────────────────────────────────────────────

const SpacingBar = (val, color) => {
  const px = parseFloat(val) * 10;
  const w = Math.min(px * 2, 160);
  return h('div', {
    style: {
      width: (w || 2) + 'px', height: '12px', background: color || '#256ef4',
      borderRadius: '2px', minWidth: px === 0 ? '1px' : '2px',
      opacity: px === 0 ? 0.2 : 1,
    }
  });
};

export const SpacingPrimTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('CSS 변수'), th('값'), th('용도'), th('KRDS 원본'))
    ),
    h('tbody', null,
      ...spacingPrimTokens.map(t =>
        h('tr', { key: t.css },
          td(SpacingBar(t.value, '#8a949e')),
          td(Chip(t.css)),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(KrdsChip(t.krds))
        )
      )
    )
  );

// ─── 4. 간격 시멘틱 ───────────────────────────────────────────────────────────

export const SpacingSemanticTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('CSS 변수'), th('참조 프리미티브'), th('값 (PC→모바일)'), th('용도'), th('KRDS 원본'))
    ),
    h('tbody', null,
      ...spacingSemanticTokens.map(t =>
        h('tr', { key: t.css },
          td(SpacingBar(t.value, '#256ef4')),
          td(Chip(t.css)),
          td(Chip(t.ref)),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(KrdsChip(t.krds))
        )
      )
    )
  );

// ─── 6. 모서리 ────────────────────────────────────────────────────────────────

const RadiusBox = (val, bg, border) => {
  const rem = parseFloat(val);
  const r = rem >= 99 ? '50px' : (rem * 10) + 'px';
  return h('div', {
    style: {
      width: '36px', height: '36px', background: bg || '#d8e5fd',
      border: '2px solid ' + (border || '#256ef4'), borderRadius: r, flexShrink: 0,
    }
  });
};

export const RadiusPrimTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('CSS 변수'), th('값'), th('용도'), th('KRDS 원본'))
    ),
    h('tbody', null,
      ...radiusPrimTokens.map(t =>
        h('tr', { key: t.css },
          td(RadiusBox(t.value, '#d8e5fd', '#256ef4')),
          td(Chip(t.css)),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(KrdsChip(t.krds))
        )
      )
    )
  );

export const RadiusSemanticTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('CSS 변수'), th('참조 프리미티브'), th('값'), th('용도'), th('KRDS 원본'))
    ),
    h('tbody', null,
      ...radiusSemanticTokens.map(t =>
        h('tr', { key: t.css },
          td(RadiusBox(t.value, '#ecf2fe', '#0b50d0')),
          td(Chip(t.css)),
          td(Chip(t.ref)),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(KrdsChip(t.krds))
        )
      )
    )
  );
