## Dispatch context

- `PROJECT_DIR` — `/home/user/lp-livro/videos/kro-site-que-aprende`
- Canvas — **1080×1920** (9:16 vertical, Meta Ads / Reels / Stories)
- Captions — **disabled** (there is no narration track)
- Confirmed sketch — **none**. This run is autonomous; go straight from the packet to the animated frame.
- Design truth — `frame.md` at the project root. Read it in full before writing anything.

### THIS FILM HAS NO NARRATION — read this before the role's `voiceover` rule

There is no voice track and no `SCRIPT.md`. Your packet's block has **no `voiceover` field**; it
has **`onscreen_text`** instead. That field is **the frame's visible hero typography** — the
advertisement's actual script, which the viewer reads. Render it **verbatim**, in the order given,
as real DOM text. The role's "never render the narration as text" rule is about captions on a
narrated film; it does not apply here. Do not paraphrase, translate, abbreviate, re-order or drop a
single word, and do not add any copy that is not in `onscreen_text`.

A `/` inside `onscreen_text` separates sequential phrases within your frame, not a line break.
`read_budget` is how long that text must stay readable; `hold` is how long the composition must sit
**completely still** after the phrase is complete. Both are hard constraints — the whole film is
built so every sentence can be read once, unhurried, at roughly 2.5–3 words per second.

### Non-negotiables for this film

1. **Legibility beats everything.** When a phrase is on screen to be read, the camera and the
   composition stop. Every camera tween in your frame must finish **before** the `hold` window
   starts. Never animate, drift, blur or move text that the viewer is currently reading.
2. **Safe area.** Nothing essential in the top 260px, the bottom 420px, or the right 160px — the
   Reels/Stories UI covers those. Hero typography lives in the y 520–1400 band. Side margins 88px.
   The level-2 system may bleed outside the safe area; text never does.
3. **Three depth levels**, always: (1) atmospheric charcoal ground with a directional radial
   falloff from the upper left + a static SVG `fractalNoise` grain at ≤0.035 opacity;
   (2) the system / UI / narrative objects inside `perspective: 2400px` with `preserve-3d`;
   (3) hero typography, always flat in the camera plane — no perspective, no blur, ever.
4. **Full-bleed background rides on a `class="clip"` layer**, never on the `#root` /
   `data-composition-id` element.
5. **Colour emphasis is semantic and delayed.** Only the words your block's `emphasis` field names
   get colour, and the colour lands **180–260ms after that word is already legible in white** — a
   colour cross-fade settling onto stable text. Never a glow, never a filled background, never a
   random word.
6. **Text entrances must differ frame to frame.** Your block's shot sequence names the entrance for
   this frame — use exactly that one. Typewriter is forbidden anywhere in this film.
7. **Never represent AI as iconography.** No digital brain, no robot, no hologram, no generic
   futuristic grid, no random particles, no neon, no glow on everything, no indiscriminate
   glassmorphism, no human avatars or stock imagery, no static browser mockups. Intelligence is
   shown through behaviour, transformation, comparison and feedback.
8. **No invented product claims.** The KRO AI product gets no feature, metric, percentage, uplift
   or result that is not in `onscreen_text`. Headline-variant text inside the mock is an abstract
   typographic placeholder (bars, neutral lorem), never invented marketing copy. On-screen numbers
   must read as product-UI demo values, never as a promise.
9. **Determinism.** No `Math.random()`, no `Date.now()`, no `setTimeout` / `setInterval`, no
   network fetches, no CSS `transition` on animated elements. One paused GSAP timeline registered on
   `window.__timelines["<frame_id>"]`. Seek-safe `fromTo` with explicit from-states, absolute
   values, finite repeats.
10. **Handoffs are contracts.** If your block has `handoff_in` / `handoff_out`, hit those exact
    numbers at your frame's first and last instant — a sibling worker is building the other side of
    that seam.

### Local assets you may reference (and only these)

- `assets/kro-logo-light.png` — the official `kro ai_` lockup in cream on transparent
  (2912×922). The trailing `_` is part of the logo. Only frames 15 and 16 use it, plus an optional
  0.18-opacity corner watermark in frame 5.
- `assets/fonts/Sora-{400,600,700,800}.woff2` and `assets/fonts/Manrope-{400,500,600,700,800}.woff2`
  — already declared as `@font-face` in `frame.md`; copy those declarations into your frame.
- Everything else in the film is built programmatically in HTML/CSS/SVG. Never reference a file the
  dispatch did not name.
