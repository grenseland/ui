import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { BREAKPOINTS } from "./grid";

export type DataTableProps = {
  /** Columns shown on mobile, counted from the left. The rest open when the row is pressed. */
  primary?: 1 | 2 | 3;
  className?: string;
  /** thead and tbody of a normal table. */
  children: ReactNode;
};

const INTERACTIVE = "a, button, input, select, textarea, label";

function isMobile(): boolean {
  return window.matchMedia(`(max-width: ${BREAKPOINTS.tablet - 1}px)`).matches;
}

function toggle(row: HTMLTableRowElement, primary: number) {
  if (!isMobile() || row.cells.length <= primary) return;
  const open = row.dataset.open === "true";
  row.dataset.open = String(!open);
  row.setAttribute("aria-expanded", String(!open));
}

/** A table that never scrolls sideways on mobile: extra columns move into the row when it is opened. */
export function DataTable({ primary = 2, className, children }: DataTableProps) {
  const table = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const element = table.current;
    if (!element) return;
    const label = () => {
      const headers = [...(element.tHead?.rows[0]?.cells ?? [])].map((cell) => cell.textContent?.trim() ?? "");
      for (const body of element.tBodies) {
        for (const row of body.rows) {
          if (row.cells.length > primary) row.tabIndex = isMobile() ? 0 : -1;
          [...row.cells].forEach((cell, index) => {
            const header = headers[index];
            if (header && !cell.dataset.label) cell.dataset.label = header;
          });
        }
      }
    };
    label();
    const observer = new MutationObserver(label);
    observer.observe(element, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [primary]);

  function onClick(event: MouseEvent<HTMLTableElement>) {
    const target = event.target as HTMLElement;
    if (target.closest(INTERACTIVE)) return;
    const row = target.closest("tbody tr");
    if (row) toggle(row as HTMLTableRowElement, primary);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTableElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target as HTMLElement;
    if (target.tagName !== "TR") return;
    event.preventDefault();
    toggle(target as HTMLTableRowElement, primary);
  }

  return (
    <div className="ui-table-wrap">
      <table ref={table} className={["ui-table", `ui-table-primary-${primary}`, className].filter(Boolean).join(" ")} onClick={onClick} onKeyDown={onKeyDown}>
        {children}
      </table>
    </div>
  );
}
