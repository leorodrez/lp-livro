// A Grande Convergência — gerador da composição.
// Escreve compositions/*.html (11 cenas) e index.html (orquestrador + áudio).
//   node build.mjs
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C } from "./src/kit.mjs";
import { s01, s02, s03, s04, s05, s06 } from "./src/scenes-a.mjs";
import { s07, s08, s09, s10, s11 } from "./src/scenes-b.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "compositions");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const TOTAL = 54;

// Ordem, arquivo e janela de cada cena.
export const SCENES = [
  { id: "s01", file: "s01-cta-macro.html", start: 0, dur: 3, gen: s01 },
  { id: "s02", file: "s02-desperta.html", start: 3, dur: 4, gen: s02 },
  { id: "s03", file: "s03-triptico.html", start: 7, dur: 5, gen: s03 },
  { id: "s04", file: "s04-corredor.html", start: 12, dur: 6, gen: s04 },
  { id: "s05", file: "s05-onda-topdown.html", start: 18, dur: 6, gen: s05 },
  { id: "s06", file: "s06-cidade.html", start: 24, dur: 6, gen: s06 },
  { id: "s07", file: "s07-montagem.html", start: 30, dur: 6, gen: s07 },
  { id: "s08", file: "s08-parede.html", start: 36, dur: 5, gen: s08 },
  { id: "s09", file: "s09-excecao.html", start: 41, dur: 5, gen: s09 },
  { id: "s10", file: "s10-humana.html", start: 46, dur: 4, gen: s10 },
  { id: "s11", file: "s11-endcard.html", start: 50, dur: 4, gen: s11 },
];

for (const s of SCENES) {
  writeFileSync(join(OUT, s.file), s.gen(), "utf8");
}

// ── Áudio ────────────────────────────────────────────────────────────────────
// audio/manifest.json é escrito por audio.mjs. Sem ele, monta-se só a imagem.
let audio = { bed: null, events: [] };
const manifestPath = join(ROOT, "assets", "audio", "manifest.json");
if (existsSync(manifestPath)) {
  audio = JSON.parse(readFileSync(manifestPath, "utf8"));
}

const bedEl = audio.bed
  ? `      <audio
        id="bed"
        src="${audio.bed.src}"
        data-start="0"
        data-duration="${TOTAL}"
        data-track-index="20"
        data-volume="${audio.bed.volume}"
      ></audio>`
  : "";

// Um evento por linha: são 40+ marcas sonoras e o arquivo precisa continuar legível.
const eventEls = audio.events
  .map(
    (e, i) =>
      `      <audio id="sfx-${String(i).padStart(3, "0")}" src="${e.src}" ` +
      `data-start="${e.at}" data-duration="${e.dur}" ` +
      `data-track-index="${21 + (i % 6)}" data-volume="${e.volume}"></audio>`,
  )
  .join("\n");

const slots = SCENES.map(
  (s) => `      <div
        id="el-${s.id}"
        data-composition-id="${s.id}"
        data-composition-src="compositions/${s.file}"
        data-start="${s.start}"
        data-duration="${s.dur}"
        data-track-index="1"
        data-width="1920"
        data-height="1080"
      ></div>`,
).join("\n");

const index = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>A Grande Convergência</title>
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        width: 1920px; height: 1080px;
        overflow: hidden;
        background: ${C.voidDeep};
      }
      body { font-family: Inter, sans-serif; }
      #root { position: relative; width: 1920px; height: 1080px; overflow: hidden; }
      [data-composition-id="main"] > div[data-composition-src] {
        position: absolute; inset: 0;
      }
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${TOTAL}"
      data-width="1920"
      data-height="1080"
    >
${slots}

${bedEl}
${eventEls}
    </div>

    <script>
      // Orquestrador fino: toda a animação vive nas sub-composições.
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;

writeFileSync(join(ROOT, "index.html"), index, "utf8");

console.log(
  `✓ ${SCENES.length} cenas + index.html · ${TOTAL}s · ${audio.bed ? `bed + ${audio.events.length} eventos` : "sem áudio (rode audio.mjs)"}`,
);
