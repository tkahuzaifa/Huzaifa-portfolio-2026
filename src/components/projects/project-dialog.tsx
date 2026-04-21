"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoomVideo } from "@/components/media/loom-video";
import { GoogleDriveVideo } from "@/components/media/google-drive-video";
import { GalleryCarousel } from "@/components/media/gallery-carousel";
import type { Project } from "./types";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  project: Project | null;
  onViewCaseStudy?: (slug: string) => void;
};

export function ProjectDialog({
  open,
  onOpenChange,
  project,
  onViewCaseStudy,
}: Props) {
  if (!project) return null;

  const links = project.links;
  const hasLoom = !!links?.videoUrl && links?.videoType === "loom";
  const hasDrive = !!links?.videoUrl && links?.videoType === "googleDrive";

  // Convert project images into GalleryCarousel shape
  // (Your Project type already uses { src, title, description? } in images)
  const galleryImages =
    project.images?.map((img) => ({
      src: img.src,
      title: img.title ?? "Screenshot",
      description: img.description,
    })) ?? [];

  const hasAnyLinks =
    !!onViewCaseStudy || !!links?.webLink?.length || !!links?.github?.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Centered modal (NOT fullscreen) */}
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100vw-2rem)] sm:max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden min-w-0 [&_*]:max-w-full [&_*]:min-w-0"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        {/* Sticky header */}
        <div
          className="sticky top-0 z-20 relative px-6 py-4 pr-14
bg-background/90 backdrop-blur-xl
border-b border-border/60"
        >
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            aria-label="Close dialog"
            className="absolute right-3 top-3 rounded-xl h-10 w-10 md:h-9 md:w-9
             bg-background/60 hover:bg-background/80
             border border-border/50 backdrop-blur"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                {project.title}
              </h2>

              {(project.company || project.timePeriod) && (
                <div className="text-sm text-muted-foreground">
                  {project.company}
                  {project.company && project.timePeriod ? " • " : ""}
                  {project.timePeriod}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pr-2">
              {onViewCaseStudy && (
                <Button size="sm" onClick={() => onViewCaseStudy(project.slug)}>
                  View case study
                </Button>
              )}

              {links?.webLink?.map((l) => (
                <Button asChild key={l.id} variant="outline" size="sm">
                  <a href={l.link} target="_blank" rel="noreferrer">
                    {l.title}
                  </a>
                </Button>
              ))}

              {links?.github?.map((l) => (
                <Button asChild key={l.id} variant="outline" size="sm">
                  <a href={l.link} target="_blank" rel="noreferrer">
                    {l.title}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-8">
          {/* Description */}
          {!!project.descriptionDetail?.length && (
            <div className="space-y-2">
              {project.descriptionDetail.map((t, idx) => (
                <p
                  key={`${t}-${idx}`}
                  className="text-sm md:text-[15px] leading-relaxed text-foreground/85"
                >
                  • {t}
                </p>
              ))}
            </div>
          )}

          {/* Tech */}
          {!!project.technologies?.length && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}

          {/* Media */}
          {(hasLoom || hasDrive || galleryImages.length) && (
            <div className="space-y-5">
              {(hasLoom || hasDrive) && (
                <div className="glass rounded-2xl p-3 min-w-0 overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden rounded-xl">
                    {hasLoom ? (
                      <LoomVideo
                        videoUrl={links!.videoUrl!}
                        className="h-full w-full"
                      />
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

              {/* Screenshots: same UX as case-study page */}
              {galleryImages.length ? (
                <GalleryCarousel
                  images={galleryImages}
                  sectionTitle="Screenshots"
                  sectionDescription="Key flows and important screens from the product."
                />
              ) : null}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
