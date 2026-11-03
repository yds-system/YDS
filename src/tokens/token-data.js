/**
 * 디자인 토큰 데이터
 * design-tokens.mdx에서 import해 표를 자동 생성한다.
 *
 * 각 토큰 필드:
 *   figma  — 피그마 변수 이름 (color/gray/0 등)
 *   css    — CSS 변수명 (--gray-0 등)
 *   value  — 실제 값 (resolved, 표시용)
 *   ref    — 참조하는 프리미티브 (시멘틱 토큰만)
 *   usage  — 용도 설명
 *   krds   — KRDS 원본 변수명 / 자체 추가 표시
 */

/* ── 1. 색상 프리미티브 ────────────────────────────────────────────────────── */

export const colorPrimGroups = [
  {
    name: 'gray',
    tokens: [
      { figma: 'color/gray/0',   css: '--gray-0',   value: '#ffffff', usage: '흰색 배경·역방향 글자', krds: '--krds-color-light-gray-0'   },
      { figma: 'color/gray/5',   css: '--gray-5',   value: '#f4f5f6', usage: '섹션·코드 배경',        krds: '--krds-color-light-gray-5'   },
      { figma: 'color/gray/10',  css: '--gray-10',  value: '#e6e8ea', usage: '비활성 배경·테이블 행', krds: '--krds-color-light-gray-10'  },
      { figma: 'color/gray/20',  css: '--gray-20',  value: '#cdd1d5', usage: '비활성·구분선',         krds: '--krds-color-light-gray-20'  },
      { figma: 'color/gray/30',  css: '--gray-30',  value: '#b1b8be', usage: '기본 테두리',            krds: '--krds-color-light-gray-30'  },
      { figma: 'color/gray/40',  css: '--gray-40',  value: '#8a949e', usage: '비활성 텍스트·아이콘',  krds: '--krds-color-light-gray-40'  },
      { figma: 'color/gray/50',  css: '--gray-50',  value: '#6d7882', usage: '3단계 보조 텍스트',     krds: '--krds-color-light-gray-50'  },
      { figma: 'color/gray/60',  css: '--gray-60',  value: '#58616a', usage: '강한 테두리',            krds: '--krds-color-light-gray-60'  },
      { figma: 'color/gray/70',  css: '--gray-70',  value: '#464c53', usage: '보조 텍스트·아이콘',    krds: '--krds-color-light-gray-70'  },
      { figma: 'color/gray/80',  css: '--gray-80',  value: '#33363d', usage: '기본 아이콘',            krds: '--krds-color-light-gray-80'  },
      { figma: 'color/gray/90',  css: '--gray-90',  value: '#1e2124', usage: '주요 텍스트·역방향 배경', krds: '--krds-color-light-gray-90'  },
      { figma: 'color/gray/95',  css: '--gray-95',  value: '#131416', usage: '최강 대비 텍스트',       krds: '--krds-color-light-gray-95'  },
      { figma: 'color/gray/100', css: '--gray-100', value: '#000000', usage: '검정',                   krds: '--krds-color-light-gray-100' },
    ],
  },
  {
    name: 'blue',
    tokens: [
      { figma: 'color/blue/5',  css: '--blue-5',  value: '#ecf2fe', usage: '브랜드 연한 배경·선택 상태', krds: '--krds-color-light-primary-5'  },
      { figma: 'color/blue/10', css: '--blue-10', value: '#d8e5fd', usage: '브랜드 hover 연한',           krds: '--krds-color-light-primary-10' },
      { figma: 'color/blue/20', css: '--blue-20', value: '#b1cefb', usage: '',                             krds: '--krds-color-light-primary-20' },
      { figma: 'color/blue/30', css: '--blue-30', value: '#86aff9', usage: '',                             krds: '--krds-color-light-primary-30' },
      { figma: 'color/blue/40', css: '--blue-40', value: '#4c87f6', usage: '',                             krds: '--krds-color-light-primary-40' },
      { figma: 'color/blue/50', css: '--blue-50', value: '#256ef4', usage: '브랜드 배경·링크·포커스 링',  krds: '--krds-color-light-primary-50' },
      { figma: 'color/blue/60', css: '--blue-60', value: '#0b50d0', usage: '브랜드 텍스트·hover',         krds: '--krds-color-light-primary-60' },
      { figma: 'color/blue/70', css: '--blue-70', value: '#083891', usage: '브랜드 pressed',              krds: '--krds-color-light-primary-70' },
      { figma: 'color/blue/80', css: '--blue-80', value: '#052561', usage: '',                             krds: '--krds-color-light-primary-80' },
      { figma: 'color/blue/90', css: '--blue-90', value: '#03163a', usage: '',                             krds: '--krds-color-light-primary-90' },
      { figma: 'color/blue/95', css: '--blue-95', value: '#020f27', usage: '',                             krds: '--krds-color-light-primary-95' },
    ],
  },
  {
    name: 'red',
    tokens: [
      { figma: 'color/red/5',  css: '--red-5',  value: '#fdefec', usage: '에러 연한 배경', krds: '--krds-color-light-danger-5'  },
      { figma: 'color/red/10', css: '--red-10', value: '#fcdfd9', usage: '',               krds: '--krds-color-light-danger-10' },
      { figma: 'color/red/20', css: '--red-20', value: '#f7afa1', usage: '',               krds: '--krds-color-light-danger-20' },
      { figma: 'color/red/30', css: '--red-30', value: '#f48771', usage: '',               krds: '--krds-color-light-danger-30' },
      { figma: 'color/red/40', css: '--red-40', value: '#f05f42', usage: '',               krds: '--krds-color-light-danger-40' },
      { figma: 'color/red/50', css: '--red-50', value: '#de3412', usage: '에러 테두리·아이콘', krds: '--krds-color-light-danger-50' },
      { figma: 'color/red/60', css: '--red-60', value: '#bd2c0f', usage: '에러 텍스트',   krds: '--krds-color-light-danger-60' },
      { figma: 'color/red/70', css: '--red-70', value: '#8a240f', usage: '',               krds: '--krds-color-light-danger-70' },
      { figma: 'color/red/80', css: '--red-80', value: '#5c180a', usage: '',               krds: '--krds-color-light-danger-80' },
      { figma: 'color/red/90', css: '--red-90', value: '#390d05', usage: '',               krds: '--krds-color-light-danger-90' },
      { figma: 'color/red/95', css: '--red-95', value: '#260903', usage: '',               krds: '--krds-color-light-danger-95' },
    ],
  },
  {
    name: 'orange',
    tokens: [
      { figma: 'color/orange/5',  css: '--orange-5',  value: '#fff3db', usage: '경고 연한 배경', krds: '--krds-color-light-warning-5'  },
      { figma: 'color/orange/10', css: '--orange-10', value: '#ffe0a3', usage: '',               krds: '--krds-color-light-warning-10' },
      { figma: 'color/orange/20', css: '--orange-20', value: '#ffc95c', usage: '',               krds: '--krds-color-light-warning-20' },
      { figma: 'color/orange/30', css: '--orange-30', value: '#ffb114', usage: '',               krds: '--krds-color-light-warning-30' },
      { figma: 'color/orange/40', css: '--orange-40', value: '#c78500', usage: '',               krds: '--krds-color-light-warning-40' },
      { figma: 'color/orange/50', css: '--orange-50', value: '#9e6a00', usage: '경고 테두리',   krds: '--krds-color-light-warning-50' },
      { figma: 'color/orange/60', css: '--orange-60', value: '#8a5c00', usage: '경고 텍스트',   krds: '--krds-color-light-warning-60' },
      { figma: 'color/orange/70', css: '--orange-70', value: '#614100', usage: '',               krds: '--krds-color-light-warning-70' },
      { figma: 'color/orange/80', css: '--orange-80', value: '#422c00', usage: '',               krds: '--krds-color-light-warning-80' },
      { figma: 'color/orange/90', css: '--orange-90', value: '#2e1f00', usage: '',               krds: '--krds-color-light-warning-90' },
      { figma: 'color/orange/95', css: '--orange-95', value: '#241800', usage: '',               krds: '--krds-color-light-warning-95' },
    ],
  },
  {
    name: 'green',
    tokens: [
      { figma: 'color/green/5',  css: '--green-5',  value: '#eaf6ec', usage: '성공 연한 배경',   krds: '--krds-color-light-success-5'  },
      { figma: 'color/green/10', css: '--green-10', value: '#d8eedd', usage: '',                  krds: '--krds-color-light-success-10' },
      { figma: 'color/green/20', css: '--green-20', value: '#a9dab4', usage: '',                  krds: '--krds-color-light-success-20' },
      { figma: 'color/green/30', css: '--green-30', value: '#7ec88e', usage: '',                  krds: '--krds-color-light-success-30' },
      { figma: 'color/green/40', css: '--green-40', value: '#3fa654', usage: '',                  krds: '--krds-color-light-success-40' },
      { figma: 'color/green/50', css: '--green-50', value: '#228738', usage: '성공 테두리',       krds: '--krds-color-light-success-50' },
      { figma: 'color/green/60', css: '--green-60', value: '#267337', usage: '성공 텍스트',       krds: '--krds-color-light-success-60' },
      { figma: 'color/green/70', css: '--green-70', value: '#285d33', usage: '',                  krds: '--krds-color-light-success-70' },
      { figma: 'color/green/80', css: '--green-80', value: '#1f4727', usage: '',                  krds: '--krds-color-light-success-80' },
      { figma: 'color/green/90', css: '--green-90', value: '#122b18', usage: '',                  krds: '--krds-color-light-success-90' },
      { figma: 'color/green/95', css: '--green-95', value: '#0e2012', usage: '',                  krds: '--krds-color-light-success-95' },
    ],
  },
  {
    name: 'info',
    tokens: [
      { figma: 'color/info/5',  css: '--info-5',  value: '#e7f4fe', usage: '안내 연한 배경', krds: '--krds-color-light-information-5'  },
      { figma: 'color/info/10', css: '--info-10', value: '#d3ebfd', usage: '',               krds: '--krds-color-light-information-10' },
      { figma: 'color/info/20', css: '--info-20', value: '#9ed2fa', usage: '',               krds: '--krds-color-light-information-20' },
      { figma: 'color/info/30', css: '--info-30', value: '#5fb5f7', usage: '',               krds: '--krds-color-light-information-30' },
      { figma: 'color/info/40', css: '--info-40', value: '#2098f3', usage: '',               krds: '--krds-color-light-information-40' },
      { figma: 'color/info/50', css: '--info-50', value: '#0b78cb', usage: '안내 테두리',   krds: '--krds-color-light-information-50' },
      { figma: 'color/info/60', css: '--info-60', value: '#096ab3', usage: '안내 텍스트',   krds: '--krds-color-light-information-60' },
      { figma: 'color/info/70', css: '--info-70', value: '#085691', usage: '',               krds: '--krds-color-light-information-70' },
      { figma: 'color/info/80', css: '--info-80', value: '#053961', usage: '',               krds: '--krds-color-light-information-80' },
      { figma: 'color/info/90', css: '--info-90', value: '#03253f', usage: '',               krds: '--krds-color-light-information-90' },
      { figma: 'color/info/95', css: '--info-95', value: '#021a2c', usage: '',               krds: '--krds-color-light-information-95' },
    ],
  },
  {
    name: 'black-alpha',
    tokens: [
      { figma: 'color/black-alpha/100', css: '--black-alpha-100', value: '#000000',   usage: '불투명 검정',       krds: '--krds-color-light-alpha-black100' },
      { figma: 'color/black-alpha/75',  css: '--black-alpha-75',  value: '#000000bf', usage: '딤 오버레이',       krds: '--krds-color-light-alpha-black75'  },
      { figma: 'color/black-alpha/50',  css: '--black-alpha-50',  value: '#00000080', usage: '',                  krds: '--krds-color-light-alpha-black50'  },
      { figma: 'color/black-alpha/25',  css: '--black-alpha-25',  value: '#00000040', usage: '',                  krds: '--krds-color-light-alpha-black25'  },
      { figma: 'color/black-alpha/10',  css: '--black-alpha-10',  value: '#0000001a', usage: '그림자·호버 오버레이', krds: '--krds-color-light-alpha-black10'  },
      { figma: 'color/black-alpha/0',   css: '--black-alpha-0',   value: '#00000000', usage: '완전 투명',         krds: '--krds-color-light-alpha-black0'   },
    ],
  },
  {
    name: 'white-alpha',
    tokens: [
      { figma: 'color/white-alpha/100', css: '--white-alpha-100', value: '#ffffff',   usage: '불투명 흰색',       krds: '--krds-color-light-alpha-white100' },
      { figma: 'color/white-alpha/75',  css: '--white-alpha-75',  value: '#ffffffbf', usage: '',                  krds: '--krds-color-light-alpha-white75'  },
      { figma: 'color/white-alpha/50',  css: '--white-alpha-50',  value: '#ffffff80', usage: '',                  krds: '--krds-color-light-alpha-white50'  },
      { figma: 'color/white-alpha/25',  css: '--white-alpha-25',  value: '#ffffff40', usage: '',                  krds: '--krds-color-light-alpha-white25'  },
      { figma: 'color/white-alpha/10',  css: '--white-alpha-10',  value: '#ffffff1a', usage: '',                  krds: '--krds-color-light-alpha-white10'  },
      { figma: 'color/white-alpha/0',   css: '--white-alpha-0',   value: '#ffffff00', usage: '완전 투명',         krds: '--krds-color-light-alpha-white0'   },
    ],
  },
];


