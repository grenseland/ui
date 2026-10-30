import { useEffect, useState, type ReactNode } from "react";

export type Crumb = { label: string; href?: string };

export type AppShellProps = {
  brand: ReactNode;
  /** Rendered in the side menu and in the mobile drawer. */
  menu: ReactNode;
  menuFooter?: ReactNode;
  /** Extra content at the bottom of the drawer only, for what the top bar hides on small screens. */
  drawerFooter?: ReactNode;
  title: ReactNode;
  crumbs?: Crumb[];
  /** Tools in the top bar, next to the user. */
  tools?: ReactNode;
  /** The signed-in user. Required by the design rules, so an app without login states that here. */
  user: ReactNode;
  version: string;
  updatedAt: ReactNode;
  /** Extra content in the bottom bar. */
  footer?: ReactNode;
  /** Closes the drawer when this value changes. Pass the current route. */
  routeKey?: string;
  /** Stores whether the menu is collapsed. Leave out to keep it in memory only. */
  storageKey?: string;
  mainBusy?: boolean;
  children: ReactNode;
};

const Svg = (props: { d: string }) => (
  <svg className="ui-glyph" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={props.d} />
  </svg>
);

const GLYPHS = {
  menu: "M2 4h12M2 8h12M2 12h12",
  close: "M4 4l8 8M12 4l-8 8",
  collapse: "M10 3L5 8l5 5",
  expand: "M6 3l5 5-5 5",
};

function readCollapsed(key?: string): boolean {
  if (!key) return false;
  try {
    return localStorage.getItem(key) === "collapsed";
  } catch {
    return false;
  }
}

export function AppShell(props: AppShellProps) {
  const [collapsed, setCollapsed] = useState(() => readCollapsed(props.storageKey));
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setDrawer(false), [props.routeKey]);

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;
      try {
        if (props.storageKey) localStorage.setItem(props.storageKey, next ? "collapsed" : "expanded");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const collapseLabel = collapsed ? "Utvid sidemeny" : "Skjul sidemeny";

  return (
    <div className={`ui-shell${collapsed ? " is-collapsed" : ""}`}>
      <a
        className="ui-skip-link"
        href="#ui-main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("ui-main")?.focus();
        }}
      >
        Hopp til innhold
      </a>
      <aside className="ui-sidebar" aria-label="Navigasjon">
        <div className="ui-sidebar-inner">
          <div className="ui-brand">{props.brand}</div>
          <nav className="ui-menu" aria-label="Hovedmeny">
            {props.menu}
          </nav>
          <div className="ui-menu-footer">
            {props.menuFooter}
            <button type="button" className="ui-menu-item" onClick={toggleCollapsed} aria-pressed={collapsed} aria-label={collapseLabel} title={collapseLabel}>
              <Svg d={collapsed ? GLYPHS.expand : GLYPHS.collapse} />
              <span>Skjul meny</span>
            </button>
          </div>
        </div>
      </aside>
      {drawer ? (
        <div className="ui-drawer">
          <button type="button" className="ui-drawer-mask" aria-label="Lukk meny" onClick={() => setDrawer(false)} />
          <aside className="ui-drawer-panel" aria-label="Navigasjon">
            <div className="ui-drawer-head">
              <div className="ui-brand">{props.brand}</div>
              <button type="button" className="ui-icon-button" onClick={() => setDrawer(false)} aria-label="Lukk meny">
                <Svg d={GLYPHS.close} />
              </button>
            </div>
            <div className="ui-sidebar-inner">
              <nav className="ui-menu" aria-label="Hovedmeny">
                {props.menu}
              </nav>
              {props.menuFooter || props.drawerFooter ? (
                <div className="ui-menu-footer">
                  {props.menuFooter}
                  {props.drawerFooter}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}
      <header className="ui-topbar">
        <button type="button" className="ui-icon-button ui-menu-button" aria-label="Åpne meny" aria-expanded={drawer} onClick={() => setDrawer(true)}>
          <Svg d={GLYPHS.menu} />
        </button>
        <div className="ui-title">
          {props.crumbs && props.crumbs.length > 0 ? (
            <div className="ui-crumbs">
              {props.crumbs.map((crumb) => (
                <span key={crumb.label}>{crumb.href ? <a href={crumb.href}>{crumb.label}</a> : crumb.label}</span>
              ))}
            </div>
          ) : null}
          <h1>{props.title}</h1>
        </div>
        <div className="ui-topbar-right">
          {props.tools}
          {props.user}
        </div>
      </header>
      <main id="ui-main" className="ui-main" tabIndex={-1} aria-busy={props.mainBusy}>
        {props.children}
      </main>
      <footer className="ui-bottombar">
        <span className="ui-version">{props.version}</span>
        {props.footer}
        <span className="ui-updated">{props.updatedAt}</span>
      </footer>
    </div>
  );
}

export function MenuGroup(props: { label?: string; children: ReactNode }) {
  return (
    <div className="ui-menu-group">
      {props.label ? <p className="ui-menu-label">{props.label}</p> : null}
      {props.children}
    </div>
  );
}

export function MenuLink(props: { href: string; label: string; icon?: ReactNode; current?: boolean; badge?: ReactNode; className?: string }) {
  return (
    <a
      className={["ui-menu-item", props.className].filter(Boolean).join(" ")}
      href={props.href}
      aria-current={props.current ? "page" : undefined}
      title={props.label}
    >
      {props.icon}
      <span>{props.label}</span>
      {props.badge}
    </a>
  );
}
