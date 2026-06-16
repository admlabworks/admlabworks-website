'use client'

import { useEffect, useState } from 'react'
import CTA from '@/components/CTA'

const serviceOptions = [
  { value: '', label: 'Choose your service *' },
  { value: 'wordpress-template', label: 'WordPress Site (3 Templates)' },
  { value: 'wordpress-custom', label: 'WordPress Site (Custom)' },
  { value: 'figma-uxui', label: 'Figma Mockup (UX/UI)' },
  { value: 'logo-design', label: 'Logo Creation' },
  { value: 'visual-creation', label: 'Visual Creation' },
  { value: 'graphic-charter', label: 'Complete Graphic Charter' },
  { value: 'motion-2d', label: 'Motion Design 2D' },
  { value: 'motion-3d', label: 'Motion Design 3D' },
]

export default function ContactPage() {
  useEffect(() => {
    async function initAnimations() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo('.breadcrumb', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.portfolio-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 })
      gsap.fromTo('.hero-anchor-link', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.5 })

      document.querySelectorAll('.contact-row').forEach((el, i) => {
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    service: '',
    message: '',
    privacy: false,
    terms: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    }
  }

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
            <span>Contact</span>
          </nav>

          <h2 className="portfolio-title">Contact</h2>

          <div className="contact-hero-buttons">
            <a href="tel:+8801977764295" className="hero-anchor-link">+880 1977 764 295</a>
            <a href="mailto:hello@admlabworks.com" className="hero-anchor-link">hello@admlabworks.com</a>
          </div>
        </div>

        <div className="portfolio-spacer" />
        <div className="portfolio-fade-bottom" />
      </section>

      <section className="contact-section">
        <div className="contact-section-inner">
          <div className="contact-row">
            <div className="contact-col-text">
              <h2 className="contact-heading">A need?</h2>
              <p className="contact-desc">
                If you have a project or needs in Web Design, Art Direction or Motion Design,
                don&apos;t hesitate to contact me!<br /><br />
                We will exchange by email first and later on WhatsApp to facilitate the exchange.
                I am available at any time.
              </p>
              <p className="contact-legal">
                <em>Processing of personal data</em><br /><br />
                <em>In accordance with the provisions of articles 38 and following of Law 78-17 of January 6, 1978 relating to data processing, files and freedoms, any user has a right of access, rectification, deletion and opposition to personal data concerning them.</em><br />
                <em>You may exercise this right by simple request by contacting us with proof of your identity.</em>
              </p>
            </div>
            <div className="contact-col-form">
              {submitted ? (
                <div className="contact-success">
                  <p>Thank you! Your message has been received. I&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-field-group">
                    <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="contact-field-group">
                    <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} required />
                  </div>
                  <div className="contact-field-group">
                    <input type="text" name="company" placeholder="Company / Project Name" value={formData.company} onChange={handleChange} />
                  </div>
                  <div className="contact-field-group">
                    <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="contact-field-group">
                    <select name="service" value={formData.service} onChange={handleChange} required>
                      {serviceOptions.map(opt => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ''}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="contact-field-group">
                    <textarea name="message" placeholder="Let your imagination speak! *" value={formData.message} onChange={handleChange} required rows={4} />
                  </div>

                  <div className="contact-checkbox">
                    <label>
                      <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} required />
                      <span className="contact-checkbox-label">I have read and accept the privacy policy *</span>
                    </label>
                  </div>
                  <div className="contact-checkbox">
                    <label>
                      <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required />
                      <span className="contact-checkbox-label">I have read and accept the terms and conditions *</span>
                    </label>
                  </div>

                  {error && <p className="contact-form-error">{error}</p>}

                  <button type="submit" className="contact-submit">Send</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
