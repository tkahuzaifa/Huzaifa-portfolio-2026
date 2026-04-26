import fs from "fs/promises";
import path from "path";

export type PortfolioPersistedState = {
  projects?: unknown;
  experiences?: unknown;
  testimonials?: unknown;
};

const DATA_DIR = path.join(process.cwd(), "data");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");

export async function readPortfolioFile(): Promise<PortfolioPersistedState> {
  try {
    const raw = await fs.readFile(PORTFOLIO_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed as PortfolioPersistedState;
  } catch {
    return {};
  }
}

export async function writePortfolioFile(
  data: PortfolioPersistedState
): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(data, null, 2), "utf8");
}
