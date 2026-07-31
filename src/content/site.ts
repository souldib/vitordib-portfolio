export const site = {
  name: "Vitor Martinho",
  role: "Senior Microsoft Fabric & BI Engineer",
  tagline: "AI-Augmented Data Platform Developer",
  location: "Goiânia, Brazil",
  timezone: "GMT-3 · Fully remote",
  email: "vitordibm@gmail.com",
  phone: "+55 (62) 9 8131-3003",
  phoneHref: "+5562981313003",
  linkedin: "https://linkedin.com/in/vitor-dib",
  github: "https://github.com/souldib",
  cv: "/Vitor_Martinho_CV.pdf",
  url: "https://vitordib-portfolio.vercel.app",
} as const;

export const hero = {
  headline: ["Data platforms", "leaders can", "trust."],
  intro:
    "Senior BI & Data Engineer with 7+ years building modern data platforms — currently delivering Microsoft Fabric architecture and analytics infrastructure as a contractor for Microsoft.",
  availability: "Available for senior data platform engagements",
} as const;

export const stats = [
  { value: 7, suffix: "+", label: "Years building data platforms" },
  { value: 60, suffix: "%", label: "Platform cost reduction" },
  { value: 118, suffix: "%", label: "Sales productivity uplift" },
  { value: 207, suffix: "%", label: "YoY revenue growth driven" },
] as const;

export const companies = [
  "Microsoft",
  "NuvemShop · Tiendanube",
  "Axia Agro",
  "Agrogalaxy",
  "Adubos Araguaia",
] as const;

export const platforms = [
  { name: "Microsoft Fabric", logo: "/logos/fabric.png" },
  { name: "Power BI", logo: "/logos/power-bi.png" },
  { name: "Microsoft Azure", logo: "/logos/azure.png" },
  { name: "Microsoft", logo: "/logos/microsoft.png" },
] as const;

export const marqueeStack = [
  "Microsoft Fabric",
  "Direct Lake",
  "Azure Data Factory",
  "Databricks",
  "dbt",
  "PySpark",
  "Power BI",
  "ADLS Gen2",
  "Synapse",
  "Azure Data Explorer",
  "T-SQL",
  "Tableau",
  "Python",
  "Medallion Architecture",
  "Azure DevOps",
  "KQL",
] as const;

