"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoomVideo } from "@/components/media/loom-video";
import { GoogleDriveVideo } from "@/components/media/google-drive-video";
import { GalleryCarousel } from "@/components/media/gallery-carousel";
import { TocNav } from "@/components/projects/toc-nav";
import { PROFILE_QUERY_KEY, type Profile } from "@/lib/profile";
import { findProjectBySlug, usePortfolioProjects } from "@/lib/project-store";

type Props = {
  slug: string;
  profile: Profile | null;
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="text-sm md:text-base text-foreground/85 leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

export function ProjectCaseStudyClient({ slug, profile }: Props) {
  const { items } = usePortfolioProjects();
  const profileQuery = profile ? `?${PROFILE_QUERY_KEY}=${profile}` : "";
  const project = useMemo(
    () => findProjectBySlug(items, slug, profile),
    [items, slug, profile]
  );

  if (!project) {
    return (
      <div className="space-y-5">
        <Button asChild variant="outline" className="rounded-xl">
          <Link href={`/projects${profileQuery}`}>← Back to projects</Link>
        </Button>
        <div className="glass rounded-3xl p-6 text-sm text-muted-foreground">
          Project not found. It may have been removed from frontend storage.
        </div>
      </div>
    );
  }

  const links = project.links;
  const hasLoom = !!links?.videoUrl && links?.videoType === "loom";
  const hasDrive = !!links?.videoUrl && links?.videoType === "googleDrive";
  const bullets = project.descriptionDetail ?? [];
  const cs = project.caseStudy;
  const toc = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "architecture", label: "Architecture" },
    { id: "challenges", label: "Challenges" },
    { id: "outcome", label: "Outcome" },
    { id: "tech", label: "Tech stack" },
    { id: "media", label: "Demo / Media" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href={`/projects${profileQuery}`}>← Back to projects</Link>
        </Button>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
          {project.title}
        </h1>
        {(project.company || project.timePeriod) && (
          <p className="text-sm md:text-base text-muted-foreground">
            {project.company ?? ""}
            {project.company && project.timePeriod ? " • " : ""}
            {project.timePeriod ?? ""}
          </p>
        )}

        {!!project.technologies?.length && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="rounded-full border-border/60 bg-black/10"
              >
                {t}
              </Badge>
            ))}
          </div>
        )}

        {(links?.webLink?.length || links?.github?.length) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {links?.webLink?.map((l) => (
              <Button asChild key={l.id} variant="secondary" className="rounded-xl">
                <a href={l.link} target="_blank" rel="noreferrer">
                  {l.title}
                </a>
              </Button>
            ))}
            {links?.github?.map((l) => (
              <Button asChild key={l.id} variant="outline" className="rounded-xl">
                <a href={l.link} target="_blank" rel="noreferrer">
                  {l.title}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 items-start">
        <aside className="lg:sticky lg:top-24 space-y-3">
          <div className="glass rounded-2xl p-4">
            <div className="text-sm font-semibold mb-2">On this page</div>
            <TocNav items={toc} />
          </div>
        </aside>

        <div className="min-w-0 space-y-10">
          <Section id="overview" title="Overview">
            <p>{bullets[0] ?? "Case study overview coming soon."}</p>
          </Section>

          {cs?.problem?.length ? (
            <Section id="problem" title="Problem">
              <ul className="list-disc pl-5 space-y-2">
                {cs.problem.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs?.approach?.length ? (
            <Section id="approach" title="Approach">
              <ul className="list-disc pl-5 space-y-2">
                {cs.approach.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs?.architecture?.length ? (
            <Section id="architecture" title="Architecture">
              <ul className="list-disc pl-5 space-y-2">
                {cs.architecture.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs?.challenges?.length ? (
            <Section id="challenges" title="Challenges">
              <ul className="list-disc pl-5 space-y-2">
                {cs.challenges.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {cs?.outcome?.length ? (
            <Section id="outcome" title="Outcome">
              <ul className="list-disc pl-5 space-y-2">
                {cs.outcome.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section id="highlights" title="Highlights">
            <ul className="list-disc pl-5 space-y-2">
              {bullets.slice(1).map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </Section>

          <Section id="tech" title="Tech stack">
            <p>
              {project.technologies?.length
                ? project.technologies.join(" • ")
                : "Tech stack not added yet."}
            </p>
          </Section>

          <Section id="media" title="Demo / Media">
            <div className="space-y-4">
              {(hasLoom || hasDrive) && (
                <div className="glass rounded-2xl p-3">
                  <div className="aspect-video w-full overflow-hidden rounded-xl">
                    {hasLoom ? (
                      <LoomVideo videoUrl={links!.videoUrl!} className="h-full w-full" />
                    ) : null}
                    {hasDrive ? (
                      <GoogleDriveVideo
                        fileId={links!.videoUrl!}
                        height={420}
                        className="h-full w-full"
                      />
                    ) : null}
                  </div>
                </div>
              )}

              {project.images?.length ? <GalleryCarousel images={project.images} /> : null}

              {!hasLoom && !hasDrive && !project.images?.length ? (
                <div className="glass rounded-2xl p-4 text-sm text-muted-foreground">
                  No media attached for this project yet.
                </div>
              ) : null}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
