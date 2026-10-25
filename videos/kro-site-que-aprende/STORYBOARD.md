---
format: 1080x1920
duration: 83s
mode: autonomous
message: "Seu site não precisa adivinhar o que dizer — o KRO AI testa as mensagens e deixa os seus próprios clientes revelarem qual funciona"
arc: Reconhecimento → Contradição → Tensão → Descoberta → Aceleração → Confiança → Payoff → Resolução de marca
audience: "Founders de negócios digitais, CMOs, gestores de tráfego e performance, growth marketers, times de CRO, e-commerce, SaaS e agências de performance"
music: "minimal modern electronic underscore, sophisticated corporate tech, clean percussion, controlled sub bass, subtle digital texture, no vocals, building layers"
narration: none
---

# KRO AI — O site que aprende

**Sem locução.** O roteiro é texto de tela, verbatim, na ordem original. O campo
`onscreen_text` de cada frame é o roteiro — nenhuma palavra foi cortada, resumida
ou reordenada. `read_budget` registra o tempo de leitura reservado (≈2,5–3
palavras/segundo) e `hold` o tempo em que a composição fica **parada** depois da
frase completa.

---

## Frame 1 — O site que não muda há seis meses

- scene: Landing page imóvel no centro de um sistema de marketing em movimento constante
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/01-site-estatico.html
- poster: 4.5s
- blueprint: overwhelm-surround (variante clutter-shove, sem avatar)
- rules: viewport-change, waterfall-entry
- onscreen_text: "Se o seu site diz exatamente a mesma coisa há seis meses, existe um problema."
- read_budget: 4.5s
- hold: 1.5s
- emphasis: "seis meses → sand #D8C0A7 · problema → sand #D8C0A7"
- asset_candidates: "landing-mock (programático) · ad-card ×6 (programático) · metric-readout ×2 (programático)"
- handoff_out: "ad-card-hero — x +300→-640px, y +520px, scale 1.0→1.18, opacity 1, varrendo para a esquerda a ~1100px/s com rastro de motion blur de 18px"
- sfx: "impacto grave discreto no t=0 · primeiro beat"

**Shot sequence**

- **Cena A (0.0–0.6s) — push-in de abertura.** A câmera entra rápido (`viewport-change`,
  scale 1.14→1.00, `power3.out`) sobre um campo charcoal com queda de luz direcional
  vinda de cima-esquerda. No centro-alto, ligeiramente deslocada do eixo (x -40px,
  y -120px), a **landing-mock** em superfície clara. Ao redor dela, no nível 2 de
  profundidade, seis **ad-cards** e dois **metric-readouts** já estão presentes em
  perspectiva, desfocados a 6px (desfoque seletivo de profundidade).
- **Cena B (0.3–1.5s) — o sistema se mexe, a página não.** Os ad-cards trocam de
  versão em cascata (`waterfall-entry`, stagger 0.09s, total ≤0.5s): bloco de imagem
  troca, barras de copy mudam de largura. Os metric-readouts pulsam. **A
  landing-mock não tem uma única propriedade animada** — a ausência de movimento é
  o conteúdo da cena.
- **Cena C (1.0–4.5s) — a frase constrói.** A tipografia hero entra na faixa segura
  (y 980–1400) em três respirações, não palavra por palavra: *"Se o seu site diz
  exatamente a mesma coisa"* (1.0s, mask-reveal de baixo, 520ms) → *"há seis
  meses,"* (2.3s) → *"existe um problema."* (3.4s). A câmera **para completamente**
  em 1.0s e não volta a se mover.
- **Cena D (2.6–4.4s) — destaque semântico.** 260ms depois de cada fragmento estar
  legível em branco, `seis meses` e `problema` assentam em areia `#D8C0A7`
  (cross-fade de cor 340ms, sem glow, sem fundo).
- **Cena E (4.5–6.0s) — o hold.** Composição praticamente parada por 1,5s. Só os
  ad-cards periféricos continuam trocando, bem devagar e desfocados — o contraste
  fica suspenso. No t=5.7s o **ad-card-hero** se destaca do grupo e começa a varrer
  o foreground para a esquerda, entregando o corte.

---

## Frame 2 — Você otimiza tudo

