import './tag.css';

export default {
  title: '컴포넌트/선택/태그',
  argTypes: {
    label: {
      control: 'text',
      description: '태그 텍스트',
      table: { category: '내용' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '크기',
      table: { category: '크기' },
    },
    deletable: {
      control: 'boolean',
      description: '삭제 버튼 표시',
      table: { category: '종류' },
    },
    link: {
      control: 'boolean',
      description: '링크 스타일 (밑줄 hover)',
      table: { category: '종류' },
    },
  },
  args: {
    label: '태그',
    size: 'medium',
    deletable: true,
    link: false,
  },
};

/* ─── 헬퍼 ──────────────────────────────────── */

function tag({ label, deletable = false, link = false }) {
  const linkClass = link ? ' link' : '';
  const deleteBtn = deletable
    ? `<button type="button" class="btn-delete"><span class="sr-only">${label} 삭제</span></button>`
    : '';
  return `<span class="ds-tag${linkClass}">${label}${deleteBtn}</span>`;
}

function tagWrap(size, tags) {
  return `<div class="ds-tag-wrap ${size}">${tags}</div>`;
}

const wrap = (html) =>
  `<div style="max-width:72rem; padding:0.8rem;">${html}</div>`;

const section = (label, html) => `
  <div style="margin-bottom:2.4rem;">
    <p style="font-size:1.2rem; color:var(--krds-light-color-text-subtle); margin-bottom:0.8rem;">${label}</p>
    ${html}
  </div>`;

/* ─── play: 삭제 버튼 동작 ────────────────── */

function initTags(canvasElement) {
  canvasElement.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-delete');
    if (btn) {
      btn.closest('.ds-tag')?.remove();
    }
  });
}

const play = async ({ canvasElement }) => initTags(canvasElement);

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(tagWrap(args.size, tag(args))),
  play,
};

/* ─── 크기 ──────────────────────────────────── */

export const 크기 = {
  name: '크기 (Size)',
  parameters: { controls: { disable: true } },
  render: () => {
    const tags = ['디자인', '개발', '기획', 'UI/UX', '접근성'].map(l =>
      tag({ label: l, deletable: true })
    ).join('');
    return wrap(`
      ${section('Small', tagWrap('small', tags))}
      ${section('Medium', tagWrap('medium', tags))}
      ${section('Large', tagWrap('large', tags))}
    `);
  },
  play,
};

/* ─── 필터 선택 태그 ─────────────────────────── */

export const 필터태그 = {
  name: '필터 선택 태그',
  parameters: { controls: { disable: true } },
  render: () => {
    const filters = ['전체', '공지사항', '이벤트', '서비스 안내', '보도자료', '자주 묻는 질문'];
    return wrap(`
      <div style="margin-bottom:0.8rem; font-size:1.4rem; font-weight:bold;
                  color:var(--krds-light-color-text-bolder);">선택된 필터</div>
      <div class="ds-tag-wrap medium">
        ${filters.map(l => tag({ label: l, deletable: true })).join('')}
      </div>
      <p style="margin-top:1.2rem; font-size:1.2rem; color:var(--krds-light-color-text-subtle);">
        × 버튼을 눌러 태그를 삭제할 수 있습니다.
      </p>
    `);
  },
  play,
};

/* ─── 링크 태그 ─────────────────────────────── */

export const 링크태그 = {
  name: '링크 태그 (Link)',
  parameters: { controls: { disable: true } },
  render: () => {
    const labels = ['디자인 시스템', '접근성', 'KRDS', 'UI 컴포넌트', '퍼블리싱'];
    const linkTags = labels.map(l =>
      `<a href="#" class="ds-tag link">${l}</a>`
    ).join('');
    return wrap(`
      ${section('Small', `<div class="ds-tag-wrap small">${linkTags}</div>`)}
      ${section('Medium', `<div class="ds-tag-wrap medium">${linkTags}</div>`)}
      ${section('Large', `<div class="ds-tag-wrap large">${linkTags}</div>`)}
    `);
  },
};

/* ─── 전체 변형 ─────────────────────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const sampleLabels = ['공지사항', '이벤트', '서비스 안내', '보도자료'];

    const hd = (title) => `
      <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.6rem;
                 color:var(--krds-light-color-text-bolder);">${title}</h2>`;

    return wrap(`
      <section style="margin-bottom:3.2rem;">
        ${hd('삭제 가능한 태그')}
        ${section('Small',  tagWrap('small',  sampleLabels.map(l => tag({ label: l, deletable: true })).join('')))}
        ${section('Medium', tagWrap('medium', sampleLabels.map(l => tag({ label: l, deletable: true })).join('')))}
        ${section('Large',  tagWrap('large',  sampleLabels.map(l => tag({ label: l, deletable: true })).join('')))}
      </section>
      <section>
        ${hd('링크 태그')}
        ${section('Small',  `<div class="ds-tag-wrap small">${sampleLabels.map(l => `<a href="#" class="ds-tag link">${l}</a>`).join('')}</div>`)}
        ${section('Medium', `<div class="ds-tag-wrap medium">${sampleLabels.map(l => `<a href="#" class="ds-tag link">${l}</a>`).join('')}</div>`)}
        ${section('Large',  `<div class="ds-tag-wrap large">${sampleLabels.map(l => `<a href="#" class="ds-tag link">${l}</a>`).join('')}</div>`)}
      </section>
    `);
  },
  play,
};
