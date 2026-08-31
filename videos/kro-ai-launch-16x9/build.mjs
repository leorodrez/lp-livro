// KRO AI launch film — 16:9, ~29.5s. Re-enquadramento do original 4:5
// (../kro-ai-launch): mesma história, mesma copy, mesmos 29,5s e as mesmas
// sete cenas. Como a altura encolhe (1350 → 1080) e a largura cresce
// (1080 → 1920), toda a grade vertical foi recalculada e a tipografia subiu
// ~1,2x para segurar o quadro largo.
//
// Emits index.html as ONE composition. The five top-level scene divs are the only
// `class="clip"` elements; everything else is a plain descendant. That split is
// deliberate:
//   · a class on a DIRECT child of #root is not scoped by the runtime and renders
//     unstyled, so every top-level layer is addressed by #id;
//   · descendants of a scene div style by class normally, which is what keeps the
//     landing-page markup reusable across the original and the three variants.
// Scene windows overlap by ~0.2s so every seam is a dissolve, never a hard cut.
//
// Re-run with `node build.mjs`.

import { writeFileSync, readFileSync } from "node:fs";

const W = 1920;
const H = 1080;
const FONTS = readFileSync("assets/fonts/fonts.css", "utf8").trim();

// ── brand ────────────────────────────────────────────────────────────────────
const C = {
  purple: "#7C3AED",
  cyan: "#06B6D4",
  dark: "#2B2B2B",
  white: "#FFFFFF",
  beige: "#D8C0A7",
  stage: "#232326", // the film's ground: the brand charcoal, one step deeper
  stage2: "#191A1C",
  ink: "#141416", // landing-page ink
  inkSoft: "#3E434B",
  hair: "#E8EAEE",
  panel: "#F4F6F9",
};

// ── the landing page ─────────────────────────────────────────────────────────
// Authored once at LP_W and only ever transformed, so a "variant" is the same
// object with different copy — never a differently-drawn page.
const LP_W = 880;
// Measured, not assumed: the page renders 2025px tall at LP_W. The 4:5 original
// carried 2260 here, so its pan ran 235px past the page and showed bare ground
// at the bottom of the window; the pan now lands exactly on the page's end.
const LP_FULL_H = 2025;

// Scene 1 shows the page through a window and pans it; scene 2 inherits the hero
// at exactly these coordinates so the dissolve reads as one continuous shot.
// K_HERO magnifies the whole window (crop included), so the page keeps its
// authored 880px design while filling 1200px of the wide frame.
const K_HERO = 1.364;
const VP = { x: 520, y: 247.5, w: LP_W, h: 645 }; // renders 1200x880 at K_HERO

// Variant slots: three cards across, each a crop of the same page.
// The card window is the scene-1 window at a smaller scale — same crop, so the
// variants are unmistakably the page the film opened on.
const WRAP_H = 645;
const CARD_W = 460;
const CARD_SCALE_ = CARD_W / LP_W;
const CARD_H = Math.round(WRAP_H * CARD_SCALE_); // 337
const CARD_Y = 380;
const CARD_X = [150, 730, 1310]; // three across: 460 wide, 120 gutter, 150 margin
const CARD_CX = CARD_X.map((x) => x + CARD_W / 2); // 380, 960, 1540
const CARD_SCALE = CARD_W / LP_W; // 0.5227

// The winner, enlarged — same crop again, just nearer the camera.
// Stays centre-stacked, as in 4:5: A and C linger dimmed at the outer slots,
// so the wide frame is framed by the losers rather than left empty.
const WIN_W = 660;
const WIN_SCALE = WIN_W / LP_W; // 0.75
const WIN_H = Math.round(WRAP_H * WIN_SCALE); // 484
const WIN_X = (W - WIN_W) / 2; // 630
const WIN_Y = 140;
const WIN_PANEL_Y = WIN_Y + WIN_H + 22; // 646

const PANEL_Y = CARD_Y + CARD_H + 18; // 735
const PANEL_H = 224;
const BADGE_W = 280;
const SRC_Y = 194; // bottom of the traffic pill — where the split lines start

// ── copy ─────────────────────────────────────────────────────────────────────
const BRAND = "Fynta";
const V = {
  A: {
    label: "VARIANTE A",
    head: "Verifique qualquer empresa em segundos.",
    sub: "Dados financeiros, societários e de risco, unificados por IA.",
    cta: "Começar grátis",
    visitors: 1284,
    conv: 61,
    rate: 4.75,
  },
  B: {
    label: "VARIANTE B",
    head: "Aprove clientes sem medo de fraude.",
    sub: "Risco, crédito e sócios em um só relatório — em 8 segundos.",
    cta: "Analisar uma empresa",
    visitors: 1196,
    conv: 81,
    rate: 6.77,
  },
  C: {
    label: "VARIANTE C",
    head: "Due diligence que cabe em um clique.",
    sub: "A IA lê os documentos. Você lê a decisão.",
    cta: "Ver demonstração",
    visitors: 1267,
    conv: 69,
    rate: 5.45,
  },
};

// ── timeline (absolute seconds) ──────────────────────────────────────────────
const T = {
  page: [0.0, 4.4],
  stage: [4.2, 20.0],
  brand: [19.8, 23.8],
  value: [23.6, 26.6],
  cta: [26.4, 29.5],
};
const DUR = 29.5;

const nf = (n) => Math.round(n).toLocaleString("en-US").replace(/,/g, ",");

