import LocationMap from "@/components/contact/LocationMap";
import SocialLinks from "@/components/SocialLinks";
import FadeDown from "@/components/animations/FadeDown";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROFILE } from "@/data/profile";

export default function Contact() {
  return (
    <Section id="contact" className="overflow-hidden">
      <SectionHeading
        eyebrow="Get In Touch"
        title="Contact Me"
        description={`Based in ${PROFILE.location}. Message me on WhatsApp or email for the fastest reply.`}
      />
      <FadeDown delay={0.1}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <LocationMap />
          <SocialLinks variant="cards" />
        </div>
      </FadeDown>
    </Section>
  );
}
