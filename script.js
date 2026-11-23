const menuRoot = document.querySelector(".menu-root");
const menuButton = document.getElementById("gamesMenuButton");
const submenu = document.getElementById("gamesSubmenu");

function setMenu(open) {
  menuRoot.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
}
menuButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setMenu(!menuRoot.classList.contains("open"));
});
document.addEventListener("click", (event) => {
  if (!menuRoot.contains(event.target)) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    menuButton.focus();
  }
});
submenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

const dateElement = document.getElementById("currentDate");
function updateDate() {
  const now = new Date();
  dateElement.textContent = new Intl.DateTimeFormat("pt-BR", {
    weekday: "short", day: "2-digit", month: "2-digit", year: "numeric"
  }).format(now);
}
updateDate();

const aboutDialog = document.getElementById("aboutDialog");
document.getElementById("aboutButton").addEventListener("click", () => aboutDialog.showModal());
document.getElementById("closeAbout").addEventListener("click", () => aboutDialog.close());
document.getElementById("okAbout").addEventListener("click", () => aboutDialog.close());
