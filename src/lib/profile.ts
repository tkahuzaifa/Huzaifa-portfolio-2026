export const PROFILE_QUERY_KEY = "profile";

export const PROFILE_OPTIONS = [
  {
    value: "finance",
    label: "Finance",
    shortLabel: "Finance",
    tagline: "Senior Finance & Accounts Professional",
  },
  {
    value: "web",
    label: "Web Development",
    shortLabel: "Web Dev",
    tagline: "Senior Software Engineer",
  },
] as const;

export type Profile = (typeof PROFILE_OPTIONS)[number]["value"];

export function normalizeProfile(value?: string | null): Profile | null {
  if (!value) return null;
  const cleaned = value.trim().toLowerCase();

  if (cleaned === "finance") return "finance";
  if (
    cleaned === "web" ||
    cleaned === "webdev" ||
    cleaned === "web-development" ||
    cleaned === "web-dev"
  ) {
    return "web";
  }

  return null;
}

export function getProfileOption(profile: Profile | null) {
  return PROFILE_OPTIONS.find((option) => option.value === profile) ?? null;
}