- scene: Quatro beats de otimização num único espaço contínuo — anúncios, criativos, campanhas, métricas
- duration: 9s
- transition_in: cut
- status: animated
- src: compositions/frames/02-voce-otimiza-tudo.html
- poster: 7.5s
- blueprint: fixed-anchor-cycle
- rules: scale-swap-transition, counting-dynamic-scale
- onscreen_text: "Você muda seus anúncios. / Testa novos criativos. / Ajusta campanhas. / Analisa CPC, leads e vendas."
- read_budget: "2s + 2s + 2s + 3s"
- hold: "0.6s por beat; 1.2s no último"
- emphasis: "nenhuma — esta sequência é reconhecimento, não tensão. Cor entra só nos números (cyan)."
- asset_candidates: "ad-card (programático) · variant-thumb ×3 (programático) · campaign-control (programático) · metric-readout CPC/Leads/Vendas (programático)"
- handoff_in: "ad-card-hero — entra em x -640px, y +520px, scale 1.18, opacity 1, desacelerando (power3.out, 520ms) até x 0, y 0, scale 1.0"
- handoff_out: "o conjunto inteiro (ad-card + variantes + controles + métricas) — x 0, y 0, scale 1.0, opacity 1, imóvel; no t=8.4s começa a se liquefazer em fluxos"
- sfx: "click/snap sincronizado na troca do anúncio (2.0s) · três ticks discretos (4.2/4.5/4.8s) · pulso rítmico por indicador (6.3/6.9/7.5s)"

**Shot sequence**

Um único palco: o ad-card-hero **fica ancorado no centro** (x 0, y -80px) durante os
quatro beats; o que muda é o que acontece em volta dele. Nenhum beat é um slide.

- **Cena A (0.0–2.0s) — "Você muda seus anúncios."** O card desacelera no centro. Sua
  composição interna troca entre duas versões por `scale-swap-transition` (hard
  swap com 140ms de compressão em scale, nunca crossfade). Câmera: tracking lateral
  curto de 60px, `power2.inOut`, que **termina antes** do texto estar completo.
  Texto em `statement` na faixa y 1180–1300.
- **Cena B (2.0–4.0s) — "Testa novos criativos."** O card se multiplica em três
  variantes visuais (entrada em cascata, stagger 0.08s — multiplicação organizada,
  nunca explosiva), que voltam a colapsar numa composição dominante em 3.4s.
  Câmera parada.
- **Cena C (4.0–6.0s) — "Ajusta campanhas."** Entram dois `campaign-control` abaixo
  do card: um slider e um stepper. Os handles deslizam e assentam
  (controle acoplado ao alvo), e o card responde — uma barra de orçamento acompanha.
  Pequeno deslocamento vertical de câmera (y -48px) entre 4.0 e 4.6s, depois para.
- **Cena D (6.0–9.0s) — "Analisa CPC, leads e vendas."** Três `metric-readout`
  entram integrados ao espaço (não flutuando sobre ele): **CPC**, **Leads**,
  **Vendas**. Os números rodam rápido (`counting-dynamic-scale`) por 900ms e
  **param para leitura** em 7.6s. Valores são demonstrativos de tela de produto.
  Hold de 1.2s. Em 8.4s os elementos começam a perder a forma de card.

---

## Frame 3 — Tudo converge para uma página congelada

- scene: Os elementos viram fluxos de tráfego que convergem na landing page — e tudo para
- duration: 7s
- transition_in: crossfade
- status: animated
- src: compositions/frames/03-trafego-congela.html
- poster: 5.5s
- blueprint: camera-journey (sub-shape B, voo sem cursor)
- rules: svg-path-draw
- onscreen_text: "Mas o lugar para onde todo esse tráfego vai... / continua dizendo exatamente a mesma coisa."
- read_budget: "3s + 2s"
- hold: "1s + 1s"
- emphasis: "mesma coisa → sand #D8C0A7"
- asset_candidates: "traffic-flow ×7 (SVG programático) · landing-mock (programático)"
- handoff_in: "o conjunto do Frame 2 — x 0, y 0, scale 1.0, opacity 1, parado; dissolve em fluxos ao longo de 600ms"
- handoff_out: "landing-mock — x 0, y +40px, scale 0.88, opacity 1, movimento ZERO (travada); iluminação purple/cyan a 55% da intensidade"
- sfx: "sweep espacial no voo (0.4–2.6s) · a música perde os elementos percussivos em 3.0s · nenhum som novo durante o congelamento"

**Shot sequence**

- **Cena A (0.0–0.8s) — a liquefação.** Os cards e indicadores do frame anterior
  perdem a borda e viram sete **traffic-flows**: linhas SVG que se desenham
  (`svg-path-draw`) em direção a um ponto de fuga baixo.
- **Cena B (0.4–2.8s) — o voo.** A câmera acompanha o fluxo (voo de câmera em perspectiva 3D:
  translateZ +380px, rotateX -8°, `power2.in` na partida), **energética**, com
  rastro de motion blur nas linhas. Ao fundo, crescendo, a **landing-mock**.
- **Cena C (1.6–4.0s) — primeira frase.** *"Mas o lugar para onde todo esse tráfego
  vai..."* entra em `statement` conforme a câmera desacelera (`power3.out`). Em
  3.0s a câmera **para na página** e a música solta a percussão.
