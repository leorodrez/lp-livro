import { pageSlot } from "../lp.mjs";

const SLOT = { x: 960, y: 436, s: 0.8 };
const CAM_A = { x: 0, y: 0, s: 1.0 };
const CAM_B = { x: 0, y: 0, s: 1.085 };

// Five sessions, each a pre-programmed polyline INSIDE the page's own rect
// (448..1472 x 132..740 at this placement). Nothing they do survives them.
const SESSIONS = [
  { t0: 0.04, span: 0.30, pts: [[560, 748], [640, 640], [742, 520], [806, 396], [880, 300]] },
  { t0: 0.20, span: 0.26, pts: [[1430, 250], [1300, 340], [1150, 452], [1010, 566], [930, 700]] },
  { t0: 0.40, span: 0.30, pts: [[500, 214], [612, 330], [700, 452], [842, 566], [1090, 660]] },
  { t0: 0.58, span: 0.24, pts: [[1440, 700], [1300, 630], [1180, 540], [1096, 430], [1130, 300]] },
  { t0: 0.70, span: 0.26, pts: [[478, 520], [640, 476], [820, 448], [1010, 452], [1240, 500]] },
];

export default {
  id: "f01",
  duration: 6,
  body: `
    <div class="clip" id="f01-scene" data-start="0" data-duration="6" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div>
      <div class="stage"><div class="world" id="f01-world">
        ${pageSlot("f01-p")}
        <div class="layer" id="f01-behaviour" style="position:absolute;inset:0">
          <svg class="trail" width="1920" height="1080" viewBox="0 0 1920 1080">
            ${SESSIONS.map((s, i) => `<path id="f01-tr${i}" d="${"M" + s.pts.map((p) => p.join(",")).join("L")}"></path>`).join("\n            ")}
          </svg>
          ${SESSIONS.map((_, i) => `<div class="mk" id="f01-mk${i}"></div>`).join("\n          ")}
        </div>
      </div></div>

      <div class="ed" id="f01-ed1" style="left:448px;top:808px" data-layout-allow-overlap="true">Seu site recebe visitantes todos os dias.</div>
      <div class="ed" id="f01-ed2" style="left:448px;top:808px" data-layout-allow-overlap="true">Mas ele <b>aprende</b> alguma coisa com eles?</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    K.slot($("#f01-p-slot"), { x: ${SLOT.x}, y: ${SLOT.y}, s: ${SLOT.s}, ry: -8 });
    gsap.set([$("#f01-ed1"), $("#f01-ed2")], { autoAlpha: 0 });
    gsap.set($$(".mk"), { autoAlpha: 0 });

    // camera: one uninterrupted slow push that carries into frame 02
    K.cam(tl, $("#f01-world"), ${JSON.stringify(CAM_A)}, ${JSON.stringify(CAM_B)}, 0, D, "none");

    // sessions arrive, cross the page, and leave no trace
    const S = ${JSON.stringify(SESSIONS)};
    K.distributeVisitors(tl, S.map((s, i) => ({
      el: $("#f01-mk" + i), pts: s.pts, t0: s.t0, span: s.span, o: 0.95,
    })), 0, D);

    // each trail draws with its session, then dissolves behind it
    S.forEach((s, i) => {
      const p = $("#f01-tr" + i), L = p.getTotalLength();
      gsap.set(p, { strokeDasharray: L, strokeDashoffset: L, autoAlpha: 0 });
      const a = s.t0 * D, b = (s.t0 + s.span) * D;
      tl.fromTo(p, { strokeDashoffset: L, autoAlpha: 1 },
        { strokeDashoffset: 0, autoAlpha: 1, duration: (b - a) * 0.74, ease: "none", immediateRender: false }, a);
      tl.fromTo(p, { autoAlpha: 1 }, { autoAlpha: 0, duration: (b - a) * 0.40, ease: "power2.in", immediateRender: false }, a + (b - a) * 0.62);
    });

    // editorial: the question lands last, and "aprende" carries the weight
    K.in(tl, $("#f01-ed1"), 1.7, 0.8, 18);
    K.swap(tl, $("#f01-ed1"), $("#f01-ed2"), 4.0);
  `,
};
