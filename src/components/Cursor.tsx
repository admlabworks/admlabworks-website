'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const ready = useRef(false)
  const settled = useRef(false)
  const settleFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 550, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 550, damping: 30 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!ready.current) {
        ready.current = true
        settled.current = false
        settleFallbackRef.current = setTimeout(() => {
          cursor.classList.remove('hidden')
          settled.current = true
          settleFallbackRef.current = null
        }, 800)
      }
      if (settled.current) {
        cursor.classList.remove('hidden')
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const tag = target.tagName.toLowerCase()
      const isClickable = tag === 'a' || tag === 'button' || target.getAttribute('role') === 'button'
        || tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'label'
        || target.closest('a, button, input, textarea, select, label, [role="button"]')
      const isText = (tag === 'p' || tag === 'span' || tag === 'h1' || tag === 'h2' || tag === 'h3'
        || tag === 'h4' || tag === 'h5' || tag === 'h6' || tag === 'li') && !isClickable

      if (isClickable) {
        cursor.classList.add('hover')
        cursor.classList.remove('text')
      } else if (isText) {
        cursor.classList.add('text')
        cursor.classList.remove('hover')
      } else {
        cursor.classList.remove('hover', 'text')
      }
    }

    let clickTimer: ReturnType<typeof setTimeout> | null = null

    const onDown = () => {
      if (clickTimer) clearTimeout(clickTimer)
      cursor.classList.add('click')
    }

    const onUp = () => {
      clickTimer = setTimeout(() => {
        cursor.classList.remove('click')
      }, 150)
    }

    const animate = () => {
      const sx = springX.get()
      const sy = springY.get()
      cursor.style.left = `${sx}px`
      cursor.style.top = `${sy}px`

      if (ready.current && !settled.current) {
        const dx = Math.abs(sx - cursorX.get())
        const dy = Math.abs(sy - cursorY.get())
        if (dx < 1 && dy < 1) {
          settled.current = true
          cursor.classList.remove('hidden')
          if (settleFallbackRef.current) {
            clearTimeout(settleFallbackRef.current)
            settleFallbackRef.current = null
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    const onEnter = () => {
      if (!ready.current) return
      cursor.classList.remove('hidden')
    }
    const onLeave = () => {
      if (settled.current) cursor.classList.add('hidden')
    }
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.documentElement.addEventListener('mouseleave', onLeave)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (settleFallbackRef.current) {
        clearTimeout(settleFallbackRef.current)
        settleFallbackRef.current = null
      }
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <div className="cur hidden" ref={cursorRef} />
}
