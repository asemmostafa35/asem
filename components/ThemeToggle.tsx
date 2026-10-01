"use client"
import { MoonIcon, SunIcon } from "@/components/ui/Icons"
import { useTheme } from "@/hooks/useTheme"

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button type="button" onClick={toggle} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="cursor-pointer p-1 text-text-secondary transition-colors hover:text-text-primary">
      {isDark ? <MoonIcon className="h-5 w-5 md:h-6 md:w-6" /> : <SunIcon className="h-5 w-5 md:h-6 md:w-6" />}
    </button>
  )
}
