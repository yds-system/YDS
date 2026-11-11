/**
 * 디자인 토큰 데이터
 * design-tokens.mdx에서 import해 표를 자동 생성한다.
 *
 * 각 토큰 필드:
 *   name   — 토큰 이름 (-- 없음, 예: color-gray-0 / color-bg-primary)
 *   figma  — 피그마 변수 이름 (color/gray/0 등)
 *   value  — 실제 값 (resolved, 표시용)
 *   ref    — 참조하는 프리미티브 토큰 이름 (-- 없음, 시멘틱 토큰만)
 *   usage  — 용도 설명
 *   krds   — KRDS 원본 변수명 / 자체 추가 표시
 *
 * CSS 변수명은 '--' + name 으로 파생한다.
 */

/* ── 1. 색상 프리미티브 ────────────────────────────────────────────────────── */

export const colorPrimGroups = [
  {
    name: 'primary',
    tokens: [
      { name: 'color-primary-5',  figma: 'color/primary/5',  value: '#ecf2fe', usage: '브랜드 연한 배경·선택 상태', krds: '--krds-color-light-primary-5'  },
      { name: 'color-primary-10', figma: 'color/primary/10', value: '#d8e5fd', usage: '브랜드 hover 연한',           krds: '--krds-color-light-primary-10' },
      { name: 'color-primary-20', figma: 'color/primary/20', value: '#b1cefb', usage: '',                             krds: '--krds-color-light-primary-20' },
      { name: 'color-primary-30', figma: 'color/primary/30', value: '#86aff9', usage: '',                             krds: '--krds-color-light-primary-30' },
      { name: 'color-primary-40', figma: 'color/primary/40', value: '#4c87f6', usage: '',                             krds: '--krds-color-light-primary-40' },
      { name: 'color-primary-50', figma: 'color/primary/50', value: '#256ef4', usage: '브랜드 배경·링크·포커스 링',  krds: '--krds-color-light-primary-50' },
      { name: 'color-primary-60', figma: 'color/primary/60', value: '#0b50d0', usage: '브랜드 텍스트·hover',         krds: '--krds-color-light-primary-60' },
      { name: 'color-primary-70', figma: 'color/primary/70', value: '#083891', usage: '브랜드 pressed',              krds: '--krds-color-light-primary-70' },
      { name: 'color-primary-80', figma: 'color/primary/80', value: '#052561', usage: '',                             krds: '--krds-color-light-primary-80' },
      { name: 'color-primary-90', figma: 'color/primary/90', value: '#03163a', usage: '',                             krds: '--krds-color-light-primary-90' },
      { name: 'color-primary-95', figma: 'color/primary/95', value: '#020f27', usage: '',                             krds: '--krds-color-light-primary-95' },
    ],
  },
  {
    name: 'secondary',
    tokens: [
      { name: 'color-secondary-5',  figma: 'color/secondary/5',  value: '#eef2f7', usage: '2번 브랜드 연한 배경',     krds: '--krds-color-light-secondary-5'  },
      { name: 'color-secondary-10', figma: 'color/secondary/10', value: '#d6e0eb', usage: '',                           krds: '--krds-color-light-secondary-10' },
      { name: 'color-secondary-20', figma: 'color/secondary/20', value: '#bacbde', usage: '',                           krds: '--krds-color-light-secondary-20' },
      { name: 'color-secondary-30', figma: 'color/secondary/30', value: '#90b0d5', usage: '',                           krds: '--krds-color-light-secondary-30' },
      { name: 'color-secondary-40', figma: 'color/secondary/40', value: '#6b96c7', usage: '',                           krds: '--krds-color-light-secondary-40' },
      { name: 'color-secondary-50', figma: 'color/secondary/50', value: '#346fb2', usage: '2번 브랜드 배경·테두리',    krds: '--krds-color-light-secondary-50' },
      { name: 'color-secondary-60', figma: 'color/secondary/60', value: '#1c589c', usage: '2번 브랜드 텍스트·hover',  krds: '--krds-color-light-secondary-60' },
      { name: 'color-secondary-70', figma: 'color/secondary/70', value: '#063a74', usage: '2번 브랜드 pressed',        krds: '--krds-color-light-secondary-70' },
      { name: 'color-secondary-80', figma: 'color/secondary/80', value: '#052b57', usage: '',                           krds: '--krds-color-light-secondary-80' },
      { name: 'color-secondary-90', figma: 'color/secondary/90', value: '#031f3f', usage: '',                           krds: '--krds-color-light-secondary-90' },
      { name: 'color-secondary-95', figma: 'color/secondary/95', value: '#02162c', usage: '',                           krds: '--krds-color-light-secondary-95' },
    ],
  },
  {
    name: 'gray',
    tokens: [
      { name: 'color-gray-0',   figma: 'color/gray/0',   value: '#ffffff', usage: '흰색 배경·역방향 글자',     krds: '--krds-color-light-gray-0'   },
      { name: 'color-gray-5',   figma: 'color/gray/5',   value: '#f4f5f6', usage: '섹션·코드 배경',            krds: '--krds-color-light-gray-5'   },
      { name: 'color-gray-10',  figma: 'color/gray/10',  value: '#e6e8ea', usage: '비활성 배경·테이블 행',     krds: '--krds-color-light-gray-10'  },
      { name: 'color-gray-20',  figma: 'color/gray/20',  value: '#cdd1d5', usage: '비활성·구분선',             krds: '--krds-color-light-gray-20'  },
      { name: 'color-gray-30',  figma: 'color/gray/30',  value: '#b1b8be', usage: '기본 테두리',               krds: '--krds-color-light-gray-30'  },
      { name: 'color-gray-40',  figma: 'color/gray/40',  value: '#8a949e', usage: '비활성 텍스트·아이콘',      krds: '--krds-color-light-gray-40'  },
      { name: 'color-gray-50',  figma: 'color/gray/50',  value: '#6d7882', usage: '3단계 보조 텍스트',         krds: '--krds-color-light-gray-50'  },
      { name: 'color-gray-60',  figma: 'color/gray/60',  value: '#58616a', usage: '강한 테두리',               krds: '--krds-color-light-gray-60'  },
      { name: 'color-gray-70',  figma: 'color/gray/70',  value: '#464c53', usage: '보조 텍스트·아이콘',        krds: '--krds-color-light-gray-70'  },
      { name: 'color-gray-80',  figma: 'color/gray/80',  value: '#33363d', usage: '기본 아이콘',               krds: '--krds-color-light-gray-80'  },
      { name: 'color-gray-90',  figma: 'color/gray/90',  value: '#1e2124', usage: '주요 텍스트·역방향 배경',   krds: '--krds-color-light-gray-90'  },
      { name: 'color-gray-95',  figma: 'color/gray/95',  value: '#131416', usage: '최강 대비 텍스트',          krds: '--krds-color-light-gray-95'  },
      { name: 'color-gray-100', figma: 'color/gray/100', value: '#000000', usage: '검정',                      krds: '--krds-color-light-gray-100' },
    ],
  },
  {
    name: 'danger',
    tokens: [
      { name: 'color-danger-5',  figma: 'color/danger/5',  value: '#fdefec', usage: '에러 연한 배경', krds: '--krds-color-light-danger-5'  },
      { name: 'color-danger-10', figma: 'color/danger/10', value: '#fcdfd9', usage: '',               krds: '--krds-color-light-danger-10' },
      { name: 'color-danger-20', figma: 'color/danger/20', value: '#f7afa1', usage: '',               krds: '--krds-color-light-danger-20' },
      { name: 'color-danger-30', figma: 'color/danger/30', value: '#f48771', usage: '',               krds: '--krds-color-light-danger-30' },
      { name: 'color-danger-40', figma: 'color/danger/40', value: '#f05f42', usage: '',               krds: '--krds-color-light-danger-40' },
      { name: 'color-danger-50', figma: 'color/danger/50', value: '#de3412', usage: '에러 테두리·아이콘', krds: '--krds-color-light-danger-50' },
      { name: 'color-danger-60', figma: 'color/danger/60', value: '#bd2c0f', usage: '에러 텍스트',   krds: '--krds-color-light-danger-60' },
      { name: 'color-danger-70', figma: 'color/danger/70', value: '#8a240f', usage: '',               krds: '--krds-color-light-danger-70' },
      { name: 'color-danger-80', figma: 'color/danger/80', value: '#5c180a', usage: '',               krds: '--krds-color-light-danger-80' },
      { name: 'color-danger-90', figma: 'color/danger/90', value: '#390d05', usage: '',               krds: '--krds-color-light-danger-90' },
      { name: 'color-danger-95', figma: 'color/danger/95', value: '#260903', usage: '',               krds: '--krds-color-light-danger-95' },
    ],
  },
  {
    name: 'warning',
    tokens: [
      { name: 'color-warning-5',  figma: 'color/warning/5',  value: '#fff3db', usage: '경고 연한 배경', krds: '--krds-color-light-warning-5'  },
      { name: 'color-warning-10', figma: 'color/warning/10', value: '#ffe0a3', usage: '',               krds: '--krds-color-light-warning-10' },
      { name: 'color-warning-20', figma: 'color/warning/20', value: '#ffc95c', usage: '',               krds: '--krds-color-light-warning-20' },
      { name: 'color-warning-30', figma: 'color/warning/30', value: '#ffb114', usage: '',               krds: '--krds-color-light-warning-30' },
      { name: 'color-warning-40', figma: 'color/warning/40', value: '#c78500', usage: '',               krds: '--krds-color-light-warning-40' },
      { name: 'color-warning-50', figma: 'color/warning/50', value: '#9e6a00', usage: '경고 테두리',   krds: '--krds-color-light-warning-50' },
      { name: 'color-warning-60', figma: 'color/warning/60', value: '#8a5c00', usage: '경고 텍스트',   krds: '--krds-color-light-warning-60' },
      { name: 'color-warning-70', figma: 'color/warning/70', value: '#614100', usage: '',               krds: '--krds-color-light-warning-70' },
      { name: 'color-warning-80', figma: 'color/warning/80', value: '#422c00', usage: '',               krds: '--krds-color-light-warning-80' },
      { name: 'color-warning-90', figma: 'color/warning/90', value: '#2e1f00', usage: '',               krds: '--krds-color-light-warning-90' },
      { name: 'color-warning-95', figma: 'color/warning/95', value: '#241800', usage: '',               krds: '--krds-color-light-warning-95' },
    ],
  },
  {
    name: 'success',
    tokens: [
      { name: 'color-success-5',  figma: 'color/success/5',  value: '#eaf6ec', usage: '성공 연한 배경',   krds: '--krds-color-light-success-5'  },
      { name: 'color-success-10', figma: 'color/success/10', value: '#d8eedd', usage: '',                  krds: '--krds-color-light-success-10' },
      { name: 'color-success-20', figma: 'color/success/20', value: '#a9dab4', usage: '',                  krds: '--krds-color-light-success-20' },
      { name: 'color-success-30', figma: 'color/success/30', value: '#7ec88e', usage: '',                  krds: '--krds-color-light-success-30' },
      { name: 'color-success-40', figma: 'color/success/40', value: '#3fa654', usage: '',                  krds: '--krds-color-light-success-40' },
      { name: 'color-success-50', figma: 'color/success/50', value: '#228738', usage: '성공 테두리',       krds: '--krds-color-light-success-50' },
      { name: 'color-success-60', figma: 'color/success/60', value: '#267337', usage: '성공 텍스트',       krds: '--krds-color-light-success-60' },
      { name: 'color-success-70', figma: 'color/success/70', value: '#285d33', usage: '',                  krds: '--krds-color-light-success-70' },
      { name: 'color-success-80', figma: 'color/success/80', value: '#1f4727', usage: '',                  krds: '--krds-color-light-success-80' },
      { name: 'color-success-90', figma: 'color/success/90', value: '#122b18', usage: '',                  krds: '--krds-color-light-success-90' },
      { name: 'color-success-95', figma: 'color/success/95', value: '#0e2012', usage: '',                  krds: '--krds-color-light-success-95' },
    ],
  },
  {
    name: 'information',
    tokens: [
      { name: 'color-information-5',  figma: 'color/information/5',  value: '#e7f4fe', usage: '안내 연한 배경', krds: '--krds-color-light-information-5'  },
      { name: 'color-information-10', figma: 'color/information/10', value: '#d3ebfd', usage: '',               krds: '--krds-color-light-information-10' },
      { name: 'color-information-20', figma: 'color/information/20', value: '#9ed2fa', usage: '',               krds: '--krds-color-light-information-20' },
      { name: 'color-information-30', figma: 'color/information/30', value: '#5fb5f7', usage: '',               krds: '--krds-color-light-information-30' },
      { name: 'color-information-40', figma: 'color/information/40', value: '#2098f3', usage: '',               krds: '--krds-color-light-information-40' },
      { name: 'color-information-50', figma: 'color/information/50', value: '#0b78cb', usage: '안내 테두리',   krds: '--krds-color-light-information-50' },
      { name: 'color-information-60', figma: 'color/information/60', value: '#096ab3', usage: '안내 텍스트',   krds: '--krds-color-light-information-60' },
      { name: 'color-information-70', figma: 'color/information/70', value: '#085691', usage: '',               krds: '--krds-color-light-information-70' },
      { name: 'color-information-80', figma: 'color/information/80', value: '#053961', usage: '',               krds: '--krds-color-light-information-80' },
      { name: 'color-information-90', figma: 'color/information/90', value: '#03253f', usage: '',               krds: '--krds-color-light-information-90' },
      { name: 'color-information-95', figma: 'color/information/95', value: '#021a2c', usage: '',               krds: '--krds-color-light-information-95' },
    ],
  },
  {
    name: 'black-alpha',
    tokens: [
      { name: 'color-black-alpha-100', figma: 'color/black-alpha/100', value: '#000000',   usage: '불투명 검정',          krds: '--krds-color-light-alpha-black100' },
      { name: 'color-black-alpha-75',  figma: 'color/black-alpha/75',  value: '#000000bf', usage: '딤 오버레이',          krds: '--krds-color-light-alpha-black75'  },
      { name: 'color-black-alpha-50',  figma: 'color/black-alpha/50',  value: '#00000080', usage: '',                     krds: '--krds-color-light-alpha-black50'  },
      { name: 'color-black-alpha-25',  figma: 'color/black-alpha/25',  value: '#00000040', usage: '',                     krds: '--krds-color-light-alpha-black25'  },
      { name: 'color-black-alpha-10',  figma: 'color/black-alpha/10',  value: '#0000001a', usage: '그림자·호버 오버레이', krds: '--krds-color-light-alpha-black10'  },
      { name: 'color-black-alpha-0',   figma: 'color/black-alpha/0',   value: '#00000000', usage: '완전 투명',            krds: '--krds-color-light-alpha-black0'   },
    ],
  },
  {
    name: 'white-alpha',
    tokens: [
      { name: 'color-white-alpha-100', figma: 'color/white-alpha/100', value: '#ffffff',   usage: '불투명 흰색', krds: '--krds-color-light-alpha-white100' },
      { name: 'color-white-alpha-75',  figma: 'color/white-alpha/75',  value: '#ffffffbf', usage: '',            krds: '--krds-color-light-alpha-white75'  },
      { name: 'color-white-alpha-50',  figma: 'color/white-alpha/50',  value: '#ffffff80', usage: '',            krds: '--krds-color-light-alpha-white50'  },
      { name: 'color-white-alpha-25',  figma: 'color/white-alpha/25',  value: '#ffffff40', usage: '',            krds: '--krds-color-light-alpha-white25'  },
      { name: 'color-white-alpha-10',  figma: 'color/white-alpha/10',  value: '#ffffff1a', usage: '',            krds: '--krds-color-light-alpha-white10'  },
      { name: 'color-white-alpha-0',   figma: 'color/white-alpha/0',   value: '#ffffff00', usage: '완전 투명',  krds: '--krds-color-light-alpha-white0'   },
    ],
  },
  {
    group: 'color-point',
    tokens: [
      { name: 'color-point-5',  value: '#fbeff0', krds: '--krds-color-light-point-5'  },
      { name: 'color-point-20', value: '#ebadb2', krds: '--krds-color-light-point-20' },
      { name: 'color-point-40', value: '#d65c66', krds: '--krds-color-light-point-40' },
      { name: 'color-point-50', value: '#d63d4a', krds: '--krds-color-light-point-50' },
      { name: 'color-point-60', value: '#ab2b36', krds: '--krds-color-light-point-60' },
      { name: 'color-point-90', value: '#310c0f', krds: '--krds-color-light-point-90' },
      { name: 'color-point-95', value: '#21080a', krds: '--krds-color-light-point-95' },
    ]
  },
];


