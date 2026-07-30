// Frame authoring for kro-ab-test.
//
// Every frame is an independent sub-composition, but frames 1-5 hand one another
// a running visual state (the mock page multiplying). The handoff contract in
// STORYBOARD.md only holds if both sides of each cut use the SAME numbers, so the
// shared geometry lives here once and each frame is emitted from it.
// Re-run with `node build-frames.mjs` after changing any constant.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const W = 1080;
const H = 1080;
const FONTS = readFileSync("assets/fonts/fonts.css", "utf8").trim();
const r2 = (n) => Math.round(n * 100) / 100;

// ── palette (frame.md, by role) ──────────────────────────────────────────────
const C = {
  ground: "#2B2B2B",
  paper: "#FFFFFF",
  ink: "#2B2B2B",
  muted: "#6B6B6B",
  light: "#9A9A9A",
  accent: "#06B6D4",
  brand: "#7C3AED",
  pageBtn: "#3F4A52",
  pagePanel: "#F1F4F5",
  pagePanelLine: "#E3E8EA",
};

// ── the mock page card ───────────────────────────────────────────────────────
// Authored once at CARD_W x CARD_H and only ever transformed, so a "duplication"
// is the same object at a different scale — never a redraw.
const CARD_W = 780;
const CARD_H = 560;
const CARD_L = (W - CARD_W) / 2; // 150
const CARD_T = (H - CARD_H) / 2; // 260
const CX = CARD_L + CARD_W / 2; // 540 — untransformed centre
const CY = CARD_T + CARD_H / 2; // 540

const S2 = 0.58; // frame 2: two cards, big enough to actually read
const S4 = 0.5; // frames 3-5: the 2x2 grid

// Arrangement A — two up, vertically centred high.
const TWO_UP = { A: { cx: 286, cy: 470 }, B: { cx: 794, cy: 470 } };
// Arrangement B — the 2x2 grid.
const GRID = {
  A: { cx: 317, cy: 280 },
  B: { cx: 763, cy: 280 },
  C: { cx: 317, cy: 660 },
  D: { cx: 763, cy: 660 },
};

const MODAL_W = 236;
const MODAL_H = 58;
const PILL_H = 34;
const PILL_GAP = 11; // pill sits this far above the card's top edge
const MODAL_LIFT = 12; // modal straddles the card's bottom edge by this much

// Geometry helpers — one source of truth for "where does the chrome for a card
// at (cx, cy, scale) go", so frame N and frame N+1 cannot drift apart.
const cardBox = (p, s) => ({
  left: p.cx - (CARD_W * s) / 2,
  right: p.cx + (CARD_W * s) / 2,
  top: p.cy - (CARD_H * s) / 2,
  bottom: p.cy + (CARD_H * s) / 2,
});
const tf = (p, s) => ({ x: r2(p.cx - CX), y: r2(p.cy - CY), s });
const pillPos = (p, s) => {
  const b = cardBox(p, s);
  return { left: r2(b.left), top: r2(b.top - PILL_H - PILL_GAP) };
};
const modalPos = (p, s) => {
  const b = cardBox(p, s);
  return { left: r2(p.cx - MODAL_W / 2), top: r2(b.bottom - MODAL_LIFT) };
};

const GRID_TOP = pillPos(GRID.A, S4).top; // 96 — top of all grid chrome
const GRID_BOTTOM = modalPos(GRID.D, S4).top + MODAL_H; // 826
const GRID_MID_Y = r2((GRID_TOP + GRID_BOTTOM) / 2);

// ── copy ─────────────────────────────────────────────────────────────────────
const V = {
  A: { label: "versão A", headline: "Suas reuniões viram anotações. Sozinhas.", visitors: 1284, v2: 1731, conv: 3.1 },
  B: { label: "versão B", headline: "Nunca mais escreva uma ata de reunião.", visitors: 1301, v2: 1810, conv: 4.2 },
  C: { label: "versão C", headline: "Sua reunião acabou. O resumo já está no seu e-mail.", visitors: 1189, v2: 1189, conv: 2.7 },
  D: { label: "versão D", headline: "Você fala. A gente escreve. Ninguém digita nada.", visitors: 0, v2: 0, conv: 6.8 },
};
const SUBHEAD = "Conecte seu calendário. O resto é com a gente.";
const PAGE_CTA = "Começar grátis";
const PAGE_BRAND = "Nimbus AI";

