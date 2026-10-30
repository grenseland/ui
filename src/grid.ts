export const BREAKPOINTS = { tablet: 768, desktop: 1024 } as const;

export const GRID_COLUMNS = { desktop: 12, tablet: 6, mobile: 1 } as const;

/** Columns a widget takes on a tablet, given its width in the 12-column desktop grid. */
export function tabletSpan(desktopWidth: number): number {
  const span = Math.ceil(desktopWidth / 2);
  return Math.min(Math.max(span, 1), GRID_COLUMNS.tablet);
}

/** Reading order for the smaller grids, where items flow instead of keeping their position. */
export function byPosition<T extends { x: number; y: number }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.y - b.y || a.x - b.x);
}
