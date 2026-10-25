# Frame packet: 16-end-card

## Project inputs

- Project: /home/user/lp-livro/videos/kro-site-que-aprende
- Design tokens: /home/user/lp-livro/videos/kro-site-que-aprende/frame.md
- RULES_DIR: /root/.claude/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 16 — Não escolha. Deixe seus clientes.

- scene: End card em dois tempos — a instrução e a entrega, com negative space e estabilidade absoluta
- duration: 9s
- transition_in: crossfade
- status: outline
- src: compositions/frames/16-end-card.html
- poster: 7.5s
- blueprint: titlecard-reveal
- rules: gradient-text-sweep, spring-pop-entrance
- onscreen_text: "Não escolha o que seu site deve dizer. / Deixe seus clientes fazerem isso por você."
- read_budget: "2.7s + 2.4s"
- hold: "0.8s + 2.8s"
- emphasis: "seus clientes → purple #7C3AED (o fragmento semanticamente central da mensagem final)"
- asset_candidates: "kro-logo-light.png (assets/kro-logo-light.png) · nenhum outro"
- handoff_in: "kro-logo-light.png — x 0, y -60px, largura 520px, opacity 1, parado; desce para a posição secundária (y +520px, largura 300px) em 700ms"
- handoff_out: "nenhum — último frame do filme"
- sfx: "a música reduz densidade em 0.0s · resolução musical limpa em 6.2–9.0s, sem corte abrupto"

**Shot sequence**

- **Cena A (0.0–0.7s) — o logo cede o palco.** O lockup desce e encolhe para a
  **posição secundária** (y +520px, 300px de largura) com `power2.inOut`. Fica
  visível até o fim do filme.
- **Cena B (0.5–3.2s) — "Não escolha o que seu site deve dizer."** Revelação simples
  **por máscara** (wipe vertical de baixo, 560ms), em `display` branco, com bastante
  negative space em volta (margens laterais de 88px, bloco entre y 740 e 980).
  Depois da entrada: **estabilidade absoluta**, 0,8s de hold.
- **Cena C (4.0–6.4s) — "Deixe seus clientes fazerem isso por você."** A mensagem
  hero. A primeira linha sai por fade de 300ms e esta entra no mesmo bloco com
  **uma única entrada elegante de 520ms** (mask + subida de 20px). Branco como base;
  **`seus clientes` em purple `#7C3AED`**, assentando 240ms depois da linha estar
  legível, com um `gradient-text-sweep` de uma passada só (900ms, purple→purple
  claro→purple) que termina e nunca se repete.
- **Cena D (6.4–9.0s) — o repouso.** **Zero movimento.** 2,6s de composição
  totalmente estável para leitura e retenção: a mensagem final, o lockup secundário
  e o campo charcoal. A música resolve limpa, sem corte abrupto.

---

## Video direction

**Formato e segurança.** 1080×1920 (9:16), Meta Ads / Reels / Stories. Safe area
respeitada em todo frame: nada crítico nos 260px do topo, 420px da base, 160px da
direita. A tipografia hero vive na faixa y 520–1400. O sistema (nível 2) pode
sangrar para fora; o texto nunca.

**A regra que vence todas as outras: legibilidade.** Não há locução — o texto é a
narrativa. Nenhuma frase desaparece antes de poder ser lida uma vez, sem pressa
(≈2,5–3 palavras/segundo). Quando sincronização musical e leitura entram em
conflito, **a leitura vence**. O corte fecha em 83s porque o conteúdo exige 83s.

**Câmera.** Com texto na tela para ler, a câmera praticamente para. Todo movimento
expressivo acontece antes do texto, na entrada, entre mensagens ou na transição.
Em todos os 16 frames a última tween de câmera termina **antes** do início do hold.
A landing page é o objeto cinematográfico: a câmera se aproxima dela (F4, F13, F14),
atravessa o espaço até ela (F3), orbita discretamente (F7, F11), acompanha variantes
(F6), desliza lateralmente entre versões (F6, F8) e recua para revelar o sistema
(F5, F11).

