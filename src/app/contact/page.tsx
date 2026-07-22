'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CTA from '@/components/CTA'
import { usePreloaderDone } from '@/context/PreloaderContext'

const ArrowSVG = ({ className }: { className?: string }) => (
  <svg width="100%" viewBox="0 0 16 14" fill="none" className={className}>
    <path d="M7.7523 12.5078L2 6.75353L7.7523 0.99921M15.9699 6.75353L2.41088 6.75351" stroke="currentColor" strokeWidth="1.64351" />
  </svg>
)

const services = ['Logo Design', 'Brand Identity', 'Web Design', 'Motion Design', 'Video Editing', 'Graphic Design']
const budgets = ['$100 - $500', '$500 - $1,000', '$1,000 - $5,000', '$5,000+']

const serviceOptions: Record<string, string[]> = {
  'Logo Design': ['Icon Mark', 'Emblem', 'Mascot', 'Wordmark', 'Lettermark'],
  'Brand Identity': ['Visual Identity', 'Brand Guidelines', 'Brand Strategy', 'Full Rebrand'],
  'Web Design': ['Landing Page', 'Multi-page Website', 'E-commerce', 'Blog / CMS'],
  'Motion Design': ['2D Animation', '3D Animation', 'Explainer Video', 'Motion Graphics', 'Title Sequence'],
  'Video Editing': ['Short-form (Reels/TikTok)', 'Long-form (YouTube)', 'Documentary', 'Commercial / Ad', 'Event Highlights'],
  'Graphic Design': ['Print Design', 'Digital Design', 'Packaging', 'Social Media', 'Typography / Poster'],
}

const colorPalette = [
  '#000000', '#FFFFFF', '#FF0000', '#FF4D4D', '#FF6B35', '#FFA500',
  '#FFD700', '#FFEB3B', '#ADFF2F', '#00CC66', '#00A86B', '#00CED1',
  '#00BFFF', '#0077FF', '#0044FF', '#3D00FF', '#7B2FBE', '#CC00FF',
  '#FF00FF', '#FF69B4', '#8B4513', '#D2691E', '#C0C0C0', '#808080',
]

type Screen =
  | 'greeting'
  | 'contact_form'
  | 'quote_services'
  | 'quote_budget'
  | 'quote_details'
  | 'quote_duration'
  | 'quote_brand'
  | 'quote_colors'
  | 'quote_desc'
  | 'quote_contact'
  | 'success'

function getTimeOfDay() {
  const hour = parseInt(new Intl.DateTimeFormat([], { hour: 'numeric', hour12: false }).format(new Date()))
  if (hour < 6) return 'night'
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  if (hour < 21) return 'evening'
  return 'night'
}

function getGreeting() {
  try {
    return { city: 'your area', country: 'your region', timeOfDay: getTimeOfDay() }
  } catch {
    return { city: 'your area', country: 'your region', timeOfDay: 'day' }
  }
}

const fade = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.3 } }, exit: { opacity: 0, transition: { duration: 0.2 } } }

