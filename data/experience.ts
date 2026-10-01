export interface ExperienceItem {
  id: string
  role: string
  context: string
  period: string
  description: string
  skills: string[]
}

/** Edit freely: add your real employers / clients and dates here. */
export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "fullstack",
    role: "Senior Full Stack Developer",
    context: "Freelance & Client Work",
    period: "2+ Years",
    description:
      "Own the full delivery cycle for client web applications: requirements, architecture, UI, REST APIs, database design, deployment and post-launch support. Focused on performance, SEO and maintainable component-driven codebases.",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    id: "ecommerce",
    role: "E-commerce Platform Development",
    context: "FreshCart, Laser Traders and more",
    period: "Ongoing",
    description:
      "Built storefront experiences with product catalogues, carts and checkout flows, plus the admin and API layers behind them, optimised for mobile-first shoppers.",
    skills: ["State Management", "Payments-ready UX", "Responsive UI", "MongoDB"],
  },
  {
    id: "business",
    role: "Business & Corporate Websites",
    context: "Sawani UAE, Future Swim SA, RMA, Stampiree",
    period: "Ongoing",
    description:
      "Delivered polished, SEO-friendly marketing and service websites for companies across the region, with fast load times, clean design systems and easy content updates.",
    skills: ["SEO", "Tailwind CSS", "Performance", "Vercel"],
  },
]
