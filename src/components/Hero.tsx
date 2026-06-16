'use client'

import { useEffect, useRef, useState } from 'react'

const words = ['BRAND IDENTITY', 'WEBSITE DESIGN', 'VIDEO EDITING']

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-video-bg">
        <video className="video-bl" autoPlay muted loop playsInline crossOrigin="anonymous" preload="auto">
          <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
        </video>
        <video className="video-tr" autoPlay muted loop playsInline crossOrigin="anonymous" preload="auto">
          <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
        </video>
      </div>
      <div className="hero-overlay" />
      <div className="hero-fade-bottom" />

      <div className="hero-content">
        <div className="hero-headline">
          <div className="hero-headline-dynamic-wrapper">
            {words.map((word, i) => (
              <span
                key={i}
                className={`word${i === activeIndex ? ' active' : ''}`}
                style={{
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  transform: i === activeIndex
                    ? 'translateY(0)'
                    : i < activeIndex
                      ? 'translateY(-10px)'
                      : 'translateY(10px)',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        <h1 className="hero-title">ADM LABWORKS</h1>
        <p className="hero-subtitle">
          I create clear, functional, and memorable designs. From brand identity to user interfaces, I help you build a digital presence that truly means something.
        </p>
        <div className="hero-cta">
          <a href="/services" className="btn-primary btn-accent btn-large">My Services</a>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="mouse" />
      </div>
    </section>
  )
}
