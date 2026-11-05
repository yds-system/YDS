/**
 * 디자인 토큰 문서 렌더링 컴포넌트
 * design-tokens.mdx에서 import해서 사용한다.
 * naming-components.js 패턴과 동일하게 React.createElement를 직접 사용한다.
 *
 * 토큰 이름(name)이 기준 열, CSS 변수(--name)는 개발 참고용으로 맨 뒤에 표시한다.
 */
import { createElement as h, Fragment } from 'react';
import {
  colorPrimGroups,
  colorSemanticGroups,
  typoPrimTokens,
  typoPrimGroupedTokens,
  typoStyleTokens,
  spacingPrimTokens,
  spacingPrimGroupedTokens,
  spacingSemanticTokens,
  shadowSemanticTokens,
  radiusPrimTokens,
  radiusSemanticTokens,
  themeProjectAOverrides,
} from '../tokens/token-data.js';

// ─── 내부 유틸 ────────────────────────────────────────────────────────────────

const chipStyle = {
  background: '#f1f3f5',
  padding: '1px 5px',
  borderRadius: '3px',
  fontSize: '12px',
  fontFamily: 'monospace',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
};

// 토큰 이름 (--없음, 강조)
const Chip = (txt) => h('code', { style: chipStyle }, txt);
// 값·참조 (회색)
const GrayChip = (txt) => h('code', { style: { ...chipStyle, background: 'transparent', color: '#555' } }, txt);
// KRDS 원본 (연한 회색, 소형)
const KrdsChip = (txt) => h('code', { style: { ...chipStyle, background: 'transparent', color: '#999', fontSize: '11px' } }, txt);
// CSS 변수 (개발 참고용, 연한 배경 + 작은 글씨)
const CssChip = (name) => h('code', { style: { ...chipStyle, background: '#f8f0ff', color: '#6b3fa0', fontSize: '11px' } }, '--' + name);

const th = (txt) => h('th', {
  style: { padding: '5px 8px', background: '#f8f8f8', textAlign: 'left', borderBottom: '2px solid #ddd', fontSize: '12px', fontWeight: 600 }
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
// 각 시멘틱 그룹에서 ref가 있는 토큰 3개씩 자동 추출

const connectionRows = colorSemanticGroups.flatMap(g =>
  g.tokens
    .filter(t => t.ref !== null)
    .slice(0, 3)
    .map(t => ({ semantic: t.name, prim: t.ref, value: t.value, usage: t.usage }))
);

export const ConnectionTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('시멘틱 토큰 이름'), th('프리미티브 이름'), th('값'), th('용도'))
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
// color-primary-* 프리미티브 토큰별로 기본값 vs project-a 값 자동 생성

const _primaryTokens = colorPrimGroups.find(g => g.name === 'primary').tokens;
const themeRows = _primaryTokens.map(t => ({
  token:    t.name,
  baseVal:  t.value,
  themeVal: themeProjectAOverrides[t.name] || t.value,
}));

const SwatchVal = (val) =>
  h(Fragment, null,
    h('div', {
      style: {
        width: '18px', height: '18px', background: val, borderRadius: '3px',
        border: '1px solid rgba(0,0,0,0.12)', display: 'inline-block',
        verticalAlign: 'middle', marginRight: '6px',
      }
    }),
    h('code', { style: { fontSize: '12px' } }, val)
  );

export const ThemeTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('프리미티브 토큰'), th('기본값'), th('project-a 값'))
    ),
    h('tbody', null,
      ...themeRows.map(r =>
        h('tr', { key: r.token },
          td(Chip(r.token)),
          td(SwatchVal(r.baseVal)),
          td(SwatchVal(r.themeVal))
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
            h('tr', null, th('견본'), th('토큰 이름'), th('값'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.name },
                td(ColorSwatch(t.value)),
                td(Chip(t.name)),
                td(GrayChip(t.value)),
                td(t.usage || ''),
                td(KrdsChip(t.krds)),
                td(CssChip(t.name))
              )
            )
          )
        )
      )
    )
  );