export default function ContactPage() {
  const { isPreloaderDone } = usePreloaderDone()
  const [screen, setScreen] = useState<Screen>('greeting')
  const [greeting, setGreeting] = useState({ city: '', country: '', timeOfDay: 'day' })
  const [servicesSelected, setServicesSelected] = useState<string[]>([])
  const [serviceDetails, setServiceDetails] = useState<Record<string, string>>({})
  const [budget, setBudget] = useState('')
  const [brandName, setBrandName] = useState('')
  const [colorsSelected, setColorsSelected] = useState<string[]>([])
  const [briefDesc, setBriefDesc] = useState('')
  const [videoDuration, setVideoDuration] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [serviceError, setServiceError] = useState('')

  useEffect(() => {
    setGreeting(getGreeting())
    async function fetchGeo() {
      try {
        let data: any = null
        try {
          const res = await fetch('https://ipapi.co/json/')
          data = await res.json()
        } catch {}
        if (!data?.city) {
          try {
            const res = await fetch('https://ip-api.com/json/')
            data = await res.json()
          } catch {}
        }
        if (data?.city) {
          setGreeting({
            city: data.city,
            country: data.country_name || data.country || 'your region',
            timeOfDay: getTimeOfDay(),
          })
        }
      } catch {}
    }
    fetchGeo()
  }, [])

  useEffect(() => {
    if (!isPreloaderDone) return
    async function initAnimations() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.breadcrumb', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.portfolio-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 })
      gsap.fromTo('.hero-anchor-link', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.5 })
      gsap.fromTo('.contact-large-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 })
      gsap.fromTo('.wizard-container', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 })
    }
    initAnimations()
  }, [isPreloaderDone])

  useEffect(() => {
    if (screen === 'success') return
    let cancelled = false
    let splitInstance: any = null

    async function animateStep() {
      const { default: gsap } = await import('gsap')
      const { SplitText } = await import('gsap/SplitText')
      gsap.registerPlugin(SplitText)

      const steps = document.querySelectorAll('.wizard-step')
      const step = steps[steps.length - 1]
      if (!step || cancelled) return

      if (screen === 'greeting') {
        const el = document.getElementById('wizard-greeting-text')
        if (el) {
          splitInstance = new SplitText(el, { type: 'words', wordsClass: 'wizard-greeting-word' })
          gsap.fromTo(splitInstance.words,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: 'power2.out', delay: 0.05 }
          )
        }
        const btns = step.querySelectorAll('.wizard-greeting-btn')
        gsap.fromTo(btns,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.35 }
        )
        return
      }

      const desc = step.querySelector('.wizard-step-desc')
      if (desc) {
        splitInstance = new SplitText(desc, { type: 'words', wordsClass: 'wizard-step-word' })
        gsap.fromTo(splitInstance.words,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.02, ease: 'power3.out', delay: 0.05 }
        )
      }

      const children = step.querySelectorAll('.wizard-options, .wizard-form, .wizard-colors, .wizard-service-details')
      gsap.fromTo(children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      )

      const nav = step.querySelector('.wizard-nav-row')
      if (nav) {
        gsap.fromTo(nav,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out', delay: 0.35 }
        )
      }
    }

    const timer = setTimeout(animateStep, 350)
    return () => {
      cancelled = true
      clearTimeout(timer)
      if (splitInstance) splitInstance.revert()
    }
  }, [screen])

  const resetWizard = useCallback(() => {
    setScreen('greeting')
    setServicesSelected([])
    setServiceDetails({})
    setBudget('')
    setBrandName('')
    setColorsSelected([])
    setBriefDesc('')
    setVideoDuration('')
    setForm({ name: '', email: '', phone: '', message: '' })
    setError('')
    setServiceError('')
  }, [])

  const goBack = useCallback(() => {
    const hasDuration = servicesSelected.some(s => s === 'Video Editing' || s === 'Motion Design')
    const hasColors = servicesSelected.some(s => s === 'Logo Design' || s === 'Web Design')
    const backMap: Record<Screen, Screen> = {
      greeting: 'greeting',
      contact_form: 'greeting',
      quote_services: 'greeting',
      quote_budget: 'quote_services',
      quote_details: 'quote_budget',
      quote_duration: 'quote_details',
      quote_brand: 'quote_details',
      quote_colors: 'quote_brand',
      quote_desc: hasDuration ? 'quote_duration' : hasColors ? 'quote_colors' : 'quote_brand',
      quote_contact: 'quote_desc',
      success: 'greeting',
    }
    if (backMap[screen] === 'greeting') resetWizard()
    else setScreen(backMap[screen])
  }, [screen, resetWizard, servicesSelected])

  const toggleService = (s: string) => {
    setServicesSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
    setServiceError('')
  }

  const toggleColor = (c: string) => {
    setColorsSelected(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  const setServiceDetail = (service: string, value: string) => {
    setServiceDetails(prev => ({ ...prev, [service]: value }))
  }

  const handleSubmit = async (category: string) => {
    setSubmitting(true)
    setError('')
    try {
      const body = {
        firstName: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        service: servicesSelected.join(', '),
        serviceDetails: Object.entries(serviceDetails).map(([k, v]) => `${k}: ${v}`).join(', '),
        budget,
        brandName,
        colors: colorsSelected.join(', '),
        brief: briefDesc,
        videoDuration,
        category,
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong.')
        return
      }
      setScreen('success')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <section className="portfolio-hero">
        <div className="portfolio-bg-video portfolio-bg-bl">
          <video autoPlay muted loop playsInline>
            <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
            <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="portfolio-bg-video portfolio-bg-tr">
          <video autoPlay muted loop playsInline>
            <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.webm" type="video/webm" />
            <source src="https://res.cloudinary.com/dqeflf8z7/video/upload/v1781316546/logo-anim_e3qdtl.mp4" type="video/mp4" />
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
        <p className="contact-large-text">
          Have an inquiry, suggestion, a collaboration offer <br />or even trouble sleeping?<span className="contact-highlight"> Get in touch</span> with me now.
        </p>

        <div className="wizard-container">
          <AnimatePresence mode="wait">

            {screen === 'greeting' && (
              <motion.div
                key="greeting"
                className="wizard-step"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <p className="wizard-greeting" id="wizard-greeting-text">
                  Hey there! How can I assist you on this {greeting.timeOfDay} in{' '}
                  <span className="wizard-greeting-highlight">{greeting.city}</span>,{' '}
                  <span className="wizard-greeting-highlight">{greeting.country}</span>?
                </p>
                <div className="wizard-options wizard-options-vertical">
                  <button className="wizard-greeting-btn" onClick={() => setScreen('quote_services')}>Get a Quote</button>
                  <button className="wizard-greeting-btn" onClick={() => setScreen('contact_form')}>Contact Me</button>
                </div>
              </motion.div>
            )}

            {screen === 'contact_form' && (
              <motion.div key="contact-form" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Contact Me</h3>
                <p className="wizard-step-desc">Hey there! Give me more details, please!</p>
                <div className="wizard-form">
                  <div className="wizard-field">
                    <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="wizard-field">
                    <input type="email" placeholder="Email *" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="wizard-field">
                    <textarea placeholder="Your message *" rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                  </div>
                  {error && <p className="wizard-error">{error}</p>}
                  <div className="wizard-nav-row">
                    <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                      <span className="wizard-capsule-circle">
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                      </span>
                      <span className="wizard-capsule-text">Go back</span>
                    </button>
                    <button
                      className="wizard-capsule-btn wizard-capsule-continue"
                      disabled={submitting || !form.name.trim() || !form.email.trim() || !form.message.trim()}
                      onClick={() => handleSubmit('Contact Me')}
                    >
                      <span className="wizard-capsule-text">{submitting ? 'Sending...' : 'Submit'}</span>
                      <span className="wizard-capsule-circle">
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'quote_services' && (
              <motion.div key="quote-services" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Get a Quote</h3>
                <p className="wizard-step-desc">Ready to team up? My passion for creative excellence sets me apart. How can I help you?</p>
                <div className="wizard-options wizard-options-grid">
                  {services.map(s => (
                    <button key={s} className={`wizard-pill ${servicesSelected.includes(s) ? 'wizard-pill-active' : ''}`} onClick={() => toggleService(s)}>{s}</button>
                  ))}
                </div>
                {serviceError && <p className="wizard-error">{serviceError}</p>}
                <div className="wizard-nav-row">
                  <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                    <span className="wizard-capsule-text">Go back</span>
                  </button>
                  <button className="wizard-capsule-btn wizard-capsule-continue" disabled={servicesSelected.length === 0} onClick={() => {
                    if (servicesSelected.length === 0) { setServiceError('Please select at least one service.'); return }
                    setScreen('quote_budget')
                  }}>
                    <span className="wizard-capsule-text">Continue</span>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {screen === 'quote_budget' && (
              <motion.div key="quote-budget" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Get a Quote</h3>
                <p className="wizard-step-desc">Things in life may not always be free, right? What&apos;s your budget for this project?</p>
                <div className="wizard-options wizard-options-grid">
                  {budgets.map(b => (
                    <button key={b} className={`wizard-pill ${budget === b ? 'wizard-pill-active' : ''}`} onClick={() => setBudget(b)}>{b}</button>
                  ))}
                </div>
                <div className="wizard-nav-row">
                  <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                    <span className="wizard-capsule-text">Go back</span>
                  </button>
                  <button className="wizard-capsule-btn wizard-capsule-continue" disabled={!budget} onClick={() => setScreen('quote_details')}>
                    <span className="wizard-capsule-text">Continue</span>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {screen === 'quote_details' && (
              <motion.div key="quote-details" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Get a Quote</h3>
                <p className="wizard-step-desc">Let&apos;s dive deeper! Tell me more about what you need.</p>
                <div className="wizard-service-details">
                  {servicesSelected.filter(s => serviceOptions[s]).map(s => (
                    <div key={s} className="wizard-service-detail-group">
                      <p className="wizard-service-detail-label">{s}</p>
                      <div className="wizard-options wizard-options-pills">
                        {serviceOptions[s].map(opt => (
                          <button
                            key={opt}
                            className={`wizard-pill wizard-pill-sm ${serviceDetails[s] === opt ? 'wizard-pill-active' : ''}`}
                            onClick={() => setServiceDetail(s, opt)}
                          >{opt}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="wizard-nav-row">
                  <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                    <span className="wizard-capsule-text">Go back</span>
                  </button>
                  <button className="wizard-capsule-btn wizard-capsule-continue" onClick={() => {
                    const needsDuration = servicesSelected.some(s => s === 'Video Editing' || s === 'Motion Design')
                    const needsBrand = servicesSelected.some(s => s !== 'Video Editing' && s !== 'Motion Design')
                    if (needsDuration) setScreen('quote_duration')
                    else if (needsBrand) setScreen('quote_brand')
                    else setScreen('quote_desc')
                  }}>
                    <span className="wizard-capsule-text">Continue</span>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {screen === 'quote_duration' && (
              <motion.div key="quote-duration" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Get a Quote</h3>
                <p className="wizard-step-desc">Time is art! What&apos;s the expected duration or length?</p>
                <div className="wizard-options wizard-options-grid">
                  {['Under 30 seconds', '30s – 1 minute', '1 – 3 minutes', '3 – 5 minutes', '5 – 10 minutes', '10+ minutes'].map(d => (
                    <button key={d} className={`wizard-pill ${videoDuration === d ? 'wizard-pill-active' : ''}`} onClick={() => setVideoDuration(d)}>{d}</button>
                  ))}
                </div>
                <div className="wizard-nav-row">
                  <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                    <span className="wizard-capsule-text">Go back</span>
                  </button>
                  <button className="wizard-capsule-btn wizard-capsule-continue" disabled={!videoDuration} onClick={() => setScreen('quote_desc')}>
                    <span className="wizard-capsule-text">Continue</span>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {screen === 'quote_brand' && (
              <motion.div key="quote-brand" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Get a Quote</h3>
                <p className="wizard-step-desc">Every great project starts with a name. What&apos;s your brand name?</p>
                <div className="wizard-form">
                  <div className="wizard-field">
                    <input type="text" placeholder="Brand Name" value={brandName} onChange={e => setBrandName(e.target.value)} />
                  </div>
                  <div className="wizard-nav-row">
                    <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                      <span className="wizard-capsule-circle">
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                      </span>
                      <span className="wizard-capsule-text">Go back</span>
                    </button>
                    <button className="wizard-capsule-btn wizard-capsule-continue" onClick={() => {
                      const needsColors = servicesSelected.some(s => s === 'Logo Design' || s === 'Web Design')
                      setScreen(needsColors ? 'quote_colors' : 'quote_desc')
                    }}>
                      <span className="wizard-capsule-text">Continue</span>
                      <span className="wizard-capsule-circle">
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'quote_colors' && (
              <motion.div key="quote-colors" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Get a Quote</h3>
                <p className="wizard-step-desc">Colors speak volumes! Select your brand colors.</p>
                <div className="wizard-colors">
                  {colorPalette.map(c => (
                    <button
                      key={c}
                      className={`wizard-swatch ${colorsSelected.includes(c) ? 'wizard-swatch-active' : ''}`}
                      style={{ backgroundColor: c, border: c === '#FFFFFF' ? '2px solid rgba(255,255,255,0.2)' : undefined }}
                      onClick={() => toggleColor(c)}
                    >
                      {colorsSelected.includes(c) && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c === '#000000' || c === '#808080' ? '#fff' : '#000'} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                    </button>
                  ))}
                </div>
                <div className="wizard-nav-row">
                  <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                    <span className="wizard-capsule-text">Go back</span>
                  </button>
                  <button className="wizard-capsule-btn wizard-capsule-continue" onClick={() => setScreen('quote_desc')}>
                    <span className="wizard-capsule-text">Continue</span>
                    <span className="wizard-capsule-circle">
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                      <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {screen === 'quote_desc' && (
              <motion.div key="quote-desc" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Get a Quote</h3>
                <p className="wizard-step-desc">Let&apos;s spice it up! Describe your project, goals, and any references.</p>
                <div className="wizard-form">
                  <div className="wizard-field">
                    <textarea placeholder="Tell me about your project..." rows={7} value={briefDesc} onChange={e => setBriefDesc(e.target.value)} />
                  </div>
                  <div className="wizard-nav-row">
                    <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                      <span className="wizard-capsule-circle">
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                      </span>
                      <span className="wizard-capsule-text">Go back</span>
                    </button>
                    <button className="wizard-capsule-btn wizard-capsule-continue" onClick={() => setScreen('quote_contact')}>
                      <span className="wizard-capsule-text">Continue</span>
                      <span className="wizard-capsule-circle">
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'quote_contact' && (
              <motion.div key="quote-contact" className="wizard-step" {...fade}>
                <h3 className="wizard-step-title">Get a Quote</h3>
                <p className="wizard-step-desc">Almost there! Fill in your details and let&apos;s get started.</p>
                <div className="wizard-form">
                  <div className="wizard-field">
                    <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="wizard-field">
                    <input type="email" placeholder="Email *" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="wizard-field">
                    <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  {error && <p className="wizard-error">{error}</p>}
                  <div className="wizard-nav-row">
                    <button className="wizard-capsule-btn wizard-capsule-back" onClick={goBack}>
                      <span className="wizard-capsule-circle">
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                      </span>
                      <span className="wizard-capsule-text">Go back</span>
                    </button>
                    <button
                      className="wizard-capsule-btn wizard-capsule-continue"
                      disabled={submitting || !form.name.trim() || !form.email.trim()}
                      onClick={() => handleSubmit('Quote')}
                    >
                      <span className="wizard-capsule-text">{submitting ? 'Sending...' : 'Submit'}</span>
                      <span className="wizard-capsule-circle">
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                        <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'success' && (
              <motion.div key="success" className="wizard-step wizard-success" {...fade}>
                <h3 className="wizard-step-title">Thank you!</h3>
                <p className="wizard-step-desc">Success! Your submission is in. Now relax, and I&apos;ll get back to you soon.</p>
                <button className="wizard-capsule-btn wizard-capsule-back" onClick={resetWizard}>
                  <span className="wizard-capsule-circle">
                    <span className="wizard-capsule-arrow wizard-capsule-arrow-normal"><ArrowSVG /></span>
                    <span className="wizard-capsule-arrow wizard-capsule-arrow-hover"><ArrowSVG /></span>
                  </span>
                  <span className="wizard-capsule-text">Go back</span>
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      <CTA />
    </main>
  )
}
