export interface Tech {
  name: string
  icon: string
}
export interface TechCategory {
  title: string
  description: string
  technologies: Tech[]
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Frontend",
    description: "Interfaces that are fast, accessible and pleasant to use.",
    technologies: [
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
      { name: "HTML5", icon: "/icons/html.svg" },
      { name: "CSS3", icon: "/icons/css.svg" },
      { name: "Framer Motion", icon: "/icons/framermotion.svg" },
    ],
  },
  {
    title: "Backend",
    description: "Server-side APIs and services that scale.",
    technologies: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Express.js", icon: "/icons/express.svg" },
      { name: "Go (Golang)", icon: "/icons/go.svg" },
      { name: "Fiber", icon: "/icons/fiber.svg" },
      { name: "Laravel", icon: "/icons/laravel.svg" },
    ],
  },
  {
    title: "Databases & ORM",
    description: "Reliable data modelling for SQL and NoSQL.",
    technologies: [
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "Prisma ORM", icon: "/icons/prisma.svg" },
    ],
  },
  {
    title: "Tools & Infrastructure",
    description: "Version control, containers, servers and API testing.",
    technologies: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Linux", icon: "/icons/linux.svg" },
      { name: "Nginx", icon: "/icons/nginx.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
    ],
  },
]
