import { SOCIALS, type SocialId, type SocialLink } from "@/data/profile"
import { GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon, TikTokIcon, WhatsAppIcon, ArrowRightIcon } from "@/components/ui/Icons"
import { cn } from "@/lib/cn"

const ICONS: Record<SocialId, React.ComponentType<{ className?: string }>> = {
  whatsapp: WhatsAppIcon,
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
}

const HOVER: Record<SocialId, string> = {
  whatsapp: "hover:border-[#25D366] hover:text-[#25D366]",
  email: "hover:border-text-primary",
  linkedin: "hover:border-[#0077b5] hover:text-[#0077b5]",
  github: "hover:border-text-primary",
  instagram: "hover:border-[#E1306C] hover:text-[#E1306C]",
  tiktok: "hover:border-text-primary",
}

interface SocialLinksProps {
  variant?: "icons" | "cards" | "text"
  only?: SocialId[]
  className?: string
}

const opensNewTab = (s: SocialLink) => (s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})

export default function SocialLinks({ variant = "icons", only, className }: SocialLinksProps) {
  const items = only ? SOCIALS.filter((s) => only.includes(s.id)) : SOCIALS

  if (variant === "text") {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-x-6 gap-y-3", className)}>
        {items.map((s) => (
          <a key={s.id} href={s.href} {...opensNewTab(s)} className="text-xs font-bold uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary">
            {s.label}
          </a>
        ))}
      </div>
    )
  }

  if (variant === "cards") {
    return (
      <ul className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1", className)}>
        {items.map((s) => {
          const Icon = ICONS[s.id]
          return (
            <li key={s.id}>
              <a href={s.href} {...opensNewTab(s)} className={cn("group flex items-center justify-between gap-4 rounded-2xl border border-text-secondary/20 bg-background p-4 shadow-sm transition-all duration-300 hover:shadow-md", HOVER[s.id])}>
                <span className="flex min-w-0 items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-text-secondary/10 text-current transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-bold text-text-primary">{s.label}</span>
                    <span className="block truncate text-sm font-medium text-text-secondary">{s.handle}</span>
                  </span>
                </span>
                <ArrowRightIcon className="h-5 w-5 shrink-0 text-text-secondary transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {items.map((s) => {
        const Icon = ICONS[s.id]
        return (
          <li key={s.id}>
            <a href={s.href} {...opensNewTab(s)} aria-label={`${s.label}: ${s.handle}`} title={s.label} className={cn("flex rounded-xl border border-text-secondary/20 p-3 text-text-primary transition-all duration-300 hover:-translate-y-1", HOVER[s.id])}>
              <Icon className="h-5 w-5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
