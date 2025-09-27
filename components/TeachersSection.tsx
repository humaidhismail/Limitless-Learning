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
  qualifications?: string
}

const TEACHERS: Teacher[] = [
  { id: "t4",  name: "Malaha Miss",   years: 6,  title: "Science Tutor",  grades: ["Grade 8","Grade 9","Grade 10"], subjects: ["Maths","Biology","Chemistry"], qualifications: "6 Years of Teaching Experience" },
  { id: "t8",  name: "Raufath Sir",   years: 12, title: "Dhivehi Tutor",  grades: ["Grade 9","Grade 10"],           subjects: ["Dhivehi"], qualifications: "12+ Years of Teaching Experience" },
  { id: "t9",  name: "Shuhudha Miss", years: 0,  title: "English Tutor",  grades: ["Grade 6","Grade 7","Grade 8"],  subjects: ["English"], qualifications: "Bachelor of Arts in Teaching English as a Foreign Language" },
  { id: "t1",  name: "Mijadh Sir",    years: 0,  title: "Business Tutor", grades: ["Grade 8","Grade 9","Grade 10"], subjects: ["Business"], qualifications: "BSc. (Hons) Business, Economics & Finance" },
  { id: "t2",  name: "Atheeq Sir",    years: 5,  title: "Accounting Tutor",grades: ["Grade 8","Grade 9","Grade 10"], subjects: ["Accounting"], qualifications: "5 Years of Teaching Experience" },
  { id: "t3",  name: "Humaidh Sir",   years: 0,  title: "STEM Tutor",     grades: ["Grade 9","Grade 10"],           subjects: ["Maths","Physics"], qualifications: "BEng Aeronautics & Astronautics" },
  { id: "t16", name: "Lamha Miss",    years: 0,  title: "Dhivehi Tutor",  grades: ["Grade 6","Grade 7","Grade 8"],  subjects: ["Dhivehi"], qualifications: "Masters in Education (Dhivehi Language Teaching)" },
  { id: "t14", name: "Azlifa Miss",   years: 7,  title: "Maths Tutor",    grades: ["Grade 6","Grade 7","Grade 8"],  subjects: ["Maths"], qualifications: "7 Years of Teaching Experience" },
  { id: "t17", name: "Aishath Miss",  years: 0,  title: "Business Tutor", grades: ["Grade 8","Grade 9","Grade 10"], subjects: ["Business"], qualifications: "Masters in Business Administration" },
  { id: "t6",  name: "Wilson Sir",    years: 0,  title: "Accounts Tutor", grades: ["Grade 9","Grade 10","Grade 11","Grade 12"], subjects: ["Accounts"], qualifications: "Masters in Business Administration" },
  { id: "t5",  name: "Joshi Sir",     years: 0,  title: "Economics Tutor",grades: ["Grade 11","Grade 12"],           subjects: ["Economics"], qualifications: "-" },
  { id: "t12", name: "Jumana Miss",   years: 10, title: "Chemistry Tutor",grades: ["Grade 8","Grade 9","Grade 10"], subjects: ["Chemistry"], qualifications: "Bachelors in Science, 10 Years of Teaching Experience" },
  { id: "t15", name: "Misbah Sir",    years: 0,  title: "Maths Tutor",    grades: ["Grade 11","Grade 12"],          subjects: ["Maths"], qualifications: "-" },
  { id: "t7",  name: "Thaufeeq Sir",  years: 20, title: "Islam Tutor",    grades: ["Grade 9","Grade 10","Grade 11","Grade 12"], subjects: ["Islam"], qualifications: "Masters in Teaching, Bachelors in Islamic Studies, SSC Marking Experience, 20+ Years of Teaching Experience" },
]

const ALL_GRADES = ["Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"]
const ALL_SUBJECTS = ["Biology","Chemistry","Physics","Business","Accounting","Economics","English","Maths","Islam","Dhivehi","Science","Accounts"]

