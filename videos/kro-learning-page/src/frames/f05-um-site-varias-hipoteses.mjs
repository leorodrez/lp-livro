import { pageSlot } from "../lp.mjs";
import { VARIANTS } from "../tokens.mjs";
import { vlabel, stub } from "../chrome.mjs";
import { FAN } from "./f04-ia-explora-argumentos.mjs";

const CAM_A = { x: 176, y: 0, s: 1.062 };
const CAM_B = { x: 0, y: 0, s: 1.0 };
const LABEL_Y = 636;

// first traffic — the consequence of the second editorial line, not decoration
const FLOW = VARIANTS.map((v, i) => [
  { t0: 0.06 + i * 0.05, span: 0.34, pts: [[-40, 430 + i * 40], [180, 460], [FAN.x[i] - 120, 470], [FAN.x[i], 430]] },
  { t0: 0.30 + i * 0.06, span: 0.34, pts: [[-40, 700 - i * 30], [240, 640], [FAN.x[i] - 90, 540], [FAN.x[i] + 40, 440]] },
]).flat();

export default {
  id: "f05",
  duration: 7,
  body: `
    <div class="clip" id="f05-scene" data-start="0" data-duration="7" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f05-accent"></div>
      <div class="stage"><div class="world" id="f05-world">
        ${VARIANTS.map((v) => pageSlot("f05-" + v.key, { headline: v.headline })).join("\n        ")}
        <div class="layer" style="position:absolute;inset:0">
          ${FLOW.map((_, i) => `<div class="mk" id="f05-mk${i}"></div>`).join("\n          ")}
        </div>
      </div></div>

      ${VARIANTS.map((v, i) => vlabel("f05-l" + i, v.label, stub(v.headline, 34), FAN.x[i], LABEL_Y)).join("\n      ")}

      <div class="ed" id="f05-ed1" style="left:180px;top:150px" data-layout-allow-overlap="true">O mesmo site. Diferentes formas de <b>comunicar</b>.</div>
      <div class="ed" id="f05-ed2" style="left:180px;top:150px" data-layout-allow-overlap="true"><b>Visitantes reais</b> começam a responder.</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    const FAN = ${JSON.stringify(FAN)};
    const VK = ${JSON.stringify(VARIANTS.map((v) => v.key))};
    const slots = VK.map((k) => $("#f05-" + k + "-slot"));
    slots.forEach((el, i) => K.slot(el, { x: FAN.x[i], y: FAN.y + FAN.dy[i], s: FAN.s, ry: FAN.ry[i], z: FAN.z[i] }));
    gsap.set($("#f05-accent"), { autoAlpha: 0.30 });
    gsap.set([$("#f05-ed1"), $("#f05-ed2")], { autoAlpha: 0 });
    gsap.set($$(".vlabel"), { autoAlpha: 0 });
    gsap.set($$(".mk"), { autoAlpha: 0 });

    // lateral tracking that settles the fan into the experiment grid
    K.cam(tl, $("#f05-world"), ${JSON.stringify(CAM_A)}, ${JSON.stringify(CAM_B)}, 0, 5.0, "power2.out");

    // rack focus sweeps left to right across the versions, then everything resolves
    const focus = [0.0, 1.1, 2.2, 3.3];
    slots.forEach((el, i) => {
      gsap.set(el, { filter: "blur(" + (i === 0 ? 0 : 4.5) + "px)" });
      if (i > 0) tl.fromTo(el, { filter: "blur(4.5px)" },
        { filter: "blur(0px)", duration: 0.9, ease: "power2.inOut", immediateRender: false }, focus[i]);
      if (i < 3) tl.fromTo(el, { filter: "blur(0px)" },
        { filter: "blur(3.2px)", duration: 0.9, ease: "power2.inOut", immediateRender: false }, focus[i] + 1.1);
    });
    slots.forEach((el, i) => tl.fromTo(el, { filter: "blur(" + (i === 3 ? 0 : 3.2) + "px)" },
      { filter: "blur(0px)", duration: 1.0, ease: "power2.inOut", immediateRender: false }, 4.4));

    // the structure is identical everywhere; only the message differs
    K.in(tl, $("#f05-ed1"), 1.2, 0.8, 18);
    tl.fromTo($$(".vlabel"), { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.11, immediateRender: false }, 3.1);

    // the second line names what happens next — and it happens
    K.swap(tl, $("#f05-ed1"), $("#f05-ed2"), 4.3);
    const F = ${JSON.stringify(FLOW)};
    K.distributeVisitors(tl, F.map((f, i) => ({
      el: $("#f05-mk" + i), pts: f.pts, t0: f.t0, span: f.span, o: 0.85,
    })), 5.05, 1.95);
  `,
};
