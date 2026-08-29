import { writeFileSync, mkdirSync } from 'node:fs';
import { applePage, pcard, frame, Y_MACMINI, Y_STUDIO, Y_ROW1 } from './build-frames.mjs';

mkdirSync('compositions/frames', { recursive: true });
const out = [];
const W = (n, h) => { writeFileSync(`compositions/frames/${n}`, h); out.push(n); };

/* ── enquadramento canônico ──────────────────────────────────────────────
   A seção Mac mini preenchendo exatamente o frame. Duas rotas chegam ao
   MESMO pixel: a página crua (F01–F03) e o page-card (F04–F13). É isso que
   torna os cortes verdadeiros match cuts em vez de saltos.               */
const REST_S = 1.15, REST_Y = Y_MACMINI;                 // página crua
const CARD_W = 1200, CARD_H = 625, IN = 0.625;
const SEC_T = 60 * IN, SEC_B = 1000 * IN;                // 37.5 .. 625
const FS = 1080 / (SEC_B - SEC_T);                       // 1.8383
const FX = 960 - (CARD_W / 2) * FS;
const FY = 540 - ((SEC_T + SEC_B) / 2) * FS;
const r2 = n => Math.round(n * 100) / 100;

/* posição de um card num tríptico/par: devolve x,y para origin 0 0 */
const place = (cx, cy, s) => ({ x: r2(cx - (CARD_W / 2) * s), y: r2(cy - (CARD_H / 2) * s), s });
const P = { A6: place(320, 520, .50), B6: place(960, 520, .50), C6: place(1600, 520, .50) };

/* ════════ F01 — Começar pelo melhor · 5.5s ════════════════════════════ */
W('01-comecar-pelo-melhor.html', frame('01-comecar-pelo-melhor', 5.5, `
    <div class="clip stage" id="s-f01" data-start="0" data-duration="5.5">
      <div class="cam"><div class="track">${applePage('A')}</div></div>
      <div class="veil"></div>
      <div class="msg msg-lg msg-mask t-thesis" style="top:126px"><span>Vamos tentar melhorar o site da Apple.</span></div>
    </div>`, `
    tl.set(q('.track'), { y:0 }, 0);
    /* o push-in e o unico movimento do shot e nunca acelera sob o texto */
    tl.fromTo(q('.cam'), { scale:1.0 }, { scale:1.05, duration:5.5, ease:'none' }, 0);
    tl.fromTo(q('.veil'), { opacity:0 }, { opacity:1, duration:.5, ease:'power2.out' }, 0.5);
    tl.to(q('.veil'), { opacity:0, duration:.5, ease:'power2.in' }, 4.3);
    mask(q('.t-thesis'), 0.6, .4, 3.3, .4);
`));

/* ════════ F02 — Excelente · 6.5s ══════════════════════════════════════ */
W('02-excelente.html', frame('02-excelente', 6.5, `
    <div class="clip stage" id="s-f02" data-start="0" data-duration="6.5">
      <div class="cam"><div class="track">${applePage('A')}</div></div>
    </div>`, `
    const cam = q('.cam'), track = q('.track');
    tl.set(track, { y:0 }, 0);
    tl.set(cam, { scale:1.05 }, 0);                    // match cut com o F01
    tl.to(track, { y:-420, duration:1.4, ease:'power1.in' }, 0);
    tl.to(cam,   { scale:.96, duration:1.4, ease:'power1.inOut' }, 0);
    /* pausa de reconhecimento sobre o Mac mini */
    tl.to(track, { y:${REST_Y}, duration:1.2, ease:'power2.out' }, 1.4);
    tl.to(cam,   { scale:.91, duration:1.2, ease:'power2.out' }, 1.4);
    /* Mac Studio — pausa mais curta: o ritmo acelera de proposito */
    tl.to(track, { y:${Y_STUDIO}, duration:1.2, ease:'power2.inOut' }, 2.6);
    tl.to(cam,   { scale:.80, duration:1.2, ease:'power2.inOut' }, 2.6);
    /* a grade de meios-tiles: o primeiro par comparavel do filme */
    tl.to(track, { y:${Y_ROW1}, duration:1.2, ease:'power2.inOut' }, 3.8);
    tl.to(cam,   { scale:.66, duration:1.2, ease:'power2.inOut' }, 3.8);
    /* volta rapida que desacelera ate o repouso ABSOLUTO */
    tl.to(track, { y:${REST_Y}, duration:1.5, ease:'expo.out' }, 5.0);
    tl.to(cam,   { scale:${REST_S}, duration:1.5, ease:'expo.out' }, 5.0);
`));

/* ════════ F03 — A pergunta · 7.2s ═════════════════════════════════════ */
W('03-a-pergunta.html', frame('03-a-pergunta', 7.2, `
    <div class="clip stage" id="s-f03" data-start="0" data-duration="7.2">
      <div class="cam"><div class="track">${applePage('A')}</div></div>
      <div class="veil veil--full"></div>
      <div class="msg msg-xl t-q" style="top:474px">O que você mudaria aqui?</div>
      <div class="msg msg-xl t-a" style="top:474px">Talvez nada.</div>
    </div>`, `
    /* camera PARADA o shot inteiro. a imobilidade e o argumento. */
    tl.set(q('.track'), { y:${REST_Y} }, 0);
    tl.set(q('.cam'), { scale:${REST_S} }, 0);
    /* a pagina vira fundo enquanto a pergunta e lida — continua excelente,
       so para de competir. legibilidade acima de tudo. */
    tl.fromTo(q('.veil'), { opacity:0 }, { opacity:.84, duration:.5, ease:'power2.out' }, 0);
    show(q('.t-q'), 0.5, .4, 3.0, .4);      // HOLD 3.0s
    /* 0.4s de tela sem texto nenhum — a pausa e onde o espectador responde */
    show(q('.t-a'), 4.7, .3, 2.2, 0);       // HOLD 2.2s, atravessa o corte
`));

