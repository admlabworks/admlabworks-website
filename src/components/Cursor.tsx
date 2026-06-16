'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    let currX = 0
    let currY = 0

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const tag = target.tagName.toLowerCase()
      const isClickable = tag === 'a' || tag === 'button' || target.getAttribute('role') === 'button'
        || tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'label'
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

    const onDown = () => cursor.classList.add('click')
    const onUp = () => cursor.classList.remove('click')

    const animate = () => {
      currX = lerp(currX, mouseRef.current.x, 0.35)
      currY = lerp(currY, mouseRef.current.y, 0.35)
      cursor.style.left = `${currX}px`
      cursor.style.top = `${currY}px`
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <div className="cur" ref={cursorRef} />
}
