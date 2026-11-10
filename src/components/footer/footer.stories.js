import '../layout/layout.css';
import '../button/button.css';
import '../icon/icon.css';

export default {
  title: 'Components/Footer',
  parameters: { layout: 'fullscreen' },
};

/* ─── HTML 생성 헬퍼 ─────────────────────────── */

function renderFooter() {
  return `<footer id="ds-footer">
  <div class="ds-footer__quick">
    <div class="ds-container">
      <button type="button" class="ds-footer__quick-link">관련 사이트 1</button>
      <button type="button" class="ds-footer__quick-link">관련 사이트 2</button>
      <button type="button" class="ds-footer__quick-link">관련 사이트 3</button>
      <button type="button" class="ds-footer__quick-link">관련 사이트 4</button>
    </div>
  </div>
  <div class="ds-container">
    <div class="ds-footer__logo">
      <span class="sr-only">KRDS - Korea Design System</span>
    </div>
    <div class="ds-footer__content">
      <div class="ds-footer__info">
        <p class="ds-footer__address">(00000) 서울특별시 종로구 세종대로 209 정부서울청사</p>
        <ul class="ds-footer__contact">
          <li>
            <strong>대표전화 1234-5678</strong>
            <span>(평일 09:00 ~ 18:00)</span>
          </li>
        </ul>
      </div>
      <div class="ds-footer__links">
        <div class="ds-footer__shortcuts">
          <a href="#" class="ds-btn ds-btn--medium ds-btn--text">찾아오시는 길</a>
          <a href="#" class="ds-btn ds-btn--medium ds-btn--text">이용안내</a>
        </div>
        <div class="ds-footer__sns">
          <a href="#" class="ds-btn ds-btn--xlarge ds-btn--icon ds-btn--border" target="_blank" title="새 창 열기">
            <span class="sr-only">인스타그램</span>
          </a>
          <a href="#" class="ds-btn ds-btn--xlarge ds-btn--icon ds-btn--border" target="_blank" title="새 창 열기">
            <span class="sr-only">유튜브</span>
          </a>
          <a href="#" class="ds-btn ds-btn--xlarge ds-btn--icon ds-btn--border" target="_blank" title="새 창 열기">
            <span class="sr-only">X</span>
          </a>
        </div>
      </div>
    </div>
    <div class="ds-footer__bottom">
      <div class="ds-footer__bottom-text">
        <div class="ds-footer__menu">
          <a href="#" class="ds-footer__menu-link ds-footer__menu-link--emphasis">개인정보처리방침</a>
          <a href="#" class="ds-footer__menu-link">저작권 정책</a>
          <a href="#" class="ds-footer__menu-link">웹 접근성 안내</a>
        </div>
        <p class="ds-footer__copyright">&copy; 2025 KRDS. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>`;
}

/* ─── Playground ────────────────────────────── */

export const Playground = {
  name: 'Playground',
  render: () => renderFooter(),
};
