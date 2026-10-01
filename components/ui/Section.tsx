import { cn } from "@/lib/cn"

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

/** Shared page-section shell: consistent spacing, max width and divider. */
export default function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full scroll-mt-20 border-t border-text-secondary/10", className)}>
      <div className={cn("mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:px-12 md:py-28", containerClassName)}>{children}</div>
    </section>
  )
}
