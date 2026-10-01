import { cn } from "@/lib/cn"

export default function Badge({ children, tone = "default", className }: { children: React.ReactNode; tone?: "default" | "solid" | "glass"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider", tone === "solid" ? "border-transparent bg-text-primary text-background" : tone === "glass" ? "border-text-secondary/20 bg-background/90 text-text-primary shadow-sm backdrop-blur-md" : "border-text-secondary/15 bg-thirdary text-text-primary", className)}>
      {children}
    </span>
  )
}
