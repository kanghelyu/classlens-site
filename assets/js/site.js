(function () {
  "use strict";

  // Mobile nav
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

  function setActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("is-active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("is-active");
      }
    });
  }

  // Back-to-top visibility
  const backToTop = document.querySelector(".back-to-top");
  function handleScroll() {
    setActiveNav();
    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 500);
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Subtle phone tilt on desktop
  const phoneFrame = document.querySelector(".phone-frame");
  const heroVisual = document.querySelector(".hero-visual");
  if (phoneFrame && heroVisual && window.matchMedia("(pointer: fine)").matches) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      phoneFrame.style.transform = `rotateY(${x * -12}deg) rotateX(${y * 8}deg)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
      phoneFrame.style.transform = "";
    });
  }
})();
