import { HeroSection } from "@/components/sections/hero/hero-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { WorkExperienceSection } from "@/components/sections/experience/work-experience-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";
import TestimonialsSection from "@/components/sections/testimonials/testimonials-section";
import { CertificatesSection } from "@/components/sections/certificates/certificates-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { ProfilePrompt } from "@/components/shared/profile-prompt";
import { normalizeProfile } from "@/lib/profile";

type PageProps = {
  searchParams?: Promise<{ profile?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawProfile = Array.isArray(resolvedSearchParams.profile)
    ? resolvedSearchParams.profile[0]
    : resolvedSearchParams.profile;
  const profile = normalizeProfile(rawProfile);

  if (!profile) {
    return <ProfilePrompt />;
  }

  return (
    <div className="space-y-14">
      <HeroSection id="top" className="scroll-mt-24" profile={profile} />

      {profile === "web" ? (
        <div id="projects">
          <ProjectsSection profile={profile} />
        </div>
      ) : null}

      {profile ? <WorkExperienceSection profile={profile} /> : null}
      {profile === "web" ? <TestimonialsSection /> : null}
      <SkillsSection profile={profile} />
      {/* <CertificatesSection /> */}
      <ContactSection />
    </div>
  );
}
