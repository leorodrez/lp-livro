// Point the assembled index at the vendored GSAP.
//
// assemble-index.mjs hardcodes a jsdelivr <script src>. This machine has no route
// to that CDN, so a rendered frame would run with `gsap` undefined and every
// composition would sit at its initial state. The frames already load
// assets/vendor/gsap.min.js themselves; the root timeline needs the same file.
// Re-run this after every assemble.

import { readFileSync, writeFileSync } from "node:fs";

const FILE = "index.html";
const CDN = /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^"]*"[^>]*><\/script>/;
const LOCAL = '<script src="assets/vendor/gsap.min.js"></script>';

const html = readFileSync(FILE, "utf8");
if (html.includes(LOCAL)) {
  console.log("· index.html already points at the vendored gsap");
} else if (CDN.test(html)) {
  writeFileSync(FILE, html.replace(CDN, LOCAL));
  console.log("✓ index.html gsap → assets/vendor/gsap.min.js");
} else {
  console.error("✗ no gsap <script> tag matched in index.html — check the assembler output");
  process.exit(1);
}
