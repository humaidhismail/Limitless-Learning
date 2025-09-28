"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Phone } from "lucide-react"

type Faq = { q: string; a: string }

const FAQS: Faq[] = [
  {
    q: "What are the prices?",
    a: `• Grades 6 to 10: MVR 299 per month
• Grades 11 and 12: MVR 399 per month`,
  },
  {
    q: "What are the class and office hours?",
    a: `Classes run from 2:00 PM to 10:00 PM, Saturday to Thursday.

Office hours:
• Sunday to Thursday: 9:00 AM to 10:00 PM
• Saturday: 2:00 PM to 10:00 PM`,
  },
  {
    q: "Can I change my class timetable?",
    a: `Timetables are set based on teacher availability for the whole academic year. 
If a teacher requests a change, we’ll make adjustments and keep you informed.`,
  },
  {
    q: "How do I register?",
    a: `Registration is super easy! Head to our website and click “Sign up with Google” to get started.
If you have any questions, call us at 3000759 — we’re happy to help.`,
  },
  {
    q: "What if I join in the middle of the month?",
    a: `No worries! You’ll only need to pay for the remaining classes in that month, not the full fee.`,
  },
  {
    q: "What’s the difference between Gold and Platinum classes for Grade 10?",
    a: `Gold Classes:
Perfect if you want to review Grade 9 topics and strengthen your foundation. We’ll cover the full O’Level syllabus along with lots of past paper practice.

Platinum Classes:
Ideal if you’re confident with Grade 9 and want to focus more on Grade 10 content and exam prep with past papers.`,
  },
  {
    q: "Can I take private tuition with Limitless?",
    a: `Not at the moment. If we start offering private tuition, we’ll announce it on our social media pages.`,
  },
  {
    q: "What platform do you use for classes?",
    a: `All classes are held on Google Meet. Just click the “Join” button in your portal to start class.`,
  },
  {
    q: "How do I join my classes?",
    a: `Log in to the My Classes portal: myclasses.limitlesslearning.mv/login — everything you need will be there.`,
  },
  {
    q: "How can I contact Limitless?",
    a: `You can reach us anytime during office hours:
• Call: 3000759
• Instagram: @limitless__learning
• Facebook: @limitless__learning
• TikTok: @limitless_onlinetuition`,
  },
  {
    q: "Where can I see my class timetable?",
    a: `Your personal timetable is in the My Classes portal. Just log in and check your schedule anytime.`,
  },
  {
    q: "What kind of device do I need to join?",
    a: `Any device with internet access works — phone, tablet, laptop, or desktop.`,
  },
  {
    q: "What syllabus do you follow?",
    a: `We follow the syllabus provided by the Ministry of Education, the same as government schools.`,
  },
  {
    q: "Can I rewatch the classes later?",
    a: `Yes! Class recordings will be available soon in the My Classes portal for easy revision.`,
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [faqItemsVisible, setFaqItemsVisible] = useState<boolean[]>(
    new Array(FAQS.length).fill(false)
  )
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
    <section
      ref={sectionRef}
      className="bg-card-text text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Animated background gradient */}
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
          We&apos;re here to answer your every question!
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
                    <span className="pr-6 font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 ${
                        isOpen ? "rotate-180 text-white" : "group-hover:text-white/80"
                      }`}
                    />
                  </button>

                  {/* ANSWER PANEL */}
                  <div
                    id={panelId}
                    aria-hidden={!isOpen}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p
                      className={`whitespace-pre-line pb-4 pl-3 sm:pl-5 text-sm sm:text-base text-white/70 leading-relaxed border-l-2 border-white/20 transition-all duration-300 ${
                        isOpen ? "translate-y-0" : "translate-y-2"
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
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
              Call us during office hours:
              <br /> Sun–Thu: 9am–10pm &nbsp;|&nbsp; Sat: 2pm–10pm
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
