# KRDS 의존 변수 목록

> **배포 파일 생성 전 확인 필요**
> 아래 `--krds-*` 변수를 YDS 토큰(`--space-*`, `--radius-*`, `--font-*` 등)으로 교체하고,
> `reference/krds/resources/css/common/common.css` 없이도 화면이 동일하게 보이는지 확인한다.

`src/components/**/*.css` 기준으로 자동 추출 (2026-11-10).  
고유 변수 수: **87개**

---

## 정의 파일별 분류

### common.css (`reference/krds/resources/css/common/common.css`)

| 변수명 | 사용하는 컴포넌트 |
|---|---|
| `--krds-contents-padding-x` | layout |
| `--krds-contents-size` | layout |
| `--krds-contents-wrap-size` | layout |
| `--krds-font-underline-offset` | tag |
| `--krds-font-weight-bold` | accordion, carousel, date-input, file-upload, layout, pagination, tab, table |
| `--krds-font-weight-regular` | badge, button, checkbox, date-input, form-group, table |
| `--krds-icon--size-large` | accordion, button, carousel, form-group, icon, pagination, select |
| `--krds-icon--size-medium` | accordion, button, file-upload, icon, layout, pagination, select |
| `--krds-icon--size-small` | breadcrumb, button, date-input, form-group, icon, layout, select |
| `--krds-icon--size-xlarge` | button, icon |
| `--krds-icon--size-xsmall` | button, icon |
| `--krds-line-height-none` | tag |
| `--krds-transition-base` | accordion, button, carousel, date-input, file-upload, layout, link, pagination, select, tab, tag, text-input |

### krds_tokens.css (`reference/krds/resources/css/token/krds_tokens.css`)

| 변수명 | 사용하는 컴포넌트 |
|---|---|
| `--krds-gap-1` | button, layout, tag, text-input |
| `--krds-gap-2` | breadcrumb, button, carousel, date-input, file-upload, form-group, layout, tag |
| `--krds-gap-3` | badge, carousel, checkbox, date-input, file-upload, form-group, layout, pagination, select, tab, table, tag, text-input |
| `--krds-gap-4` | form-group, layout, tag |
| `--krds-gap-5` | accordion, date-input, file-upload, form-group, layout, table, text-input |
| `--krds-gap-6` | checkbox, layout |
| `--krds-gap-7` | file-upload, form-group, layout, pagination |
| `--krds-gap-8` | tab |
| `--krds-gap-9` | file-upload, layout |
| `--krds-light-border-width-variable-medium` | file-upload |
| `--krds-light-border-width-variable-regular` | badge, button, carousel, file-upload, select, table |
| `--krds-mobile-font-size-body-large` | file-upload |
| `--krds-mobile-font-size-body-small` | layout, text-input, tooltip |
| `--krds-mobile-font-size-heading-small` | file-upload, tab |
| `--krds-mobile-font-size-heading-xsmall` | accordion, tab |
| `--krds-mobile-font-size-heading-xxsmall` | table |
| `--krds-mobile-font-size-label-large` | button, checkbox, link, select, text-input |
| `--krds-mobile-font-size-label-medium` | badge, button, checkbox, link, select, table, tag, text-input |
| `--krds-mobile-font-size-label-small` | badge, breadcrumb, button, checkbox, form-group, link, select, tag, text-input |
| `--krds-mobile-font-size-label-xsmall` | form-group, tag |
| `--krds-mobile-font-size-navigation-depth-medium` | layout |
| `--krds-mobile-font-size-navigation-depth-medium-bold` | layout |
| `--krds-mobile-font-size-navigation-depth-small-bold` | layout |
| `--krds-mobile-font-size-navigation-title-small` | layout |
| `--krds-mobile-gap-layout-h2-h3` | pagination |
| `--krds-mobile-gap-layout-title-body-small` | file-upload |
| `--krds-mobile-padding-card-large` | file-upload |
| `--krds-number-0` | button |
| `--krds-number-2` | button |
| `--krds-padding-1` | button, date-input, file-upload, link |
| `--krds-padding-10` | file-upload, layout, tab |
| `--krds-padding-2` | accordion, breadcrumb, checkbox, layout, pagination, tab, table, tooltip |
| `--krds-padding-3` | badge, date-input, layout, pagination, tab, table, tag, text-input |
| `--krds-padding-4` | button, layout, tag |
| `--krds-padding-5` | accordion, button, carousel, file-upload, layout, tab, table, tag, tooltip |
| `--krds-padding-6` | accordion, button, carousel, date-input, file-upload, layout, select, table, text-input |
| `--krds-padding-7` | accordion, button, date-input, form-group |
| `--krds-padding-8` | accordion, button, date-input, layout, tab, tooltip |
| `--krds-pc-font-size-body-large` | file-upload |
| `--krds-pc-font-size-body-small` | layout, tooltip |
| `--krds-pc-font-size-heading-small` | file-upload, tab |
| `--krds-pc-font-size-heading-xsmall` | accordion, date-input, tab |
| `--krds-pc-font-size-heading-xxsmall` | date-input, table |
| `--krds-pc-font-size-label-large` | button, checkbox, link, select, text-input |
| `--krds-pc-font-size-label-medium` | badge, button, checkbox, date-input, link, pagination, select, table, tag, text-input |
| `--krds-pc-font-size-label-small` | badge, breadcrumb, button, checkbox, date-input, form-group, link, pagination, select, table, tag, text-input |
| `--krds-pc-font-size-label-xsmall` | form-group, tag, text-input |
| `--krds-pc-font-size-navigation-depth-medium` | layout |
| `--krds-pc-font-size-navigation-depth-medium-bold` | layout |
| `--krds-pc-font-size-navigation-title-medium` | layout |
| `--krds-pc-font-size-navigation-title-small` | layout |
| `--krds-pc-gap-layout-h2-h3` | pagination |
| `--krds-pc-gap-layout-title-body-small` | file-upload |
| `--krds-pc-padding-card-large` | file-upload |
| `--krds-radius-large2` | accordion |
| `--krds-radius-max` | badge, button, carousel, checkbox, date-input |
| `--krds-radius-medium1` | button, date-input, layout, pagination, select, text-input |
| `--krds-radius-medium2` | breadcrumb, button, layout, select, tab, table, text-input |
| `--krds-radius-medium3` | button, layout, select, text-input |
| `--krds-radius-medium4` | button, date-input, file-upload |
| `--krds-radius-small1` | checkbox |
| `--krds-radius-small2` | badge, checkbox |
| `--krds-radius-small3` | button, tooltip |
| `--krds-radius-xlarge1` | file-upload |
| `--krds-radius-xlarge2` | date-input, tooltip |
| `--krds-size-height-1` | carousel |
| `--krds-size-height-2` | button, checkbox, tag |
| `--krds-size-height-3` | badge, button, checkbox, date-input |
| `--krds-size-height-4` | badge, button, checkbox, tag |
| `--krds-size-height-5` | badge, button, date-input, tag |
| `--krds-size-height-6` | button, carousel, date-input, layout, pagination, select, tag, text-input |
| `--krds-size-height-7` | button, date-input, layout, select, tab, text-input |
| `--krds-size-height-8` | button, date-input, layout, select, tab, text-input |
| `--krds-size-height-9` | button |
