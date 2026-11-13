/* 미디어 관리: 분류 탭 · 전체 선택 · 선택 삭제 */
(function () {
  'use strict';
  var C = window.CMS;
  var tbody = document.getElementById('rows');
  var all = document.getElementById('check-all');
  var selCount = document.getElementById('sel-count');
  var bulkDel = document.getElementById('bulk-del');

  function visibleChecks() {
    return Array.prototype.filter.call(tbody.querySelectorAll('[data-row]'), function (c) { return !c.closest('tr').hidden; });
  }
  function sync() {
    var rows = visibleChecks();
    var n = rows.filter(function (c) { return c.checked; }).length;
    tbody.querySelectorAll('[data-row]').forEach(function (c) { c.closest('tr').classList.toggle('is-checked', c.checked); });
    all.checked = n > 0 && n === rows.length;
    all.indeterminate = n > 0 && n < rows.length;
    selCount.textContent = n ? n + '개 선택됨' : '';
    bulkDel.disabled = n === 0;
  }
  all.addEventListener('change', function () { visibleChecks().forEach(function (c) { c.checked = all.checked; }); sync(); });
  tbody.addEventListener('change', function (e) { if (e.target.matches('[data-row]')) sync(); });

  // 분류 탭 (실제 적용 시 서버 조회로 바꾸세요)
  var tabs = document.getElementById('tabs');
  tabs.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab');
    if (!tab) return;
    tabs.querySelectorAll('.tab').forEach(function (t) { t.classList.toggle('is-active', t === tab); t.setAttribute('aria-selected', String(t === tab)); });
    var type = tab.getAttribute('data-tab');
    tbody.querySelectorAll('tr').forEach(function (tr) {
      tr.hidden = type !== 'all' && tr.getAttribute('data-type') !== type;
      if (tr.hidden) tr.querySelector('[data-row]').checked = false;
    });
    sync();
  });

  bulkDel.addEventListener('click', function () {
    var picked = visibleChecks().filter(function (c) { return c.checked; });
    C.confirm({ title: '선택한 미디어 ' + picked.length + '개를 삭제할까요?', text: '콘텐츠에 넣어 둔 미디어도 함께 사라져요.', ok: '삭제', danger: true }).then(function (yes) {
      if (!yes) return;
      picked.forEach(function (c) { c.closest('tr').remove(); });
      var count = document.getElementById('count');
      count.textContent = Number(count.textContent) - picked.length;
      sync();
      C.toast('미디어 ' + picked.length + '개를 삭제했어요');
    });
  });

  document.getElementById('filters').addEventListener('submit', function (e) { e.preventDefault(); C.toast('검색 조건을 적용했어요'); });
  sync();
})();
