---
version: alpha
name: KRO AI — O site que aprende · Frame (video / frame layer)
description: >
  Sistema de frame para o filme publicitário vertical do KRO AI. Base derivada do preset
  blue-professional (disciplina de card tintado sem sombra, pill chrome, ladder tipográfico
  Sora), INVERTIDA para a hierarquia cromática que o brief manda: charcoal como base escura
  principal, branco como cor tipográfica principal, purple como cor de marca e transformação,
  cyan como cor de dado/atividade/feedback, bege escasso para calor. A unidade é o frame
  9:16 (1080x1920). Átomos são sagrados; composição é livre.
unit: o frame — 1080x1920 (9:16) primário, destino Meta Ads / Reels / Stories
principle: charcoal é o chão · branco fala · purple transforma · cyan mede · bege aquece

colors:
  # A base do filme — pintada pelo assembler no #root do index.
  canvas: "#2B2B2B"
  # Chão atmosférico: charcoal com queda radial. Nunca preto puro.
  ground: "#2B2B2B"
  ground-deep: "#1E1E1E"
  ground-lift: "#343434"
  # Tipografia
  text: "#FFFFFF"
  text-muted: "rgba(255,255,255,0.62)"
  text-light: "rgba(255,255,255,0.38)"
  text-ghost: "rgba(255,255,255,0.14)"
  # Marca e transformação
  brand: "#7C3AED"
  brand-soft: "rgba(124,58,237,0.16)"
  brand-edge: "rgba(124,58,237,0.42)"
  # Dado, atividade, interação, feedback
  primary: "#06B6D4"
  accent-light: "rgba(6,182,212,0.08)"
  accent-medium: "rgba(6,182,212,0.16)"
  border: "rgba(6,182,212,0.22)"
  card-bg: "rgba(255,255,255,0.04)"
  card-border: "rgba(255,255,255,0.10)"
  # Calor — escasso por decreto do brief
  sand: "#D8C0A7"
  sand-soft: "rgba(216,192,167,0.14)"
  # Superfície de UI (a landing page mock é mais clara que o chão: ela é um objeto no espaço)
  surface: "#F4F2EE"
  surface-ink: "#2B2B2B"
  surface-muted: "rgba(43,43,43,0.55)"
  surface-line: "rgba(43,43,43,0.10)"
  positive: "#06B6D4"
  negative: "rgba(255,255,255,0.30)"

radii:
  pill: "100px"
  card-lg: "20px"
  card-md: "16px"
  card-sm: "12px"
  bar: "6px"
  circle: "50%"

typography:
  # Ramp em px reais @1080x1920. Sora = display e chrome; Manrope = corpo e UI da mock.
  # — tipografia hero (nivel 3 de profundidade) —
  hero:        { fontFamily: "Sora", px: 100, weight: 700, lineHeight: 1.04, tracking: "-0.03em", color: "text" }
  display:     { fontFamily: "Sora", px: 82,  weight: 700, lineHeight: 1.09, tracking: "-0.025em", color: "text" }
  statement:   { fontFamily: "Sora", px: 66,  weight: 600, lineHeight: 1.16, tracking: "-0.02em", color: "text" }
  statement-sm:{ fontFamily: "Sora", px: 56,  weight: 600, lineHeight: 1.2,  tracking: "-0.018em", color: "text" }
  # — chrome de narrativa —
  eyebrow:     { fontFamily: "Sora", px: 22, weight: 600, tracking: "0.22em", upper: true, color: "primary" }
  lead:        { fontFamily: "Manrope", px: 34, weight: 500, lineHeight: 1.45, color: "text-muted" }
  # — UI da mock e do sistema (nivel 2) —
  ui-title:    { fontFamily: "Sora", px: 30, weight: 600, lineHeight: 1.25, color: "surface-ink" }
  ui-body:     { fontFamily: "Manrope", px: 17, weight: 400, lineHeight: 1.55, color: "surface-muted" }
  ui-label:    { fontFamily: "Manrope", px: 15, weight: 600, tracking: "0.12em", upper: true, color: "text-light" }
  ui-cta:      { fontFamily: "Sora", px: 18, weight: 600, color: "surface" }
  # — dados —
  metric-value:{ fontFamily: "Sora", px: 54, weight: 700, lineHeight: 1.0, color: "primary" }
  metric-label:{ fontFamily: "Manrope", px: 19, weight: 600, tracking: "0.14em", upper: true, color: "text-light" }
  tag:         { fontFamily: "Manrope", px: 16, weight: 600, tracking: "0.06em", color: "primary" }

