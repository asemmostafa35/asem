"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import DashboardCard from "@/components/dashboard/DashboardCard"
import ProjectFormModal from "@/components/dashboard/ProjectFormModal"
import ProjectRow from "@/components/dashboard/ProjectRow"
import ThemeToggle from "@/components/ThemeToggle"
import Alert from "@/components/ui/Alert"
import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import { FolderIcon, LayersIcon, LinkIcon, LogoutIcon, PlusIcon, StarIcon } from "@/components/ui/Icons"
import { useProjectsAdmin } from "@/hooks/useProjectsAdmin"
import type { Project } from "@/lib/types"

interface Props {
  email: string
  initialProjects: Project[]
  storageWarning: boolean
}

type FormTarget = { mode: "closed" } | { mode: "add" } | { mode: "edit"; project: Project }

export default function DashboardClient({ email, initialProjects, storageWarning }: Props) {
  const router = useRouter()
  const { projects, busy, error, clearError, create, update, remove, toggleFeatured } = useProjectsAdmin(initialProjects)
  const [form, setForm] = useState<FormTarget>({ mode: "closed" })
  const [toDelete, setToDelete] = useState<Project | null>(null)

  const closeForm = () => {
    clearError()
    setForm({ mode: "closed" })
  }

  const stats = {
    total: projects.length,
    featured: projects.filter((p) => p.featured).length,
    live: projects.filter((p) => p.liveUrl).length,
    tech: new Set(projects.flatMap((p) => p.tech)).size,
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.refresh()
  }

  const submitForm = async (input: Parameters<typeof create>[0]) => {
    const ok = form.mode === "edit" ? await update(form.project.id, input) : await create(input)
    if (ok) closeForm()
  }

  const confirmDelete = async () => {
    if (toDelete && (await remove(toDelete.id))) setToDelete(null)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 md:py-12">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-text-primary md:text-4xl">Dashboard</h1>
          <p className="text-sm font-medium text-text-secondary">Signed in as {email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />
          <Button href="/" variant="outline" size="sm">
            View site
          </Button>
          <Button variant="ghost" size="sm" onClick={logout} leftIcon={<LogoutIcon className="h-4 w-4" />}>
            Log out
          </Button>
        </div>
      </header>

      {storageWarning && (
        <Alert type="info" className="mb-6">
          This host has a read-only filesystem, so saved changes won&apos;t persist. Connect Upstash Redis / Vercel KV (see README) to store projects permanently.
        </Alert>
      )}

      <section aria-label="Overview" className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Projects" value={stats.total} icon={<FolderIcon />} />
        <DashboardCard label="Featured" value={stats.featured} icon={<StarIcon />} />
        <DashboardCard label="With live demo" value={stats.live} icon={<LinkIcon />} />
        <DashboardCard label="Technologies" value={stats.tech} icon={<LayersIcon />} />
      </section>

      <section aria-label="Projects">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-black tracking-tight text-text-primary">Manage projects</h2>
          <Button size="sm" onClick={() => setForm({ mode: "add" })} leftIcon={<PlusIcon className="h-4 w-4" />}>
            Add project
          </Button>
        </div>

        {error && form.mode === "closed" && !toDelete && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}

        {projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-text-secondary/30 p-10 text-center text-text-secondary">No projects yet. Add your first one.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} disabled={busy} onEdit={(project) => setForm({ mode: "edit", project })} onDelete={setToDelete} onToggleFeatured={toggleFeatured} />
            ))}
          </ul>
        )}
      </section>

      <ProjectFormModal open={form.mode !== "closed"} project={form.mode === "edit" ? form.project : undefined} busy={busy} error={error} onClose={closeForm} onSubmit={submitForm} />

      <Modal
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        title="Delete project?"
        size="sm"
        footer={
          <>
            <Button variant="outline" className="flex-1" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" className="flex-1" loading={busy} onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm font-medium text-text-secondary">
          <strong className="text-text-primary">{toDelete?.title}</strong> will be removed from your portfolio. This can&apos;t be undone.
        </p>
        {error && <Alert type="error" className="mt-4">{error}</Alert>}
      </Modal>

      <p className="mt-12 text-center text-xs text-text-secondary/60">
        <Link href="/">&larr; Back to portfolio</Link>
      </p>
    </div>
  )
}
