// Gerador das quatro cenas. A saída é HTML estático e editável — o Studio e qualquer
// edição manual trabalham nos .html, não aqui. Rode `node gen-scenes.mjs` só quando
// quiser mudar a GEOMETRIA, porque ele sobrescreve os arquivos.
//
// Esta é a versão 9:16 (1080x1920, Stories/Reels). Ela NÃO é a 4:5 esticada: a largura
// é a mesma, então os corpos de texto são idênticos, e os 570px a mais de altura viraram
// respiro dentro da faixa segura de Stories (y 260–1500). O que está fora dessa faixa é
// chão e atmosfera, porque é ali que a interface da plataforma desenha por cima.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "compositions");

const W = 1080;
const H = 1920;
const MID = 1000; // âncora dos objetos: centro da faixa segura de Stories (260–1500)

const FONTS = `
    @font-face { font-family: "Sora"; font-weight: 600; font-style: normal; font-display: block; src: url("assets/fonts/Sora-600.woff2") format("woff2"); }
    @font-face { font-family: "Sora"; font-weight: 700; font-style: normal; font-display: block; src: url("assets/fonts/Sora-700.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 400; font-style: normal; font-display: block; src: url("assets/fonts/Manrope-400.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 500; font-style: normal; font-display: block; src: url("assets/fonts/Manrope-500.woff2") format("woff2"); }
    @font-face { font-family: "Manrope"; font-weight: 600; font-style: normal; font-display: block; src: url("assets/fonts/Manrope-600.woff2") format("woff2"); }`;

// A página do espectador. A caixa, a sombra, o raio, a grade interna e o botão são
// IDÊNTICOS em toda variante — só os glifos mudam. É a tese do filme inteiro.
const PAGE_CSS = `
    #root .slot { position: absolute; width: 0; height: 0; }
    #root .shrink { position: absolute; left: -400px; top: -300px; width: 800px; height: 600px; transform-origin: 400px 300px; }
    #root .page { position: absolute; inset: 0; background: #f4f2ee; border-radius: 20px; box-shadow: 0 30px 80px rgba(0,0,0,0.45); overflow: hidden; }
    #root .page::after { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: rgba(255,255,255,0.7); }
    #root .page-chrome { position: absolute; left: 0; right: 0; top: 0; height: 52px; display: flex; align-items: center; gap: 10px; padding-left: 26px; background: rgba(43,43,43,0.045); border-bottom: 1px solid rgba(43,43,43,0.08); }
    #root .page-chrome i { width: 11px; height: 11px; border-radius: 50%; background: rgba(43,43,43,0.16); }
    #root .page-body { position: absolute; left: 46px; right: 46px; top: 98px; }
    #root .page-eyebrow { font-family: "Manrope"; font-weight: 600; font-size: 16px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(43,43,43,0.68); margin-bottom: 20px; }
    #root .page-head { position: relative; width: 640px; height: 96px; font-family: "Sora"; font-weight: 700; font-size: 40px; line-height: 1.16; letter-spacing: -0.02em; color: #2b2b2b; }
    #root .page-head span { position: absolute; left: 0; top: 0; width: 640px; }
    #root .page-underline { width: 520px; height: 4px; margin-top: 16px; border-radius: 2px; background: var(--signal); clip-path: inset(0 100% 0 0); }
    #root .page-copy { margin-top: 30px; display: flex; flex-direction: column; gap: 14px; }
    #root .page-copy i { height: 14px; border-radius: 7px; background: rgba(43,43,43,0.1); }
    #root .page-copy i:nth-child(1) { width: 600px; }
    #root .page-copy i:nth-child(2) { width: 462px; }
    #root .page-btn { position: relative; margin-top: 42px; width: 230px; height: 60px; border-radius: 100px; background: var(--brand); }
    #root .page-btn span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: "Sora"; font-weight: 600; font-size: 19px; color: #ffffff; white-space: nowrap; }
    #root .page-dot { position: absolute; left: 244px; top: 384px; width: 26px; height: 26px; border-radius: 50%; background: var(--signal); box-shadow: 0 0 14px rgba(6,182,212,0.55); }`;

// A banda tipográfica. A largura do frame é a mesma do 4:5, então os corpos de texto
// não mudam — mudar o px por causa da altura quebraria a legibilidade no telefone.
const LINE_TOP = 330;
const LINE_CSS = `
    #root .line { position: absolute; left: 90px; top: ${LINE_TOP}px; width: 900px; font-family: "Sora"; font-weight: 700; color: #ffffff; letter-spacing: -0.025em; line-height: 1.12; }`;