emphasis:
  rule: >
    Destaque cromatico SOMENTE nas palavras estrategicas autorizadas pelo brief:
    seis meses · problema · mesma coisa · KRO AI · laboratorio de crescimento · visitantes ·
    agir · resultado · opiniao · achismo · clientes · cada visita. Nunca aleatorio.
  brand-words: "KRO AI, laboratorio de crescimento, clientes — purple #7C3AED"
  data-words: "visitantes, agir, resultado, cada visita — cyan #06B6D4"
  tension-words: "seis meses, problema, mesma coisa — sand #D8C0A7"
  removed-words: "opiniao, achismo — text-light, recuando (sao o que sai do sistema)"
  mechanics: >
    O destaque entra DEPOIS da palavra ja estar legivel em branco (atraso 180-260ms),
    como cor assentando sobre texto estavel. Nunca um glow, nunca um fundo chapado.

spacing:
  pad-x: "88px"
  safe-top: "260px"
  safe-bottom: "420px"
  safe-right: "160px"
  gap-cards: "20px"
  accent-line: "72px x 4px"

depth:
  description: "Tres niveis obrigatorios + foreground ocasional so em transicao."
  l1-atmosphere: "Chao charcoal + queda radial + luz direcional + grain. Parallax mais lento (0.25x)."
  l2-system: "Interfaces, cards, indicadores, variantes, fluxos. Parallax 0.6x. Vive em perspective 3D."
  l3-typography: "Tipografia hero. Sempre no plano da camera, sem perspectiva, sem blur. Parallax 1.0x."
  foreground: "So atravessa a camera durante transicao. Nunca sobre texto que precisa ser lido."

texture:
  grain: "overlay SVG fractalNoise, opacity <= 0.035, estatico (determinista, nunca animado por random)"
  shadow: "0 30px 80px rgba(0,0,0,0.45) — suave, direcional, so em objetos de UI que flutuam"
  lighting: "gradiente radial direcional vindo de cima-esquerda; nunca uma luz chapada"
  reflection: "faixa linear 6-10% branco no topo de superficies de UI, nunca em texto"
  glow: "SOMENTE em elemento ativo no momento (sinal, variante em foco). Raio curto, opacidade <= 0.5"
  forbidden: "glassmorphism generalizado, neon, glow em tudo, blur pesado, particulas"

components:
  landing-mock:
    backgroundColor: "{colors.surface}"
    rounded: "{radii.card-lg}"
    shadow: "{texture.shadow}"
    description: >
      O objeto cinematografico principal: uma landing page abstrata clara flutuando no charcoal.
      Chrome de browser reduzido a uma barra de 3 pontos. Conteudo = headline placeholder +
      duas linhas de corpo + um botao. NUNCA um screenshot, NUNCA um mockup de browser realista.
  variant-card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.surface-line}"
    rounded: "{radii.card-md}"
    description: >
      A mesma landing-mock reduzida, carregando UMA variante de headline. Texto de variante e
      placeholder tipografico abstrato (barras/lorem curto), nunca claim comercial do produto.
  signal-dot:
    backgroundColor: "{colors.primary}"
    size: "10-16px"
    description: >
      O visitante. Um ponto cyan com trilha curta, ou um cursor. NUNCA avatar humano,
      nunca icone de pessoa, nunca particula aleatoria.
  metric-readout:
    backgroundColor: "{colors.card-bg}"
    border: "1px solid {colors.card-border}"
    rounded: "{radii.card-sm}"
    typography: "{typography.metric-value} + {typography.metric-label}"
    description: "CPC / Leads / Vendas. Numeros sao demonstrativos, jamais promessa de resultado."
  ad-card:
    backgroundColor: "{colors.ground-lift}"
    border: "1px solid {colors.card-border}"
    rounded: "{radii.card-md}"
    description: "O criativo de anuncio. Bloco de imagem + duas barras de copy. Troca de versao, nao de identidade."
  potential-bar:
    backgroundColor: "{colors.accent-light}"
    fill: "{colors.primary}"
    rounded: "{radii.bar}"
    description: "Barra de potencial observado. display:block para a largura resolver."
  brand-lockup:
    asset: "assets/kro-logo-light.png"
    description: "Lockup oficial kro ai_ em creme. O _ final faz parte do logo."

reading:
  rate: "2.5-3.0 palavras/segundo"
  rule: >
    Nenhuma frase desaparece antes de poder ser lida uma vez, sem pressa. Depois que a frase
    esta completa ela FICA PARADA antes da transicao. Construcao progressiva e permitida;
    aparicao palavra-por-palavra NAO e o mecanismo padrao.
  camera-rule: >
    Com texto na tela para ler, a camera praticamente para. Movimento expressivo so antes do
    texto, na entrada, entre mensagens e na transicao.

