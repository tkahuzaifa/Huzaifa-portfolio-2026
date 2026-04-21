"use client";

import * as React from "react";
import { getSkills } from "@/data/skills";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/profile";
import { usePortfolioExperiences } from "@/lib/experience-store";

type Props = {
  profile?: Profile | null;
};

function dedupe(values: string[]) {
  return Array.from(new Set(values.map((v) => v.trim()).filter(Boolean)));
}

function financeCategoryIndex(skill: string) {
  const value = skill.toLowerCase();

  if (
    value.includes("oracle") ||
    value.includes("erp") ||
    value.includes("quickbooks") ||
    value.includes("sage") ||
    value.includes("primavera")
  ) {
    return 1;
  }
  if (
    value.includes("audit") ||
    value.includes("tax") ||
    value.includes("compliance") ||
    value.includes("eobi") ||
    value.includes("wht")
  ) {
    return 3;
  }
  if (
    value.includes("project") ||
    value.includes("budget") ||
    value.includes("forecast") ||
    value.includes("cash flow")
  ) {
    return 2;
  }
  if (
    value.includes("excel") ||
    value.includes("report") ||
    value.includes("pivot") ||
    value.includes("balance")
  ) {
    return 4;
  }
  if (
    value.includes("client") ||
    value.includes("vendor") ||
    value.includes("stakeholder") ||
    value.includes("communication") ||
    value.includes("team")
  ) {
    return 5;
  }

  return 0;
}

function webCategoryIndex(skill: string) {
  const value = skill.toLowerCase();

  if (
    value.includes("shopify") ||
    value.includes("liquid") ||
    value.includes("theme") ||
    value.includes("template")
  ) {
    return 0;
  }
  if (
    value.includes("seo") ||
    value.includes("klaviyo") ||
    value.includes("lifecycle")
  ) {
    return 2;
  }

  return 1;
}

export function SkillsSection({ profile }: Props) {
  const resolvedProfile: Profile = profile ?? "finance";
  const baseSkills = React.useMemo(() => getSkills(resolvedProfile), [resolvedProfile]);
  const { items } = usePortfolioExperiences();

  const skills = React.useMemo(() => {
    const categories = baseSkills.map((category) => ({
      ...category,
      items: [...category.items],
    }));

    const experienceSkills = dedupe(
      items
        .filter((item) => item.category === resolvedProfile)
        .flatMap((item) => item.skills)
    );

    const existing = new Set(
      categories.flatMap((category) =>
        category.items.map((item) => item.toLowerCase())
      )
    );

    experienceSkills.forEach((skill) => {
      if (existing.has(skill.toLowerCase())) return;

      const index =
        resolvedProfile === "finance"
          ? financeCategoryIndex(skill)
          : webCategoryIndex(skill);

      categories[index]?.items.push(skill);
      existing.add(skill.toLowerCase());
    });

    return categories.map((category) => ({
      ...category,
      items: dedupe(category.items),
    }));
  }, [baseSkills, items, resolvedProfile]);

  return (
    <section id="skills" className="scroll-mt-24 space-y-8">
      <SectionHeader
        eyebrow="What I’m strong at"
        title="Skills"
        
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((c) => (
          <div key={c.title} className="glass rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/15 border border-primary/20 grid place-items-center">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold tracking-tight">
                {c.title}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {c.items.map((s) => (
                <Badge
                  key={s}
                  variant="outline"
                  className="rounded-full border-border/60 bg-black/10"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