- **Cena D (4.0–7.0s) — o congelamento.** Locked shot absoluto. A frase anterior sai
  por mask-wipe e *"continua dizendo exatamente a mesma coisa."* assenta no mesmo
  lugar (sem nova entrada de câmera). `mesma coisa` vira areia em 5.2s. Dentro da
  interface, a headline placeholder fica **visivelmente presa** — um caret parado
  no fim dela, sem piscar. A luz purple/cyan cai para 55%. Nada se move por 2s.

---

## Frame 4 — As mensagens que você nunca testou

- scene: Versões fantasma da headline aparecem atrás da headline travada
- duration: 5.5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/04-mensagens-fantasma.html
- poster: 4.2s
- blueprint: titlecard-reveal
- rules: viewport-change, depth-of-field-blur
- onscreen_text: "E talvez essa nem seja a melhor mensagem para vender o seu produto."
- read_budget: 4.3s
- hold: 1.2s
- emphasis: "nenhuma — a frase inteira é a dúvida. Destacar uma palavra enfraqueceria."
- asset_candidates: "landing-mock (programático) · ghost-headline ×3 (programático)"
- handoff_in: "landing-mock — x 0, y +40px, scale 0.88, opacity 1, imóvel, luz a 55%"
- handoff_out: "landing-mock — x 0, y +40px, scale 0.96, opacity 1, imóvel; ghost-headlines a opacity 0.14 atrás dela"
- sfx: "riser muito discreto, -24dB, subindo de 1.8s a 4.3s, resolvendo sem clímax"

**Shot sequence**

- **Cena A (0.0–5.5s) — slow push-in.** `viewport-change` leva a scale de 0.88 a 0.96
  em 5,5s inteiros, `power1.inOut` — lento o bastante para a leitura não sofrer. É o
  único movimento do frame.
- **Cena B (0.3–3.6s) — a frase.** Constrói em dois fôlegos: *"E talvez essa nem seja
  a melhor mensagem"* (0.3s) → *"para vender o seu produto."* (2.0s). Entrada por
  deslocamento vertical curto de 24px + fade, 480ms — diferente da entrada do Frame 1
  (que era mask) e do Frame 3 (que era assentamento no lugar).
- **Cena C (1.4–4.3s) — os fantasmas.** Atrás da headline travada, **três
  ghost-headlines** surgem em camadas de profundidade crescente (entrada em cascata,
  stagger 0.22s), a opacity 0.14, 0.10 e 0.07, desfocadas a 3px, 5px e 7px
  (`depth-of-field-blur`). São alternativas que nunca foram testadas: barras
  tipográficas abstratas, nunca copy comercial. Entram **sem competir** com o texto
  hero — nenhuma ultrapassa 0.14 de opacidade.
- **Cena D (4.3–5.5s) — hold generoso.** 1,2s de composição estável. O riser resolve.

---

## Frame 5 — O KRO AI entra

- scene: A página ganha profundidade e vira um sistema — o momento central de transformação
- duration: 5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/05-kro-ai-laboratorio.html
- poster: 4.0s
- blueprint: zoom-out-workspace-reveal
- rules: center-outward-expansion
- onscreen_text: "O KRO AI transforma seu site em um laboratório de crescimento."
- read_budget: 3.7s
- hold: 1.0s
- emphasis: "KRO AI → purple #7C3AED · laboratório de crescimento → purple #7C3AED"
- asset_candidates: "landing-mock (programático) · lab-plane ×4 (programático) · system-link (SVG programático) · kro-logo-light.png (marca d'água de canto, 0.18 de opacidade)"
- handoff_in: "landing-mock — x 0, y +40px, scale 0.96, opacity 1, imóvel; ghosts a 0.14"
- handoff_out: "landing-mock — x 0, y -300px, scale 0.58, opacity 1, assentada; quatro lab-planes em perspectiva abaixo e atrás dela"
- sfx: "impacto grave elegante em 0.0s · mudança musical clara: entram harmonia e camada nova"

**Shot sequence**

- **Cena A (0.0–0.5s) — a virada.** Impacto grave. A iluminação troca de dominante:
  o purple `#7C3AED` assume o papel principal (bloom ambiente controlado, raio curto,
  opacidade máxima 0.42), com cyan `#06B6D4` como complemento em borda. Os ghosts
  do frame anterior **ganham corpo** em vez de desaparecer.
- **Cena B (0.2–1.8s) — a headline se desprende do plano.** A headline de dentro da
  landing-mock sai do plano da página (translateZ +90px, entrada spring-pop com
  overshoot contido de 4%) — o objeto rígido virou objeto manipulável.
