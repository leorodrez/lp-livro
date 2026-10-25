// Cenas 01–06 — do CTA macro à cidade monumental.
import {
  C,
  FONT,
  lpCSS,
  lpFull,
  lpSlimCSS,
  lpSlim,
  slimRuntimeJS,
  sysCSS,
  sweepCSS,
  subComp,
  cameraJS,
  mulberry32,
  range,
  BRANDS,
  HEADLINES_BEFORE,
  CTAS_BEFORE,
  CONVERGED,
  pageTileURI,
} from "./kit.mjs";

// Empilha estados de texto no mesmo ponto de ancoragem; a troca é instantânea
// e seek-safe (tl.set em fronteiras explícitas), nunca um tween de texto.
export function stackJS(sel, n, times) {
  // Estado inicial imediato (fora da timeline): um tl.set em 0 não renderiza
  // com o playhead exatamente em 0 — o frame 0 mostraria todos os estados.
  // As trocas ficam na timeline, em fronteiras explícitas: seek-safe nos dois
  // sentidos, sem tween de texto.
  return `
          stack("${sel}", ${n}, ${JSON.stringify(times.slice(0, n))});`;
}

// Emitido uma vez por cena que empilha estados.
export function stackHelperJS() {
  return `
          function stack(sel, n, at) {
            for (let i = 0; i < n; i++) gsap.set(sel + i, { autoAlpha: i === 0 ? 1 : 0 });
            for (let i = 1; i < n; i++) {
              tl.set(sel + (i - 1), { autoAlpha: 0 }, at[i]);
              tl.set(sel + i, { autoAlpha: 1 }, at[i]);
            }
          }`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   S01 — 0:00–0:03 · O CTA que se otimiza sozinho
   rules: viewport-change (câmera travada no CTA), discrete-text-sequence,
          ambient-glow-bloom
   ────────────────────────────────────────────────────────────────────────── */
export function s01() {
  // Geometria assada: os dois botões têm largura fixa, então o centro do CTA
  // é uma constante — nada é medido em tempo de tween.
  const CTA_L = 120,
    CTA_W = 300,
    CTA_T = 620,
    CTA_H = 56;
  const CTA_CX = CTA_L + CTA_W / 2, // 270
    CTA_CY = CTA_T + CTA_H / 2; // 648
  // O alvo é deslocado do centro do botão de propósito: no primeiro terço a
  // câmera ainda não é simétrica.
  const AIM_X = CTA_CX + 40,
    AIM_Y = CTA_CY - 20;

  const css = `
  ${lpCSS()}
  ${sysCSS()}
  .scene { background: ${C.voidDeep}; }
  .world {
    position: absolute; inset: 0;
    transform-origin: 50% 50%;
    will-change: transform;
  }
  .page {
    position: absolute; inset: 0;
    background: ${C.light};
  }
  .hero-h {
    position: absolute; left: 118px; top: 296px;
    font-family: ${FONT.page}; font-weight: 900;
    font-size: 82px; line-height: 0.98; letter-spacing: -0.04em;
    color: ${C.ink}; max-width: 12ch;
  }
  .hero-sub {
    position: absolute; left: 120px; top: 540px;
    font-family: ${FONT.page}; font-weight: 400; font-size: 26px;
    color: ${C.muted}; letter-spacing: -0.01em;
  }
  /* Duas variantes do botão empilhadas na MESMA borda esquerda, com larguras
     fixas e diferentes: a troca de copy muda a borda direita — o "microajuste
     de largura" é real, não um tween. */
  .cta-stack { position: absolute; left: ${CTA_L}px; top: ${CTA_T}px; height: ${CTA_H}px; }
  .cta-btn {
    position: absolute; left: 0; top: 0;
    display: block; height: ${CTA_H}px; line-height: ${CTA_H}px;
    text-align: center;
    background: ${C.purple}; color: ${C.light};
    font-family: ${FONT.page}; font-weight: 700; font-size: 21px;
    letter-spacing: 0.07em; border-radius: 10px;
    white-space: nowrap;
  }
  #cta-0 { width: ${CTA_W}px; }
  #cta-1 { width: 268px; }
  .cta-ghost {
    position: absolute; left: 0; top: 0;
    display: block; width: 268px; height: ${CTA_H}px; line-height: ${CTA_H - 2}px;
    text-align: center;
    border: 1px dashed rgba(124,58,237,0.75);
    color: ${C.purple};
    font-family: ${FONT.page}; font-weight: 700; font-size: 21px;
    letter-spacing: 0.07em; border-radius: 10px;
    white-space: nowrap; opacity: 0;
  }
  .glow {
    position: absolute; left: ${CTA_CX - 125}px; top: ${CTA_CY - 125}px;
    width: 250px; height: 250px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0) 66%);
    will-change: transform;
  }
  .metric {
    position: absolute; left: 448px; top: 632px;
    font-size: 24px; font-weight: 700; opacity: 0;
  }
  .winner {
    position: absolute; left: 121px; top: 698px;
    font-size: 14px; opacity: 0;
  }
  .cursor { position: absolute; left: 0; top: 0; will-change: transform; }
  .lane {
    position: absolute; left: 120px; top: 596px;
    width: 62px; height: 3px; background: ${C.cyan};
  }
  `;

  const body = `
          <div class="world" id="world">
            <div class="page">
              <div class="hero-h">Comece hoje. Sem cartão.</div>
              <div class="hero-sub">Teste grátis por 14 dias.</div>
              <div class="lane"></div>
              <div class="glow" id="glow"></div>
              <div class="cta-stack">
                <div class="cta-ghost" id="ghost" data-layout-allow-overlap>QUERO COMEÇAR</div>
                <div class="cta-btn" id="cta-0" data-layout-allow-overlap>COMEÇAR AGORA</div>
                <div class="cta-btn" id="cta-1" data-layout-allow-overlap>QUERO COMEÇAR</div>
              </div>
              <div class="metric" id="metric">+0,7%</div>
              <div class="sys winner" id="winner">variante vencedora</div>
              <svg class="cursor" id="cursor" width="30" height="38" viewBox="0 0 30 38" fill="none">
                <path d="M3 2 L3 30 L10.5 23.2 L15.6 34.6 L20.3 32.4 L15.3 21.4 L25 21 Z"
                      fill="#ffffff" stroke="${C.ink}" stroke-width="2.2" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>`;

  const script = `
          const world = document.getElementById("world");
          const AIM_X = ${AIM_X}, AIM_Y = ${AIM_Y};
          // Câmera de wrapper único: T = -offset × S (viewport-change).
          const cam = { scale: 4.35 };
          function applyCamera() {
            const s = cam.scale;
            world.style.transform =
              "translate(" + (-(AIM_X - 960) * s) + "px," + (-(AIM_Y - 540) * s) + "px) scale(" + s + ")";
          }
          applyCamera();

          // Leg 1 — push macro lentíssimo. O espectador lê o botão.
          tl.fromTo(cam, { scale: 4.35 },
            { scale: 4.78, duration: 2.1, ease: "power1.inOut", onUpdate: applyCamera }, 0);

          // O cursor se aproxima e PARA. Nunca clica — a página decide antes.
          tl.fromTo("#cursor", { x: 566, y: 806, opacity: 0 },
            { opacity: 1, duration: 0.18, ease: "none" }, 0.30);
          tl.fromTo("#cursor", { x: 566, y: 806 },
            { x: 402, y: 692, duration: 0.82, ease: "power2.out" }, 0.34);

          // A/B → análise → vencedor → substituição.
          tl.fromTo("#ghost", { opacity: 0 }, { opacity: 0.9, duration: 0.06, ease: "none" }, 1.06);
          tl.to("#ghost", { opacity: 0, duration: 0.05, ease: "none" }, 1.20);
${stackJS("#cta-", 2, [0, 1.24])}
          // Microajuste: o elemento reassenta depois de trocar de tamanho.
          tl.fromTo("#cta-1", { scale: 1.035 },
            { scale: 1, duration: 0.26, ease: "power3.out", transformOrigin: "0% 50%" }, 1.24);

          tl.fromTo("#metric", { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.34, ease: "power3.out" }, 1.30);
          tl.fromTo("#winner", { opacity: 0 }, { opacity: 1, duration: 0.30, ease: "power2.out" }, 1.46);

          // Respiração do glow (finita, determinística).
          tl.fromTo("#glow", { scale: 0.94 },
            { scale: 1.06, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0);

          // Leg 2 — a câmera atravessa o botão Purple. O Purple entrega a cena 02.
          tl.to(cam, { scale: 26, duration: 0.92, ease: "power2.in", onUpdate: applyCamera }, 2.10);
          tl.to(["#metric", "#winner", "#cursor"], { opacity: 0, duration: 0.30, ease: "power1.in" }, 2.10);
  `;

  return subComp({ id: "s01", duration: 3, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S02 — 0:03–0:07 · 06:00, Brasil
   rules: depth-of-field-blur, discrete-text-sequence, sine-wave-loop
   ────────────────────────────────────────────────────────────────────────── */
export function s02() {
  const rng = mulberry32(20260822);
  // Páginas de fundo que o dolly-out revela.
  const bg = range(9).map((i) => {
    const w = 250 + Math.round(rng() * 90);
    const h = Math.round(w * 0.74);
    return {
      x: -700 + i * 205 + Math.round(rng() * 60),
      y: -240 + Math.round(rng() * 480),
      z: -420 - Math.round(rng() * 520),
      w,
      h,
      hw: [58 + Math.round(rng() * 26), 34 + Math.round(rng() * 24)],
    };
  });

  const css = `
  ${lpCSS()}
  ${lpSlimCSS()}
  ${sysCSS()}
  ${sweepCSS()}
  .stage { position: absolute; inset: 0; perspective: 1250px; }
  .world {
    position: absolute; inset: 0;
    transform-style: preserve-3d; transform-origin: 50% 50%;
    will-change: transform;
  }
  .hero {
    position: absolute; left: 176px; top: 78px;
    width: 1568px; height: 924px;
    border-radius: 14px;
    box-shadow: 0 60px 130px rgba(0,0,0,0.55);
    transform: translateZ(0px) rotateY(-5deg);
    --lp-gap: 1.16;
  }
  .hero .lp-h { font-size: 72px; max-width: 13ch; }
  .hero .lp-sub { font-size: 24px; max-width: 32ch; }
  .hero .lp-cta { font-size: 20px; padding: 18px 36px; }
  .hero .lp-brand { font-size: 26px; }
  .hero .lp-proof { font-size: 15px; }
  .h-stack { position: relative; }
  .h-stack > div { position: absolute; left: 0; top: 0; }
  .h-stack { height: 152px; width: 860px; }
  .cta-stack2 { position: relative; height: 62px; width: 420px; }
  .cta-stack2 > div { position: absolute; left: 0; top: 0; }
  .far {
    position: absolute;
    border-radius: 8px;
    opacity: 0;
    filter: blur(var(--dof, 7px));
    will-change: filter, opacity;
  }
  .clock {
    position: absolute; left: 92px; top: 20px;
    font-size: 19px; color: ${C.cyan};
    width: 340px; height: 42px;
  }
  .clock > div { position: absolute; left: 0; top: 0; }
  .whisper {
    position: absolute; left: 92px; bottom: 80px;
    font-size: 17px; color: #b9b9c4; letter-spacing: 0.1em;
    text-transform: none; font-family: ${FONT.sys};
    opacity: 0;
  }
  .sweep { border-radius: 14px; }
  `;

  const clocks = range(9).map((i) => `06:00:0${i} — BRASIL`);

  const body = `
          <div class="stage">
            <div class="world" id="world" data-layout-allow-overflow>
              ${bg
                .map(
                  (p, i) =>
                    `<div class="far" id="far-${i}" style="left:${960 + p.x - p.w / 2}px;top:${540 + p.y - p.h / 2}px;width:${p.w}px;height:${p.h}px;transform:translateZ(${p.z}px);--dof:${Math.round(3 + Math.abs(p.z) / 120)}px">${lpSlim(
                      { w: p.w, h: p.h, hw: p.hw },
                    )}</div>`,
                )
                .join("\n              ")}
              <div class="lp hero" id="hero">
                <div class="lp-nav">
                  <div class="lp-brand">CORVEN</div>
                  <div class="lp-navlinks">
                    <div class="lp-navlink"></div><div class="lp-navlink"></div>
                    <div class="lp-navlink"></div><div class="lp-navcta"></div>
                  </div>
                </div>
                <div class="lp-body">
                  <div class="lp-copy">
                    <div class="h-stack">
                      <div class="lp-h" id="h2-0" data-layout-allow-overlap>Feito para você mesmo.</div>
                      <div class="lp-h" id="h2-1" data-layout-allow-overlap>Feito para você.</div>
                    </div>
                    <div class="lp-sub">Uma plataforma que entende o seu momento e responde a ele.</div>
                    <div class="cta-stack2">
                      <div class="lp-cta" id="c2-0" data-layout-allow-overlap>Conhecer a plataforma</div>
                      <div class="lp-cta" id="c2-1" data-layout-allow-overlap>COMEÇAR AGORA</div>
                    </div>
                    <div class="lp-proof"><div class="lp-dots"><div class="lp-dot"></div><div class="lp-dot"></div><div class="lp-dot"></div></div><span>+12.000 empresas</span></div>
                  </div>
                  <div class="lp-media" id="media2" style="width:456px;height:456px"></div>
                </div>
                <div class="sweep" id="sweep2"></div>
              </div>
            </div>
          </div>
          <div class="clock">${clocks.map((t, i) => `<div class="sys chip" id="clk-${i}" data-layout-allow-overlap>${t}</div>`).join("")}</div>
          <div class="whisper chip" id="whisper">Enquanto você dormia…</div>`;

  const script = `${cameraJS()}
          // Corte casado com a cena 01: a câmera atravessou o botão Purple e
          // emerge DENTRO da página. Começamos colados nela e recuamos.
          cam.z = 640;
          applyCamera();
          tl.fromTo(cam, { z: 640 },
            { z: 40, duration: 1.15, ease: "power3.out", onUpdate: applyCamera }, 0);

          // Relógio: estados discretos, um por segundo de mundo.
${stackJS("#clk-", 9, [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0])}

          tl.fromTo("#whisper", { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.66);

          // Uma varredura Purple = uma decisão. A estrutura muda logo atrás dela.
          function optimize(at) {
            tl.fromTo("#sweep2", { opacity: 0, backgroundPosition: "130% 0" },
              { opacity: 1, duration: 0.06, ease: "none" }, at);
            tl.to("#sweep2", { backgroundPosition: "-30% 0", duration: 0.34, ease: "power2.inOut" }, at);
            tl.to("#sweep2", { opacity: 0, duration: 0.10, ease: "none" }, at + 0.30);
          }
          optimize(0.86); optimize(1.52); optimize(2.06); optimize(2.62);

          // As otimizações propriamente ditas, logo atrás de cada varredura.
${stackJS("#h2-", 2, [0, 0.98])}
${stackJS("#c2-", 2, [0, 1.64])}
          tl.to("#media2", { x: -26, scale: 0.94, duration: 0.42, ease: "power3.out" }, 2.18);
          tl.to("#hero", { "--lp-gap": 0.82, duration: 0.40, ease: "power3.out" }, 2.74);

          // Dolly-out: existem outras. Sempre existiram.
          tl.to(cam, { z: -300, y: 20, duration: 1.6, ease: "power2.inOut", onUpdate: applyCamera }, 2.30);
          tl.to(".far", { opacity: 0.92, duration: 1.3, ease: "power2.out" }, 2.42);
          tl.fromTo(drift, { dy: 0 },
            { dy: -7, duration: 2.0, ease: "sine.inOut", yoyo: true, repeat: 1, onUpdate: applyCamera }, 0);
  `;

  return subComp({ id: "s02", duration: 4, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S03 — 0:07–0:12 · Três empresas, uma conclusão
   rules: 3d-camera-flight (perna lateral), discrete-text-sequence
   ────────────────────────────────────────────────────────────────────────── */
export function s03() {
  const rng = mulberry32(771);
  const TRIO = [
    { brand: "CORVEN", h: ["Potencialize resultados.", "Potencialize.", "Transforme.", "Transforme seu negócio."], cta: "Pedir demonstração" },
    { brand: "AURORA", h: ["Todo dia fresquinho.", "Potencialize.", "Transforme.", "Transforme seu negócio."], cta: "Ver cardápio" },
    { brand: "VÉRTICE", h: ["Seu dinheiro rende mais.", "Potencialize.", "Transforme.", "Transforme seu negócio."], cta: "Simular agora" },
  ];

  const extras = range(7).map((i) => ({
    x: 2280 + i * 470,
    y: -150 + Math.round(rng() * 300),
    z: -420 - Math.round(rng() * 520),
    w: 330,
    h: 246,
  }));

  const css = `
  ${lpCSS()}
  ${lpSlimCSS()}
  ${sysCSS()}
  .stage { position: absolute; inset: 0; perspective: 1400px; }
  .world {
    position: absolute; inset: 0;
    transform-style: preserve-3d; transform-origin: 50% 50%;
    will-change: transform;
  }
  .card {
    position: absolute; top: 208px;
    width: 520px; height: 664px;
    border-radius: 12px;
    box-shadow: 0 44px 96px rgba(0,0,0,0.5);
    --lp-gap: 0.92;
  }
  .card .lp-h { font-size: 38px; max-width: 12ch; }
  .card .lp-sub { font-size: 15px; max-width: 26ch; }
  .card .lp-cta { font-size: 14px; padding: 13px 24px; }
  .hs { position: relative; height: 82px; width: 400px; }
  .hs > div { position: absolute; left: 0; top: 0; }
  .cs { position: relative; height: 44px; width: 290px; }
  .cs > div { position: absolute; left: 0; top: 0; }
  .tick {
    position: absolute; right: 22px; top: 20px;
    width: 30px; height: 30px; border-radius: 50%;
    background: ${C.cyan}; opacity: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .tick svg { display: block; }
  .far2 { position: absolute; border-radius: 8px; filter: blur(5px); opacity: 0.55; }
  .conf {
    position: absolute; left: 50%; bottom: 92px; transform: translateX(-50%);
    opacity: 0;
  }
  `;

  const check = `<svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M1.6 6.2 L5.4 10 L13.2 1.8" stroke="${C.light}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const cardHTML = (t, i) => `
              <div class="lp card" id="card-${i}" style="left:${96 + i * 576}px;transform:translateZ(${i === 1 ? 40 : -30}px) rotateY(${i === 0 ? 7 : i === 2 ? -7 : 0}deg)">
                <div class="lp-nav">
                  <div class="lp-brand">${t.brand}</div>
                  <div class="lp-navlinks"><div class="lp-navlink"></div><div class="lp-navlink"></div><div class="lp-navcta"></div></div>
                </div>
                <div class="lp-body">
                  <div class="lp-copy">
                    <div class="hs">${t.h.map((h, k) => `<div class="lp-h" id="h${i}-${k}" data-layout-allow-overlap>${h}</div>`).join("")}</div>
                    <div class="lp-sub">Para quem precisa decidir com menos ruído.</div>
                    <div class="cs">
                      <div class="lp-cta" id="cta${i}-0" data-layout-allow-overlap>${t.cta}</div>
                      <div class="lp-cta" id="cta${i}-1" data-layout-allow-overlap>COMEÇAR AGORA</div>
                    </div>
                  </div>
                </div>
                <div class="tick" id="tick-${i}">${check}</div>
              </div>`;

  const body = `
          <div class="stage">
            <div class="world" id="world" data-layout-allow-overflow>
              ${extras
                .map(
                  (p, i) =>
                    `<div class="far2" style="left:${p.x}px;top:${540 + p.y - p.h / 2}px;width:${p.w}px;height:${p.h}px;transform:translateZ(${p.z}px)">${lpSlim({ w: p.w, h: p.h, hw: [66, 42] })}</div>`,
                )
                .join("\n              ")}
              ${TRIO.map(cardHTML).join("")}
            </div>
          </div>
          <div class="badge conf" id="conf">Confiança estatística: 99,4%</div>`;

  // As três páginas decidem juntas, sem se conhecerem.
  const steps = [0, 1.18, 1.96, 2.74];
  let swaps = "";
  for (let i = 0; i < 3; i++) {
    swaps += stackJS(`#h${i}-`, 4, steps);
    swaps += stackJS(`#cta${i}-`, 2, [0, 2.74]);
    for (const t of [1.18, 1.96, 2.74]) {
      swaps += `\n          tl.fromTo("#tick-${i}", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.16, ease: "power3.out" }, ${t});`;
      swaps += `\n          tl.to("#tick-${i}", { opacity: 0, duration: 0.20, ease: "power1.in" }, ${t + 0.42});`;
    }
  }

  const script = `${cameraJS()}
          cam.x = 330; cam.z = -60;
          applyCamera();

          // Travelling lateral: a câmera desliza e continua encontrando páginas.
          tl.fromTo(cam, { x: 330, z: -60 },
            { x: 96, z: 10, duration: 1.5, ease: "power2.inOut", onUpdate: applyCamera }, 0);
${swaps}
          tl.fromTo("#conf", { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" }, 3.04);
          tl.to("#conf", { opacity: 0, duration: 0.34, ease: "power1.in" }, 4.34);

          // Repouso — depois segue, e o corredor não acaba.
          tl.to(cam, { x: -640, z: 120, duration: 1.5, ease: "power2.inOut", onUpdate: applyCamera }, 3.5);
          tl.fromTo(drift, { drx: 0.5 },
            { drx: -0.5, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: 1, onUpdate: applyCamera }, 0);
  `;

  return subComp({ id: "s03", duration: 5, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S04 — 0:12–0:18 · 24 horas. 7 dias. Sempre testando.
   rules: 3d-camera-flight (voo contínuo), depth-of-field-blur
   ────────────────────────────────────────────────────────────────────────── */
export function s04() {
  const rng = mulberry32(4041);
  const N = 22;
  const pages = range(N).map((i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const depth = Math.floor(i / 2);
    return {
      x: side * (560 + Math.round(rng() * 90)),
      y: -230 + Math.round(rng() * 460),
      z: -300 - depth * 300 - Math.round(rng() * 90),
      w: 430,
      h: 320,
      rot: side * -34,
      hw: [50 + Math.round(rng() * 34), 30 + Math.round(rng() * 26)],
      dof: 1 + (depth % 4),
    };
  });

  const css = `
  ${lpSlimCSS()}
  ${sysCSS()}
  .stage { position: absolute; inset: 0; perspective: 1150px; }
  .world {
    position: absolute; inset: 0;
    transform-style: preserve-3d; transform-origin: 50% 50%;
    will-change: transform;
  }
  .fac {
    position: absolute; border-radius: 9px;
    box-shadow: 0 30px 70px rgba(0,0,0,0.5);
    --dof: 0px;
    filter: blur(var(--dof));
    will-change: filter;
  }
  .wave {
    position: absolute; left: 0; top: 0; right: 0; bottom: 0;
    border-radius: 9px; pointer-events: none;
    background: linear-gradient(102deg,
      rgba(124,58,237,0) 40%, rgba(124,58,237,0.65) 48%,
      rgba(255,255,255,0.85) 50%, rgba(6,182,212,0.55) 52%, rgba(6,182,212,0) 60%);
    background-size: 320% 100%; background-position: 140% 0;
    mix-blend-mode: screen; opacity: 0;
  }
  .hud {
    position: absolute; left: 118px; bottom: 132px;
    font-family: ${FONT.page}; font-weight: 900;
    font-size: 86px; letter-spacing: -0.04em; color: ${C.light};
  }
  .hud > div { position: absolute; left: 0; bottom: 0; white-space: nowrap; }
  .echo {
    position: absolute; font-family: ${FONT.page}; font-weight: 900;
    letter-spacing: -0.04em; color: ${C.light}; white-space: nowrap;
    opacity: 0;
  }
  `;

  const body = `
          <div class="stage">
            <div class="world" id="world" data-layout-allow-overflow></div>
          </div>
          <div class="hud">
            <div id="hud-0" data-layout-allow-overlap>24 horas.</div>
            <div id="hud-1" data-layout-allow-overlap>7 dias.</div>
            <div id="hud-2" data-layout-allow-overlap>Sempre testando.</div>
          </div>
          ${range(5)
            .map(
              (i) =>
                `<div class="echo" id="echo-${i}" data-layout-allow-overlap style="left:${118 + i * 74}px;bottom:${132 + i * 58}px;font-size:${86 - i * 13}px">Sempre testando.</div>`,
            )
            .join("\n          ")}`;

  // Ondas de otimização: começam esparsas, terminam quase contínuas.
  let waves = "";
  const sched = [0.5, 0.95, 1.3, 1.62, 1.9, 2.14, 2.36, 2.55, 2.72, 2.88, 3.02, 3.15, 3.27, 3.38, 3.48, 3.57, 3.66, 3.74, 3.81, 3.88, 3.94, 4.0];
  sched.forEach((t, i) => {
    const target = `#wave-${i % N}`;
    waves += `\n          tl.fromTo("${target}", { opacity: 0, backgroundPosition: "140% 0" }, { opacity: 1, duration: 0.05, ease: "none" }, ${t});`;
    waves += `\n          tl.to("${target}", { backgroundPosition: "-40% 0", duration: 0.30, ease: "power2.inOut" }, ${t});`;
    waves += `\n          tl.to("${target}", { opacity: 0, duration: 0.08, ease: "none" }, ${(t + 0.26).toFixed(2)});`;
  });

  const script = `${slimRuntimeJS()}
          // Fachadas do corredor — montadas no load a partir dos parâmetros.
          const PAGES = ${JSON.stringify(pages)};
          const worldEl = document.getElementById("world");
          worldEl.innerHTML = PAGES.map(function (p, i) {
            return '<div class="fac" id="fac-' + i + '" style="left:' + (960 + p.x - p.w / 2) +
              'px;top:' + (540 + p.y - p.h / 2) + 'px;width:' + p.w + 'px;height:' + p.h +
              'px;transform:translateZ(' + p.z + 'px) rotateY(' + p.rot + 'deg);--dof:' +
              (p.dof * 2) + 'px">' + slimHTML(p.w, p.h, p.hw[0], p.hw[1]) +
              '<div class="wave" id="wave-' + i + '"></div></div>';
          }).join("");
${cameraJS()}
          cam.z = 0;
          applyCamera();

          // Voo contínuo — cruzeiro, não investida. O corredor é infinito.
          tl.fromTo(cam, { z: 0 },
            { z: 2050, duration: 6, ease: "power1.inOut", onUpdate: applyCamera }, 0);
          // Um plano nítido por vez.
          tl.to(".fac", { "--dof": "0px", duration: 2.2, ease: "power2.out", stagger: 0.02 }, 1.2);
${waves}
${stackJS("#hud-", 3, [0, 2.05, 3.55])}
          tl.fromTo("#hud-0", { y: 26 }, { y: 0, duration: 0.5, ease: "power3.out" }, 0.55);

          // A última frase se multiplica fisicamente ao fundo.
          ${range(5)
            .map(
              (i) =>
                `tl.fromTo("#echo-${i}", { opacity: 0 }, { opacity: ${(0.5 - i * 0.08).toFixed(2)}, duration: 0.30, ease: "power2.out" }, ${(4.35 + i * 0.17).toFixed(2)});`,
            )
            .join("\n          ")}
  `;

  return subComp({ id: "s04", duration: 6, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S05 — 0:18–0:24 · A onda
   rules: 3d-camera-flight (crane-out top-down), center-outward-expansion
   ────────────────────────────────────────────────────────────────────────── */
export function s05() {
  const rng = mulberry32(5150);
  const COLS = 15,
    ROWS = 13;
  const CW = 214,
    CH = 172;

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      tiles.push({
        c,
        r,
        x: (c - (COLS - 1) / 2) * CW,
        y: (r - (ROWS - 1) / 2) * CH,
        hw: [46 + Math.round(rng() * 40), 26 + Math.round(rng() * 30)],
        align: rng() > 0.55 ? "center" : "flex-start",
        accent: ["#e0552f", "#1f9d55", "#2563eb", "#d4a017", "#9333ea", "#0f766e"][Math.floor(rng() * 6)],
        delay: 0,
      });
    }
  }
  // A onda percorre o mapa na diagonal — convergência em cascata, nunca simultânea.
  tiles.forEach((t) => {
    t.delay = (t.c / COLS) * 2.5 + (t.r / ROWS) * 0.9;
  });

  const css = `
  ${sysCSS()}
  .scene { background: ${C.voidDeep}; }
  .stage { position: absolute; inset: 0; perspective: 1500px; }
  .world {
    position: absolute; inset: 0;
    transform-style: preserve-3d; transform-origin: 50% 50%;
    will-change: transform;
  }
  /* Campo distante: já convergido, e alinhado à mesma malha do campo próximo.
     É o resto do Brasil — a onda já passou por lá. */
  .plain {
    position: absolute;
    left: ${960 - (COLS - 1) / 2 * CW - CW / 2 - 40 * CW}px;
    top: ${540 - (ROWS - 1) / 2 * CH - CH / 2 - 40 * CH}px;
    width: ${CW * 100}px; height: ${CH * 100}px;
    background-image: url("${pageTileURI({ accent: C.purple, w: CW - 26, h: CH - 26, gap: 26 })}");
    background-repeat: repeat;
    background-size: ${CW}px ${CH}px;
    background-color: ${C.voidDeep};
    opacity: 0.9;
  }
  .blk { position: absolute; width: ${CW - 26}px; height: ${CH - 26}px; }
  .v { position: absolute; inset: 0; background: ${C.light}; border-radius: 3px; overflow: hidden; }
  .v i { position: absolute; display: block; border-radius: 2px; }
  .v .bar { background: ${C.ink}; }
  .v .thin { background: #d9d9de; }
  .after { opacity: 0; }
  .wavebar {
    position: absolute; left: -1500px; top: ${540 - (ROWS * CH) / 2 - 40}px;
    width: 620px; height: ${ROWS * CH + 80}px;
    background: linear-gradient(90deg,
      rgba(124,58,237,0) 0%, rgba(124,58,237,0.5) 40%,
      rgba(214,196,255,0.95) 50%, rgba(6,182,212,0.45) 60%, rgba(6,182,212,0) 100%);
    transform: rotate(15deg) translateZ(6px);
    mix-blend-mode: screen;
    will-change: transform;
    pointer-events: none;
  }
  `;

  const body = `
          <div class="stage">
            <div class="world" id="world" data-layout-allow-overflow>
              <div class="plain"></div>
              <div class="wavebar" id="wavebar"></div>
            </div>
          </div>`;

  const script = `
          // ${tiles.length} quarteirões: cada um em duas versões empilhadas —
          // "antes" (diversidade real) e "depois" (o mesmo ótimo). A onda
          // crossfade um no outro; a convergência é literalmente esse fade.
          const TILES = ${JSON.stringify(
            tiles.map((t) => [t.x, t.y, t.hw[0], t.hw[1], t.align === "center" ? 1 : 0, t.accent, Number(t.delay.toFixed(2))]),
          )};
          const CW = ${CW - 26}, CH = ${CH - 26};
          function variant(a, b, cen, acc, isAfter, id) {
            const L1 = cen ? (100 - a) / 2 : 9, L2 = cen ? (100 - b) / 2 : 9;
            return '<div class="v' + (isAfter ? ' after" id="' + id : '') + '">' +
              '<i class="bar" style="left:9%;top:11%;width:22%;height:5%"></i>' +
              '<i style="left:' + (cen ? 34 : 68) + '%;top:10%;width:24%;height:8%;background:' + acc + ';border-radius:3px"></i>' +
              '<i class="thin" style="left:9%;top:24%;width:82%;height:1.5%"></i>' +
              '<i class="bar" style="left:' + L1 + '%;top:36%;width:' + a + '%;height:9%"></i>' +
              '<i class="bar" style="left:' + L2 + '%;top:50%;width:' + b + '%;height:9%"></i>' +
              '<i style="left:' + (cen ? 36 : 9) + '%;top:70%;width:28%;height:12%;background:' + acc + ';border-radius:3px"></i>' +
              '</div>';
          }
          const wavebarEl = document.getElementById("wavebar");
          wavebarEl.insertAdjacentHTML("beforebegin", TILES.map(function (t, i) {
            return '<div class="blk" style="left:' + (960 + t[0] - CW / 2) + 'px;top:' +
              (540 + t[1] - CH / 2) + 'px">' +
              variant(t[2], t[3], t[4], t[5], false, "") +
              variant(64, 40, 0, "${C.purple}", true, "af-" + i) + '</div>';
          }).join(""));
${cameraJS()}
          cam.rx = 70; cam.z = 320; cam.y = 90;
          applyCamera();

          // Crane-out contínuo. A câmera já não improvisa: sobe em linha reta.
          tl.fromTo(cam, { rx: 70, z: 320, y: 90 },
            { rx: 62, z: -300, y: -60, duration: 6, ease: "power1.inOut", onUpdate: applyCamera }, 0);

          // A onda atravessa o mapa; a convergência vem logo atrás dela.
          tl.fromTo("#wavebar", { x: 0, opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.2);
          tl.to("#wavebar", { x: 4700, duration: 3.6, ease: "power1.inOut" }, 0.3);
          tl.to("#wavebar", { opacity: 0, duration: 0.5, ease: "power1.in" }, 3.5);
          // Cascata: cada quarteirão converge quando a onda passa por ele.
          TILES.forEach(function (t, i) {
            tl.to("#af-" + i, { opacity: 1, duration: 0.34, ease: "power2.out" }, 0.55 + t[6]);
          });
  `;

  return subComp({ id: "s05", duration: 6, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S06 — 0:24–0:30 · Funcionou. Para todo mundo.
   rules: 3d-camera-flight (pull-back monumental), counting-dynamic-scale
   ────────────────────────────────────────────────────────────────────────── */
export function s06() {
  // Mesma célula da cena 05 (216×174) e mesma origem: o corte 05→06 cai
  // exatamente sobre a mesma malha.
  const CW = 214,
    CH = 172,
    COLS = 15,
    ROWS = 13;
  const tile = pageTileURI({ accent: C.purple, w: CW - 26, h: CH - 26, gap: 26 });

  const css = `
  ${sysCSS()}
  .scene { background: ${C.voidDeep}; }
  .stage { position: absolute; inset: 0; perspective: 1500px; }
  .world {
    position: absolute; inset: 0;
    transform-style: preserve-3d; transform-origin: 50% 50%;
    will-change: transform;
  }
  /* A cidade É a malha de páginas, estendida até o horizonte. Um único plano
     tilado: custo de DOM zero e literalmente sem fim dentro do quadro. */
  .plain {
    position: absolute;
    left: ${960 - (COLS - 1) / 2 * CW - CW / 2 - 60 * CW}px;
    top: ${540 - (ROWS - 1) / 2 * CH - CH / 2 - 60 * CH}px;
    width: ${CW * 150}px; height: ${CH * 150}px;
    background-image: url("${tile}");
    background-repeat: repeat;
    background-size: ${CW}px ${CH}px;
    background-color: ${C.voidDeep};
    opacity: 0.9;
  }
  /* Iluminação: a linha onde a cidade encontra o vazio. */
  .horizon {
    position: absolute; left: 0; right: 0;
    height: 420px;
    background: linear-gradient(to bottom,
      rgba(18,18,22,0) 0%, rgba(18,18,22,0.55) 52%,
      rgba(124,58,237,0.16) 74%, rgba(18,18,22,0) 100%);
    pointer-events: none;
  }
  .haze {
    position: absolute; inset: 0; pointer-events: none;
    opacity: 0;
    background: linear-gradient(to bottom,
      rgba(18,18,22,0.97) 0%, rgba(18,18,22,0.93) 32%,
      rgba(18,18,22,0.34) 48%, rgba(18,18,22,0) 64%);
  }
  .ind {
    position: absolute;
    font-family: ${FONT.sys}; font-variant-numeric: tabular-nums;
    font-size: 22px; color: ${C.cyan};
    opacity: 0; white-space: nowrap;
  }
  .hud2 {
    position: absolute; left: 0; right: 0; top: 150px;
    font-family: ${FONT.page}; font-weight: 900;
    font-size: 112px; letter-spacing: -0.04em; color: ${C.light};
    text-align: center; height: 130px;
  }
  .hud2 > div { position: absolute; left: 0; right: 0; top: 0; white-space: nowrap; }
  `;

  const inds = [
    { x: 250, y: 690, t: "+1,2%" },
    { x: 1470, y: 636, t: "+0,4%" },
    { x: 806, y: 902, t: "+2,1%" },
    { x: 1560, y: 890, t: "+0,9%" },
    { x: 356, y: 560, t: "+1,7%" },
  ];

  const body = `
          <div class="stage">
            <div class="world" id="world" data-layout-allow-overflow>
              <div class="plain"></div>
            </div>
          </div>
          <div class="haze" id="haze"></div>
          <div class="horizon" id="horizon" style="top:216px"></div>
          ${inds.map((d, i) => `<div class="ind chip" id="ind-${i}" style="left:${d.x}px;top:${d.y}px">${d.t}</div>`).join("\n          ")}
          <div class="hud2">
            <div id="h6-0" style="opacity:0" data-layout-allow-overlap>Funcionou.</div>
            <div id="h6-1" style="opacity:0" data-layout-allow-overlap>Para todo mundo.</div>
          </div>`;

  const script = `${cameraJS()}
          // Continua a pose com que a cena 05 termina e continua subindo, até a
          // cidade encontrar o horizonte.
          cam.rx = 62; cam.z = -300; cam.y = -60;
          applyCamera();

          // Pull-back monumental: quase nenhuma animação individual.
          // A escala É o espetáculo.
          tl.fromTo(cam, { rx: 62, z: -300, y: -60 },
            { rx: 76, z: -1180, y: -150, duration: 6, ease: "power1.inOut", onUpdate: applyCamera }, 0);
          tl.fromTo("#haze", { opacity: 0 },
            { opacity: 1, duration: 1.9, ease: "power1.inOut" }, 0.15);
          tl.fromTo("#horizon", { y: 42, opacity: 0.2 },
            { y: -30, opacity: 1, duration: 6, ease: "power1.inOut" }, 0);

          ${inds
            .map(
              (d, i) =>
                `tl.fromTo("#ind-${i}", { opacity: 0, y: 10 }, { opacity: 0.95, y: 0, duration: 0.4, ease: "power2.out" }, ${(0.7 + i * 0.28).toFixed(2)});`,
            )
            .join("\n          ")}
          tl.to(".ind", { opacity: 0, duration: 0.5, ease: "power1.in" }, 3.0);

          // "Funcionou." — pausa — "Para todo mundo."
          tl.fromTo("#h6-0", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 3.1);
          tl.to("#h6-0", { opacity: 0, duration: 0.3, ease: "power1.in" }, 4.3);
          tl.fromTo("#h6-1", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 4.75);
          tl.to("#h6-1", { opacity: 0, duration: 0.22, ease: "power1.in" }, 5.82);
  `;

  return subComp({ id: "s06", duration: 6, css, body, script });
}
