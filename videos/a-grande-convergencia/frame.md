---
name: A Grande Convergência
canvas: 1920x1080
colors:
  purple: "#7c3aed" # inteligência algorítmica, otimização, estados ativos, decisões da IA
  cyan: "#06b6d4" # dados, métricas, sinais de sistema, confirmações
  dark: "#2b2b2b" # ambiente espacial, profundidade, contraste
  light: "#ffffff" # landing pages, tipografia, superfícies de alta legibilidade
  sand: "#d8c0a7" # humanidade, materialidade, exceção, imperfeição, diferenciação
derived:
  void: "#1b1a1f" # Dark levado à profundidade, tingido 2% para o Purple — o vazio atrás da cidade
  void_deep: "#121216" # o fundo mais distante do corredor; só aparece entre planos
  page_ink: "#2b2b2b" # tipografia das landing pages = Dark sobre Light
  page_muted: "#8b8b90" # texto secundário dentro das páginas
  page_line: "#e4e4e7" # hairlines e divisores dentro das páginas
  purple_dim: "#5b2bb0" # Purple recuado em profundidade (páginas de midground)
fonts:
  page: "Inter" # 400 / 700 / 900 — a voz das landing pages
  system: "JetBrains Mono" # 400 / 700 — a voz do sistema (métricas, contadores, badges)
  human: "EB Garamond" # 400 / 700 — a voz da exceção (só a partir de 41s)
radius: 10px
---

# Direção de arte — A Grande Convergência

## O argumento tipográfico

Três registros, três vozes. Não é hierarquia — é uma conversa.

**Inter** é a voz das landing pages. A escolha é deliberada e é a própria piada:
Inter é a fonte-monocultura de toda landing page SaaS. Usá-la para o universo
algorítmico não é preguiça de direção — é o conteúdo se dizendo pela forma. Peso
400 vs 900, contraste extremo, tracking −0.035em nos display.

**JetBrains Mono** é a voz do sistema. Tudo que a IA fala aparece em mono:
`+0,7%`, `variante vencedora`, `Confiança estatística: 99,4%`, `06:00:00`,
`1.847.392 variantes testadas`, `anomalia detectada`. Mono contra sans cruza a
fronteira que `typography.md` exige (nunca dois sans) e separa quem fala.

**EB Garamond** é a voz da exceção. Aparece **uma única vez**, aos 41s, junto com
o Sand. Serifa humanista contra grotesca neo-humanista: contraste em múltiplos
eixos (serifa/sans, caligráfica/geométrica, calorosa/neutra). Oito segundos de
tela em cinquenta e quatro — é uma nota, não uma família.

Regra: `tabular-nums` em toda métrica e contador. Sem `<br>` em corpo de texto.

## O sistema de cor como narrativa

O universo é **Dark/Light**. Purple e Cyan são *sinais*, nunca ambiente:

- **Purple** só acende quando uma decisão acontece — a onda que atravessa a
  página e reorganiza sua estrutura, o CTA vencedor, o contorno que o sistema
  tenta desenhar ao redor da anomalia. Purple é o verbo *otimizar*.
- **Cyan** só acende quando o sistema *mede* — a métrica que sobe, o selo de
  vitória, o badge de confiança, o aviso de anomalia. Cyan é o verbo *confirmar*.
- Nunca os dois em gradiente. Nunca full-screen. Um glow radial localizado, um
  hairline, um preenchimento sólido de botão. Se Purple e Cyan aparecem juntos no
  mesmo frame, é porque uma decisão e sua confirmação aconteceram juntas.

**Sand é proibido antes de 41s.** É a única regra de cor sem exceção neste filme.
Quando ele entra, entra sem brilho, sem pulso, sem entrada animada: simplesmente
está lá. A temperatura da cena sobe junto (a iluminação passa de fria para
levemente quente) — a diferença deve ser percebida antes de ser explicada.

## Textura

Universo algorítmico: limpo, praticamente sem textura. Nenhum grain, nenhuma
irregularidade, hairlines de 1px exatos, espaçamentos em múltiplos de 8.

Universo humano (a partir de 41s): grain sutilíssimo, larguras que não fecham na
grade, um filete editorial que atravessa fora do alinhamento, o botão fora de
onde o algoritmo o colocaria. **Menos matemática, nunca menos cuidada.**

## Profundidade

Quatro planos, sempre:

1. **Void** (`#1b1a1f` → `#121216`) — o espaço entre as páginas. Nunca preto puro.
2. **Midground** — dezenas de páginas simplificadas, `blur` progressivo por
   profundidade, opacidade caindo com a distância.
3. **Hero layer** — as páginas específicas que a câmera lê. Sempre nítidas, sempre
   quase frontais no momento da leitura.
4. **Foreground** — interfaces ocasionais atravessando o quadro, produzindo
   oclusão e parallax. Nunca carregam informação a ler.

`perspective` fica na `.stage` (estática, nunca animada); a `.world` é
`preserve-3d` e limpa — nada de `filter`, `opacity`, `overflow` ou `mask` nela.
Blur de viagem na `.stage`; DoF nas folhas.

## A regra da câmera

A câmera é o termômetro da convergência.

| Fase | Simetria | Comportamento |
| --- | --- | --- |
| 0–12s | assimétrica, ligeiramente desalinhada | macro, push-in curto, dolly com sobra de enquadramento |
| 12–24s | centralizando | dolly frontal, crane-out contínuo, eixos se organizando |
| 24–36s | quase autoritária | travada, frontal, perfeitamente central |
| 36–41s | absoluta | pull-back lentíssimo, tudo para |
| 41–54s | quebrada de novo | enquadramento editorial deslocado do centro |

Momentos claros de repouso são obrigatórios: 6,8s · 23,2s · 40,0s · 45,0s ·
50,0s–54,0s. Sem movimento constante.

## Movimento

Toda transformação parece **causada por otimização**, nunca por entrada estética.
O motivo recorrente é `A/B → análise → vencedor → substituição`: uma variante
aparece por frações de segundo, métricas oscilam, uma vence, a página assume a
nova configuração.

Nas primeiras otimizações o movimento é suave e legível (≈0,5s por decisão).
Conforme a sequência avança, o intervalo entre decisões encolhe até a
transformação acontecer em escala massiva (≈0,06s). Easing com aceleração e
assentamento natural — `power4.out` em pousos de câmera, `power2.inOut` em
reposicionamentos, `power3.out` em substituições de componente. Objetos grandes
têm peso; microcomponentes reagem rápido. **Nunca bounce cartunesco.**

## Escala tipográfica (vídeo, não web)

| Papel | Tamanho |
| --- | --- |
| Headline de filme (end card) | 92px / 900 / −0.035em |
| Headline de landing page hero | 64–76px / 900 |
| Headline de página em midground | 30–44px / 700 |
| CTA hero | 30px / 700, caixa alta, +0.06em |
| Corpo de página | 22–26px / 400 |
| Voz do sistema (mono) | 20–26px / 400 |
| Micro-label do sistema (mono) | 16–18px / 400, +0.14em, caixa alta |

Micro-labels abaixo de 20px são permitidos **apenas** na voz mono do sistema, e
apenas porque são textura de interface, não leitura obrigatória.
