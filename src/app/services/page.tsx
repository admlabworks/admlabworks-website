'use client'

import { useEffect } from 'react'
import CTA from '@/components/CTA'
import { usePreloaderDone } from '@/context/PreloaderContext'

const services = [
  {
    id: 'brand-identity',
    title: 'Brand Identity\n& Graphic Design',
    desc: 'We create brand identities, digital interfaces, and visual content that communicate clearly, work consistently across every format, and reflect who the brand truly is.',
    features: [
      'Logo Design',
      'Visual Language & Design System',
      'Rebranding',
      'Stationery & Packaging Design',
      'Social Media Branding',
    ],
    img: 'https://aerukart.com/wp-content/uploads/2025/10/TOPCOACH-IMAGE-PORTFOLIOa-1.webp',
    imgAlt: 'Brand Identity Project',
  },
  {
    id: 'website-design',
    title: 'Website Design\n& Development',
    desc: 'Web Development is the foundation of digital success. It combines technical expertise, design thinking, and performance optimization to create web experiences that are fast, secure, and designed to achieve your business goals.',
    features: [
      'Website Design',
      'Web Applications Development',
      'Hosting & Domain Service',
      'SaaS / Content Platforms',
      'Website Revamps & Rebranding',
      'API Integrations',
      'Maintenance & Support',
      'Scaling & Performance',
    ],
    img: 'https://aerukart.com/wp-content/uploads/2025/07/BANDY-IMAGE-PORTFOLIO.webp',
    imgAlt: 'Website Design Project',
  },
  {
    id: 'video-content',
    title: 'Video &\nVisual Content',
    desc: 'Captivating video content engineered for maximum retention. We cover everything from fast-paced, trendy social reels to polished talking-head videos, ensuring your narrative shines with professional-grade finishing.',
    features: [
      'Motion Graphics & Animation',
      'Reel Editing (Real Estate, Talking Head, Promos & Video Ads)',
      'Video Editing (Podcast, YouTube Vlog & Social Media Content)',
      'Color Grading & Sound Design',
      'Social Media Post Design',
    ],
    img: 'https://aerukart.com/wp-content/uploads/2025/07/ACADEMY-RIVALS-IMAGE-PORTFOLIO.webp',
    imgAlt: 'Video & Visual Content Project',
  },
  {
    id: 'streamer-graphics',
    title: 'Graphics for\nStreamers',
    desc: 'Everything you need to elevate your stream\'s production value. We create cohesive, eye-catching visual packages that make your channel stand out and look professional across all major broadcasting platforms.',
    features: [
      'Streaming Overlays Package (TikTok/Twitch/Kick/YouTube)',
      'Streaming Setup & Integration (OBS/Streamlabs/TikTok Studio)',
      'Emojis, Stickers, Cover & Panel Design (Twitch/YouTube/Kick)',
      'Thumbnail Design',
      'Custom Alerts Animation',
    ],
    img: 'https://aerukart.com/wp-content/uploads/2025/10/TOPCOACH-IMAGE-PORTFOLIOa-1.webp',
    imgAlt: 'Graphics for Streamers Project',
  },
]

const anchorLinks = [
  { href: '#brand-identity', label: 'Brand Identity & Graphic Design' },
  { href: '#website-design', label: 'Website Design & Development' },
  { href: '#video-content', label: 'Video & Visual Content' },
  { href: '#streamer-graphics', label: 'Graphics for Streamers' },
]

export default function ServicesPage() {
  const { isPreloaderDone } = usePreloaderDone()

  useEffect(() => {
    if (!isPreloaderDone) return
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
  }, [isPreloaderDone])

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
                    <a href="/portfolio" className="btn-modern"><span className="btn-modern_label">View projects</span><span className="btn-modern_bg"></span></a>
                    <a href="/contact" className="btn-modern"><span className="btn-modern_label">Start a project</span><span className="btn-modern_bg"></span></a>
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
