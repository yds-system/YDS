/* 메뉴 설정: 트리 선택·펼침, 하위 메뉴 추가·삭제, ID 중복 확인, 권한 선택. 새로고침하면 시안 상태로 돌아갑니다. */
(function () {
  'use strict';
  var C = window.CMS, $ = function (s) { return document.querySelector(s); };

  var seq = 0;
  function node(name, kids, open) { return { key: ++seq, name: name, kids: kids || null, open: !!open, id: 'gs' + String(10000 + seq * 7).slice(-5) + '0' }; }
  function pages(list) { return list.map(function (n) { return node(n); }); }

  var selected = node('제안/의견', pages(['프로그램 페이지', '공지사항 게시판 페이지', '콘텐츠 페이지', '프로그램 페이지', '만족도 설정 페이지']), true);
  var root = node('HOME', [
    node('중구소개', pages(['인사말', '연혁', '조직도', '오시는 길'])),
    node('소통과 참여', [node('행사참여', pages(['행사 일정', '참여 신청'])), selected, node('사업 만족도 설정', pages(['만족도 조사', '결과 공개']))], true),
    node('행정정보', pages(['공고', '규정', '예산'])),
    node('분야별 정보', pages(['문화예술', '교육', '복지'])),
    node('이용안내', pages(['자주 묻는 질문', '이용약관']))
  ], true);

  var tree = $('#tree'), form = $('#menu-form'), fName = $('#f-name'), fId = $('#f-id'), fOrder = $('#f-order'), helper = $('#id-helper');
  var admins = [], idChecked = false, flash = null;
  var segVals = { type: '서브메인', target: '새 창' };

  function walk(n, fn, p) { fn(n, p); (n.kids || []).forEach(function (k) { walk(k, fn, n); }); }
  function parentOf(t) { var f = null; walk(root, function (n, p) { if (n === t) f = p; }); return f; }
  function count(n) { var c = 0; walk(n, function () { c++; }); return c - 1; }
  function path(t) { var out = []; for (var cur = t; cur && cur !== root; cur = parentOf(cur)) { var p = parentOf(cur); out.unshift(p.kids.indexOf(cur) + 1); } return out; }
  function label(n) { return n === root ? n.name : path(n).join('-') + '. ' + n.name; }

  function row(n, depth) {
    var folder = !!(n.kids && n.kids.length);
    var tog = folder ? '<button type="button" class="tree-toggle' + (n.open ? ' is-open' : '') + '" data-toggle tabindex="-1" aria-hidden="true">' + C.icon('right', 14, 2) + '</button>' : '<span class="tree-spacer"></span>';
    return '<div class="tree-row' + (n === selected ? ' is-selected' : '') + (n.key === flash ? ' is-new' : '') + '" role="treeitem" tabindex="' + (n === selected ? 0 : -1) + '" data-key="' + n.key + '" style="--depth:' + depth + '" aria-selected="' + (n === selected) + '"' + (folder ? ' aria-expanded="' + n.open + '"' : '') + '>' +
      tog + C.icon(n.kids ? 'folder' : 'file', 15, 1.8, 'tree-icon') + '<span>' + C.esc(label(n)) + (folder ? ' <span class="tree-count">(' + count(n) + ')</span>' : '') + '</span></div>';
  }
  function branch(n, depth) {
    var h = '<li>' + row(n, depth);
    if (n.kids && n.kids.length) h += '<div class="tree-kids' + (n.open ? ' is-open' : '') + '"><ul role="group">' + n.kids.map(function (k) { return branch(k, depth + 1); }).join('') + '</ul></div>';
    return h + '</li>';
  }
  function render() {
    tree.innerHTML = '<ul>' + branch(root, 0) + '</ul>';
    $('#form-title').textContent = '\'' + label(selected) + '\'에 하위 메뉴 추가';
    fOrder.value = (selected.kids ? selected.kids.length : 0) + 1;
    flash = null;
  }
  function find(key) { var f = null; walk(root, function (n) { if (n.key === key) f = n; }); return f; }

  tree.addEventListener('click', function (e) {
    var r = e.target.closest('.tree-row');
    if (!r) return;
    var n = find(Number(r.getAttribute('data-key')));
    if (e.target.closest('[data-toggle]')) { n.open = !n.open; render(); return; }
    selected = n;
    if (n.kids) n.open = true;
    render();
    tree.querySelector('.is-selected').focus();
  });
  tree.addEventListener('keydown', function (e) {
    var rows = Array.prototype.slice.call(tree.querySelectorAll('.tree-row')).filter(function (r) { return r.offsetParent; });
    var i = rows.indexOf(document.activeElement);
    if (i < 0) return;
    var n = find(Number(rows[i].getAttribute('data-key')));
    if (e.key === 'ArrowDown' && rows[i + 1]) { e.preventDefault(); rows[i + 1].focus(); }
    if (e.key === 'ArrowUp' && rows[i - 1]) { e.preventDefault(); rows[i - 1].focus(); }
    if (e.key === 'ArrowRight' && n.kids && !n.open) { n.open = true; render(); tree.querySelector('[data-key="' + n.key + '"]').focus(); }
    if (e.key === 'ArrowLeft' && n.kids && n.open) { n.open = false; render(); tree.querySelector('[data-key="' + n.key + '"]').focus(); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rows[i].click(); }
  });

  $('#btn-open').onclick = function () { walk(root, function (n) { if (n.kids) n.open = true; }); render(); };
  $('#btn-close').onclick = function () { walk(root, function (n) { if (n.kids && n !== root) n.open = false; }); render(); };
  $('#btn-add').onclick = function () { fName.focus(); C.toast('오른쪽 폼에 새 메뉴 정보를 입력하세요'); };
  $('#btn-delete').onclick = function () {
    if (selected === root) { C.toast('HOME은 삭제할 수 없어요', 'warn'); return; }
    var n = count(selected);
    C.confirm({ title: '\'' + selected.name + '\' 메뉴를 삭제할까요?', text: n ? '하위 메뉴 ' + n + '개도 함께 삭제돼요.' : '삭제한 메뉴는 되돌릴 수 없어요.', ok: '삭제', danger: true }).then(function (ok) {
      if (!ok) return;
      var p = parentOf(selected);
      p.kids.splice(p.kids.indexOf(selected), 1);
      C.toast('\'' + selected.name + '\' 메뉴를 삭제했어요');
      selected = p;
      render();
    });
  };
  $('#show-icons').onchange = function () { tree.classList.toggle('no-icons', !this.checked); };

  /* 세그먼트 */
  [['#seg-type', 'type'], ['#seg-target', 'target']].forEach(function (s) {
    var g = $(s[0]);
    g.querySelectorAll('.seg-btn').forEach(function (b) { b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', b.classList.contains('is-active')); });
    g.addEventListener('click', function (e) {
      var b = e.target.closest('.seg-btn');
      if (!b) return;
      g.querySelectorAll('.seg-btn').forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-checked', x === b); });
      segVals[s[1]] = b.getAttribute('data-v');
      if (s[1] === 'type') $('#f-link').placeholder = segVals.type === '외부 프로그램' ? 'https://' : '/경로 또는 https://';
    });
  });

  /* 메뉴 ID */
  function suggestId() { fId.value = 'gs' + String(Math.floor(10000 + Math.random() * 89999)) + '0'; idChecked = false; showHelper(); }
  function showHelper(msg, cls) {
    helper.className = 'helper' + (cls ? ' ' + cls : '');
    helper.textContent = msg || 'http://www.icjg.go.kr/artcenter/' + (fId.value || '');
  }
  fId.addEventListener('input', function () { idChecked = false; fId.classList.remove('is-invalid'); showHelper(); });
  $('#btn-dup').onclick = function () {
    var v = fId.value.trim();
    if (!/^[a-z][a-z0-9_]{3,19}$/i.test(v)) { fId.classList.add('is-invalid'); showHelper('영문으로 시작하는 4~20자 영문·숫자로 입력하세요.', 'is-error'); return; }
    var dup = false; walk(root, function (n) { if (n.id === v) dup = true; });
    if (dup) { fId.classList.add('is-invalid'); showHelper('이미 쓰고 있는 ID예요.', 'is-error'); return; }
    idChecked = true; showHelper('사용할 수 있는 ID예요.', 'is-ok');
  };

  /* 권한 */
  var ADMINS = ['홍길동 (CMS 전체 관리)', '김민지 (콘텐츠 담당)', '박서준 (게시판 담당)', '이하늘 (운영 담당)'];
  function drawPerm() {
    $('#perm-view').innerHTML = admins.length ? admins.map(function (a) { return '<span class="chip chip--primary">' + C.esc(a.split(' (')[0]) + '</span>'; }).join('') : '<span class="perm-text">등록된 관리자가 없어요.</span>';
  }
  $('#btn-perm').onclick = function () {
    var d = C.openDialog('<div class="dialog-body"><h2 class="dialog-title">권한 관리자 선택</h2><p class="dialog-text">이 메뉴를 관리할 담당자를 고르세요.</p><div style="display:flex;flex-direction:column;gap:13px;margin-top:20px">' +
      ADMINS.map(function (a) { return C.checkbox('value="' + a + '"' + (admins.indexOf(a) > -1 ? ' checked' : ''), a); }).join('') +
      '</div></div><div class="dialog-foot"><button type="button" class="btn btn--secondary" data-no>취소</button><button type="button" class="btn btn--primary" data-yes>선택 완료</button></div>');
    d.querySelector('[data-no]').onclick = function () { d.close(); };
    d.querySelector('[data-yes]').onclick = function () {
      admins = Array.prototype.map.call(d.querySelectorAll('input:checked'), function (i) { return i.value; });
      drawPerm(); d.close();
    };
  };

  /* 저장 */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = fName.value.trim(), bad = false;
    fName.classList.toggle('is-invalid', !name);
    if (!name) { bad = true; fName.focus(); }
    if (!idChecked) { fId.classList.add('is-invalid'); showHelper('메뉴 ID 중복 확인을 해주세요.', 'is-error'); if (!bad) fId.focus(); bad = true; }
    if (bad) return;
    var n = node(name);
    n.id = fId.value.trim();
    if (!selected.kids) selected.kids = [];
    var at = Math.max(0, Math.min(Number(fOrder.value || 1) - 1, selected.kids.length));
    selected.kids.splice(at, 0, n);
    selected.open = true;
    flash = n.key;
    C.toast('\'' + label(selected) + '\'에 \'' + name + '\' 메뉴를 추가했어요');
    reset();
    render();
  });
  function reset() {
    fName.value = ''; fName.classList.remove('is-invalid'); $('#f-link').value = '';
    $('#t-use').checked = false; $('#t-gnb').checked = true; $('#t-lnb').checked = true;
    admins = []; drawPerm(); suggestId();
  }
  $('#btn-cancel').onclick = function () { reset(); C.toast('입력한 내용을 비웠어요'); };

  suggestId();
  render();
})();
