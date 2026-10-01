import { PROFILE } from "@/data/profile"

/** Builds a wa.me deep link, optionally with pre-filled message text. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${PROFILE.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
