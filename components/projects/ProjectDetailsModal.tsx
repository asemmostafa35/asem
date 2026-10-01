"use client"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import LivePreview from "@/components/projects/LivePreview"
import Modal from "@/components/ui/Modal"
import { ExternalLinkIcon, GitHubIcon } from "@/components/ui/Icons"
import type { PreviewProject } from "@/lib/types"

export default function ProjectDetailsModal({ project, onClose }: { project: PreviewProject | null; onClose: () => void }) {
  return (
    <Modal
      open={project !== null}
      onClose={onClose}
      title={project?.title ?? ""}
      footer={
        project && (
          <>
            {project.liveUrl && (
              <Button href={project.liveUrl} size="lg" className="flex-1" rightIcon={<ExternalLinkIcon className="h-4 w-4" />}>
                Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="outline" size="lg" className="flex-1" leftIcon={<GitHubIcon className="h-4 w-4" />}>
                Source Code
              </Button>
            )}
          </>
        )
      }
    >
      {project && (
        <div className="space-y-8">
          {project.liveUrl && project.embeddable && <LivePreview url={project.liveUrl} title={project.title} interactive className="rounded-2xl border border-text-secondary/15" />}
          <div>
            <Badge tone="solid">{project.category}</Badge>
            <p className="mt-4 text-base font-medium leading-relaxed text-text-secondary">{project.description}</p>
          </div>
          {project.tech.length > 0 && (
            <div>
              <h5 className="mb-3 text-xs font-bold uppercase tracking-widest text-text-secondary">Technologies</h5>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          )}
          {project.features.length > 0 && (
            <div>
              <h5 className="mb-3 text-xs font-bold uppercase tracking-widest text-text-secondary">Key Features</h5>
              <ul className="space-y-3">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 rounded-xl border border-text-secondary/5 bg-thirdary/50 p-4 text-sm font-bold text-text-primary">
                    <span aria-hidden="true">&rarr;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
