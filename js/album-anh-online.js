const body = document.body;
const accessGate = document.getElementById("access-gate");
const accessForm = document.getElementById("access-form");
const albumPin = document.getElementById("album-pin");
const pinError = document.getElementById("pin-error");
const albumApp = document.getElementById("album-app");
const albumHeader = document.getElementById("album-header");
const galleryGrid = document.getElementById("gallery-grid");
const galleryEmpty = document.getElementById("gallery-empty");
const galleryResultCount = document.getElementById("gallery-result-count");
const selectionTray = document.getElementById("selection-tray");
const selectionPreview = document.getElementById("selection-preview");
const selectionForm = document.getElementById("selection-form");
const toast = document.getElementById("toast");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxPhotoId = document.getElementById("lightbox-photo-id");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxProgress = document.getElementById("lightbox-progress");
const lightboxDownload = document.getElementById("lightbox-download");
const lightboxFavorite = document.querySelector("[data-lightbox-favorite]");
const downloadDialog = document.getElementById("download-dialog");
const selectionDialog = document.getElementById("selection-dialog");

const DEMO_PIN = "1808";
const FAVORITES_KEY = "moc-mien-album-favorites";

const photos = [...document.querySelectorAll(".gallery-item")].map((element) => ({
    element,
    id: element.dataset.photoId,
    category: element.dataset.category,
    src: element.dataset.src,
    caption: element.dataset.caption,
}));

let currentFilter = "all";
let currentPhotoIndex = 0;
let slideshowTimer = null;
let toastTimer = null;
let touchStartX = 0;

const readFavorites = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        return new Set(saved.filter((id) => photos.some((photo) => photo.id === id)));
    } catch {
        return new Set();
    }
};

const favorites = readFavorites();

const saveFavorites = () => {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
    } catch {
        // The album still works when storage is unavailable.
    }
};

const showToast = (message) => {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
};

const syncDialogState = () => {
    body.classList.toggle("dialog-open", Boolean(document.querySelector("dialog[open]")));
};

const openDialog = (dialog) => {
    if (!(dialog instanceof HTMLDialogElement)) return;
    if (!dialog.open) dialog.showModal();
    syncDialogState();
};

const closeDialog = (dialog) => {
    if (dialog instanceof HTMLDialogElement && dialog.open) dialog.close();
};

const unlockAlbum = (instant = false) => {
    body.classList.remove("album-locked");
    albumApp?.setAttribute("aria-hidden", "false");
    document.querySelector(".album-hero__content")?.classList.add("is-visible");

    if (!accessGate) return;
    accessGate.setAttribute("aria-hidden", "true");

    if (instant) {
        accessGate.hidden = true;
        return;
    }

    accessGate.classList.add("is-leaving");
    window.setTimeout(() => {
        accessGate.hidden = true;
        accessGate.classList.remove("is-leaving");
    }, 560);
};

const previewMode = new URLSearchParams(window.location.search).get("preview") === "1";
let unlockedThisSession = false;

try {
    unlockedThisSession = sessionStorage.getItem("moc-mien-album-unlocked") === "true";
} catch {
    unlockedThisSession = false;
}

if (previewMode || unlockedThisSession) {
    unlockAlbum(true);
} else {
    window.setTimeout(() => albumPin?.focus(), 250);
}

accessForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = albumPin?.value.trim();

    if (value !== DEMO_PIN) {
        pinError.textContent = "Mã truy cập chưa đúng. Vui lòng kiểm tra lại.";
        accessForm.classList.remove("is-shaking");
        void accessForm.offsetWidth;
        accessForm.classList.add("is-shaking");
        albumPin?.select();
        return;
    }

    pinError.textContent = "";
    try {
        sessionStorage.setItem("moc-mien-album-unlocked", "true");
    } catch {
        // Session persistence is optional.
    }
    unlockAlbum();
});

albumPin?.addEventListener("input", () => {
    pinError.textContent = "";
    albumPin.value = albumPin.value.replace(/\D/g, "").slice(0, 4);
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.1 },
    );
    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

const updateHeader = () => albumHeader?.classList.toggle("is-scrolled", window.scrollY > 45);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const getVisiblePhotos = () => photos.filter((photo) => !photo.element.hidden);

