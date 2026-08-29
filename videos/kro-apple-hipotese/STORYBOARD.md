---
format: 1920x1080
duration: 103.1s
mode: autonomous
message: "Excelência não é o mesmo que otimização: até a melhor página do mundo ainda é uma hipótese até o comportamento real responder"
arc: Admiração → Contradição → Descoberta → Aceleração → Payoff → Resolução
audience: "Fundadores, CMOs, CROs, heads de growth, designers, copywriters e estrategistas digitais"
music: none
---

## Video direction

**Paleta — dois registros que nunca se misturam** (tokens em `frame.md`).
*Registro A, a página (Apple-neutro):* `bg` #FFFFFF · `surface` #F5F5F7 · `text`
#1D1D1F · `text-muted` #86868B · `hairline` #D2D2D7 · azul de CTA da fonte real
#0071E3. Enquanto a página é ela mesma, **zero acento KRO aparece**.
*Registro B, o sistema (KRO):* `stage` #0A0A0C é o fundo profundo em que a página
passa a flutuar quando vira objeto no espaço; `kro` #06B6D4 é o **acento único**,
racionado a exatamente seis funções — seleção · teste · fluxo de usuários ·
métrica · variante vencedora · aprendizado. `kro-brand` #7C3AED aparece **só** no
lockup do end card. Se o ciano aparecer onde o sistema não está executando uma
dessas seis funções, é bug.

**Gramática de movimento.** Curvas de cauda longa: `power2.inOut` para planos
grandes de interface, `power3.out` para chegadas, `expo.inOut` para trocas de
estado. Zero elasticidade, zero overshoot — o overshoot é o tell amador e esta
peça não o usa em lugar nenhum. Planos grandes movem devagar; microcomponentes e
indicadores reagem rápido. Sem sombras: profundidade vem de `perspective` +
translação em Z + luminância. Sem glassmorphism.

**Modelo de revelação — pautado pelo texto, nunca pelo t=0.** Não há locução;
quem dá a deixa é o cronograma de leitura. Em t=0 entra só o que a composição
está dizendo naquele instante; cada peça seguinte revela na sua própria deixa,
concentradas na metade final do shot. Nenhum frame despeja o canvas nos
primeiros 25%.

**Contrato de HOLD (manda em tudo).** Toda mensagem é `entrada → HOLD → saída`,
com o HOLD explícito na timeline. Tempo de entrada nunca conta como leitura.
Durante o HOLD: sem blur, sem queda de opacidade, sem movimento do texto, sem
mudança de tracking, sem zoom, nada cruzando as letras, e a câmera **para**.
Quando ritmo e legibilidade brigarem, ganha legibilidade — foi o que empurrou a
duração de 85s para ~103s.

**Ritmo e alocação de frames parados.** F01–F03 planos longos e contemplativos.
F03 e F04 são os **frames de respiro** — a câmera congela por completo e o texto
manda. F05–F08 é a progressão densa. F07 é o pico de densidade visual. F09–F14
desacelera progressivamente; F14 é totalmente estático depois de formado.

**Continuidade.** Cortes secos (`cut`) do começo ao fim — nada de fades. Cada
costura é um match cut: `handoff_out`/`handoff_in` declaram posição, escala e
opacidade exatas nos dois lados. A página é **um único objeto contínuo** ao
longo do filme; ela nunca "renasce" num frame novo.

**Honestidade de dados.** Todo número exibido é simulação de demonstração sobre
uma reconstrução da página, não resultado de experimento real da Apple. Os
frames do sistema (F07–F11) carregam a legenda permanente e discreta
`Simulação ilustrativa · dados não reais` no canto inferior esquerdo, em mono
11px `text-muted`.

**Lista negativa.** Nunca: a página Apple como ruim, antiquada ou quebrada · um
antes/depois caricatural · promessa de ganho de conversão · vencedora anunciada
antes dos dados · resultado real atribuído à Apple · "centenas de milhões" como
fato · estética genérica de IA (cérebro digital, robô, holograma, partícula
gratuita, gradiente roxo-azul de "IA") · screen recording · scroll contínuo da
homepage · screenshot dentro de mockup de MacBook · dezenas de cards flutuantes ·
glassmorphism · tudo animando ao mesmo tempo · parágrafo na tela · texto cortado
antes de ser lido · câmera em movimento sob mensagem essencial · fim imediato
depois do CTA. E os dois modos de falha de movimento: slideshow (despejar e
congelar) e screensaver (tudo flutuando solto).

---

## Frame 1 — Começar pelo melhor

- scene: A homepage da Apple ocupa o frame inteiro; push-in lentíssimo enquanto a tese entra por máscara vertical
- duration: 5.5s
- transition_in: cut
- status: animated
- type: hook
- persuasion: Contradição declarada de saída
- beat: admiração
- blueprint: kinetic-type-beats (Adapt)
- src: compositions/frames/01-comecar-pelo-melhor.html
- asset_candidates: capture/assets/apple-hero-glow.png, capture/assets/apple-mac-mini.png
- focal: capture/assets/apple-hero-glow.png
- roles: apple-hero-glow = background (hero da página, 100%) · apple-mac-mini = supporting (aparece na dobra inferior)
- handoff_out: página em translateY(0) scale 1.05, opacidade 1, centrada, push linear contínuo a 0.9%/s; texto da tese já saiu (opacidade 0)

