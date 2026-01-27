const navIcon = document.querySelector(".nav-icon");
const navLinks = document.getElementById("nav-links");

navIcon.addEventListener("click", function () {
  navLinks.classList.toggle("responsive");
});
