import { pageSlot } from "../lp.mjs";
import { VARIANTS, METRICS } from "../tokens.mjs";
import { mstack, stub } from "../chrome.mjs";
import { FAN } from "./f04-ia-explora-argumentos.mjs";

const CAM_A = { x: 0, y: 0, s: 1.0 };
export const CAM_B = { x: -18, y: -6, s: 1.02 };
const STACK_Y = 648;

// A continuous stream from the left that splits fairly between the four versions.
// Deterministic: the target is i % 4, the timing is derived from the index.
const N = 32;
const FLOW = Array.from({ length: N }, (_, i) => {
  const t = i % 4;
  const lane = (i % 7) - 3;
  return {
    t0: (i / N) * 0.82,
    span: 0.20 + ((i * 7) % 5) * 0.012,
    pts: [[-50, 470 + lane * 62], [210, 480 + lane * 40], [FAN.x[t] - 190, 452 + lane * 16], [FAN.x[t] + lane * 24, 430]],
  };
});

export default {
  id: "f06",
  duration: 9,
  body: `
    <div class="clip" id="f06-scene" data-start="0" data-duration="9" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f06-accent"></div>
      <div class="stage"><div class="world" id="f06-world">
        ${VARIANTS.map((v) => pageSlot("f06-" + v.key, { headline: v.headline })).join("\n        ")}
        <div class="layer" style="position:absolute;inset:0">
          ${FLOW.map((_, i) => `<div class="mk" id="f06-mk${i}"></div>`).join("")}
        </div>
      </div></div>

      ${VARIANTS.map((v, i) => mstack("f06-m" + i, v.label, stub(v.headline, 26), FAN.x[i], STACK_Y)).join("\n      ")}

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    const FAN = ${JSON.stringify(FAN)};
    const VK = ${JSON.stringify(VARIANTS.map((v) => v.key))};
    const M = ${JSON.stringify(VARIANTS.map((v) => METRICS[v.key]))};
    const slots = VK.map((k) => $("#f06-" + k + "-slot"));
    slots.forEach((el, i) => K.slot(el, { x: FAN.x[i], y: FAN.y + FAN.dy[i], s: FAN.s, ry: FAN.ry[i], z: FAN.z[i] }));
    gsap.set($("#f06-accent"), { autoAlpha: 0.30 });
    gsap.set($$(".mk"), { autoAlpha: 0 });
    $$(".mstack").forEach((s) => gsap.set(s, { autoAlpha: 0 }));
    $$(".mbar > i").forEach((b) => gsap.set(b, { scaleX: 0 }));

    // camera barely moves — the data is the event
    K.cam(tl, $("#f06-world"), ${JSON.stringify(CAM_A)}, ${JSON.stringify(CAM_B)}, 0, D, "none");

    // distributeVisitors() — a fair split, and the film shows the fairness first
    const F = ${JSON.stringify(FLOW)};
    K.distributeVisitors(tl, F.map((f, i) => ({
      el: $("#f06-mk" + i), pts: f.pts, t0: f.t0, span: f.span, o: 0.8,
    })), 0, 7.4);

    // the readouts arrive empty, as a consequence of traffic existing
    tl.fromTo($$(".mstack"), { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.09, immediateRender: false }, 0.9);

    // animateResults() — visitors first (nearly equal), then the response diverges
    M.forEach((m, i) => {
      K.count(tl, $("#f06-m" + i + "-vis"), 0, m.visitors, 2.0, 2.1, (v) => Math.round(v).toLocaleString("pt-BR"));
      K.bar(tl, $("#f06-m" + i + "-bar-vis"), m.visitors / 1320, 2.0, 2.1);
      K.count(tl, $("#f06-m" + i + "-clk"), 0, m.clicks, 4.15, 1.7);
      K.count(tl, $("#f06-m" + i + "-sig"), 0, m.signups, 4.8, 1.9);
      K.bar(tl, $("#f06-m" + i + "-bar-sig"), m.signups / 74, 4.8, 1.9);
    });

    // rack focus travels from the version with volume to the version with response
    tl.fromTo(slots[2], { filter: "blur(0px)" }, { filter: "blur(0px)", duration: 0.1, immediateRender: false }, 0);
    [0, 1, 3].forEach((i, n) => {
      tl.fromTo(slots[i], { filter: "blur(0px)" },
        { filter: "blur(2.6px)", duration: 1.2, ease: "power2.inOut", immediateRender: false }, 5.4 + n * 0.12);
    });
    // V3 gains a thread of contrast — still declaring nothing
    tl.fromTo(slots[2], { scale: FAN.s }, { scale: FAN.s * 1.035, duration: 1.5, ease: "power3.out", immediateRender: false }, 6.2);
    // the winner keeps the data colour; the others go neutral. Emphasis by hue,
    // never by dimming a readout until it cannot be read.
    [0, 1, 3].forEach((i, n) => {
      tl.fromTo($$("#f06-m" + i + " .mrow-n"), { color: "#06B6D4" },
        { color: "#9AA1AC", duration: 1.2, ease: "power2.inOut", immediateRender: false }, 5.4 + n * 0.12);
      tl.fromTo($$("#f06-m" + i + " .mbar > i"), { backgroundColor: "#06B6D4" },
        { backgroundColor: "#5C636E", duration: 1.2, ease: "power2.inOut", immediateRender: false }, 5.4 + n * 0.12);
    });
  `,
};
