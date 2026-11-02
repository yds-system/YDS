import '../button/button.css';
import './file-upload.css';

export default {
  title: '컴포넌트/입력/파일 업로드',
  argTypes: {
    title: {
      control: 'text',
      description: '헤드 타이틀 (비워두면 헤드 숨김)',
      table: { category: '내용' },
    },
    description: {
      control: 'text',
      description: '헤드 설명 문구',
      table: { category: '내용' },
    },
    dropText: {
      control: 'text',
      description: '드래그 앤 드롭 안내 문구',
      table: { category: '내용' },
    },
    maxCount: {
      control: { type: 'number', min: 1, max: 20 },
      description: '최대 첨부 수',
      table: { category: '내용' },
    },
    line: {
      control: 'boolean',
      description: '테두리 스타일 적용',
      table: { category: '종류' },
    },
    multiple: {
      control: 'boolean',
      description: '다중 파일 선택 허용',
      table: { category: '종류' },
    },
    accept: {
      control: 'text',
      description: '허용 파일 형식 (예: .pdf,.hwp)',
      table: { category: '내용' },
    },
  },
  args: {
    title: '',
    description: '파일 형식: PDF, HWP, DOC, XLS (최대 20MB)',
    dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
    maxCount: 10,
    line: true,
    multiple: true,
    accept: '',
  },
};

/* ─── 정적 HTML 생성 헬퍼 ───────────────────── */

function uid() {
  return Math.random().toString(36).slice(2, 7);
}

/**
 * 파일 항목 HTML 생성
 * @param {{ name: string, size: string, status: 'uploading'|'done'|'error', errorMsg?: string }} item
 */
function fileItem({ name, size, status, errorMsg }) {
  const label = `${name} [${size}]`;
  const isError = status === 'error';

  let btnWrap = '';
  if (status === 'uploading') {
    btnWrap = `
      <span class="ds-spinner" role="status">
        <span class="sr-only">업로드 중</span>
      </span>`;
  } else if (status === 'done') {
    btnWrap = `
      <span class="ico-invalid complete">
        <em class="sr-only">업로드 완료</em>
      </span>`;
  } else {
    /* error 또는 기본 — 삭제 버튼 */
    btnWrap = `
      <button type="button" class="ds-btn ds-btn--medium ds-btn--text btn-file-delete" aria-label="${name} 삭제">
        삭제 <i class="ds-icon ds-ico-delete-fill"></i>
      </button>`;
  }

  const hint = isError && errorMsg
    ? `<p class="file-hint-invalid">${errorMsg}</p>`
    : '';

  return `
    <li${isError ? ' class="ds-file-upload__item--error"' : ''}>
      <div class="file-info">
        <div class="file-name">${label}</div>
        <div class="btn-wrap">${btnWrap}</div>
      </div>
      ${hint}
    </li>`;
}

/**
 * 전체 컴포넌트 HTML 생성
 */
function renderFileUpload({
  title, description, dropText, maxCount, line, multiple, accept,
  files = [],
  showDeleteAll = false,
}) {
  const id = `fu-${uid()}`;
  const lineClass = line ? ' line' : '';

  const headSection = (title || description) ? `
    <div class="file-head">
      ${title ? `<h3 class="tit">${title}</h3>` : ''}
      ${description ? `<p>${description}</p>` : ''}
    </div>` : '';

  const acceptAttr = accept ? ` accept="${accept}"` : '';
  const multipleAttr = multiple ? ' multiple' : '';

  const dropSection = `
    <div class="file-upload" role="region" aria-label="파일 드래그 앤 드롭 영역">
      <p class="txt">${dropText.replace(/\n/g, '<br>')}</p>
      <div class="file-upload-btn-wrap">
        <input type="file" id="${id}"${acceptAttr}${multipleAttr}>
        <label for="${id}">
          <button type="button" class="ds-btn ds-btn--medium" tabindex="-1" aria-hidden="true">
            <i class="ds-icon ds-ico-upload"></i>파일 선택
          </button>
        </label>
      </div>
    </div>`;

  const listSection = files.length > 0 ? `
    <div class="file-list">
      <div class="total">
        <span class="current">${files.length}개</span> / ${maxCount}개
      </div>
      <ul class="upload-list">
        ${files.map(fileItem).join('')}
      </ul>
      ${showDeleteAll ? `
      <div class="upload-delete-btn">
        <button type="button" class="ds-btn ds-btn--xsmall ds-btn--tertiary btn-delete-all">
          전체 파일 삭제<i class="ds-icon ds-ico-angle right"></i>
        </button>
      </div>` : ''}
    </div>` : '';

  return `<div class="ds-file-upload${lineClass}">${headSection}${dropSection}${listSection}</div>`;
}

