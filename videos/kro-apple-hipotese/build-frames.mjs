/* Gera os 14 frames do filme a partir de UM componente de página compartilhado.
   Motivo de existir: a página da Apple aparece em 13 dos 14 frames e precisa ser
   pixel-idêntica nos cortes. Reconstruí-la à mão em cada arquivo garantiria que
   ela tremesse. Aqui ela é gerada uma vez.                                     */
import { writeFileSync, mkdirSync } from 'node:fs';

/* ── geometria da página (largura intrínseca 1920) ──────────────────────── */
const NAV = 60, HERO = 860, SEC = 940, STUDIO = 900, ROW = 820;
const Y_MACMINI = -(NAV + HERO + SEC / 2 - 540);          // -850
const Y_STUDIO  = -(NAV + HERO + SEC + STUDIO / 2 - 540); // -1770
const Y_ROW1    = -(NAV + HERO + SEC + STUDIO + ROW / 2 - 540); // -2630

/* ── variantes: diferenças pequenas e plausíveis, nunca caricatas ───────── */
const VARIANTS = {
  A:  { sub:'Agora com M6 e M5 Pro.', ter:'Confira em breve a disponibilidade',
        ctas:[['fill','Saiba mais'],['ghost','Ver preços']] },
  B:  { sub:'Agora com M6 e M5 Pro.', ter:'Confira em breve a disponibilidade',
        ctas:[['ghost','Saiba mais'],['fill','Ver preços']] },
  C:  { sub:'Agora com M6 e M5 Pro. Disponibilidade em breve.', ter:'',
        ctas:[['fill','Saiba mais'],['ghost','Ver preços']] },
  B1: { sub:'Agora com M6 e M5 Pro.', ter:'Confira em breve a disponibilidade',
        ctas:[['ghost','Saiba mais'],['fill','Ver preços e configurações']] },
  B2: { sub:'Agora com M6 e M5 Pro.', ter:'', subWeight:500,
        ctas:[['ghost','Saiba mais'],['fill','Ver preços']] },
  B3: { sub:'Agora com M6 e M5 Pro.', ter:'Confira em breve a disponibilidade',
        ctas:[['fill','Ver preços'],['ghost','Saiba mais']] },
};

const NAV_ITEMS = ['Loja','Mac','iPad','iPhone','Watch','AirPods','TV e Casa',
                   'Entretenimento','Acessórios','Suporte'];

const APPLE_SVG = `<svg class="ap-mark" viewBox="0 0 814 1000" aria-hidden="true"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>`;
const nav = () => `<div class="ap-nav" data-layout-allow-overflow>${APPLE_SVG}${
  NAV_ITEMS.map(i => `<span>${i}</span>`).join('')}<svg class="ap-ico" viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.6" cy="8.6" r="6.1"/><path d="M13.2 13.2 18 18"/></svg><svg class="ap-ico" viewBox="0 0 20 20" aria-hidden="true"><path d="M3.6 6.4h12.8L15.5 18H4.5z"/><path d="M7.2 6.4V4.9a2.8 2.8 0 0 1 5.6 0v1.5"/></svg></div>`;

/* a seção Mac mini — o objeto que o sistema testa.
   Cada componente é uma CAMADA anotável: o F05 os separa no eixo Z e o F04
   desenha uma caixa de seleção na headline. Por isso cada um tem um wrapper
   que abraça exatamente o seu conteúdo, em vez de ocupar a linha inteira. */
function macmini(v = 'A') {
  const d = VARIANTS[v];
  const sw = d.subWeight ? ` style="font-weight:${d.subWeight}"` : '';
  const tag = (t) => `<span class="lay-tag"><i class="lay-line"></i><i class="kro-label">${t}</i></span>`;
  return `<div class="ap-sec ap-sec--mini">
  <div class="lay lay-grid"><span class="lay-mesh"></span>${tag('HIERARQUIA')}</div>
  <div class="ap-h1"><span class="ap-h1-t lay lay-h1">Mac mini<span class="kro-box sel-h1"></span>${tag('COPY')}</span></div>
  <div class="ap-sub"${sw}>${d.sub}</div>
  ${d.ter ? `<div class="ap-ter">${d.ter}</div>` : ''}
  <div class="ap-ctas"><span class="ap-ctas-in lay lay-cta">${d.ctas.map(([k, l]) =>
    `<span class="ap-cta ap-cta--${k}">${l}</span>`).join('')}${tag('CTA')}</span></div>
  <span class="ap-shot-w lay lay-shot" style="width:620px;height:445px;bottom:44px">
    <img class="ap-shot" src="capture/assets/apple-mac-mini.png" width="620" height="445" alt="">${tag('DESIGN')}</span>
</div>`;
}

const tile = (mod, h1, sub, ctas, img, w, h, bottom) => `<div class="ap-tile ap-tile--${mod}">
  <div class="ap-t-h1">${h1}</div><div class="ap-t-sub">${sub}</div>
  <div class="ap-t-ctas">${ctas.map(([k, l]) =>
    `<div class="ap-t-cta ap-cta--${k}">${l}</div>`).join('')}</div>
  <span class="ap-shot-w" style="width:${w}px;height:${h}px;bottom:${bottom}px"><img class="ap-shot" src="capture/assets/${img}" width="${w}" height="${h}" alt=""></span>
</div>`;