**Profundidade.** Três níveis em todos os frames: (1) chão atmosférico charcoal com
queda radial e luz direcional de cima-esquerda, parallax 0.25x; (2) sistema, UI e
objetos narrativos em `perspective: 2400px` com `preserve-3d`, parallax 0.6x;
(3) tipografia hero, sempre no plano da câmera, sem perspectiva e sem blur,
parallax 1.0x. Foreground só atravessa a câmera em transição (F1→F2), nunca sobre
texto que precisa ser lido.

**Entradas de texto — nunca a mesma duas vezes seguidas.** F1 mask de baixo · F2 beat
ancorado · F3 assentamento no lugar · F4 deslocamento vertical curto · F5 revelação
em dois fôlegos · F6 fade + escala · F7 slide lateral · F8 escala a partir da linha
de base · F9 mask lateral · F10 beat slam · F11 revelação com stagger de linha ·
F12 spring-pop · F13 fade + subida · F14 fôlegos sequenciais · F15 asset spring ·
F16 máscara vertical. Typewriter não é usado em nenhum frame.

**Destaque cromático.** Somente as palavras autorizadas pelo brief, e sempre
**depois** que a palavra já está legível em branco (atraso 180–260ms), como cor
assentando sobre texto estável — nunca glow, nunca fundo chapado. Tensão em areia
(`seis meses`, `problema`, `mesma coisa`), dado em cyan (`visitantes`, `agir`,
`resultado`, `cada visita`), marca em purple (`KRO AI`, `laboratório de
crescimento`, `clientes`), e recuo em text-light para o que sai do sistema
(`opinião`, `achismo`).

**Transições.** Uma linguagem dominante — crossfade de 420ms para continuidade
narrativa — e cortes secos apenas onde o corte **é** o significado: F1→F2 (o card
atravessa o foreground), F9→F10 (os dois beats percussivos) e F11→F12 (o impacto de
"seus clientes."). Nenhuma transição existe para criar variedade.

**Movimento com massa.** Interfaces grandes se movem devagar; cards e sinais se
movem rápido. Microinterações 150–400ms; transições cinematográficas 500–900ms.
Easing cinematográfico (`power2.inOut` para reposicionamento, `power3.out` para
aterrissagem). Sem bounce exagerado — overshoot máximo de 4%.

**Textura.** Grain SVG `fractalNoise` estático a 0.035 de opacidade sobre o filme
inteiro. Sombras suaves e direcionais só em objetos de UI que flutuam. Reflexo
linear de 6–10% no topo das superfícies claras. Glow curto e controlado **somente**
no elemento ativo do momento. Nunca glassmorphism generalizado, nunca neon.

**Trilha e sound design.** Instrumental eletrônico moderno, minimalista e crescente;
sem vocal, sem cyberpunk, sem futurismo excessivo. Começa contida e ganha camadas.
Mudança perceptível de energia e harmonia no Frame 5 ("laboratório de crescimento").
Duas marcações rítmicas idênticas no Frame 10 ("opinião" / "achismo"). Retirada de
camadas no início do payoff (Frame 15) e resolução limpa junto ao end card (Frame
16), sem corte abrupto. O sound design complementa a trilha e nunca compete com ela.

**Limite de promessa.** O produto não ganha nenhuma funcionalidade, métrica,
percentual ou resultado que não esteja no roteiro. Textos de variante são
placeholders tipográficos abstratos. Números em tela se leem como tela de produto,
nunca como promessa.

**Teste final obrigatório.** Rever o filme **sem áudio**. Se a narrativa não for
integralmente compreensível só pelo texto e pelos visuais, a edição está errada.

## Selected blueprint: titlecard-reveal

# titlecard-reveal — Title-Card / Single-Card Reveal

**intent**: The calm breather/landing beat — one clean title or single brand/proof card revealed with exactly one restrained move (a slide-up crossfade, or a wipe-away-to-reveal), then a still hold. Low motion is the payload, not a deficiency.

**roles served**

