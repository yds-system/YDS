/**
 * 디자인 토큰 데이터
 * design-tokens.mdx에서 import해 표를 자동 생성한다.
 *
 * 각 토큰 필드:
 *   name   — 토큰 이름 (-- 없음, 예: gray-0 / bg-brand)
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
    name: 'gray',
    tokens: [
      { name: 'gray-0',   figma: 'color/gray/0',   value: '#ffffff', usage: '흰색 배경·역방향 글자',     krds: '--krds-color-light-gray-0'   },
      { name: 'gray-5',   figma: 'color/gray/5',   value: '#f4f5f6', usage: '섹션·코드 배경',            krds: '--krds-color-light-gray-5'   },
      { name: 'gray-10',  figma: 'color/gray/10',  value: '#e6e8ea', usage: '비활성 배경·테이블 행',     krds: '--krds-color-light-gray-10'  },
      { name: 'gray-20',  figma: 'color/gray/20',  value: '#cdd1d5', usage: '비활성·구분선',             krds: '--krds-color-light-gray-20'  },
      { name: 'gray-30',  figma: 'color/gray/30',  value: '#b1b8be', usage: '기본 테두리',               krds: '--krds-color-light-gray-30'  },
      { name: 'gray-40',  figma: 'color/gray/40',  value: '#8a949e', usage: '비활성 텍스트·아이콘',      krds: '--krds-color-light-gray-40'  },
      { name: 'gray-50',  figma: 'color/gray/50',  value: '#6d7882', usage: '3단계 보조 텍스트',         krds: '--krds-color-light-gray-50'  },
      { name: 'gray-60',  figma: 'color/gray/60',  value: '#58616a', usage: '강한 테두리',               krds: '--krds-color-light-gray-60'  },
      { name: 'gray-70',  figma: 'color/gray/70',  value: '#464c53', usage: '보조 텍스트·아이콘',        krds: '--krds-color-light-gray-70'  },
      { name: 'gray-80',  figma: 'color/gray/80',  value: '#33363d', usage: '기본 아이콘',               krds: '--krds-color-light-gray-80'  },
      { name: 'gray-90',  figma: 'color/gray/90',  value: '#1e2124', usage: '주요 텍스트·역방향 배경',   krds: '--krds-color-light-gray-90'  },
      { name: 'gray-95',  figma: 'color/gray/95',  value: '#131416', usage: '최강 대비 텍스트',          krds: '--krds-color-light-gray-95'  },
      { name: 'gray-100', figma: 'color/gray/100', value: '#000000', usage: '검정',                      krds: '--krds-color-light-gray-100' },
    ],
  },
  {
    name: 'secondary',
    tokens: [
      { name: 'secondary-5',  figma: 'color/secondary/5',  value: '#f3f0ff', usage: '2번 브랜드 연한 배경', krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-10', figma: 'color/secondary/10', value: '#e8e3ff', usage: '',                     krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-20', figma: 'color/secondary/20', value: '#cfc5ff', usage: '',                     krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-30', figma: 'color/secondary/30', value: '#b4a2ff', usage: '',                     krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-40', figma: 'color/secondary/40', value: '#9579f7', usage: '',                     krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-50', figma: 'color/secondary/50', value: '#7c5de8', usage: '2번 브랜드 배경·테두리', krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-60', figma: 'color/secondary/60', value: '#6845ce', usage: '2번 브랜드 텍스트·hover', krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-70', figma: 'color/secondary/70', value: '#5433b4', usage: '2번 브랜드 pressed',   krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-80', figma: 'color/secondary/80', value: '#3d2490', usage: '',                     krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-90', figma: 'color/secondary/90', value: '#26166b', usage: '',                     krds: '(자체 추가 / 추후 확정)' },
      { name: 'secondary-95', figma: 'color/secondary/95', value: '#190e4f', usage: '',                     krds: '(자체 추가 / 추후 확정)' },
    ],
  },
  {
    name: 'primary',
    tokens: [
      { name: 'primary-5',  figma: 'color/primary/5',  value: '#ecf2fe', usage: '브랜드 연한 배경·선택 상태', krds: '--krds-color-light-primary-5'  },
      { name: 'primary-10', figma: 'color/primary/10', value: '#d8e5fd', usage: '브랜드 hover 연한',           krds: '--krds-color-light-primary-10' },
      { name: 'primary-20', figma: 'color/primary/20', value: '#b1cefb', usage: '',                             krds: '--krds-color-light-primary-20' },
      { name: 'primary-30', figma: 'color/primary/30', value: '#86aff9', usage: '',                             krds: '--krds-color-light-primary-30' },
      { name: 'primary-40', figma: 'color/primary/40', value: '#4c87f6', usage: '',                             krds: '--krds-color-light-primary-40' },
      { name: 'primary-50', figma: 'color/primary/50', value: '#256ef4', usage: '브랜드 배경·링크·포커스 링',  krds: '--krds-color-light-primary-50' },
      { name: 'primary-60', figma: 'color/primary/60', value: '#0b50d0', usage: '브랜드 텍스트·hover',         krds: '--krds-color-light-primary-60' },
      { name: 'primary-70', figma: 'color/primary/70', value: '#083891', usage: '브랜드 pressed',              krds: '--krds-color-light-primary-70' },
      { name: 'primary-80', figma: 'color/primary/80', value: '#052561', usage: '',                             krds: '--krds-color-light-primary-80' },
      { name: 'primary-90', figma: 'color/primary/90', value: '#03163a', usage: '',                             krds: '--krds-color-light-primary-90' },
      { name: 'primary-95', figma: 'color/primary/95', value: '#020f27', usage: '',                             krds: '--krds-color-light-primary-95' },
    ],
  },
  {
    name: 'danger',
    tokens: [
      { name: 'danger-5',  figma: 'color/danger/5',  value: '#fdefec', usage: '에러 연한 배경', krds: '--krds-color-light-danger-5'  },
      { name: 'danger-10', figma: 'color/danger/10', value: '#fcdfd9', usage: '',               krds: '--krds-color-light-danger-10' },
      { name: 'danger-20', figma: 'color/danger/20', value: '#f7afa1', usage: '',               krds: '--krds-color-light-danger-20' },
      { name: 'danger-30', figma: 'color/danger/30', value: '#f48771', usage: '',               krds: '--krds-color-light-danger-30' },
      { name: 'danger-40', figma: 'color/danger/40', value: '#f05f42', usage: '',               krds: '--krds-color-light-danger-40' },
      { name: 'danger-50', figma: 'color/danger/50', value: '#de3412', usage: '에러 테두리·아이콘', krds: '--krds-color-light-danger-50' },
      { name: 'danger-60', figma: 'color/danger/60', value: '#bd2c0f', usage: '에러 텍스트',   krds: '--krds-color-light-danger-60' },
      { name: 'danger-70', figma: 'color/danger/70', value: '#8a240f', usage: '',               krds: '--krds-color-light-danger-70' },
      { name: 'danger-80', figma: 'color/danger/80', value: '#5c180a', usage: '',               krds: '--krds-color-light-danger-80' },
      { name: 'danger-90', figma: 'color/danger/90', value: '#390d05', usage: '',               krds: '--krds-color-light-danger-90' },
      { name: 'danger-95', figma: 'color/danger/95', value: '#260903', usage: '',               krds: '--krds-color-light-danger-95' },
    ],
  },
  {
    name: 'warning',
    tokens: [
      { name: 'warning-5',  figma: 'color/warning/5',  value: '#fff3db', usage: '경고 연한 배경', krds: '--krds-color-light-warning-5'  },
      { name: 'warning-10', figma: 'color/warning/10', value: '#ffe0a3', usage: '',               krds: '--krds-color-light-warning-10' },
      { name: 'warning-20', figma: 'color/warning/20', value: '#ffc95c', usage: '',               krds: '--krds-color-light-warning-20' },
      { name: 'warning-30', figma: 'color/warning/30', value: '#ffb114', usage: '',               krds: '--krds-color-light-warning-30' },
      { name: 'warning-40', figma: 'color/warning/40', value: '#c78500', usage: '',               krds: '--krds-color-light-warning-40' },
      { name: 'warning-50', figma: 'color/warning/50', value: '#9e6a00', usage: '경고 테두리',   krds: '--krds-color-light-warning-50' },
      { name: 'warning-60', figma: 'color/warning/60', value: '#8a5c00', usage: '경고 텍스트',   krds: '--krds-color-light-warning-60' },
      { name: 'warning-70', figma: 'color/warning/70', value: '#614100', usage: '',               krds: '--krds-color-light-warning-70' },
      { name: 'warning-80', figma: 'color/warning/80', value: '#422c00', usage: '',               krds: '--krds-color-light-warning-80' },
      { name: 'warning-90', figma: 'color/warning/90', value: '#2e1f00', usage: '',               krds: '--krds-color-light-warning-90' },
      { name: 'warning-95', figma: 'color/warning/95', value: '#241800', usage: '',               krds: '--krds-color-light-warning-95' },
    ],
  },
  {
    name: 'success',
    tokens: [
      { name: 'success-5',  figma: 'color/success/5',  value: '#eaf6ec', usage: '성공 연한 배경',   krds: '--krds-color-light-success-5'  },
      { name: 'success-10', figma: 'color/success/10', value: '#d8eedd', usage: '',                  krds: '--krds-color-light-success-10' },
      { name: 'success-20', figma: 'color/success/20', value: '#a9dab4', usage: '',                  krds: '--krds-color-light-success-20' },
      { name: 'success-30', figma: 'color/success/30', value: '#7ec88e', usage: '',                  krds: '--krds-color-light-success-30' },
      { name: 'success-40', figma: 'color/success/40', value: '#3fa654', usage: '',                  krds: '--krds-color-light-success-40' },
      { name: 'success-50', figma: 'color/success/50', value: '#228738', usage: '성공 테두리',       krds: '--krds-color-light-success-50' },
      { name: 'success-60', figma: 'color/success/60', value: '#267337', usage: '성공 텍스트',       krds: '--krds-color-light-success-60' },
      { name: 'success-70', figma: 'color/success/70', value: '#285d33', usage: '',                  krds: '--krds-color-light-success-70' },
      { name: 'success-80', figma: 'color/success/80', value: '#1f4727', usage: '',                  krds: '--krds-color-light-success-80' },
      { name: 'success-90', figma: 'color/success/90', value: '#122b18', usage: '',                  krds: '--krds-color-light-success-90' },
      { name: 'success-95', figma: 'color/success/95', value: '#0e2012', usage: '',                  krds: '--krds-color-light-success-95' },
    ],
  },
  {
    name: 'information',
    tokens: [
      { name: 'information-5',  figma: 'color/information/5',  value: '#e7f4fe', usage: '안내 연한 배경', krds: '--krds-color-light-information-5'  },
      { name: 'information-10', figma: 'color/information/10', value: '#d3ebfd', usage: '',               krds: '--krds-color-light-information-10' },
      { name: 'information-20', figma: 'color/information/20', value: '#9ed2fa', usage: '',               krds: '--krds-color-light-information-20' },
      { name: 'information-30', figma: 'color/information/30', value: '#5fb5f7', usage: '',               krds: '--krds-color-light-information-30' },
      { name: 'information-40', figma: 'color/information/40', value: '#2098f3', usage: '',               krds: '--krds-color-light-information-40' },
      { name: 'information-50', figma: 'color/information/50', value: '#0b78cb', usage: '안내 테두리',   krds: '--krds-color-light-information-50' },
      { name: 'information-60', figma: 'color/information/60', value: '#096ab3', usage: '안내 텍스트',   krds: '--krds-color-light-information-60' },
      { name: 'information-70', figma: 'color/information/70', value: '#085691', usage: '',               krds: '--krds-color-light-information-70' },
      { name: 'information-80', figma: 'color/information/80', value: '#053961', usage: '',               krds: '--krds-color-light-information-80' },
      { name: 'information-90', figma: 'color/information/90', value: '#03253f', usage: '',               krds: '--krds-color-light-information-90' },
      { name: 'information-95', figma: 'color/information/95', value: '#021a2c', usage: '',               krds: '--krds-color-light-information-95' },
    ],
  },
  {
    name: 'black-alpha',
    tokens: [
      { name: 'black-alpha-100', figma: 'color/black-alpha/100', value: '#000000',   usage: '불투명 검정',          krds: '--krds-color-light-alpha-black100' },
      { name: 'black-alpha-75',  figma: 'color/black-alpha/75',  value: '#000000bf', usage: '딤 오버레이',          krds: '--krds-color-light-alpha-black75'  },
      { name: 'black-alpha-50',  figma: 'color/black-alpha/50',  value: '#00000080', usage: '',                     krds: '--krds-color-light-alpha-black50'  },
      { name: 'black-alpha-25',  figma: 'color/black-alpha/25',  value: '#00000040', usage: '',                     krds: '--krds-color-light-alpha-black25'  },
      { name: 'black-alpha-10',  figma: 'color/black-alpha/10',  value: '#0000001a', usage: '그림자·호버 오버레이', krds: '--krds-color-light-alpha-black10'  },
      { name: 'black-alpha-0',   figma: 'color/black-alpha/0',   value: '#00000000', usage: '완전 투명',            krds: '--krds-color-light-alpha-black0'   },
    ],
  },
  {
    name: 'white-alpha',
    tokens: [
      { name: 'white-alpha-100', figma: 'color/white-alpha/100', value: '#ffffff',   usage: '불투명 흰색', krds: '--krds-color-light-alpha-white100' },
      { name: 'white-alpha-75',  figma: 'color/white-alpha/75',  value: '#ffffffbf', usage: '',            krds: '--krds-color-light-alpha-white75'  },
      { name: 'white-alpha-50',  figma: 'color/white-alpha/50',  value: '#ffffff80', usage: '',            krds: '--krds-color-light-alpha-white50'  },
      { name: 'white-alpha-25',  figma: 'color/white-alpha/25',  value: '#ffffff40', usage: '',            krds: '--krds-color-light-alpha-white25'  },
      { name: 'white-alpha-10',  figma: 'color/white-alpha/10',  value: '#ffffff1a', usage: '',            krds: '--krds-color-light-alpha-white10'  },
      { name: 'white-alpha-0',   figma: 'color/white-alpha/0',   value: '#ffffff00', usage: '완전 투명',  krds: '--krds-color-light-alpha-white0'   },
    ],
  },
];


/* ── 2. 색상 시멘틱 ───────────────────────────────────────────────────────── */