- **Cena C (0.6–2.4s) — dolly-out.** voo de câmera em perspectiva 3D: translateZ -420px, rotateX
  de 0° para -6°, `power3.out` de 1,8s. A página encolhe de 0.96 para 0.58 e sobe
  para y -300px, revelando que agora faz parte de um **sistema maior**: quatro
  `lab-planes` em perspectiva se abrem a partir do centro
  (`center-outward-expansion`) e `system-links` em cyan os costuram.
- **Cena D (1.3–4.0s) — a frase.** *"O KRO AI transforma seu site em"* (1.3s) →
  *"um laboratório de crescimento."* (2.6s), em `display`, na faixa y 1120–1340.
  A câmera já está parada em 2.4s. `KRO AI` e `laboratório de crescimento` assentam
  em purple 240ms após cada fragmento ficar legível.
- **Cena E (4.0–5.0s) — hold.** O sistema respira de leve (deriva de 0.4px/s nos
  lab-planes, imperceptível), o texto não.

---

## Frame 6 — Ele cria variantes da mensagem

- scene: Uma headline se ramifica em quatro variações tipográficas da mesma posição
- duration: 3.5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/06-variantes.html
- poster: 2.8s
- blueprint: grid-card-assemble
- rules: card-morph-anchor
- onscreen_text: "Ele cria novas formas de apresentar sua mensagem."
- read_budget: 2.7s
- hold: 0.8s
- emphasis: "nenhuma"
- asset_candidates: "landing-mock (programático) · variant-card ×4 (programático)"
- handoff_in: "landing-mock — x 0, y -300px, scale 0.58, opacity 1, assentada; lab-planes em perspectiva"
- handoff_out: "quatro variant-cards — x -330/-110/+110/+330px, y +180px, scale 0.82, opacity 1, parados em fileira"
- sfx: "quatro soft clicks de ramificação, 0.5/0.72/0.94/1.16s, -20dB"

**Shot sequence**

- **Cena A (0.0–1.4s) — a ramificação.** A headline da landing-mock **se ramifica
  organicamente**: `card-morph-anchor` ancora a posição original e emite quatro
  `variant-cards` que crescem dela por caminho curvo (entrada em cascata, stagger
  0.22s, total 0.66s). Cada variante carrega a **mesma mensagem reapresentada** —
  placeholders tipográficos abstratos de densidade e quebra diferentes, nunca copy
  comercial inventada.
- **Cena B (0.4–1.2s) — movimento lateral.** câmera virtual desliza a câmera
  120px para a direita e volta 40px, acompanhando a abertura do leque. Termina em
  1.2s, antes do texto completar.
- **Cena C (0.6–2.7s) — a frase.** *"Ele cria novas formas de apresentar sua
  mensagem."* entra em `statement-sm` por fade + escala 0.98→1.00 (entrada
  diferente de todas as anteriores), em um fôlego só, 560ms.
- **Cena D (2.7–3.5s) — hold.** As quatro variantes assentam em fileira, paradas.

---

## Frame 7 — Os visitantes avaliam

- scene: As variantes ocupam planos paralelos e fluxos de visitantes chegam a elas
- duration: 4s
- transition_in: crossfade
- status: animated
- src: compositions/frames/07-visitantes-avaliam.html
- poster: 3.2s
- blueprint: camera-journey
- rules: nudge-curve, cursor-click-ripple
- onscreen_text: "Coloca essas versões para serem avaliadas pelos próprios visitantes."
- read_budget: 3.0s
- hold: 1.0s
- emphasis: "visitantes → cyan #06B6D4"
- asset_candidates: "variant-card ×4 (programático) · signal-dot ×14 (programático) · flow-path (SVG programático)"
- handoff_in: "quatro variant-cards — x -330/-110/+110/+330px, y +180px, scale 0.82, opacity 1, parados"
- handoff_out: "quatro variant-cards — abertos em planos paralelos (translateZ 0/-90/-180/-270px), opacity 1, parados; sinais cyan acumulados na superfície de cada um"
- sfx: "UI interactions discretas por chegada de sinal (14 eventos, -26dB, escalonados) · pequenos pulses de dados"

**Shot sequence**

- **Cena A (0.0–1.0s) — os planos se separam.** voo de câmera em perspectiva 3D gira a cena
  para 3/4 (rotateY +14°) e as quatro variantes se descolam em **planos paralelos**
  de profundidade (translateZ 0, -90, -180, -270px). A câmera para em 1.0s.
- **Cena B (0.5–4.0s) — os visitantes chegam.** Quatorze **signal-dots** cyan entram
  pela base por caminhos curvos (`nudge-curve`), cada um com trilha curta, e tocam
  uma das variantes. No toque, `cursor-click-ripple` deixa um anel cyan de feedback
  que permanece na superfície. **Nenhum avatar, nenhum ícone de pessoa, nenhuma
  partícula aleatória** — os sinais chegam em cadência agendada, determinística.
