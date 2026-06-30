'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const MAX_DURATION = 1.5
    const MIN_DURATION = 0.9
    const VEL_THRESHOLD = 30
    const VEL_MAX = 150

    const lenis = new Lenis({
      duration: MAX_DURATION,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    let targetDuration = MAX_DURATION
    let currentDuration = MAX_DURATION

    lenis.on('scroll', (e: any) => {
      const raw = Math.abs(e.velocity)
      if (raw < VEL_THRESHOLD) {
        targetDuration = MAX_DURATION
      } else {
        const clamped = Math.min(raw, VEL_MAX)
        const t = (clamped - VEL_THRESHOLD) / (VEL_MAX - VEL_THRESHOLD)
        targetDuration = MAX_DURATION - t * (MAX_DURATION - MIN_DURATION)
      }
    })

    function raf(time: number) {
      currentDuration += (targetDuration - currentDuration) * 0.08
      lenis.options.duration = currentDuration
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ;(window as any).__lenis = lenis

    return () => {
      lenis.destroy()
      delete (window as any).__lenis
    }
  }, [])

  return <>{children}</>
}