Adapt de `kinetic-type-beats`: mantenho a batida de tipo como motor, mas troco a
troca-de-token por **uma única frase entrando por máscara vertical** sobre uma
interface real — a batida é o contraste entre a frase e a página impecável
embaixo dela.

Scene 1 (0.0–0.6s): página reconstruída da Apple ocupa 100% do frame — nav de 12
itens, hero de gradiente azul com o logo luminoso, "Surpreendente e brilhante.",
as duas linhas de apoio e o pill branco "Adicionar ao calendário". Enquadramento
centrado, ~100% do canvas, 3 camadas de profundidade (gradiente / logo luminoso /
tipografia). Push-in começa em scale 1.00 numa curva longa (`multi-phase-camera`)
e **não para até o fim do shot** — nada de texto ainda.
Scene 2 (0.6–1.0s): "Vamos tentar melhorar o site da Apple." entra por **máscara
vertical** (clip-path revelando de cima para baixo, `dynamic-content-sequencing`),
centralizada na faixa superior-terça, branca sobre um véu escuro de 38% que cobre
só a área do texto. A entrada é rápida — 0.4s — porque a leitura começa depois.
Scene 3 (1.0–4.3s): **HOLD 3.3s.** A frase fica absolutamente parada. O push-in
continua atrás dela a 0.9%/s — lento o bastante para não disputar a leitura, é o
único movimento tolerado sob texto no filme inteiro e ele é imperceptível por
design.
Scene 4 (4.3–5.5s): a frase sai pela mesma máscara vertical (0.4s), e o push-in
segue sozinho, agora entrando na interface — a câmera avança para dentro da
página, preparando o travelling do frame seguinte.

## Frame 2 — Excelente

- scene: Travelling vertical cinematográfico pela página, passando por Mac mini, Mac Studio e a grade de produtos
- duration: 6.5s
- transition_in: cut
- status: animated
- type: product_intro
- persuasion: Prova por demonstração — a excelência é mostrada, não afirmada
- beat: admiração
- blueprint: spatial-pan-stations (Adapt)
- src: compositions/frames/02-excelente.html
- asset_candidates: capture/assets/apple-hero-glow.png, capture/assets/apple-mac-mini.png, capture/assets/apple-mac-studio.png, capture/assets/apple-iphone.png, capture/assets/apple-macbook-air.png
- roles: apple-mac-mini = cutout (estação 1) · apple-mac-studio = cutout (estação 2) · apple-iphone + apple-macbook-air = supporting (estação 3, grade) · apple-hero-glow = background (de onde partimos)
- focal: capture/assets/apple-mac-mini.png
- handoff_in: página em translateY(0) scale 1.05, opacidade 1, centrada, já em push a 0.9%/s
- handoff_out: página em translateY(-850px) scale 1.15, opacidade 1, velocidade **zero** — a seção Mac mini preenche exatamente o frame (topo da seção em y=0, base em y=1080)

Adapt de `spatial-pan-stations`: as estações não são cartões inventados, são as
seções reais da página; a câmera é uma só e desce em vez de panorâmica lateral.
Mantenho a assinatura — traversal contínuo por estações pré-posicionadas com
pausa de reconhecimento em cada uma. **Sem texto neste shot**: é o beat de
admiração, e a única coisa que o espectador deve fazer é reparar na qualidade.

Scene 1 (0.0–1.4s): o push herdado se converte em **descida** (`viewport-change`
sobre o wrapper `.world`). Sai do hero e entra na seção Mac mini. Enquadramento
full-width, a página é o mundo inteiro.
Scene 2 (1.4–2.6s): **micro-pausa de reconhecimento** sobre Mac mini — a descida
quase para (não zera) enquanto a mão segurando o produto cruza o centro óptico.
Composição assimétrica 60/40: tipografia à esquerda do eixo, produto no centro-baixo.
Scene 3 (2.6–3.8s): retoma e desce por Mac Studio; segunda micro-pausa, mais
curta que a primeira — o ritmo está acelerando de propósito.
Scene 4 (3.8–5.0s): desce até a grade de meios-tiles iPhone | MacBook Air. Aqui a
composição vira **split 50/50** — dois tiles de peso igual. É a primeira vez que
o filme mostra dois blocos comparáveis lado a lado: plantando visualmente a ideia
de A/B sem nomeá-la.
Scene 5 (5.0–6.0s): a câmera **sobe de volta** e desacelera numa curva longa
(`power2.inOut`) até o repouso absoluto sobre a seção Mac mini — headline,
subtítulo, linha terciária, dois pills e produto, tudo enquadrado limpo. A
desaceleração termina em zero antes do corte, não no corte.

## Frame 3 — A pergunta

