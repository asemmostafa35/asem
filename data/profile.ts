/**
 * Single source of truth for personal details.
 * Edit this file to change the name, contact info, links and copy across the whole site.
 */

export type SocialId = "linkedin" | "github" | "instagram" | "tiktok" | "whatsapp" | "email"

export interface SocialLink {
  id: SocialId
  label: string
  handle: string
  href: string
}

const WHATSAPP_NUMBER = "201044488696" // international format, digits only (wa.me requirement)
const PRIMARY_EMAIL = "asemziidan@gmail.com"

export const PROFILE = {
  name: "Asem Mostafa",
  firstName: "Asem",
  title: "Senior Full Stack Developer",
  experience: "2+ Years",
  location: "Tanta, Egypt",
  emails: [PRIMARY_EMAIL, "asemziidan@gmail.com"],
  primaryEmail: PRIMARY_EMAIL,
  phone: "+20 104 448 8696",
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappGreeting: "Hi Asem, I found your portfolio and would like to talk about a project.",
  /** Drop your photo at /public/avatar.jpg (or change this path). */
  avatar: "/avatar.jpg",
  roles: ["Senior Full Stack Developer", "React & Next.js Engineer", "Node.js API Developer"],
  heroIntro:
    "I design, build and ship production-ready web applications end to end: fast, accessible front ends backed by clean, scalable APIs. Over 2+ years I've delivered e-commerce platforms and business websites for real clients.",
  about: {
    who: "I'm a full stack developer with 2+ years of hands-on experience turning business requirements into reliable web products. I work across the stack with React, Next.js, TypeScript, Node.js and modern databases, and I take features from idea and architecture through deployment.",
    approach:
      "I care about maintainable code, measurable performance and interfaces people enjoy using. Every project gets a clear structure, reusable components, sensible testing of critical paths and honest communication, so the result is easy to extend long after launch.",
  },
  stats: ["2+ Years Experience", "React & Next.js Specialist", "Based in Tanta, Egypt"],
  marquee: ["Hello I'm Asem Mostafa", "Full Stack Developer"],
} as const

export const SOCIALS: SocialLink[] = [
  { id: "whatsapp", label: "WhatsApp", handle: PROFILE.phone, href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { id: "email", label: "Email", handle: PRIMARY_EMAIL, href: `mailto:${PRIMARY_EMAIL}` },
  { id: "linkedin", label: "LinkedIn", handle: "Asem Mostafa", href: "https://www.linkedin.com/in/asem-mostafa-887737372/" },
  { id: "github", label: "GitHub", handle: "asemmostafa35", href: "https://github.com/asemmostafa35" },
  { id: "instagram", label: "Instagram", handle: "@asem_ziidan", href: "https://www.instagram.com/asem_ziidan/" },
  { id: "tiktok", label: "TikTok", handle: "@asemziidan", href: "https://www.tiktok.com/@asemziidan/" },
]

export const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "techstack" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
] as const
