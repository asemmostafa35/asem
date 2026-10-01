"use client"
import { useCallback, useSyncExternalStore } from "react"

const subscribe = (notify: () => void) => {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

/** Reads the `dark` class (set before paint by the inline script in layout.tsx). */
export function useTheme() {
  const isDark = useSyncExternalStore(subscribe, () => document.documentElement.classList.contains("dark"), () => false)
  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      /* storage unavailable: theme just won't persist */
    }
  }, [])
  return { isDark, toggle }
}