- scene: Tudo congela sobre a seção Mac mini; "O que você mudaria aqui?" e, depois da pausa, "Talvez nada."
- duration: 7.2s
- transition_in: cut
- status: animated
- type: pain_point
- persuasion: Pergunta socrática — o espectador responde antes do vídeo
- beat: contradição
- blueprint: titlecard-reveal (Adapt)
- src: compositions/frames/03-a-pergunta.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = cutout (protagonista da seção enquadrada)
- focal: capture/assets/apple-mac-mini.png
- handoff_in: página em translateY(-850px) scale 1.15, opacidade 1, velocidade zero
- handoff_out: página em translateY(-850px) scale 1.15, opacidade 1, velocidade zero — inalterada; véu a 0.84; "Talvez nada." em tela no eixo central (top 474), opacidade 1

Adapt de `titlecard-reveal`: mantenho a assinatura — **um movimento contido e
depois a quietude é o payload** — mas aplico duas vezes, em cadeia, com uma pausa
morta entre as frases. A pausa é o conteúdo: é onde o espectador responde a
pergunta sozinho.

Scene 1 (0.0–0.5s): a seção Mac mini, imóvel. Um véu neutro de 30% desce sobre a
página inteira (não escurece a ponto de descaracterizá-la — ela continua legível
e continua excelente). Câmera **parada**, e fica parada o shot inteiro.
Scene 2 (0.5–0.9s): "O que você mudaria aqui?" entra centralizada por
`per-word staggered reveal` (`dynamic-content-sequencing`), em display grande,
branca. Terço superior.
Scene 3 (0.9–3.9s): **HOLD 3.0s.** Nada se move em lugar nenhum do frame.
Scene 4 (3.9–4.7s): a frase sai (0.4s) e vem **0.4s de tela sem texto nenhum** —
só a página, intocada. Esta pausa é deliberada e não deve ser cortada.
Scene 5 (4.7–5.0s): "Talvez nada." entra no mesmo eixo óptico, mesma família,
mesmo tamanho — troca de conteúdo, não de composição.
Scene 6 (5.0–7.2s): **HOLD 2.0s** e o resto do shot em quietude absoluta. Zero
jitter, zero deriva: aqui a imobilidade é o argumento.

## Frame 4 — A virada

- scene: "Mas essa também é uma hipótese." sobre a página perfeita; ao fim da leitura, um cursor KRO seleciona discretamente a headline
- duration: 6.4s
- transition_in: cut
- status: animated
- type: benefit_highlight
- persuasion: Reenquadramento — a excelência não é questionada, o *status* dela é
- beat: descoberta
- blueprint: cta-morph-press (Adapt)
- src: compositions/frames/04-a-virada.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = cutout
- focal: capture/assets/apple-mac-mini.png
- handoff_in: mesmo pixel do F03 por outra rota — a página agora é um `pcard` em x-142.83 y-68.87 scale 1.838, que projeta a seção Mac mini no mesmo enquadramento; véu 0.84; "Talvez nada." em tela, saindo nos primeiros 0.4s
- handoff_out: `pcard` parado em x-142.83 y-68.87 scale 1.838, opacidade 1, véu já em 0; caixa de seleção ciano ativa na headline "Mac mini", opacidade 1, escala 1

Adapt de `cta-morph-press`: guardo a assinatura — **um cursor chega e executa uma
ação deliberada e humana sobre um alvo** — mas o alvo não é um botão de CTA, é a
headline da página; e o gesto não é um clique de compra, é a primeira seleção do
sistema. É o instante em que o KRO existe pela primeira vez, e ele existe como
comportamento, não como logo.

Scene 1 (0.0–0.4s): "Talvez nada." sai. A página fica sozinha, imóvel.
Scene 2 (0.4–0.8s): "Mas essa também é uma hipótese." entra por máscara vertical,
mesmo eixo das frases anteriores. Sétima palavra em peso 700, o resto em 400 —
a hierarquia recai sobre *hipótese*.
Scene 3 (0.8–4.0s): **HOLD 3.2s.** Absolutamente nada se move. Nenhum cursor
ainda: o cursor durante a leitura roubaria o olho.
Scene 4 (4.0–4.4s): a frase sai. Página limpa outra vez.
Scene 5 (4.4–6.4s): **só agora** o sistema aparece. Um cursor fino ciano entra
pela direita numa curva `power3.out`, para sobre a headline "Mac mini", e uma
**caixa de seleção ciano de 1px** se desenha em volta dela
(`svg-path-draw` + `ai-tracking-box`), com um micro-tick de escala 1.00→1.012→1.00.
Primeira aparição do ciano no filme inteiro, e ela significa exatamente uma coisa:
seleção. Nenhum outro elemento reage. `sfx: click-micro`

## Frame 5 — Toda decisão é uma hipótese

