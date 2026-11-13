/* 대시보드: 운영정보·접속자·차트(SVG)·관리 이력·게시판 현황 */
(function () {
  'use strict';
  var C = window.CMS, $ = function (s) { return document.querySelector(s); };
  var NS = 'http://www.w3.org/2000/svg';

  var d = new Date();
  $('#today-label').textContent = d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0') + ' 기준';

  /* ---------- 알림소식 ---------- */
  var notices = [['오늘의 공지사항 안내드립니다', '2025-01-15'], ['홈페이지 시스템 정기 점검 안내 (11/8 02:00~06:00)', '2026-11-02'], ['[안내] 2026 하반기 문화강좌 수강생 모집', '2026-10-28']];
  var ni = 0;
  function drawNotice() { $('#notice-text').innerHTML = '<b>' + C.esc(notices[ni][0]) + '</b><span>' + notices[ni][1] + '</span>'; }
  $('#notice-prev').onclick = function () { ni = (ni + notices.length - 1) % notices.length; drawNotice(); };
  $('#notice-next').onclick = function () { ni = (ni + 1) % notices.length; drawNotice(); };
  drawNotice();

  /* ---------- 운영정보 ---------- */
  var STATS = [
    ['회원수', 10, '#635bff', 'users', null],
    ['미디어', 26, '#0e9f6e', 'image', 'content-write.html'],
    ['게시물수', 132, '#c04fd8', 'doc', 'notice.html'],
    ['컨텐츠개수', 63, '#e8890c', 'chat', 'contents.html']
  ];
  $('#stat-tiles').innerHTML = STATS.map(function (s) {
    var inner = '<span class="stat-label" style="color:' + s[2] + '"><span class="stat-ic" style="background:' + s[2] + '1f">' + C.icon(s[3], 16, 2) + '</span>' + s[0] + '</span>' +
      '<span class="stat-value num" data-count="' + s[1] + '">0</span>';
    return s[4] ? '<a class="stat-tile" href="' + s[4] + '">' + inner + '</a>' : '<div class="stat-tile">' + inner + '</div>';
  }).join('');
  document.querySelectorAll('#stat-tiles [data-count]').forEach(C.countUp);

  /* ---------- 오늘 접속자 ---------- */
  $('#visitors').innerHTML = '<li class="visitor"><span class="visitor-dot"></span><div><b>홍길동(yoon123)</b><p>마지막 접속시간 : 2026-11-04 17:06</p></div></li>';

  /* ---------- 차트 공통 ---------- */
  function svg(host, w, h) {
    host.innerHTML = '';
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    s.setAttribute('role', 'img');
    host.appendChild(s);
    var tip = document.createElement('div');
    tip.className = 'chart-tip';
    host.appendChild(tip);
    return { s: s, tip: tip };
  }
  function el(parent, tag, attrs, text) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    parent.appendChild(n);
    return n;
  }
  function showTip(c, host, x, y, html) {
    var r = host.getBoundingClientRect(), vb = c.s.viewBox.baseVal;
    c.tip.style.left = (x / vb.width * r.width) + 'px';
    c.tip.style.top = (y / vb.height * r.height) + 'px';
    c.tip.innerHTML = html;
    c.tip.classList.add('is-on');
  }

  /* ---------- 데이터 (페이지 뷰 필터별) ---------- */
  var DATA = {
    all: {
      donut: [['Home', 14, '#635bff'], ['설문조사', 1, '#b9b4ff']],
      week: { labels: ['Home', '설문조사', '백운커뮤니티센터', '안양시', '센터1', '탭(TAB) 콘텐츠', '일반형 게시판', '이미지 게시판', 'Q&A 게시판', '일정형 게시판', '3 Depth', '전체 일반형', '전체 이미지', '전체 FAQ', '게시판2'], values: [240, 4, 10, 6, 3, 18, 4, 3, 8, 25, 5, 4, 6, 5, 4] },
      month: { labels: ['Home', '게시판1', '설문조사', '청계동', '회원', '테스트메뉴', '게시게시', '2 Depth(1)', '답글형 게시판', '동영상 게시판', 'FAQ 게시판', '링크형 게시판', '기업정보', '전체 답글형', '전체 동영상', '전체 FAQ', '게시판2', '서브', '공지사항'], values: [720, 6, 4, 3, 65, 0, 15, 10, 18, 4, 2, 1, 3, 2, 5, 1, 0, 1, 0] }
    },
    board: {
      donut: [['일반형 게시판', 9, '#635bff'], ['공지사항', 4, '#8f89ff'], ['FAQ', 2, '#c9c6ff']],
      week: { labels: ['일반형 게시판', '이미지 게시판', 'Q&A 게시판', '일정형 게시판', '전체 FAQ', '게시판2', '공지사항'], values: [64, 22, 18, 30, 12, 9, 41] },
      month: { labels: ['게시판1', '답글형', '동영상', 'FAQ', '링크형', '공지사항', '게시판2'], values: [180, 96, 44, 72, 20, 210, 38] }
    },
    content: {
      donut: [['중구원 연혁', 6, '#635bff'], ['오시는 길', 5, '#8f89ff'], ['기타', 4, '#c9c6ff']],
      week: { labels: ['연혁', '오시는 길', '문화강좌', '행사참여', '아카이브', '개인정보처리방침'], values: [48, 39, 61, 22, 15, 9] },
      month: { labels: ['연혁', '오시는 길', '문화강좌', '행사참여', '아카이브', '처리방침'], values: [320, 280, 410, 150, 96, 60] }
    }
  };

  function donut(set) {
    var host = $('#chart-donut'), W = 300, H = 260, c = svg(host, W, H), cx = 150, cy = 130, R = 104, r = 66;
    var total = set.reduce(function (a, s) { return a + s[1]; }, 0), a0 = -Math.PI / 2;
    set.forEach(function (s) {
      var a1 = a0 + s[1] / total * Math.PI * 2, gap = set.length > 1 ? 0.015 : 0;
      var p = function (a, rr) { return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; };
      var A = p(a0 + gap, R), B = p(a1 - gap, R), D = p(a1 - gap, r), E = p(a0 + gap, r), lg = a1 - a0 > Math.PI ? 1 : 0;
      var path = el(c.s, 'path', { d: 'M' + A + ' A' + R + ' ' + R + ' 0 ' + lg + ' 1 ' + B + ' L' + D + ' A' + r + ' ' + r + ' 0 ' + lg + ' 0 ' + E + 'Z', fill: s[2], 'class': 'donut-seg' });
      var mid = (a0 + a1) / 2, L = p(mid, (R + r) / 2), pct = (s[1] / total * 100).toFixed(1) + '%';
      if (s[1] / total > 0.05) el(c.s, 'text', { x: L[0], y: L[1] + 4, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700, fill: '#fff', style: s[1] / total > 0.3 ? '' : 'fill:var(--primary-ink)', 'pointer-events': 'none' }, pct);
      path.addEventListener('mousemove', function () { showTip(c, host, L[0], L[1], s[0] + ' · ' + s[1] + '회 (' + pct + ')'); });
      path.addEventListener('mouseleave', function () { c.tip.classList.remove('is-on'); });
      a0 = a1;
    });
    var center = document.createElement('div');
    center.className = 'donut-center';
    center.innerHTML = '<div><b class="num">' + total + '회</b><span>금일 접속</span></div>';
    host.appendChild(center);
    $('#donut-legend').innerHTML = set.map(function (s) { return '<span><i style="background:' + s[2] + '"></i>' + C.esc(s[0]) + '</span>'; }).join('');
  }

  function axes(c, W, gx, gy, gw, gh, max, steps) {
    for (var i = 0; i <= steps; i++) {
      var v = Math.round(max / steps * i), y = gy + gh - gh * i / steps;
      el(c.s, 'line', { x1: gx, x2: gx + gw, y1: y, y2: y, style: 'stroke:var(--chart-grid)' });
      el(c.s, 'text', { x: gx - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 11, style: 'fill:var(--muted)' }, v);
    }
  }
  function labels(c, list, xs, y) {
    list.forEach(function (t, i) {
      var g = el(c.s, 'text', { x: xs[i], y: y, 'text-anchor': 'end', 'font-size': 11, style: 'fill:var(--muted)', transform: 'rotate(-40 ' + xs[i] + ' ' + y + ')' }, t.length > 8 ? t.slice(0, 8) + '…' : t);
      el(g, 'title', {}, t);
    });
  }
  function niceMax(v) { var m = Math.pow(10, Math.floor(Math.log10(v || 1))); return Math.ceil(v / m) * m; }

  function line(set) {
    var host = $('#chart-line'), W = 420, H = 260, c = svg(host, W, H), gx = 36, gy = 12, gw = W - gx - 8, gh = 160;
    var max = niceMax(Math.max.apply(null, set.values)), n = set.values.length;
    axes(c, W, gx, gy, gw, gh, max, 4);
    var xs = set.values.map(function (_, i) { return gx + 8 + i * (gw - 16) / (n - 1); });
    var ys = set.values.map(function (v) { return gy + gh - v / max * gh; });
    var d = xs.map(function (x, i) { return (i ? 'L' : 'M') + x + ' ' + ys[i]; }).join(' ');
    el(c.s, 'path', { d: d + ' L' + xs[n - 1] + ' ' + (gy + gh) + ' L' + xs[0] + ' ' + (gy + gh) + 'Z', fill: '#635bff', 'fill-opacity': .08 });
    var p = el(c.s, 'path', { d: d, fill: 'none', stroke: '#635bff', 'stroke-width': 2, 'stroke-linejoin': 'round' });
    if (!C.reduced) {
      var len = p.getTotalLength();
      p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
      p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)';
      p.style.strokeDashoffset = 0;
    }
    xs.forEach(function (x, i) {
      var dot = el(c.s, 'circle', { cx: x, cy: ys[i], r: 3, style: 'fill:var(--surface)', stroke: '#635bff', 'stroke-width': 1.5 });
      var hit = el(c.s, 'rect', { x: x - 10, y: gy, width: 20, height: gh, fill: 'transparent' });
      hit.addEventListener('mousemove', function () { dot.setAttribute('r', 5); showTip(c, host, x, ys[i], C.esc(set.labels[i]) + ' · ' + C.fmt(set.values[i]) + '명'); });
      hit.addEventListener('mouseleave', function () { dot.setAttribute('r', 3); c.tip.classList.remove('is-on'); });
    });
    labels(c, set.labels, xs, gy + gh + 16);
  }

  function bar(set) {
    var host = $('#chart-bar'), W = 420, H = 260, c = svg(host, W, H), gx = 36, gy = 12, gw = W - gx - 8, gh = 160;
    var max = niceMax(Math.max.apply(null, set.values)), n = set.values.length, bw = gw / n;
    axes(c, W, gx, gy, gw, gh, max, 4);
    var top = set.values.indexOf(Math.max.apply(null, set.values));
    var xs = [];
    set.values.forEach(function (v, i) {
      var h = Math.max(v / max * gh, v ? 2 : 0), x = gx + i * bw + bw * 0.22, w = bw * 0.56;
      xs.push(x + w / 2);
      var r = el(c.s, 'rect', { x: x, y: gy + gh - h, width: w, height: h, rx: 2, fill: i === top ? '#635bff' : '#a9a4ff', 'class': 'bar-rect' });
      if (!C.reduced) { r.style.transformOrigin = (x + w / 2) + 'px ' + (gy + gh) + 'px'; r.style.transform = 'scaleY(0)'; r.style.transition = 'transform .7s cubic-bezier(.2,.7,.2,1) ' + (i * 25) + 'ms'; requestAnimationFrame(function () { requestAnimationFrame(function () { r.style.transform = 'scaleY(1)'; }); }); }
      var hit = el(c.s, 'rect', { x: gx + i * bw, y: gy, width: bw, height: gh, fill: 'transparent' });
      hit.addEventListener('mousemove', function () { showTip(c, host, x + w / 2, gy + gh - h, C.esc(set.labels[i]) + ' · ' + C.fmt(v) + '명'); });
      hit.addEventListener('mouseleave', function () { c.tip.classList.remove('is-on'); });
    });
    labels(c, set.labels, xs, gy + gh + 16);
  }

  function drawCharts() {
    var key = $('#pv-filter').value, set = DATA[key];
    donut(set.donut); line(set.week); bar(set.month);
  }
  $('#pv-filter').onchange = function () { drawCharts(); C.toast('페이지 뷰 현황: ' + this.options[this.selectedIndex].text); };
  drawCharts();
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { document.querySelectorAll('.chart-tip').forEach(function (t) { t.classList.remove('is-on'); }); }, 100); });

  /* ---------- 관리 이력 ---------- */
  var HISTORY = {
    post: [['1', '2026-06-12 18:30'], ['ㅇㅇㅇ', '2026-05-18 10:53'], ['에디터 테스트 입니다.', '2026-01-06 17:14'], ['테스트게시글', '2025-12-02 17:08']],
    content: [['중구문화원 연혁', '2026-10-31 14:20'], ['오시는 길', '2026-10-30 09:12'], ['2026 하반기 문화강좌', '2026-10-30 08:47'], ['행사참여 신청 안내', '2026-10-28 16:05']]
  };
  function drawHistory(k) {
    $('#history').innerHTML = HISTORY[k].map(function (h) {
      return '<li><a class="h-title" href="' + (k === 'post' ? 'notice.html' : 'contents.html') + '">' + C.esc(h[0]) + '</a><time class="num">' + h[1] + '</time></li>';
    }).join('');
  }
  $('#history-tabs').addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab]');
    if (!t) return;
    this.querySelectorAll('.tab').forEach(function (b) { var on = b === t; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); });
    drawHistory(t.getAttribute('data-tab'));
  });
  drawHistory('post');

  /* ---------- 게시판별 등록글 ---------- */
  var BOARDS = [['일반형', 70], ['답글형', 21], ['이미지', 8], ['동영상', 3], ['Q&A', 5], ['FAQ', 11], ['일정형', 9], ['링크형', 5]];
  $('#board-total').textContent = '총 ' + BOARDS.reduce(function (a, b) { return a + b[1]; }, 0) + '개';
  $('#board-grid').innerHTML = BOARDS.map(function (b) {
    return '<a class="board-cell" href="notice.html"><span>' + b[0] + '</span><b class="num" data-count="' + b[1] + '">0</b></a>';
  }).join('');
  document.querySelectorAll('#board-grid [data-count]').forEach(C.countUp);
})();
