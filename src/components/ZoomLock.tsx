'use client'
import { useEffect } from 'react'

export default function ZoomLock() {
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    function lockZoom() {
      if (!vv) return
      const scale = vv.scale
      const clamped = Math.min(Math.max(scale, 0.8), 1.1)
      document.documentElement.style.zoom = String(1 / clamped)
    }

    lockZoom()
    vv.addEventListener('resize', lockZoom)
    return () => {
      vv.removeEventListener('resize', lockZoom)
      document.documentElement.style.zoom = '1'
    }
  }, [])

  return null
}