- **Cena C (0.7–3.0s) — a frase.** *"Coloca essas versões para serem avaliadas"*
  (0.7s) → *"pelos próprios visitantes."* (1.9s), em `statement-sm`, entrada por
  slide lateral curto de 30px. `visitantes` assenta em cyan em 2.6s.
- **Cena D (3.0–4.0s) — hold.** Texto parado. Só os sinais continuam chegando, numa
  respiração lenta (respiração senoidal de amplitude 3px nas trilhas).

---

## Frame 8 — Quais fazem mais gente agir

- scene: Algumas variantes recebem mais sinais; uma começa a ganhar prioridade espacial
- duration: 3.5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/08-fazem-agir.html
- poster: 2.8s
- blueprint: dataviz-countup
- rules: coordinate-target-zoom
- onscreen_text: "Observa quais delas fazem mais pessoas agir."
- read_budget: 2.3s
- hold: 1.0s
- emphasis: "agir → cyan #06B6D4"
- asset_candidates: "variant-card ×4 (programático) · signal-counter ×4 (programático) · potential-bar ×4 (programático)"
- handoff_in: "quatro variant-cards — planos paralelos translateZ 0/-90/-180/-270px, opacity 1, parados, com sinais acumulados"
- handoff_out: "variant-card #2 — x -40px, y +120px, scale 0.94, opacity 1, em foco; as outras três a opacity 0.45, blur 4px, recuadas"
- sfx: "pulso de dados acumulando (0.3–2.0s) · um pulso mais cheio quando a variante em foco se destaca (2.2s)"

**Shot sequence**

- **Cena A (0.0–2.0s) — os sinais se acumulam de forma desigual.** Cada variante
  ganha um `signal-counter` cyan que sobe (contador com escala dinâmica) em ritmos
  diferentes, e uma `potential-bar` que preenche por `scaleX`
  (barra de preenchimento por scaleX). Duas respondem mais, uma responde bem menos.
- **Cena B (1.6–3.0s) — a aproximação.** `coordinate-target-zoom` leva a câmera
  suavemente até a variante com maior resposta (scale 1.0→1.12 com
  contra-translação), e desfoque seletivo de profundidade desfoca as outras a 4px. A variante
  ganha **prioridade espacial, não medalha**: nenhum selo de "vencedora", nenhuma
  coroa, nenhum troféu. Os dados convergem para ela por linhas cyan.
- **Cena C (0.4–2.3s) — a frase.** *"Observa quais delas fazem mais pessoas agir."*
  entra em `statement-sm` em um fôlego, por escala vertical a partir da linha de
  base (origem bottom, 0.94→1.00), 520ms. `agir` assenta em cyan em 2.0s.
- **Cena D (2.3–3.5s) — hold.** Câmera parada em 3.0s; composição estável.

---

## Frame 9 — O potencial de gerar resultado

- scene: O sistema reorganiza as variantes por potencial observado
- duration: 4.5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/09-potencial-resultado.html
- poster: 3.6s
- blueprint: grid-card-assemble
- rules: depth-scatter-assemble
- onscreen_text: "E mostra quais mensagens têm mais potencial para gerar resultado."
- read_budget: 3.3s
- hold: 1.2s
- emphasis: "resultado → cyan #06B6D4"
- asset_candidates: "variant-card ×4 (programático) · potential-bar ×4 (programático)"
- handoff_in: "variant-card #2 — x -40px, y +120px, scale 0.94, opacity 1, em foco; as outras três a opacity 0.45, blur 4px"
- handoff_out: "variant-card #2 — x 0, y 0, scale 1.0, opacity 1, centralizada e totalmente assentada; as outras três a opacity 0.3, translateZ -240px"
- sfx: "sweep curto na reorganização (0.2–1.1s) · nenhum som durante o assentamento final"

**Shot sequence**

- **Cena A (0.0–1.4s) — a reorganização.** `depth-scatter-assemble` reordena as
  quatro variantes **por potencial observado**: a de maior resposta vem ao plano
  frontal e se centraliza; as outras recuam em Z (-80, -160, -240px), perdendo
  prioridade sem desaparecer. Aprendizado é hierarquia mudando, não eliminação.
- **Cena B (1.0–2.2s) — a luz.** bloom ambiente controlado muito controlado: purple na
  borda superior da variante em foco, cyan na `potential-bar` que a acompanha.
  Opacidade máxima 0.38, raio 40px. Nada mais no frame recebe glow.
- **Cena C (0.5–3.3s) — a frase.** *"E mostra quais mensagens têm mais potencial"*
  (0.5s) → *"para gerar resultado."* (2.0s), em `statement-sm`, entrada por
  mask-reveal lateral da esquerda, 540ms. `resultado` assenta em cyan em 2.9s.