/* ════════ F04 — A virada · 6.4s ═══════════════════════════════════════ */
W('04-a-virada.html', frame('04-a-virada', 6.4, `
    <div class="clip stage" id="s-f04" data-start="0" data-duration="6.4">
      <div class="cam">${pcard('A', 'card')}</div>
      <div class="veil veil--full"></div>
      <div class="msg msg-xl t-a" style="top:474px">Talvez nada.</div>
      <div class="msg msg-lg t-h" style="top:482px">Mas essa também é uma <b>hipótese</b>.</div>
      <svg class="kro-cursor cur" viewBox="0 0 22 30"><path d="M2 2 L2 24 L8 18.5 L11.6 27 L15.4 25.4 L11.9 17 L19.4 16.6 Z" fill="#06B6D4"/></svg>
    </div>`, `
    /* mesmo pixel do F03, por outra rota: agora a pagina e um OBJETO */
    tl.set(q('.card'), { x:${r2(FX)}, y:${r2(FY)}, scale:${r2(FS)} }, 0);
    tl.set(q('.veil'), { opacity:.84 }, 0);
    tl.set(q('.cur'), { autoAlpha:0, x:1780, y:640 }, 0);
    tl.set(q('.t-a'), { autoAlpha:1, y:0 }, 0);
    tl.to(q('.t-a'), { autoAlpha:0, y:-14, duration:.4, ease:'power2.in' }, 0);
    show(q('.t-h'), 0.4, .4, 3.2, .4);      // HOLD 3.2s — nenhum cursor ainda
    /* o veu levanta: a pagina volta a ser ela mesma para receber a selecao */
    tl.to(q('.veil'), { opacity:0, duration:.6, ease:'power2.inOut' }, 4.2);

    /* SO AGORA o sistema aparece — e aparece como comportamento, nao como logo */
    tl.to(q('.cur'), { autoAlpha:1, duration:.25 }, 4.5);
    tl.to(q('.cur'), { x:1075, y:190, duration:1.0, ease:'power3.out' }, 4.5);
    const sel = q('.sel-h1');
    tl.fromTo(sel, { autoAlpha:0, scale:1.06 }, { autoAlpha:1, scale:1, duration:.34, ease:'power3.out' }, 5.45);
    tl.to(sel, { scale:1.012, duration:.12, ease:'power2.out' }, 5.85);
    tl.to(sel, { scale:1, duration:.18, ease:'power2.inOut' }, 5.97);
`));

/* ════════ F05 — Toda decisão é uma hipótese · 8.0s ════════════════════
   Aqui o mundo muda. A página para de ser interface e vira objeto iluminado
   num espaço escuro. O recuo é o que revela isso — não um efeito. */
W('05-toda-decisao.html', frame('05-toda-decisao', 8.0, `
    <div class="clip stage stage--3d stage--dark" id="s-f05" data-start="0" data-duration="8">
      <div class="cam d3">${pcard('A', 'card pcard--open')}</div>
      <div class="msg msg-lg t-pro" style="top:842px">Grandes profissionais criam grandes hipóteses.</div>
    </div>`, `
    const card = q('.card');
    tl.set(card, { x:${r2(FX)}, y:${r2(FY)}, scale:${r2(FS)} }, 0);
    tl.set(q('.sel-h1'), { autoAlpha:1 }, 0);           // herdada do F04

    /* a camera gira e os componentes deixam de ser um plano */
    tl.to(card, { rotationY:-14, duration:3.4, ease:'power2.inOut' }, 0);
    const layer = (sel, z, at) => {
      tl.fromTo(q(sel), { z:0 }, { z:z, duration:.9, ease:'power3.out' }, at);
      tl.to(q(sel + ' .lay-tag'), { opacity:1, duration:.4, ease:'power2.out' }, at + .28);
    };
    layer('.lay-h1',   420, 0.0);    // COPY
    layer('.lay-cta',  290, 1.0);    // CTA
    layer('.lay-shot', 170, 1.8);    // DESIGN
    tl.to(q('.lay-grid'), { opacity:1, duration:.6, ease:'power2.out' }, 2.6);
    tl.fromTo(q('.lay-grid'), { z:0 }, { z:-140, duration:.9, ease:'power3.out' }, 2.6);
    tl.to(q('.lay-grid .lay-tag'), { opacity:1, duration:.4 }, 2.88);

    /* o recuo revela o preto: a pagina agora FLUTUA. a camera para aqui. */
    tl.to(card, { x:${r2(960 - 600 * FS * 0.62)}, y:${r2(408 - 312.5 * FS * 0.62)},
                  scale:${r2(FS * 0.62)}, duration:.9, ease:'power2.inOut' }, 3.4);
    tl.to(qa('.lay-tag'), { opacity:.5, duration:.5, ease:'power2.inOut' }, 3.6);
    show(q('.t-pro'), 4.3, .4, 3.3, 0);   // HOLD 3.3s, camera travada
`));

