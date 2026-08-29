# Asset inventory — apple.com/br

**Procedência:** captura automática negada pela política de egresso da organização
(403 no CONNECT para `www.apple.com:443`). Os 7 screenshots foram tirados e
fornecidos manualmente pelo usuário, e commitados no repositório
(`af7d753 — Add files via upload`). Os recortes abaixo foram extraídos desses
screenshots com ffmpeg. Registro do bloqueio: `capture/CAPTURE-BLOCKED-NOTE.md`.

## Screenshots de origem — `capture/screenshots/`

| Arquivo | Seção da homepage |
| --- | --- |
| `apple-site-prints1.png` | Hero — evento especial. Gradiente azul, logo Apple luminoso, "Surpreendente e brilhante." / "Assista à apresentação especial da Apple." / "Dia 09/09, às 14h (BRT)." / pill branco "Adicionar ao calendário" |
| `apple-site-prints2.png` | Mac mini — "Agora com M6 e M5 Pro." / "Confira em breve a disponibilidade" / pills "Saiba mais" + "Ver preços" / foto: mão segurando o Mac mini |
| `apple-site-prints3.png` | Mac Studio — "Agora com M5 Max e M5 Ultra." / mesma estrutura de pills |
| `apple-site-prints4.png` | Grade de meios-tiles: iPhone ("Conheça a nova geração do iPhone.") \| MacBook Air ("Agora com a potência do M5.") |
| `apple-site-prints5.png` | Grade de meios-tiles: iPad air ("Agora com a potência do M4.") \| MacBook Neo ("Um Mac incrível. Uma escolha inteligente.") |
| `apple-site-prints6.png` | Grade de meios-tiles: Apple Watch Series 11 ("O parceiro ideal para cuidar da sua saúde.") \| AirPods Pro 3 ("O melhor Cancelamento Ativo de Ruído do mundo em fones intra-auriculares.") |
| `apple-site-prints7.png` | Rodapé — notas de rodapé + 6 colunas de links |

## Recortes utilizáveis — `capture/assets/`

| Arquivo | O que é | Onde entra |
| --- | --- | --- |
| `apple-hero-glow.png` | Placa do hero: gradiente azul + logo Apple luminoso, **sem tipografia** (o texto é re-tipografado em HTML para poder se separar em camadas e variar entre A/B/C) | Fundo do hero da página reconstruída — presente em quase todos os shots |
| `apple-mac-mini.png` | Mão segurando o Mac mini, fundo `#F5F5F7` | Seção de produto da página reconstruída; alvo do travelling do SHOT 02 |
| `apple-mac-studio.png` | Mac Studio isolado, fundo `#F5F5F7` | Seção de produto secundária no travelling |
| `apple-iphone.png` | Trio de iPhones (azul / branco / rosa) | Meio-tile esquerdo da grade |
| `apple-macbook-air.png` | MacBook Air aberto, wallpaper azul | Meio-tile direito da grade |
| `apple-ipad-air.png` | Leque de iPads air | Grade estendida (travelling) |
| `apple-macbook-neo.png` | MacBook Neo, wallpaper verde/amarelo | Grade estendida (travelling) |
| `apple-watch.png` | Apple Watch Series 11 em macro, anéis de atividade | Grade estendida (travelling) |
| `apple-airpods.png` | Par de AirPods Pro 3 | Grade estendida (travelling) |

## Tokens observados na fonte real

- Fundo de seção de produto: `#F5F5F7` · fundo de tile: branco `#FFFFFF`
- Tipografia: SF Pro (substituída por **Inter** no projeto — geometria mais próxima disponível)
- Título de produto: ~48–56px, weight 600, tracking negativo, `#1D1D1F`
- Subtítulo: ~24px, weight 400, `#1D1D1F`
- Texto terciário: ~17px, `#86868B`
- **Azul de CTA Apple: `#0071E3`** — pill preenchido (texto branco) + pill outline (texto azul)
- Nav: 12 itens, ~12px, `#1D1D1F` a ~80% de opacidade, barra de 44px
- Hero: gradiente azul `#8DA9CE → #4A6491`, tipografia branca

## Nota de reconstrução

O storyboard exige que a página **se decomponha em componentes no eixo Z** (SHOT 05)
e **se duplique em variantes com copy diferente** (SHOT 06+). Um screenshot chapado
não faz isso. Por isso a página é reconstruída em HTML/CSS usando a copy e a
estrutura reais acima, com as fotos de produto recortadas entrando como `<img>`.
Isso é o que a seção 11 do briefing pede ("Reconstruir os elementos visualmente
relevantes"), e o que as seções 12–14 exigem tecnicamente.
