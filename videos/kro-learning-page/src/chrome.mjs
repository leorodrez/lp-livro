// KRO chrome + data readouts. Same markup wherever the grammar repeats, so the
// learning loop replays the shapes the viewer already learned.
export function selbox(id, box, tag) {
  return `<div class="selbox" id="${id}" style="left:${box.x}px;top:${box.y}px;width:${box.w}px;height:${box.h}px">
    <div class="selbox-edge"></div>
    <div class="selbox-c tl"></div><div class="selbox-c tr"></div>
    <div class="selbox-c bl"></div><div class="selbox-c br"></div>
    ${tag ? `<div class="selbox-tag">${tag}</div>` : ""}
  </div>`;
}

export function mstack(id, v, headStub, x, y) {
  return `<div class="mstack" id="${id}" style="left:${x - 118}px;top:${y}px">
    <div class="mstack-head"><span class="mstack-v">${v}</span><span class="mstack-h">${headStub}</span></div>
    <div class="mrow"><span class="mrow-k">visitantes</span><span class="mrow-n" id="${id}-vis">0</span></div>
    <div class="mbar"><i id="${id}-bar-vis"></i></div>
    <div class="mrow"><span class="mrow-k">cliques no CTA</span><span class="mrow-n" id="${id}-clk">0</span></div>
    <div class="mrow"><span class="mrow-k">cadastros</span><span class="mrow-n" id="${id}-sig">0</span></div>
    <div class="mbar"><i id="${id}-bar-sig"></i></div>
  </div>`;
}

export function vlabel(id, v, stub, x, y) {
  return `<div class="vlabel" id="${id}" style="left:${x - 100}px;top:${y}px">
    <div class="vlabel-v">${v}</div><div class="vlabel-h">${stub}</div>
  </div>`;
}

export function kchip(id, label, x, y, count) {
  return `<div class="kchip" id="${id}" style="left:${x}px;top:${y}px">
    <i></i><span>${label}</span><b id="${id}-n">${count === undefined ? "" : count}</b>
  </div>`;
}

/** short stub of a headline, for labels that must stay one line */
export const stub = (h, n = 30) => (h.length > n ? h.slice(0, n - 1).trimEnd() + "…" : h);
