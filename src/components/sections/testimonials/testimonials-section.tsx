"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_TESTIMONIALS, type Testimonial } from "@/data/testimonials";

const STORAGE_KEY = "huzaifa:testimonials";
const ADMIN_QUERY_KEY = "admin";

function sanitizeTestimonials(value: unknown): Testimonial[] | null {
  if (!Array.isArray(value)) return null;
  const cleaned = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const name =
        typeof record.name === "string" ? record.name.trim() : "";
      const role =
        typeof record.role === "string" ? record.role.trim() : "";
      const quote =
        typeof record.quote === "string" ? record.quote.trim() : "";
      const id =
        typeof record.id === "string" && record.id ? record.id : "";

      if (!name || !quote) return null;
      return {
        id: id || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        role,
        quote,
      };
    })
    .filter(Boolean) as Testimonial[];

  return cleaned;
}

export function TestimonialsSection() {
  const searchParams = useSearchParams();
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>(
    DEFAULT_TESTIMONIALS
  );
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [quote, setQuote] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    try {
      const adminParam = searchParams.get(ADMIN_QUERY_KEY);
      setIsAdmin(adminParam === "1" || adminParam === "true");

      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      const cleaned = sanitizeTestimonials(parsed);
      if (cleaned) setTestimonials(cleaned);
    } catch {
      // Ignore storage errors.
    }
  }, [searchParams]);

  function persist(next: Testimonial[]) {
    setTestimonials(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage errors.
    }
  }

  function handleClear() {
    setTestimonials(DEFAULT_TESTIMONIALS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }

  function handleDelete(id: string) {
    persist(testimonials.filter((item) => item.id !== id));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedQuote = quote.trim();
    const trimmedRole = role.trim();

    if (!trimmedName || !trimmedQuote) return;

    const next: Testimonial = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: trimmedName,
      role: trimmedRole,
      quote: trimmedQuote,
    };

    persist([next, ...testimonials]);
    setName("");
    setRole("");
    setQuote("");
  }

  return (
    <section id="testimonials" className="scroll-mt-24 space-y-8">
      <SectionHeader
        eyebrow="Client feedback"
        title="Testimonials"
        subtitle="Recent Shopify builds, migrations, and CRO improvements."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-4 items-start">
        <div className="space-y-4">
          {testimonials.length ? (
            testimonials.map((t) => (
              <div key={t.id} className="glass rounded-3xl p-6 md:p-7">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold tracking-tight">
                      {t.name}
                    </div>
                    {t.role ? (
                      <div className="text-xs text-muted-foreground mt-1">
                        {t.role}
                      </div>
                    ) : null}
                  </div>
                  {isAdmin ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      className="rounded-lg"
                      onClick={() => handleDelete(t.id)}
                      aria-label={`Delete testimonial from ${t.name}`}
                    >
                      ×
                    </Button>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="glass rounded-3xl p-6 md:p-7 text-sm text-muted-foreground">
              No testimonials yet. Be the first to add one below.
            </div>
          )}
        </div>

        <div className="glass rounded-3xl p-6 md:p-7 space-y-4">
          <div className="text-lg font-semibold tracking-tight">
            Add a testimonial
          </div>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <Input
              name="role"
              placeholder="Role or company (optional)"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            />
            <Textarea
              name="quote"
              placeholder="Share your experience..."
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              required
            />

            <div className="flex flex-wrap gap-2 pt-2">
              <Button className="rounded-xl" type="submit">
                Add testimonial
              </Button>
              {isAdmin ? (
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={handleClear}
                >
                  Clear testimonials
                </Button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
