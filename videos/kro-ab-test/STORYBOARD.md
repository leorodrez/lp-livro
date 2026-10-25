---
format: 1080x1080
duration: 25s
message: "O KRO AI testa as headlines da sua landing page sozinho e elege a campeã"
arc: Demo Loop — a página → duplica → triplica → a campeã → o mecanismo (KRO) → CTA
audience: Founders de SaaS, infoprodutores e gestores de tráfego que rodam mídia paga para uma landing page cuja headline nunca foi testada
mode: autonomous
music: none
---

## Video direction

**Este vídeo é mudo por construção.** Não há narração nem trilha (sem credencial
HeyGen, engines locais sem deps). Onde o método pede "revele no momento em que a
narração nomeia a peça", aqui a régua é **o beat visual**: cada Scene abaixo é
uma deixa, e nada entra antes da sua. A proibição continua valendo igual —
**nenhum frame despeja o canvas inteiro em t=0.**

**Sistema de palette (de `frame.md`, por papel — nada inventado).**

- `ground-dark` `#2B2B2B` é o palco dos frames 1–4 e 6: o mundo do teste e o
  fechamento. As páginas mock são cartões brancos sobre ele, e é esse contraste
  que faz a página se ler como objeto manipulável.
- `bg` `#FFFFFF` é o papel das páginas mock; `text` `#2B2B2B` é a tinta delas.
  As páginas nunca usam a cor da marca — elas são o objeto do teste, não o KRO.
- `primary` cyan `#06B6D4` é **o único accent**: todo numeral, o ponto "ao vivo",
  a borda e o selo da campeã, o pill do CTA. Nunca mais de um accent por frame.
- `brand` roxo `#7C3AED` é **fundo**, não accent — pinta o campo inteiro do
  letreiro (Frame 5), com tipo branco por cima. Num frame de fundo roxo o cyan
  cai para no máximo uma palavra.
- `text-muted` / `text-light` fazem a escada de cinza da UI mock (labels, nav).
- `sand` não entra: a peça é curta demais para um beat de respiro.

**Tipografia por papel (semântica da marca, de `frame.md`).** Ramp `body` /
`tag` / `counter` / `h4-eyebrow` = **Manrope** — vale para tudo que finge ser
produto: as landing pages mock, os modais de visitante, chrome e labels. Ramp
display (`h1` / `h2` / `stat-num` / `metric-value`) = **Sora** — só quando a
marca fala: o letreiro e o CTA. A troca de fonte é o sinal de "agora não é mais
o produto, é o KRO". As fontes são locais (`assets/fonts/`), nunca de rede.

**Gramática de movimento.** Curvas de cauda longa, `power3` como padrão — suave
vence saltitante. O movimento assinatura do filme é a **multiplicação**: uma
página que encolhe e cede espaço à sua cópia, sempre com a original mantendo
posição e escala exatas na virada de frame (por isso os frames 2–5 entram em
`cut`, com `handoff` numérico — um crossfade duplicaria as páginas na tela e
mataria a leitura de "é a mesma página se copiando"). Os números sobem em
count-up preso à timeline. Durante um hold, no máximo o pulso do ponto "ao vivo"
continua vivo — nada de respiração ociosa.

**Ritmo / frames em hold.** Frames 1 e 6 são os beats parados: o 1 abre com a
página lendo estática por quase um segundo antes de qualquer coisa acontecer
(estabelece "isto é uma landing page comum"), e o 6 é o end-card calmo — a
quietude é a confiança da marca. Frame 4 é o clímax e concentra a densidade.
Frame 5 é o único movimento de câmera do filme, e é o pedido explícito do brief.

**Lista negativa.** Sem scrollbar, sem chrome de navegador real, sem cursor de
sistema, sem gradiente roxo-azul "de IA", sem bokeh, sem sombra pesada (o preset
proíbe — o lift vem do card tintado). Sem os dois modos de falha: **slideshow**
(despejar tudo em t=0 e congelar) e **screensaver** (tudo flutuando sozinho sem
causa). Nenhum número fora de tela de produto, e nenhuma promessa de "+X% de
conversão" — o KRO descobre qual copy converte, não garante número.

