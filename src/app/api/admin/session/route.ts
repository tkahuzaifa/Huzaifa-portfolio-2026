import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminPassword, getAdminUsername } from "@/lib/admin-credentials";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin-session-server";

export const dynamic = "force-dynamic";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
};

export async function GET() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value ?? "";
  const ok = Boolean(token && verifyAdminSessionToken(token));
  return NextResponse.json({ ok });
}

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  const valid =
    username === getAdminUsername() && password === getAdminPassword();

  if (!valid) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, token, COOKIE_OPTIONS);

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
