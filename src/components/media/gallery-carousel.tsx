"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

export type GalleryImage = {
  src: string;
  title: string;
  description?: string;
};

type Props = {
  images: GalleryImage[];
  sectionTitle?: string;
  sectionDescription?: string;
};

export function GalleryCarousel({
  images,
  sectionTitle = "Screenshots",
  sectionDescription = "Key flows and configuration screens from the production system.",
}: Props) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const active = images[activeIndex];

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  function openAt(idx: number) {
    setActiveIndex(idx);
    setOpen(true);
  }

  function prev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  // Keyboard support in lightbox
  React.useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{sectionTitle}</h3>
          <p className="text-sm text-muted-foreground max-w-xl">
            {sectionDescription}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="rounded-xl"
            onClick={() => openAt(0)}
          >
            Open gallery
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => scrollBy(-720)}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => scrollBy(720)}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel row */}
      <div
        ref={scrollerRef}
        className="min-w-0 flex w-full max-w-full gap-3 overflow-x-auto pb-2
  snap-x snap-mandatory scroll-px-2 px-2
  [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, idx) => (
          <div
            key={`${img.src}-${idx}`}
            className="snap-start shrink-0 w-[min(640px,calc(100vw-3rem))]"
          >
            <button
              type="button"
              onClick={() => openAt(idx)}
              className="group relative block w-full"
            >
              <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden rounded-2xl border border-border/60 bg-black/20">
                <img
                  src={img.src}
                  alt={img.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* hover overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute right-3 top-3">
                  <div className="glass rounded-xl p-2">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </button>

            {/* Title + description */}
            <div className="px-1 pt-2 space-y-1">
              <div className="text-sm font-medium">{img.title}</div>
              {img.description ? (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {img.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent fullscreen className="bg-black/95 p-0 border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{active?.title ?? "Gallery"}</DialogTitle>
          </DialogHeader>

          <div className="relative w-full h-full">
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3">
              <div className="text-xs text-white/70">
                {active?.title ?? "Gallery"} • {activeIndex + 1}/{images.length}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-xl bg-white/10 border-white/15 hover:bg-white/15"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Prev / Next */}
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid place-items-center h-11 w-11 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid place-items-center h-11 w-11 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            ) : null}

            {/* Image */}
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
              <div className="relative w-full h-full">
                {active?.src ? (
                  <img
                    src={active.src}
                    alt={active.title}
                    className="h-full w-full object-contain"
                    loading="eager"
                    decoding="async"
                  />
                ) : null}
              </div>
            </div>

            {/* Bottom hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-xs text-white/60">
              Use ← → keys to navigate • Esc to close
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