/* ── 2. 색상 시멘틱 ───────────────────────────────────────────────────────── */

export const colorSemanticGroups = [
  {
    name: 'color-text- (글자색)',
    tokens: [
      { name: 'color-text-default',      figma: 'color/text/default',      value: '#1e2124', ref: 'color-gray-90',        darkRef: 'color-gray-5',          darkValue: '#f4f5f6', usage: '본문·제목 주요 텍스트',      krds: '--krds-light-color-text-basic'          },
      { name: 'color-text-subtle',       figma: 'color/text/subtle',       value: '#464c53', ref: 'color-gray-70',        darkRef: 'color-gray-20',         darkValue: '#cdd1d5', usage: '보조 설명·플레이스홀더',      krds: '--krds-light-color-text-subtle'         },
      { name: 'color-text-subtler',      figma: 'color/text/subtler',      value: '#6d7882', ref: 'color-gray-50',        darkRef: 'color-gray-40',         darkValue: '#8a949e', usage: '3단계 보조 텍스트',          krds: '(자체 추가)'                            },
      { name: 'color-text-primary',      figma: 'color/text/primary',      value: '#0b50d0', ref: 'color-primary-60',     darkRef: 'color-primary-40',      darkValue: '#4c87f6', usage: '브랜드·강조 텍스트',         krds: '--krds-light-color-text-primary'        },
      { name: 'color-text-secondary',    figma: 'color/text/secondary',    value: '#1c589c', ref: 'color-secondary-60',   darkRef: 'color-secondary-40',    darkValue: '#6b96c7', usage: '2번 브랜드 강조 텍스트',     krds: '--krds-light-color-text-secondary'      },
      { name: 'color-text-danger',       figma: 'color/text/danger',       value: '#bd2c0f', ref: 'color-danger-60',      darkRef: 'color-danger-40',       darkValue: '#f05f42', usage: '에러 메시지',                krds: '--krds-light-color-text-danger'         },
      { name: 'color-text-warning',      figma: 'color/text/warning',      value: '#8a5c00', ref: 'color-warning-60',     darkRef: 'color-warning-30',      darkValue: '#ffb114', usage: '경고 메시지',                krds: '--krds-light-color-text-warning'        },
      { name: 'color-text-success',      figma: 'color/text/success',      value: '#267337', ref: 'color-success-60',     darkRef: 'color-success-40',      darkValue: '#3fa654', usage: '성공 메시지',                krds: '--krds-light-color-text-success'        },
      { name: 'color-text-information',  figma: 'color/text/information',  value: '#096ab3', ref: 'color-information-60', darkRef: 'color-information-40',  darkValue: '#2098f3', usage: '안내 메시지',                krds: '--krds-light-color-text-information'    },
      { name: 'color-text-disabled',     figma: 'color/text/disabled',     value: '#8a949e', ref: 'color-gray-40',        darkRef: 'color-gray-50',         darkValue: '#6d7882', usage: '비활성 텍스트',              krds: '--krds-light-color-text-disabled'       },
      { name: 'color-text-inverse',      figma: 'color/text/inverse',      value: '#ffffff', ref: 'color-gray-0',         darkRef: 'color-gray-90',         darkValue: '#1e2124', usage: '어두운 배경 위 텍스트',      krds: '--krds-light-color-text-basic-inverse'  },
      { name: 'color-text-on-primary',   figma: 'color/text/on-primary',   value: '#ffffff', ref: 'color-gray-0',         darkRef: 'color-gray-90',         darkValue: '#1e2124', usage: '브랜드 배경 위 텍스트',      krds: '(자체 추가)'                            },
      { name: 'color-text-on-secondary', figma: 'color/text/on-secondary', value: '#ffffff', ref: 'color-gray-0',         darkRef: 'color-gray-90',         darkValue: '#1e2124', usage: 'secondary 채움 배경 위 텍스트', krds: '(자체 추가)'                           },
      { name: 'color-text-link',         figma: 'color/text/link',         value: '#256ef4', ref: 'color-primary-50',     darkRef: 'color-primary-40',      darkValue: '#4c87f6', usage: '링크 기본',                  krds: '--krds-light-color-link-default'        },
      { name: 'color-text-link-visited', figma: 'color/text/link-visited', value: '#5917b8', ref: null,                   darkRef: null,                    darkValue: '#c49ff9', usage: '방문한 링크 (KRDS 고정값)',  krds: '--krds-light-color-link-visited'        },
    ],
  },
  {
    name: 'color-bg- (배경색)',
    tokens: [
      { name: 'color-bg-default',            figma: 'color/bg/default',            value: '#ffffff',   ref: 'color-gray-0',         darkRef: 'color-gray-90',          darkValue: '#1e2124',   usage: '페이지·카드 기본 배경',      krds: '--krds-light-color-background-white'              },
      { name: 'color-bg-subtle',             figma: 'color/bg/subtle',             value: '#f4f5f6',   ref: 'color-gray-5',         darkRef: 'color-gray-80',          darkValue: '#33363d',   usage: '섹션·코드블록 배경',         krds: '--krds-light-color-background-gray-subtler'       },
      { name: 'color-bg-subtler',            figma: 'color/bg/subtler',            value: '#e6e8ea',   ref: 'color-gray-10',        darkRef: 'color-gray-70',          darkValue: '#464c53',   usage: '3단계 배경 (테이블 행 등)',   krds: '--krds-light-color-background-gray-subtle'        },
      { name: 'color-bg-primary',            figma: 'color/bg/primary',            value: '#256ef4',   ref: 'color-primary-50',     darkRef: 'color-primary-40',       darkValue: '#4c87f6',   usage: '브랜드 강조 배경 (버튼 등)', krds: '--krds-light-color-button-primary-fill'           },
      { name: 'color-bg-primary-hover',      figma: 'color/bg/primary-hover',      value: '#0b50d0',   ref: 'color-primary-60',     darkRef: 'color-primary-30',       darkValue: '#86aff9',   usage: '브랜드 hover',               krds: '--krds-light-color-button-primary-fill-hover'     },
      { name: 'color-bg-primary-pressed',    figma: 'color/bg/primary-pressed',    value: '#083891',   ref: 'color-primary-70',     darkRef: 'color-primary-20',       darkValue: '#b1cefb',   usage: '브랜드 pressed',             krds: '--krds-light-color-button-primary-fill-pressed'   },
      { name: 'color-bg-primary-subtle',     figma: 'color/bg/primary-subtle',     value: '#ecf2fe',   ref: 'color-primary-5',      darkRef: 'color-primary-90',       darkValue: '#03163a',   usage: '브랜드 연한 배경',           krds: '--krds-light-color-surface-primary-subtler'       },
      { name: 'color-bg-secondary',          figma: 'color/bg/secondary',          value: '#346fb2',   ref: 'color-secondary-50',   darkRef: 'color-secondary-40',     darkValue: '#6b96c7',   usage: '2번 브랜드 배경 (버튼 등)', krds: '(자체 추가)'                                      },
      { name: 'color-bg-secondary-hover',    figma: 'color/bg/secondary-hover',    value: '#1c589c',   ref: 'color-secondary-60',   darkRef: 'color-secondary-30',     darkValue: '#90b0d5',   usage: '2번 브랜드 hover',           krds: '(자체 추가)'                                      },
      { name: 'color-bg-secondary-pressed',  figma: 'color/bg/secondary-pressed',  value: '#063a74',   ref: 'color-secondary-70',   darkRef: 'color-secondary-20',     darkValue: '#bacbde',   usage: '2번 브랜드 pressed',         krds: '(자체 추가)'                                      },
      { name: 'color-bg-secondary-subtle',   figma: 'color/bg/secondary-subtle',   value: '#eef2f7',   ref: 'color-secondary-5',    darkRef: 'color-secondary-90',     darkValue: '#031f3f',   usage: '2번 브랜드 연한 배경',       krds: '--krds-light-color-surface-secondary-subtler'     },
      { name: 'color-bg-danger-subtle',      figma: 'color/bg/danger-subtle',      value: '#fdefec',   ref: 'color-danger-5',       darkRef: 'color-danger-90',        darkValue: '#390d05',   usage: '에러 연한 배경',             krds: '--krds-light-color-surface-danger-subtler'        },
      { name: 'color-bg-warning-subtle',     figma: 'color/bg/warning-subtle',     value: '#fff3db',   ref: 'color-warning-5',      darkRef: 'color-warning-90',       darkValue: '#2e1f00',   usage: '경고 연한 배경',             krds: '--krds-light-color-surface-warning-subtler'       },
      { name: 'color-bg-success-subtle',     figma: 'color/bg/success-subtle',     value: '#eaf6ec',   ref: 'color-success-5',      darkRef: 'color-success-90',       darkValue: '#122b18',   usage: '성공 연한 배경',             krds: '--krds-light-color-surface-success-subtler'       },
      { name: 'color-bg-information-subtle', figma: 'color/bg/information-subtle', value: '#e7f4fe',   ref: 'color-information-5',  darkRef: 'color-information-90',   darkValue: '#03253f',   usage: '안내 연한 배경',             krds: '--krds-light-color-surface-information-subtler'   },
      { name: 'color-bg-elevated',           figma: 'color/bg/elevated',           value: '#ffffff',   ref: 'color-gray-0',         darkRef: 'color-gray-80',          darkValue: '#33363d',   usage: '플로팅 카드·드롭다운',       krds: '(자체 추가)'                                      },
      { name: 'color-bg-inverse',            figma: 'color/bg/inverse',            value: '#1e2124',   ref: 'color-gray-90',        darkRef: 'color-gray-0',           darkValue: '#ffffff',   usage: '다크 배경 (헤더·푸터)',      krds: '--krds-light-color-background-inverse'            },
      { name: 'color-bg-disabled',           figma: 'color/bg/disabled',           value: '#cdd1d5',   ref: 'color-gray-20',        darkRef: 'color-gray-70',          darkValue: '#464c53',   usage: '비활성 요소 배경',           krds: '--krds-light-color-surface-disabled'              },
      { name: 'color-bg-overlay',            figma: 'color/bg/overlay',            value: '#000000bf', ref: 'color-black-alpha-75', darkRef: 'color-black-alpha-75',   darkValue: '#000000bf', usage: '딤 오버레이',               krds: '--krds-light-color-background-dim'                },
      { name: 'color-bg-hover',              figma: 'color/bg/hover',              value: '#f4f5f6',   ref: 'color-gray-5',         darkRef: 'color-gray-80',          darkValue: '#33363d',   usage: '일반 hover 배경',            krds: '(자체 추가)'                                      },
      { name: 'color-bg-selected',           figma: 'color/bg/selected',           value: '#ecf2fe',   ref: 'color-primary-5',      darkRef: 'color-primary-90',       darkValue: '#03163a',   usage: '선택된 항목 배경',           krds: '--krds-light-color-action-primary-selected'       },
    ],
  },
  {
    name: 'color-border- (테두리색)',
    tokens: [
      { name: 'color-border-default',   figma: 'color/border/default',   value: '#b1b8be', ref: 'color-gray-30',      darkRef: 'color-gray-50',         darkValue: '#6d7882', usage: '기본 테두리',             krds: '--krds-light-color-border-gray'        },
      { name: 'color-border-subtle',    figma: 'color/border/subtle',    value: '#cdd1d5', ref: 'color-gray-20',      darkRef: 'color-gray-70',         darkValue: '#464c53', usage: '연한 테두리',             krds: '--krds-light-color-border-gray-light'  },
      { name: 'color-border-primary',   figma: 'color/border/primary',   value: '#256ef4', ref: 'color-primary-50',   darkRef: 'color-primary-40',      darkValue: '#4c87f6', usage: '브랜드 테두리',           krds: '--krds-light-color-border-primary'     },
      { name: 'color-border-secondary', figma: 'color/border/secondary', value: '#346fb2', ref: 'color-secondary-50', darkRef: 'color-secondary-40',    darkValue: '#6b96c7', usage: '2번 브랜드 테두리',       krds: '--krds-light-color-border-secondary'   },
      { name: 'color-border-danger',    figma: 'color/border/danger',    value: '#de3412', ref: 'color-danger-50',    darkRef: 'color-danger-40',       darkValue: '#f05f42', usage: '에러 테두리',             krds: '--krds-light-color-border-danger'      },
      { name: 'color-border-warning',   figma: 'color/border/warning',   value: '#9e6a00', ref: 'color-warning-50',   darkRef: 'color-warning-40',      darkValue: '#c78500', usage: '경고 테두리',             krds: '--krds-light-color-border-warning'     },
      { name: 'color-border-success',   figma: 'color/border/success',   value: '#228738', ref: 'color-success-50',   darkRef: 'color-success-40',      darkValue: '#3fa654', usage: '성공 테두리',             krds: '--krds-light-color-border-success'     },
      { name: 'color-border-strong',    figma: 'color/border/strong',    value: '#58616a', ref: 'color-gray-60',      darkRef: 'color-gray-30',         darkValue: '#b1b8be', usage: '강한 테두리 (입력 필드)', krds: '--krds-light-color-input-border'       },
      { name: 'color-border-divider',   figma: 'color/border/divider',   value: '#8a949e', ref: 'color-gray-40',      darkRef: 'color-gray-70',         darkValue: '#464c53', usage: '구분선',                  krds: '--krds-light-color-divider-gray'       },
      { name: 'color-border-focus',     figma: 'color/border/focus',     value: '#256ef4', ref: 'color-primary-50',   darkRef: 'color-primary-40',      darkValue: '#4c87f6', usage: '포커스 링',               krds: '--krds-light-color-border-primary'     },
      { name: 'color-border-disabled',  figma: 'color/border/disabled',  value: '#b1b8be', ref: 'color-gray-30',      darkRef: 'color-gray-70',         darkValue: '#464c53', usage: '비활성 테두리',           krds: '--krds-light-color-border-disabled'    },
    ],
  },
  {
    name: 'color-icon- (아이콘색)',
    tokens: [
      { name: 'color-icon-default',   figma: 'color/icon/default',   value: '#33363d', ref: 'color-gray-80',      darkRef: 'color-gray-20',      darkValue: '#cdd1d5', usage: '기본 아이콘',           krds: '--krds-light-color-icon-gray'       },
      { name: 'color-icon-subtle',    figma: 'color/icon/subtle',    value: '#464c53', ref: 'color-gray-70',      darkRef: 'color-gray-30',      darkValue: '#b1b8be', usage: '보조 아이콘',           krds: '--krds-light-color-icon-gray-light' },
      { name: 'color-icon-primary',   figma: 'color/icon/primary',   value: '#256ef4', ref: 'color-primary-50',   darkRef: 'color-primary-40',   darkValue: '#4c87f6', usage: '브랜드 아이콘',         krds: '--krds-light-color-icon-primary'    },
      { name: 'color-icon-secondary', figma: 'color/icon/secondary', value: '#346fb2', ref: 'color-secondary-50', darkRef: 'color-secondary-40', darkValue: '#6b96c7', usage: '2번 브랜드 아이콘',     krds: '--krds-light-color-icon-secondary'  },
      { name: 'color-icon-danger',    figma: 'color/icon/danger',    value: '#de3412', ref: 'color-danger-50',    darkRef: 'color-danger-40',    darkValue: '#f05f42', usage: '에러 아이콘',           krds: '--krds-light-color-icon-danger'     },
      { name: 'color-icon-disabled',  figma: 'color/icon/disabled',  value: '#8a949e', ref: 'color-gray-40',      darkRef: 'color-gray-60',      darkValue: '#58616a', usage: '비활성 아이콘',         krds: '--krds-light-color-icon-disabled'   },
      { name: 'color-icon-inverse',   figma: 'color/icon/inverse',   value: '#ffffff', ref: 'color-gray-0',       darkRef: 'color-gray-90',      darkValue: '#1e2124', usage: '어두운 배경 위 아이콘', krds: '--krds-light-color-icon-inverse'    },
    ],
  },
  {
    group: 'color-bg (추가)',
    tokens: [
      { name: 'color-bg-interactive-hover',      figma: 'color/bg/interactive-hover',      value: '#eef2f7', ref: 'color-secondary-5',    darkRef: 'color-secondary-90',    darkValue: '#031f3f', usage: '탐색·탭·아코디언 항목 hover bg', krds: '--krds-light-color-action-secondary-hover' },
      { name: 'color-bg-interactive-pressed',    figma: 'color/bg/interactive-pressed',    value: '#d6e0eb', ref: 'color-secondary-10',   darkRef: 'color-secondary-80',    darkValue: '#052b57', usage: '탐색·탭·아코디언 항목 pressed bg', krds: '--krds-light-color-action-secondary-pressed' },
      { name: 'color-bg-interactive-active',     figma: 'color/bg/interactive-active',     value: '#063a74', ref: 'color-secondary-70',   darkRef: 'color-secondary-30',    darkValue: '#90b0d5', usage: '현재 선택된 탐색 항목 bg', krds: '--krds-light-color-action-secondary-active' },
      { name: 'color-bg-primary-subtle-hover',   figma: 'color/bg/primary-subtle-hover',   value: '#d8e5fd', ref: 'color-primary-10',     darkRef: 'color-primary-80',      darkValue: '#052561', usage: '외곽선 버튼 hover bg (HC: text-primary 11:1 ✓)', krds: '--krds-light-color-button-secondary-fill-hover' },
      { name: 'color-bg-primary-subtle-pressed', figma: 'color/bg/primary-subtle-pressed', value: '#b1cefb', ref: 'color-primary-20',     darkRef: 'color-primary-70',      darkValue: '#083891', usage: '외곽선 버튼 pressed bg (HC: text-primary 11:1 ✓)', krds: '--krds-light-color-button-secondary-fill-pressed' },
      { name: 'color-bg-pressed',                figma: 'color/bg/pressed',                value: '#e6e8ea', ref: 'color-gray-10',         darkRef: 'color-gray-70',         darkValue: '#464c53', usage: '3차(tertiary) 버튼 pressed bg', krds: '--krds-light-color-button-tertiary-fill-pressed' },
      { name: 'color-bg-warning-element',        figma: 'color/bg/warning-element',        value: '#ffb114', ref: 'color-warning-30',      darkRef: 'color-warning-40',      darkValue: '#c78500', usage: '경고 뱃지 채움색', krds: '--krds-light-color-element-warning' },
      { name: 'color-bg-success-element',        figma: 'color/bg/success-element',        value: '#228738', ref: 'color-success-50',      darkRef: 'color-success-40',      darkValue: '#3fa654', usage: '성공 뱃지 채움색', krds: '--krds-light-color-element-success' },
      { name: 'color-bg-information-element',    figma: 'color/bg/information-element',    value: '#0b78cb', ref: 'color-information-50',  darkRef: 'color-information-40',  darkValue: '#2098f3', usage: '정보 뱃지 채움색', krds: '--krds-light-color-element-information' },
      { name: 'color-bg-point-element',          figma: 'color/bg/point-element',          value: '#d63d4a', ref: 'color-point-50',        darkRef: 'color-point-40',        darkValue: '#d65c66', usage: '포인트(강조 빨강) 뱃지 채움색', krds: '--krds-light-color-element-point' },
      { name: 'color-bg-point-subtle',           figma: 'color/bg/point-subtle',           value: '#fbeff0', ref: 'color-point-5',         darkRef: 'color-point-90',        darkValue: '#310c0f', usage: '포인트 연한 배경색', krds: '--krds-light-color-element-point-lighter' },
      { name: 'color-bg-gray-element',            figma: 'color/bg/gray-element',           value: '#6d7882', ref: 'color-gray-50',         darkRef: 'color-gray-50',         darkValue: '#6d7882', usage: '중립 뱃지·인디케이터 채움색', krds: '--krds-light-color-element-gray' },
      { name: 'color-bg-gray-element-strong',    figma: 'color/bg/gray-element-strong',    value: '#58616a', ref: 'color-gray-60',         darkRef: 'color-gray-40',         darkValue: '#8a949e', usage: '진한 중립 채움색', krds: '--krds-light-color-element-gray-dark' },
    ]
  },
  {
    group: 'color-text (추가)',
    tokens: [
      { name: 'color-text-link-hover',          figma: 'color/text/link-hover',          value: '#0b50d0', ref: 'color-primary-60',    darkRef: 'color-primary-30',    darkValue: '#86aff9', usage: '링크 hover 텍스트색', krds: '--krds-light-color-link-hover' },
      { name: 'color-text-link-pressed',        figma: 'color/text/link-pressed',        value: '#083891', ref: 'color-primary-70',    darkRef: 'color-primary-20',    darkValue: '#b1cefb', usage: '링크 pressed 텍스트색', krds: '--krds-light-color-link-pressed' },
      { name: 'color-text-stronger',            figma: 'color/text/stronger',            value: '#131416', ref: 'color-gray-95',       darkRef: 'color-gray-0',        darkValue: '#ffffff', usage: '최강조 텍스트 (기본보다 진한)', krds: '--krds-light-color-text-bolder' },
      { name: 'color-text-point',               figma: 'color/text/point',               value: '#ab2b36', ref: 'color-point-60',      darkRef: 'color-point-40',      darkValue: '#d65c66', usage: '포인트 색상 텍스트', krds: '--krds-light-color-text-point' },
      { name: 'color-text-secondary-strong',    figma: 'color/text/secondary-strong',    value: '#052b57', ref: 'color-secondary-80',  darkRef: 'color-secondary-20',  darkValue: '#bacbde', usage: 'secondary 강조 텍스트 (KRDS 원래 값)', krds: '--krds-light-color-text-secondary' },
      { name: 'color-text-on-warning-element',     figma: 'color/text/on-warning-element',     value: '#1e2124', ref: 'color-gray-90',  darkRef: 'color-gray-90',  darkValue: '#1e2124', usage: 'warning 채움 배경 위 텍스트 — 항상 어두움', krds: '--krds-light-color-text-static' },
      { name: 'color-text-on-interactive-active',  figma: 'color/text/on-interactive-active',  value: '#ffffff', ref: 'color-gray-0',   darkRef: 'color-gray-90',  darkValue: '#1e2124', usage: 'interactive-active 배경 위 텍스트', krds: '--krds-light-color-action-secondary-on-selected' },
      { name: 'color-text-on-success-element',     figma: 'color/text/on-success-element',     value: '#ffffff', ref: 'color-gray-0',   darkRef: 'color-gray-90',  darkValue: '#1e2124', usage: '성공 채움 배경 위 텍스트 (light: 4.58:1 / dark: 5.23:1 / HC: 10.3:1)', krds: '(자체 추가)' },
      { name: 'color-text-on-information-element', figma: 'color/text/on-information-element', value: '#ffffff', ref: 'color-gray-0',   darkRef: 'color-gray-90',  darkValue: '#1e2124', usage: '정보 채움 배경 위 텍스트 (light: 4.60:1 / dark: 5.28:1 / HC: 10.0:1)', krds: '(자체 추가)' },
      { name: 'color-text-on-point-element',       figma: 'color/text/on-point-element',       value: '#ffffff', ref: 'color-gray-0',   darkRef: 'color-gray-100', darkValue: '#000000', usage: '포인트 채움 배경 위 텍스트 (dark: gray-100 — gray-90은 4.29:1로 미달)', krds: '(자체 추가)' },
      { name: 'color-text-on-gray-element',        figma: 'color/text/on-gray-element',        value: '#ffffff', ref: 'color-gray-0',   darkRef: 'color-gray-0',   darkValue: '#ffffff', usage: '중립 채움 배경 위 텍스트 (dark bg=gray-50: 4.5:1 ✓)', krds: '(자체 추가)' },
      { name: 'color-text-on-gray-element-strong', figma: 'color/text/on-gray-element-strong', value: '#ffffff', ref: 'color-gray-0',   darkRef: 'color-gray-90',  darkValue: '#1e2124', usage: '진한 중립 채움 배경 위 텍스트 (light:6.3 / dark:5.25 / HC:8.1)', krds: '(자체 추가)' },
      { name: 'color-text-primary-on-subtle-hover',   figma: 'color/text/primary-on-subtle-hover',   value: '#0b50d0', ref: 'color-primary-60', darkRef: 'color-primary-30', darkValue: '#86aff9', usage: '외곽선 버튼 hover bg 위 텍스트 (dark:6.6:1 / HC:11:1)', krds: '(자체 추가)' },
      { name: 'color-text-primary-on-subtle-pressed', figma: 'color/text/primary-on-subtle-pressed', value: '#0b50d0', ref: 'color-primary-60', darkRef: 'color-primary-20', darkValue: '#b1cefb', usage: '외곽선 버튼 pressed bg 위 텍스트 (light: KRDS 예외 4.26:1 / dark:6.6:1 / HC:9:1)', krds: '(자체 추가)' },
    ]
  },
  {
    group: 'color-icon (추가)',
    tokens: [
      { name: 'color-icon-on-disabled',        figma: 'color/icon/on-disabled',         value: '#6d7882', ref: 'color-gray-50',       darkRef: 'color-gray-50',       darkValue: '#6d7882', usage: '비활성 요소 위 아이콘색', krds: '--krds-light-color-icon-disabled-on' },
      { name: 'color-icon-secondary-strong',   figma: 'color/icon/secondary-strong',    value: '#063a74', ref: 'color-secondary-70',  darkRef: 'color-secondary-30',  darkValue: '#90b0d5', usage: 'secondary 강조 아이콘 (KRDS element-secondary 원래 값)', krds: '--krds-light-color-element-secondary' },
    ]
  },
  {
    group: 'color-border (추가)',
    tokens: [
      { name: 'color-border-secondary-subtle',  figma: 'color/border/secondary-subtle',  value: '#d6e0eb', ref: 'color-secondary-10',  darkRef: 'color-secondary-80',  darkValue: '#052b57', usage: '연한 secondary 테두리', krds: '--krds-light-color-border-secondary-light' },
      { name: 'color-border-divider-dark',      figma: 'color/border/divider-dark',      value: '#6d7882', ref: 'color-gray-50',       darkRef: 'color-gray-60',       darkValue: '#58616a', usage: '진한 구분선', krds: '--krds-light-color-divider-gray-dark' },
      { name: 'color-border-secondary-strong',  figma: 'color/border/secondary-strong',  value: '#063a74', ref: 'color-secondary-70',  darkRef: 'color-secondary-30',  darkValue: '#90b0d5', usage: 'secondary 강조 테두리 (KRDS border-secondary 원래 값)', krds: '--krds-light-color-border-secondary' },
    ]
  },
];


