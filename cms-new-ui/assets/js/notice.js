/* 공지사항: 상태 탭·검색·정렬·선택·일괄 숨김/삭제·행 메뉴·글쓰기·엑셀 */
(function () {
  'use strict';
  var C = window.CMS, $ = function (s) { return document.querySelector(s); };

  var STATUS = { pub: ['게시', 'chip--green'], rsv: ['예약', 'chip--blue'], hide: ['숨김', 'chip--gray'] };
  var rows = [
    { pin: true, cat: '강좌', title: '[안내] 2026년 하반기 문화강좌 수강생 모집 안내', author: '관리자', date: '2026-10-28', views: 1284, st: 'pub', file: true },
    { pin: true, cat: '시스템', title: '홈페이지 시스템 정기 점검 안내 (11/8 02:00~06:00)', author: '관리자', date: '2026-11-02', views: 642, st: 'rsv' },
    { pin: true, cat: '운영', title: '개인정보처리방침 개정 안내', author: '관리자', date: '2026-10-15', views: 903, st: 'pub' },
    { no: 125, cat: '행사', title: '중구 문화의 밤 공연 일정 변경 안내', author: '김민지', date: '2026-10-30', views: 318, st: 'pub', file: true, isNew: true },
    { no: 124, cat: '운영', title: '10월 우수 회원 선정 결과', author: '박서준', date: '2026-10-27', views: 205, st: 'pub' },
    { no: 123, cat: '행사', title: '청소년 역사탐방 참가자 최종 명단', author: '이하늘', date: '2026-10-24', views: 487, st: 'pub', file: true },
    { no: 122, cat: '운영', title: '문화원 주차장 이용 제한 안내', author: '관리자', date: '2026-10-20', views: 156, st: 'hide' },
    { no: 121, cat: '행사', title: '2026 지역문화 사진 공모전 수상작 발표', author: '김민지', date: '2026-10-17', views: 1021, st: 'pub' },
    { no: 120, cat: '운영', title: '사무실 이전에 따른 대표 전화번호 변경', author: '관리자', date: '2026-10-11', views: 389, st: 'pub' }
  ];
  // 나머지 글은 시안 수치(전체 128)를 맞추기 위한 샘플이에요.
  var T = ['문화강좌 강사 모집', '시설 대관 안내', '휴관일 안내', '프로그램 만족도 조사 결과', '자원봉사자 모집', '동아리 발표회 안내', '전시 연계 프로그램 안내', '회원증 재발급 안내'];
  var CATS = ['강좌', '운영', '행사', '시스템'], WHO = ['관리자', '김민지', '박서준', '이하늘'];
  for (var i = 119; i >= 1; i--) {
    var d = new Date(2026, 9, 10); d.setDate(d.getDate() - (120 - i) * 2);
    rows.push({ no: i, cat: CATS[i % 4], title: T[i % T.length] + ' (' + i + ')', author: WHO[i % 4], date: d.toISOString().slice(0, 10), views: (i * 37) % 900 + 40, st: i % 13 === 0 ? 'hide' : (i % 29 === 0 ? 'rsv' : 'pub'), file: i % 5 === 0 });
  }
  rows.forEach(function (r, k) { r.id = k + 1; });

  var state = { tab: 'all', cat: '', scope: 'both', q: '', sort: 'date', dir: -1, page: 1, per: 10, sel: {} };

  function filtered() {
    var q = state.q.toLowerCase();
    var list = rows.filter(function (r) {
      if (state.tab !== 'all' && r.st !== state.tab) return false;
      if (state.cat && r.cat !== state.cat) return false;
      if (q) {
        var hay = state.scope === 'author' ? r.author : state.scope === 'title' ? r.title : r.title + r.author + r.cat;
        if (hay.toLowerCase().indexOf(q) < 0) return false;
      }
      return true;
    });
    var pins = list.filter(function (r) { return r.pin; }), rest = list.filter(function (r) { return !r.pin; });
    rest.sort(function (a, b) { var x = a[state.sort], y = b[state.sort]; return (x > y ? 1 : x < y ? -1 : 0) * state.dir; });
    return pins.concat(rest);
  }

  function drawTabs() {
    var c = function (s) { return rows.filter(function (r) { return s === 'all' || r.st === s; }).length; };
    $('#tabs').innerHTML = [['all', '전체'], ['pub', '게시'], ['rsv', '예약'], ['hide', '숨김']].map(function (t) {
      var on = state.tab === t[0];
      return '<button type="button" class="tab' + (on ? ' is-active' : '') + '" role="tab" aria-selected="' + on + '" data-tab="' + t[0] + '">' + t[1] + ' <b class="num">' + c(t[0]) + '</b></button>';
    }).join('');
  }

  function draw() {
    var list = filtered(), pages = Math.max(1, Math.ceil(list.length / state.per));
    state.page = Math.min(state.page, pages);
    var slice = list.slice((state.page - 1) * state.per, state.page * state.per);
    $('#count').textContent = C.fmt(list.length);
    $('#rows').innerHTML = slice.length ? slice.map(function (r) {
      var on = !!state.sel[r.id], st = STATUS[r.st];
      return '<tr class="' + (r.pin ? 'is-pinned ' : '') + (on ? 'is-checked ' : '') + (r.st === 'hide' ? 'is-hidden-row' : '') + '" data-id="' + r.id + '">' +
        '<td>' + C.checkbox('data-row' + (on ? ' checked' : ''), { text: r.title + ' 선택', sr: true }) + '</td>' +
        '<td class="num">' + (r.pin ? '<span class="chip chip--primary">공지</span>' : r.no) + '</td>' +
        '<td>' + r.cat + '</td>' +
        '<td class="is-left"><button type="button" class="t-title" data-open>' + (r.pin ? '<span class="t-pin">' + C.icon('pin', 15, 2) + '</span>' : '') + C.esc(r.title) +
          (r.file ? '<span style="color:var(--muted)">' + C.icon('clip', 14) + '</span>' : '') + (r.isNew ? '<span class="t-new">N</span>' : '') + '</button></td>' +
        '<td>' + r.author + '</td><td class="num">' + r.date.replace(/-/g, '.') + '</td><td class="is-right num">' + C.fmt(r.views) + '</td>' +
        '<td><span class="chip ' + st[1] + '">' + st[0] + '</span></td>' +
        '<td><button type="button" class="more-btn" data-more aria-label="' + C.esc(r.title) + ' 관리">' + C.icon('more', 18, 2.4) + '</button></td></tr>';
    }).join('') : '<tr><td colspan="9" class="empty">조건에 맞는 공지가 없어요.</td></tr>';
    C.pager($('#pager'), state.page, pages, function (p) { state.page = p; draw(); });
    drawAll(slice);
    drawSel();
  }

  function drawAll(slice) {
    var ids = slice.map(function (r) { return r.id; }), n = ids.filter(function (id) { return state.sel[id]; }).length;
    $('#th-all').innerHTML = C.checkbox('id="chk-all"', { text: '현재 페이지 전체 선택', sr: true });
    var all = $('#chk-all');
    all.checked = ids.length && n === ids.length;
    all.indeterminate = n > 0 && n < ids.length;
    all.onchange = function () { ids.forEach(function (id) { if (all.checked) state.sel[id] = true; else delete state.sel[id]; }); draw(); };
  }
  function selIds() { return Object.keys(state.sel).map(Number); }
  function drawSel() {
    var n = selIds().length;
    $('#sel-count').textContent = n + '개 선택';
    $('#bulk-hide').disabled = $('#bulk-del').disabled = !n;
  }

  $('#rows').addEventListener('change', function (e) {
    if (!e.target.matches('[data-row]')) return;
    var id = Number(e.target.closest('tr').getAttribute('data-id'));
    if (e.target.checked) state.sel[id] = true; else delete state.sel[id];
    draw();
  });
  $('#tabs').addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab]');
    if (!t) return;
    state.tab = t.getAttribute('data-tab'); state.page = 1; drawTabs(); draw();
  });
  $('#filters').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(this);
    state.cat = f.get('cat'); state.scope = f.get('scope'); state.q = f.get('q').trim(); state.page = 1; draw();
  });
  $('#filters [name=cat]').onchange = function () { state.cat = this.value; state.page = 1; draw(); };
  $('#per').onchange = function () { state.per = Number(this.value); state.page = 1; draw(); };
  document.querySelectorAll('[data-sort]').forEach(function (b) {
    b.onclick = function () {
      var k = b.getAttribute('data-sort');
      state.dir = state.sort === k ? -state.dir : -1; state.sort = k;
      document.querySelectorAll('th[aria-sort]').forEach(function (th) { th.setAttribute('aria-sort', 'none'); });
      b.parentElement.setAttribute('aria-sort', state.dir > 0 ? 'ascending' : 'descending');
      draw();
    };
  });

  function removeRows(ids) { rows = rows.filter(function (r) { return ids.indexOf(r.id) < 0; }); ids.forEach(function (id) { delete state.sel[id]; }); drawTabs(); draw(); }
  $('#bulk-hide').onclick = function () {
    var ids = selIds();
    rows.forEach(function (r) { if (ids.indexOf(r.id) > -1) r.st = 'hide'; });
    state.sel = {}; drawTabs(); draw(); C.toast(ids.length + '개 글을 숨겼어요');
  };
  $('#bulk-del').onclick = function () {
    var ids = selIds();
    C.confirm({ title: '선택한 ' + ids.length + '개 글을 삭제할까요?', text: '삭제한 글은 휴지통으로 이동해요.', ok: '삭제', danger: true }).then(function (ok) { if (ok) { removeRows(ids); C.toast(ids.length + '개 글을 삭제했어요'); } });
  };

  /* 행 메뉴 */
  var menu;
  function closeMenu() { if (menu) { menu.remove(); menu = null; } }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-more]');
    if (!b) { if (!e.target.closest('.row-menu')) closeMenu(); return; }
    closeMenu();
    var id = Number(b.closest('tr').getAttribute('data-id')), r = rows.filter(function (x) { return x.id === id; })[0];
    menu = document.createElement('div');
    menu.className = 'row-menu';
    menu.innerHTML = '<button type="button" data-a="edit">수정</button><button type="button" data-a="pin">' + (r.pin ? '공지 해제' : '공지로 고정') + '</button>' +
      '<button type="button" data-a="hide">' + (r.st === 'hide' ? '게시로 전환' : '숨김') + '</button><button type="button" data-a="del" class="danger">삭제</button>';
    var rect = b.getBoundingClientRect();
    menu.style.top = (rect.bottom + window.scrollY + 4) + 'px';
    menu.style.left = (rect.right + window.scrollX - 154) + 'px';
    document.body.appendChild(menu);
    menu.onclick = function (ev) {
      var a = ev.target.getAttribute('data-a');
      closeMenu();
      if (a === 'edit') openWrite(r);
      if (a === 'pin') { r.pin = !r.pin; if (!r.pin && !r.no) r.no = rows.length; draw(); C.toast(r.pin ? '상단 공지로 고정했어요' : '공지를 해제했어요'); }
      if (a === 'hide') { r.st = r.st === 'hide' ? 'pub' : 'hide'; drawTabs(); draw(); }
      if (a === 'del') C.confirm({ title: '이 글을 삭제할까요?', text: r.title, ok: '삭제', danger: true }).then(function (ok) { if (ok) { removeRows([r.id]); C.toast('삭제했어요'); } });
    };
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  $('#rows').addEventListener('click', function (e) {
    if (!e.target.closest('[data-open]')) return;
    var id = Number(e.target.closest('tr').getAttribute('data-id'));
    var r = rows.filter(function (x) { return x.id === id; })[0];
    r.views++; draw(); openWrite(r);
  });

  /* 글쓰기·수정 */
  function openWrite(r) {
    var edit = !!r;
    r = r || { cat: '운영', title: '', st: 'pub', pin: false };
    var d = C.openDialog(
      '<form method="dialog" style="width:616px;max-width:100%"><div class="dialog-head"><div><h2 class="dialog-title">' + (edit ? '공지 수정' : '공지 글쓰기') + '</h2><p class="dialog-text">제목과 게시 상태를 정해 등록하세요.</p></div>' +
      '<button type="button" class="icon-btn" data-x aria-label="닫기">' + C.icon('close', 18) + '</button></div>' +
      '<div style="padding:9px 26px 0;display:flex;flex-direction:column;gap:18px">' +
        '<div><label class="field-label" for="w-title">제목 <i>*</i></label><input class="input" id="w-title" value="' + C.esc(r.title) + '" required></div>' +
        '<div class="inline-row" style="gap:18px;align-items:flex-end"><div style="width:176px"><label class="field-label" for="w-cat">분류</label><select class="select" id="w-cat">' + ['강좌', '시스템', '운영', '행사'].map(function (c) { return '<option' + (c === r.cat ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select></div>' +
        '<div><span class="field-label">게시 상태</span><div class="radio-row">' + ['pub', 'rsv', 'hide'].map(function (s) { return '<label class="radio-pill"><input type="radio" name="w-st" value="' + s + '"' + (s === r.st ? ' checked' : '') + '><span>' + STATUS[s][0] + '</span></label>'; }).join('') + '</div></div></div>' +
        '<div><label class="field-label" for="w-body">내용</label><textarea class="textarea" id="w-body" rows="5" placeholder="공지 내용을 입력하세요"></textarea></div>' +
        C.checkbox('id="w-pin"' + (r.pin ? ' checked' : ''), '상단 공지로 고정') +
      '</div><div class="dialog-foot"><button type="button" class="btn btn--secondary" data-x>취소</button><button type="submit" class="btn btn--primary">' + (edit ? '저장' : '등록') + '</button></div></form>');
    d.querySelectorAll('[data-x]').forEach(function (b) { b.onclick = function () { d.close(); }; });
    d.querySelector('#w-title').focus();
    d.querySelector('form').onsubmit = function (e) {
      var t = d.querySelector('#w-title');
      if (!t.value.trim()) { e.preventDefault(); t.classList.add('is-invalid'); t.focus(); return; }
      r.title = t.value.trim(); r.cat = d.querySelector('#w-cat').value; r.st = d.querySelector('[name=w-st]:checked').value; r.pin = d.querySelector('#w-pin').checked;
      if (!edit) {
        r.id = Date.now(); r.no = r.pin ? null : Math.max.apply(null, rows.map(function (x) { return x.no || 0; })) + 1;
        r.author = '홍길동'; r.date = new Date().toISOString().slice(0, 10); r.views = 0; r.isNew = true;
        rows.unshift(r); state.tab = 'all'; state.page = 1;
      }
      drawTabs(); draw(); C.toast(edit ? '공지를 수정했어요' : '공지를 등록했어요');
    };
  }
  $('#btn-write').onclick = function () { openWrite(); };

  $('#btn-excel').onclick = function () {
    var list = filtered();
    C.download('공지사항_' + new Date().toISOString().slice(0, 10) + '.csv', [['번호', '분류', '제목', '작성자', '등록일', '조회', '상태']].concat(list.map(function (r) {
      return [r.pin ? '공지' : r.no, r.cat, r.title, r.author, r.date, r.views, STATUS[r.st][0]];
    })));
    C.toast(list.length + '건을 엑셀(CSV)로 내려받았어요');
  };

  drawTabs();
  draw();
})();
