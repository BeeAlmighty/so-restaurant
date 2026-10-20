'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Adds .is-visible to [data-reveal] elements as they scroll into view (re-scans on route change). */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
