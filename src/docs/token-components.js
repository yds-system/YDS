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
  spacingSizeGroups,
  spacingSemanticTokens,
  shadowSemanticTokens,
  radiusPrimTokens,
  radiusSemanticTokens,
  themeProjectAOverrides,
  responsiveTypoTokens,
  responsiveSpacingGroups,
  responsiveLayoutTokens,
  responsivePaddingCardTokens,
  responsiveGapLayoutTokens,
  fixedSpacingSizeGroups,
  semanticTypoStyleTokens,
  shadowColorTokens,
  semanticStaticColorTokens,
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
            h('tr', null, th('견본'), th('토큰 이름'), th('값'), th('용도'), th('CSS 변수'))
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.name },
                td(ColorSwatch(t.value)),
                td(Chip(t.name)),
                td(GrayChip(t.value)),
                td(t.usage || ''),
                td(CssChip(t.name))
              )
            )
          )
        )
      )
    )
  );

// ─── 2. 색상 시멘틱 ───────────────────────────────────────────────────────────

const swatchSlice = (bg, radius) => h('div', {
  style: {
    width: '20px', height: '28px', background: bg,
    borderRadius: radius, border: '1px solid rgba(0,0,0,0.12)',
    flexShrink: 0,
  }
});

const TripleSwatch = (lightVal, darkVal, hcVal) =>
  h('div', { style: { display: 'flex', gap: '1px', flexShrink: 0 } },
    swatchSlice(lightVal, '4px 0 0 4px'),
    swatchSlice(darkVal,  '0 0 0 0'),
    swatchSlice(hcVal,    '0 4px 4px 0')
  );

const RefVal = (ref, val) =>
  h('span', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
    ref ? Chip(ref) : h('span', { style: { color: '#aaa', fontSize: '11px' } }, '고정값'),
    GrayChip(val)
  );

const renderSemanticGroup = (g) => {
  const title = g.name || g.group;
  return h('div', { key: title, style: sectionStyle },
    h('h4', { style: subheadStyle }, title),
    h('table', { style: tableStyle },
      h('thead', null,
        h('tr', null,
          th('L · D · HC'),
          th('토큰 이름'),
          th('라이트 (참조 → 값)'),
          th('다크 (참조 → 값)'),
          th('고대비 (참조 → 값)'),
          th('용도'),
          th('CSS 변수')
        )
      ),
      h('tbody', null,
        ...g.tokens.map(t =>
          h('tr', { key: t.name },
            td(TripleSwatch(t.value, t.darkValue, t.hcValue)),
            td(Chip(t.name)),
            td(RefVal(t.ref, t.value)),
            td(RefVal(t.darkRef, t.darkValue)),
            td(RefVal(t.hcRef, t.hcValue)),
            td(t.usage || ''),
            td(CssChip(t.name))
          )
        )
      )
    )
  );
};

export const ColorSemanticTable = () =>
  h(Fragment, null, ...colorSemanticGroups.map(renderSemanticGroup));

export const IconColorTable = () =>
  h(Fragment, null,
    ...colorSemanticGroups
      .filter(g => (g.name || g.group || '').startsWith('color-icon'))
      .map(renderSemanticGroup)
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
                h('col', null), h('col', null), h('col', null), h('col', null), h('col', null)
              )
            : null,
          h('thead', null,
            h('tr', null, th('견본'), th('토큰 이름'), th('값'), th('피그마'), th('용도'), th('CSS 변수'))
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.name },
                td(TypoSampleInline({ ...t, group: g.group })),
                td(Chip(t.name)),
                td(GrayChip(t.value)),
                td(FigmaChip(t.figma)),
                td(t.usage || ''),
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

const RefPrimChips = (refs) => {
  if (!refs || refs.length === 0) return h('span', { style: { color: '#aaa', fontSize: '11px' } }, '—');
  return h('span', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
    ...refs.map((r, i) => h('code', { key: i, style: { ...chipStyle, background: '#f0f7ff', color: '#0b50d0', fontSize: '11px' } }, r))
  );
};

