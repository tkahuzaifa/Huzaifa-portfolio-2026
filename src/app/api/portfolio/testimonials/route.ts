import { NextResponse } from "next/server";

import { DEFAULT_TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import {
  readPortfolioFile,
  writePortfolioFile,
} from "@/lib/portfolio-file";

function sanitizeAppend(body: unknown): Omit<Testimonial, "id"> | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const role = typeof record.role === "string" ? record.role.trim() : "";
  const quote = typeof record.quote === "string" ? record.quote.trim() : "";
  if (!name || !quote) return null;
  return { name, role: role || undefined, quote };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fields = sanitizeAppend(body);
  if (!fields) {
    return NextResponse.json({ error: "Invalid testimonial" }, { status: 400 });
  }

  const newItem: Testimonial = {
    ...fields,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  };

  const current = await readPortfolioFile();
  const rawList = current.testimonials;
  let list: Testimonial[];

  if (Array.isArray(rawList)) {
    list = rawList as Testimonial[];
  } else {
    list = [...DEFAULT_TESTIMONIALS];
  }

  const nextList = [newItem, ...list];
  await writePortfolioFile({ ...current, testimonials: nextList });

  return NextResponse.json({ ok: true, testimonial: newItem });
}