// ── landing-page markup ──────────────────────────────────────────────────────
// `hero` renders the nav + hero block; `full` appends the rest of the page. Both
// share the same source so a variant card is visibly the same design as the page
// the film opened on.
const heroHtml = (v) => `
      <div class="lp-nav">
        <div class="lp-brand"><span class="lp-mark"></span>${BRAND}</div>
        <div class="lp-nav-links">
          <span>Produto</span><span>Soluções</span><span>Preços</span><span>Docs</span>
        </div>
        <div class="lp-nav-actions">
          <span class="lp-nav-ghost">Entrar</span>
          <span class="lp-nav-btn">Começar grátis</span>
        </div>
      </div>
      <div class="lp-hero">
        <div class="lp-eyebrow"><span class="lp-eyebrow-dot"></span>Verificação financeira com IA</div>
        <div class="lp-head">${v.head}</div>
        <div class="lp-sub">${v.sub}</div>
        <div class="lp-cta-row">
          <span class="lp-cta">${v.cta}</span>
          <span class="lp-cta2">Falar com vendas</span>
        </div>
        <div class="lp-dash">
          <div class="lp-dash-bar">
            <span class="lp-dash-dot"></span><span class="lp-dash-dot"></span><span class="lp-dash-dot"></span>
            <span class="lp-dash-title">Relatório · Aurora Log LTDA</span>
            <span class="lp-dash-chip">Aprovado</span>
          </div>
          <div class="lp-dash-body">
            <div class="lp-dash-col">
              <div class="lp-dash-k">Score de risco</div>
              <div class="lp-dash-v">A+</div>
              <div class="lp-dash-meter"><i style="width:82%"></i></div>
            </div>
            <div class="lp-dash-col">
              <div class="lp-dash-k">Receita 12m</div>
              <div class="lp-dash-v">R$ 4,2M</div>
              <div class="lp-dash-meter"><i style="width:64%"></i></div>
            </div>
            <div class="lp-dash-col">
              <div class="lp-dash-k">Sócios</div>
              <div class="lp-dash-v">3</div>
              <div class="lp-dash-meter"><i style="width:38%"></i></div>
            </div>
          </div>
        </div>
      </div>`;

const restHtml = () => `
      <div class="lp-logos">
        <span class="lp-logos-k">Usado por times de risco em</span>
        <div class="lp-logos-row">
          <span class="lp-logo"></span><span class="lp-logo"></span><span class="lp-logo"></span>
          <span class="lp-logo"></span><span class="lp-logo"></span>
        </div>
      </div>
      <div class="lp-sec">
        <div class="lp-sec-k">POR QUE FYNTA</div>
        <div class="lp-sec-h">Menos planilha. Mais decisão.</div>
        <div class="lp-cards">
          <div class="lp-card">
            <span class="lp-card-i"></span>
            <div class="lp-card-h">Consulta unificada</div>
            <div class="lp-card-p">Receita, sócios, processos e restrições em uma chamada só.</div>
          </div>
          <div class="lp-card">
            <span class="lp-card-i"></span>
            <div class="lp-card-h">Score explicável</div>
            <div class="lp-card-p">Cada nota vem com o motivo — auditável do começo ao fim.</div>
          </div>
          <div class="lp-card">
            <span class="lp-card-i"></span>
            <div class="lp-card-h">API em minutos</div>
            <div class="lp-card-p">Uma rota REST, SDKs prontos e sandbox liberado no cadastro.</div>
          </div>
        </div>
      </div>
      <div class="lp-split">
        <div class="lp-split-l">
          <div class="lp-sec-k">FUNCIONALIDADES</div>
          <div class="lp-split-h">A IA lê o documento e devolve o dado estruturado.</div>
          <div class="lp-list">
            <div class="lp-li"><i></i>Extração de balanços e contratos sociais</div>
            <div class="lp-li"><i></i>Monitoramento contínuo de carteira</div>
            <div class="lp-li"><i></i>Alertas de mudança societária</div>
            <div class="lp-li"><i></i>Trilha de auditoria completa</div>
          </div>
        </div>
        <div class="lp-split-r">
          <div class="lp-code">
            <span class="lp-code-l"></span><span class="lp-code-l s"></span><span class="lp-code-l"></span>
            <span class="lp-code-l m"></span><span class="lp-code-l s"></span><span class="lp-code-l"></span>
            <span class="lp-code-l m"></span><span class="lp-code-l"></span>
          </div>
        </div>
      </div>
      <div class="lp-proof">
        <div class="lp-quote">“Cortamos o tempo de análise de crédito de dois dias para dez minutos.”</div>
        <div class="lp-quote-by"><span class="lp-av"></span>Head de Risco · fintech de crédito</div>
        <div class="lp-stats">
          <div class="lp-stat"><b>-93%</b><span>tempo de análise</span></div>
          <div class="lp-stat"><b>12k</b><span>empresas / mês</span></div>
          <div class="lp-stat"><b>99,9%</b><span>uptime</span></div>
        </div>
      </div>
      <div class="lp-final">
        <div class="lp-final-h">Comece a verificar hoje.</div>
        <span class="lp-cta">Criar conta grátis</span>
      </div>`;

const lpCard = (id, v, full) => `      <div class="lp" id="${id}" data-layout-ignore="true">
${heroHtml(v)}${full ? restHtml() : ""}
      </div>`;

// ── metric panel ─────────────────────────────────────────────────────────────
const panelHtml = (k, v) => `      <div class="mp" id="mp-${k}">
        <div class="mp-head"><span class="mp-tag">${v.label}</span><span class="mp-live"></span></div>
        <div class="mp-row"><span class="mp-k">Visitors</span><span class="mp-v" id="n-vis-${k}">0</span></div>
        <div class="mp-row"><span class="mp-k">Conversions</span><span class="mp-v" id="n-cnv-${k}">0</span></div>
        <div class="mp-row mp-rate"><span class="mp-k">Conv. rate</span><span class="mp-r" id="n-rate-${k}">0.00%</span></div>
      </div>`;

