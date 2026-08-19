const dialogTriggers = document.querySelectorAll("[data-dialog]");
const infoDialogs = document.querySelectorAll(".info-dialog");

dialogTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const dialog = document.getElementById(trigger.dataset.dialog);

        if (dialog instanceof HTMLDialogElement) {
            dialog.dataset.opener = trigger.dataset.dialog;
            dialog.showModal();
        }
    });
});

infoDialogs.forEach((dialog) => {
    dialog.querySelector("[data-close-dialog]")?.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    dialog.addEventListener("close", () => {
        document.querySelector(`[data-dialog="${dialog.id}"]`)?.focus();
    });
});
