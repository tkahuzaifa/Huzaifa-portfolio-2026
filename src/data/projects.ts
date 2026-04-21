import type { Project } from "@/components/projects/types";
import type { Profile } from "@/lib/profile";

/**
 * Huzaifa wants TWO project sections:
 * 1) Finance
 * 2) Web Development
 *
 * We export both arrays + a merged `projects` for backward compatibility.
 */

export const financeProjects: Project[] = [
  {
    slug: "oracle-fusion-erp-implementation-i2c",
    title: "Oracle Fusion ERP Implementation",
    company: "I2c Inc. — Lahore, Pakistan",
    timePeriod: "2023 — 2025",
    descriptionDetail: [
      "Supported implementation of Oracle Fusion ERP to improve finance operations and reporting.",
      "Worked across billing, receivables/payables processes and ensured smooth operational adoption.",
      "Helped maintain accuracy and controls during transition to ERP-based workflows.",
    ],
    technologies: [
      "Oracle Fusion ERP",
      "Finance Operations",
      "Billing",
      "AR / AP",
      "Compliance",
      "Reporting",
    ],
    images: [
      {
        src: "/images/projects/FinanceERP.png",
        title: "ERP Implementation",
        description:
          "Oracle Fusion ERP adoption to strengthen finance workflows.",
      },
    ],
    caseStudy: {
      problem: [
        "Manual and fragmented finance workflows reduce accuracy and slow reporting.",
        "ERP implementation required process alignment and controlled transition.",
      ],
      approach: [
        "Supported operational rollout of Oracle Fusion ERP across finance functions.",
        "Maintained reconciliations and controls while shifting processes to the ERP system.",
      ],
      outcome: [
        "Improved standardization and tracking of finance activities through ERP workflows.",
      ],
    },
  },

  {
    slug: "oracle-fusion-erp-revamp-multi-module-i2c",
    title: "Oracle Fusion ERP Revamp (Multi-Module Integration)",
    company: "I2c Inc. — Lahore, Pakistan",
    timePeriod: "2024 — 2025",
    descriptionDetail: [
      "Supported revamp and integration of multiple Oracle Fusion ERP modules to improve finance operations.",
      "Helped improve accuracy of billing workflows, transaction booking, and reporting reliability.",
      "Coordinated finance-side validation to ensure outputs aligned with business requirements.",
    ],
    technologies: [
      "Oracle Fusion ERP",
      "Multi-Module Integration",
      "Process Improvement",
      "Finance Controls",
      "Reconciliations",
    ],
    images: [
      {
        src: "/images/projects/FinanceERPRevamp.png",
        title: "ERP Revamp",
        description:
          "Module integration and workflow improvements inside Oracle Fusion ERP.",
      },
    ],
    caseStudy: {
      problem: [
        "ERP modules needed stronger integration to reduce duplication and improve reliability.",
        "Finance workflows required better controls and validation to avoid downstream issues.",
      ],
      approach: [
        "Supported module integration from finance operations perspective (billing, AR/AP, reporting).",
        "Strengthened validation and ensured finance outputs matched expected standards.",
      ],
      outcome: [
        "More reliable finance workflows with improved integration across ERP modules.",
      ],
    },
  },

  {
    slug: "220kv-transmission-line-di-khan-zhob",
    title: "220kV Double Circuit Transmission Line (D.I. Khan → Zhob, ~220KM)",
    company: "National Heritage Constructors — Lahore, Pakistan",
    timePeriod: "2020 — 2023",
    descriptionDetail: [
      "Provided project finance support for a large-scale transmission line project (~220KM).",
      "Supported budgeting, forecasting, reporting, and cash flow monitoring for project sites.",
      "Maintained coordination with project teams for financial controls and documentation.",
    ],
    technologies: [
      "Project Finance",
      "Budgeting & Forecasting",
      "Project Financial Reporting",
      "Cash Flow Monitoring",
      "Excel",
      "MS Project",
    ],
    images: [
      {
        src: "/images/projects/TransmissionLine.png",
        title: "Transmission Line Project",
        description:
          "Project finance support for large infrastructure delivery.",
      },
    ],
    caseStudy: {
      problem: [
        "Large infrastructure projects require tight financial controls and accurate reporting.",
        "Site operations demand continuous coordination and strong documentation practices.",
      ],
      approach: [
        "Supported budgeting, reporting, reconciliations, and cash flow monitoring.",
        "Maintained project documentation and worked closely with project sites on finance needs.",
      ],
      outcome: [
        "Improved finance visibility and supported on-schedule project financial operations.",
      ],
    },
  },

  {
    slug: "220kv-line-rehabilitation-quetta-sibbi",
    title: "220kV Line Rehabilitation (Quetta → Sibbi)",
    company: "National Heritage Constructors — Lahore, Pakistan",
    timePeriod: "2020 — 2023",
    descriptionDetail: [
      "Supported financial reporting, reconciliations, and vendor payment workflows for rehabilitation work.",
      "Ensured documentation and finance controls aligned with project requirements.",
      "Maintained coordination with vendors/sites to resolve finance queries efficiently.",
    ],
    technologies: [
      "Project Finance",
      "Vendor Payments",
      "Reconciliations",
      "Payroll Support",
      "Documentation & Controls",
      "Excel",
    ],
    images: [
      {
        src: "/images/projects/Rehabilitation.png",
        title: "Rehabilitation Project",
        description:
          "Finance operations support for rehabilitation work and reporting.",
      },
    ],
    caseStudy: {
      problem: [
        "Rehabilitation work requires ongoing vendor coordination and timely financial processing.",
        "Accurate reconciliations and documentation are critical to maintain control.",
      ],
      approach: [
        "Supported reporting, reconciliations, and vendor payments aligned with deliveries.",
        "Maintained clear records and resolved vendor/site queries with daily coordination.",
      ],
      outcome: [
        "Supported smooth finance operations and improved financial control across project cycles.",
      ],
    },
  },
];

