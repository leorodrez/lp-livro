import { page, pageSlot } from "../lp.mjs";
import { proj, camFor, EL } from "../geom.mjs";
import { WIDE as CAM_F03 } from "./f03-kro-entra.mjs";
import { HEADLINES, VARIANTS } from "../tokens.mjs";
import { selbox } from "../chrome.mjs";

const SLOT = { x: 960, y: 436, s: 0.8 };
const HC = { x: EL.headline.x + EL.headline.w / 2, y: EL.headline.y + EL.headline.h / 2 };
const CAM_A = CAM_F03;
const CAM_B = { x: 0, y: 0, s: 1.0 };

const BOX = { x: 38, y: 124, w: 712, h: 66 };
// where the headline lands once the camera has pulled back
const SRC = proj({ x: BOX.x, y: BOX.y }, SLOT, CAM_B);
const SRC_W = Math.round(BOX.w * 0.8);

// the three hypotheses, distributed around the source — never a stack of cards
const HYP = [
  { key: "v2", x: 1156, y: 206, from: [1048, 284] },
  { key: "v3", x: 1300, y: 428, from: [1048, 296] },
  { key: "v4", x: 1010, y: 664, from: [910, 322] },
];
export const FAN = {
  y: 440, s: 0.33,
  x: [318, 748, 1178, 1608],
  dy: [18, 0, 0, 18],
  z: [-80, 0, 0, -80],
  ry: [11, 4, -4, -11],
};

