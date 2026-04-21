const ADMIN_SESSION_KEY = "portfolio-admin-session";

/**
 * Frontend-only credential gate for the hidden admin panel.
 * Replace these with your own values before going live.
 */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function loginAdmin(username: string, password: string) {
  const isValid =
    username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;

  if (typeof window !== "undefined" && isValid) {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  }

  return isValid;
}

export function logoutAdmin() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