// deterministic lateral offset per dot — no Math.random anywhere in the film
const dotJitter = (i) => ((i * 37) % 61) - 30;

const dots = () => {
  let out = "";
  ["A", "B", "C"].forEach((k, ci) => {
    for (let i = 0; i < 11; i++) out += `      <span class="dot" id="dot-${k}${i}"></span>\n`;
  });
  return out;
};

// ═══════════════════════════════════════════════════════════════════════════
const css = `${FONTS}
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:${W}px; height:${H}px; overflow:hidden; background:${C.stage2}; }
body { font-family:'Manrope',sans-serif; -webkit-font-smoothing:antialiased; }

#root { position:relative; width:${W}px; height:${H}px; overflow:hidden; }

/* ── top-level layers: #id only (a class here would not be scoped) ────────── */
#ground {
  position:absolute; inset:0;
  background:
    radial-gradient(1500px 700px at 50% 24%, rgba(124,58,237,0.10), transparent 62%),
    radial-gradient(1300px 620px at 50% 96%, rgba(6,182,212,0.07), transparent 60%),
    linear-gradient(180deg, ${C.stage} 0%, ${C.stage2} 100%);
}
#sc-page, #sc-stage, #sc-brand, #sc-value, #sc-cta { position:absolute; inset:0; }

/* ── the landing page ─────────────────────────────────────────────────────── */
.lp {
  position:absolute; left:0; top:0; width:${LP_W}px;
  background:${C.white}; color:${C.ink};
  border-radius:18px; overflow:hidden;
  font-family:'Manrope',sans-serif;
}
.lp-nav {
  height:78px; padding:0 34px; display:flex; align-items:center; justify-content:space-between;
  border-bottom:1px solid ${C.hair};
}
.lp-brand { display:flex; align-items:center; gap:10px; font-size:25px; font-weight:800; letter-spacing:-0.02em; }
.lp-mark { width:22px; height:22px; border-radius:7px; background:linear-gradient(135deg,${C.purple},${C.cyan}); display:block; }
.lp-nav-links { display:flex; gap:26px; font-size:16px; font-weight:500; color:${C.inkSoft}; }
.lp-nav-actions { display:flex; align-items:center; gap:16px; }
.lp-nav-ghost { font-size:16px; font-weight:600; color:${C.inkSoft}; }
.lp-nav-btn { font-size:15px; font-weight:700; color:${C.white}; background:${C.ink}; border-radius:100px; padding:10px 18px; }

.lp-hero { padding:44px 44px 46px; }
.lp-eyebrow {
  display:inline-flex; align-items:center; gap:9px; font-size:15px; font-weight:700;
  color:#6425C8; background:rgba(124,58,237,0.10); border-radius:100px; padding:8px 16px; letter-spacing:0.01em;
}
.lp-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${C.purple}; }
.lp-head { margin-top:22px; font-size:58px; font-weight:800; line-height:1.06; letter-spacing:-0.03em; max-width:720px; }
.lp-sub { margin-top:18px; font-size:22px; font-weight:500; line-height:1.45; color:${C.inkSoft}; max-width:640px; }
.lp-cta-row { margin-top:28px; display:flex; align-items:center; gap:18px; }
.lp-cta {
  display:inline-flex; align-items:center; height:56px; padding:0 30px; border-radius:100px;
  background:${C.ink}; color:${C.white}; font-size:19px; font-weight:700;
}
.lp-cta2 { font-size:19px; font-weight:600; color:${C.inkSoft}; }
.lp-dash {
  margin-top:36px; border:1px solid ${C.hair}; border-radius:14px; background:${C.panel}; overflow:hidden;
}
.lp-dash-bar {
  height:46px; display:flex; align-items:center; gap:8px; padding:0 18px;
  border-bottom:1px solid ${C.hair}; background:${C.white};
}
.lp-dash-dot { width:9px; height:9px; border-radius:50%; background:#D9DEE6; }
.lp-dash-title { margin-left:12px; font-size:14px; font-weight:600; color:${C.inkSoft}; }
.lp-dash-chip {
  margin-left:auto; font-size:12px; font-weight:800; letter-spacing:0.06em;
  color:#08644A; background:rgba(16,185,129,0.14); border-radius:100px; padding:6px 12px;
}
.lp-dash-body { display:flex; gap:16px; padding:20px 18px; }
.lp-dash-col { flex:1; }
.lp-dash-k { font-size:13px; font-weight:600; color:${C.inkSoft}; }
.lp-dash-v { margin-top:6px; font-size:28px; font-weight:800; letter-spacing:-0.02em; }
.lp-dash-meter { margin-top:10px; height:6px; border-radius:4px; background:#E3E8EF; overflow:hidden; }
.lp-dash-meter i { display:block; height:100%; border-radius:4px; background:linear-gradient(90deg,${C.purple},${C.cyan}); }

.lp-logos { padding:26px 44px; border-top:1px solid ${C.hair}; border-bottom:1px solid ${C.hair}; display:flex; align-items:center; gap:28px; }
.lp-logos-k { font-size:14px; font-weight:600; color:#6B727D; white-space:nowrap; }
.lp-logos-row { display:flex; gap:22px; flex:1; }
.lp-logo { flex:1; height:20px; border-radius:5px; background:#E4E8EE; }

.lp-sec { padding:42px 44px; }
.lp-sec-k { font-size:13px; font-weight:800; letter-spacing:0.14em; color:#6425C8; }
.lp-sec-h { margin-top:12px; font-size:38px; font-weight:800; letter-spacing:-0.025em; }
.lp-cards { margin-top:26px; display:flex; gap:16px; }
.lp-card { flex:1; border:1px solid ${C.hair}; border-radius:14px; padding:22px; background:${C.white}; }
.lp-card-i { display:block; width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg,rgba(124,58,237,0.16),rgba(6,182,212,0.16)); }
.lp-card-h { margin-top:16px; font-size:20px; font-weight:800; letter-spacing:-0.02em; }
.lp-card-p { margin-top:8px; font-size:15px; font-weight:500; line-height:1.5; color:${C.inkSoft}; }

.lp-split { padding:42px 44px; display:flex; gap:32px; background:${C.panel}; border-top:1px solid ${C.hair}; }
.lp-split-l { flex:1.1; }
.lp-split-h { margin-top:12px; font-size:32px; font-weight:800; line-height:1.15; letter-spacing:-0.025em; }
.lp-list { margin-top:22px; display:flex; flex-direction:column; gap:14px; }
.lp-li { display:flex; align-items:center; gap:12px; font-size:16px; font-weight:600; color:${C.inkSoft}; }
.lp-li i { width:18px; height:18px; border-radius:50%; background:rgba(6,182,212,0.18); border:2px solid ${C.cyan}; flex:none; }
.lp-split-r { flex:0.9; }
.lp-code { background:${C.ink}; border-radius:14px; padding:22px; display:flex; flex-direction:column; gap:12px; height:100%; }
.lp-code-l { height:10px; border-radius:5px; background:rgba(255,255,255,0.15); width:88%; }
.lp-code-l.s { width:54%; background:rgba(6,182,212,0.42); }
.lp-code-l.m { width:70%; background:rgba(124,58,237,0.42); }

.lp-proof { padding:42px 44px; }
.lp-quote { font-size:30px; font-weight:700; line-height:1.3; letter-spacing:-0.02em; max-width:700px; }
.lp-quote-by { margin-top:18px; display:flex; align-items:center; gap:12px; font-size:15px; font-weight:600; color:${C.inkSoft}; }
.lp-av { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,${C.purple},${C.cyan}); }
.lp-stats { margin-top:30px; display:flex; gap:16px; }
.lp-stat { flex:1; border:1px solid ${C.hair}; border-radius:14px; padding:20px; }
.lp-stat b { display:block; font-size:32px; font-weight:800; letter-spacing:-0.02em; }
.lp-stat span { display:block; margin-top:4px; font-size:14px; font-weight:600; color:${C.inkSoft}; }

.lp-final { padding:44px; background:${C.ink}; color:${C.white}; display:flex; align-items:center; justify-content:space-between; gap:24px; }
.lp-final-h { font-size:34px; font-weight:800; letter-spacing:-0.025em; }
.lp-final .lp-cta { background:linear-gradient(135deg,${C.purple},${C.cyan}); }

/* ── scene 1: the page in its window ──────────────────────────────────────── */
#vp {
  position:absolute; left:${VP.x}px; top:${VP.y}px; width:${VP.w}px; height:${VP.h}px;
  border-radius:18px; overflow:hidden;
  box-shadow:0 40px 90px rgba(0,0,0,0.42);
}
#page-eyebrow {
  position:absolute; left:0; width:${W}px; top:62px; text-align:center;
  font-size:19px; font-weight:700; letter-spacing:0.16em; color:rgba(255,255,255,0.66);
}

/* ── scene 2-4: the stage ─────────────────────────────────────────────────── */
.card-wrap {
  position:absolute; left:0; top:0; width:${LP_W}px; height:${WRAP_H}px;
  border-radius:18px; overflow:hidden;
  box-shadow:0 30px 70px rgba(0,0,0,0.40);
  transform-origin:0 0;
}
#stage-eyebrow {
  position:absolute; left:0; width:${W}px; top:96px; text-align:center;
  font-size:18px; font-weight:800; letter-spacing:0.18em; color:rgba(255,255,255,0.5);
}
#src-pill {
  position:absolute; left:${W / 2 - 105}px; top:144px; width:210px; height:50px; border-radius:100px;
  border:1px solid rgba(255,255,255,0.16); background:rgba(255,255,255,0.05);
  display:flex; align-items:center; justify-content:center; gap:11px;
  font-size:17px; font-weight:700; color:rgba(255,255,255,0.86); letter-spacing:0.02em;
}
#src-pill span { width:9px; height:9px; border-radius:50%; background:${C.cyan}; }
.link { position:absolute; height:2px; transform-origin:0 50%; border-radius:2px;
  background:linear-gradient(90deg, rgba(124,58,237,0.9), rgba(6,182,212,0.9)); }
.dot { position:absolute; width:7px; height:7px; border-radius:50%; background:${C.cyan}; box-shadow:0 0 10px rgba(6,182,212,0.7); }

.mp {
  position:absolute; top:${PANEL_Y}px; width:${CARD_W}px; height:${PANEL_H}px;
  border:1px solid rgba(255,255,255,0.10); border-radius:16px;
  background:rgba(255,255,255,0.045); padding:18px 22px;
}
.mp-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.mp-tag { font-size:14px; font-weight:800; letter-spacing:0.12em; color:rgba(255,255,255,0.62); }
.mp-live { width:7px; height:7px; border-radius:50%; background:${C.cyan}; }
.mp-row { display:flex; align-items:baseline; justify-content:space-between; padding:9px 0; border-top:1px solid rgba(255,255,255,0.08); }
.mp-k { font-size:15px; font-weight:600; color:rgba(255,255,255,0.5); }
.mp-v { font-size:22px; font-weight:700; color:${C.white}; font-variant-numeric:tabular-nums; }
.mp-r { font-size:30px; font-weight:800; color:${C.cyan}; font-variant-numeric:tabular-nums; letter-spacing:-0.01em; }
.mp-rate { padding-top:10px; }

#win-ring {
  position:absolute; border-radius:26px; padding:4px;
  background:linear-gradient(135deg,${C.purple},${C.cyan});
  box-shadow:0 0 0 1px rgba(124,58,237,0.28), 0 24px 70px rgba(6,182,212,0.20);
}
#win-ring i { display:block; width:100%; height:100%; border-radius:22px; background:${C.stage}; }
#win-badge {
  position:absolute; height:54px; border-radius:100px; padding:0 30px;
  background:linear-gradient(135deg,${C.purple},${C.cyan}); color:${C.white};
  font-size:19px; font-weight:800; letter-spacing:0.16em;
  display:flex; align-items:center; justify-content:center; white-space:nowrap;
}
#win-metric {
  position:absolute; left:0; width:${W}px; text-align:center;
  font-family:'Sora',sans-serif; font-size:62px; font-weight:800; letter-spacing:-0.03em; color:${C.white};
}
#win-metric-k {
  position:absolute; left:0; width:${W}px; text-align:center;
  font-size:19px; font-weight:600; color:rgba(255,255,255,0.55);
}

/* ── scenes 5-7: the brand ────────────────────────────────────────────────── */
.kro { font-family:'Sora',sans-serif; font-weight:800; letter-spacing:-0.02em; color:${C.white}; }
#brand-mark, #value-mark, #cta-mark {
  position:absolute; left:0; width:${W}px; text-align:center;
  font-family:'Sora',sans-serif; font-size:40px; font-weight:800; letter-spacing:0.02em; color:${C.white};
}
#brand-mark i, #value-mark i, #cta-mark i {
  display:inline-block; width:13px; height:13px; border-radius:4px; margin-right:12px;
  background:linear-gradient(135deg,${C.purple},${C.cyan}); vertical-align:middle;
}
#brand-l1, #brand-l2 {
  position:absolute; left:0; width:${W}px; text-align:center;
  font-family:'Sora',sans-serif; color:${C.white};
}
#brand-l1 { top:430px; font-size:78px; font-weight:800; line-height:1.12; letter-spacing:-0.035em; }
#brand-l2 { top:700px; font-size:32px; font-weight:400; line-height:1.5; letter-spacing:-0.01em; color:rgba(255,255,255,0.62); }

#value-h {
  position:absolute; left:0; width:${W}px; top:360px; text-align:center;
  font-family:'Sora',sans-serif; font-size:68px; font-weight:800; line-height:1.12; letter-spacing:-0.035em; color:${C.white};
}
#value-s {
  position:absolute; left:0; width:${W}px; top:590px; text-align:center;
  font-size:30px; font-weight:500; color:rgba(255,255,255,0.6);
}
.flow-node {
  position:absolute; top:750px; height:84px; border-radius:18px;
  border:1px solid rgba(255,255,255,0.13); background:rgba(255,255,255,0.05);
  display:flex; align-items:center; justify-content:center;
  font-size:19px; font-weight:700; color:rgba(255,255,255,0.9);
}
.flow-arrow { position:absolute; top:791px; height:2px; border-radius:2px; background:rgba(255,255,255,0.22); }

#cta-h {
  position:absolute; left:0; width:${W}px; top:350px; text-align:center;
  font-family:'Sora',sans-serif; font-size:72px; font-weight:800; line-height:1.1; letter-spacing:-0.035em; color:${C.white};
}
#cta-btn {
  position:absolute; left:${(W - 560) / 2}px; top:610px; width:560px; height:108px; border-radius:100px;
  background:linear-gradient(135deg,${C.purple},${C.cyan});
  display:flex; align-items:center; justify-content:center;
  font-family:'Sora',sans-serif; font-size:33px; font-weight:800; color:${C.white}; letter-spacing:-0.01em;
}
#cta-micro {
  position:absolute; left:0; width:${W}px; top:762px; text-align:center;
  font-size:23px; font-weight:600; color:rgba(255,255,255,0.5);
}
#cta-url {
  position:absolute; left:0; width:${W}px; top:980px; text-align:center;
  font-size:24px; font-weight:700; letter-spacing:0.1em; color:rgba(255,255,255,0.42);
}
`;

