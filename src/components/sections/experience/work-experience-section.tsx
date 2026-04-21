"use client";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import {
  filterExperiencesByCategory,
  formatExperienceTimePeriod,
  getExperienceCompanyLabel,
  usePortfolioExperiences,
} from "@/lib/experience-store";
import type { Profile } from "@/lib/profile";
import { renderRichTextToHtml } from "@/lib/rich-text";

type WorkExperienceSectionProps = {
  profile: Profile;
};

export function WorkExperienceSection({ profile }: WorkExperienceSectionProps) {
  const { items } = usePortfolioExperiences();
  const filteredItems = filterExperiencesByCategory(items, profile);
  const isFinance = profile === "finance";

  if (!filteredItems.length) return null;

  return (
    <section id="experience" className="scroll-mt-24 space-y-8">
      <SectionHeader
        eyebrow={
          isFinance
            ? "6+ years in Reporting, Bookkeeping, AP/AR & Financial Statement Preparation."
            : "Hands-on delivery across web development projects and client implementations."
        }
        title={isFinance ? "Work experience" : "Web development experience"}
        subtitle="Impact-focused timeline — highlights that signal senior ownership, architecture, and execution."
      />

      <div className="space-y-4">
        {filteredItems.map((e) => (
          <div key={e.id} className="group glass rounded-3xl p-6 md:p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-3">
                {e.logo ? (
                  <div className="relative h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-[1px] shadow-[0_10px_24px_-14px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:shadow-[0_16px_28px_-14px_rgba(0,0,0,0.75)]">
                    <div className="h-full w-full rounded-[calc(theme(borderRadius.xl)-1px)] border border-border/50 bg-background/75 p-2 backdrop-blur-md">
                      <img
                        src={e.logo}
                        alt={`${e.company} logo`}
                        className="h-full w-full object-contain saturate-110 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                ) : null}
                <div className="space-y-1">
                  <div className="text-lg font-semibold tracking-tight">
                    {e.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getExperienceCompanyLabel(e)}
                  </div>
                </div>
              </div>

              <Badge variant="secondary" className="rounded-full w-fit">
                {formatExperienceTimePeriod(e)}
              </Badge>
            </div>

            {e.description ? (
              <div
                className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-foreground [&_em]:italic [&_.rt-space]:h-2"
                dangerouslySetInnerHTML={{ __html: renderRichTextToHtml(e.description) }}
              />
            ) : null}

            {Array.isArray(e.highlights) && e.highlights.length ? (
              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/85">
                {e.highlights.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            ) : null}

            {Array.isArray(e.skills) && e.skills.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {e.skills.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="rounded-full border-border/60 bg-black/10"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
