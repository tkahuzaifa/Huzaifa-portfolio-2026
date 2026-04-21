"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import type { Project } from "@/components/projects/types";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { PROFILE_QUERY_KEY, type Profile } from "@/lib/profile";
import { filterProjectsByProfile, usePortfolioProjects } from "@/lib/project-store";

const FEATURED_SLUGS = new Set<string>([
  "salute-her-hair-easyship-setup-for-accurate-and-international-shipping",
  "products-by-women-shopify-template-fix-and-page-builder-restoration",
]);

const HOME_SELECTED_LIMIT = 8;

type Props = {
  profile?: Profile | null;
};

export function ProjectsSection({ profile }: Props) {
  const router = useRouter();
  const profileQuery = profile ? `?${PROFILE_QUERY_KEY}=${profile}` : "";
  const { items: allProjects } = usePortfolioProjects();
  const projectList = React.useMemo(
    () => filterProjectsByProfile(allProjects, profile),
    [allProjects, profile]
  );
  const subtitle =
    profile === "finance"
      ? "Finance operations and ERP workflows — billing, AR/AP, project finance, and compliance-driven execution."
      : profile === "web"
        ? "Shopify builds and ecommerce systems — custom themes, migrations, CRO, and performance-focused delivery."
        : "Real work across finance operations, ERP systems, and Shopify ecommerce builds.";

  function withProfile(href: string) {
    return profile ? `${href}${profileQuery}` : href;
  }

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Project | null>(null);

  const featured = React.useMemo(
    () => projectList.filter((p) => p.isFeatured || FEATURED_SLUGS.has(p.slug)),
    [projectList]
  );

  const selected = React.useMemo(
    () =>
      projectList
        .filter((p) => !(p.isFeatured || FEATURED_SLUGS.has(p.slug)))
        .slice(0, HOME_SELECTED_LIMIT),
    [projectList]
  );

  function openProject(p: Project) {
    setActive(p);
    setOpen(true);
  }

  function closeProject() {
    setOpen(false);
    setTimeout(() => setActive(null), 120);
  }

  return (
    <section className="space-y-10" id="projects">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Projects
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Featured Case Studies */}
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            Featured case studies
          </h3>
          <button
            type="button"
            onClick={() => router.push(withProfile("/projects"))}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          {featured.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              featured
              onOpen={() => openProject(p)}
              className="h-full"
            />
          ))}
        </div>
      </div>

      {/* Selected Work */}
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            Selected work
          </h3>
          <button
            type="button"
            onClick={() => router.push(withProfile("/projects"))}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {selected.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              onOpen={() => openProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Dialog */}
      <ProjectDialog
        open={open}
        onOpenChange={(v) => {
          if (!v) closeProject();
          else setOpen(true);
        }}
        project={active}
        onViewCaseStudy={(slug) => {
          closeProject();
          router.push(withProfile(`/projects/${slug}`));
        }}
      />
    </section>
  );
}
