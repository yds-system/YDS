/**
 * 네이밍 정의서 공용 UI 컴포넌트
 *
 * components-naming.mdx(전체 정의서)와 각 컴포넌트 mdx 파일에서 import해서 사용한다.
 * React.createElement(h)를 직접 사용해 Vite의 JSX 설정 없이도 동작한다.
 */
import { createElement as h, Fragment } from 'react';

// ─── 내부 유틸 ─────────────────────────────────────────────────────────────────

const chipStyle = {
  display: 'inline-block',
  background: '#f1f3f5',
  padding: '1px 6px',
  borderRadius: '4px',
  fontSize: '12px',
  fontFamily: 'monospace',
  whiteSpace: 'nowrap',
};

const Chip = (cls) => h('code', { style: chipStyle }, cls);

/**
 * 클래스가 해당 블록의 "자체 요소"인지 판별한다.
 * BEM 기준: baseClass 자체이거나 baseClass__ / baseClass-- 로 시작.
 */
const isOwn = (cls, baseClass) =>
  cls === baseClass ||
  cls.startsWith(baseClass + '__') ||
  cls.startsWith(baseClass + '--');

// ─── 공용 exports ──────────────────────────────────────────────────────────────

/** "확인 필요" 뱃지 — 개별 mdx에서 별도 정의 불필요 */
export const UNCONFIRMED = h(
  'span',
  { style: { color: '#c97a00', fontWeight: 600, fontSize: '0.8em', marginLeft: '0.4em' } },
  '확인 필요'
);

const sharedLabel = h(
  'span',
  { style: { fontSize: '11px', color: '#888', whiteSpace: 'nowrap' } },
  '(공통)'
);

const separatorRowStyle = {
  borderTop: '2px solid #e0e0e0',
  padding: '3px 8px',
  fontSize: '11px',
  color: '#888',
  background: '#fafafa',
  textAlign: 'center',
};

// ─── CompRow ───────────────────────────────────────────────────────────────────

/**
 * 전체 네이밍 정의서(components-naming.mdx)의 테이블 행 하나.
 * 하위 요소·modifier를 세로 칩 목록으로 표시하고,
 * 다른 블록 클래스는 구분선 + "(공통)" 표시로 구분한다.
 */
export const CompRow = ({ comp, elementFilter, modifierFilter }) => {
  const allEls = comp.elements.filter((e) => e.class !== comp.baseClass);
  const els = elementFilter ? allEls.filter(elementFilter) : allEls;
  const mods = modifierFilter
    ? comp.modifiers.filter(modifierFilter)
    : comp.modifiers;

  const renderList = (items) => {
    if (!items.length) return null;
    const own = items.filter((item) => isOwn(item.class, comp.baseClass));
    const shared = items.filter((item) => !isOwn(item.class, comp.baseClass));

    return h(
      'div',
      null,
      own.map((item, i) =>
        h('div', { key: i, style: { marginBottom: '3px' } }, Chip(item.class))
      ),
      shared.length > 0
        ? [
            h('hr', {
              key: 'sep',
              style: {
                margin: '6px 0',
                border: 'none',
                borderTop: '1px solid #e0e0e0',
              },
            }),
            ...shared.map((item, i) =>
              h(
                'div',
                {
                  key: `s${i}`,
                  style: {
                    marginBottom: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    flexWrap: 'wrap',
                  },
                },
                Chip(item.class),
                sharedLabel
              )
            ),
          ]
        : null
    );
  };

  return h(
    'tr',
    null,
    h('td', null, comp.name),
    h('td', null, comp.englishName),
    h('td', null, Chip(comp.baseClass)),
    h('td', null, renderList(els)),
    h('td', null, renderList(mods)),
    h('td', null, comp.description)
  );
};

// ─── ElementTable ──────────────────────────────────────────────────────────────

/**
 * 개별 컴포넌트 문서의 "클래스명 표".
 *
 * @param {object[]} elements  - namingData.elements
 * @param {string}   baseClass - namingData.baseClass (제공 시 공통 블록 구분)
 * @param {boolean}  showKrds  - true 시 "KRDS 원본" 열 표시
 */
export const ElementTable = ({ elements, baseClass, showKrds }) => {
  const own = baseClass
    ? elements.filter((el) => isOwn(el.class, baseClass))
    : elements;
  const shared = baseClass
    ? elements.filter((el) => !isOwn(el.class, baseClass))
    : [];
  const cols = showKrds ? 4 : 3;

  const makeRow = (el, key, isSharedRow) =>
    h(
      'tr',
      { key },
      h(
        'td',
        null,
        el.element,
        isSharedRow
          ? h('span', {
              style: { marginLeft: '0.4em', fontSize: '0.8em', color: '#888' },
            }, ' (공통)')
          : null
      ),
      h('td', null, Chip(el.class), !el.confirmed ? UNCONFIRMED : null),
      showKrds ? h('td', null, h('code', null, el.krdsClass)) : null,
      h('td', null, el.description)
    );

  return h(
    'table',
    null,
    h(
      'thead',
      null,
      h(
        'tr',
        null,
        h('th', null, '요소'),
        h('th', null, '클래스명'),
        showKrds ? h('th', null, 'KRDS 원본') : null,
        h('th', null, '설명')
      )
    ),
    h(
      'tbody',
      null,
      own.map((el, i) => makeRow(el, i, false)),
      shared.length > 0
        ? [
            h('tr', { key: 'sep' },
              h('td', { colSpan: cols, style: separatorRowStyle }, '공통 블록 클래스')
            ),
            ...shared.map((el, i) => makeRow(el, `s${i}`, true)),
          ]
        : null
    )
  );
};

// ─── ModifierTable ─────────────────────────────────────────────────────────────

/**
 * 개별 컴포넌트 문서의 "변형(modifier) 표".
 *
 * @param {object[]} modifiers - namingData.modifiers
 * @param {string}   baseClass - namingData.baseClass (제공 시 공통 블록 구분)
 * @param {boolean}  showKrds  - true 시 "KRDS 원본" 열 표시
 */
export const ModifierTable = ({ modifiers, baseClass, showKrds }) => {
  const own = baseClass
    ? modifiers.filter((m) => isOwn(m.class, baseClass))
    : modifiers;
  const shared = baseClass
    ? modifiers.filter((m) => !isOwn(m.class, baseClass))
    : [];
  const cols = showKrds ? 4 : 3;

  const makeRow = (mod, key, isSharedRow) =>
    h(
      'tr',
      { key },
      h('td', null, mod.category),
      h(
        'td',
        null,
        Chip(mod.class),
        !mod.confirmed ? UNCONFIRMED : null,
        isSharedRow
          ? h('span', {
              style: { marginLeft: '0.5em', fontSize: '0.8em', color: '#888' },
            }, '(공통)')
          : null
      ),
      showKrds ? h('td', null, h('code', null, mod.krdsClass)) : null,
      h('td', null, mod.description)
    );

  return h(
    'table',
    null,
    h(
      'thead',
      null,
      h(
        'tr',
        null,
        h('th', null, '분류'),
        h('th', null, '클래스명'),
        showKrds ? h('th', null, 'KRDS 원본') : null,
        h('th', null, '설명')
      )
    ),
    h(
      'tbody',
      null,
      own.map((mod, i) => makeRow(mod, i, false)),
      shared.length > 0
        ? [
            h('tr', { key: 'sep' },
              h('td', { colSpan: cols, style: separatorRowStyle }, '공통 블록 클래스')
            ),
            ...shared.map((mod, i) => makeRow(mod, `s${i}`, true)),
          ]
        : null
    )
  );
};
