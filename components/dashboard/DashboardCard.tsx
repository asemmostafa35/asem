import { cn } from "@/lib/cn"

interface DashboardCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  hint?: string
  className?: string
}

/** Small stat tile used on the dashboard overview. */
export default function DashboardCard({ label, value, icon, hint, className }: DashboardCardProps) {
  return (
    <div className={cn("flex items-center gap-4 rounded-2xl border border-text-secondary/20 bg-background p-5 shadow-sm", className)}>
      <div className="rounded-xl bg-text-primary p-3 text-background">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">{label}</p>
        <p className="text-3xl font-black tracking-tight text-text-primary">{value}</p>
        {hint && <p className="truncate text-xs font-medium text-text-secondary">{hint}</p>}
      </div>
    </div>
  )
}