/* ── 3. 타이포 ────────────────────────────────────────────────────────────── */

export const typoPrimTokens = [
  { name: 'font-family-base', figma: 'font-family/base', value: "'Pretendard GOV', sans-serif", usage: '기본 폰트',      krds: '--krds-typo-font-type'              },
  { name: 'font-family-code', figma: 'font-family/code', value: "'D2Coding', monospace",        usage: '코드 폰트',      krds: '(자체 추가)'                        },
  { name: 'font-size-13',  figma: 'font-size/13',  value: '1.3rem (13px)', usage: 'body-xs',            krds: '--krds-pc-font-size-body-xsmall'        },
  { name: 'font-size-15',  figma: 'font-size/15',  value: '1.5rem (15px)', usage: 'body-s',             krds: '--krds-pc-font-size-body-small'          },
  { name: 'font-size-17',  figma: 'font-size/17',  value: '1.7rem (17px)', usage: 'body-m',             krds: '--krds-pc-font-size-body-medium'         },
  { name: 'font-size-19',  figma: 'font-size/19',  value: '1.9rem (19px)', usage: 'body-l, heading-s',  krds: '--krds-pc-font-size-body-large'          },
  { name: 'font-size-22',  figma: 'font-size/22',  value: '2.2rem (22px)', usage: 'heading-m (모바일)', krds: '--krds-mobile-font-size-heading-medium'   },
  { name: 'font-size-24',  figma: 'font-size/24',  value: '2.4rem (24px)', usage: 'heading-m (PC)',     krds: '--krds-pc-font-size-heading-medium'       },
  { name: 'font-size-28',  figma: 'font-size/28',  value: '2.8rem (28px)', usage: 'heading-xl (모바일)',krds: '--krds-mobile-font-size-heading-xlarge'   },
  { name: 'font-size-32',  figma: 'font-size/32',  value: '3.2rem (32px)', usage: 'heading-l (PC)',     krds: '--krds-pc-font-size-heading-large'        },
  { name: 'font-size-40',  figma: 'font-size/40',  value: '4rem (40px)',   usage: 'heading-xl (PC)',    krds: '--krds-pc-font-size-heading-xlarge'       },
  { name: 'font-weight-regular', figma: 'font-weight/regular', value: '400', usage: '본문 기본 굵기',   krds: '--krds-typo-font-weight-regular' },
  { name: 'font-weight-medium',  figma: 'font-weight/medium',  value: '500', usage: '레이블·강조',      krds: '(자체 추가)'                     },
  { name: 'font-weight-bold',    figma: 'font-weight/bold',    value: '700', usage: '제목·버튼',        krds: '--krds-typo-font-weight-bold'    },
  { name: 'line-height-tight',   figma: 'line-height/tight',   value: '1.25', usage: '큰 제목',         krds: '(자체 추가)'                     },
  { name: 'line-height-normal',  figma: 'line-height/normal',  value: '1.5',  usage: '본문 기본',       krds: '(자체 추가)'                     },
  { name: 'line-height-relaxed', figma: 'line-height/relaxed', value: '1.75', usage: '코드·읽기 긴 글', krds: '(자체 추가)'                     },
  { name: 'font-letter-spacing-tight',  figma: 'font-letter-spacing/tight',  value: '-0.025em', usage: '큰 제목', krds: '(자체 추가)'                  },
  { name: 'font-letter-spacing-normal', figma: 'font-letter-spacing/normal', value: '0em',      usage: '기본',    krds: '--krds-typo-letter-spacing-0'  },
];

