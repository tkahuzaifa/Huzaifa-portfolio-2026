import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "portfolio_admin_session";

function getSecret(): string {
  return (
    process.env.PORTFOLIO_ADMIN_SECRET?.trim() ||
    "local-dev-only-set-PORTFOLIO_ADMIN_SECRET"
  );
}

export function createAdminSessionToken(): string {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ exp }), "utf8").toString(
    "base64url"
  );
  const sig = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  if (expected.length !== sig.length) return false;
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { exp?: number };
    if (typeof data.exp !== "number" || data.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
