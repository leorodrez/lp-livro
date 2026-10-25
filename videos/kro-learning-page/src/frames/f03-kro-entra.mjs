import { page } from "../lp.mjs";
import { proj, camFor, EL } from "../geom.mjs";
import { HEADLINES } from "../tokens.mjs";

const SLOT = { x: 960, y: 436, s: 0.8 };
const HC = { x: EL.headline.x + EL.headline.w / 2, y: EL.headline.y + EL.headline.h / 2 };
const CAM = camFor(HC, { x: 620, y: 330 }, 1.78, SLOT); // inherited from frame 02
// …then one motivated pull-back: the KRO layer needs its own space to open into.
const S_W = 1.1;
export const WIDE = {
  x: +(40 - 960 - (SLOT.x + (0 - 640) * SLOT.s - 960) * S_W).toFixed(2),
  y: +(500 - ((SLOT.y - 540) * S_W + 540)).toFixed(2),
  s: S_W,
};

// The selection box lives in PAGE-LOCAL space inside the slot, so it stays glued
// to the headline whatever the camera does.
const BOX = { x: 38, y: 124, w: 712, h: 66 };
const BR = proj({ x: BOX.x + BOX.w, y: BOX.y + BOX.h }, SLOT, WIDE);
const TR = proj({ x: BOX.x + BOX.w, y: BOX.y }, SLOT, WIDE);
const MIDY = Math.round((TR.y + BR.y) / 2);
const PANEL = { x: 1240, y: MIDY - 106 };
const CUR = proj({ x: 190, y: 172 }, SLOT, CAM);