const updateFilter = (filter = currentFilter) => {
    currentFilter = filter;
    let visibleCount = 0;

    photos.forEach((photo) => {
        const visible =
            filter === "all" ||
            photo.category === filter ||
            (filter === "favorites" && favorites.has(photo.id));
        photo.element.hidden = !visible;
        if (visible) visibleCount += 1;
    });

    document.querySelectorAll("[data-filter]").forEach((button) => {
        const active = button.dataset.filter === filter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    if (galleryResultCount) {
        galleryResultCount.textContent = `${visibleCount} ảnh${filter === "all" ? " nổi bật" : ""}`;
    }
    if (galleryEmpty) galleryEmpty.hidden = visibleCount !== 0;
};

document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => updateFilter(button.dataset.filter));
});

const updateFavoriteUI = () => {
    const count = favorites.size;
    document.querySelectorAll("[data-favorite-count]").forEach((element) => {
        element.textContent = String(count);
    });

    document.querySelectorAll("[data-favorite-photo]").forEach((button) => {
        const selected = favorites.has(button.dataset.favoritePhoto);
        button.classList.toggle("is-favorite", selected);
        button.setAttribute("aria-pressed", String(selected));
        button.setAttribute("aria-label", `${selected ? "Bỏ chọn" : "Chọn"} ảnh ${button.dataset.favoritePhoto}`);
    });

    selectionTray?.classList.toggle("is-visible", count > 0);
    selectionTray?.setAttribute("aria-hidden", String(count === 0));

    const currentPhoto = getVisiblePhotos()[currentPhotoIndex];
    if (currentPhoto && lightboxFavorite) {
        const selected = favorites.has(currentPhoto.id);
        lightboxFavorite.classList.toggle("is-favorite", selected);
        lightboxFavorite.setAttribute("aria-pressed", String(selected));
    }

    if (currentFilter === "favorites") updateFilter("favorites");
};

const toggleFavorite = (photoId) => {
    if (!photoId) return;
    const selected = favorites.has(photoId);
    if (selected) {
        favorites.delete(photoId);
        showToast(`Đã bỏ ${photoId} khỏi danh sách.`);
    } else {
        favorites.add(photoId);
        showToast(`Đã chọn ${photoId}.`);
    }
    saveFavorites();
    updateFavoriteUI();
};

document.querySelectorAll("[data-favorite-photo]").forEach((button) => {
    button.addEventListener("click", () => toggleFavorite(button.dataset.favoritePhoto));
});

const renderLightbox = () => {
    const visiblePhotos = getVisiblePhotos();
    const photo = visiblePhotos[currentPhotoIndex];
    if (!photo || !lightboxImage) return;

    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
    lightboxPhotoId.textContent = photo.id;
    lightboxCounter.textContent = `${String(currentPhotoIndex + 1).padStart(2, "0")} / ${String(visiblePhotos.length).padStart(2, "0")}`;
    lightboxProgress.style.width = `${((currentPhotoIndex + 1) / visiblePhotos.length) * 100}%`;
    lightboxDownload.href = photo.src;
    lightboxDownload.download = `${photo.id}.jpg`;
    lightboxFavorite.dataset.photoId = photo.id;

    const selected = favorites.has(photo.id);
    lightboxFavorite.classList.toggle("is-favorite", selected);
    lightboxFavorite.setAttribute("aria-pressed", String(selected));
};

const openLightbox = (photo) => {
    const visiblePhotos = getVisiblePhotos();
    const foundIndex = visiblePhotos.findIndex((item) => item.id === photo.id);
    currentPhotoIndex = foundIndex >= 0 ? foundIndex : 0;
    renderLightbox();
    openDialog(lightbox);
};

const moveLightbox = (direction) => {
    const visiblePhotos = getVisiblePhotos();
    if (!visiblePhotos.length) return;
    currentPhotoIndex = (currentPhotoIndex + direction + visiblePhotos.length) % visiblePhotos.length;
    renderLightbox();
};

photos.forEach((photo) => {
    photo.element.querySelector(".gallery-item__view")?.addEventListener("click", () => openLightbox(photo));
});

document.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => moveLightbox(-1));
document.querySelector("[data-lightbox-next]")?.addEventListener("click", () => moveLightbox(1));
document.querySelector("[data-close-lightbox]")?.addEventListener("click", () => closeDialog(lightbox));
lightboxFavorite?.addEventListener("click", () => toggleFavorite(lightboxFavorite.dataset.photoId));

lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeDialog(lightbox);
});

