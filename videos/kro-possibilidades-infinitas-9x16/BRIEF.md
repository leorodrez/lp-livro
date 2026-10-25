---
workflow: hyperframes
flow: automation
storyboard: no
message: "Uma única página pode carregar infinitas versões da sua mensagem — sem reconstruir o site"
destination: meta-ads-stories
aspect: 1080x1920
language: pt-BR
audience: "Empresários e donos de negócio digital que já têm site e nunca testaram a mensagem dele"
length: 25s
angle: "a estrutura do site permanece idêntica, só as mensagens se transformam"
---

## Intent

Versão **Stories/Reels (1080x1920, 9:16)** do criativo de 25 segundos do KRO AI, sem
locução, executada na íntegra a partir do roteiro `Roteiro Motion — KRO AI`.

**Não é a 4:5 esticada.** A largura é a mesma (1080), então toda a copy mantém o mesmo
corpo em px — mexer no tamanho por causa da altura quebraria a legibilidade no telefone.
Os 570px a mais de altura viraram composição: os objetos foram reancorados no centro da
faixa segura de Stories (y 260–1500), a Cena 1 virou uma grade **2x3 de seis páginas**
idênticas em vez de 2x2, e a multiplicação final abriu para uma **quarta linha** de
páginas, crescendo para baixo e ocupando o rodapé que o formato alto deixa livre.

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
- **Formato 1080x1920 (Stories), conforme pedido.** É o `9:16` do roteiro original.
  Tudo que precisa ser lido vive entre y 260 e 1500 — a faixa que sobrevive à interface
  de Stories e de Reels. Acima e abaixo dela só há chão e atmosfera, que é onde a
  plataforma desenha por cima.
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
- **Trilha sonora: a faixa do cliente (`trilha-sonora.mp3`, 113 BPM, 3m28s).** A janela
  de 25s foi escolhida pela análise do arranjo, não pelo começo do arquivo: entra em
  **108,93s**, num tempo forte dentro do breakdown. Assim os 9,5s iniciais do filme correm
  sobre o trecho esparso (o "início intrigante" que o roteiro pede) e **a volta do tema, em
  118,475s do arquivo, cai em 9,55s do filme — exatamente na primeira multiplicação das
  páginas**, que é a sincronia que o roteiro pede. Entrada com fade de 0,25s; saída com
  fade de 1,6s começando em 23,4s, sobre a última divisa de compasso (23,35s).
- **Sincronia medida.** Os 13 eventos de imagem caem na grade de batida com erro médio de
  0,075s (~2 frames). O destaque do terceiro card foi movido de 16,30 para 16,44s para
  encostar num tempo forte. O desenho de som (impacto, whooshes, riser, cliques, pop)
  continua posicionado pelos picos medidos de cada arquivo, e agora reforça os acentos da
  trilha em vez de competir com eles.
- **Níveis.** Trilha em `data-volume="0.72"` — valor confirmado por `normalize-audio` como
  o ganho que põe o elemento de música em −16 LUFS. A master do cliente satura (pico real
  de +0,01 dBTP na janela escolhida); o ganho a traz para −2,7 dBTP. Mix final: **−17,7
  LUFS integrado, −14,8 de short-term máximo, −1,3 dBTP, zero clipping**. O integrado fica
  abaixo de −16 porque o primeiro terço é o breakdown de propósito; a metade alta do filme
  mede −14 a −16. Tudo foi **medido, não ouvido**.
- **O filme continua funcionando mudo**, que é como o feed do Meta dá autoplay: todo o
  roteiro está na tela.
- **Paleta estrita do roteiro:** `#7C3AED` roxo (marca e transformação) · `#06B6D4` ciano
  (sinal de visitante, destaque) · `#2B2B2B` grafite (chão) · `#FFFFFF` branco (texto) ·
  `#D8C0A7` areia (detalhe pontual, escasso).
- **Limite de promessa:** nenhum número, percentual, uplift ou funcionalidade do KRO AI é
  inventado. Os headlines das variantes são copy genérica de uma página qualquer — o site
  do espectador — e nunca um claim do KRO AI.