// ── shared CSS ───────────────────────────────────────────────────────────────
const baseCss = (id) => `${FONTS}
#root { width:${W}px; height:${H}px; position:relative; overflow:hidden; }
#root * { box-sizing:border-box; margin:0; padding:0; }
#${id}-ground { position:absolute; inset:0; background:${C.ground}; }

/* the mock page — product UI, so Manrope throughout (brand type semantics) */
.${id}-card {
  position:absolute; left:${CARD_L}px; top:${CARD_T}px;
  width:${CARD_W}px; height:${CARD_H}px;
  background:${C.paper}; border-radius:14px; padding:40px;
  font-family:'Manrope',sans-serif; color:${C.ink};
  display:flex; flex-direction:column;
}
.${id}-nav { height:38px; display:flex; align-items:center; justify-content:space-between; flex:none; }
.${id}-nav-brand { font-size:25px; font-weight:800; letter-spacing:-0.02em; }
.${id}-nav-right { display:flex; align-items:center; gap:20px; }
.${id}-nav-link { font-size:17px; font-weight:500; color:${C.muted}; }
.${id}-nav-btn { font-size:15px; font-weight:600; color:${C.paper}; background:${C.pageBtn}; border-radius:100px; padding:9px 18px; }
.${id}-headline {
  margin-top:26px; height:184px; width:700px; flex:none;
  font-size:54px; font-weight:800; line-height:1.13; letter-spacing:-0.025em;
}
.${id}-sub { margin-top:10px; font-size:22px; font-weight:400; color:${C.muted}; flex:none; }
.${id}-btn {
  margin-top:20px; height:52px; width:214px; border-radius:100px; flex:none;
  background:${C.pageBtn}; color:${C.paper}; font-size:19px; font-weight:600;
  display:flex; align-items:center; justify-content:center;
}
.${id}-panel {
  margin-top:20px; height:94px; border-radius:12px; flex:none;
  background:${C.pagePanel}; border:1px solid ${C.pagePanelLine};
  padding:19px 22px; display:flex; flex-direction:column; gap:11px;
}
.${id}-panel-line { height:12px; border-radius:6px; background:${C.pagePanelLine}; }

/* KRO's overlay layer — cyan is the single accent, and it never scales with the
   page: the product's own UI does not shrink when it shows you more variants */
.${id}-pill {
  position:absolute; height:${PILL_H}px; border-radius:100px;
  background:rgba(6,182,212,0.14); border:1px solid rgba(6,182,212,0.4);
  color:${C.accent}; font-family:'Manrope',sans-serif; font-size:15px; font-weight:600;
  display:flex; align-items:center; padding:0 16px; white-space:nowrap;
}
.${id}-modal {
  position:absolute; width:${MODAL_W}px; height:${MODAL_H}px;
  background:#1F1F1F; border:1px solid rgba(6,182,212,0.32); border-radius:12px;
  font-family:'Manrope',sans-serif; display:flex; align-items:center; gap:11px; padding:0 15px;
}
.${id}-dot { width:9px; height:9px; border-radius:50%; background:${C.accent}; flex:none; }
.${id}-mtxt { display:flex; flex-direction:column; gap:1px; }
.${id}-mlabel { font-size:12px; font-weight:600; color:${C.light}; letter-spacing:0.06em; text-transform:uppercase; }
.${id}-mnum { font-size:21px; font-weight:700; color:${C.paper}; font-variant-numeric:tabular-nums; line-height:1.1; }
#${id}-colophon {
  position:absolute; left:60px; top:1000px;
  font-family:'Manrope',sans-serif; font-size:17px; font-weight:500; color:#929292;
}
.${id}-crown {
  position:absolute; height:${PILL_H}px; width:152px; border-radius:100px;
  background:${C.accent}; color:#07323A;
  font-family:'Manrope',sans-serif; font-size:15px; font-weight:800; letter-spacing:0.14em;
  display:flex; align-items:center; justify-content:center;
}
.${id}-ring { position:absolute; border:3px solid ${C.accent}; border-radius:18px; }
`;

// ── markup ───────────────────────────────────────────────────────────────────
const cardHtml = (id, key) => `      <div class="${id}-card" id="${id}-card-${key}">
        <div class="${id}-nav" id="${id}-nav-${key}">
          <div class="${id}-nav-brand">${PAGE_BRAND}</div>
          <div class="${id}-nav-right">
            <span class="${id}-nav-link">Produto</span>
            <span class="${id}-nav-link">Preços</span>
            <span class="${id}-nav-link">Entrar</span>
            <span class="${id}-nav-btn">${PAGE_CTA}</span>
          </div>
        </div>
        <div class="${id}-headline" id="${id}-head-${key}">${V[key].headline}</div>
        <div class="${id}-sub" id="${id}-sub-${key}">${SUBHEAD}</div>
        <div class="${id}-btn" id="${id}-btn-${key}">${PAGE_CTA}</div>
        <div class="${id}-panel" id="${id}-panel-${key}">
          <div class="${id}-panel-line" style="width:64%"></div>
          <div class="${id}-panel-line" style="width:88%"></div>
          <div class="${id}-panel-line" style="width:46%"></div>
        </div>
      </div>`;

const modalHtml = (id, key, label, value) => `      <div class="${id}-modal" id="${id}-modal-${key}">
        <div class="${id}-dot" id="${id}-dot-${key}"></div>
        <div class="${id}-mtxt">
          <div class="${id}-mlabel" id="${id}-mlabel-${key}">${label}</div>
          <div class="${id}-mnum" id="${id}-num-${key}">${value}</div>
        </div>
      </div>`;

const pillHtml = (id, key) => `      <div class="${id}-pill" id="${id}-pill-${key}">${V[key].label}</div>`;

// The root carries data-start/data-duration as well as the id: the transition
// injector extends this attribute to build the overlap window for a crossfade,
// and dies if the sub-composition root has no duration to extend.
const wrap = (cid, id, dur, css, body, script) => `<template>
  <style>
${css}  </style>
  <div id="root" data-composition-id="${cid}" data-start="0" data-duration="${dur}" data-width="${W}" data-height="${H}">
${body}
  </div>
  <script src="assets/vendor/gsap.min.js"><\/script>
  <script>
${script}
  <\/script>
</template>
`;