// Copy de variante: headline de uma landing page QUALQUER — o site do espectador.
// Nunca um claim do KRO AI, nunca um número inventado.
const V = {
  a: ["Tudo o que você precisa, em um só lugar.", "Começar agora"],
  v1: ["Uma condição especial para começar.", "Aproveitar a oferta"],
  v2: ["Feito para equipes que precisam de escala.", "Falar com vendas"],
  v3: ["Veja como funciona na prática.", "Ver demonstração"],
  v4: ["Comece hoje e cancele quando quiser.", "Criar minha conta"],
  v5: ["A forma mais simples de começar.", "Experimentar grátis"],
  v6: ["Seu time inteiro em uma só ferramenta.", "Começar agora"],
  v7: ["Menos ferramentas. Mais resultado.", "Quero começar"],
  v8: ["Tudo pronto para o seu primeiro cliente.", "Começar agora"],
  v9: ["Sua melhor versão começa aqui.", "Começar agora"],
};

function page(o) {
  const span = (k, i, idx) =>
    `<span class="pv pv-${k}"${i > 0 ? ' style="opacity: 0"' : ""}>${V[k][idx]}</span>`;
  const heads = o.variants.map((k, i) => span(k, i, 0)).join("\n              ");
  const btns = o.variants.map((k, i) => span(k, i, 1)).join("\n              ");
  const cls = o.cls ? ` ${o.cls}` : "";
  return `    <div class="slot${cls}" id="${o.id}" style="left: ${o.left}px; top: ${o.top}px${o.style ? "; " + o.style : ""}">
      <div class="shrink" style="transform: scale(${o.scale})">
        <div class="page">
          <div class="page-chrome"><i></i><i></i><i></i></div>
          <div class="page-body" data-layout-ignore>
            <div class="page-eyebrow">Sua empresa</div>
            <div class="page-head">
              ${heads}
            </div>
            <div class="page-underline"></div>
            <div class="page-copy"><i></i><i></i></div>
            <div class="page-btn">
              ${btns}
            </div>
          </div>${o.dot ? '\n          <div class="page-dot"></div>' : ""}
        </div>
      </div>
    </div>`;
}

const words = (text, cls = "w") =>
  text.split(" ").map((w) => `<span class="${cls}">${w}</span>`).join(" ");

const sceneOpen = (id) =>
  `  <div id="root" data-composition-id="${id}" data-width="${W}" data-height="${H}">`;

/* ===================================================================== */
/* Geometria                                                             */
/* ===================================================================== */

const HERO = [540, MID]; // a página sozinha fica no centro exato do frame
const HERO_EFF = 1.125; // 900x675 — margem a margem; a largura é o que limita, não a altura

// A grade 3x3 da multiplicação, centrada no mesmo ponto da página herói
const G = [
  [280, MID - 290], [540, MID - 290], [800, MID - 290],
  [280, MID], [540, MID], [800, MID],
  [280, MID + 290], [540, MID + 290], [800, MID + 290],
];
const GRID_SCALE = 0.3;
const FULL_K = (HERO_EFF / GRID_SCALE).toFixed(4);
// O slot 0 é a página original do espectador: é ela que a onda transforma,
// e é ela que a Cena 3 destaca como "uma oferta diferente".
const SLOT_V = ["a", "v4", "v5", "v2", "v6", "v7", "v3", "v8", "v9"];
const TWO = {
  0: [322.5, MID - 200], 2: [757.5, MID - 200],
  6: [322.5, MID + 200], 8: [757.5, MID + 200],
};
const TWO_K = (0.46 / GRID_SCALE).toFixed(4);
const REST = [1, 3, 4, 5, 7];
const HERO_DX = HERO[0] - G[0][0];
const HERO_DY = HERO[1] - G[0][1];

// A grade da Cena 1: 2 colunas x 3 linhas a 0,52. Página de 416x312, grade de
// 862x996 centrada em MID — ocupa a faixa segura de ponta a ponta.
const HOOK_SCALE = 0.52;
const HOOK_CELLS = [
  [317, MID - 342], [763, MID - 342],
  [317, MID], [763, MID],
  [317, MID + 342], [763, MID + 342],
];
const HOOK_SIBS = HOOK_CELLS.map((_, i) => i).slice(1);
const HOOK_K = (HERO_EFF / HOOK_SCALE).toFixed(4);
const HOOK_DX = HERO[0] - HOOK_CELLS[0][0];
const HOOK_DY = HERO[1] - HOOK_CELLS[0][1];

// A Cena 3: três cards à esquerda, rótulos à direita
const CARDS = [0, 3, 6];
const CARD_ROWS = [MID - 290, MID, MID + 290];
const CARD_POS = CARD_ROWS.map((y) => [250, y]);
const CARD_EFF = 0.4;
const CARD_K = (CARD_EFF / GRID_SCALE).toFixed(4);
const HI_K = ((CARD_EFF * 1.04) / GRID_SCALE).toFixed(4);
const DIM = [1, 2, 4, 5, 7, 8];
const EXTRA = [[280, MID + 560], [540, MID + 560], [800, MID + 560]];
const CONVERGE = [540, MID];
const POWER_V = ["v1", "v4", "v5", "v2", "v6", "v7", "v3", "v8", "v9"];

