'use client'

import { useEffect, useRef } from 'react'

const slides = [
  'Ready to bring your project to life?',
  "Let's make your brand shine.",
  'Every great project starts with a conversation.',
  'Ready when you are.',
]

const marqueeItems = [
  'Ready to bring your project to life?',
  "Let's talk.",
  'Every great project starts with a conversation.',
  "Let's talk.",
  'Ready to make your brand shine?',
  "Let's talk.",
  'When do we start?',
  "Let's talk.",
]

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]
    let current = 0
    children[0].style.opacity = '1'

    const interval = setInterval(() => {
      const prev = current
      current = (current + 1) % children.length
      children[prev].style.opacity = '0'
      children[current].style.opacity = '1'
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="cta-section" id="contact">
      <div className="cta-marquee-wrap">
        <div className="cta-marquee-track">
          <ul className="cta-marquee-content">
            {marqueeItems.map((text, i) => (
              <li key={i}><a href="/contact">{text}</a></li>
            ))}
          </ul>
          <ul className="cta-marquee-content" aria-hidden="true">
            {marqueeItems.map((text, i) => (
              <li key={i}><a href="/contact">{text}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="cta-inner">
        <div className="cta-video-wrap">
          <video className="cta-video" autoPlay muted loop playsInline>
            <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
          </video>
        </div>
        <div className="cta-content">
          <div className="cta-rotator" ref={containerRef}>
            {slides.map((text, i) => (
              <span key={i} className="cta-slide">{text}</span>
            ))}
          </div>
          <p className="cta-text">Tell me about your ideas and let&apos;s work together!</p>
          <a href="/contact" className="btn-primary btn-accent btn-large">Start a project</a>
        </div>
      </div>
    </section>
  )
}