export default {
  id: "f03",
  duration: 6,
  body: `
    <div class="clip" id="f03-scene" data-start="0" data-duration="6" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f03-accent"></div>
      <div class="stage"><div class="world" id="f03-world">
        <div class="slot" id="f03-p-slot">
          ${page({ id: "f03-p" })}
          <div class="selbox" id="f03-box" style="left:${BOX.x}px;top:${BOX.y}px;width:${BOX.w}px;height:${BOX.h}px">
            <div class="selbox-edge"></div>
            <div class="selbox-c tl"></div><div class="selbox-c tr"></div>
            <div class="selbox-c bl"></div><div class="selbox-c br"></div>
            <div class="selbox-tag">headline</div>
          </div>
        </div>
      </div></div>


      <svg class="branch" id="f03-link" width="1920" height="1080" viewBox="0 0 1920 1080"
           style="position:absolute;left:0;top:0">
        <path id="f03-linkpath" d="M${TR.x},${MIDY} L${PANEL.x},${MIDY}"></path>
      </svg>

      <div class="cursor" id="f03-cursor">
        <svg width="20" height="26" viewBox="0 0 20 26">
          <path d="M1.5 1.2 L1.5 20.4 L6.4 15.9 L9.6 23.4 L12.6 22.1 L9.5 14.8 L16.2 14.6 Z"
                fill="#F5F2EC" stroke="#0E0F12" stroke-width="1.1" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="kpanel" id="f03-panel" style="left:${PANEL.x}px;top:${PANEL.y}px">
        <div class="kpanel-head">
          <img class="kpanel-logo" src="assets/kro-logo-light.png" alt="kro ai" />
          <span class="kpanel-role">camada de experimentação</span>
        </div>
        <div class="kpanel-label">elemento selecionado</div>
        <div class="kpanel-el">${HEADLINES.v1}</div>
        <div class="kpanel-count"><span>hipóteses geradas</span><b id="f03-count">0</b></div>
      </div>

      <div class="ed sm" id="f03-ed" style="left:${PANEL.x}px;top:${PANEL.y + 262}px;width:600px;max-width:600px"
           data-layout-allow-overlap="true">Com o KRO, qualquer mensagem do seu site pode virar uma <b>hipótese</b>.</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    K.slot($("#f03-p-slot"), { x: ${SLOT.x}, y: ${SLOT.y}, s: ${SLOT.s}, ry: -3.5 });
    K.camHold($("#f03-world"), ${JSON.stringify(CAM)});
    gsap.set($("#f03-box"), { autoAlpha: 0 });
    gsap.set([$("#f03-panel"), $("#f03-ed")], { autoAlpha: 0 });
    gsap.set($("#f03-cursor"), { x: ${CUR.x}, y: ${CUR.y} });
    const link = $("#f03-linkpath"), LL = link.getTotalLength();
    gsap.set(link, { strokeDasharray: LL, strokeDashoffset: LL, autoAlpha: 0 });

    // the click happens in the close-up we arrived in; then the camera eases back
    // exactly far enough for the KRO layer to have somewhere to open.
    K.cam(tl, $("#f03-world"), ${JSON.stringify(CAM)}, ${JSON.stringify(WIDE)}, 0.62, 1.5, "power2.inOut");

    // 1. the press — cursor and headline compress together
    tl.fromTo($("#f03-cursor"), { scale: 1 }, { scale: 0.86, duration: 0.1, ease: "power2.in", immediateRender: false }, 0.30);
    tl.fromTo($("#f03-cursor"), { scale: 0.86 }, { scale: 1, duration: 0.26, ease: "power3.out", immediateRender: false }, 0.40);
    tl.fromTo($("#f03-p-headline"), { scale: 1 }, { scale: 0.991, duration: 0.1, ease: "power2.in", immediateRender: false }, 0.30);
    tl.fromTo($("#f03-p-headline"), { scale: 0.991 }, { scale: 1, duration: 0.3, ease: "power3.out", immediateRender: false }, 0.40);

    // 2. selectElement() — the first purple in the film, and a low accent light
    K.selectElement(tl, $("#f03-box"), 0.60, 0.9);
    K.accent(tl, $("#f03-accent"), 0.46, 0.60, 1.6);

    // 3. the KRO layer dims the page where it is about to work
    tl.fromTo($$("#f03-p .lp-ops-head, #f03-p .lp-ops-row-top, #f03-p .lp-ops-foot," +
      " #f03-p .lp-links span, #f03-p .lp-signin, #f03-p .lp-nav-cta"),
      { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.6, ease: "power2.inOut", immediateRender: false }, 1.15);
    tl.fromTo($("#f03-p .lp-hero-right"), { filter: "blur(3.5px)" },
      { filter: "blur(6px)", duration: 0.9, ease: "power2.inOut", immediateRender: false }, 1.25);

    // 4. the panel grows out of the box's own right edge, tethered to it
    tl.fromTo(link, { strokeDashoffset: LL, autoAlpha: 1 },
      { strokeDashoffset: 0, autoAlpha: 1, duration: 0.32, ease: "power2.inOut", immediateRender: false }, 1.98);
    tl.fromTo($("#f03-panel"), { autoAlpha: 0, scaleX: 0.34, scaleY: 0.8, x: -54 },
      { autoAlpha: 1, scaleX: 1, scaleY: 1, x: 0, duration: 0.78, ease: "power3.out", immediateRender: false }, 2.2);

    // 5. the editorial line, then the cursor leaves — the human part is over
    K.in(tl, $("#f03-ed"), 3.2, 0.8, 20);
    tl.fromTo($("#f03-cursor"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4, ease: "power2.in", immediateRender: false }, 3.45);

    // 6. the selected headline advances out of the page; the page falls back
    const rest = [$("#f03-p .lp-nav"), $("#f03-p .lp-sub"), $("#f03-p .lp-cta-row"),
                  $("#f03-p .lp-benefits"), $("#f03-p .lp-proof"), $("#f03-p .lp-eyebrow")];
    tl.fromTo(rest, { filter: "blur(0px)", autoAlpha: 1 },
      { filter: "blur(3.2px)", autoAlpha: 0.92, duration: 1.0, ease: "power2.inOut", stagger: 0.03, immediateRender: false }, 4.5);
    tl.fromTo([$("#f03-p-headline"), $("#f03-box")], { scale: 1, y: 0 },
      { scale: 1.05, y: -8, duration: 1.15, ease: "power3.out", immediateRender: false }, 4.6);
  `,
};