/* ── 2. 색상 시멘틱 ───────────────────────────────────────────────────────── */

export const colorSemanticGroups = [
  {
    name: 'txt- (글자색)',
    tokens: [
      { figma: 'txt/primary',      css: '--txt-primary',      value: '#1e2124', ref: '--gray-90',   usage: '본문·제목 주요 텍스트',          krds: '--krds-light-color-text-basic'            },
      { figma: 'txt/secondary',    css: '--txt-secondary',    value: '#464c53', ref: '--gray-70',   usage: '보조 설명·플레이스홀더',          krds: '--krds-light-color-text-subtle'           },
      { figma: 'txt/tertiary',     css: '--txt-tertiary',     value: '#6d7882', ref: '--gray-50',   usage: '3단계 보조 텍스트',               krds: '(자체 추가)'                              },
      { figma: 'txt/disabled',     css: '--txt-disabled',     value: '#8a949e', ref: '--gray-40',   usage: '비활성 텍스트',                   krds: '--krds-light-color-text-disabled'         },
      { figma: 'txt/inverse',      css: '--txt-inverse',      value: '#ffffff', ref: '--gray-0',    usage: '어두운 배경 위 텍스트',           krds: '--krds-light-color-text-basic-inverse'    },
      { figma: 'txt/on-brand',     css: '--txt-on-brand',     value: '#ffffff', ref: '--gray-0',    usage: '브랜드 배경 위 텍스트',           krds: '(자체 추가)'                              },
      { figma: 'txt/brand',        css: '--txt-brand',        value: '#0b50d0', ref: '--blue-60',   usage: '브랜드·강조 텍스트',              krds: '--krds-light-color-text-primary'          },
      { figma: 'txt/link',         css: '--txt-link',         value: '#256ef4', ref: '--blue-50',   usage: '링크 기본',                       krds: '--krds-light-color-link-default'          },
      { figma: 'txt/link-visited', css: '--txt-link-visited', value: '#5917b8', ref: null,          usage: '방문한 링크 (KRDS 고정값)',       krds: '--krds-light-color-link-visited'          },
      { figma: 'txt/success',      css: '--txt-success',      value: '#267337', ref: '--green-60',  usage: '성공 메시지',                     krds: '--krds-light-color-text-success'          },
      { figma: 'txt/warning',      css: '--txt-warning',      value: '#8a5c00', ref: '--orange-60', usage: '경고 메시지',                     krds: '--krds-light-color-text-warning'          },
      { figma: 'txt/danger',       css: '--txt-danger',       value: '#bd2c0f', ref: '--red-60',    usage: '에러 메시지',                     krds: '--krds-light-color-text-danger'           },
      { figma: 'txt/info',         css: '--txt-info',         value: '#096ab3', ref: '--info-60',   usage: '안내 메시지',                     krds: '--krds-light-color-text-information'      },
    ],
  },
  {
    name: 'bg- (배경색)',
    tokens: [
      { figma: 'bg/primary',        css: '--bg-primary',        value: '#ffffff', ref: '--gray-0',         usage: '페이지·카드 기본 배경',         krds: '--krds-light-color-background-white'           },
      { figma: 'bg/secondary',      css: '--bg-secondary',      value: '#f4f5f6', ref: '--gray-5',         usage: '섹션·코드블록 배경',            krds: '--krds-light-color-background-gray-subtler'    },
      { figma: 'bg/tertiary',       css: '--bg-tertiary',       value: '#e6e8ea', ref: '--gray-10',        usage: '3단계 배경 (테이블 행 등)',      krds: '--krds-light-color-background-gray-subtle'     },
      { figma: 'bg/elevated',       css: '--bg-elevated',       value: '#ffffff', ref: '--gray-0',         usage: '플로팅 카드·드롭다운',           krds: '(자체 추가)'                                   },
      { figma: 'bg/inverse',        css: '--bg-inverse',        value: '#1e2124', ref: '--gray-90',        usage: '다크 배경 (헤더·푸터)',          krds: '--krds-light-color-background-inverse'         },
      { figma: 'bg/disabled',       css: '--bg-disabled',       value: '#cdd1d5', ref: '--gray-20',        usage: '비활성 요소 배경',              krds: '--krds-light-color-surface-disabled'           },
      { figma: 'bg/overlay',        css: '--bg-overlay',        value: '#000000bf', ref: '--black-alpha-75', usage: '딤 오버레이',                 krds: '--krds-light-color-background-dim'             },
      { figma: 'bg/hover',          css: '--bg-hover',          value: '#f4f5f6', ref: '--gray-5',         usage: '일반 hover 배경',               krds: '(자체 추가)'                                   },
      { figma: 'bg/selected',       css: '--bg-selected',       value: '#ecf2fe', ref: '--blue-5',         usage: '선택된 항목 배경',              krds: '--krds-light-color-action-primary-selected'    },
      { figma: 'bg/brand',          css: '--bg-brand',          value: '#256ef4', ref: '--blue-50',        usage: '브랜드 강조 배경 (버튼 등)',     krds: '--krds-light-color-button-primary-fill'        },
      { figma: 'bg/brand-hover',    css: '--bg-brand-hover',    value: '#0b50d0', ref: '--blue-60',        usage: '브랜드 hover',                  krds: '--krds-light-color-button-primary-fill-hover'  },
      { figma: 'bg/brand-pressed',  css: '--bg-brand-pressed',  value: '#083891', ref: '--blue-70',        usage: '브랜드 pressed',                krds: '--krds-light-color-button-primary-fill-pressed'},
      { figma: 'bg/brand-subtle',   css: '--bg-brand-subtle',   value: '#ecf2fe', ref: '--blue-5',         usage: '브랜드 연한 배경',              krds: '--krds-light-color-surface-primary-subtler'    },
      { figma: 'bg/success-subtle', css: '--bg-success-subtle', value: '#eaf6ec', ref: '--green-5',        usage: '성공 연한 배경',                krds: '--krds-light-color-surface-success-subtler'    },
      { figma: 'bg/warning-subtle', css: '--bg-warning-subtle', value: '#fff3db', ref: '--orange-5',       usage: '경고 연한 배경',                krds: '--krds-light-color-surface-warning-subtler'    },
      { figma: 'bg/danger-subtle',  css: '--bg-danger-subtle',  value: '#fdefec', ref: '--red-5',          usage: '에러 연한 배경',                krds: '--krds-light-color-surface-danger-subtler'     },
      { figma: 'bg/info-subtle',    css: '--bg-info-subtle',    value: '#e7f4fe', ref: '--info-5',         usage: '안내 연한 배경',                krds: '--krds-light-color-surface-information-subtler'},
    ],
  },
  {
    name: 'border- (테두리색)',
    tokens: [
      { figma: 'border/primary',   css: '--border-primary',   value: '#b1b8be', ref: '--gray-30',    usage: '기본 테두리',               krds: '--krds-light-color-border-gray'        },
      { figma: 'border/secondary', css: '--border-secondary', value: '#cdd1d5', ref: '--gray-20',    usage: '연한 테두리',               krds: '--krds-light-color-border-gray-light'  },
      { figma: 'border/strong',    css: '--border-strong',    value: '#58616a', ref: '--gray-60',    usage: '강한 테두리 (입력 필드)',    krds: '--krds-light-color-input-border'       },
      { figma: 'border/divider',   css: '--border-divider',   value: '#8a949e', ref: '--gray-40',    usage: '구분선',                    krds: '--krds-light-color-divider-gray'       },
      { figma: 'border/focus',     css: '--border-focus',     value: '#256ef4', ref: '--blue-50',    usage: '포커스 링',                 krds: '--krds-light-color-border-primary'     },
      { figma: 'border/disabled',  css: '--border-disabled',  value: '#b1b8be', ref: '--gray-30',    usage: '비활성 테두리',             krds: '--krds-light-color-border-disabled'    },
      { figma: 'border/brand',     css: '--border-brand',     value: '#256ef4', ref: '--blue-50',    usage: '브랜드 테두리',             krds: '--krds-light-color-border-primary'     },
      { figma: 'border/success',   css: '--border-success',   value: '#228738', ref: '--green-50',   usage: '성공 테두리',               krds: '--krds-light-color-border-success'     },
      { figma: 'border/warning',   css: '--border-warning',   value: '#9e6a00', ref: '--orange-50',  usage: '경고 테두리',               krds: '--krds-light-color-border-warning'     },
      { figma: 'border/danger',    css: '--border-danger',    value: '#de3412', ref: '--red-50',     usage: '에러 테두리',               krds: '--krds-light-color-border-danger'      },
    ],
  },
  {
    name: 'icon- (아이콘색)',
    tokens: [
      { figma: 'icon/primary',   css: '--icon-primary',   value: '#33363d', ref: '--gray-80',  usage: '기본 아이콘',               krds: '--krds-light-color-icon-gray'      },
      { figma: 'icon/secondary', css: '--icon-secondary', value: '#464c53', ref: '--gray-70',  usage: '보조 아이콘',               krds: '--krds-light-color-icon-gray-light'},
      { figma: 'icon/disabled',  css: '--icon-disabled',  value: '#8a949e', ref: '--gray-40',  usage: '비활성 아이콘',             krds: '--krds-light-color-icon-disabled'  },
      { figma: 'icon/inverse',   css: '--icon-inverse',   value: '#ffffff', ref: '--gray-0',   usage: '어두운 배경 위 아이콘',     krds: '--krds-light-color-icon-inverse'   },
      { figma: 'icon/brand',     css: '--icon-brand',     value: '#256ef4', ref: '--blue-50',  usage: '브랜드 아이콘',             krds: '--krds-light-color-icon-primary'   },
      { figma: 'icon/danger',    css: '--icon-danger',    value: '#de3412', ref: '--red-50',   usage: '에러 아이콘',               krds: '--krds-light-color-icon-danger'    },
    ],
  },
];


