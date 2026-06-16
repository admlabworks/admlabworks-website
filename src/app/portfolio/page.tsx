'use client'

import { useEffect, useState } from 'react'
import CTA from '@/components/CTA'

interface Project {
  img: string
  cat: string
  desc: string
  link: string
  filters: string[]
}

const categories = [
  { value: '__all', label: 'All' },
  { value: 'brand-identity-design', label: 'Brand Identity Design' },
  { value: 'website-design', label: 'Website Design' },
  { value: 'video-editing', label: 'Video Editing' },
  { value: 'streaming-overlay-design', label: 'Streaming Overlay Design' },
  { value: 'thumbnail-design', label: 'Thumbnail Design' },
  { value: 'talking-head-video-editing', label: 'Talking Head Video Editing' },
  { value: 'shorts-reels-edit', label: 'Shorts/Reels Edit' },
  { value: 'logo-design', label: 'Logo Design' },
  { value: 'motion-design', label: 'Motion Design' },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('__all')

  useEffect(() => {
    async function initAnimations() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo('.breadcrumb', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.portfolio-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 })
      gsap.fromTo('.portfolio-filter-btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.05, delay: 0.5 })

      document.querySelectorAll('.portfolio-card').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 + i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        )
      })
    }
    initAnimations()
  }, [])

  const filteredProjects = activeFilter === '__all'
    ? projects
    : projects.filter(p => p.filters.includes(activeFilter))

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
            <span>Portfolio</span>
          </nav>

          <h2 className="portfolio-title">My Portfolio</h2>

          <div className="portfolio-filters">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`portfolio-filter-btn${activeFilter === cat.value ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-spacer" />
        <div className="portfolio-fade-bottom" />
      </section>

      <section className="portfolio-grid-section">
        <div className="container">
          <div className="portfolio-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p, i) => (
                <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="portfolio-card">
                  <div className="portfolio-card-img">
                    <img src={p.img} alt={p.cat} loading="lazy" />
                  </div>
                  <div className="portfolio-card-body">
                    <span className="portfolio-card-cat">{p.cat}</span>
                    <p className="portfolio-card-desc">{p.desc}</p>
                  </div>
                </a>
              ))
            ) : (
              <p className="portfolio-empty">No projects in this category yet.</p>
            )}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}

const projects: Project[] = [
  {
    img: 'https://aerukart.com/wp-content/uploads/2026/04/CRM-Tech-O-Banner-Portfolio.webp',
    cat: 'UX/UI Design',
    desc: 'CRM Tech-O — Custom CRM prototype with advanced UX/UI design and interactive Figma prototyping.',
    link: 'https://aerukart.com/crm-tech-o/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2025/07/BANDY-IMAGE-PORTFOLIO.webp',
    cat: '3D Design · Motion Design · UX/UI Design',
    desc: 'Bandy — A colocation expense management app with full prototyping, dark/light mode, and design system.',
    link: 'https://aerukart.com/bandy/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2025/10/JUNITA-IMAGE-PORTFOLIO-1.webp',
    cat: 'Direction Artistique',
    desc: 'Junita — Rebranding project for a wine brand, modernizing wine culture with a young, accessible identity.',
    link: 'https://aerukart.com/junita/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2025/10/IPP-1.webp',
    cat: '3D Design · Motion Design',
    desc: 'iPhone 14 Pro — 3D camera animation on Blender with custom video texture mapping.',
    link: 'https://aerukart.com/iphone-14-pro/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2026/04/LOOKBOOK-FACETHEORY-BANNER-PORTFOLIOe.webp',
    cat: 'UX/UI Design',
    desc: 'Facetheory — Redesign concept in both minimalist and maximalist design aesthetics.',
    link: 'https://aerukart.com/facetheory/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2026/04/LOOKBOOK_CAV_EMPT_BANNER-PORTFOLIO.webp',
    cat: 'UX/UI Design',
    desc: 'CAV EMPT Lookbook — Editorial digital experience for the brand\'s new collection.',
    link: 'https://aerukart.com/lookbook-cav-empt/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2025/07/ACADEMY-RIVALS-IMAGE-PORTFOLIO.webp',
    cat: 'Direction Artistique',
    desc: 'Academy Rivals — E-sport event branding with complete graphic charter and Twitch assets.',
    link: 'https://aerukart.com/academy-rivals/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2026/04/Acronym-Lookbook-Portfolio-1.webp',
    cat: 'UX/UI Design',
    desc: 'ACRONYM® Lookbook — Immersive editorial minisite for the brand\'s new collection.',
    link: 'https://aerukart.com/lookbook-acronym/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2025/10/TOPCOACH-IMAGE-PORTFOLIOa-1.webp',
    cat: 'WordPress',
    desc: 'TopCoach — WordPress integration of a pre-designed mockup for a coaching platform.',
    link: 'https://aerukart.com/topcoach/',
    filters: [],
  },
  {
    img: 'https://aerukart.com/wp-content/uploads/2026/04/LOOKBOOK-JIL-SANDER-IMAGE-PORTFOLIO.webp',
    cat: 'UX/UI Design',
    desc: 'JIL SANDER Lookbook — Editorial digital experience with a strong art direction.',
    link: 'https://aerukart.com/jil-sander/',
    filters: [],
  },
]
