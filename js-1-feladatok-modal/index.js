// source: https://w3collective.com/popup-modal-javascript/

'use strict';

let modal;
document.addEventListener("click", (e) => {
    if (e.target.className === "modal-open") {
        modal = document.getElementById(e.target.dataset.id);
        openModal(modal);
    } else if (e.target.className.indexOf("modal-close") > -1) {
        closeModal(modal);
    } else if(e.target.className.indexOf('modal-background') > -1) {
        closeModal(modal);
    } else {
        return;
    }
});

const openModal = (modal) => {
    document.body.style.overflow = "hidden";
    modal.removeAttribute("out")
    modal.setAttribute("open", "true");
    document.addEventListener("keydown", escClose);
    let overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    document.body.appendChild(overlay);
};

const closeModal = (modal) => {
    modal.removeAttribute("open");
    modal.setAttribute("out", "true");
    document.getElementById("modal-overlay").setAttribute("out", "true");
    const modal_Inner = document.getElementById("modal-inner-id");
    modal_Inner.setAttribute("out", "true");
    setTimeout(()=>{
        document.body.style.overflow = "auto";
        document.removeEventListener("keydown", escClose);
        document.body.removeChild(document.getElementById("modal-overlay"));
        modal_Inner.removeAttribute('out');
        }, 
    2400);
};

const escClose = (e) => {
    if (e.keyCode == 27) {
        closeModal(modal);
    }
};
