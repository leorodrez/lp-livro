import { pageSlot } from "../lp.mjs";
import { VARIANTS, METRICS, WINNER } from "../tokens.mjs";
import { mstack, stub } from "../chrome.mjs";
import { FAN } from "./f04-ia-explora-argumentos.mjs";
import { CAM_B as CAM_A } from "./f06-o-mercado-responde.mjs";

const STACK_Y = 648;
const W = 2; // V3 is the winner — index 2
export const HERO = { x: 1288, y: 420, s: 0.54, ry: -3 };
export const FINAL = { x: 960, y: 500, s: 0.62, ry: -4 };
const WIN_STACK = { x: 1288, y: 666 };

export default {
  id: "f07",
  duration: 8,
  body: `
    <div class="clip" id="f07-scene" data-start="0" data-duration="8" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f07-accent"></div>
      <div class="stage"><div class="world" id="f07-world">
        ${VARIANTS.map((v) => pageSlot("f07-" + v.key, { headline: v.headline })).join("\n        ")}
      </div></div>

      ${VARIANTS.map((v, i) => mstack("f07-m" + i, v.label, stub(v.headline, 26), FAN.x[i], STACK_Y)).join("\n      ")}

      <div class="ed" id="f07-ed1" style="left:112px;top:318px;width:620px;max-width:620px" data-layout-allow-overlap="true">O KRO não tenta <b>adivinhar</b> qual texto é melhor.</div>
      <div class="ed" id="f07-ed2" style="left:112px;top:318px;width:620px;max-width:620px" data-layout-allow-overlap="true">Ele deixa <b>seus próprios clientes</b> responderem.</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    const FAN = ${JSON.stringify(FAN)};
    const VK = ${JSON.stringify(VARIANTS.map((v) => v.key))};
    const M = ${JSON.stringify(VARIANTS.map((v) => METRICS[v.key]))};
    const HERO = ${JSON.stringify(HERO)}, FINAL = ${JSON.stringify(FINAL)};
    const slots = VK.map((k) => $("#f07-" + k + "-slot"));
    slots.forEach((el, i) => K.slot(el, {
      x: FAN.x[i], y: FAN.y + FAN.dy[i], s: FAN.s, ry: FAN.ry[i], z: FAN.z[i],
      b: i === ${W} ? 0 : 2.6,
    }));
    gsap.set($("#f07-accent"), { autoAlpha: 0.30 });
    gsap.set([$("#f07-ed1"), $("#f07-ed2")], { autoAlpha: 0 });
    // the readouts carry the numbers frame 06 finished on
    M.forEach((m, i) => {
      $("#f07-m" + i + "-vis").textContent = m.visitors.toLocaleString("pt-BR");
      $("#f07-m" + i + "-clk").textContent = String(m.clicks);
      $("#f07-m" + i + "-sig").textContent = String(m.signups);
      gsap.set($("#f07-m" + i + "-bar-vis"), { scaleX: m.visitors / 1320 });
      gsap.set($("#f07-m" + i + "-bar-sig"), { scaleX: m.signups / 74 });
      gsap.set($("#f07-m" + i), { autoAlpha: 1 });
      if (i !== ${W}) {
        gsap.set($$("#f07-m" + i + " .mrow-n"), { color: "#9AA1AC" });
        gsap.set($$("#f07-m" + i + " .mbar > i"), { backgroundColor: "#5C636E" });
      }
    });

    // the camera settles; nothing here is sold by movement
    K.cam(tl, $("#f07-world"), ${JSON.stringify(CAM_A)}, { x: 0, y: 0, s: 1.0 }, 0, 3.4, "power2.inOut");

    // 1. selectWinner() — contrast and definition, never bloom
    [0, 1, 3].forEach((i, n) => {
      K.slotTo(tl, slots[i],
        { x: FAN.x[i], y: FAN.y + FAN.dy[i], s: FAN.s, ry: FAN.ry[i], z: FAN.z[i], o: 1, b: 2.6 },
        { x: FAN.x[i], y: FAN.y + FAN.dy[i], s: FAN.s, ry: FAN.ry[i], z: FAN.z[i], o: 0.22, b: 5.5 },
        0.2 + n * 0.08, 1.4, "power2.inOut");
      tl.fromTo($("#f07-m" + i), { autoAlpha: 1 },
        { autoAlpha: 0, duration: 1.2, ease: "power2.inOut", immediateRender: false }, 0.2 + n * 0.08);
      // the losing pages stop being read: their copy goes, their structure stays
      tl.fromTo($$("#f07-" + VK[i] + " .lp-mark, #f07-" + VK[i] + " .lp-links span, #f07-" + VK[i] + " .lp-signin," +
        " #f07-" + VK[i] + " .lp-nav-cta, #f07-" + VK[i] + " .lp-eyebrow, #f07-" + VK[i] + " .lp-headline," +
        " #f07-" + VK[i] + " .lp-sub, #f07-" + VK[i] + " .lp-cta-primary, #f07-" + VK[i] + " .lp-cta-ghost," +
        " #f07-" + VK[i] + " .lp-ops-head, #f07-" + VK[i] + " .lp-ops-row-top, #f07-" + VK[i] + " .lp-ops-foot," +
        " #f07-" + VK[i] + " .lp-benefit-title, #f07-" + VK[i] + " .lp-benefit-desc," +
        " #f07-" + VK[i] + " .lp-proof-line, #f07-" + VK[i] + " .lp-proof-logos"),
        { autoAlpha: 1 }, { autoAlpha: 0, duration: 1.0, ease: "power2.inOut", immediateRender: false }, 0.25 + n * 0.08);
    });

    // 2. the winner comes forward — bigger, sharper, better lit. No glow.
    K.slotTo(tl, slots[${W}],
      { x: FAN.x[${W}], y: FAN.y, s: FAN.s, ry: FAN.ry[${W}], z: 0, o: 1 },
      { x: HERO.x, y: HERO.y, s: HERO.s, ry: HERO.ry, z: 0, o: 1 },
      1.5, 1.8, "power3.out");
    // its numbers travel with it into the foreground
    tl.fromTo($("#f07-m" + ${W}), { x: 0, y: 0, scale: 1 },
      { x: ${WIN_STACK.x - FAN.x[W]}, y: ${WIN_STACK.y - STACK_Y}, scale: 1.12,
        duration: 1.8, ease: "power3.out", immediateRender: false }, 1.5);

    // 3. the conclusion, held long enough to land
    K.in(tl, $("#f07-ed1"), 3.5, 0.85, 20);
    K.swap(tl, $("#f07-ed1"), $("#f07-ed2"), 5.35);

    // 4. mergeVariants() — the fan collapses behind the survivor
    [0, 1, 3].forEach((i, n) => {
      K.slotTo(tl, slots[i],
        { x: FAN.x[i], y: FAN.y + FAN.dy[i], s: FAN.s, ry: FAN.ry[i], z: FAN.z[i], o: 0.22, b: 5.5 },
        { x: FINAL.x, y: FINAL.y, s: FINAL.s * 0.9, ry: 0, z: -160, o: 0, b: 7 },
        6.6 + n * 0.05, 1.15, "power2.inOut");
    });
    tl.fromTo($("#f07-m" + ${W}), { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.6, ease: "power2.in", immediateRender: false }, 6.55);
    tl.fromTo($("#f07-ed2"), { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.55, ease: "power2.in", immediateRender: false }, 7.1);
    K.slotTo(tl, slots[${W}],
      { x: HERO.x, y: HERO.y, s: HERO.s, ry: HERO.ry, z: 0, o: 1 },
      { x: FINAL.x, y: FINAL.y, s: FINAL.s, ry: FINAL.ry, z: 0, o: 1 },
      6.6, 1.35, "power3.inOut");
  `,
};
