import FadeDown from "@/components/animations/FadeDown"
import { cn } from "@/lib/cn"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export default function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <FadeDown>
      <div className={cn("mb-12 w-full text-left md:mb-20", className)}>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-text-secondary">{eyebrow}</h2>
        <h3 className="text-4xl font-black tracking-tighter text-text-primary md:text-5xl lg:text-6xl">{title}</h3>
        {description && <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-text-secondary">{description}</p>}
      </div>
    </FadeDown>
  )
}
