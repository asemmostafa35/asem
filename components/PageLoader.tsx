"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { PROFILE } from "@/data/profile"

export default function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl font-black tracking-tighter text-text-primary md:text-5xl">
            {PROFILE.name}
          </motion.div>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-text-secondary">Portfolio Loading</p>
          <div className="relative mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-text-secondary/20">
            <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1, ease: "easeInOut" }} className="absolute inset-0 bg-text-primary" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