export const typoPrimGroupedTokens = [
  {
    group: 'font-family',
    label: 'Font Family — 서체',
    tokens: [
      { name: 'font-family-base', figma: 'font-family/base', value: "'Pretendard GOV', sans-serif", usage: '기본 폰트', krds: '--krds-typo-font-type' },
      { name: 'font-family-code', figma: 'font-family/code', value: "'D2Coding', monospace",        usage: '코드 폰트', krds: '(자체 추가)'            },
    ],
  },
  {
    group: 'font-size',
    label: 'Font Size — 크기',
    tokens: [
      { name: 'font-size-13', figma: 'font-size/13', value: '1.3rem (13px)', usage: 'body-xs',             krds: '--krds-pc-font-size-body-xsmall'       },
      { name: 'font-size-15', figma: 'font-size/15', value: '1.5rem (15px)', usage: 'body-s',              krds: '--krds-pc-font-size-body-small'         },
      { name: 'font-size-17', figma: 'font-size/17', value: '1.7rem (17px)', usage: 'body-m',              krds: '--krds-pc-font-size-body-medium'        },
      { name: 'font-size-19', figma: 'font-size/19', value: '1.9rem (19px)', usage: 'body-l · heading-s',  krds: '--krds-pc-font-size-body-large'         },
      { name: 'font-size-22', figma: 'font-size/22', value: '2.2rem (22px)', usage: 'heading-m (모바일)',  krds: '--krds-mobile-font-size-heading-medium'  },
      { name: 'font-size-24', figma: 'font-size/24', value: '2.4rem (24px)', usage: 'heading-m (PC)',      krds: '--krds-pc-font-size-heading-medium'      },
      { name: 'font-size-28', figma: 'font-size/28', value: '2.8rem (28px)', usage: 'heading-xl (모바일)', krds: '--krds-mobile-font-size-heading-xlarge'  },
      { name: 'font-size-32', figma: 'font-size/32', value: '3.2rem (32px)', usage: 'heading-l (PC)',      krds: '--krds-pc-font-size-heading-large'       },
      { name: 'font-size-40', figma: 'font-size/40', value: '4rem (40px)',   usage: 'heading-xl (PC)',     krds: '--krds-pc-font-size-heading-xlarge'      },
    ],
  },
  {
    group: 'font-weight',
    label: 'Font Weight — 굵기',
    tokens: [
      { name: 'font-weight-regular', figma: 'font-weight/regular', value: '400', usage: '본문 기본 굵기', krds: '--krds-typo-font-weight-regular' },
      { name: 'font-weight-medium',  figma: 'font-weight/medium',  value: '500', usage: '레이블·강조',    krds: '(자체 추가)'                     },
      { name: 'font-weight-bold',    figma: 'font-weight/bold',    value: '700', usage: '제목·버튼',      krds: '--krds-typo-font-weight-bold'    },
    ],
  },
  {
    group: 'line-height',
    label: 'Line Height — 행간',
    tokens: [
      { name: 'line-height-tight',   figma: 'line-height/tight',   value: '1.25', usage: '큰 제목',         krds: '(자체 추가)' },
      { name: 'line-height-normal',  figma: 'line-height/normal',  value: '1.5',  usage: '본문 기본',       krds: '(자체 추가)' },
      { name: 'line-height-relaxed', figma: 'line-height/relaxed', value: '1.75', usage: '코드·읽기 긴 글', krds: '(자체 추가)' },
    ],
  },
  {
    group: 'font-letter-spacing',
    label: 'Letter Spacing — 자간',
    tokens: [
      { name: 'font-letter-spacing-tight',  figma: 'font-letter-spacing/tight',  value: '-0.025em', usage: '큰 제목', krds: '(자체 추가)'                 },
      { name: 'font-letter-spacing-normal', figma: 'font-letter-spacing/normal', value: '0em',      usage: '기본',    krds: '--krds-typo-letter-spacing-0' },
    ],
  },
];

