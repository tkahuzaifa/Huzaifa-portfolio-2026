"use client";

import * as React from "react";
import { allSocials, primarySocials } from "@/data/socials";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  className?: string;
  compact?: boolean;
  variant?: "primary" | "all";
  showTooltipValue?: boolean; // 👈 new
};

export function SocialChips({
  className,
  compact,
  variant = "all",
  showTooltipValue = false,
}: Props) {
  const list = variant === "primary" ? primarySocials : allSocials;

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn("flex flex-wrap gap-2", className)}>
        {list.map((s) => {
          const Icon = s.icon;
          const isClickable = s.href && s.href !== "#";

          const base =
            "inline-flex items-center gap-2 rounded-full border transition-all " +
            "backdrop-blur supports-[backdrop-filter]:bg-background/40";

          const size = compact ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-sm";

          const style =
            "border-border/60 bg-muted/40 text-muted-foreground " +
            "hover:bg-muted/60 hover:text-foreground hover:border-border " +
            "hover:-translate-y-[1px] active:translate-y-0";

          const content = (
            <>
              <Icon
                className={cn(
                  compact ? "h-3.5 w-3.5" : "h-4 w-4",
                  "opacity-80"
                )}
              />
              <span className={cn("truncate")}>{s.title}</span>
            </>
          );

          const chip = isClickable ? (
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={cn(base, size, style)}
              aria-label={s.title}
            >
              {content}
            </a>
          ) : (
            <span
              className={cn(
                base,
                size,
                "border-border/50 bg-muted/30 text-muted-foreground"
              )}
              aria-label={s.title}
            >
              {content}
            </span>
          );

          if (!showTooltipValue)
            return <React.Fragment key={s.id}>{chip}</React.Fragment>;

          // Tooltip shows the actual value (email/phone/username/etc.)
          const tooltipText =
            s.title === "Upwork" ? "Open Upwork profile" : s.value;

          return (
            <Tooltip key={s.id}>
              <TooltipTrigger asChild>{chip}</TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