export type Project = {
  id: string;
  company: string;
  logo?: string;
  period: string;
  title: string;
  summary: string;
  contributions: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "microsoft-fabric",
    company: "Microsoft",
    logo: "/logos/microsoft.png",
    period: "2025 — Present",
    title: "One governed Lakehouse for previously siloed telemetry",
    summary:
      "An internal Microsoft team ran on ad-hoc workflows spread across Splunk, Azure Data Explorer and CRM systems, with no way to correlate infrastructure signals against customer data.",
    contributions: [
      "Designed and implemented the Fabric workspace architecture and scalable tabular/semantic models, replacing legacy ad-hoc workflows.",
      "Consolidated disparate sources into a governed Fabric Lakehouse, enabling correlation across domains that had never been joined before.",
      "Re-engineered ingestion pipelines and semantic models to resolve capacity bottlenecks and cut dashboard latency.",
      "Restructured the platform as an AI-ready foundation for predictive modeling and future AI integrations.",
    ],
    metrics: [
      { value: "3→1", label: "Source systems unified" },
      { value: "↓", label: "Dashboard latency" },
    ],
    stack: [
      "Microsoft Fabric",
      "Lakehouse",
      "Direct Lake",
      "Semantic Models",
      "ADX / KQL",
      "PySpark",
    ],
  },
  {
    id: "nuvemshop-gold",
    company: "NuvemShop · Tiendanube",
    logo: "/logos/nuvemshop.png",
    period: "2025 — 2026",
    title: "A Gold Layer that became the single source of truth",
    summary:
      "Product analytics across the Core and Growth tribes lacked a governed warehouse layer, so every squad rebuilt its own version of the truth.",
    contributions: [
      "Architected and built the Data Warehouse Gold Layer on dbt and Databricks, establishing governance standards across tribes.",
      "Redesigned the Tableau visualization data model around a star schema, improving dashboard performance and scalability.",
      "Led a multicultural, fully remote team across Brazil and Argentina, aligning data strategy with product leadership.",
    ],
    metrics: [
      { value: "1", label: "Source of truth" },
      { value: "BR/AR", label: "Remote team led" },
    ],
    stack: ["dbt", "Databricks", "Tableau", "Star Schema", "Data Governance"],
  },
  {
    id: "axia-agro",
    company: "Axia Agro",
    logo: "/logos/axia.png",
    period: "2024 — 2025",
    title: "60% lower platform cost through consolidation",
    summary:
      "Fragmented tooling and manual workflows were inflating platform spend while slowing down credit, pricing and commission decisions.",
    contributions: [
      "Migrated pipelines to Databricks and built scalable ETL with PySpark, driving a 60% cost reduction through tool consolidation.",
      "Delivered real-time credit scoring, sales-commission tracking and pricing-transparency solutions.",
      "Automated data workflows with Power Automate and REST APIs (IBGE, Senior, Microsoft Graph, Adobe), sharply reducing manual effort.",
      "Defined data-quality and consistency standards across multiple systems and platforms.",
    ],
    metrics: [
      { value: "-60%", label: "Platform cost" },
      { value: "Real-time", label: "Credit scoring" },
    ],
    stack: ["Databricks", "PySpark", "Power Automate", "REST APIs", "OAuth"],
  },
  {
    id: "agrogalaxy",
    company: "Agrogalaxy",
    period: "2021 — 2024",
    title: "Commercial excellence, measured from N1 to C-level",
    summary:
      "Customer-service and order operations had no shared performance framework, leaving leadership without a reliable read on commercial execution.",
    contributions: [
      "Led the Commercial Excellence Project, building data-management processes that streamlined customer-service operations.",
      "Implemented AI tools for order-input scheduling, improving order-processing time by 60%.",
      "Established a KPI framework spanning N1 to C-level, contributing to a 118% increase in sales-team productivity.",
      "Connected CRM and ERP systems to BI tools via APIs for real-time synchronization.",
    ],
    metrics: [
      { value: "+118%", label: "Sales productivity" },
      { value: "-60%", label: "Order processing time" },
    ],
    stack: ["Power BI", "CRM / ERP Integration", "AI Scheduling", "SQL"],
  },
];

/**
 * Power BI reports published to web. `title` and `description` are optional —
 * when empty the gallery falls back to the numbered label.
 */
export type Dashboard = {
  id: string;
  label: string;
  title?: string;
  description?: string;
  url: string;
};

export const dashboards: Dashboard[] = [
  {
    id: "report-01",
    label: "01",
    url: "https://app.powerbi.com/view?r=eyJrIjoiZjJmZjk1OTYtZDA5Ny00MjAzLTgxM2EtZjc0M2RiMmNhMjY5IiwidCI6ImFjMzk4MDUzLTcxZTUtNGQ4Zi1iYWY4LWNmMGJiY2NmMTI0YyIsImMiOjF9",
  },
  {
    id: "report-02",
    label: "02",
    url: "https://app.powerbi.com/view?r=eyJrIjoiZThmZGE0OTYtNjcxNS00YzQzLTg3OTQtOWNlZWNmZTAxZDI1IiwidCI6ImFjMzk4MDUzLTcxZTUtNGQ4Zi1iYWY4LWNmMGJiY2NmMTI0YyIsImMiOjF9",
  },
  {
    id: "report-03",
    label: "03",
    url: "https://app.powerbi.com/view?r=eyJrIjoiOWU0ZGVkZmMtZTYzOC00ZTE1LWFiMWQtN2U5NDM2MDQ2MmY0IiwidCI6ImFjMzk4MDUzLTcxZTUtNGQ4Zi1iYWY4LWNmMGJiY2NmMTI0YyIsImMiOjF9",
  },
];

