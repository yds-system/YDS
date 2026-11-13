/* 콘텐츠 등록: 서식 툴바·미디어 관리 모달·태그·임시저장(브라우저 저장)·유효성 검사 */
(function () {
  'use strict';
  var C = window.CMS, $ = function (s) { return document.querySelector(s); };
  var form = $('#write-form'), ed = $('#editor'), title = $('#w-title');

  /* 툴바 아이콘 */
  var IC = { bold: 'bold', italic: 'italic', underline: 'underline', H2: 'h2', insertUnorderedList: 'ul', BLOCKQUOTE: 'quote', createLink: 'link' };
  document.querySelectorAll('.ed-btn').forEach(function (b) { b.innerHTML = C.icon(IC[b.getAttribute('data-arg') || b.getAttribute('data-cmd')], 17, 2); });
  document.querySelector('.editor-bar').addEventListener('mousedown', function (e) { if (e.target.closest('.ed-btn')) e.preventDefault(); });
  document.querySelector('.editor-bar').addEventListener('click', function (e) {
    var b = e.target.closest('.ed-btn');
    if (!b) return;
    ed.focus();
    var cmd = b.getAttribute('data-cmd'), arg = b.getAttribute('data-arg');
    if (cmd === 'createLink') { arg = prompt('연결할 주소를 입력하세요', 'https://'); if (!arg) return; }
    if (cmd === 'formatBlock' && document.queryCommandValue('formatBlock').toUpperCase() === arg) arg = 'P';
    document.execCommand(cmd, false, arg);
    sync();
  });
  function sync() {
    var t = ed.innerText.replace(/\s+/g, ' ').trim();
    $('#char-count').textContent = C.fmt(t.length) + '자';
    $('#media-count').textContent = '미디어 ' + ed.querySelectorAll('figure').length + '개';
    ['bold', 'italic', 'underline'].forEach(function (c) { var b = document.querySelector('[data-cmd="' + c + '"]'); b.classList.toggle('is-on', document.queryCommandState(c)); });
    dirty = true;
  }
  var lastRange = null;
  function keepRange() { var sel = window.getSelection(); if (sel.rangeCount && ed.contains(sel.anchorNode)) lastRange = sel.getRangeAt(0).cloneRange(); }
  document.addEventListener('selectionchange', keepRange);
  ed.addEventListener('input', sync);
  ed.addEventListener('keyup', sync);
  ed.addEventListener('mouseup', sync);

  /* 태그 */
  var tags = [];
  function drawTags() {
    $('#tags').innerHTML = tags.map(function (t, i) { return '<span class="chip chip--primary"># ' + C.esc(t) + ' <button type="button" data-rm="' + i + '" aria-label="' + C.esc(t) + ' 태그 삭제" style="color:inherit">' + C.icon('close', 12, 2.4) + '</button></span>'; }).join('');
  }
  $('#w-tag').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || e.isComposing) return;
    e.preventDefault();
    var v = this.value.trim().replace(/^#/, '');
    if (v && tags.indexOf(v) < 0 && tags.length < 8) { tags.push(v); drawTags(); dirty = true; }
    this.value = '';
  });
  $('#tags').addEventListener('click', function (e) { var b = e.target.closest('[data-rm]'); if (b) { tags.splice(Number(b.getAttribute('data-rm')), 1); drawTags(); } });

  /* 미디어 관리 */
  var MEDIA = [
    ['지진 국민행동요령 소책자.png', '이미지', '1.2MB', '#c7d3ef'], ['문화의 밤 포스터.png', '이미지', '840KB', '#f2d6c4'], ['역사탐방 단체사진.jpg', '이미지', '2.4MB', '#cfe5da'],
    ['강좌 안내 영상.mp4', '동영상', '48MB', '#2b2d52'], ['중구문화원 전경.jpg', '이미지', '3.1MB', '#d9d4f2'], ['사진 공모전 수상작.jpg', '이미지', '1.8MB', '#e8dfc4'],
    ['홍보 리플렛.pdf', 'ETC', '620KB', '#eef1f5'], ['배경음악_가을.mp3', '음악', '4.2MB', '#fbe0e4'], ['전시 개막식.jpg', '이미지', '2.2MB', '#d6e6f5'],
    ['인터뷰_원장.mp4', '동영상', '120MB', '#30344f'], ['연혁 연표.png', '이미지', '960KB', '#e3eedc'], ['국악 공연 실황.mp3', '음악', '6.8MB', '#f6e3cf']
  ];
  var ICON = { '이미지': 'image', '동영상': 'play', '음악': 'music', 'ETC': 'file' };
  $('#btn-media').onclick = function () {
    var tab = '전체', q = '', picked = {};
    var d = C.openDialog(
      '<div class="media-dialog"><div class="dialog-head"><div><h2 class="dialog-title">미디어 관리</h2><p class="dialog-text">이미지·영상·문서 파일을 골라 본문에 넣어요.</p></div><button type="button" class="icon-btn" data-x aria-label="닫기">' + C.icon('close', 18) + '</button></div>' +
      '<div class="tabs" role="tablist" id="m-tabs"></div>' +
      '<div class="filter-row" style="padding:18px 26px"><select class="select" style="width:143px" aria-label="검색 기준"><option>미디어 명</option><option>등록자</option></select>' +
        '<input class="input grow" type="search" id="m-q" placeholder="파일 이름으로 검색" aria-label="파일 검색">' +
        '<label class="btn btn--primary" style="cursor:pointer">+ 파일 업로드<input type="file" id="m-file" multiple hidden></label></div>' +
      '<div class="media-grid" id="m-grid"></div>' +
      '<div class="dialog-foot dialog-foot--split"><span class="total" id="m-sel">0개 선택됨</span><div class="inline-row" style="gap:9px"><button type="button" class="btn btn--secondary" data-x>취소</button><button type="button" class="btn btn--primary" id="m-insert" disabled>본문에 넣기</button></div></div></div>', '');
    function counts(t) { return MEDIA.filter(function (m) { return t === '전체' || m[1] === t; }).length; }
    function draw() {
      d.querySelector('#m-tabs').innerHTML = ['전체', '이미지', '동영상', '음악', 'ETC'].map(function (t) {
        return '<button type="button" class="tab' + (t === tab ? ' is-active' : '') + '" role="tab" aria-selected="' + (t === tab) + '" data-t="' + t + '">' + t + ' <b class="num">' + counts(t) + '</b></button>';
      }).join('');
      var list = MEDIA.map(function (m, i) { return { m: m, i: i }; }).filter(function (x) { return (tab === '전체' || x.m[1] === tab) && x.m[0].toLowerCase().indexOf(q) > -1; });
      d.querySelector('#m-grid').innerHTML = list.length ? list.map(function (x) {
        var m = x.m, on = picked[x.i], dark = m[1] === '동영상';
        return '<button type="button" class="media-card' + (on ? ' is-on' : '') + '" data-i="' + x.i + '" aria-pressed="' + !!on + '">' +
          '<span class="media-check">' + C.icon('check', 12, 3) + '</span>' +
          '<span class="media-thumb" style="background:' + m[3] + ';' + (dark ? 'color:rgba(255,255,255,.7)' : '') + '">' + C.icon(ICON[m[1]], 22) + '</span>' +
          '<span class="media-info"><b>' + C.esc(m[0]) + '</b><span>' + m[1] + ' · ' + m[2] + '</span></span></button>';
      }).join('') : '<p class="empty" style="grid-column:1/-1">찾는 파일이 없어요.</p>';
      var n = Object.keys(picked).length;
      d.querySelector('#m-sel').textContent = n + '개 선택됨';
      d.querySelector('#m-insert').disabled = !n;
    }
    d.addEventListener('click', function (e) {
      if (e.target.closest('[data-x]')) return d.close();
      var t = e.target.closest('[data-t]'); if (t) { tab = t.getAttribute('data-t'); draw(); }
      var c = e.target.closest('[data-i]'); if (c) { var i = c.getAttribute('data-i'); if (picked[i]) delete picked[i]; else picked[i] = 1; draw(); }
    });
    d.querySelector('#m-q').addEventListener('input', function () { q = this.value.trim().toLowerCase(); draw(); });
    d.querySelector('#m-file').addEventListener('change', function () {
      Array.prototype.forEach.call(this.files, function (f) {
        var kind = /^image/.test(f.type) ? '이미지' : /^video/.test(f.type) ? '동영상' : /^audio/.test(f.type) ? '음악' : 'ETC';
        var size = f.size > 1048576 ? (f.size / 1048576).toFixed(1) + 'MB' : Math.max(1, Math.round(f.size / 1024)) + 'KB';
        MEDIA.unshift([f.name, kind, size, '#e3e1ff']);
        var shifted = {}; Object.keys(picked).forEach(function (k) { shifted[Number(k) + 1] = 1; }); picked = shifted; picked[0] = 1;
      });
      tab = '전체'; draw(); C.toast(this.files.length + '개 파일을 올렸어요');
    });
    d.querySelector('#m-insert').onclick = function () {
      var n = Object.keys(picked).length;
      d.close();
      ed.focus();
      var sel = window.getSelection();
      sel.removeAllRanges();
      if (lastRange) sel.addRange(lastRange);
      else { var r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); sel.addRange(r); }
      var html = Object.keys(picked).map(function (i) {
        var m = MEDIA[i];
        return '<figure contenteditable="false"><div class="media-ph" style="background:' + m[3] + (m[1] === '동영상' ? ';color:#fff' : '') + '">' + C.icon(ICON[m[1]], 26) + '</div><figcaption>' + C.esc(m[0]) + '</figcaption></figure><p><br></p>';
      }).join('');
      document.execCommand('insertHTML', false, html);
      sync(); C.toast(n + '개 미디어를 본문에 넣었어요');
    };
    draw();
  };

  /* 임시저장 · 불러오기 */
  var dirty = false, KEY = 'draft';
  function snapshot() {
    var f = new FormData(form);
    return { title: title.value, menu: f.get('menu'), type: f.get('type'), owner: f.get('owner'), body: ed.innerHTML, tags: tags, at: new Date().toLocaleString('ko-KR') };
  }
  $('#btn-draft').onclick = function () {
    C.store(KEY, snapshot()); dirty = false;
    $('#save-state').textContent = '임시저장 ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    C.toast('임시저장했어요');
  };
  var draft = C.store(KEY);
  var no = new URLSearchParams(location.search).get('no');
  if (no) {
    $('#page-title').textContent = '콘텐츠 수정';
    title.value = { 349: '중구문화원 연혁', 348: '오시는 길', 347: '2026 하반기 문화강좌' }[no] || '콘텐츠 ' + no;
    ed.innerHTML = '<h2>' + C.esc(title.value) + '</h2><p>기존에 등록된 본문 내용이 여기에 표시돼요.</p>';
    $('#w-menu').selectedIndex = 1;
  } else if (draft && draft.title) {
    C.confirm({ title: '임시저장한 글이 있어요', text: draft.at + '에 저장한 \'' + draft.title + '\'을(를) 불러올까요?', ok: '불러오기' }).then(function (ok) {
      if (!ok) return;
      title.value = draft.title; ed.innerHTML = draft.body; tags = draft.tags || []; drawTags();
      if (draft.menu) $('#w-menu').value = draft.menu;
      var t = form.querySelector('[name=type][value="' + draft.type + '"]'); if (t) t.checked = true;
      sync(); dirty = false;
    });
  }
  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  /* 등록 */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var menu = $('#w-menu'), bad = [];
    title.classList.toggle('is-invalid', !title.value.trim());
    menu.classList.toggle('is-invalid', !menu.value);
    if (!title.value.trim()) bad.push(title);
    if (!menu.value) bad.push(menu);
    if (bad.length) { bad[0].focus(); C.toast('필수 항목을 입력해주세요', 'warn'); return; }
    if (!ed.innerText.trim() && !ed.querySelector('figure')) { ed.focus(); C.toast('본문을 입력해주세요', 'warn'); return; }
    dirty = false;
    try { localStorage.removeItem('cmsA.' + KEY); } catch (err) { /* 저장소를 쓸 수 없는 환경 */ }
    C.toast(form.approve.checked ? '등록했어요. 승인 요청을 보냈어요' : '등록했어요');
    setTimeout(function () { location.href = 'contents.html'; }, 900);
  });
  [title, $('#w-menu')].forEach(function (el) { el.addEventListener('input', function () { el.classList.remove('is-invalid'); dirty = true; }); });
  sync(); dirty = false;
})();
