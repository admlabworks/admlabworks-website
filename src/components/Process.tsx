'use client'

import { useEffect, useRef } from 'react'

interface Step {
  num: string
  total: string
  title: string
  desc: string
  items: string[]
  img: string
  alt: string
}

const steps: Step[] = [
  {
    num: '01', total: '04',
    title: 'Strategy',
    desc: 'We get to know you and your brand. Goals, audience, competition. Out of that comes the roadmap everything else stands on.',
    items: ['Briefing & Discovery', 'Competitor Analysis', 'Brand Strategy', 'Roadmap'],
    img: 'https://aerukart.com/wp-content/uploads/2025/07/BANDY-IMAGE-PORTFOLIO.webp',
    alt: 'Strategy',
  },
  {
    num: '02', total: '04',
    title: 'Design',
    desc: 'Identity, interface, prototype. This is where the brand becomes visible — from the first sketch to the last pixel.',
    items: ['Wireframes & UX', 'Visual Identity', 'UI Design', 'Prototyping'],
    img: 'https://aerukart.com/wp-content/uploads/2025/07/ACADEMY-RIVALS-IMAGE-PORTFOLIO.webp',
    alt: 'Design',
  },
  {
    num: '03', total: '04',
    title: 'Build',
    desc: 'Engineering with modern tools. Clean code that scales and stands the test of time.',
    items: ['Frontend & CMS', 'Performance & SEO', 'Quality Assurance', 'Testing'],
    img: 'https://aerukart.com/wp-content/uploads/2025/10/TOPCOACH-IMAGE-PORTFOLIOa-1.webp',
    alt: 'Build',
  },
  {
    num: '04', total: '04',
    title: 'Launch & Care',
    desc: 'Deployment, monitoring, and continuous optimization. We stay on it — your brand grows, and we grow with it.',
    items: ['Go-Live', 'Analytics Setup', 'Maintenance & Updates', 'Iteration & Growth'],
    img: 'https://aerukart.com/wp-content/uploads/2026/04/CRM-Tech-O-Banner-Portfolio.webp',
    alt: 'Launch & Care',
  },
]

export default function Process() {
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const triggers: any[] = []

    async function init() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const pins = stack!.querySelectorAll<HTMLElement>('.process-card-pin')

      pins.forEach((pin) => {
        const card = pin.querySelector('.process-card') as HTMLElement

        const tween = gsap.fromTo(card,
          { scale: 0.92, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              start: 'top bottom',
              end: 'top top+=250',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        )
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
      })

      ScrollTrigger.refresh()
    }

    init()

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-label">02 / Process</div>
        <h2 className="section-title">From <em>briefing</em> to <em>launch.</em></h2>
      </div>
      <div className="process-stack" ref={stackRef}>
        {steps.map((step, i) => (
          <div
            key={i}
            className="process-card-pin"
            style={{ '--i': i, zIndex: i + 1 } as React.CSSProperties}
          >
            <article className="process-card">
              <div className="process-card-media">
                <img src={step.img} alt={step.alt} loading="lazy" />
              </div>
              <div className="process-card-body">
                <span className="process-step-num">
                  {step.num}<span className="process-step-num-divider">/</span>{step.total}
                </span>
                <h3 className="process-step-title">{step.title}</h3>
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