// Co-resident clips must each own a lane — the assembler rejects two clips whose
// windows overlap on the same data-track-index. Every frame here is a stack of
// full-duration layers, so each one simply takes the next lane.
const lanes = (dur) => {
  let n = 0;
  return () => `class="clip" data-start="0" data-duration="${dur}" data-track-index="${n++}"`;
};
const fn = (id) => id.replace(/-/g, "_");

// Thousands separator written out rather than toLocaleString: the renderer must
// produce the same string on every seek, independent of the host's ICU locale.
const fmtFn = (id) => `    function ${fn(id)}_int(n) {
      var s = String(Math.round(n));
      return s.length > 3 ? s.slice(0, s.length - 3) + "." + s.slice(s.length - 3) : s;
    }
    function ${fn(id)}_pct(n) { return n.toFixed(1).replace(".", ",") + "%"; }
`;

// Two explicit pulses rather than repeat/yoyo: a repeating tween is not something
// a frame-by-frame seek can resolve, and lint rejects it.
const pulse = (id, key, at) => `    tl.to("#${id}-dot-${key}", { scale: 1.5, opacity: 0.5, duration: 0.4, ease: "power2.out" }, ${at});
    tl.to("#${id}-dot-${key}", { scale: 1, opacity: 1, duration: 0.4, ease: "power2.in" }, ${r2(at + 0.42)});`;

const chromeCss = (id, keys, pos, scale) =>
  keys
    .map((k) => {
      const p = pillPos(pos[k], scale);
      const m = modalPos(pos[k], scale);
      return `#${id}-pill-${k} { left:${p.left}px; top:${p.top}px; }
#${id}-modal-${k} { left:${m.left}px; top:${m.top}px; }`;
    })
    .join("\n");

const ringCss = (id, p, s) => {
  const b = cardBox(p, s);
  return `#${id}-ring { left:${r2(b.left - 7)}px; top:${r2(b.top - 7)}px; width:${r2(CARD_W * s + 14)}px; height:${r2(CARD_H * s + 14)}px; }
#${id}-crown { left:${r2(p.cx - 76)}px; top:${pillPos(p, s).top}px; }`;
};

mkdirSync("compositions/frames", { recursive: true });

/* ── Frame 1 — A página ───────────────────────────────────────────────────── */
{
  const cid = "01-a-pagina";
  const id = "f" + cid; // DOM namespace: a CSS id may not start with a digit
  const D = 3.5;
  const L = lanes(D);
  const p = pillPos({ cx: CX, cy: CY }, 1);
  const css = baseCss(id) + `#${id}-pill-A { left:${p.left}px; top:${p.top}px; }\n`;
  const body = `    <div ${L()} id="${id}-ground"></div>
    <div ${L()} id="${id}-stage" style="position:absolute;inset:0;">
${cardHtml(id, "A")}
${pillHtml(id, "A")}
    </div>
    <div ${L()} id="${id}-colophon">Conversão inteligente</div>`;
  const script = `    window.__timelines = window.__timelines || {};
    var tl = gsap.timeline({ paused: true });
    gsap.set("#${id}-card-A", { transformOrigin: "50% 50%" });

    // Scene 1 (0.0-0.9): the card arrives from depth and stops. Nothing else
    // happens — the opening stillness is what makes the page read as ordinary.
    tl.fromTo("#${id}-card-A", { scale: 0.93, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" }, 0);

    // Scene 2 (0.9-2.1): the page's own content settles top-down, each piece on
    // its own beat; the headline dominates.
    tl.fromTo(["#${id}-nav-A", "#${id}-head-A", "#${id}-sub-A", "#${id}-btn-A", "#${id}-panel-A"],
      { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.15 }, 0.9);

    // Scene 3 (2.1-3.5): the version label — the first hint a test is running —
    // then the frame holds until the cut. handoff_out: card A at x0 y0 scale 1.
    tl.fromTo("#${id}-pill-A", { scale: 0.8, opacity: 0, transformOrigin: "0% 50%" },
      { scale: 1, opacity: 1, duration: 0.42, ease: "power3.out" }, 2.15);

    window.__timelines["${cid}"] = tl;`;
  writeFileSync(`compositions/frames/${cid}.html`, wrap(cid, id, D, css, body, script));
}