export const webDevelopmentProjects: Project[] = [
  {
    slug: "salute-her-hair-easyship-setup-for-accurate-and-international-shipping",
    title:
      "Salute Her Hair – Easyship Setup for Accurate & International Shipping",
    company: "Upwork Client",
    timePeriod: "Published on Dec 3, 2025",
    descriptionDetail: [
      "Role: Shopify Shipping & Easyship Integration Specialist.",
      "Fixed inaccurate international rates, configured free-shipping rules, mapped regions, and tested checkout for correct rate display.",
      "Result: Accurate rates + smoother global checkout + reduced abandonment risk.",
    ],
    technologies: [
      "Shopify Dropshipping",
      "Troubleshooting",
      "Third-Party Integration",
      "Automated Workflow",
      "Ecommerce Store Setup",
    ],
    images: [
      {
        src: "/images/projects/salute1.png",
        title: "Salute Her Hair",
        description: "Website image.",
      },
      {
        src: "/images/projects/salute2.png",
        title: "Salute Her Hair",
        description: "Website image.",
      },
      {
        src: "/images/projects/salute3.png",
        title: "Salute Her Hair",
        description: "Website image.",
      },
      {
        src: "/images/projects/salute4.png",
        title: "Salute Her Hair",
        description: "Website image.",
      },
      {
        src: "/images/projects/salute5.png",
        title: "Salute Her Hair",
        description: "Website image.",
      },
      {
        src: "/images/projects/salute6.png",
        title: "Salute Her Hair",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "International shipping rates were inaccurate; free-shipping rules weren’t configured; Easyship wasn’t properly set up.",
      ],
      approach: [
        "Fully configured Easyship, set accurate international rates, added free-shipping rules, mapped regions, and tested checkout scenarios.",
      ],
      outcome: [
        "Accurate shipping cost display, working free-shipping rules, smoother checkout experience, optimized setup for scaling.",
      ],
    },
  },

  {
    slug: "products-by-women-shopify-template-fix-and-page-builder-restoration",
    title:
      "Products By Women – Shopify Template Fix & Page Builder Restoration",
    company: "Upwork Client",
    timePeriod: "Published on Dec 3, 2025",
    descriptionDetail: [
      "Role: Shopify Liquid Developer (OS 2.0) / Theme Troubleshooting Specialist.",
      "Fixed template conflicts, repaired Liquid, restored OS 2.0 blocks/sections & metafields, ensured templates load across pages.",
      "Result: Client can build pages instantly without errors; improved theme stability.",
    ],
    technologies: [
      "Shopify Theme",
      "Front-End Development",
      "Shopify Website Redesign",
      "Shopify Templates",
      "Shopify Development",
    ],
    images: [
      {
        src: "/images/projects/pbw1.png",
        title: "Products By Women",
        description: "Website image.",
      },
      {
        src: "/images/projects/pbw2.png",
        title: "Products By Women",
        description: "Website image.",
      },
      {
        src: "/images/projects/pbw3.png",
        title: "Products By Women",
        description: "Website image.",
      },
      {
        src: "/images/projects/pbw4.png",
        title: "Products By Women",
        description: "Website image.",
      },
      {
        src: "/images/projects/pbw5.png",
        title: "Products By Women",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Shopify page template was broken: new pages weren’t loading correctly, sections/blocks were blocked, template conflicts existed.",
      ],
      approach: [
        "Identified and fixed template conflict, repaired Liquid code, restored OS 2.0 blocks/sections, verified templates across assigned pages.",
      ],
      outcome: [
        "Page creation restored, blocks/sections/metafields load properly, conflicts removed, improved theme reliability.",
      ],
    },
  },

  {
    slug: "solar-website-smart-solar",
    title: "Solar Website- Smart solar",
    company: "Upwork Client",
    timePeriod: "Published on Mar 7, 2025",
    descriptionDetail: [
      "Role: Project Manager Web.",
      "Built a user-friendly WordPress site to showcase solar solutions with mobile responsiveness and easy navigation.",
      "Result: Improved online visibility leading to more inquiries and opportunities.",
    ],
    technologies: ["WordPress", "Elementor", "Contact Form 7", "Plugin"],
    images: [
      {
        src: "/images/projects/solar1.png",
        title: "Smart Solar Website",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed a modern, responsive website to present solar services and drive inquiries.",
      ],
      approach: [
        "Developed a customized responsive WordPress site with SEO-friendly structure and clear navigation.",
      ],
      outcome: ["Higher visibility and improved lead/inquiry flow."],
    },
  },

  {
    slug: "one-page-wordpress-elementor-website",
    title: "One Page WordPress Elementor Website",
    company: "keurmerkgiftcard.nl",
    timePeriod: "Published on Aug 31, 2024",
    descriptionDetail: [
      "Role: Project Manager and Developer.",
      "Delivered a one-page Elementor-based WordPress website with hosting setup and domain migration.",
      "Fast turnaround delivery with a clean, responsive layout.",
    ],
    technologies: [
      "WordPress",
      "Elementor",
      "Hosting Setup",
      "Domain Migration",
      "Web Development",
    ],
    images: [
      {
        src: "/images/projects/onepage.png",
        title: "One Page Elementor Site",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed a quick one-page WordPress site and deployment/migration support.",
      ],
      approach: [
        "Built with Elementor, handled hosting setup and domain migration.",
      ],
      outcome: ["Live, responsive one-page site delivered quickly."],
    },
  },

  {
    slug: "e-commerce-shopify-clothing-store",
    title: "E- Commerce Shopify Clothing Store",
    company: "Upwork Client",
    timePeriod: "Published on Aug 17, 2024",
    descriptionDetail: [
      "Role: Web Developer.",
      "Built a Shopify clothing eCommerce store.",
      "Set up core pages and store structure for product browsing and purchase flow.",
    ],
    technologies: [
      "Project Management",
      "Web API",
      "Web Design Plugin",
      "Web Page",
      "Web Development",
    ],
    images: [
      {
        src: "/images/projects/commerce1.png",
        title: "Shopify Clothing Store",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: ["Needed a functional online clothing store."],
      approach: [
        "Implemented store structure and key pages to support shopping flow.",
      ],
      outcome: ["Production-ready Shopify store foundation."],
    },
  },

  {
    slug: "charity-website",
    title: "Charity website",
    company: "keuken.la",
    timePeriod: "Published on Feb 15, 2024",
    descriptionDetail: [
      "Built a charity/funding website with an attractive design.",
      "Focused on customization, optimization, and a clean front-end experience.",
      "Implemented Elementor-based layout for easy content updates.",
    ],
    technologies: [
      "WordPress Customization",
      "Elementor",
      "WordPress Optimization",
      "Web Design",
    ],
    images: [
      {
        src: "/images/projects/charity1.png",
        title: "Charity Website",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: ["Needed a well-designed fundraising/charity website."],
      approach: ["Customized WordPress with Elementor and optimized UI/UX."],
      outcome: [
        "Attractive, editable website suitable for fundraising campaigns.",
      ],
    },
  },

  {
    slug: "contact-lens-ecommerce-platform",
    title: "Contact Lens Ecommerce Platform",
    company: "Upwork Client",
    timePeriod: "Upwork Project",
    descriptionDetail: [
      "Built a complete eCommerce solution for buying contact lenses online.",
      "Contributed across frontend + backend using WooCommerce and Elementor.",
      "Implemented bug fixes and plugin-level improvements as needed.",
    ],
    technologies: [
      "WordPress",
      "Elementor",
      "WordPress e-Commerce",
      "WooCommerce",
      "WordPress Bug Fix",
      "WordPress Plugin",
    ],
    images: [
      {
        src: "/images/projects/contact1.png",
        title: "Contact Lens Store",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed a full eCommerce platform for contact lenses with a smooth shopping experience.",
      ],
      approach: [
        "Built on WordPress + WooCommerce, designed UI via Elementor, handled fixes and enhancements.",
      ],
      outcome: ["End-to-end store experience ready for online sales."],
    },
  },

  {
    slug: "it-solutions-company-website",
    title: "IT solutions Company Website",
    company: "codrivity.com",
    timePeriod: "Published on May 13, 2023",
    descriptionDetail: [
      "Developed an IT solutions company website in WordPress.",
      "Handled WordPress development + management; integrated key plugins for forms, jobs, sliders, and WooCommerce features.",
      "Ensured maintainable structure for ongoing updates.",
    ],
    technologies: [
      "WordPress",
      "WordPress Plugin",
      "Elementor",
      "Web Design",
      "WooCommerce",
      "WordPress Development",
    ],
    images: [
      {
        src: "/images/projects/itsolution.png",
        title: "IT Solutions Site",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Company needed a modern WordPress site with multiple functional sections (forms, jobs, showcases).",
      ],
      approach: [
        "Built the site and integrated plugins like Contact Form 7, job openings, sliders, WooCommerce tooling.",
      ],
      outcome: ["Functional business site ready for marketing and updates."],
    },
  },

  {
    slug: "swap-gift-cards",
    title: "Swap Gift Cards",
    company: "giftcardswap.nl",
    timePeriod: "Published on Sep 27, 2023",
    descriptionDetail: [
      "Built a gift card swapping website experience.",
      "Implemented eCommerce functionality with WordPress/WooCommerce and Elementor.",
      "Worked on redesign aspects and plugin integrations.",
    ],
    technologies: [
      "Card Game",
      "Ecommerce Website",
      "Elementor",
      "Web Design",
      "WooCommerce",
      "WordPress",
      "WordPress Plugin",
      "Website Redesign",
      "WordPress Development",
    ],
    images: [
      {
        src: "/images/projects/swapgift1.png",
        title: "Gift Card Swap",
        description: "Replace with actual screenshot/image.",
      },
    ],
    caseStudy: {
      problem: ["Needed a platform for gift-card swapping with a usable UI."],
      approach: [
        "Implemented WordPress + WooCommerce solution and refined UI with Elementor.",
      ],
      outcome: [
        "Operational gift-card swap site with improved layout and flows.",
      ],
    },
  },

  {
    slug: "it-consulting-website",
    title: "IT consulting Website",
    company: "Upwork Client",
    timePeriod: "Upwork Project",
    descriptionDetail: [
      "Built a portfolio/marketing website for a US-based IT consulting company (Washington, D.C.).",
      "Implemented WordPress-based structure with clean pages and content sections.",
      "Ensured maintainable setup for ongoing edits.",
    ],
    technologies: [
      "Elementor",
      "Information Technology",
      "Web Design",
      "Website",
      "WordPress",
      "WordPress Plugin",
      "WordPress Development",
    ],
    images: [
      {
        src: "/images/projects/itconsulting1.png",
        title: "IT Consulting Website",
        description: "Website image.",
      },
      {
        src: "/images/projects/itconsulting2.png",
        title: "IT Consulting Website",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed a professional web presence for an IT consulting firm.",
      ],
      approach: [
        "Developed WordPress website with clear structure and responsive design via Elementor.",
      ],
      outcome: [
        "Professional site to showcase services and build credibility.",
      ],
    },
  },

  {
    slug: "real-estate-website",
    title: "Real Estate Website",
    company: "Upwork Client",
    timePeriod: "Upwork Project",
    descriptionDetail: [
      "Built a real estate website for listings (rent/sale) and property categories.",
      "Focused on user-friendly navigation and service-driven presentation.",
      "Implemented redesign elements for a clean browsing experience.",
    ],
    technologies: [
      "Elementor",
      "Real Estate",
      "Web Design",
      "Website",
      "Website Redesign",
      "WordPress Plugin",
      "WordPress",
      "WordPress Development",
    ],
    images: [
      {
        src: "/images/projects/realestate1.png",
        title: "Real Estate Website",
        description: "Website image.",
      },
      {
        src: "/images/projects/realestate2.png",
        title: "Real Estate Website",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: ["Needed a reliable real-estate portal-style site."],
      approach: [
        "Implemented WordPress site with Elementor and structured sections for listings and services.",
      ],
      outcome: ["Clean and navigable real estate web presence."],
    },
  },

  {
    slug: "react-tailwindcss",
    title: "React-TailwindCss",
    company: "Personal / Practice Project",
    timePeriod: "Project",
    descriptionDetail: [
      "Role: Front End Developer.",
      "Cloned and rebuilt a website from scratch using React.",
      "Used Tailwind CSS for styling and responsive UI implementation.",
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Front-End Development",
      "Web Design",
    ],
    images: [
      {
        src: "/images/projects/reacttailwind1.png",
        title: "React + Tailwind Clone",
        description: "Website image.",
      },
      {
        src: "/images/projects/reacttailwind2.png",
        title: "React + Tailwind Clone",
        description: "Website image.",
      },
      {
        src: "/images/projects/reacttailwind3.png",
        title: "React + Tailwind Clone",
        description: "Website image.",
      },
      {
        src: "/images/projects/reacttailwind4.png",
        title: "React + Tailwind Clone",
        description: "Website image.",
      },
      {
        src: "/images/projects/reacttailwind5.png",
        title: "React + Tailwind Clone",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed a from-scratch rebuild to demonstrate React + Tailwind implementation.",
      ],
      approach: [
        "Recreated layout/components in React and styled with Tailwind utilities.",
      ],
      outcome: ["A complete React/Tailwind build showcasing UI skills."],
    },
  },

  {
    slug: "skincare-for-men-wordpress-and-shopify-checkout",
    title: "Skincare for men - Wordpress + Shopify checkout",
    company: "Upwork Client",
    timePeriod: "Project",
    descriptionDetail: [
      "Role: Full Stack Developer.",
      "Converted PSDs into a custom WordPress theme and integrated Shopify checkout.",
      "Configured WordPress + Shopify flow for a unified purchase experience.",
    ],
    technologies: [
      "WordPress",
      "PSD to WordPress",
      "Shopify",
      "Payment Gateway",
    ],
    images: [
      {
        src: "/images/projects/skincare1.png",
        title: "WP Theme + Shopify Checkout",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Client wanted a WordPress site built from PSDs but preferred Shopify checkout.",
      ],
      approach: [
        "Converted PSDs to WP theme and wired Shopify checkout configuration.",
      ],
      outcome: [
        "WordPress-powered site with Shopify checkout capability enabled.",
      ],
    },
  },

  {
    slug: "bondex-origin-crypto-community-fintech",
    title: "Bondex Origin - crypto community - Fintech",
    company: "Upwork Client",
    timePeriod: "Project",
    descriptionDetail: [
      "Role: Full Stack Developer.",
      "Built a decentralized fintech/community experience to earn crypto via tasks.",
      "Implemented core product UI and integrations to support community workflows.",
    ],
    technologies: ["React", "Firebase", "Git", "Cryptocurrency", "Figma"],
    images: [
      {
        src: "/images/projects/bondex1.png",
        title: "Bondex Origin",
        description: "Website image.",
      },
      {
        src: "/images/projects/bondex2.png",
        title: "Bondex Origin",
        description: "Website image.",
      },
      {
        src: "/images/projects/bondex3.png",
        title: "Bondex Origin",
        description: "Website image.",
      },
      {
        src: "/images/projects/bondex4.png",
        title: "Bondex Origin",
        description: "Website image.",
      },
      {
        src: "/images/projects/bondex5.png",
        title: "Bondex Origin",
        description: "Website image.",
      },
      {
        src: "/images/projects/bondex6.png",
        title: "Bondex Origin",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed a community/network product where users earn crypto by completing tasks.",
      ],
      approach: [
        "Built app features using React + Firebase and collaborated via Git/Figma.",
      ],
      outcome: ["Functional fintech/community platform foundation."],
    },
  },

  {
    slug: "construction-website",
    title: "Construction Website",
    company: "Upwork Client",
    timePeriod: "Project",
    descriptionDetail: [
      "Built an international construction business website with strong color scheme and design.",
      "Focused on clear content hierarchy and visitor-friendly layout.",
      "Implemented Elementor-based sections for easy updates.",
    ],
    technologies: [
      "Construction",
      "WordPress Customization",
      "Elementor",
      "Website",
      "Web Design",
    ],
    images: [
      {
        src: "/images/projects/construction1.png",
        title: "Construction Website",
        description: "Website image.",
      },
            {
        src: "/images/projects/construction2.png",
        title: "Construction Website",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed an attractive construction website suitable for international visitors.",
      ],
      approach: [
        "Customized WordPress UI with Elementor and strong design consistency.",
      ],
      outcome: ["A polished marketing site with clear presentation."],
    },
  },

  {
    slug: "prouniforms",
    title: "Prouniforms",
    company: "Upwork Client",
    timePeriod: "Project",
    descriptionDetail: [
      "Built a complete eCommerce solution for buying uniforms online.",
      "Contributed across frontend + backend using WooCommerce and Elementor.",
      "Improved shopping and product browsing experience via redesign elements.",
    ],
    technologies: [
      "Ecommerce Website",
      "Web Design",
      "Website Redesign",
      "WooCommerce",
      "WordPress Plugin",
      "WordPress",
      "Elementor",
      "WordPress Development",
    ],
    images: [
      {
        src: "/images/projects/uniform1.png",
        title: "Prouniforms Store",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: ["Needed an end-to-end eCommerce store for uniforms."],
      approach: [
        "Implemented WordPress + WooCommerce build and designed pages using Elementor.",
      ],
      outcome: ["Full online store experience ready for customers."],
    },
  },

  {
    slug: "educational-institute-website",
    title: "Educational Institute Website",
    company: "Upwork Client",
    timePeriod: "Project",
    descriptionDetail: [
      "Built a basic educational institute website using WordPress.",
      "Used Elementor Website Builder and Depicter Slider for layout and hero/slider sections.",
      "Designed a clean, static site structure for easy navigation.",
    ],
    technologies: [
      "WordPress Development",
      "Education",
      "Elementor",
      "WordPress",
      "WordPress Plugin",
      "Web Design",
    ],
    images: [
      {
        src: "/images/projects/education1.png",
        title: "Education Website",
        description: "Website image.",
      },
    ],
    caseStudy: {
      problem: [
        "Needed a simple, static institute website with modern sections.",
      ],
      approach: [
        "Built with Elementor + Depicter Slider, structured pages for clarity.",
      ],
      outcome: ["Clean, maintainable institute website."],
    },
  },
];

/**
 * Backward compatible export (if your UI still expects `projects`)
 */
export const projects: Project[] = [
  ...financeProjects,
  ...webDevelopmentProjects,
];

export function getProjects(profile?: Profile | null) {
  if (profile === "web") return webDevelopmentProjects;
  if (profile === "finance") return financeProjects;
  return projects;
}
