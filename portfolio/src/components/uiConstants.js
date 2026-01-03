export const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

export const FG = "rgba(235,235,235,0.92)";
export const PANEL_BG = "rgba(0, 0, 0, 0.82)";
export const BORDER = "1px solid rgba(255,255,255,0.14)";

export const PANEL_SHADOW =
  "0 18px 55px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset";

// GitHub Pages safe asset helper for files placed in /public
export const BASE_URL = import.meta.env.BASE_URL;

export function asset(path) {
  const clean = String(path || "").replace(/^\//, "");
  return `${BASE_URL}${clean}`;
}

export function assets(paths) {
  return (paths || []).map(asset);
}
