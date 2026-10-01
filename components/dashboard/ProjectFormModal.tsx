"use client"
import { useState } from "react"
import Button from "@/components/ui/Button"
import { Input, Textarea } from "@/components/ui/Input"
import Modal from "@/components/ui/Modal"
import Alert from "@/components/ui/Alert"
import type { Project, ProjectInput } from "@/lib/types"

interface FormState {
  title: string
  category: string
  description: string
  tech: string
  features: string
  image: string
  liveUrl: string
  githubUrl: string
  featured: boolean
}

const toForm = (p?: Project): FormState => ({
  title: p?.title ?? "",
  category: p?.category ?? "",
  description: p?.description ?? "",
  tech: p?.tech.join(", ") ?? "",
  features: p?.features.join("\n") ?? "",
  image: p?.image ?? "",
  liveUrl: p?.liveUrl ?? "",
  githubUrl: p?.githubUrl ?? "",
  featured: p?.featured ?? false,
})

const toInput = (f: FormState): ProjectInput => ({
  title: f.title.trim(),
  category: f.category.trim(),
  description: f.description.trim(),
  tech: f.tech.split(",").map((t) => t.trim()).filter(Boolean),
  features: f.features.split("\n").map((t) => t.trim()).filter(Boolean),
  image: f.image.trim() || undefined,
  liveUrl: f.liveUrl.trim() || undefined,
  githubUrl: f.githubUrl.trim() || undefined,
  featured: f.featured,
})

interface Props {
  open: boolean
  project?: Project
  busy: boolean
  error: string | null
  onClose: () => void
  onSubmit: (input: ProjectInput) => void
}

/** Wrapper keeps the form mounted only while open, so state resets naturally for every add / edit. */
export default function ProjectFormModal(props: Props) {
  return (
    <Modal open={props.open} onClose={props.onClose} title={props.project ? "Edit project" : "Add project"} size="lg">
      {props.open && <ProjectFormBody {...props} />}
    </Modal>
  )
}

function ProjectFormBody({ project, busy, error, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(() => toForm(project))
  const set = <K extends keyof FormState>(key: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: key === "featured" ? (e.target as HTMLInputElement).checked : e.target.value }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(toInput(form))
      }}
      className="space-y-5"
    >
      {error && <Alert type="error">{error}</Alert>}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Title" value={form.title} onChange={set("title")} required maxLength={80} />
        <Input label="Category" value={form.category} onChange={set("category")} placeholder="E-commerce" maxLength={40} />
      </div>
      <Textarea label="Description" value={form.description} onChange={set("description")} required rows={4} maxLength={600} />
      <Input label="Technologies" value={form.tech} onChange={set("tech")} hint="Comma separated: Next.js, React, Tailwind CSS" />
      <Textarea label="Key features" value={form.features} onChange={set("features")} rows={3} hint="One feature per line" />
      <Input label="Live URL" type="url" value={form.liveUrl} onChange={set("liveUrl")} placeholder="https://..." />
      <Input label="GitHub URL" type="url" value={form.githubUrl} onChange={set("githubUrl")} placeholder="https://github.com/..." />
      <Input label="Image (optional)" value={form.image} onChange={set("image")} placeholder="/projects/cover.png or https://..." hint="Leave empty to use a generated cover." />
      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-text-primary">
        <input type="checkbox" checked={form.featured} onChange={set("featured")} className="h-4 w-4 accent-current" />
        Featured project
      </label>
      <div className="flex flex-col-reverse gap-3 border-t border-text-secondary/10 pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" loading={busy}>
          {project ? "Save changes" : "Add project"}
        </Button>
      </div>
    </form>
  )
}
