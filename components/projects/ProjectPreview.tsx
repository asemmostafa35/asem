import LivePreview from "@/components/projects/LivePreview"
import ProjectCover from "@/components/projects/ProjectCover"
import type { PreviewProject } from "@/lib/types"

/** Shows the real live site when the project has a live URL that allows embedding; otherwise a graceful cover. */
export default function ProjectPreview({ project, className }: { project: PreviewProject; className?: string }) {
  if (project.liveUrl && project.embeddable) return <LivePreview url={project.liveUrl} title={project.title} className={className} />
  return <ProjectCover project={project} className={className} />
}