/* ── Frame 2 — Duplica ────────────────────────────────────────────────────── */
{
  const cid = "02-duplica";
  const id = "f" + cid; // DOM namespace: a CSS id may not start with a digit
  const D = 4.0;
  const L = lanes(D);
  const css = baseCss(id) + chromeCss(id, ["A", "B"], TWO_UP, S2) + "\n";
  const body = `    <div ${L()} id="${id}-ground"></div>
    <div ${L()} id="${id}-stage" style="position:absolute;inset:0;">
${cardHtml(id, "A")}
${cardHtml(id, "B")}
${pillHtml(id, "A")}
${pillHtml(id, "B")}
${modalHtml(id, "A", "visitantes agora", "0")}
${modalHtml(id, "B", "visitantes agora", "0")}
    </div>
    <div ${L()} id="${id}-colophon">Conversão inteligente</div>`;
  const a = tf(TWO_UP.A, S2), b = tf(TWO_UP.B, S2);
  const script = `    window.__timelines = window.__timelines || {};
    var tl = gsap.timeline({ paused: true });
${fmtFn(id)}
    gsap.set(["#${id}-card-A", "#${id}-card-B"], { transformOrigin: "50% 50%" });
    // handoff_in: card A dead-centre, scale 1, opacity 1 — exactly as frame 1 left it.
    gsap.set("#${id}-card-A", { x: 0, y: 0, scale: 1, opacity: 1 });
    gsap.set("#${id}-card-B", { x: 0, y: 0, scale: 1, opacity: 0 });
    gsap.set(["#${id}-pill-A", "#${id}-pill-B", "#${id}-modal-A", "#${id}-modal-B"], { opacity: 0 });
    // B splits off carrying A's copy — a duplication is only a duplication if the
    // clone starts identical and the headline swaps afterwards.
    document.getElementById("${id}-head-B").textContent = ${JSON.stringify(V.A.headline)};

    // Scene 1 (0.0-1.0): A shrinks and slides left; its silhouette detaches right.
    tl.to("#${id}-card-A", { x: ${a.x}, y: ${a.y}, scale: ${S2}, duration: 1.0, ease: "power3.inOut" }, 0);
    tl.to("#${id}-card-B", { x: ${b.x}, y: ${b.y}, scale: ${S2}, duration: 1.0, ease: "power3.inOut" }, 0);
    tl.to("#${id}-card-B", { opacity: 1, duration: 0.34, ease: "power2.out" }, 0.16);
    tl.fromTo("#${id}-pill-A", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.34, ease: "power3.out" }, 0.78);

    // Scene 2 (1.0-1.8): the headline swaps IN PLACE on the right card while
    // nothing else moves — the stillness of the rest is what proves the point.
    tl.to("#${id}-head-B", { opacity: 0, y: -14, duration: 0.26, ease: "power2.in" }, 1.02);
    tl.add(function () {
      document.getElementById("${id}-head-B").textContent = ${JSON.stringify(V.B.headline)};
    }, 1.28);
    tl.fromTo("#${id}-head-B", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.34, ease: "power3.out" }, 1.3);
    tl.fromTo("#${id}-pill-B", { scale: 0.78, opacity: 0, transformOrigin: "0% 50%" },
      { scale: 1, opacity: 1, duration: 0.36, ease: "back.out(2)" }, 1.5);

    // Scene 3 (1.8-3.0): a visitor modal rises under each card and starts counting.
    var cA = { v: 0 }, cB = { v: 0 };
    tl.fromTo("#${id}-modal-A", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.84);
    tl.fromTo("#${id}-modal-B", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 2.04);
    tl.to(cA, { v: ${V.A.visitors}, duration: 1.95, ease: "power2.out",
      onUpdate: function () { document.getElementById("${id}-num-A").textContent = ${fn(id)}_int(cA.v); } }, 1.9);
    tl.to(cB, { v: ${V.B.visitors}, duration: 1.9, ease: "power2.out",
      onUpdate: function () { document.getElementById("${id}-num-B").textContent = ${fn(id)}_int(cB.v); } }, 2.05);
${pulse(id, "A", 2.0)}
${pulse(id, "B", 2.25)}
${pulse(id, "A", 3.1)}
${pulse(id, "B", 3.35)}

    // Scene 4 (3.0-4.0): the counters ease out and the frame holds.
    window.__timelines["${cid}"] = tl;`;
  writeFileSync(`compositions/frames/${cid}.html`, wrap(cid, id, D, css, body, script));
}

