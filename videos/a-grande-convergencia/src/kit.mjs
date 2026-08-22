// A Grande Convergência — kit compartilhado
// Sistema de landing page paramétrico + tokens de design + utilidades determinísticas.
// Todas as cenas são geradas a partir daqui; a convergência é literalmente
// a animação dos parâmetros deste componente em direção a um estado comum.

export const C = {
  purple: "#7c3aed",
  cyan: "#06b6d4",
  dark: "#2b2b2b",
  light: "#ffffff",
  sand: "#d8c0a7",
  void: "#1b1a1f",
  voidDeep: "#121216",
  ink: "#2b2b2b",
  muted: "#6f6f76", // ≥ 4.5:1 sobre Light — texto secundário das páginas
  line: "#e4e4e7",
  purpleDim: "#5b2bb0",
};

export const FONT = {
  page: "Inter, sans-serif",
  sys: "'JetBrains Mono', monospace",
  human: "'EB Garamond', serif",
};

// ── PRNG determinístico (seed fixa; nunca Math.random) ───────────────────────
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

export function range(n) {
  return Array.from({ length: n }, (_, i) => i);
}

// ── Marcas fictícias brasileiras ─────────────────────────────────────────────
// Inventadas para o filme. Nenhuma corresponde a empresa real.
export const BRANDS = [
  { name: "CORVEN", segment: "software" },
  { name: "AURORA", segment: "padaria" },
  { name: "VÉRTICE", segment: "banco" },
  { name: "MERIDIAN", segment: "clínica" },
  { name: "HABITA", segment: "imobiliária" },
  { name: "PONTO", segment: "curso" },
  { name: "DATAMO", segment: "consultoria" },
  { name: "LUME", segment: "escritório" },
  { name: "SALVO", segment: "seguros" },
  { name: "TRELA", segment: "pet" },
  { name: "NEXO", segment: "logística" },
  { name: "OURIVÉS", segment: "joalheria" },
  { name: "GRÃO", segment: "cafeteria" },
  { name: "ALVES & CIA", segment: "advocacia" },
  { name: "PLENA", segment: "odontologia" },
  { name: "RUMO", segment: "viagens" },
];

// Headlines "antes" — cada uma com personalidade própria.
export const HEADLINES_BEFORE = [
  "Potencialize resultados.",
  "Todo dia fresquinho.",
  "Seu dinheiro rende mais.",
  "Cuidar de você é o método.",
  "O bairro certo existe.",
  "Aprender no seu ritmo.",
  "Dados que fazem sentido.",
  "Defesa que antecipa.",
  "Proteção sem letra miúda.",
  "Seu pet merece rotina.",
  "Chegar é o mínimo.",
  "Feito à mão, desde 1974.",
  "Torrado ontem, servido hoje.",
  "A causa é sua. O trabalho é nosso.",
  "Sorriso é consequência.",
  "Ir embora também é planejamento.",
];

export const CTAS_BEFORE = [
  "Fale com a gente",
  "Ver cardápio",
  "Simular agora",
  "Agendar consulta",
  "Ver imóveis",
  "Conhecer as turmas",
  "Pedir demonstração",
  "Agendar conversa",
  "Fazer cotação",
  "Assinar plano",
  "Cotar frete",
  "Ver coleção",
  "Ver o menu",
  "Falar com advogado",
  "Marcar avaliação",
  "Montar roteiro",
];

// O estado convergido — o "ótimo estatístico".
export const CONVERGED = {
  headline: "Transforme seu futuro.",
  cta: "COMEÇAR AGORA",
  sub: "Resultados comprovados por dados. Sem compromisso.",
  proof: "+12.000 empresas",
};

