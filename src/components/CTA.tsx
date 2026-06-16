'use client'

import { useEffect, useRef } from 'react'

const slides = [
  'Ready to bring your project to life?',
  "Let's make your brand shine.",
  'Every great project starts with a conversation.',
  'Ready when you are.',
]

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const mq = marqueeRef.current
    if (!mq) return

    const content = mq.querySelector('.cta-marquee-content') as HTMLElement
    if (!content) return
    if (mq.querySelector('.cta-marquee-content[aria-hidden="true"]')) return

    const clone = content.cloneNode(true) as HTMLElement
    clone.setAttribute('aria-hidden', 'true')
    mq.appendChild(clone)

    const speed = mq.dataset.speed || '20s'
    mq.querySelectorAll('.cta-marquee-content').forEach(el => {
      (el as HTMLElement).style.animationDuration = speed
    })
  }, [])

  return (
    <section className="cta-section" id="contact">
      <div className="cta-marquee-wrap" ref={marqueeRef} data-speed="20s">
        <ul className="cta-marquee-content">
          <li><a href="/contact">Ready to bring your project to life?</a></li>
          <li><a href="/contact">Let&apos;s talk.</a></li>
          <li><a href="/contact">Every great project starts with a conversation.</a></li>
          <li><a href="/contact">Let&apos;s talk.</a></li>
          <li><a href="/contact">Ready to make your brand shine?</a></li>
          <li><a href="/contact">Let&apos;s talk.</a></li>
          <li><a href="/contact">When do we start?</a></li>
          <li><a href="/contact">Let&apos;s talk.</a></li>
        </ul>
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
