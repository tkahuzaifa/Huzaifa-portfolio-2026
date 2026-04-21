"use client";

import * as React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROFILE_QUERY_KEY, type Profile } from "@/lib/profile";
import { filterProjectsByProfile, usePortfolioProjects } from "@/lib/project-store";

type FilterKey =
  | "all"
  | "featured"
  | "company"
  | "freelance"
  | "saas"
  | "mobile"
  | "backend"
  | "shopify"
  | "themes"
  | "seo"
  | "speed"
  | "migration"
  | "cro"
  | "erp"
  | "billing"
  | "reconciliations"
  | "project-finance"
  | "reporting";

const FEATURED_SLUGS = new Set<string>([
  "salute-her-hair-easyship-setup-for-accurate-and-international-shipping",
  "products-by-women-shopify-template-fix-and-page-builder-restoration",
]);

function hasAnyTech(p: any, keywords: string[]) {
  const tech = (p.technologies ?? []).map((t: string) => t.toLowerCase());
  return keywords.some((k) => tech.some((t: string) => t.includes(k)));
}

function isFreelance(p: any) {
  const c = (p.company ?? "").toLowerCase();
  return (
    c.includes("freelance") ||
    c.includes("client") ||
    c.includes("personal") ||
    c.includes("product")
  );
}

function isCompany(p: any) {
  const c = (p.company ?? "").toLowerCase();
  return !!c && !isFreelance(p);
}

function isMobile(p: any) {
  return hasAnyTech(p, ["react native"]);
}

function isBackend(p: any) {
  return hasAnyTech(p, [
    "fastapi",
    "node",
    "express",
    "nestjs",
    "sqlalchemy",
    "alembic",
    "postgres",
    "postgresql",
    "mongodb",
    "dynamodb",
  ]);
}

function isSaaS(p: any) {
  const text = `${p.title ?? ""} ${
    p.descriptionDetail?.join(" ") ?? ""
  }`.toLowerCase();

  return (
    text.includes("saas") ||
    text.includes("multi-tenant") ||
    hasAnyTech(p, ["multi-tenant", "postgresql", "fastapi", "next.js"])
  );
}

