import { page } from "../lp.mjs";
import { EL } from "../geom.mjs";
import { HEADLINES } from "../tokens.mjs";
import { selbox, kchip } from "../chrome.mjs";
import { FINAL } from "./f07-nao-e-opiniao.mjs";

const pad = (e, p = 8) => ({ x: e.x - p, y: e.y - p, w: e.w + p * 2, h: e.h + p * 2 });
const STEPS = [
  { box: pad(EL.cta), tag: "cta" },
  { box: pad(EL.benefit), tag: "benefício" },
  { box: pad(EL.sub), tag: "oferta" },
  { box: pad(EL.proof), tag: "posicionamento" },
];
const ENUM = ["Headline.", "Oferta.", "Benefícios.", "CTA.", "Posicionamento."];

export default {
  id: "f08",
  duration: 7,
  body: `
    <div class="clip" id="f08-scene" data-start="0" data-duration="7" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f08-accent"></div>
      <div class="stage"><div class="world" id="f08-world">
        <div class="slot" id="f08-p-slot">
          ${page({ id: "f08-p", headline: HEADLINES.v3 })}
          ${STEPS.map((s, i) => selbox("f08-b" + i, s.box, s.tag)).join("\n          ")}
        </div>
        <div class="layer" style="position:absolute;inset:0">
          ${kchip("f08-chip", "aprendizados do KRO", 1382, 262, 1)}
        </div>
      </div></div>

      <div class="ed" id="f08-ed1" style="left:150px;top:126px" data-layout-allow-overlap="true">Cada experimento deixa seu site <b>mais inteligente</b>.</div>
      <div class="ed-enum" id="f08-enum" style="left:1424px;top:352px;width:430px">
        ${ENUM.map((w, i) => `<span id="f08-e${i}">${w}</span>`).join(" ")}
      </div>
      <div class="ed" id="f08-ed2" style="left:150px;top:812px" data-layout-allow-overlap="true">Se está escrito no seu site, existe <b>algo para aprender</b>.</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    const F = ${JSON.stringify(FINAL)};
    K.slot($("#f08-p-slot"), { x: F.x, y: F.y, s: F.s, ry: F.ry });
    gsap.set($("#f08-accent"), { autoAlpha: 0.26 });
    gsap.set([$("#f08-ed1"), $("#f08-ed2"), $("#f08-enum"), $("#f08-chip")], { autoAlpha: 0 });
    $$(".selbox").forEach((b) => gsap.set(b, { autoAlpha: 0 }));

    // a very slow pull-back: the page is whole again and we want to see all of it
    K.cam(tl, $("#f08-world"), { x: 0, y: 0, s: 1.0 }, { x: 0, y: 0, s: 0.958 }, 0, D, "none");

    // the learning is stored, not spent — a small permanent mark of the KRO layer
    K.in(tl, $("#f08-chip"), 0.5, 0.6, 10);
    K.in(tl, $("#f08-ed1"), 1.3, 0.85, 20);

    // highlightNextExperiment() — one element at a time, each held long enough to read
    const at = [2.75, 3.35, 3.95, 4.55];
    at.forEach((t, i) => {
      K.selectElement(tl, $("#f08-b" + i), t, 0.5);
      if (i < 3) tl.fromTo($("#f08-b" + i), { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.3, ease: "power2.in", immediateRender: false }, t + 0.62);
    });

    // the enumeration tracks the highlight — weight and colour, not motion
    K.in(tl, $("#f08-enum"), 2.6, 0.6, 14);
    const map = [3, 2, 1, 4];
    at.forEach((t, i) => {
      const el = $("#f08-e" + map[i]);
      tl.fromTo(el, { color: "#6E747E" }, { color: "#F5F2EC", duration: 0.24, immediateRender: false }, t);
      if (i < 3) tl.fromTo(el, { color: "#F5F2EC" }, { color: "#6E747E", duration: 0.24, immediateRender: false }, t + 0.62);
    });

    K.in(tl, $("#f08-ed2"), 5.25, 0.85, 20);
    // the CTA highlight survives the cut — it is already the next experiment
    tl.fromTo($("#f08-b0"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out", immediateRender: false }, 6.1);
    tl.fromTo($("#f08-b3"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: "power2.in", immediateRender: false }, 6.1);
    tl.fromTo($("#f08-enum"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.45, ease: "power2.in", immediateRender: false }, 6.2);
  `,
};
