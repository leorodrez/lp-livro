// Design tokens — mirrors frame.md frontmatter. Never invent a colour here.
export const C = {
  bg: "#0E0F12",
  envDeep: "#08090B",
  envLift: "#16181D",
  text: "#F5F2EC",
  textMuted: "#9AA1AC",
  textLight: "#868C96",
  primary: "#7C3AED",
  primaryDeep: "#5B21B6", // shade of the same accent, for white-on-purple chips

  data: "#06B6D4",
  pageCanvas: "#F5F2EC",
  pageInk: "#14161A",
  pageMuted: "#3C4149",
  pageLine: "rgba(20,22,26,0.10)",
  pageSurface: "#FFFFFF",
  pageSunk: "#ECE7DE",
};

// The one fictional landing page the whole film experiments on.
export const BRAND = "Vértice";

export const HEADLINES = {
  v1: "Simplifique a gestão da sua empresa.",
  v2: "Tenha mais controle da sua empresa sem aumentar a complexidade.",
  v3: "Menos operação. Mais tempo para fazer sua empresa crescer.",
  v4: "Sua gestão pode ser muito mais simples do que parece.",
};

export const VARIANTS = [
  { key: "v1", label: "V1", tag: "controle", headline: HEADLINES.v1 },
  { key: "v2", label: "V2", tag: "hipótese", headline: HEADLINES.v2 },
  { key: "v3", label: "V3", tag: "hipótese", headline: HEADLINES.v3 },
  { key: "v4", label: "V4", tag: "hipótese", headline: HEADLINES.v4 },
];

// Deterministic demo figures. Fair traffic split first, response diverges after.
// No uplift percentage is ever derived or shown from these.
export const METRICS = {
  v1: { visitors: 1284, clicks: 96, signups: 31 },
  v2: { visitors: 1207, clicks: 118, signups: 45 },
  v3: { visitors: 1196, clicks: 174, signups: 68 },
  v4: { visitors: 1233, clicks: 84, signups: 27 },
};
export const WINNER = "v3";

// Copy for the secondary experiments replayed in the learning loop (frame 09).
export const CTA_VARIANTS = ["Começar agora", "Testar por 14 dias", "Ver funcionando"];
export const BENEFIT_VARIANTS = ["Financeiro unificado", "O mês fecha sozinho", "Menos planilha, mais decisão"];
export const PROOF_VARIANTS = ["Mais de 2.400 empresas já operam no Vértice", "2.400 empresas, uma operação só", "Times inteiros saíram da planilha"];
