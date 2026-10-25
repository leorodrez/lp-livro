# Frame packet: 04-campea

## Project inputs

- Project: /home/user/lp-livro/videos/kro-ab-test
- Design tokens: /home/user/lp-livro/videos/kro-ab-test/frame.md
- RULES_DIR: /home/user/lp-livro/.agents/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 4 — A campeã

- scene: um quarto cartão preenche a célula vazia com uma copy diferente, as taxas de conversão sobem nos quatro, e o quarto é eleito campeão
- voiceover: ""
- duration: 6.0s
- transition_in: cut
- status: outline
- src: compositions/frames/04-campea.html
- type: benefit_highlight
- persuasion: Show-don't-tell proof (a eleição acontece na tela; ninguém afirma nada)
- beat: tensão → triunfo
- blueprint: dataviz-countup (Adapt)
- focal: o cartão-D e sua taxa de conversão
- roles: cartão D = cutout · cartões A/B/C = supporting (recuam) · leitura de conversão = cutout · palco = background
- asset_candidates:
- sfx: none (vídeo mudo)

narrativeRole: o clímax e o único beat que julga. Até aqui o vídeo só multiplicou;
aqui ele **decide**, e a decisão vem de um número que sobe na frente do viewer, não
de uma afirmação. É o frame mais denso do filme de propósito.
keyMessage: uma delas converte mais, e dá para saber qual.

Adapt: guardo a assinatura do dataviz-countup — o número como herói, contando até
o valor que carrega o argumento — mas são quatro count-ups simultâneos em vez de
um, e a câmera não empurra através deles: a resolução é a **eleição** (três
recuam, um se levanta). Troco a métrica de visitantes por conversão no meio do
frame, que é o que decide o teste. Os números se leem como leitura de produto —
rótulo `conversão`, escala e tipografia de UI — nunca como promessa da marca.

handoff_in: três cartões nas mesmas posições e escala 0.46 do handoff_out do
Frame 3, imóveis; célula inferior-direita ainda vazia com contorno tracejado;
contadores de visitante nos valores herdados.

Scene 1 (0.0–1.0s): o cartão-D cai dentro da célula vazia e o contorno tracejado
se apaga sob ele. A grade fecha: 2×2 completa, quatro headlines diferentes, todo
o resto idêntico entre elas.
Scene 2 (1.0–2.2s): os modais de visitante se transformam no lugar — o rótulo
`visitantes agora` vira `conversão` e o número troca de escala para a ramp de
métrica. Nenhum cartão se move; só a leitura muda de assunto.
Scene 3 (2.2–3.8s): as quatro taxas contam para cima ao mesmo tempo, em velocidades
diferentes. A do cartão-D passa as outras no meio da subida — a ultrapassagem é o
beat, e é ela que cria a tensão que o frame precisa antes de resolver.
Scene 4 (3.8–4.8s): resolução — os cartões A, B e C recuam (escala e opacidade
caem juntas) enquanto o cartão-D sobe uma camada, ganha a borda cyan e o selo
`CAMPEÃ` em pill spring-pop no topo. Único accent do quadro.
Scene 5 (4.8–6.0s): hold no clímax. A grade inteira imóvel, o D dominando por
tamanho, contraste e camada; os três recuados ainda legíveis como contexto.

handoff_out: grade 2×2 completa dead-center, escala do conjunto 1.0, opacidade 1,
imóvel; cartão-D em destaque com borda cyan e selo `CAMPEÃ` visível; cartões
A/B/C recuados em opacidade ~0.55.
