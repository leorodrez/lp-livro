# Asset inventory

**No site was captured.** This project runs the no-capture path: the landing page
shown in the video is an invented mock of a generic AI SaaS, authored in HTML
inside the compositions. The advertised product is KRO AI; the mock page is the
*object* being tested, not KRO's own site.

No binary assets were supplied by the user and none were downloaded. Every visual
in this video is drawn in HTML/CSS from the brand tokens in `tokens.json`.

## Authored (not captured) assets available to frames

| id | What it is | Where it belongs |
| --- | --- | --- |
| `mock-lp` | Mock landing page for a fictional AI SaaS ("Nimbus AI" — an AI meeting-notes tool). Hero with logo, nav, headline, subhead, CTA button, and a placeholder product panel. Rendered as an HTML card, not an image. | Frames 01–04: the object that duplicates and gets A/B tested. |
| `visitor-modal` | Small product-style modal reading a live visitor count for one variant, with a pulsing "ao vivo" dot. | Frames 02–04: rises over each duplicated page. |
| `winner-badge` | "CAMPEÃ" badge plus conversion-rate readout for the winning variant. | Frame 04: marks the elected champion in the 2×2 grid. |
| `kro-wordmark` | The `kro ai_` wordmark drawn as text (Sora, trailing underscore is a prompt cursor and is part of the logo). | Frames 05–06: brand card and CTA. |

## Copy inventory (the four headline variants under test)

The mock page's headline is the only thing that changes between variants — that
is the product's whole point (KRO tests copy, not design).

- **A** — "Suas reuniões viram anotações. Sozinhas."
- **B** — "Nunca mais escreva uma ata de reunião."
- **C** — "Sua reunião acabou. O resumo já está no seu e-mail."
- **D (campeã)** — "Você fala. A gente escreve. Ninguém digita nada."
