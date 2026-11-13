/* 메타데이터 상세: 보기 ↔ 수정 전환, 취소 시 되돌리기, 저장 시 반영 */
(function () {
  'use strict';
  var C = window.CMS, $ = function (s) { return document.querySelector(s); };

  // kind: text(일반 값) · code(회색 박스) · chip(색 칩, 쉼표로 여러 개) · select(정해진 값)
  var GROUPS = [
    ['left', '기본 정보', [
      ['title', '표제', 'added content ono 220117', 'text'], ['subject', '주제', '', 'text'], ['id', '식별자', '/metadata/77', 'code'],
      ['summary', '요약정보', '[minibbs bbsNo="0" bbsListId="2"] 321', 'code'], ['type', '자료유형', '텍스트 (Text)', 'select', ['텍스트 (Text)', '이미지 (Image)', '영상 (Video)', '소리 (Sound)']],
      ['format', '파일형식', 'text/html', 'code'], ['size', '자원크기', '70 Byte', 'text'], ['lang', '언어', 'ko', 'select', ['ko', 'en', 'ja', 'zh']]
    ]],
    ['left', '범위', [['space', '공간적 범위', '', 'text'], ['time', '시간적 범위', '', 'text']]],
    ['right', '권한 · 발행', [
      ['publisher', '발행처', 'CMS관리자', 'text'], ['creator', '생성자', '11', 'text'], ['contrib', '기여자', '', 'text'],
      ['access', '접근권한', '인터넷 서비스, 검색허용', 'chip'], ['license', '허가증', '', 'text']
    ]],
    ['right', '날짜', [['avail', '이용가능일', '', 'date'], ['created', '생성일', '2022-01-17', 'date'], ['collected', '수집일', '', 'date'], ['issued', '발행일', '', 'date']]],
    ['right', '관련 자원', [['source', '정보원', '', 'text'], ['relation', '관련자원', '{"contents":{},"media":{}}', 'code']]]
  ];
  var values = {};
  GROUPS.forEach(function (g) { g[2].forEach(function (f) { values[f[0]] = f[2]; }); });

  function view(f, v) {
    if (!v) return '<span class="empty-val">-</span>';
    if (f[3] === 'code') return '<span class="code" title="' + C.esc(v) + '">' + C.esc(v) + '</span>';
    if (f[3] === 'chip') return v.split(',').map(function (s) { return '<span class="chip chip--green">' + C.esc(s.trim()) + '</span>'; }).join('');
    if (f[0] === 'type') return '<span class="chip chip--primary">' + C.esc(v) + '</span>';
    if (f[0] === 'lang') return '<span class="code">' + C.esc(v) + '</span>';
    return C.esc(v);
  }
  function edit(f, v) {
    var id = 'm-' + f[0];
    if (f[3] === 'select') return '<select class="select" id="' + id + '" data-k="' + f[0] + '">' + f[4].map(function (o) { return '<option' + (o === v ? ' selected' : '') + '>' + o + '</option>'; }).join('') + '</select>';
    return '<input class="input" id="' + id + '" data-k="' + f[0] + '" type="' + (f[3] === 'date' ? 'date' : 'text') + '" value="' + C.esc(v) + '"' + (f[3] === 'chip' ? ' placeholder="쉼표로 구분"' : '') + '>';
  }
  function render() {
    ['left', 'right'].forEach(function (col) {
      $('#col-' + col).innerHTML = GROUPS.filter(function (g) { return g[0] === col; }).map(function (g) {
        return '<div class="dl-group"><h2 class="dl-title">' + g[1] + '</h2><dl>' + g[2].map(function (f) {
          return '<div class="dl-row"><dt><label for="m-' + f[0] + '">' + f[1] + '</label></dt><dd><span class="view">' + view(f, values[f[0]]) + '</span><span class="edit">' + edit(f, values[f[0]]) + '</span></dd></div>';
        }).join('') + '</dl></div>';
      }).join('');
    });
  }
  function setMode(on) {
    $('#meta-root').classList.toggle('is-editing', on);
    $('#actions-view').hidden = on;
    $('#actions-edit').hidden = !on;
    $('#meta-desc').textContent = on ? '값을 고친 뒤 저장을 누르세요. 비워두면 ‘-’로 표시돼요.' : '콘텐츠에 붙은 메타데이터를 항목별로 확인합니다. 값을 바꾸려면 수정을 누르세요.';
    if (on) $('#m-title').focus();
  }
  $('#btn-edit').onclick = function () { setMode(true); };
  $('#btn-cancel').onclick = function () { render(); setMode(false); C.toast('수정을 취소했어요'); };
  $('#btn-save').onclick = function () {
    var t = $('#m-title');
    if (!t.value.trim()) { t.classList.add('is-invalid'); t.focus(); C.toast('표제는 비울 수 없어요', 'warn'); return; }
    var changed = 0;
    document.querySelectorAll('[data-k]').forEach(function (el) { var k = el.getAttribute('data-k'), v = el.value.trim(); if (values[k] !== v) { values[k] = v; changed++; } });
    render(); setMode(false);
    C.toast(changed ? changed + '개 항목을 저장했어요' : '바뀐 항목이 없어요', changed ? 'ok' : 'warn');
  };
  render();
})();