// ═══════════════════════════════════════════════════════════════════════════
const body = `      <div id="ground" class="clip" data-start="0" data-duration="${DUR}" data-track-index="0"></div>

      <div id="sc-page" class="clip" data-layout-allow-overlap="true" data-start="${T.page[0]}" data-duration="${T.page[1] - T.page[0]}" data-track-index="1">
        <div id="page-eyebrow">UMA LANDING PAGE. UMA SÓ VERSÃO.</div>
        <div id="vp">
${lpCard("lp-full", V.A, true)}
        </div>
      </div>

      <div id="sc-stage" class="clip" data-layout-allow-overlap="true" data-start="${T.stage[0]}" data-duration="${T.stage[1] - T.stage[0]}" data-track-index="2">
        <div id="stage-eyebrow">TESTE A/B EM EXECUÇÃO</div>
        <div id="src-pill"><span></span>Tráfego</div>
        <div class="link" id="link-A"></div>
        <div class="link" id="link-B"></div>
        <div class="link" id="link-C"></div>
        <div class="card-wrap" id="cw-A">${lpCard("lp-A", V.A, true)}</div>
        <div class="card-wrap" id="cw-C">${lpCard("lp-C", V.C, true)}</div>
        <div id="win-ring"><i></i></div>
        <div class="card-wrap" id="cw-B">${lpCard("lp-B", V.B, true)}</div>
${panelHtml("A", V.A)}
${panelHtml("B", V.B)}
${panelHtml("C", V.C)}
${dots()}        <div id="win-badge">VERSÃO CAMPEÃ</div>
        <div id="win-metric">+42%</div>
        <div id="win-metric-k">de taxa de conversão vs. variante A</div>
      </div>

      <div id="sc-brand" class="clip" data-start="${T.brand[0]}" data-duration="${T.brand[1] - T.brand[0]}" data-track-index="3">
        <div id="brand-mark"><i></i>KRO AI</div>
        <div id="brand-l1">A melhor versão da<br/>sua página já existe.</div>
        <div id="brand-l2">Nós ajudamos ela a nascer<br/>para aumentar suas conversões.</div>
      </div>

      <div id="sc-value" class="clip" data-start="${T.value[0]}" data-duration="${T.value[1] - T.value[0]}" data-track-index="4">
        <div id="value-mark"><i></i>KRO AI</div>
        <div id="value-h">Automatize seus<br/>testes A/B.</div>
        <div id="value-s">Encontre a versão campeã da sua página.</div>
        <div class="flow-node" id="fn-0">Página</div>
        <div class="flow-node" id="fn-1">Variantes</div>
        <div class="flow-node" id="fn-2">Teste</div>
        <div class="flow-node" id="fn-3">Campeã</div>
        <div class="flow-arrow" id="fa-0"></div>
        <div class="flow-arrow" id="fa-1"></div>
        <div class="flow-arrow" id="fa-2"></div>
      </div>

      <div id="sc-cta" class="clip" data-start="${T.cta[0]}" data-duration="${T.cta[1] - T.cta[0]}" data-track-index="5">
        <div id="cta-mark"><i></i>KRO AI</div>
        <div id="cta-h">Teste gratuitamente<br/>por 14 dias.</div>
        <div id="cta-btn">Começar teste grátis</div>
        <div id="cta-micro">Comece agora. Sem risco.</div>
        <div id="cta-url">USEKRO.AI</div>
      </div>`;

