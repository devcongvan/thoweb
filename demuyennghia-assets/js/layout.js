(function () {
  "use strict";

  const searchIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path>
    </svg>`;
  const phoneIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"></path>
    </svg>`;

  const header = `
    <div class="announcement">Tư vấn chọn chăn ga theo nhu cầu · Giao hàng toàn quốc</div>
    <header class="site-header">
      <div class="container header-inner">
        <button class="menu-toggle" type="button" aria-label="Mở menu" aria-expanded="false"><span></span><span></span></button>
        <a class="brand" href="index.html" aria-label="Uyên Nghĩa - Trang chủ">
          <strong>UYÊN NGHĨA</strong><small>CHĂN GA GỐI ĐỆM</small>
        </a>
        <nav class="site-nav" aria-label="Điều hướng chính">
          <ul>
            <li><a href="index.html" data-page="home">Trang chủ</a></li>
            <li><a href="products.html" data-page="products">Sản phẩm</a></li>
            <li><a href="about.html" data-page="about">Về Uyên Nghĩa</a></li>
            <li><a href="contact.html" data-page="contact">Liên hệ</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <button class="icon-button js-open-search" type="button" aria-label="Tìm kiếm">${searchIcon}</button>
          <a class="icon-button" href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">f</a>
          <a class="header-phone" href="tel:0900000000" aria-label="Gọi Uyên Nghĩa">${phoneIcon}</a>
          <a class="header-zalo" href="https://zalo.me/0900000000" target="_blank" rel="noopener">Zalo</a>
        </div>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html"><strong>UYÊN NGHĨA</strong><small>CHĂN GA GỐI ĐỆM</small></a>
          <p>Đẹp cho phòng ngủ – Êm cho giấc ngủ. Những lựa chọn gần gũi, tiện nghi và vừa vặn với mỗi gia đình.</p>
        </div>
        <div class="footer-col">
          <h3>Sản phẩm</h3>
          <ul>
            <li><a href="products.html?category=blanket">Chăn</a></li>
            <li><a href="products.html?category=bedsheet">Ga</a></li>
            <li><a href="products.html?category=pillow">Gối</a></li>
            <li><a href="products.html?category=mattress">Đệm</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Hỗ trợ</h3>
          <ul>
            <li><a href="contact.html">Chính sách mua hàng</a></li>
            <li><a href="contact.html">Chính sách đổi trả</a></li>
            <li><a href="about.html">Hướng dẫn bảo quản</a></li>
            <li><a href="contact.html">Liên hệ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Liên hệ</h3>
          <ul>
            <li><a href="tel:0900000000">Hotline: 09xx xxx xxx</a></li>
            <li><a href="https://zalo.me/0900000000" target="_blank" rel="noopener">Zalo: 09xx xxx xxx</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener">Facebook: Uyên Nghĩa</a></li>
            <li>[Địa chỉ cửa hàng]</li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© 2026 UYÊN NGHĨA. All Rights Reserved.</span>
        <span>Đẹp cho phòng ngủ · Êm cho giấc ngủ</span>
      </div>
    </footer>`;

  const utilities = `
    <div class="search-panel" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Tìm kiếm sản phẩm">
      <div class="search-panel__box">
        <div class="search-panel__top"><div><span class="section-kicker">Tìm thật nhanh</span><h2>Bạn đang cần gì?</h2><p>Tìm theo tên, mã sản phẩm hoặc chất liệu.</p></div><button class="search-panel__close js-close-search" type="button" aria-label="Đóng">×</button></div>
        <form class="global-search-form"><input name="q" type="search" placeholder="Ví dụ: cotton, UN005, gối..." aria-label="Từ khóa tìm kiếm"><button type="submit">Tìm kiếm →</button></form>
      </div>
    </div>
    <div class="floating-contact" aria-label="Liên hệ nhanh">
      <a href="tel:0900000000" aria-label="Gọi ngay">Gọi ngay</a>
      <a class="floating-zalo" href="https://zalo.me/0900000000" target="_blank" rel="noopener" aria-label="Nhắn Zalo">Zalo</a>
      <a class="floating-facebook" href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">f</a>
    </div>`;

  document.querySelectorAll("[data-site-header]").forEach((element) => { element.outerHTML = header; });
  document.querySelectorAll("[data-site-footer]").forEach((element) => { element.outerHTML = footer; });
  document.body.insertAdjacentHTML("beforeend", utilities);
})();
