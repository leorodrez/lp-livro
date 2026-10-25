// Build-time projection maths so every chrome anchor is derived, not eyeballed.
// The world is a 1920x1080 layer whose transform-origin is the frame centre.
import { PAGE_W, PAGE_H } from "./lp.mjs";

export const CX = 960, CY = 540;
export const PCX = PAGE_W / 2, PCY = PAGE_H / 2;

/** page-local point -> screen point, given a slot placement and a camera state */
export function proj(p, slot, cam = { x: 0, y: 0, s: 1 }) {
  const s = slot.s === undefined ? 1 : slot.s;
  let X = slot.x + (p.x - PCX) * s;
  let Y = slot.y + (p.y - PCY) * s;
  X = (X - CX) * cam.s + CX + cam.x;
  Y = (Y - CY) * cam.s + CY + cam.y;
  return { x: r(X), y: r(Y), k: +(s * cam.s).toFixed(4) };
}

/** camera translation that lands a page-local point on a wanted screen point */
export function camFor(p, screen, camScale, slot) {
  const s = slot.s === undefined ? 1 : slot.s;
  const X = slot.x + (p.x - PCX) * s;
  const Y = slot.y + (p.y - PCY) * s;
  return {
    x: r(screen.x - ((X - CX) * camScale + CX)),
    y: r(screen.y - ((Y - CY) * camScale + CY)),
    s: camScale,
  };
}

/** slot placement -> screen rect of the whole page */
export function pageRect(slot, cam = { x: 0, y: 0, s: 1 }) {
  const a = proj({ x: 0, y: 0 }, slot, cam);
  const b = proj({ x: PAGE_W, y: PAGE_H }, slot, cam);
  return { x: a.x, y: a.y, w: r(b.x - a.x), h: r(b.y - a.y) };
}

const r = (n) => Math.round(n * 100) / 100;

// Page-local geometry of the elements the film experiments on.
export const EL = {
  headline: { x: 44, y: 132, w: 700, h: 96 },
  cta: { x: 38, y: 302, w: 170, h: 58 },
  benefit: { x: 36, y: 408, w: 372, h: 78 },
  proof: { x: 36, y: 522, w: 650, h: 84 },
  sub: { x: 38, y: 234, w: 616, h: 58 },
};
