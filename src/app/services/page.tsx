'use client'

import { useEffect } from 'react'
import CTA from '@/components/CTA'

const services = [
  {
    id: 'website-design',
    title: 'Website Design',
    desc: 'Bring your brand to life with a high-performance WordPress site. I accompany you in creating a fast, responsive, and SEO-optimized site at a lower cost.',
    features: [
      'SEO, hosting & maintenance included',
      'Training included',
      'Fast and optimized for mobile',
      'Updates included',
      '2 prices (template or custom)',
    ],
    img: 'https://aerukart.com/wp-content/uploads/2025/10/TOPCOACH-IMAGE-PORTFOLIOa-1.webp',
    imgAlt: 'Website Design Project',
  },
  {
    id: 'ux-ui-design',
    title: 'UX/UI Design',
    desc: 'Give your users an intuitive and memorable experience. I design high-fidelity Figma prototypes with a solid design system adapted to your needs.',
    features: [
      'User research & quick audit included',
      'Interactive Figma prototype + design system',
      'Responsive & accessible (WCAG best practices)',
      '2 iteration cycles + dev handoff (specs & assets)',
      'Post-delivery support for minor adjustments',
    ],
    img: 'https://aerukart.com/wp-content/uploads/2025/07/BANDY-IMAGE-PORTFOLIO.webp',
    imgAlt: 'UX/UI Design Project',
  },
  {
    id: 'digital-creation',
    title: 'Digital Creation',
    desc: 'Give your brand a strong identity: distinctive logo, polished graphic charter, and consistent visuals. I shape an image that reflects your values, captures attention, and inspires trust.',
    features: [
      'Distinctive logo & strong visual identity',
      'Complete & consistent graphic charter',
      'Visuals optimized for web & print',
      '2D or 3D Motion Design',
      'Multi-platform variations',
    ],
    img: 'https://aerukart.com/wp-content/uploads/2025/07/ACADEMY-RIVALS-IMAGE-PORTFOLIO.webp',
    imgAlt: 'Digital Creation Project',
  },
]

const anchorLinks = [
  { href: '#website-design', label: 'Website Design' },
  { href: '#ux-ui-design', label: 'UX/UI Design' },
  { href: '#digital-creation', label: 'Digital Creation' },
]

export default function ServicesPage() {
  useEffect(() => {
    async function initAnimations() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo('.breadcrumb', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.portfolio-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 })
      gsap.fromTo('.hero-anchor-link', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.5 })

      document.querySelectorAll('.service-page-card').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 + i * 0.15,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        )
      })
    }
    initAnimations()
  }, [])

  return (
    <main>
      <section className="portfolio-hero">
        <div className="portfolio-bg-video portfolio-bg-bl">
          <video autoPlay muted loop playsInline>
            <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
          </video>
        </div>
        <div className="portfolio-bg-video portfolio-bg-tr">
          <video autoPlay muted loop playsInline>
            <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
          </video>
        </div>

        <div className="portfolio-spacer" />

        <div className="container">
          <nav className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-sep">/</span>
            <span>Services</span>
          </nav>

          <h2 className="portfolio-title">My Services</h2>

          <div className="hero-anchor-links">
            {anchorLinks.map(link => (
              <a key={link.href} href={link.href} className="hero-anchor-link">{link.label}</a>
            ))}
          </div>
        </div>

        <div className="portfolio-spacer" />
        <div className="portfolio-fade-bottom" />
      </section>

      <section className="services-page-section">
        <div className="container">
          {services.map((s, i) => (
            <div key={i}>
              <div className="service-page-card" id={s.id}>
                <div className="service-page-card-content">
                  <h2 className="service-page-card-title">{s.title}</h2>
                  <p className="service-page-card-desc">{s.desc}</p>
                  <ul className="service-page-card-features">
                    {s.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                  <div className="service-page-card-ctas">
                    <a href="/portfolio" className="btn-primary">View projects</a>
                    <a href="/contact" className="btn-primary btn-accent">Start a project</a>
                  </div>
                </div>
                <div className="service-page-card-img">
                  <img src={s.img} alt={s.imgAlt} loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </main>
  )
}
