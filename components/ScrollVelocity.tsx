"use client"
import { useLayoutEffect, useRef, useState } from "react"
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react"

function useElementWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const update = () => ref.current && setWidth(ref.current.offsetWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [ref])
  return width
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

interface RowProps {
  text: string
  baseVelocity: number
  className?: string
  copies: number
}

function VelocityRow({ text, baseVelocity, className = "", copies }: RowProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const copyRef = useRef<HTMLSpanElement>(null)
  const copyWidth = useElementWidth(copyRef)
  const direction = useRef(1)

  const x = useTransform(baseX, (v) => (copyWidth === 0 ? "0px" : `${wrap(-copyWidth, 0, v)}px`))

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * f
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative overflow-hidden">
      <motion.div className="flex whitespace-nowrap text-center text-4xl font-bold tracking-[-0.02em] md:text-[5rem] md:leading-20" style={{ x }}>
        {Array.from({ length: copies }, (_, i) => (
          <span key={i} ref={i === 0 ? copyRef : null} className={`shrink-0 ${className}`}>
            {text}&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function ScrollVelocity({ texts, velocity = 50, className, copies = 6 }: { texts: readonly string[]; velocity?: number; className?: string; copies?: number }) {
  return (
    <div aria-hidden="true">
      {texts.map((text, i) => (
        <VelocityRow key={text} text={text} baseVelocity={i % 2 ? -velocity : velocity} className={className} copies={copies} />
      ))}
    </div>
  )
}