// O logo da Cena 2 vive abaixo da página, no rodapé livre da faixa segura
const MARK2 = { w: 280, h: 89, left: 400, top: 1390 };
// A onda sobe do logo (borda em 1453) e sai por cima da página (borda em 593)
const WAVE = { h: 170, start: 1500, hold: 1440, end: 580 };

/* ===================================================================== */
/* CENA 1 — O gancho (0,00 → 5,80)                                       */
/* ===================================================================== */

const s1slots = HOOK_CELLS.map((c, i) =>
  page({
    id: `s1-slot-${i}`, left: c[0], top: c[1], scale: HOOK_SCALE,
    variants: ["a"], dot: true, style: i === 0 ? "" : "opacity: 0",
  }),
).join("\n\n");

const hook = `<template>
  <style>${FONTS}

    #root { position: absolute; inset: 0; overflow: hidden; }
${PAGE_CSS}
    #root .page-dot { opacity: 0; }
${LINE_CSS}
    #root #s1-l1 { font-size: 76px; }
    #root #s1-l1 .w { display: inline-block; }
    #root #s1-l2 { font-size: 64px; opacity: 0; }
  </style>

${sceneOpen("hook")}
${s1slots}

    <h1 class="line" id="s1-l1" data-layout-allow-overlap>
      ${words("Você tem um site.")}
    </h1>

    <h2 class="line" id="s1-l2" data-layout-allow-overlap>Mas todo mundo vê a mesma versão.</h2>
  </div>

  <script>
    (() => {
      const tl = gsap.timeline({ paused: true });

      /* 0,00 — a página já está na tela e assenta. O frame 0 é a miniatura
         do anúncio no feed: a frase precisa estar nítida nele. */
      tl.fromTo("#s1-slot-0", { scale: ${(HOOK_K * 1.035).toFixed(4)}, x: ${HOOK_DX}, y: ${HOOK_DY} },
        { scale: ${HOOK_K}, x: ${HOOK_DX}, y: ${HOOK_DY}, duration: 0.6, ease: "power3.out" }, 0);

      /* 0,45 — o visitante chega no botão */
      tl.fromTo("#s1-slot-0 .page-dot", { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.6)" }, 0.45);

      /* 2,20 — a frase sai inteira, limpa */
      tl.fromTo("#s1-l1 .w", { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(7px)", duration: 0.18, stagger: 0.035, ease: "power2.in", immediateRender: false }, 2.2);

      /* 2,25 — o recuo revelador: a mesma página, vista por todo mundo */
      tl.fromTo("#s1-slot-0", { scale: ${HOOK_K}, x: ${HOOK_DX}, y: ${HOOK_DY} },
        { scale: 1, x: 0, y: 0, duration: 0.9, ease: "power2.inOut", immediateRender: false }, 2.25);
      tl.fromTo([${HOOK_SIBS.map((i) => `"#s1-slot-${i}"`).join(", ")}], { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" }, 2.4);

      /* 2,80 — "Mas todo mundo vê a mesma versão." */
      tl.fromTo("#s1-l2", { opacity: 0, filter: "blur(9px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "expo.out" }, 2.8);

      /* 3,00 — os visitantes chegam, um por página, todos no mesmo botão */
      tl.fromTo([${HOOK_SIBS.map((i) => `"#s1-slot-${i} .page-dot"`).join(", ")}],
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.055, ease: "back.out(1.6)" }, 3.0);

      /* 4,45 — a prova de que os textos são rigorosamente idênticos: o mesmo
         sublinhado cobre exatamente a mesma extensão nas quatro páginas. */
      tl.fromTo("#root .page-underline", { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.38, ease: "power2.inOut" }, 4.45);

      /* 5,60 — a frase sai antes do corte: nada some de repente na emenda */
      tl.fromTo("#s1-l2", { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(8px)", duration: 0.18, ease: "power2.in", immediateRender: false }, 5.6);

      window.__timelines["hook"] = tl;
    })();
  </script>
</template>
`;

writeFileSync(`${OUT}/hook.html`, hook);

/* ===================================================================== */
/* CENA 2 — A mágica (5,80 → 10,70 · local 0 → 4,90)                     */
/* ===================================================================== */

const s2hook = HOOK_CELLS.map((c, i) =>
  page({ id: `s2-old-${i}`, cls: "s2-old", left: c[0], top: c[1], scale: HOOK_SCALE,
         variants: ["a"], dot: true, style: "z-index: 5" }),
).join("\n\n");

const s2slots = G.map((cell, i) =>
  page({ id: `s2-slot-${i}`, left: cell[0], top: cell[1], scale: GRID_SCALE,
         variants: i === 0 ? ["a", "v1"] : [SLOT_V[i]], style: "opacity: 0" }),
).join("\n\n");

