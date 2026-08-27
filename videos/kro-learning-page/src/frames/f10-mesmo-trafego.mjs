import { page } from "../lp.mjs";
import { HEADLINES } from "../tokens.mjs";
import { kchip } from "../chrome.mjs";
import { FINAL } from "./f07-nao-e-opiniao.mjs";

const F = FINAL;
// A continuous, denser stream. Same visitors as frame 01 — what changed is what
// the system does with them.
const N = 26;
const FLOW = Array.from({ length: N }, (_, i) => {
  const lane = (i % 9) - 4;
  return {
    t0: (i / N) * 0.84,
    span: 0.22,
    pts: [[-60, 470 + lane * 66], [340, 486 + lane * 46], [820, 500 + lane * 22], [1180, 500 + lane * 10], [1560, 512 + lane * 18]],
  };
});
// every visit leaves one signal behind, and the signals stay
const SIG = Array.from({ length: 34 }, (_, i) => ({
  x: 590 + i * 22.4,
  y: 806 - Math.round((i / 33) * 34),
  t: 1.9 + (i / 33) * 2.6,
}));

export default {
  id: "f10",
  duration: 7,
  body: `
    <div class="clip" id="f10-scene" data-start="0" data-duration="7" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f10-accent"></div>
      <div class="stage"><div class="world" id="f10-world">
        <div class="slot" id="f10-p-slot">${page({ id: "f10-p", headline: HEADLINES.v3 })}</div>
        <div class="layer" style="position:absolute;inset:0">
          ${FLOW.map((_, i) => `<div class="mk" id="f10-mk${i}"></div>`).join("")}
        </div>
      </div></div>

      <div class="klayer" id="f10-klayer" style="position:absolute;left:566px;top:768px;width:790px;height:62px;
        border-top:1px solid rgba(124,58,237,.30)">
        ${SIG.map((s, i) => `<div class="sig" id="f10-sg${i}" style="left:${Math.round(s.x - 566)}px;top:${Math.round(s.y - 768)}px"></div>`).join("")}
      </div>
      ${kchip("f10-chip", "aprendizado acumulado", 1400, 754, 4)}

      <div class="ed" id="f10-ed1" style="left:150px;top:126px" data-layout-allow-overlap="true">Você já <b>investe</b> para trazer pessoas até o seu site.</div>
      <div class="ed" id="f10-ed2" style="left:150px;top:126px" data-layout-allow-overlap="true">O KRO ajuda você a aprender <b>o que dizer</b> quando elas chegam.</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    const F = ${JSON.stringify(F)};
    K.slot($("#f10-p-slot"), { x: F.x, y: F.y, s: F.s, ry: -2 });
    gsap.set($("#f10-accent"), { autoAlpha: 0.24 });
    gsap.set([$("#f10-ed1"), $("#f10-ed2")], { autoAlpha: 0 });
    gsap.set($$(".mk"), { autoAlpha: 0 });
    gsap.set($$(".sig"), { autoAlpha: 0, scale: 0.4 });
    gsap.set([$("#f10-klayer"), $("#f10-chip")], { autoAlpha: 0 });

    // slow, steady, confident — the shot after the argument is won
    K.cam(tl, $("#f10-world"), { x: 0, y: 0, s: 0.958 }, { x: 0, y: 0, s: 1.0 }, 0, D, "none");
    tl.fromTo($("#f10-p-slot"), { rotationY: -2 }, { rotationY: 0, duration: D, ease: "power2.inOut", immediateRender: false }, 0);

    // the same traffic as frame 01, entering from the same side
    const FL = ${JSON.stringify(FLOW)};
    K.distributeVisitors(tl, FL.map((f, i) => ({
      el: $("#f10-mk" + i), pts: f.pts, t0: f.t0, span: f.span, o: 0.8,
    })), 0, 5.6);

    K.in(tl, $("#f10-ed1"), 1.5, 0.85, 20);

    // what is new: the KRO layer keeps something from every visit
    tl.fromTo($("#f10-klayer"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, 2.9);
    K.in(tl, $("#f10-chip"), 3.1, 0.55, 10);
    const S = ${JSON.stringify(SIG)};
    S.forEach((s, i) => {
      tl.fromTo($("#f10-sg" + i), { autoAlpha: 0, scale: 0.4 },
        { autoAlpha: 0.42 + (i / 33) * 0.5, scale: 1, duration: 0.34, ease: "power3.out", immediateRender: false }, s.t);
    });

    K.swap(tl, $("#f10-ed1"), $("#f10-ed2"), 4.4);

    // everything clears but the page and its message
    tl.fromTo([$("#f10-klayer"), $("#f10-chip")], { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.7, ease: "power2.inOut", immediateRender: false }, 6.1);
    tl.fromTo($("#f10-ed2"), { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.6, ease: "power2.in", immediateRender: false }, 6.35);
  `,
};
