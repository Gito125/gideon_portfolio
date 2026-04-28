export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: number;
  stack: string[];
  image: string;
  link?: string;
  github?: string;
  featured: boolean;
}

export const projects = [
  {
    id: "acadex",
    title: "Acadex",
    category: "School Management Platform",
    description:
      "An end-to-end system for admissions, fees, reporting, and daily school operations built for clarity and scale.",
    year: 2025,
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "GSAP"],
    image: "/images/projects/acadex-placeholder.svg",
    link: "https://example.com/acadex",
    github: "https://github.com/placeholder/acadex",
    featured: true,
  },
  {
    id: "kora-crm",
    title: "Kora CRM",
    category: "Customer Operations",
    description:
      "A focused CRM that turns pipeline chaos into clean workflows with automation, notes, and shared timelines.",
    year: 2024,
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    image: "/images/projects/kora-crm-placeholder.svg",
    link: "https://example.com/kora-crm",
    github: "https://github.com/placeholder/kora-crm",
    featured: false,
  },
  {
    id: "signal-ledger",
    title: "Signal Ledger",
    category: "Fintech Analytics",
    description:
      "A reporting suite that surfaces cashflow, risk, and growth signals for modern finance teams.",
    year: 2023,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    image: "/images/projects/signal-ledger-placeholder.svg",
    link: "https://example.com/signal-ledger",
    github: "https://github.com/placeholder/signal-ledger",
    featured: false,
  },
] satisfies Project[];