export const typoStyleTokens = [
  { name: 'font-size-heading-xl', figma: 'text-style/heading-xl', valuePC: '4rem / bold / 1.25',   valueMobile: '2.8rem / bold / 1.25', refsPC: ['font-size-40', 'font-weight-bold', 'line-height-tight'],   refsMobile: ['font-size-28'],  usage: '최대 섹션 제목',   krds: '--krds-pc-font-size-heading-xlarge'  },
  { name: 'font-size-heading-l',  figma: 'text-style/heading-l',  valuePC: '3.2rem / bold / 1.25', valueMobile: '2.4rem / bold / 1.25', refsPC: ['font-size-32', 'font-weight-bold', 'line-height-tight'],   refsMobile: ['font-size-24'],  usage: '대형 섹션 제목',   krds: '--krds-pc-font-size-heading-large'   },
  { name: 'font-size-heading-m',  figma: 'text-style/heading-m',  valuePC: '2.4rem / bold / 1.5',  valueMobile: '2.2rem / bold / 1.5',  refsPC: ['font-size-24', 'font-weight-bold', 'line-height-normal'],  refsMobile: ['font-size-22'],  usage: '중형 섹션 제목',   krds: '--krds-pc-font-size-heading-medium'  },
  { name: 'font-size-heading-s',  figma: 'text-style/heading-s',  valuePC: '1.9rem / bold / 1.5',  valueMobile: '1.9rem / bold / 1.5',  refsPC: ['font-size-19', 'font-weight-bold', 'line-height-normal'],  refsMobile: null,              usage: '소형 섹션 제목',   krds: '--krds-pc-font-size-heading-small'   },
  { name: 'font-size-body-l',     figma: 'text-style/body-l',     valuePC: '1.9rem / 400 / 1.5',   valueMobile: '1.9rem / 400 / 1.5',  refsPC: ['font-size-19', 'font-weight-regular', 'line-height-normal'], refsMobile: null,             usage: '대형 본문',        krds: '--krds-pc-font-size-body-large'      },
  { name: 'font-size-body-m',     figma: 'text-style/body-m',     valuePC: '1.7rem / 400 / 1.5',   valueMobile: '1.7rem / 400 / 1.5',  refsPC: ['font-size-17', 'font-weight-regular', 'line-height-normal'], refsMobile: null,             usage: '기본 본문',        krds: '--krds-pc-font-size-body-medium'     },
  { name: 'font-size-body-s',     figma: 'text-style/body-s',     valuePC: '1.5rem / 400 / 1.5',   valueMobile: '1.5rem / 400 / 1.5',  refsPC: ['font-size-15', 'font-weight-regular', 'line-height-normal'], refsMobile: null,             usage: '소형 본문·도움말', krds: '--krds-pc-font-size-body-small'      },
  { name: 'font-size-body-xs',    figma: 'text-style/body-xs',    valuePC: '1.3rem / 400 / 1.5',   valueMobile: '1.3rem / 400 / 1.5',  refsPC: ['font-size-13', 'font-weight-regular', 'line-height-normal'], refsMobile: null,             usage: '캡션·보조 설명',  krds: '--krds-pc-font-size-body-xsmall'    },
];


