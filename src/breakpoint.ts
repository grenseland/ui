import { useSyncExternalStore } from "react";
import { BREAKPOINTS } from "./grid";

export type Breakpoint = "mobile" | "tablet" | "desktop";

const MOBILE = `(max-width: ${BREAKPOINTS.tablet - 1}px)`;
const TABLET = `(max-width: ${BREAKPOINTS.desktop - 1}px)`;

function subscribe(onChange: () => void): () => void {
  const queries = [window.matchMedia(MOBILE), window.matchMedia(TABLET)];
  for (const query of queries) query.addEventListener("change", onChange);
  return () => {
    for (const query of queries) query.removeEventListener("change", onChange);
  };
}

function current(): Breakpoint {
  if (window.matchMedia(MOBILE).matches) return "mobile";
  return window.matchMedia(TABLET).matches ? "tablet" : "desktop";
}

/** The current screen size, using the same breakpoints as the CSS. */
export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, current, () => "desktop");
}
