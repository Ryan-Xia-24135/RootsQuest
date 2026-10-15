/* ROOTS Quest — page behaviour
   - nav: hover menus jump to sections, current-section highlight, mobile menu
   - session time shown in the visitor's time zone
   - single-open accordions
   - reveal-on-scroll
   - optional YouTube embed */

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Config ---------- */
  // Paste the YouTube video ID (the part after "v=" in the URL) once Ryan's intro video is ready.
  const YOUTUBE_VIDEO_ID = "";

  /* ---------- Page story order ---------- */
  // Keep the editable HTML sections independent, then place them in the same order visitors
  // see and assistive technology reads them.
  const main = document.querySelector("main");
  const storyOrders = {
    "home-page": ["top", "what", "founder", "who", "why", "learn", "commitment", "join"],
    "curriculum-page": ["top", "weeks", "projects", "faq", "join-curriculum", "skills"],
    "about-page": ["top", "team", "roots", "contact", "story"],
    "evidence-page": ["top", "beyond-ecology", "industry", "problem", "beyond-skills"]
  };
  const pageClass = Object.keys(storyOrders).find((name) => document.body.classList.contains(name));
  if (main && pageClass) {
    storyOrders[pageClass].forEach((id) => {
      const section = document.getElementById(id);
      if (section) main.appendChild(section);
    });
  }

  /* ---------- Nav ---------- */
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".nav__burger");
  const norm = (p) => p.replace(/index\.html$/, "").replace(/\.html$/, "").replace(/\/$/, "") || "/";
  const here = norm(location.pathname);

  // Links in the hover menus / mobile menu that point at a section of THIS page
  const sectionLinks = Array.from(document.querySelectorAll(".tabs__menu a, .nav__subs a")).filter((a) => {
    const u = new URL(a.getAttribute("href"), location.href);
    return u.hash && norm(u.pathname) === here;
  });

  const pages = Array.from(document.querySelectorAll("main > section[id]"));
  let pageId = null;

  function setPage(id, fromScroll) {
    if (id === pageId) return;
    pageId = id;
    sectionLinks.forEach((a) => a.classList.toggle("is-active", new URL(a.href).hash === `#${id}`));
    if (fromScroll) {
      // Keep the address bar on the section in view so it can be linked or bookmarked
      history.replaceState(null, "", id === pages[0]?.id ? location.pathname + location.search : `#${id}`);
    }
  }

  function spy(fromScroll) {
    const line = window.innerHeight * 0.38;
    let current = pages[0];
    for (const section of pages) {
      if (section.getBoundingClientRect().top <= line) current = section;
    }
    if (current) setPage(current.id, fromScroll === true);
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", () => spy(true), { passive: true });
  spy();

  if (burger) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav__menu a").forEach((link) =>
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

  // Opening a shared link like /curriculum#faq: images above load mid-jump and push the
  // section down, so snap to it again once everything has loaded.
  const linked = location.hash && document.getElementById(location.hash.slice(1));
  if (linked) {
    // Web fonts arrive in waves and each one can reflow the page, so re-align after every
    // wave, until the visitor takes over by scrolling themselves.
    let userMoved = false;
    ["wheel", "touchstart", "keydown", "mousedown"].forEach((ev) =>
      window.addEventListener(ev, () => (userMoved = true), { once: true, passive: true })
    );
    const realign = () => { if (!userMoved) linked.scrollIntoView({ behavior: "instant" }); };
    window.addEventListener("load", () => {
      realign();
      document.fonts?.addEventListener?.("loadingdone", realign);
      setTimeout(realign, 1200);
      setTimeout(() => document.fonts?.removeEventListener?.("loadingdone", realign), 4000);
    });
  }

  /* ---------- Session time in the visitor's time zone ---------- */
  // Sessions run Sundays at 5:00 p.m. Mountain Time (Calgary). The first one is Oct 18, 2026,
  // 23:00 UTC. Visitors elsewhere see the same moment in their own time zone.
  const sessionEls = document.querySelectorAll("[data-session-time]");
  if (sessionEls.length) {
    try {
      const first = new Date(Date.UTC(2026, 9, 18, 23, 0));
      const fmt = (zone, opts) => new Intl.DateTimeFormat("en-CA", { timeZone: zone, ...opts });
      const clock = { hour: "numeric", minute: "2-digit", hour12: true };
      const day = { weekday: "long" };
      const tidy = (s) => s.replace(/\s?([ap])\.?m\.?/i, (_, x) => ` ${x.toLowerCase()}.m.`);
      const localClock = fmt(undefined, clock).format(first);
      const sameAsCalgary =
        localClock === fmt("America/Edmonton", clock).format(first) &&
        fmt(undefined, day).format(first) === fmt("America/Edmonton", day).format(first);
      if (!sameAsCalgary) {
        const weekday = fmt(undefined, day).format(first);
        const zone = fmt(undefined, { timeZoneName: "short" }).formatToParts(first).find((p) => p.type === "timeZoneName")?.value || "";
        sessionEls.forEach((el) => {
          el.innerHTML = `${el.dataset.lead ?? ""}<span class="st">${weekday}s at ${tidy(localClock)} ${zone} <small>(5:00 p.m. MT)</small></span>`;
          el.title = "Shown in your time zone. Sessions run Sundays at 5:00 p.m. Mountain Time; if your region changes its clocks on different dates, the local time can shift by an hour.";
        });
      }
    } catch (e) { /* keep the Mountain Time text */ }
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
