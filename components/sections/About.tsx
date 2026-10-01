import Avatar from "@/components/Avatar"
import Fade from "@/components/animations/Fade"
import FadeLeft from "@/components/animations/FadeLeft"
import ScrollVelocity from "@/components/ScrollVelocity"
import Section from "@/components/ui/Section"
import SectionHeading from "@/components/ui/SectionHeading"
import { PROFILE } from "@/data/profile"

const DETAILS: Array<{ label: string; value: string; href?: string }> = [
  { label: "Name", value: PROFILE.name },
  { label: "Role", value: PROFILE.title },
  { label: "Experience", value: `${PROFILE.experience} in Full Stack Development` },
  { label: "Location", value: PROFILE.location },
  { label: "Phone / WhatsApp", value: PROFILE.phone, href: `tel:+${PROFILE.whatsappNumber}` },
  { label: "Email", value: PROFILE.emails[0], href: `mailto:${PROFILE.emails[0]}` },
]

export default function About() {
  return (
    <Section id="about" className="overflow-hidden">
      <SectionHeading eyebrow="Discover" title="About Me" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="hidden items-center justify-center lg:col-span-5 lg:flex">
          <Fade className="w-full max-w-[420px]">
            <div className="rounded-3xl border border-text-secondary/10 bg-background p-2 shadow-2xl">
              <Avatar shape="portrait" sizes="420px" />
            </div>
          </Fade>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
            <Fade>
              <h4 className="mb-4 border-b border-text-secondary/20 pb-4 text-lg font-bold text-text-primary md:text-xl">Who Am I</h4>
              <p className="text-base font-medium leading-relaxed text-text-secondary">{PROFILE.about.who}</p>
            </Fade>
            <Fade>
              <h4 className="mb-4 border-b border-text-secondary/20 pb-4 text-lg font-bold text-text-primary md:text-xl">My Approach</h4>
              <p className="text-base font-medium leading-relaxed text-text-secondary">{PROFILE.about.approach}</p>
            </Fade>
          </div>

          <div className="mt-14">
            <h4 className="mb-8 border-b border-l-4 border-text-secondary/20 border-l-text-primary pb-4 pl-4 text-lg font-bold text-text-primary md:text-xl">Personal Details</h4>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              {DETAILS.map((d, i) => (
                <FadeLeft key={d.label} delay={i * 0.08}>
                  <div className="-m-2 rounded-xl p-2 transition-colors duration-300 hover:bg-thirdary/40">
                    <dt className="mb-1 text-xs font-bold uppercase tracking-widest text-text-secondary">{d.label}</dt>
                    <dd className="break-words text-base font-semibold text-text-primary">
                      {d.href ? (
                        <a href={d.href} className="underline decoration-text-secondary/30 underline-offset-4 transition-colors hover:text-text-secondary">
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                </FadeLeft>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <ScrollVelocity texts={PROFILE.marquee} className="font-black tracking-tighter text-thirdary opacity-60 dark:text-button-hover" />
      </div>
    </Section>
  )
}
