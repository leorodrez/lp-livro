// Cenas 07–11 — do clímax da uniformidade à ruptura humana.
import {
  C,
  FONT,
  lpCSS,
  sysCSS,
  subComp,
  BRANDS,
  CONVERGED,
  pageTileURI,
  range,
  mulberry32,
} from "./kit.mjs";
import { stackJS } from "./scenes-a.mjs";

// Grão determinístico (feTurbulence com seed fixa) — só o universo humano o usa.
export function grainURI(seed = 7, freq = 0.82) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="3" seed="${seed}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Geometria da parede — partilhada por S08 e S09 para que o corte seja invisível.
export const WALL = { w: 7200, h: 4400, tileW: 144, tileH: 116 };

/* ─────────────────────────────────────────────────────────────────────────────
   S07 — 0:30–0:36 · Banco, padaria, clínica, software
   rules: discrete-text-sequence
   A câmera não se move. Nem um pixel. A estrutura é a mesma; só a marca troca.
   ────────────────────────────────────────────────────────────────────────── */
export function s07() {
  // Aceleração: o intervalo entre decisões encolhe até a substituição
  // acontecer em escala massiva.
  const times = [0];
  let t = 0,
    gap = 0.62;
  while (t < 5.72) {
    t += gap;
    gap = Math.max(0.072, gap * 0.855);
    if (t < 5.9) times.push(Number(t.toFixed(3)));
  }
  const N = times.length;
  const cards = range(N).map((i) => BRANDS[i % BRANDS.length]);

  const css = `
  ${lpCSS()}
  ${sysCSS()}
  .scene { background: ${C.voidDeep}; }
  .frame {
    position: absolute; left: 50%; top: 50%;
    width: 1500px; height: 856px;
    margin-left: -750px; margin-top: -428px;
    border-radius: 12px;
    box-shadow: 0 50px 120px rgba(0,0,0,0.62);
    --lp-gap: 1;
  }
  .frame .lp-h { font-size: 70px; max-width: 12ch; }
  .frame .lp-sub { font-size: 21px; max-width: 32ch; }
  .frame .lp-cta { font-size: 19px; padding: 18px 38px; }
  .frame .lp-brand { font-size: 27px; }
  .frame .lp-proof { font-size: 15px; }
  .brand-stack { position: relative; width: 460px; height: 34px; }
  .brand-stack > div { position: absolute; left: 0; top: 0; white-space: nowrap; }
  .seg-stack {
    position: absolute; left: 50%; bottom: 84px; transform: translateX(-50%);
    width: 700px; height: 26px;
  }
  .seg-stack > div {
    position: absolute; left: 50%; top: 0; transform: translateX(-50%);
    white-space: nowrap; font-size: 17px; color: #9a9aa4;
  }
  `;

  const body = `
          <div class="lp frame">
            <div class="lp-nav">
              <div class="lp-brand brand-stack" id="brands"></div>
              <div class="lp-navlinks">
                <div class="lp-navlink"></div><div class="lp-navlink"></div>
                <div class="lp-navlink"></div><div class="lp-navcta"></div>
              </div>
            </div>
            <div class="lp-body">
              <div class="lp-copy">
                <div class="lp-h">${CONVERGED.headline}</div>
                <div class="lp-sub">${CONVERGED.sub}</div>
                <div class="lp-cta">${CONVERGED.cta}</div>
                <div class="lp-proof"><div class="lp-dots"><div class="lp-dot"></div><div class="lp-dot"></div><div class="lp-dot"></div></div><span>${CONVERGED.proof}</span></div>
              </div>
              <div class="lp-media" style="width:430px;height:430px"></div>
            </div>
          </div>
          <div class="sys seg-stack" id="segs"></div>`;

  const script = `
          // Nenhuma câmera. Nenhum movimento de layout. Só substituição.
          // ${N} trocas em 6s, com o intervalo encolhendo a cada decisão.
          const CARDS = ${JSON.stringify(cards.map((b) => [b.name, b.segment]))};
          document.getElementById("brands").innerHTML = CARDS
            .map(function (c, i) { return '<div id="br-' + i + '" data-layout-allow-overlap>' + c[0] + '</div>'; }).join("");
          document.getElementById("segs").innerHTML = CARDS
            .map(function (c, i) { return '<div id="sg-' + i + '" data-layout-allow-overlap>' + c[1] + '</div>'; }).join("");
${stackJS("#br-", N, times)}
${stackJS("#sg-", N, times)}
  `;

  return subComp({ id: "s07", duration: 6, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S08 — 0:36–0:41 · A landing page perfeita
   rules: multi-phase-camera (pull-back lentíssimo), counting-dynamic-scale
   ────────────────────────────────────────────────────────────────────────── */
export function s08() {
  const tile = pageTileURI({ accent: C.purple, w: 132, h: 104, gap: 12 });

  const css = `
  ${sysCSS()}
  .scene { background: ${C.voidDeep}; }
  .world {
    position: absolute; inset: 0;
    transform-origin: 50% 50%;
    will-change: transform;
  }
  .wall {
    position: absolute; left: 50%; top: 50%;
    width: ${WALL.w}px; height: ${WALL.h}px;
    margin-left: -${WALL.w / 2}px; margin-top: -${WALL.h / 2}px;
    background-image: url("${tile}");
    background-repeat: repeat;
    background-size: ${WALL.tileW}px ${WALL.tileH}px;
    background-color: ${C.voidDeep};
  }
  .vig {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 50% 50%,
      rgba(27,26,31,0) 42%, rgba(18,18,22,0.72) 100%);
  }
  /* Iluminação, não card: a luz cai sobre o centro à medida que a parede
     cresce. É o que deixa a voz do sistema legível sobre mil páginas brancas. */
  .scrim {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 46% 40% at 50% 48%,
      rgba(14,14,18,0.86) 0%, rgba(14,14,18,0.70) 40%,
      rgba(14,14,18,0.26) 72%, rgba(14,14,18,0) 100%);
    opacity: 0;
  }
  .count {
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    text-align: center; width: 1400px;
  }
  .count-n {
    font-family: ${FONT.sys}; font-variant-numeric: tabular-nums;
    font-size: 66px; color: ${C.light}; letter-spacing: -0.01em;
    text-shadow: 0 8px 40px rgba(0,0,0,0.9);
  }
  .count-l {
    font-family: ${FONT.sys}; font-size: 19px; letter-spacing: 0.2em;
    text-transform: uppercase; color: ${C.cyan}; margin-top: 16px;
  }
  .stack2 { position: relative; height: 92px; }
  .stack2 > div { position: absolute; left: 0; right: 0; top: 0; }
  .perfect {
    position: absolute; left: 50%; bottom: 118px;
    transform: translateX(-50%);
    font-family: ${FONT.page}; font-weight: 900; font-size: 62px;
    letter-spacing: -0.035em; color: ${C.light};
    white-space: nowrap; opacity: 0;
    text-shadow: 0 8px 44px rgba(0,0,0,0.95);
  }
  `;

  const body = `
          <div class="world" id="world"><div class="wall"></div></div>
          <div class="vig"></div>
          <div class="scrim" id="scrim"></div>
          <div class="count">
            <div class="stack2">
              <div id="cn-0" data-layout-allow-overlap><div class="count-n" id="counter">0</div><div class="count-l">variantes testadas</div></div>
              <div id="cn-1" style="opacity:0" data-layout-allow-overlap><div class="count-n">1</div><div class="count-l">vencedora</div></div>
            </div>
          </div>
          <div class="perfect" id="perfect">A landing page perfeita.</div>`;

  const script = `
          const world = document.getElementById("world");
          const cam = { scale: 1.62 };
          function applyCamera() {
            world.style.transform = "translate(0px,0px) scale(" + cam.scale + ")";
          }
          applyCamera();

          // Pull-back muito lento. No fim, tudo finalmente para.
          tl.fromTo(cam, { scale: 1.62 },
            { scale: 0.34, duration: 3.6, ease: "power2.out", onUpdate: applyCamera }, 0);

          // A luz fecha sobre o centro conforme a parede se revela.
          tl.fromTo("#scrim", { opacity: 0 },
            { opacity: 1, duration: 0.85, ease: "power2.out" }, 0.15);

          // Contador — formatação pt-BR determinística, sem toLocaleString.
          const el = document.getElementById("counter");
          const proxy = { v: 0 };
          function fmt(n) {
            return String(Math.round(n)).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
          }
          el.textContent = "0";
          tl.fromTo(proxy, { v: 0 }, {
            v: 1847392, duration: 1.5, ease: "power2.out",
            onUpdate: function () { el.textContent = fmt(proxy.v); }
          }, 0.55);

          // 1.847.392 variantes. Uma vencedora.
${stackJS("#cn-", 2, [0, 2.72])}
          tl.fromTo("#cn-1", { scale: 0.94 }, { scale: 1, duration: 0.5, ease: "power3.out" }, 2.72);

          tl.fromTo("#perfect", { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.62, ease: "power3.out" }, 3.5);
          // Hold. Nada mais se move.
  `;

  return subComp({ id: "s08", duration: 5, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S09 — 0:41–0:46 · A exceção
   rules: coordinate-target-zoom, depth-of-field-blur
   PRIMEIRA aparição do Sand no filme. Não pisca. Não brilha. Está lá.
   ────────────────────────────────────────────────────────────────────────── */
export function s09() {
  const tile = pageTileURI({ accent: C.purple, w: 132, h: 104, gap: 12 });
  const START_S = 0.34;
  // A exceção precisa ocupar EXATAMENTE uma célula da malha, senão lê como
  // sujeira e não como página. Então: escolhe-se onde ela deve cair na tela,
  // converte-se para coordenadas do mundo e encaixa-se na célula mais próxima.
  const WANT_X = (1252 - 960) / START_S,
    WANT_Y = (706 - 540) / START_S;
  // Canto superior-esquerdo da parede, em coordenadas do mundo (world center = 960,540).
  const WALL_X0 = -WALL.w / 2,
    WALL_Y0 = -WALL.h / 2;
  const CELL_C = Math.round((WANT_X - WALL_X0) / WALL.tileW),
    CELL_R = Math.round((WANT_Y - WALL_Y0) / WALL.tileH);
  // Canto da página dentro da célula (o tile tem 6px de respiro por lado).
  const HUM = { x: WALL_X0 + CELL_C * WALL.tileW + 6, y: WALL_Y0 + CELL_R * WALL.tileH + 6 };
  const AIM = { x: Math.round(HUM.x + 66), y: Math.round(HUM.y + 52) };

  const css = `
  ${sysCSS()}
  .scene { background: ${C.voidDeep}; }
  .world {
    position: absolute; inset: 0;
    transform-origin: 50% 50%;
    will-change: transform;
  }
  .wall {
    position: absolute; left: 50%; top: 50%;
    width: ${WALL.w}px; height: ${WALL.h}px;
    margin-left: -${WALL.w / 2}px; margin-top: -${WALL.h / 2}px;
    background-image: url("${tile}");
    background-repeat: repeat;
    background-size: ${WALL.tileW}px ${WALL.tileH}px;
    background-color: ${C.voidDeep};
  }
  /* A exceção ocupa exatamente uma célula da malha. Nada mais. */
  .human {
    position: absolute;
    left: ${960 + HUM.x}px;
    top: ${540 + HUM.y}px;
    width: 132px; height: 104px;
    background: ${C.sand};
    overflow: hidden;
  }
  .human i { position: absolute; display: block; }
  .h-rule { left: 11px; top: 30px; width: 96px; height: 1px; background: rgba(43,43,43,0.4); }
  .h-h1 { left: 11px; top: 40px; width: 74px; height: 7px; background: rgba(43,43,43,0.86); border-radius: 1px; }
  .h-h2 { left: 11px; top: 52px; width: 45px; height: 7px; background: rgba(43,43,43,0.86); border-radius: 1px; }
  .h-b { left: 63px; top: 76px; width: 44px; height: 12px; background: rgba(43,43,43,0.9); border-radius: 1px; }
  .h-m { left: 11px; top: 12px; width: 22px; height: 4px; background: rgba(43,43,43,0.55); }
  /* Temperatura: o universo esfriado ganha um traço de calor. */
  .warm {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 65% 65%,
      rgba(216,192,167,0.30) 0%, rgba(216,192,167,0.06) 45%, rgba(216,192,167,0) 72%);
    opacity: 0; mix-blend-mode: soft-light;
  }
  .cool {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 50% 50%,
      rgba(27,26,31,0) 40%, rgba(18,18,22,0.78) 100%);
  }
  /* Continuidade com a cena 08: a mesma queda de luz, para que o corte na
     parede seja invisível. Ela abre conforme a câmera se aproxima. */
  .scrim {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 46% 40% at 50% 48%,
      rgba(14,14,18,0.86) 0%, rgba(14,14,18,0.70) 40%,
      rgba(14,14,18,0.26) 72%, rgba(14,14,18,0) 100%);
  }
  .grain {
    position: absolute; inset: 0; pointer-events: none;
    background-image: url("${grainURI(11, 0.9)}");
    background-size: 200px 200px;
    opacity: 0; mix-blend-mode: overlay;
  }
  `;

  const body = `
          <div class="world" id="world">
            <div class="wall"></div>
            <div class="human"></div>
          </div>
          <div class="cool"></div>
          <div class="scrim" id="scrim"></div>
          <div class="warm" id="warm"></div>
          <div class="grain" id="grain"></div>`;

  const script = `
          const world = document.getElementById("world");
          const AIM = { x: ${AIM.x}, y: ${AIM.y} };
          const cam = { scale: ${START_S}, w: 0 };
          function applyCamera() {
            const s = cam.scale;
            world.style.transform =
              "translate(" + (-AIM.x * cam.w * s) + "px," + (-AIM.y * cam.w * s) + "px) scale(" + s + ")";
          }
          applyCamera();

          // Só a câmera se move. A página não faz nada — é esse o ponto.
          // Para em 0.88 do alvo: enquadramento editorial, nunca centralizado.
          tl.fromTo(cam, { scale: ${START_S}, w: 0 },
            { scale: 2.15, w: 0.88, duration: 4.4, ease: "power2.inOut", onUpdate: applyCamera }, 0.25);

          tl.fromTo("#scrim", { opacity: 1 },
            { opacity: 0.06, duration: 3.0, ease: "power2.inOut" }, 0.6);

          // A temperatura sobe antes de qualquer explicação.
          tl.fromTo("#warm", { opacity: 0 }, { opacity: 1, duration: 3.2, ease: "power1.inOut" }, 1.1);
          tl.fromTo("#grain", { opacity: 0 }, { opacity: 0.16, duration: 2.4, ease: "power1.inOut" }, 2.2);
  `;

  return subComp({ id: "s09", duration: 5, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S10 — 0:46–0:50 · Feito por alguém.
   rules: viewport-change (micro push), svg-path-draw, sine-wave-loop
   ────────────────────────────────────────────────────────────────────────── */
export function s10() {
  const css = `
  ${sysCSS()}
  .scene { background: #17161a; }
  .world { position: absolute; inset: 0; transform-origin: 50% 50%; will-change: transform; }
  /* Largura incomum, deslocada. Não fecha na grade — de propósito. */
  .paper {
    position: absolute;
    left: 200px; top: 96px;
    width: 1250px; height: 888px;
    background: ${C.sand};
    box-shadow: 0 60px 140px rgba(0,0,0,0.62);
  }
  .p-mark {
    position: absolute; left: 96px; top: 74px;
    font-family: ${FONT.sys}; font-size: 15px; letter-spacing: 0.28em;
    text-transform: uppercase; color: rgba(43,43,43,0.52);
  }
  /* Um filete editorial que atravessa fora do alinhamento. */
  .p-rule {
    position: absolute; left: -64px; top: 268px;
    width: 812px; height: 1px; background: rgba(43,43,43,0.55);
  }
  .p-h {
    position: absolute; left: 96px; top: 318px;
    font-family: ${FONT.human}; font-weight: 400;
    font-size: 128px; line-height: 0.96; letter-spacing: -0.018em;
    color: ${C.ink};
  }
  .p-sub {
    position: absolute; left: 99px; top: 606px;
    font-family: ${FONT.human}; font-weight: 400; font-style: italic;
    font-size: 30px; color: rgba(43,43,43,0.72); max-width: 26ch;
    line-height: 1.4;
  }
  /* O botão não está onde o algoritmo o colocaria. */
  .p-cta {
    position: absolute; left: 742px; top: 722px;
    font-family: ${FONT.sys}; font-size: 19px; letter-spacing: 0.16em;
    text-transform: uppercase; color: ${C.sand};
    background: ${C.ink};
    padding: 19px 34px;
  }
  .p-foot {
    position: absolute; left: 96px; bottom: 78px;
    font-family: ${FONT.human}; font-size: 23px; color: rgba(43,43,43,0.6);
  }
  .outline { position: absolute; left: 184px; top: 80px; overflow: visible; }
  .warn {
    position: absolute; right: 100px;
    font-family: ${FONT.sys}; font-size: 16px; letter-spacing: 0.16em;
    text-transform: uppercase; color: ${C.cyan};
    opacity: 0; white-space: nowrap;
  }
  .grain2 {
    position: absolute; inset: 0; pointer-events: none;
    background-image: url("${grainURI(23, 0.86)}");
    background-size: 200px 200px;
    opacity: 0.19; mix-blend-mode: overlay;
  }
  `;

  // O contorno que o sistema tenta desenhar ao redor da anomalia.
  const PERIM = 2 * (1282 + 920);
  const body = `
          <div class="world" id="world">
            <div class="paper">
              <div class="p-mark">Estúdio · São Paulo</div>
              <div class="p-rule"></div>
              <div class="p-h">Feito por<br />alguém.</div>
              <div class="p-sub">Levou três semanas. Ninguém testou mil versões.</div>
              <div class="p-cta">Vem conversar</div>
              <div class="p-foot">— desde 2019</div>
            </div>
            <svg class="outline" width="1282" height="920" viewBox="0 0 1282 920" fill="none">
              <rect id="ol" x="1" y="1" width="1280" height="918"
                    stroke="${C.purple}" stroke-width="3" fill="none"
                    stroke-dasharray="${PERIM}" stroke-dashoffset="${PERIM}" />
            </svg>
          </div>
          <div class="warn" id="warn-0" style="top:150px" data-layout-allow-overlap>anomalia detectada</div>
          <div class="warn" id="warn-1" style="top:150px" data-layout-allow-overlap>confiança insuficiente</div>
          <div class="grain2"></div>`;

  const script = `
          const world = document.getElementById("world");
          const cam = { scale: 1 };
          function applyCamera() {
            world.style.transform = "translate(0px,0px) scale(" + cam.scale + ")";
          }
          applyCamera();

          // Quase estática. Um micro push, nada mais.
          tl.fromTo(cam, { scale: 1.028 },
            { scale: 1, duration: 4, ease: "power2.out", onUpdate: applyCamera }, 0);

          tl.fromTo("#warn-0", { opacity: 0 }, { opacity: 1, duration: 0.24, ease: "power2.out" }, 0.85);
          tl.to("#warn-0", { opacity: 0, duration: 0.18, ease: "none" }, 1.92);
          tl.fromTo("#warn-1", { opacity: 0 }, { opacity: 1, duration: 0.24, ease: "power2.out" }, 2.06);
          tl.to("#warn-1", { opacity: 0, duration: 0.5, ease: "power1.in" }, 3.05);

          // O sistema tenta corrigi-la. O contorno hesita. Desaparece.
          tl.fromTo("#ol", { strokeDashoffset: ${PERIM} },
            { strokeDashoffset: ${Math.round(PERIM * 0.42)}, duration: 0.66, ease: "power2.out" }, 1.06);
          tl.to("#ol", { strokeDashoffset: ${Math.round(PERIM * 0.36)}, duration: 0.5, ease: "power1.inOut" }, 1.78);
          tl.to("#ol", { opacity: 0.45, duration: 0.22, ease: "none" }, 2.30);
          tl.to("#ol", { opacity: 0, duration: 0.42, ease: "power2.in" }, 2.58);
  `;

  return subComp({ id: "s10", duration: 4, css, body, script });
}

/* ─────────────────────────────────────────────────────────────────────────────
   S11 — 0:50–0:54 · Diferença vira luxo
   rules: máscara por overflow + translate (reveal sem ornamentação)
   ────────────────────────────────────────────────────────────────────────── */
export function s11() {
  const css = `
  .scene { background: ${C.dark}; }
  .fill {
    position: absolute; inset: 0;
    background: ${C.dark};
  }
  .wrap {
    position: absolute; left: 168px; top: 50%;
    transform: translateY(-50%);
    width: 1500px;
  }
  .mask { overflow: hidden; }
  .l1 {
    font-family: ${FONT.page}; font-weight: 900;
    font-size: 104px; line-height: 1.06; letter-spacing: -0.035em;
    color: ${C.light};
    max-width: 17ch;
  }
  .mask2 { overflow: hidden; margin-top: 42px; }
  .l2 {
    font-family: ${FONT.human}; font-weight: 400;
    font-size: 56px; letter-spacing: -0.005em;
    color: ${C.sand};
  }
  `;

  const body = `
          <div class="fill"></div>
          <div class="wrap">
            <div class="mask"><div class="l1" id="l1">Quando tudo otimiza, diferença vira luxo.</div></div>
            <div class="mask2"><div class="l2" id="l2">Ou vantagem.</div></div>
          </div>`;

  const script = `
          // Reveal simples por máscara. Nenhuma ornamentação. Câmera parada.
          tl.fromTo("#l1", { yPercent: 108 },
            { yPercent: 0, duration: 0.82, ease: "power3.out" }, 0.22);
          tl.fromTo("#l2", { yPercent: 120 },
            { yPercent: 0, duration: 0.66, ease: "power3.out" }, 1.62);
          // Estável até o último frame.
  `;

  return subComp({ id: "s11", duration: 4, css, body, script });
}
