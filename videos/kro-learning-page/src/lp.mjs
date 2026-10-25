import { BRAND, HEADLINES } from "./tokens.mjs";

// The Vértice landing page — ONE structural component, instanced.
// Authored at 1280×760 and placed in the world by transform only, so every
// instance is provably the same object at a different depth.
export const PAGE_W = 1280;
export const PAGE_H = 700;

const NAV = ["Produto", "Soluções", "Preços", "Clientes"];

const BENEFITS = [
  ["Financeiro unificado", "Contas, notas e conciliação em um lugar só."],
  ["Equipe sem planilhas", "Escalas, aprovações e registros no mesmo fluxo."],
  ["Relatórios em tempo real", "O número certo na hora da decisão."],
];

const PROOF_LOGOS = ["NORTE", "CALDAS & CO", "ORVIA", "PAULISTA"];

const OPS_ROWS = [
  ["Fechamento de julho", "em dia", 86],
  ["Conciliação bancária", "em dia", 72],
  ["Aprovações pendentes", "3 itens", 41],
];

/**
 * @param {object} o
 * @param {string} o.id            unique dom id prefix
 * @param {string} [o.headline]    which message this instance is carrying
 * @param {string} [o.cta]         cta label (the loop experiments on it too)
 * @param {string} [o.benefit]     first benefit title (loop experiments on it)
 * @param {string} [o.proof]       proof line (loop experiments on it)
 * @param {boolean} [o.split]      wrap headline glyphs for masked replacement
 */
export function page(o) {
  return mark(buildPage(o));
}

// The Vértice page is a DEPICTED OBJECT: several opaque instances of it are
// stacked in depth on purpose, so the layout auditor's box-vs-box overlap test
// reports collisions between instances it cannot know are hidden behind an
// opaque card. Mark the mock page's own text as intentional layering; every
// piece of the FILM's typography stays auditable.
const mark = (html) =>
  html.replace(/<(span|p|h1|i|div|nav|section)\b/g, '<$1 data-layout-allow-overlap="true"');

function buildPage(o) {
  const id = o.id;
  const headline = o.headline ?? HEADLINES.v1;
  const cta = o.cta ?? "Começar agora";
  const benefit = o.benefit ?? BENEFITS[0][0];
  const proof = o.proof ?? "Mais de 2.400 empresas já operam no Vértice";
  return `
<div class="page" id="${id}">
  <div class="page-ground" data-layout-ignore="true"></div>
  <nav class="lp-nav">
    <div class="lp-mark"><span class="lp-mark-dot"></span>${BRAND}</div>
    <div class="lp-links">${NAV.map((n) => `<span>${n}</span>`).join("")}</div>
    <div class="lp-nav-right"><span class="lp-signin">Entrar</span><span class="lp-nav-cta">${cta}</span></div>
  </nav>

  <section class="lp-hero">
    <div class="lp-hero-left">
      <div class="lp-eyebrow">Plataforma de gestão</div>
      <h1 class="lp-headline" id="${id}-headline"><span class="lp-headline-text" id="${id}-headline-text">${headline}</span></h1>
      <p class="lp-sub">Financeiro, equipe e operação da sua empresa no mesmo lugar — sem trocar de sistema no meio do dia.</p>
      <div class="lp-cta-row" id="${id}-cta">
        <span class="lp-cta-primary" id="${id}-cta-primary">${cta}</span>
        <span class="lp-cta-ghost">Falar com vendas</span>
      </div>
    </div>
    <div class="lp-hero-right">
      <div class="lp-ops">
        <div class="lp-ops-head"><span>Operação · hoje</span><span class="lp-ops-chip">tudo certo</span></div>
        ${OPS_ROWS.map(
          ([label, state, pct]) => `
        <div class="lp-ops-row">
          <div class="lp-ops-row-top"><span>${label}</span><span class="lp-ops-state">${state}</span></div>
          <div class="lp-ops-bar"><i style="width:${pct}%"></i></div>
        </div>`,
        ).join("")}
        <div class="lp-ops-foot"><span>Próximo vencimento</span><span>12 ago</span></div>
      </div>
    </div>
  </section>

  <div class="lp-rule"></div>

  <section class="lp-benefits" id="${id}-benefits">
    ${BENEFITS.map(
      ([t, d], i) => `
    <div class="lp-benefit">
      <span class="lp-benefit-mark"></span>
      <div class="lp-benefit-title"${i === 0 ? ` id="${id}-benefit-title"` : ""}>${i === 0 ? benefit : t}</div>
      <div class="lp-benefit-desc">${d}</div>
    </div>`,
    ).join("")}
  </section>

  <div class="lp-rule"></div>

  <section class="lp-proof" id="${id}-proof">
    <div class="lp-proof-line" id="${id}-proof-line">${proof}</div>
    <div class="lp-proof-logos">${PROOF_LOGOS.map((l) => `<span>${l}</span>`).join("")}</div>
  </section>
</div>`;
}

/** A page instance parked in the world; camera + choreography move it, never CSS. */
export function pageSlot(id, opts = {}) {
  return `<div class="slot" id="${id}-slot">${page({ id, ...opts })}</div>`;
}
