"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* ---------- Types & Data ---------- */
type Teacher = {
  id: string
  name: string
  years: number
  title: string
  grades: string[]
  subjects: string[]
  photo?: string
}

const TEACHERS: Teacher[] = [
  { id: "t1", name: "Malaha", years: 5, title: "Head Tutor", grades: ["Grade 9","Grade 10"], subjects: ["Biology","Chemistry","Physics","Maths"] },
  { id: "t2", name: "Nahla",  years: 6, title: "Senior Tutor", grades: ["Grade 8","Grade 9","Grade 10"], subjects: ["Physics","Maths"] },
  { id: "t3", name: "Zayan",  years: 7, title: "Subject Lead", grades: ["Grade 10","Grade 11","Grade 12"], subjects: ["Business","Accounting","Economics"] },
]

const ALL_GRADES = ["Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"]
const ALL_SUBJECTS = ["Biology","Chemistry","Physics","Business","Accounting","Economics","English","Maths","Islam","Dhivehi"]

/* ---------- UI Bits ---------- */
function Chip({ children, variant = "grade", delay = 0 }: { children: React.ReactNode; variant?: "grade" | "subject"; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return variant === "grade" ? (
    <span className={`rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground shadow transform transition-all duration-500 ease-out ${
      isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'
    }`}>
      {children}
    </span>
  ) : (
    <span className={`rounded-full border border-secondary px-3 py-1 text-xs font-medium text-secondary transform transition-all duration-500 ease-out ${
      isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'
    }`}>
      {children}
    </span>
  )
}

const Card = ({
  t,
  refCb,
  className = "",
  isActive = false,
}: {
  t: Teacher
  refCb?: (el: HTMLDivElement | null) => void
  className?: string
  isActive?: boolean
}) => (
  <div
    ref={refCb ?? null}
    className={`rounded-[20px] bg-card text-card-foreground shadow-xl ring-1 ring-black/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group ${className}`}
  >
    <div className="relative h-[180px] sm:h-[230px] w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={t.photo || "/teacher.png"} 
        alt={t.name} 
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-75" />
    </div>
    <div className="p-5">
      <h3 className="text-lg font-semibold text-heading transition-colors duration-300 group-hover:text-primary">{t.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground transition-all duration-300 group-hover:text-muted-foreground/80">
        {t.years}+ years of Teaching Experience, {t.title}.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {t.grades.map((g, index) => 
          <span 
            key={g} 
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground shadow transition-all duration-200 hover:scale-105 hover:shadow-md"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {g}
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {t.subjects.map((s, index) => 
          <span 
            key={s} 
            className="rounded-full border border-secondary px-3 py-1 text-xs font-medium text-secondary transition-all duration-200 hover:scale-105 hover:bg-secondary/10"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {s}
          </span>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground transition-all duration-300 group-hover:text-muted-foreground/80">
        {t.years}+ years of Teaching Experience, {t.title}.
      </p>
      <button
        type="button"
        className="mt-4 w-full rounded-[20px] bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
      >
        Start Classes with {t.name}
      </button>
    </div>
  </div>
)

/* ---------- Main Component ---------- */
export default function TeachersSection() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  /* ===== Tablet/Desktop (stacked) metrics ===== */
  const centerCardRef = useRef<HTMLDivElement | null>(null)
  const sideScale = 0.93
  const gutter = 12
  const [shift, setShift] = useState(220)
  const [sideArrowOffset, setSideArrowOffset] = useState(260)

  // independent offsets so you can move left further than right
  const extraLeftArrowPush = 80   //  move left arrow further left
  const extraRightArrowPush = 40  //  right arrow spacing

  useEffect(() => {
    const recompute = () => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280
      const approxW =
        vw < 640 ? Math.min(Math.max(vw * 0.92, 320), 420)
        : vw < 1024 ? Math.min(Math.max(vw * 0.70, 360), 380)
        : 360
      const measuredW = centerCardRef.current?.offsetWidth ?? approxW
      const factor = vw < 640 ? 0.58 : vw < 1024 ? 0.62 : 0.66
      const newShift = Math.round(measuredW * factor)
      setShift(newShift)
      const sideW = measuredW * sideScale
      setSideArrowOffset(newShift + sideW / 2 + gutter)
    }
    recompute()
    window.addEventListener("resize", recompute)
    return () => window.removeEventListener("resize", recompute)
  }, [])

  /* ===== Mobile (peek + native scroll) ===== */
  const mobileTrackRef = useRef<HTMLDivElement | null>(null)
  const cardWidthVW = 84 // % of viewport width (shows next-card peek)
  const cardGapPx = 16   // gap between cards

  // Refs for mobile cards to scroll them into view
  const mobileCardRefs = useMemo(
    () => TEACHERS.map(() => ({ current: null as HTMLDivElement | null })),
    []
  )

  const scrollToIndex = (idx: number) => {
    const target = mobileCardRefs[idx]?.current
    if (target) target.scrollIntoView({ behavior: "smooth", inline: "center" })
  }

  const prev = () => setCurrent((i) => {
    const ni = (i - 1 + TEACHERS.length) % TEACHERS.length
    scrollToIndex(ni)
    return ni
  })

  const next = () => setCurrent((i) => {
    const ni = (i + 1) % TEACHERS.length
    scrollToIndex(ni)
    return ni
  })

  const onMobileScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget
    const vw = el.clientWidth
    const cardW = (cardWidthVW / 100) * vw
    const stride = cardW + cardGapPx
    const idx = Math.round(el.scrollLeft / stride)
    if (idx !== current) setCurrent((idx + TEACHERS.length) % TEACHERS.length)
  }

  // also allow swipe anywhere (desktop too)
  const [touchX, setTouchX] = useState<number | null>(null)
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => setTouchX(e.touches[0].clientX)
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchX == null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > 40) (dx > 0 ? prev() : next())
    setTouchX(null)
  }

  const styleFor = (i: number): React.CSSProperties => {
    const n = TEACHERS.length
    const leftDist = (i - current + n) % n
    const rightDist = (current - i + n) % n
    let offset = leftDist <= rightDist ? leftDist : -rightDist
    if (offset < -1) offset = -1
    if (offset > 1) offset = 1

    const isMobile = (typeof window !== "undefined" ? window.innerWidth : 1024) < 640
    if (isMobile) return {} // mobile handled by scroll container

    const translateX = offset * shift
    const translateY = offset === 0 ? 0 : 12
    const scale = offset === 0 ? 1 : sideScale
    const opacity = offset === 0 ? 1 : 0.68
    const z = offset === 0 ? 30 : 20

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex: z,
      cursor: offset === 0 ? "default" : "pointer",
      transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)",
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-16 lg:py-24" 
      onTouchStart={onTouchStart} 
      onTouchEnd={onTouchEnd}
    >
      {/* Background image with parallax effect */}
      <picture className="pointer-events-none absolute inset-0 -z-10">
        <source media="(min-width: 640px)" srcSet="/2nd%20section%20desktop%20background.png" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/2nd%20section%20mobile%20background.png" 
          alt="" 
          className="h-full w-full object-cover transition-transform duration-1000 ease-out" 
          style={{ transform: isVisible ? 'scale(1)' : 'scale(1.05)' }}
        />
      </picture>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline + static pills */}
        <div className="mx-auto max-w-5xl text-center">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-heading transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Study every subject!
          </h2>
          <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-2">
            {ALL_GRADES.map((g, index) => (
              <Chip key={g} variant="grade" delay={500 + index * 50}>{g}</Chip>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {ALL_SUBJECTS.map((s, index) => (
              <Chip key={s} variant="subject" delay={800 + index * 50}>{s}</Chip>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <h3 className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-heading transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '300ms' }}>
            With the Most Experienced Teachers
          </h3>
        </div>

        {/* ===== MOBILE: horizontal scroll with peek & snap ===== */}
        <div className={`sm:hidden mt-6 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`} style={{ transitionDelay: '600ms' }}>
          <div
            ref={mobileTrackRef}
            onScroll={onMobileScroll}
            className="flex items-stretch gap-4 overflow-x-auto px-4 pb-4 scrollbar-none snap-x snap-mandatory"
          >
            {TEACHERS.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => { mobileCardRefs[i].current = el; }}
                className="snap-center shrink-0"
                style={{ width: `min(${cardWidthVW}vw, 420px)` }}
              >
                <Card t={t} isActive={i === current} />
              </div>
            ))}
          </div>

          {/* Bottom controls → arrows like your screenshot + dots to the right */}
          <div className="mt-1 flex items-center justify-between px-4">
            {/* Left/Right buttons group (white background, thin grey border, 12px radius) */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous"
                className="rounded-[12px] bg-white border border-border p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="rounded-[12px] bg-white border border-border p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>

            {/* Dots to the right (active larger + green) */}
            <div className="flex items-center gap-2">
              {TEACHERS.map((_, i) => (
                <span
                  key={i}
                  onClick={() => { setCurrent(i); scrollToIndex(i) }}
                  className={`${i === current
                    ? "h-2.5 w-2.5 bg-secondary"
                    : "h-2 w-2 bg-foreground/25"
                    } rounded-full transition-all duration-300 cursor-pointer hover:scale-125`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===== TABLET/DESKTOP: stacked carousel ===== */}
        <div className={`relative mt-6 sm:mt-8 h-[520px] hidden sm:block transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`} style={{ transitionDelay: '800ms' }}>
          {/* Arrows next to side cards (independent offsets) */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute top-1/2 z-40 -translate-y-1/2 rounded-[20px] bg-card p-3 shadow ring-1 ring-border hover:bg-accent transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
            style={{ left: `calc(50% - ${sideArrowOffset + extraLeftArrowPush}px)` }}
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute top-1/2 z-40 -translate-y-1/2 rounded-[20px] bg-card p-3 shadow ring-1 ring-border hover:bg-accent transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
            style={{ left: `calc(50% + ${sideArrowOffset + extraRightArrowPush}px)` }}
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Cards */}
          <div className="relative mx-auto h-full w-full max-w-[min(92vw,1100px)]">
            {TEACHERS.map((t, i) => (
              <div
                key={t.id}
                className="absolute left-1/2 top-0 -translate-x-1/2 w-[min(70vw,380px)] lg:w-[360px]"
                style={styleFor(i)}
                onClick={() => setCurrent(i)}
              >
                {i === current ? 
                  <Card t={t} refCb={(el) => (centerCardRef.current = el)} isActive={true} /> : 
                  <Card t={t} isActive={false} />
                }
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-6 max-w-4xl rounded-full bg-gradient-to-r from-transparent via-black/5 to-transparent blur-md" />
        </div>
      </div>
    </section>
  )
}