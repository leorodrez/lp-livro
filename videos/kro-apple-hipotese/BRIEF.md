---
workflow: product-launch-video
flow: automation
storyboard: no
mode: autonomous
message: "Excelência não é o mesmo que otimização: até a melhor página do mundo ainda é uma hipótese até o comportamento real responder"
destination: youtube
aspect: 1920x1080
language: pt-BR
audience: "Fundadores, executivos de marketing, CROs, heads de growth, designers, copywriters, estrategistas digitais e empresas com tráfego relevante"
length: 103s
angle: "experimento intelectual — pegar uma referência de excelência (apple.com/br) e demonstrar que mesmo ela é uma hipótese testável"
narration: no
music: none
---

## Intent

Peça premium, cinematográfica e intelectualmente provocadora. Reconstruímos
visualmente o site atual da Apple Brasil e o usamos como "máquina de testes"
para demonstrar a proposta do KRO AI.

A tese inverte uma objeção natural: *"por que usar uma ferramenta de otimização
em um dos melhores sites do mundo?"* — porque o KRO AI não existe para consertar
sites ruins, e sim para descobrir se páginas excelentes ainda podem performar
melhor.

O conceito criativo é **"E se colocássemos uma página excelente contra ela
mesma?"**. A página começa intocável. Surge a pergunta "o que você mudaria
aqui?". A resposta é "talvez nada". E então: "mas essa também é uma hipótese" —
e o mundo muda: a interface passa a existir dentro de uma máquina visual de
experimentação.

Metáfora central: a Apple cria uma página excelente; o KRO transforma essa
excelência em um sistema que continua aprendendo.

O espectador deve terminar pensando: *"se até uma página excelente pode ser
tratada como hipótese, provavelmente estamos deixando dinheiro na mesa ao
assumir que a nossa já está otimizada."*

Tratamento: produção audiovisual premium, não webpage animada. Cada movimento
de câmera, transição e evento de iluminação precisa ter propósito narrativo ou
compositivo. Direção de arte, hierarquia, ritmo e contenção acima da quantidade
de efeitos.

## Assets

- capture/screenshots/apple-site-prints1..7.png — os 7 prints reais de
  apple.com/br, tirados e fornecidos manualmente pelo usuário depois que a
  captura automática foi negada (commit `af7d753`). Fonte visual de verdade:
  hero do evento, Mac mini, Mac Studio, iPhone, MacBook Air, iPad air,
  MacBook Neo, Apple Watch Series 11, AirPods Pro 3, rodapé.