// ═══════════════════════════════════════════════════════════════════════════
const script = `
      window.__timelines = window.__timelines || {};
      var tl = gsap.timeline({ paused: true });
      var K = ["A", "B", "C"];
      var CARD_X = ${JSON.stringify(CARD_X)}, CARD_CX = ${JSON.stringify(CARD_CX)};

      function fmt(n) { return Math.round(n).toLocaleString("en-US"); }
      function pct(n) { return n.toFixed(2) + "%"; }

      // ── SCENE 1 · the page ────────────────────────────────────────────────
      // Open on one real page. Pan it once so the viewer registers "this is a
      // whole site", then come back to the hero — the hero is what multiplies.
      gsap.set("#vp", { transformOrigin: "50% 50%" });
      gsap.set("#lp-full", { y: 0 });
      tl.fromTo("#vp", { opacity: 0, y: 54, scale: ${(K_HERO * 0.965).toFixed(4)} },
        { opacity: 1, y: 0, scale: ${K_HERO}, duration: 0.72, ease: "power3.out" }, 0.05);
      tl.fromTo("#page-eyebrow", { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.35);
      tl.to("#lp-full", { y: -${LP_FULL_H - VP.h}, duration: 1.5, ease: "power2.inOut" }, 1.25);
      tl.to("#lp-full", { y: 0, duration: 1.0, ease: "power3.inOut" }, 2.95);
      tl.to("#page-eyebrow", { opacity: 0, duration: 0.3, ease: "power2.in" }, 3.9);
      tl.set("#page-eyebrow", { opacity: 0 }, 4.2);
      tl.to("#sc-page", { opacity: 0, filter: "blur(9px)", duration: 0.32, ease: "power2.in" }, 4.08);
      tl.set("#sc-page", { opacity: 0 }, 4.4);

      // ── SCENE 2 · the variants are born ───────────────────────────────────
      // The hero card enters at exactly the window's coordinates, so the dissolve
      // out of scene 1 reads as the same object, not a new one.
      var HERO_TOP = ${VP.y}, HERO_LEFT = ${VP.x};
      gsap.set(["#cw-A", "#cw-B", "#cw-C"], { x: HERO_LEFT, y: HERO_TOP, scale: ${K_HERO} });
      gsap.set(["#cw-B", "#cw-C"], { autoAlpha: 0 });
      gsap.set("#sc-stage", { opacity: 0 });
      gsap.set(["#stage-eyebrow", "#src-pill"], { opacity: 0 });
      gsap.set([".link"], { opacity: 0, scaleX: 0 });
      gsap.set([".mp"], { opacity: 0, y: 18 });
      gsap.set([".dot"], { opacity: 0 });
      gsap.set(["#win-ring", "#win-badge", "#win-metric", "#win-metric-k"], { opacity: 0 });
      gsap.set("#win-ring", {
        x: ${WIN_X - 4}, y: ${WIN_Y - 4},
        width: ${WIN_W + 8}, height: ${WIN_H + 8}, scale: 0.97, transformOrigin: "50% 50%"
      });
      gsap.set("#win-badge", { x: ${(W - BADGE_W) / 2}, y: ${WIN_Y - 72}, width: ${BADGE_W}, scale: 0.8, transformOrigin: "50% 50%" });
      gsap.set("#win-metric", { y: ${WIN_PANEL_Y + PANEL_H + 24} });
      gsap.set("#win-metric-k", { y: ${WIN_PANEL_Y + PANEL_H + 110} });

      tl.to("#sc-stage", { opacity: 1, duration: 0.3, ease: "power2.out" }, ${T.stage[0]});

      // a short push-in on the hero before it divides — the camera picks the
      // subject before the mechanism acts on it
      tl.to("#cw-A", { scale: ${(K_HERO * 1.05).toFixed(4)}, x: HERO_LEFT - 30, y: HERO_TOP - 22, duration: 0.6, ease: "power2.inOut" }, 4.45);

      // A travels to its slot; B and C are still stacked underneath it
      var slotY = ${CARD_Y}, s = ${CARD_SCALE};
      tl.to("#cw-A", { x: CARD_X[0], y: slotY, scale: s, duration: 1.0, ease: "power3.inOut" }, 5.15);
      tl.to("#cw-B", { x: CARD_X[1], y: slotY, scale: s, duration: 1.0, ease: "power3.inOut" }, 5.35);
      tl.to("#cw-C", { x: CARD_X[2], y: slotY, scale: s, duration: 1.0, ease: "power3.inOut" }, 5.35);
      // they emerge FROM A rather than appearing beside it
      tl.to("#cw-B", { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 5.5);
      tl.to("#cw-C", { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 5.62);

      // the split lines make the parentage explicit
      var srcY = ${SRC_Y};
      [0, 1, 2].forEach(function (i) {
        var el = "#link-" + K[i];
        var dx = CARD_CX[i] - ${W / 2}, dy = slotY - srcY;
        var len = Math.sqrt(dx * dx + dy * dy);
        var ang = Math.atan2(dy, dx) * 180 / Math.PI;
        gsap.set(el, { x: ${W / 2}, y: srcY, width: len, rotation: ang, transformOrigin: "0 50%" });
        tl.to(el, { opacity: 0.85, scaleX: 1, duration: 0.5, ease: "power2.out" }, 5.7 + i * 0.07);
        tl.to(el, { opacity: 0.18, duration: 0.5, ease: "power2.inOut" }, 7.0);
      });

      tl.to("#stage-eyebrow", { opacity: 1, duration: 0.4, ease: "power2.out" }, 6.5);
      tl.to("#src-pill", { opacity: 1, duration: 0.4, ease: "power2.out" }, 6.6);

      // ── SCENE 3 · the test runs ───────────────────────────────────────────
      K.forEach(function (k, i) {
        gsap.set("#mp-" + k, { x: CARD_X[i] });
        tl.to("#mp-" + k, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 7.3 + i * 0.1);
      });

      // traffic: dots leave the source and land on each card. Their lateral
      // spread is index-derived, never random — the render must be reproducible.
      K.forEach(function (k, ci) {
        for (var i = 0; i < 11; i++) {
          var el = "#dot-" + k + i;
          var jx = ((i * 37) % 61) - 30;
          var at = 8.5 + i * 0.34 + ci * 0.11;
          gsap.set(el, { x: ${W / 2} - 3, y: ${SRC_Y - 4} });
          tl.fromTo(el, { opacity: 0, x: ${W / 2} - 3, y: ${SRC_Y - 4} },
            { opacity: 1, duration: 0.16, ease: "power1.out" }, at);
          tl.to(el, {
            x: CARD_CX[ci] - 3 + jx, y: slotY + 26,
            duration: 0.78, ease: "power2.inOut"
          }, at);
          tl.to(el, { opacity: 0, duration: 0.22, ease: "power2.in" }, at + 0.66);
        }
      });

      // counters. Visitors and conversions rise together; the rate is tweened on
      // its own curve so B visibly overtakes C partway, instead of simply ending
      // higher — the overtake is what sells "the winner isn't the biggest crowd".
      var VIS = { A: ${V.A.visitors}, B: ${V.B.visitors}, C: ${V.C.visitors} };
      var CNV = { A: ${V.A.conv}, B: ${V.B.conv}, C: ${V.C.conv} };
      var RATE = { A: ${V.A.rate}, B: ${V.B.rate}, C: ${V.C.rate} };
      var REASE = { A: "power2.out", B: "power1.in", C: "power2.out" };
      K.forEach(function (k) {
        var pv = { v: 0 }, pc = { v: 0 }, pr = { v: 0 };
        tl.to(pv, { v: VIS[k], duration: 4.6, ease: "power1.out",
          onUpdate: function () { document.getElementById("n-vis-" + k).textContent = fmt(pv.v); } }, 8.7);
        tl.to(pc, { v: CNV[k], duration: 4.6, ease: "power1.out",
          onUpdate: function () { document.getElementById("n-cnv-" + k).textContent = fmt(pc.v); } }, 8.7);
        tl.to(pr, { v: RATE[k], duration: 4.4, ease: REASE[k],
          onUpdate: function () { document.getElementById("n-rate-" + k).textContent = pct(pr.v); } }, 8.9);
      });

      // ── SCENE 4 · the winner ──────────────────────────────────────────────
      // A and C recede — dimmed, blurred, slightly smaller. B is not "celebrated";
      // it is simply the one left in focus, which is what a result feels like.
      tl.to(["#cw-A", "#cw-C"], { autoAlpha: 0.18, filter: "blur(5px)", duration: 0.7, ease: "power2.inOut" }, 14.5);
      tl.to(["#mp-A", "#mp-C"], { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, 14.5);
      tl.to(["#link-A", "#link-C"], { opacity: 0.05, duration: 0.6, ease: "power2.inOut" }, 14.5);
      tl.to("#link-B", { opacity: 0.5, duration: 0.6, ease: "power2.inOut" }, 14.5);
      tl.to("#stage-eyebrow", { opacity: 0, duration: 0.4, ease: "power2.in" }, 14.4);
      tl.to("#src-pill", { opacity: 0, duration: 0.4, ease: "power2.in" }, 14.4);

      // B grows into the frame's centre
      tl.to("#cw-B", { x: ${WIN_X}, y: ${WIN_Y}, scale: ${WIN_SCALE}, duration: 1.0, ease: "power3.inOut" }, 14.8);
      tl.to("#mp-B", { x: ${(W - CARD_W) / 2}, y: ${WIN_PANEL_Y - PANEL_Y}, duration: 1.0, ease: "power3.inOut" }, 14.8);

      tl.to("#win-ring", { opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" }, 15.5);
      tl.to("#win-badge", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.1)" }, 15.95);

      var wm = { v: 0 };
      tl.to("#win-metric", { opacity: 1, duration: 0.4, ease: "power2.out" }, 16.5);
      tl.to(wm, { v: 42, duration: 0.85, ease: "power2.out",
        onUpdate: function () { document.getElementById("win-metric").textContent = "+" + Math.round(wm.v) + "%"; } }, 16.5);
      tl.to("#win-metric-k", { opacity: 1, duration: 0.4, ease: "power2.out" }, 17.05);

      // the whole stage converges and blurs away — the interface becomes the brand
      tl.to("#sc-stage", { opacity: 0, scale: 1.08, filter: "blur(14px)", duration: 0.75, ease: "power2.in" }, 19.25);
      tl.set("#sc-stage", { opacity: 0 }, 20.0);
      gsap.set("#sc-stage", { transformOrigin: "50% 46%" });

      // ── SCENE 5 · the brand ───────────────────────────────────────────────
      gsap.set("#sc-brand", { opacity: 0 });
      gsap.set("#brand-mark", { y: 268 });
      gsap.set(["#brand-mark", "#brand-l1", "#brand-l2"], { opacity: 0 });
      tl.to("#sc-brand", { opacity: 1, duration: 0.5, ease: "power2.out" }, ${T.brand[0]});
      tl.fromTo("#brand-mark", { y: 284 }, { opacity: 1, y: 268, duration: 0.6, ease: "power3.out" }, 20.15);
      tl.fromTo("#brand-l1", { y: 34, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out" }, 20.6);
      tl.fromTo("#brand-l2", { y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 21.5);
      tl.to("#sc-brand", { opacity: 0, filter: "blur(10px)", duration: 0.4, ease: "power2.in" }, 23.4);
      tl.set("#sc-brand", { opacity: 0 }, 23.8);

      // ── SCENE 6 · what the product does ───────────────────────────────────
      gsap.set("#sc-value", { opacity: 0 });
      gsap.set("#value-mark", { y: 240 });
      gsap.set(["#value-mark", "#value-h", "#value-s"], { opacity: 0 });
      var FW = 300, FGAP = 40, FTOT = FW * 4 + FGAP * 3, FX0 = (${W} - FTOT) / 2;
      [0, 1, 2, 3].forEach(function (i) {
        gsap.set("#fn-" + i, { x: FX0 + i * (FW + FGAP), width: FW, opacity: 0, y: 14 });
      });
      [0, 1, 2].forEach(function (i) {
        gsap.set("#fa-" + i, { x: FX0 + FW + i * (FW + FGAP) + 4, width: FGAP - 8, opacity: 0 });
      });
      tl.to("#sc-value", { opacity: 1, duration: 0.45, ease: "power2.out" }, ${T.value[0]});
      tl.fromTo("#value-mark", { y: 256 }, { opacity: 1, y: 240, duration: 0.5, ease: "power3.out" }, 23.85);
      tl.fromTo("#value-h", { y: 28, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 24.0);
      tl.fromTo("#value-s", { y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 24.45);
      // the four steps light up in order — the product's loop, stated once
      [0, 1, 2, 3].forEach(function (i) {
        tl.to("#fn-" + i, { opacity: 1, y: 0, duration: 0.34, ease: "power3.out" }, 24.85 + i * 0.24);
        if (i < 3) tl.to("#fa-" + i, { opacity: 1, duration: 0.22, ease: "power2.out" }, 25.05 + i * 0.24);
      });
      tl.to("#fn-3", { borderColor: "rgba(6,182,212,0.75)", backgroundColor: "rgba(6,182,212,0.14)", duration: 0.4, ease: "power2.out" }, 25.62);
      tl.to("#sc-value", { opacity: 0, filter: "blur(10px)", duration: 0.35, ease: "power2.in" }, 26.2);
      tl.set("#sc-value", { opacity: 0 }, 26.6);

      // ── SCENE 7 · the ask ─────────────────────────────────────────────────
      gsap.set("#sc-cta", { opacity: 0 });
      gsap.set("#cta-mark", { y: 220 });
      gsap.set(["#cta-mark", "#cta-h", "#cta-btn", "#cta-micro", "#cta-url"], { opacity: 0 });
      gsap.set("#cta-btn", { scale: 0.93, transformOrigin: "50% 50%" });
      tl.to("#sc-cta", { opacity: 1, duration: 0.45, ease: "power2.out" }, ${T.cta[0]});
      tl.fromTo("#cta-mark", { y: 236 }, { opacity: 1, y: 220, duration: 0.5, ease: "power3.out" }, 26.65);
      tl.fromTo("#cta-h", { y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.72, ease: "power3.out" }, 26.85);
      tl.to("#cta-btn", { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.9)" }, 27.5);
      tl.fromTo("#cta-micro", { y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 27.95);
      tl.fromTo("#cta-url", { y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 28.15);
      // one restrained pulse on the button, then stillness — the last thing the
      // eye catches is the action, and it is not asking twice
      tl.to("#cta-btn", { scale: 1.035, duration: 0.3, ease: "power2.out" }, 28.55);
      tl.to("#cta-btn", { scale: 1, duration: 0.42, ease: "power2.inOut" }, 28.87);

      window.__timelines["main"] = tl;`;

const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <script src="assets/vendor/gsap.min.js"><\/script>
    <style>
${css}    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DUR}" data-width="${W}" data-height="${H}">
${body}
    </div>
    <script>
${script}
    <\/script>
  </body>
</html>
`;

writeFileSync("index.html", html);
console.log(`✓ index.html — ${W}x${H}, ${DUR}s`);
