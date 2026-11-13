/* 댓글 관리: 메뉴 트리(열기·닫기·선택·키보드) · 댓글 삭제 */
(function () {
  'use strict';
  var C = window.CMS;
  var tree = document.getElementById('tree');
  var selLabel = document.getElementById('sel-menu');

  function setOpen(row, open) {
    var kids = row.nextElementSibling;
    if (!kids || !kids.classList.contains('tree-kids')) return;
    kids.classList.toggle('is-open', open);
    row.setAttribute('aria-expanded', String(open));
    row.querySelector('.tree-toggle').classList.toggle('is-open', open);
  }
  function select(row) {
    tree.querySelectorAll('.tree-row.is-selected').forEach(function (r) {
      r.classList.remove('is-selected'); r.setAttribute('aria-selected', 'false'); r.tabIndex = -1;
    });
    row.classList.add('is-selected'); row.setAttribute('aria-selected', 'true'); row.tabIndex = 0;
    selLabel.textContent = row.querySelector('.tree-label').textContent;
  }

  tree.addEventListener('click', function (e) {
    var row = e.target.closest('.tree-row');
    if (!row) return;
    if (e.target.closest('[data-toggle]')) { setOpen(row, row.getAttribute('aria-expanded') !== 'true'); return; }
    select(row);
  });
  tree.addEventListener('keydown', function (e) {
    var row = e.target.closest('.tree-row');
    if (!row) return;
    var rows = Array.prototype.filter.call(tree.querySelectorAll('.tree-row'), function (r) { return r.offsetParent; });
    var i = rows.indexOf(row);
    if (e.key === 'ArrowDown' && rows[i + 1]) { e.preventDefault(); rows[i + 1].focus(); }
    else if (e.key === 'ArrowUp' && rows[i - 1]) { e.preventDefault(); rows[i - 1].focus(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setOpen(row, true); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); setOpen(row, false); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(row); }
  });
  tree.addEventListener('focusin', function (e) {
    var row = e.target.closest('.tree-row');
    if (row) tree.querySelectorAll('.tree-row').forEach(function (r) { r.tabIndex = r === row ? 0 : -1; });
  });

  document.getElementById('btn-open').onclick = function () {
    tree.querySelectorAll('.tree-row[aria-expanded]').forEach(function (r) { setOpen(r, true); });
  };
  document.getElementById('btn-close').onclick = function () {
    tree.querySelectorAll('.tree-row[aria-expanded]').forEach(function (r, i) { setOpen(r, i === 0); }); // 최상위 '전체'는 열어 둠
  };

  document.getElementById('filters').addEventListener('submit', function (e) { e.preventDefault(); C.toast('검색 조건을 적용했어요'); });

  document.getElementById('rows').addEventListener('click', function (e) {
    if (e.target.closest('[data-view]')) { C.notReady('댓글 상세'); return; }
    var del = e.target.closest('[data-del]');
    if (!del) return;
    var tr = del.closest('tr');
    C.confirm({ title: '댓글을 삭제할까요?', text: '삭제한 댓글은 복구할 수 없어요.', ok: '삭제', danger: true }).then(function (yes) {
      if (!yes) return;
      tr.remove();
      var count = document.getElementById('count');
      count.textContent = Number(count.textContent) - 1;
      C.toast('댓글을 삭제했어요');
    });
  });
})();
