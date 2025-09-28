"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Phone } from "lucide-react"

type Faq = { q: string; a: string }

const FAQS: Faq[] = [
  { q: "What is a Priority Class?", a: "Priority Classes are small-group lessons with limited seats. You get more tutor attention, faster feedback, and priority support for doubts." },
  { q: "Will the tutors help with homework?", a: "Yes. Tutors guide homework and practice questions in class and through teacher chat, so you can clear doubts quickly." },
  { q: "Can I take Private Tuition?", a: "Absolutely. One-to-one private sessions are available with flexible scheduling tailored to your needs." },
  { q: "How many tutors are there?", a: "We currently have 35+ expert tutors across grades and subjects, with years of teaching experience." },
  { q: "Are there class recordings?", a: "Yes, every class is recorded so you can rewatch lessons anytime for revision." },
  { q: "Do I get report cards from Limitless?", a: "You'll receive monthly progress updates and term report cards that summarize strengths, gaps, and next steps." },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [faqItemsVisible, setFaqItemsVisible] = useState<boolean[]>(new Array(FAQS.length).fill(false))
  const sectionRef = useRef<HTMLDivElement>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])

  // Main section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Individual FAQ items visibility
  useEffect(() => {
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setFaqItemsVisible((prev) => {
              const next = [...prev]
              next[index] = true
              return next
            })
          }
        })
      },
      { threshold: 0.3 }
    )
    faqRefs.current.forEach((ref) => ref && itemObserver.observe(ref))
    return () => itemObserver.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-card-text text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Animated background gradient (kept) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transition-opacity duration-2000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <h2
          className={`text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          We're here to answer your every question!
        </h2>

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(320px,360px)]">
          {/* Left: accordion */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {FAQS.map((item, i) => {
              const isOpen = open === i
              const panelId = `faq-panel-${i}`
              return (
                <div
                  key={item.q}
                  ref={(el) => {
                    faqRefs.current[i] = el
                  }}
                  data-index={i}
                  className={`border-b border-white/20 transition-all duration-700 ease-out ${
                    faqItemsVisible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full py-4 flex items-center justify-between text-left text-base sm:text-lg group transition-all duration-300 hover:text-white/90 focus:outline-none focus:text-white/90"
                  >
                    <span className="pr-6 transition-transform duration-300 group-hover:translate-x-1">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 ${
                        isOpen ? "rotate-180 text-white" : "group-hover:text-white/80"
                      }`}
                    />
                  </button>

                  {/*
                    ANSWER PANEL TEMPORARILY DISABLED
                    ------------------------------------------------------------
                    Keeping the markup here commented so you can re-enable later.
                    Just remove the surrounding comment block to show answers.
                  
                  <div
                    id={panelId}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p
                      className={`pb-4 text-white/85 leading-relaxed transform transition-all duration-300 ${
                        isOpen ? "translate-y-0" : "translate-y-2"
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
                  */}
                </div>
              )
            })}
          </div>

          {/* Right: call-us card */}
          <aside
            className={`
              rounded-2xl border border-card-border p-6
              lg:p-8 lg:self-start lg:rounded-2xl lg:border-2
              transition-all duration-1000 ease-out group/card
              hover:border-white/60 hover:shadow-xl hover:-translate-y-1
              ${isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"}
            `}
            style={{ transitionDelay: "600ms" }}
          >
            <p
              className={`text-white/90 leading-relaxed transition-all duration-300 group-hover/card:text-white ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              Give us a call on any working day between
              <br /> 9am and 10pm.
            </p>

            <a
              href="tel:3000759"
              className={`
                mt-6 inline-flex w-full items-center justify-center gap-3
                rounded-lg border border-white/80 px-4 py-3 font-semibold
                text-white transition-all duration-300 
                hover:bg-white/10 hover:border-white hover:scale-[1.02] hover:shadow-lg
                active:scale-[0.98] group/button
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{ transitionDelay: "1000ms" }}
            >
              <span className="grid place-items-center rounded-full bg-white/15 p-1.5 transition-all duration-300 group-hover/button:bg-white/25 group-hover/button:scale-110">
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-12" />
              </span>
              <span className="transition-all duration-300">3000759</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