export const colorSemanticGroups = [
  {
    name: 'txt- (글자색)',
    tokens: [
      { name: 'txt-default',      figma: 'txt/default',      value: '#1e2124', ref: 'gray-90',   usage: '본문·제목 주요 텍스트',          krds: '--krds-light-color-text-basic'            },
      { name: 'txt-subtle',    figma: 'txt/subtle',    value: '#464c53', ref: 'gray-70',   usage: '보조 설명·플레이스홀더',          krds: '--krds-light-color-text-subtle'           },
      { name: 'txt-subtler',     figma: 'txt/subtler',     value: '#6d7882', ref: 'gray-50',   usage: '3단계 보조 텍스트',               krds: '(자체 추가)'                              },
      { name: 'txt-disabled',     figma: 'txt/disabled',     value: '#8a949e', ref: 'gray-40',   usage: '비활성 텍스트',                   krds: '--krds-light-color-text-disabled'         },
      { name: 'txt-inverse',      figma: 'txt/inverse',      value: '#ffffff', ref: 'gray-0',    usage: '어두운 배경 위 텍스트',           krds: '--krds-light-color-text-basic-inverse'    },
      { name: 'txt-on-primary',     figma: 'txt/on-primary',     value: '#ffffff', ref: 'gray-0',    usage: '브랜드 배경 위 텍스트',           krds: '(자체 추가)'                              },
      { name: 'txt-primary',        figma: 'txt/primary',        value: '#0b50d0', ref: 'primary-60',     usage: '브랜드·강조 텍스트',              krds: '--krds-light-color-text-primary'          },
      { name: 'txt-secondary',      figma: 'txt/secondary',      value: '#6845ce', ref: 'secondary-60',   usage: '2번 브랜드 강조 텍스트',          krds: '(자체 추가)'                              },
      { name: 'txt-link',         figma: 'txt/link',         value: '#256ef4', ref: 'primary-50',   usage: '링크 기본',                       krds: '--krds-light-color-link-default'          },
      { name: 'txt-link-visited', figma: 'txt/link-visited', value: '#5917b8', ref: null,        usage: '방문한 링크 (KRDS 고정값)',       krds: '--krds-light-color-link-visited'          },
      { name: 'txt-success',      figma: 'txt/success',      value: '#267337', ref: 'success-60',  usage: '성공 메시지',                     krds: '--krds-light-color-text-success'          },
      { name: 'txt-warning',      figma: 'txt/warning',      value: '#8a5c00', ref: 'warning-60', usage: '경고 메시지',                     krds: '--krds-light-color-text-warning'          },
      { name: 'txt-danger',       figma: 'txt/danger',       value: '#bd2c0f', ref: 'danger-60',    usage: '에러 메시지',                     krds: '--krds-light-color-text-danger'           },
      { name: 'txt-information',         figma: 'txt/information',         value: '#096ab3', ref: 'information-60',   usage: '안내 메시지',                     krds: '--krds-light-color-text-information'      },
    ],
  },
  {
    name: 'bg- (배경색)',
    tokens: [
      { name: 'bg-default',        figma: 'bg/default',        value: '#ffffff', ref: 'gray-0',         usage: '페이지·카드 기본 배경',         krds: '--krds-light-color-background-white'           },
      { name: 'bg-subtle',      figma: 'bg/subtle',      value: '#f4f5f6', ref: 'gray-5',         usage: '섹션·코드블록 배경',            krds: '--krds-light-color-background-gray-subtler'    },
      { name: 'bg-subtler',       figma: 'bg/subtler',       value: '#e6e8ea', ref: 'gray-10',        usage: '3단계 배경 (테이블 행 등)',      krds: '--krds-light-color-background-gray-subtle'     },
      { name: 'bg-elevated',       figma: 'bg/elevated',       value: '#ffffff', ref: 'gray-0',         usage: '플로팅 카드·드롭다운',           krds: '(자체 추가)'                                   },
      { name: 'bg-inverse',        figma: 'bg/inverse',        value: '#1e2124', ref: 'gray-90',        usage: '다크 배경 (헤더·푸터)',          krds: '--krds-light-color-background-inverse'         },
      { name: 'bg-disabled',       figma: 'bg/disabled',       value: '#cdd1d5', ref: 'gray-20',        usage: '비활성 요소 배경',              krds: '--krds-light-color-surface-disabled'           },
      { name: 'bg-overlay',        figma: 'bg/overlay',        value: '#000000bf', ref: 'black-alpha-75', usage: '딤 오버레이',                 krds: '--krds-light-color-background-dim'             },
      { name: 'bg-hover',          figma: 'bg/hover',          value: '#f4f5f6', ref: 'gray-5',         usage: '일반 hover 배경',               krds: '(자체 추가)'                                   },
      { name: 'bg-selected',       figma: 'bg/selected',       value: '#ecf2fe', ref: 'primary-5',         usage: '선택된 항목 배경',              krds: '--krds-light-color-action-primary-selected'    },
      { name: 'bg-primary',          figma: 'bg/primary',          value: '#256ef4', ref: 'primary-50',        usage: '브랜드 강조 배경 (버튼 등)',     krds: '--krds-light-color-button-primary-fill'        },
      { name: 'bg-primary-hover',    figma: 'bg/primary-hover',    value: '#0b50d0', ref: 'primary-60',        usage: '브랜드 hover',                  krds: '--krds-light-color-button-primary-fill-hover'  },
      { name: 'bg-primary-pressed',  figma: 'bg/primary-pressed',  value: '#083891', ref: 'primary-70',        usage: '브랜드 pressed',                krds: '--krds-light-color-button-primary-fill-pressed'},
      { name: 'bg-primary-subtle',   figma: 'bg/primary-subtle',   value: '#ecf2fe', ref: 'primary-5',         usage: '브랜드 연한 배경',              krds: '--krds-light-color-surface-primary-subtler'    },
      { name: 'bg-secondary',         figma: 'bg/secondary',         value: '#7c5de8', ref: 'secondary-50',      usage: '2번 브랜드 배경 (버튼 등)',     krds: '(자체 추가)'                                   },
      { name: 'bg-secondary-hover',   figma: 'bg/secondary-hover',   value: '#6845ce', ref: 'secondary-60',      usage: '2번 브랜드 hover',              krds: '(자체 추가)'                                   },
      { name: 'bg-secondary-pressed', figma: 'bg/secondary-pressed', value: '#5433b4', ref: 'secondary-70',      usage: '2번 브랜드 pressed',            krds: '(자체 추가)'                                   },
      { name: 'bg-secondary-subtle',  figma: 'bg/secondary-subtle',  value: '#f3f0ff', ref: 'secondary-5',       usage: '2번 브랜드 연한 배경',          krds: '(자체 추가)'                                   },
      { name: 'bg-success-subtle', figma: 'bg/success-subtle', value: '#eaf6ec', ref: 'success-5',        usage: '성공 연한 배경',                krds: '--krds-light-color-surface-success-subtler'    },
      { name: 'bg-warning-subtle', figma: 'bg/warning-subtle', value: '#fff3db', ref: 'warning-5',       usage: '경고 연한 배경',                krds: '--krds-light-color-surface-warning-subtler'    },
      { name: 'bg-danger-subtle',  figma: 'bg/danger-subtle',  value: '#fdefec', ref: 'danger-5',          usage: '에러 연한 배경',                krds: '--krds-light-color-surface-danger-subtler'     },
      { name: 'bg-information-subtle',    figma: 'bg/information-subtle',    value: '#e7f4fe', ref: 'information-5',         usage: '안내 연한 배경',                krds: '--krds-light-color-surface-information-subtler'},
    ],
  },
  {
    name: 'border- (테두리색)',
    tokens: [
      { name: 'border-default',   figma: 'border/default',   value: '#b1b8be', ref: 'gray-30',    usage: '기본 테두리',               krds: '--krds-light-color-border-gray'        },
      { name: 'border-subtle', figma: 'border/subtle', value: '#cdd1d5', ref: 'gray-20',    usage: '연한 테두리',               krds: '--krds-light-color-border-gray-light'  },
      { name: 'border-strong',    figma: 'border/strong',    value: '#58616a', ref: 'gray-60',    usage: '강한 테두리 (입력 필드)',    krds: '--krds-light-color-input-border'       },
      { name: 'border-divider',   figma: 'border/divider',   value: '#8a949e', ref: 'gray-40',    usage: '구분선',                    krds: '--krds-light-color-divider-gray'       },
      { name: 'border-focus',     figma: 'border/focus',     value: '#256ef4', ref: 'primary-50',    usage: '포커스 링',                 krds: '--krds-light-color-border-primary'     },
      { name: 'border-disabled',  figma: 'border/disabled',  value: '#b1b8be', ref: 'gray-30',    usage: '비활성 테두리',             krds: '--krds-light-color-border-disabled'    },
      { name: 'border-primary',     figma: 'border/primary',     value: '#256ef4', ref: 'primary-50',    usage: '브랜드 테두리',             krds: '--krds-light-color-border-primary'     },
      { name: 'border-secondary',   figma: 'border/secondary',   value: '#7c5de8', ref: 'secondary-50',  usage: '2번 브랜드 테두리',         krds: '(자체 추가)'                           },
      { name: 'border-success',   figma: 'border/success',   value: '#228738', ref: 'success-50',   usage: '성공 테두리',               krds: '--krds-light-color-border-success'     },
      { name: 'border-warning',   figma: 'border/warning',   value: '#9e6a00', ref: 'warning-50',  usage: '경고 테두리',               krds: '--krds-light-color-border-warning'     },
      { name: 'border-danger',    figma: 'border/danger',    value: '#de3412', ref: 'danger-50',     usage: '에러 테두리',               krds: '--krds-light-color-border-danger'      },
    ],
  },
  {
    name: 'icon- (아이콘색)',
    tokens: [
      { name: 'icon-default',   figma: 'icon/default',   value: '#33363d', ref: 'gray-80',  usage: '기본 아이콘',               krds: '--krds-light-color-icon-gray'      },
      { name: 'icon-subtle', figma: 'icon/subtle', value: '#464c53', ref: 'gray-70',  usage: '보조 아이콘',               krds: '--krds-light-color-icon-gray-light'},
      { name: 'icon-disabled',  figma: 'icon/disabled',  value: '#8a949e', ref: 'gray-40',  usage: '비활성 아이콘',             krds: '--krds-light-color-icon-disabled'  },
      { name: 'icon-inverse',   figma: 'icon/inverse',   value: '#ffffff', ref: 'gray-0',   usage: '어두운 배경 위 아이콘',     krds: '--krds-light-color-icon-inverse'   },
      { name: 'icon-primary',     figma: 'icon/primary',     value: '#256ef4', ref: 'primary-50',    usage: '브랜드 아이콘',             krds: '--krds-light-color-icon-primary'   },
      { name: 'icon-secondary',   figma: 'icon/secondary',   value: '#7c5de8', ref: 'secondary-50',  usage: '2번 브랜드 아이콘',         krds: '(자체 추가)'                       },
      { name: 'icon-danger',    figma: 'icon/danger',    value: '#de3412', ref: 'danger-50',   usage: '에러 아이콘',               krds: '--krds-light-color-icon-danger'    },
    ],
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
  { name: 'letter-spacing-tight',  figma: 'letter-spacing/tight',  value: '-0.025em', usage: '큰 제목', krds: '(자체 추가)'                  },
  { name: 'letter-spacing-normal', figma: 'letter-spacing/normal', value: '0em',      usage: '기본',    krds: '--krds-typo-letter-spacing-0'  },
];

export const typoStyleTokens = [
  { name: 'font-size-heading-xl', figma: 'text-style/heading-xl', valuePC: '4rem / bold / 1.25',   valueMobile: '2.8rem / bold / 1.25',  usage: '최대 섹션 제목',          krds: '--krds-pc-font-size-heading-xlarge'    },
  { name: 'font-size-heading-l',  figma: 'text-style/heading-l',  valuePC: '3.2rem / bold / 1.25', valueMobile: '2.4rem / bold / 1.25',  usage: '대형 섹션 제목',          krds: '--krds-pc-font-size-heading-large'     },
  { name: 'font-size-heading-m',  figma: 'text-style/heading-m',  valuePC: '2.4rem / bold / 1.5',  valueMobile: '2.2rem / bold / 1.5',   usage: '중형 섹션 제목',          krds: '--krds-pc-font-size-heading-medium'    },
  { name: 'font-size-heading-s',  figma: 'text-style/heading-s',  valuePC: '1.9rem / bold / 1.5',  valueMobile: '1.9rem / bold / 1.5',   usage: '소형 섹션 제목',          krds: '--krds-pc-font-size-heading-small'     },
  { name: 'font-size-body-l',     figma: 'text-style/body-l',     valuePC: '1.9rem / 400 / 1.5',   valueMobile: '1.9rem / 400 / 1.5',    usage: '대형 본문',               krds: '--krds-pc-font-size-body-large'        },
  { name: 'font-size-body-m',     figma: 'text-style/body-m',     valuePC: '1.7rem / 400 / 1.5',   valueMobile: '1.7rem / 400 / 1.5',    usage: '기본 본문',               krds: '--krds-pc-font-size-body-medium'       },
  { name: 'font-size-body-s',     figma: 'text-style/body-s',     valuePC: '1.5rem / 400 / 1.5',   valueMobile: '1.5rem / 400 / 1.5',    usage: '소형 본문·도움말',        krds: '--krds-pc-font-size-body-small'        },
  { name: 'font-size-body-xs',    figma: 'text-style/body-xs',    valuePC: '1.3rem / 400 / 1.5',   valueMobile: '1.3rem / 400 / 1.5',    usage: '캡션·보조 설명',          krds: '--krds-pc-font-size-body-xsmall'       },
];


/* ── 4. 간격 ──────────────────────────────────────────────────────────────── */

export const spacingPrimTokens = [
  { name: 'spacing-0',  figma: 'spacing/0',  value: '0rem',   usage: '간격 없음', krds: '--krds-number-0'  },
  { name: 'spacing-2',  figma: 'spacing/2',  value: '0.2rem', usage: '2px',       krds: '--krds-number-2'  },
  { name: 'spacing-4',  figma: 'spacing/4',  value: '0.4rem', usage: '4px',       krds: '--krds-number-3'  },
  { name: 'spacing-8',  figma: 'spacing/8',  value: '0.8rem', usage: '8px',       krds: '--krds-number-5'  },
  { name: 'spacing-12', figma: 'spacing/12', value: '1.2rem', usage: '12px',      krds: '--krds-number-7'  },
  { name: 'spacing-16', figma: 'spacing/16', value: '1.6rem', usage: '16px',      krds: '--krds-number-8'  },
  { name: 'spacing-20', figma: 'spacing/20', value: '2rem',   usage: '20px',      krds: '--krds-number-9'  },
  { name: 'spacing-24', figma: 'spacing/24', value: '2.4rem', usage: '24px',      krds: '--krds-number-10' },
  { name: 'spacing-32', figma: 'spacing/32', value: '3.2rem', usage: '32px',      krds: '--krds-number-12' },
  { name: 'spacing-40', figma: 'spacing/40', value: '4rem',   usage: '40px',      krds: '--krds-number-14' },
  { name: 'spacing-48', figma: 'spacing/48', value: '4.8rem', usage: '48px',      krds: '--krds-number-16' },
  { name: 'spacing-64', figma: 'spacing/64', value: '6.4rem', usage: '64px',      krds: '--krds-number-18' },
  { name: 'spacing-80', figma: 'spacing/80', value: '8rem',   usage: '80px',      krds: '--krds-number-20' },
];

export const spacingSemanticTokens = [
  { name: 'gap-xs',            figma: 'gap/xs',            value: '0.4rem (4px)',   ref: 'spacing-4',  usage: '아이콘↔레이블 인라인 소간격',  krds: '--krds-gap-2'     },
  { name: 'gap-s',             figma: 'gap/s',             value: '0.8rem (8px)',   ref: 'spacing-8',  usage: '입력 그룹 내부 간격',          krds: '--krds-gap-3'     },
  { name: 'gap-m',             figma: 'gap/m',             value: '1.6rem (16px)',  ref: 'spacing-16', usage: '컴포넌트 간 기본 간격',        krds: '--krds-gap-5'     },
  { name: 'gap-l',             figma: 'gap/l',             value: '2.4rem (24px)',  ref: 'spacing-24', usage: '섹션 내 블록 간격',            krds: '--krds-gap-7'     },
  { name: 'gap-xl',            figma: 'gap/xl',            value: '4rem (40px)',    ref: 'spacing-40', usage: '섹션 간 여백',                 krds: '--krds-gap-9'     },
  { name: 'padding-xs',        figma: 'padding/xs',        value: '0.4rem (4px)',   ref: 'spacing-4',  usage: '뱃지·태그 소형 내부 여백',    krds: '--krds-padding-2' },
  { name: 'padding-s',         figma: 'padding/s',         value: '0.8rem (8px)',   ref: 'spacing-8',  usage: '버튼 상하 패딩 기본',          krds: '--krds-padding-3' },
  { name: 'padding-m',         figma: 'padding/m',         value: '1.6rem (16px)',  ref: 'spacing-16', usage: '카드·입력 필드 내부 여백',     krds: '--krds-padding-6' },
  { name: 'padding-l',         figma: 'padding/l',         value: '2.4rem (24px)',  ref: 'spacing-24', usage: '섹션 헤더 내부 여백',          krds: '--krds-padding-8' },
  { name: 'padding-xl',        figma: 'padding/xl',        value: '4rem (40px)',    ref: 'spacing-40', usage: '페이지 상단 여백',             krds: '--krds-padding-10'},
  { name: 'section-padding-s', figma: 'section-padding/s', value: '1.6rem→1.2rem', ref: 'spacing-16', usage: '소형 섹션 여백 (모바일 축소)', krds: '(자체 추가)'      },
  { name: 'section-padding-m', figma: 'section-padding/m', value: '3.2rem→2rem',   ref: 'spacing-32', usage: '일반 섹션 여백 (모바일 축소)', krds: '(자체 추가)'      },
  { name: 'section-padding-l', figma: 'section-padding/l', value: '4.8rem→3.2rem', ref: 'spacing-48', usage: '대형 섹션 여백 (모바일 축소)', krds: '(자체 추가)'      },
];


/* ── 6. 모서리 ────────────────────────────────────────────────────────────── */

export const radiusPrimTokens = [
  { name: 'radius-0',   figma: 'radius/0',   value: '0rem',    usage: '0px — 직각',           krds: '(자체 추가)'           },
  { name: 'radius-2',   figma: 'radius/2',   value: '0.2rem',  usage: '2px',                  krds: '--krds-radius-xsmall1' },
  { name: 'radius-4',   figma: 'radius/4',   value: '0.4rem',  usage: '4px',                  krds: '--krds-radius-small1'  },
  { name: 'radius-6',   figma: 'radius/6',   value: '0.6rem',  usage: '6px',                  krds: '--krds-radius-medium1' },
  { name: 'radius-8',   figma: 'radius/8',   value: '0.8rem',  usage: '8px',                  krds: '--krds-radius-medium3' },
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
