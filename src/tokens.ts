/** Reads a CSS variable from the document root. */
export function readToken(name: string, fallback = ""): string {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/** Reads a pixel value, for canvas drawing where CSS variables cannot be used. */
export function readTokenPx(name: string, fallback: number): number {
  const value = Number.parseFloat(readToken(name));
  return Number.isFinite(value) ? value : fallback;
}
