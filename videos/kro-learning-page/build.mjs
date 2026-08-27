import { writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { css } from "./src/style.mjs";
import { runtime } from "./src/runtime.mjs";

const FONTS = ["Manrope-400", "Manrope-500", "Manrope-600", "Manrope-700", "Manrope-800", "Sora-400", "Sora-600", "Sora-700", "Sora-800"]
  .map((f) => {
    const [fam, w] = f.split("-");
    return `@font-face{font-family:"${fam}";font-weight:${w};font-style:normal;font-display:block;src:url("assets/fonts/${f}.woff2") format("woff2")}`;
  })
  .join("\n");

mkdirSync("assets", { recursive: true });
const FILM_CSS = FONTS + "\n" + css;
writeFileSync("assets/film.css", FILM_CSS);

mkdirSync("compositions/frames", { recursive: true });

const files = readdirSync("src/frames").filter((f) => /^f\d\d-.*\.mjs$/.test(f)).sort();
const built = [];
for (const f of files) {
  const mod = (await import("./src/frames/" + f)).default;
  const slug = f.replace(/^f(\d\d)-(.*)\.mjs$/, "$1-$2");
  const html = `<template>
  <style>${FILM_CSS}</style>
  <div id="root" data-composition-id="${slug}" data-root="true" data-frame="${mod.id}"
       data-start="0" data-width="1920" data-height="1080" data-duration="${mod.duration}"
       data-layout-allow-overflow="true">
${mod.body}
  </div>
  <script>
    (function () {
      const R = document.querySelector('[data-frame="${mod.id}"]');
      const $ = (s) => R.querySelector(s);
      const $$ = (s) => Array.prototype.slice.call(R.querySelectorAll(s));
      const D = ${mod.duration};
${runtime}
      const tl = gsap.timeline({ paused: true });
${mod.script}
      window.__timelines["${slug}"] = tl;
    })();
  </script>
</template>
`;
  const out = `compositions/frames/${slug}.html`;
  writeFileSync(out, html);
  built.push({ src: out, id: mod.id, duration: mod.duration });
}
console.log("built", built.length, "frames");
built.forEach((b) => console.log(" ", b.src, b.duration + "s"));
