import { pageSlot } from "../lp.mjs";
import { proj, camFor, EL } from "../geom.mjs";

const SLOT = { x: 960, y: 436, s: 0.8 };
const CAM_A = { x: 0, y: 0, s: 1.085 };            // exactly where frame 01 ends
const HC = { x: EL.headline.x + EL.headline.w / 2, y: EL.headline.y + EL.headline.h / 2 };
export const CAM_CLOSE = camFor(HC, { x: 620, y: 330 }, 1.78, SLOT);
const REST = proj({ x: 190, y: 172 }, SLOT, CAM_CLOSE);

// Four more sessions. Irregular cadence, none of them changes anything.
const SESSIONS = [
  { t0: 0.02, span: 0.30, pts: [[1560, 210], [1330, 330], [1120, 470], [980, 640], [900, 860]] },
  { t0: 0.20, span: 0.26, pts: [[240, 900], [440, 760], [640, 640], [900, 590], [1160, 630]] },
  { t0: 0.40, span: 0.28, pts: [[1700, 860], [1450, 780], [1250, 690], [1090, 600], [1010, 470]] },
  { t0: 0.56, span: 0.24, pts: [[300, 200], [520, 300], [690, 410], [740, 600], [630, 810]] },
];

export default {
  id: "f02",
  duration: 6,
  body: `
    <div class="clip" id="f02-scene" data-start="0" data-duration="6" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div>
      <div class="stage"><div class="world" id="f02-world">
        ${pageSlot("f02-p")}
        <div class="layer" id="f02-behaviour" style="position:absolute;inset:0">
          ${SESSIONS.map((_, i) => `<div class="mk" id="f02-mk${i}"></div>`).join("\n          ")}
        </div>
      </div></div>

      <div class="cursor" id="f02-cursor">
        <svg width="20" height="26" viewBox="0 0 20 26">
          <path d="M1.5 1.2 L1.5 20.4 L6.4 15.9 L9.6 23.4 L12.6 22.1 L9.5 14.8 L16.2 14.6 Z"
                fill="#F5F2EC" stroke="#0E0F12" stroke-width="1.1" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    K.slot($("#f02-p-slot"), { x: ${SLOT.x}, y: ${SLOT.y}, s: ${SLOT.s}, ry: -8 });
    gsap.set($$(".mk"), { autoAlpha: 0 });

    // the push from frame 01 keeps going, then decelerates into the close-up
    K.cam(tl, $("#f02-world"), ${JSON.stringify(CAM_A)}, ${JSON.stringify(CAM_CLOSE)}, 0, 4.7, "power2.out");
    tl.fromTo($("#f02-p-slot"), { rotationY: -8 }, { rotationY: -3.5, duration: 4.7, ease: "power2.out", immediateRender: false }, 0);

    // rack focus — the headline sharpens, everything around it lets go
    tl.fromTo([$("#f02-p .lp-hero-right"), $("#f02-p .lp-benefits")], { filter: "blur(0px)" },
      { filter: "blur(3.5px)", duration: 2.4, ease: "power2.inOut", stagger: 0.14, immediateRender: false }, 1.5);
    tl.fromTo($("#f02-p .lp-proof"), { filter: "blur(0px)" },
      { filter: "blur(2.4px)", duration: 2.2, ease: "power2.inOut", immediateRender: false }, 1.9);

    // sessions keep arriving; the headline stays exactly as it was
    const S = ${JSON.stringify(SESSIONS)};
    K.distributeVisitors(tl, S.map((s, i) => ({
      el: $("#f02-mk" + i), pts: s.pts, t0: s.t0, span: s.span, o: 0.85,
    })), 0, 4.5);

    // the last visitor climbs to the headline and STOPS — the film's first hold
    const cur = $("#f02-cursor");
    gsap.set(cur, { autoAlpha: 0, x: 1500, y: 930 });
    tl.fromTo(cur, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, immediateRender: false }, 3.4);
    tl.fromTo(cur, { x: 1500, y: 930 }, { x: 900, y: 640, duration: 0.95, ease: "power2.inOut", immediateRender: false }, 3.5);
    tl.fromTo(cur, { x: 900, y: 640 }, { x: ${REST.x}, y: ${REST.y}, duration: 1.0, ease: "power3.out", immediateRender: false }, 4.45);
  `,
};
