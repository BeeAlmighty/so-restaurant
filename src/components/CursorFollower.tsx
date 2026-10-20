'use client'

import { useEffect, useRef } from 'react'

/** Lagging ring that follows the mouse and swells over links/buttons. Desktop + fine pointer only. */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const mq = window.matchMedia('(pointer: fine) and (min-width: 992px) and (prefers-reduced-motion: no-preference)')
    if (!el || !mq.matches) return

    let x = -100,
      y = -100,
      cx = x,
      cy = y,
      raf = 0
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      el.style.opacity = '1'
      const hot = (e.target as Element | null)?.closest('a, button, [data-cursor="grow"]')
      el.dataset.hot = hot ? '1' : ''
    }
    const tick = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    const hide = () => (el.style.opacity = '0')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', hide)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', hide)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0 transition-opacity duration-300">
      <div className="-ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-chili transition-[transform,background-color] duration-300 [[data-hot='1']_&]:scale-[1.8] [[data-hot='1']_&]:border-transparent [[data-hot='1']_&]:bg-sun/30" />
    </div>
  )
}