export type Pillar = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const pillars: Pillar[] = [
  {
    id: "fabric",
    title: "Microsoft Fabric & Azure",
    description:
      "End-to-end platform design on the Fabric stack and the wider Azure data ecosystem.",
    items: [
      "Lakehouse & Warehouse",
      "Tabular / Semantic Models",
      "Data Pipelines & Notebooks",
      "Direct Lake",
      "Fabric Git integration",
      "Azure Data Factory",
      "ADLS Gen2 · Synapse",
      "Azure Data Explorer (KQL)",
      "Entra ID · Azure DevOps",
    ],
  },
  {
    id: "ai",
    title: "AI-Augmented Engineering",
    description:
      "Coding agents used inside the workflow — not as chat — to compress delivery time without giving up review discipline.",
    items: [
      "GitHub Copilot · Cursor",
      "Claude · Gemini",
      "NotebookLM",
      "Code generation & refactoring",
      "API integrations",
      "Pipeline scaffolding",
      "Test generation",
      "Technical documentation",
    ],
  },
  {
    id: "engineering",
    title: "Data Engineering & Architecture",
    description:
      "Governed, versioned pipelines built to scale from raw ingestion to curated business layers.",
    items: [
      "Databricks · dbt",
      "Medallion (Bronze/Silver/Gold)",
      "ETL / ELT pipelines",
      "Apache Spark (PySpark)",
      "CI/CD & version control",
      "REST / SOAP · OAuth",
      "SQL Server · Postgres · MySQL",
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Business Intelligence",
    description:
      "Award-winning dashboard craft backed by rigorous modeling and data storytelling.",
    items: [
      "Power BI (advanced DAX & M)",
      "Tableau",
      "Star schema modeling",
      "Data storytelling",
      "UX/UI for analytics",
      "AI-driven demand forecasting",
      "Python (Pandas, scikit-learn)",
    ],
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Microsoft",
    title: "Senior Fabric / BI Engineer (Contractor)",
    period: "2025 — Present",
    current: true,
    points: [
      "Fabric workspace architecture and scalable semantic models for an internal Microsoft team.",
      "Cross-domain unification of Splunk, Azure Data Explorer and CRM data into a governed Lakehouse.",
      "Pipeline and semantic model optimization to clear capacity bottlenecks and cut dashboard latency.",
    ],
  },
  {
    company: "NuvemShop · Tiendanube",
    title: "Business Intelligence Tech Lead",
    period: "2025 — 2026",
    points: [
      "Led a multicultural, fully remote analytics team across Brazil and Argentina.",
      "Architected the Data Warehouse Gold Layer with dbt and Databricks.",
      "Redesigned the Tableau data model around a star schema for performance at scale.",
    ],
  },
  {
    company: "Axia Agro",
    title: "Business Intelligence Tech Lead",
    period: "2024 — 2025",
    points: [
      "Databricks migration with PySpark ETL, driving a 60% platform cost reduction.",
      "Real-time credit scoring, commission tracking and pricing transparency.",
      "Automated workflows through Power Automate and RESTful API integrations.",
    ],
  },
  {
    company: "Agrogalaxy",
    title: "Data Specialist",
    period: "2021 — 2024",
    points: [
      "Led the Commercial Excellence Project across customer-service operations.",
      "AI-driven order scheduling improving processing time by 60%.",
      "KPI framework from N1 to C-level, lifting sales productivity by 118%.",
    ],
  },
  {
    company: "Adubos Araguaia",
    title: "Senior Data Analyst",
    period: "2019 — 2021",
    points: [
      "Sales performance analytics contributing to 207% YoY revenue growth.",
      "Calculation tooling that supported opening 9 new stores and 1 manufacturing facility.",
    ],
  },
];

export const awards = [
  {
    title: "Power BI World Championship",
    detail: "Competitor — award-winning dashboard design",
    year: "2025",
  },
  {
    title: "Excel World Championship, Brazil",
    detail: "Top 5 — FMWC-recognized spreadsheet engineering",
    year: "—",
  },
  {
    title: "IEL Internship Award",
    detail: "1st Place",
    year: "2019",
  },
  {
    title: "Public Speaking & Communication",
    detail: "Vox2U training program",
    year: "2020 — 2021",
  },
] as const;

export const education = [
  {
    school: "Universidade Federal de Goiás",
    degree: "Postgraduate — Databases for Big Data",
    year: "2023 — 2024",
  },
  {
    school: "Massachusetts Institute of Technology",
    degree: "Short-Term Program — Data Science & Big Data",
    year: "2022",
  },
  {
    school: "Fundação Getúlio Vargas",
    degree: "Postgraduate — Business Administration",
    year: "2020 — 2022",
  },
  {
    school: "Universidade Federal de Goiás",
    degree: "B.Sc. — Civil Engineering",
    year: "2014 — 2019",
  },
] as const;

export const languages = [
  { name: "English", level: "Fluent · C1" },
  { name: "Portuguese", level: "Native" },
  { name: "Spanish", level: "Fluent" },
] as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Dashboards", href: "#dashboards" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
] as const;
