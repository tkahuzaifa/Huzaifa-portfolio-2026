"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "./types";

type Props = {
  project: Project;
  onOpen: () => void;
  featured?: boolean;
  className?: string;
};

export function ProjectCard({ project, onOpen, featured, className }: Props) {
  const cover = project.images?.[0];
  const tech = project.technologies ?? [];
  const maxTech = featured ? 8 : 6;
  const shown = tech.slice(0, maxTech);
  const extra = tech.length - shown.length;

  return (
    <button onClick={onOpen} className="text-left w-full group" type="button">
      <Card
        className={[
          "relative overflow-hidden glass transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-2xl",
          "h-full",
          className ?? "",
        ].join(" ")}
      >
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl bg-primary/20" />
        </div>

        <CardContent className="p-5 h-full flex flex-col gap-4">
          <div className="flex items-start gap-4">
            {cover ? (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-black/20">
                <img
                  src={cover.src}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-xl border border-border/60 bg-black/20" />
            )}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base md:text-lg font-semibold leading-tight tracking-tight">
                  {project.title}
                </h3>
                {featured ? (
                  <Badge className="rounded-full" variant="secondary">
                    Featured
                  </Badge>
                ) : null}
              </div>

              {(project.company || project.timePeriod) && (
                <p className="text-sm text-muted-foreground mt-1">
                  {project.company ?? ""}
                  {project.company && project.timePeriod ? " • " : ""}
                  {project.timePeriod ?? ""}
                </p>
              )}
            </div>
          </div>

          {!!shown.length && (
            <div className="flex flex-wrap gap-2">
              {shown.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="rounded-full border-border/60 bg-black/10"
                >
                  {t}
                </Badge>
              ))}
              {extra > 0 ? (
                <Badge variant="secondary" className="rounded-full">
                  +{extra}
                </Badge>
              ) : null}
            </div>
          )}

          <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
            {project.descriptionDetail?.[0] ?? ""}
          </p>

          <div className="mt-auto">
            <p className="text-xs text-muted-foreground">
              Click to view details
            </p>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
