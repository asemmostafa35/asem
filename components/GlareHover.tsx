"use client"
import { useRef } from "react"
import { cn } from "@/lib/cn"

/** Adds a diagonal glare sweep on hover. Purely decorative; ignored on touch devices. */
export default function GlareHover({ children, className }: { children: React.ReactNode; className?: string }) {
  const glare = useRef<HTMLDivElement>(null)

  const sweep = (to: string) => {
    if (glare.current) glare.current.style.backgroundPosition = to
  }

  return (
    <div className={cn("relative overflow-hidden", className)} onMouseEnter={() => sweep("100% 100%")} onMouseLeave={() => sweep("-100% -100%")}>
      <div
        ref={glare}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-[background-position] duration-700 ease-out"
        style={{ background: "linear-gradient(-45deg, transparent 60%, rgba(255,255,255,0.35) 70%, transparent 100%)", backgroundSize: "250% 250%", backgroundRepeat: "no-repeat", backgroundPosition: "-100% -100%" }}
      />
      {children}
    </div>
  )
}
