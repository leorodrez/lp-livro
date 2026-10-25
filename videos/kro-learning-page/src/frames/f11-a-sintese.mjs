import { page, pageSlot } from "../lp.mjs";
import { HEADLINES } from "../tokens.mjs";
import { FINAL } from "./f07-nao-e-opiniao.mjs";

const F = { x: FINAL.x, y: FINAL.y, s: FINAL.s };
// the split-and-converge motif of the whole film, compressed into one gesture
const SPLIT = [
  { key: "v2", x: 620, y: 470, ry: 10, z: -140 },
  { key: "v4", x: 1300, y: 470, ry: -10, z: -140 },
];

export default {
  id: "f11",
  duration: 5,
  body: `
    <div class="clip" id="f11-scene" data-start="0" data-duration="5" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f11-accent"></div>
      <div class="stage"><div class="world" id="f11-world">
        ${SPLIT.map((s) => pageSlot("f11-" + s.key, { headline: HEADLINES[s.key] })).join("\n        ")}
        <div class="slot" id="f11-p-slot">${page({ id: "f11-p", headline: HEADLINES.v3 })}</div>
      </div></div>

      <div class="ed" id="f11-ed1" style="left:150px;top:126px" data-layout-allow-overlap="true">Você escolhe o que seu site <b>diz</b>.</div>
      <div class="ed" id="f11-ed2" style="left:150px;top:126px" data-layout-allow-overlap="true">Seus clientes podem mostrar o que ele <b>deveria dizer</b>.</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    const F = ${JSON.stringify(F)};
    const SP = ${JSON.stringify(SPLIT)};
    K.slot($("#f11-p-slot"), { x: F.x, y: F.y, s: F.s, ry: 0 });
    SP.forEach((s) => K.slot($("#f11-" + s.key + "-slot"), { x: F.x, y: F.y, s: F.s, ry: 0, o: 0 }));
    gsap.set($("#f11-accent"), { autoAlpha: 0.22 });
    gsap.set([$("#f11-ed1"), $("#f11-ed2")], { autoAlpha: 0 });

    // the camera is practically still; the movement is minimal and exact
    K.camHold($("#f11-world"), { x: 0, y: 0, s: 1.0 });

    K.in(tl, $("#f11-ed1"), 0.25, 0.75, 18);

    // splitVariants(), one second — the film's motif, said once more
    SP.forEach((s, i) => {
      K.slotTo(tl, $("#f11-" + s.key + "-slot"),
        { x: F.x, y: F.y, s: F.s, ry: 0, z: 0, o: 0 },
        { x: s.x, y: s.y, s: F.s * 0.86, ry: s.ry, z: s.z, o: 0.5 },
        1.4 + i * 0.06, 0.85, "power3.out");
    });
    tl.fromTo($("#f11-p-slot"), { scale: F.s }, { scale: F.s * 0.94, duration: 0.85, ease: "power3.out", immediateRender: false }, 1.4);

    // mergeVariants() — they converge behind the one that earned it
    SP.forEach((s, i) => {
      K.slotTo(tl, $("#f11-" + s.key + "-slot"),
        { x: s.x, y: s.y, s: F.s * 0.86, ry: s.ry, z: s.z, o: 0.5 },
        { x: F.x, y: F.y, s: F.s * 0.9, ry: 0, z: -80, o: 0 },
        2.55 + i * 0.05, 0.75, "power2.inOut");
    });
    tl.fromTo($("#f11-p-slot"), { scale: F.s * 0.94 }, { scale: F.s, duration: 0.8, ease: "power3.out", immediateRender: false }, 2.55);

    K.swap(tl, $("#f11-ed1"), $("#f11-ed2"), 3.35);

    // the page steps back and hands the frame to the signature
    tl.fromTo($("#f11-p-slot"), { scale: F.s, autoAlpha: 1 },
      { scale: 0.30, autoAlpha: 0, duration: 1.0, ease: "power2.in", immediateRender: false }, 4.0);
  `,
};
