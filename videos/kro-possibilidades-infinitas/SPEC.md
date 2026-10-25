# SPEC — KRO AI · "Uma página. Possibilidades infinitas."

```text
GOAL:   o espectador entende que a estrutura do site dele fica igual enquanto a mensagem
        pode virar infinitas versões, e clica para descobrir o KRO AI.
OUTPUT: HyperFrames, 1080 x 1350, 30 fps
TIME:   25,0 s x 30 = 750 frames. Sem música: a batida é o desenho de som
        (impactos medidos em 9,58 / 10,18 / 20,18 s).
```

## LOOK

| Papel                      | Valor                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------- |
| chão                       | `#2B2B2B` com queda radial para `#1A1A1A`, luz direcional em 32%/18%, vinheta 30% no canto |
| grain                      | SVG `fractalNoise`, baseFrequency 0.82, opacity 0.030, **estático**                     |
| tinta                      | `#FFFFFF` · secundária `rgba(255,255,255,0.68)`                                          |
| marca / transformação      | `#7C3AED` — botão da mock, onda de energia, preenchimento do logo, pill do CTA            |
| ênfase tipográfica no escuro | `#A78BFA` — tom claro da mesma família. O `#7C3AED` como texto sobre grafite dá 2,3:1, abaixo do mínimo legível; nos objetos ele segue exato |
| sinal / dado               | `#06B6D4` — ponto de visitante, sublinhado de "idêntico", `funciona melhor`              |
| areia (escassa)            | `#D8C0A7` — um único traço de 72x4px no end card                                         |
| superfície da página mock  | `#F4F2EE`, raio 20px, sombra `0 30px 80px rgba(0,0,0,0.45)`, reflexo linear de 2px no topo |
| display                    | Sora 700, tracking −0.025em, line-height 1.12                                            |

Tipografia do filme, em px reais @1080x1350:

| Papel          | px | peso | onde                          |
| -------------- | -- | ---- | ----------------------------- |
| `hero`         | 76 | 700  | L1                            |
| `statement-lg` | 68 | 700  | L4                            |
| `statement`    | 64 | 700  | L2, L3, L5                    |
| `endline`      | 58 | 700  | texto principal do end card   |
| `variant`      | 42 | 600  | os três rótulos da Cena 3     |
| `tagline`      | 32 | 500  | assinatura (Manrope)          |
| `cta`          | 30 | 600  | pill do CTA                   |

**Nada que o espectador precise ler fica abaixo de 30px** — verificado no sheet de 360px.
O texto *dentro* da página mock (eyebrow 16px, headline 40px, botão 19px na escala do
objeto) é **textura, não leitura**: carrega `data-layout-ignore`, porque quem carrega a
mensagem legível naquele momento é o rótulo de 42px ao lado, não o glifo dentro do card.

Ênfase cromática em exatamente 4 trechos no filme inteiro: `transformar` (roxo claro),
`Possibilidades infinitas` (roxo claro), `funciona melhor` (ciano), `muito mais` (roxo
claro). A cor assenta 200–430ms **depois** da palavra já estar legível em branco.

## Enquadramento 4:5

Margem lateral 90px. Action-safe 90%: y 68–1283. Title-safe 80%: x 108–972, y 135–1215.
Toda tipografia vive no title-safe; a camada de sistema (páginas, cards) pode sangrar.
Banda de texto narrativo: x 90–990, topo y 215.

## OBJECTS

- **`page`** — a landing page do *espectador*. 800×600 intrínsecos; **1,10× (880×660)
  centrada em (540, 755)** quando é a única coisa na tela, 0,60× na grade da Cena 1,
  0,46× na primeira multiplicação, 0,30× na grade 3×3, 0,40× como card da Cena 3.
  Chrome de 3 pontos, eyebrow, headline de 2 linhas, 2 barras de corpo, botão pill roxo
  de 230×60. **A geometria dela não muda uma única vez no filme** — só os glifos dentro.
- **`visitor`** — ponto ciano de 26px (coordenadas da página) com glow de raio curto,
  pousado sobre o botão. É a pessoa acessando. Nunca avatar, nunca ícone de gente.
- **`wave`** — faixa de 170px, gradiente `transparent → rgba(124,58,237,0.26) →
  rgba(167,139,250,0.46) → transparent`, borda de ataque de 2px em `#C4B5FD`. Sobe do
  logo (y 1253) e sai por cima da página (y 373).
- **`mark`** — `assets/kro-logo-light.png`. 280px na Cena 2 (rodapé), 320px no end card
  (29,6% do frame). Nasce com um preenchimento roxo subindo por dentro via `clip-path`.
- **`shard`** — 12 lascas de 10–16px (roxo e ciano) com **posições fixas em array**,
  vivas só nos 0,62s da convergência.

## MOTION

| Papel                    | Curva           | Duração                      |
| ------------------------ | --------------- | ---------------------------- |
| chegada de texto         | `expo.out`      | 0,13s/palavra, stagger 0,04–0,06 |
| saída de texto           | `power2.in`     | 0,18–0,22s, blur 0 → 7–9px   |
| movimento de câmera      | `power2.inOut`  | 0,40–0,90s                   |
| avanço / recuo de escala | `power3.out`    | 0,42–0,62s                   |
| convergência             | `power3.in`     | 0,62s                        |
| nascimento do logo       | `expo.out`      | 0,48s                        |
| pill do CTA              | `back.out(1.3)` | 0,34s                        |

Um movimento herói por plano. **Com texto na tela para ler, a câmera para.** Motion blur
de render ligado no root (`data-motion-blur="on"`).

