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
length: 94s
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

- capture/screenshots/ — capturas reais de apple.com/br; fonte visual de verdade
  para a reconstrução da página (hero do evento, Mac mini, Mac Studio, iPhone,
  MacBook Air, MacBook Neo, Apple Watch, AirPods Pro 3).
- ../../kro_ai_logo-01 (7).png — logo KRO AI para o end card.

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

- **Duração**: o briefing pediu 70–85s, mas o próprio storyboard shot-by-shot vai
  de 0:00 a 1:34. O briefing também determina que *legibilidade tem prioridade
  sobre a duração estimada*. Alvo: ~94s, honrando integralmente os HOLDs.
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
