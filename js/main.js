(function () {
  "use strict";

  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

  const header = document.querySelector(".header");
  const hero = document.querySelector(".parallax-content");
  const nav = document.getElementById("main-nav");
  const navToggle = document.querySelector(".navbar-toggle");
  const popButton = document.querySelector(".pop-button");
  const pop = document.querySelector(".pop");
  const popClose = document.querySelector(".pop > span");
  const form = document.getElementById("contact");

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("active", y > 100);
    hero.style.backgroundPosition = "center calc(50% + " + y * 0.5 + "px)";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setNavOpen(open) {
    nav.classList.toggle("in", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }
  navToggle.addEventListener("click", function () {
    setNavOpen(!nav.classList.contains("in"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNavOpen(false);
  });

  function setPopOpen(open) {
    pop.style.display = open ? "block" : "none";
  }
  popButton.addEventListener("click", function () { setPopOpen(true); });
  popClose.addEventListener("click", function () { setPopOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setPopOpen(false);
  });

  emailjs.init(EMAILJS_PUBLIC_KEY);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = document.getElementById("form-submit");
    const params = {
      to_name: document.getElementById("name").value,
      message: document.getElementById("message").value,
    };

    setPopOpen(false);
    submitButton.disabled = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(function () {
        showNotification("Message sent successfully!", true);
        form.reset();
      })
      .catch(function (error) {
        console.error("EmailJS error:", error);
        showNotification("Failed to send message.", false);
      })
      .finally(function () {
        submitButton.disabled = false;
      });
  });

  function showNotification(message, success) {
    const note = document.createElement("div");
    note.className = "email-notification " + (success ? "success" : "error");
    note.textContent = message;
    document.body.appendChild(note);

    setTimeout(function () { note.classList.add("show"); }, 10);
    setTimeout(function () {
      note.classList.remove("show");
      setTimeout(function () { note.remove(); }, 300);
    }, 1500);
  }
})();