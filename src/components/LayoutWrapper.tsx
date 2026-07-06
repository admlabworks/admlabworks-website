'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import PreLoader from '@/components/PreLoader'
import Cursor from '@/components/Cursor'
import SocialSidebar from '@/components/SocialSidebar'
import SmoothScroll from '@/components/SmoothScroll'
import ZoomLock from '@/components/ZoomLock'
import { usePreloaderDone } from '@/context/PreloaderContext'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isPreloaderDone } = usePreloaderDone()

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href')
        if (!href) return
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          const lenis = (window as any).__lenis
          if (lenis) {
            lenis.scrollTo(target, { offset: -100 })
          } else {
            const top = target.getBoundingClientRect().top + window.pageYOffset - 100
            window.scrollTo({ top, behavior: 'smooth' })
          }
        }
      })
    })
  }, [])

  // Header entrance animation (all pages)
  useEffect(() => {
    if (!isPreloaderDone) return
    async function initHeaderAnim() {
      const gsap = (await import('gsap')).default
      gsap.fromTo('.header',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 3, delay: 0.2, ease: 'power3.out' }
      )
    }
    initHeaderAnim()
  }, [isPreloaderDone])

  // Button proximity effect (all pages)
  useEffect(() => {
    let btnMoveHandler: ((e: MouseEvent) => void) | null = null

    async function initBtnProximity() {
      const gsap = (await import('gsap')).default

      btnMoveHandler = (e: MouseEvent) => {
        const buttons = document.querySelectorAll<HTMLElement>('.btn-modern')
        for (let i = 0; i < buttons.length; i++) {
          const btn = buttons[i]
          const bg = btn.querySelector<HTMLElement>('.btn-modern_bg')
          if (!bg) continue
          const rect = btn.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = e.clientX - cx
          const dy = e.clientY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          let progress = 1 - dist / 120
          if (progress < 0) progress = 0
          if (progress > 1) progress = 1
          gsap.to(bg, {
            width: `${10 + 88 * progress}%`,
            height: `${10 + 80 * progress}%`,
            opacity: 0.2 + 0.62 * progress,
            filter: `blur(${10 + 4 * progress}px)`,
            duration: 0.15,
            ease: 'power1.out',
            overwrite: 'auto',
          })
        }
      }
      document.addEventListener('mousemove', btnMoveHandler)
    }

    initBtnProximity()

    return () => {
      if (btnMoveHandler) document.removeEventListener('mousemove', btnMoveHandler)
    }
  }, [])

  return (
    <>
      <PreLoader />
      <Cursor />
      <ZoomLock />
      <SocialSidebar />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <SmoothScroll>
        {children}
      </SmoothScroll>
      <Footer />
    </>
  )
}
