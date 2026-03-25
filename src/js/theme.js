const themebtn = document.getElementById("nav-theme");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
let isDarkMode = true;

themebtn.addEventListener("click", function() {
    isDarkMode = !isDarkMode;
    // localStorage.setItem("portfolio_theme", isDarkMode);
    setTheme();
});

window.addEventListener("load", () => {
    // var themeStorage = localStorage.getItem("portfolio_theme");
    // if (themeStorage) isDarkMode = themeStorage === "true";
    setTheme();
});

function setTheme() {
    if (isDarkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
        sun.classList.remove("hidden");
        moon.classList.add("hidden");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        sun.classList.add("hidden");
        moon.classList.remove("hidden");
    }
}
