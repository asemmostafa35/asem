import FadeUp from "@/components/animations/FadeUp"
import Badge from "@/components/ui/Badge"
import Section from "@/components/ui/Section"
import SectionHeading from "@/components/ui/SectionHeading"
import { EXPERIENCE } from "@/data/experience"

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Career Path" title="Work Experience" />
      <ol className="flex flex-col gap-4">
        {EXPERIENCE.map((item) => (
          <li key={item.id}>
            <FadeUp>
              <article className="grid grid-cols-1 gap-4 rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-text-secondary/10 hover:bg-text-secondary/5 hover:shadow-lg md:grid-cols-4 md:gap-8 md:p-8">
                <p className="pt-1 text-xs font-bold uppercase tracking-widest text-text-secondary md:col-span-1 md:pt-2">{item.period}</p>
                <div className="flex flex-col md:col-span-3">
                  <h4 className="mb-1 text-xl font-bold tracking-tight text-text-primary md:text-2xl">{item.role}</h4>
                  <h5 className="mb-5 text-sm font-bold tracking-wide text-text-secondary">{item.context}</h5>
                  <p className="mb-6 text-base font-medium leading-relaxed text-text-secondary">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </article>
            </FadeUp>
          </li>
        ))}
      </ol>
    </Section>
  )
}
