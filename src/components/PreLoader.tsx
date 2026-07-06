'use client'

import { useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { usePreloaderDone } from '@/context/PreloaderContext'

export default function PreLoader() {
  const pathname = usePathname()
  const { markPreloaderDone } = usePreloaderDone()
  const loaderRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const logoWhiteRef = useRef<HTMLImageElement>(null)
  const doneRef = useRef(false)

  useLayoutEffect(() => {
    if (pathname !== '/') {
      markPreloaderDone()
      return
    }
    if (doneRef.current) {
      if (loaderRef.current) loaderRef.current.style.display = 'none'
      return
    }
    doneRef.current = true

    let tl: any = null
    let fallback: ReturnType<typeof setTimeout>

    async function animate() {
      const gsap = (await import('gsap')).default

      tl = gsap.timeline({
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = 'none'
          markPreloaderDone()
        }
      })

      tl
        .to({}, { duration: 0.6 })
        .fromTo(outerRef.current,
          { xPercent: -50, yPercent: -50, scale: 0, filter: 'blur(15px)' },
          { xPercent: -50, yPercent: -50, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.inOut' }
        )
        .fromTo(innerRef.current,
          { xPercent: -50, yPercent: -50, scale: 0, filter: 'blur(15px)' },
          { xPercent: -50, yPercent: -50, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power2.inOut' },
          '-=0.5'
        )
        .to({}, { duration: 0.1 })
        .to(loaderRef.current,
          { opacity: 0, duration: 0.3, ease: 'power2.inOut' }
        )
    }

    animate()

    fallback = setTimeout(() => {
      if (loaderRef.current) loaderRef.current.style.display = 'none'
      markPreloaderDone()
    }, 6000)

    return () => {
      if (tl) tl.kill()
      clearTimeout(fallback)
    }
  }, [pathname])

  return (
    <div ref={loaderRef} className={`preloader${pathname !== '/' ? ' hidden' : ''}`}>
      <div ref={outerRef} className="preloader-circle preloader-outer" />
      <div ref={innerRef} className="preloader-circle preloader-inner" />
      <div ref={logoWrapRef} className="preloader-logo-wrap">
        <img
          ref={logoWhiteRef}
          className="preloader-logo"
          src="/logo.png"
          alt=""
        />
      </div>
    </div>
  )
}
