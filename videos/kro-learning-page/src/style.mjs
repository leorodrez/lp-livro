import { C } from "./tokens.mjs";
import { PAGE_W, PAGE_H } from "./lp.mjs";

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" seed="7"/><feColorMatrix type="saturate" values="0"/></filter><rect width="220" height="220" filter="url(#n)" opacity="0.5"/></svg>`,
  );

export const css = `
*{margin:0;padding:0;box-sizing:border-box}
#root{position:relative;width:1920px;height:1080px;overflow:hidden;background:${C.bg};
  font-family:"Manrope","Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased}
.clip{position:absolute;inset:0}

/* ── environment ─────────────────────────────────────────────── */
.env{position:absolute;inset:0;background:${C.bg}}
.env-pool{position:absolute;inset:0;
  background:
    radial-gradient(1200px 720px at 50% 42%, ${C.envLift} 0%, rgba(22,24,29,0) 68%),
    radial-gradient(1500px 900px at 50% 120%, ${C.envDeep} 0%, rgba(8,9,11,0) 62%)}
.env-accent{position:absolute;inset:0;opacity:0;
  background:radial-gradient(760px 520px at 50% 46%, rgba(124,58,237,.20) 0%, rgba(124,58,237,0) 70%)}
.vignette{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(1400px 900px at 50% 46%, rgba(0,0,0,0) 44%, rgba(0,0,0,.55) 100%)}
.grain{position:absolute;inset:-40px;pointer-events:none;opacity:.038;
  background-image:url("${GRAIN}");background-size:220px 220px;mix-blend-mode:overlay}

/* ── camera / depth ──────────────────────────────────────────── */
.stage{position:absolute;inset:0;perspective:2400px;perspective-origin:50% 46%}
.world{position:absolute;inset:0;transform-style:preserve-3d}
.slot{position:absolute;left:50%;top:50%;width:${PAGE_W}px;height:${PAGE_H}px;
  margin-left:-${PAGE_W / 2}px;margin-top:-${PAGE_H / 2}px;transform-style:preserve-3d}

/* ── the landing page (surface B — light, product UI) ────────── */
.page{position:relative;width:${PAGE_W}px;height:${PAGE_H}px;border-radius:10px;overflow:hidden;
  background:${C.pageCanvas};color:${C.pageInk};
  box-shadow:0 42px 90px -30px rgba(0,0,0,.78), 0 4px 18px rgba(0,0,0,.4);
  font-family:"Manrope","Helvetica Neue",Arial,sans-serif}
.page-ground{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:linear-gradient(180deg, rgba(255,255,255,.72) 0%, rgba(255,255,255,0) 38%)}
.page>*:not(.page-ground){position:relative;z-index:1}

.lp-nav{height:62px;display:flex;align-items:center;justify-content:space-between;
  padding:0 44px;border-bottom:1px solid ${C.pageLine}}
.lp-mark{display:flex;align-items:center;gap:9px;font-family:"Sora",sans-serif;font-weight:700;
  font-size:18px;letter-spacing:-.015em}
.lp-mark-dot{width:11px;height:11px;border-radius:50%;border:2.5px solid ${C.pageInk};display:block}
.lp-links{display:flex;gap:26px;font-size:13px;font-weight:500;color:${C.pageMuted}}
.lp-nav-right{display:flex;align-items:center;gap:16px}
.lp-signin{font-size:13px;font-weight:600}
.lp-nav-cta{font-size:13px;font-weight:700;color:${C.pageCanvas};background:${C.pageInk};
  padding:9px 16px;border-radius:100px;white-space:nowrap}

.lp-hero{display:flex;gap:40px;padding:40px 44px 34px}
.lp-hero-left{width:700px;flex:none}
.lp-eyebrow{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:${C.pageMuted};margin-bottom:16px}
.lp-headline{height:96px;font-family:"Sora",sans-serif;font-weight:700;font-size:40px;
  line-height:1.15;letter-spacing:-.028em;color:${C.pageInk};overflow:hidden}
.lp-headline-text{display:block}
.lp-sub{margin-top:12px;width:600px;height:48px;font-size:15.5px;line-height:1.55;color:${C.pageMuted}}
.lp-cta-row{margin-top:22px;display:flex;gap:14px;align-items:center}
.lp-cta-primary{font-size:14px;font-weight:700;color:${C.pageCanvas};background:${C.pageInk};
  padding:13px 24px;border-radius:100px;white-space:nowrap}
.lp-cta-ghost{font-size:14px;font-weight:600;padding:13px 18px;border-radius:100px;
  border:1px solid rgba(20,22,26,.18);white-space:nowrap}

.lp-hero-right{flex:1;display:flex;align-items:flex-start}
.lp-ops{width:100%;background:${C.pageSurface};border:1px solid ${C.pageLine};border-radius:14px;
  padding:18px 20px 16px}
.lp-ops-head{display:flex;justify-content:space-between;align-items:center;font-size:12.5px;
  font-weight:700;color:${C.pageInk};margin-bottom:16px}
.lp-ops-chip{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  color:${C.pageMuted};background:${C.pageSunk};padding:4px 9px;border-radius:100px}
.lp-ops-row{margin-bottom:14px}
.lp-ops-row-top{display:flex;justify-content:space-between;font-size:12.5px;color:${C.pageInk};
  margin-bottom:7px}
.lp-ops-state{color:${C.pageMuted};font-weight:600}
.lp-ops-bar{height:5px;border-radius:6px;background:${C.pageSunk};overflow:hidden}
.lp-ops-bar>i{display:block;height:100%;border-radius:6px;background:${C.pageInk};opacity:.72}
.lp-ops-foot{display:flex;justify-content:space-between;font-size:11.5px;color:${C.pageMuted};
  padding-top:12px;border-top:1px solid ${C.pageLine}}

.lp-rule{height:1px;background:${C.pageLine};margin:0 44px}
.lp-benefits{display:flex;gap:34px;padding:28px 44px}
.lp-benefit{flex:1}
.lp-benefit-mark{display:block;width:22px;height:3px;border-radius:2px;background:${C.pageInk};
  opacity:.85;margin-bottom:13px}
.lp-benefit-title{font-family:"Sora",sans-serif;font-weight:600;font-size:15px;letter-spacing:-.01em;
  margin-bottom:7px}
.lp-benefit-desc{font-size:12.8px;line-height:1.5;color:${C.pageMuted}}

.lp-proof{padding:24px 44px}
.lp-proof-line{font-size:13px;font-weight:600;color:${C.pageInk};margin-bottom:16px}
.lp-proof-logos{display:flex;gap:36px;font-family:"Sora",sans-serif;font-size:13px;font-weight:700;
  letter-spacing:.06em;color:${C.pageMuted}}

/* ── KRO layer (surface A — purple = KRO acting) ─────────────── */
.selbox{position:absolute;pointer-events:none}
.selbox-edge{position:absolute;inset:0;border:1px solid rgba(124,58,237,.32);border-radius:4px}
.selbox-c{position:absolute;width:18px;height:18px;border:2px solid ${C.primary}}
.selbox-c.tl{left:-2px;top:-2px;border-right:0;border-bottom:0}
.selbox-c.tr{right:-2px;top:-2px;border-left:0;border-bottom:0}
.selbox-c.bl{left:-2px;bottom:-2px;border-right:0;border-top:0}
.selbox-c.br{right:-2px;bottom:-2px;border-left:0;border-top:0}
.selbox-tag{position:absolute;right:-2px;top:-27px;font-size:10.5px;font-weight:800;letter-spacing:.1em;
  text-transform:uppercase;color:#fff;background:${C.primaryDeep};padding:4px 8px;border-radius:4px;
  white-space:nowrap}

.kpanel{position:absolute;width:392px;background:${C.envLift};border:1px solid rgba(245,242,236,.09);
  border-radius:14px;padding:18px 20px 16px;color:${C.text};
  box-shadow:0 28px 70px -26px rgba(0,0,0,.85);transform-origin:left center}
.kpanel-head{display:flex;align-items:center;justify-content:space-between;
  padding-bottom:14px;border-bottom:1px solid rgba(245,242,236,.08)}
.kpanel-logo{height:14px;width:auto;display:block;opacity:.95}
.kpanel-role{font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  color:${C.textLight}}
.kpanel-label{margin-top:14px;font-size:10px;font-weight:700;letter-spacing:.13em;
  text-transform:uppercase;color:${C.textLight}}
.kpanel-el{margin-top:7px;font-size:13px;line-height:1.45;color:${C.text};font-weight:500}
.kpanel-count{margin-top:14px;padding-top:12px;border-top:1px solid rgba(245,242,236,.08);
  display:flex;justify-content:space-between;align-items:baseline;font-size:11.5px;
  font-weight:600;color:${C.textMuted}}
.kpanel-count b{font-family:"Sora",sans-serif;font-size:20px;font-weight:700;color:${C.primary};
  font-variant-numeric:tabular-nums}

.kchip{position:absolute;display:flex;align-items:center;gap:8px;background:${C.envLift};
  border:1px solid rgba(124,58,237,.38);border-radius:100px;padding:7px 14px 7px 11px;
  font-size:11.5px;font-weight:700;color:${C.text};white-space:nowrap}
.kchip i{display:block;width:6px;height:6px;border-radius:50%;background:${C.primary}}
.kchip b{font-family:"Sora",sans-serif;font-variant-numeric:tabular-nums;color:${C.primary}}

/* hypothesis branch */
.hyp{position:absolute;width:434px;transform-origin:left center;padding:16px 18px;border-radius:10px;
  background:${C.envLift};border:1px solid rgba(124,58,237,.42);
  box-shadow:0 24px 56px -22px rgba(0,0,0,.85);
  font-family:"Sora",sans-serif;font-size:16px;line-height:1.34;font-weight:600;
  letter-spacing:-.012em;color:${C.text}}
.hyp-mask{display:block;overflow:hidden}
.hyp-mask>span{display:block}
.hyp.mini{width:308px;padding:11px 13px;font-size:13.5px;line-height:1.3}
.hyp.win{border-color:${C.data};box-shadow:0 0 0 1px rgba(6,182,212,.30), 0 24px 56px -22px rgba(0,0,0,.85)}
.hyp-tag{position:absolute;right:14px;top:-9px;font-size:9.5px;font-weight:800;letter-spacing:.12em;
  text-transform:uppercase;color:#fff;background:${C.primaryDeep};padding:3px 7px;border-radius:3px}
.branch{position:absolute;overflow:visible}
.branch path{fill:none;stroke:${C.primary};stroke-width:1.6;opacity:.72}

/* ── data (cyan = behaviour) ─────────────────────────────────── */
.mstack{position:absolute;width:236px}
.mstack-head{display:flex;align-items:baseline;gap:9px;padding-bottom:9px;
  border-bottom:1px solid rgba(245,242,236,.10)}
.mstack-v{font-family:"Sora",sans-serif;font-size:13px;font-weight:700;color:${C.text};
  letter-spacing:.02em}
.mstack-h{font-size:10.5px;color:${C.textLight};white-space:nowrap;overflow:hidden;
  text-overflow:ellipsis;max-width:160px}
.mrow{display:flex;justify-content:space-between;align-items:baseline;margin-top:9px}
.mrow-k{font-size:10.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;
  color:${C.textLight}}
.mrow-n{font-family:"Sora",sans-serif;font-size:17px;font-weight:700;color:${C.data};
  font-variant-numeric:tabular-nums;letter-spacing:-.01em}
.mbar{height:3px;border-radius:3px;background:rgba(245,242,236,.10);margin-top:8px;overflow:hidden}
.mbar>i{display:block;height:100%;border-radius:3px;background:${C.data};transform-origin:left center}
.mstack.is-winner .mrow-n{color:${C.data}}

.vlabel{position:absolute;text-align:center;width:200px}
.vlabel-v{font-family:"Sora",sans-serif;font-size:12.5px;font-weight:700;letter-spacing:.1em;
  color:${C.text}}
.vlabel-h{margin-top:5px;font-size:10.5px;line-height:1.35;color:${C.textLight}}

/* ── behaviour markers ──────────────────────────────────────── */
.mk{position:absolute;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;
  border:1.4px solid rgba(245,242,236,.55)}
.mk.is-conv{border-color:${C.data};background:rgba(6,182,212,.28)}
.trail{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
.trail path{fill:none;stroke:rgba(245,242,236,.30);stroke-width:1.1;stroke-linecap:round}
.cursor{position:absolute;width:20px;height:26px;margin:-2px 0 0 -2px}
.sig{position:absolute;width:3px;height:3px;border-radius:50%;background:${C.primary};
  margin:-1.5px 0 0 -1.5px}

/* ── editorial typography (surface A) ───────────────────────── */
.ed{position:absolute;font-family:"Sora",sans-serif;font-weight:400;font-size:46px;line-height:1.24;
  letter-spacing:-.024em;color:${C.textMuted};max-width:1120px}
.ed b{font-weight:700;color:${C.text}}
.ed.k b{color:${C.primary}}
.ed.sm{font-size:34px;line-height:1.3;max-width:620px}
.ed-enum{position:absolute;font-family:"Sora",sans-serif;font-size:23px;font-weight:600;
  letter-spacing:-.012em;color:${C.textLight};max-width:520px;line-height:1.5}
.ed-enum span{transition:none}
.ed-enum span.on{color:${C.text}}

/* ── end card ───────────────────────────────────────────────── */
.end-logo{position:absolute;left:50%;width:430px;margin-left:-215px}
.end-logo img{width:100%;display:block}
.end-prop{position:absolute;left:50%;width:900px;margin-left:-450px;text-align:center;
  font-family:"Sora",sans-serif;font-size:31px;line-height:1.42;font-weight:400;
  letter-spacing:-.02em;color:${C.textMuted}}
.end-prop b{font-weight:600;color:${C.text}}
.end-rule{position:absolute;left:50%;width:64px;margin-left:-32px;height:1px;
  background:rgba(245,242,236,.20)}
.end-cta{position:absolute;left:50%;width:900px;margin-left:-450px;text-align:center;
  font-family:"Sora",sans-serif;font-size:25px;font-weight:700;letter-spacing:-.015em;color:${C.text}}
.end-dom{position:absolute;left:50%;width:900px;margin-left:-450px;text-align:center;
  font-size:14px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${C.textLight}}
`;
