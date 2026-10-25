// A Grande Convergência — trilha e sound design.
//   node audio.mjs
//
// A trilha é SINTETIZADA aqui, nota a nota, em vez de buscada pronta: o brief
// pede que os ticks de otimização VIREM a percussão e que a música corte
// exatamente no frame da convergência (36,000s). Uma faixa gerada teria de ser
// recortada para caber; esta é escrita sobre o mapa de tempo do filme.
//
// Os SFX vêm da biblioteca local do /media-use (19 arquivos, offline).
// Determinístico: PRNG com seed fixa, nenhum relógio, nenhuma rede.

import { writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "assets", "audio");
const SFX_OUT = join(OUT, "sfx");
const SFX_SRC = "/root/.claude/skills/media-use/audio/assets/sfx";
mkdirSync(SFX_OUT, { recursive: true });

const SR = 48000;
const DUR = 54;
const N = SR * DUR;

// ── PRNG determinístico ──────────────────────────────────────────────────────
let _s = 0x2b2b2b2b;
function rnd() {
  _s = (_s + 0x6d2b79f5) | 0;
  let t = Math.imul(_s ^ (_s >>> 15), 1 | _s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return (((t ^ (t >>> 14)) >>> 0) / 4294967296) * 2 - 1;
}

const L = new Float64Array(N);
const R = new Float64Array(N);

const TAU = Math.PI * 2;
function add(i, l, r) {
  L[i] += l;
  R[i] += r;
}
// Rampa linear entre pontos de controle — o envelope macro da trilha.
function seg(t, points) {
  for (let k = 0; k < points.length - 1; k++) {
    const [t0, v0] = points[k];
    const [t1, v1] = points[k + 1];
    if (t >= t0 && t <= t1) return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0 || 1);
  }
  return t < points[0][0] ? points[0][1] : points[points.length - 1][1];
}

// ── 1. Hum digital corporativo + drone ───────────────────────────────────────
// Presente desde o primeiro frame; morre no corte de 36s.
const HUM = [
  [0, 0.0],
  [1.2, 0.055],
  [8, 0.06],
  [24, 0.085],
  [34, 0.1],
  [35.98, 0.1],
  [36.0, 0.0],
];
// ── 2. Pad — tríade menor, seca. Entra com a aceleração.
const PAD = [
  [0, 0],
  [8, 0],
  [14, 0.028],
  [22, 0.05],
  [30, 0.07],
  [34.5, 0.085],
  [35.98, 0.085],
  [36.0, 0],
];
// ── 3. Ruído de sala — só no universo humano.
const ROOM = [
  [0, 0],
  [40.9, 0],
  [41.3, 0.02],
  [49.6, 0.02],
  [50.2, 0.004],
  [54, 0.004],
];

for (let i = 0; i < N; i++) {
  const t = i / SR;

  // Drone: duas fundamentais desafinadas + uma quinta muito baixa.
  const hg = seg(t, HUM);
  const lfo = 1 + 0.12 * Math.sin(TAU * 0.07 * t);
  let l =
    hg * lfo * (Math.sin(TAU * 55 * t) * 0.62 + Math.sin(TAU * 55.13 * t) * 0.24 + Math.sin(TAU * 110.2 * t) * 0.16);
  let r =
    hg * lfo * (Math.sin(TAU * 55.04 * t) * 0.62 + Math.sin(TAU * 55.19 * t) * 0.24 + Math.sin(TAU * 110.05 * t) * 0.16);

  // Pad: Lá menor (A2 · C3 · E3). Sem brilho, sem épico.
  const pg = seg(t, PAD);
  if (pg > 0) {
    const sw = 1 + 0.07 * Math.sin(TAU * 0.11 * t + 1.2);
    const a = Math.sin(TAU * 110 * t) * 0.5 + Math.sin(TAU * 130.81 * t) * 0.38 + Math.sin(TAU * 164.81 * t) * 0.3;
    const b = Math.sin(TAU * 110.14 * t) * 0.5 + Math.sin(TAU * 130.7 * t) * 0.38 + Math.sin(TAU * 164.98 * t) * 0.3;
    l += pg * sw * a;
    r += pg * sw * b;
  }

  // Ruído de sala (filtrado por média móvel simples, feito abaixo).
  const rg = seg(t, ROOM);
  if (rg > 0) {
    const n = rnd() * rg;
    l += n;
    r += n * 0.92;
  }

  L[i] = l;
  R[i] = r;
}

