import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { SocialChips } from "@/components/shared/social-chips";
import type { Profile } from "@/lib/profile";
import { getHeroCopy } from "@/data/hero";
import { cn } from "@/lib/utils";

type Props = {
  profile?: Profile | null;
  id?: string;
  className?: string;
};

export function HeroSection({ profile, id, className }: Props) {
  const heroCopy = getHeroCopy(profile);
  const upworkUrl =
    profile === "web"
      ? heroCopy.links.upwork.web
      : heroCopy.links.upwork.finance;

  return (
    <section
      id={id}
      className={cn("pt-2 pb-10 md:pt-3 md:pb-12", className)}
    >
      <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-primary/20" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl bg-primary/15" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* <a
            href={heroCopy.links.pseb}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/60
             bg-muted/40 px-3 py-1 text-sm text-muted-foreground
             hover:bg-muted/60 hover:text-foreground hover:-translate-y-[1px]
             transition-all w-fit"
          >
            <span>{heroCopy.psebLabel}</span>
            <ExternalLink className="h-4 w-4 opacity-70" />
          </a> */}

          <div className="space-y-5 md:flex-1">
            <h1
              className={cn(
                "font-semibold tracking-tight leading-tight max-w-3xl",
                profile === "finance" ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"
              )}
            >
            {heroCopy.heading.prefix}
            <span className="text-primary">{heroCopy.heading.highlight}</span>
            {heroCopy.heading.suffix}
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {heroCopy.intro}
          </p>

          <div className="flex flex-wrap gap-2">
            {heroCopy.techBadges.map((t) => (
              <Badge
                key={t}
                variant="outline"
                  className="rounded-full border-border/60 bg-black/10"
                >
                  {t}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild variant="outline" className="rounded-xl">
                <a
                  href={heroCopy.links.calendly}
                  target="_blank"
                  rel="noreferrer"
                >
                {heroCopy.buttons.call}
                </a>
              </Button>

              <Button asChild variant="secondary" className="rounded-xl">
                <a href={upworkUrl} target="_blank" rel="noreferrer">
                {heroCopy.buttons.upwork}
                </a>
              </Button>

              <Badge
                variant="outline"
                className="rounded-full border-border/60 bg-black/10"
              >
              {heroCopy.availability}
            </Badge>
            </div>
            <SocialChips
              className="pt-2"
              compact
              variant="primary"
              showTooltipValue
            />
          </div>

          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:mx-0 md:w-[300px] lg:w-[360px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/60 bg-black/20 shadow-2xl">
              <img
                src="/images/display.png"
                alt="Huzaifa portrait"
                className="h-full w-full object-cover object-[55%_center]"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-3xl bg-primary/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
