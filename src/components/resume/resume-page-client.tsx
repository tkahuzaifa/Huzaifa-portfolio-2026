"use client";

import * as React from "react";
import { Printer } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  filterExperiencesByCategory,
  formatExperienceTimePeriod,
  getExperienceCompanyLabel,
  usePortfolioExperiences,
} from "@/lib/experience-store";
import { normalizeProfile } from "@/lib/profile";
import { renderRichTextToHtml } from "@/lib/rich-text";
import { filterProjectsByProfile, usePortfolioProjects } from "@/lib/project-store";

export function ResumePageClient() {
  const searchParams = useSearchParams();
  const profile = normalizeProfile(searchParams.get("profile")) ?? "finance";
  const { items } = usePortfolioExperiences();

  const experiences = React.useMemo(
    () => filterExperiencesByCategory(items, profile),
    [items, profile]
  );
  const { items: portfolioProjects } = usePortfolioProjects();
  const projects = React.useMemo(
    () => filterProjectsByProfile(portfolioProjects, profile),
    [portfolioProjects, profile]
  );

  return (
    <div className="space-y-8 py-4">
      <section className="glass rounded-3xl p-6 md:p-7 space-y-4 print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Muhammad Huzaifa
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {profile === "finance"
                ? "Finance Operations, Billing, AR/AP, ERP, and Reporting"
                : "Web Development, Ecommerce, and Product Delivery"}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-xl print:hidden"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
            Export / Print
          </Button>
        </div>
      </section>

      <section className="space-y-4" id="resume-experience">
        <SectionHeader
          eyebrow="Latest saved data from frontend"
          title={profile === "finance" ? "Experience" : "Professional Experience"}
          subtitle="This resume automatically includes newly added items."
        />

        {experiences.length ? (
          <div className="space-y-3">
            {experiences.map((item) => (
              <div key={item.id} className="glass rounded-3xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getExperienceCompanyLabel(item)}
                    </p>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    {formatExperienceTimePeriod(item)}
                  </Badge>
                </div>

                {item.description ? (
                  <div
                    className="mt-3 text-sm text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-foreground [&_em]:italic [&_.rt-space]:h-2"
                    dangerouslySetInnerHTML={{ __html: renderRichTextToHtml(item.description) }}
                  />
                ) : null}

                {item.highlights.length ? (
                  <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-foreground/85">
                    {item.highlights.map((point, index) => (
                      <li key={`${item.id}-highlight-${index}`}>{point}</li>
                    ))}
                  </ul>
                ) : null}

                {item.skills.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Badge
                        key={`${item.id}-${skill}`}
                        variant="outline"
                        className="rounded-full border-border/60 bg-black/10"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-6 text-sm text-muted-foreground">
            No experience found yet for this profile.
          </div>
        )}
      </section>

      <section className="space-y-4" id="resume-projects">
        <SectionHeader
          eyebrow="Project highlights"
          title="Projects"
          subtitle="Projects are included to keep resume context complete."
        />

        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.slug} className="glass rounded-3xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  {project.company ? (
                    <p className="text-sm text-muted-foreground">{project.company}</p>
                  ) : null}
                </div>
                {project.timePeriod ? (
                  <Badge variant="secondary" className="rounded-full">
                    {project.timePeriod}
                  </Badge>
                ) : null}
              </div>
              {project.technologies?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={`${project.slug}-${tech}`}
                      variant="outline"
                      className="rounded-full border-border/60 bg-black/10"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