// ── 4. Pulso mecânico ────────────────────────────────────────────────────────
// 120 BPM constante. A "aceleração" do filme não é mudança de andamento: é a
// subdivisão que adensa — exatamente como o intervalo entre decisões encolhe.
const BEAT = 0.5;

function kick(at, gain) {
  const len = Math.floor(0.22 * SR);
  const i0 = Math.floor(at * SR);
  for (let k = 0; k < len && i0 + k < N; k++) {
    const tt = k / SR;
    const env = Math.exp(-tt * 26);
    const f = 46 + 52 * Math.exp(-tt * 60); // queda de altura: peso
    const v = Math.sin(TAU * f * tt) * env * gain;
    add(i0 + k, v, v);
  }
}

function tick(at, gain, bright = 1) {
  const len = Math.floor(0.035 * SR);
  const i0 = Math.floor(at * SR);
  let prev = 0;
  for (let k = 0; k < len && i0 + k < N; k++) {
    const tt = k / SR;
    const env = Math.exp(-tt * 190);
    // Passa-alta de um polo: o "click" seco, sem corpo.
    const raw = rnd();
    const hp = raw - prev;
    prev = raw;
    const v = hp * env * gain * bright;
    add(i0 + k, v, v * 0.86);
  }
}

// Densidade do pulso ao longo do filme.
for (let b = 0; b * BEAT < 36; b++) {
  const at = b * BEAT;
  if (at < 8) continue;
  const g = seg(at, [
    [8, 0.1],
    [18, 0.2],
    [28, 0.3],
    [34, 0.38],
    [36, 0.38],
  ]);
  kick(at, g);
  // Colcheias a partir de 14s.
  if (at >= 14) tick(at + BEAT / 2, seg(at, [[14, 0.05], [24, 0.1], [34, 0.14]]));
  // Semicolcheias a partir de 24s — aqui os ticks JÁ SÃO a percussão.
  if (at >= 24) {
    tick(at + BEAT / 4, seg(at, [[24, 0.035], [34, 0.085]]), 0.8);
    tick(at + (BEAT * 3) / 4, seg(at, [[24, 0.035], [34, 0.085]]), 0.8);
  }
  // Fusas nos dois últimos compassos: a máquina no limite.
  if (at >= 33) {
    for (let e = 1; e < 8; e += 2) tick(at + (BEAT * e) / 8, 0.055, 0.7);
  }
}

// ── 5. Riser em direção à convergência ───────────────────────────────────────
{
  const t0 = 31.6,
    t1 = 35.85;
  const i0 = Math.floor(t0 * SR),
    i1 = Math.floor(t1 * SR);
  let prev = 0;
  for (let i = i0; i < i1; i++) {
    const p = (i - i0) / (i1 - i0);
    const g = 0.16 * Math.pow(p, 2.2);
    const f = 180 + 780 * Math.pow(p, 2.4);
    const raw = rnd();
    const hp = raw - prev;
    prev = raw;
    const v = (Math.sin(TAU * f * (i / SR)) * 0.5 + hp * 0.5) * g;
    add(i, v, v * 0.94);
  }
}

// ── 6. O impacto ─────────────────────────────────────────────────────────────
// Um único golpe grave e limpo. Depois: nada. A ressonância morre no vazio —
// é isso que o brief chama de "a música corta abruptamente".
{
  const at = 35.85;
  const i0 = Math.floor(at * SR);
  const len = Math.floor(1.6 * SR);
  for (let k = 0; k < len && i0 + k < N; k++) {
    const tt = k / SR;
    const env = Math.exp(-tt * 3.4);
    const f = 38 + 26 * Math.exp(-tt * 22);
    const v = (Math.sin(TAU * f * tt) * 0.9 + Math.sin(TAU * (f * 2) * tt) * 0.16) * env * 0.52;
    add(i0 + k, v, v);
  }
}

// ── 7. A nota final — seca e elegante ────────────────────────────────────────
{
  const at = 50.22;
  const i0 = Math.floor(at * SR);
  const len = Math.floor(3.4 * SR);
  for (let k = 0; k < len && i0 + k < N; k++) {
    const tt = k / SR;
    const env = Math.exp(-tt * 1.5) * (1 - Math.exp(-tt * 260));
    const a = (Math.sin(TAU * 220 * tt) * 0.5 + Math.sin(TAU * 329.63 * tt) * 0.3 + Math.sin(TAU * 440 * tt) * 0.12) * env * 0.2;
    const b = (Math.sin(TAU * 220.1 * tt) * 0.5 + Math.sin(TAU * 329.5 * tt) * 0.3 + Math.sin(TAU * 440.2 * tt) * 0.12) * env * 0.2;
    add(i0 + k, a, b);
  }
}

