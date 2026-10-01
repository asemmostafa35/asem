"use client"
import Image from "next/image"
import { useState } from "react"
import { PROFILE } from "@/data/profile"
import { cn } from "@/lib/cn"

interface AvatarProps {
  /** Defaults to /public/avatar.jpg: replace that file (or pass a different src) to change the photo. */
  src?: string
  alt?: string
  shape?: "circle" | "portrait"
  priority?: boolean
  className?: string
  sizes?: string
}

const initials = PROFILE.firstName.slice(0, 1)

export default function Avatar({ src = PROFILE.avatar, alt = PROFILE.name, shape = "circle", priority = false, className, sizes = "(max-width: 768px) 80vw, 420px" }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={cn("relative overflow-hidden bg-thirdary", shape === "circle" ? "aspect-square rounded-full" : "aspect-[4/5] rounded-3xl", className)}>
      {failed ? (
        <span className="absolute inset-0 flex items-center justify-center text-7xl font-black text-text-secondary">{initials}</span>
      ) : (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} onError={() => setFailed(true)} className="object-cover object-[50%_30%]" />
      )}
    </div>
  )
}
