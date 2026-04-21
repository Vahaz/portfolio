function checkLength(textarea) {
    const maxLength = textarea.getAttribute("maxlength");
    const currentLength = textarea.value.length;
    const counter = document.getElementById("counter");
    counter.textContent = `${currentLength}/${maxLength}`;

    if (currentLength >= maxLength) {
        textarea.setAttribute("aria-invalid", "true");
        counter.classList.replace("text-[#bebec0]", "text-red-400");
    } else {
        textarea.setAttribute("aria-invalid", "false");
        counter.classList.replace("text-red-400", "text-[#bebec0]");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("form-textarea");
    textarea.addEventListener("input", function () {
        checkLength(textarea);
    });
});

function sendMail() {

}


function setIconStatus(status) {
    const send = document.getElementById("form-send");
    const loader = document.getElementById("form-loader");
    const check = document.getElementById("form-check");

    if (status === "send") {
        send.classList.remove("hidden");
        loader.classList.add("hidden");
        check.classList.add("hidden");
    } else if (status === "loader") {
        send.classList.add("hidden");
        loader.classList.remove("hidden");
        check.classList.add("hidden");
    } else if (status === "check") {
        send.classList.add("hidden");
        loader.classList.add("hidden");
        check.classList.remove("hidden");
    }
}