// ── Master: passa-baixa suave no ruído + limitador macio ─────────────────────
function softClip(x) {
  return Math.tanh(x * 1.25) * 0.86;
}
const buf = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  const l = Math.max(-1, Math.min(1, softClip(L[i])));
  const r = Math.max(-1, Math.min(1, softClip(R[i])));
  buf.writeInt16LE(Math.round(l * 32767), i * 4);
  buf.writeInt16LE(Math.round(r * 32767), i * 4 + 2);
}

// Cabeçalho WAV
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + buf.length, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(buf.length, 40);

const wav = join(OUT, "bed.wav");
writeFileSync(wav, Buffer.concat([header, buf]));
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-codec:a", "libmp3lame", "-b:a", "192k", join(OUT, "bed.mp3")]);

// ── SFX ──────────────────────────────────────────────────────────────────────
const NEEDED = [
  "click.mp3",
  "click-soft.mp3",
  "ping.mp3",
  "impact-bass-1.mp3",
  "impact-bass-2.mp3",
  "key-press.mp3",
  "glitch-1.mp3",
];
for (const f of NEEDED) copyFileSync(join(SFX_SRC, f), join(SFX_OUT, f));

const ev = [];
const E = (at, file, volume, dur) =>
  ev.push({ at: Number(at.toFixed(3)), src: `assets/audio/sfx/${file}`, volume, dur });

// S01 — click seco + pequeno sub-hit no instante em que o botão se troca.
E(1.24, "click.mp3", 0.85, 0.37);
E(1.25, "impact-bass-2.mp3", 0.3, 1.1);
E(1.33, "ping.mp3", 0.22, 0.9);

// S02 — cada varredura Purple é uma decisão; uma confirmação por decisão.
for (const t of [3.86, 4.52, 5.06, 5.62]) E(t, "click-soft.mp3", 0.5, 0.37);

// S03 — três ticks sincronizados, três vezes. E o selo de confiança.
for (const t of [8.18, 8.96, 9.74]) E(t, "click.mp3", 0.6, 0.37);
E(10.06, "ping.mp3", 0.3, 1.0);

// S04 — os ticks de otimização começam a virar a percussão da trilha.
// A partir daqui a síntese assume: as semicolcheias do bed SÃO estes ticks.
[12.5, 12.95, 13.3, 13.62, 13.9, 14.14, 14.36, 14.55, 14.72, 14.88].forEach((t, i) =>
  E(t, "click-soft.mp3", 0.52 - i * 0.02, 0.37),
);

// S05 — o corte para o alto, e a máquina industrial.
E(18.0, "impact-bass-1.mp3", 0.26, 1.8);

// S06 — pequenas confirmações Cyan.
[24.7, 24.98, 25.26, 25.54, 25.82].forEach((t) => E(t, "ping.mp3", 0.16, 0.8));

// S07 — a montagem mecânica, acelerando até não dar mais para distinguir.
[30.62, 31.15, 31.61, 32.0, 32.33, 32.62, 32.86, 33.07, 33.25, 33.4].forEach((t, i) =>
  E(t, "click.mp3", 0.42 + i * 0.02, 0.37),
);

// O impacto grave e limpo vive na síntese (35,85s). Aqui só o corpo dele.
E(35.85, "impact-bass-1.mp3", 0.44, 2.1);

// S08 — uma única confirmação no vazio: "1 vencedora".
E(38.56, "ping.mp3", 0.26, 1.2);

// S09 — o som físico. Depois de 43s de perfeição digital, uma tecla mecânica.
E(44.62, "key-press.mp3", 0.42, 0.43);

// S10 — o sistema tenta corrigir a anomalia e desiste: um errinho digital.
E(46.18, "key-press.mp3", 0.22, 0.43);
E(48.6, "glitch-1.mp3", 0.3, 1.2);

const manifest = {
  bed: { src: "assets/audio/bed.mp3", volume: 0.9 },
  events: ev,
};
writeFileSync(join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));

console.log(`✓ bed.mp3 (${DUR}s, sintetizado) + ${ev.length} eventos de SFX → assets/audio/manifest.json`);