- Benefits (from `benefits-titlecard-crossfade`, #34): a calm two-line value title card — headline value line, then one slide-up crossfade to a qualifier/elaboration line that holds center.
- Social_Proof (from `social-proof-reveal-card`, #35): wipe a busy app-collage open away with one diagonal pill-sweep to reveal a clean brand lockup (icon + wordmark) plus a centered "loved by [N]+ [audience] teams" social-proof line that spring-settles and holds.
- CTA (from `hard-cut-card-stack-to-logo`): a monochrome end-card
  CHAIN — statement → CTA / availability line → brand wordmark/logo — separated by instant hard
  cuts at full opacity; each card is its own allocated stillness, and the sequence terminates on
  the logo held to the final frame.
- Product_Intro (from `title-card-prelude-chain`): a three-beat dark title
  PRELUDE before any product UI — `[logo]` pop → `[name]` (a `[version]` appends grey→bright) →
  `[tagline]` card — chained by clears and blur-snap handoffs rather than hard cuts.

**duration**: 3–5s (Benefits 3–4s; Social_Proof ~5s / observed 4.7s). Card chains run 2–3s per
card, ~5.5–9.5s total.

**shot structure**

```
Scene 1 (0.0–~0.4s): static camera on [neutral / dark background]. Establish the opening state.
  Variant — Benefits: empty-to-text — [benefit line 1] is about to fade in centered (no busy open).
  Variant — Social_Proof: a busy intro frame holds briefly — an [app-screenshot / use-case collage] of overlapping cards under a [setup line].

Scene 2 (~0.4–~1.5s): the ONE move executes — a single restrained reveal that brings the calm card to center.
  Variant — Benefits: [benefit line 1] fades in centered while scaling slightly (~95%→100%, smooth ease-out) and holds.
  Variant — Social_Proof: a large [accent-color] rounded pill sweeps diagonally bottom-left → top-right and exits the corner, clip-path wiping the collage away to reveal the [brand logo lockup] beneath as the [logo icon] strokes draw on.

Scene 3 (~1.5s–end): the revealed/settled card holds to the end (the allocated stillness). At most one subtle live element (a slow breathing pulse on the card, or a very slow camera drift). No second development phase.
  Variant — Benefits: [benefit line 1] translates up and fades out as [benefit line 2 — qualifier / elaboration] translates up from below center and fades in to take center; holds. (This single slide-up crossfade IS the one move — Benefits front-loads no Scene-2 wipe.)
  Variant — Social_Proof: the lockup — [logo icon] centered, [wordmark] below, centered [social-proof tagline] "Loved by [N]+ [audience] teams" (the [N]+ may count up) — spring-settles small, then holds.

Variant — card chain (CTA end-card stack / Product_Intro title prelude): the single-card contract
repeats 2–3 times in sequence. Each card is a complete Scene 1–3 in miniature — arrive (or simply
BE there), at most one restrained move, hold — and the seams between cards are INSTANT hard cuts
at full opacity (no crossfade, no fade-through-black) or, in the prelude flavor, a blur-away →
snap-into-focus handoff.
  Card moves stay on budget: a character-by-character type-on with visible partial states, a
  right-to-left backspace that resolves the [wordmark] into the small [logo icon], a grey→bright
  append ("[name]" gains "[version]"), a blur-snap into focus — or nothing beyond a
  barely-perceptible continuous slow scale-up across the hold.
  The final card is always the [brand logo / lockup], held static to the last frame.
```

**motion vocabulary**: single restrained reveal (gentle fade-in + subtle scale-up settle | diagonal clip-path pill-wipe), one slide-up crossfade between two centered lines (Benefits), icon stroke draw-on (Social_Proof), optional "[N]+ teams" count-up, logo+tagline spring-settle-and-hold, subtle breathing on the held card, hold-to-end. Calm register — no spring chains, no tumble, no per-beat flips, no second phase. Camera static (optional very slow drift only). Card-chain register: instant hard cut at full opacity as the only seam, barely-perceptible
continuous slow scale-up across each hold, character-by-character type-on with visible partial
states, right-to-left backspace collapsing the wordmark into the logo icon, grey→bright text
append, blur-away → snap-into-focus card handoff, logo pop with overshoot + glow (prelude opener),
monochrome text-on-solid throughout.

**rule mapping**

- gentle fade-in + subtle scale-up settle (Benefits Scene 2) → `rules/scale-swap-transition.md` (restrained in/settle; cross-reference the fade ease in `techniques.md`)
- single slide-up crossfade between two centered lines (Benefits Scene 3) → `rules/discrete-text-sequence.md` (one line hands off to the next; translate-up + crossfade)
- diagonal pill-wipe reveal (Social_Proof Scene 2) → `../techniques.md` (clip-path reveal masks — the wipe)
- icon stroke draw-on (Social_Proof Scene 2) → `rules/svg-path-draw.md`
- "[N]+ teams" count-up (Social_Proof Scene 3, optional) → `rules/counting-dynamic-scale.md`
- logo + tagline spring-settle-and-hold (Social_Proof Scene 3) → `rules/spring-pop-entrance.md` (single soft settle; intentionally one beat, not a chain)
- subtle breathing on the held card (the one live element during the hold) → `rules/sine-wave-loop.md`
- type-on / backspace / grey→bright append (chain cards) → `rules/discrete-text-sequence.md`
  (non-linear typing incl. backspace; drive the version append as a bulk addition)
- wordmark remainder resolves into the logo icon → `rules/scale-swap-transition.md` (same-center
  swap fired as the last character deletes)
- barely-perceptible slow scale-up across a hold → the camera-modifier drift
  (`rules/multi-phase-camera.md`, micro-drift register) applied per-card
- blur-away → snap-into-focus handoff (prelude flavor) → `rules/depth-of-field-blur.md` (single
  pull on the outgoing / incoming card)
- logo pop with overshoot + glow (prelude card 1) → `rules/spring-pop-entrance.md` +
  `rules/ambient-glow-bloom.md`
- instant hard cut at full opacity → not a rule: a timeline `tl.set` swap — deliberately NO
  transition entry.

**camera modifier**: optional — a single very slow drift/push under the hold only → `rules/multi-phase-camera.md`. Default is fully static; do not add unless the held beat would otherwise read as a freeze-frame.

**stillness note**: This is a legitimate allocated-stillness beat. The hold in Scene 3 is the deliverable, not an unanimated gap — do NOT manufacture a development phase, extra swaps, or force-animation. One restrained move + a subtle hold (optionally one breathing element or one slow drift) is the correct and complete shape. The card-chain variant does not break this: each card individually obeys the one-move + hold
contract, and the hard cut is a seam, not a move. Boundary: if the cards flip at sub-second tempo
or each beat carries its own entrance/exit energy, you have left this blueprint — that is
`kinetic-type-beats` (its CTA variant owns the high-tempo value-line stack).

## Selected motion rule: gradient-text-sweep

---
name: gradient-text-sweep
description: A gradient tweened THROUGH letterforms — background-clip:text + a backgroundPosition tween. Three forms: a continuous horizontal sweep inside a held headline, a traveling word-to-word highlight, and a hue-sweep that settles to a solid. Glyphs never move; finite, deterministic, seek-safe.
metadata:
  tags: gradient, text, sweep, background-clip, highlight, hue, typography, headline
---

# Gradient Text Sweep

Color that lives **inside the glyphs**: the headline's fill is an oversized gradient clipped into the letterforms (`background-clip: text`), and the motion is the gradient sliding **through** the type — the letters never move. Three forms: a **continuous sweep** across a held title card, a **word-to-word highlight** that lights a line left→right, and a **hue-sweep** that settles to a solid.

Boundaries: [asr-keyword-glow.md](asr-keyword-glow.md) is word-timed emphasis railed to ASR timestamps — this rule is a design beat with no audio rail. [ambient-glow-bloom.md](ambient-glow-bloom.md)'s traveling sweep is a sheen riding **over a surface**; here the gradient is masked **into the type** (its "Shimmer sweep" variation is this mechanism re-aimed as a working-state loop). [css-marker-patterns.md](css-marker-patterns.md) draws accents _around_ text, never fills.

## How It Works

The text carries a gradient background **wider than its own box** (`background-size: SWEEP_SPAN 100%`, e.g. `300% 100%`) clipped into the glyphs, so tweening `backgroundPosition` slides the gradient through the visible letterforms. Two gotchas own this rule:

- **`background-position` percentages only produce travel when `background-size` exceeds 100%** — at 100% the image is pinned and the tween is a silent no-op.
- **The percent axis runs opposite to the perceived travel** — tweening `"100% 50%"` → `"0% 50%"` moves the highlight left→right through the text.

1. **Continuous sweep (held title card)** — one long **linear** `backgroundPosition` tween spanning the hold. First and last color stops equal, so the travel has no visible seam and reads as endless while remaining a single finite tween.
2. **Word-to-word highlight** — each word is two pixel-identical stacked copies: a base copy in the resting color and a gradient-clipped copy at `opacity: 0`. A per-word opacity envelope (rise, then fall as the next word rises) passes the highlight along on an index-derived stagger — an **envelope, not a moving mask**: no per-word position measurement.
3. **Hue-sweep → solid** — the gradient holds position while a `filter: hue-rotate()` tween sweeps its hues; the settle is a stacked-copy crossfade to a solid twin — never a color-stop tween (gradients with different stops don't interpolate reliably).

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<!-- Forms A/C: gradient headline; solid twin behind for the Form C settle -->
<div class="headline-stack">
  <h1 class="headline solid-twin">{headlineText}</h1>
  <h1 class="headline gradient-fill" id="headline">{headlineText}</h1>
</div>

<!-- Form B: per-word stacked copies -->
<p class="line">
  <span class="word"><span class="w-base">{word1}</span><span class="w-hot">{word1}</span></span>
  <span class="word"><span class="w-base">{word2}</span><span class="w-hot">{word2}</span></span>
</p>
```

```css
.headline-stack,
.word {
  display: grid; /* twins share one cell — pixel-identical boxes */
}
.headline,
.w-base,
.w-hot {
  grid-area: 1 / 1;
}
.gradient-fill,
.w-hot {
  background-image: {gradient}; /* {sweepGradient} A/C, {highlightGradient} B */
  background-size: SWEEP_SPAN 100%; /* MUST exceed 100% or the position tween is dead */
  background-position: 100% 50%; /* start; tween toward 0% for left→right travel */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.solid-twin {
  color: {settleColor};
}
.w-base {
  color: {restColor};
}
.w-hot {
  opacity: 0; /* the envelope raises it as the highlight passes */
}
```

```js
// Form A: continuous sweep. 100% → 0% reads left→right (percent axis inverted);
// ease "none" — an eased sweep reads as an object, not light.
tl.fromTo(
  "#headline",
  { backgroundPosition: "100% 50%" },
  { backgroundPosition: "0% 50%", duration: SWEEP_DUR, ease: "none" },
  SWEEP_START,
);

// Form B: traveling highlight — per-word rise/fall envelopes, index stagger.
gsap.utils.toArray(".w-hot").forEach((el, i) => {
  const at = HIGHLIGHT_START + i * WORD_LAG;
  tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: HOT_RISE, ease: "power2.out" }, at);
  tl.to(el, { opacity: 0, duration: HOT_FALL, ease: "power2.in" }, at + WORD_LAG);
});

// Form C: hue-sweep, then crossfade to the solid twin (never tween color stops).
tl.fromTo(
  "#headline",
  { filter: "hue-rotate(0deg)" },
  { filter: `hue-rotate(${HUE_RANGE}deg)`, duration: HUE_DUR, ease: "power1.inOut" },
  HUE_START,
);
tl.to(
  "#headline",
  { opacity: 0, duration: SETTLE_SNAP_DUR, ease: "power2.in" },
  HUE_START + HUE_DUR,
);
```

## Variations

- **Title-card crawl** — Form A stretched across a long terminal hold (3–8s end card): seamless-ended gradient, `ease: "none"`, `SWEEP_DUR` = the whole hold. One tween, no loop.
- **One-pass sheen inside type** — gradient is the resting fill everywhere except one narrow highlight band (≤ ~25% of the span); one `backgroundPosition` pass carries the band through and the text returns to rest with no crossfade.
- **Karaoke settle** — Form B with the fall tweens skipped: the line lights cumulatively left→right and holds fully lit; settle color = the hot state, base copies start dimmer.
- **Gradient climax word** — one emphasized word (often ~-8° rotated) carries the gradient while the line stays solid; static gradient + a short Form C hue shift on landing, settling to the brand accent. Pairs with a `kinetic-beat-slam` arrival.

## Values

| token               | range                  | notes                                                                                |
| ------------------- | ---------------------- | ------------------------------------------------------------------------------------ |
| SWEEP_SPAN          | 200–400%               | must exceed 100%; wider = softer/slower feel, narrower = busier color per glyph      |
| SWEEP_DUR           | 1.2–3s                 | match the card's hold exactly; slower than ~4s stops registering as motion           |
| WORD_LAG            | 0.25–0.5s              | HOT_FALL starts exactly WORD_LAG after the rise so envelopes cross — a gap = a blink |
| HOT_RISE / HOT_FALL | 0.15–0.3s / 0.25–0.45s | fall slightly longer — the highlight "trails"                                        |
| HUE_RANGE / HUE_DUR | 40–180° / 0.8–1.6s     | past ~180° the palette dissociates from itself mid-sweep                             |
| SETTLE_SNAP_DUR     | 0.1–0.35s              | the goldens snap (~0.15s)                                                            |
| {settleColor}       | —                      | one of the gradient's own stops (or the brand ink) so the settle reads as resolution |

## Critical Constraints

- **`background-size` > 100%** on any element whose `backgroundPosition` is tweened — otherwise the tween is a silent no-op.
- **Percent axis is inverted** — left→right perceived travel is `100% → 0%`.
- **Both `-webkit-background-clip: text` AND `background-clip: text`, with `color: transparent`** — missing the prefix renders a solid gradient block over the text in the capture browser.
- **`ease: "none"` on position sweeps** — this is supposed to read as light, not an accelerating object.
- **Seamless ends for a crawl** — first and last stops equal, or the wrap point flashes a hard edge mid-hold.
- **Stacked copies pixel-identical** — same box, font, weight, tracking, one grid cell; any metric drift makes the crossfade a double-exposure.
- **`data-layout-allow-occlusion` on the twin** — pixel-identical stacked copies trip `hyperframes check`'s `text_occluded` gate by construction; the flag is the sanctioned waiver for this mechanism.
- **Settle by crossfade, never by tweening stops**; and the glyphs never move — if the type must travel, that's a separate rule on the wrapper.
- **No CSS `@keyframes` shimmer** — wall-clock animation desyncs from seek; every sweep is a timeline tween.

## See also

`kinetic-beat-slam` (slam lands the climax word, hue settle finishes it) · `spring-pop-entrance` (pop in solid, sweep after) · `discrete-text-sequence` (swap-slot under a riding crawl) · `ambient-glow-bloom` (surface-level sibling) · `css-marker-patterns` (strokes around text; fills here).

## Selected motion rule: spring-pop-entrance

---
name: spring-pop-entrance
description: The canonical entrance pop — an element (or staggered group) arrives by scaling 0 → 1 on a smooth long-tail settle (power3 default); bouncy overshoot is a rare, explicitly-playful exception. fromTo so it's correct at t=0 under seek.
metadata:
  tags: spring, entrance, pop, scale, power3, settle, stagger, reveal, arrival
---

# Spring-Pop Entrance

> **Smooth beats bouncy.** This entrance defaults to a smooth long-tail settle — `power3.out` (or `expo.out` for a faster front) — that decelerates cleanly into the resting size with **no overshoot**. Bouncy `back.out` is the **#1 instant turn-off** in agent-made videos and is almost never executed well; it is a rare, explicitly-playful exception (consumer / fun brand), never the default. When unsure, settle smoothly.

THE entrance primitive: an element (or staggered group) arrives by springing from nothing — `scale: 0 → 1`, optional small `y` rise — and settles without bouncing. This is **arrival**, not reaction: distinct from [press-release-spring.md](press-release-spring.md) (a click/press → release feedback chain on an element that already rests on screen). Many blueprints used to borrow that rule to fake an entrance; reach for this instead.

## How It Works

One `fromTo` carries the whole arrival: from `{ scale: 0, opacity: 0 }` (explicit, so t=0 is correct under seek) to `{ scale: 1, opacity: 1, ease: "power3.out" }`. For a **group**, the same `fromTo` runs per element at `i * STAGGER`, capped so the group reads as one arriving beat. The `scale` grow is load-bearing; the `y` rise is garnish — drop everything else and it must still read as a clean entrance. Let the ease produce the settle: never hand-key a `scale: 1.1` mid-state (it double-bounces against the curve).

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="pop-hero" id="hero">{heroLabel}</div>

<div class="pop-grid">
  <div class="pop-item">{itemA}</div>
  <div class="pop-item">{itemB}</div>
  <div class="pop-item">{itemC}</div>
</div>
```

```css
.pop-hero,
.pop-item {
  transform-origin: 50% 50%; /* in-place pop; move to the source point for the anchored variation */
  will-change: transform;
}
.pop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: GRID_GAP;
  place-items: center;
}
```

```js
// Single hero pop — smooth long-tail settle, no overshoot.
tl.fromTo(
  "#hero",
  { scale: 0, opacity: 0 },
  { scale: 1, opacity: 1, duration: POP_DUR, ease: "power3.out" },
  ENTRY_AT,
);

// Staggered group pop — one arriving beat.
gsap.utils.toArray(".pop-item").forEach((el, i) => {
  tl.fromTo(
    el,
    { scale: 0, opacity: 0, y: Y_RISE },
    { scale: 1, opacity: 1, y: 0, duration: POP_DUR, ease: "power3.out" },
    GROUP_ENTRY_AT + i * STAGGER,
  );
});
```

## Variations

- **Calm settle** (premium / enterprise): `power3.out`, no rotation, `Y_RISE` 0–12px — a weighted, confident landing for a hero wordmark or product shot.
- **Firm settle** (everyday default): `power3.out` or `expo.out` for a punchier front, `Y_RISE` ~24px — cards, icons, callouts.
- **Exact-physics settle**: when the settle IS the shot, swap the ease for `springEase({ response: 0.4 })` (critically damped) from `../adapters/gsap-easing-and-stagger.md` → Spring Eases; take `duration` from the helper.
- **Origin-anchored pop**: a callout growing out of a specific point (marker, pointer tip) sets `transform-origin` to that point (e.g. `0% 100%`) so `scale: 0 → 1` reads as "emerging from the source", not "inflating in place".
- **Pop into a held slot**: land the pop and hold still — no idle loop baked into the entrance. If the held frame genuinely needs life, hand off to [sine-wave-loop.md](sine-wave-loop.md) for subtle jitter on a separate later tween; prefer revealing the next element on its VO cue.
- **Bouncy pop (RARE — explicitly-playful only)**: swap the ease for `back.out(OVERSHOOT)` and optionally settle a small `rotation: ROT_FROM → 0` so elements look hand-placed. Only for a deliberately playful register — never product / enterprise / serious tone:

```js
tl.fromTo(
  el,
  { scale: 0, opacity: 0, rotation: ROT_FROM },
  { scale: 1, opacity: 1, rotation: 0, duration: POP_DUR, ease: `back.out(${OVERSHOOT})` },
  GROUP_ENTRY_AT + i * STAGGER,
);
```

Even here keep `OVERSHOOT ≤ ~2` — past that it reads as cartoon wobble. Better still: the baked spring at `dampingFraction: 0.6–0.7` (same adapters doc) gives ~5–10% overshoot that reads physical where `back.out` reads cartoon.

## Values

| token      | range                                     | notes                                                            |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------- |
| EASE       | `power3.out` default; `expo.out` punchier | `back.out(OVERSHOOT)` only in the playful variant                |
| POP_DUR    | 0.4–0.7s                                  | shorter = tight snap; hero must be visible by **t ≤ 0.5s**       |
| STAGGER    | 0.04–0.08s                                | `min(0.06, 0.5 / ITEM_COUNT)` — self-caps the window             |
| ITEM_COUNT | 3–9                                       | >9 makes the stagger vanish — switch to a wipe/sweep reveal      |
| Y_RISE     | 0–32px                                    | small; never large enough to read as a slide-up                  |
| ROT_FROM   | −10°–+10°                                 | playful variant only; alternate sign by index (`i % 2 ? 6 : -6`) |
| ENTRY_AT   | 0–0.4s                                    | a beat of quiet, but keep the subject landing by t ≤ 0.5s        |

## Critical Constraints

- Default ease `power3.out` (no overshoot); `back.out` only in the explicitly-playful variant, and there `OVERSHOOT ≤ ~2`.
- `ITEM_COUNT × STAGGER ≤ ~0.5s` — the group must land inside one beat.
- Entrances state the collapsed from-state in `fromTo` — never rely on a CSS-hidden start (it renders visible before the tween claims it under seek).
- `transform-origin: 50% 50%` for an in-place pop; the source point only for the anchored variation.
- This is a finite arrival — idle motion on a held element is a separate, later `sine-wave-loop` tween.

## See also

`center-outward-expansion` (pop while radiating to slots) · `press-release-spring` (the click-feedback counterpart) · `sine-wave-loop` (post-arrival jitter, sparingly).