/* ── Frame 3 — Triplica ───────────────────────────────────────────────────── */
{
  const cid = "03-triplica";
  const id = "f" + cid; // DOM namespace: a CSS id may not start with a digit
  const D = 4.0;
  const L = lanes(D);
  const slot = cardBox(GRID.D, S4);
  const css =
    baseCss(id) +
    chromeCss(id, ["A", "B", "C"], GRID, S4) +
    `
#${id}-slot { position:absolute; left:${r2(slot.left)}px; top:${r2(slot.top)}px;
  width:${r2(CARD_W * S4)}px; height:${r2(CARD_H * S4)}px;
  border:2px dashed rgba(255,255,255,0.24); border-radius:14px; }
`;
  const body = `    <div ${L()} id="${id}-ground"></div>
    <div ${L()} id="${id}-stage" style="position:absolute;inset:0;">
      <div id="${id}-slot"></div>
${cardHtml(id, "A")}
${cardHtml(id, "B")}
${cardHtml(id, "C")}
${pillHtml(id, "A")}
${pillHtml(id, "B")}
${pillHtml(id, "C")}
${modalHtml(id, "A", "visitantes agora", "1.284")}
${modalHtml(id, "B", "visitantes agora", "1.301")}
${modalHtml(id, "C", "visitantes agora", "0")}
    </div>
    <div ${L()} id="${id}-colophon">Conversão inteligente</div>`;
  // A and B enter where frame 2 parked them, then travel into the grid row — the
  // chrome travels by the delta between the two arrangements, not by guesswork.
  const dPill = (k) => ({
    x: r2(pillPos(TWO_UP[k], S2).left - pillPos(GRID[k], S4).left),
    y: r2(pillPos(TWO_UP[k], S2).top - pillPos(GRID[k], S4).top),
  });
  const dModal = (k) => ({
    x: r2(modalPos(TWO_UP[k], S2).left - modalPos(GRID[k], S4).left),
    y: r2(modalPos(TWO_UP[k], S2).top - modalPos(GRID[k], S4).top),
  });
  const a2 = tf(TWO_UP.A, S2), b2 = tf(TWO_UP.B, S2);
  const ag = tf(GRID.A, S4), bg = tf(GRID.B, S4), cg = tf(GRID.C, S4);
  const script = `    window.__timelines = window.__timelines || {};
    var tl = gsap.timeline({ paused: true });
${fmtFn(id)}
    gsap.set(["#${id}-card-A", "#${id}-card-B", "#${id}-card-C"], { transformOrigin: "50% 50%" });
    // handoff_in: A and B exactly where frame 2 left them (two-up, scale ${S2}),
    // their chrome included; counters resume from frame 2's values, never reset.
    gsap.set("#${id}-card-A", { x: ${a2.x}, y: ${a2.y}, scale: ${S2}, opacity: 1 });
    gsap.set("#${id}-card-B", { x: ${b2.x}, y: ${b2.y}, scale: ${S2}, opacity: 1 });
    gsap.set("#${id}-pill-A", { x: ${dPill("A").x}, y: ${dPill("A").y} });
    gsap.set("#${id}-pill-B", { x: ${dPill("B").x}, y: ${dPill("B").y} });
    gsap.set("#${id}-modal-A", { x: ${dModal("A").x}, y: ${dModal("A").y} });
    gsap.set("#${id}-modal-B", { x: ${dModal("B").x}, y: ${dModal("B").y} });
    gsap.set("#${id}-card-C", { x: ${cg.x}, y: ${r2(cg.y - 300)}, scale: ${S4}, opacity: 0 });
    gsap.set("#${id}-slot", { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" });
    gsap.set(["#${id}-pill-C", "#${id}-modal-C"], { opacity: 0 });

    // Scene 1 (0.0-0.7): the grid declares itself — the empty fourth cell draws on
    // before anything fills it, while the two existing cards settle into the row.
    tl.to("#${id}-slot", { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 0.08);
    tl.to("#${id}-card-A", { x: ${ag.x}, y: ${ag.y}, scale: ${S4}, duration: 0.74, ease: "power3.inOut" }, 0);
    tl.to("#${id}-card-B", { x: ${bg.x}, y: ${bg.y}, scale: ${S4}, duration: 0.74, ease: "power3.inOut" }, 0);
    tl.to(["#${id}-pill-A", "#${id}-pill-B", "#${id}-modal-A", "#${id}-modal-B"],
      { x: 0, y: 0, duration: 0.74, ease: "power3.inOut" }, 0);

    // Scene 2 (0.7-1.7): card C drops into the lower-left cell, its third headline
    // already written on it.
    tl.to("#${id}-card-C", { y: ${cg.y}, opacity: 1, duration: 0.88, ease: "power3.out" }, 0.72);

    // Scene 3 (1.7-2.7): C's modal rises and starts counting; A and B carry on
    // from where they were, at visibly different rates.
    var cA = { v: ${V.A.visitors} }, cB = { v: ${V.B.visitors} }, cC = { v: 0 };
    tl.fromTo("#${id}-pill-C", { scale: 0.78, opacity: 0, transformOrigin: "0% 50%" },
      { scale: 1, opacity: 1, duration: 0.36, ease: "back.out(2)" }, 1.6);
    tl.fromTo("#${id}-modal-C", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 1.74);
    tl.to(cC, { v: ${V.C.v2}, duration: 1.75, ease: "power2.out",
      onUpdate: function () { document.getElementById("${id}-num-C").textContent = ${fn(id)}_int(cC.v); } }, 1.8);
    tl.to(cA, { v: ${V.A.v2}, duration: 2.2, ease: "none",
      onUpdate: function () { document.getElementById("${id}-num-A").textContent = ${fn(id)}_int(cA.v); } }, 1.7);
    tl.to(cB, { v: ${V.B.v2}, duration: 2.2, ease: "none",
      onUpdate: function () { document.getElementById("${id}-num-B").textContent = ${fn(id)}_int(cB.v); } }, 1.7);
${pulse(id, "A", 1.0)}
${pulse(id, "B", 1.25)}
${pulse(id, "C", 2.25)}
${pulse(id, "A", 3.05)}
${pulse(id, "C", 3.3)}

    // Scene 4 (2.7-4.0): hold — the empty cell is the loudest thing in the grid.
    window.__timelines["${cid}"] = tl;`;
  writeFileSync(`compositions/frames/${cid}.html`, wrap(cid, id, D, css, body, script));
}

