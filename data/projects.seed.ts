import type { Project } from "@/lib/types"

/**
 * Initial projects shown before anything is saved from the dashboard.
 * Once you add/edit/delete in /dashboard the stored data takes over.
 * Descriptions are starter copy: refine them from the dashboard.
 */
export const SEED_PROJECTS: Project[] = [
  {
    id: "freshcart",
    title: "FreshCart",
    category: "E-commerce",
    description: "A modern grocery e-commerce application with product browsing, cart and checkout flows, built mobile-first for fast, friction-free shopping.",
    features: ["Product catalogue & search", "Cart and checkout flow", "Responsive mobile-first UI"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://freshcart-five-pi.vercel.app/",
    githubUrl: "https://github.com/asemmostafa35/freshcart",
    featured: true,
  },
  {
    id: "sawani",
    title: "Sawani UAE",
    category: "Business Website",
    description: "A professional company website for a UAE-based business, focused on clear service presentation, strong SEO foundations and fast load times.",
    features: ["SEO-friendly structure", "Fast, optimised pages", "Fully responsive layout"],
    tech: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://sawani.ae/",
    featured: true,
  },
  {
    id: "future-swim",
    title: "Future Swim SA",
    category: "Business Website",
    description: "A clean, conversion-focused website for a swimming academy in Saudi Arabia, presenting programmes and making it easy for families to get in touch.",
    features: ["Programme showcase", "Contact-first navigation", "Mobile-optimised design"],
    tech: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://www.futureswim.sa/",
    featured: true,
  },
  {
    id: "laser-traders",
    title: "Laser Traders",
    category: "E-commerce",
    description: "A product-led trading website that showcases the catalogue clearly and guides visitors to enquire or order.",
    features: ["Product catalogue", "Enquiry-focused flow", "Responsive design"],
    tech: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://laser-traders.vercel.app/",
    featured: false,
  },
  {
    id: "stampiree",
    title: "Stampiree",
    category: "Web Application",
    description: "A web application with a focus on a clean interface and smooth interactions across desktop and mobile.",
    features: ["Clean, modern UI", "Smooth interactions", "Responsive across devices"],
    tech: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://stampiree.vercel.app/",
    featured: false,
  },
  {
    id: "luxe",
    title: "Luxe",
    category: "Full Stack Application",
    description: "A polished, responsive web application with a clean component-driven frontend, deployed to the cloud on Railway.",
    features: ["Responsive, polished UI", "Clean component architecture", "Cloud deployment on Railway"],
    tech: ["React", "Node.js", "Railway"],
    liveUrl: "https://luxe-frontend-production-bdfa.up.railway.app/",
    featured: false,
  },
]
