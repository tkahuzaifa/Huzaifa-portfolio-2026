"use client";

import * as React from "react";

import type { Project } from "@/components/projects/types";
import { financeProjects, webDevelopmentProjects } from "@/data/projects";
import {
  fetchPortfolioFromApi,
  patchPortfolioToApi,
} from "@/lib/portfolio-api-client";
import type { Profile } from "@/lib/profile";

export type PortfolioProject = Project & {
  id: string;
  category: Profile;
  isFeatured?: boolean;
  createdAt: number;
  updatedAt: number;
};

export type ProjectFormInput = {
  category: Profile;
  title: string;
  slug: string;
  company?: string;
  timePeriod?: string;
  descriptionDetail: string[];
  technologies: string[];
  images: { src: string; title: string; description?: string }[];
  links?: {
    videoType?: "loom" | "googleDrive";
    videoUrl?: string;
    webLink?: { id: string; link: string; title: string }[];
    github?: { id: string; link: string; title: string }[];
  };
  caseStudy?: {
    problem?: string[];
    approach?: string[];
    architecture?: string[];
    challenges?: string[];
    outcome?: string[];
  };
  isFeatured?: boolean;
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanStrings(values?: string[]) {
  return (values ?? []).map((v) => v.trim()).filter(Boolean);
}

function normalizeProject(project: PortfolioProject): PortfolioProject {
  return {
    ...project,
    slug: slugify(project.slug || project.title),
    title: project.title.trim(),
    company: project.company?.trim(),
    timePeriod: project.timePeriod?.trim(),
    descriptionDetail: cleanStrings(project.descriptionDetail),
    technologies: cleanStrings(project.technologies),
    images: (project.images ?? [])
      .filter((img) => img.src?.trim())
      .map((img) => ({
        src: img.src,
        title: img.title?.trim() || "Screenshot",
        description: img.description?.trim() || undefined,
      })),
    caseStudy: {
      problem: cleanStrings(project.caseStudy?.problem),
      approach: cleanStrings(project.caseStudy?.approach),
      architecture: cleanStrings(project.caseStudy?.architecture),
      challenges: cleanStrings(project.caseStudy?.challenges),
      outcome: cleanStrings(project.caseStudy?.outcome),
    },
    links: {
      videoType: project.links?.videoType,
      videoUrl: project.links?.videoUrl?.trim(),
      webLink: (project.links?.webLink ?? [])
        .filter((l) => l.link?.trim() && l.title?.trim())
        .map((l) => ({ id: String(l.id), title: l.title.trim(), link: l.link.trim() })),
      github: (project.links?.github ?? [])
        .filter((l) => l.link?.trim() && l.title?.trim())
        .map((l) => ({ id: String(l.id), title: l.title.trim(), link: l.link.trim() })),
    },
  };
}

function sortProjects(items: PortfolioProject[]) {
  return [...items].sort((a, b) => {
    const featDelta = Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
    if (featDelta !== 0) return featDelta;
    return b.updatedAt - a.updatedAt;
  });
}

function seedProjects(): PortfolioProject[] {
  const now = Date.now();
  const finance = financeProjects.map((project, index) => ({
    ...project,
    id: `finance-seed-${index}-${project.slug}`,
    category: "finance" as const,
    isFeatured: false,
    createdAt: now - index - 1000,
    updatedAt: now - index - 1000,
  }));
  const web = webDevelopmentProjects.map((project, index) => ({
    ...project,
    id: `web-seed-${index}-${project.slug}`,
    category: "web" as const,
    isFeatured:
      project.slug ===
        "salute-her-hair-easyship-setup-for-accurate-and-international-shipping" ||
      project.slug ===
        "products-by-women-shopify-template-fix-and-page-builder-restoration",
    createdAt: now - index,
    updatedAt: now - index,
  }));
  return sortProjects([...web, ...finance].map(normalizeProject));
}

const PROJECT_SEED = seedProjects();

export function usePortfolioProjects() {
  const [items, setItems] = React.useState<PortfolioProject[]>(PROJECT_SEED);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      const api = await fetchPortfolioFromApi();
      if (cancelled) return;

      if (Object.prototype.hasOwnProperty.call(api, "projects")) {
        const raw = api.projects;
        const list = Array.isArray(raw) ? raw : [];
        const normalized = sortProjects(
          list
            .map((item) => normalizeProject(item as PortfolioProject))
            .filter(
              (item) =>
                item.slug &&
                (item.category === "web" || item.category === "finance")
            )
        );
        setItems(normalized);
        setHydrated(true);
        return;
      }

      setItems(PROJECT_SEED);
      setHydrated(true);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = React.useCallback((next: PortfolioProject[]) => {
    const sorted = sortProjects(next.map(normalizeProject));
    setItems(sorted);
    void patchPortfolioToApi({ projects: sorted });
    return sorted;
  }, []);

  const addProject = React.useCallback(
    (input: ProjectFormInput) => {
      const now = Date.now();
      const project: PortfolioProject = normalizeProject({
        ...input,
        id: createId(),
        slug: input.slug || slugify(input.title),
        createdAt: now,
        updatedAt: now,
      });
      persist([project, ...items]);
      return project;
    },
    [items, persist]
  );

  const updateProject = React.useCallback(
    (id: string, input: ProjectFormInput) => {
      const now = Date.now();
      const next = items.map((project) =>
        project.id === id
          ? normalizeProject({
              ...project,
              ...input,
              slug: input.slug || slugify(input.title),
              updatedAt: now,
            })
          : project
      );
      persist(next);
    },
    [items, persist]
  );

  const deleteProject = React.useCallback(
    (id: string) => {
      persist(items.filter((project) => project.id !== id));
    },
    [items, persist]
  );

  return { items, hydrated, addProject, updateProject, deleteProject };
}

export function filterProjectsByProfile(
  projects: PortfolioProject[],
  profile?: Profile | null
) {
  if (!profile) return projects;
  return projects.filter((project) => project.category === profile);
}

export function findProjectBySlug(
  projects: PortfolioProject[],
  slug: string,
  profile?: Profile | null
) {
  const filtered = filterProjectsByProfile(projects, profile);
  return filtered.find((project) => project.slug === slug) ?? null;
}
