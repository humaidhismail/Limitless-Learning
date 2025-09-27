"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

const SOCIALS = [
  { href: "#", src: "/tiktok.png", alt: "TikTok" },
  { href: "#", src: "/insta.png", alt: "Instagram" },
  { href: "#", src: "/facebook.png", alt: "Facebook" },
]

export default function FooterCta() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="bg-footer pt-14 sm:pt-20 pb-14 sm:pb-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent transition-opacity duration-2000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-1/4 w-2 h-2 bg-white/10 rounded-full transition-all duration-4000 ease-out ${
          isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-32 right-1/3 w-1 h-1 bg-white/15 rounded-full transition-all duration-4000 ease-out ${
          isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`} style={{ animationDelay: '2s' }} />
        <div className={`absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-white/8 rounded-full transition-all duration-4000 ease-out ${
          isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`} style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto flex flex-col items-center px-4 relative">
        {/* Logo with entrance animation */}
        <div
          className={`relative mb-14 sm:mb-20 transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-3'
          }`}
          style={{ width: 143.63, height: 143.63 }}
        >
          <Image
            src="/new footer logo.png"
            alt="Limitless Learning"
            width={144}
            height={144}
            className={`object-contain transition-transform duration-300 hover:scale-105 ${
              isVisible ? 'animate-gentle-pulse' : ''
            }`}
            priority
          />
          
          {/* Subtle glow effect */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`} style={{ transitionDelay: '500ms' }} />
        </div>

        {/* Actions with staggered animation */}
        <div className={`flex flex-col items-center gap-3 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '300ms' }}>
          {/* UPDATED: go to https://register.limitlesslearning.mv/ */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className={`
              h-[41px] w-[268px]
              justify-center gap-2 rounded-lg
              border-2 border-secondary text-secondary
              bg-transparent hover:bg-secondary/10 active:bg-secondary/15
              px-3 text-[14px] leading-none
              focus-visible:ring-[3px] focus-visible:ring-[#00B282]/60 focus-visible:border-[#00B282]
              shadow-[0_1px_0_rgba(0,0,0,0.06)]
              transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-0.5
              active:scale-[0.98] group
              ${isVisible ? 'animate-slide-up-1' : ''}
            `}
          >
            <a
              href="https://register.limitlesslearning.mv/"
              aria-label="Register with Google"
              className="flex items-center gap-2"
              /* add target="_blank" rel="noopener noreferrer" if you prefer a new tab */
            >
              <Image
                src="/Google-Logo.png"
                alt="Google"
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="transition-all duration-300">Register with Google</span>
            </a>
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className={`
              h-[41px] w-[268px]
              justify-center gap-2 rounded-lg
              border-2 border-secondary text-secondary
              bg-transparent hover:bg-secondary/10 active:bg-secondary/15
              px-3 text-[15px] font-semibold leading-none
              focus-visible:ring-[3px] focus-visible:ring-[#00B282]/60 focus-visible:border-[#00B282]
              shadow-[0_1px_0_rgba(0,0,0,0.06)]
              transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-0.5
              active:scale-[0.98] group
              ${isVisible ? 'animate-slide-up-2' : ''}
            `}
          >
            <a href="tel:3319010" aria-label="Call 3319010" className="flex items-center gap-2">
              <Phone className="h-4 w-4 -mt-[1px] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span className="tracking-wide transition-all duration-300">3319010</span>
            </a>
          </Button>
        </div>

        {/* Social icons with individual animations */}
        <div className={`my-[35px] flex items-center justify-center gap-[35px] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '600ms' }}>
          {SOCIALS.map((s, index) => (
            <a
              key={s.alt}
              href={s.href}
              aria-label={s.alt}
              className={`block h-[35px] w-[35px] transition-all duration-300 hover:opacity-90 hover:scale-110 hover:-translate-y-1 ${
                isVisible ? 'animate-bounce-in' : 'opacity-0 scale-50'
              }`}
              style={{ 
                animationDelay: `${800 + index * 150}ms`,
                transitionDelay: `${800 + index * 150}ms`
              }}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={35}
                height={35}
                className="h-[35px] w-[35px] object-contain transition-transform duration-300 hover:rotate-12"
                draggable={false}
              />
            </a>
          ))}
        </div>

        {/* Email with final animation */}
        <a
          href="mailto:info@limitlesslearning.edu.mv"
          className={`text-sm text-card-text hover:underline transition-all duration-500 hover:text-card-text/80 hover:scale-105 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          info@limitlesslearning.mv
        </a>
      </div>

      <style jsx>{`
        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes slide-up-1 {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slide-up-2 {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.5) translateY(10px); }
          60% { opacity: 1; transform: scale(1.1) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .animate-gentle-pulse {
          animation: gentle-pulse 4s ease-in-out infinite;
        }
        
        .animate-slide-up-1 {
          animation: slide-up-1 0.8s ease-out forwards;
          animation-delay: 400ms;
        }
        
        .animate-slide-up-2 {
          animation: slide-up-2 0.8s ease-out forwards;
          animation-delay: 500ms;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      `}</style>
    </footer>
  )
}
