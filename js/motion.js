/* ROOTS Quest — motion layer
   Smooth scrolling (Lenis) + scroll-driven animation (GSAP / ScrollTrigger), and the
   procedurally grown forest. Everything here is an enhancement: if the libraries fail to
   load, or the visitor prefers reduced motion, the page works with main.js alone and the
   illustrations simply appear fully grown. */

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const animated = !reduceMotion && !!window.gsap && !!window.ScrollTrigger;
  const SVGNS = "http://www.w3.org/2000/svg";

  /* ---------- Pointer spotlight on cards ---------- */
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

  /* =====================================================================
     Forest: trees branch upward, roots reach downward and link up underground
     ===================================================================== */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const node = (name, attrs) => {
    const n = document.createElementNS(SVGNS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const mix = (c1, c2, t) => `rgb(${[0, 1, 2].map((i) => Math.round(lerp(c1[i], c2[i], t))).join(",")})`;

  const PRESETS = {
    scroll: {
      sky: true, aspect: "xMidYMid slice", treeDepth: 6, rootDepth: 5,
      wide: { W: 1200, H: 770, ground: 505, trees: [{ x: 230, h: 185 }, { x: 600, h: 212 }, { x: 970, h: 175 }] },
      narrow: { W: 400, H: 800, ground: 470, trees: [{ x: 105, h: 168 }, { x: 290, h: 150 }] },
    },
    mini: {
      sky: false, aspect: "xMidYMax slice", treeDepth: 5, rootDepth: 4,
      wide: { W: 1200, H: 300, ground: 215, trees: [{ x: 170, h: 92 }, { x: 440, h: 118 }, { x: 760, h: 100 }, { x: 1040, h: 120 }] },
      narrow: { W: 400, H: 300, ground: 215, trees: [{ x: 95, h: 98 }, { x: 300, h: 112 }] },
    },
  };

  function buildForest(host) {
    const key = host.dataset.forest;
    const P = PRESETS[key];
    if (!P) return null;
    const cfg = window.innerWidth < 700 ? P.narrow : P.wide;
    const { W, H, ground, trees } = cfg;
    const rand = mulberry32(key === "scroll" ? 7 : 21);

    const svg = node("svg", { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: P.aspect, "aria-hidden": "true", focusable: "false" });
    const defs = node("defs", {});
    defs.innerHTML = `
      <linearGradient id="sky-${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050a07"/><stop offset="1" stop-color="#143325"/></linearGradient>
      <linearGradient id="soil-${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22160d"/><stop offset="1" stop-color="#080503"/></linearGradient>
`;
    svg.appendChild(defs);
    if (P.sky) {
      svg.appendChild(node("rect", { x: 0, y: 0, width: W, height: ground, fill: `url(#sky-${key})` }));
      svg.appendChild(node("rect", { x: 0, y: ground, width: W, height: H - ground, fill: `url(#soil-${key})` }));
    }
    svg.appendChild(node("path", { d: `M0 ${ground}H${W}`, stroke: "rgba(255,255,255,.2)", "stroke-width": 1.4, fill: "none" }));

    const gRoots = node("g", { fill: "none", "stroke-linecap": "round" });
    const gTrees = node("g", { fill: "none", "stroke-linecap": "round" });
    const gLinks = node("g", { fill: "none", "stroke-linecap": "round" });
    const gLeaves = node("g", {});
    const gNodes = node("g", {});
    [gRoots, gLinks, gTrees, gLeaves, gNodes].forEach((g) => svg.appendChild(g));

    const out = { branches: [], roots: [], leaves: [], links: [], nodes: [] };
    const TRUNK = [138, 111, 82], TWIG = [220, 210, 184];
    const ROOT_A = [190, 148, 102], ROOT_B = [112, 84, 58];
    const leafColors = ["#9fcf9a", "#7fb98a", "#ccdecd", "#b9d98f", "#8cc3a0"];

    // Recursively grow a limb. dir = 1 grows up (branches), -1 grows down (roots).
    function grow(x, y, ang, len, depth, maxD, dir, w, colorFn, group, bucket, tips) {
      const ex = x + Math.sin(ang) * len;
      const ey = y - Math.cos(ang) * len * dir;
      const bend = (rand() - 0.5) * len * 0.4;
      const mx = (x + ex) / 2 + ((-(ey - y)) / len) * bend;
      const my = (y + ey) / 2 + ((ex - x) / len) * bend;
      const p = node("path", {
        d: `M${x.toFixed(1)} ${y.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
        stroke: colorFn(depth / maxD),
        "stroke-width": Math.max(w, 0.9).toFixed(2),
      });
      group.appendChild(p);
      bucket.push({ d: depth, el: p });
      if (depth >= maxD) { tips.push([ex, ey]); return; }
      const n = depth < 2 ? 2 : rand() < 0.3 ? 3 : 2;
      for (let i = 0; i < n; i++) {
        const spread = (i - (n - 1) / 2) * (0.5 + rand() * 0.28) + (rand() - 0.5) * 0.28;
        grow(ex, ey, ang + spread, len * (0.7 + rand() * 0.12), depth + 1, maxD, dir, w * 0.7, colorFn, group, bucket, tips);
      }
    }

    const rootTips = [];
    trees.forEach((t, ti) => {
      const tips = [];
      grow(t.x, ground, (rand() - 0.5) * 0.12, t.h * 0.33, 0, P.treeDepth, 1, t.h * 0.046, (f) => mix(TRUNK, TWIG, f), gTrees, out.branches, tips);
      tips.forEach(([x, y]) => {
        const k = rand() < 0.55 ? 2 : 1;
        for (let i = 0; i < k; i++) {
          const c = node("circle", {
            cx: (x + (rand() - 0.5) * 12).toFixed(1), cy: (y + (rand() - 0.5) * 12).toFixed(1),
            r: (3 + rand() * 3.6).toFixed(1), fill: leafColors[Math.floor(rand() * leafColors.length)], "fill-opacity": 0.88,
          });
          gLeaves.appendChild(c);
          out.leaves.push(c);
        }
      });
      const rt = [];
      [-0.78, -0.12, 0.62].forEach((a, i) => {
        grow(t.x + (i - 1) * 6, ground, a + (rand() - 0.5) * 0.2, t.h * 0.27, 0, P.rootDepth, -1, t.h * 0.03, (f) => mix(ROOT_A, ROOT_B, f), gRoots, out.roots, rt);
      });
      rootTips[ti] = rt;
    });

    // Underground network: roots of neighbouring trees reach toward each other and join,
    // at several depths so it reads as a web rather than a single knot
    for (let i = 0; i < trees.length - 1; i++) {
      const A = rootTips[i].filter(([x]) => x > trees[i].x).sort((p, q) => p[1] - q[1]);
      const B = rootTips[i + 1].filter(([x]) => x < trees[i + 1].x);
      const want = 6, usedA = new Set(), usedB = new Set();
      for (let k = 0; k < want && A.length; k++) {
        const a = A[Math.min(A.length - 1, Math.floor(((k + 0.5) / want) * A.length))];
        if (usedA.has(a)) continue;
        let best = null, bd = Infinity;
        B.forEach((b) => { if (usedB.has(b)) return; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (d < bd) { bd = d; best = b; } });
        if (!best) continue;
        usedA.add(a); usedB.add(best);
        const mx = (a[0] + best[0]) / 2, my = (a[1] + best[1]) / 2 + 10 + rand() * 14;
        const l = node("path", { d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${best[0].toFixed(1)} ${best[1].toFixed(1)}`, stroke: "#e5c055", "stroke-width": 1.8, "stroke-opacity": 0.9 });
        gLinks.appendChild(l);
        out.links.push(l);
        [a, best].forEach(([x, y]) => {
          const c = node("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: 3.4, fill: "#f3d376" });
          gNodes.appendChild(c);
          out.nodes.push(c);
        });
      }
    }

    host.appendChild(svg);
    return out;
  }

  const forests = $$(".forest[data-forest]").map((host) => ({ host, parts: buildForest(host) })).filter((f) => f.parts);

  /* ---------- Process line (static fallback) ---------- */
  const processes = $$(".process").map((list) => {
    const line = document.createElement("span");
    line.className = "process__line";
    list.appendChild(line);
    return { list, line, items: $$("li", list) };
  });
  if (!animated) processes.forEach(({ line, items }) => { line.style.transform = "none"; items.forEach((li) => li.classList.add("is-on")); });

  if (!animated) return;

  /* ===================== Animated enhancements below ===================== */
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

    const norm = (p) => p.replace(/index\.html$/, "").replace(/\.html$/, "").replace(/\/$/, "") || "/";
    // Links to this page (a section, or the page itself) glide instead of jumping
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin || norm(u.pathname) !== norm(location.pathname)) return;
      let target = null;
      if (u.hash.length > 1) target = document.getElementById(u.hash.slice(1));
      else if (a.matches(".tabs__link, .nav__page, .nav__logo, .footer a")) target = document.documentElement;
      if (!target) return;
      e.preventDefault();
      const goTop = target === document.documentElement;
      // Images above the target can finish loading mid-glide and push it down, so
      // check where we landed and nudge the rest of the way if needed.
      const settle = () => {
        if (goTop) return;
        if (Math.abs(target.getBoundingClientRect().top) > 2) lenis.scrollTo(target, { offset: 0, duration: 0.6, onComplete: settle });
      };
      lenis.scrollTo(goTop ? 0 : target, { offset: 0, duration: 1.4, onComplete: settle });
      history.replaceState(null, "", goTop || target === $$("main > section[id]")[0] ? location.pathname + location.search : u.hash);
    });
  }

  /* ---------- Scroll progress bar ---------- */
  const bar = document.querySelector(".progress i");
  if (bar) gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });

  /* ---------- Split a heading into words that can rise out of a mask ---------- */
  function splitWords(el) {
    if (Array.from(el.children).some((c) => c.tagName !== "BR")) return [];
    const words = [];
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    Array.from(el.childNodes).forEach((n) => {
      if (n.nodeType !== 3) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((part) => {
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
      n.replaceWith(frag);
    });
    return words;
  }

  /* ---------- Drifting leaves over the hero / page headers ---------- */
  const LEAF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C12 2 4.5 8 4.5 14a7.5 7.5 0 0 0 15 0C19.5 8 12 2 12 2z"/></svg>';
  const leafColors = ["#9fcf9a", "#7fb98a", "#ccdecd", "#e5c055", "#b9d98f"];
  $$(".drift").forEach((host) => {
    const area = host.parentElement;
    const count = area.classList.contains("hero") ? 9 : 6;
    const timelines = [];
    for (let k = 0; k < count; k++) {
      const leaf = document.createElement("i");
      leaf.innerHTML = LEAF;
      leaf.style.setProperty("--s", `${12 + Math.random() * 16}px`);
      leaf.style.setProperty("--c", leafColors[k % leafColors.length]);
      leaf.style.left = `${4 + Math.random() * 92}%`;
      host.appendChild(leaf);
      const dur = 16 + Math.random() * 14;
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(leaf, { y: -40, rotation: Math.random() * 360 }, { y: () => area.clientHeight + 40, rotation: "+=300", duration: dur, ease: "none" }, 0)
        .fromTo(leaf, { opacity: 0 }, { opacity: 0.5, duration: dur * 0.12, ease: "none" }, 0)
        .to(leaf, { opacity: 0, duration: dur * 0.12, ease: "none" }, dur * 0.88);
      gsap.to(leaf, { x: `+=${40 + Math.random() * 60}`, duration: 3 + Math.random() * 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      tl.progress(Math.random());
      timelines.push(tl);
    }
    ScrollTrigger.create({ trigger: area, start: "top bottom", end: "bottom top", onToggle: (s) => timelines.forEach((t) => (s.isActive ? t.resume() : t.pause())) });
  });

  /* ---------- Home hero intro + scroll-away ---------- */
  const heroCard = document.querySelector(".hero__card");
  if (heroCard) {
    heroCard.style.transition = "none"; // scrubbed by GSAP below; a CSS transition would make it lag
    const title = heroCard.querySelector(".hero__title");
    const titleWords = title ? splitWords(title) : [];
    const tl = gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } });
    tl.from(heroCard.querySelector(".hero__badge"), { y: 14, opacity: 0, duration: 0.6 })
      .from(heroCard.querySelector(".rule"), { scaleX: 0, duration: 0.7 }, "-=0.3")
      .from(titleWords, { yPercent: 115, duration: 1, stagger: 0.14, clearProps: "transform" }, "-=0.4")
      .from(heroCard.querySelector(".hero__tagline"), { y: 24, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(heroCard.querySelectorAll(".btn-row .btn"), { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
      .from(heroCard.querySelectorAll(".hero__facts span"), { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
      .from(heroCard.querySelector(".hero__time"), { y: 10, opacity: 0, duration: 0.6 }, "-=0.3");
    gsap.to(heroCard, { yPercent: -9, opacity: 0.25, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }

  /* ---------- Subpage header intro ---------- */
  const pageHero = document.querySelector(".page-hero__inner");
  if (pageHero) {
    gsap.from([pageHero.querySelector(".eyebrow"), pageHero.querySelector(".lede")], { y: 22, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.5, clearProps: "transform,opacity" });
  }

  /* ---------- Headings: words rise into place; rules draw in ---------- */
  $$(".section:not(.hero) h2, .page-hero h1").forEach((h) => {
    const words = splitWords(h);
    if (!words.length) return;
    gsap.from(words, {
      yPercent: 115, duration: 0.9, ease: "power3.out", stagger: 0.06, clearProps: "transform",
      delay: h.closest(".page-hero") ? 0.15 : 0,
      scrollTrigger: { trigger: h, start: "top 90%", once: true },
    });
  });
  $$(".section:not(.hero) .rule").forEach((r) => {
    gsap.from(r, {
      scaleX: 0, transformOrigin: r.classList.contains("rule--center") ? "center" : "left center",
      duration: 0.8, ease: "power3.out", clearProps: "transform",
      scrollTrigger: { trigger: r, start: "top 92%", once: true },
    });
  });

  /* ---------- Photos drift slightly inside their frames while scrolling ---------- */
  $$(".photo, .outcome__img, .case__img").forEach((box) => {
    const img = box.querySelector("img");
    if (!img) return;
    img.style.transition = "none";
    gsap.fromTo(img, { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: "none", scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true } });
  });

  /* ---------- Count-up numbers ---------- */
  $$("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count) || 0;
    const state = { v: 0 };
    el.textContent = "0";
    ScrollTrigger.create({
      trigger: el, start: "top 92%", once: true,
      onEnter: () => gsap.to(state, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => (el.textContent = String(Math.round(state.v))) }),
    });
  });

  /* ---------- Lists stagger in ---------- */
  $$(".learn__list").forEach((list) => {
    gsap.from(list.children, { opacity: 0, y: 18, duration: 0.7, ease: "power3.out", stagger: 0.08, clearProps: "transform,opacity", scrollTrigger: { trigger: list, start: "top 82%", once: true } });
  });

  /* ---------- Diagrams: lines draw, nodes pop (systems web, sprout, trail, rings) ---------- */
  $$("[data-viz]").forEach((box) => {
    const draws = $$(".js-draw", box);
    const pops = $$(".js-pop", box);
    draws.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 100;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
    gsap.set(pops, { scale: 0, transformOrigin: "50% 50%" });
    const tl = gsap.timeline({ paused: true });
    tl.to(draws, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", stagger: 0.07 })
      .to(pops, { scale: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.09 }, 0.25);
    ScrollTrigger.create({ trigger: box, start: "top 82%", once: true, onEnter: () => tl.play() });
  });

  /* ---------- Project path: the line fills as you scroll, the steps light up ---------- */
  processes.forEach(({ list, line, items }) => {
    const vertical = window.matchMedia("(max-width: 760px)").matches;
    gsap.set(line, vertical ? { scaleX: 1, scaleY: 0 } : { scaleY: 1, scaleX: 0 });
    gsap.to(line, {
      [vertical ? "scaleY" : "scaleX"]: 1, ease: "none",
      scrollTrigger: {
        trigger: list, start: "top 78%", end: "bottom 55%", scrub: 0.4,
        onUpdate: (self) => items.forEach((li, i) => li.classList.toggle("is-on", self.progress >= (i / (items.length - 1)) * 0.92)),
      },
    });
  });

  /* ---------- The forest ---------- */
  forests.forEach(({ host, parts }) => {
    const mode = host.dataset.forest;
    const band = host.closest(".forest-band");
    const paths = [...parts.branches, ...parts.roots];
    paths.forEach(({ el }) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
    });
    parts.links.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
    });
    gsap.set([...parts.leaves, ...parts.nodes], { scale: 0, transformOrigin: "50% 50%" });
    if (band) band.classList.add("is-live");

    const byDepth = (list) => list.reduce((m, b) => ((m[b.d] = m[b.d] || []).push(b.el), m), {});
    const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    const bd = byDepth(parts.branches), rd = byDepth(parts.roots);
    Object.keys(bd).forEach((d) => tl.to(bd[d], { strokeDashoffset: 0, duration: 0.1, ease: "power1.out", stagger: { amount: 0.03 } }, d * 0.035));
    tl.to(parts.leaves, { scale: 1, duration: 0.16, ease: "back.out(2.4)", stagger: { amount: 0.14, from: "random" } }, 0.26);
    Object.keys(rd).forEach((d) => tl.to(rd[d], { strokeDashoffset: 0, duration: 0.1, ease: "power1.out", stagger: { amount: 0.03 } }, 0.42 + d * 0.035));
    tl.to(parts.links, { strokeDashoffset: 0, duration: 0.2, ease: "power2.out", stagger: 0.05 }, 0.68);
    tl.to(parts.nodes, { scale: 1, duration: 0.12, ease: "back.out(3)", stagger: { amount: 0.12, from: "random" } }, 0.8);

    if (mode === "scroll" && band) {
      const caps = $$(".cap", band);
      gsap.set(caps, { opacity: 0, y: 20 });
      gsap.set(caps[0], { opacity: 1, y: 0 });
      tl.to(caps[0], { opacity: 0, y: -22, duration: 0.06 }, 0.3)
        .to(caps[1], { opacity: 1, y: 0, duration: 0.07 }, 0.4)
        .to(caps[1], { opacity: 0, y: -22, duration: 0.06 }, 0.66)
        .to(caps[2], { opacity: 1, y: 0, duration: 0.08 }, 0.76);
      ScrollTrigger.create({ animation: tl, trigger: band, start: "top 30%", end: "bottom bottom", scrub: 0.8 });
    } else {
      // Page-header forests grow once, on load
      tl.duration(3.6);
      gsap.delayedCall(0.4, () => tl.play());
    }
  });

  /* ---------- Keep trigger positions right as the page changes height ---------- */
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  document.fonts?.ready.then(refresh);
  document.addEventListener("click", (e) => {
    if (e.target.closest(".acc__btn")) setTimeout(refresh, 320);
  });
})();