const s2twoTweens = Object.entries(TWO)
  .filter(([i]) => +i !== 0)
  .map(([i, [x, y]], n) => {
    const c = G[+i];
    const dx = x - c[0], dy = y - c[1];
    return `      tl.fromTo("#s2-slot-${i}",
        { opacity: 0, scale: ${(TWO_K * 0.7).toFixed(4)}, x: ${dx}, y: ${dy} },
        { opacity: 1, scale: ${TWO_K}, x: ${dx}, y: ${dy}, duration: 0.42, ease: "power3.out" }, ${(3.78 + n * 0.04).toFixed(2)});`;
  })
  .join("\n");

const s2gridTweens = Object.entries(TWO)
  .map(([i, [x, y]]) => {
    const c = G[+i];
    return `      tl.fromTo("#s2-slot-${i}", { scale: ${TWO_K}, x: ${x - c[0]}, y: ${y - c[1]} },
        { scale: 1, x: 0, y: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, 4.35);`;
  })
  .join("\n");

const magic = `<template>
  <style>${FONTS}

    #root { position: absolute; inset: 0; overflow: hidden; }
${PAGE_CSS}
${LINE_CSS}
    #root #s2-l3 { font-size: 64px; opacity: 0; }
    #root #s2-l3 em { font-style: normal; }

    /* a onda de energia roxa: sobe do logo e atravessa a página */
    #root #s2-wave {
      position: absolute; left: 80px; top: 0; width: 920px; height: ${WAVE.h}px;
      z-index: 30; opacity: 0; pointer-events: none;
      background: linear-gradient(to top,
        rgba(124,58,237,0) 0%, rgba(124,58,237,0.26) 58%,
        rgba(167,139,250,0.46) 90%, rgba(167,139,250,0) 100%);
    }
    #root #s2-wave::after {
      content: ""; position: absolute; left: 0; right: 0; top: 13px; height: 2px;
      background: #c4b5fd; box-shadow: 0 0 20px rgba(167,139,250,0.8);
    }

    /* o lockup kro ai_ , com o roxo subindo por dentro dele */
    #root #s2-mark-wrap { position: absolute; left: ${MARK2.left}px; top: ${MARK2.top}px; width: ${MARK2.w}px; height: ${MARK2.h}px; z-index: 32; opacity: 0; }
    #root #s2-mark { position: absolute; inset: 0; width: ${MARK2.w}px; height: ${MARK2.h}px; }
    #root #s2-mark-fill {
      position: absolute; inset: 0; background: var(--brand);
      -webkit-mask-image: url("assets/kro-logo-light.png"); mask-image: url("assets/kro-logo-light.png");
      -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
      clip-path: inset(100% 0 0 0);
    }
  </style>

${sceneOpen("magic")}
${s2hook}

${s2slots}

    <div id="s2-wave" data-layout-ignore></div>

    <div id="s2-mark-wrap" data-layout-ignore>
      <img id="s2-mark" src="assets/kro-logo-light.png" alt="kro ai" />
      <div id="s2-mark-fill"></div>
    </div>

    <h2 class="line" id="s2-l3" data-layout-allow-overlap>
      E se você pudesse <em>transformar</em> isso?
    </h2>
  </div>

  <script>
    (() => {
      const tl = gsap.timeline({ paused: true });

      /* 0,00 — o colapso: as quatro páginas idênticas voltam a ser uma só.
         O estado inicial casa exatamente com o último frame da Cena 1. */
      tl.fromTo("#s2-old-0", { scale: 1, x: 0, y: 0 },
        { scale: ${HOOK_K}, x: ${HOOK_DX}, y: ${HOOK_DY}, duration: 0.7, ease: "power2.inOut" }, 0);
      tl.fromTo([${HOOK_SIBS.map((i) => `"#s2-old-${i}"`).join(", ")}], { opacity: 1 },
        { opacity: 0, duration: 0.3, stagger: 0.03, ease: "power2.in" }, 0);
      tl.fromTo(".s2-old .page-underline", { clipPath: "inset(0 0% 0 0)" },
        { clipPath: "inset(0 100% 0 0)", duration: 0.26, ease: "power2.in" }, 0);
      tl.fromTo(".s2-old .page-dot", { opacity: 1 },
        { opacity: 0, duration: 0.26, ease: "power2.in" }, 0.08);

      /* no fim do colapso a página herdada entrega a caixa — mesma posição,
         mesma escala — para a página do sistema novo. O corte é invisível. */
      tl.fromTo("#s2-old-0", { opacity: 1 },
        { opacity: 0, duration: 0.01, immediateRender: false }, 0.7);
      tl.fromTo("#s2-slot-0", { opacity: 0, scale: ${FULL_K}, x: ${HERO_DX}, y: ${HERO_DY} },
        { opacity: 1, scale: ${FULL_K}, x: ${HERO_DX}, y: ${HERO_DY}, duration: 0.01 }, 0.7);

      /* 0,35 — "E se você pudesse transformar isso?" */
      tl.fromTo("#s2-l3", { opacity: 0, filter: "blur(9px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "expo.out" }, 0.35);
      tl.fromTo("#s2-l3 em", { color: "#ffffff" },
        { color: "#a78bfa", duration: 0.3, ease: "power2.out" }, 0.78);
      tl.fromTo("#s2-l3", { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(8px)", duration: 0.18, ease: "power2.in", immediateRender: false }, 3.0);

      /* 2,70 — o logotipo do KRO AI surge, com o roxo subindo por dentro dele */
      tl.fromTo("#s2-mark-wrap", { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.32, ease: "expo.out" }, 2.7);
      tl.fromTo("#s2-mark-fill", { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.42, ease: "power2.out" }, 2.78);
      tl.fromTo("#s2-mark-fill", { opacity: 1 },
        { opacity: 0, duration: 0.3, ease: "power2.inOut", immediateRender: false }, 3.3);

      /* 3,12 — a onda de energia sobe do logo e atravessa a página */
      tl.fromTo("#s2-wave", { opacity: 0, y: ${WAVE.start} },
        { opacity: 1, y: ${WAVE.hold}, duration: 0.12, ease: "power2.out" }, 3.12);
      tl.fromTo("#s2-wave", { y: ${WAVE.hold} },
        { y: ${WAVE.end}, duration: 0.46, ease: "power2.inOut", immediateRender: false }, 3.24);
      tl.fromTo("#s2-wave", { opacity: 1 },
        { opacity: 0, duration: 0.16, ease: "power2.in", immediateRender: false }, 3.62);

      /* os glifos trocam quando a borda clara da onda cobre cada linha.
         A troca é sequencial, nunca um crossfade: as duas versões jamais
         aparecem meio a meio. Caixa, sombra, raio, barras e botão NÃO mudam. */
      tl.fromTo("#s2-slot-0 .page-btn .pv-a", { opacity: 1 }, { opacity: 0, duration: 0.07 }, 3.42);
      tl.fromTo("#s2-slot-0 .page-btn .pv-v1", { opacity: 0 }, { opacity: 1, duration: 0.07 }, 3.49);
      tl.fromTo("#s2-slot-0 .page-head .pv-a", { opacity: 1 }, { opacity: 0, duration: 0.07 }, 3.52);
      tl.fromTo("#s2-slot-0 .page-head .pv-v1", { opacity: 0 }, { opacity: 1, duration: 0.07 }, 3.59);

      /* 3,75 — primeira multiplicação: a página vira quatro */
      tl.fromTo("#s2-slot-0", { scale: ${FULL_K}, x: ${HERO_DX}, y: ${HERO_DY} },
        { scale: ${TWO_K}, x: ${TWO[0][0] - G[0][0]}, y: ${TWO[0][1] - G[0][1]}, duration: 0.42, ease: "power3.out", immediateRender: false }, 3.75);
${s2twoTweens}

      /* 4,35 — segunda multiplicação: quatro viram nove e se organizam */
${s2gridTweens}
      tl.fromTo([${REST.map((i) => `"#s2-slot-${i}"`).join(", ")}],
        { opacity: 0, scale: 0.72 },
        { opacity: 1, scale: 1, duration: 0.38, stagger: 0.03, ease: "power3.out" }, 4.38);

      /* 4,50 — o logo sai de cena: fez o que tinha de fazer */
      tl.fromTo("#s2-mark-wrap", { opacity: 1 },
        { opacity: 0, duration: 0.3, ease: "power2.inOut", immediateRender: false }, 4.5);

      window.__timelines["magic"] = tl;
    })();
  </script>
</template>
`;