/* ── 3. 타이포 ────────────────────────────────────────────────────────────── */

export const typoPrimTokens = [
  { figma: 'font-family/base', css: '--font-family-base', value: "'Pretendard GOV', sans-serif", ref: null, usage: '기본 폰트',      krds: '--krds-typo-font-type'              },
  { figma: 'font-family/code', css: '--font-family-code', value: "'D2Coding', monospace",        ref: null, usage: '코드 폰트',      krds: '(자체 추가)'                        },
  { figma: 'font-size/13',  css: '--font-size-13',  value: '1.3rem (13px)', ref: null, usage: 'caption, label-xsmall', krds: '--krds-pc-font-size-body-xsmall'     },
  { figma: 'font-size/15',  css: '--font-size-15',  value: '1.5rem (15px)', ref: null, usage: 'body-s, label-s, code', krds: '--krds-pc-font-size-body-small'      },
  { figma: 'font-size/17',  css: '--font-size-17',  value: '1.7rem (17px)', ref: null, usage: 'body-m, label-m',       krds: '--krds-pc-font-size-body-medium'     },
  { figma: 'font-size/19',  css: '--font-size-19',  value: '1.9rem (19px)', ref: null, usage: 'body-l, label-l, heading-s', krds: '--krds-pc-font-size-body-large' },
  { figma: 'font-size/22',  css: '--font-size-22',  value: '2.2rem (22px)', ref: null, usage: 'heading-m (모바일)',     krds: '--krds-mobile-font-size-heading-medium' },
  { figma: 'font-size/24',  css: '--font-size-24',  value: '2.4rem (24px)', ref: null, usage: 'heading-m (PC)',         krds: '--krds-pc-font-size-heading-medium'  },
  { figma: 'font-size/28',  css: '--font-size-28',  value: '2.8rem (28px)', ref: null, usage: 'heading-xl (모바일)',    krds: '--krds-mobile-font-size-heading-xlarge' },
  { figma: 'font-size/32',  css: '--font-size-32',  value: '3.2rem (32px)', ref: null, usage: 'heading-l (PC)',         krds: '--krds-pc-font-size-heading-large'   },
  { figma: 'font-size/36',  css: '--font-size-36',  value: '3.6rem (36px)', ref: null, usage: 'display-s',             krds: '--krds-pc-font-size-display-small'   },
  { figma: 'font-size/40',  css: '--font-size-40',  value: '4rem (40px)',   ref: null, usage: 'heading-xl (PC)',        krds: '--krds-pc-font-size-heading-xlarge'  },
  { figma: 'font-size/44',  css: '--font-size-44',  value: '4.4rem (44px)', ref: null, usage: 'display-m (PC)',         krds: '--krds-pc-font-size-display-medium'  },
  { figma: 'font-size/60',  css: '--font-size-60',  value: '6rem (60px)',   ref: null, usage: 'display-l (PC)',         krds: '--krds-pc-font-size-display-large'   },
  { figma: 'font-weight/regular', css: '--font-weight-regular', value: '400', ref: null, usage: '본문 기본 굵기',   krds: '--krds-typo-font-weight-regular' },
  { figma: 'font-weight/medium',  css: '--font-weight-medium',  value: '500', ref: null, usage: '레이블·강조',      krds: '(자체 추가)'                     },
  { figma: 'font-weight/bold',    css: '--font-weight-bold',    value: '700', ref: null, usage: '제목·버튼',        krds: '--krds-typo-font-weight-bold'    },
  { figma: 'line-height/tight',   css: '--line-height-tight',   value: '1.25', ref: null, usage: '큰 제목',         krds: '(자체 추가)'                     },
  { figma: 'line-height/normal',  css: '--line-height-normal',  value: '1.5',  ref: null, usage: '본문 기본',       krds: '(자체 추가)'                     },
  { figma: 'line-height/relaxed', css: '--line-height-relaxed', value: '1.75', ref: null, usage: '코드·읽기 긴 글', krds: '(자체 추가)'                     },
  { figma: 'letter-spacing/tight',  css: '--letter-spacing-tight',  value: '-0.025em', ref: null, usage: '큰 제목', krds: '(자체 추가)'                     },
  { figma: 'letter-spacing/normal', css: '--letter-spacing-normal', value: '0em',      ref: null, usage: '기본',    krds: '--krds-typo-letter-spacing-0'    },
];

