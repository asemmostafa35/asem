import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import ProjectCover from "@/components/projects/ProjectCover"
import { EditIcon, StarIcon, TrashIcon } from "@/components/ui/Icons"
import type { Project } from "@/lib/types"

interface Props {
  project: Project
  disabled: boolean
  onEdit: (p: Project) => void
  onDelete: (p: Project) => void
  onToggleFeatured: (p: Project) => void
}

export default function ProjectRow({ project, disabled, onEdit, onDelete, onToggleFeatured }: Props) {
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-text-secondary/20 bg-background p-4 sm:flex-row sm:items-center">
      <ProjectCover project={project} className="w-full shrink-0 rounded-xl sm:w-40" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-black tracking-tight text-text-primary">{project.title}</h3>
          {project.featured && <Badge tone="solid">Featured</Badge>}
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">{project.category}</p>
        <p className="mt-2 line-clamp-2 text-sm font-medium text-text-secondary">{project.description}</p>
      </div>
      <div className="flex gap-2 sm:flex-col">
        <Button size="sm" variant="outline" disabled={disabled} onClick={() => onToggleFeatured(project)} leftIcon={<StarIcon filled={project.featured} className="h-4 w-4" />} aria-pressed={project.featured}>
          {project.featured ? "Unfeature" : "Feature"}
        </Button>
        <Button size="sm" variant="outline" disabled={disabled} onClick={() => onEdit(project)} leftIcon={<EditIcon className="h-4 w-4" />}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" disabled={disabled} onClick={() => onDelete(project)} leftIcon={<TrashIcon className="h-4 w-4" />} className="hover:!text-red-500">
          Delete
        </Button>
      </div>
    </li>
  )
}
