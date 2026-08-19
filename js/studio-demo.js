const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#main-nav");

navToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open") ?? false;
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
});

mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    });
});

const bookingForm = document.querySelector(".booking-form");
const formStatus = document.querySelector(".form-status");

bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formStatus) {
        formStatus.textContent = "Đây là form demo. Khi triển khai thật, yêu cầu sẽ được gửi trực tiếp đến Studio.";
    }
});
