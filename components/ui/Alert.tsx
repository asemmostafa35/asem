import { cn } from "@/lib/cn"

export type AlertType = "success" | "error" | "info"

const STYLES: Record<AlertType, string> = {
  success: "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400",
  error: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400",
  info: "border-text-secondary/30 bg-thirdary/60 text-text-primary",
}

export default function Alert({ type = "info", children, className }: { type?: AlertType; children: React.ReactNode; className?: string }) {
  return (
    <div role={type === "error" ? "alert" : "status"} className={cn("rounded-xl border px-4 py-3 text-sm font-medium", STYLES[type], className)}>
      {children}
    </div>
  )
}
