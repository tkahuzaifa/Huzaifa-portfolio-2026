import fs from "fs/promises";
import path from "path";

import { get, put } from "@vercel/blob";

export type PortfolioPersistedState = {
  projects?: unknown;
  experiences?: unknown;
  testimonials?: unknown;
};

const DATA_DIR = path.join(process.cwd(), "data");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");

/** Single JSON blob; stable pathname so reads/writes stay in sync on Vercel. */
const BLOB_PATH = "portfolio/site-state.json";

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

/**
 * Must match how the Blob store was created in Vercel (Public vs Private).
 * Default "private" works with the usual read-write token on the server.
 */
function blobAccess(): "public" | "private" {
  const v = process.env.BLOB_ACCESS?.trim().toLowerCase();
  return v === "public" ? "public" : "private";
}

async function readFromBlob(): Promise<PortfolioPersistedState | null> {
  if (!useBlob()) return null;
  try {
    const access = blobAccess();
    const result = await get(BLOB_PATH, {
      access,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return null;
    }
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as PortfolioPersistedState;
  } catch {
    return null;
  }
}

async function writeToBlob(data: PortfolioPersistedState): Promise<void> {
  const access = blobAccess();
  await put(BLOB_PATH, JSON.stringify(data), {
    access,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

async function readFromDisk(): Promise<PortfolioPersistedState> {
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

async function writeToDisk(data: PortfolioPersistedState): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(data, null, 2), "utf8");
}

/**
 * On Vercel: set `BLOB_READ_WRITE_TOKEN` (create a Blob store in the Vercel project).
 * Locally: uses `data/portfolio.json` when the token is absent.
 */
export async function readPortfolioFile(): Promise<PortfolioPersistedState> {
  if (useBlob()) {
    return (await readFromBlob()) ?? {};
  }
  return readFromDisk();
}

export async function writePortfolioFile(
  data: PortfolioPersistedState
): Promise<void> {
  if (process.env.VERCEL && !useBlob()) {
    throw new Error(
      "Vercel requires a Blob store: Project → Storage → Blob → connect, then redeploy (BLOB_READ_WRITE_TOKEN)."
    );
  }
  if (useBlob()) {
    await writeToBlob(data);
    return;
  }
  await writeToDisk(data);
}