export const typoStyleTokens = [
  { figma: 'text-style/display-l',  css: '--font-size-display-l',  valuePC: '6rem / bold / 1.25',  valueMobile: '4.4rem / bold / 1.25',  usage: '최대 디스플레이 제목',    krds: '--krds-pc-font-size-display-large'     },
  { figma: 'text-style/display-m',  css: '--font-size-display-m',  valuePC: '4.4rem / bold / 1.25', valueMobile: '3.2rem / bold / 1.25', usage: '디스플레이 제목',         krds: '--krds-pc-font-size-display-medium'    },
  { figma: 'text-style/heading-xl', css: '--font-size-heading-xl', valuePC: '4rem / bold / 1.25',   valueMobile: '2.8rem / bold / 1.25', usage: '최대 섹션 제목',          krds: '--krds-pc-font-size-heading-xlarge'    },
  { figma: 'text-style/heading-l',  css: '--font-size-heading-l',  valuePC: '3.2rem / bold / 1.25', valueMobile: '2.4rem / bold / 1.25', usage: '대형 섹션 제목',          krds: '--krds-pc-font-size-heading-large'     },
  { figma: 'text-style/heading-m',  css: '--font-size-heading-m',  valuePC: '2.4rem / bold / 1.5',  valueMobile: '2.2rem / bold / 1.5',  usage: '중형 섹션 제목',          krds: '--krds-pc-font-size-heading-medium'    },
  { figma: 'text-style/heading-s',  css: '--font-size-heading-s',  valuePC: '1.9rem / bold / 1.5',  valueMobile: '1.9rem / bold / 1.5',  usage: '소형 섹션 제목',          krds: '--krds-pc-font-size-heading-small'     },
  { figma: 'text-style/body-l',     css: '--font-size-body-l',     valuePC: '1.9rem / 400 / 1.5',   valueMobile: '1.9rem / 400 / 1.5',   usage: '대형 본문',               krds: '--krds-pc-font-size-body-large'        },
  { figma: 'text-style/body-m',     css: '--font-size-body-m',     valuePC: '1.7rem / 400 / 1.5',   valueMobile: '1.7rem / 400 / 1.5',   usage: '기본 본문',               krds: '--krds-pc-font-size-body-medium'       },
  { figma: 'text-style/body-s',     css: '--font-size-body-s',     valuePC: '1.5rem / 400 / 1.5',   valueMobile: '1.5rem / 400 / 1.5',   usage: '소형 본문·도움말',        krds: '--krds-pc-font-size-body-small'        },
  { figma: 'text-style/label-l',    css: '--font-size-label-l',    valuePC: '1.9rem / 500 / 1.5',   valueMobile: '1.9rem / 500 / 1.5',   usage: '대형 레이블·버튼',        krds: '--krds-pc-font-size-label-large'       },
  { figma: 'text-style/label-m',    css: '--font-size-label-m',    valuePC: '1.7rem / 500 / 1.5',   valueMobile: '1.7rem / 500 / 1.5',   usage: '기본 레이블·버튼',        krds: '--krds-pc-font-size-label-medium'      },
  { figma: 'text-style/label-s',    css: '--font-size-label-s',    valuePC: '1.5rem / 500 / 1.5',   valueMobile: '1.5rem / 500 / 1.5',   usage: '소형 레이블',             krds: '--krds-pc-font-size-label-small'       },
  { figma: 'text-style/caption',    css: '--font-size-caption',    valuePC: '1.3rem / 400 / 1.5',   valueMobile: '1.3rem / 400 / 1.5',   usage: '캡션·주석',               krds: '--krds-pc-font-size-body-xsmall'       },
  { figma: 'text-style/code',       css: '--font-size-code',       valuePC: '1.5rem / 400 / 1.75',  valueMobile: '1.5rem / 400 / 1.75',  usage: '코드·인라인 코드',        krds: '(자체 추가)'                           },
];


