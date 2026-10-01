import { promises as fs } from "node:fs"
import path from "node:path"
import { SEED_PROJECTS } from "@/data/projects.seed"
import type { Project } from "@/lib/types"

/**
 * Storage adapter for projects.
 *  - Upstash Redis / Vercel KV (REST) when UPSTASH_REDIS_REST_URL/TOKEN (or KV_REST_API_URL/TOKEN) are set -> works on Vercel.
 *  - Otherwise a JSON file at ./data/projects.json -> works on a VPS / local machine (read-only on Vercel).
 */

const KEY = "asem:portfolio:projects"
const FILE = path.join(process.cwd(), "data", "projects.json")

const REST_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN

export type StorageMode = "redis" | "file"

export function getStorageMode(): StorageMode {
  return REST_URL && REST_TOKEN ? "redis" : "file"
}

export function isEphemeralHost(): boolean {
  return getStorageMode() === "file" && Boolean(process.env.VERCEL)
}

async function redis<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${REST_URL}/${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Storage request failed (${res.status})`)
  return ((await res.json()) as { result: T }).result
}

export async function readProjects(): Promise<Project[]> {
  try {
    if (getStorageMode() === "redis") {
      const raw = await redis<string | null>(`get/${KEY}`)
      return raw ? (JSON.parse(raw) as Project[]) : SEED_PROJECTS
    }
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Project[]
  } catch {
    // Nothing stored yet (or unreadable): fall back to the seed data.
    return SEED_PROJECTS
  }
}

export async function writeProjects(projects: Project[]): Promise<void> {
  if (getStorageMode() === "redis") {
    await redis(`set/${KEY}`, { method: "POST", body: JSON.stringify(projects) })
    return
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true })
  await fs.writeFile(FILE, JSON.stringify(projects, null, 2), "utf8")
}