writeFileSync(`${OUT}/magic.html`, magic);

/* ===================================================================== */
/* CENA 3 — O poder (10,70 → 20,10 · local 0 → 9,40)                     */
/* ===================================================================== */

const s3slots = G.map((cell, i) =>
  page({ id: `s3-slot-${i}`, left: cell[0], top: cell[1], scale: GRID_SCALE,
         variants: [POWER_V[i]], style: "" }),
).join("\n\n");

const s3extra = EXTRA.map((c, n) =>
  page({ id: `s3-slot-${9 + n}`, left: c[0], top: c[1], scale: GRID_SCALE,
         variants: [["v5", "v8", "v9"][n]], style: "opacity: 0; z-index: 6" }),
).join("\n\n");

const s3cardTweens = CARDS.map((i, n) => {
  const c = G[i], p = CARD_POS[n];
  return `      tl.fromTo("#s3-slot-${i}", { scale: 1, x: 0, y: 0 },
        { scale: ${CARD_K}, x: ${p[0] - c[0]}, y: ${p[1] - c[1]}, duration: 0.62, ease: "power3.out" }, 0.05);`;
}).join("\n");

const s3backTweens = CARDS.map((i, n) => {
  const c = G[i], p = CARD_POS[n];
  return `      tl.fromTo("#s3-slot-${i}", { scale: ${CARD_K}, x: ${p[0] - c[0]}, y: ${p[1] - c[1]} },
        { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power2.inOut", immediateRender: false }, 8.35);`;
}).join("\n");

