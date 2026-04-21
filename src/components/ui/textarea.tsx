import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm shadow-sm outline-none",
        "placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30 focus:border-border",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
