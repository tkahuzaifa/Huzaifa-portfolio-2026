import { normalizeProfile } from "@/lib/profile";
import { ProjectCaseStudyClient } from "@/components/projects/project-case-study-client";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ profile?: string | string[] }>;
};

export default async function ProjectCaseStudyPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawProfile = Array.isArray(resolvedSearchParams.profile)
    ? resolvedSearchParams.profile[0]
    : resolvedSearchParams.profile;
  const profile = normalizeProfile(rawProfile);
  return <ProjectCaseStudyClient slug={slug} profile={profile} />;
}