/* ── Frame 4 — A campeã ───────────────────────────────────────────────────── */
{
  const cid = "04-campea";
  const id = "f" + cid; // DOM namespace: a CSS id may not start with a digit
  const D = 6.0;
  const L = lanes(D);
  const slot = cardBox(GRID.D, S4);
  const css =
    baseCss(id) +
    chromeCss(id, ["A", "B", "C", "D"], GRID, S4) +
    "\n" +
    ringCss(id, GRID.D, S4) +
    `
#${id}-slot { position:absolute; left:${r2(slot.left)}px; top:${r2(slot.top)}px;
  width:${r2(CARD_W * S4)}px; height:${r2(CARD_H * S4)}px;
  border:2px dashed rgba(255,255,255,0.24); border-radius:14px; }
`;
  const body = `    <div ${L()} id="${id}-ground"></div>
    <div ${L()} id="${id}-stage" style="position:absolute;inset:0;">
      <div id="${id}-slot"></div>
${cardHtml(id, "A")}
${cardHtml(id, "B")}
${cardHtml(id, "C")}
      <div class="${id}-ring" id="${id}-ring"></div>
${cardHtml(id, "D")}
${pillHtml(id, "A")}
${pillHtml(id, "B")}
${pillHtml(id, "C")}
${pillHtml(id, "D")}
${modalHtml(id, "A", "visitantes agora", "1.731")}
${modalHtml(id, "B", "visitantes agora", "1.810")}
${modalHtml(id, "C", "visitantes agora", "1.189")}
${modalHtml(id, "D", "visitantes agora", "0")}
      <div class="${id}-crown" id="${id}-crown">CAMPEÃ</div>
    </div>
    <div ${L()} id="${id}-colophon">Conversão inteligente</div>`;
  const g = (k) => tf(GRID[k], S4);
  const script = `    window.__timelines = window.__timelines || {};
    var tl = gsap.timeline({ paused: true });
${fmtFn(id)}
    var keys = ["A", "B", "C", "D"];
    gsap.set(["#${id}-card-A", "#${id}-card-B", "#${id}-card-C", "#${id}-card-D"], { transformOrigin: "50% 50%" });
    // handoff_in: three cards in the grid at scale ${S4}, fourth cell still empty.
    gsap.set("#${id}-card-A", { x: ${g("A").x}, y: ${g("A").y}, scale: ${S4}, opacity: 1 });
    gsap.set("#${id}-card-B", { x: ${g("B").x}, y: ${g("B").y}, scale: ${S4}, opacity: 1 });
    gsap.set("#${id}-card-C", { x: ${g("C").x}, y: ${g("C").y}, scale: ${S4}, opacity: 1 });
    gsap.set("#${id}-card-D", { x: ${g("D").x}, y: ${r2(g("D").y - 240)}, scale: ${S4}, opacity: 0 });
    gsap.set(["#${id}-pill-D", "#${id}-modal-D"], { opacity: 0 });
    gsap.set("#${id}-crown", { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" });
    gsap.set("#${id}-ring", { opacity: 0, scale: 0.96, transformOrigin: "50% 50%" });

    // Scene 1 (0.0-1.0): D falls into the empty cell and the dashed outline goes
    // out under it. The grid closes: four headlines, everything else identical.
    tl.to("#${id}-card-D", { y: ${g("D").y}, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.05);
    tl.to("#${id}-slot", { opacity: 0, duration: 0.34, ease: "power2.out" }, 0.3);
    tl.fromTo("#${id}-pill-D", { scale: 0.78, opacity: 0, transformOrigin: "0% 50%" },
      { scale: 1, opacity: 1, duration: 0.34, ease: "back.out(2)" }, 0.68);
    tl.fromTo("#${id}-modal-D", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.36, ease: "power3.out" }, 0.76);
${pulse(id, "D", 1.05)}

    // Scene 2 (1.0-2.2): every modal changes subject in place — visitors becomes
    // conversion. No card moves; only the reading changes.
    for (var i = 0; i < keys.length; i++) {
      tl.to(["#${id}-mlabel-" + keys[i], "#${id}-num-" + keys[i]],
        { opacity: 0, duration: 0.24, ease: "power2.in" }, 1.08 + i * 0.06);
    }
    tl.add(function () {
      for (var j = 0; j < keys.length; j++) {
        document.getElementById("${id}-mlabel-" + keys[j]).textContent = "conversão";
        document.getElementById("${id}-num-" + keys[j]).textContent = "0,0%";
      }
    }, 1.44);
    tl.to(["#${id}-mlabel-A", "#${id}-mlabel-B", "#${id}-mlabel-C", "#${id}-mlabel-D",
           "#${id}-num-A", "#${id}-num-B", "#${id}-num-C", "#${id}-num-D"],
      { opacity: 1, duration: 0.3, ease: "power2.out" }, 1.48);

    // Scene 3 (2.2-3.8): four rates climb at once, at different speeds. D starts
    // slow and overtakes late — the overtake is the beat that earns the verdict.
    var rates = { A: ${V.A.conv}, B: ${V.B.conv}, C: ${V.C.conv}, D: ${V.D.conv} };
    var eases = { A: "power3.out", B: "power3.out", C: "power3.out", D: "power2.in" };
    var px = {};
    for (var k = 0; k < keys.length; k++) {
      (function (key) {
        px[key] = { v: 0 };
        tl.to(px[key], { v: rates[key], duration: 1.55, ease: eases[key],
          onUpdate: function () {
            document.getElementById("${id}-num-" + key).textContent = ${fn(id)}_pct(px[key].v);
          } }, 2.2);
      })(keys[k]);
    }

    // Scene 4 (3.8-4.8): resolution — A/B/C recede, D rises a layer and takes the
    // cyan ring and the CAMPEÃ badge. The frame's single accent moment.
    tl.to(["#${id}-card-A", "#${id}-card-B", "#${id}-card-C"],
      { opacity: 0.55, scale: ${r2(S4 * 0.955)}, duration: 0.6, ease: "power3.out" }, 3.86);
    tl.to(["#${id}-pill-A", "#${id}-pill-B", "#${id}-pill-C",
           "#${id}-modal-A", "#${id}-modal-B", "#${id}-modal-C"],
      { opacity: 0.5, duration: 0.6, ease: "power3.out" }, 3.86);
    tl.to("#${id}-card-D", { scale: ${r2(S4 * 1.045)}, duration: 0.6, ease: "power3.out" }, 3.9);
    tl.to("#${id}-ring", { opacity: 1, scale: 1.045, duration: 0.5, ease: "power3.out" }, 3.95);
    tl.to("#${id}-pill-D", { opacity: 0, duration: 0.22, ease: "power2.in" }, 3.96);
    tl.to("#${id}-crown", { opacity: 1, scale: 1, duration: 0.46, ease: "back.out(2.2)" }, 4.14);
    tl.to("#${id}-num-D", { scale: 1.13, transformOrigin: "0% 50%", duration: 0.42, ease: "back.out(2)" }, 4.14);

    // Scene 5 (4.8-6.0): hold on the climax.
    window.__timelines["${cid}"] = tl;`;
  writeFileSync(`compositions/frames/${cid}.html`, wrap(cid, id, D, css, body, script));
}