- scene: A seção se decompõe em camadas no eixo Z; cada componente ganha seu rótulo; fecha em "Grandes profissionais criam grandes hipóteses."
- duration: 8s
- transition_in: cut
- status: animated
- type: feature_showcase
- persuasion: Decomposição — tornar visível que a página é feita de decisões
- beat: descoberta
- blueprint: 3d-text-depth-layers (Adapt)
- src: compositions/frames/05-toda-decisao.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = cutout (vira uma das camadas)
- focal: capture/assets/apple-mac-mini.png
- handoff_in: `pcard` em x-142.83 y-68.87 scale 1.838, caixa de seleção ciano ativa na headline, opacidade 1
- handoff_out: `pcard` em x252.5 y51.55 scale 1.14, rotateY -14°, camadas em Z (grid -140 · shot +170 · cta +290 · headline +420), rótulos a 0.5 de opacidade, palco escuro visível em volta

Adapt de `3d-text-depth-layers`: a assinatura — **elementos que pareciam um plano
se revelam como camadas distintas em profundidade** — é exatamente a tese do shot.
Mudo o conteúdo: não são glifos, são os componentes reais de uma página real, e
cada um recebe o nome da disciplina que o decidiu.

Scene 1 (0.0–1.0s): o container ganha `perspective: 1600px` e gira devagar para
`rotateY -13°`. A **headline** se destaca do plano e avança para z +260px,
carregando a caixa de seleção. Rótulo `COPY` aparece **ancorado à camada**, mono
12px ciano, ligado por uma hairline de 1px — não é bullet point, é etiqueta de
componente.
Scene 2 (1.0–1.8s): os **dois pills de CTA** avançam para z +180px. Rótulo `CTA`.
Scene 3 (1.8–2.6s): a **foto do produto** avança para z +110px. Rótulo `DESIGN`.
Scene 4 (2.6–3.4s): o que sobra — grid, espaçamento, ordem da informação — recua
para z -40px como uma malha de hairlines ciano de 1px sobreposta ao layout.
Rótulo `HIERARQUIA`. Agora as quatro camadas coexistem, visivelmente separadas.
Scene 5 (3.4–4.3s): a câmera recua um pouco e **para**. Os quatro rótulos baixam
para 45% de opacidade — continuam legíveis, param de competir.
Scene 6 (4.3–4.7s): "Grandes profissionais criam grandes hipóteses." entra por
`per-word staggered reveal` no plano frontal, centrada, sobre o conjunto separado.
Scene 7 (4.7–8.0s): **HOLD 3.3s.** Câmera travada, camadas travadas, rótulos
travados. Nada cruza a frase.

## Frame 6 — O mercado decide

- scene: Os componentes voltam, a página se refaz e se duplica em A, B e C
- duration: 8s
- transition_in: cut
- status: animated
- type: feature_showcase
- persuasion: Da hipótese ao teste — a duplicação é a resposta à pergunta anterior
- beat: descoberta → aceleração
- blueprint: comparison-split (Adapt)
- src: compositions/frames/06-o-mercado-decide.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = cutout (repetido nas três variantes)
- focal: capture/assets/apple-mac-mini.png
- handoff_in: `pcard` em x252.5 y51.55 scale 1.14, rotateY -14°, camadas em Z (grid -140 · shot +170 · cta +290 · headline +420), rótulos a 0.5, palco já escuro
- handoff_out: três páginas A/B/C sobre `stage` #0A0A0C em escala 0.50, x = 20 / 660 / 1300, y 363.75, opacidade 1, paradas; rótulos A/B/C em ciano acima de cada uma (top 322)

Adapt de `comparison-split`: mantenho a assinatura do book-open — os pares entram
das alas opostas com tilts 3D espelhados — mas em três tempos (A já existe; B e C
nascem dela) e com tilts muito mais contidos, porque a peça inteira é contida.
**Regra dura deste shot:** cada variante tem copy própria, e todas são
decisões que um bom copywriter consideraria de verdade. Nenhuma é feia,
nenhuma é obviamente melhor.

| | subtítulo | linha terciária | CTAs |
| --- | --- | --- | --- |
| **A — controle** | Agora com M6 e M5 Pro. | Confira em breve a disponibilidade | Saiba mais · Ver preços |
| **B — variante** | Potência M6 e M5 Pro. | Em breve nas lojas. Fique atento. | Conheça já · Ver valores |
| **C — variante** | A nova geração chegou. | Novidade chegando em breve! | Descubra · Conferir já |

**A carrega a copy real da Apple, intocada.** O briefing determina que "uma
mantém a versão original como controle", e o espectador passou os shots 1–5
lendo exatamente essa copy — trocá-la quebraria a continuidade e a tese junto.
B é a reescrita mais contida das três, e é ela que vence. C é a mais
promocional (é a única com exclamação), e é ela que perde: uma coincidência
narrativa honesta, não uma lição embutida.

