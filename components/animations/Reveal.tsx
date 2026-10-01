"use client"
import { useInView } from "react-intersection-observer"
import { motion } from "motion/react"

export type Direction = "none" | "up" | "down" | "left" | "right"

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  none: { x: 0, y: 0 },
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
}

export interface RevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

/** One animation primitive; Fade / FadeUp / FadeDown / FadeLeft / FadeRight are thin wrappers. */
export default function Reveal({ children, direction = "up", delay = 0, duration = 0.8, className }: RevealProps & { direction?: Direction }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { x, y } = OFFSETS[direction]
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
