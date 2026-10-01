import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/cn"

type Variant = "primary" | "outline" | "ghost" | "whatsapp" | "danger"
type Size = "sm" | "md" | "lg"

interface CommonProps {
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
  className?: string
  children: ReactNode
}

type AnchorButtonProps = CommonProps & Omit<ComponentProps<"a">, keyof CommonProps | "href"> & { href: string }
type NativeButtonProps = CommonProps & Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined }
export type ButtonProps = AnchorButtonProps | NativeButtonProps

const VARIANTS: Record<Variant, string> = {
  primary: "bg-text-primary text-background hover:-translate-y-0.5 hover:shadow-lg",
  outline: "border-2 border-text-secondary/25 bg-background/60 text-text-primary backdrop-blur-sm hover:border-text-primary hover:bg-thirdary/60",
  ghost: "text-text-secondary hover:bg-text-secondary/10 hover:text-text-primary",
  whatsapp: "bg-[#25D366] text-[#052e16] hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg",
  danger: "bg-red-600 text-white hover:bg-red-700",
}

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs rounded-lg gap-2",
  md: "px-6 py-3 text-sm rounded-xl gap-2.5",
  lg: "px-8 py-4 text-sm md:text-base rounded-xl gap-3",
}

const BASE = "inline-flex items-center justify-center font-bold transition-all duration-300 ease-out cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary disabled:pointer-events-none disabled:opacity-50"

function Spinner() {
  return <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", leftIcon, rightIcon, loading = false, className, children, ...rest } = props
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)
  const content = (
    <>
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </>
  )

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest
    const external = /^(https?:|mailto:|tel:)/.test(href)
    if (external) {
      return (
        <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...(anchor as Omit<ComponentProps<"a">, "href">)}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...(anchor as Omit<ComponentProps<typeof Link>, "href">)}>
        {content}
      </Link>
    )
  }

  const { type = "button", disabled, ...button } = rest as Omit<NativeButtonProps, keyof CommonProps>
  return (
    <button type={type} disabled={disabled || loading} className={classes} {...button}>
      {content}
    </button>
  )
}
