"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Code, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PROFILE_OPTIONS,
  PROFILE_QUERY_KEY,
  normalizeProfile,
  type Profile,
} from "@/lib/profile";

type Props = {
  className?: string;
  compact?: boolean;
  stretch?: boolean;
  iconOnly?: boolean;
  onChange?: () => void;
};

const PROFILE_ICONS = {
  finance: Landmark,
  web: Code,
} as const;

export function ProfileSwitcher({
  className,
  compact = false,
  stretch = false,
  iconOnly = false,
  onChange,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const profile = normalizeProfile(searchParams.get(PROFILE_QUERY_KEY));

  function handleSelect(nextProfile: Profile) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(PROFILE_QUERY_KEY, nextProfile);
    const query = params.toString();
    const hash =
      typeof window !== "undefined" && window.location.hash
        ? window.location.hash
        : "";

    router.push(`${pathname}${query ? `?${query}` : ""}${hash}`);
    onChange?.();
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-border/60 bg-muted/40 p-1",
        className
      )}
    >
      {PROFILE_OPTIONS.map((option) => {
        const isActive = profile === option.value;
        const Icon = PROFILE_ICONS[option.value];
        return (
          <Button
            key={option.value}
            type="button"
            size={iconOnly ? "icon-sm" : "sm"}
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              iconOnly ? "rounded-lg" : "h-8 rounded-lg px-3",
              stretch && !iconOnly ? "flex-1" : "",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
            aria-label={iconOnly ? option.label : undefined}
            aria-pressed={isActive}
            onClick={() => handleSelect(option.value)}
          >
            {iconOnly ? (
              <>
                <Icon className="h-4 w-4" />
                <span className="sr-only">{option.label}</span>
              </>
            ) : compact ? (
              option.shortLabel
            ) : (
              option.label
            )}
          </Button>
        );
      })}
    </div>
  );
}
