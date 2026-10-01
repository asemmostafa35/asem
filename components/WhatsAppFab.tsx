import { WhatsAppIcon } from "@/components/ui/Icons"
import { PROFILE } from "@/data/profile"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

/** Floating direct-to-WhatsApp action button (replaces the old AI chat button). */
export default function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppUrl(PROFILE.whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Asem on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center justify-center rounded-full border-4 border-background bg-[#25D366] p-3.5 text-white shadow-2xl transition-transform duration-300 hover:-translate-y-1 md:bottom-8 md:right-8 md:p-4"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50 motion-reduce:hidden" aria-hidden="true" />
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  )
}