lightbox?.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
}, { passive: true });

lightbox?.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0]?.clientX || 0;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) > 55) moveLightbox(distance > 0 ? -1 : 1);
}, { passive: true });

document.addEventListener("keydown", (event) => {
    if (!lightbox?.open) return;
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
    if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        toggleFavorite(lightboxFavorite?.dataset.photoId);
    }
});

const stopSlideshow = () => {
    window.clearInterval(slideshowTimer);
    slideshowTimer = null;
};

document.querySelectorAll("[data-start-slideshow]").forEach((button) => {
    button.addEventListener("click", () => {
        updateFilter("all");
        currentPhotoIndex = 0;
        renderLightbox();
        openDialog(lightbox);
        stopSlideshow();
        slideshowTimer = window.setInterval(() => moveLightbox(1), 3500);
    });
});

lightbox?.addEventListener("close", () => {
    stopSlideshow();
    syncDialogState();
});

const fallbackCopy = (text) => {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
};

const shareAlbum = async () => {
    const shareData = {
        title: "Minh & An — Private Wedding Gallery",
        text: "Cùng xem những khoảnh khắc trong album cưới của Minh và An.",
        url: window.location.href.replace(/[?&]preview=1/, ""),
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            return;
        }
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareData.url);
        } else {
            fallbackCopy(shareData.url);
        }
        showToast("Đã sao chép liên kết album.");
    } catch (error) {
        if (error?.name !== "AbortError") {
            fallbackCopy(shareData.url);
            showToast("Đã sao chép liên kết album.");
        }
    }
};

document.querySelectorAll("[data-share-album]").forEach((button) => button.addEventListener("click", shareAlbum));

document.querySelectorAll("[data-open-download]").forEach((button) => {
    button.addEventListener("click", () => openDialog(downloadDialog));
});

document.querySelectorAll("[data-download-option]").forEach((button) => {
    button.addEventListener("click", () => {
        const option = button.dataset.downloadOption;
        if (option === "favorites" && favorites.size === 0) {
            showToast("Bạn chưa chọn ảnh yêu thích nào.");
            return;
        }

        const messages = {
            share: "Bản demo: hệ thống sẽ chuẩn bị file ZIP ảnh tối ưu để chia sẻ.",
            original: "Bản demo: hệ thống sẽ chuẩn bị file ZIP ảnh chất lượng cao.",
            favorites: `Bản demo: đang chuẩn bị ${favorites.size} ảnh đã chọn.`,
        };
        closeDialog(downloadDialog);
        showToast(messages[option]);
    });
});

const renderSelectionPreview = () => {
    if (!selectionPreview) return;
    const selectedPhotos = photos.filter((photo) => favorites.has(photo.id));

    if (!selectedPhotos.length) {
        selectionPreview.innerHTML = '<p class="selection-preview__empty">Bạn chưa chọn ảnh nào trong album.</p>';
        return;
    }

    selectionPreview.innerHTML = selectedPhotos
        .map(
            (photo) =>
                `<article><img src="${photo.src}" alt="${photo.caption}" /><span>${photo.id}</span></article>`,
        )
        .join("");
};

document.querySelectorAll("[data-open-selection]").forEach((button) => {
    button.addEventListener("click", () => {
        renderSelectionPreview();
        openDialog(selectionDialog);
    });
});

document.querySelectorAll("[data-show-favorites]").forEach((button) => {
    button.addEventListener("click", () => {
        updateFilter("favorites");
        document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    });
});

document.querySelector("[data-clear-favorites]")?.addEventListener("click", () => {
    favorites.clear();
    saveFavorites();
    updateFavoriteUI();
    renderSelectionPreview();
    showToast("Đã xóa danh sách ảnh được chọn.");
});

selectionForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!favorites.size) {
        showToast("Hãy chọn ít nhất một ảnh trước khi gửi.");
        return;
    }

    const codes = [...favorites].join(", ");
    try {
        localStorage.setItem("moc-mien-last-selection", codes);
    } catch {
        // Saving a demo submission is optional.
    }
    closeDialog(selectionDialog);
    showToast(`Đã ghi nhận ${favorites.size} ảnh. Studio sẽ nhận danh sách mã ảnh của bạn.`);
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

document.querySelectorAll(".album-dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener("close", syncDialogState);
});

updateFilter("all");
updateFavoriteUI();