/* ════════ F06 — O mercado decide · 8.0s ═══════════════════════════════ */
W('06-o-mercado-decide.html', frame('06-o-mercado-decide', 8.0, `
    <div class="clip stage stage--3d stage--dark" id="s-f06" data-start="0" data-duration="8">
      <div class="cam d3">
        ${pcard('A', 'card cA pcard--open')}
        ${pcard('B', 'card cB')}
        ${pcard('C', 'card cC')}
      </div>
      <div class="kro-label lb lbA" style="left:0;width:640px;text-align:center;top:322px">A — controle</div>
      <div class="kro-label lb lbB" style="left:640px;width:640px;text-align:center;top:322px">B — variante</div>
      <div class="kro-label lb lbC" style="left:1280px;width:640px;text-align:center;top:322px">C — variante</div>
      <div class="msg msg-lg t-mkt" style="top:168px">O comportamento real decide.</div>
    </div>`, `
    const A = q('.cA'), B = q('.cB'), C = q('.cC');
    tl.set(A, { x:${r2(960 - 600 * FS * 0.62)}, y:${r2(408 - 312.5 * FS * 0.62)},
                scale:${r2(FS * 0.62)}, rotationY:-14 }, 0);
    tl.set([B, C], { autoAlpha:0 }, 0);
    tl.set(qa('.lb'), { autoAlpha:0 }, 0);
    tl.set(q('.sel-h1'), { autoAlpha:1 }, 0);
    /* estado herdado do F05, declarado explicitamente: sem isso o seek
       captura o valor inicial em momento arbitrario e o retorno nao ocorre */
    tl.set(qa('.lay-tag'), { opacity:.5 }, 0);
    tl.set(q('.lay-grid'), { opacity:1, z:-140 }, 0);
    tl.set(q('.lay-h1'),   { z:420 }, 0);
    tl.set(q('.lay-cta'),  { z:290 }, 0);
    tl.set(q('.lay-shot'), { z:170 }, 0);

    /* as camadas voltam e a pagina se refaz inteira */
    tl.to(qa('.lay-tag'), { opacity:0, duration:.5, ease:'power2.in' }, 0);
    tl.to(q('.lay-grid'), { opacity:0, duration:.5, ease:'power2.in' }, 0);
    tl.to([q('.lay-h1'), q('.lay-cta'), q('.lay-shot'), q('.lay-grid')],
          { z:0, duration:1.2, ease:'power2.inOut' }, 0);
    tl.to(A, { rotationY:0, duration:1.2, ease:'power2.inOut' }, 0);
    tl.to(q('.sel-h1'), { autoAlpha:0, duration:.5 }, 0.4);

    tl.set(A, { overflow:'hidden', transformStyle:'flat' }, 1.2);
    tl.to(A, { x:${P.A6.x}, y:${P.A6.y}, scale:${P.A6.s}, duration:1.2, ease:'power2.inOut' }, 1.2);

    /* duplicacao — tilts espelhados curtissimos que assentam em 0 */
    tl.set(B, { x:${P.B6.x}, y:${P.B6.y}, scale:${P.B6.s} }, 0);
    tl.fromTo(B, { autoAlpha:0, rotationY:8 }, { autoAlpha:1, rotationY:0, duration:.9, ease:'power3.out' }, 2.4);
    tl.set(C, { x:${P.C6.x}, y:${P.C6.y}, scale:${P.C6.s} }, 0);
    tl.fromTo(C, { autoAlpha:0, rotationY:-8 }, { autoAlpha:1, rotationY:0, duration:.9, ease:'power3.out' }, 3.4);

    tl.to(q('.lbA'), { autoAlpha:1, duration:.4 }, 2.6);
    tl.to(q('.lbB'), { autoAlpha:1, duration:.4 }, 2.9);
    tl.to(q('.lbC'), { autoAlpha:1, duration:.4 }, 3.9);
    show(q('.t-mkt'), 4.3, .4, 3.3, 0);   // HOLD 3.3s — as tres paginas paradas
`));

console.log(out.join('\n'));

/* ════════ F07 — KRO AI · 8.5s ═════════════════════════════════════════
   O espaço se revela como o sistema. A marca entra como rótulo do espaço,
   não como logo que aterrissa. Os "satélites" são sessões em movimento. */
const CX = [320, 960, 1600];
const DOTS = [18, 22, 14];                    // tráfego desigual, de propósito
const dotsHTML = () => {
  let h = '', j = 0;
  DOTS.forEach((n, v) => { for (let i = 0; i < n; i++, j++)
    h += `<span class="kro-dot" data-v="${v}" data-k="${i}"></span>`; });
  return h;
};
/* toda trajetória deriva do índice: nada de aleatório, o render é idêntico */
const DOT_JS = `
    const CX = [320, 960, 1600];
    qa('.kro-dot').forEach(function(d){
      const v = +d.dataset.v, k = +d.dataset.k;
      const spread = (((k * 37) % 101) - 50) / 50;          // -1..1
      const tx = CX[v] + spread * 236;
      const ty = 452 + ((k * 53) % 97) * 2.1;               // dentro do card
      const sx = CX[v] + spread * 74;
      const t0 = 2.2 + ((k * 29) % 83) / 83 * 3.6;          // entrada escalonada
      const dur = 1.15 + ((k * 17) % 40) / 100;
      const mode = k % 5;                                    // 0-1 converte · 2-3 avança · 4 abandona
      tl.set(d, { x:sx, y:1120, autoAlpha:0 }, 0);
      tl.to(d, { autoAlpha:1, duration:.2 }, t0);
      if (mode < 2) {                     // para no CTA e pulsa uma vez
        tl.to(d, { x:tx, y:ty, duration:dur, ease:'power2.out' }, t0);
        tl.to(d, { scale:2.6, duration:.16, ease:'power2.out' }, t0 + dur);
        tl.to(d, { scale:1, duration:.3, ease:'power2.inOut' }, t0 + dur + .16);
      } else if (mode < 4) {              // atravessa e sai por cima
        tl.to(d, { x:tx, y:-40, duration:dur * 1.6, ease:'none' }, t0);
        tl.to(d, { autoAlpha:0, duration:.3 }, t0 + dur * 1.4);
      } else {                            // desvia e cai
        tl.to(d, { x:tx + 90, y:ty + 150, duration:dur, ease:'power1.out' }, t0);
        tl.to(d, { autoAlpha:0, y:ty + 300, duration:.6, ease:'power1.in' }, t0 + dur);
      }
    });`;