Scene 1 (0.0–1.2s): as camadas voltam para z 0 em `power2.inOut` e o `rotateY`
volta a 0°. Os rótulos COPY/CTA/DESIGN/HIERARQUIA saem. A página se refaz inteira.
Scene 2 (1.2–2.4s): o fundo branco **cede para `stage` #0A0A0C** por trás da
página — a primeira vez que o filme sai do branco. A página encolhe para escala
0.42 e passa a flutuar como objeto. Ela não muda: só descobrimos que estava dentro
de alguma coisa.
Scene 3 (2.4–3.4s): a página se **duplica horizontalmente**. A desliza para
x -560, a cópia surge em x 0 com um tilt espelhado curtíssimo (`split-tilt-cards`,
±4°) que assenta em 0°. Rótulos `A` e `B` em ciano.
Scene 4 (3.4–4.3s): surge **C** em x +560, mesma mecânica. As três em escala 0.30.
Composição tríptica, três camadas de profundidade (stage / páginas / rótulos).
Scene 5 (4.3–4.7s): "O comportamento real decide." entra na faixa superior.
Scene 6 (4.7–8.0s): **HOLD 3.3s.** As três páginas absolutamente paradas.

## Frame 7 — KRO AI

- scene: O espaço se revela como o sistema KRO; fluxos de usuários entram nas três páginas e as métricas começam a reagir
- duration: 8.5s
- transition_in: cut
- status: animated
- type: product_intro
- persuasion: Revelação do mecanismo — o sistema estava lá o tempo todo
- beat: aceleração
- blueprint: constellation-hub (Adapt)
- src: compositions/frames/07-kro-ai.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = supporting (dentro das três variantes)
- focal: compositions/frames — as três variantes como conjunto
- handoff_in: três páginas A/B/C em x 20 / 660 / 1300, y 363.75, escala 0.50, opacidade 1, paradas; rótulos visíveis
- handoff_out: três páginas nas mesmas posições e escala, opacidade 1; rótulos e índices A 100 / B 103 / C 98 em tela (top 734), estabilizados; malha do sistema visível; tráfego rarefeito

Adapt de `constellation-hub`: inverto a assinatura. Em vez de nós que saltam para
um anel em volta de um centro, **o centro é revelado como o campo que já continha
tudo** — a marca KRO entra como o rótulo do espaço, não como um logo que aterrissa.
Os "satélites" são sessões reais em movimento, não ícones decorativos.

Scene 1 (0.0–1.0s): uma malha de hairlines ciano a 6% de opacidade desenha-se
sobre o `stage` (`svg-path-draw`) — o espaço ganha coordenadas. No canto superior
esquerdo, `kro ai_` entra pequeno, em 400, ciano, sem fanfarra. Canto inferior
esquerdo: `Simulação ilustrativa · dados não reais`, mono 11px, `text-muted`.
Scene 2 (1.0–2.2s): sob cada página abre um **medidor mínimo** — rótulo (A
controle / B variante / C variante) e um índice em `tabular-nums` iniciando em
100 · 100 · 100. Nada mais de UI: sem cards, sem painéis.
Scene 3 (2.2–4.4s): **o tráfego começa.** Pontos ciano de 3px entram pela base do
frame em trajetórias determinísticas derivadas do índice do elemento
(`depth-scatter-assemble`, registro baixo) e sobem para as três páginas em
proporções desiguais. Alguns pontos **param no CTA e pulsam uma vez** (converteu);
alguns **atravessam e saem pelo topo** (avançou); alguns **desviam e caem**
(abandonou). Nenhum ponto é aleatório: a trajetória vem do índice.
Scene 4 (4.4–6.6s): os índices **reagem ao que está acontecendo**, não antes —
count-up assimétrico (`counting-dynamic-scale`): A sobe a 100, B a 103, C cai a 98.
O olho consegue ler os três porque só três números existem no frame inteiro.
Scene 5 (6.6–8.5s): a densidade de tráfego chega ao pico — é o momento mais denso
do filme — e então **assenta**: os números param, o fluxo continua mais rarefeito.
A câmera fez uma deriva lateral de 18px o shot inteiro e para aqui.

## Frame 8 — Aprendizado

- scene: C perde luminosidade e recua; B permanece e ramifica em B1, B2, B3; "Testar." / "Aprender." / "E testar novamente."
- duration: 9s
- transition_in: cut
- status: animated
- type: feature_showcase
- persuasion: O ciclo, não o resultado — o produto é o loop
- beat: aceleração
- blueprint: grid-card-assemble (Adapt)
- src: compositions/frames/08-aprendizado.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = supporting
- focal: compositions/frames — a variante B e seus ramos
- handoff_in: três páginas em x 20 / 660 / 1300 escala 0.50, opacidade 1; rótulos e índices 100 / 103 / 98 herdados em tela, saindo a partir de 0.5s
- handoff_out: B centralizada em x660 y325 escala 0.52 com anel ciano; A em x50 y364 a 0.52 de opacidade; C em x1540 y364 a 0.26; B1/B2/B3 assentadas em y769 escala 0.22; "E testar novamente." em tela, opacidade 1

Adapt de `grid-card-assemble`: mantenho a assinatura da cascata escalonada, mas o
que se monta não é uma grade de features — é **uma geração**. A metáfora é
evolutiva, e é construída inteiramente com interfaces: nenhum ícone de DNA,
nenhuma partícula, nenhuma árvore desenhada. **Regra de legibilidade deste shot:**
as três palavras ficam no eixo central e a ramificação acontece no terço
inferior — nada cruza as letras.