/* ---------- Card ---------- */
const TeacherCard = ({
  teacher,
  refCallback,
  className = "",
}: {
  teacher: Teacher
  refCallback?: (el: HTMLDivElement | null) => void
  className?: string
}) => (
  <div
    ref={refCallback ?? null}
    className={`rounded-[20px] bg-card text-card-foreground shadow-xl ring-1 ring-black/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group ${className}`}
  >
    <div className="p-6">
      <h3 className="text-xl font-semibold text-heading transition-colors duration-300 group-hover:text-primary mb-2">
        {teacher.name}
      </h3>
      <p className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-muted-foreground/80 mb-4">
        {teacher.years > 0 ? `${teacher.years}+ years of Teaching Experience, ` : ""}{teacher.title}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {teacher.grades.map((g, i) => (
          <span
            key={g}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground shadow transition-all duration-200 hover:scale-105 hover:shadow-md"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {g}
          </span>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {teacher.subjects.map((s, i) => (
          <span
            key={s}
            className="rounded-full border border-secondary px-3 py-1 text-xs font-medium text-secondary transition-all duration-200 hover:scale-105 hover:bg-secondary/10"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {s}
          </span>
        ))}
      </div>

      {teacher.qualifications && teacher.qualifications !== "-" && (
        <p className="mb-4 text-xs leading-5 text-muted-foreground transition-all duration-300 group-hover:text-muted-foreground/80">
          {teacher.qualifications}
        </p>
      )}

      {/* CTA now links to the registration page */}
      <a
        href="https://register.limitlesslearning.mv/"
        onClick={(e) => e.stopPropagation()}
        className="block w-full rounded-[20px] bg-secondary px-4 py-3 text-center text-sm font-semibold text-secondary-foreground shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
        aria-label={`Start Classes with ${teacher.name}`}
      >
        Start Classes with {teacher.name}
      </a>
    </div>
  </div>
)

/* ---------- Main ---------- */
export default function TeachersSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sectionVisible, setSectionVisible] = useState(false)

  // Multi-select filters
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])

  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setSectionVisible(true),
      { threshold: 0.1 }
    )
    sectionRef.current && io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  /* ---------- Filter + (stable) name sort ---------- */
  const processedTeachers = useMemo(() => {
    const filtered = TEACHERS.filter(t => {
      const okSubject = selectedSubjects.length === 0 || t.subjects.some(s => selectedSubjects.includes(s))
      const okGrade = selectedGrades.length === 0 || t.grades.some(g => selectedGrades.includes(g))
      return okSubject && okGrade
    })
    return filtered.sort((a, b) => a.name.localeCompare(b.name))
  }, [selectedSubjects, selectedGrades])

  useEffect(() => { setCurrentIndex(0) }, [processedTeachers])

  /* ---------- Desktop carousel metrics ---------- */
  const centerCardRef = useRef<HTMLDivElement | null>(null)
  const sideScale = 0.93
  const gutter = 12
  const [shift, setShift] = useState(220)
  const [sideArrowOffset, setSideArrowOffset] = useState(260)
  const extraLeftArrowPush = 80
  const extraRightArrowPush = 40

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

  /* ---------- Mobile slider (center detect) ---------- */
  const mobileTrackRef = useRef<HTMLDivElement | null>(null)
  const mobileCardRefs = useMemo(
    () => processedTeachers.map(() => ({ current: null as HTMLDivElement | null })),
    [processedTeachers]
  )
  const scrollRaf = useRef<number | null>(null)

  const updateCurrentByCenter = () => {
    const track = mobileTrackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const cx = rect.left + rect.width / 2

    let best = 0
    let bestDist = Infinity
    mobileCardRefs.forEach((r, i) => {
      const el = r.current
      if (!el) return
      const cr = el.getBoundingClientRect()
      const cardCx = cr.left + cr.width / 2
      const d = Math.abs(cardCx - cx)
      if (d < bestDist) { bestDist = d; best = i }
    })
    setCurrentIndex(best)
  }

  const onMobileScroll: React.UIEventHandler<HTMLDivElement> = () => {
    if (scrollRaf.current != null) return
    scrollRaf.current = requestAnimationFrame(() => {
      updateCurrentByCenter()
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
      scrollRaf.current = null
    })
  }

  const scrollToIndex = (i: number) => {
    mobileCardRefs[i]?.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }

  const prev = () => setCurrentIndex(i => {
    const ni = (i - 1 + processedTeachers.length) % processedTeachers.length
    scrollToIndex(ni)
    return ni
  })
  const next = () => setCurrentIndex(i => {
    const ni = (i + 1) % processedTeachers.length
    scrollToIndex(ni)
    return ni
  })

  /* ---------- Touch handling for desktop swipe (don’t block vertical scroll) ---------- */
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)

  /* ---------- Only show center + 1 neighbor per side on desktop ---------- */
  const styleFor = (i: number): React.CSSProperties => {
    const n = processedTeachers.length
    const leftDist = (i - currentIndex + n) % n
    const rightDist = (currentIndex - i + n) % n
    const offset = leftDist <= rightDist ? leftDist : -rightDist

    const isMobile = (typeof window !== "undefined" ? window.innerWidth : 1024) < 640
    if (isMobile) return {}

    const abs = Math.abs(offset)
    const isCenter = abs === 0
    const hidden = abs > 1

    if (hidden) {
      return {
        transform: `translateX(${offset * shift}px) translateY(12px) scale(${sideScale})`,
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        transition: "transform 400ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease",
      }
    }

    const translateX = offset * shift
    const translateY = isCenter ? 0 : 12
    const scale = isCenter ? 1 : sideScale
    const opacity = isCenter ? 1 : 0.68
    const z = isCenter ? 30 : 20

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex: z,
      cursor: isCenter ? "default" : "pointer",
      transition: "transform 400ms cubic-bezier(0.4,0,0.2,1), opacity 400ms cubic-bezier(0.4,0,0.2,1)",
    }
  }

  /* ---------- Filter helpers ---------- */
  const toggleGrade = (g: string) =>
    setSelectedGrades(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])

  const toggleSubject = (s: string) =>
    setSelectedSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const clearAll = () => { setSelectedGrades([]); setSelectedSubjects([]) }

  /* ---------- Mobile dots: max 3 (first/middle/last), 2 when only 2 ---------- */
  const renderMobileDots = () => {
    const n = processedTeachers.length
    if (n <= 1) return null

    const last = n - 1

    // decide which indices to show
    let targets: number[] = []
    if (n === 2) {
      targets = [0, 1]
    } else if (n === 3) {
      targets = [0, 1, 2]
    } else {
      const mid = Math.floor(last / 2)
      targets = [0, mid, last]
    }

    // which dot is active
    let active = 0
    if (targets.length === 2) {
      active = currentIndex >= targets[1] ? 1 : 0
    } else {
      active = currentIndex === targets[0] ? 0 : currentIndex === targets[2] ? 2 : 1
    }

    return (
      <div className="flex items-center gap-2">
        {targets.map((idx, i) => (
          <span
            key={`${idx}-${i}`}
            onClick={() => { setCurrentIndex(idx); scrollToIndex(idx) }}
            className={`${i === active ? "h-2.5 w-2.5 bg-secondary" : "h-2 w-2 bg-foreground/25"} rounded-full transition-all duration-300 cursor-pointer hover:scale-125`}
          />
        ))}
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-10 pb-10 sm:pt-12 sm:pb-8 lg:pt-14 lg:pb-6"
    >
      {/* Background images */}
      <picture className="pointer-events-none absolute inset-0 -z-10">
        <source media="(min-width: 640px)" srcSet="/2nd%20section%20desktop%20background.png" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/2nd%20section%20mobile%20background.png"
          alt=""
          className="h-full w-full object-cover transition-transform duration-1000 ease-out"
          style={{ transform: sectionVisible ? "scale(1)" : "scale(1.05)" }}
        />
      </picture>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="mx-auto max-w-5xl text-center">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-heading transition-all duration-1000 ease-out ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Study every subject!
          </h2>

          {/* Grade filter */}
          <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-2">
            {ALL_GRADES.map((g, i) => (
              <button
                key={g}
                onClick={() => toggleGrade(g)}
                className={`px-3 py-1 text-xs rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                  selectedGrades.includes(g)
                    ? "bg-secondary text-white border-secondary shadow-md"
                    : "bg-white text-secondary border-secondary hover:bg-secondary/5"
                } ${sectionVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2"}`}
                style={{ transitionDelay: `${500 + i * 50}ms` }}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Subject filter */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {ALL_SUBJECTS.map((s, i) => (
              <button
                key={s}
                onClick={() => toggleSubject(s)}
                className={`px-3 py-1 text-xs rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                  selectedSubjects.includes(s)
                    ? "bg-secondary text-white border-secondary shadow-md"
                    : "bg-white text-secondary border-secondary hover:bg-secondary/5"
                } ${sectionVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2"}`}
                style={{ transitionDelay: `${800 + i * 50}ms` }}
              >
                {s}
              </button>
            ))}
          </div>

          {(selectedGrades.length > 0 || selectedSubjects.length > 0) && (
            <button
              onClick={clearAll}
              className="mt-3 text-xs text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Heading above the cards — add mobile spacing */}
        <div className="mt-5 sm:mt-6 lg:mt-8 text-center">
          <h3
            className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-heading transition-all duration-1000 ease-out ${
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            With the Most Experienced Teachers
          </h3>
        </div>

        {/* Mobile slider */}
        <div className={`sm:hidden mt-6 transition-all duration-1000 ease-out ${
          sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`} style={{ transitionDelay: "600ms" }}>
          <div
            ref={mobileTrackRef}
            onScroll={onMobileScroll}
            className="flex items-stretch gap-4 overflow-x-auto px-4 pb-4 scrollbar-none snap-x snap-mandatory touch-auto overscroll-x-contain"
          >
            {processedTeachers.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => { mobileCardRefs[i].current = el }}
                className="snap-center shrink-0"
                style={{ width: "min(84vw, 420px)" }}
              >
                <TeacherCard teacher={t} />
              </div>
            ))}
          </div>

          {/* One-row controls: arrows + centered dots */}
          <div className="mt-1 px-4">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
              {/* Left arrow */}
              <button
                onClick={prev}
                aria-label="Previous"
                className="rounded-[12px] bg-white border border-border p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>

              {/* Dots centered between arrows */}
              <div className="justify-self-center">
                {renderMobileDots()}
              </div>

              {/* Right arrow */}
              <button
                onClick={next}
                aria-label="Next"
                className="rounded-[12px] bg-white border border-border p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop carousel (only center + 1 per side visible) */}
        <div
          className={`relative mt-6 sm:mt-8 h-[460px] hidden sm:block transition-all duration-1000 ease-out touch-pan-y ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "800ms" }}
          onTouchStart={(e) => {
            const t = e.touches[0]
            setTouchStart({ x: t.clientX, y: t.clientY })
          }}
          onTouchEnd={(e) => {
            if (!touchStart) return
            const t = e.changedTouches[0]
            const dx = t.clientX - touchStart.x
            const dy = t.clientY - touchStart.y
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
              dx > 0 ? prev() : next()
            }
            setTouchStart(null)
          }}
        >
          {/* Arrows */}
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

          {/* Cards (render all, but only center & immediate neighbors are visible) */}
          <div className="relative mx-auto h-full w-full max-w-[min(92vw,1100px)] overflow-hidden">
            {processedTeachers.map((t, i) => {
              const n = processedTeachers.length
              const leftIdx = (currentIndex - 1 + n) % n
              const rightIdx = (currentIndex + 1) % n
              const visible = i === currentIndex || i === leftIdx || i === rightIdx
              return (
                <div
                  key={t.id}
                  className="absolute left-1/2 top-0 -translate-x-1/2 w-[min(70vw,380px)] lg:w-[360px]"
                  style={styleFor(i)}
                  aria-hidden={!visible}
                >
                  {i === currentIndex
                    ? <TeacherCard teacher={t} refCallback={(el) => (centerCardRef.current = el)} />
                    : <TeacherCard teacher={t} />
                  }
                </div>
              )
            })}
          </div>

          {/* Shorter bottom glow */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto h-5 max-w-4xl rounded-full bg-gradient-to-r from-transparent via-black/5 to-transparent blur-md" />
        </div>
      </div>
    </section>
  )
}