- **Cena D (3.3–4.5s) — assentamento completo.** O brief pede que a composição
  assente totalmente no fim da frase: toda tween termina até 3.3s. 1,2s de imagem
  parada.

---

## Frame 10 — Sem opinião, sem achismo

- scene: Duas camadas subjetivas são retiradas do sistema em movimentos paralelos
- duration: 4s
- transition_in: cut
- status: animated
- src: compositions/frames/10-opiniao-achismo.html
- poster: 1.4s
- blueprint: titlecard-reveal (card chain — dois cards quase imóveis costurados por corte seco)
- rules: kinetic-beat-slam, scale-swap-transition
- onscreen_text: "Sem depender de opinião. / Sem depender de achismo."
- read_budget: "1.4s + 1.4s"
- hold: "0.6s + 0.6s"
- emphasis: "opinião → text-light (recuando) · achismo → text-light (recuando)"
- asset_candidates: "variant-card #2 (programático) · opinion-layer (programático) · guess-layer (programático) · signal-dot ×8 (programático)"
- handoff_in: "variant-card #2 — x 0, y 0, scale 1.0, opacity 1, centralizada e parada"
- handoff_out: "variant-card #2 — x 0, y 0, scale 1.0, opacity 1, limpa: só sinais cyan reais sobre ela"
- sfx: "beat seco em 0.35s · segundo beat seco em 2.35s — exatamente a mesma amostra, mesmo nível (paralelismo)"

**Shot sequence**

Dois beats percussivos idênticos em mecânica, para que o paralelismo da frase vire
paralelismo de imagem. O brief proíbe variar a transição só por variedade — aqui a
repetição **é** o argumento.

- **Cena A (0.0–2.0s) — "Sem depender de opinião."** Sobre a variante em foco há uma
  **opinion-layer**: uma anotação sobreposta, bege `#D8C0A7` a 0.5 de opacidade,
  com rabiscos de marcação e um balão de comentário. Em 0.35s ela é **varrida para
  fora** por swipe limpo para a direita (x 0→+760px, 320ms, `power3.in`, com
  rastro de motion blur de 14px), no beat seco. O texto `statement` entra em 0.2s
  por `kinetic-beat-slam` e `opinião` cai para text-light em 1.1s — a palavra
  recua porque é o que está saindo do sistema.
- **Cena B (2.0–4.0s) — "Sem depender de achismo."** Mecânica **idêntica**, mesma
  distância, mesma duração, mesmo easing: a **guess-layer** (um palpite escrito à
  mão sobre a headline) sai pelo mesmo vetor em 2.35s. Debaixo dela ficam **apenas
  sinais reais de comportamento** — oito signal-dots cyan com seus anéis de
  feedback. 0,6s de hold fecha o frame.

---

## Frame 11 — A página deixa de ser estática

- scene: A página do início volta, parece imóvel por um instante, e então começa a responder
- duration: 8s
- transition_in: crossfade
- status: animated
- src: compositions/frames/11-deixa-de-ser-estatica.html
- poster: 6.5s
- blueprint: panel-edit-live-sync
- rules: viewport-change
- onscreen_text: "Seu site deixa de ser uma página estática... / e passa a aprender com quem realmente importa:"
- read_budget: "2.9s + 2.9s"
- hold: "1.1s + 1.1s"
- emphasis: "nenhuma — a frase 17 prepara a palavra do Frame 12. Destacar aqui roubaria o payoff."
- asset_candidates: "landing-mock (programático) · signal-dot ×18 (programático) · feedback-flow (SVG programático)"
- handoff_in: "variant-card #2 — x 0, y 0, scale 1.0, opacity 1; dissolve de volta na landing-mock original em 600ms"
- handoff_out: "landing-mock — x 0, y -40px, scale 0.70, opacity 1, respondendo; dezoito signal-dots cyan em órbita baixa ao redor"
- sfx: "silêncio de 0.0 a 0.8s (o instante em que ela parece imóvel de novo) · a música cresce em camadas de 3.0s em diante"

**Shot sequence**

- **Cena A (0.0–0.8s) — a falsa imobilidade.** A landing-mock do início volta,
  frontal, **exatamente como no Frame 1**: mesma escala, mesma posição, movimento
  zero. Por uma fração de segundo o filme parece ter voltado ao problema. Áudio em
  silêncio reforça.
- **Cena B (0.8–3.0s) — ela responde.** morph de tema por crossfade acende a superfície
  (de 55% para 100% de luz) e os componentes internos começam a **reagir aos dados
  ao redor**: a headline troca de peso, o botão muda de posição, um bloco se expande
  (expansão ancorada) — cada mudança disparada por um sinal cyan que chega
  (controle acoplado ao alvo). Câmera: frontal → leve mudança de perspectiva
  (rotateY 0°→-9°, 1,6s, `power2.inOut`), parando em 3.0s.
