---
format: 1920x1080
duration: 83s
message: "O KRO AI transforma as mensagens que já estão no seu site em experimentos e deixa os visitantes reais mostrarem quais delas fazem mais gente agir"
arc: Repetição → Descoberta → Ramificação → Evidência → Convergência → Ciclo → Confiança
audience: "Fundadores, executivos e times de growth, marketing, CRO e produto"
mode: autonomous
music: none
---

## Video direction

**Palette system (roles from `frame.md`, never invented).**
Two surfaces, never mixed. *Environment* — `bg #0E0F12` room, `env-lift #16181D`
pools, `env-deep #08090B` sink; editorial film type in Sora on `text #F5F2EC`,
secondary `text-muted #9AA1AC`. *Page* — the Vértice landing page is a lit object:
`page-canvas #F5F2EC` ground, `page-ink #14161A` type, `page-muted #5C636E`
secondary, `page-line` hairlines, Manrope throughout because it is pretending to be
product UI. `primary #7C3AED` means **KRO is acting** — selection box, hypothesis
branch, winner definition; a hairline and a chip, never a fill wash. `data #06B6D4`
means **a number that came from behaviour** — visitors, signups, distribution.
One dominant accent per composition; purple and cyan never carry equal weight.
No red/green scoring of variants, ever.

**Motion grammar.** Long-tail eases, `power3.out` default, `power2.inOut` for camera
repositioning. Large elements 700–1400ms, secondary UI 300–600ms, microinteractions
150–300ms. No bounce; overshoot at most `back.out(1.1)` and only on a chip.
The film's one verb chain is **selecionar → ramificar → observar → convergir**, and it
is implemented once as a reusable grammar (`selectElement`, `generateHypotheses`,
`splitVariants`, `distributeVisitors`, `animateResults`, `selectWinner`,
`mergeVariants`, `highlightNextExperiment`) so the learning-loop montage in frame 09
replays the same moves the viewer already learned instead of new choreography.

**Reveal model.** There is no voiceover: the spoken cue is replaced by the **beat of
the mechanism**. Nothing appears before the mechanism reaches it — a hypothesis only
exists after the headline is selected, a metric only exists after visitors arrive, a
winner only exists after the metrics diverge. Editorial lines enter as a consequence
of the image, never as a caption announcing it, and never more than one dominant idea
per composition. Emphasis is carried by weight, scale and colour on a single word
(`aprende`, `hipótese`, `seus próprios clientes`, `visitantes`) — never by animating
each word.

**Animation hierarchy — never everything at once.** camera → page → experimented
element → variants → data → editorial type → microdetail. At any instant at most two
tiers are moving.

**Rhythm / held frames.** 01 contemplative · 02 **held** (the stillness IS the point:
sessions move, the page does not) · 03 near-static, one precise interaction · 04
expansion, fastest reveals so far · 05 lateral travel · 06 crescendo, slow camera ·
07 **held** — deliberate deceleration, the film's rational climax · 08 recovery ·
09 montage, the only fast-cut passage · 10 steady · 11 **held**, minimal and precise ·
12 **held**, fully static end card.

**Depth.** Four planes in every frame: environment → page → highlighted component →
data/indicators in foreground. Perspective 3°–12°. Pages tilt and travel; they never
spin. Depth-of-field is a controlled blur on 1–2 layers only, never a full-frame filter.

