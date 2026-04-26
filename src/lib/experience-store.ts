"use client";

import * as React from "react";
import { experience as financeSeedData } from "@/data/experience";
import {
  fetchPortfolioFromApi,
  patchPortfolioToApi,
} from "@/lib/portfolio-api-client";
import type { Profile } from "@/lib/profile";

const STORAGE_KEY = "portfolio-experiences-v1";

export type ExperienceCategory = Profile;

export type PortfolioExperience = {
  id: string;
  category: ExperienceCategory;
  title: string;
  company: string;
  location: string;
  fromDate: string;
  toDate: string;
  isPresent: boolean;
  description: string;
  highlights: string[];
  skills: string[];
  logo?: string;
  createdAt: number;
  updatedAt: number;
};

export type ExperienceFormInput = {
  category: ExperienceCategory;
  title: string;
  company: string;
  location: string;
  fromDate: string;
  toDate: string;
  isPresent: boolean;
  description: string;
  highlights: string[];
  skills: string[];
  logo?: string;
};

function monthYearToInput(value: string) {
  const match = value.match(/^(\d{1,2})\/(\d{4})$/);
  if (!match) return "";
  const month = match[1].padStart(2, "0");
  const year = match[2];
  return `${year}-${month}`;
}

function splitCompanyAndLocation(company: string) {
  const parts = company.split(" — ");
  if (parts.length < 2) {
    return { companyName: company, location: "" };
  }

  return {
    companyName: parts[0]?.trim() ?? company,
    location: parts.slice(1).join(" — ").trim(),
  };
}

