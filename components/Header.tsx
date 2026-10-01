"use client"
import { useEffect, useState } from "react"
import ThemeToggle from "@/components/ThemeToggle"
import { MenuIcon, CloseIcon } from "@/components/ui/Icons"
import { NAV_ITEMS, PROFILE } from "@/data/profile"
import { cn } from "@/lib/cn"

function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

const IDS = NAV_ITEMS.map((i) => i.id)

/** Public navigation. The admin dashboard is intentionally NOT linked here (see Footer). */
export default function Header() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)

  const linkClass = (id: string) => cn("text-sm tracking-wide transition-colors duration-200", active === id ? "font-bold text-text-primary" : "font-medium text-text-secondary hover:text-text-primary")

  return (
    <header className="fixed left-0 right-0 top-3 z-50 flex justify-center px-3 md:top-6 md:px-4">
      <div className="relative w-full max-w-5xl">
        <div className="flex items-center justify-between rounded-full border border-text-secondary/20 bg-background/80 px-5 py-3 shadow-lg backdrop-blur-md md:px-8 md:py-4">
          <a href="#home" className="whitespace-nowrap text-lg font-black tracking-tighter text-text-primary md:text-2xl">
            {PROFILE.name}
          </a>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={linkClass(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button type="button" className="cursor-pointer text-text-secondary lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Toggle menu">
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label="Mobile" className="absolute right-0 top-full mt-3 flex w-56 flex-col gap-5 rounded-2xl border border-text-secondary/10 bg-background/95 p-6 shadow-xl backdrop-blur-md lg:hidden">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className={linkClass(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