/* ── 4. 간격 ──────────────────────────────────────────────────────────────── */

export const spacingPrimTokens = [
  { name: 'space-0',  figma: 'space/0',  value: '0rem',   usage: '간격 없음',                              krds: '--krds-number-0'  },
  { name: 'space-2',  figma: 'space/2',  value: '0.2rem', usage: '',                                       krds: '--krds-number-2'  },
  { name: 'space-4',  figma: 'space/4',  value: '0.4rem', usage: '',                                       krds: '--krds-number-3'  },
  { name: 'space-8',  figma: 'space/8',  value: '0.8rem', usage: '',                                       krds: '--krds-number-5'  },
  { name: 'space-10', figma: 'space/10', value: '1rem',   usage: '⚠️ KRDS 호환 예외 단계 (4px 배수 아님)', krds: '--krds-padding-4' },
  { name: 'space-12', figma: 'space/12', value: '1.2rem', usage: '',                                       krds: '--krds-number-7'  },
  { name: 'space-16', figma: 'space/16', value: '1.6rem', usage: '',                                       krds: '--krds-number-8'  },
  { name: 'space-20', figma: 'space/20', value: '2rem',   usage: '',                                       krds: '--krds-number-9'  },
  { name: 'space-24', figma: 'space/24', value: '2.4rem', usage: '',                                       krds: '--krds-number-10' },
  { name: 'space-32', figma: 'space/32', value: '3.2rem', usage: '',                                       krds: '--krds-number-12' },
  { name: 'space-40', figma: 'space/40', value: '4rem',   usage: '',                                       krds: '--krds-number-14' },
  { name: 'space-48', figma: 'space/48', value: '4.8rem', usage: '',                                       krds: '--krds-number-16' },
  { name: 'space-56', figma: 'space/56', value: '5.6rem', usage: '⚠️ KRDS 호환 예외 단계 (4px 배수 아님)', krds: '--krds-size-height-8' },
  { name: 'space-64', figma: 'space/64', value: '6.4rem', usage: '',                                       krds: '--krds-number-18' },
  { name: 'space-80', figma: 'space/80', value: '8rem',   usage: '',                                       krds: '--krds-number-20' },
];

export const spacingSizeGroups = [
  {
    size: 'xs',
    label: 'xs  —  2 · 4 · 8px',
    tokens: [
      { name: 'space-xs-2', ref: 'space-2',  figma: 'space/xs/2',  value: '0.2rem', usage: '최소 간격',      krds: '--krds-number-2' },
      { name: 'space-xs-4', ref: 'space-4',  figma: 'space/xs/4',  value: '0.4rem', usage: '아이콘 내부',    krds: '--krds-number-3' },
      { name: 'space-xs-8', ref: 'space-8',  figma: 'space/xs/8',  value: '0.8rem', usage: '인라인 소간격',  krds: '--krds-number-5' },
    ],
  },
  {
    size: 's',
    label: 's  —  12 · 16 · 20px',
    tokens: [
      { name: 'space-s-12', ref: 'space-12', figma: 'space/s/12',  value: '1.2rem', usage: '컴팩트 내부 여백',  krds: '--krds-number-7' },
      { name: 'space-s-16', ref: 'space-16', figma: 'space/s/16',  value: '1.6rem', usage: '기본 내부 여백',    krds: '--krds-number-8' },
      { name: 'space-s-20', ref: 'space-20', figma: 'space/s/20',  value: '2rem',   usage: '넓은 소형 여백',   krds: '--krds-number-9' },
    ],
  },
  {
    size: 'm',
    label: 'm  —  24 · 32px',
    tokens: [
      { name: 'space-m-24', ref: 'space-24', figma: 'space/m/24',  value: '2.4rem', mobile: '2rem',   usage: '컴포넌트 간 중간 간격',  krds: '--krds-number-10' },
      { name: 'space-m-32', ref: 'space-32', figma: 'space/m/32',  value: '3.2rem', mobile: '2.4rem', usage: '섹션 내 블록 여백',      krds: '--krds-number-12' },
    ],
  },
  {
    size: 'l',
    label: 'l  —  40 · 48px',
    tokens: [
      { name: 'space-l-40', ref: 'space-40', figma: 'space/l/40',  value: '4rem',   mobile: '3.2rem', usage: '섹션 패딩 기본',   krds: '--krds-number-14' },
      { name: 'space-l-48', ref: 'space-48', figma: 'space/l/48',  value: '4.8rem', mobile: '4rem',   usage: '섹션 패딩 대형',   krds: '--krds-number-16' },
    ],
  },
  {
    size: 'xl',
    label: 'xl  —  64 · 80px',
    tokens: [
      { name: 'space-xl-64', ref: 'space-64', figma: 'space/xl/64', value: '6.4rem', mobile: '4.8rem', usage: '섹션 간 외부 여백',      krds: '--krds-number-18' },
      { name: 'space-xl-80', ref: 'space-80', figma: 'space/xl/80', value: '8rem',   mobile: '6.4rem', usage: '섹션 간 최대 외부 여백', krds: '--krds-number-20' },
    ],
  },
];

export const spacingSemanticTokens = [
  { name: 'gap-xs',            figma: 'gap/xs',            value: '0.4rem (4px)',   ref: 'space-4',  usage: '아이콘↔레이블 인라인 소간격',  krds: '--krds-gap-2'     },
  { name: 'gap-s',             figma: 'gap/s',             value: '0.8rem (8px)',   ref: 'space-8',  usage: '입력 그룹 내부 간격',          krds: '--krds-gap-3'     },
  { name: 'gap-m',             figma: 'gap/m',             value: '1.6rem (16px)',  ref: 'space-16', usage: '컴포넌트 간 기본 간격',        krds: '--krds-gap-5'     },
  { name: 'gap-l',             figma: 'gap/l',             value: '2.4rem (24px)',  ref: 'space-24', usage: '섹션 내 블록 간격',            krds: '--krds-gap-7'     },
  { name: 'gap-xl',            figma: 'gap/xl',            value: '4rem (40px)',    ref: 'space-40', usage: '섹션 간 여백',                 krds: '--krds-gap-9'     },
  { name: 'padding-xs',        figma: 'padding/xs',        value: '0.4rem (4px)',   ref: 'space-4',  usage: '뱃지·태그 소형 내부 여백',    krds: '--krds-padding-2' },
  { name: 'padding-s',         figma: 'padding/s',         value: '0.8rem (8px)',   ref: 'space-8',  usage: '버튼 상하 패딩 기본',          krds: '--krds-padding-3' },
  { name: 'padding-m',         figma: 'padding/m',         value: '1.6rem (16px)',  ref: 'space-16', usage: '카드·입력 필드 내부 여백',     krds: '--krds-padding-6' },
  { name: 'padding-l',         figma: 'padding/l',         value: '2.4rem (24px)',  ref: 'space-24', usage: '섹션 헤더 내부 여백',          krds: '--krds-padding-8' },
  { name: 'padding-xl',        figma: 'padding/xl',        value: '4rem (40px)',    ref: 'space-40', usage: '페이지 상단 여백',             krds: '--krds-padding-10'},
];


/* ── 5. 그림자 ────────────────────────────────────────────────────────────── */

export const shadowSemanticTokens = [
  { name: 'shadow-none', figma: 'shadow/none', value: 'none',                                                                                        usage: '현재 사용처 없음',           ref: null,                                           krds: '(자체 추가)'                            },
  { name: 'shadow-s',    figma: 'shadow/s',    value: '0 0 2px 0 rgba(0,0,0,.10), 0 4px 8px 0 rgba(0,0,0,.10)',                                    usage: '카드 기본 상태',             ref: 'color-black-alpha-10 × 2',                     krds: '--krds-critical-alerts--banner-shadow'  },
  { name: 'shadow-m',    figma: 'shadow/m',    value: '0 0 2px 0 rgba(0,0,0,.10), 0 8px 16px 0 rgba(0,0,0,.10)',                                   usage: '카드 hover 상태',            ref: 'color-black-alpha-10 × 2',                     krds: '--krds-help-panel--shadow'              },
  { name: 'shadow-l',    figma: 'shadow/l',    value: '0 0 2px 0 rgba(0,0,0,.10), 0 16px 24px 0 rgba(0,0,0,.25)',                                  usage: '현재 사용처 없음',           ref: 'color-black-alpha-10 + color-black-alpha-25',  krds: '--krds-modal--wrap-shadow'              },
];


