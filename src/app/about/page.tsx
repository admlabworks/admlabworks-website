'use client'

import { useEffect, useState } from 'react'
import CTA from '@/components/CTA'

const rotatingTexts = ['and sharing.', 'and discussing.', 'and having fun.']

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
            <span className="hero-anchor-link">ADM</span>
            <span className="hero-anchor-link">LabWorks</span>
          </div>
        </div>

        <div className="portfolio-spacer" />
        <div className="portfolio-fade-bottom" />
      </section>

      <section className="about-main">
        <div className="about-main-inner">
          <p className="about-headline">
            Hello! I&apos;m ADM, a Graphic and Motion Designer based in Bangladesh.<br />
            I love creating{' '}
            <span className="about-rotating-text">{rotatingTexts[textIndex]}</span>
          </p>

          <div className="about-photo">
            <img
              src="https://res.cloudinary.com/dqeflf8z7/image/upload/v1781445475/adm-cover_ecrpwf.jpg"
              alt="ADM Photo"
              loading="lazy"
            />
          </div>

          <p className="about-bio-text">
            Since the age of <strong>10</strong>, I&apos;ve wanted to dive into this field. It all started when I wanted to become a YouTuber. I needed <strong>a banner and a logo</strong>, so I started teaching myself from there. I&apos;m also passionate about photography and video games.
          </p>

          <p className="about-bio-text">
            In <strong>early 2018</strong>, I decided to officially launch as a <strong>Freelancer</strong> to get closer to <strong>my goal</strong>: to be <strong>professionally free</strong>.<br />
            Since I was young, I&apos;ve had a few small clients with services like logos and banners &mdash; it was <strong>a logical step</strong> for me to take. The name <strong>&laquo; Aeruk &raquo;</strong> has always been my <strong>gaming pseudo</strong>, &laquo; Aeruk &raquo; mirrored becomes <strong>&laquo; Kurea &raquo;</strong>, a reference to my origins, <strong>South Korea.</strong>
          </p>

          <a
            href="https://aerukart.com/wp-content/uploads/2026/04/Park-Doomin-CV-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-accent"
          >
            Download my CV
          </a>
        </div>
      </section>

      <CTA />
    </main>
  )
}
