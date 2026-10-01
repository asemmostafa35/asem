import Footer from "@/components/Footer"
import Header from "@/components/Header"
import PageLoader from "@/components/PageLoader"
import WhatsAppFab from "@/components/WhatsAppFab"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Experience from "@/components/sections/Experience"
import Hero from "@/components/sections/Hero"
import Projects from "@/components/sections/Projects"
import TechStack from "@/components/sections/TechStack"
import { canEmbed } from "@/lib/embed-check"
import { getProjects, sortForDisplay } from "@/lib/projects"
import type { PreviewProject } from "@/lib/types"

// Re-check which live sites allow embedding at most once an hour.
export const revalidate = 3600

export default async function Home() {
  const stored = sortForDisplay(await getProjects())
  const projects: PreviewProject[] = await Promise.all(stored.map(async (p) => ({ ...p, embeddable: p.liveUrl ? await canEmbed(p.liveUrl) : false })))
  return (
    <>
      <PageLoader />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
