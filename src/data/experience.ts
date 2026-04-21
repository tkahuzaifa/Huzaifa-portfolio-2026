export type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  timePeriod: string;
  description: string;
  descriptionDetail: string[];
  technologies: string[];
  logo?: string;
};

export const experience: ExperienceItem[] = [
  {
    id: 1,
    title: "Senior Executive Billing & Accounts Receivable",
    company: "I2c Inc. — Lahore, Pakistan",
    timePeriod: "11/2024 — Present",
    description:
      "Managing revenue booking, invoicing, and accounts receivable operations across a large client portfolio, ensuring accuracy, compliance, and timely collections.",
    descriptionDetail: [
      "Accurately booked revenue in QuickBooks (QB) and Oracle Fusion ERP for proper financial tracking and reporting.",
      "Sent AR reminders to clients three times a month to ensure timely payments and maintain healthy cash flow.",
      "Performed pre- and post-QA checks on client invoices to ensure billing accuracy and compliance with standards.",
      "Handled invoicing for 140+ clients, ensuring timely and accurate billing cycles.",
      "Resolved client queries related to invoices, payments, and other billing matters in a professional manner.",
      "Managed booking of work orders and credit notes with proper documentation and reconciliation in financial systems.",
    ],
    technologies: [
      "QuickBooks",
      "Oracle Fusion ERP",
      "Accounts Receivable (AR)",
      "Billing & Invoicing",
      "Revenue Booking",
      "Invoice QA",
      "Work Orders",
      "Credit Notes",
    ],
    logo: "/images/i2c_logo.png",
  },

  {
    id: 2,
    title: "Senior Accounts Executive — Accounts Payable",
    company: "I2c Inc. — Lahore, Pakistan",
    timePeriod: "07/2023 — 10/2024",
    description:
      "Handled core accounts payable operations, reconciliations, vendor payments, compliance filings, and audit coordination while supporting employee financial services.",
    descriptionDetail: [
      "Managed bank reconciliations, petty cash reconciliations, and fund transfers to support smooth financial operations.",
      "Prepared monthly budgets and helped reduce operational discrepancies through improved tracking and controls.",
      "Managed car leasing, insurance, and provident fund loans; resolved the majority of employee payroll/benefit queries.",
      "Prepared withholding tax (WHT) details and filed EOBI payments to ensure regulatory compliance.",
      "Verified vendor bills and processed payment batches for 50+ vendors monthly, ensuring timely payouts.",
      "Booked and managed 500+ monthly transactions (invoices, receipts, advances) and collaborated with auditors for internal and final audits.",
    ],
    technologies: [
      "Oracle Fusion ERP",
      "QuickBooks",
      "Bank Reconciliation",
      "Petty Cash",
      "Vendor Payments",
      "WHT",
      "EOBI",
      "Audit Coordination",
    ],
    logo: "/images/i2c_logo.png",
  },

  {
    id: 3,
    title: "Assistant Finance Manager",
    company: "National Heritage Constructors — Lahore, Pakistan",
    timePeriod: "01/2021 — 07/2023",
    description:
      "Supported project finance operations through reconciliations, cash flow monitoring, reporting, and stakeholder coordination to keep project financial activities on schedule and within budget.",
    descriptionDetail: [
      "Managed monthly bank reconciliations, monitored cash flow, and reviewed balance sheet reconciliations.",
      "Ensured timely and accurate quarterly/annual financial accounts and reporting.",
      "Assisted in budgeting, forecasting, and project financial reporting to support project delivery targets.",
      "Ensured compliance with legislation, internal controls, and organizational/project financial policies.",
      "Liaised with external stakeholders (e.g., creditors) and maintained daily contact with project sites to resolve financial issues.",
      "Managed project payroll, verified pay slips, handled head office petty cash, and maintained project documentation and reports.",
    ],
    technologies: [
      "MS Excel",
      "MS Project",
      "Project Finance",
      "Budgeting & Forecasting",
      "Cash Flow Monitoring",
      "Bank Reconciliation",
      "Payroll",
      "Financial Controls",
    ],
    logo: "/images/NHC.png",
  },

  {
    id: 4,
    title: "Project Finance Officer",
    company: "National Heritage Constructors — Lahore, Pakistan",
    timePeriod: "01/2020 — 12/2021",
    description:
      "Prepared project financial reports, managed budgets and reconciliations, processed payroll/vendor payments, and maintained accurate financial documentation across project sites.",
    descriptionDetail: [
      "Prepared and submitted monthly project financial reports while ensuring compliance with policies and controls.",
      "Tracked project budgets and ensured efficient, transparent utilization of resources to meet schedule and budget goals.",
      "Managed payroll processes, verified pay slips, issued cheques, and generated payment vouchers.",
      "Ensured timely vendor payments aligned with goods delivered and maintained strong vendor coordination.",
      "Facilitated cash requests, performed cash and bank reconciliations, and managed petty cash for financial accuracy.",
      "Maintained centralized records of financial documents and resolved vendor/client financial queries via daily site coordination.",
    ],
    technologies: [
      "MS Excel",
      "Project Financial Reporting",
      "Budget Tracking",
      "Cash & Bank Reconciliation",
      "Petty Cash",
      "Payroll",
      "Vendor Payments",
      "Documentation & Controls",
    ],
    logo: "/images/NHC.png",
  },

  {
    id: 5,
    title: "Finance Intern",
    company:
      "Pakistan Telecommunication Company Limited (PTCL) — Islamabad, Pakistan",
    timePeriod: "06/2018 — 08/2018",
    description:
      "Supported pricing operations through daily updates, monitoring, and collaboration, improving accuracy and learning advanced Excel workflows.",
    descriptionDetail: [
      "Assisted in designing and implementing competitive pricing strategies.",
      "Ensured daily updates and monitoring of pricing information to maintain accuracy and relevance.",
      "Collaborated with team members to support organizational goals and operational needs.",
      "Developed proficiency in Microsoft Excel to improve productivity and data management.",
    ],
    technologies: [
      "Microsoft Excel",
      "Pricing Updates",
      "Pricing Strategy Support",
      "Team Collaboration",
    ],
    logo: "/images/ptcl_logo.png",
  },
];