const allSlots = [...G.map((_, i) => i), 9, 10, 11];
const s3converge = allSlots
  .map((i) => {
    const c = i < 9 ? G[i] : EXTRA[i - 9];
    return `      tl.fromTo("#s3-slot-${i}", { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: ${CONVERGE[0] - c[0]}, y: ${CONVERGE[1] - c[1]}, scale: 0.02, opacity: 0.1, duration: 0.62, ease: "power3.in", immediateRender: false }, 8.78);`;
  })
  .join("\n");

// 12 lascas: existem só nos 0,62 s da convergência, com caminho causado.
// Posições fixas — nada aleatório em nenhum frame.
const SHARDS = [
  [170, 520, 14, 5, "brand"], [910, 600, 12, 5, "signal"], [300, 380, 10, 4, "signal"],
  [820, 380, 16, 5, "brand"], [120, 950, 13, 4, "signal"], [960, 980, 11, 4, "brand"],
  [230, 1450, 15, 5, "brand"], [860, 1430, 12, 4, "signal"], [430, 1580, 10, 4, "brand"],
  [660, 1560, 14, 5, "signal"], [520, 300, 12, 4, "brand"], [700, 1250, 11, 4, "signal"],
];
const s3shards = SHARDS.map(
  (s, i) =>
    `    <div class="shard" id="s3-shard-${i}" style="left: ${s[0]}px; top: ${s[1]}px; width: ${s[2]}px; height: ${s[3]}px; background: var(--${s[4]})"></div>`,
).join("\n");
const s3shardTweens = SHARDS.map(
  (s, i) =>
    `      tl.fromTo("#s3-shard-${i}", { opacity: 0, x: 0, y: 0 },
        { opacity: 0.9, x: ${CONVERGE[0] - s[0]}, y: ${CONVERGE[1] - s[1]}, duration: 0.56, ease: "power3.in" }, ${(8.84 + (i % 4) * 0.02).toFixed(2)});`,
).join("\n");

