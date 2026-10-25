# REVIEW — KRO AI · "Uma página. Possibilidades infinitas."

25,0 s · 1080x1350 (4:5) · 30 fps · 750 frames · sem locução · pt-BR.

## As decisões criativas

**O roteiro era a história; não houve rodada de conceitos.** O arquivo enviado já trazia
as quatro cenas, a ordem dos textos, a paleta obrigatória, o estilo e o objetivo. Então o
trabalho foi de direção e execução, não de concepção. As três linhas narrativas que o
fluxo normalmente propõe não foram construídas nem oferecidas: havia uma história
escolhida.

**A página mock é o site do espectador, não a interface do KRO AI.** Essa é a decisão que
organiza o filme inteiro. Por isso não há nenhum dashboard, gráfico, métrica ou tela de
produto — o que o roteiro proíbe explicitamente — e por isso inventar copy de landing page
genérica não é inventar claim do KRO AI. Nenhum número, percentual ou funcionalidade do
produto aparece no filme. O único ativo real de marca é o logotipo.

**A tese virou uma regra de construção, não uma frase.** A caixa da página, o raio, a
sombra, a barra de chrome, as duas barras de corpo e o botão de 230×60 são rigorosamente
idênticos em todas as 13 variantes e em todas as 5 escalas do filme. O que muda são só os
glifos. É por isso que a troca na onda é **sequencial** (sai uma, entra a outra) e nunca um
crossfade: num crossfade as duas versões aparecem meio a meio e a imagem lê como falha de
render, não como transformação.

**A Cena 3 destaca por brilho, não por zoom.** O roteiro diz "a câmera destaca cada uma".
Movimento de câmera enquanto há rótulo novo para ler quebraria a orientação de
legibilidade mobile, que é dura no roteiro. Então a câmera fica parada e quem destaca é o
brilho mais 4% de escala, com os rótulos **acumulando** na tela em vez de se substituírem.

**O formato veio do pedido, não do roteiro.** O roteiro diz 9:16; o pedido diz
1080x1350. O enquadramento foi recomposto para 4:5 (página a 1,10× centrada em y=755,
grade 3×3 ocupando y 440–1100, logo no rodapé livre), não espremido.

**Ênfase cromática:** `#7C3AED` como *texto* sobre grafite dá 2,3:1, abaixo do mínimo
legível. As quatro palavras de ênfase usam `#A78BFA`, um tom claro da mesma família. O
`#7C3AED` exato segue no botão da mock, na onda, no preenchimento do logo e na pill do CTA.

## O conflito de duração, e como foi resolvido

O roteiro soma ~65 palavras de texto de tela. A 3 palavras/segundo mais a latência de
reconhecimento, ler tudo em sequência pediria ~27 s. O corte fecha em 25,0 s exatos sem
cortar uma frase, por duas escolhas:

- na Cena 3 os três rótulos **ficam** na tela depois de entrar, então a leitura é
  acumulada (o rótulo 1 tem 5,2 s, não 1,4 s);
- a Cena 4 é um **pôster composto** — texto principal, assinatura e CTA coexistem —, que é
  exatamente como o roteiro os descreve, e não três leituras seguidas.

Com isso toda janela de leitura ficou entre **99% e 129%** do mínimo confortável:

| Linha | Janela | Mínimo |
| --- | --- | --- |
| "Você tem um site." | 2,20 s | 1,70 |
| "Mas todo mundo vê a mesma versão." | 2,58 s | 2,60 |
| "E se você pudesse transformar isso?" | 2,43 s | 2,30 |
| "Uma página. Possibilidades infinitas." | 1,68 s | 1,70 |
| "Uma oferta diferente." | 5,23 s | 1,40 |
| "Um público diferente." | 3,63 s | 1,40 |
| "Uma nova forma de vender." | 2,23 s | 2,00 |
| "Descubra qual funciona melhor." | 1,70 s | 1,70 |
| "Seu site pode ser muito mais…" | 3,82 s | 3,80 |
| "Transforme seu site em um laboratório…" | 3,04 s | 2,90 |
| CTA | 2,92 s | 2,85 |

Duas linhas ficam 0,02 s abaixo do número redondo (99%); **um corte de ~28 s daria folga
real ao fechamento** e é uma mudança de uma linha, se o cliente quiser.

## O que foi medido e o que foi só olhado