// ─── 2. 색상 시멘틱 ───────────────────────────────────────────────────────────

const DualSwatch = (lightVal, darkVal) =>
  h('div', { style: { display: 'flex', gap: '1px', flexShrink: 0 } },
    h('div', { style: { width: '20px', height: '28px', background: lightVal, borderRadius: '4px 0 0 4px', border: '1px solid rgba(0,0,0,0.12)', borderRight: 'none' } }),
    h('div', { style: { width: '20px', height: '28px', background: darkVal,  borderRadius: '0 4px 4px 0', border: '1px solid rgba(0,0,0,0.12)' } })
  );

const RefVal = (ref, val) =>
  h('span', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
    ref ? Chip(ref) : h('span', { style: { color: '#aaa', fontSize: '11px' } }, '고정값'),
    GrayChip(val)
  );

export const ColorSemanticTable = () =>
  h(Fragment, null,
    ...colorSemanticGroups.map(g =>
      h('div', { key: g.name, style: sectionStyle },
        h('h4', { style: subheadStyle }, g.name),
        h('table', { style: tableStyle },
          h('thead', null,
            h('tr', null,
              th('L · D'),
              th('토큰 이름'),
              th('라이트 (참조 → 값)'),
              th('다크 (참조 → 값)'),
              th('용도'),
              th('CSS 변수')
            )
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.name },
                td(DualSwatch(t.value, t.darkValue)),
                td(Chip(t.name)),
                td(RefVal(t.ref, t.value)),
                td(RefVal(t.darkRef, t.darkValue)),
                td(t.usage || ''),
                td(CssChip(t.name))
              )
            )
          )
        )
      )
    )
  );

// ─── 3. 타이포 프리미티브 ─────────────────────────────────────────────────────

const typoGroupLabelStyle = {
  margin: '16px 0 6px',
  fontSize: '13px',
  fontWeight: 700,
  color: '#333',
  borderLeft: '3px solid #256ef4',
  paddingLeft: '8px',
};

const FigmaChip = (txt) =>
  h('code', { style: { ...chipStyle, background: 'transparent', color: '#888', fontSize: '11px' } }, txt);

const TypoSampleInline = (token) => {
  if (token.group === 'font-size') {
    const rem = parseFloat(token.value);
    const px = rem * 10;
    return h('span', { style: { fontSize: px + 'px', lineHeight: 1.3, color: '#1e2124', whiteSpace: 'nowrap' } }, '가나다 Aa');
  }
  if (token.group === 'font-weight') {
    return h('span', { style: { fontWeight: token.value, fontSize: '14px', color: '#1e2124' } }, '가나다 Aa');
  }
  if (token.group === 'line-height') {
    return h('span', { style: { lineHeight: token.value, fontSize: '12px', color: '#555', display: 'inline-block', width: '40px', border: '1px dashed #cdd1d5', padding: '2px 4px' } }, '행\n간');
  }
  if (token.group === 'font-letter-spacing') {
    return h('span', { style: { letterSpacing: token.value, fontSize: '13px', color: '#1e2124' } }, '가나다 Aa');
  }
  return h('span', { style: { fontSize: '12px', color: '#888', fontFamily: token.name === 'font-family-code' ? 'monospace' : 'sans-serif' } }, 'Aa 가나다');
};

export const TypoPrimTable = () =>
  h(Fragment, null,
    ...typoPrimGroupedTokens.map(g =>
      h('div', { key: g.group, style: sectionStyle },
        h('div', { style: typoGroupLabelStyle }, g.label),
        h('table', { style: tableStyle },
          g.group === 'font-size'
            ? h('colgroup', null,
                h('col', { style: { width: '220px' } }),
                h('col', null), h('col', null), h('col', null), h('col', null), h('col', null), h('col', null)
              )
            : null,
          h('thead', null,
            h('tr', null, th('견본'), th('토큰 이름'), th('값'), th('피그마'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.name },
                td(TypoSampleInline({ ...t, group: g.group })),
                td(Chip(t.name)),
                td(GrayChip(t.value)),
                td(FigmaChip(t.figma)),
                td(t.usage || ''),
                td(KrdsChip(t.krds)),
                td(CssChip(t.name))
              )
            )
          )
        )
      )
    )
  );

