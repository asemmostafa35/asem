import type { ProjectInput } from "@/lib/types"

/** Only allow http(s) URLs so stored links can never be `javascript:` URLs. */
export function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

function isSafeImage(value: string): boolean {
  return (value.startsWith("/") && !value.startsWith("//")) || isSafeHttpUrl(value)
}

type ParseResult = { ok: true; data: ProjectInput } | { ok: false; error: string }

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")
const list = (v: unknown, maxItems: number, maxLen: number) =>
  Array.isArray(v) ? v.map((x) => str(x, maxLen)).filter(Boolean).slice(0, maxItems) : []

/** Server-side validation + normalisation of untrusted project payloads. */
export function parseProjectInput(raw: unknown): ParseResult {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid request body." }
  const body = raw as Record<string, unknown>

  const title = str(body.title, 80)
  const description = str(body.description, 600)
  if (!title) return { ok: false, error: "Title is required." }
  if (!description) return { ok: false, error: "Description is required." }

  const image = str(body.image, 500)
  const liveUrl = str(body.liveUrl, 500)
  const githubUrl = str(body.githubUrl, 500)
  if (image && !isSafeImage(image)) return { ok: false, error: "Image must be a /public path or an http(s) URL." }
  if (liveUrl && !isSafeHttpUrl(liveUrl)) return { ok: false, error: "Live URL must start with http:// or https://." }
  if (githubUrl && !isSafeHttpUrl(githubUrl)) return { ok: false, error: "GitHub URL must start with http:// or https://." }

  return {
    ok: true,
    data: {
      title,
      description,
      category: str(body.category, 40) || "Web Application",
      features: list(body.features, 8, 100),
      tech: list(body.tech, 12, 30),
      image: image || undefined,
      liveUrl: liveUrl || undefined,
      githubUrl: githubUrl || undefined,
      featured: body.featured === true,
    },
  }
}
