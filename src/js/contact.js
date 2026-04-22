import { createIcons, icons } from "lucide";

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

function setButtonStatus(status) {
    const btn = document.getElementById("form-submit");

    if (status === "loader") {
        btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Envoi...`;
        btn.classList.remove("bg-green-500", "bg-red-500");
    } else if (status === "check") {
        btn.innerHTML = `<i data-lucide="check"></i> Envoyé !`;
        btn.classList.remove("bg-red-500");
        btn.classList.add("bg-green-500");
    } else if (status === "error") {
        btn.innerHTML = `<i data-lucide="x"></i> Erreur`;
        btn.classList.remove("bg-green-500");
        btn.classList.add("bg-red-500");
    } else {
        btn.innerHTML = `<i data-lucide="send"></i> Envoyer`;
        btn.classList.remove("bg-green-500", "bg-red-500");
    }
    createIcons({ icons });
}

const form = document.getElementById("form");
const btn = document.getElementById("form-submit");
const formErrorMsg = document.getElementById("form-error");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot anti bot
    if (document.getElementById("hp").value != "") {
        setButtonStatus("error");
        formErrorMsg.classList.replace("hidden", "block");
        return;
    }

    btn.disabled = true;
    setButtonStatus("loader");

    const data = {
        email: document.getElementById("form-mail").value,
        message: document.getElementById("form-textarea").value
    }

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.getElementById("form-mail").value = "";
            document.getElementById("form-textarea").value = "";
            setButtonStatus("check");
        } else {
            const errorData = await response.json().catch(() => ({ message: "Erreur interne au serveur." }));
            setButtonStatus("error");
            formErrorMsg.classList.replace("hidden", "block");
            console.error(errorData.message);
        }
    } catch (err) {
        console.error(err);
        formErrorMsg.classList.replace("hidden", "block");
        setButtonStatus("error");
    } finally {
        setTimeout(() => {
            btn.disabled = false;
            formErrorMsg.classList.replace("block", "hidden");
            setButtonStatus("send");
        }, 5000);
    }
});
