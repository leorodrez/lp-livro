---
workflow: hyperframes
flow: automation
storyboard: no
message: "Uma única página pode carregar infinitas versões da sua mensagem — sem reconstruir o site"
destination: meta-ads-feed
aspect: 1080x1350
language: pt-BR
audience: "Empresários e donos de negócio digital que já têm site e nunca testaram a mensagem dele"
length: 25s
angle: "a estrutura do site permanece idêntica, só as mensagens se transformam"
---

## Intent

Criativo de Meta Ads para o KRO AI, **25 segundos, 1080x1350 (4:5), sem locução**,
executado na íntegra a partir do roteiro `Roteiro Motion — KRO AI` enviado pelo usuário.

O roteiro é a autoridade: as quatro cenas, a ordem dos textos, a direção de arte, a
paleta obrigatória e as orientações finais são seguidas como estão. A peça existe para
despertar curiosidade suficiente para o clique e o preenchimento do formulário
instantâneo do Meta.

A ideia que precisa ficar: **a página é a mesma; a mensagem é que pode ser infinita.**

## Assets

- `assets/kro-logo-light.png` — lockup oficial `kro ai_` em creme (o `_` final faz parte
  do logo). Reaproveitado de `videos/kro-site-que-aprende`.
- `assets/fonts/` — Sora (display) + Manrope (corpo/UI), self-hosted, determinísticas.
- `assets/vendor/gsap.min.js` — GSAP 3.15.0 local (sem fetch em render).
- `assets/sfx/` — 9 efeitos locais reaproveitados do projeto anterior.

## Customizations

- **VO_MODE: verbatim-onscreen.** Todo texto do roteiro aparece na tela, na ordem
  original, sem resumir, reescrever nem cortar. Sem locução e sem voz sintetizada.
- **Modo no-capture.** Nenhum site foi rastreado. A landing page em cena é uma **mock
  abstrata** — ela representa o site *do espectador*, não a interface do KRO AI, então
  não há claim de produto a sustentar. O único ativo real de marca é o logotipo.
- **Formato 1080x1350 por pedido explícito do usuário**, acima do `9:16` escrito no
  roteiro. O enquadramento foi recomposto para 4:5, não espremido.
- **Legibilidade mobile é requisito duro** (orientação final do roteiro): nenhum texto
  para leitura abaixo de 30px, janela de leitura de 0,5s + 0,3s por palavra, câmera
  parada enquanto há texto a ler.
- **Demonstração visual acima de telas técnicas** (orientação final do roteiro): nenhum
  dashboard, gráfico, métrica ou tela de produto aparece no filme.

## Notes

- **Conflito de duração, declarado e resolvido a favor dos 25s pedidos.** O roteiro soma
  ~65 palavras de texto de tela. A 3 palavras/segundo mais a latência de reconhecimento,
  a leitura sequencial pura exigiria ~27s. O corte fecha em 25,0s exatos porque:
  (a) na Cena 3 os três rótulos **permanecem na tela** depois de entrar, então a leitura
  é acumulada e não sequencial; (b) a Cena 4 é composta como **end card** — texto
  principal, assinatura e CTA coexistem como um pôster, que é como o próprio roteiro os
  descreve (texto principal / assinatura / CTA visual), e não como três leituras
  seguidas. Com isso toda janela de leitura ficou entre **99% e 129%** do mínimo
  confortável — as onze janelas estão medidas no `REVIEW.md`. Nenhuma frase foi cortada.
  Um corte de ~28s daria folga real ao fechamento, e é uma mudança de uma linha.
- **Trilha sonora não pôde ser obtida neste ambiente.** Não há sessão HeyGen nem modelo
  local de música disponível (`media-use resolve --doctor`), e o acesso ao download de
  modelos está bloqueado pela rede. A peça sai com **desenho de som** (impacto, whooshes,
  riser, cliques, pop) usando a biblioteca local: o pico de cada efeito foi medido e cada
  clipe está posicionado para cair um frame depois da imagem que o causa. O arquivo final
  mede −16,2 LUFS integrado e −3,6 dBTP, sem clipping. O filme é construído para funcionar
  **mudo**, que é como o feed do Meta dá autoplay. Para somar a trilha depois: arquivo em
  `assets/bgm/`, um `<audio>` no `index.html` com `data-volume` ~0,2, e realinhar os
  impactos de 9,58 / 10,18 / 20,18 s à batida.
- **Paleta estrita do roteiro:** `#7C3AED` roxo (marca e transformação) · `#06B6D4` ciano
  (sinal de visitante, destaque) · `#2B2B2B` grafite (chão) · `#FFFFFF` branco (texto) ·
  `#D8C0A7` areia (detalhe pontual, escasso).
- **Limite de promessa:** nenhum número, percentual, uplift ou funcionalidade do KRO AI é
  inventado. Os headlines das variantes são copy genérica de uma página qualquer — o site
  do espectador — e nunca um claim do KRO AI.