/* contador determinístico: o valor sai do progresso do próprio tween */
const COUNT_JS = `
    function countTo(el, from, to, at, dur){
      const o = { v: from };
      el.textContent = String(from);
      tl.to(o, { v: to, duration: dur, ease: 'power2.out',
        onUpdate: function(){ el.textContent = String(Math.round(o.v)); } }, at);
    }`;

W('07-kro-ai.html', frame('07-kro-ai', 8.5, `
    <div class="clip stage stage--dark" id="s-f07" data-start="0" data-duration="8.5">
      <div class="kro-grid grid"></div>
      <div class="cam">
        ${pcard('A', 'card cA')}${pcard('B', 'card cB')}${pcard('C', 'card cC')}
        ${dotsHTML()}
      </div>
      <div class="kro-mark mk" style="left:88px;top:74px">kro ai_</div>
      <div class="kro-cap cap" style="left:88px;top:986px">Simulação ilustrativa · dados não reais</div>
      <div class="kro-label lb" style="left:0;width:640px;text-align:center;top:322px">A — controle</div>
      <div class="kro-label lb" style="left:640px;width:640px;text-align:center;top:322px">B — variante</div>
      <div class="kro-label lb" style="left:1280px;width:640px;text-align:center;top:322px">C — variante</div>
      <div class="kro-metric mt" style="left:0;width:640px;text-align:center;top:734px;font-size:52px"><span class="n nA">100</span></div>
      <div class="kro-metric mt" style="left:640px;width:640px;text-align:center;top:734px;font-size:52px"><span class="n nB">100</span></div>
      <div class="kro-metric mt" style="left:1280px;width:640px;text-align:center;top:734px;font-size:52px"><span class="n nC">100</span></div>
    </div>`, `
    tl.set(q('.cA'), { x:${P.A6.x}, y:${P.A6.y}, scale:${P.A6.s} }, 0);
    tl.set(q('.cB'), { x:${P.B6.x}, y:${P.B6.y}, scale:${P.B6.s} }, 0);
    tl.set(q('.cC'), { x:${P.C6.x}, y:${P.C6.y}, scale:${P.C6.s} }, 0);
    tl.set(qa('.lb'), { autoAlpha:1 }, 0);
${COUNT_JS}
    /* o espaco ganha coordenadas: o sistema se torna visivel como campo */
    tl.fromTo(q('.grid'), { autoAlpha:0 }, { autoAlpha:1, duration:1.0, ease:'power2.out' }, 0);
    tl.fromTo(q('.mk'), { autoAlpha:0 }, { autoAlpha:1, duration:.7, ease:'power2.out' }, 0.3);
    tl.fromTo(q('.cap'), { autoAlpha:0 }, { autoAlpha:.9, duration:.7 }, 0.6);
    /* medidores minimos: tres numeros no frame inteiro, e mais nada */
    tl.fromTo(qa('.mt'), { autoAlpha:0, y:16 }, { autoAlpha:1, y:0, duration:.6, stagger:.12, ease:'power3.out' }, 1.0);
${DOT_JS}
    /* os indices reagem DEPOIS do trafego, nunca antes */
    countTo(q('.nA'), 100, 100, 4.4, 2.0);
    countTo(q('.nB'), 100, 103, 4.4, 2.0);
    countTo(q('.nC'), 100,  98, 4.4, 2.0);
    /* deriva lateral minima que para no fim — unico movimento de camera */
    tl.fromTo(q('.cam'), { x:9 }, { x:-9, duration:6.6, ease:'power1.inOut' }, 0);
`));

/* ════════ F08 — Aprendizado · 9.0s ════════════════════════════════════ */
const P8 = { A: place(230, 470, .34), B: place(960, 470, .52), C: place(1690, 470, .34),
             b1: place(620, 838, .22), b2: place(960, 838, .22), b3: place(1300, 838, .22) };