/* ── 4. 간격 ──────────────────────────────────────────────────────────────── */

export const spacingPrimTokens = [
  { figma: 'spacing/0',  css: '--spacing-0',  value: '0rem',    usage: '간격 없음',          krds: '--krds-number-0'  },
  { figma: 'spacing/2',  css: '--spacing-2',  value: '0.2rem',  usage: '2px',                krds: '--krds-number-2'  },
  { figma: 'spacing/4',  css: '--spacing-4',  value: '0.4rem',  usage: '4px',                krds: '--krds-number-3'  },
  { figma: 'spacing/8',  css: '--spacing-8',  value: '0.8rem',  usage: '8px',                krds: '--krds-number-5'  },
  { figma: 'spacing/12', css: '--spacing-12', value: '1.2rem',  usage: '12px',               krds: '--krds-number-7'  },
  { figma: 'spacing/16', css: '--spacing-16', value: '1.6rem',  usage: '16px',               krds: '--krds-number-8'  },
  { figma: 'spacing/20', css: '--spacing-20', value: '2rem',    usage: '20px',               krds: '--krds-number-9'  },
  { figma: 'spacing/24', css: '--spacing-24', value: '2.4rem',  usage: '24px',               krds: '--krds-number-10' },
  { figma: 'spacing/32', css: '--spacing-32', value: '3.2rem',  usage: '32px',               krds: '--krds-number-12' },
  { figma: 'spacing/40', css: '--spacing-40', value: '4rem',    usage: '40px',               krds: '--krds-number-14' },
  { figma: 'spacing/48', css: '--spacing-48', value: '4.8rem',  usage: '48px',               krds: '--krds-number-16' },
  { figma: 'spacing/64', css: '--spacing-64', value: '6.4rem',  usage: '64px',               krds: '--krds-number-18' },
  { figma: 'spacing/80', css: '--spacing-80', value: '8rem',    usage: '80px',               krds: '--krds-number-20' },
];

