import Link from "next/link"
import SocialLinks from "@/components/SocialLinks"
import { LockIcon } from "@/components/ui/Icons"
import { PROFILE } from "@/data/profile"

export default function Footer() {
  return (
    <footer className="w-full border-t border-text-secondary/10 bg-background py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row md:px-12">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-text-secondary">
            &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <p className="mt-1 text-xs font-medium text-text-secondary/70">Built with Next.js &amp; Tailwind CSS</p>
        </div>
        <SocialLinks variant="text" only={["linkedin", "github", "instagram", "tiktok"]} />
        <Link href="/dashboard" rel="nofollow" className="inline-flex items-center gap-2 rounded-lg border border-text-secondary/25 px-3 py-2 text-xs font-bold text-text-primary transition-colors hover:bg-text-primary hover:text-background">
          <LockIcon className="h-4 w-4" />
          Dashboard
        </Link>
      </div>
    </footer>
  )
}
