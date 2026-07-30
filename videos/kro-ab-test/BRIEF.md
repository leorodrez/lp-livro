---
workflow: product-launch-video
flow: automation
storyboard: no
message: "O KRO AI testa as headlines da sua landing page sozinho e elege a campeã"
destination: instagram-feed
aspect: 1080x1080
language: pt-BR
audience: "Founders de SaaS, infoprodutores e gestores de tráfego que rodam mídia paga para uma landing page cuja headline nunca foi testada"
length: 25s
angle: demonstração do mecanismo
---

## Intent

Promo de produto do KRO AI (usekro.ai) — SaaS que roda teste A/B de copy de
landing page com IA. O vídeo é uma **demonstração visual do mecanismo**: o
usuário vê a própria página se multiplicar em variações de headline, o tráfego
sendo dividido entre elas, e uma delas sendo eleita campeã. O argumento é
mostrado, não narrado.

Tom da marca: provocador, inteligente, seco. Premium acessível — sofisticado na
ideia, simples na execução. A peça não grita oferta; o CTA entra discreto no fim.

Roteiro pedido pelo usuário, na ordem:

1. Uma landing page de um produto de IA aparece.
2. Ela se duplica, e a cópia mostra uma **headline diferente**.
3. Duplica de novo, mostrando uma **terceira headline**.
4. A cada duplicação, sobe um **modal com o número de visitantes** acessando
   aquela versão.
5. Aparece uma **quarta versão, com copy diferente, eleita campeã** em número
   de conversões.
6. **Zoom out** e entra o letreiro: o KRO AI automatiza os testes A/B e acha a
   versão campeã da sua página.
7. Fecha com CTA: **"Teste agora a sua"**.

## Customizations

- Contagem animada (count-up) nos números de visitantes de cada modal e na taxa
  de conversão da versão campeã.
- A landing page mostrada é uma **mock de um SaaS de IA genérico** (inventada,
  não capturada de nenhum site real) — o produto anunciado é o KRO, a página é
  o objeto do teste.
- Tipografia com semântica de marca: display pesada quando a marca fala
  (letreiro, CTA); sans regular quando a tela finge ser produto/UI (as landing
  pages e os modais).
- Formato quadrado obriga as 4 páginas a fecharem em grade 2×2 no beat da
  campeã — a grade é o momento em que o teste inteiro fica visível de uma vez.

## Notes

- Sem narração e sem trilha: o projeto é silencioso (`music: none`, sem
  `SCRIPT.md`). Não há credencial HeyGen nesta máquina e as engines locais
  (Kokoro/MusicGen) estão sem dependências. O vídeo foi construído para
  funcionar mudo, como peça de feed.
- Paleta oficial: Purple `#7C3AED`, Cyan `#06B6D4`, Charcoal `#2B2B2B`,
  Branco `#FFFFFF`, Areia `#D8C0A7`. Um fundo chapado e **uma** cor de
  destaque por beat — nunca dois destaques competindo.
- Cyan carrega o dado/número; roxo é a cor da marca.
- Logo `kro ai_` — o `_` final faz parte do logo (cursor de prompt).
- Assinatura de rodapé da marca: `Conversão inteligente`. Domínio: `usekro.ai`.
- Limite de promessa: o KRO **descobre** qual copy converte mais; não garantir
  "+X% de conversão" como resultado. Os números nas mocks são de demonstração e
  precisam se ler como tela de produto, não como promessa.
- O produto testa **copy**, não design nem mídia paga.