// ─── 3. 텍스트 스타일 ─────────────────────────────────────────────────────────

const TypoSample = (valuePC) => {
  const parts = (valuePC || '').split(' / ');
  const szRem = parseFloat(parts[0]) || 1.7;
  const szPx = szRem * 10;
  const wStr = parts[1] || '400';
  const fw = wStr === 'bold' ? '700' : wStr === '500' ? '500' : '400';
  return h('span', {
    style: { fontSize: szPx + 'px', fontWeight: fw, lineHeight: 1.4, color: '#1e2124', whiteSpace: 'nowrap' }
  }, '가나다 Aa');
};

export const TypoStyleTable = () =>
  h('table', { style: tableStyle },
    h('colgroup', null,
      h('col', { style: { width: '220px' } }),
      h('col', null), h('col', null), h('col', null), h('col', null), h('col', null)
    ),
    h('thead', null,
      h('tr', null, th('견본'), th('토큰 이름'), th('PC (크기/굵기/행간)'), th('모바일'), th('용도'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...typoStyleTokens.map(t =>
        h('tr', { key: t.name },
          td(TypoSample(t.valuePC)),
          td(Chip(t.name)),
          td(GrayChip(t.valuePC)),
          td(t.valuePC === t.valueMobile
            ? h('span', { style: { color: '#aaa', fontSize: '11px' } }, '동일')
            : h('code', { style: { ...chipStyle, background: '#fff8e0' } }, t.valueMobile)
          ),
          td(t.usage || ''),
          td(CssChip(t.name))
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

const sizeGroupLabelStyle = {
  margin: '16px 0 6px',
  fontSize: '13px',
  fontWeight: 700,
  color: '#256ef4',
  letterSpacing: '0.03em',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const sizeBadgeStyle = (size) => {
  const colorMap = { xs: '#8a949e', s: '#3fa654', m: '#256ef4', l: '#de3412', xl: '#6b3fa0' };
  return {
    display: 'inline-block',
    padding: '1px 7px',
    borderRadius: '10px',
    background: colorMap[size] || '#8a949e',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: 'monospace',
    letterSpacing: '0.05em',
  };
};

export const SpacingPrimTable = () =>
  h(Fragment, null,
    ...spacingPrimGroupedTokens.map(g =>
      h('div', { key: g.size, style: sectionStyle },
        h('div', { style: sizeGroupLabelStyle },
          h('span', { style: sizeBadgeStyle(g.size) }, g.size),
          h('span', { style: { color: '#555', fontWeight: 400 } }, g.label.replace(/^[a-z]+\s+—\s+/, ''))
        ),
        h('table', { style: tableStyle },
          h('thead', null,
            h('tr', null, th('견본'), th('토큰 이름'), th('원본 토큰'), th('값'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.name },
                td(SpacingBar(t.value, '#8a949e')),
                td(Chip(t.name)),
                td(GrayChip(t.base)),
                td(GrayChip(t.value)),
                td(t.usage || ''),
                td(KrdsChip(t.krds)),
                td(CssChip(t.name))
              )
            )
          )
        )
      )
    )
  );

// ─── 4. 간격 시멘틱 ───────────────────────────────────────────────────────────

const deprecatedWrapStyle = {
  position: 'relative',
  opacity: 0.45,
  pointerEvents: 'none',
  userSelect: 'none',
};

const deprecatedBannerStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  marginBottom: '10px',
  padding: '5px 12px',
  background: '#fff3cd',
  border: '1px solid #ffc107',
  borderRadius: '4px',
  fontSize: '12px',
  color: '#856404',
  fontWeight: 600,
  pointerEvents: 'auto',
};

export const SpacingSemanticTable = () =>
  h('div', { style: { position: 'relative' } },
    h('div', { style: deprecatedBannerStyle },
      h('span', null, '⚠'),
      h('span', null, '미사용 — gap / padding / margin 시멘틱 토큰은 프리미티브(space-{크기}-{px})로 대체 예정입니다.')
    ),
    h('div', { style: deprecatedWrapStyle },
      h('table', { style: tableStyle },
        h('thead', null,
          h('tr', null, th('견본'), th('토큰 이름'), th('참조 프리미티브'), th('PC 값'), th('모바일'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
        ),
        h('tbody', null,
          ...spacingSemanticTokens.map(t =>
            h('tr', { key: t.name },
              td(SpacingBar(t.value, '#256ef4')),
              td(Chip(t.name)),
              td(Chip(t.ref)),
              td(GrayChip(t.value)),
              td(t.mobile
                ? h('code', { style: { ...chipStyle, background: '#fff8e0' } }, t.mobile)
                : h('span', { style: { color: '#aaa', fontSize: '11px' } }, '동일')
              ),
              td(t.usage || ''),
              td(KrdsChip(t.krds)),
              td(CssChip(t.name))
            )
          )
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
      h('tr', null, th('견본'), th('토큰 이름'), th('값'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...radiusPrimTokens.map(t =>
        h('tr', { key: t.name },
          td(RadiusBox(t.value, '#d8e5fd', '#256ef4')),
          td(Chip(t.name)),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(KrdsChip(t.krds)),
          td(CssChip(t.name))
        )
      )
    )
  );

export const RadiusSemanticTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('토큰 이름'), th('참조 프리미티브'), th('값'), th('모바일'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...radiusSemanticTokens.map(t =>
        h('tr', { key: t.name },
          td(RadiusBox(t.value, '#ecf2fe', '#0b50d0')),
          td(Chip(t.name)),
          td(Chip(t.ref)),
          td(GrayChip(t.value)),
          td(h('span', { style: { color: '#aaa', fontSize: '11px' } }, '동일')),
          td(t.usage || ''),
          td(KrdsChip(t.krds)),
          td(CssChip(t.name))
        )
      )
    )
  );

// ─── 5. 그림자 ────────────────────────────────────────────────────────────────

const ShadowBox = (shadowValue) =>
  h('div', {
    style: {
      width: '48px', height: '32px',
      background: '#ffffff',
      borderRadius: '4px',
      boxShadow: shadowValue === 'none' ? 'none' : shadowValue,
      border: shadowValue === 'none' ? '1px dashed #cdd1d5' : 'none',
      flexShrink: 0,
    }
  });

// token-data의 value는 가독용 문자열(px 단위). CSS 적용용 실제 값은 별도 맵.
const shadowCssValues = {
  'shadow-none': 'none',
  'shadow-s': '0 0 0.2rem 0 rgba(0,0,0,.10), 0 0.4rem 0.8rem 0 rgba(0,0,0,.10)',
  'shadow-m': '0 0 0.2rem 0 rgba(0,0,0,.10), 0 0.8rem 1.6rem 0 rgba(0,0,0,.10)',
  'shadow-l': '0 0 0.2rem 0 rgba(0,0,0,.10), 0 1.6rem 2.4rem 0 rgba(0,0,0,.25)',
};

export const ShadowTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('토큰 이름'), th('참조'), th('값 (px 기준)'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...shadowSemanticTokens.map(t =>
        h('tr', { key: t.name },
          td(ShadowBox(shadowCssValues[t.name] || 'none')),
          td(Chip(t.name)),
          td(t.ref ? GrayChip(t.ref) : h('span', { style: { color: '#aaa', fontSize: '11px' } }, '—')),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(KrdsChip(t.krds)),
          td(CssChip(t.name))
        )
      )
    )
  );