/* a página inteira. compact = só nav + Mac mini (o que o sistema manipula) */
function applePage(variant = 'A', compact = false) {
  const rest = compact ? '' : `
<div class="ap-hero">
  <img class="ap-hero-glow" src="capture/assets/apple-hero-glow.png" width="1920" height="426" alt="">
  <div class="ap-hero-copy">
    <div class="ap-hero-h1">Surpreendente e brilhante.</div>
    <div class="ap-hero-sub">Assista à apresentação especial da Apple.<br>Dia 09/09, às 14h (BRT).</div>
    <div class="ap-pill-light">Adicionar ao calendário</div>
  </div>
</div>`;
  const tail = compact ? '' : `
<div class="ap-sec ap-sec--white ap-sec--studio">
  <div class="ap-h1">Mac Studio</div>
  <div class="ap-sub">Agora com M5 Max e M5 Ultra.</div>
  <div class="ap-ter">Confira em breve a disponibilidade</div>
  <div class="ap-ctas"><div class="ap-cta ap-cta--fill">Saiba mais</div><div class="ap-cta ap-cta--ghost">Ver preços</div></div>
  <span class="ap-shot-w" style="width:620px;height:310px;bottom:130px"><img class="ap-shot" src="capture/assets/apple-mac-studio.png" width="620" height="310" alt=""></span>
</div>
<div class="ap-row">
  ${tile('surface','iPhone','Conheça a nova geração do iPhone.',[['fill','Saiba mais'],['ghost','Comprar iPhone']],'apple-iphone.png',430,397,0)}
  ${tile('sky','MacBook Air','Agora com a potência do M5.',[['fill','Saiba mais'],['ghost','Comprar']],'apple-macbook-air.png',470,438,0)}
</div>
<div class="ap-row">
  ${tile('ice','iPad air','Agora com a potência do M4.',[['fill','Saiba mais'],['ghost','Comprar']],'apple-ipad-air.png',620,351,40)}
  ${tile('surface','MacBook Neo','Um Mac incrível. Uma escolha inteligente.',[['fill','Saiba mais'],['ghost','Comprar']],'apple-macbook-neo.png',440,357,0)}
</div>
<div class="ap-row">
  ${tile('surface',APPLE_SVG+'WATCH SERIES 11','O parceiro ideal para cuidar da sua saúde.',[['fill','Saiba mais'],['ghost','Comprar']],'apple-watch.png',760,386,0)}
  ${tile('white','AirPods Pro 3','O melhor Cancelamento Ativo de Ruído do mundo.',[['fill','Saiba mais'],['ghost','Comprar']],'apple-airpods.png',470,327,30)}
</div>`;
  return `<div class="ap${compact ? ' ap--compact' : ''}">${nav()}${rest}${macmini(variant)}${tail}</div>`;
}

/* a página como objeto manipulável pelo sistema: um card de 1200×625 */
const pcard = (variant, cls = '') =>
  `<span class="pcard ${cls}">${applePage(variant, true)}<span class="pcard-edge"></span><span class="pcard-ring"></span></span>`;

/* ── shell de um frame ──────────────────────────────────────────────────── */
function frame(id, duration, body, js) {
  return `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8">
<link rel="stylesheet" href="compositions/components/film.css">
</head>
<body>
<template>
  <div class="hf-root" id="root-${id}" data-composition-id="${id}" data-duration="${duration}" data-width="1920" data-height="1080">
${body}
  </div>
  <script>
  (function(){
    const root = document.querySelector('[data-composition-id="${id}"]');
    const q  = s => root.querySelector(s);
    const qa = s => Array.prototype.slice.call(root.querySelectorAll(s));
    const tl = gsap.timeline({ paused: true });

    /* entrada → HOLD → saída. O HOLD é explícito e nada o atravessa. */
    function show(el, at, enter, hold, exit, rise){
      const dy = (rise === undefined ? 20 : rise);
      tl.set(el, { autoAlpha:0, y:dy }, 0);   // estado inicial explicito: seek em t=0 pousa certo
      tl.fromTo(el, { autoAlpha:0, y:dy }, { autoAlpha:1, y:0, duration:enter, ease:'power3.out' }, at);
      if (exit > 0) tl.to(el, { autoAlpha:0, y:-dy*0.7, duration:exit, ease:'power2.in' }, at+enter+hold);
      return at+enter+hold+(exit>0?exit:0);
    }
    /* revelação por máscara vertical — a entrada da tese */
    function mask(el, at, enter, hold, exit){
      const inner = el.querySelector('span');
      tl.set(el, { autoAlpha:1 }, 0);
      tl.set(inner, { yPercent:106 }, 0);     // idem: a mascara comeca fechada
      tl.fromTo(inner, { yPercent:106 }, { yPercent:0, duration:enter, ease:'power3.out' }, at);
      if (exit > 0) tl.to(inner, { yPercent:-106, duration:exit, ease:'power2.in' }, at+enter+hold);
      return at+enter+hold+(exit>0?exit:0);
    }
${js}
    window.__timelines[${JSON.stringify(id)}] = tl;
  })();
  <\/script>
</template>
</body>
</html>`;
}

export { NAV, HERO, SEC, STUDIO, ROW, Y_MACMINI, Y_STUDIO, Y_ROW1, VARIANTS, applePage, macmini, pcard, frame, nav };