- capture/assets/*.png — recortes de produto extraídos desses prints com ffmpeg.
- assets/kro-lockup.png — logo KRO AI aparado, para o end card.
- assets/fonts/ — Inter 400/500/600/700 e JetBrains Mono 400/500, self-hosted
  (a máquina só tinha DejaVu/Liberation, nenhuma das duas serve para a
  precisão tipográfica que a peça exige).

## Customizations

- **Duas identidades visuais sem se confundirem.** Apple: minimalismo editorial,
  branco/preto/cinzas neutros, produto como protagonista, enorme espaço negativo,
  tipografia precisa. KRO: inteligência invisível, sistema, experimentação,
  comparação, aprendizado — representada por **comportamento, não decoração**.
- **Uma única cor de acento KRO**, introduzida só quando o KRO entra, e apenas
  para: seleção, teste, fluxo de usuários, métricas, variante vencedora,
  aprendizado.
- **Profundidade espacial (CSS perspective)** na fase de experimentação: a página
  original vira um plano no espaço 3D; componentes avançam no eixo Z; variantes
  aparecem lateralmente.
- **Sistema obrigatório de timing de texto**: cada mensagem é `entrada → HOLD →
  saída`, com o HOLD explicitamente codificado. Tempo de entrada nunca conta como
  tempo de leitura. 1–3 palavras: 1,5–2s de HOLD; 4–7 palavras: 2,5–3s; 8–12
  palavras: 3,5–4,5s; mais longas: 5–6s ou dividir em duas composições.
- **Durante o HOLD**: sem blur, sem queda de opacidade, sem movimento do texto,
  sem mudança de tracking, sem zoom rápido, sem elementos cruzando as letras,
  sem movimento forte de câmera.
- Máximo de 1 mensagem principal + 1 informação secundária simultâneas.
- Evolução ramificada das variantes (B → B1/B2/B3) com sensação quase biológica,
  porém construída inteiramente com interfaces.
- Payoff tipográfico: a palavra "substitui" se transforma em "potencializa".

## Notes

- **Duração final: 103,1s.** O briefing pediu 70–85s, mas as 16 mensagens que
  ele especifica, somadas aos HOLDs mínimos que ele próprio define, exigem
  ~58s só de texto (≈45s de HOLD + ≈13s de entradas/saídas) — antes de
  qualquer coreografia. A janela de 70–85s nunca foi compatível com as
  próprias regras de legibilidade do briefing, e ele resolve esse conflito
  explicitamente a favor da legibilidade. O storyboard shot-by-shot já somava
  94s; honrar os HOLDs à risca levou a 103s.
- **Captura**: a captura automática de apple.com/br foi negada pela política de
  egresso da organização (403 no CONNECT para `www.apple.com:443`) — não é
  falha transitória. Registro em `capture/CAPTURE-BLOCKED-NOTE.md`. Resolvido
  com os prints fornecidos manualmente pelo usuário.
- **Uso de marca**: a peça reconstrói a homepage da Apple com copy e fotografia
  de produto reais, a partir de material que o usuário forneceu deliberadamente
  para esse fim. É uma decisão dele, sinalizada antes da construção.
- **Projeto mudo** (`music: none`, sem `SCRIPT.md`): não há credencial HeyGen
  nesta máquina e as engines locais (Kokoro/MusicGen) estão sem dependências.
  Confirmado com o usuário. A direção de som da seção 10 do briefing fica
  documentada aqui para uma passada futura de áudio; o vídeo foi construído para
  se sustentar mudo — o storyboard é fortemente tipográfico.
- **Paleta KRO oficial**: Purple `#7C3AED`, Cyan `#06B6D4`, Charcoal `#2B2B2B`,
  Branco `#FFFFFF`, Areia `#D8C0A7`. Cyan carrega dado/número; roxo é a cor da
  marca. Logo `kro ai_` (o `_` é cursor de prompt). Domínio: `usekro.ai`.
- **Limites de alegação** (críticos):
  - Nunca representar o site da Apple como ruim, antiquado ou quebrado.
  - Nenhum antes/depois caricatural onde o KRO "conserta" design ruim.
  - Não sugerir que pequenas mudanças garantem aumento de conversão.
  - Não apresentar variante como vencedora antes dos dados.
  - Não inventar resultados reais de experimentos feitos na Apple.
  - "Centenas de milhões" só como **ilustração hipotética de escala**, nunca como
    dado financeiro da Apple. Preferir mostrar apenas "Pequenos ganhos. Escala
    gigantesca."
- **Evitar**: estética genérica de IA (cérebros digitais, robôs, hologramas,
  partículas gratuitas); screen recording; scroll contínuo da homepage;
  screenshots dentro de mockups de MacBook; dezenas de cards flutuantes;
  glassmorphism indiscriminado; animar tudo simultaneamente; parágrafos na tela;
  cortar textos antes de serem lidos; câmera rápida sob mensagem essencial;
  terminar logo depois da entrada do CTA.
- **Ritmo de edição**: 0–15s planos longos; 15–30s tensão por pausas; 30–55s
  progressão mais rápida; 55–70s densidade máxima; 70s+ desaceleração
  progressiva; final completamente estável. Match cuts e movimento contínuo em
  vez de fades frequentes.
- **Eases**: `power2.inOut`, `power3.out`, `expo.inOut`. Sem elasticidade
  exagerada. Planos grandes de interface movem devagar; microcomponentes e
  indicadores reagem mais rápido.
- Composição preparada para adaptação posterior a 9:16 (conteúdo essencial
  dentro da faixa central segura).
