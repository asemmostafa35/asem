"use client"
import Image from "next/image"
import { useState } from "react"
import type { Project } from "@/lib/types"
import { cn } from "@/lib/cn"

const GRADIENTS = ["from-slate-800 to-slate-600", "from-zinc-800 to-neutral-600", "from-stone-800 to-stone-600", "from-gray-800 to-gray-600"]

function hostnameOf(url?: string): string | null {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return null
  }
}

/**
 * Fallback cover for projects that can't show a live preview (no live URL, or the site blocks embedding).
 * Uses project.image only if you explicitly set one in the dashboard; otherwise a generated monogram cover.
 */
export default function ProjectCover({ project, className }: { project: Pick<Project, "title" | "image" | "liveUrl">; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const src = project.image && project.image !== failedSrc ? project.image : null

  if (src) {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-text-secondary/5", className)}>
        <Image src={src} alt={`${project.title} cover`} fill unoptimized sizes="(max-width: 768px) 100vw, 400px" onError={() => setFailedSrc(src)} className="object-cover object-top" />
      </div>
    )
  }

  const host = hostnameOf(project.liveUrl)
  const gradient = GRADIENTS[project.title.length % GRADIENTS.length]
  return (
    <div aria-hidden="true" className={cn("relative flex aspect-[16/10] flex-col items-center justify-center gap-2 overflow-hidden bg-gradient-to-br", gradient, className)}>
      <span className="select-none text-7xl font-black tracking-tighter text-white/90">{project.title.slice(0, 2)}</span>
      {host && <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/80">{host}</span>}
    </div>
  )
}
