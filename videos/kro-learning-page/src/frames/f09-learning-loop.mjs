import { page } from "../lp.mjs";
import { proj, camFor, EL } from "../geom.mjs";
import { HEADLINES, CTA_VARIANTS, BENEFIT_VARIANTS, PROOF_VARIANTS } from "../tokens.mjs";
import { selbox, kchip } from "../chrome.mjs";
import { FINAL } from "./f07-nao-e-opiniao.mjs";

const F = FINAL;
const pad = (e, p = 8) => ({ x: e.x - p, y: e.y - p, w: e.w + p * 2, h: e.h + p * 2 });
const WIDE = { x: 0, y: 0, s: 1.0 };
// Keep the page inside the left ~62% at every cycle so the KRO column stays on
// darkness — the chips are an overlay layer, not a thing printed on the page.
const camAt = (k, s, at) => camFor({ x: EL[k].x + EL[k].w / 2, y: EL[k].y + EL[k].h / 2 }, at, s, F);
const CHIP_X = 1396;

const CYCLES = [
  { el: "cta", tag: "cta", cam: camAt("cta", 1.34, { x: 560, y: 496 }), texts: CTA_VARIANTS, win: 1, t: 0.0, len: 1.6 },
  { el: "benefit", tag: "benefício", cam: WIDE, texts: BENEFIT_VARIANTS, win: 2, t: 1.6, len: 1.6 },
  { el: "proof", tag: "prova social", cam: camAt("proof", 1.18, { x: 620, y: 520 }), texts: PROOF_VARIANTS, win: 0, t: 3.2, len: 1.2 },
].map((c) => {
  const b = pad(EL[c.el]);
  const tr = proj({ x: b.x + b.w, y: b.y }, F, c.cam);
  const br = proj({ x: b.x + b.w, y: b.y + b.h }, F, c.cam);
  const midY = Math.round((tr.y + br.y) / 2);
  return {
    ...c,
    box: b,
    chips: [0, 1, 2].map((i) => ({ x: CHIP_X, y: midY - 118 + i * 82 })),
    from: [Math.round(tr.x), midY],
    link: `M${Math.round(tr.x)},${midY} L${CHIP_X - 18},${midY}`,
  };
});