const power = `<template>
  <style>${FONTS}

    #root { position: absolute; inset: 0; overflow: hidden; }
${PAGE_CSS}
${LINE_CSS}
    #root #s3-l4 { font-size: 68px; }
    #root #s3-l4 .w { display: inline-block; opacity: 0; }
    #root #s3-l5 { font-size: 64px; opacity: 0; }
    #root #s3-l5 em { font-style: normal; }

    /* os três rótulos, no plano da câmera, à direita da pilha */
    #root .vlabel {
      position: absolute; left: 470px; width: 540px;
      font-family: "Sora"; font-weight: 600; font-size: 42px; line-height: 1.16;
      letter-spacing: -0.02em; color: #ffffff; opacity: 0;
      transform: translateY(-50%);
    }
    #root #s3-lab-0 { top: ${CARD_ROWS[0]}px; }
    #root #s3-lab-1 { top: ${CARD_ROWS[1]}px; }
    #root #s3-lab-2 { top: ${CARD_ROWS[2]}px; }
    #root .vlabel::before {
      content: ""; position: absolute; left: -32px; top: 10px; width: 4px; height: 34px;
      border-radius: 2px; background: var(--signal);
    }

    #root .shard { position: absolute; border-radius: 3px; opacity: 0; z-index: 40; }

    /* o ponto roxo em que tudo converge — e de onde o logo nasce na Cena 4 */
    #root #s3-point {
      position: absolute; left: ${CONVERGE[0] - 11}px; top: ${CONVERGE[1] - 11}px; width: 22px; height: 22px;
      border-radius: 50%; background: var(--brand); z-index: 45; opacity: 0;
    }
  </style>

${sceneOpen("power")}
${s3slots}

${s3extra}

${s3shards}

    <div id="s3-point" data-layout-ignore></div>

    <div class="vlabel" id="s3-lab-0" data-layout-allow-overlap>Uma oferta diferente.</div>
    <div class="vlabel" id="s3-lab-1" data-layout-allow-overlap>Um público diferente.</div>
    <div class="vlabel" id="s3-lab-2" data-layout-allow-overlap>Uma nova forma de vender.</div>

    <h2 class="line" id="s3-l4" data-layout-allow-overlap>
      ${words("Uma página.")} <span class="w em">Possibilidades</span> <span class="w em">infinitas.</span>
    </h2>

    <h2 class="line" id="s3-l5" data-layout-allow-overlap>Descubra qual <em>funciona melhor</em>.</h2>
  </div>

  <script>
    (() => {
      const tl = gsap.timeline({ paused: true });

      /* 0,05 — as seis versões não escolhidas recuam; três vêm à frente */
      tl.fromTo([${DIM.map((i) => `"#s3-slot-${i}"`).join(", ")}],
        { opacity: 1, scale: 1, filter: "blur(0px)" },
        { opacity: 0.055, scale: 0.82, filter: "blur(14px)", duration: 0.5, ease: "power2.inOut" }, 0.05);
${s3cardTweens}

      /* 0,55 — "Uma página. Possibilidades infinitas." */
      tl.fromTo("#s3-l4 .w", { opacity: 0, filter: "blur(7px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.13, stagger: 0.06, ease: "expo.out" }, 0.55);
      tl.fromTo("#s3-l4 .w.em", { color: "#ffffff" },
        { color: "#a78bfa", duration: 0.3, ease: "power2.out" }, 1.1);
      tl.fromTo("#s3-l4 .w", { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(7px)", duration: 0.18, stagger: 0.03, ease: "power2.in", immediateRender: false }, 2.6);

      /* 2,60 / 4,20 / 5,74 — as três versões ganham destaque alternadamente,
         cada uma num tempo forte da trilha. A câmera não se move: quem
         destaca é o brilho, não um zoom. */
      tl.fromTo("#s3-slot-0", { opacity: 1, scale: ${CARD_K} },
        { opacity: 1, scale: ${HI_K}, duration: 0.32, ease: "power2.out", immediateRender: false }, 2.6);
      tl.fromTo(["#s3-slot-3", "#s3-slot-6"], { opacity: 1 },
        { opacity: 0.38, duration: 0.32, ease: "power2.out", immediateRender: false }, 2.6);
      tl.fromTo("#s3-lab-0", { opacity: 0, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "expo.out" }, 2.8);

      tl.fromTo("#s3-slot-0", { scale: ${HI_K}, opacity: 1 },
        { scale: ${CARD_K}, opacity: 0.38, duration: 0.32, ease: "power2.out", immediateRender: false }, 4.2);
      tl.fromTo("#s3-slot-3", { opacity: 0.38, scale: ${CARD_K} },
        { opacity: 1, scale: ${HI_K}, duration: 0.32, ease: "power2.out", immediateRender: false }, 4.2);
      tl.fromTo("#s3-lab-1", { opacity: 0, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "expo.out" }, 4.4);

      tl.fromTo("#s3-slot-3", { scale: ${HI_K}, opacity: 1 },
        { scale: ${CARD_K}, opacity: 0.38, duration: 0.32, ease: "power2.out", immediateRender: false }, 5.74);
      tl.fromTo("#s3-slot-6", { opacity: 0.38, scale: ${CARD_K} },
        { opacity: 1, scale: ${HI_K}, duration: 0.32, ease: "power2.out", immediateRender: false }, 5.74);
      tl.fromTo("#s3-lab-2", { opacity: 0, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "expo.out" }, 5.94);

      /* 6,30 — as três voltam a brilho pleno, com seus rótulos */
      tl.fromTo(["#s3-slot-0", "#s3-slot-3"], { opacity: 0.38 },
        { opacity: 1, duration: 0.35, ease: "power2.inOut", immediateRender: false }, 6.3);
      tl.fromTo("#s3-slot-6", { scale: ${HI_K} },
        { scale: ${CARD_K}, duration: 0.35, ease: "power2.inOut", immediateRender: false }, 6.3);

      /* 6,43 — "Descubra qual funciona melhor." */
      tl.fromTo("#s3-l5", { opacity: 0, filter: "blur(9px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "expo.out" }, 6.43);
      tl.fromTo("#s3-l5 em", { color: "#ffffff" },
        { color: "#06b6d4", duration: 0.3, ease: "power2.out" }, 6.85);

      /* 8,25 — os rótulos saem; a frase sai logo atrás */
      tl.fromTo(".vlabel", { opacity: 1 },
        { opacity: 0, duration: 0.22, stagger: 0.04, ease: "power2.in", immediateRender: false }, 8.25);
      tl.fromTo("#s3-l5", { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(8px)", duration: 0.22, ease: "power2.in", immediateRender: false }, 8.5);

      /* 8,35 — as páginas se multiplicam mais uma vez */
${s3backTweens}
      tl.fromTo([${DIM.map((i) => `"#s3-slot-${i}"`).join(", ")}],
        { opacity: 0.055, scale: 0.82, filter: "blur(14px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.32, stagger: 0.025, ease: "power2.out", immediateRender: false }, 8.35);
      tl.fromTo(["#s3-slot-9", "#s3-slot-10", "#s3-slot-11"],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: "power3.out" }, 8.42);

      /* 8,78 — e convergem para um único ponto roxo */
${s3converge}
${s3shardTweens}
      tl.fromTo("#s3-point", { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, 9.2);

      window.__timelines["power"] = tl;
    })();
  </script>
</template>
`;

writeFileSync(`${OUT}/power.html`, power);

/* ===================================================================== */
/* CENA 4 — A revelação (20,10 → 25,00 · local 0 → 4,90)                 */
/* ===================================================================== */

// O end card, centrado na faixa segura: o bloco vai de 540 a 1392.
const EC = {
  headTop: 580,
  ruleTop: 830,
  markTop: CONVERGE[1] - 50, // 950 — o centro do logo é o ponto da convergência
  tagTop: 1130,
  ctaTop: 1340,
};

