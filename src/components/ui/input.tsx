import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-border/60 bg-background/40 px-4 py-2 text-sm shadow-sm outline-none",
        "placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30 focus:border-border",
        className
      )}
      {...props}
    />
  );
}
