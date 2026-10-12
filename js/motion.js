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
     Forest. Trees branch upward and taper as they go, roots reach down and
     link up underground. Limbs grow out of their parents (a child starts
     before its parent has finished), leaves unfurl from where they attach,
     and once grown the crowns sway in the wind.
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
  const pick = (arr, r) => arr[Math.floor(r() * arr.length)];

  const PRESETS = {
    scroll: {
      sky: true, aspect: "xMidYMid slice", treeDepth: 6, rootDepth: 5, farDepth: 5, grass: true,
      wide: {
        W: 1200, H: 770, ground: 505,
        trees: [{ x: 230, h: 166 }, { x: 600, h: 190 }, { x: 970, h: 158 }],
        far: [{ x: 70, h: 104 }, { x: 420, h: 132 }, { x: 790, h: 122 }, { x: 1120, h: 128 }],
      },
      narrow: {
        W: 400, H: 800, ground: 470,
        trees: [{ x: 105, h: 150 }, { x: 290, h: 135 }],
        far: [{ x: 30, h: 90 }, { x: 200, h: 112 }, { x: 375, h: 100 }],
      },
    },
    mini: {
      sky: false, aspect: "xMidYMax slice", treeDepth: 5, rootDepth: 4, farDepth: 4, grass: false,
      wide: { W: 1200, H: 300, ground: 215, trees: [{ x: 170, h: 76 }, { x: 440, h: 96 }, { x: 760, h: 82 }, { x: 1040, h: 98 }], far: [] },
      narrow: { W: 400, H: 300, ground: 215, trees: [{ x: 95, h: 82 }, { x: 300, h: 94 }], far: [] },
    },
  };

  const TRUNK = [112, 88, 64], TWIG = [196, 184, 156];
  const ROOT_A = [186, 142, 98], ROOT_B = [104, 78, 54];
  const FAR_A = [34, 58, 46], FAR_B = [58, 92, 76];
  const LEAVES = ["#7fb98a", "#9fcf9a", "#b4d98a", "#6fa97a", "#8cc3a0", "#a8d08d", "#5f9a6e"];
  const LEAVES_FAR = ["#2c5240", "#35634a", "#2a4a39", "#3d6e55"];
  const FLUSH = "#d8e8a0"; // new growth is paler

  // Point and sub-curve of a quadratic Bezier, so one limb can be drawn as several tapering pieces
  const qpt = (p0, p1, p2, t) => [
    (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
    (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
  ];
  const qctrl = (p0, p1, p2, a, b) => [
    (1 - a) * (1 - b) * p0[0] + ((1 - a) * b + a * (1 - b)) * p1[0] + a * b * p2[0],
    (1 - a) * (1 - b) * p0[1] + ((1 - a) * b + a * (1 - b)) * p1[1] + a * b * p2[1],
  ];
  const leafPath = (bx, by, ang, s, w) => {
    const tx = bx + Math.sin(ang) * s, ty = by - Math.cos(ang) * s;
    const mx = (bx + tx) / 2, my = (by + ty) / 2;
    const px = Math.cos(ang) * s * w, py = Math.sin(ang) * s * w;
    return `M${bx.toFixed(1)} ${by.toFixed(1)}Q${(mx + px).toFixed(1)} ${(my + py).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}Q${(mx - px).toFixed(1)} ${(my - py).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}Z`;
  };

  // Recursively grow a limb. dir = 1 grows up (branches), -1 grows down (roots).
  function grow(ctx, x, y, ang, len, depth, parent, w) {
    const { rand, dir, maxD } = ctx;
    const ex = x + Math.sin(ang) * len;
    const ey = y - Math.cos(ang) * len * dir;
    const bend = (rand() - 0.5) * len * 0.42;
    const p0 = [x, y], p2 = [ex, ey];
    const p1 = [(x + ex) / 2 + ((-(ey - y)) / len) * bend, (y + ey) / 2 + ((ex - x) / len) * bend];
    const n = depth === 0 ? 6 : depth === 1 ? 4 : depth === 2 ? 3 : depth === 3 ? 2 : 1;
    const els = [];
    for (let j = 0; j < n; j++) {
      const a = j / n, b = (j + 1) / n;
      const s0 = qpt(p0, p1, p2, a), s1 = qpt(p0, p1, p2, b), c = qctrl(p0, p1, p2, a, b);
      const width = w * (1 - 0.3 * (a + b) / 2); // each limb tapers toward its tip
      const el = node("path", {
        d: `M${s0[0].toFixed(1)} ${s0[1].toFixed(1)}Q${c[0].toFixed(1)} ${c[1].toFixed(1)} ${s1[0].toFixed(1)} ${s1[1].toFixed(1)}`,
        stroke: ctx.colorFn(depth / maxD), "stroke-width": Math.max(width, 0.8).toFixed(2),
      });
      ctx.group.appendChild(el);
      els.push(el);
    }
    const rec = { d: depth, len, els, parent, end: [ex, ey], t0: 0, dur: len / 100 };
    // a child starts growing before its parent has finished, which is what makes it read as one organism
    rec.t0 = parent ? parent.t0 + parent.dur * 0.78 + rand() * 0.025 : 0;
    ctx.limbs.push(rec);
    if (depth >= maxD) { ctx.tips.push({ x: ex, y: ey, rec, ang }); return rec; }
    const kids = depth < 2 ? 2 : rand() < 0.3 ? 3 : 2;
    for (let i = 0; i < kids; i++) {
      const spread = (i - (kids - 1) / 2) * (0.5 + rand() * 0.28) + (rand() - 0.5) * 0.3;
      // branches reach for the light: each generation leans back toward vertical
      const childAng = dir === 1 ? ang * 0.82 + spread : ang + spread;
      grow(ctx, ex, ey, childAng, len * (0.7 + rand() * 0.12), depth + 1, rec, w * 0.7);
    }
    return rec;
  }

  function buildForest(host) {
    const key = host.dataset.forest;
    const P = PRESETS[key];
    if (!P) return null;
    const cfg = window.innerWidth < 700 ? P.narrow : P.wide;
    const { W, H, ground } = cfg;
    const rand = mulberry32(key === "scroll" ? 7 : 21);
    const live = !reduceMotion && !!window.gsap;

    const svg = node("svg", { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: P.aspect, "aria-hidden": "true", focusable: "false" });
    const defs = node("defs", {});
    defs.innerHTML = `
      <linearGradient id="sky-${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040806"/><stop offset=".62" stop-color="#0f2419"/><stop offset="1" stop-color="#1d4231"/></linearGradient>
      <linearGradient id="soil-${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1b10"/><stop offset=".5" stop-color="#17100a"/><stop offset="1" stop-color="#070403"/></linearGradient>
      <radialGradient id="sun-${key}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".5"/><stop offset=".35" stop-color="#e5c055" stop-opacity=".16"/><stop offset="1" stop-color="#e5c055" stop-opacity="0"/></radialGradient>
      <linearGradient id="ray-${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".22"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></linearGradient>
      <radialGradient id="canopy-${key}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#8cc98f" stop-opacity=".34"/><stop offset="1" stop-color="#8cc98f" stop-opacity="0"/></radialGradient>
      <radialGradient id="canopyfar-${key}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#2f5a43" stop-opacity=".5"/><stop offset="1" stop-color="#2f5a43" stop-opacity="0"/></radialGradient>`;
    svg.appendChild(defs);

    if (P.sky) {
      svg.appendChild(node("rect", { x: 0, y: 0, width: W, height: ground, fill: `url(#sky-${key})` }));
      const sx = W * 0.82, sy = ground * 0.2;
      svg.appendChild(node("circle", { cx: sx, cy: sy, r: W * 0.34, fill: `url(#sun-${key})` }));
      const rays = node("g", { style: "mix-blend-mode:screen" });
      [[-0.34, 70], [-0.2, 110], [-0.08, 60], [0.04, 90], [0.17, 56]].forEach(([dx, wd], i) => {
        const bx = sx + dx * W * 1.6;
        const poly = node("polygon", { points: `${sx - 6},${sy} ${sx + 6},${sy} ${bx + wd},${ground} ${bx - wd},${ground}`, fill: `url(#ray-${key})`, class: "ray", style: `animation-delay:${-i * 2.3}s` });
        rays.appendChild(poly);
      });
      svg.appendChild(rays);
      svg.appendChild(node("rect", { x: 0, y: ground, width: W, height: H - ground, fill: `url(#soil-${key})` }));
      // flecks of grit and organic matter in the soil
      const gSoil = node("g", {});
      for (let i = 0; i < 70; i++) {
        gSoil.appendChild(node("circle", { cx: (rand() * W).toFixed(0), cy: (ground + 14 + rand() * (H - ground - 20)).toFixed(0), r: (0.7 + rand() * 1.8).toFixed(1), fill: pick(["#6b5238", "#4a3826", "#8a6c4a", "#5a4a3a"], rand), "fill-opacity": (0.18 + rand() * 0.3).toFixed(2) }));
      }
      svg.appendChild(gSoil);
    }
    svg.appendChild(node("path", { d: `M0 ${ground}H${W}`, stroke: "rgba(255,255,255,.16)", "stroke-width": 1.2, fill: "none" }));

    const gCam = node("g", {});
    const gFar = node("g", {}), gMain = node("g", {}), gFront = node("g", {});
    [gFar, gMain, gFront].forEach((g) => gCam.appendChild(g));
    svg.appendChild(gCam);
    const gRoots = node("g", { fill: "none", "stroke-linecap": "round" });
    const gLinks = node("g", { fill: "none", "stroke-linecap": "round" });
    gMain.appendChild(gRoots);
    gMain.appendChild(gLinks);

    const out = { W, H, ground, key, sets: [], links: [], nodes: [], grass: [], winds: [], layers: { cam: gCam, far: gFar, main: gMain, front: gFront } };

    function leafy(set, tips, o) {
      tips.forEach((t, i) => {
        // a soft mass of foliage behind the individual leaves gives the crown volume
        if (i % 4 === 0) {
          const r = (o.far ? 12 : 17) + rand() * (o.far ? 8 : 14);
          const c = node("circle", { cx: t.x.toFixed(1), cy: (t.y - r * 0.25).toFixed(1), r: r.toFixed(1), fill: `url(#${o.far ? "canopyfar" : "canopy"}-${key})` });
          set.g.querySelector(".gc").appendChild(c);
          set.canopy.push({ el: c, rec: t.rec });
        }
        const k = o.far ? 2 : 2 + Math.floor(rand() * 2);
        for (let n = 0; n < k; n++) {
          const bx = t.x + (rand() - 0.5) * 6, by = t.y + (rand() - 0.5) * 6;
          const a = (rand() - 0.5) * 2.8 + (rand() < 0.3 ? (rand() - 0.5) * 2 : 0);
          const s = (o.far ? 5 : 8) + rand() * (o.far ? 4 : 7);
          const color = pick(o.far ? LEAVES_FAR : LEAVES, rand);
          const el = node("path", { d: leafPath(bx, by, a, s, 0.36 + rand() * 0.14), fill: color, "fill-opacity": o.far ? 0.8 : (0.82 + rand() * 0.16).toFixed(2) });
          if (live && !o.far && rand() < 0.22) { el.setAttribute("class", "sh"); el.style.animationDelay = `${-rand() * 4}s`; }
          set.g.querySelector(".gl").appendChild(el);
          set.leaves.push({ el, rec: t.rec, color, bx, by });
        }
      });
    }

    function makeTree(parentG, x, h, o) {
      const g = node("g", {});
      const gLimbs = node("g", { fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", class: "gb" });
      const gc = node("g", { class: "gc" }), gl = node("g", { class: "gl" });
      [gLimbs, gc, gl].forEach((n) => g.appendChild(n));
      parentG.appendChild(g);
      const ctx = { rand, dir: 1, maxD: o.maxD, colorFn: o.colorFn, group: gLimbs, limbs: [], tips: [] };
      grow(ctx, x, ground, (rand() - 0.5) * 0.14, h * 0.34, 0, null, h * o.trunk);
      const set = { g, limbs: ctx.limbs, leaves: [], canopy: [], kind: o.far ? "far" : "tree" };
      leafy(set, ctx.tips, o);
      out.sets.push(set);
      out.winds.push({ g, x, ground, amp: o.amp, f: o.f, ph: rand() * 6.28 });
      return set;
    }

    // Distant trees: smaller, cooler and fainter, which gives the scene depth
    cfg.far.forEach((t, i) => {
      const s = makeTree(gFar, t.x, t.h, { far: true, maxD: P.farDepth, trunk: 0.05, colorFn: (f) => mix(FAR_A, FAR_B, f), amp: 0.55, f: 0.9 + rand() * 0.4 });
      s.start = i * 0.02; s.span = 0.34;
    });

    const rootTips = [];
    cfg.trees.forEach((t, i) => {
      const s = makeTree(gMain, t.x, t.h, { maxD: P.treeDepth, trunk: 0.062, colorFn: (f) => mix(TRUNK, TWIG, f), amp: 1.15, f: 0.8 + rand() * 0.35 });
      s.start = 0.02 + i * 0.025; s.span = 0.4;

      // roots: several main roots that spread, then fine root hairs at the tips
      const rctx = { rand, dir: -1, maxD: P.rootDepth, colorFn: (f) => mix(ROOT_A, ROOT_B, f), group: gRoots, limbs: [], tips: [] };
      [-1.05, -0.42, 0.22, 0.88].forEach((a, k) => {
        grow(rctx, t.x + (k - 1.5) * 5, ground, a + (rand() - 0.5) * 0.22, t.h * (0.2 + 0.07 * rand()) * (k === 1 || k === 2 ? 1.2 : 0.95), 0, null, t.h * 0.034);
      });
      rctx.tips.forEach((tip) => {
        for (let k = 0; k < 2; k++) {
          const a = tip.ang + (rand() - 0.5) * 1.6;
          const len = 5 + rand() * 7;
          const ex = tip.x + Math.sin(a) * len, ey = tip.y + Math.cos(a) * len;
          const el = node("path", { d: `M${tip.x.toFixed(1)} ${tip.y.toFixed(1)}L${ex.toFixed(1)} ${ey.toFixed(1)}`, stroke: "#8a6c4a", "stroke-width": 0.7 });
          gRoots.appendChild(el);
          rctx.limbs.push({ d: 99, len, els: [el], parent: tip.rec, end: [ex, ey], dur: 0.06, t0: tip.rec.t0 + tip.rec.dur * 0.9 });
        }
      });
      out.sets.push({ limbs: rctx.limbs, leaves: [], canopy: [], kind: "root", start: 0.3 + i * 0.025, span: 0.4 });
      rootTips[i] = rctx.tips.map((t2) => [t2.x, t2.y]);
    });

    // Underground network: roots of neighbouring trees reach toward each other and join,
    // at several depths so it reads as a web rather than a single knot
    for (let i = 0; i < cfg.trees.length - 1; i++) {
      const A = rootTips[i].filter(([x]) => x > cfg.trees[i].x).sort((p, q) => p[1] - q[1]);
      const B = rootTips[i + 1].filter(([x]) => x < cfg.trees[i + 1].x);
      const want = 6, usedA = new Set(), usedB = new Set();
      for (let k = 0; k < want && A.length; k++) {
        const a = A[Math.min(A.length - 1, Math.floor(((k + 0.5) / want) * A.length))];
        if (usedA.has(a)) continue;
        let best = null, bd = Infinity;
        B.forEach((b) => { if (usedB.has(b)) return; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (d < bd) { bd = d; best = b; } });
        if (!best) continue;
        usedA.add(a); usedB.add(best);
        const mx = (a[0] + best[0]) / 2, my = (a[1] + best[1]) / 2 + 10 + rand() * 14;
        const d = `M${a[0].toFixed(1)} ${a[1].toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${best[0].toFixed(1)} ${best[1].toFixed(1)}`;
        const glow = node("path", { d, stroke: "#e5c055", "stroke-width": 5, "stroke-opacity": 0.13 });
        const l = node("path", { d, stroke: "#e5c055", "stroke-width": 1.5, "stroke-opacity": 0.9, class: "mlink" });
        gLinks.appendChild(glow); gLinks.appendChild(l);
        out.links.push(glow, l);
        [a, best].forEach(([x, y]) => {
          const c = node("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: 3.2, fill: "#f3d376" });
          gLinks.appendChild(c);
          out.nodes.push(c);
        });
      }
    }

    // Grass blades in the foreground
    if (P.grass) {
      for (let x = 6; x < W; x += 9 + rand() * 9) {
        const h2 = 9 + rand() * 20, bend = (rand() - 0.5) * 12;
        const el = node("path", {
          d: `M${x.toFixed(1)} ${ground}Q${(x + bend * 0.4).toFixed(1)} ${(ground - h2 * 0.55).toFixed(1)} ${(x + bend).toFixed(1)} ${(ground - h2).toFixed(1)}`,
          stroke: mix([40, 86, 58], [96, 150, 88], rand()), "stroke-width": (1 + rand() * 1.2).toFixed(1), fill: "none", "stroke-linecap": "round", class: "gr",
        });
        if (live) { el.style.animationDuration = `${2.6 + rand() * 2.4}s`; el.style.animationDelay = `${-rand() * 4}s`; }
        gFront.appendChild(el);
        out.grass.push({ el, x });
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

  /* ---------- Falling leaves over the hero / page headers ---------- */
  // Each leaf swings like a pendulum, tilts with the swing, and flips edge-on as it tumbles.
  // Smaller leaves read as farther away: slower, fainter.
  const LEAF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C12 2 4.5 8 4.5 14a7.5 7.5 0 0 0 15 0C19.5 8 12 2 12 2z"/><path d="M12 6v15" stroke="rgba(0,0,0,.25)" stroke-width="1" fill="none"/></svg>';
  const driftColors = ["#9fcf9a", "#7fb98a", "#ccdecd", "#e5c055", "#b9d98f", "#d9a441"];
  $$(".drift").forEach((host) => {
    const area = host.parentElement;
    const count = area.classList.contains("hero") ? 11 : 7;
    const timelines = [];
    for (let k = 0; k < count; k++) {
      const depth = Math.random(); // 0 = far, 1 = near
      const size = 10 + depth * 20;
      const leaf = document.createElement("i");
      leaf.innerHTML = LEAF;
      leaf.style.setProperty("--s", `${size.toFixed(1)}px`);
      leaf.style.setProperty("--c", driftColors[k % driftColors.length]);
      leaf.style.left = `${4 + Math.random() * 92}%`;
      host.appendChild(leaf);
      const fall = 20 - depth * 7 + Math.random() * 9; // far leaves fall slower
      const swing = 26 + depth * 46;
      const period = 2.2 + Math.random() * 2.2;
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(leaf, { y: -40 }, { y: () => area.clientHeight + 40, duration: fall, ease: "none" }, 0)
        .fromTo(leaf, { opacity: 0 }, { opacity: 0.18 + depth * 0.42, duration: fall * 0.1, ease: "none" }, 0)
        .to(leaf, { opacity: 0, duration: fall * 0.1, ease: "none" }, fall * 0.9);
      const inner = leaf.firstChild;
      timelines.push(
        tl,
        gsap.fromTo(leaf, { x: -swing }, { x: swing, duration: period, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.fromTo(leaf, { rotation: -42 }, { rotation: 42, duration: period, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.fromTo(inner, { scaleX: 1 }, { scaleX: 0.28, duration: period * 0.62, ease: "sine.inOut", yoyo: true, repeat: -1, delay: Math.random() })
      );
      tl.progress(Math.random());
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

  /* ---------- Diagrams: lines draw, nodes pop, then they keep gently alive ---------- */
  $$("[data-viz]").forEach((box) => {
    const draws = $$(".js-draw", box);
    const pops = $$(".js-pop", box);
    draws.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 100;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
    pops.forEach((p) => gsap.set(p, p.dataset.origin ? { scale: 0, svgOrigin: p.dataset.origin } : { scale: 0, transformOrigin: "50% 50%" }));

    // idle motion, paused whenever the diagram is off screen
    const idle = gsap.timeline({ paused: true });
    $$(".sway", box).forEach((g) => {
      gsap.set(g, { svgOrigin: "160 186" });
      idle.fromTo(g, { rotation: -1.8 }, { rotation: 1.8, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 0);
    });
    $$(".ripple", box).forEach((r, i) => {
      gsap.set(r, { svgOrigin: "160 186" });
      idle.fromTo(r, { scale: 0.35, opacity: 0.55 }, { scale: 2.5, opacity: 0, duration: 4.2, ease: "power1.out", repeat: -1 }, i * 1.4);
    });
    const pings = $$(".ping", box);
    if (pings.length) {
      // a signal leaves the problem, passes around the system and returns
      pings.forEach((p) => gsap.set(p, { transformOrigin: "50% 50%", scale: 1 }));
      const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
      pings.forEach((p, i) => loop.fromTo(p, { scale: 1, opacity: 0.85 }, { scale: i === 0 ? 3.2 : 2.4, opacity: 0, duration: 1.1, ease: "power2.out" }, i === 0 ? 0 : 0.35 + i * 0.22));
      idle.add(loop, 0);
    }
    $$(".rip", box).forEach((r, i) => {
      gsap.set(r, { transformOrigin: "50% 50%", scale: 0.08 });
      idle.fromTo(r, { scale: 0.08, opacity: 0.5 }, { scale: 1, opacity: 0, duration: 5, ease: "power1.out", repeat: -1 }, i * 1.66);
    });
    ScrollTrigger.create({ trigger: box, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? idle.play() : idle.pause()) });

    const tl = gsap.timeline({ paused: true });
    tl.to(draws, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", stagger: 0.08 })
      .to(pops, { scale: 1, duration: 0.9, ease: "back.out(1.9)", stagger: 0.1 }, 0.3);
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

  /* =====================================================================
     The forest, animated
     ===================================================================== */
  const smooth = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };

  forests.forEach(({ host, parts: F }) => {
    const mode = host.dataset.forest;
    const band = host.closest(".forest-band");
    const section = band || host.parentElement;
    const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

    // ---- limbs: each draws out from its base; children start before the parent is done ----
    F.sets.forEach((set) => {
      const maxEnd = Math.max(...set.limbs.map((r) => r.t0 + r.dur));
      const k = set.span / maxEnd;
      set.limbs.forEach((r) => {
        const segDur = (r.dur * k) / r.els.length;
        r.els.forEach((el, j) => {
          const len = el.getTotalLength();
          el.style.strokeDasharray = len;
          el.style.strokeDashoffset = len;
          tl.to(el, { strokeDashoffset: 0, duration: Math.max(segDur, 0.004), ease: "sine.inOut" }, set.start + r.t0 * k + j * segDur);
        });
        r.endTime = set.start + (r.t0 + r.dur) * k;
      });
      // ---- leaves unfurl from where they attach, pale new growth deepening to green ----
      set.canopy.forEach((c) => {
        gsap.set(c.el, { scale: 0, transformOrigin: "50% 50%" });
        tl.to(c.el, { scale: 1, duration: 0.1, ease: "sine.out" }, c.rec.endTime + Math.random() * 0.03);
      });
      set.leaves.forEach((l) => {
        l.el.setAttribute("fill", FLUSH);
        gsap.set(l.el, { scale: 0, svgOrigin: `${l.bx} ${l.by}` });
        tl.to(l.el, { scale: 1, fill: l.color, duration: 0.09 + Math.random() * 0.05, ease: "back.out(1.7)" }, l.rec.endTime + Math.random() * 0.05);
      });
    });

    // ---- grass springs up across the ground ----
    F.grass.forEach(({ el, x }) => {
      gsap.set(el, { scaleY: 0, svgOrigin: `${x} ${F.ground}` });
      tl.to(el, { scaleY: 1, duration: 0.12, ease: "back.out(1.4)" }, 0.06 + (x / F.W) * 0.4);
    });

    // ---- underground network lights up, then nutrients start to flow along it ----
    F.links.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
    });
    tl.to(F.links, { strokeDashoffset: 0, duration: 0.2, ease: "power2.out", stagger: { amount: 0.1 } }, 0.68);
    gsap.set(F.nodes, { scale: 0, transformOrigin: "50% 50%" });
    tl.to(F.nodes, { scale: 1, duration: 0.12, ease: "back.out(3)", stagger: { amount: 0.12, from: "random" } }, 0.8);

    const pulses = [];
    const pulseTl = gsap.timeline({ paused: true });
    F.links.filter((l) => l.classList.contains("mlink")).forEach((l) => {
      const len = l.getTotalLength();
      const seg = Math.min(18, len * 0.3);
      const p = node("path", { d: l.getAttribute("d"), stroke: "#fff4c4", "stroke-width": 2.6, "stroke-linecap": "round", fill: "none", opacity: 0 });
      p.style.strokeDasharray = `${seg} ${len + seg}`;
      l.parentNode.appendChild(p);
      pulses.push(p);
      const forward = Math.random() < 0.5; // nutrients flow both ways
      pulseTl.fromTo(p, { strokeDashoffset: forward ? seg : -len }, { strokeDashoffset: forward ? -len : seg, duration: len / 55, ease: "sine.inOut", repeat: -1, repeatDelay: 0.8 + Math.random() * 2.2 }, Math.random() * 2.5);
    });
    tl.set(pulses, { opacity: 1 }, 0.93);

    // ---- slow camera push-in as the forest grows (scroll mode) ----
    if (mode === "scroll") {
      gsap.set(F.layers.cam, { svgOrigin: `${F.W / 2} ${F.ground}` });
      tl.fromTo(F.layers.cam, { scale: 1 }, { scale: 1.07, duration: 1, ease: "none" }, 0);
    }

    // ---- wind: each crown bends from the base, stronger toward the top; crowns are out of step ----
    const wind = { amp: 0, target: 0 };
    F.winds.forEach((w) => gsap.set(w.g, { svgOrigin: `${w.x} ${w.ground}` }));
    const setters = F.winds.map((w) => gsap.quickSetter(w.g, "skewX", "deg"));
    const tick = (time) => {
      wind.amp += (wind.target - wind.amp) * 0.035;
      F.winds.forEach((w, i) => {
        const gust = 0.7 + 0.3 * Math.sin(time * 0.23 + w.ph); // gusts rise and fall over many seconds
        const s = Math.sin(time * w.f + w.ph) * 0.65 + Math.sin(time * w.f * 2.3 + w.ph * 1.7) * 0.35;
        setters[i](w.amp * wind.amp * gust * s);
      });
    };
    ScrollTrigger.create({
      trigger: section, start: "top bottom", end: "bottom top",
      onToggle: (s) => {
        if (s.isActive) { gsap.ticker.add(tick); pulseTl.play(); } else { gsap.ticker.remove(tick); pulseTl.pause(); }
      },
    });

    // ---- scroll-driven growth, or play-once growth for page headers ----
    if (mode === "scroll" && band) {
      band.classList.add("is-live");
      const caps = $$(".cap", band);
      gsap.set(caps, { opacity: 0, y: 20 });
      gsap.set(caps[0], { opacity: 1, y: 0 });
      tl.to(caps[0], { opacity: 0, y: -22, duration: 0.06 }, 0.3)
        .to(caps[1], { opacity: 1, y: 0, duration: 0.07 }, 0.4)
        .to(caps[1], { opacity: 0, y: -22, duration: 0.06 }, 0.66)
        .to(caps[2], { opacity: 1, y: 0, duration: 0.08 }, 0.76);
      ScrollTrigger.create({
        animation: tl, trigger: band, start: "top 30%", end: "bottom bottom", scrub: 0.8,
        onUpdate: (self) => { wind.target = smooth((self.progress - 0.3) / 0.3); },
      });

      // depth: nearer layers shift more than farther ones as the pointer moves
      const stick = band.querySelector(".forest-band__stick");
      if (stick && window.matchMedia("(pointer: fine)").matches) {
        const mkx = (g) => gsap.quickTo(g, "x", { duration: 1.1, ease: "power3.out" });
        const mx = { far: mkx(F.layers.far), main: mkx(F.layers.main), front: mkx(F.layers.front) };
        stick.addEventListener("pointermove", (e) => {
          const n = e.clientX / window.innerWidth - 0.5;
          mx.far(n * -10); mx.main(n * -22); mx.front(n * -42);
        });
      }
    } else {
      // Page-header forests grow once, on load, then settle into the wind
      tl.duration(4.2);
      tl.eventCallback("onComplete", () => { wind.target = 1; });
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