const reveal = `<template>
  <style>${FONTS}

    #root { position: absolute; inset: 0; overflow: hidden; }

    /* o ponto roxo com que a Cena 3 termina — é dele que o logo nasce */
    #root #s4-point {
      position: absolute; left: ${CONVERGE[0] - 11}px; top: ${CONVERGE[1] - 11}px; width: 22px; height: 22px;
      border-radius: 50%; background: var(--brand); z-index: 10;
    }

    #root #s4-headline {
      position: absolute; left: 100px; top: ${EC.headTop}px; width: 880px;
      font-family: "Sora"; font-weight: 700; font-size: 58px; line-height: 1.18;
      letter-spacing: -0.025em; text-align: center; color: #ffffff;
    }
    #root #s4-headline .w { display: inline-block; opacity: 0; }

    #root #s4-rule {
      position: absolute; left: 504px; top: ${EC.ruleTop}px; width: 72px; height: 4px;
      border-radius: 2px; background: var(--sand); clip-path: inset(0 100% 0 0);
    }

    #root #s4-mark-wrap { position: absolute; left: 380px; top: ${EC.markTop}px; width: 320px; height: 101px; opacity: 0; }
    #root #s4-mark { position: absolute; inset: 0; width: 320px; height: 101px; }
    #root #s4-mark-fill {
      position: absolute; inset: 0; background: var(--brand);
      -webkit-mask-image: url("assets/kro-logo-light.png"); mask-image: url("assets/kro-logo-light.png");
      -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
      clip-path: inset(100% 0 0 0);
    }

    #root #s4-tagline {
      position: absolute; left: 130px; top: ${EC.tagTop}px; width: 820px;
      font-family: "Manrope"; font-weight: 500; font-size: 32px; line-height: 1.42;
      text-align: center; color: rgba(255,255,255,0.68); opacity: 0;
    }

    #root #s4-cta {
      position: absolute; left: 104px; top: ${EC.ctaTop}px; width: 872px; height: 92px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 100px; background: var(--brand);
      font-family: "Sora"; font-weight: 600; font-size: 30px; letter-spacing: -0.01em;
      color: #ffffff; white-space: nowrap; opacity: 0;
    }
  </style>

${sceneOpen("reveal")}
    <div id="s4-point" data-layout-ignore></div>

    <div id="s4-mark-wrap" data-layout-ignore>
      <img id="s4-mark" src="assets/kro-logo-light.png" alt="kro ai" />
      <div id="s4-mark-fill"></div>
    </div>

    <div id="s4-rule" data-layout-ignore></div>

    <h1 id="s4-headline" data-layout-allow-overlap>
      ${words("Seu site pode ser")} <span class="w em">muito</span> <span class="w em">mais</span>
      ${words("do que uma única página.")}
    </h1>

    <p id="s4-tagline" data-layout-allow-overlap>
      Transforme seu site em um laboratório de possibilidades.
    </p>

    <div id="s4-cta" data-layout-allow-overlap>Descubra o que o KRO AI pode fazer pelo seu site.</div>
  </div>

  <script>
    (() => {
      const tl = gsap.timeline({ paused: true });

      /* 0,05 — o logotipo nasce do ponto: o roxo sobe por dentro dele */
      tl.fromTo("#s4-point", { opacity: 1, scale: 1 },
        { opacity: 0, scale: 7, duration: 0.3, ease: "power2.out" }, 0.05);
      tl.fromTo("#s4-mark-wrap", { opacity: 0, scale: 0.42 },
        { opacity: 1, scale: 1, duration: 0.48, ease: "expo.out" }, 0.05);
      tl.fromTo("#s4-mark-fill", { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.44, ease: "power2.out" }, 0.12);
      tl.fromTo("#s4-mark-fill", { opacity: 1 },
        { opacity: 0, duration: 0.3, ease: "power2.inOut", immediateRender: false }, 0.58);

      /* 0,45 — o texto principal, palavra a palavra */
      tl.fromTo("#s4-headline .w", { opacity: 0, filter: "blur(7px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.13, stagger: 0.05, ease: "expo.out" }, 0.45);
      tl.fromTo("#s4-headline .w.em", { color: "#ffffff" },
        { color: "#a78bfa", duration: 0.32, ease: "power2.out" }, 1.22);

      /* 1,15 — o traço de areia: o único respiro quente do filme */
      tl.fromTo("#s4-rule", { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.3, ease: "power2.inOut" }, 1.15);

      /* 1,62 — a assinatura */
      tl.fromTo("#s4-tagline", { opacity: 0, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.24, ease: "expo.out" }, 1.62);

      /* 1,98 — o CTA assenta e o pôster fica imóvel até o fim */
      tl.fromTo("#s4-cta", { opacity: 0, scale: 0.94, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.34, ease: "back.out(1.3)" }, 1.98);

      window.__timelines["reveal"] = tl;
    })();
  </script>
</template>
`;

writeFileSync(`${OUT}/reveal.html`, reveal);
console.log(`hook/magic/power/reveal escritos para ${W}x${H}`);