function parseFinanceTimePeriod(value: string) {
  const [fromRaw, toRaw] = value.split("—").map((part) => part.trim());
  const fromDate = fromRaw ? monthYearToInput(fromRaw) : "";
  const isPresent = (toRaw ?? "").toLowerCase() === "present";
  const toDate = isPresent ? "" : monthYearToInput(toRaw ?? "");

  return { fromDate, toDate, isPresent };
}

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `exp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toDateScore(value: string) {
  if (!value) return 0;
  const [year, month] = value.split("-");
  const y = Number(year);
  const m = Number(month);
  if (!Number.isFinite(y) || !Number.isFinite(m)) return 0;
  return y * 100 + m;
}

function sortExperiences(items: PortfolioExperience[]) {
  return [...items].sort((a, b) => {
    const aEnd = a.isPresent ? Number.MAX_SAFE_INTEGER : toDateScore(a.toDate);
    const bEnd = b.isPresent ? Number.MAX_SAFE_INTEGER : toDateScore(b.toDate);
    if (bEnd !== aEnd) return bEnd - aEnd;

    const aStart = toDateScore(a.fromDate);
    const bStart = toDateScore(b.fromDate);
    if (bStart !== aStart) return bStart - aStart;

    return b.updatedAt - a.updatedAt;
  });
}

function normalizeList(raw: string[]) {
  return raw.map((item) => item.trim()).filter(Boolean);
}

function toSeedExperiences(): PortfolioExperience[] {
  const now = Date.now();

  return financeSeedData.map((item, index) => {
    const { companyName, location } = splitCompanyAndLocation(item.company);
    const { fromDate, toDate, isPresent } = parseFinanceTimePeriod(
      item.timePeriod
    );

    return {
      id: `finance-seed-${item.id}`,
      category: "finance",
      title: item.title,
      company: companyName,
      location,
      fromDate,
      toDate,
      isPresent,
      description: item.description,
      highlights: [...item.descriptionDetail],
      skills: [...item.technologies],
      logo: item.logo,
      createdAt: now - index,
      updatedAt: now - index,
    };
  });
}

const SEED_EXPERIENCES = sortExperiences(toSeedExperiences());

function readStorage(): PortfolioExperience[] {
  if (typeof window === "undefined") return SEED_EXPERIENCES;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_EXPERIENCES;
    const parsed = JSON.parse(raw) as PortfolioExperience[];
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_EXPERIENCES;

    return sortExperiences(
      parsed
        .map((item) => ({
          ...item,
          highlights: normalizeList(item.highlights ?? []),
          skills: normalizeList(item.skills ?? []),
          company: item.company?.trim() ?? "",
          location: item.location?.trim() ?? "",
          description: item.description?.trim() ?? "",
          toDate: item.isPresent ? "" : item.toDate ?? "",
        }))
        .filter(
          (item) =>
            (item.category === "finance" || item.category === "web") &&
            item.title?.trim() &&
            item.company?.trim()
        )
    );
  } catch {
    return SEED_EXPERIENCES;
  }
}

function writeStorage(items: PortfolioExperience[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function formatMonth(value: string) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const y = Number(year);
  const m = Number(month);
  if (!Number.isFinite(y) || !Number.isFinite(m)) return "";
  return `${String(m).padStart(2, "0")}/${y}`;
}

export function formatExperienceTimePeriod(item: PortfolioExperience) {
  const from = formatMonth(item.fromDate);
  const to = item.isPresent ? "Present" : formatMonth(item.toDate);

  if (from && to) return `${from} — ${to}`;
  if (item.isPresent && from) return `${from} — Present`;
  return from || to || "";
}

export function getExperienceCompanyLabel(item: PortfolioExperience) {
  return item.location ? `${item.company} — ${item.location}` : item.company;
}

export function usePortfolioExperiences() {
  const [items, setItems] = React.useState<PortfolioExperience[]>(SEED_EXPERIENCES);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      const api = await fetchPortfolioFromApi();
      if (cancelled) return;

      if (Object.prototype.hasOwnProperty.call(api, "experiences")) {
        const raw = api.experiences;
        const list = Array.isArray(raw) ? raw : [];
        const normalized = sortExperiences(
          list
            .map((item) => ({
              ...item,
              highlights: normalizeList(
                (item as PortfolioExperience).highlights ?? []
              ),
              skills: normalizeList((item as PortfolioExperience).skills ?? []),
              company: (item as PortfolioExperience).company?.trim() ?? "",
              location: (item as PortfolioExperience).location?.trim() ?? "",
              description:
                (item as PortfolioExperience).description?.trim() ?? "",
              toDate: (item as PortfolioExperience).isPresent
                ? ""
                : (item as PortfolioExperience).toDate ?? "",
            }))
            .filter(
              (item) =>
                (item.category === "finance" || item.category === "web") &&
                item.title?.trim() &&
                item.company?.trim()
            )
        );
        setItems(normalized);
        writeStorage(normalized);
        setHydrated(true);
        return;
      }

      setItems(readStorage());
      setHydrated(true);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = React.useCallback((next: PortfolioExperience[]) => {
    const sorted = sortExperiences(next);
    setItems(sorted);
    writeStorage(sorted);
    void patchPortfolioToApi({ experiences: sorted });
    return sorted;
  }, []);

  const addExperience = React.useCallback(
    (input: ExperienceFormInput) => {
      const now = Date.now();
      const newItem: PortfolioExperience = {
        id: generateId(),
        ...input,
        company: input.company.trim(),
        location: input.location.trim(),
        description: input.description.trim(),
        highlights: normalizeList(input.highlights),
        skills: normalizeList(input.skills),
        createdAt: now,
        updatedAt: now,
      };

      persist([newItem, ...items]);
      return newItem;
    },
    [items, persist]
  );

  const updateExperience = React.useCallback(
    (id: string, input: ExperienceFormInput) => {
      const updated = items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...input,
              company: input.company.trim(),
              location: input.location.trim(),
              description: input.description.trim(),
              highlights: normalizeList(input.highlights),
              skills: normalizeList(input.skills),
              updatedAt: Date.now(),
            }
          : item
      );

      persist(updated);
    },
    [items, persist]
  );

  const deleteExperience = React.useCallback(
    (id: string) => {
      persist(items.filter((item) => item.id !== id));
    },
    [items, persist]
  );

  const resetToSeed = React.useCallback(() => {
    setItems(SEED_EXPERIENCES);
    writeStorage(SEED_EXPERIENCES);
    void patchPortfolioToApi({ experiences: SEED_EXPERIENCES });
  }, []);

  return {
    items,
    hydrated,
    addExperience,
    updateExperience,
    deleteExperience,
    resetToSeed,
  };
}

export function filterExperiencesByCategory(
  items: PortfolioExperience[],
  category: ExperienceCategory
) {
  return items.filter((item) => item.category === category);
}
