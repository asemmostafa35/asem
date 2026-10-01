"use client"
import { useCallback, useState } from "react"
import FadeUp from "@/components/animations/FadeUp"
import ProjectCard from "@/components/projects/ProjectCard"
import ProjectDetailsModal from "@/components/projects/ProjectDetailsModal"
import Button from "@/components/ui/Button"
import Section from "@/components/ui/Section"
import SectionHeading from "@/components/ui/SectionHeading"
import { GitHubIcon } from "@/components/ui/Icons"
import { SOCIALS } from "@/data/profile"
import type { PreviewProject } from "@/lib/types"

const GITHUB = SOCIALS.find((s) => s.id === "github")?.href ?? "#"

export default function Projects({ projects }: { projects: PreviewProject[] }) {
  const [selected, setSelected] = useState<PreviewProject | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <Section id="projects">
      <SectionHeading eyebrow="Portfolio" title="Selected Works" description="Real projects running live. Each preview below is the actual deployed website." />

      {projects.length === 0 ? (
        <p className="text-text-secondary">Projects are coming soon.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <li key={project.id}>
              <FadeUp className="h-full">
                <ProjectCard project={project} index={i} onDetails={setSelected} />
              </FadeUp>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-14 flex justify-center">
        <Button href={GITHUB} variant="outline" size="lg" leftIcon={<GitHubIcon className="h-5 w-5" />}>
          View More on GitHub
        </Button>
      </div>

      <ProjectDetailsModal project={selected} onClose={close} />
    </Section>
  )
}
