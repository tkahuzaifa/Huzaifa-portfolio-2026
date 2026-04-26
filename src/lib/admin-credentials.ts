/**
 * Server-only admin credentials. Set in `.env` for production.
 * Do not import this module from client components.
 */
export function getAdminUsername(): string {
  return process.env.PORTFOLIO_ADMIN_USERNAME?.trim() || "admin";
}

export function getAdminPassword(): string {
  return process.env.PORTFOLIO_ADMIN_PASSWORD?.trim() || "admin123";
}