W('08-aprendizado.html', frame('08-aprendizado', 9.0, `
    <div class="clip stage stage--dark" id="s-f08" data-start="0" data-duration="9">
      <div class="kro-grid grid"></div>
      <div class="cam">
        ${pcard('A', 'card cA')}${pcard('C', 'card cC')}${pcard('B', 'card cB')}
        ${pcard('B1', 'card c1')}${pcard('B2', 'card c2')}${pcard('B3', 'card c3')}
      </div>
      <svg class="branch" viewBox="0 0 1920 1080" width="1920" height="1080">
        <path class="br br0" d="M960 632 L960 700" stroke="#06B6D4" stroke-width="1.5" fill="none"/>
        <path class="br br1" d="M960 700 L960 730 L620 730 L620 762" stroke="#06B6D4" stroke-width="1.5" fill="none"/>
        <path class="br br2" d="M960 700 L960 762" stroke="#06B6D4" stroke-width="1.5" fill="none"/>
        <path class="br br3" d="M960 700 L960 730 L1300 730 L1300 762" stroke="#06B6D4" stroke-width="1.5" fill="none"/>
      </svg>
      <div class="kro-mark" style="left:88px;top:74px">kro ai_</div>
      <div class="kro-cap" style="left:88px;top:986px;opacity:.9">Simulação ilustrativa · dados não reais</div>
      <div class="kro-label lb" style="left:0;width:640px;text-align:center;top:322px">A — controle</div>
      <div class="kro-label lb" style="left:640px;width:640px;text-align:center;top:322px">B — variante</div>
      <div class="kro-label lb" style="left:1280px;width:640px;text-align:center;top:322px">C — variante</div>
      <div class="kro-metric mt" style="left:0;width:640px;text-align:center;top:734px;font-size:52px">100</div>
      <div class="kro-metric mt" style="left:640px;width:640px;text-align:center;top:734px;font-size:52px">103</div>
      <div class="kro-metric mt" style="left:1280px;width:640px;text-align:center;top:734px;font-size:52px">98</div>
      <div class="msg msg-xl w1" style="top:118px">Testar.</div>
      <div class="msg msg-xl w2" style="top:118px" data-layout-allow-overlap>Aprender.</div>
      <div class="msg msg-xl w3" style="top:118px">E testar novamente.</div>
      <div class="kro-label t1" style="left:488px;width:264px;text-align:center;top:918px">B1</div>
      <div class="kro-label t2" style="left:828px;width:264px;text-align:center;top:918px">B2</div>
      <div class="kro-label t3" style="left:1168px;width:264px;text-align:center;top:918px">B3</div>
    </div>`, `
    tl.set(q('.grid'), { autoAlpha:1 }, 0);
    tl.set(q('.cA'), { x:${P.A6.x}, y:${P.A6.y}, scale:${P.A6.s}, autoAlpha:1 }, 0);
    tl.set(q('.cB'), { x:${P.B6.x}, y:${P.B6.y}, scale:${P.B6.s}, autoAlpha:1 }, 0);
    tl.set(q('.cC'), { x:${P.C6.x}, y:${P.C6.y}, scale:${P.C6.s}, autoAlpha:1 }, 0);
    tl.set([q('.c1'), q('.c2'), q('.c3')], { autoAlpha:0 }, 0);
    tl.set(qa('.br'), { autoAlpha:0 }, 0);
    tl.set([q('.t1'), q('.t2'), q('.t3')], { autoAlpha:0 }, 0);
    /* herdados do F07 — saem conforme o sistema reorganiza, nao no corte */
    tl.set([].concat(qa('.lb'), qa('.mt')), { autoAlpha:1 }, 0);
    tl.to(qa('.mt'), { autoAlpha:0, duration:.7, ease:'power2.in' }, 0.5);
    tl.to(qa('.lb'), { autoAlpha:0, duration:.7, ease:'power2.in' }, 0.7);

    /* o sistema decide. C perde luz e recua; A escurece menos — o controle
       nao e descartado, ele continua sendo a referencia. */
    tl.to(q('.cC'), { x:${P8.C.x}, y:${P8.C.y}, scale:${P8.C.s}, autoAlpha:.26, duration:1.4, ease:'power2.inOut' }, 0);
    tl.to(q('.cA'), { x:${P8.A.x}, y:${P8.A.y}, scale:${P8.A.s}, autoAlpha:.52, duration:1.4, ease:'power2.inOut' }, 0);
    tl.to(q('.cB'), { x:${P8.B.x}, y:${P8.B.y}, scale:${P8.B.s}, duration:1.4, ease:'power2.inOut' }, 0);
    /* o anel ciano so aparece DEPOIS dos dados. e a unica vez que o ciano
       significa "vencedora" no filme inteiro. */
    tl.fromTo(q('.cB .pcard-ring'), { opacity:0 }, { opacity:1, duration:.5, ease:'power2.out' }, 1.0);

    show(q('.w1'), 1.5, .35, 1.7, .3);                          // HOLD 1.7s
    tl.fromTo(q('.br0'), { autoAlpha:0, scaleY:0 }, { autoAlpha:1, scaleY:1, duration:.6, ease:'power2.out', transformOrigin:'50% 0%' }, 2.2);
    show(q('.w2'), 4.2, .35, 1.7, .3);                          // HOLD 1.7s
    tl.to(qa('.br'), { autoAlpha:1, duration:.5, ease:'power2.out' }, 4.4);
    show(q('.w3'), 6.05, .35, 2.6, 0);                          // HOLD 2.6s

    /* a geracao seguinte assenta em cascata e depois PARA de vez */
    [1, 2, 3].forEach(function(i){
      const c = q('.c' + i), p = [${JSON.stringify(P8.b1)}, ${JSON.stringify(P8.b2)}, ${JSON.stringify(P8.b3)}][i-1];
      tl.set(c, { x:p.x, y:p.y, scale:p.s }, 0);
      tl.fromTo(c, { autoAlpha:0, y:p.y + 34 }, { autoAlpha:1, y:p.y, duration:.7, ease:'power3.out' }, 6.4 + (i-1) * .26);
      tl.to(q('.t' + i), { autoAlpha:1, duration:.4 }, 6.7 + (i-1) * .26);
    });
`));
console.log('07,08 ok');

/* ════════ F09 — Excelente → excelente + dados · 7.5s ══════════════════
   O shot conceitualmente mais importante: a diferença quase não existe.
   Nenhuma das duas é apresentada como errada. */
