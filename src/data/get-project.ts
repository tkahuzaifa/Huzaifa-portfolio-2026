import { getProjects } from "./projects";
import type { Project } from "@/components/projects/types";
import type { Profile } from "@/lib/profile";

export function getProjectBySlug(
  slug: string,
  profile?: Profile | null
): Project | undefined {
  return getProjects(profile).find((p) => p.slug === slug);
}
