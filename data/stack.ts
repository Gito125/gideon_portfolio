export interface StackGroup {
  title: string;
  items: string[];
}

export const stackGroups = [
  {
    title: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "Redis",
      "Supabase",
    ],
  },
  {
    title: "Tools",
    items: ["Vercel", "PNPM", "GitHub Actions", "Figma", "Postman"],
  },
  {
    title: "Currently Learning",
    items: ["Edge runtimes", "Observability", "Web performance"],
  },
] satisfies StackGroup[];