export default {
  id: "f04",
  duration: 9,
  body: `
    <div class="clip" id="f04-scene" data-start="0" data-duration="9" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f04-accent"></div>
      <div class="stage"><div class="world" id="f04-world">
        <div class="slot" id="f04-p-slot">
          ${page({ id: "f04-p" })}
          ${selbox("f04-box", BOX, "headline")}
        </div>
        ${VARIANTS.map((v, i) => pageSlot("f04-" + v.key, { headline: v.headline })).join("\n        ")}
      </div></div>

      <svg class="branch" id="f04-branches" width="1920" height="1080" viewBox="0 0 1920 1080"
           style="position:absolute;left:0;top:0">
        ${HYP.map((h, i) => `<path id="f04-br${i}" d="M${h.from[0]},${h.from[1]} C${(h.from[0] + h.x) / 2},${h.from[1]} ${(h.from[0] + h.x) / 2},${h.y + 34} ${h.x},${h.y + 34}"></path>`).join("\n        ")}
      </svg>

      <div class="srccard" id="f04-src" style="position:absolute;left:${SRC.x}px;top:${SRC.y}px;width:${SRC_W}px;
        padding:16px 18px;border-radius:9px;background:#F5F2EC;color:#14161A;
        font-family:'Sora',sans-serif;font-weight:700;font-size:25px;line-height:1.2;letter-spacing:-.022em;
        box-shadow:0 26px 60px -22px rgba(0,0,0,.8);border:1px solid rgba(124,58,237,.5)">
        ${HEADLINES.v1}
        <span style="position:absolute;left:-1px;top:-25px;font-size:9.5px;font-weight:800;letter-spacing:.12em;
          text-transform:uppercase;color:#fff;background:#5B21B6;padding:3px 7px;border-radius:3px">original</span>
      </div>

      ${HYP.map((h, i) => `
      <div class="hyp" id="f04-h${i}" style="left:${h.x}px;top:${h.y}px">
        <span class="hyp-mask"><span id="f04-h${i}-t">${HEADLINES[h.key]}</span></span>
        <span class="hyp-tag" id="f04-h${i}-tag">hipótese</span>
      </div>`).join("")}

      <div class="ed sm" id="f04-ed" style="left:180px;top:770px" data-layout-allow-overlap="true">A <b>IA</b> cria novas possibilidades.</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    const FAN = ${JSON.stringify(FAN)};
    const VK = ${JSON.stringify(VARIANTS.map((v) => v.key))};
    K.slot($("#f04-p-slot"), { x: ${SLOT.x}, y: ${SLOT.y}, s: ${SLOT.s}, ry: -3.5 });
    K.camHold($("#f04-world"), ${JSON.stringify(CAM_A)});
    gsap.set($("#f04-accent"), { autoAlpha: 0.46 });
    gsap.set([$("#f04-src"), $("#f04-ed")], { autoAlpha: 0 });
    $$(".hyp").forEach((h) => gsap.set(h, { autoAlpha: 0 }));
    VK.forEach((k) => K.slot($("#f04-" + k + "-slot"), { x: 960, y: 436, s: 0.8, ry: -3.5, o: 0 }));
    const paths = ${JSON.stringify(HYP.map((_, i) => i))}.map((i) => $("#f04-br" + i));
    paths.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });

    // 1. dolly out — the possibilities need room before they exist
    K.cam(tl, $("#f04-world"), ${JSON.stringify(CAM_A)}, ${JSON.stringify(CAM_B)}, 0, 1.5, "power2.inOut");
    // the page recedes; the selected headline detaches and stays sharp
    // The page recedes to its own STRUCTURE: the message has left it and is being
    // worked on, so the copy goes and the skeleton stays. (It also keeps every
    // remaining glyph in the frame legible instead of smearing type into blur.)
    const pageText = $$("#f04-p .lp-mark, #f04-p .lp-links span, #f04-p .lp-signin, #f04-p .lp-nav-cta," +
      " #f04-p .lp-eyebrow, #f04-p .lp-headline, #f04-p .lp-sub, #f04-p .lp-cta-primary," +
      " #f04-p .lp-cta-ghost, #f04-p .lp-ops-head, #f04-p .lp-ops-row-top, #f04-p .lp-ops-foot," +
      " #f04-p .lp-benefit-title, #f04-p .lp-benefit-desc, #f04-p .lp-proof-line, #f04-p .lp-proof-logos");
    tl.fromTo(pageText, { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.42, ease: "power2.inOut", stagger: 0.008, immediateRender: false }, 0.5);
    tl.fromTo($("#f04-p"), { autoAlpha: 1, filter: "blur(0px)" },
      { autoAlpha: 0.13, filter: "blur(2.6px)", duration: 1.1, ease: "power2.inOut", immediateRender: false }, 0.9);
    tl.fromTo($("#f04-box"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5, ease: "power2.in", immediateRender: false }, 1.0);
    tl.fromTo($("#f04-src"), { autoAlpha: 0, scale: 0.985 },
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out", immediateRender: false }, 1.0);

    // 2. generateHypotheses() — each derives from the original by masked replacement
    K.generateHypotheses(tl, ${JSON.stringify(HYP.map((_, i) => i))}.map((i) => ({
      path: $("#f04-br" + i), box: $("#f04-h" + i), text: $("#f04-h" + i + "-t"), tag: $("#f04-h" + i + "-tag"),
    })), 1.7, 1.25);

    // 3. one editorial line, then a real beat to read the three arguments
    K.in(tl, $("#f04-ed"), 5.5, 0.8, 18);

    // 4. splitVariants() — the hypotheses retreat into copies of the same page
    tl.fromTo($$(".hyp"), { autoAlpha: 1, scale: 1 },
      { autoAlpha: 0, scale: 0.94, duration: 0.55, ease: "power2.in", stagger: 0.06, immediateRender: false }, 6.55);
    tl.fromTo(paths, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4, immediateRender: false }, 6.55);
    tl.fromTo([$("#f04-src"), $("#f04-ed")], { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.5, ease: "power2.in", immediateRender: false }, 6.7);
    tl.fromTo($("#f04-p-slot"), { autoAlpha: 0.999 },
      { autoAlpha: 0, duration: 0.5, ease: "power2.in", immediateRender: false }, 6.9);

    K.splitVariants(tl, VK.map((k, i) => ({
      el: $("#f04-" + k + "-slot"),
      from: { x: 960, y: 436, s: 0.8, ry: -3.5, o: 0 },
      to: { x: FAN.x[i], y: FAN.y + FAN.dy[i], s: FAN.s, ry: FAN.ry[i], z: FAN.z[i], o: 1 },
    })), 6.9, 1.55, 0.09);
  `,
};
