'use client'

import { useEffect, useState } from 'react'
import CTA from '@/components/CTA'

const rotatingTexts = ['Graphic Designer', 'Motion Designer', 'Video Editor', 'Web Developer']

export default function AboutPage() {
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % rotatingTexts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function initAnimations() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo('.breadcrumb', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.portfolio-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 })
      gsap.fromTo('.hero-anchor-link', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.5 })
      gsap.fromTo('.about-headline', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 })
      gsap.fromTo('.about-photo', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 })
      gsap.fromTo('.about-bio-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 })
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
            <span>About</span>
          </nav>

          <h2 className="portfolio-title">ABOUT ME</h2>

          <div className="hero-anchor-links">
            <span className="hero-anchor-link">ADM LabWorks</span>
            <span className="hero-anchor-link">ADMVAI</span>
            <span className="hero-anchor-link">Ajoy ADM</span>
          </div>
        </div>

        <div className="portfolio-fade-bottom" />
      </section>

      <section className="about-main">
        <div className="about-main-inner">
          <div className="about-photo">
            <img
              src="https://res.cloudinary.com/dqeflf8z7/image/upload/v1781445475/adm-cover_ecrpwf.jpg"
              alt="ADM Photo"
              loading="lazy"
            />
          </div>

          <p className="about-headline">
            Hello! I&apos;m{' '}
            <span className="about-highlight">Ajoy Mollik</span>, better known as{' '}
            <span className="about-highlight">ADM</span>.<br />
            I&apos;m a freelance {' '}
            <span className="about-rotating-text">{rotatingTexts[textIndex]}</span>{' '}
            based in{' '}
            <span className="bangladesh-text">
              <span className="bangladesh-char" style={{ '--i': 0 } as React.CSSProperties}>B</span>
              <span className="bangladesh-char" style={{ '--i': 1 } as React.CSSProperties}>a</span>
              <span className="bangladesh-char" style={{ '--i': 2 } as React.CSSProperties}>n</span>
              <span className="bangladesh-char flag-red" style={{ '--i': 3 } as React.CSSProperties}>g</span>
              <span className="bangladesh-char flag-red" style={{ '--i': 4 } as React.CSSProperties}>l</span>
              <span className="bangladesh-char flag-red" style={{ '--i': 5 } as React.CSSProperties}>a</span>
              <span className="bangladesh-char" style={{ '--i': 6 } as React.CSSProperties}>d</span>
              <span className="bangladesh-char" style={{ '--i': 7 } as React.CSSProperties}>e</span>
              <span className="bangladesh-char" style={{ '--i': 8 } as React.CSSProperties}>s</span>
              <span className="bangladesh-char" style={{ '--i': 9 } as React.CSSProperties}>h</span>
            </span>.
          </p>

          <p className="about-bio-text">
            In <strong>early 2018</strong>, I decided to officially launch as a <strong>Freelancer</strong> to pursue my ultimate goal: professional freedom. With over six years of experience helping businesses and creators stand out, my primary focus is crafting professional Brand Identities and Logo Designs that build immediate authority. I specialize in 100% custom, original work—absolutely no templates. To provide a complete digital solution, my services also include complete <strong>Web Design & Development</strong>, engaging <strong>Video Editing</strong> for Content Creators, high converting <strong>Social Media Post Design</strong>, and custom <strong>Stream Overlays & Animations</strong> for <strong>Twitch, YouTube, and TikTok.</strong>
          </p>
          <a
            href="https://aerukart.com/wp-content/uploads/2026/04/Park-Doomin-CV-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-accent"
          >
            Download my CV
          </a>

          <div className="about-banner-img">
            <img
              src="https://res.cloudinary.com/dqeflf8z7/image/upload/v1782840975/ADM_Branding_Page_ms6jiu.jpg"
              alt="ADM Branding Overview"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