**Medido** (`hyperframes check`, tudo passando, 0 erros):

- lint, runtime, layout e motion: 0 erros, 0 avisos;
- contraste: **28/28 textos passam WCAG AA** — o eyebrow da mock subiu de 2,26:1 para
  passar, e a ênfase roxa mudou de tom pelo mesmo motivo;
- craft: 0 avisos — piso de tipo, leitura por linha, trecho morto, frame 0 e linha final
  todos dentro;
- os picos de cada efeito sonoro foram medidos com `hyperframes audio --json` e cada clipe
  está posicionado para que o pico caia **um frame depois** da imagem que o causa.

**Olhado** (8 beat frames, 3 folhas de emenda, a folha de 360px e ~30 frames avulsos):
cada cena no início e no meio, os três cortes a −0,2/−0,1/0/+0,1/+0,2 s, e a leitura de
tudo em largura de telefone. As três emendas casam pixel a pixel (a grade de 4 em 5,80 s,
a grade 3×3 em 10,70 s, o ponto roxo em 20,10 s) e nenhum texto some de repente num corte.

**Ninguém ouviu nada.** O som foi medido, não escutado. Não há como escutar aqui.

**Não houve trilha musical.** Não existe sessão HeyGen nem modelo local de música neste
ambiente (`media-use resolve --doctor`), e o download de modelos está bloqueado pela rede.
A peça saiu com desenho de som (impacto, whooshes, riser, cliques, pop) usando a
biblioteca local, sincronizado às multiplicações — e foi construída para funcionar
**muda**, que é como o feed do Meta dá autoplay. Para somar a trilha depois: colocar o
arquivo em `assets/bgm/`, adicionar um `<audio>` no `index.html` com `data-volume` por
volta de 0,2 e realinhar os impactos de 9,58 / 10,18 / 20,18 s à batida.

## O plano mais fraco

**A Cena 3 entre 11,4 s e 13,7 s.** Os três cards já estão na pilha à esquerda e a metade
direita do frame fica vazia por ~1,7 s, até o primeiro rótulo chegar. Lê como coluna
deliberada porque o título também é alinhado à esquerda, mas é o único trecho do filme em
que metade do quadro não está trabalhando. Com mais tempo eu centralizaria os três cards
durante a frase "Uma página. Possibilidades infinitas." e os deslizaria para a esquerda no
momento em que o primeiro rótulo entra — um movimento a mais, com causa.

Segundo mais fraco: o frame de colapso em ~6,1 s, em que as páginas se sobrepõem no
caminho de volta. Dura 0,3 s e nenhum texto depende dele.

## Avisos mantidos de propósito

- **`composition_file_too_large`** em `magic.html` (357 linhas) e `power.html` (392). São
  9 e 12 instâncias da mesma página mock. Quebrar a cena em arquivos menores quebraria a
  coreografia: a linha do tempo de uma cena não alcança elementos de outro arquivo, e tanto
  a multiplicação quanto a convergência movem todas as páginas juntas. Os arquivos são
  gerados por script (`gen-scenes.mjs`, no scratchpad da sessão), então a repetição é
  derivada, não escrita à mão.
- **`data-layout-ignore` no `.page-body`.** O texto dentro da página mock fica abaixo do
  piso de 28px nas escalas de grade, e isso é intencional: naquele momento quem carrega a
  mensagem legível é o rótulo de 42px ao lado, não o glifo dentro do card. O espectador
  precisa perceber que o texto **mudou**, não lê-lo.

## O que o próximo turno precisa saber

- As cenas 2, 3 e 4 são **geradas** por `gen-scenes.mjs`; `hook.html` é escrito à mão.
  Editar as cenas geradas direto nos arquivos é válido (é o que o Studio faz), mas rodar o
  gerador de novo sobrescreve. Em caso de dúvida, edite os `.html` e aposente o gerador.
- A geometria toda deriva de duas constantes no gerador: `HERO = [540, 755]` e
  `HERO_EFF = 1.1`. Mudar o enquadramento é mudar essas duas e o `y` correspondente em
  `hook.html` (linhas com `scale: 1.8333`).
- Todo `fromTo` que não é o mais cedo do seu alvo carrega `immediateRender: false`. Sem
  isso o GSAP aplica os valores iniciais do último `fromTo` escrito no estado de repouso e
  o filme quebra em qualquer seek anterior ao primeiro tween.
