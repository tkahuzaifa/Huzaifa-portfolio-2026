import { Suspense } from "react";
import { ResumePageClient } from "@/components/resume/resume-page-client";

export default function ResumePage() {
  return (
    <Suspense fallback={null}>
      <ResumePageClient />
    </Suspense>
  );
}
