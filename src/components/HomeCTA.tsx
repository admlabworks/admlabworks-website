'use client'

import { useEffect, useRef } from 'react'

export default function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let st: any = null

    async function init() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      st = ScrollTrigger

      const items = el!.querySelectorAll('.home-cta-anim')
      if (items.length) {
        gsap.fromTo(items,
          { y: '3rem', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: '25% 80%',
              end: '50% center',
              scrub: 1,
            },
          }
        )
      }
    }

    init()

    return () => {
      if (st) st.getAll().forEach((t: any) => t.kill())
    }
  }, [])

  return (
    <section className="home-cta" ref={sectionRef}>
      <img
        className="home-cta-float-img"
        src="https://res.cloudinary.com/dqeflf8z7/image/upload/v1781445475/adm-cover_ecrpwf.jpg"
        alt=""
      />
      <div className="home-cta-inner">
        <h2 className="home-cta-title">
          <span className="home-cta-anim">Let&apos;s</span>
          <span className="home-cta-anim">Work Together.</span>
        </h2>
        <p className="home-cta-subtitle home-cta-anim">
          Got a project in mind? Let&apos;s turn your idea into something extraordinary.
        </p>
        <div className="home-cta-buttons home-cta-anim">
          <a href="/contact" className="btn-modern btn-modern-large">
            <span className="btn-modern_label">Get a Quote</span>
            <span className="btn-modern_bg"></span>
          </a>
          <a href="/contact" className="btn-modern btn-modern-large">
            <span className="btn-modern_label">Contact Me</span>
            <span className="btn-modern_bg"></span>
          </a>
        </div>
      </div>
    </section>
  )
}
