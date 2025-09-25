"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Heading from "@/components/heading"

type Step = {
  title: string
  desc: string
  img: string
  bgClass: string
}

const STEPS: Step[] = [
  {
    title: "Select a class",
    desc:
      "Select any grade and choose from three types of classes: Group, Priority and Private!",
    img: "/card5.png",
    bgClass: "bg-card-background-five",
  },
  {
    title: "Start Learning",
    desc:
      "Take classes with the most experienced tutors in the country & rewatch every class!",
    img: "/card6.png",
    bgClass: "bg-card-background-six",
  },
  {
    title: "Keep Improving!",
    desc:
      "Improve results with reviews of your work and get doubts cleared directly through teacher chat!",
    img: "/card7.png",
    bgClass: "bg-card-background-seven",
  },
]

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-step-in")
        })
      },
      { threshold: 0.3 }
    )
    stepRefs.current.forEach((ref) => ref && stepObserver.observe(ref))
    return () => stepObserver.disconnect()
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-purple-50/20 transition-opacity duration-1500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        {/* Heading — same style as “Study every subject!” */}
        <h2
          className={`mb-8 text-center text-2xl sm:mb-12 sm:text-3xl lg:text-4xl font-semibold text-heading transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Starting is the biggest step in learning!
        </h2>

        <div className="grid grid-cols-1 place-items-center gap-10 sm:grid-cols-3">
          {STEPS.map((s, index) => (
            <div
              key={s.title}
              ref={(el) => { stepRefs.current[index] = el; }}
              className={`flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-none group transform transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              <div
                className={`${s.bgClass} aspect-square w-full rounded-[32px] shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:scale-105 flex items-center justify-center relative overflow-hidden group/card`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                <Image
                  src={s.img}
                  alt={s.title}
                  width={360}
                  height={360}
                  className="w-3/4 max-w-[280px] object-contain transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-1 relative z-10"
                  priority={false}
                />
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              </div>

              <div style={{ transitionDelay: `${600 + index * 200}ms` }}>
                <Heading
                  as="h3"
                  textSize="text-xl sm:text-2xl"
                  className={`mt-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {s.title}
                </Heading>
              </div>

              <p
                className={`mt-2 max-w-[30ch] text-sm leading-relaxed text-muted-foreground sm:max-w-[34ch] transition-all duration-500 group-hover:text-muted-foreground/80 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${700 + index * 200}ms` }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-step-in {
          animation: stepFloat 6s ease-in-out infinite;
        }
        .animate-step-in:nth-child(2) {
          animation-delay: 2s;
        }
        .animate-step-in:nth-child(3) {
          animation-delay: 4s;
        }
        @keyframes stepFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
