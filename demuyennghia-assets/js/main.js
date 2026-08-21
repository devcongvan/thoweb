(function () {
  "use strict";

  const store = window.UyenNghiaStore;

  function initHeader() {
    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    const searchPanel = document.querySelector(".search-panel");

    const updateHeader = () => header && header.classList.toggle("is-scrolled", window.scrollY > 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        menuButton.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
      });
      nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }));
    }

    document.querySelectorAll(".js-open-search").forEach((button) => {
      button.addEventListener("click", () => {
        if (!searchPanel) return;
        searchPanel.classList.add("is-open");
        searchPanel.setAttribute("aria-hidden", "false");
        setTimeout(() => searchPanel.querySelector("input")?.focus(), 80);
      });
    });

    document.querySelectorAll(".js-close-search").forEach((button) => {
      button.addEventListener("click", () => {
        searchPanel?.classList.remove("is-open");
        searchPanel?.setAttribute("aria-hidden", "true");
      });
    });

    document.querySelectorAll(".global-search-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = new FormData(form).get("q")?.toString().trim() || "";
        window.location.href = `products.html${query ? `?q=${encodeURIComponent(query)}` : ""}`;
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && searchPanel?.classList.contains("is-open")) {
        searchPanel.classList.remove("is-open");
        searchPanel.setAttribute("aria-hidden", "true");
      }
    });
  }

  function initRevealAnimations() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -32px" });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    document.addEventListener("products:rendered", () => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
    });
  }

  function initHomeProducts() {
    const grid = document.querySelector("#featured-products");
    if (!grid || !store) return;
    const featured = store.products.filter((product) => product.featured).slice(0, 8);
    store.renderProducts(grid, featured);
  }

  function initProductsPage() {
    const grid = document.querySelector("#products-grid");
    if (!grid || !store) return;

    const searchInput = document.querySelector("#product-search");
    const sortSelect = document.querySelector("#product-sort");
    const count = document.querySelector("#product-count");
    const filterButtons = [...document.querySelectorAll("[data-filter]")];
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get("category") || "all";
    const initialQuery = params.get("q") || "";

    let activeCategory = store.categoryLabels[initialCategory] ? initialCategory : "all";
    searchInput.value = initialQuery;

    function updateUrl() {
      const nextParams = new URLSearchParams();
      if (activeCategory !== "all") nextParams.set("category", activeCategory);
      if (searchInput.value.trim()) nextParams.set("q", searchInput.value.trim());
      const next = `${window.location.pathname}${nextParams.toString() ? `?${nextParams}` : ""}`;
      history.replaceState(null, "", next);
    }

    function updateProducts() {
      let list = store.filterProducts(activeCategory);
      list = store.searchProducts(searchInput.value, list);
      list = store.sortProducts(sortSelect.value, list);
      store.renderProducts(grid, list);
      count.textContent = `${list.length} sản phẩm`;
      updateUrl();
    }

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === activeCategory;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;
        filterButtons.forEach((item) => {
          const selected = item === button;
          item.classList.toggle("is-active", selected);
          item.setAttribute("aria-pressed", String(selected));
        });
        updateProducts();
      });
    });
    searchInput.addEventListener("input", updateProducts);
    sortSelect.addEventListener("change", updateProducts);
    updateProducts();
  }

  function initProductDetail() {
    const detail = document.querySelector("#product-detail");
    if (!detail || !store) return;
    const id = new URLSearchParams(window.location.search).get("id") || "UN005";
    const product = store.getProductById(id);
    const notFound = document.querySelector("#product-not-found");

    if (!product) {
      detail.hidden = true;
      if (notFound) notFound.hidden = false;
      return;
    }

    store.renderProductDetail(detail, product);
    document.title = `${product.name} – Uyên Nghĩa`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = product.description;

    const related = store.products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
    store.renderProducts("#related-products", related);
  }

  function initContactForm() {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#form-status");
    if (!form || !status) return;

    const requestedProduct = new URLSearchParams(window.location.search).get("product");
    if (requestedProduct) {
      const product = store?.getProductById(requestedProduct);
      const field = form.querySelector("#interest");
      if (field) field.value = product ? `${product.name} (${product.id})` : requestedProduct;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const name = form.querySelector("#name").value.trim();
      status.innerHTML = `<strong>Cảm ơn ${name}!</strong> Để gửi yêu cầu ngay, vui lòng tiếp tục trong cửa sổ Zalo vừa mở.`;
      status.classList.add("is-visible");
      window.open("https://zalo.me/0900000000", "_blank", "noopener");
    });
  }

  function setActiveNav() {
    const page = document.body.dataset.page;
    document.querySelectorAll(".site-nav a[data-page]").forEach((link) => {
      if (link.dataset.page === page) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    setActiveNav();
    initRevealAnimations();
    initHomeProducts();
    initProductsPage();
    initProductDetail();
    initContactForm();
  });
})();