export const spacingSemanticTokens = [
  { figma: 'gap/xs',             css: '--gap-xs',             value: '0.4rem (4px)',   ref: '--spacing-4',  usage: '아이콘↔레이블 인라인 소간격', krds: '--krds-gap-2'    },
  { figma: 'gap/s',              css: '--gap-s',              value: '0.8rem (8px)',   ref: '--spacing-8',  usage: '입력 그룹 내부 간격',         krds: '--krds-gap-3'    },
  { figma: 'gap/m',              css: '--gap-m',              value: '1.6rem (16px)',  ref: '--spacing-16', usage: '컴포넌트 간 기본 간격',       krds: '--krds-gap-5'    },
  { figma: 'gap/l',              css: '--gap-l',              value: '2.4rem (24px)',  ref: '--spacing-24', usage: '섹션 내 블록 간격',           krds: '--krds-gap-7'    },
  { figma: 'gap/xl',             css: '--gap-xl',             value: '4rem (40px)',    ref: '--spacing-40', usage: '섹션 간 여백',                krds: '--krds-gap-9'    },
  { figma: 'padding/xs',         css: '--padding-xs',         value: '0.4rem (4px)',   ref: '--spacing-4',  usage: '뱃지·태그 소형 내부 여백',   krds: '--krds-padding-2' },
  { figma: 'padding/s',          css: '--padding-s',          value: '0.8rem (8px)',   ref: '--spacing-8',  usage: '버튼 상하 패딩 기본',         krds: '--krds-padding-3' },
  { figma: 'padding/m',          css: '--padding-m',          value: '1.6rem (16px)',  ref: '--spacing-16', usage: '카드·입력 필드 내부 여백',    krds: '--krds-padding-6' },
  { figma: 'padding/l',          css: '--padding-l',          value: '2.4rem (24px)',  ref: '--spacing-24', usage: '섹션 헤더 내부 여백',         krds: '--krds-padding-8' },
  { figma: 'padding/xl',         css: '--padding-xl',         value: '4rem (40px)',    ref: '--spacing-40', usage: '페이지 상단 여백',            krds: '--krds-padding-10' },
  { figma: 'section-padding/s',  css: '--section-padding-s',  value: '1.6rem→1.2rem', ref: '--spacing-16', usage: '소형 섹션 여백 (모바일 축소)', krds: '(자체 추가)'     },
  { figma: 'section-padding/m',  css: '--section-padding-m',  value: '3.2rem→2rem',   ref: '--spacing-32', usage: '일반 섹션 여백 (모바일 축소)', krds: '(자체 추가)'     },
  { figma: 'section-padding/l',  css: '--section-padding-l',  value: '4.8rem→3.2rem', ref: '--spacing-48', usage: '대형 섹션 여백 (모바일 축소)', krds: '(자체 추가)'     },
];


