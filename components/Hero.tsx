"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import Heading from "@/components/heading"

/* ---------- One stat card (no image cropping) ---------- */
function StatCard({
  title,
  imgSrc,
  bgClass,
  size = "desktop",
  delay = 0,
}: {
  title: string
  imgSrc: string
  bgClass: string
  size?: "desktop" | "mobile"
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setIsVisible(true), delay)
          return () => clearTimeout(t)
        }
      },
      { threshold: 0.1 }
    )
    if (cardRef.current) io.observe(cardRef.current)
    return () => io.disconnect()
  }, [delay])

  const dims =
    size === "desktop"
      ? "w-[280px] min-w-[280px] h-[300px]"
      : "w-[280px] min-w-[280px] h-[320px]"

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      <Card
        className={[
          "flex min-h-0 flex-col rounded-3xl p-4 border-0 transition-all duration-300",
          "hover:-translate-y-2 hover:shadow-xl hover:scale-105 group cursor-pointer",
          dims,
          bgClass,
        ].join(" ")}
      >
        <div className="mb-3 text-center transform transition-transform duration-300 group-hover:scale-110">
          <h3
            className={`${size === "desktop" ? "text-xl" : "text-lg"} font-bold text-gray-800 transition-colors duration-300 group-hover:text-gray-900`}
          >
            {title}
          </h3>
        </div>

        <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-2xl p-2">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(min-width:768px) 280px, 280px"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </div>
      </Card>
    </div>
  )
}

/* ---------- Desktop row ---------- */
function DesktopStatRow() {
  const cards = [
    { title: "35 Expert Tutors!",    imgSrc: "/card1.png", bg: "bg-card-background-one" },
    { title: "1000s of Recordings!", imgSrc: "/card2.png", bg: "bg-card-background-two" },
    { title: "Rewatch Every Class!", imgSrc: "/card3.png", bg: "bg-card-background-three" },
    { title: "Monthly Reports!",     imgSrc: "/card4.png", bg: "bg-card-background-four" },
  ]
  return (
    <div className="hidden md:flex items-stretch justify-center gap-6 px-4 max-w-7xl mx-auto">
      {cards.map((c, i) => (
        <StatCard key={c.title} title={c.title} imgSrc={c.imgSrc} bgClass={c.bg} size="desktop" delay={i * 150} />
      ))}
    </div>
  )
}

/* ---------- Mobile horizontal scroll ---------- */
function MobileStatScroll() {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 200)
    return () => clearTimeout(t)
  }, [])

  const cards = [
    { title: "35 Expert Tutors!",    imgSrc: "/card1.png", bg: "bg-card-background-one" },
    { title: "1000s of Recordings!", imgSrc: "/card2.png", bg: "bg-card-background-two" },
    { title: "Rewatch Every Class!", imgSrc: "/card3.png", bg: "bg-card-background-three" },
    { title: "Monthly Reports!",     imgSrc: "/card4.png", bg: "bg-card-background-four" },
  ]

  return (
    <div className="md:hidden px-4 overflow-hidden">
      <div
        className={`flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transform transition-all duration-700 ease-out ${
          entered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
      >
        {cards.map((c, i) => (
          <div key={c.title} className="snap-start">
            <StatCard title={c.title} imgSrc={c.imgSrc} bgClass={c.bg} size="mobile" delay={i * 120} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setHeroVisible(true), 200)
    const t2 = setTimeout(() => setButtonsVisible(true), 700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <>
      {/* Fixed Top Bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center border-b border-gray-200 bg-white/95 backdrop-blur py-4 shadow-sm">
        <Image
          src="/Limitless Logo.svg"
          width={125}
          height={40}
          alt="Limitless Learning Logo"
          className="cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={scrollToTop}
          priority
        />
      </div>

      {/* Hero */}
      <section className="pt-20 min-h-[calc(50vh-4rem)] flex flex-col items-center justify-center gap-8 px-6 sm:flex-row sm:justify-evenly">
        <div
          className={`text-center sm:text-left transform transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Heading>
            Learning Should
            <br />
            Be Limitless!
          </Heading>
        </div>

        <div
          className={`transform transition-all duration-1000 ease-out ${
            buttonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex w-72 flex-col gap-4">
            {/* Link to registration for Login with Google */}
            <Button variant="outline" className="w-full gap-3 py-3" asChild>
              <a href="https://register.limitlesslearning.mv/" aria-label="Login with Google">
                <Image src="/Google-Logo.png" width={22} height={22} alt="Google Logo" />
                Login with Google
              </a>
            </Button>

            {/* ✅ Call button (dials +960 3000759) */}
            <Button variant="outline" className="w-full gap-3 py-3" asChild>
              <a href="tel:+9603000759" aria-label="Call 3000759">
                <PhoneIcon fill="#33706a" stroke="#33706a" size={22} />
                3000759
              </a>
            </Button>

            {/* Link to registration for Register with Email */}
            <Button variant="link" className="w-full justify-center py-3" asChild>
              <a href="https://register.limitlesslearning.mv/" aria-label="Register with Email">
                Register with Email
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-8">
        <DesktopStatRow />
        <MobileStatScroll />
      </section>
    </>
  )
}