const wrap = (html) =>
  `<div style="max-width:64rem;">${html}</div>`;

/* ─── play: 드래그·드롭·선택 동작 연결 ─────── */

function initFileUpload(canvasElement) {
  canvasElement.querySelectorAll('.ds-file-upload').forEach(root => {
    const dropZone = root.querySelector('.file-upload');
    const inputFile = root.querySelector('input[type="file"]');
    if (!dropZone || !inputFile) return;

    /* 파일 선택 버튼 → input 연결 (label로 연결되나 JS 보완) */
    const btn = dropZone.querySelector('button');
    btn?.addEventListener('click', () => inputFile.click());

    /* 드래그 오버 */
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('active');
    });

    /* 드래그 이탈 */
    dropZone.addEventListener('dragleave', (e) => {
      if (!dropZone.contains(e.relatedTarget)) {
        dropZone.classList.remove('active');
      }
    });

    /* 드롭 */
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('active');
      /* 실제 구현 시 e.dataTransfer.files 처리 */
    });

    /* 개별 삭제 버튼 */
    root.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.btn-file-delete');
      if (delBtn) {
        delBtn.closest('li')?.remove();
      }
      const delAll = e.target.closest('.btn-delete-all');
      if (delAll) {
        root.querySelector('.upload-list')?.querySelectorAll('li').forEach(li => li.remove());
      }
    });
  });
}

const play = async ({ canvasElement }) => initFileUpload(canvasElement);

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: (args) => wrap(renderFileUpload({
    ...args,
    files: [
      { name: '파일명_예시.pdf', size: 'PDF, 1.2MB', status: 'done' },
      { name: '파일명_예시_2.hwp', size: 'HWP, 340KB', status: 'uploading' },
    ],
    showDeleteAll: true,
  })),
  play,
};

/* ─── 기본 ──────────────────────────────────── */

export const 기본 = {
  name: '기본 (Default)',
  parameters: { controls: { disable: true } },
  render: () => wrap(renderFileUpload({
    description: '파일 형식: PDF, HWP, DOC, XLS (최대 20MB)',
    dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
    maxCount: 10,
    line: false,
    multiple: true,
  })),
  play,
};

/* ─── 테두리 변형 ────────────────────────────── */

export const 테두리 = {
  name: '테두리 (Line)',
  parameters: { controls: { disable: true } },
  render: () => wrap(renderFileUpload({
    title: '첨부파일',
    description: '파일 형식: PDF, HWP, DOC, XLS (최대 20MB)',
    dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
    maxCount: 10,
    line: true,
    multiple: true,
  })),
  play,
};

/* ─── 첨부 목록 (상태별) ──────────────────── */