function matchesKeywords(p: any, keywords: string[]) {
  const haystack = [
    p.title ?? "",
    p.company ?? "",
    ...(p.technologies ?? []),
    ...(p.descriptionDetail ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return keywords.some((k) => haystack.includes(k));
}

const DEFAULT_FILTERS: {
  key: FilterKey;
  label: string;
  predicate: (p: any) => boolean;
}[] = [
  { key: "all", label: "All", predicate: () => true },
  {
    key: "featured",
    label: "Featured",
    predicate: (p) => FEATURED_SLUGS.has(p.slug),
  },
  { key: "company", label: "Company", predicate: isCompany },
  { key: "freelance", label: "Freelance", predicate: isFreelance },
  { key: "saas", label: "SaaS", predicate: isSaaS },
  { key: "mobile", label: "Mobile", predicate: isMobile },
  { key: "backend", label: "Backend", predicate: isBackend },
];

const WEB_FILTERS: {
  key: FilterKey;
  label: string;
  predicate: (p: any) => boolean;
}[] = [
  { key: "all", label: "All", predicate: () => true },
  {
    key: "shopify",
    label: "Shopify",
    predicate: (p) => matchesKeywords(p, ["shopify"]),
  },
  {
    key: "themes",
    label: "Themes",
    predicate: (p) => matchesKeywords(p, ["theme", "themes", "liquid", "template"]),
  },
  {
    key: "seo",
    label: "SEO",
    predicate: (p) => matchesKeywords(p, ["seo", "schema"]),
  },
  {
    key: "speed",
    label: "Speed",
    predicate: (p) =>
      matchesKeywords(p, ["speed", "performance", "core web vitals"]),
  },
  {
    key: "migration",
    label: "Migration",
    predicate: (p) => matchesKeywords(p, ["migration", "migrate"]),
  },
  {
    key: "cro",
    label: "CRO",
    predicate: (p) =>
      matchesKeywords(p, ["cro", "conversion", "aov", "landing page"]),
  },
];

const FINANCE_FILTERS: {
  key: FilterKey;
  label: string;
  predicate: (p: any) => boolean;
}[] = [
  { key: "all", label: "All", predicate: () => true },
  {
    key: "erp",
    label: "ERP",
    predicate: (p) => matchesKeywords(p, ["erp", "oracle"]),
  },
  {
    key: "billing",
    label: "Billing",
    predicate: (p) => matchesKeywords(p, ["billing", "invoice", "invoicing"]),
  },
  {
    key: "reconciliations",
    label: "Reconciliations",
    predicate: (p) =>
      matchesKeywords(p, ["reconciliation", "reconciliations"]),
  },
  {
    key: "project-finance",
    label: "Project Finance",
    predicate: (p) =>
      matchesKeywords(p, ["project finance", "budget", "forecast"]),
  },
  {
    key: "reporting",
    label: "Reporting",
    predicate: (p) => matchesKeywords(p, ["report", "reporting"]),
  },
];

type Props = {
  profile?: Profile | null;
};

export function ProjectsPageClient({ profile }: Props) {
  const [active, setActive] = React.useState<FilterKey>("all");
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);

  const [fading, setFading] = React.useState(false);
  const profileQuery = profile ? `?${PROFILE_QUERY_KEY}=${profile}` : "";
  const { items: allProjects } = usePortfolioProjects();
  const projects = React.useMemo(
    () => filterProjectsByProfile(allProjects, profile),
    [allProjects, profile]
  );
  const filters = React.useMemo(() => {
    if (profile === "web") return WEB_FILTERS;
    if (profile === "finance") return FINANCE_FILTERS;
    return DEFAULT_FILTERS;
  }, [profile]);
  const pageCopy =
    profile === "web"
      ? {
          title: "Shopify & Ecommerce Projects",
          description:
            "Shopify Plus builds, custom theme work, CRO, SEO, speed optimization, and migrations focused on revenue growth.",
          searchPlaceholder:
            "Search projects (e.g. Shopify, Liquid, CRO, SEO, speed...)",
        }
      : profile === "finance"
        ? {
            title: "Finance & ERP Projects",
            description:
              "ERP implementations, billing workflows, reconciliations, and large-scale project finance support.",
            searchPlaceholder:
              "Search projects (e.g. Oracle, billing, ERP, reconciliations...)",
          }
        : {
            title: "All Projects",
            description:
              "Fast-scannable selection across SaaS, AI voice, dashboards, and performance-focused web platforms.",
            searchPlaceholder:
              "Search projects (e.g. Next.js, FastAPI, React Native, SaaS...)",
          };

  React.useEffect(() => {
    if (!filters.some((f) => f.key === active)) {
      setActive(filters[0]?.key ?? "all");
    }
  }, [filters, active]);

  const filtered = React.useMemo(() => {
    const f = filters.find((x) => x.key === active) ?? filters[0];
    const base = projects.filter(f.predicate);

    const q = deferredQuery.trim().toLowerCase();
    if (!q) return base;

    return base.filter((p) => {
      const haystack = [
        p.title ?? "",
        p.company ?? "",
        ...(p.technologies ?? []),
        ...(p.descriptionDetail ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [active, deferredQuery, projects, filters]);

  // Smooth fade transition on filter/search change (no remount blink)
  React.useEffect(() => {
    setFading(true);
    const t = setTimeout(() => setFading(false), 450); // slower
    return () => clearTimeout(t);
  }, [active, deferredQuery]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {pageCopy.title}
          </h1>
          <Badge variant="secondary" className="rounded-full">
            {projects.length} projects
          </Badge>
        </div>

        <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          {pageCopy.description}
        </p>

        {/* Search + Filters */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="flex-1">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={pageCopy.searchPlaceholder}
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="rounded-2xl"
              onClick={() => setQuery("")}
              disabled={!query.trim()}
            >
              Clear
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = f.key === active;
              return (
                <Button
                  key={f.key}
                  type="button"
                  size="sm"
                  variant={isActive ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActive(f.key)}
                >
                  {f.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="text-foreground font-medium">{filtered.length}</span>{" "}
          of{" "}
          <span className="text-foreground font-medium">{projects.length}</span>
        </div>
      </div>

      {/* Grid */}
      <div
        className={[
          "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4",
          "transition-opacity duration-500 ease-in-out",
          fading ? "opacity-40" : "opacity-100",
        ].join(" ")}
      >
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}${profileQuery}`}
            className="glass rounded-3xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base md:text-lg font-semibold tracking-tight truncate">
                      {p.title}
                    </h2>

                    {p.isFeatured || FEATURED_SLUGS.has(p.slug) ? (
                      <Badge className="rounded-full" variant="secondary">
                        Featured
                      </Badge>
                    ) : null}
                  </div>

                  {(p.company || p.timePeriod) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {p.company ?? ""}
                      {p.company && p.timePeriod ? " • " : ""}
                      {p.timePeriod ?? ""}
                    </p>
                  )}
                </div>
              </div>

              {!!p.technologies?.length && (
                <div className="flex flex-wrap gap-2">
                  {p.technologies.slice(0, 6).map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="rounded-full border-border/60 bg-black/10"
                    >
                      {t}
                    </Badge>
                  ))}
                  {p.technologies.length > 6 ? (
                    <Badge variant="secondary" className="rounded-full">
                      +{p.technologies.length - 6}
                    </Badge>
                  ) : null}
                </div>
              )}

              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                {p.descriptionDetail?.[0] ?? ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