// ── CSS do sistema de landing page ───────────────────────────────────────────
// Injetado em toda cena que usa páginas. Seletores de descendente apenas
// (o compilador escopa cada arquivo por data-composition-id; o root usa #root).
export function lpCSS() {
  return `
  .lp {
    position: relative;
    background: ${C.light};
    color: ${C.ink};
    font-family: ${FONT.page};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    /* Variáveis de convergência — animar estas É a convergência. */
    --lp-accent: ${C.purple};
    --lp-radius: 10px;
    --lp-gap: 1;
    --lp-align: left;
    --lp-pad: 1;
  }
  .lp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(22px * var(--lp-pad)) calc(34px * var(--lp-pad));
    border-bottom: 1px solid ${C.line};
    flex: 0 0 auto;
  }
  .lp-brand {
    font-weight: 900;
    letter-spacing: -0.02em;
    font-size: 20px;
    white-space: nowrap;
  }
  .lp-navlinks { display: flex; gap: 20px; }
  .lp-navlink {
    height: 7px; width: 42px; border-radius: 4px;
    background: ${C.line};
  }
  .lp-navcta {
    height: 26px; width: 84px;
    border-radius: var(--lp-radius);
    background: var(--lp-accent);
  }
  .lp-body {
    flex: 1 1 auto;
    display: flex;
    gap: calc(40px * var(--lp-gap));
    padding: calc(44px * var(--lp-pad)) calc(34px * var(--lp-pad));
    align-items: center;
    min-height: 0;
  }
  .lp-copy {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: calc(18px * var(--lp-gap));
    text-align: var(--lp-align);
    align-items: var(--lp-items, flex-start);
    min-width: 0;
  }
  .lp-h {
    font-weight: 900;
    font-size: 44px;
    line-height: 1.02;
    letter-spacing: -0.035em;
    max-width: 15ch;
  }
  .lp-sub {
    font-weight: 400;
    font-size: 17px;
    line-height: 1.45;
    color: ${C.muted};
    max-width: 30ch;
  }
  .lp-cta {
    display: inline-block;
    background: var(--lp-accent);
    color: ${C.light};
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.06em;
    padding: 15px 30px;
    border-radius: var(--lp-radius);
    white-space: nowrap;
    align-self: var(--lp-items, flex-start);
  }
  .lp-proof {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: ${C.muted};
    font-family: ${FONT.sys};
  }
  .lp-dots { display: flex; }
  .lp-dot {
    width: 16px; height: 16px; border-radius: 50%;
    background: ${C.line};
    margin-left: -5px;
    border: 2px solid ${C.light};
  }
  .lp-media {
    flex: 0 0 auto;
    background: linear-gradient(148deg, #f2f2f4 0%, #e6e6ea 100%);
    border-radius: var(--lp-radius);
    position: relative;
    overflow: hidden;
  }
  /* Placeholder editorial abstrato — nunca stock photography. */
  .lp-media::after {
    content: "";
    position: absolute;
    left: 18%; top: 26%; width: 64%; height: 48%;
    border-radius: 6px;
    background: repeating-linear-gradient(
      118deg, ${C.line} 0 9px, #f7f7f9 9px 20px
    );
    opacity: 0.85;
  }
  .lp-media.round { border-radius: 50%; }
  .lp-media.round::after { border-radius: 50%; left: 20%; top: 20%; width: 60%; height: 60%; }
  `;
}

// ── Componente: landing page completa (hero layer, legível) ──────────────────
export function lpFull(o = {}) {
  const {
    id = "",
    brand = "CORVEN",
    headline = CONVERGED.headline,
    sub = CONVERGED.sub,
    cta = CONVERGED.cta,
    proof = CONVERGED.proof,
    mediaW = 300,
    mediaH = 300,
    round = false,
    reverse = false,
    style = "",
    cls = "",
    headId = "",
    ctaId = "",
    mediaId = "",
    navlinks = 3,
  } = o;

  const media = `<div class="lp-media${round ? " round" : ""}"${mediaId ? ` id="${mediaId}"` : ""} style="width:${mediaW}px;height:${mediaH}px"></div>`;
  const copy = `<div class="lp-copy">
        <div class="lp-h"${headId ? ` id="${headId}"` : ""}>${headline}</div>
        <div class="lp-sub">${sub}</div>
        <div class="lp-cta"${ctaId ? ` id="${ctaId}"` : ""}>${cta}</div>
        <div class="lp-proof"><div class="lp-dots">${range(3)
          .map(() => `<div class="lp-dot"></div>`)
          .join("")}</div><span>${proof}</span></div>
      </div>`;

  return `<div class="lp ${cls}"${id ? ` id="${id}"` : ""} style="${style}">
      <div class="lp-nav">
        <div class="lp-brand">${brand}</div>
        <div class="lp-navlinks">${range(navlinks)
          .map(() => `<div class="lp-navlink"></div>`)
          .join("")}<div class="lp-navcta"></div></div>
      </div>
      <div class="lp-body">${reverse ? media + copy : copy + media}</div>
    </div>`;
}