- **Cena C (0.6–3.5s) — primeira frase.** *"Seu site deixa de ser uma página
  estática..."* em `statement`, entrada por revelação de baixo com stagger de linha
  (420ms). Hold de 1,1s até 4.0s.
- **Cena D (4.0–7.0s) — segunda frase.** *"e passa a aprender com quem realmente
  importa:"* substitui a anterior no mesmo bloco. Os `feedback-flows` chegam agora
  **de fora para dentro** (curva de desvio), e a cada chegada a hierarquia da
  mensagem na página muda visivelmente — o que era pequeno sobe, o que era grande
  recua. Dolly-out muito lento (`viewport-change`, scale 1.0→0.92 ao longo de 3s),
  o único movimento.
- **Cena E (7.0–8.0s) — hold.** Os dois pontos no fim da frase ficam suspensos. A
  música cresce em direção ao payoff. Tudo parado menos os sinais.

---

## Frame 12 — seus clientes.

- scene: Todo o sistema some; ficam a página e os sinais dos visitantes
- duration: 2s
- transition_in: cut
- status: animated
- src: compositions/frames/12-seus-clientes.html
- poster: 1.4s
- blueprint: titlecard-reveal
- rules: spring-pop-entrance, depth-of-field-blur
- onscreen_text: "seus clientes."
- read_budget: 0.8s
- hold: 1.2s
- emphasis: "clientes → purple #7C3AED"
- asset_candidates: "landing-mock (programático) · signal-dot ×18 (programático)"
- handoff_in: "landing-mock — x 0, y -40px, scale 0.70, opacity 1; dezoito signal-dots cyan em órbita baixa"
- handoff_out: "hero type 'seus clientes.' — x 0, y +160px, scale 1.0, opacity 1, absolutamente parada"
- sfx: "pequeno impacto emocional em 0.0s — grave curto, sem cauda percussiva"

**Shot sequence**

- **Cena A (0.0–0.5s) — a redução.** Todo o sistema de experimentação desaparece de
  uma vez (não um a um): lab-planes, variantes, counters, linhas. **Restam apenas a
  landing-mock e os sinais que vieram dos visitantes**, desfocados a 5px
  (`depth-of-field-blur`) — eles passam a ser fundo porque a palavra é o assunto.
- **Cena B (0.0–0.8s) — a palavra.** *"seus clientes."* entra em `hero` (100px,
  Sora 700) por `spring-pop-entrance` com overshoot de 3% — muito grande, centrada,
  na faixa y 980–1120. `clientes` em purple desde o primeiro frame desta palavra:
  aqui a cor **é** o conteúdo, não um destaque posterior.
- **Cena C (0.8–2.0s) — quase zero movimento.** Depois da entrada, nada se move.
  1,2s de imagem parada sobre 2s de frame.

---

## Frame 13 — Não é só trazer mais gente

- scene: Muitos fluxos novos se aproximam, mas a câmera escolhe deliberadamente não segui-los
- duration: 6s
- transition_in: crossfade
- status: animated
- src: compositions/frames/13-mais-pessoas.html
- poster: 4.8s
- blueprint: camera-journey
- rules: viewport-change
- onscreen_text: "Porque aumentar o faturamento não significa apenas trazer mais pessoas para o seu site."
- read_budget: 4.7s
- hold: 1.3s
- emphasis: "nenhuma — o contraste é de câmera, não de cor."
- asset_candidates: "landing-mock (programático) · traffic-flow ×22 (SVG programático) · signal-dot ×6 (programático)"
- handoff_in: "hero type 'seus clientes.' — x 0, y +160px, scale 1.0, opacity 1; sai por fade de 400ms enquanto a página volta ao foco"
- handoff_out: "um único signal-dot — x -120px, y +620px, scale 1.0, opacity 1, iniciando a subida pela página"
- sfx: "camada de tráfego ao longe, larga e desfocada (0.5–3.0s) · ela some quando a câmera escolhe as visitas existentes (3.2s)"

**Shot sequence**

- **Cena A (0.0–1.6s) — a enxurrada.** Vinte e dois novos **traffic-flows** entram
  pelas bordas em direção à página (curva de desvio + rastro de motion blur), largos,
  rápidos, muitos. É a imagem do "mais tráfego".
- **Cena B (1.6–3.2s) — a recusa da câmera.** O movimento óbvio seria acompanhá-los.
  A câmera faz o contrário: `viewport-change` empurra **para dentro** da página
  (scale 0.70→0.88) e desfoque seletivo de profundidade manda os fluxos novos para 9px de
  desfoque. Eles continuam chegando, fora de foco, irrelevantes. Em foco ficam os
  **seis signal-dots das visitas que já chegaram**.
