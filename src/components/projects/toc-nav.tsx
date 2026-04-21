"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; label: string };

type Props = {
  items: TocItem[];
  className?: string;
};

export function TocNav({ items, className }: Props) {
  const onClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const el = document.getElementById(id);
    if (!el) return;

    // update hash without instant jump
    history.replaceState(null, "", `#${id}`);

    // smooth animated scroll
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={cn("space-y-1", className)}>
      {items.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          onClick={onClick(t.id)}
          className="block text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg px-2 py-1 hover:bg-muted"
        >
          {t.label}
        </a>
      ))}
    </nav>
  );
}
