import { ProjectsPageClient } from "@/components/projects/projects-page-client";
import { normalizeProfile } from "@/lib/profile";

type PageProps = {
  searchParams?: Promise<{ profile?: string | string[] }>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawProfile = Array.isArray(resolvedSearchParams.profile)
    ? resolvedSearchParams.profile[0]
    : resolvedSearchParams.profile;
  const profile = normalizeProfile(rawProfile);

  return (
    <ProjectsPageClient profile={profile} />
  );
}
