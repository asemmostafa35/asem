"use client"
import { useEffect, useId } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CloseIcon } from "@/components/ui/Icons"
import { cn } from "@/lib/cn"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

const WIDTHS = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-3xl" }

export default function Modal({ open, onClose, title, children, footer, size = "md" }: ModalProps) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className={cn("relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-text-secondary/20 bg-background shadow-2xl sm:rounded-3xl", WIDTHS[size])}
          >
            <div className="flex items-center justify-between gap-4 border-b border-text-secondary/10 p-5 sm:p-6">
              <h4 id={titleId} className="text-xl font-black tracking-tight text-text-primary sm:text-2xl">
                {title}
              </h4>
              <button type="button" onClick={onClose} aria-label="Close dialog" className="cursor-pointer rounded-full bg-text-secondary/10 p-2 text-text-secondary transition-colors hover:text-text-primary">
                <CloseIcon />
              </button>
            </div>
            <div className="custom-scrollbar flex-1 overflow-y-auto p-5 sm:p-8">{children}</div>
            {footer && <div className="flex flex-col gap-3 border-t border-text-secondary/10 bg-background p-5 sm:flex-row sm:p-6">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
