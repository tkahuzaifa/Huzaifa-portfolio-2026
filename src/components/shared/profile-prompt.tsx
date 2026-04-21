"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  PROFILE_OPTIONS,
  PROFILE_QUERY_KEY,
  type Profile,
} from "@/lib/profile";
import { PROFILE_DESCRIPTIONS } from "@/data/profile-descriptions";

export function ProfilePrompt() {
  const searchParams = useSearchParams();

  function handleSelect(profile: Profile) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(PROFILE_QUERY_KEY, profile);
    const query = params.toString();
    return `/${query ? `?${query}` : ""}`;
  }

  return (
    <section className="relative py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-primary/20" />
        <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl bg-primary/15" />
      </div>

      <div className="glass rounded-[32px] p-6 md:p-8 lg:p-10 overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.25fr] items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Choose a profile
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Explore Huzaifa&apos;s work
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Pick a view to tailor projects, skills, and case studies around
              your goals.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PROFILE_OPTIONS.map((option) => (
              <Link
                key={option.value}
                href={handleSelect(option.value)}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/40 p-6 text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {option.shortLabel}
                </div>
                <div className="mt-2 text-lg md:text-xl font-semibold tracking-tight">
                  {option.label}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {PROFILE_DESCRIPTIONS[option.value]}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                  Open profile
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
