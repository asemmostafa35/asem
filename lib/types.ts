export interface Project {
  id: string
  title: string
  category: string
  description: string
  features: string[]
  tech: string[]
  /** Optional cover image: a `/public` path or an https URL. Falls back to a generated cover. */
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

/** Shape accepted by the create / update API (id is assigned by the server). */
export type ProjectInput = Omit<Project, "id">

/** A project plus whether its live site allows being embedded in an iframe (checked on the server). */
export interface PreviewProject extends Project {
  embeddable: boolean
}