// ── CSS: página simplificada (midground) ─────────────────────────────────────
export function lpSlimCSS() {
  return `
  .slim {
    position: relative;
    width: 100%; height: 100%;
    background: ${C.light};
    overflow: hidden;
    box-sizing: border-box;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    --s-accent: ${C.purple};
    --s-align: flex-start;
  }
  .slim-top {
    display: flex; align-items: center; justify-content: space-between;
    padding-bottom: 10px; border-bottom: 1px solid ${C.line};
    flex: 0 0 auto;
  }
  .slim-brand { height: 9px; width: 54px; border-radius: 3px; background: ${C.ink}; }
  .slim-pill { height: 12px; width: 40px; border-radius: 4px; background: var(--s-accent); }
  .slim-main { flex: 1 1 auto; display: flex; gap: 14px; align-items: center; min-height: 0; }
  .slim-col {
    flex: 1 1 auto; display: flex; flex-direction: column;
    gap: 9px; align-items: var(--s-align); min-width: 0;
  }
  .slim-h { height: 15px; border-radius: 4px; background: ${C.ink}; }
  .slim-t { height: 7px; border-radius: 3px; background: ${C.line}; }
  .slim-btn { height: 22px; width: 74px; border-radius: 6px; background: var(--s-accent); }
  .slim-img {
    flex: 0 0 auto; border-radius: 6px;
    background: linear-gradient(148deg, #f0f0f3 0%, #e3e3e8 100%);
  }
  `;
}

// Página simplificada — 8 elementos, legível como "página" a qualquer distância.
export function lpSlim(o = {}) {
  const { id = "", cls = "", style = "", w = 120, h = 96, hw = [72, 48] } = o;
  return `<div class="slim ${cls}"${id ? ` id="${id}"` : ""} style="${style}">
      <div class="slim-top"><div class="slim-brand"></div><div class="slim-pill"></div></div>
      <div class="slim-main">
        <div class="slim-col">
          <div class="slim-h" style="width:${hw[0]}%"></div>
          <div class="slim-h" style="width:${hw[1]}%"></div>
          <div class="slim-t" style="width:${Math.round(hw[0] * 0.9)}%"></div>
          <div class="slim-t" style="width:${Math.round(hw[1] * 1.1)}%"></div>
          <div class="slim-btn"></div>
        </div>
        <div class="slim-img" style="width:${Math.round(w * 0.3)}px;height:${Math.round(h * 0.5)}px"></div>
      </div>
    </div>`;
}

// Versão runtime do componente simplificado. Cenas com dezenas/centenas de
// instâncias montam o DOM sincronamente no load a partir de um array de
// parâmetros — mesmo resultado, arquivo legível.
export function slimRuntimeJS() {
  return `
          function slimHTML(w, h, a, b) {
            return '<div class="slim">' +
              '<div class="slim-top"><div class="slim-brand"></div><div class="slim-pill"></div></div>' +
              '<div class="slim-main"><div class="slim-col">' +
              '<div class="slim-h" style="width:' + a + '%"></div>' +
              '<div class="slim-h" style="width:' + b + '%"></div>' +
              '<div class="slim-t" style="width:' + Math.round(a * 0.9) + '%"></div>' +
              '<div class="slim-t" style="width:' + Math.round(b * 1.1) + '%"></div>' +
              '<div class="slim-btn"></div></div>' +
              '<div class="slim-img" style="width:' + Math.round(w * 0.3) + 'px;height:' +
              Math.round(h * 0.5) + 'px"></div></div></div>';
          }`;
}

