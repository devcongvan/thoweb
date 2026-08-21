/*
 * UYÊN NGHĨA — Nguồn dữ liệu sản phẩm dùng chung.
 * Thêm/sửa sản phẩm tại đây; giao diện danh sách và chi tiết sẽ tự cập nhật.
 */
(function () {
  "use strict";

  // Ảnh miễn phí từ Unsplash, dùng tham số kích thước để tải nhanh hơn trên web.
  const ONLINE_IMAGES = {
    blanket: [
      "https://images.unsplash.com/photo-1623944431758-e856760d7b65?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1623944436679-5412c658a358?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1620751852890-a89137ec78b9?auto=format&fit=crop&w=1000&q=82"
    ],
    bedsheet: [
      "https://images.unsplash.com/photo-1669860037865-2fe02dc00e01?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1758072328635-586f3c121af2?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1623944436679-5412c658a358?auto=format&fit=crop&w=1000&q=82"
    ],
    pillow: [
      "https://images.unsplash.com/photo-1620751852890-a89137ec78b9?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1664647061566-7e58ef1d64e6?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1623944431758-e856760d7b65?auto=format&fit=crop&w=1000&q=82"
    ],
    mattress: [
      "https://images.unsplash.com/photo-1628746234641-28eb583a51b4?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1759101292737-24e1c5ed52d9?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1669860037865-2fe02dc00e01?auto=format&fit=crop&w=1000&q=82"
    ]
  };
  const CATALOG_IMAGE = ONLINE_IMAGES.blanket[0];

  const products = [
    {
      id: "UN001",
      name: "Chăn hè cotton mây",
      category: "blanket",
      price: 690000,
      oldPrice: 790000,
      badge: "Bán chạy",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton chải mềm",
      size: "1m8 × 2m2",
      colors: ["Kem", "Be", "Xanh sương"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.9,
      description: "Chiếc chăn nhẹ, thoáng và mềm dịu, phù hợp cho đêm hè hoặc phòng điều hòa.",
      details: "Bề mặt cotton chải mềm tạo cảm giác êm ái ngay từ lần chạm đầu tiên. Đường may viền gọn, trọng lượng vừa phải và chất vải thoáng giúp sản phẩm dễ sử dụng quanh năm.",
      featured: true,
      order: 16
    },
    {
      id: "UN002",
      name: "Chăn đông chần bông An Nhiên",
      category: "blanket",
      price: 1190000,
      oldPrice: 1390000,
      badge: "Giảm giá",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton, bông microfiber",
      size: "2m × 2m2",
      colors: ["Be cát", "Nâu sữa"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.8,
      description: "Chăn chần bông ấm vừa, bề mặt mịn và gam màu trung tính dễ phối phòng.",
      details: "Lớp bông được chần đều giúp hạn chế xô lệch trong quá trình sử dụng. Thiết kế hai mặt linh hoạt và bảng màu nhẹ nhàng mang đến cảm giác ấm cúng cho phòng ngủ.",
      featured: true,
      order: 15
    },
    {
      id: "UN003",
      name: "Chăn cotton waffle Bình Minh",
      category: "blanket",
      price: 890000,
      oldPrice: null,
      badge: "Mới",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton dệt tổ ong",
      size: "1m8 × 2m2",
      colors: ["Trắng ngà", "Nâu nhạt"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.7,
      description: "Bề mặt dệt tổ ong thoáng khí, tạo điểm nhấn tinh tế cho giường ngủ tối giản.",
      details: "Kết cấu waffle có độ nổi nhẹ và khả năng lưu thông không khí tốt. Sản phẩm có thể dùng làm chăn mỏng hoặc phủ trang trí cuối giường.",
      featured: false,
      order: 14
    },
    {
      id: "UN004",
      name: "Chăn sợi tre Mộc Miên",
      category: "blanket",
      price: 990000,
      oldPrice: null,
      badge: null,
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Sợi tre pha cotton",
      size: "2m × 2m2",
      colors: ["Kem", "Hồng đất"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.8,
      description: "Chất vải mát tay, rủ mềm và phù hợp với làn da nhạy cảm.",
      details: "Sự kết hợp giữa sợi tre và cotton tạo bề mặt mềm, thoáng và ít bí. Gam màu dịu giúp chiếc chăn dễ hòa vào nhiều phong cách nội thất.",
      featured: false,
      order: 13
    },
    {
      id: "UN005",
      name: "Bộ chăn ga cotton cao cấp",
      category: "bedsheet",
      price: 1290000,
      oldPrice: 1490000,
      badge: "Bán chạy",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton 100%",
      size: "1m6 × 2m",
      colors: ["Be", "Trắng"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 5,
      description: "Bộ chăn ga cotton mềm mại, thoáng khí và phù hợp sử dụng quanh năm.",
      details: "Bộ sản phẩm gồm ga bọc, vỏ chăn và hai vỏ gối. Cotton mật độ dệt cao cho bề mặt mịn, thấm hút tốt và dễ chăm sóc trong sinh hoạt hằng ngày.",
      featured: true,
      order: 12
    },
    {
      id: "UN006",
      name: "Bộ chăn ga satin Ánh Nguyệt",
      category: "bedsheet",
      price: 1590000,
      oldPrice: 1790000,
      badge: "Giảm giá",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton satin",
      size: "1m8 × 2m",
      colors: ["Champagne", "Trắng ngọc trai"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.9,
      description: "Bề mặt óng nhẹ, mượt mà cùng sắc champagne trang nhã.",
      details: "Cotton satin có độ bóng vừa đủ để tạo vẻ tinh tế mà vẫn giữ cảm giác thoáng và dễ chịu. Sản phẩm hợp với không gian phòng ngủ hiện đại, thanh lịch.",
      featured: true,
      order: 11
    },
    {
      id: "UN007",
      name: "Bộ chăn ga Hàn Quốc Nắng Mai",
      category: "bedsheet",
      price: 1390000,
      oldPrice: null,
      badge: "Mới",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton poly cao cấp",
      size: "1m6 × 2m",
      colors: ["Kem hoa", "Xanh nhạt"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.7,
      description: "Họa tiết nhỏ thanh thoát, mang nét trẻ trung và ấm áp cho căn phòng.",
      details: "Họa tiết được tiết chế trên nền màu sáng, dễ phối với nội thất gỗ. Chất liệu ít nhăn, nhanh khô và phù hợp với nhịp sống gia đình bận rộn.",
      featured: true,
      order: 10
    },
    {
      id: "UN008",
      name: "Bộ ga màu be Tĩnh Lặng",
      category: "bedsheet",
      price: 1090000,
      oldPrice: null,
      badge: null,
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton compact",
      size: "1m8 × 2m",
      colors: ["Be ấm", "Nâu sữa"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.8,
      description: "Thiết kế trơn màu tối giản, mềm mịn và dễ kết hợp với nhiều kiểu chăn.",
      details: "Ga bọc bo chun chắc chắn, ôm gọn đệm và hạn chế xô lệch. Bảng màu be ấm tạo nền thư thái cho phòng ngủ.",
      featured: false,
      order: 9
    },
    {
      id: "UN009",
      name: "Gối ngủ cotton Êm Dịu",
      category: "pillow",
      price: 290000,
      oldPrice: 340000,
      badge: "Bán chạy",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton, bông microfiber",
      size: "45 × 65cm",
      colors: ["Trắng"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.9,
      description: "Độ cao vừa phải, ruột bông tơi và vỏ cotton thoáng mát.",
      details: "Ruột gối có độ đàn hồi êm, nâng đỡ tự nhiên cho nhiều tư thế ngủ. Vỏ cotton tháo rời thuận tiện cho việc vệ sinh.",
      featured: true,
      order: 8
    },
    {
      id: "UN010",
      name: "Gối nằm cao su non An Giấc",
      category: "pillow",
      price: 490000,
      oldPrice: null,
      badge: "Mới",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Memory foam",
      size: "40 × 60cm",
      colors: ["Trắng kem"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.8,
      description: "Thiết kế nâng đỡ vùng cổ vai, foam đàn hồi chậm và êm ái.",
      details: "Cấu trúc foam ghi nhớ đường cong tự nhiên, giúp phân bổ áp lực đồng đều. Áo gối dệt thoáng có khóa kéo và dễ tháo giặt.",
      featured: true,
      order: 7
    },
    {
      id: "UN011",
      name: "Gối ôm dài Mềm Mây",
      category: "pillow",
      price: 350000,
      oldPrice: null,
      badge: null,
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton, bông gòn",
      size: "35 × 100cm",
      colors: ["Be", "Trắng"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.7,
      description: "Gối ôm dáng dài, ruột bông đầy đặn và vỏ vải mát tay.",
      details: "Form gối giữ độ căng vừa phải, không quá cứng. Thiết kế tối giản phù hợp cho người lớn lẫn trẻ nhỏ.",
      featured: false,
      order: 6
    },
    {
      id: "UN012",
      name: "Gối trẻ em Mầm Non",
      category: "pillow",
      price: 220000,
      oldPrice: null,
      badge: "Mới",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cotton kháng khuẩn",
      size: "30 × 45cm",
      colors: ["Kem", "Xanh pastel"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.8,
      description: "Gối thấp vừa vặn, bề mặt dịu nhẹ dành cho giấc ngủ của bé.",
      details: "Kích thước được thiết kế riêng cho trẻ nhỏ với độ cao vừa phải. Vỏ cotton mềm, họa tiết nhỏ và gam màu nhẹ nhàng.",
      featured: false,
      order: 5
    },
    {
      id: "UN013",
      name: "Đệm foam Cloud Comfort",
      category: "mattress",
      price: 4990000,
      oldPrice: 5590000,
      badge: "Bán chạy",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Foam đa tầng",
      size: "1m6 × 2m × 20cm",
      colors: ["Trắng kem"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.9,
      description: "Kết cấu foam nhiều lớp nâng đỡ cân bằng, bề mặt êm và ít truyền rung.",
      details: "Các lớp foam có mật độ khác nhau tạo độ êm ở bề mặt và nâng đỡ chắc ở phần lõi. Áo đệm dệt thoáng, có thể tháo rời để vệ sinh.",
      featured: true,
      order: 4
    },
    {
      id: "UN014",
      name: "Đệm cao su Thiên Nhiên",
      category: "mattress",
      price: 7290000,
      oldPrice: null,
      badge: "Mới",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Cao su thiên nhiên",
      size: "1m8 × 2m × 15cm",
      colors: ["Trắng ngà"],
      origin: "Việt Nam",
      status: "Đặt trước",
      rating: 4.8,
      description: "Độ đàn hồi chắc vừa, cấu trúc lỗ thoáng và nâng đỡ cơ thể tự nhiên.",
      details: "Lõi cao su có hệ thống lỗ thông khí giúp bề mặt thông thoáng. Độ đàn hồi phù hợp với người thích cảm giác nằm chắc nhưng không cứng.",
      featured: true,
      order: 3
    },
    {
      id: "UN015",
      name: "Đệm lò xo Harmony",
      category: "mattress",
      price: 6390000,
      oldPrice: 6990000,
      badge: "Giảm giá",
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Lò xo túi độc lập",
      size: "1m6 × 2m × 24cm",
      colors: ["Trắng", "Be"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.7,
      description: "Hệ lò xo túi nâng đỡ riêng biệt, hạn chế lan truyền chuyển động khi ngủ.",
      details: "Mỗi lò xo vận hành độc lập để nâng đỡ theo vùng và giảm ảnh hưởng khi người nằm cạnh xoay trở. Viền đệm gia cố giúp tăng diện tích sử dụng.",
      featured: false,
      order: 2
    },
    {
      id: "UN016",
      name: "Đệm bông ép Gọn Êm",
      category: "mattress",
      price: 2490000,
      oldPrice: null,
      badge: null,
      images: [CATALOG_IMAGE, CATALOG_IMAGE, CATALOG_IMAGE],
      material: "Bông polyester ép",
      size: "1m6 × 2m × 9cm",
      colors: ["Trắng kem"],
      origin: "Việt Nam",
      status: "Còn hàng",
      rating: 4.7,
      description: "Bề mặt phẳng chắc, thiết kế gấp ba thuận tiện cho không gian vừa và nhỏ.",
      details: "Đệm có độ phẳng ổn định và kết cấu nhẹ, thuận tiện di chuyển hoặc cất gọn. Áo đệm trang nhã, khóa kéo chắc chắn.",
      featured: false,
      order: 1
    }
  ];

  products.forEach((product) => {
    product.images = ONLINE_IMAGES[product.category];
  });

  const categoryLabels = {
    blanket: "Chăn",
    bedsheet: "Ga",
    pillow: "Gối",
    mattress: "Đệm"
  };

  const normalizeText = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

  const formatPrice = (value) => new Intl.NumberFormat("vi-VN").format(value) + "đ";

  function filterProducts(category, list = products) {
    return !category || category === "all" ? [...list] : list.filter((product) => product.category === category);
  }

  function searchProducts(query, list = products) {
    const keyword = normalizeText(query).trim();
    if (!keyword) return [...list];
    return list.filter((product) => normalizeText([
      product.name,
      product.description,
      product.category,
      categoryLabels[product.category],
      product.material,
      product.id
    ].join(" ")).includes(keyword));
  }

  function sortProducts(sortBy, list = products) {
    const sorted = [...list];
    if (sortBy === "price-asc") return sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return sorted.sort((a, b) => b.price - a.price);
    return sorted.sort((a, b) => b.order - a.order);
  }

  function getProductById(id) {
    return products.find((product) => product.id.toLowerCase() === String(id || "").toLowerCase()) || null;
  }

  function getMediaStyle(product, variant = 0) {
    const image = product.images[variant] || product.images[0];
    return `background-image:url('${image}')`;
  }

  function productCardTemplate(product) {
    const oldPrice = product.oldPrice ? `<span class="product-card__old-price">${formatPrice(product.oldPrice)}</span>` : "";
    const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : "";
    return `
      <article class="product-card reveal" data-category="${product.category}">
        <a class="product-card__media media-sprite media--${product.category}" href="product-detail.html?id=${encodeURIComponent(product.id)}" style="${getMediaStyle(product)}" aria-label="Xem ${product.name}">
          ${badge}
          <span class="product-card__quick">Xem chi tiết</span>
        </a>
        <div class="product-card__body">
          <span class="product-card__eyebrow">${categoryLabels[product.category]} · ${product.id}</span>
          <h3><a href="product-detail.html?id=${encodeURIComponent(product.id)}">${product.name}</a></h3>
          <div class="product-card__price-row">
            <strong>${formatPrice(product.price)}</strong>${oldPrice}
          </div>
          <a class="text-link" href="product-detail.html?id=${encodeURIComponent(product.id)}">Khám phá sản phẩm <span aria-hidden="true">→</span></a>
        </div>
      </article>`;
  }

  function renderProducts(target, list = products) {
    const container = typeof target === "string" ? document.querySelector(target) : target;
    if (!container) return;
    container.innerHTML = list.length
      ? list.map(productCardTemplate).join("")
      : `<div class="empty-state"><span aria-hidden="true">⌕</span><h3>Không tìm thấy sản phẩm phù hợp.</h3><p>Hãy thử một từ khóa hoặc danh mục khác.</p></div>`;
    document.dispatchEvent(new CustomEvent("products:rendered"));
  }

  function renderProductDetail(target, product) {
    const container = typeof target === "string" ? document.querySelector(target) : target;
    if (!container || !product) return;
    const oldPrice = product.oldPrice ? `<span class="detail-old-price">${formatPrice(product.oldPrice)}</span>` : "";
    const thumbnails = product.images.map((image, index) => `
      <button class="detail-thumb media-sprite media--${product.category} variant-${index + 1}${index === 0 ? " is-active" : ""}" type="button" style="background-image:url('${image}')" data-image="${image}" data-variant="${index}" aria-label="Xem ảnh ${index + 1} của ${product.name}"></button>
    `).join("");
    container.innerHTML = `
      <nav class="breadcrumbs" aria-label="Đường dẫn">
        <a href="index.html">Trang chủ</a><span>/</span><a href="products.html?category=${product.category}">${categoryLabels[product.category]}</a><span>/</span><span>${product.name}</span>
      </nav>
      <div class="product-detail__top">
        <div class="detail-gallery">
          <div id="detail-main-image" class="detail-main-image media-sprite media--${product.category} variant-1" style="${getMediaStyle(product)}" role="img" aria-label="${product.name}"></div>
          <div class="detail-thumbnails">${thumbnails}</div>
        </div>
        <div class="detail-info">
          ${product.badge ? `<span class="detail-kicker">${product.badge}</span>` : `<span class="detail-kicker">${categoryLabels[product.category]}</span>`}
          <h1>${product.name}</h1>
          <div class="detail-meta"><span>Mã: ${product.id}</span><span class="rating" aria-label="Đánh giá ${product.rating} trên 5">★ ${product.rating}</span></div>
          <div class="detail-price"><strong>${formatPrice(product.price)}</strong>${oldPrice}</div>
          <p class="detail-lead">${product.description}</p>
          <dl class="detail-specs">
            <div><dt>Chất liệu</dt><dd>${product.material}</dd></div>
            <div><dt>Kích thước</dt><dd>${product.size}</dd></div>
            <div><dt>Màu sắc</dt><dd>${product.colors.join(", ")}</dd></div>
            <div><dt>Tình trạng</dt><dd class="stock">${product.status}</dd></div>
          </dl>
          <div class="detail-actions">
            <a class="button button--primary button--wide" href="contact.html?product=${encodeURIComponent(product.id)}">Liên hệ đặt hàng</a>
            <a class="button button--zalo" href="https://zalo.me/0900000000" target="_blank" rel="noopener">Nhắn Zalo</a>
            <a class="button button--outline" href="tel:0900000000">Gọi ngay</a>
          </div>
          <p class="detail-note">Tư vấn kích thước và màu sắc phù hợp · Phản hồi trong giờ làm việc</p>
        </div>
      </div>
      <div class="detail-content">
        <section>
          <span class="section-kicker">Cảm giác & chất liệu</span>
          <h2>Mô tả sản phẩm</h2>
          <p>${product.details}</p>
          <p>Mỗi sản phẩm được kiểm tra bề mặt vải và đường may trước khi giao. Màu sắc thực tế có thể chênh lệch nhẹ tùy điều kiện ánh sáng và màn hình.</p>
        </section>
        <section>
          <span class="section-kicker">Thông số</span>
          <h2>Thông tin sản phẩm</h2>
          <div class="spec-table" role="table" aria-label="Thông tin sản phẩm">
            <div role="row"><span role="cell">Chất liệu</span><strong role="cell">${product.material}</strong></div>
            <div role="row"><span role="cell">Kích thước</span><strong role="cell">${product.size}</strong></div>
            <div role="row"><span role="cell">Màu sắc</span><strong role="cell">${product.colors.join(", ")}</strong></div>
            <div role="row"><span role="cell">Xuất xứ</span><strong role="cell">${product.origin}</strong></div>
          </div>
        </section>
      </div>`;

    const mainImage = container.querySelector("#detail-main-image");
    container.querySelectorAll(".detail-thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        container.querySelectorAll(".detail-thumb").forEach((item) => item.classList.remove("is-active"));
        thumb.classList.add("is-active");
        mainImage.style.backgroundImage = `url('${thumb.dataset.image}')`;
        mainImage.className = `detail-main-image media-sprite media--${product.category} variant-${Number(thumb.dataset.variant) + 1}`;
      });
    });
  }

  window.UyenNghiaStore = {
    products,
    categoryLabels,
    formatPrice,
    renderProducts,
    filterProducts,
    searchProducts,
    sortProducts,
    getProductById,
    renderProductDetail
  };
})();
