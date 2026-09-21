(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-revealed"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min((index % 3) * 70, 140)}ms`;
      revealObserver.observe(item);
    });
  }

  const countdown = document.querySelector("[data-countdown]");
  const countdownStatus = document.querySelector("[data-countdown-status]");

  if (countdown) {
    const targetTime = new Date(countdown.dataset.countdown).getTime();
    const fields = {
      days: countdown.querySelector("[data-days]"),
      hours: countdown.querySelector("[data-hours]"),
      minutes: countdown.querySelector("[data-minutes]"),
      seconds: countdown.querySelector("[data-seconds]")
    };

    const pad = (value) => String(value).padStart(2, "0");

    const renderCountdown = () => {
      const distance = targetTime - Date.now();

      if (distance <= 0) {
        Object.values(fields).forEach((field) => { field.textContent = "00"; });
        if (countdownStatus) countdownStatus.textContent = "Ngày hạnh phúc đã bắt đầu ♥";
        return false;
      }

      fields.days.textContent = pad(Math.floor(distance / 86400000));
      fields.hours.textContent = pad(Math.floor((distance % 86400000) / 3600000));
      fields.minutes.textContent = pad(Math.floor((distance % 3600000) / 60000));
      fields.seconds.textContent = pad(Math.floor((distance % 60000) / 1000));
      return true;
    };

    if (renderCountdown()) {
      window.setInterval(renderCountdown, 1000);
    }
  }

  const quickNav = document.querySelector(".quick-nav");
  const heroImage = document.querySelector(".hero__media img");
  let ticking = false;

  const updateOnScroll = () => {
    const scrollTop = window.scrollY;
    if (quickNav) quickNav.classList.toggle("is-visible", scrollTop > 520);
    if (heroImage && !reducedMotion && scrollTop < window.innerHeight) {
      heroImage.style.transform = `scale(1.02) translateY(${scrollTop * 0.055}px)`;
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateOnScroll);
  }, { passive: true });
  updateOnScroll();

  let toastTimer;
  const toast = document.querySelector(".toast");
  const showToast = (message) => {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
  };

  const rsvpForm = document.querySelector("#rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!rsvpForm.reportValidity()) return;

      const data = Object.fromEntries(new FormData(rsvpForm).entries());
      data.savedAt = new Date().toISOString();

      try {
        localStorage.setItem("wedding-rsvp-thanh-tuan-do-ngan", JSON.stringify(data));
      } catch (error) {
        console.info("Không thể lưu RSVP trên thiết bị này.", error);
      }

      showToast(`Cảm ơn ${data.name}! Phản hồi của bạn đã được ghi nhận trên thiết bị này.`);
      rsvpForm.reset();
    });
  }

  const modal = document.querySelector("#gift-modal");
  let lastFocusedElement = null;

  const setModal = (open) => {
    if (!modal) return;
    modal.classList.toggle("is-open", open);
    modal.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("modal-open", open);

    if (open) {
      lastFocusedElement = document.activeElement;
      modal.querySelector(".modal__close")?.focus();
    } else {
      lastFocusedElement?.focus();
    }
  };

  document.querySelectorAll("[data-open-modal]").forEach((button) => {
    button.addEventListener("click", () => setModal(true));
  });
  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => setModal(false));
  });

  const galleryButtons = [...document.querySelectorAll("[data-gallery-index]")];
  const galleryImages = galleryButtons.map((button) => {
    const image = button.querySelector("img");
    return { src: image.currentSrc || image.src, alt: image.alt };
  });
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox?.querySelector("figure img");
  const lightboxCaption = lightbox?.querySelector("figcaption");
  let activeImageIndex = 0;
  let touchStartX = 0;

  const renderLightboxImage = () => {
    const item = galleryImages[activeImageIndex];
    if (!item || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(galleryImages.length).padStart(2, "0")} — ${item.alt}`;
  };

  const openLightbox = (index) => {
    if (!lightbox) return;
    activeImageIndex = index;
    renderLightboxImage();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    lightbox.querySelector(".lightbox__close")?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    galleryButtons[activeImageIndex]?.focus();
  };

  const stepLightbox = (amount) => {
    activeImageIndex = (activeImageIndex + amount + galleryImages.length) % galleryImages.length;
    renderLightboxImage();
  };

  galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => openLightbox(index));
  });
  lightbox?.querySelector(".lightbox__close")?.addEventListener("click", closeLightbox);
  lightbox?.querySelector(".lightbox__nav--prev")?.addEventListener("click", () => stepLightbox(-1));
  lightbox?.querySelector(".lightbox__nav--next")?.addEventListener("click", () => stepLightbox(1));
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox?.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  lightbox?.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) stepLightbox(distance > 0 ? -1 : 1);
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (lightbox?.classList.contains("is-open")) closeLightbox();
      else if (modal?.classList.contains("is-open")) setModal(false);
    }
    if (!lightbox?.classList.contains("is-open")) return;
    if (event.key === "ArrowLeft") stepLightbox(-1);
    if (event.key === "ArrowRight") stepLightbox(1);
  });
})();
