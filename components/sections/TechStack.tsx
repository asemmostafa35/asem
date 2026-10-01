import Image from "next/image"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"
import Section from "@/components/ui/Section"
import SectionHeading from "@/components/ui/SectionHeading"
import { TECH_CATEGORIES } from "@/data/tech-stack"

export default function TechStack() {
  return (
    <Section id="techstack" className="overflow-hidden">
      <SectionHeading eyebrow="Skills & Tools" title="My Tech Stack" />
      <div className="flex flex-col gap-14">
        {TECH_CATEGORIES.map((category, idx) => (
          <div key={category.title} className="flex flex-col items-start gap-6 md:flex-row md:gap-16">
            <div className="md:w-1/3">
              <FadeDown delay={idx * 0.05}>
                <h4 className="mb-2 text-2xl font-black tracking-tight text-text-primary">{category.title}</h4>
                <p className="text-sm font-medium text-text-secondary">{category.description}</p>
              </FadeDown>
            </div>
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:w-2/3 md:grid-cols-4">
              {category.technologies.map((tech, i) => (
                <li key={tech.name}>
                  <FadeUp delay={i * 0.05} className="h-full">
                    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-text-secondary/10 bg-thirdary/20 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-text-primary/50 hover:bg-thirdary/50">
                      <Image src={tech.icon} alt="" width={48} height={48} className="mb-3 h-12 w-12" />
                      <span className="text-center text-sm font-bold text-text-primary">{tech.name}</span>
                    </div>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
