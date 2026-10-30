import { createElement, type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from "react";
import { byPosition, tabletSpan } from "./grid";

function classes(...names: (string | false | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}

export type WidgetProps = Omit<ComponentPropsWithoutRef<"form">, "title"> & {
  as?: "section" | "div" | "form";
};

/** The one frame for all content. Projects style it with variables, not variants. */
export function Widget({ as = "section", className, children, ...rest }: WidgetProps) {
  return createElement(as, { ...rest, className: classes("ui-widget", className) }, children);
}

export type WidgetHeaderProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
  title: ReactNode;
  /** Hover text on the title, for titles that may be cut off. */
  titleText?: string;
  leading?: ReactNode;
  note?: ReactNode;
  /** Tools that stay hidden until the widget is hovered or focused. */
  tools?: ReactNode;
};

/** The one heading for all widgets. Anything in children sits to the right of the title. */
export function WidgetHeader({ title, titleText, leading, note, tools, className, children, ...rest }: WidgetHeaderProps) {
  return (
    <div {...rest} className={classes("ui-widget-header", className)}>
      {leading}
      <h2 className="ui-widget-title" title={titleText}>
        {title}
      </h2>
      {note ? <span className="ui-widget-note">{note}</span> : null}
      {children}
      {tools ? <span className="ui-widget-tools">{tools}</span> : null}
    </div>
  );
}

export function WidgetContent({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div {...rest} className={classes("ui-widget-content", className)} />;
}

export function WidgetFooter({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div {...rest} className={classes("ui-widget-footer", className)} />;
}

export type WidgetStateProps = {
  state: "loading" | "empty" | "error";
  icon?: ReactNode;
  title?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Loading, empty and error look the same in every widget. */
export function WidgetState(props: WidgetStateProps) {
  if (props.state === "loading") {
    return (
      <div className={classes("ui-widget-state", props.className)} aria-busy="true">
        <span className="ui-skeleton is-title" aria-hidden="true" />
        <span className="ui-skeleton is-long" aria-hidden="true" />
        <span className="ui-skeleton is-short" aria-hidden="true" />
        <span className="ui-sr-only">{props.children ?? "Laster …"}</span>
      </div>
    );
  }
  return (
    <div className={classes("ui-widget-state", props.state === "error" && "is-error", props.className)} role={props.state === "error" ? "alert" : undefined}>
      {props.icon}
      {props.title ? <b>{props.title}</b> : null}
      {props.children ? <span>{props.children}</span> : null}
      {props.action}
    </div>
  );
}

export type GridPosition = { x?: number; y?: number; w: number; h: number };

export function WidgetGrid({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div {...rest} className={classes("ui-grid", className)} />;
}

export function WidgetGridItem({ position, className, style, ...rest }: ComponentPropsWithoutRef<"div"> & { position: GridPosition }) {
  const { x, y, w, h } = position;
  const placed = x != null && y != null;
  const vars = {
    ...style,
    "--grid-w": w,
    "--grid-h": h,
    "--grid-w-tablet": tabletSpan(w),
    ...(placed ? { "--grid-x": x + 1, "--grid-y": y + 1 } : null),
  } as CSSProperties;
  return <div {...rest} style={vars} className={classes("ui-grid-item", placed && "is-placed", className)} />;
}

export { byPosition };