const P9 = { A: place(480, 400, .46), B: place(1440, 400, .46) };
W('09-cem-e-um.html', frame('09-cem-e-um', 7.5, `
    <div class="clip stage stage--dark" id="s-f09" data-start="0" data-duration="7.5">
      <div class="kro-grid grid"></div>
      <div class="cam">
        ${pcard('A', 'card cA')}${pcard('B', 'card cB')}
        ${pcard('B1', 'card c1')}${pcard('B2', 'card c2')}${pcard('B3', 'card c3')}
        <div class="kro-label" style="left:160px;width:640px;text-align:center;top:190px">A — original</div>
        <div class="kro-label" style="left:1120px;width:640px;text-align:center;top:190px">B — vencedora</div>
        <div class="kro-metric" style="left:160px;width:640px;text-align:center;top:610px;font-size:88px"><span class="nA">100</span></div>
        <div class="kro-metric" style="left:1120px;width:640px;text-align:center;top:610px;font-size:88px"><span class="nB">100</span></div>
      </div>
      <div class="kro-mark" style="left:88px;top:74px">kro ai_</div>
      <div class="kro-cap" style="left:88px;top:986px;opacity:.9">Simulação ilustrativa · dados não reais</div>
      <div class="msg msg-lg t-1pc" style="top:872px">Às vezes, a diferença é só 1%.</div>
    </div>`, `
    tl.set(q('.grid'), { autoAlpha:1 }, 0);
${COUNT_JS}
    tl.set(q('.cA'), { x:${P8.A.x}, y:${P8.A.y}, scale:${P8.A.s}, autoAlpha:.52 }, 0);
    tl.set(q('.cB'), { x:${P8.B.x}, y:${P8.B.y}, scale:${P8.B.s}, autoAlpha:1 }, 0);
    tl.set(q('.cB .pcard-ring'), { opacity:1 }, 0);
    [1,2,3].forEach(function(i){
      const p = [${JSON.stringify(P8.b1)}, ${JSON.stringify(P8.b2)}, ${JSON.stringify(P8.b3)}][i-1];
      tl.set(q('.c'+i), { x:p.x, y:p.y, scale:p.s, autoAlpha:1 }, 0);
      tl.to(q('.c'+i), { autoAlpha:0, duration:.6, ease:'power2.in' }, 0);
    });
    /* as duas voltam a ter o MESMO peso, a mesma luz, a mesma nitidez */
    tl.to(q('.cA'), { x:${P9.A.x}, y:${P9.A.y}, scale:${P9.A.s}, autoAlpha:1, duration:1.2, ease:'power2.inOut' }, 0);
    tl.to(q('.cB'), { x:${P9.B.x}, y:${P9.B.y}, scale:${P9.B.s}, duration:1.2, ease:'power2.inOut' }, 0);
    tl.to(q('.cB .pcard-ring'), { opacity:.45, duration:.8 }, 0.6);

    /* 100 → 101. anticlimatico de proposito: e esse o argumento. */
    countTo(q('.nA'), 100, 100, 1.2, 1.4);
    countTo(q('.nB'), 100, 101, 1.2, 1.4);
    tl.fromTo(q('.nB').parentNode, { scale:1 }, { scale:1.04, duration:1.4, ease:'power2.out' }, 1.2);

    /* a camera se aproxima dos numeros e PARA antes da frase */
    tl.set(q('.cam'), { transformOrigin:'960px 654px' }, 0);
    tl.to(q('.cam'), { scale:1.34, duration:.8, ease:'power2.inOut' }, 2.6);
    tl.to([q('.cA'), q('.cB')], { autoAlpha:.78, duration:.8, ease:'power2.inOut' }, 2.6);
    show(q('.t-1pc'), 3.4, .4, 3.7, 0);   // HOLD 3.7s
`));

/* ════════ F10 — Escala · 8.5s ═════════════════════════════════════════
   Um único recuo contínuo revela o todo que contém o detalhe. */
W('10-escala.html', frame('10-escala', 8.5, `
    <div class="clip stage stage--dark" id="s-f10" data-start="0" data-duration="8.5">
      <div class="cam"><div class="field" data-layout-allow-overflow></div></div>
      <div class="kro-metric big" style="left:0;width:1920px;text-align:center;top:536px;font-size:118px" data-layout-allow-overlap>1%</div>
      <div class="kro-metric old" style="left:0;width:1920px;text-align:center;top:536px;font-size:118px">101</div>
      <div class="msg msg-lg t-small" style="top:660px">1% parece pequeno.</div>
      <div class="msg msg-lg t-scale" style="top:812px">Até você multiplicar pela escala.</div>
      <div class="kro-mark" style="left:88px;top:74px">kro ai_</div>
      <div class="kro-cap" style="left:88px;top:986px;opacity:.9">Simulação ilustrativa · dados não reais</div>
    </div>`, `
    tl.set(q('.field'), { autoAlpha:0 }, 0);
    /* o 101 entra EXATAMENTE onde o F09 o deixou: a direita, no mesmo corpo.
       so entao ele se descola, vira 1% e assume o centro. */
    tl.set(q('.old'), { autoAlpha:1, x:643, scale:1 }, 0);
    tl.set(q('.big'), { autoAlpha:0, x:643, y:0, scale:1 }, 0);
    tl.to(q('.old'), { autoAlpha:0, duration:.2, ease:'power2.in' }, 0);
    tl.to(q('.big'), { autoAlpha:1, duration:.18, ease:'power2.out' }, 0.2);
    tl.to(q('.big'), { x:0, y:-144, scale:1.66, duration:.8, ease:'power3.out' }, 0.2);
    show(q('.t-small'), 0.7, .4, 2.5, .4);       // HOLD 2.5s, camera parada

    /* O RECUO — velocidade alta, curva longa: violento porem controlado */
    tl.to(q('.field'), { autoAlpha:1, duration:.7, ease:'power2.out' }, 4.0);
    tl.fromTo(q('.cam'), { scale:1 }, { scale:.12, duration:1.4, ease:'expo.inOut' }, 4.0);
    tl.to(q('.big'), { scale:.50, duration:1.4, ease:'expo.inOut' }, 4.0);
    /* o recuo PARA por completo antes da proxima frase entrar */
    show(q('.t-scale'), 5.7, .4, 2.4, 0);        // HOLD 2.6s
`));