const TypoStyleTableData = (tokens) =>
  h('table', { style: tableStyle },
    h('colgroup', null,
      h('col', { style: { width: '200px' } }),
      h('col', null), h('col', null), h('col', null), h('col', null), h('col', null)
    ),
    h('thead', null,
      h('tr', null, th('견본'), th('토큰 이름'), th('크기/굵기/행간'), th('참조 프리미티브'), th('용도'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...tokens.map(t =>
        h('tr', { key: t.name },
          td(TypoSample(t.valuePC)),
          td(Chip(t.name)),
          td(GrayChip(t.valuePC)),
          td(RefPrimChips(t.refsPC)),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

export const TypoStyleTable         = () => TypoStyleTableData(typoStyleTokens);
export const SemanticTypoStyleTable = () => TypoStyleTableData(semanticTypoStyleTokens);

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
      h('tr', null, th('견본'), th('토큰 이름'), th('값'), th('px'), th('용도'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...spacingPrimTokens.map(t =>
        h('tr', { key: t.name },
          td(SpacingBar(t.value, '#256ef4')),
          td(Chip(t.name)),
          td(GrayChip(t.value)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, parseFloat(t.value) * 10 + 'px')),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

// ─── 4. 간격 크기 별칭 (시멘틱) ──────────────────────────────────────────────

const sizeGroupLabelStyle = {
  margin: '16px 0 6px',
  fontSize: '13px',
  fontWeight: 700,
  color: '#333',
  borderLeft: '3px solid #256ef4',
  paddingLeft: '8px',
};

const SpacingSizeSection = (groups, { showMobile = false } = {}) =>
  h(Fragment, null,
    ...groups.map(g =>
      h('div', { key: g.size, style: sectionStyle },
        h('div', { style: sizeGroupLabelStyle }, g.label),
        h('table', { style: tableStyle },
          h('colgroup', null,
            h('col', { style: { width: '200px' } }),
            h('col', null), h('col', null), h('col', null), h('col', null),
            showMobile ? h('col', null) : null,
            h('col', null), h('col', null)
          ),
          h('thead', null,
            h('tr', null,
              th('견본'),
              th('토큰 이름'),
              th('참조 프리미티브'),
              th('값 (PC)'),
              th('px'),
              showMobile ? th('모바일') : null,
              th('용도'),
              th('CSS 변수')
            )
          ),
          h('tbody', null,
            ...g.tokens.map(t =>
              h('tr', { key: t.name },
                td(SpacingBar(t.value, '#7ec88e')),
                td(Chip(t.name)),
                td(Chip(t.ref)),
                td(GrayChip(t.value)),
                td(h('span', { style: { color: '#888', fontSize: '11px' } }, parseFloat(t.value) * 10 + 'px')),
                showMobile ? td(t.mobile
                  ? h('code', { style: { ...chipStyle, background: '#fff8e0' } }, t.mobile)
                  : h('code', { style: { ...chipStyle, background: '#f0f0f0', color: '#888' } }, t.value)
                ) : null,
                td(t.usage || ''),
                td(CssChip(t.name))
              )
            )
          )
        )
      )
    )
  );

export const SpacingSizeTable       = () => SpacingSizeSection(spacingSizeGroups);
export const FixedSpacingSizeTable  = () => SpacingSizeSection(fixedSpacingSizeGroups);
export const ResponsiveSpacingTable = () => SpacingSizeSection(responsiveSpacingGroups);
export const AllSpacingSizeTable    = () => SpacingSizeSection(spacingSizeGroups, { showMobile: true });

// ─── 4. 간격 시멘틱 ───────────────────────────────────────────────────────────

export const SpacingSemanticTable = () =>
  h(Fragment, null,
    h('p', { style: { marginBottom: '12px', color: '#464c53' } },
      '프로젝트에 맞게 조정 가능한 용도별 간격'
    ),
    h('table', { style: tableStyle },
      h('thead', null,
        h('tr', null, th('견본'), th('토큰 이름'), th('참조 프리미티브'), th('값'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
      ),
      h('tbody', null,
        ...spacingSemanticTokens.map(t =>
          h('tr', { key: t.name },
            td(SpacingBar(t.value, '#256ef4')),
            td(Chip(t.name)),
            td(Chip(t.ref)),
            td(GrayChip(t.value)),
            td(t.usage || ''),
            td(KrdsChip(t.krds)),
            td(CssChip(t.name))
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
      h('tr', null, th('견본'), th('토큰 이름'), th('값'), th('용도'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...radiusPrimTokens.map(t =>
        h('tr', { key: t.name },
          td(RadiusBox(t.value, '#d8e5fd', '#256ef4')),
          td(Chip(t.name)),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

export const RadiusSemanticTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('토큰 이름'), th('참조 프리미티브'), th('값'), th('용도'), th('KRDS 원본'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...radiusSemanticTokens.map(t =>
        h('tr', { key: t.name },
          td(RadiusBox(t.value, '#ecf2fe', '#0b50d0')),
          td(Chip(t.name)),
          td(Chip(t.ref)),
          td(GrayChip(t.value)),
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

// ─── 인라인 페이지 TOC ────────────────────────────────────────────────────────

const tocWrapStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  margin: '16px 0 32px',
};

const tocPillStyle = {
  display: 'inline-block',
  padding: '4px 14px',
  borderRadius: '99px',
  background: '#f1f3f5',
  color: '#256ef4',
  fontSize: '13px',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid #e0e7ff',
  lineHeight: 1.5,
};

const PageToc = (sections) =>
  h('nav', { 'aria-label': '페이지 목차', style: tocWrapStyle },
    ...sections.map(({ label, anchor }) =>
      h('a', { key: anchor, href: '#' + anchor, style: tocPillStyle }, label)
    )
  );

export const PageTocPrimitive = () => PageToc([
  { label: '색상',       anchor: '색상'       },
  { label: '타이포그래피', anchor: '타이포그래피' },
  { label: '간격',       anchor: '간격'       },
  { label: '모서리',     anchor: '모서리'     },
]);

export const PageTocSemantic = () => PageToc([
  { label: '고정 색상',    anchor: '고정-색상'    },
  { label: '타이포그래피', anchor: '타이포그래피' },
  { label: '간격',         anchor: '간격'         },
  { label: '모서리',       anchor: '모서리'       },
  { label: '그림자',       anchor: '그림자'       },
]);

// ─── 색상 모드 안내 박스 ──────────────────────────────────────────────────────

const infoBoxStyle = {
  background: '#f0f7ff',
  border: '1px solid #c3dbf7',
  borderLeft: '4px solid #256ef4',
  borderRadius: '6px',
  padding: '14px 16px',
  marginBottom: '24px',
  fontSize: '13px',
  lineHeight: 1.6,
  color: '#1e2124',
};

const codeBlockStyle = {
  display: 'block',
  background: '#1e2124',
  color: '#f4f5f6',
  borderRadius: '4px',
  padding: '10px 14px',
  fontFamily: 'monospace',
  fontSize: '12px',
  lineHeight: 1.7,
  margin: '10px 0 4px',
  whiteSpace: 'pre',
  overflowX: 'auto',
};

export const ModeInfoBox = () =>
  h('div', { style: infoBoxStyle },
    h('strong', null, '화면 모드 전환'),
    h('p', { style: { margin: '6px 0 4px' } },
      'Storybook 툴바의 ', h('strong', null, '화면 모드'), ' 셀렉터, 또는 ', h('code', null, 'html'), ' 요소에 ', h('code', null, 'data-mode'), ' 속성으로 전환합니다.'
    ),
    h('code', { style: codeBlockStyle },
      [
        '<!-- 라이트 (기본, 속성 없음) -->',
        '<html>',
        '',
        '<!-- 다크 모드 -->',
        '<html data-mode="dark">',
        '',
        '<!-- 고대비 (KRDS 선명한 화면) -->',
        '<html data-mode="high-contrast">',
        '',
        '<!-- 시스템 (OS 다크 설정 연동) -->',
        '<html data-mode="system">',
      ].join('\n')
    ),
    h('p', { style: { margin: '8px 0 0', color: '#555', fontSize: '12px' } },
      '고대비 모드는 WCAG AAA(7:1) 기준. 공공기관 필수 항목. ',
      h('code', null, 'data-krds-mode="high-contrast"'),
      ' 도 자동 동기화됩니다.'
    )
  );

// ─── 반응형: 타이포 표 ────────────────────────────────────────────────────────

const PcChip     = (txt) => h('code', { style: { ...chipStyle, background: '#f0f7ff', color: '#0b50d0', fontSize: '11px' } }, txt);
const MobileChip = (txt) => h('code', { style: { ...chipStyle, background: '#fff8e0', color: '#8a5c00', fontSize: '11px' } }, txt);

export const ResponsiveTypoTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null,
        th('토큰 이름'),
        th('PC 참조'), th('PC 값'), th('PC px'),
        th('모바일 참조'), th('모바일 값'), th('모바일 px'),
        th('용도'), th('CSS 변수')
      )
    ),
    h('tbody', null,
      ...responsiveTypoTokens.map(t =>
        h('tr', { key: t.name },
          td(Chip(t.name)),
          td(PcChip(t.pcRef)),
          td(GrayChip(t.pcValue)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, t.pcPx)),
          td(MobileChip(t.mobileRef)),
          td(GrayChip(t.mobileValue)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, t.mobilePx)),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

// ─── 반응형: 레이아웃 표 ──────────────────────────────────────────────────────

export const ResponsiveLayoutTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null,
        th('토큰 이름'),
        th('PC 참조'), th('PC 값'), th('PC px'),
        th('모바일 참조'), th('모바일 값'), th('모바일 px'),
        th('용도'), th('CSS 변수')
      )
    ),
    h('tbody', null,
      ...responsiveLayoutTokens.map(t =>
        h('tr', { key: t.name },
          td(Chip(t.name)),
          td(PcChip(t.pcRef)),
          td(GrayChip(t.pcValue)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, t.pcPx)),
          td(MobileChip(t.mobileRef)),
          td(GrayChip(t.mobileValue)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, t.mobilePx)),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

// ─── 모드: 그림자 색상 표 ─────────────────────────────────────────────────────

export const ShadowColorTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('토큰 이름'), th('참조 프리미티브'), th('값'), th('용도'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...shadowColorTokens.map(t =>
        h('tr', { key: t.name },
          td(ColorSwatch(t.value)),
          td(Chip(t.name)),
          td(Chip(t.ref)),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

// ─── 시멘틱: 고정 색상 표 ─────────────────────────────────────────────────────

export const SemanticStaticColorTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null, th('견본'), th('토큰 이름'), th('참조 프리미티브'), th('값'), th('용도'), th('CSS 변수'))
    ),
    h('tbody', null,
      ...semanticStaticColorTokens.map(t =>
        h('tr', { key: t.name },
          td(ColorSwatch(t.value)),
          td(Chip(t.name)),
          td(Chip(t.ref)),
          td(GrayChip(t.value)),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

// ─── 추가 TOC ─────────────────────────────────────────────────────────────────

export const ResponsivePaddingCardTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null,
        th('토큰 이름'),
        th('PC 참조'), th('PC 값'), th('PC px'),
        th('모바일 참조'), th('모바일 값'), th('모바일 px'),
        th('용도'), th('CSS 변수')
      )
    ),
    h('tbody', null,
      ...responsivePaddingCardTokens.map(t =>
        h('tr', { key: t.name },
          td(Chip(t.name)),
          td(PcChip(t.pcRef)),
          td(GrayChip(t.pcValue)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, t.pcPx)),
          td(MobileChip(t.mobileRef)),
          td(GrayChip(t.mobileValue)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, t.mobilePx)),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

export const ResponsiveGapLayoutTable = () =>
  h('table', { style: tableStyle },
    h('thead', null,
      h('tr', null,
        th('토큰 이름'),
        th('PC 참조'), th('PC 값'), th('PC px'),
        th('모바일 참조'), th('모바일 값'), th('모바일 px'),
        th('용도'), th('CSS 변수')
      )
    ),
    h('tbody', null,
      ...responsiveGapLayoutTokens.map(t =>
        h('tr', { key: t.name },
          td(Chip(t.name)),
          td(PcChip(t.pcRef)),
          td(GrayChip(t.pcValue)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, t.pcPx)),
          td(MobileChip(t.mobileRef)),
          td(GrayChip(t.mobileValue)),
          td(h('span', { style: { color: '#888', fontSize: '11px' } }, t.mobilePx)),
          td(t.usage || ''),
          td(CssChip(t.name))
        )
      )
    )
  );

export const PageTocResponsive = () => PageToc([
  { label: '타이포그래피',       anchor: '타이포그래피'       },
  { label: '간격 그룹',          anchor: '간격-그룹'          },
  { label: '레이아웃',           anchor: '레이아웃'           },
  { label: '카드 패딩',          anchor: '카드-패딩'          },
  { label: '레이아웃 조합 간격', anchor: '레이아웃-조합-간격' },
]);

export const PageTocMode = () => PageToc([
  { label: '색상',     anchor: '색상'   },
  { label: '그림자색', anchor: '그림자색' },
]);
