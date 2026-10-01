"use client"
import { useCallback, useState } from "react"
import type { Project, ProjectInput } from "@/lib/types"

type ApiResult<T> = { success: true; data: T } | { success: false; error: string }

async function request<T>(url: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined })
  const json = (await res.json().catch(() => null)) as ApiResult<T> | null
  if (!json || !json.success) throw new Error(json && !json.success ? json.error : "Request failed.")
  return json.data
}

/** Client-side state + API calls for managing projects in the dashboard. */
export function useProjectsAdmin(initial: Project[]) {
  const [projects, setProjects] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(async (work: () => Promise<void>): Promise<boolean> => {
    setBusy(true)
    setError(null)
    try {
      await work()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
      return false
    } finally {
      setBusy(false)
    }
  }, [])

  const create = (input: ProjectInput) =>
    run(async () => {
      const created = await request<Project>("/api/projects", "POST", input)
      setProjects((list) => [created, ...list])
    })

  const update = (id: string, input: ProjectInput) =>
    run(async () => {
      const updated = await request<Project>(`/api/projects/${id}`, "PUT", input)
      setProjects((list) => list.map((p) => (p.id === id ? updated : p)))
    })

  const remove = (id: string) =>
    run(async () => {
      await request(`/api/projects/${id}`, "DELETE")
      setProjects((list) => list.filter((p) => p.id !== id))
    })

  const toggleFeatured = (project: Project) => {
    const { id, ...rest } = project
    return update(id, { ...rest, featured: !project.featured })
  }

  return { projects, busy, error, clearError: () => setError(null), create, update, remove, toggleFeatured }
}