Scene 1 (0.0–1.5s): o sistema decide. **C perde luminosidade** (opacidade 1→0.28,
`depth-of-field-blur` leve) e recua em Z para -120px. A perde luminosidade de
forma mais suave (→0.5) e recua para -60px: o controle não é descartado, ele
continua sendo a referência. **B permanece em foco** e desliza para o centro,
escala 0.34. Só agora um contorno ciano de 1px a marca — é o único momento em que
o ciano significa "vencedora", e ele chega **depois** dos dados.
Scene 2 (1.5–2.0s): "Testar." entra no centro superior.
Scene 3 (2.0–3.7s): **HOLD 1.7s.** Debaixo dela, no terço inferior, uma hairline
ciano começa a se desenhar de B para baixo — movimento periférico, longe do texto.
Scene 4 (3.7–4.2s): corte de velocidade casada (`cut-catalog.md`, waterfall) —
"Testar." sai e "Aprender." entra na mesma direção e velocidade.
Scene 5 (4.2–5.9s): **HOLD 1.7s.** A hairline se bifurca em três no terço inferior.
Scene 6 (5.9–6.4s): mesmo corte casado para "E testar novamente."
Scene 7 (6.4–9.0s): **HOLD 2.2s** na terceira frase. Debaixo dela, **B1, B2 e B3**
assentam em cascata escalonada (`waterfall-entry`), escala 0.16, cada uma uma
variação mínima de B. Elas chegam nos primeiros 1.2s do HOLD e depois param
completamente — os últimos 1.4s são de imobilidade total.

## Frame 9 — Excelente → excelente + dados

- scene: Original e vencedora lado a lado, ambas excelentes; um índice abstrato vai de 100 a 101
- duration: 7.5s
- transition_in: cut
- status: animated
- type: social_proof
- persuasion: Honestidade calibrada — a diferença é pequena, e é justamente esse o ponto
- beat: payoff
- blueprint: dataviz-countup (Adapt)
- src: compositions/frames/09-cem-e-um.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = supporting (dentro das duas páginas)
- focal: compositions/frames — o par de números
- handoff_in: B em x660 y325 escala 0.52 com anel; A a 0.52 e C a 0.26 nas laterais; B1/B2/B3 em y769 escala 0.22, saindo nos primeiros 0.6s
- handoff_out: câmera em scale 1.34 (origem 960,654); "101" à direita em x1603 corpo 118px, opacidade 1; "100" à esquerda; páginas a 0.78 de opacidade

Adapt de `dataviz-countup`: mantenho a assinatura — a câmera empurra **através**
dos números até pousar numa métrica-herói — mas removo o triunfalismo. O count-up
vai de 100 a 101. É um número anticlimático de propósito: **o shot mais importante
do filme conceitualmente é aquele em que a diferença quase não existe.**

Scene 1 (0.0–1.2s): B1/B2/B3 saem. A (controle) volta a opacidade 1 e assenta em
x -420; B em x +420. Escala 0.38 nas duas. Split-screen simétrico. **Nenhuma das
duas é apresentada como errada** — mesma luz, mesmo peso, mesma nitidez.
Scene 2 (1.2–2.6s): sob cada uma, um índice em `tabular-nums`. O da esquerda fica
em **100**, parado. O da direita conta **100 → 101** (`counting-dynamic-scale`,
registro contido — o tamanho cresce 4%, não 40%).
Scene 3 (2.6–3.4s): a câmera se aproxima dos dois números
(`coordinate-target-zoom`), as páginas saem de foco para 0.35 de opacidade, e o
movimento **para**.
Scene 4 (3.4–3.8s): "Às vezes, a diferença é só 1%." entra abaixo dos números.
Scene 5 (3.8–7.5s): **HOLD 3.7s.** Câmera parada, números parados, páginas paradas.

## Frame 10 — Escala

- scene: O 1% ocupa o centro; a câmera recua de forma controlada e revela a massa de sessões sobre a qual ele incide
- duration: 8.5s
- transition_in: cut
- status: animated
- type: benefit_highlight
- persuasion: Reenquadramento de magnitude
- beat: payoff
- blueprint: zoom-out-workspace-reveal (Adapt)
- src: compositions/frames/10-escala.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = background (repetido na massa, ilegível por escala)
- focal: compositions/frames — o campo de sessões
- handoff_in: "101" na MESMA posição e corpo em que o F09 o deixou — x+643 do centro, 118px, opacidade 1 — sobre palco vazio; a entrega para o "1%" é sequencial, os dois nunca coexistem visíveis
- handoff_out: câmera em scale 0.12 com o campo de sessões preenchendo o frame; "1%" centrado em escala 0.50, opacidade 1; câmera parada

Adapt de `zoom-out-workspace-reveal`: assinatura preservada e é a alma do shot —
**um único recuo contínuo e desacelerante revela o todo que contém o detalhe**.
O que contém não é um workspace de ferramenta: é a escala de tráfego. O briefing
pede um recuo "violento porém controlado" — resolvo isso com **velocidade alta e
curva longa**, não com corte brusco.