- **Cena C (0.4–4.7s) — a frase.** Três fôlegos, porque é a frase mais longa do
  filme: *"Porque aumentar o faturamento"* (0.4s) → *"não significa apenas trazer
  mais pessoas"* (1.9s) → *"para o seu site."* (3.4s). Entrada por fade + subida de
  18px, 500ms cada. Tempo extra reservado conforme o brief.
- **Cena D (4.7–6.0s) — hold.** 1,3s parado. Em 5.7s um dos seis sinais se separa do
  grupo e começa a subir pela página — o corte sai dele.

---

## Frame 14 — Cada visita que você já conquistou

- scene: Um único fluxo existente percorre a experiência e gera um sinal claro de ação
- duration: 4s
- transition_in: crossfade
- status: animated
- src: compositions/frames/14-cada-visita.html
- poster: 3.2s
- blueprint: camera-journey
- rules: svg-path-draw
- onscreen_text: "Significa aproveitar melhor cada visita que você já conquistou."
- read_budget: 3.0s
- hold: 1.0s
- emphasis: "cada visita → cyan #06B6D4"
- asset_candidates: "landing-mock (programático) · signal-dot ×1 (programático) · journey-path (SVG programático)"
- handoff_in: "um único signal-dot — x -120px, y +620px, scale 1.0, opacity 1, subindo"
- handoff_out: "landing-mock + sinal de conversão — x 0, y 0, scale 0.96, opacity 1, parados; a luz começa a convergir para o centro"
- sfx: "soft clicks na jornada (3 pontos) · um pulso de conversão limpo em 2.6s · a música inicia a resolução"

**Shot sequence**

- **Cena A (0.0–2.6s) — a jornada única.** A multiplicidade acabou: **um** sinal
  cyan percorre a página de baixo para cima por um `journey-path` que se desenha
  à frente dele (`svg-path-draw`), tocando três pontos da experiência. Em cada
  toque, um anel de feedback de toque curto.
- **Cena B (2.4–2.9s) — a ação.** O sinal chega ao botão da página, que responde com
  compressão e liberação elástica (compressão 0.96 → liberação 1.0, 280ms). Um anel cyan de
  conversão se abre e fica. **Nenhum número, nenhuma porcentagem, nenhum uplift** —
  o brief proíbe inventar resultado.
- **Cena C (0.3–3.0s) — a frase.** *"Significa aproveitar melhor"* (0.3s) → *"cada
  visita que você já conquistou."* (1.5s), em `statement`. Slow push-in de câmera
  (câmera virtual, scale 0.88→0.96) que **termina em 2.2s**, antes do hold.
  `cada visita` assenta em cyan em 2.5s.
- **Cena D (3.0–4.0s) — hold.** 1s parado. A música começa a resolver.

---

## Frame 15 — KRO AI

- scene: Interface e elementos convergem para uma composição de marca limpa
- duration: 2s
- transition_in: crossfade
- status: animated
- src: compositions/frames/15-kro-ai-marca.html
- poster: 1.5s
- blueprint: titlecard-reveal (terminando no logo sustentado)
- rules: center-outward-expansion, spring-pop-entrance
- onscreen_text: "KRO AI."
- read_budget: 0.7s
- hold: 1.3s
- emphasis: "a marca inteira é purple-dominante; o logo entra como asset, não como texto"
- asset_candidates: "kro-logo-light.png (assets/kro-logo-light.png) · landing-mock (programático) · system-link (SVG programático)"
- handoff_in: "landing-mock + sinal de conversão — x 0, y 0, scale 0.96, opacity 1, parados"
- handoff_out: "kro-logo-light.png — x 0, y -60px, largura 520px, opacity 1, absolutamente parado, sobre charcoal #2B2B2B puro"
- sfx: "resolução do impacto grave · a música retira camadas para abrir espaço"

**Shot sequence**

- **Cena A (0.0–0.9s) — a convergência.** Todos os elementos de interface colapsam
  para o centro (`center-outward-expansion` invertido, `power3.inOut`), e dissolvem.
  O fundo vira charcoal `#2B2B2B` chapado — a atmosfera também se apaga.
- **Cena B (0.5–1.0s) — o lockup.** O **logo oficial `kro ai_`** (asset
  `kro-logo-light.png`, 520px de largura, centrado em y -60px) entra por
  `spring-pop-entrance` contido (overshoot 2%, 480ms). bloom ambiente controlado em
  purple com presença mínima de cyan, opacidade 0.30, só atrás do lockup.
- **Cena C (1.0–2.0s) — estabilidade total.** Câmera completamente estável. Nenhuma
  tween ativa. 1,3s de marca sozinha.

---

## Frame 16 — Não escolha. Deixe seus clientes.

- scene: End card em dois tempos — a instrução e a entrega, com negative space e estabilidade absoluta
- duration: 9s
- transition_in: crossfade
- status: animated
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