/* ── 6. 모서리 ────────────────────────────────────────────────────────────── */

export const radiusPrimTokens = [
  { figma: 'radius/0',   css: '--radius-0',   value: '0rem',    usage: '0px — 직각',           krds: '(자체 추가)'           },
  { figma: 'radius/2',   css: '--radius-2',   value: '0.2rem',  usage: '2px',                  krds: '--krds-radius-xsmall1' },
  { figma: 'radius/4',   css: '--radius-4',   value: '0.4rem',  usage: '4px',                  krds: '--krds-radius-small1'  },
  { figma: 'radius/6',   css: '--radius-6',   value: '0.6rem',  usage: '6px',                  krds: '--krds-radius-medium1' },
  { figma: 'radius/8',   css: '--radius-8',   value: '0.8rem',  usage: '8px',                  krds: '--krds-radius-medium3' },
  { figma: 'radius/12',  css: '--radius-12',  value: '1.2rem',  usage: '12px',                 krds: '--krds-radius-xlarge1' },
  { figma: 'radius/16',  css: '--radius-16',  value: '1.6rem',  usage: '16px',                 krds: '(자체 추가)'           },
  { figma: 'radius/24',  css: '--radius-24',  value: '2.4rem',  usage: '24px',                 krds: '(자체 추가)'           },
  { figma: 'radius/999', css: '--radius-999', value: '99.9rem', usage: '원형·알약형 (999px+)', krds: '--krds-radius-max'     },
];

export const radiusSemanticTokens = [
  { figma: 'radius/xs',     css: '--radius-xs',     value: '0.2rem (2px)',    ref: '--radius-2',   usage: '뱃지·태그 소형',          krds: '--krds-radius-xsmall1' },
  { figma: 'radius/s',      css: '--radius-s',      value: '0.4rem (4px)',    ref: '--radius-4',   usage: '태그·칩',                  krds: '--krds-radius-small1'  },
  { figma: 'radius/m',      css: '--radius-m',      value: '0.8rem (8px)',    ref: '--radius-8',   usage: '버튼·입력 필드·카드',      krds: '--krds-radius-medium3' },
  { figma: 'radius/l',      css: '--radius-l',      value: '1.2rem (12px)',   ref: '--radius-12',  usage: '모달·패널',                krds: '--krds-radius-xlarge1' },
  { figma: 'radius/xl',     css: '--radius-xl',     value: '1.6rem (16px)',   ref: '--radius-16',  usage: '대형 카드',                krds: '(자체 추가)'           },
  { figma: 'radius/circle', css: '--radius-circle', value: '99.9rem (원형)', ref: '--radius-999', usage: '원형·알약형 버튼·뱃지',   krds: '--krds-radius-max'     },
];