/* ════════ F11 — Impacto · 6.5s ════════════════════════════════════════
   Conformidade: o briefing autoriza "centenas de milhões" apenas em locução,
   e este projeto é mudo. Portanto essa frase não entra em tela em forma
   alguma. A tela carrega a cadeia abstrata e o payoff. */
W('11-impacto.html', frame('11-impacto', 6.5, `
    <div class="clip stage stage--dark" id="s-f11" data-start="0" data-duration="6.5">
      <div class="cam"><div class="field" data-layout-allow-overflow></div></div>
      <div class="chain ch">
        <div class="chain-item chain-item--kro k1" style="top:150px">1%</div>
        <svg class="ar a1" viewBox="0 0 24 60" width="24" height="60" style="left:948px;top:206px"><path d="M12 2 L12 50 M5 43 L12 51 L19 43" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".55"/></svg>
        <div class="chain-item k2" style="top:278px">milhões de decisões</div>
        <svg class="ar a2" viewBox="0 0 24 60" width="24" height="60" style="left:948px;top:334px"><path d="M12 2 L12 50 M5 43 L12 51 L19 43" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".55"/></svg>
        <div class="chain-item k3" style="top:406px">impacto <i>potencial</i> enorme</div>
      </div>
      <div class="msg msg-xl t-gain" style="top:648px">Pequenos ganhos. <span class="msg-thin">Escala gigantesca.</span></div>
    </div>`, `
    tl.set(q('.field'), { autoAlpha:1 }, 0);
    tl.set(q('.cam'), { scale:.12 }, 0);              // match cut com o F10
    show(q('.k1'), 0.0, .5, 5.9, 0);
    tl.fromTo(q('.a1'), { autoAlpha:0, scaleY:0 }, { autoAlpha:1, scaleY:1, duration:.45, ease:'power2.out', transformOrigin:'50% 0%' }, 0.6);
    show(q('.k2'), 0.85, .45, 5.0, 0);
    tl.fromTo(q('.a2'), { autoAlpha:0, scaleY:0 }, { autoAlpha:1, scaleY:1, duration:.45, ease:'power2.out', transformOrigin:'50% 0%' }, 1.4);
    show(q('.k3'), 1.65, .45, 4.2, 0);
    /* a cadeia recua para dar lugar ao payoff, mas continua legivel */
    tl.set(q('.ch'), { autoAlpha:1, scale:1, transformOrigin:'960px 300px' }, 0);
    tl.to(q('.ch'), { autoAlpha:.30, scale:.94, duration:.8, ease:'power2.inOut' }, 2.2);
    show(q('.t-gain'), 3.0, .4, 3.1, 0);   // HOLD 3.1s
`));
console.log('09,10,11 ok');

/* ════════ F12 — Não substituir · 7.5s ═════════════════════════════════
   Briefing honrado à risca: nenhuma pessoa, nenhuma foto de banco. Cada
   profissional existe como o rótulo da sua disciplina e a hipótese que
   produz. As ideias continuam vindo das pessoas; o sistema é o destino. */
const DISC = [['DESIGNER', 236], ['COPYWRITER', 324], ['ESTRATEGISTA', 412]];
W('12-nao-substituir.html', frame('12-nao-substituir', 7.5, `
    <div class="clip stage stage--dark" id="s-f12" data-start="0" data-duration="7.5">
      <div class="cam"><div class="field" data-layout-allow-overflow></div></div>
      <div class="diag dg">
        ${DISC.map(([d, y], i) => `
        <div class="disc d${i}" style="left:352px;top:${y}px">${d}</div>
        <svg class="ln l${i}" viewBox="0 0 250 2" width="250" height="2" style="left:588px;top:${y + 8}px"><path d="M0 1 H250" stroke="#06B6D4" stroke-width="1.2"/></svg>
        <div class="hyp h${i}" style="left:850px;top:${y - 12}px">hipótese</div>`).join('')}
        <svg class="ln lk" viewBox="0 0 236 200" width="236" height="200" style="left:1024px;top:232px">
          <path d="M0 96 H60 M0 4 H60 Q92 4 92 96 M0 188 H60 Q92 188 92 96 M92 96 H236" stroke="#06B6D4" stroke-width="1.2" fill="none"/>
        </svg>
        <div class="disc dk" style="left:1272px;top:320px;font-size:19px">KRO</div>
        <div class="hyp hk" style="left:1272px;top:350px;border-color:#06B6D4">experimentação + aprendizado</div>
      </div>
      <div class="msg msg-lg t-not" style="top:614px"><span>KRO AI não</span><span class="swapline" data-layout-allow-overlap><span class="w-old"><b>substitui</b></span></span><span>grandes profissionais.</span></div>
    </div>`, `
    tl.set(q('.field'), { autoAlpha:1 }, 0);
    tl.set(q('.cam'), { scale:.12 }, 0);
    /* a repeticao e o argumento: mesma mecanica, mesmo intervalo, tres vezes */
    [0, 1, 2].forEach(function(i){
      const at = i * 0.7;
      show(q('.d' + i), at, .3, 6.0, 0, 10);
      tl.fromTo(q('.l' + i), { autoAlpha:0, scaleX:0 }, { autoAlpha:1, scaleX:1, duration:.4, ease:'power2.out', transformOrigin:'0% 50%' }, at + .22);
      show(q('.h' + i), at + .42, .3, 5.6 - i * .7, 0, 10);
    });
    tl.fromTo(q('.lk'), { autoAlpha:0 }, { autoAlpha:1, duration:.5, ease:'power2.out' }, 2.1);
    show(q('.dk'), 2.3, .3, 4.4, 0, 10);
    show(q('.hk'), 2.4, .35, 4.3, 0, 10);
    /* o diagrama baixa e a mensagem mais importante do fim assume */
    tl.set(q('.dg'), { autoAlpha:1 }, 0);
    tl.to(q('.dg'), { autoAlpha:.34, duration:.7, ease:'power2.inOut' }, 2.8);
    show(q('.t-not'), 3.2, .4, 4.3, 0);   // HOLD 4.3s
`));