Scene 1 (0.0–0.4s): "101" morfa em "**1%**" no mesmo centro óptico
(`scale-swap-transition`). As páginas somem.
Scene 2 (0.4–0.8s): "1% parece pequeno." entra logo abaixo.
Scene 3 (0.8–3.3s): **HOLD 2.5s.** Câmera absolutamente parada. Só o 1% e a frase.
Scene 4 (3.3–3.7s): a frase sai.
Scene 5 (3.7–5.1s): **o recuo.** Escala global 1.0 → 0.12 numa única curva
`expo.inOut` de 1.4s. Conforme o campo abre, milhares de eventos de sessão —
pontos ciano de 2px em malha determinística derivada do índice — preenchem o
espaço em profundidade, camada após camada. O 1% encolhe junto e vira um ponto de
referência minúsculo no centro. Três camadas: campo distante desfocado / campo
médio / o 1% em foco.
Scene 6 (5.1–5.5s): o recuo **para por completo**. Só então
"Até você multiplicar pela escala." entra.
Scene 7 (5.5–8.5s): **HOLD 3.0s.** Campo congelado, câmera congelada.

## Frame 11 — Impacto

- scene: Cadeia vertical mínima 1% → milhões de decisões → impacto potencial enorme, resolvendo em "Pequenos ganhos. Escala gigantesca."
- duration: 6.5s
- transition_in: cut
- status: animated
- type: benefit_highlight
- persuasion: Encadeamento lógico explícito, sem alegação financeira
- beat: payoff
- blueprint: kinetic-type-beats (Reproduce)
- src: compositions/frames/11-impacto.html
- asset_candidates: []
- roles: (sem assets fotográficos — shot puramente tipográfico, por decisão do briefing)
- focal: tipografia
- handoff_in: câmera em scale 0.12, campo de sessões preenchendo o frame, opacidade 1
- handoff_out: campo de sessões mantido em scale 0.12; cadeia a 0.30 de opacidade; "Pequenos ganhos. Escala gigantesca." centrada, opacidade 1, parada

Reproduce de `kinetic-type-beats`: a assinatura — uma afirmação que se constrói em
batidas de tela cheia, cada uma com seu próprio movimento, resolvendo num payoff —
é exatamente o que o briefing desenha aqui. **Decisão de conformidade:** o
briefing autoriza verbalizar "centenas de milhões" apenas em locução, e este
projeto é mudo. Portanto essa frase **não entra em tela em nenhuma forma**. A tela
carrega só a cadeia abstrata e o payoff, como o próprio briefing prefere.

Scene 1 (0.0–0.6s): `1%` entra no topo da cadeia, ciano, mono, tabular.
Scene 2 (0.6–1.4s): uma seta vertical de 1px se desenha para baixo
(`svg-path-draw`) e `milhões de decisões` assenta abaixo, em branco.
Scene 3 (1.4–2.2s): segunda seta, e `impacto potencial enorme` assenta. Note o
**potencial**: é hipótese de magnitude, não resultado. A cadeia inteira ocupa o
eixo central, três camadas de profundidade contra o campo residual ao fundo.
Scene 4 (2.2–3.0s): a cadeia baixa para 30% de opacidade e recua levemente em Z.
Scene 5 (3.0–3.4s): "Pequenos ganhos. Escala gigantesca." entra em display grande
no centro óptico, as duas sentenças em pesos diferentes (600 / 400).
Scene 6 (3.4–6.5s): **HOLD 3.1s.** Tudo parado.

## Frame 12 — Não substituir

- scene: Decisões humanas entram no sistema como hipóteses; "KRO AI não substitui grandes profissionais."
- duration: 7.5s
- transition_in: cut
- status: animated
- type: branding
- persuasion: Desarmar a objeção antes que ela seja formulada
- beat: resolução
- blueprint: spatial-pan-stations (Adapt)
- src: compositions/frames/12-nao-substituir.html
- asset_candidates: []
- roles: (sem fotografia — o briefing proíbe pessoas genéricas e banco de imagens; os profissionais são representados pelas próprias decisões)
- focal: tipografia + as linhas de fluxo
- handoff_in: campo de sessões em scale 0.12, inalterado
- handoff_out: frase em três linhas no top 614 — "KRO AI" / "não substitui" / "grandes profissionais." — opacidade 1, parada. **A negação vive na mesma linha do verbo**, e é isso que permite que ela saia junto com ele no F13: trocar só "substitui" deixaria "KRO AI não potencializa", invertendo a mensagem da marca

Adapt de `spatial-pan-stations`: mantenho as estações pré-posicionadas atravessadas
por uma câmera única, mas encolho a traversal a um deslize de 40px — o shot é de
resolução, não de exploração. **Regra do briefing honrada literalmente:** nenhuma
pessoa, nenhuma foto de banco. Cada profissional existe apenas como o rótulo da
sua disciplina e a hipótese que ele produz.