**Texture (identical in every frame so cuts don't pop).** SVG fractal-noise grain at
3–4%, soft vignette, ambient shadow under the page, bloom capped at 0.35 alpha.

**Bottom band.** Nothing load-bearing below y≈880/1080. The page's own footer edge is
the lowest meaningful element.

**Negative list.** No brain / robot / circuit / sphere / sparkle as a metaphor for AI —
the intelligence is legible only through the system's behaviour. No generic purple-blue
neon, no heavy glassmorphism, no confetti/explosion/glow-burst on the winner, no
rainbow-coded variants, no card grids, no scroll-recording of the page, no permanent
cursor (the cursor appears only where a human interaction is semantically required:
frames 02→03 and 11), no full fade-to-black between shots, no percentage uplift claim,
no financial-chart clichés, no un-seeded randomness. And both motion failure modes are
banned: slideshow (front-load then freeze) and screensaver (everything drifting
independently forever).

**Continuity spine.** The Vértice page is the same object from frame 01 to frame 11 —
same layout, same proportions, same footer edge. Every cut is a spatial handoff, so the
viewer never asks "is this still the same site?".

---

## Frame 1 — A página que nunca muda

- scene: A landing page premium flutua no escuro; sessões atravessam e somem, a página não muda
- duration: 6s
- poster: 4.2s
- transition_in: cut
- status: animated
- src: compositions/frames/01-pagina-que-nunca-muda.html
- type: hook
- persuasion: Contradição imediata
- beat: curiosidade
- blueprint: compose
- focal: the Vértice landing page (programmatic)
- roles: vertice-page = cutout · environment = background · session markers = supporting
- sfx: pulse-low, tick-distant
- asset_candidates: programmatic Vértice landing page (HTML/CSS/SVG) · programmatic session markers and cursor trails · environment lighting layer
- handoff_out: Vértice page centred at x=960 y=470, scale 0.78, rotateY -6deg, opacity 1, drifting toward camera at a constant slow push (scale ramping ~0.006/s)

Abre frio na contradição central: o tráfego é real, o aprendizado é zero.

Scene 1 (0.0–1.6s): a página Vértice sozinha no grafite, ocupando ~66% do quadro,
levemente em perspectiva (rotateY −8°), iluminada por baixo. Slow push-in começa e não
para. Layered-depth, 4 planos. Nada mais existe ainda.
Scene 2 (1.6–3.2s): três markers de sessão entram por bordas diferentes, percorrem
trajetórias distintas sobre a página e desaparecem — cada um deixa um rastro curto que
some. A página permanece pixel-idêntica. Linha editorial 1 entra à esquerda, no terço
superior, fora da página: "Seu site recebe visitantes todos os dias."
Scene 3 (3.2–4.6s): mais duas sessões entram e somem, agora sobrepostas no tempo, para
que a repetição fique óbvia. A linha 1 recua em opacidade.
Scene 4 (4.6–6.0s): linha editorial 2 substitui a 1 no mesmo eixo — "Mas ele aprende
alguma coisa com eles?" — com "aprende" em peso 700 e `text`, o resto em 400 e
`text-muted`. A câmera continua avançando; a página cresce em direção à headline.

## Frame 2 — Repetição

- scene: Medium close-up da headline enquanto sessões continuam passando ao redor sem efeito
- duration: 6s
- poster: 3.0s
- transition_in: cut
- status: animated
- src: compositions/frames/02-repeticao.html
- type: pain_point
- persuasion: Agitação silenciosa
- beat: tensão
- blueprint: compose
- focal: the page headline "Simplifique a gestão da sua empresa."
- roles: headline = cutout · page body = supporting · session markers = supporting
- sfx: tick-distant, pulse-low
- asset_candidates: programmatic Vértice landing page (HTML/CSS/SVG) · programmatic session markers and cursor trails
- handoff_in: Vértice page centred at x=960 y=470, scale 0.78, rotateY -6deg, opacity 1, push continuing at ~0.006/s
- handoff_out: page scale 1.42, rotateY -3deg, headline block centred at x=760 y=452 and sharp; a single cursor at rest on the headline at x=706 y=470, opacity 1, motionless

O problema não é um site quebrado. É um site incapaz de aprender. Frame **held**:
tudo se move ao redor da headline, e a headline não se move.

Scene 1 (0.0–2.2s): a câmera continua o push do frame 01 e chega a medium close-up da
headline — a página agora ocupa ~140% do quadro e sai pelas bordas, mas os mesmos
elementos (nav, sub, CTA) continuam reconhecíveis. Asymmetric 60/40: headline à
esquerda, CTA e primeiro benefício à direita, levemente desfocados (rack-focus:
headline nítida, resto em blur suave).
Scene 2 (2.2–4.4s): quatro sessões entram e saem em cadência irregular ao redor da
headline — uma passa por cima do CTA, outra hesita no subtítulo. Cada uma deixa uma
marca temporária que decai a zero. Nenhum texto novo entra: a imagem comunica sozinha.
A câmera desacelera até quase parar.
Scene 3 (4.4–6.0s): todas as sessões somem menos uma. Esse último cursor sobe até a
headline e **para** sobre ela. O movimento geral cessa; o grain e a vinheta seguram o
quadro vivo. Silêncio visual antes da descoberta.

## Frame 3 — KRO entra

- scene: O cursor seleciona a headline; a câmera recua uma vez, o contorno KRO se desenha e um painel contextual abre amarrado ao elemento
- duration: 6s
- poster: 4.4s
- transition_in: cut
- status: animated
- src: compositions/frames/03-kro-entra.html
- type: solution_intro
- persuasion: Descoberta, não espetáculo
- beat: descoberta
- blueprint: compose
- focal: the KRO selection box around the headline
- roles: headline = cutout · KRO panel = supporting · page = background · kro-logo = supporting
- sfx: click-soft, impact-micro
- asset_candidates: capture/assets/kro-logo.png · programmatic KRO contextual panel · programmatic selection box · programmatic Vértice landing page
- handoff_in: page scale 1.42, rotateY -3deg, headline block at x=760 y=452 sharp; cursor at rest x=706 y=470, opacity 1
- handoff_out: camera at x=-356.8 y=74.4 scale 1.1; page left edge at x=40, page centre y=500, rotateY -3.5deg, opacity 1; selected headline lifted (scale 1.05, y -8) with its selection box; KRO panel open at x=1240, opacity 1

O KRO é apresentado como **camada sobre o site que já existe** — nada é reconstruído.

Scene 1 (0.0–1.0s): abre exatamente no close-up herdado do frame 02. O cursor pressiona a
headline: micro-compressão do cursor e do bloco de texto juntos, com um ripple curto. Logo em
seguida a câmera recua uma única vez (0.6–2.1s, power2.inOut) até a página ocupar os 60% da
esquerda — o recuo é motivado: é a camada KRO abrindo espaço para si na coluna escura da direita.
Scene 2 (1.0–2.0s): o bounding box se **desenha** ao redor da headline em `primary` —
quatro cantos em L que correm até se fecharem, mais um label discreto "headline"
ancorado no canto superior esquerdo do box. É a primeira vez que roxo aparece no filme.
Um acento de luz roxo muito baixo entra na cena e fica.
Scene 3 (2.0–3.4s): o painel KRO **emerge do próprio bounding box** e se abre para a
direita (expansão ancorada, sem pop): cabeçalho com a marca `kro ai_`, o elemento
selecionado ecoado como texto, e um estado vazio "hipóteses — 0". Split assimétrico
60/40, headline à esquerda em close, painel à direita.
Scene 4 (3.4–4.8s): linha editorial entra abaixo do painel, em duas linhas curtas:
"Com o KRO, qualquer mensagem do seu site pode virar uma hipótese." — com "hipótese"
em peso 700 e `primary`. O cursor sai de cena; a interação humana já aconteceu.
Scene 5 (4.8–6.0s): a headline selecionada **avança em Z**, separando-se visualmente
da página; a página atrás recebe blur suave e perde contraste. O quadro fica pronto
para ramificar.

## Frame 4 — A IA explora argumentos

- scene: A headline original permanece no eixo e três hipóteses derivam dela como ramificações do mesmo componente
- duration: 9s
- poster: 6.6s
- transition_in: cut
- status: animated
- src: compositions/frames/04-ia-explora-argumentos.html
- type: mechanism
- persuasion: A IA gera possibilidades — não decide
- beat: expansão
- blueprint: compose
- focal: the three generated hypotheses branching off the original headline
- roles: original headline = cutout · hypotheses = supporting · KRO panel = supporting · page = background
- sfx: tone-seq-3, whoosh-space
- asset_candidates: programmatic hypothesis branches with masked text replacement · programmatic KRO contextual panel · programmatic Vértice landing page
- handoff_in: camera at x=-356.8 y=74.4 scale 1.1; page left edge at x=40, page centre y=500, rotateY -3.5deg, opacity 1; headline still lifted with its selection box; KRO panel open at x=1240
- handoff_out: four page instances in a shallow fan — V1 x=372 V2 x=768 V3 x=1164 V4 x=1560, all y=430, scale 0.36, rotateY +9/+3/-3/-9deg, opacity 1, settling (velocity ~0)

Três argumentos **diferentes**, não três sinônimos. Cada um é uma versão possível da
mesma headline, e o filme deixa isso explícito revelando-os por substituição mascarada
a partir do texto original.

Scene 1 (0.0–1.4s): pequeno dolly-out abre espaço ao redor da headline selecionada,
que fica no eixo central. O painel KRO troca o estado vazio por um indicador de
processo discreto. Nenhuma hipótese ainda existe.
Scene 2 (1.4–3.0s): a primeira ramificação sai da headline — uma linha fina em
`primary` desce até uma posição acima e à direita, e ali o texto se escreve por
**máscara deslizante sobre o texto original** (não fade): "Tenha mais controle da sua
empresa sem aumentar a complexidade." O contador do painel vai a 1.
Scene 3 (3.0–4.2s): segunda ramificação, abaixo e à direita, mesma mecânica: "Menos
operação. Mais tempo para fazer sua empresa crescer." Contador 2.
Scene 4 (4.2–5.4s): terceira ramificação, à esquerda para equilibrar a composição:
"Sua gestão pode ser muito mais simples do que parece." Contador 3. As quatro versões
coexistem: a original mantém `text`, as três hipóteses recebem borda `primary`.
Scene 5 (5.4–6.6s): linha editorial curta entra no rodapé do bloco, sem competir:
"A IA cria novas possibilidades." Held de leitura de ~0.8s.
Scene 6 (6.6–9.0s): as três mensagens **recuam no espaço** e cada uma encaixa em uma
cópia da landing page que nasce da original — quatro páginas em leque raso (a original recua a
uma opacidade fantasma e só depois some, para que a origem das cópias fique legível),
diferenciadas apenas por posição, nome (V1–V4) e headline. Whoosh espacial;
motion-blur direcional resolve a zero no assentamento.

## Frame 5 — Um site, várias hipóteses

- scene: Quatro páginas idênticas coexistem em profundidade; só a headline muda
- duration: 7s
- poster: 4.8s
- transition_in: cut
- status: animated
- src: compositions/frames/05-um-site-varias-hipoteses.html
- type: mechanism
- persuasion: Experimentação fica imediatamente compreensível
- beat: expansão
- blueprint: compose
- focal: the four coexisting page variants
- roles: four page instances = cutout · variant labels = supporting · environment = background
- sfx: pulse-defined, tick-distant
- asset_candidates: programmatic four-instance Vértice page fan · programmatic variant labels · programmatic traffic markers
- handoff_in: four page instances V1 x=372 V2 x=768 V3 x=1164 V4 x=1560, y=430, scale 0.36, rotateY +9/+3/-3/-9deg, opacity 1, at rest
- handoff_out: four instances at the experiment grid — V1 x=372 V2 x=768 V3 x=1164 V4 x=1560, y=430, scale 0.36, rotateY +9/+3/-3/-9deg, opacity 1, camera at identity; traffic beginning to distribute, first markers already in flight

Torna experimentação óbvia sem explicar: é o mesmo site, quatro formas de dizer.

Scene 1 (0.0–1.6s): tracking lateral atravessa o leque da esquerda para a direita.
Rack-focus acompanha: a página em foco fica nítida, as outras recebem blur de
profundidade. A estrutura interna (nav, sub, CTA, benefícios, prova) permanece
visivelmente alinhada entre todas — a única diferença é a headline.
Scene 2 (1.6–3.2s): a câmera desacelera no centro. Linha editorial entra alta, fora
das páginas: "O mesmo site. Diferentes formas de comunicar."
Scene 3 (3.2–5.0s): rótulos discretos V1…V4 aparecem sob cada página, junto do
primeiro trecho de cada headline — a nomenclatura, e não a cor, é o que diferencia.
Scene 4 (5.0–7.0s): a segunda linha substitui a primeira no mesmo eixo — "Visitantes
reais começam a responder." — e, como consequência dela, os primeiros markers de
tráfego entram pela borda esquerda e começam a se distribuir entre as quatro páginas.
As páginas reposicionam-se levemente para a grade do experimento.

## Frame 6 — O mercado responde

- scene: Fluxos de visitantes se distribuem entre as versões e as métricas divergem
- duration: 9s
- poster: 7.0s
- transition_in: cut
- status: animated
- src: compositions/frames/06-o-mercado-responde.html
- type: proof
- persuasion: A decisão vem de comportamento real
- beat: evidência
- blueprint: compose
- focal: the diverging per-variant metrics
- roles: four page instances = supporting · metric readouts = cutout · visitor flow = supporting
- sfx: tick-visit, pulse-conversion
- asset_candidates: programmatic visitor flow paths · programmatic per-variant metric readouts · programmatic four-instance Vértice page grid
- handoff_in: four instances V1 x=372 V2 x=768 V3 x=1164 V4 x=1560, y=430, scale 0.36, rotateY +9/+3/-3/-9deg, opacity 1, camera at identity; visitor markers already in flight from the left
- handoff_out: V3 at x=1164 y=430 scale 0.36 opacity 1 sharp and already reading marginally brighter; V1/V2/V4 at their grid positions, opacity 1, contrast beginning to fall; metric stacks fully populated and static

Os dados respiram sozinhos. Nenhum texto grande compete com eles.

Scene 1 (0.0–2.0s): o fluxo de visitantes entra pela esquerda como uma corrente
contínua de markers pequenos e se divide entre as quatro páginas por caminhos
pré-programados. Sob cada página, uma pilha de métricas nasce vazia: visitantes,
cliques, cadastros.
Scene 2 (2.0–4.2s): os contadores de **visitantes** sobem, quase iguais entre as
quatro — o tráfego é distribuído de forma justa, e isso precisa ficar visível antes de
qualquer diferença. Barras finas de distribuição crescem sob os números.
Scene 3 (4.2–6.4s): os **cadastros** começam a divergir. Movimento lateral muito lento
com rack-focus de V1 para V3. V1 recebe volume e responde pouco; V2 fica intermediária;
V3 começa a mostrar eficiência proporcional maior; V4 fica atrás. Cada conversão é um
pulso discreto em `data`, nunca um efeito.
Scene 4 (6.4–9.0s): os movimentos diminuem. Os contadores travam em valores finais e
ficam estáticos. A câmera para. V3 ganha um fio de contraste a mais — ainda sem
declarar nada.

## Frame 7 — Não é opinião

- scene: As páginas secundárias perdem contraste, a vencedora permanece nítida e as demais convergem para trás dela
- duration: 8s
- poster: 3.6s
- transition_in: cut
- status: animated
- src: compositions/frames/07-nao-e-opiniao.html
- type: differentiator
- persuasion: A conclusão racional do filme
- beat: resolução
- blueprint: compose
- focal: the winning variant V3 and its headline
- roles: winner page = cutout · losing pages = supporting (contrast down) · editorial line = supporting
- sfx: sub-impact-contained
- asset_candidates: programmatic four-instance Vértice page grid · programmatic winner definition treatment · programmatic metric readouts
- handoff_in: V3 x=1164 y=430 scale 0.36 opacity 1 sharp; V1/V2/V4 at grid positions with contrast falling; metric stacks static
- handoff_out: a single page centred at x=960 y=500, scale 0.62, rotateY -4deg, opacity 1, carrying the winning headline; all other instances gone; motion at rest

Desaceleração deliberada. A decisão **emerge**, não explode. Frame **held** na segunda
metade.

Scene 1 (0.0–1.8s): as três páginas não vencedoras **deixam de ser lidas** — a copy delas sai e
só a estrutura permanece, com blur de profundidade e contraste baixo; suas métricas somem. V3 permanece nítida e ganha um leve aumento de
escala e definição — contraste, não glow.
Scene 2 (1.8–3.6s): a vencedora avança para a direita do quadro, maior e mais nítida, e fica
legível em tamanho confortável: "Menos operação. Mais tempo para fazer sua empresa crescer."
Os números de V3 descem para o foreground logo abaixo dela, estabilizam e param. A coluna da
esquerda fica livre para a conclusão.
Scene 3 (3.6–5.4s): linha editorial entra à esquerda, em bloco: "O KRO não tenta
adivinhar qual texto é melhor." Pausa real de leitura — nada mais se move.
Scene 4 (5.4–6.6s): segunda linha substitui a primeira no mesmo eixo: "Ele deixa seus
próprios clientes responderem." — "seus próprios clientes" em peso 700 e `text`, o
restante em 400. Um beat de silêncio visual.
Scene 5 (6.6–8.0s): as páginas perdedoras **convergem espacialmente para trás da
vencedora** e desaparecem atrás dela; o leque colapsa e sobra uma única página
centrada. Sub-impact contido no instante da convergência.

## Frame 8 — O site aprendeu

- scene: A página volta a ser única, agora com a mensagem vencedora, e outros elementos recebem highlights sequenciais
- duration: 7s
- poster: 4.6s
- transition_in: cut
- status: animated
- src: compositions/frames/08-o-site-aprendeu.html
- type: benefit
- persuasion: O resultado é conhecimento acumulado
- beat: recuperação
- blueprint: compose
- focal: the single learned page, near-frontal and heroic
- roles: learned page = cutout · KRO learning marker = supporting · sequential highlights = supporting
- sfx: pulse-return
- asset_candidates: programmatic Vértice landing page carrying the winning headline · programmatic KRO learning marker · programmatic element highlights
- handoff_in: single page centred x=960 y=500, scale 0.62, rotateY -4deg, opacity 1, at rest, carrying the winning headline
- handoff_out: CTA highlight box drawn in primary over the page CTA, opacity 1; page at x=960 y=500 scale 0.62 rotateY -3deg, camera at 0.96

O experimento não foi um evento: virou memória do sistema.

Scene 1 (0.0–1.4s): dolly-out muito lento revela a página inteira, quase frontal e
heroica, agora carregando a headline vencedora. Um sinal discreto do KRO permanece
ancorado à página — um chip pequeno com um contador de aprendizados em 1.
Scene 2 (1.4–2.8s): linha editorial entra acima da página: "Cada experimento deixa seu
site mais inteligente." — "mais inteligente" em `text` peso 700.
Scene 3 (2.8–5.0s): highlights sequenciais percorrem a página, um de cada vez, cada um
segurando o tempo de ser lido: CTA → benefício → oferta → proposta de valor. Integrada
à composição, à direita, a enumeração aparece como uma linha só, com o item ativo em
`text` e os demais em `text-light`: "Headline. Oferta. Benefícios. CTA. Posicionamento."
Scene 4 (5.0–7.0s): a enumeração recua e a frase de fechamento ocupa o eixo: "Se está
escrito no seu site, existe algo para aprender." O highlight para no CTA e **se
converte no bounding box do próximo experimento** — o mesmo desenho de cantos em L do
frame 03, agora sem cursor: o sistema age sozinho.

## Frame 9 — Learning loop

- scene: Montagem acelerada do ciclo completo repetida sobre elementos diferentes da mesma página
- duration: 8s
- poster: 6.4s
- transition_in: cut
- status: animated
- src: compositions/frames/09-learning-loop.html
- type: scale
- persuasion: Continuidade e escala
- beat: aceleração
- blueprint: compose
- focal: the repeating select → branch → distribute → data → winner cycle
- roles: page = cutout (constant axis) · cycle chrome = supporting · data = supporting
- sfx: texture-rise
- asset_candidates: programmatic Vértice landing page · programmatic cycle grammar (select, branch, distribute, results, winner) · programmatic learning counter
- handoff_in: CTA highlight box drawn in primary over the page CTA, opacity 1; page x=960 y=500 scale 0.62 rotateY -3deg, camera at 0.96
- handoff_out: page centred x=960 y=500, scale 0.62, rotateY -2deg, opacity 1, camera at identity; learning counter reading 4; all cycle chrome cleared

A única passagem de corte rápido do filme. Cada ciclo dura ~1.6s e é uma versão
condensada exatamente da gramática que o espectador já aprendeu — por isso é legível
nessa velocidade. Match cuts mantêm a página como eixo constante.

Scene 1 (0.0–1.6s): ciclo do **CTA** — o box já desenhado ramifica em três textos de
botão, o tráfego se divide e um vence. Câmera fechada (1.34) com a página empurrada para a
esquerda: as hipóteses vivem numa coluna escura fixa à direita, amarradas ao box por um fio.
Scene 2 (1.6–3.2s): match cut para wide (câmera 1.0); ciclo do **benefício** — mesma gramática,
outro componente, outra escala. A página não se move entre os cortes; a câmera sim.
Scene 3 (3.2–4.4s): match cut para média (1.18); ciclo da **prova social**, ainda mais condensado. O contador de
aprendizados do chip KRO sobe a cada ciclo: 2 → 3 → 4.
Scene 4 (4.4–6.2s): linha editorial entra sobre a montagem: "Seu site deixa de ser uma
página estática." — e as palavras "página estática" se **multiplicam** em três
hipóteses sobrepostas, aplicando o mecanismo do filme à própria frase.
Scene 5 (6.2–8.0s): as versões convergem de volta para a landing page única e a
segunda linha fecha o bloco: "E passa a aprender com quem realmente importa: seus
visitantes." — com "seus visitantes" em `text` peso 700. A energia cai para o frame 10.

## Frame 10 — O mesmo tráfego, mais aprendizado

- scene: Fluxo constante de visitantes entrando; cada visita agora também deixa um sinal de aprendizado que permanece
- duration: 7s
- poster: 5.0s
- transition_in: cut
- status: animated
- src: compositions/frames/10-mesmo-trafego.html
- type: value
- persuasion: Traduz o mecanismo em valor de negócio
- beat: confiança
- blueprint: compose
- focal: the visitor flow feeding a persistent KRO learning layer
- roles: page = cutout · visitor flow = supporting · KRO learning layer = supporting
- sfx: pulse-conversion
- asset_candidates: programmatic Vértice landing page · programmatic visitor flow · programmatic KRO learning layer accumulating signals
- handoff_in: page centred x=960 y=500, scale 0.62, rotateY -2deg, opacity 1, camera at identity; learning counter at 4; no cycle chrome
- handoff_out: page centred x=960 y=500, scale 0.62, rotateY 0deg, opacity 1, perfectly frontal and still; every visitor marker, signal and chrome cleared to opacity 0

O argumento comercial, dito pela imagem: o custo já foi pago na aquisição.

Scene 1 (0.0–1.6s): movimento lento e estável. O fluxo de visitantes volta pela
esquerda, agora contínuo e denso, e atravessa a página. Layered-depth: fluxo à frente,
página no meio, ambiente atrás.
Scene 2 (1.6–3.0s): linha editorial à direita: "Você já investe para trazer pessoas até
o seu site." Enquanto ela é lida, o fluxo continua sem produzir nada — como no frame 01.
Scene 3 (3.0–5.0s): a camada KRO acende sob a página e passa a **reter** um sinal
minúsculo por visita; os sinais se acumulam numa faixa horizontal que cresce em
densidade da esquerda para a direita. A intensidade das conversões aumenta na direção
ascendente, sem número e sem percentual.
Scene 4 (5.0–7.0s): segunda linha substitui a primeira: "O KRO ajuda você a aprender o
que dizer quando elas chegam." Depois disso todo o ruído visual começa a desaparecer —
markers, sinais e chrome saem — restando apenas a página e sua headline.

## Frame 11 — A síntese

- scene: A página sozinha, como no início; divide-se brevemente em três hipóteses e converge para a vencedora
- duration: 5s
- poster: 1.4s
- transition_in: cut
- status: animated
- src: compositions/frames/11-a-sintese.html
- type: synthesis
- persuasion: A ideia memorável
- beat: resolução
- blueprint: compose
- focal: the split-and-converge motif compressed into one gesture
- roles: page = cutout · three hypotheses = supporting · editorial lines = supporting
- sfx: sub-impact-contained
- asset_candidates: programmatic Vértice landing page · programmatic three-hypothesis split and converge
- handoff_in: page centred x=960 y=500, scale 0.62, rotateY 0deg, opacity 1, frontal and still; frame otherwise empty
- handoff_out: page centred x=960 y=500 shrinking from scale 0.62 toward 0.30 with opacity falling to 0 in the last 0.5s; frame clearing to bare environment

Encerra recuperando o motivo visual do filme em um único gesto. Câmera praticamente
estática; movimento mínimo e preciso.

Scene 1 (0.0–1.4s): a página fixa e sozinha, exatamente como no frame 01 mas frontal —
o eco fecha o arco. Linha editorial acima: "Você escolhe o que seu site diz." Held.
Scene 2 (1.4–2.6s): a página se divide brevemente em três hipóteses translúcidas que
se abrem em leque a partir do centro — o mesmo movimento do frame 04, agora em ~1s.
Scene 3 (2.6–3.6s): elas convergem para a vencedora e sobra uma página só. Sub-impact
contido, idêntico ao do frame 07.
Scene 4 (3.6–5.0s): segunda linha entra no mesmo eixo da primeira: "Seus clientes podem
mostrar o que ele deveria dizer." A página reduz de escala e sai, abrindo espaço para a
assinatura.

## Frame 12 — End card

- scene: Composição limpa com o logo KRO AI, a proposta e o CTA
- duration: 5s
- poster: 3.4s
- transition_in: cut
- status: animated
- src: compositions/frames/12-end-card.html
- type: cta
- persuasion: Marca, proposta e ação
- beat: confiança
- blueprint: compose
- focal: capture/assets/kro-logo.png
- roles: kro-logo = cutout · proposition = supporting · CTA = supporting · environment = background
- sfx: signature-short
- asset_candidates: capture/assets/kro-logo.png · programmatic end-card typography · programmatic environment lighting
- handoff_in: frame opens on bare environment with the page already cleared to opacity 0

Câmera totalmente estática. Entrada sutil, depois estabilidade suficiente para leitura.

Scene 1 (0.0–1.2s): o logo `kro ai_` entra ligeiramente acima do centro — recolorido
para branco quente sobre o grafite — com um leve rise e um acento de luz roxo baixo
atrás dele. Nada mais na tela.
Scene 2 (1.2–2.4s): a proposta entra abaixo, em duas linhas curtas e centradas:
"Transforme as mensagens do seu site em experimentos." / "Descubra o que faz mais gente
agir."
Scene 3 (2.4–3.4s): o CTA entra por último, separado por uma hairline: "Coloque seu
site para aprender." — com `usekro.ai` discreto abaixo.
Scene 4 (3.4–5.0s): tudo estático. Nenhum movimento além do grain. O quadro segura o
tempo de leitura e termina.