/* ── Frame 5 — O mecanismo ────────────────────────────────────────────────── */
{
  const cid = "05-mecanismo";
  const id = "f" + cid; // DOM namespace: a CSS id may not start with a digit
  const D = 4.5;
  const L = lanes(D);
  const ZOOM = 0.3;
  const TARGET_Y = 236; // where the shrunken grid's centre lands
  const css =
    baseCss(id) +
    chromeCss(id, ["A", "B", "C", "D"], GRID, S4) +
    "\n" +
    ringCss(id, GRID.D, S4) +
    `
#${id}-plate { position:absolute; inset:0; background:${C.ground}; border-radius:44px; }
#${id}-band-top, #${id}-band-bot {
  position:absolute; left:0; width:${W}px; height:${H / 2}px; background:${C.brand}; }
#${id}-band-top { top:0; transform-origin:50% 0%; }
#${id}-band-bot { top:${H / 2}px; transform-origin:50% 100%; }
#${id}-wordmark { position:absolute; left:66px; top:414px;
  font-family:'Sora',sans-serif; font-size:33px; font-weight:700;
  letter-spacing:-0.01em; color:rgba(255,255,255,0.7); }
#${id}-l1, #${id}-l2, #${id}-l3 { position:absolute; left:66px; width:960px;
  font-family:'Sora',sans-serif; font-weight:700; font-size:52px; line-height:1.16;
  letter-spacing:-0.028em; color:${C.paper}; }
#${id}-l1 { top:492px; }
#${id}-l2 { top:557px; }
#${id}-l3 { top:622px; }
.${id}-win { color:${C.accent}; }
`;
  const body = `    <div ${L()} id="${id}-ground"></div>
    <div ${L()} id="${id}-band-top"></div>
    <div ${L()} id="${id}-band-bot"></div>
    <div ${L()} id="${id}-stage" style="position:absolute;inset:0;">
      <div id="${id}-plate"></div>
${cardHtml(id, "A")}
${cardHtml(id, "B")}
${cardHtml(id, "C")}
      <div class="${id}-ring" id="${id}-ring"></div>
${cardHtml(id, "D")}
${pillHtml(id, "A")}
${pillHtml(id, "B")}
${pillHtml(id, "C")}
${modalHtml(id, "A", "conversão", "3,1%")}
${modalHtml(id, "B", "conversão", "4,2%")}
${modalHtml(id, "C", "conversão", "2,7%")}
${modalHtml(id, "D", "conversão", "6,8%")}
      <div class="${id}-crown" id="${id}-crown">CAMPEÃ</div>
    </div>
    <div ${L()} id="${id}-wordmark">kro ai_</div>
    <div ${L()} id="${id}-l1">O KRO AI automatiza</div>
    <div ${L()} id="${id}-l2">seus testes A/B e acha</div>
    <div ${L()} id="${id}-l3">a versão <span class="${id}-win">campeã</span> da sua página.</div>`;
  const g = (k) => tf(GRID[k], S4);
  const script = `    window.__timelines = window.__timelines || {};
    var tl = gsap.timeline({ paused: true });

    // handoff_in: the grid exactly as frame 4 left it — full scale, D crowned and
    // ringed, the other three receded to 0.55 opacity.
    gsap.set(["#${id}-card-A", "#${id}-card-B", "#${id}-card-C", "#${id}-card-D"], { transformOrigin: "50% 50%" });
    gsap.set("#${id}-card-A", { x: ${g("A").x}, y: ${g("A").y}, scale: ${r2(S4 * 0.955)}, opacity: 0.55 });
    gsap.set("#${id}-card-B", { x: ${g("B").x}, y: ${g("B").y}, scale: ${r2(S4 * 0.955)}, opacity: 0.55 });
    gsap.set("#${id}-card-C", { x: ${g("C").x}, y: ${g("C").y}, scale: ${r2(S4 * 0.955)}, opacity: 0.55 });
    gsap.set("#${id}-card-D", { x: ${g("D").x}, y: ${g("D").y}, scale: ${r2(S4 * 1.045)}, opacity: 1 });
    gsap.set("#${id}-ring", { scale: 1.045, transformOrigin: "50% 50%" });
    gsap.set(["#${id}-pill-A", "#${id}-pill-B", "#${id}-pill-C",
              "#${id}-modal-A", "#${id}-modal-B", "#${id}-modal-C"], { opacity: 0.5 });
    gsap.set("#${id}-stage", { transformOrigin: "${W / 2}px ${GRID_MID_Y}px" });
    gsap.set(["#${id}-band-top", "#${id}-band-bot"], { scaleY: 0 });
    gsap.set(["#${id}-wordmark", "#${id}-l1", "#${id}-l2", "#${id}-l3"], { opacity: 0 });

    // Scene 1 (0.0-1.6): THE zoom-out — one continuous decelerating move takes the
    // whole grid down to a thumbnail while the brand's purple field grows in from
    // the top and bottom edges and takes over the charcoal stage.
    tl.to("#${id}-stage", { scale: ${ZOOM}, y: ${r2(TARGET_Y - GRID_MID_Y)}, duration: 1.55, ease: "power3.out" }, 0);
    tl.to(["#${id}-band-top", "#${id}-band-bot"], { scaleY: 1, duration: 0.95, ease: "power2.inOut" }, 0.32);

    // Scene 2 (1.6-2.4): the frame locks and the wordmark settles under the
    // thumbnail — the type switches to the display face, so the viewer feels the
    // speaker change from "the product on screen" to "the brand".
    tl.fromTo("#${id}-wordmark", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.46, ease: "power3.out" }, 1.66);

    // Scene 3 (2.4-3.6): the title lands block by block, each line on its own beat.
    tl.fromTo("#${id}-l1", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.4);
    tl.fromTo("#${id}-l2", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.68);
    tl.fromTo("#${id}-l3", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.96);

    // Scene 4 (3.6-4.5): hold. One word carries the cyan; nothing else moves.
    window.__timelines["${cid}"] = tl;`;
  writeFileSync(`compositions/frames/${cid}.html`, wrap(cid, id, D, css, body, script));
}

