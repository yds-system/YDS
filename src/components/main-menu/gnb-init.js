/* ─── GNB 초기화 공통 ─────────────────────────────────────────────────────────
   layout.stories.js 와 main-menu.stories.js 양쪽에서 import해서 사용한다.
   ─────────────────────────────────────────────────────────────────────────── */

export function initPcGnb(root) {
  const triggers  = Array.from(root.querySelectorAll('.ds-main-menu .ds-main-menu__trigger:not(.ds-main-menu__trigger--link)'));
  const backdrop  = root.querySelector('.ds-main-menu__backdrop');
  let currentOpen = null;

  function openMenu(trigger) {
    if (currentOpen && currentOpen !== trigger) closeMenu(currentOpen);
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = panelId ? root.querySelector(`#${panelId}`) : null;
    if (!panel) return;

    trigger.classList.add('ds-main-menu__trigger--open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.classList.add('ds-main-menu__dropdown--open');
    if (backdrop) backdrop.classList.add('ds-main-menu__backdrop--open');

    /* 첫 번째 sub-trigger 활성화 */
    const firstSub = panel.querySelector('.ds-main-menu__sub-trigger');
    if (firstSub) activateSub(panel, firstSub);
    currentOpen = trigger;
  }

  function closeMenu(trigger) {
    if (!trigger) return;
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = panelId ? root.querySelector(`#${panelId}`) : null;
    trigger.classList.remove('ds-main-menu__trigger--open');
    trigger.setAttribute('aria-expanded', 'false');
    if (panel) {
      panel.classList.remove('ds-main-menu__dropdown--open');
      panel.querySelectorAll('.ds-main-menu__sub-trigger').forEach(s => deactivateSub(s));
      panel.querySelectorAll('.ds-main-menu__sub-list').forEach(l => l.classList.remove('ds-main-menu__sub-list--open'));
    }
    if (backdrop) backdrop.classList.remove('ds-main-menu__backdrop--open');
    currentOpen = null;
  }

  function activateSub(panel, subTrigger) {
    panel.querySelectorAll('.ds-main-menu__sub-trigger').forEach(s => {
      s.classList.remove('ds-main-menu__sub-trigger--open');
      s.setAttribute('aria-expanded', 'false');
    });
    panel.querySelectorAll('.ds-main-menu__sub-list').forEach(l => l.classList.remove('ds-main-menu__sub-list--open'));

    subTrigger.classList.add('ds-main-menu__sub-trigger--open');
    const subPanelId = subTrigger.getAttribute('aria-controls');
    const subPanel   = subPanelId ? root.querySelector(`#${subPanelId}`) : null;
    if (subPanel) {
      subPanel.classList.add('ds-main-menu__sub-list--open');
      subTrigger.setAttribute('aria-expanded', 'true');
    }
  }

  function deactivateSub(subTrigger) {
    subTrigger.classList.remove('ds-main-menu__sub-trigger--open');
    subTrigger.setAttribute('aria-expanded', 'false');
  }

  /* 클릭 이벤트 */
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (trigger.classList.contains('ds-main-menu__trigger--open')) {
        closeMenu(trigger);
      } else {
        openMenu(trigger);
      }
    });

    /* 키보드 이벤트 */
    trigger.addEventListener('keydown', (e) => {
      const idx = triggers.indexOf(trigger);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = triggers[(idx + 1) % triggers.length];
        next.focus();
        openMenu(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = triggers[(idx - 1 + triggers.length) % triggers.length];
        prev.focus();
        openMenu(prev);
      } else if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu(trigger);
        const panelId = trigger.getAttribute('aria-controls');
        const panel   = panelId ? root.querySelector(`#${panelId}`) : null;
        if (panel) {
          const firstSub = panel.querySelector('.ds-main-menu__sub-trigger');
          if (firstSub) firstSub.focus();
        }
      } else if (e.key === 'Escape') {
        closeMenu(trigger);
        trigger.focus();
      }
    });
  });

  /* 서브 트리거 키보드 */
  root.querySelectorAll('.ds-main-menu .ds-main-menu__sub-trigger:not(.ds-main-menu__sub-trigger--link)').forEach(sub => {
    sub.addEventListener('mouseenter', () => {
      const panel = sub.closest('.ds-main-menu__dropdown');
      if (panel && panel.classList.contains('ds-main-menu__dropdown--open')) activateSub(panel, sub);
    });

    sub.addEventListener('keydown', (e) => {
      const panel    = sub.closest('.ds-main-menu__dropdown');
      const allSubs  = panel ? Array.from(panel.querySelectorAll('.ds-main-menu__sub-trigger')) : [];
      const idx      = allSubs.indexOf(sub);
      const mainTrig = panel ? triggers.find(t => t.getAttribute('aria-controls') === panel.id) : null;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        allSubs[(idx + 1) % allSubs.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx === 0) { mainTrig?.focus(); }
        else { allSubs[idx - 1]?.focus(); }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu(mainTrig);
        mainTrig?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateSub(panel, sub);
      }
    });
  });

  /* 백드롭 클릭 */
  if (backdrop) backdrop.addEventListener('click', () => closeMenu(currentOpen));

  /* 외부 클릭 닫기 */
  document.addEventListener('click', (e) => {
    if (currentOpen && !e.target.closest('#ds-header')) closeMenu(currentOpen);
  });
}

export function initMobileGnb(root) {
  const allBtn    = root.querySelector('.ds-header__action-btn.ds-header__action-btn--all-menu');
  const closeBtn  = root.querySelector('#close-nav');
  const mobileNav = root.querySelector('#mobile-nav');
  if (!mobileNav) return;

  function openNav() {
    mobileNav.classList.add('ds-main-menu-mobile--open', 'ds-main-menu-mobile--backdrop');
    if (allBtn) allBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeNav() {
    mobileNav.classList.remove('ds-main-menu-mobile--open', 'ds-main-menu-mobile--backdrop');
    if (allBtn) allBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    allBtn?.focus();
  }

  allBtn?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);

  /* Escape 키 닫기 */
  mobileNav.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* dim(::after) 클릭 닫기 */
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });

  /* 1depth 탭 클릭 → 해당 submenu 스크롤 */
  const mainTriggers = Array.from(mobileNav.querySelectorAll('.ds-main-menu-mobile__nav-list .ds-main-menu-mobile__trigger'));
  const submenuWrap  = mobileNav.querySelector('.ds-main-menu-mobile__sub-panel');

  mainTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const idx    = trigger.dataset.index;
      const target = mobileNav.querySelector(`#mGnb-anchor${idx}`);
      if (!target || !submenuWrap) return;

      /* active 클래스 갱신 */
      mainTriggers.forEach(t => t.classList.remove('ds-main-menu-mobile__trigger--open'));
      trigger.classList.add('ds-main-menu-mobile__trigger--open');

      /* ds-main-menu-mobile__sub-panel 기준 스크롤 */
      submenuWrap.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    });

    /* 키보드 화살표 탐색 */
    trigger.addEventListener('keydown', (e) => {
      const idx = mainTriggers.indexOf(trigger);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        mainTriggers[(idx + 1) % mainTriggers.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        mainTriggers[(idx - 1 + mainTriggers.length) % mainTriggers.length]?.focus();
      }
    });
  });

  /* 첫 번째 탭 자동 활성화 */
  if (mainTriggers.length) mainTriggers[0].classList.add('ds-main-menu-mobile__trigger--open');
}
