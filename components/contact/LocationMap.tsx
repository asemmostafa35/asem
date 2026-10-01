import Button from "@/components/ui/Button"
import { MapPinIcon } from "@/components/ui/Icons"
import { PROFILE } from "@/data/profile"
import { cn } from "@/lib/cn"

/**
 * Interactive Google Maps embed (no API key needed), same technique as the original template.
 * The location comes from PROFILE.location in data/profile.ts.
 */
export default function LocationMap({ className }: { className?: string }) {
  const query = encodeURIComponent(PROFILE.location)
  return (
    <div className={cn("group relative h-[360px] overflow-hidden rounded-3xl border border-text-secondary/20 bg-background shadow-xl transition-colors duration-500 hover:border-text-primary sm:h-[420px] lg:h-full lg:min-h-[480px]", className)}>
      <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-3 rounded-xl border border-text-secondary/20 bg-background/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
        <MapPinIcon className="h-5 w-5 shrink-0 text-text-primary" />
        <div>
          <p className="text-sm font-bold text-text-primary">{PROFILE.location}</p>
          <p className="text-xs font-medium text-text-secondary">Available for remote work worldwide</p>
        </div>
      </div>

      <Button href={`https://www.google.com/maps/search/?api=1&query=${query}`} variant="outline" size="sm" className="absolute bottom-4 right-4 z-10 shadow-lg">
        Open in Maps
      </Button>

      <iframe
        src={`https://maps.google.com/maps?q=${query}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
        title={`Map of ${PROFILE.location}`}
        className="h-full w-full border-0 grayscale transition-all duration-700 group-hover:grayscale-0 dark:invert dark:hue-rotate-180 dark:group-hover:grayscale"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