**Faixa de legenda.** Legendas estão desligadas (vídeo mudo), mas os ~17%
inferiores do quadro seguem livres de conteúdo importante; só a assinatura
`Conversão inteligente` ocupa esse rodapé, como colofão.

---

## Frame 1 — A página

- scene: uma landing page comum de um SaaS de IA, sozinha no palco, lendo estática
- voiceover: ""
- duration: 3.5s
- transition_in: cut
- status: animated
- src: compositions/frames/01-a-pagina.html
- type: hook
- persuasion: Pain validation (o reconhecimento é a isca — "essa página é a minha")
- beat: curiosidade + reconhecimento
- blueprint: device-surface-showcase (Adapt)
- focal: a página mock — cartão branco, ~70% do quadro
- roles: página mock = cutout (herói) · palco charcoal = background
- asset_candidates:
- sfx: none (vídeo mudo)

narrativeRole: estabelece o objeto do vídeo — uma landing page qualquer, com uma
headline que alguém escolheu no achismo. Precisa ler como página de verdade, não
como peça de marca, senão a multiplicação seguinte não significa nada.
keyMessage: esta é a sua página, e a headline dela nunca foi testada.

Adapt: mantenho a assinatura do blueprint — a superfície do produto segurada como
herói, apresentada por si mesma — mas troco o mockup de device por um cartão de
página puro (sem moldura de browser: a lista negativa proíbe chrome real, e o
cartão limpo é o que vai poder se duplicar sem ruído). Sem cursor: a página não é
operada, ela é observada.

Scene 1 (0.0–0.9s): palco charcoal vazio; o cartão da página entra do fundo, uma
escala curta subindo ao repouso, e **para**. Só o cartão — Centered, ~70% do
quadro, 3 camadas (palco → cartão → conteúdo do cartão). Nada mais acontece: o
hold inicial é o que faz a página parecer banal.
Scene 2 (0.9–2.1s): dentro do cartão o conteúdo assenta em cascata curta de cima
para baixo — nav, headline, subhead, botão — cada peça chegando por conta
própria. A headline domina (3:1 sobre a subhead), alinhada à esquerda no terço
superior do cartão.
Scene 3 (2.1–3.5s): tudo resolvido e **imóvel**. Um rótulo `versão A` em pill
Manrope brota no canto superior-esquerdo do cartão — a primeira pista de que
existe um teste rodando — e o quadro segura a leitura até o corte.

handoff_out: cartão-A com centro em (540, 540), escala 1.0, opacidade 1, sem
velocidade no corte; pill `versão A` em (150, 215), opacidade 1.

## Frame 2 — Duplica

- scene: a página encolhe para o quadrante superior-esquerdo e uma cópia sua nasce ao lado, com outra headline; um modal de visitantes sobe em cada uma
- voiceover: ""
- duration: 4.0s
- transition_in: cut
- status: animated
- src: compositions/frames/02-duplica.html
- type: key_feature
- persuasion: Negative contrast (mesma página, mesma oferta — só a frase muda)
- beat: intriga
- blueprint: comparison-split (Adapt)
- focal: o par de páginas A|B
- roles: página A = cutout · página B = cutout (peso igual) · modais = supporting · palco = background
- asset_candidates:
- sfx: none (vídeo mudo)

narrativeRole: o mecanismo aparece pela primeira vez. O ponto não é "existem duas
páginas", é que **só a headline mudou** — tudo o mais é idêntico, o que isola a
variável e mostra o que o KRO testa.
keyMessage: mesma página, outra frase.

Adapt: guardo a assinatura do comparison-split — dois itens de peso igual
assentando lado a lado com o badge dando o soco final — mas as duas metades não
entram das asas opostas: **a da esquerda já estava lá** (é a página do Frame 1,
que encolhe e se desloca) e a da direita se destaca dela. Essa origem compartilhada
é o que lê como duplicação em vez de comparação. O badge do blueprint vira o
rótulo `versão B`, e os modais de visitante são a extensão pedida pelo brief.

handoff_in: cartão-A com centro em (540, 540), escala 1.0, opacidade 1, parado —
idêntico ao handoff_out do Frame 1. O cartão-B nasce sobreposto a ele, na mesma
posição e escala, opacidade 0, carregando a headline A.

