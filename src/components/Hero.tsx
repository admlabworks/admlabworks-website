'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { usePreloaderDone } from '@/context/PreloaderContext'

const Logo3D = dynamic(() => import('@/components/Logo3D'), { ssr: false })

const words = ['GRAPHIC DESIGN', 'WEBSITE DESIGN', 'VIDEO EDITING', 'MOTION DESIGN', 'BRAND IDENTITY','GRAPHICS FOR STREAMERS', 'SOCIAL MEDIA CONTENT']

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { isPreloaderDone } = usePreloaderDone()

  useEffect(() => {
    if (!isPreloaderDone) return
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isPreloaderDone])

  return (
    <section className="hero" id="hero">
      <div className="hero-video-bg">
        <video className="video-bl" autoPlay muted loop playsInline crossOrigin="anonymous" preload="auto">
          <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
          <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.mp4" type="video/mp4" />
        </video>
        <video className="video-tr" autoPlay muted loop playsInline crossOrigin="anonymous" preload="auto">
          <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
          <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" />
      <div className="hero-fade-bottom" />

      <div className="hero-content">
        <div className="hero-logo-3d"><Logo3D /></div>
        <div className="hero-headline">
          <div className="hero-headline-dynamic-wrapper">
            {words.map((word, i) => (
              <span
                key={i}
                className={`word${i === activeIndex ? ' active' : ''}`}
                style={{
                  transition: 'opacity 0.4s ease, transform 0.5s ease',
                  transform: i === activeIndex ? 'rotateY(0deg)' : 'rotateY(90deg)',
                  opacity: i === activeIndex ? 1 : 0,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        <h1 className="hero-title">ADM LABWORKS</h1>
        <p className="hero-subtitle">
          {"Just an independent creator making sure your digital presence hits the mark. Whether you need stream graphics, a sleek website, or a full brand overhaul, I keep things simple. You get an experienced creative partner, zero corporate fluff, and work that stands out.".split('').map((char, i) => (
            <span key={i} className="hero-subtitle-char" style={{ opacity: 0 }}>{char}</span>
          ))}
        </p>
        <div className="hero-cta">
          <a href="/services" className="btn-modern" style={{ padding: '12px 20px' }}><span className="btn-modern_label">My Services</span><span className="btn-modern_bg"></span></a>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="mouse" />
      </div>
    </section>
  )
}
