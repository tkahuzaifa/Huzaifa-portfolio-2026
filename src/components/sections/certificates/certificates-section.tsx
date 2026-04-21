import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const certs = [
  {
    title: "PSEB Registered Freelancer",
    meta: "2025 — 2026",
    note: "Government-registered freelancer status (Pakistan).",
    href: "https://portal.techdestination.com/verify-certificate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25ObyI6IkZMMjEvUFNFQi8yMDI1LzIyMjkyIiwidHlwZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3NjcwODAwNzIsImV4cCI6MTc3NDg1NjA3Mn0.8poPngm4g1fKYxFxxRFe_nZYfAbK2b_4NVoyJCNVje0",
  },
  {
    title: "React / Frontend Certification",
    meta: "Credential",
    note: "Frontend Developer (React, CSS, and JavaScript)",
    href: "https://www.hackerrank.com/certificates/34855d16681c",
  },
];

export function CertificatesSection() {
  return (
    <section id="certificates" className="scroll-mt-24 space-y-8">
      <SectionHeader
        eyebrow="Proof"
        title="Certificates"
        subtitle="Quick credibility for recruiters — keep it short, real, and linkable."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c) => (
          <div key={c.title} className="glass rounded-3xl p-6 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold tracking-tight">
                  {c.title}
                </div>
                <div className="text-sm text-muted-foreground">{c.note}</div>
              </div>
              <Badge variant="secondary" className="rounded-full">
                {c.meta}
              </Badge>
            </div>

            <div>
              <Button asChild variant="outline" className="rounded-xl">
                <a href={c.href} target="_blank" rel="noreferrer">
                  View credential
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
