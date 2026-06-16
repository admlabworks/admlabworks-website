'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import SocialSidebar from '@/components/SocialSidebar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href')
        if (!href) return
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          const top = target.getBoundingClientRect().top + window.pageYOffset - 100
          window.scrollTo({ top, behavior: 'smooth' })
        }
      })
    })
  }, [])

  return (
    <>
      <Cursor />
      <SocialSidebar />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
      <Footer />
    </>
  )
}