motion:
  micro: "150-400ms"
  cinematic: "500-900ms"
  mass: "Interfaces grandes se movem devagar; cards pequenos se movem rapido. Sem bounce exagerado."
  properties: "transform + opacity primeiro. Blur com moderacao. Perspective CSS no lugar de WebGL."
---

# KRO AI — O site que aprende · Frame

## O que este sistema e

Um filme publicitario vertical que acontece **dentro de um ambiente digital tridimensional**,
nao uma sequencia de slides. A landing page e o objeto cinematografico: a camera se aproxima
dela, atravessa seus elementos, orbita discretamente, acompanha variantes, desliza lateralmente
entre versoes e recua para revelar o sistema inteiro.

A inteligencia do produto e representada por **comportamento, transformacao, comparacao e
feedback** — nunca por iconografia de IA.

## Hierarquia cromatica (normativa)

| Cor | Papel | Onde |
| --- | --- | --- |
| `#2B2B2B` charcoal | base escura principal | o chao de todo frame |
| `#FFFFFF` branco | cor tipografica principal | toda tipografia hero |
| `#7C3AED` purple | marca e transformacao | KRO AI, o momento da virada, o end card |
| `#06B6D4` cyan | dado, atividade, interacao, feedback | sinais de visitante, metricas, potencial |
| `#D8C0A7` bege | calor e sofisticacao, **escasso** | tensao do problema, detalhe de respiro |

Purple e cyan podem se encontrar em gradiente ou iluminacao **ocasionalmente**. O filme nunca
vira um gradiente roxo/azul generico de AI.

## Escala 9:16 (1080x1920)

Margem lateral de 88px. Safe area: nada critico nos 260px do topo, 420px da base, 160px da
direita — a interface de Reels/Stories cobre essas regioes.

A tipografia hero ocupa a **faixa central vertical** (y 520-1320), onde o polegar nao cobre e
a UI da plataforma nao entra. O sistema (nivel 2) pode sangrar para fora da safe area; o texto
nunca.

## Linguagem de movimento (o que cada coisa significa)

| Elemento | Movimento |
| --- | --- |
| Campanhas | elementos sendo ajustados |
| Criativos | multiplicacao e substituicao |
| Dados | pulsos, counters, linhas de atividade |
| Site estatico | **ausencia deliberada de movimento** |
| KRO AI | expansao organizada |
| Variantes | duplicacao / morph da mesma mensagem |
| Visitantes | sinais abstratos entrando no sistema |
| Avaliacao | respostas se acumulando |
| Aprendizado | variantes perdedoras perdem prioridade; promissoras emergem |

## Proibido

Cerebro digital · robos · hologramas · particulas aleatorias como IA · grids futuristas
genericos · excesso de neon · glow purple/cyan em todos os elementos · glassmorphism
indiscriminado · stock footage humano · avatares humanos · sequencia de browser mockups
estaticos · typewriter como linguagem principal · a mesma entrada em todas as frases · texto
em movimento enquanto precisa ser lido · camera em movimento constante · estetica de template
de Canva / slides / "generic AI SaaS ad".

## Limite de promessa

O KRO **descobre** quais mensagens tem mais potencial. Nao inventar funcionalidades,
percentuais, uplift ou metricas. Numeros em tela sao demonstrativos e precisam se ler como
tela de produto, nunca como promessa.

## Fontes (self-hosted, deterministicas)

```html
<style>
@font-face{font-family:"Manrope";font-weight:400;font-style:normal;font-display:block;src:url("assets/fonts/Manrope-400.woff2") format("woff2");}
@font-face{font-family:"Manrope";font-weight:500;font-style:normal;font-display:block;src:url("assets/fonts/Manrope-500.woff2") format("woff2");}
@font-face{font-family:"Manrope";font-weight:600;font-style:normal;font-display:block;src:url("assets/fonts/Manrope-600.woff2") format("woff2");}
@font-face{font-family:"Manrope";font-weight:700;font-style:normal;font-display:block;src:url("assets/fonts/Manrope-700.woff2") format("woff2");}
@font-face{font-family:"Manrope";font-weight:800;font-style:normal;font-display:block;src:url("assets/fonts/Manrope-800.woff2") format("woff2");}
@font-face{font-family:"Sora";font-weight:400;font-style:normal;font-display:block;src:url("assets/fonts/Sora-400.woff2") format("woff2");}
@font-face{font-family:"Sora";font-weight:600;font-style:normal;font-display:block;src:url("assets/fonts/Sora-600.woff2") format("woff2");}
@font-face{font-family:"Sora";font-weight:700;font-style:normal;font-display:block;src:url("assets/fonts/Sora-700.woff2") format("woff2");}
@font-face{font-family:"Sora";font-weight:800;font-style:normal;font-display:block;src:url("assets/fonts/Sora-800.woff2") format("woff2");}
</style>
```
