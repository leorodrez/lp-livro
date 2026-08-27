# Asset inventory — KRO AI · The Learning Page

No-capture run: nenhum site foi rastreado. O brief pede uma landing page
**fictícia** construída em HTML/CSS/SVG, então não há screenshots de origem.
O inventário abaixo é o material real disponível no projeto.

## Brand assets (reais)

- `capture/assets/kro-logo.png` — logo oficial `kro ai_` do KRO AI. PNG 4500×4500,
  wordmark charcoal `#2B2B2B` sobre fundo transparente, com margem generosa.
  O `_` final faz parte do logo (cursor de prompt). Sobre o grafite do filme
  precisa ser recolorido para branco quente (`filter: brightness(0) invert(1)`)
  e recortado da margem. **Único asset de imagem do filme.**
  Usado em: frame 03 (marca discreta do painel KRO), frame 12 (end card).

- `assets/fonts/` — Sora (display: 400/600/700/800) e Manrope (texto e UI:
  400/500/600/700/800) como arquivos `.woff2` locais, copiados dos outros filmes
  do KRO. Nenhuma fonte é carregada de rede em runtime.

## Programmatic assets (construídos, sem arquivo de origem)

Tudo o que aparece na tela além do logo é HTML/CSS/SVG determinístico:

- **Landing page Vértice** — SaaS fictício de gestão empresarial. Componente
  estrutural reutilizável: nav mínima, headline, subheadline, CTA duplo,
  três benefícios, prova social com wordmarks abstratas e um fragmento de
  card de dashboard. É o objeto do experimento, presente em todos os frames.
- **Painel KRO** — chrome contextual que se conecta ao elemento selecionado:
  bounding box, label do elemento, lista de hipóteses, indicadores de sessão.
- **Cursores e markers de sessão** — trajetórias pré-programadas em SVG path.
- **Métricas** — visitantes / cliques / cadastros, contadores interpolados
  deterministicamente a partir de valores fixos.
- **Iluminação e profundidade** — radial-gradients, pseudo-elements, grain SVG,
  vignette. Sem bibliotecas externas.
