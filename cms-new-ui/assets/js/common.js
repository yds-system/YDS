/* 공통: 사이드바(펼침/접힘)·상단바·메뉴 검색(Ctrl+K)·AI 패널·토스트·다이얼로그·유틸 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PATHS = {
    home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/>',
    site: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M6.5 10v4a2 2 0 0 0 2 2H14"/>',
    doc: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5M9 13h6M9 17h4"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .6 3.5 2.4 3.5 5.5"/>',
    upload: '<path d="M12 15V3M7 8l5-5 5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    circle: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    clip: '<path d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16.5h.01"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    pin: '<path d="M12 17v5M9 10.8V5h6v5.8l2 3.2H7z"/><path d="M8 2h8"/>',
    more: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M17.9 17.9A10 10 0 0 1 12 19c-6.5 0-10-7-10-7a18 18 0 0 1 5.1-5.9M9.9 4.2A9 9 0 0 1 12 4c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.2M1 1l22 22"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    collapse: '<path d="M11 17 6 12l5-5M18 17l-5-5 5-5"/>',
    play: '<path d="M7 5v14l11-7z"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    bold: '<path d="M6 4h8a4 4 0 0 1 0 8H6zM6 12h9a4 4 0 0 1 0 8H6z"/>',
    italic: '<path d="M19 4h-9M14 20H5M15 4 9 20"/>',
    underline: '<path d="M6 4v6a6 6 0 0 0 12 0V4M4 21h16"/>',
    h2: '<path d="M4 12h8M4 6v12M12 6v12M17 10.5a2.5 2.5 0 1 1 4 2L17 18h4"/>',
    ul: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    quote: '<path d="M7 7h4v6H5V9a2 2 0 0 1 2-2zM15 7h4v6h-6V9a2 2 0 0 1 2-2zM5 13c0 3 2 4 4 4M13 13c0 3 2 4 4 4"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'
  };

  function icon(name, size, width, cls) {
    size = Math.round((size || 18) * 1.1);
    return '<svg class="' + (cls || '') + '" width="' + (size || 18) + '" height="' + (size || 18) + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="' + (width || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (PATHS[name] || '') + '</svg>';
  }
  var SPARK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5C12.6 7.6 16.4 11.4 22.5 12 16.4 12.6 12.6 16.4 12 22.5 11.4 16.4 7.6 12.6 1.5 12 7.6 11.4 11.4 7.6 12 1.5Z"/></svg>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(n) { return Number(n).toLocaleString('ko-KR'); }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem('cmsA.' + key));
      localStorage.setItem('cmsA.' + key, JSON.stringify(val));
    } catch (e) { return null; }
  }

  /* ---------- Toast ---------- */
  var toastHost;
  function toast(msg, type) {
    if (!toastHost) {
      toastHost = document.createElement('div');
      toastHost.className = 'toasts';
      toastHost.setAttribute('role', 'status');
      toastHost.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastHost);
    }
    var el = document.createElement('div');
    el.className = 'toast toast--' + (type || 'ok');
    el.innerHTML = icon(type === 'warn' ? 'alert' : 'checkCircle', 16, 2) + '<span>' + esc(msg) + '</span>';
    toastHost.appendChild(el);
    setTimeout(function () {
      el.classList.add('is-out');
      setTimeout(function () { el.remove(); }, 220);
    }, 2400);
  }
  function notReady(name) { toast(name + ' 화면은 시안 범위 밖이에요', 'warn'); }

  /* ---------- Dialog ---------- */
  function openDialog(html, cls) {
    var d = document.createElement('dialog');
    if (cls) d.className = cls;
    d.innerHTML = html;
    document.body.appendChild(d);
    d.addEventListener('close', function () { d.remove(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    d.showModal();
    return d;
  }
  function confirmDialog(o) {
    return new Promise(function (resolve) {
      var d = openDialog(
        '<div class="dialog-body"><h2 class="dialog-title">' + esc(o.title) + '</h2>' +
        '<p class="dialog-text">' + esc(o.text || '') + '</p></div>' +
        '<div class="dialog-foot"><button type="button" class="btn btn--secondary" data-no>취소</button>' +
        '<button type="button" class="btn ' + (o.danger ? 'btn--danger' : 'btn--primary') + '" data-yes>' + esc(o.ok || '확인') + '</button></div>'
      );
      var result = false;
      d.querySelector('[data-no]').onclick = function () { d.close(); };
      d.querySelector('[data-yes]').onclick = function () { result = true; d.close(); };
      d.addEventListener('close', function () { resolve(result); });
      d.querySelector('[data-yes]').focus();
    });
  }

  /* ---------- CSV ---------- */
  function download(name, rows) {
    var text = rows.map(function (r) {
      return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\r\n');
    var blob = new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  /* ---------- Count up ---------- */
  function countUp(el) {
    var to = Number(el.getAttribute('data-count'));
    if (reduced || !to) { el.textContent = fmt(to); return; }
    var start = performance.now(), dur = 800;
    (function step(now) {
      var t = Math.min((now - start) / dur, 1);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  /* ---------- Pagination ---------- */
  function pager(host, page, pages, onGo) {
    function btn(p, label, cls, dis) {
      return '<button type="button" class="page-btn ' + (cls || '') + (p === page && !cls ? ' is-active' : '') + '" data-p="' + p + '"' +
        (dis ? ' disabled' : '') + (p === page && !cls ? ' aria-current="page"' : '') + ' aria-label="' + (cls ? label : p + '페이지') + '">' + (cls ? icon(label === '이전' ? 'left' : 'right', 16, 2) : p) + '</button>';
    }
    var html = btn(page - 1, '이전', 'page-btn--edge', page <= 1);
    var list = [];
    for (var i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || Math.abs(i - page) <= 2 || (page <= 3 && i <= 5) || (page >= pages - 2 && i >= pages - 4)) list.push(i);
    }
    list.forEach(function (p, i) {
      if (i && p - list[i - 1] > 1) html += '<span class="page-gap">…</span>';
      html += btn(p);
    });
    html += btn(page + 1, '다음', 'page-btn--edge', page >= pages);
    host.innerHTML = html;
    host.onclick = function (e) {
      var b = e.target.closest('[data-p]');
      if (b && !b.disabled) onGo(Number(b.getAttribute('data-p')));
    };
  }

  /* ---------- Shell ---------- */
  var NAV = [
    { label: '홈', ic: 'home', href: 'index.html', key: 'dashboard' },
    { label: '사이트', ic: 'site', key: 'site', subs: [['사이트 관리', 'menu.html', 'menu', 'gear'], ['메인 관리', null, null, 'home'], ['팝업 관리', null, null, 'circle'], ['배너 관리', null, null, 'image'], ['댓글 관리', 'cm-list.html', 'comment', 'chat']] },
    { label: '콘텐츠', ic: 'doc', key: 'content', subs: [['콘텐츠 목록', 'contents.html', 'contents', 'doc'], ['콘텐츠 등록', 'content-write.html', 'write', 'edit'], ['미디어 관리', 'media-list.html', 'media', 'image'], ['휴지통', null, null, 'trash']] },
    { label: '게시판', ic: 'chat', key: 'board', subs: [['게시판 관리', 'bbs-setting-form.html', 'bbs', 'list'], ['공지사항', 'notice.html', 'notice', 'bell'], ['게시글 관리', null, null, 'file'], ['댓글 관리', null, null, 'chat']] },
    { label: '프로그램', ic: 'grid' },
    { label: '회원', ic: 'users' },
    { label: '배포', ic: 'upload' },
    { label: '개인정보', ic: 'shield' },
    { label: '메타데이터', ic: 'tag', key: 'meta', subs: [['메타데이터 목록', 'metadata.html', 'metadata', 'list'], ['메타데이터 설정', null, null, 'gear'], ['수집 이력', null, null, 'calendar']] },
    { label: '통계', ic: 'chart' },
    { label: 'CMS설정', ic: 'gear' }
  ];
  var PAGES = [];
  NAV.forEach(function (g) {
    if (g.href) PAGES.push([g.label === '홈' ? '대시보드' : g.label, '홈', g.href]);
    (g.subs || []).forEach(function (s) { if (s[1]) PAGES.push([s[0], g.label, s[1]]); });
  });

  function renderShell() {
    var app = document.querySelector('.app');
    if (!app) return;
    var page = app.getAttribute('data-page');
    var crumb = app.getAttribute('data-crumb') || '';
    var saved = store('mini');
    var mini = saved == null ? page === 'dashboard' : saved;
    app.classList.toggle('is-mini', !!mini);

    var nav = NAV.map(function (g) {
      var current = g.key === page || (g.subs || []).some(function (s) { return s[2] === page; });
      var first = g.href || ((g.subs || []).filter(function (s) { return s[1]; })[0] || [])[1];
      var head = (g.href || first)
        ? '<a class="nav-head" href="' + (g.href || first) + '"' + (g.href && current ? ' aria-current="page"' : '') + ' data-group="' + g.label + '">'
        : '<button type="button" class="nav-head" data-soon="' + g.label + '" data-group="' + g.label + '">';
      head += '<span class="nav-ic">' + icon(g.ic, 20) + '</span><span>' + g.label + '</span>' + ((g.href || first) ? '</a>' : '</button>');
      var subs = g.subs ? '<div class="nav-sub">' + g.subs.map(function (s) {
        var on = s[2] === page;
        return s[1]
          ? '<a class="nav-link' + (on ? ' is-active' : '') + '" href="' + s[1] + '"' + (on ? ' aria-current="page"' : '') + '>' + icon(s[3], 17) + s[0] + '</a>'
          : '<button type="button" class="nav-link" data-soon="' + s[0] + '">' + icon(s[3], 17) + s[0] + '</button>';
      }).join('') + '</div>' : '';
      return '<div class="nav-group' + (current ? ' is-current is-open' : '') + '">' + head + subs + '</div>';
    }).join('');

    var side = document.createElement('aside');
    side.className = 'side';
    side.setAttribute('aria-label', '주 메뉴');
    side.innerHTML =
      '<a class="side-logo" href="index.html" aria-label="홍익인간 CMS 대시보드"><span class="logo-mark">Y</span><span class="logo-name">yooncoms</span></a>' +
      '<nav class="side-nav">' + nav + '</nav>' +
      '<div class="side-foot"><button type="button" class="side-toggle" id="side-toggle" aria-label="사이드바 접기/펼치기">' + icon('collapse', 16, 2) + '<span>메뉴 접기</span></button></div>';
    app.prepend(side);

    var main = app.querySelector('.main');
    var top = document.createElement('header');
    top.className = 'top';
    top.innerHTML =
      '<button type="button" class="icon-btn menu-btn" id="menu-btn" aria-label="메뉴 열기">' + icon('menu', 20) + '</button>' +
      '<p class="crumb">' + crumb.split('/').map(function (c, i, a) { return i === a.length - 1 ? '<b>' + esc(c.trim()) + '</b>' : esc(c.trim()) + ' <span aria-hidden="true">/</span>'; }).join(' ') + '</p>' +
      '<button type="button" class="top-search" id="open-palette">' + icon('search', 16, 2) + '<span>메뉴·게시글·설정 검색</span><kbd>Ctrl K</kbd></button>' +
      '<button type="button" class="theme-btn" id="theme-btn" aria-label="다크 모드 전환" aria-pressed="false">' + icon('moon', 18, 2, 'ic-moon') + icon('sun', 18, 2, 'ic-sun') + '</button>' +
      '<button type="button" class="ai-btn" id="open-ai">' + SPARK + 'AI에게 묻기</button>' +
      '<div class="pop-wrap"><button type="button" class="user-btn" data-pop="user" aria-expanded="false"><span class="avatar">' + icon('user', 16, 2) + '</span><span class="uname">홍길동</span>' + icon('down', 16, 2) + '</button>' +
        '<div class="pop" id="pop-user"><p class="pop-title">홍길동 · CMS 전체 관리</p>' +
          '<button type="button" class="pop-item" data-soon="정보수정">정보수정</button>' +
          '<button type="button" class="pop-item" data-soon="로그아웃">로그아웃</button>' +
        '</div></div>';
    main.prepend(top);

    document.getElementById('side-toggle').onclick = function () {
      var now = !app.classList.contains('is-mini');
      app.classList.toggle('is-mini', now);
      store('mini', now);
    };
    document.getElementById('menu-btn').onclick = function () { app.classList.toggle('side-open'); };
    document.getElementById('open-palette').onclick = openPalette;
    document.getElementById('open-ai').onclick = toggleAi;
    var themeBtn = document.getElementById('theme-btn');
    function syncTheme() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.setAttribute('aria-pressed', dark);
      themeBtn.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
      themeBtn.title = dark ? '라이트 모드' : '다크 모드';
    }
    themeBtn.onclick = function () {
      var dark = document.documentElement.getAttribute('data-theme') !== 'dark';
      if (dark) document.documentElement.setAttribute('data-theme', 'dark'); else document.documentElement.removeAttribute('data-theme');
      store('theme', dark ? 'dark' : 'light');
      syncTheme();
      toast(dark ? '다크 모드로 바꿨어요' : '라이트 모드로 바꿨어요');
    };
    syncTheme();

    // 펼친 상태에서 그룹 머리를 누르면 하위 메뉴를 여닫기만 합니다.
    side.addEventListener('click', function (e) {
      var head = e.target.closest('.nav-head');
      if (!head || app.classList.contains('is-mini')) return;
      var group = head.parentElement;
      if (group.querySelector('.nav-sub')) {
        e.preventDefault();
        e.stopPropagation();
        group.classList.toggle('is-open');
      }
    }, true);
    bindPopovers();
  }

  function bindPopovers() {
    function closeAll() {
      document.querySelectorAll('.pop.is-open').forEach(function (p) { p.classList.remove('is-open'); });
      document.querySelectorAll('[data-pop]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-pop]');
      if (trigger) {
        var pop = document.getElementById('pop-' + trigger.getAttribute('data-pop'));
        var open = pop.classList.contains('is-open');
        closeAll();
        if (!open) { pop.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); }
        return;
      }
      if (!e.target.closest('.pop')) closeAll();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  }

  /* ---------- 메뉴 검색 ---------- */
  function openPalette() {
    if (document.querySelector('dialog.palette')) return;
    var d = openDialog('<div class="palette-body"><input class="input" type="search" placeholder="이동할 메뉴 이름을 입력하세요" aria-label="메뉴 검색"><div class="palette-list" role="listbox"></div></div>', 'palette');
    var input = d.querySelector('input'), list = d.querySelector('.palette-list'), focus = 0, items = [];
    function draw() {
      var q = input.value.trim().toLowerCase();
      items = PAGES.filter(function (p) { return (p[0] + p[1]).toLowerCase().indexOf(q) > -1; });
      focus = Math.max(0, Math.min(focus, items.length - 1));
      list.innerHTML = items.length ? items.map(function (p, i) {
        return '<button type="button" class="palette-opt' + (i === focus ? ' is-focus' : '') + '" data-go="' + p[2] + '">' + p[0] + '<span>' + p[1] + '</span></button>';
      }).join('') : '<p class="palette-empty">찾는 메뉴가 없어요</p>';
    }
    input.addEventListener('input', function () { focus = 0; draw(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); focus = Math.min(focus + 1, items.length - 1); draw(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); focus = Math.max(focus - 1, 0); draw(); }
      if (e.key === 'Enter' && items[focus]) location.href = items[focus][2];
    });
    draw();
  }
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); }
  });

  /* ---------- AI 패널 (시안용 응답) ---------- */
  var ai;
  var ANSWERS = [
    [/공지|글쓰기/, '공지사항은 게시판 › 공지사항에서 등록해요. 상단 고정은 글쓰기 화면의 “공지로 등록”을 켜면 돼요.', 'notice.html'],
    [/메뉴|사이트/, '메뉴 추가는 사이트 › 사이트 관리에서 왼쪽 트리의 메뉴를 고르고 오른쪽 폼을 채워 저장하면 돼요.', 'menu.html'],
    [/콘텐츠|등록/, '콘텐츠 › 콘텐츠 목록에서 노출을 켜고 끌 수 있고, “+ 콘텐츠 등록”으로 새 콘텐츠를 만들 수 있어요.', 'contents.html'],
    [/메타/, '메타데이터 상세에서 “수정”을 누르면 항목 값을 바로 고칠 수 있어요.', 'metadata.html']
  ];
  function toggleAi() {
    if (!ai) {
      ai = document.createElement('section');
      ai.className = 'ai-panel';
      ai.setAttribute('aria-label', 'AI 도우미');
      ai.innerHTML =
        '<div class="ai-head"><span>' + SPARK + 'AI 도우미</span><button type="button" class="icon-btn" data-close aria-label="닫기">' + icon('close', 18) + '</button></div>' +
        '<div class="ai-log" aria-live="polite"><div class="ai-msg ai-msg--bot">안녕하세요, 홍길동님. CMS 사용 중 궁금한 걸 물어보세요.</div>' +
        '<div class="ai-sugs"><button type="button" class="ai-sug">공지 상단 고정은?</button><button type="button" class="ai-sug">메뉴 추가 방법</button><button type="button" class="ai-sug">콘텐츠 노출 끄기</button></div></div>' +
        '<form class="ai-form"><input class="input" placeholder="질문을 입력하세요" aria-label="질문"><button class="btn btn--primary" aria-label="보내기">' + icon('send', 16, 2) + '</button></form>';
      document.body.appendChild(ai);
      var log = ai.querySelector('.ai-log'), input = ai.querySelector('input');
      function ask(q) {
        if (!q.trim()) return;
        log.insertAdjacentHTML('beforeend', '<div class="ai-msg ai-msg--me">' + esc(q) + '</div>');
        var hit = ANSWERS.filter(function (a) { return a[0].test(q); })[0];
        setTimeout(function () {
          log.insertAdjacentHTML('beforeend', '<div class="ai-msg ai-msg--bot">' + (hit ? esc(hit[1]) + '<br><a class="link" style="color:var(--primary);font-weight:700" href="' + hit[2] + '">바로가기 →</a>' : '시안에서는 공지·메뉴·콘텐츠·메타데이터 관련 질문에 답할 수 있어요.') + '</div>');
          log.scrollTop = log.scrollHeight;
        }, 450);
        log.scrollTop = log.scrollHeight;
      }
      ai.querySelector('form').onsubmit = function (e) { e.preventDefault(); ask(input.value); input.value = ''; };
      ai.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) ai.classList.remove('is-open');
        var s = e.target.closest('.ai-sug');
        if (s) ask(s.textContent);
      });
      requestAnimationFrame(function () { ai.classList.add('is-open'); input.focus(); });
      return;
    }
    ai.classList.toggle('is-open');
  }

  /* 범위 밖 메뉴·이동 버튼 */
  document.addEventListener('click', function (e) {
    var soon = e.target.closest('[data-soon]');
    if (soon) { e.preventDefault(); notReady(soon.getAttribute('data-soon')); return; }
    var go = e.target.closest('[data-go]');
    if (go) location.href = go.getAttribute('data-go');
  });

  /* 체크박스 마크업 헬퍼 */
  function checkbox(attrs, label) {
    return '<label class="check"><input type="checkbox" ' + (attrs || '') + '><span class="check-box">' + icon('check', 12, 3) + '</span>' + (label ? '<span' + (label.sr ? ' class="sr-only"' : '') + '>' + esc(label.text || label) + '</span>' : '') + '</label>';
  }

  window.CMS = {
    icon: icon, spark: SPARK, toast: toast, notReady: notReady, confirm: confirmDialog, openDialog: openDialog,
    download: download, countUp: countUp, fmt: fmt, esc: esc, reduced: reduced, pager: pager, store: store, checkbox: checkbox
  };

  renderShell();
  document.querySelectorAll('[data-count]').forEach(countUp);
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    el.innerHTML = icon(el.getAttribute('data-icon'), Number(el.getAttribute('data-size')) || 18, Number(el.getAttribute('data-w')) || 1.8);
  });
})();
