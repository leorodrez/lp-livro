export default {
  id: "f12",
  duration: 5,
  body: `
    <div class="clip" id="f12-scene" data-start="0" data-duration="5" data-track-index="0">
      <div class="env"></div><div class="env-pool"></div><div class="env-accent" id="f12-accent"></div>

      <div class="end-logo" id="f12-logo" style="top:352px">
        <img src="assets/kro-logo-light.png" alt="KRO AI" />
      </div>
      <div class="end-prop" id="f12-prop" style="top:552px">
        Transforme as mensagens do seu site em <b>experimentos</b>.<br />
        Descubra o que faz mais gente agir.
      </div>
      <div class="end-rule" id="f12-rule" style="top:716px"></div>
      <div class="end-cta" id="f12-cta" style="top:764px">Coloque seu site para aprender.</div>
      <div class="end-dom" id="f12-dom" style="top:834px">usekro.ai</div>

      <div class="vignette"></div><div class="grain"></div>
    </div>`,
  script: `
    gsap.set([$("#f12-logo"), $("#f12-prop"), $("#f12-rule"), $("#f12-cta"), $("#f12-dom")], { autoAlpha: 0 });
    gsap.set($("#f12-accent"), { autoAlpha: 0 });

    // fully static camera. Only the entrance moves, and only a little.
    K.accent(tl, $("#f12-accent"), 0.34, 0.1, 1.3);
    tl.fromTo($("#f12-logo"), { autoAlpha: 0, y: 22, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.95, ease: "power3.out", immediateRender: false }, 0.15);
    K.in(tl, $("#f12-prop"), 1.25, 0.8, 18);
    tl.fromTo($("#f12-rule"), { autoAlpha: 0, scaleX: 0 },
      { autoAlpha: 1, scaleX: 1, duration: 0.6, ease: "power3.out", immediateRender: false }, 2.35);
    K.in(tl, $("#f12-cta"), 2.5, 0.7, 14);
    K.in(tl, $("#f12-dom"), 2.9, 0.7, 10);
    // from here the frame holds, still, long enough to read.
  `,
};
