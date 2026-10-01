import { randomUUID } from "node:crypto"
import { readProjects, writeProjects } from "@/lib/project-store"
import type { Project, ProjectInput } from "@/lib/types"

/** Featured projects first; otherwise keep the stored order. */
export function sortForDisplay(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured))
}

export async function getProjects(): Promise<Project[]> {
  return readProjects()
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const project: Project = { id: randomUUID(), ...input }
  await writeProjects([project, ...(await readProjects())])
  return project
}

export async function updateProject(id: string, input: ProjectInput): Promise<Project | null> {
  const all = await readProjects()
  if (!all.some((p) => p.id === id)) return null
  const updated: Project = { id, ...input }
  await writeProjects(all.map((p) => (p.id === id ? updated : p)))
  return updated
}

export async function deleteProject(id: string): Promise<boolean> {
  const all = await readProjects()
  if (!all.some((p) => p.id === id)) return false
  await writeProjects(all.filter((p) => p.id !== id))
  return true
}