Scene 1 (0.0–1.0s): o cartão-A encolhe e desliza para o quadrante superior-
esquerdo numa curva única; enquanto viaja, uma silhueta dele se separa e assenta
no quadrante superior-direito. Split-screen 50/50, os dois com o mesmo peso.
Scene 2 (1.0–1.8s): a headline do cartão da direita **troca no lugar** — a frase
A sai, a frase B entra por cima do mesmo bloco, e nada mais no cartão se mexe. É
o beat que carrega o argumento inteiro; a imobilidade do resto é o que o prova.
O rótulo `versão B` pop-a no canto do cartão direito.
Scene 3 (1.8–3.0s): um modal de visitantes sobe sob cada cartão — pill Manrope,
ponto cyan "ao vivo" pulsando, o número contando a partir do zero. O da esquerda
chega primeiro, o da direita logo atrás.
Scene 4 (3.0–4.0s): os contadores continuam subindo em ritmo mais lento e o resto
do quadro segura. Só o pulso dos pontos vive.

handoff_out: cartão-A com centro em (286, 470), escala 0.58, opacidade 1;
cartão-B com centro em (794, 470), escala 0.58, opacidade 1; ambos parados.
Pills em (59.8, 261.6) e (567.8, 261.6); modais em (168, 620.4) e (676, 620.4),
opacidade 1, contadores em 1.284 e 1.301.

## Frame 3 — Triplica

- scene: um terceiro cartão desce para o quadrante inferior-esquerdo com uma terceira headline, e ganha seu próprio modal; a quarta célula fica vazia
- voiceover: ""
- duration: 4.0s
- transition_in: cut
- status: animated
- src: compositions/frames/03-triplica.html
- type: key_feature
- persuasion: Rule of three (a terceira ocorrência transforma um par num sistema)
- beat: clareza — "ah, isto é uma máquina, não um teste avulso"
- blueprint: grid-card-assemble (Adapt)
- focal: o terceiro cartão descendo para a grade
- roles: cartões A e B = supporting (já estabelecidos) · cartão C = cutout · célula vazia = supporting · palco = background
- asset_candidates:
- sfx: none (vídeo mudo)

narrativeRole: converte a comparação em sistema. Duas páginas é um teste A/B que
qualquer um faz na mão; três, com a quarta célula visivelmente vazia, é uma
máquina rodando — e a célula vazia é a promessa que o Frame 4 cumpre.
keyMessage: não são duas versões, é uma máquina gerando versões.

Adapt: mantenho a assinatura do grid-card-assemble — itens se auto-montando em
cascata para dentro de uma grade — mas a cascata é de **um** item, porque os
outros dois já estão montados desde o frame anterior. O ganho do blueprint aqui é
a grade se declarando: a moldura 2×2 aparece antes de estar cheia, e o slot vazio
faz o trabalho narrativo.

handoff_in: cartão-A centro (286, 470) escala 0.58, cartão-B centro (794, 470)
escala 0.58, ambos opacidade 1 e parados; pills e modais nas coordenadas do
handoff_out do Frame 2; contadores entram em 1.284 e 1.301 — a contagem retoma,
não reinicia.

Scene 1 (0.0–0.7s): a moldura da grade 2×2 se insinua — o contorno tracejado da
célula inferior-direita desenha-se sozinho no palco, vazio. Os dois cartões de
cima seguem parados; só a grade se declara.
Scene 2 (0.7–1.7s): o cartão-C desce para o quadrante inferior-esquerdo com a
terceira headline já escrita nele, assentando na curva longa. Grade 2×2, 3
camadas (palco → grade → cartões).
Scene 3 (1.7–2.7s): o modal do cartão-C sobe e começa a contar; os contadores de
A e B continuam de onde estavam, em ritmos visivelmente diferentes um do outro.
O rótulo `versão C` pop-a.
Scene 4 (2.7–4.0s): hold com os três contadores subindo devagar e a célula vazia
segurando o olho. A hierarquia inverte de propósito: o buraco é o elemento mais
alto da grade.

handoff_out: cartões A, B e C com centros em (317, 280), (763, 280) e (317, 640),
escala 0.50, opacidade 1, parados; pills em (122, 96), (568, 96) e (122, 456);
modais em (199, 408), (645, 408) e (199, 768), opacidade 1, contadores em 1.731,
1.810 e 1.189; célula D vazia com contorno tracejado em (568, 500), 390×280,
opacidade 1.

