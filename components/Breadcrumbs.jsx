import React from "react";
import { Icon } from "./Icon.jsx";

export function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-espresso-muted">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={it.path || it.name}>
            {last || !it.path ? (
              <span className={last ? "font-medium text-espresso" : ""}>{it.name}</span>
            ) : (
              <a href={it.path} className="transition-colors hover:text-clay">
                {it.name}
              </a>
            )}
            {!last && <Icon name="arrow" className="h-3.5 w-3.5 text-espresso-muted/60" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
