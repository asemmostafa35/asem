import { useId } from "react"
import type { ComponentProps } from "react"
import { cn } from "@/lib/cn"

interface FieldProps {
  label: string
  error?: string
  hint?: string
}

const CONTROL = "w-full rounded-xl border bg-thirdary/30 px-4 py-3 text-sm font-medium text-text-primary placeholder:text-text-secondary/60 transition-colors focus:outline-none focus:border-text-primary disabled:opacity-60"

function Field({ id, label, error, hint, children }: FieldProps & { id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-text-secondary">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs font-medium text-text-secondary/80">{hint}</p>
      ) : null}
    </div>
  )
}

export function Input({ label, error, hint, className, id, ...props }: FieldProps & ComponentProps<"input">) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Field id={fieldId} label={label} error={error} hint={hint}>
      <input id={fieldId} aria-invalid={Boolean(error)} aria-describedby={error ? `${fieldId}-error` : undefined} className={cn(CONTROL, error ? "border-red-500/70" : "border-text-secondary/20", className)} {...props} />
    </Field>
  )
}

export function Textarea({ label, error, hint, className, id, rows = 5, ...props }: FieldProps & ComponentProps<"textarea">) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Field id={fieldId} label={label} error={error} hint={hint}>
      <textarea id={fieldId} rows={rows} aria-invalid={Boolean(error)} aria-describedby={error ? `${fieldId}-error` : undefined} className={cn(CONTROL, "resize-y", error ? "border-red-500/70" : "border-text-secondary/20", className)} {...props} />
    </Field>
  )
}
