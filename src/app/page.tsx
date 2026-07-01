'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import CTA from '@/components/CTA'

export default function Home() {
  useEffect(() => {
    let st: any = null

    async function initAnimations() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      st = ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // Header main row - fadeInDown
      gsap.fromTo('.header',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.2, ease: 'power3.out' }
      )

      // Social sidebar - slideIn (y only, keep opacity:1 for backdrop-filter compositing)
      gsap.fromTo('.social-sidebar',
        { y: -10 },
        { y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' }
      )

      // Hero stagger
      const heroTl = gsap.timeline({ delay: 0.5 })
      heroTl
        .fromTo('.hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .fromTo('.hero-headline', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.25')
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-scroll', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')

      // Section labels + titles reveal
      document.querySelectorAll('.section-label, .section-title').forEach(el => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        )
      })

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
  }, [])

  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <CTA />
    </main>
  )
}