## Frame 4 — A campeã

- scene: um quarto cartão preenche a célula vazia com uma copy diferente, as taxas de conversão sobem nos quatro, e o quarto é eleito campeão
- voiceover: ""
- duration: 6.0s
- transition_in: cut
- status: animated
- src: compositions/frames/04-campea.html
- type: benefit_highlight
- persuasion: Show-don't-tell proof (a eleição acontece na tela; ninguém afirma nada)
- beat: tensão → triunfo
- blueprint: dataviz-countup (Adapt)
- focal: o cartão-D e sua taxa de conversão
- roles: cartão D = cutout · cartões A/B/C = supporting (recuam) · leitura de conversão = cutout · palco = background
- asset_candidates:
- sfx: none (vídeo mudo)

narrativeRole: o clímax e o único beat que julga. Até aqui o vídeo só multiplicou;
aqui ele **decide**, e a decisão vem de um número que sobe na frente do viewer, não
de uma afirmação. É o frame mais denso do filme de propósito.
keyMessage: uma delas converte mais, e dá para saber qual.

Adapt: guardo a assinatura do dataviz-countup — o número como herói, contando até
o valor que carrega o argumento — mas são quatro count-ups simultâneos em vez de
um, e a câmera não empurra através deles: a resolução é a **eleição** (três
recuam, um se levanta). Troco a métrica de visitantes por conversão no meio do
frame, que é o que decide o teste. Os números se leem como leitura de produto —
rótulo `conversão`, escala e tipografia de UI — nunca como promessa da marca.

handoff_in: cartões A, B e C nas posições, escala 0.50 e opacidade 1 do
handoff_out do Frame 3, parados; célula D ainda vazia com o mesmo contorno
tracejado; contadores de visitante entram em 1.731, 1.810 e 1.189.

Scene 1 (0.0–1.0s): o cartão-D cai dentro da célula vazia e o contorno tracejado
se apaga sob ele. A grade fecha: 2×2 completa, quatro headlines diferentes, todo
o resto idêntico entre elas.
Scene 2 (1.0–2.2s): os modais de visitante se transformam no lugar — o rótulo
`visitantes agora` vira `conversão` e o número troca de escala para a ramp de
métrica. Nenhum cartão se move; só a leitura muda de assunto.
Scene 3 (2.2–3.8s): as quatro taxas contam para cima ao mesmo tempo, em velocidades
diferentes. A do cartão-D passa as outras no meio da subida — a ultrapassagem é o
beat, e é ela que cria a tensão que o frame precisa antes de resolver.
Scene 4 (3.8–4.8s): resolução — os cartões A, B e C recuam (escala e opacidade
caem juntas) enquanto o cartão-D sobe uma camada, ganha a borda cyan e o selo
`CAMPEÃ` em pill spring-pop no topo. Único accent do quadro.
Scene 5 (4.8–6.0s): hold no clímax. A grade inteira imóvel, o D dominando por
tamanho, contraste e camada; os três recuados ainda legíveis como contexto.

handoff_out: grade 2×2 completa, wrapper do palco em escala 1.0 e y 0, parado.
Cartões A, B e C em escala 0.4775 e opacidade 0.55 nos centros (317, 280),
(763, 280) e (317, 640); cartão-D em escala 0.5225 e opacidade 1 no centro
(763, 640), com anel cyan (escala 1.045) e selo `CAMPEÃ` em (687, 456),
opacidade 1. Pills e modais de A/B/C em opacidade 0.5; modais lendo `conversão`
com 3,1% · 4,2% · 2,7% · 6,8%.

## Frame 5 — O mecanismo

- scene: zoom out — a grade inteira encolhe e vira uma miniatura dentro do campo roxo do KRO, e o letreiro da marca sobe
- voiceover: ""
- duration: 4.5s
- transition_in: cut
- status: animated
- src: compositions/frames/05-mecanismo.html
- type: branding
- persuasion: Feature-to-benefit translation (o que o viewer acabou de ver ganha nome e dono)
- beat: inevitabilidade
- blueprint: zoom-out-workspace-reveal (Reproduce)
- focal: o letreiro da marca
- roles: grade 2×2 = supporting (vira miniatura) · letreiro = cutout · campo roxo = background
- asset_candidates:
- sfx: none (vídeo mudo)

