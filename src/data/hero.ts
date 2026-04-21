import type { Profile } from "@/lib/profile";

export type HeroCopy = {
  heading: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  intro: string;
  techBadges: string[];
  availability: string;
  buttons: {
    call: string;
    upwork: string;
  };
  links: {
    calendly: string;
    upwork: Record<Profile, string>;
    pseb: string;
  };
  psebLabel: string;
};

const heroLinks = {
  calendly: "https://calendly.com/tka-huzaifa/30min",
  upwork: {
    finance:
      "https://www.upwork.com/freelancers/~0170e3ff717e5b9904?mp_source=share",
    web: "https://www.upwork.com/freelancers/~0158a799e24d636601",
  } satisfies Record<Profile, string>,
  pseb: "https://portal.techdestination.com/verify-certificate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkZMMjEvUFNFQi8yMDI1LzIyMjkyIiwidHlwZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3NjcwODAwNzIsImV4cCI6MTc3NDg1NjA3Mn0.8poPngm4g1fKYxFxxRFe_nZYfAbK2b_4NVoyJCNVje0",
};

const heroButtons = {
  call: "Book a 30-min Call",
  upwork: "Hire me on Upwork",
};

const financeHero: HeroCopy = {
  heading: {
    prefix: "I manage ",
    highlight: "finance operations",
    suffix: ", billing & receivables, and ERP workflows with accuracy and speed.",
  },
  intro:
    "Highly motivated and detail-oriented finance professional with strong expertise in billing, accounts receivable/payable, ERP systems, and project finance. Experienced in managing large client portfolios, ensuring regulatory compliance, and supporting multi-million dollar infrastructure projects.",
  techBadges: [
    "Oracle Fusion ERP",
    "QuickBooks Online",
    "Sage Professional",
    "Xero",
    "Buildium Property Management",
  ],
  availability: "Available for freelance & long-term",
  buttons: heroButtons,
  links: heroLinks,
  psebLabel: "PSEB Registered Freelancer • 2025–2026",
};

const webHero: HeroCopy = {
  heading: {
    prefix: "",
    highlight: "Shopify Expert",
    suffix: " | Shopify Plus Developer | Custom Theme | Store Setup",
  },
  intro:
    "High-converting Shopify solutions for scaling brands. Most stores fail due to poor UI/UX, slow page speed, and weak technical SEO, so I build premium ecommerce experiences with custom themes, store setup, migrations, and CRO-driven optimization. $20.00/hr.",
  techBadges: [
    "Shopify Plus",
    "Shopify 2.0",
    "Liquid",
    "CRO",
    "Page Speed",
    "Technical SEO",
  ],
  availability: "Available for freelance & long-term",
  buttons: heroButtons,
  links: heroLinks,
  psebLabel: "PSEB Registered Freelancer • 2025–2026",
};

export const HERO_COPY_BY_PROFILE: Record<Profile, HeroCopy> = {
  finance: financeHero,
  web: webHero,
};

export function getHeroCopy(profile?: Profile | null) {
  return HERO_COPY_BY_PROFILE[profile ?? "finance"] ?? financeHero;
}
