/* 게시판 등록: 접이식 섹션 · 파일명 표시 · 필수값 확인 */
(function () {
  'use strict';
  var C = window.CMS;

  document.querySelectorAll('[data-fold]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });

  var file = document.getElementById('bbsTopImg');
  var fileName = document.getElementById('bbsTopImgName');
  file.addEventListener('change', function () {
    var f = file.files && file.files[0];
    fileName.textContent = f ? f.name : '선택된 파일 없음';
    fileName.classList.toggle('is-set', !!f);
  });

  var form = document.getElementById('bbs-form');
  var name = document.getElementById('bbsNm');
  name.addEventListener('input', function () { name.classList.remove('is-invalid'); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      name.focus();
      C.toast('게시판명을 입력하세요', 'warn');
      return;
    }
    C.toast('게시판을 저장했어요');
  });
})();