export const 첨부목록 = {
  name: '첨부 목록 (File List)',
  parameters: { controls: { disable: true } },
  render: () => wrap(renderFileUpload({
    description: '파일 형식: PDF, HWP, DOC (최대 20MB / 최대 5개)',
    dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
    maxCount: 5,
    line: true,
    multiple: true,
    files: [
      { name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp', size: 'HWP, 17KB', status: 'uploading' },
      { name: '신분증_사본.pdf', size: 'PDF, 1.2MB', status: 'done' },
      { name: '신청서_최종.pdf', size: 'PDF, 820KB', status: 'done' },
      {
        name: '전입재등록신고서 [주민등록법 시행령 : 별지서식 15].hwp',
        size: 'HWP, 45MB',
        status: 'error',
        errorMsg: '등록 가능한 파일 용량을 초과하였습니다.<br>20MB 미만의 파일만 등록할 수 있습니다.',
      },
    ],
    showDeleteAll: true,
  })),
  play,
};

/* ─── 상태 (State) ───────────────────────────── */

export const 상태 = {
  name: '상태 (State)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (label, html) => `
      <section style="margin-bottom:3.2rem;">
        <p style="font-size:1.2rem; font-weight:bold; color:var(--krds-light-color-text-subtle);
                  margin-bottom:0.8rem; text-transform:uppercase; letter-spacing:.05em;">${label}</p>
        ${html}
      </section>`;

    /* 목록 없음 (초기) */
    const empty = renderFileUpload({
      description: '파일 형식: PDF, HWP (최대 20MB)',
      dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
      maxCount: 5, line: true, multiple: true, files: [],
    });

    /* 업로드 중 */
    const uploading = renderFileUpload({
      description: '파일 형식: PDF, HWP (최대 20MB)',
      dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
      maxCount: 5, line: true, multiple: true,
      files: [
        { name: '신청서.pdf', size: 'PDF, 820KB', status: 'uploading' },
      ],
    });

    /* 업로드 완료 */
    const done = renderFileUpload({
      description: '파일 형식: PDF, HWP (최대 20MB)',
      dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
      maxCount: 5, line: true, multiple: true,
      files: [
        { name: '신청서.pdf', size: 'PDF, 820KB', status: 'done' },
        { name: '위임장.hwp', size: 'HWP, 17KB', status: 'done' },
      ],
      showDeleteAll: true,
    });

    /* 오류 */
    const error = renderFileUpload({
      description: '파일 형식: PDF, HWP (최대 20MB)',
      dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
      maxCount: 5, line: true, multiple: true,
      files: [
        { name: '신청서.pdf', size: 'PDF, 820KB', status: 'done' },
        {
          name: '용량초과파일.psd',
          size: 'PSD, 45MB',
          status: 'error',
          errorMsg: '등록 가능한 파일 용량을 초과하였습니다.<br>20MB 미만의 파일만 등록할 수 있습니다.',
        },
      ],
      showDeleteAll: true,
    });

    return wrap(`
      ${section('초기 (비어 있음)', empty)}
      ${section('업로드 중', uploading)}
      ${section('업로드 완료', done)}
      ${section('오류', error)}
    `);
  },
  play,
};

/* ─── 전체 변형 (All Variants) ──────────────── */

export const 전체변형 = {
  name: '전체 변형 (All Variants)',
  parameters: { controls: { disable: true } },
  render: () => {
    const section = (title, html) => `
      <section style="margin-bottom:4rem;">
        <h2 style="font-size:1.4rem; font-weight:bold; margin-bottom:1.6rem;
                   color:var(--krds-light-color-text-bolder);">${title}</h2>
        ${html}
      </section>`;

    return wrap(`
      ${section('기본 (테두리 없음)', renderFileUpload({
        description: '파일 형식: PDF, HWP, DOC, XLS (최대 20MB)',
        dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
        maxCount: 10, line: false, multiple: true, files: [],
      }))}
      ${section('테두리 + 타이틀', renderFileUpload({
        title: '첨부파일',
        description: '파일 형식: PDF, HWP, DOC, XLS (최대 20MB)',
        dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
        maxCount: 10, line: true, multiple: true, files: [],
      }))}
      ${section('첨부 목록 (업로드 중 / 완료 / 오류 혼합)', renderFileUpload({
        description: '파일 형식: PDF, HWP, DOC (최대 20MB / 최대 5개)',
        dropText: '첨부할 파일을 여기에 끌어다 놓거나,\n파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
        maxCount: 5, line: true, multiple: true,
        files: [
          { name: '위임장.hwp', size: 'HWP, 17KB', status: 'uploading' },
          { name: '신청서_최종.pdf', size: 'PDF, 820KB', status: 'done' },
          {
            name: '용량초과파일.psd',
            size: 'PSD, 45MB',
            status: 'error',
            errorMsg: '등록 가능한 파일 용량을 초과하였습니다.<br>20MB 미만의 파일만 등록할 수 있습니다.',
          },
        ],
        showDeleteAll: true,
      }))}
    `);
  },
  play,
};