/* ════════ F13 — Payoff · 7.5s ═════════════════════════════════════════
   A troca de UMA palavra obriga o espectador a reler a mesma sentença e
   perceber que a tese inverteu. */
const HIST = [place(300, 604, .15), place(630, 604, .15), place(960, 604, .15),
              place(1290, 604, .15), place(1620, 604, .15)];
W('13-potencializa.html', frame('13-potencializa', 7.5, `
    <div class="clip stage stage--dark" id="s-f13" data-start="0" data-duration="7.5">
      <div class="cam">
        ${HIST.map((_, i) => pcard(['A','B','C','B1','B2'][i], 'card hs h' + i)).join('')}
        ${pcard('B', 'card main')}
      </div>
      <div class="msg msg-lg t-not" style="top:614px" data-layout-allow-overlap><span>KRO AI</span><span class="swapline" data-layout-allow-overlap><span class="w-old" data-layout-allow-overlap><b data-layout-allow-overlap>não substitui</b></span><span class="w-new" data-layout-allow-overlap><b data-layout-allow-overlap>potencializa</b></span></span><span data-layout-allow-overlap>grandes profissionais.</span></div>
      <div class="msg msg-lg t-fin" style="top:150px"><span>Transforme páginas excelentes</span><span>em sistemas que aprendem.</span></div>
    </div>`, `
    const HP = ${JSON.stringify(HIST)};
    qa('.hs').forEach(function(c, i){ tl.set(c, { x:HP[i].x, y:HP[i].y, scale:HP[i].s, autoAlpha:0 }, 0); });
    tl.set(q('.main'), { x:${r2(960 - 600 * .42)}, y:${r2(560 - 312.5 * .42)}, scale:.42, autoAlpha:0 }, 0);
    tl.set(q('.main .pcard-ring'), { opacity:0 }, 0);

    /* a frase herdada NAO se move: o espectador precisa reconhece-la */
    tl.set(q('.t-not'), { autoAlpha:1, y:0 }, 0);
    tl.set(q('.w-old'), { yPercent:0 }, 0);
    tl.set(q('.w-new'), { yPercent:100, color:'#06B6D4' }, 0);

    /* a troca no lugar — o verbo tem linha propria, entao nada reflui.
       o ciano marca o aprendizado e depois se retira. */
    tl.to(q('.w-old'), { yPercent:-100, duration:.55, ease:'power2.inOut' }, 0.3);
    tl.to(q('.w-new'), { yPercent:0, duration:.55, ease:'power2.inOut' }, 0.3);
    tl.to(q('.w-new'), { color:'#FFFFFF', duration:.45, ease:'power2.inOut' }, 0.9);
    /* HOLD 1.7s na frase mudada */
    tl.to(q('.t-not'), { autoAlpha:0, y:-14, duration:.4, ease:'power2.in' }, 3.0);

    /* a pagina excelente reaparece; atras dela, a memoria acumulada */
    tl.to(q('.main'), { autoAlpha:1, duration:.7, ease:'power2.out' }, 3.2);
    qa('.hs').forEach(function(c, i){
      tl.to(c, { autoAlpha:.14, duration:.6, ease:'power2.out' }, 3.3 + i * .09);
    });
    show(q('.t-fin'), 3.4, .4, 3.7, 0);   // HOLD 3.7s
`));

/* ════════ F14 — End card · 6.5s ═══════════════════════════════════════
   A marca vem a existir por SUBTRAÇÃO: tudo se retira e o que sobra é ela.
   Único frame em que o roxo da marca aparece. */
W('14-end-card.html', frame('14-end-card', 6.5, `
    <div class="clip stage stage--dark" id="s-f14" data-start="0" data-duration="6.5">
      <div class="cam">${pcard('B', 'card main')}</div>
      <div class="wash"></div>
      <img class="end-logo lg" src="assets/kro-lockup.png" width="352" height="125" style="left:784px;top:344px" alt="kro ai">
      <div class="msg msg-xl msg--dark t-head" style="top:520px">Sua melhor página ainda é uma hipótese.</div>
      <div class="msg msg-md msg--dark msg-thin t-cta" style="top:640px">Teste com KRO AI.</div>
      <div class="kro-cap t-url" style="left:0;width:1920px;text-align:center;top:734px;font-size:19px;letter-spacing:.1em;color:#86868B">usekro.ai</div>
    </div>`, `
    tl.set(q('.main'), { x:${r2(960 - 600 * .42)}, y:${r2(560 - 312.5 * .42)}, scale:.42, autoAlpha:1 }, 0);
    tl.set(q('.wash'), { opacity:0 }, 0);
    /* uma retirada, nao uma explosao */
    tl.to(q('.main'), { scale:.34, autoAlpha:0, duration:1.0, ease:'power2.inOut' }, 0);   // autoAlpha/scale ja declarados no set acima
    tl.to(q('.wash'), { opacity:1, duration:1.0, ease:'power2.inOut' }, 0.1);
    show(q('.lg'), 1.2, .45, 4.85, 0, 14);
    show(q('.t-head'), 1.6, .4, 4.5, 0);
    show(q('.t-cta'), 1.9, .35, 4.25, 0);
    show(q('.t-url'), 2.1, .35, 4.05, 0);
    /* HOLD final 4.4s absolutamente estatico: nem jitter. */
`));
console.log('12,13,14 ok');
