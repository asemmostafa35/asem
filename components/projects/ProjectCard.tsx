import Badge from "@/components/ui/Badge"
import GlareHover from "@/components/GlareHover"
import ProjectPreview from "@/components/projects/ProjectPreview"
import { ExternalLinkIcon } from "@/components/ui/Icons"
import type { PreviewProject } from "@/lib/types"

interface ProjectCardProps {
  project: PreviewProject
  index: number
  onDetails: (project: PreviewProject) => void
}

export default function ProjectCard({ project, index, onDetails }: ProjectCardProps) {
  const primaryLink = project.liveUrl ?? project.githubUrl
  return (
    <GlareHover className="group flex h-full flex-col rounded-xl border border-text-secondary/20 bg-background shadow-sm transition-all duration-500 hover:border-text-primary/50 hover:shadow-2xl">
      <div className="relative border-b border-text-secondary/10">
        <ProjectPreview project={project} className="transition-transform duration-700 group-hover:scale-105" />
        {project.featured && <Badge tone="solid" className="absolute left-3 top-3 z-20">Featured</Badge>}
        <div className="pointer-events-none absolute right-3 top-3 z-20 flex max-w-[65%] -translate-y-2 flex-wrap justify-end gap-2 opacity-0 transition-all duration-500 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          {project.tech.slice(0, 3).map((t) => (
            <Badge key={t} tone="glass">{t}</Badge>
          ))}
          {project.tech.length > 3 && <Badge tone="glass">+{project.tech.length - 3}</Badge>}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full border border-text-secondary/20 bg-background px-3 py-1 text-[10px] font-bold tracking-widest text-text-secondary shadow-sm">{String(index + 1).padStart(2, "0")}</span>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-text-secondary">{project.category}</p>
        <h4 className="mb-3 text-2xl font-black leading-tight tracking-tight text-text-primary">{project.title}</h4>
        <p className="mb-5 line-clamp-3 flex-1 text-sm font-medium leading-relaxed text-text-secondary">{project.description}</p>

        <div className="mb-6 hidden flex-wrap gap-2 [@media(hover:none)]:flex">
          {project.tech.slice(0, 3).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.tech.length > 3 && <Badge>+{project.tech.length - 3}</Badge>}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-text-secondary/10 pt-4">
          <button type="button" onClick={() => onDetails(project)} className="group/btn flex cursor-pointer items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-text-primary">
            View Details
            <span className="h-[2px] w-8 bg-text-primary transition-all duration-300 group-hover/btn:w-12" />
          </button>
          {primaryLink && (
            <a href={primaryLink} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="rounded-full border border-text-secondary/20 p-2 text-text-secondary transition-all duration-300 hover:border-text-primary hover:bg-text-primary hover:text-background">
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </GlareHover>
  )
}