/* ── 6. 모서리 ────────────────────────────────────────────────────────────── */

export const radiusPrimTokens = [
  { name: 'radius-0',   figma: 'radius/0',   value: '0rem',    usage: '0px — 직각',           krds: '(자체 추가)'           },
  { name: 'radius-2',   figma: 'radius/2',   value: '0.2rem',  usage: '2px',                  krds: '--krds-radius-xsmall1' },
  { name: 'radius-4',   figma: 'radius/4',   value: '0.4rem',  usage: '4px',                  krds: '--krds-radius-small1'  },
  { name: 'radius-6',   figma: 'radius/6',   value: '0.6rem',  usage: '6px',                  krds: '--krds-radius-medium1' },
  { name: 'radius-8',   figma: 'radius/8',   value: '0.8rem',  usage: '8px',                  krds: '--krds-radius-medium3' },
  { name: 'radius-10',  figma: 'radius/10',  value: '1rem',    usage: '10px',                 krds: '--krds-radius-large2'  },
  { name: 'radius-12',  figma: 'radius/12',  value: '1.2rem',  usage: '12px',                 krds: '--krds-radius-xlarge1' },
  { name: 'radius-16',  figma: 'radius/16',  value: '1.6rem',  usage: '16px',                 krds: '(자체 추가)'           },
  { name: 'radius-24',  figma: 'radius/24',  value: '2.4rem',  usage: '24px',                 krds: '(자체 추가)'           },
  { name: 'radius-999', figma: 'radius/999', value: '99.9rem', usage: '원형·알약형 (999px+)', krds: '--krds-radius-max'     },
];

export const radiusSemanticTokens = [
  { name: 'radius-xs',     figma: 'radius/xs',     value: '0.2rem (2px)',    ref: 'radius-2',   usage: '뱃지·태그 소형',          krds: '--krds-radius-xsmall1' },
  { name: 'radius-s',      figma: 'radius/s',      value: '0.4rem (4px)',    ref: 'radius-4',   usage: '태그·칩',                  krds: '--krds-radius-small1'  },
  { name: 'radius-m',      figma: 'radius/m',      value: '0.8rem (8px)',    ref: 'radius-8',   usage: '버튼·입력 필드·카드',      krds: '--krds-radius-medium3' },
  { name: 'radius-l',      figma: 'radius/l',      value: '1.2rem (12px)',   ref: 'radius-12',  usage: '모달·패널',                krds: '--krds-radius-xlarge1' },
  { name: 'radius-xl',     figma: 'radius/xl',     value: '1.6rem (16px)',   ref: 'radius-16',  usage: '대형 카드',                krds: '(자체 추가)'           },
  { name: 'radius-circle', figma: 'radius/circle', value: '99.9rem (원형)', ref: 'radius-999', usage: '원형·알약형 버튼·뱃지',   krds: '--krds-radius-max'     },
];


/* ── 반응형 페이지용 exports ──────────────────────────────────────────────────── */

/** display / heading / nav-title 반응형 font-size 토큰 (PC ≠ 모바일인 것만) */
export const responsiveTypoTokens = [
  { name: 'font-size-display-l',   pcRef: 'font-size-60', pcValue: '6rem',   pcPx: '60px', mobileRef: 'font-size-44', mobileValue: '4.4rem', mobilePx: '44px', usage: '최대 디스플레이 텍스트', krds: '--krds-pc-font-size-display-large'            },
  { name: 'font-size-display-m',   pcRef: 'font-size-44', pcValue: '4.4rem', pcPx: '44px', mobileRef: 'font-size-32', mobileValue: '3.2rem', mobilePx: '32px', usage: '중형 디스플레이 텍스트', krds: '--krds-pc-font-size-display-medium'           },
  { name: 'font-size-display-s',   pcRef: 'font-size-36', pcValue: '3.6rem', pcPx: '36px', mobileRef: 'font-size-28', mobileValue: '2.8rem', mobilePx: '28px', usage: '소형 디스플레이 텍스트', krds: '--krds-pc-font-size-display-small'            },
  { name: 'font-size-heading-xl',  pcRef: 'font-size-40', pcValue: '4rem',   pcPx: '40px', mobileRef: 'font-size-28', mobileValue: '2.8rem', mobilePx: '28px', usage: '최대 섹션 제목',         krds: '--krds-pc-font-size-heading-xlarge'           },
  { name: 'font-size-heading-l',   pcRef: 'font-size-32', pcValue: '3.2rem', pcPx: '32px', mobileRef: 'font-size-24', mobileValue: '2.4rem', mobilePx: '24px', usage: '대형 섹션 제목',         krds: '--krds-pc-font-size-heading-large'            },
  { name: 'font-size-heading-m',   pcRef: 'font-size-24', pcValue: '2.4rem', pcPx: '24px', mobileRef: 'font-size-22', mobileValue: '2.2rem', mobilePx: '22px', usage: '중형 섹션 제목',         krds: '--krds-pc-font-size-heading-medium'           },
  { name: 'font-size-nav-title-m', pcRef: 'font-size-24', pcValue: '2.4rem', pcPx: '24px', mobileRef: 'font-size-22', mobileValue: '2.2rem', mobilePx: '22px', usage: '내비게이션 제목',         krds: '--krds-pc-font-size-navigation-title-medium'  },
];

/** space xs/s/m/l/xl 전체: responsive.scss (같은 종류는 한 컬렉션에) */
export const responsiveSpacingGroups = spacingSizeGroups; // 전체 (xs, s, m, l, xl)

/** space m/l/xl 그룹: 모바일에서 값이 달라지는 토큰 */
export const responsiveSpacingChangingGroups = spacingSizeGroups.slice(2); // m, l, xl

/** space xs/s 그룹: 고정 (PC = 모바일) */
export const fixedSpacingSizeGroups = spacingSizeGroups.slice(0, 2); // xs, s

/** heading-s, body-l/m/s/xs: PC = 모바일 (responsive.scss에 정의, semantic에서 이동) */
export const semanticTypoStyleTokens = typoStyleTokens.slice(3);

/** section-padding-s/m/l, container-padding-x: 레이아웃 반응형 간격 */
export const responsiveLayoutTokens = [
  { name: 'section-padding-s',   pcRef: 'space-16', pcValue: '1.6rem', pcPx: '16px', mobileRef: 'space-12', mobileValue: '1.2rem', mobilePx: '12px', usage: '소형 섹션 여백'          },
  { name: 'section-padding-m',   pcRef: 'space-32', pcValue: '3.2rem', pcPx: '32px', mobileRef: 'space-20', mobileValue: '2rem',   mobilePx: '20px', usage: '일반 섹션 여백'          },
  { name: 'section-padding-l',   pcRef: 'space-48', pcValue: '4.8rem', pcPx: '48px', mobileRef: 'space-32', mobileValue: '3.2rem', mobilePx: '32px', usage: '대형 섹션 여백'          },
  { name: 'container-padding-x', pcRef: 'space-24', pcValue: '2.4rem', pcPx: '24px', mobileRef: 'space-16', mobileValue: '1.6rem', mobilePx: '16px', usage: '콘텐츠 좌우 내부 여백 (--krds-contents-padding-x)' },
];

/** 카드 패딩: PC/모바일 반응형 (KRDS padding-card-* 대응) */
export const responsivePaddingCardTokens = [
  { name: 'padding-card-l',  pcRef: 'space-40', pcValue: '4rem',   pcPx: '40px', mobileRef: 'space-24', mobileValue: '2.4rem', mobilePx: '24px', usage: '대형 카드 내부 여백', krds: '--krds-pc-padding-card-large'  },
  { name: 'padding-card-m',  pcRef: 'space-32', pcValue: '3.2rem', pcPx: '32px', mobileRef: 'space-24', mobileValue: '2.4rem', mobilePx: '24px', usage: '중형 카드 내부 여백', krds: '--krds-pc-padding-card-medium' },
  { name: 'padding-card-s',  pcRef: 'space-24', pcValue: '2.4rem', pcPx: '24px', mobileRef: 'space-20', mobileValue: '2rem',   mobilePx: '20px', usage: '소형 카드 내부 여백', krds: '--krds-pc-padding-card-small'  },
  { name: 'padding-card-xs', pcRef: 'space-16', pcValue: '1.6rem', pcPx: '16px', mobileRef: 'space-12', mobileValue: '1.2rem', mobilePx: '12px', usage: '최소 카드 내부 여백', krds: '--krds-pc-padding-card-xsmall' },
];