// ── Tile SVG de página (para paredes/cidades tiladas: zero custo de DOM) ─────
// Uma página inteira desenhada em SVG e usada como background-image repetido.
export function pageTileURI({
  accent = C.purple,
  ink = C.ink,
  line = C.line,
  bg = C.light,
  w = 132,
  h = 104,
  gap = 10,
} = {}) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w + gap}" height="${h + gap}" viewBox="0 0 ${w + gap} ${h + gap}">
<rect x="0" y="0" width="${w + gap}" height="${h + gap}" fill="none"/>
<rect x="${gap / 2}" y="${gap / 2}" width="${w}" height="${h}" fill="${bg}"/>
<rect x="${gap / 2 + 9}" y="${gap / 2 + 9}" width="26" height="5" rx="2" fill="${ink}"/>
<rect x="${gap / 2 + w - 36}" y="${gap / 2 + 8}" width="27" height="8" rx="3" fill="${accent}"/>
<rect x="${gap / 2 + 9}" y="${gap / 2 + 23}" width="${w - 18}" height="1" fill="${line}"/>
<rect x="${gap / 2 + 9}" y="${gap / 2 + 34}" width="${Math.round(w * 0.46)}" height="9" rx="3" fill="${ink}"/>
<rect x="${gap / 2 + 9}" y="${gap / 2 + 48}" width="${Math.round(w * 0.3)}" height="9" rx="3" fill="${ink}"/>
<rect x="${gap / 2 + 9}" y="${gap / 2 + 63}" width="${Math.round(w * 0.38)}" height="4" rx="2" fill="${line}"/>
<rect x="${gap / 2 + 9}" y="${gap / 2 + 71}" width="${Math.round(w * 0.28)}" height="4" rx="2" fill="${line}"/>
<rect x="${gap / 2 + 9}" y="${gap / 2 + 82}" width="42" height="13" rx="4" fill="${accent}"/>
<rect x="${gap / 2 + w - 46}" y="${gap / 2 + 34}" width="37" height="46" rx="4" fill="#ecedf0"/>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ── Chrome do sistema (a voz da IA) ──────────────────────────────────────────
export function sysCSS() {
  return `
  .sys {
    font-family: ${FONT.sys};
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 17px;
    color: ${C.cyan};
  }
  .sys-lo { color: #6f6f78; }
  .metric {
    font-family: ${FONT.sys};
    font-variant-numeric: tabular-nums;
    color: ${C.cyan};
    letter-spacing: 0.02em;
  }
  .badge {
    display: inline-flex; align-items: center; gap: 9px;
    font-family: ${FONT.sys}; font-size: 15px; letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${C.cyan};
    border: 1px solid rgba(6,182,212,0.45);
    background: rgba(6,182,212,0.08);
    padding: 7px 13px; border-radius: 4px;
    white-space: nowrap;
  }
  .badge::before {
    content: ""; width: 6px; height: 6px; border-radius: 50%;
    background: ${C.cyan}; flex: 0 0 auto;
  }
  /* A voz do sistema nunca pousa direto sobre a página: ela vive numa lasca
     escura por cima de tudo. É o que a separa do conteúdo — e o que a mantém
     legível sobre qualquer superfície. */
  .chip {
    display: inline-block;
    background: rgba(20,19,24,0.92);
    padding: 9px 15px;
    border-radius: 3px;
    white-space: nowrap;
  }
  `;
}

// Onda de otimização: hairline Purple que atravessa a página.
export function sweepCSS() {
  return `
  .sweep {
    position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(
      100deg,
      rgba(124,58,237,0) 42%,
      rgba(124,58,237,0.55) 49%,
      rgba(255,255,255,0.9) 50%,
      rgba(6,182,212,0.5) 51%,
      rgba(6,182,212,0) 58%
    );
    background-size: 300% 100%;
    background-position: 130% 0;
    mix-blend-mode: screen;
    opacity: 0;
  }
  `;
}

// ── Scaffold de cena (sub-composição) ────────────────────────────────────────
// Regra crítica: o preenchimento full-screen vai num filho full-bleed (.scene),
// nunca no root — o compositor de frames pode descartar o background do root.
export function subComp({ id, duration, css = "", body = "", script = "" }) {
  // O helper de empilhamento só entra nas cenas que trocam estados de texto.
  const helper = script.includes("stack(")
    ? `
          function stack(sel, n, at) {
            for (let i = 0; i < n; i++) gsap.set(sel + i, { autoAlpha: i === 0 ? 1 : 0 });
            for (let i = 1; i < n; i++) {
              tl.set(sel + (i - 1), { autoAlpha: 0 }, at[i]);
              tl.set(sel + i, { autoAlpha: 1 }, at[i]);
            }
          }
`
    : "";
  script = helper + script;
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <template>
      <style>
        #root { position: absolute; inset: 0; overflow: hidden; }
        .scene {
          position: absolute; inset: 0; overflow: hidden;
          background: ${C.void};
        }
        ${css}
      </style>

      <div
        id="root"
        data-composition-id="${id}"
        data-width="1920"
        data-height="1080"
        data-duration="${duration}"
      >
        <div class="scene">
${body}
        </div>
      </div>

      <script>
        (function () {
          window.__timelines = window.__timelines || {};
          const tl = gsap.timeline({ paused: true });
${script}
          window.__timelines["${id}"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
`;
}

// Escritor de câmera 3D — um estado, um escritor (3d-camera-flight).
export function cameraJS(worldSel = "#world") {
  return `
          const world = document.querySelector("${worldSel}");
          const cam = { x: 0, y: 0, z: 0, rx: 0, ry: 0 };
          const drift = { dx: 0, dy: 0, drx: 0 };
          function applyCamera() {
            world.style.transform =
              "translate3d(" + (cam.x + drift.dx) + "px," + (cam.y + drift.dy) + "px," + cam.z + "px)" +
              " rotateX(" + (cam.rx + drift.drx) + "deg) rotateY(" + cam.ry + "deg)";
          }`;
}
