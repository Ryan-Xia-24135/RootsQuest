/* ROOTS Quest — motion layer
   Smooth scrolling (Lenis) + scroll-driven animation (GSAP / ScrollTrigger).
   Everything here is an enhancement: if the libraries fail to load, or the visitor
   prefers reduced motion, the page works with main.js alone. */

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Pointer spotlight on cards (no libraries needed) ---------- */
  if (!reduceMotion) {
    $$(".spot").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Looping marquee: duplicate the strip so it wraps seamlessly ---------- */
  if (!reduceMotion) {
    $$(".marquee").forEach((m) => {
      const track = m.querySelector(".marquee__track");
      if (!track) return;
      Array.from(track.children).forEach((n) => track.appendChild(n.cloneNode(true)));
      m.classList.add("is-ready");
    });
  }

  if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ---------- Smooth scrolling ---------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // In-page links glide to their section
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      // Images above the target can finish loading mid-glide and push it down, so
      // check where we landed and nudge the rest of the way if needed.
      const settle = () => {
        const off = target.getBoundingClientRect().top;
        if (Math.abs(off) > 2) lenis.scrollTo(target, { offset: 0, duration: 0.6, onComplete: settle });
      };
      lenis.scrollTo(target, { offset: 0, duration: 1.4, onComplete: settle });
      history.replaceState(null, "", id === "#top" ? location.pathname + location.search : id);
    });
  }

  /* ---------- Scroll progress bar ---------- */
  const bar = document.querySelector(".progress i");
  if (bar) {
    gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });
  }

  /* ---------- Split a heading into words that can rise out of a mask ---------- */
  function splitWords(el) {
    if (Array.from(el.children).some((c) => c.tagName !== "BR")) return [];
    const words = [];
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType !== 3) return;
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
        const w = document.createElement("span");
        w.className = "w";
        w.setAttribute("aria-hidden", "true");
        const i = document.createElement("i");
        i.textContent = part;
        w.appendChild(i);
        frag.appendChild(w);
        words.push(i);
      });
      node.replaceWith(frag);
    });
    return words;
  }

  /* ---------- Hero intro + scroll-away ---------- */
  const heroCard = document.querySelector(".hero__card");
  if (heroCard) {
    heroCard.style.transition = "none"; // scrubbed by GSAP below; CSS transition would make it lag
    const title = heroCard.querySelector(".hero__title");
    const titleWords = title ? splitWords(title) : [];
    const tl = gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } });
    tl.from(heroCard.querySelector(".rule"), { scaleX: 0, duration: 0.7 })
      .from(titleWords, { yPercent: 115, duration: 1, stagger: 0.14, clearProps: "transform" }, "-=0.4")
      .from(heroCard.querySelector(".hero__tagline"), { y: 24, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(heroCard.querySelectorAll(".btn-row .btn"), { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
      .from(heroCard.querySelectorAll(".hero__facts span"), { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
      .from(heroCard.querySelector(".hero__time"), { y: 10, opacity: 0, duration: 0.6 }, "-=0.3");

    gsap.to(heroCard, {
      yPercent: -9,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  }

  /* ---------- Section headings: words rise into place; rules draw in ---------- */
  $$(".section:not(.hero) h2, .footer h2").forEach((h) => {
    const words = splitWords(h);
    if (!words.length) return;
    gsap.from(words, {
      yPercent: 115,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.06,
      clearProps: "transform",
      scrollTrigger: { trigger: h, start: "top 88%", once: true },
    });
  });

  $$(".section:not(.hero) .rule").forEach((r) => {
    gsap.from(r, {
      scaleX: 0,
      transformOrigin: r.classList.contains("rule--center") ? "center" : "left center",
      duration: 0.8,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: { trigger: r, start: "top 92%", once: true },
    });
  });

  /* ---------- Photos drift slightly inside their frames while scrolling ---------- */
  $$(".photo, .outcome__img, .case__img").forEach((box) => {
    const img = box.querySelector("img");
    if (!img) return;
    img.style.transition = "none";
    gsap.fromTo(
      img,
      { yPercent: -7, scale: 1.16 },
      { yPercent: 7, scale: 1.16, ease: "none", scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });

  /* ---------- Count-up numbers ---------- */
  $$("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count) || 0;
    const state = { v: 0 };
    el.textContent = "0";
    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(state, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => (el.textContent = String(Math.round(state.v))),
        }),
    });
  });

  /* ---------- "What you learn" lists stagger in ---------- */
  $$(".learn__list").forEach((list) => {
    gsap.from(list.children, {
      opacity: 0,
      y: 18,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: list, start: "top 82%", once: true },
    });
  });

  /* ---------- Keep trigger positions right as the page changes height ---------- */
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  document.fonts?.ready.then(refresh);
  document.addEventListener("click", (e) => {
    if (e.target.closest(".acc__btn")) setTimeout(refresh, 320);
  });
})();