export default {
  id: "f09",
  duration: 8,
  body: `
    <div class="clip" id="f09-scene" data-start="0" data-duration="8" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f09-accent"></div>
      <div class="stage"><div class="world" id="f09-world">
        <div class="slot" id="f09-p-slot">
          ${page({ id: "f09-p", headline: HEADLINES.v3 })}
          ${CYCLES.map((c, i) => selbox("f09-b" + i, c.box, c.tag)).join("\n          ")}
        </div>
      </div></div>


      <svg class="branch" id="f09-links" width="1920" height="1080" viewBox="0 0 1920 1080"
           style="position:absolute;left:0;top:0">
        ${CYCLES.map((c, i) => `<path id="f09-lk${i}" d="${c.link}"></path>`).join("\n        ")}
      </svg>

      ${CYCLES.map((c, i) => c.chips.map((p, j) => `
      <div class="hyp mini" id="f09-c${i}-${j}" style="left:${p.x}px;top:${p.y}px">${c.texts[j]}</div>`).join("")).join("")}
      ${CYCLES.map((c, i) => [0, 1, 2, 3, 4, 5].map((j) => `<div class="mk" id="f09-t${i}-${j}"></div>`).join("")).join("")}

      ${kchip("f09-chip", "aprendizados do KRO", 1476, 108, 1)}

      <div class="ed" id="f09-edA" style="left:150px;top:118px" data-layout-allow-overlap="true">Seu site deixa de ser uma</div>
      <div class="ed" id="f09-edB" style="left:150px;top:182px" data-layout-allow-overlap="true"><b>página estática</b>.</div>
      <div class="ed" id="f09-g0" style="left:150px;top:182px" data-layout-allow-overlap="true"><b>página estática</b>.</div>
      <div class="ed" id="f09-g1" style="left:150px;top:182px" data-layout-allow-overlap="true"><b>página estática</b>.</div>
      <div class="ed" id="f09-edC" style="left:150px;top:150px" data-layout-allow-overlap="true">E passa a aprender com quem realmente importa: <b>seus visitantes</b>.</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    const F = ${JSON.stringify(F)};
    const CY = ${JSON.stringify(CYCLES.map((c) => ({ cam: c.cam, chips: c.chips, from: c.from, win: c.win, t: c.t, len: c.len })))};
    K.slot($("#f09-p-slot"), { x: F.x, y: F.y, s: F.s, ry: -3 });
    gsap.set($("#f09-accent"), { autoAlpha: 0.26 });
    gsap.set([$("#f09-edA"), $("#f09-edB"), $("#f09-edC"), $("#f09-g0"), $("#f09-g1")], { autoAlpha: 0 });
    $$(".selbox").forEach((b) => gsap.set(b, { autoAlpha: 0 }));
    $$(".hyp").forEach((h) => gsap.set(h, { autoAlpha: 0 }));
    gsap.set($$(".mk"), { autoAlpha: 0 });
    K.in(tl, $("#f09-chip"), 0.15, 0.4, 8);
    // the counter is the only thing that survives each cycle — a pure function of time
    const cnt = { v: 0 }, nEl = $("#f09-chip-n");
    tl.to(cnt, { v: 1, duration: D, ease: "none", onUpdate() {
      const t = cnt.v * D;
      nEl.textContent = String(t < 1.3 ? 1 : t < 2.9 ? 2 : t < 4.1 ? 3 : 4);
    } }, 0);

    // three condensed cycles. Same verbs, different element, harder cut.
    CY.forEach((c, i) => {
      const t = c.t, L = c.len;
      // match cut: the page is the constant axis, the camera is what moves
      tl.set($("#f09-world"), { x: c.cam.x, y: c.cam.y, scale: c.cam.s }, t);

      // selectElement()
      K.selectElement(tl, $("#f09-b" + i), t + 0.04, 0.3);
      const lk = $("#f09-lk" + i), LK = lk.getTotalLength();
      gsap.set(lk, { strokeDasharray: LK, strokeDashoffset: LK, autoAlpha: 0 });
      tl.fromTo(lk, { strokeDashoffset: LK, autoAlpha: 1 },
        { strokeDashoffset: 0, autoAlpha: 1, duration: 0.22, ease: "power2.inOut", immediateRender: false }, t + 0.2);
      tl.fromTo(lk, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.16, immediateRender: false }, t + L - 0.1);
      // generateHypotheses(), condensed
      const chips = [0, 1, 2].map((j) => $("#f09-c" + i + "-" + j));
      chips.forEach((el, j) => {
        tl.fromTo(el, { autoAlpha: 0, x: -34, scaleX: 0.86 },
          { autoAlpha: 1, x: 0, scaleX: 1, duration: 0.34, ease: "power3.out", immediateRender: false }, t + 0.26 + j * 0.09);
      });
      // distributeVisitors(), condensed
      K.distributeVisitors(tl, [0, 1, 2, 3, 4, 5].map((j) => ({
        el: $("#f09-t" + i + "-" + j),
        pts: [[c.from[0] - 240, c.from[1] + (j % 3 - 1) * 90], [c.from[0] - 60, c.from[1] + (j % 3 - 1) * 60],
              [c.chips[j % 3].x - 24, c.chips[j % 3].y + 26]],
        t0: (j / 6) * 0.6, span: 0.34, o: 0.8,
      })), t + 0.6, L * 0.52);
      // selectWinner(), condensed — definition, not celebration
      chips.forEach((el, j) => {
        if (j === c.win) {
          tl.fromTo(el, { borderColor: "rgba(124,58,237,0.42)" },
            { borderColor: "rgba(6,182,212,0.85)", duration: 0.3, ease: "power2.out", immediateRender: false }, t + L - 0.42);
          tl.fromTo(el, { scale: 1 }, { scale: 1.045, duration: 0.34, ease: "power3.out", immediateRender: false }, t + L - 0.42);
        } else {
          tl.fromTo(el, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: "power2.inOut", immediateRender: false }, t + L - 0.42);
        }
      });
      // clear for the next element
      tl.fromTo(chips, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.16, immediateRender: false }, t + L - 0.1);
      tl.fromTo($("#f09-b" + i), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.16, immediateRender: false }, t + L - 0.1);
    });

    // back to wide — the page again, whole, and now the sentence about it
    tl.set($("#f09-world"), { x: 0, y: 0, scale: 1.0 }, 4.4);
    K.in(tl, $("#f09-edA"), 4.5, 0.55, 16);
    K.in(tl, $("#f09-edB"), 4.75, 0.55, 16);

    // the film applies its own mechanic to its own sentence
    tl.fromTo($("#f09-g0"), { autoAlpha: 0, x: 0, y: 0, scale: 1 },
      { autoAlpha: 0.42, x: 670, y: -32, scale: 0.94, duration: 0.62, ease: "power3.out", immediateRender: false }, 5.25);
    tl.fromTo($("#f09-g1"), { autoAlpha: 0, x: 0, y: 0, scale: 1 },
      { autoAlpha: 0.42, x: 670, y: 32, scale: 0.94, duration: 0.62, ease: "power3.out", immediateRender: false }, 5.35);
    tl.fromTo([$("#f09-g0"), $("#f09-g1")], { autoAlpha: 0.42 },
      { autoAlpha: 0, x: 0, y: 0, scale: 1, duration: 0.55, ease: "power2.inOut", immediateRender: false }, 6.15);

    // and resolves it
    K.out(tl, $("#f09-edA"), 6.35, 0.4, -12);
    K.out(tl, $("#f09-edB"), 6.4, 0.4, -12);
    K.in(tl, $("#f09-edC"), 6.85, 0.8, 18);
  `,
};
