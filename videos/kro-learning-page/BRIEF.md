---
workflow: product-launch-video
flow: automation
storyboard: no
message: "O KRO AI transforma as mensagens que já estão no seu site em experimentos e deixa os visitantes reais mostrarem quais delas fazem mais gente agir"
destination: youtube
aspect: 1920x1080
language: pt-BR
audience: "Fundadores, executivos e times de growth, marketing, CRO e produto responsáveis por aquisição e conversão em negócios digitais e serviços premium"
length: 83s
angle: "The Learning Page — a landing page como organismo que se ramifica, observa e converge"
---

## Intent

Filme de produto premium do KRO AI. O KRO é uma **camada de inteligência e
experimentação aplicada a um site que já existe** — ele não reconstrói o site,
não escolhe arbitrariamente uma copy melhor e não depende da opinião da IA.
Ele transforma mensagens existentes em experimentos e usa comportamento real
para descobrir quais formas de comunicação geram mais ação.

Conceito central: **The Learning Page**. A landing page é um organismo digital
inicialmente estático que começa a se multiplicar, observar, comparar e
convergir. O motivo visual do filme é o movimento:

    1 → muitas → dados → 1 melhor informada

Arco emocional: curiosidade → tensão → descoberta → expansão → evidência →
resolução → aceleração → confiança.

Registro: filme comercial de SaaS high-end com linguagem editorial — nunca
demonstração de dashboard nem tutorial de produto.

## Assets

- ../../kro_ai_logo-01 (7).png — logo oficial `kro ai_` (charcoal sobre transparente,
  4500×4500). Usado no end card (Shot 12) e como marca discreta da camada KRO.
  Recolorido para branco quente via `brightness(0) invert(1)` sobre fundo grafite.
- assets/fonts/ — Sora (display) + Manrope (texto/UI), os mesmos arquivos locais
  usados nos outros filmes do KRO. Sem Google Fonts em runtime.

## Customizations

- Landing page fictícia **Vértice** (SaaS de gestão empresarial premium) construída
  em HTML/CSS como componente reutilizável — nav mínima, headline, subheadline, CTA,
  benefícios, prova social e um fragmento de dashboard. Sem lorem ipsum. A mesma
  página tem de permanecer reconhecível do primeiro ao último frame.
- 4 páginas coexistem no experimento: a original + 3 hipóteses. Diferenciadas por
  **posição, nomenclatura e conteúdo** — nunca por cor. Sem arco-íris de variantes.
- Métricas determinísticas e interpoladas, poucas por vez: visitantes, cliques no
  CTA e cadastros. Sem percentual de uplift, sem gráfico financeiro genérico.
- Visitantes representados por **evidência comportamental** — cursores, markers de
  sessão, trajetórias discretas. Nunca stock footage de pessoas.
- Text replacement das headlines por CSS mask / clip-path, não fade simples.
- Profundidade em 4 níveis: ambiente → página → componente destacado → dados.
  Perspectiva discreta, 3°–12°. Nada de cards girando.
- Gramática de motion reutilizável no learning loop: selectElement, generateHypotheses,
  splitVariants, distributeVisitors, animateResults, selectWinner, mergeVariants,
  highlightNextExperiment.

## Notes

- Paleta oficial KRO: Purple `#7C3AED` (marca / seleção / hipóteses / vencedora),
  Cyan `#06B6D4` (exclusivamente dado numérico), Charcoal `#2B2B2B`, Branco,
  Areia `#D8C0A7`. O filme roda sobre grafite profundo `#0E0F12` com a interface
  clara. **Um destaque dominante por composição** — roxo e cyan nunca competem.
- Logo `kro ai_` — o `_` final faz parte do logo (cursor de prompt).
  Domínio: `usekro.ai`.
- Limite de promessa: o KRO **descobre** o que converte mais. Nunca prometer "+X%".
  Os números são de demonstração e precisam se ler como tela de produto.
- A IA gera possibilidades; o comportamento dos visitantes produz a resposta.
  Nenhuma variante pode aparecer como vencedora antes de haver comportamento.
- Proibido: cérebro/robô/circuito/esfera/partícula mágica como metáfora de IA;
  neon roxo-azul genérico; glassmorphism pesado; screen recording ou scroll
  vertical da LP; grids de cards; confete/explosão/glow na vencedora; animar cada
  palavra; cursor permanente; câmera em movimento o tempo todo; fade-to-black
  como transição padrão; qualquer randomização não determinística.
- Sem narração: todo texto é mensagem de tela, integrada à composição
  cinematográfica — não legenda nem card separado.
