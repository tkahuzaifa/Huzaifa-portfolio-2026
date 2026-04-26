const ADMIN_SESSION_KEY = "portfolio-admin-session";

/**
 * Client-side flag mirrored after successful cookie login.
 * The real auth for saving data is the httpOnly cookie set by `/api/admin/session`.
 */
export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export async function loginAdmin(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: username.trim(),
        password,
      }),
    });

    if (!res.ok) return false;

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    }
    return true;
  } catch {
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await fetch("/api/admin/session", {
      method: "DELETE",
      credentials: "include",
    });
  } catch {
    // ignore
  } finally {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  }
}

/**
 * Sync sessionStorage from the httpOnly admin cookie (e.g. after refresh or new tab).
 */
export async function refreshAdminSession(): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/session", {
      credentials: "include",
    });
    const data = (await res.json()) as { ok?: boolean };
    if (data.ok && typeof window !== "undefined") {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      return true;
    }
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
  return false;
}
