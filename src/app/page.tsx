'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import HomeCTA from '@/components/HomeCTA'
import CTA from '@/components/CTA'
import { usePreloaderDone } from '@/context/PreloaderContext'

export default function Home() {
  const { isPreloaderDone } = usePreloaderDone()

  useEffect(() => {
    if (!isPreloaderDone) return
    let st: any = null

    async function initAnimations() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      st = ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // Social sidebar - pop in 1 by 1 with bounce
      gsap.fromTo('.social-sidebar .social-btn',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.35, delay: 0, ease: 'back.out(2)' }
      )

      // Hero stagger
      const heroTl = gsap.timeline({ delay: 0 })
      heroTl
        .fromTo('.hero-title', { y: 40, opacity: 0, scale: 0.85, filter: 'blur(12px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, '0')
        .fromTo('.hero-headline', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.35')
        .fromTo('.hero-logo-3d', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', immediateRender: false }, '-=0.35')
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', onComplete: () => {
          gsap.fromTo('.hero-subtitle-char', { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.012, ease: 'power1.in' })
        } }, '0')
        .fromTo('.hero-cta', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.15')
        .fromTo('.hero-scroll', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })

      // Service cards stagger
      const cards = document.querySelectorAll('.service-card')
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.services-grid', start: 'top 80%', toggleActions: 'play none none none' }
          }
        )
      }

      ScrollTrigger.refresh()
    }

    initAnimations()

    return () => {
      if (st) st.getAll().forEach((t: any) => t.kill())
    }
  }, [isPreloaderDone])

  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <HomeCTA />
      <CTA />
    </main>
  )
}