narrativeRole: nomeia o mecanismo. O viewer acabou de ver a coisa acontecer por
quatro frames sem saber de quem era; este frame entrega a autoria ao KRO. É o
único movimento de câmera do filme, e o brief pediu exatamente ele.
keyMessage: isso que você viu tem nome, e roda sozinho.

Reproduce: o blueprint é o pedido do brief ao pé da letra — um único zoom-out
contínuo e desacelerando que revela o todo que continha o detalhe, com o payoff
em nível de elemento acontecendo depois que o quadro trava. Não há zoom-in em
lugar nenhum.

handoff_in: idêntico ao handoff_out do Frame 4 — wrapper do palco em escala 1.0,
y 0, parado; cartões A/B/C em 0.4775 e opacidade 0.55, cartão-D em 0.5225 com
anel e selo, modais lendo `conversão`. As duas faixas roxas entram em scaleY 0.

Scene 1 (0.0–1.6s): **o zoom out** — um único movimento contínuo e desacelerando
leva a grade de escala cheia a miniatura, subindo para o terço superior. Enquanto
ela encolhe, o campo roxo da marca cresce das bordas para dentro e toma o palco
charcoal. Uma coisa só se movendo, o resto obedecendo.
Scene 2 (1.6–2.4s): o quadro trava com a grade pequena e quieta lá em cima. O
logo `kro ai_` assenta logo abaixo dela, em Sora — a troca de fonte marca que
agora quem fala é a marca, não o produto na tela.
Scene 3 (2.4–3.6s): o letreiro sobe em blocos, cada linha por conta própria:
"o KRO AI roda seus testes A/B" · "e elege a versão campeã da sua página." Tipo
branco sobre roxo, alinhado à esquerda, dominando os dois terços inferiores.
Scene 4 (3.6–4.5s): hold. Uma única palavra do letreiro carrega o cyan — o accent
solitário permitido num frame de fundo roxo — e nada mais se mexe.

handoff_out: campo roxo full-bleed (as duas faixas em scaleY 1), opacidade 1;
wrapper do palco em escala 0.30 com centro em (540, 236) — a miniatura da grade
no terço superior; letreiro completo, opacidade 1, tudo parado.

## Frame 6 — Teste agora a sua

- scene: end-card calmo, fundo charcoal — "Teste agora a sua", o pill do CTA e a assinatura
- voiceover: ""
- duration: 3.0s
- transition_in: crossfade
- status: animated
- src: compositions/frames/06-cta.html
- type: cta
- persuasion: Friction reduction (o convite é curto e o custo é nomeado — 14 dias grátis)
- beat: motivação, sem urgência fabricada
- blueprint: titlecard-reveal (Reproduce)
- focal: a linha "Teste agora a sua"
- roles: linha de CTA = cutout · pill do CTA = supporting · assinatura = supporting · palco charcoal = background
- asset_candidates:
- sfx: none (vídeo mudo)

narrativeRole: fecha. A marca já provou o ponto nos cinco frames anteriores, então
o pedido pode ser pequeno — e no sistema do KRO o CTA é discreto de propósito,
nunca grita oferta.
keyMessage: teste agora a sua.

Reproduce: o beat calmo do blueprint — um card revelado com exatamente **um**
movimento contido e depois parado. A baixa quantidade de movimento é a carga
útil, não uma falta: é a confiança da marca depois do clímax do Frame 4.

Scene 1 (0.0–1.0s): o campo roxo do frame anterior cede ao charcoal no crossfade;
"Teste agora a sua" sobe do baixo num único slide-up curto, Sora pesada, branca,
centralizada. Um movimento só, e acabou.
Scene 2 (1.0–1.8s): o pill cyan do CTA — o único elemento sólido do sistema —
assenta abaixo da linha, e o logo `kro ai_` fica acima dela.
Scene 3 (1.8–3.0s): hold absoluto. `usekro.ai · 14 dias grátis` e a assinatura
`Conversão inteligente` acomodam-se no rodapé em Manrope pequena, e o quadro para
de vez até o fim do filme.