Scene 1 (0.0–0.7s): `DESIGNER` entra à esquerda, mono ciano 12px; uma hairline
sai dele para a direita e deposita um retângulo de 1px rotulado `hipótese`.
Scene 2 (0.7–1.4s): `COPYWRITER` → `hipótese`, uma linha abaixo, mesma mecânica,
mesmo intervalo. A repetição é o argumento.
Scene 3 (1.4–2.1s): `ESTRATEGISTA` → `hipótese`.
Scene 4 (2.1–2.8s): as três hipóteses convergem para a direita, onde `KRO` recebe
`experimentação + aprendizado`. O sistema é o destino, não a origem — as ideias
continuam vindo das pessoas.
Scene 5 (2.8–3.2s): o diagrama inteiro baixa para 22% de opacidade e
"KRO AI não substitui grandes profissionais." entra no centro óptico.
Scene 6 (3.2–7.5s): **HOLD 4.3s** — a mensagem mais importante do filme depois da
tese, e a que mais precisa ser lida inteira.

## Frame 13 — Payoff

- scene: "substitui" vira "potencializa"; a página excelente reaparece com o histórico de variantes atrás
- duration: 7.5s
- transition_in: cut
- status: animated
- type: benefit_highlight
- persuasion: Payoff por troca de uma única palavra
- beat: resolução
- blueprint: kinetic-type-beats (Adapt)
- src: compositions/frames/13-potencializa.html
- asset_candidates: capture/assets/apple-mac-mini.png
- roles: apple-mac-mini = supporting (dentro da página que reaparece)
- focal: a palavra que muda
- handoff_in: a mesma frase de três linhas no top 614, opacidade 1, imóvel — marcação idêntica à do F12, então o corte é invisível
- handoff_out: página excelente em x708 y428 escala 0.42, opacidade 1; histórico (A·B·C·B1·B2) em y538 escala 0.15 a 0.14 de opacidade; frase final em tela

Adapt de `kinetic-type-beats`: a assinatura é a **troca de token no lugar** — a
frase não sai e volta, só a linha central dela muda. Isso obriga o espectador a reler
a mesma sentença e perceber que a tese inverteu. É o melhor uso possível dessa
assinatura no filme.

Scene 1 (0.0–0.3s): a frase herdada continua exatamente onde estava. Zero
movimento — o espectador precisa reconhecê-la como a mesma.
Scene 2 (0.3–1.3s): **"não substitui" → "potencializa"**, troca no lugar
(`discrete-text-sequence`): a palavra antiga sobe 8px e sai, a nova entra por
baixo no mesmo baseline, e a linha **re-flui** em `power2.inOut` para acomodar as
três letras a mais. A palavra nova chega em ciano e assenta em branco em 0.4s —
o ciano marca o aprendizado e depois se retira.
Scene 3 (1.3–3.0s): **HOLD 1.7s** na frase mudada.
Scene 4 (3.0–3.4s): a frase sai. Atrás dela, a página excelente reaparece em
escala 0.30, e **atrás dela** o histórico acumulado: A, B, C, B1, B2, B3 em
escala 0.10 e opacidade 0.10, dispostas em profundidade como camadas de memória.
Discretas — o briefing pede "discretamente".
Scene 5 (3.4–3.8s): "Transforme páginas excelentes em sistemas que aprendem."
entra no terço superior.
Scene 6 (3.8–7.5s): **HOLD 3.7s.** Tudo imóvel.

## Frame 14 — End card

- scene: Toda a complexidade se reduz; marca KRO AI central, headline e CTA
- duration: 6.5s
- transition_in: cut
- status: animated
- type: cta
- persuasion: A tese devolvida ao espectador como pergunta sobre a própria página dele
- beat: resolução
- blueprint: logo-assemble-lockup (Adapt)
- src: compositions/frames/14-end-card.html
- asset_candidates: assets/kro-logo.png
- roles: kro-logo = cutout (lockup central)
- focal: assets/kro-logo.png
- handoff_in: página excelente em x708 y428 escala 0.42, opacidade 1, sobre palco escuro — mesma posição em que o F13 a deixou

Adapt de `logo-assemble-lockup`: a assinatura é a marca **vindo a existir** na
tela; aqui ela vem a existir por **subtração** — tudo o mais se retira e o que
sobra é a marca. Único frame em que `kro-brand` #7C3AED aparece, e só no lockup.

Scene 1 (0.0–1.2s): a página e o histórico recuam em Z e saem por opacidade; o
`stage` cede a um fundo limpo. Nenhuma explosão, nenhum flash: uma retirada.
Scene 2 (1.2–1.6s): o logo `kro ai_` assenta no centro óptico
(`spring-pop-entrance`, registro de assentamento suave — sem overshoot).
Scene 3 (1.6–2.0s): "Sua melhor página ainda é uma hipótese." entra logo abaixo,
display grande. Em seguida, no mesmo movimento escalonado, o CTA secundário
"Teste com KRO AI." e, abaixo dele, `usekro.ai` em mono pequeno.
Scene 4 (2.0–6.5s): **HOLD 4.5s absolutamente estático.** Nenhum movimento de
espécie alguma depois da composição formada — nem jitter. O briefing pede fim
completamente estável, e o filme termina em silêncio visual.
