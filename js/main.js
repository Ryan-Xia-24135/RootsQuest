/* ROOTS Quest v2 — page behaviour
   - sticky nav with animated white pill (scroll-spy)
   - mobile menu
   - single-open accordions
   - reveal-on-scroll
   - optional YouTube embed */

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Config ---------- */
  // Paste the YouTube video ID (the part after "v=" in the URL) once Ryan's intro video is ready.
  const YOUTUBE_VIDEO_ID = "";

  /* ---------- Nav ---------- */
  const nav = document.querySelector(".nav");
  const tabs = document.querySelector(".tabs");
  const links = Array.from(document.querySelectorAll(".tabs__link"));
  const menuLinks = Array.from(document.querySelectorAll(".nav__menu a"));
  const indicator = document.querySelector(".tabs__indicator");
  const burger = document.querySelector(".nav__burger");

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function setIndicator(link) {
    if (!indicator || !tabs || !link) return;
    const list = link.parentElement;
    const width = list.offsetWidth;
    if (!width) return;
    const left = link.offsetLeft;
    const right = left + link.offsetWidth;
    const leftInset = (left / width) * 100;
    const rightInset = 100 - (right / width) * 100;
    indicator.style.clipPath = `inset(0 ${rightInset.toFixed(3)}% 0 ${leftInset.toFixed(3)}% round 999px)`;
  }

  let activeId = null;
  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    links.forEach((link) => {
      const on = link.getAttribute("href") === `#${id}`;
      link.toggleAttribute("aria-current", on);
      if (on) setIndicator(link);
    });
    menuLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
  }

  function spy() {
    const line = window.innerHeight * 0.38;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section;
    }
    // Footer / bottom of page → last tab
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    if (current) setActive(current.id);
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("resize", () => {
    const link = links.find((l) => l.hasAttribute("aria-current"));
    setIndicator(link);
  });
  document.fonts?.ready.then(() => setIndicator(links.find((l) => l.hasAttribute("aria-current"))));
  spy();

  links.forEach((link) => link.addEventListener("click", () => setActive(link.getAttribute("href").slice(1))));

  if (burger) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    menuLinks.forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* ---------- Accordions (single open per group) ---------- */
  document.querySelectorAll(".acc").forEach((group) => {
    const items = Array.from(group.querySelectorAll(".acc__item"));
    items.forEach((item, index) => {
      const btn = item.querySelector(".acc__btn");
      const panel = item.querySelector(".acc__panel");
      const id = `${group.id || "acc"}-${index}`;
      btn.setAttribute("aria-controls", id);
      panel.id = id;
      btn.setAttribute("aria-expanded", String(item.classList.contains("is-open")));
      btn.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");
        items.forEach((other) => {
          other.classList.remove("is-open");
          other.querySelector(".acc__btn").setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Video ---------- */
  const video = document.querySelector(".video");
  if (video && YOUTUBE_VIDEO_ID) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`;
    iframe.title = "ROOTS Quest course introduction";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    video.innerHTML = "";
    video.appendChild(iframe);
  }
})();
