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
    image: "/images/projects/acadex-project-image.png",
    link: "https://acadex-ed.vercel.app/",
    github: "https://github.com/Gito125/Acadex",
    featured: false,
  },
  {
    id: "digital-drift-blog",
    title: "Digital Drift Blog",
    category: "Tech Blog",
    description:
      "A cutting-edge blog platform powered by Next.js 16. Dive into the latest in web development, AI, and emerging technologies.",
    year: 2024,
    stack: ["React", "TypeScript", "MongoDB"],
    image: "/images/projects/digital-drift-blog.png",
    link: "https://digital-drift-blog.vercel.app/",
    github: "https://github.com/Gito125/digital_drift_blog",
    featured: false,
  },
] satisfies Project[];
