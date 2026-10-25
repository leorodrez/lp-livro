// The film's shared motion grammar, inlined into every frame.
// One paused timeline per composition; every value below is a pure function of
// timeline time. No clocks, no unseeded randomness, no relative tweens.
export const runtime = String.raw`
const K = {
  // camera: place the world. sx/sy are frame-centre offsets in px.
  cam(tl, w, a, b, t, d, ease) {
    tl.fromTo(w, { x: a.x, y: a.y, scale: a.s, rotationY: a.ry || 0, rotationX: a.rx || 0 },
      { x: b.x, y: b.y, scale: b.s, rotationY: b.ry || 0, rotationX: b.rx || 0,
        duration: d, ease: ease || "power2.inOut", immediateRender: false }, t);
  },
  camHold(w, a) { gsap.set(w, { x: a.x, y: a.y, scale: a.s, rotationY: a.ry || 0, rotationX: a.rx || 0 }); },

  // slot: park a page instance. x/y are ABSOLUTE 1920x1080 coords of its centre.
  slot(el, p) {
    gsap.set(el, { x: (p.x || 960) - 960, y: (p.y || 540) - 540, scale: p.s === undefined ? 1 : p.s,
      rotationY: p.ry || 0, rotationX: p.rx || 0, z: p.z || 0,
      autoAlpha: p.o === undefined ? 1 : p.o, filter: "blur(" + (p.b || 0) + "px)" });
  },
  slotTo(tl, el, a, b, t, d, ease) {
    const f = (p) => ({ x: (p.x || 960) - 960, y: (p.y || 540) - 540, scale: p.s === undefined ? 1 : p.s,
      rotationY: p.ry || 0, rotationX: p.rx || 0, z: p.z || 0,
      autoAlpha: p.o === undefined ? 1 : p.o, filter: "blur(" + (p.b || 0) + "px)" });
    tl.fromTo(el, f(a), Object.assign(f(b), { duration: d, ease: ease || "power3.out", immediateRender: false }), t);
  },

  // selectElement(): the KRO bounding box draws itself, corners first.
  selectElement(tl, box, t, d) {
    const cs = box.querySelectorAll(".selbox-c");
    const edge = box.querySelector(".selbox-edge");
    const tag = box.querySelector(".selbox-tag");
    tl.set(box, { autoAlpha: 1 }, t);
    tl.fromTo(cs, { scale: 0.2, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: d * 0.55, ease: "power3.out", stagger: d * 0.09 }, t);
    if (edge) tl.fromTo(edge, { autoAlpha: 0 }, { autoAlpha: 1, duration: d * 0.5, ease: "power2.out" }, t + d * 0.4);
    if (tag) tl.fromTo(tag, { autoAlpha: 0, y: 5 }, { autoAlpha: 1, y: 0, duration: d * 0.42, ease: "power3.out" }, t + d * 0.5);
  },

  // masked text replacement — the new message is wiped in over the old one.
  maskIn(tl, el, t, d) {
    tl.fromTo(el, { clipPath: "inset(0 100% 0 0)", autoAlpha: 1 },
      { clipPath: "inset(0 0% 0 0)", duration: d, ease: "power2.inOut", immediateRender: false }, t);
  },
  maskOut(tl, el, t, d) {
    tl.fromTo(el, { clipPath: "inset(0 0% 0 0)" },
      { clipPath: "inset(0 0 0 100%)", duration: d, ease: "power2.inOut", immediateRender: false }, t);
  },

  // generateHypotheses(): branches grow from the source, each message wipes in.
  generateHypotheses(tl, items, t, step) {
    items.forEach((it, i) => {
      const at = t + i * step;
      if (it.path) {
        const L = it.path.getTotalLength();
        gsap.set(it.path, { strokeDasharray: L, strokeDashoffset: L });
        tl.fromTo(it.path, { strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut", immediateRender: false }, at);
      }
      tl.fromTo(it.box, { autoAlpha: 0, y: 14, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", immediateRender: false }, at + 0.22);
      K.maskIn(tl, it.text, at + 0.34, 0.52);
      if (it.tag) tl.fromTo(it.tag, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, at + 0.5);
    });
  },

  // splitVariants(): instances are born out of the source page.
  splitVariants(tl, list, t, d, stagger) {
    list.forEach((v, i) => {
      K.slotTo(tl, v.el, v.from, v.to, t + i * (stagger || 0.08), d, "power3.inOut");
    });
  },

  // distributeVisitors(): every marker is a pure function of one driver.
  distributeVisitors(tl, actors, t, d) {
    const p = { v: 0 };
    actors.forEach((a) => gsap.set(a.el, { autoAlpha: 0 }));
    tl.to(p, {
      v: 1, duration: d, ease: "none",
      onUpdate() {
        const g = p.v;
        for (let i = 0; i < actors.length; i++) {
          const a = actors[i];
          const local = (g - a.t0) / a.span;
          if (local < 0 || local > 1) { a.el.style.opacity = "0"; continue; }
          const pt = K.onPath(a.pts, local);
          a.el.style.opacity = String(K.env(local) * (a.o || 1));
          a.el.style.transform = "translate3d(" + pt.x + "px," + pt.y + "px,0)";
        }
      },
    }, t);
  },
  // piecewise-linear position along a polyline, 0..1
  onPath(pts, u) {
    const n = pts.length - 1;
    const f = Math.min(0.999999, Math.max(0, u)) * n;
    const i = Math.floor(f), k = f - i;
    const a = pts[i], b = pts[i + 1];
    return { x: a[0] + (b[0] - a[0]) * k, y: a[1] + (b[1] - a[1]) * k };
  },
  // attack-hold-decay envelope so a session appears and leaves without a trace
  env(u) {
    if (u < 0.14) return u / 0.14;
    if (u > 0.78) return Math.max(0, (1 - u) / 0.22);
    return 1;
  },

  // animateResults(): counters + distribution bars, deterministic.
  count(tl, el, from, to, t, d, fmt) {
    const p = { v: from };
    tl.fromTo(p, { v: from }, {
      v: to, duration: d, ease: "power2.out", immediateRender: false,
      onUpdate() { el.textContent = fmt ? fmt(p.v) : String(Math.round(p.v)); },
    }, t);
  },
  bar(tl, el, to, t, d) {
    tl.fromTo(el, { scaleX: 0 }, { scaleX: to, duration: d, ease: "power2.out", immediateRender: false }, t);
  },

  // selectWinner(): contrast and definition, never bloom.
  selectWinner(tl, winner, others, t, d) {
    others.forEach((o, i) => {
      tl.fromTo(o, { autoAlpha: 1, filter: "blur(0px)" },
        { autoAlpha: 0.34, filter: "blur(3.5px)", duration: d, ease: "power2.inOut", immediateRender: false }, t + i * 0.06);
    });
    tl.fromTo(winner, { scale: 1, filter: "blur(0px)" },
      { scale: 1.045, filter: "blur(0px)", duration: d * 1.1, ease: "power3.out", immediateRender: false }, t);
  },

  // mergeVariants(): the fan collapses behind the survivor.
  mergeVariants(tl, list, target, t, d) {
    list.forEach((v, i) => {
      K.slotTo(tl, v, { x: v._x, y: v._y, s: v._s, ry: v._ry, o: 1 },
        { x: target.x, y: target.y, s: target.s * 0.92, ry: 0, o: 0, b: 5 }, t + i * 0.05, d, "power2.inOut");
    });
  },

  // fade a plain element in on its cue
  in(tl, el, t, d, dy) {
    tl.fromTo(el, { autoAlpha: 0, y: dy === undefined ? 16 : dy },
      { autoAlpha: 1, y: 0, duration: d || 0.7, ease: "power3.out", immediateRender: false }, t);
  },
  out(tl, el, t, d, dy) {
    tl.fromTo(el, { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: dy === undefined ? -12 : dy, duration: d || 0.5, ease: "power2.in", immediateRender: false }, t);
  },
  // editorial line swap on one axis: previous leaves as the next arrives
  swap(tl, prev, next, t) {
    K.out(tl, prev, t, 0.40, -14);
    K.in(tl, next, t + 0.46, 0.68, 18);
  },
  // depth-of-field rack between two layers
  rack(tl, sharp, soft, t, d) {
    tl.fromTo(soft, { filter: "blur(0px)", autoAlpha: 1 },
      { filter: "blur(4px)", autoAlpha: 0.5, duration: d, ease: "power2.inOut", immediateRender: false }, t);
    tl.fromTo(sharp, { filter: "blur(4px)", autoAlpha: 0.5 },
      { filter: "blur(0px)", autoAlpha: 1, duration: d, ease: "power2.inOut", immediateRender: false }, t);
  },
  // a single soft accent light rising once and staying
  accent(tl, el, to, t, d) {
    tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: to, duration: d, ease: "power2.out", immediateRender: false }, t);
  },
  // svg polyline helper
  d(pts) { return "M" + pts.map((p) => p[0] + "," + p[1]).join("L"); },
  // deterministic index hash in [0,1)
  h(i, s) { const x = Math.sin((i + 1) * 12.9898 + (s || 0) * 78.233) * 43758.5453; return x - Math.floor(x); },
};
`;
