import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  Receipt,
  Landmark,
  FolderKanban,
  BarChart3,
  Database,
  ShieldCheck,
  Users,
  MessageSquare,
  Gauge,
  Search,
  Store,
} from "lucide-react";
import type { Profile } from "@/lib/profile";

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const financeSkills: SkillCategory[] = [
  {
    title: "Finance & Accounting",
    icon: Calculator,
    items: [
      "Revenue Management",
      "Billing & Invoicing",
      "Accounts Receivable (AR)",
      "Accounts Payable (AP)",
      "Bank Reconciliation",
      "Petty Cash Reconciliation",
      "Cash Flow Monitoring",
      "Payroll Management",
      "Vendor Payments & Settlements",
    ],
  },
  {
    title: "ERP & Finance Systems",
    icon: Database,
    items: [
      "Oracle Fusion ERP",
      "Oracle Primavera P6",
      "ERP – E Accountant",
      "QuickBooks",
      "Sage 50 Professional",
    ],
  },
  {
    title: "Project Finance",
    icon: FolderKanban,
    items: [
      "Budgeting & Forecasting",
      "Project Financial Reporting",
      "Resource & Budget Tracking",
      "Project Documentation & Controls",
      "Site Coordination for Financial Ops",
    ],
  },
  {
    title: "Compliance & Audits",
    icon: ShieldCheck,
    items: [
      "Withholding Tax (WHT) Preparation",
      "EOBI Filing & Payments",
      "Internal & Final Audit Coordination",
      "Financial Controls & Policy Compliance",
    ],
  },
  {
    title: "Reporting & Excel",
    icon: BarChart3,
    items: [
      "Advanced Excel Formulas & Functions",
      "Pivot Tables & Data Analysis",
      "Monthly / Quarterly / Annual Reporting",
      "Balance Sheet Reconciliations",
      "Budget Variance Tracking",
    ],
  },
  {
    title: "Client & Stakeholder Handling",
    icon: Users,
    items: [
      "Client Query Resolution (Invoices & Payments)",
      "AR Follow-ups & Reminders",
      "Creditor & Vendor Coordination",
      "Cross-team Collaboration",
    ],
  },
  {
    title: "Professional Skills",
    icon: MessageSquare,
    items: [
      "Communication Skills",
      "Teamwork",
      "Multitasking",
      "Problem Solving",
      "Attention to Detail",
    ],
  },
  {
    title: "Work Orders & Credit Notes",
    icon: Receipt,
    items: [
      "Work Order Booking",
      "Credit Notes Handling",
      "Invoice QA (Pre & Post Checks)",
      "Documentation & Reconciliation",
    ],
  },
  {
    title: "Banking & Treasury Operations",
    icon: Landmark,
    items: [
      "Fund Transfers",
      "Staff Transfers & Reimbursements",
      "Advances Management",
      "Provident Fund & Employee Financial Services",
    ],
  },
];

const webSkills: SkillCategory[] = [
  {
    title: "Shopify Development",
    icon: Store,
    items: [
      "Shopify",
      "Shopify Theme",
      "Shopify Templates",
      "Theme Customization",
      "Liquid",
    ],
  },
  {
    title: "Store Build & Optimization",
    icon: Gauge,
    items: [
      "Shopify Website Redesign",
      "Ecommerce Website Development",
      "Shopify Plus",
      "Page Speed Optimization",
      "Store Migration",
    ],
  },
  {
    title: "SEO & Lifecycle",
    icon: Search,
    items: [
      "Shopify SEO",
      "Store Management",
      "Klaviyo",
      "Web Design Plugin",
      "Ecommerce",
    ],
  },
];

export const skillsByProfile: Record<Profile, SkillCategory[]> = {
  finance: financeSkills,
  web: webSkills,
};

export function getSkills(profile?: Profile | null) {
  return skillsByProfile[profile ?? "finance"] ?? financeSkills;
}

export const skills = financeSkills;
