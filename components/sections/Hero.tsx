"use client"
import Avatar from "@/components/Avatar"
import SocialLinks from "@/components/SocialLinks"
import FadeLeft from "@/components/animations/FadeLeft"
import FadeRight from "@/components/animations/FadeRight"
import Button from "@/components/ui/Button"
import { ArrowRightIcon, ClockIcon, CodeIcon, MapPinIcon, WhatsAppIcon } from "@/components/ui/Icons"
import { useTypewriter } from "@/hooks/useTypewriter"
import { PROFILE } from "@/data/profile"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const STAT_ICONS = [ClockIcon, CodeIcon, MapPinIcon]

export default function Hero() {
  const role = useTypewriter(PROFILE.roles)

  return (
    <section id="home" className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 overflow-hidden px-5 pb-16 pt-32 sm:px-8 md:grid-cols-2 md:px-12 md:pb-28 md:pt-40 lg:gap-20">
      <FadeLeft>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black leading-tight tracking-tighter text-text-primary md:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="bg-linear-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">{PROFILE.name}</span>
          </h1>

          <p className="min-h-9 text-xl font-bold tracking-tight text-text-primary md:text-2xl lg:text-3xl" aria-label={PROFILE.title}>
            <span aria-hidden="true">{role}</span>
            <span aria-hidden="true" className="animate-cursor font-light text-text-secondary">|</span>
          </p>

          <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-text-secondary md:text-lg">{PROFILE.heroIntro}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#projects" size="lg" rightIcon={<ArrowRightIcon className="h-5 w-5" />}>
              Explore Work
            </Button>
            <Button href={buildWhatsAppUrl(PROFILE.whatsappGreeting)} variant="whatsapp" size="lg" leftIcon={<WhatsAppIcon className="h-5 w-5" />}>
              WhatsApp Me
            </Button>
          </div>

          <div className="mt-10 border-t border-text-secondary/10 pt-8">
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-text-secondary">Connect</span>
            <SocialLinks variant="icons" only={["whatsapp", "linkedin", "github", "instagram", "tiktok"]} />
          </div>
        </div>
      </FadeLeft>

      <FadeRight>
        <div className="relative mt-8 flex flex-col items-center justify-center md:mt-0">
          <div className="absolute inset-0 scale-110 rounded-full bg-linear-to-tr from-thirdary to-background opacity-50 blur-2xl" />
          <div className="relative z-10 w-full max-w-[320px] rounded-full border border-text-secondary/10 bg-background p-2 shadow-2xl md:max-w-[400px]">
            <Avatar shape="circle" priority className="floating" />
          </div>

          <div className="z-20 mt-6 flex flex-wrap justify-center gap-3 md:absolute md:-bottom-10 md:-left-10 md:mt-0 md:flex-col">
            {PROFILE.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length]
              return (
                <div key={stat} className="flex items-center gap-3 rounded-2xl border border-text-secondary/10 bg-background/90 p-3 pr-5 shadow-xl backdrop-blur-md">
                  <div className="rounded-xl bg-text-primary p-2 text-background">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="whitespace-nowrap text-xs font-semibold text-text-primary md:text-sm">{stat}</span>
                </div>
              )
            })}
          </div>
        </div>
      </FadeRight>
    </section>
  )
}
