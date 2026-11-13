/* 콘텐츠 목록: 복합 필터·정렬·선택·노출 토글·일괄 작업·엑셀 */
(function () {
  'use strict';
  var C = window.CMS, $ = function (s) { return document.querySelector(s); };

  var TYPE = { '페이지': 'chip--line', '프로그램': 'chip--primary', '게시판': 'chip--green', '외부링크': 'chip--blue' };
  var APPR = { '승인 완료': 'chip--green', '승인 대기': 'chip--amber', '반려': 'chip--red', '임시저장': 'chip--gray' };
  var base = [
    [349, '중구문화원 연혁', '1. 중구소개 › 연혁', '페이지', '김민지', '승인 완료', true, 2184, '2026-10-31'],
    [348, '오시는 길', '1. 중구소개 › 오시는 길', '페이지', '김민지', '승인 완료', true, 1532, '2026-10-30'],
    [347, '2026 하반기 문화강좌', '3. 문화강좌 › 강좌안내', '프로그램', '박서준', '승인 대기', false, 0, '2026-10-30'],
    [346, '행사참여 신청 안내', '2. 소통과 참여 › 행사참여', '페이지', '이하늘', '승인 완료', true, 874, '2026-10-28'],
    [345, '제안/의견 접수', '2. 소통과 참여 › 제안/의견', '게시판', '이하늘', '승인 완료', true, 612, '2026-10-27'],
    [344, '지역문화 아카이브', '4. 향토사료 › 아카이브', '외부링크', '박서준', '반려', false, 96, '2026-10-21'],
    [343, '문화유산 해설 프로그램', '3. 문화강좌 › 해설 프로그램', '프로그램', '김민지', '임시저장', false, 0, '2026-10-20'],
    [342, '개인정보처리방침', '푸터 › 정책', '페이지', '관리자', '승인 완료', true, 403, '2026-10-15']
  ];
  var NAMES = ['인사말', '조직도', '시설 안내', '대관 신청', '동아리 소개', '전시 안내', '향토 인물', '사진 자료실', '자주 묻는 질문', '이용약관'];
  var MENUS = ['1. 중구소개', '2. 소통과 참여', '3. 문화강좌', '4. 향토사료', '푸터'];
  var TYPES = Object.keys(TYPE), APPRS = Object.keys(APPR), OWN = ['김민지', '박서준', '이하늘', '관리자'];
  for (var n = 341; n >= 1; n--) {
    var d = new Date(2026, 9, 14); d.setDate(d.getDate() - Math.floor((341 - n) / 30));
    var nm = NAMES[n % NAMES.length], mn = MENUS[n % MENUS.length], ap = n % 11 === 0 ? '승인 대기' : n % 17 === 0 ? '반려' : n % 23 === 0 ? '임시저장' : '승인 완료';
    base.push([n, nm + ' ' + n, mn + ' › ' + nm, TYPES[n % 7 === 0 ? 1 : n % 9 === 0 ? 2 : n % 13 === 0 ? 3 : 0], OWN[n % 4], ap, ap === '승인 완료' && n % 6 !== 0, (n * 53) % 1800, d.toISOString().slice(0, 10)]);
  }
  var rows = base.map(function (r) { return { no: r[0], title: r[1], path: r[2], type: r[3], owner: r[4], appr: r[5], on: r[6], views: r[7], mod: r[8] }; });

  var st = { menu: '', type: '', appr: '', owner: '', from: '', to: '', q: '', sort: 'mod', dir: -1, per: 10, page: 1, sel: { 349: 1, 348: 1, 347: 1 } };

  function list() {
    var q = st.q.toLowerCase();
    return rows.filter(function (r) {
      if (st.menu && r.path.indexOf(st.menu) !== 0) return false;
      if (st.type && r.type !== st.type) return false;
      if (st.appr && r.appr !== st.appr) return false;
      if (st.owner && r.owner !== st.owner) return false;
      if (st.from && r.mod < st.from) return false;
      if (st.to && r.mod > st.to) return false;
      if (q && (r.title + r.path).toLowerCase().indexOf(q) < 0) return false;
      return true;
    }).sort(function (a, b) { var x = a[st.sort], y = b[st.sort]; return x > y ? st.dir : x < y ? -st.dir : b.no - a.no; });
  }
  function sel() { return Object.keys(st.sel).map(Number); }

  function draw() {
    var L = list(), pages = Math.max(1, Math.ceil(L.length / st.per));
    st.page = Math.min(st.page, pages);
    var s0 = (st.page - 1) * st.per, slice = L.slice(s0, s0 + st.per);
    $('#total').textContent = C.fmt(L.length);
    $('#rows').innerHTML = slice.length ? slice.map(function (r) {
      var on = !!st.sel[r.no];
      return '<tr class="' + (on ? 'is-checked' : '') + '" data-no="' + r.no + '">' +
        '<td>' + C.checkbox('data-row' + (on ? ' checked' : ''), { text: r.title + ' 선택', sr: true }) + '</td>' +
        '<td class="num">' + r.no + '</td>' +
        '<td class="is-left"><a class="t-title" href="content-write.html?no=' + r.no + '">' + C.esc(r.title) + '</a><span class="t-sub">' + C.esc(r.path) + '</span></td>' +
        '<td><span class="chip ' + TYPE[r.type] + '">' + r.type + '</span></td>' +
        '<td style="text-align:left;padding-left:20px"><span class="mono">' + r.owner[0] + '</span>' + r.owner + '</td>' +
        '<td><span class="chip ' + APPR[r.appr] + '">' + r.appr + '</span></td>' +
        '<td><label class="switch"><input type="checkbox" data-on' + (r.on ? ' checked' : '') + (r.appr !== '승인 완료' ? ' disabled' : '') + ' aria-label="' + C.esc(r.title) + ' 노출"><span class="switch-track"></span></label></td>' +
        '<td class="is-right num">' + C.fmt(r.views) + '</td><td class="num">' + r.mod.replace(/-/g, '.') + '</td>' +
        '<td><a class="more-btn" href="content-write.html?no=' + r.no + '" aria-label="' + C.esc(r.title) + ' 수정">' + C.icon('edit', 16) + '</a><button type="button" class="more-btn" data-del aria-label="' + C.esc(r.title) + ' 삭제">' + C.icon('trash', 16) + '</button></td></tr>';
    }).join('') : '<tr><td colspan="10" class="empty">조건에 맞는 콘텐츠가 없어요. 필터를 바꿔보세요.</td></tr>';
    $('#range').textContent = L.length ? (s0 + 1) + '-' + (s0 + slice.length) + ' / ' + C.fmt(L.length) + '건' : '0건';
    C.pager($('#pager'), st.page, pages, function (p) { st.page = p; draw(); window.scrollTo({ top: 0, behavior: C.reduced ? 'auto' : 'smooth' }); });

    var ids = slice.map(function (r) { return r.no; }), k = ids.filter(function (i) { return st.sel[i]; }).length;
    $('#th-all').innerHTML = C.checkbox('id="chk-all"', { text: '현재 페이지 전체 선택', sr: true });
    var all = $('#chk-all');
    all.checked = ids.length && k === ids.length; all.indeterminate = k > 0 && k < ids.length;
    all.onchange = function () { ids.forEach(function (i) { if (all.checked) st.sel[i] = 1; else delete st.sel[i]; }); draw(); };
    var c = sel().length;
    $('#sel-count').textContent = c ? c + '개 선택됨' : '';
    document.querySelectorAll('[data-bulk]').forEach(function (b) { b.disabled = !c; });
  }

  $('#rows').addEventListener('change', function (e) {
    var tr = e.target.closest('tr'), no = Number(tr.getAttribute('data-no')), r = rows.filter(function (x) { return x.no === no; })[0];
    if (e.target.matches('[data-row]')) { if (e.target.checked) st.sel[no] = 1; else delete st.sel[no]; draw(); }
    if (e.target.matches('[data-on]')) { r.on = e.target.checked; C.toast('\'' + r.title + '\' 노출을 ' + (r.on ? '켰어요' : '껐어요')); }
  });
  $('#rows').addEventListener('click', function (e) {
    if (!e.target.closest('[data-del]')) return;
    var no = Number(e.target.closest('tr').getAttribute('data-no')), r = rows.filter(function (x) { return x.no === no; })[0];
    C.confirm({ title: '콘텐츠를 휴지통으로 보낼까요?', text: r.title, ok: '삭제', danger: true }).then(function (ok) {
      if (!ok) return; rows = rows.filter(function (x) { return x !== r; }); delete st.sel[no]; draw(); C.toast('휴지통으로 보냈어요');
    });
  });

  document.querySelectorAll('[data-bulk]').forEach(function (b) {
    b.onclick = function () {
      var ids = sel(), act = b.getAttribute('data-bulk'), pick = rows.filter(function (r) { return ids.indexOf(r.no) > -1; });
      if (act === 'on' || act === 'off') {
        var skip = 0;
        pick.forEach(function (r) { if (r.appr !== '승인 완료' && act === 'on') skip++; else r.on = act === 'on'; });
        draw(); C.toast((pick.length - skip) + '개 노출을 ' + (act === 'on' ? '켰어요' : '껐어요') + (skip ? ' · 미승인 ' + skip + '개 제외' : ''), skip ? 'warn' : 'ok');
      }
      if (act === 'owner') {
        var d = C.openDialog('<div class="dialog-body"><h2 class="dialog-title">담당자 변경</h2><p class="dialog-text">선택한 ' + ids.length + '개 콘텐츠의 담당자를 바꿔요.</p><div style="margin-top:18px"><select class="select" id="new-owner">' + OWN.map(function (o) { return '<option>' + o + '</option>'; }).join('') + '</select></div></div><div class="dialog-foot"><button type="button" class="btn btn--secondary" data-no>취소</button><button type="button" class="btn btn--primary" data-yes>변경</button></div>');
        d.querySelector('[data-no]').onclick = function () { d.close(); };
        d.querySelector('[data-yes]').onclick = function () { var o = d.querySelector('#new-owner').value; pick.forEach(function (r) { r.owner = o; }); d.close(); draw(); C.toast('담당자를 ' + o + '(으)로 바꿨어요'); };
      }
      if (act === 'del') C.confirm({ title: ids.length + '개 콘텐츠를 휴지통으로 보낼까요?', text: '휴지통에서 30일 안에 복구할 수 있어요.', ok: '삭제', danger: true }).then(function (ok) {
        if (!ok) return; rows = rows.filter(function (r) { return ids.indexOf(r.no) < 0; }); st.sel = {}; draw(); C.toast(ids.length + '개를 휴지통으로 보냈어요');
      });
    };
  });

  function readFilters() {
    var f = new FormData($('#filters'));
    ['menu', 'type', 'appr', 'owner', 'from', 'to', 'q'].forEach(function (k) { st[k] = String(f.get(k) || '').trim(); });
    st.page = 1;
  }
  $('#filters').addEventListener('submit', function (e) { e.preventDefault(); readFilters(); draw(); C.toast('검색 결과 ' + C.fmt(list().length) + '건'); });
  $('#filters').addEventListener('reset', function () { setTimeout(function () { $('#filters [name=from]').value = ''; $('#filters [name=to]').value = ''; readFilters(); draw(); }, 0); });
  $('#sort').onchange = function () { var v = this.value.split(':'); st.sort = v[0]; st.dir = Number(v[1]); draw(); };
  $('#per').onchange = function () { st.per = Number(this.value); st.page = 1; draw(); };
  $('#btn-excel').onclick = function () {
    var L = list();
    C.download('콘텐츠목록_' + new Date().toISOString().slice(0, 10) + '.csv', [['No', '콘텐츠명', '메뉴 위치', '유형', '담당자', '승인 상태', '노출', '조회수', '수정일']].concat(L.map(function (r) { return [r.no, r.title, r.path, r.type, r.owner, r.appr, r.on ? 'Y' : 'N', r.views, r.mod]; })));
    C.toast(L.length + '건을 엑셀(CSV)로 내려받았어요');
  };

  readFilters();
  draw();
})();
