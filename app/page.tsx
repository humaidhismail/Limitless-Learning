import Hero from "@/components/Hero"
import TeachersSection from "@/components/TeachersSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import FAQSection from "@/components/FAQSection"
import FooterCta from "@/components/FooterCta"

export default function Page() {
  return (
    <main id="top" className="font-hanken-grotesk">
      <Hero />
      <TeachersSection />
      <HowItWorksSection />
      <FAQSection />
      <FooterCta />
    </main>
  )
}
