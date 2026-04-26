"use client";

export type PortfolioApiPayload = {
  projects?: unknown;
  experiences?: unknown;
  testimonials?: unknown;
};

export async function fetchPortfolioFromApi(): Promise<PortfolioApiPayload> {
  try {
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    if (!res.ok) return {};
    const data = (await res.json()) as PortfolioApiPayload;
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

export async function patchPortfolioToApi(
  payload: PortfolioApiPayload
): Promise<boolean> {
  try {
    const res = await fetch("/api/portfolio", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
