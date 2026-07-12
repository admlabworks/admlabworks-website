'use client'

import { useEffect, useRef } from 'react'

interface Step {
  num: string
  total: string
  title: string
  subheading: string
  desc: string
  items: string[]
  img: string
  alt: string
}

const steps: Step[] = [
  {
    num: '01', total: '04',
    title: 'Concept & Strategy',
    subheading: 'Phase 01 / Discovery & Moodboarding',
    desc: 'Every great asset starts with a solid game plan. We dive deep into your project goals, establish a creative direction, and align on a visual style that stands out—whether it\'s a wireframe for a site, a video script, or a brand mood board.',
    items: ['Project Goal Planning', 'Creative Direction', 'Visual Style Alignment', 'Wireframe & Scripting'],
    img: 'https://res.cloudinary.com/dqeflf8z7/image/upload/v1782756085/card-1_joy7nd.jpg',
    alt: 'Concept & Strategy',
  },
  {
    num: '02', total: '04',
    title: 'Design & Production',
    subheading: 'Phase 02 / Asset Creation & Crafting',
    desc: 'This is where raw ideas turn into premium visuals. I get to work inside the timeline or canvas—crafting high-fidelity branding, building lightning-fast web interfaces, cutting video timelines, or designing stream overlays from scratch.',
    items: ['High-Fidelity Branding', 'Web Interface Development', 'Video Timeline Editing', 'Stream Overlay Design'],
    img: 'https://res.cloudinary.com/dqeflf8z7/image/upload/v1782756085/card-2_t5kpgl.jpg',
    alt: 'Design & Production',
  },
  {
    num: '03', total: '04',
    title: 'Review & Refine',
    subheading: 'Phase 03 / Feedback & Polish',
    desc: 'Collaboration is key, minus the agency friction. You review the first-cut files, interactive prototypes, or draft edits. We polish the details, color grade, fix bugs, and tune the fine details until everything is absolutely flawless.',
    items: ['First-Cut Review', 'Interactive Prototype Testing', 'Detail Polish & Color Grade', 'Bug Fix & Tuning'],
    img: 'https://res.cloudinary.com/dqeflf8z7/image/upload/v1782756085/card-3_poztjj.jpg',
    alt: 'Review & Refine',
  },
  {
    num: '04', total: '04',
    title: 'Launch & Handover',
    subheading: 'Phase 04 / Final Delivery & Setup',
    desc: 'Ready for the world. I hand over fully organized branding packages, launch and host your new web platform, or deliver optimized video files and stream assets ready to hit upload or go live on OBS instantly.',
    items: ['Organized Brand Package', 'Web Platform Launch', 'Optimized Video Delivery', 'OBS/Stream Setup'],
    img: 'https://res.cloudinary.com/dqeflf8z7/image/upload/v1782756086/card-4_umhvis.jpg',
    alt: 'Launch & Handover',
  },
]

export default function Process() {
  const stackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    async function init() {
      if (!el) return
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const label = el.querySelector('.section-label')
      const title = el.querySelector('.section-title')

      if (label) {
        gsap.fromTo(label,
          { y: 60, scale: 0.95, opacity: 0, filter: 'blur(8px)' },
          { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: label, start: 'top 85%', end: 'top 40%' }
          }
        )
      }

      if (title) {
        gsap.fromTo(title,
          { y: 60, scale: 0.95, opacity: 0, filter: 'blur(8px)' },
          { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 85%', end: 'top 40%' }
          }
        )
      }
    }

    init()
  }, [])

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return
    if (window.innerWidth <= 768) return

    const cleanups: (() => void)[] = []

    async function init() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const pins = stack!.querySelectorAll<HTMLElement>('.process-card-pin')
      const total = pins.length

      pins.forEach((pin, i) => {
        const card = pin.querySelector('.process-card') as HTMLElement
        if (!card || i >= total - 1) return

        const targetScale = 1 - (total - 1 - i) * 0.02

        const tween = gsap.to(card, {
          scale: targetScale,
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${window.innerHeight * 0.5}`,
            scrub: 1,
          },
        })
        if (tween.scrollTrigger) cleanups.push(() => tween.scrollTrigger!.kill())
      })
    }

    init()

    return () => { cleanups.forEach(fn => fn()) }
  }, [])

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="container">
        <div className="section-label">02 / Process</div>
        <h2 className="section-title">From raw <em>concept</em> to final <em>delivery.</em></h2>
      </div>
      <div className="process-stack" ref={stackRef}>
        {steps.map((step, i) => (
          <div key={i} className="process-card-pin" style={{ '--i': i, zIndex: i + 1 } as React.CSSProperties}>
            <article className="process-card">
              <div className="process-card-media">
                <img src={step.img} alt={step.alt} loading="lazy" decoding="async" />
              </div>
              <div className="process-card-body">
                <span className="process-step-num">
                  {step.num}<span className="process-step-num-divider">/</span>{step.total}
                </span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-subheading">{step.subheading}</p>
                <p className="process-step-description">{step.desc}</p>
                <ul className="process-deliverables">
                  {step.items.map((item, j) => (
                    <li key={j} className="process-deliverable">{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
