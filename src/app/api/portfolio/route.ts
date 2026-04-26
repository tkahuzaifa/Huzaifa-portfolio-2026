import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/admin-session-server";
import {
  readPortfolioFile,
  writePortfolioFile,
  type PortfolioPersistedState,
} from "@/lib/portfolio-file";

export const dynamic = "force-dynamic";

async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value ?? "";
  return Boolean(token && verifyAdminSessionToken(token));
}

export async function GET() {
  const data = await readPortfolioFile();
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let patch: PortfolioPersistedState;
  try {
    patch = (await request.json()) as PortfolioPersistedState;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const current = await readPortfolioFile();
  const next: PortfolioPersistedState = { ...current };

  if ("projects" in patch) next.projects = patch.projects;
  if ("experiences" in patch) next.experiences = patch.experiences;
  if ("testimonials" in patch) next.testimonials = patch.testimonials;

  try {
    await writePortfolioFile(next);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to save portfolio data.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