/** 레이아웃 조합 간격 (gap-layout-*): title-body / text-text / image-text / 페이지 구조 */
export const responsiveGapLayoutTokens = [
  { name: 'gap-layout-title-body-s',      pcRef: 'space-16', pcValue: '1.6rem', pcPx: '16px', mobileRef: 'space-8',  mobileValue: '0.8rem', mobilePx: '8px',  usage: '타이틀↔본문 소',         krds: '--krds-pc-gap-layout-title-body-small'       },
  { name: 'gap-layout-title-body-m',      pcRef: 'space-20', pcValue: '2rem',   pcPx: '20px', mobileRef: 'space-12', mobileValue: '1.2rem', mobilePx: '12px', usage: '타이틀↔본문 중',         krds: '--krds-pc-gap-layout-title-body-medium'      },
  { name: 'gap-layout-title-body-l',      pcRef: 'space-24', pcValue: '2.4rem', pcPx: '24px', mobileRef: 'space-20', mobileValue: '2rem',   mobilePx: '20px', usage: '타이틀↔본문 대',         krds: '--krds-pc-gap-layout-title-body-large'       },
  { name: 'gap-layout-text-text-s',       pcRef: 'space-12', pcValue: '1.2rem', pcPx: '12px', mobileRef: 'space-10', mobileValue: '1rem',   mobilePx: '10px', usage: '텍스트↔텍스트 소',       krds: '--krds-pc-gap-layout-text-text-small'        },
  { name: 'gap-layout-text-text-m',       pcRef: 'space-16', pcValue: '1.6rem', pcPx: '16px', mobileRef: 'space-12', mobileValue: '1.2rem', mobilePx: '12px', usage: '텍스트↔텍스트 중',       krds: '--krds-pc-gap-layout-text-text-medium'       },
  { name: 'gap-layout-text-text-l',       pcRef: 'space-20', pcValue: '2rem',   pcPx: '20px', mobileRef: 'space-16', mobileValue: '1.6rem', mobilePx: '16px', usage: '텍스트↔텍스트 대',       krds: '--krds-pc-gap-layout-text-text-large'        },
  { name: 'gap-layout-image-text-s',      pcRef: 'space-20', pcValue: '2rem',   pcPx: '20px', mobileRef: 'space-16', mobileValue: '1.6rem', mobilePx: '16px', usage: '이미지↔텍스트 소',       krds: '--krds-pc-gap-layout-image-text-small'       },
  { name: 'gap-layout-image-text-m',      pcRef: 'space-24', pcValue: '2.4rem', pcPx: '24px', mobileRef: 'space-20', mobileValue: '2rem',   mobilePx: '20px', usage: '이미지↔텍스트 중',       krds: '--krds-pc-gap-layout-image-text-medium'      },
  { name: 'gap-layout-image-text-l',      pcRef: 'space-32', pcValue: '3.2rem', pcPx: '32px', mobileRef: 'space-24', mobileValue: '2.4rem', mobilePx: '24px', usage: '이미지↔텍스트 대',       krds: '--krds-pc-gap-layout-image-text-large'       },
  { name: 'gap-layout-header-breadcrumb', pcRef: 'space-24', pcValue: '2.4rem', pcPx: '24px', mobileRef: 'space-16', mobileValue: '1.6rem', mobilePx: '16px', usage: '헤더↔브레드크럼',        krds: '--krds-pc-gap-layout-header-breadcrumb'      },
  { name: 'gap-layout-breadcrumb-h1',     pcRef: 'space-40', pcValue: '4rem',   pcPx: '40px', mobileRef: 'space-32', mobileValue: '3.2rem', mobilePx: '32px', usage: '브레드크럼↔H1',          krds: '--krds-pc-gap-layout-breadcrumb-h1'          },
  { name: 'gap-layout-h1-h2',             pcRef: 'space-48', pcValue: '4.8rem', pcPx: '48px', mobileRef: 'space-32', mobileValue: '3.2rem', mobilePx: '32px', usage: 'H1↔H2 간격',            krds: '--krds-pc-gap-layout-h1-h2'                 },
  { name: 'gap-layout-h2-h2',             pcRef: 'space-80', pcValue: '8rem',   pcPx: '80px', mobileRef: 'space-40', mobileValue: '4rem',   mobilePx: '40px', usage: 'H2↔H2 섹션 간격',       krds: '--krds-pc-gap-layout-h2-h2'                 },
  { name: 'gap-layout-h2-h3',             pcRef: 'space-40', pcValue: '4rem',   pcPx: '40px', mobileRef: 'space-24', mobileValue: '2.4rem', mobilePx: '24px', usage: 'H2↔H3 간격',            krds: '--krds-pc-gap-layout-h2-h3'                 },
  { name: 'gap-layout-h3-h3',             pcRef: 'space-64', pcValue: '6.4rem', pcPx: '64px', mobileRef: 'space-32', mobileValue: '3.2rem', mobilePx: '32px', usage: 'H3↔H3 섹션 간격',       krds: '--krds-pc-gap-layout-h3-h3'                 },
  { name: 'gap-layout-h3-h4',             pcRef: 'space-24', pcValue: '2.4rem', pcPx: '24px', mobileRef: 'space-16', mobileValue: '1.6rem', mobilePx: '16px', usage: 'H3↔H4 간격',            krds: '--krds-pc-gap-layout-h3-h4'                 },
  { name: 'gap-layout-h4-h4',             pcRef: 'space-40', pcValue: '4rem',   pcPx: '40px', mobileRef: 'space-24', mobileValue: '2.4rem', mobilePx: '24px', usage: 'H4↔H4 간격',            krds: '--krds-pc-gap-layout-h4-h4'                 },
  { name: 'gap-layout-h4-h5',             pcRef: 'space-16', pcValue: '1.6rem', pcPx: '16px', mobileRef: 'space-12', mobileValue: '1.2rem', mobilePx: '12px', usage: 'H4↔H5 간격',            krds: '--krds-pc-gap-layout-h4-h5'                 },
  { name: 'gap-layout-h5-h5',             pcRef: 'space-32', pcValue: '3.2rem', pcPx: '32px', mobileRef: 'space-16', mobileValue: '1.6rem', mobilePx: '16px', usage: 'H5↔H5 간격',            krds: '--krds-pc-gap-layout-h5-h5'                 },
  { name: 'gap-layout-left-contents',     pcRef: 'space-64', pcValue: '6.4rem', pcPx: '64px', mobileRef: 'space-0',  mobileValue: '0rem',   mobilePx: '0px',  usage: '좌측 패널↔본문 (모바일 0)', krds: '--krds-pc-gap-layout-left-contents'       },
  { name: 'gap-layout-contents-right',    pcRef: 'space-40', pcValue: '4rem',   pcPx: '40px', mobileRef: 'space-0',  mobileValue: '0rem',   mobilePx: '0px',  usage: '본문↔우측 패널 (모바일 0)', krds: '--krds-pc-gap-layout-contents-right'      },
  { name: 'gap-layout-contents-footer',   pcRef: 'space-64', pcValue: '6.4rem', pcPx: '64px', mobileRef: 'space-40', mobileValue: '4rem',   mobilePx: '40px', usage: '본문↔푸터',              krds: '--krds-pc-gap-layout-contents-footer'        },
];

/** 그림자 색상: mode.css에 정의, 모든 모드에서 동일 */
export const shadowColorTokens = [
  { name: 'color-shadow-subtle',  value: 'rgba(0,0,0,0.10)', ref: 'color-black-alpha-10', usage: '기본 그림자 (shadow-s, shadow-m 첫 레이어)', krds: '(자체 추가)' },
  { name: 'color-shadow-default', value: 'rgba(0,0,0,0.25)', ref: 'color-black-alpha-25', usage: '깊은 그림자 (shadow-l 두 번째 레이어)',         krds: '(자체 추가)' },
];

/** 모드 불변 고정 색상: semantic.css에 정의 */
export const semanticStaticColorTokens = [
  { name: 'color-text-on-static', value: '#ffffff', ref: 'color-gray-0', usage: '어두운 채움(dark fill) 배경 위 텍스트·아이콘 — 모든 모드에서 항상 흰색', krds: '(자체 추가)' },
];


/* ── 치수 프리미티브 (size-*) ─────────────────────────────────────────────── */

/** 컴포넌트 높이·너비 등 치수(dimension) 전용 프리미티브. KRDS --krds-size-height-* 대응. */
export const sizePrimTokens = [
  { name: 'size-8',  figma: 'size/8',  value: '0.8rem', usage: '8px  — 소형 indicator, carousel 등',                     krds: '--krds-size-height-1' },
  { name: 'size-16', figma: 'size/16', value: '1.6rem', usage: '16px — 체크박스·아이콘 최소 크기',                       krds: '--krds-size-height-2' },
  { name: 'size-20', figma: 'size/20', value: '2rem',   usage: '20px — 뱃지·체크박스 중간 크기',                         krds: '--krds-size-height-3' },
  { name: 'size-24', figma: 'size/24', value: '2.4rem', usage: '24px — 아이콘 기본 크기, 뱃지·체크박스 대형',            krds: '--krds-size-height-4' },
  { name: 'size-32', figma: 'size/32', value: '3.2rem', usage: '32px — 뱃지·버튼·태그 xsmall',                           krds: '--krds-size-height-5' },
  { name: 'size-40', figma: 'size/40', value: '4rem',   usage: '40px — 버튼·입력 필드·셀렉트·탭 small',                 krds: '--krds-size-height-6' },
  { name: 'size-48', figma: 'size/48', value: '4.8rem', usage: '48px — 버튼·입력 필드·셀렉트·탭 medium',                krds: '--krds-size-height-7' },
  { name: 'size-56', figma: 'size/56', value: '5.6rem', usage: '56px — 버튼·입력 필드 large ⚠️ KRDS 호환 예외 단계',   krds: '--krds-size-height-8' },
  { name: 'size-64', figma: 'size/64', value: '6.4rem', usage: '64px — 버튼 xlarge',                                     krds: '--krds-size-height-9' },
];


/* ── 아이콘 치수 시멘틱 ───────────────────────────────────────────────────── */

/** 아이콘 크기 시멘틱 토큰. --size-* 프리미티브를 참조. KRDS --krds-icon--size-* 대응. */
export const iconSizeTokens = [
  { name: 'icon-size-xs', figma: 'icon-size/xs', value: '1.6rem (16px)', ref: 'size-16', usage: 'xsmall — 뱃지·태그 내부 등 소형 (--krds-icon--size-xsmall)',  krds: '--krds-icon--size-xsmall' },
  { name: 'icon-size-s',  figma: 'icon-size/s',  value: '1.6rem (16px)', ref: 'size-16', usage: 'small — xsmall과 동일 (--krds-icon--size-small)',              krds: '--krds-icon--size-small'  },
  { name: 'icon-size-m',  figma: 'icon-size/m',  value: '2rem (20px)',   ref: 'size-20', usage: 'medium — 버튼·폼 아이콘 (--krds-icon--size-medium)',           krds: '--krds-icon--size-medium' },
  { name: 'icon-size-l',  figma: 'icon-size/l',  value: '2.4rem (24px)', ref: 'size-24', usage: 'large — 단독 아이콘 기본, 기본 클래스 (--krds-icon--size-large)', krds: '--krds-icon--size-large'  },
  { name: 'icon-size-xl', figma: 'icon-size/xl', value: '2.4rem (24px)', ref: 'size-24', usage: 'xlarge — large와 동일 (--krds-icon--size-xlarge)',              krds: '--krds-icon--size-xlarge' },
];


/* ── 레이아웃 컨테이너 시멘틱 ────────────────────────────────────────────── */

/** 레이아웃 컨테이너 시멘틱 토큰. px 단위 유지(KRDS 원본 값). */
export const containerTokens = [
  { name: 'container-max-width',  figma: 'container/max-width',  value: '1200px', ref: null, usage: '콘텐츠 최대 너비 (--krds-contents-size)',                krds: '--krds-contents-size'      },
  { name: 'container-wrap-width', figma: 'container/wrap-width', value: '1248px', ref: null, usage: '콘텐츠 + 좌우 패딩 합산 최대 너비 (--krds-contents-wrap-size)', krds: '--krds-contents-wrap-size' },
];
