"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import Heading from "@/components/heading"

/* ---------- One stat card with animations ---------- */
function StatCard({
  title,
  imgSrc,
  imgW,
  imgH,
  bgClass,
  size = "desktop",
  delay = 0,
}: {
  title: string
  imgSrc: string
  imgW: number
  imgH: number
  bgClass: string
  size?: "desktop" | "mobile"
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const widthClass =
    size === "desktop" ? "w-[280px] min-w-[280px]" : "w-[250px] min-w-[250px]"

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      <Card
        className={[
          "flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-105 border-0 group cursor-pointer",
          widthClass,
          size === "desktop" ? "h-[300px]" : "h-[280px]",
          bgClass,
        ].join(" ")}
      >
        <div className="text-center mb-3 transform transition-transform duration-300 group-hover:scale-110">
          <h3 className={`${size === "desktop" ? "text-xl" : "text-lg"} font-bold text-gray-800 transition-colors duration-300 group-hover:text-gray-900`}>
            {title}
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-1">
          <Image 
            src={imgSrc} 
            width={imgW} 
            height={imgH} 
            alt={title}
            className="object-contain transition-transform duration-300"
          />
        </div>
      </Card>
    </div>
  )
}

/* ---------- Desktop: animated row ---------- */
function DesktopStatRow() {
  const cards = [
    { title: "35 Expert Tutors!", imgSrc: "/Card-1.png", w: 180, h: 160, bg: "bg-pink-200" },
    { title: "1000s of Recordings!", imgSrc: "/Card-2.png", w: 180, h: 160, bg: "bg-purple-200" },
    { title: "Rewatch Every Class!", imgSrc: "/Card-3.png", w: 180, h: 160, bg: "bg-blue-200" },
    { title: "Monthly Reports!", imgSrc: "/Card-4.png", w: 180, h: 160, bg: "bg-yellow-200" },
  ]
  
  return (
    <div className="hidden md:flex items-stretch justify-center gap-6 px-4 max-w-7xl mx-auto">
      {cards.map((c, index) => (
        <StatCard 
          key={c.title} 
          title={c.title} 
          imgSrc={c.imgSrc} 
          imgW={c.w} 
          imgH={c.h} 
          bgClass={c.bg} 
          size="desktop"
          delay={index * 150} // Staggered animation
        />
      ))}
    </div>
  )
}

/* ---------- Mobile: animated scroll ---------- */
function MobileStatScroll() {
  const [hasScrolled, setHasScrolled] = useState(false)
  
  const cards = [
    { title: "35 Expert Tutors!", imgSrc: "/Card-1.png", w: 160, h: 140, bg: "bg-pink-200" },
    { title: "1000s of Recordings!", imgSrc: "/Card-2.png", w: 160, h: 140, bg: "bg-purple-200" },
    { title: "Rewatch Every Class!", imgSrc: "/Card-3.png", w: 160, h: 140, bg: "bg-blue-200" },
    { title: "Monthly Reports!", imgSrc: "/Card-4.png", w: 160, h: 140, bg: "bg-yellow-200" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setHasScrolled(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="md:hidden px-4 overflow-hidden">
      <div 
        className={`flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transform transition-all duration-1000 ease-out ${
          hasScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
        style={{ scrollbarWidth: 'none' }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.title}
            className={[
              "flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-105 border-0 snap-start group cursor-pointer",
              "min-w-[280px] w-[280px] h-[350px]",
              card.bg,
            ].join(" ")}
          >
            <div className="text-center mb-4 transform transition-transform duration-300 group-hover:scale-110">
              <h3 className="text-lg font-bold text-gray-800 leading-tight transition-colors duration-300 group-hover:text-gray-900">
                {card.title}
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-1">
              <Image 
                src={card.imgSrc} 
                width={card.w} 
                height={card.h} 
                alt={card.title}
                className="object-contain transition-transform duration-300"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  useEffect(() => {
    // Trigger hero text animation
    const heroTimer = setTimeout(() => setHeroVisible(true), 200)
    // Trigger buttons animation after hero text
    const buttonsTimer = setTimeout(() => setButtonsVisible(true), 800)
    
    return () => {
      clearTimeout(heroTimer)
      clearTimeout(buttonsTimer)
    }
  }, [])

  return (
    <>
      {/* Fixed Top Bar with subtle animation */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center border-b border-gray-200 bg-white/95 backdrop-blur py-4 shadow-sm transform transition-all duration-500 ease-out">
        <Image
          src="/Logo.png"
          width={125}
          height={40}
          alt="Limitless Learning Logo"
          className="cursor-pointer transition-all duration-300 hover:scale-110 hover:brightness-110"
          onClick={scrollToTop}
          priority
        />
      </div>

      {/* Hero with entrance animations */}
      <section className="pt-20 min-h-[calc(50vh-4rem)] flex flex-col items-center justify-center gap-8 px-6 sm:flex-row sm:justify-evenly">
        {/* Animated heading */}
        <div className={`text-center sm:text-left transform transition-all duration-1000 ease-out ${
          heroVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <Heading>
            Learning Should
            <br />
            Be Limitless!
          </Heading>
        </div>

        {/* Animated buttons */}
        <div className={`transform transition-all duration-1000 ease-out ${
          buttonsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <div className="flex w-72 flex-col gap-4">
            <Button 
              variant="outline" 
              className="w-full gap-3 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-50 group"
            >
              <Image 
                src="/Google-Logo.png" 
                width={22} 
                height={22} 
                alt="Google Logo"
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="transition-all duration-300">Login with Google</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-3 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-teal-50 group"
            >
              <PhoneIcon 
                fill="#33706a" 
                stroke="#33706a" 
                size={22} 
                className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              />
              <span className="transition-all duration-300">3335566</span>
            </Button>
            <Button 
              variant="link" 
              className="w-full justify-center py-3 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10 transition-all duration-300">Register with Email</span>
              {/* Subtle background animation on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </section>

      {/* Animated stat cards */}
      <section className="pb-8 relative">
        {/* Background subtle animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent opacity-0 animate-pulse" />
        <DesktopStatRow />
        <MobileStatScroll />
      </section>
    </>
  )
}