Transições, cada uma com causa na tela (5 tipos):
1. **Recuo revelador** (2,25s) — a pergunta "quem vê isso?" afasta a câmera.
2. **Colapso de volta** (5,80s) — "E se você pudesse transformar isso?" traz tudo a uma página.
3. **Inundação de cor** (8,92s) — o logo emite a onda roxa que atravessa a página.
4. **Carregar adiante** (10,75s) — 3 das 9 versões viram cards; as outras recuam com blur.
5. **O objeto vira o mundo** (19,48s) — 12 páginas colapsam num ponto roxo, e o logo nasce dele.

## SHOTS

Cenas: `hook` 0,00–5,80 · `magic` 5,80–10,70 · `power` 10,70–20,10 · `reveal` 20,10–25,00.

| #  | Tempo (s)   | Movimento herói                                    | O que se lê (janela / mínimo)                       | Som |
| -- | ----------- | -------------------------------------------------- | --------------------------------------------------- | --- |
| 1  | 0,00–2,20   | a página assenta 1,035 → 1,000; o visitante pousa no botão | **"Você tem um site."** já no frame 0 → 2,20 (2,20s / 1,70) | impacto grave |
| 2  | 2,25–5,80   | recuo 1,10 → 0,60; 4 páginas idênticas, 4 pontos; sublinhado ciano na mesma extensão nas quatro | **"Mas todo mundo vê a mesma versão."** 3,02–5,60 (2,58s / 2,60) | whoosh curto |
| 3  | 5,80–8,80   | colapso 0,60 → 1,10; a página herdada entrega a caixa à nova no mesmo pixel | **"E se você pudesse transformar isso?"** 6,37–8,80 (2,43s / 2,30) | whoosh cinematográfico |
| 4  | 8,50–9,50   | o logo nasce com o roxo subindo; a onda sobe e atravessa a página; headline e botão trocam de glifo | —                                                   | riser (pico em 9,58) |
| 5  | 9,55–10,60  | 1 → 4 → 9 versões; caixa, sombra e botão idênticos em todas | —                                                 | 2 impactos |
| 6  | 10,75–13,30 | 6 recuam com blur 14px a 5,5% de opacidade; 3 viram pilha vertical | **"Uma página. Possibilidades infinitas."** 11,62–13,30 (1,68s / 1,70) | — |
| 7  | 13,30–17,00 | destaque alternado dos 3 cards **sem mover a câmera** (brilho + 4% de escala) | **"Uma oferta diferente."** 13,72→ · **"Um público diferente."** 15,32→ · **"Uma nova forma de vender."** 16,72→ (todos até 18,95) | 3 cliques |
| 8  | 17,00–19,05 | os 3 voltam a brilho pleno; nada mais se mexe      | **"Descubra qual funciona melhor."** 17,35–19,05 (1,70s / 1,70) | — |
| 9  | 19,05–20,10 | 3 → 12 páginas; convergência num ponto roxo com 12 lascas no mesmo vetor | —                                     | whoosh + riser |
| 10 | 20,15–25,00 | o logo nasce do ponto; o end card monta            | **texto principal** 21,18–25,00 (3,82s / 3,80) · **assinatura** 21,96–25,00 (3,04s / 2,90) · **CTA** 22,08–25,00 (2,92s / 2,85) | impacto + pop |

Pôster final imóvel de 22,42s a 25,00s (2,58s).

## BANNED

Cérebro digital · robôs · hologramas · partículas como decoração ambiente (as 12 lascas
existem só nos 0,62s da convergência, com caminho causado) · grids futuristas · neon ·
glow em tudo (só raio curto no ponto do visitante e na borda da onda) · glassmorphism ·
avatares humanos · stock footage · typewriter como linguagem · a mesma entrada em todas
as frases · texto em movimento enquanto é lido · câmera em movimento constante · título
que continua escorregando depois de assentar · logo ancorado num canto · três cards em
fileira horizontal · KPI grid · dashboard inventado · gráfico · métrica · percentual ·
qualquer tela técnica (proibição explícita do roteiro) · gradiente roxo/azul genérico de
SaaS de IA · frame 0 preto ou com logo.

Roxo e ciano são obrigatórios por identidade de marca, não um default: têm papel
semântico fixo (roxo transforma, ciano mede) e nunca viram gradiente de fundo.

## QA

| Frame (s) | O que precisa aparecer |
| --------- | ---------------------- |
| 0,0       | A frase **e** a página já legíveis — é a miniatura do anúncio no feed. |
| 1,2       | "Você tem um site." imóvel; o ponto ciano sobre o botão. |
| 5,0       | 4 páginas visivelmente **idênticas**, cada uma com seu ponto, e o sublinhado ciano cobrindo exatamente a mesma extensão nas quatro. |
| 5,80      | Emenda hook→magic: a grade de 4 é pixel a pixel a mesma dos dois lados, e a frase já saiu com blur antes do corte. |
| 7,2       | Uma página só, com `transformar` em roxo claro. |
| 9,3       | A onda no meio da página; acima da borda o texto antigo, abaixo o novo. Nunca as duas versões meio a meio. |
| 10,4      | 9 versões: mesma caixa, mesma sombra, mesmo botão, headlines diferentes. |
| 10,70     | Emenda magic→power: grade 3×3 idêntica dos dois lados; o logo já saiu antes do corte. |
| 14,6      | Card 1 em destaque, os outros 2 a 38%; "Uma oferta diferente." legível a 42px. |
| 18,0      | Os 3 rótulos simultâneos + "Descubra qual funciona melhor.". |
| 19,9      | 12 páginas a caminho do centro, com as lascas no mesmo vetor. |
| 20,10     | Emenda power→reveal: o mesmo ponto roxo de 22px dos dois lados. |
| 24,5      | End card completo e imóvel: texto principal, traço de areia, logo, assinatura, pill do CTA. |
| Sheet 360px | Toda linha do filme legível; o texto dentro da mock não precisa ser. |