/* ── Frame 6 — Teste agora a sua ──────────────────────────────────────────── */
{
  const cid = "06-cta";
  const id = "f" + cid; // DOM namespace: a CSS id may not start with a digit
  const D = 3.0;
  const L = lanes(D);
  const css =
    baseCss(id) +
    `
#${id}-wordmark { position:absolute; left:0; width:${W}px; top:330px; text-align:center;
  font-family:'Sora',sans-serif; font-size:32px; font-weight:700;
  letter-spacing:-0.01em; color:rgba(255,255,255,0.48); }
#${id}-cta { position:absolute; left:0; width:${W}px; top:408px; text-align:center;
  font-family:'Sora',sans-serif; font-size:92px; font-weight:800;
  letter-spacing:-0.032em; line-height:1.05; color:${C.paper}; }
#${id}-pillcta { position:absolute; left:${(W - 322) / 2}px; top:592px; width:322px; height:76px;
  border-radius:100px; background:${C.accent}; color:#07323A;
  font-family:'Manrope',sans-serif; font-size:27px; font-weight:700;
  display:flex; align-items:center; justify-content:center; }
#${id}-trial { position:absolute; left:0; width:${W}px; top:698px; text-align:center;
  font-family:'Manrope',sans-serif; font-size:20px; font-weight:500; color:${C.light}; }
`;
  const body = `    <div ${L()} id="${id}-ground"></div>
    <div ${L()} id="${id}-wordmark">kro ai_</div>
    <div ${L()} id="${id}-cta">Teste agora a sua</div>
    <div ${L()} id="${id}-pillcta">usekro.ai</div>
    <div ${L()} id="${id}-trial">14 dias grátis</div>
    <div ${L()} id="${id}-colophon">Conversão inteligente</div>`;
  const script = `    window.__timelines = window.__timelines || {};
    var tl = gsap.timeline({ paused: true });

    // Scene 1 (0.0-1.0): exactly ONE move — the line slides up and stops. The low
    // motion is the payload: after the climax, the brand can afford to be calm.
    tl.fromTo("#${id}-cta", { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.62, ease: "power3.out" }, 0.06);
    tl.fromTo("#${id}-wordmark", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.3);

    // Scene 2 (1.0-1.8): the system's one solid element settles below it.
    tl.fromTo("#${id}-pillcta", { opacity: 0, y: 22, scale: 0.94, transformOrigin: "50% 50%" },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, 1.0);

    // Scene 3 (1.8-3.0): the colophon settles and the film stops moving.
    tl.fromTo("#${id}-trial", { opacity: 0 }, { opacity: 1, duration: 0.42, ease: "power2.out" }, 1.62);

    window.__timelines["${cid}"] = tl;`;
  writeFileSync(`compositions/frames/${cid}.html`, wrap(cid, id, D, css, body, script));
}

console.log("✓ 6 frames written to compositions/frames/");
