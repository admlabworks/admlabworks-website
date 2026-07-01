import { useEffect, useRef } from 'react'

interface Service {
  num: string
  title: string
  desc: string
  items: string[]
  keywords: string[]
  comingSoon?: boolean
}

const services: Service[] = [
  {
    num: '01',
    title: 'Brand Identity & Graphic Design',
    desc: 'We create brand identities, digital interfaces, and visual content that communicate clearly, work consistently across every format, and reflect who the brand truly is.',
    items: [
      'Logo Design',
      'Visual Language & Design System',
      'Rebranding',
      'Stationery & Packaging Design',
      'Social Media Branding',
    ],
    keywords: [
      'Minimalist Logo Design',
      'Corporate Branding Kit',
      'Custom Brand Identity',
      'Startup Rebranding',
      'Visual Style Guide',
      'Corporate Logo',
      'Sports Logo',
      'Tech Logo',
      'Abstract Logo',
      'Social Media Post Design',
      'Social Media Branding',
    ],
  },
  {
    num: '02',
    title: 'Website Design & Development',
    desc: 'Web Development is the foundation of digital success. It combines technical expertise, design thinking, and performance optimization to create web experiences that are fast, secure, and designed to achieve your business goals. From simple websites to complex web applications, we build digital properties that work as hard as you do.',
    items: [
      'Website Design',
      'Web Applications Development',
      'Hosting & Domain Service',
      'SaaS / Content Platforms',
      'Website Revamps & Rebranding',
      'API Integrations',
      'Maintenance & Support',
      'Scaling & Performance',
    ],
    keywords: [
      'Modern Web Design',
      'UI/UX Landing Page',
      'Ecommerce Website Setup',
      'Custom Portfolio Design',
      'Business Website Revamp',
    ],
  },
  {
    num: '03',
    title: 'Video & Visual Content',
    desc: 'Captivating video content engineered for maximum retention. We cover everything from fast-paced, trendy social reels to polished talking-head videos, ensuring your narrative shines with professional-grade finishing.',
    items: [
      'Motion Graphics & Animation',
      'Reel Editing (Real Estate, Talking Head, Promos & Video Ads)',
      'Video Editing (Podcast, YouTube Vlog & Social Media Content)',
      'Color Grading & Sound Design',
      'Social Media Post Design',
    ],
    keywords: [
      'TikTok Reels Editing',
      'UGC Video Ads',
      'Talking Head Edits',
      'Real Estate Promos',
      'Podcast Video Editing',
      'YouTube Long-Form Edits',
      'Social Media Post Design',
    ],
  },
  {
    num: '04',
    title: 'Graphics for Streamers',
    desc: 'Everything you need to elevate your stream\'s production value. We create cohesive, eye-catching visual packages that make your channel stand out and look professional across all major broadcasting platforms.',
    items: [
      'Streaming Overlays Package (TikTok/Twitch/Kick/YouTube)',
      'Streaming Setup & Integration (OBS/Streamlabs/TikTok Studio)',
      'Emojis, Stickers, Cover & Panel Design (Twitch/YouTube/Kick)',
      'Thumbnail Design',
      'Custom Alerts Animation',
    ],
    keywords: [
      'Custom Twitch Overlays',
      'Kick Stream Package',
      'Animated Webcam Borders',
      'YouTube Thumbnail Design',
      'Custom Emotes & Badges',
      'Custom Alerts',
      'TikTok Overlays',
    ],
  },
]

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TextRoll({ text, comingSoon }: { text: string; comingSoon?: boolean }) {
  const lines = text.split('\n')
  return (
    <span className="service-card-title-text">
      {lines.map((line, li) => (
        <span key={li} className="text-roll-line">
          {line.split(/(\s+)/).map((segment, si) => {
            if (/^\s+$/.test(segment)) {
              return <span key={si} className="text-roll-space">{'\u00A0'}</span>
            }
            return (
              <span key={si} className="text-roll-word">
                {[...segment].map((char, ci) => {
                  const displayChar = char === ' ' ? '\u00A0' : char
                  return (
                    <span key={ci} className={`text-roll-char-wrap${comingSoon ? ' no-animate' : ''}`}>
                      <span className="text-roll-char-inner" style={{ transitionDelay: `${ci * 25}ms` }}>
                        <span className="text-roll-char">{displayChar}</span>
                        <span className="text-roll-char-clone" aria-hidden="true">{displayChar}</span>
                      </span>
                    </span>
                  )
                })}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll<HTMLElement>('.service-card')
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '-40px' }
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-label">01 / Services</div>
        <h2 className="section-title">Big <em>ideas.</em> Zero <em>agency</em> drama.</h2>

        <div className="services-grid" ref={gridRef}>
          {services.map((s, i) => (
            <div key={i} className={`service-card${s.comingSoon ? ' coming-soon' : ''}`}>
              <div className="service-card-number">{s.num}</div>
              <h3 className="service-card-title">
                <TextRoll text={s.title} comingSoon={s.comingSoon} />
              </h3>
              <p className="service-card-desc">{s.desc}</p>
              <span className="service-divider" />
              <ul className="service-card-list">
                {s.items.map((item, j) => (
                  <li key={j}>
                    <IconCheck />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="service-card-footer">
                <a href={s.comingSoon ? undefined : '/contact'} className="service-card-arrow" style={s.comingSoon ? { pointerEvents: 'none' } : undefined}>
                  {s.comingSoon ? 'Coming soon' : 'Enquire'}
                </a>
                <span className="service-card-footer-divider" />
                <div className="service-card-keywords">
                  <div className="service-card-keywords-label">Keywords</div>
                  <div className="service-card-keywords-list">
                    {s.keywords.map((kw, j) => (
                      <span key={j} className="service-card-keyword">{kw}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
