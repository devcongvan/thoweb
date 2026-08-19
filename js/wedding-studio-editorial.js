(() => {
    "use strict";

    document.documentElement.classList.add("js");

    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#site-nav");
    const floatingBooking = document.querySelector(".floating-booking");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const closeMenu = () => {
        menuButton?.setAttribute("aria-expanded", "false");
        menuButton?.setAttribute("aria-label", "Mở menu");
        navigation?.classList.remove("is-open");
    };

    menuButton?.addEventListener("click", () => {
        const opening = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(opening));
        menuButton.setAttribute("aria-label", opening ? "Đóng menu" : "Mở menu");
        navigation?.classList.toggle("is-open", opening);
    });

    navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    let ticking = false;
    const updateScrollState = () => {
        const scrollTop = window.scrollY;
        header?.classList.toggle("is-scrolled", scrollTop > 20);
        floatingBooking?.classList.toggle("is-visible", scrollTop > 650);
        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
    }, { passive: true });
    updateScrollState();

    const revealItems = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
        const observer = new IntersectionObserver((entries, revealObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

        revealItems.forEach((item, index) => {
            item.style.transitionDelay = `${Math.min((index % 4) * 65, 195)}ms`;
            observer.observe(item);
        });
    }

    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxCaption = lightbox?.querySelector("figcaption");
    const lightboxClose = lightbox?.querySelector(".lightbox-close");
    let lightboxTrigger = null;

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
        lightboxTrigger?.focus();
    };

    document.querySelectorAll("[data-lightbox]").forEach((button) => {
        button.addEventListener("click", () => {
            if (!lightbox || !lightboxImage || !lightboxCaption) return;
            lightboxTrigger = button;
            lightboxImage.src = button.dataset.lightbox;
            lightboxImage.alt = button.querySelector("img")?.alt || "Ảnh bộ sưu tập Mộc Miên";
            lightboxCaption.textContent = button.dataset.caption || "Mộc Miên Wedding Atelier";
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("no-scroll");
            lightboxClose?.focus();
        });
    });

    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox?.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            if (lightbox?.classList.contains("is-open")) closeLightbox();
        }
    });

    const bookingForm = document.querySelector("#booking-form");
    const packageSelect = bookingForm?.querySelector("select[name='package']");
    const dateInput = bookingForm?.querySelector("input[type='date']");
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

    document.querySelectorAll("[data-package]").forEach((link) => {
        link.addEventListener("click", () => {
            if (packageSelect) packageSelect.value = link.dataset.package;
        });
    });

    bookingForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!bookingForm.reportValidity()) return;
        const formStatus = bookingForm.querySelector(".form-status");
        const name = new FormData(bookingForm).get("name");
        if (formStatus) formStatus.textContent = `Cảm ơn ${name}. Đây là form demo; khi triển khai thật, yêu cầu sẽ được gửi trực tiếp đến studio.`;
        bookingForm.reset();
    });
})();
