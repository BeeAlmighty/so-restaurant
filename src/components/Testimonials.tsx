'use client'

import { useEffect, useState } from 'react'
import { CutleryIcon, QuoteIcon } from './Icons'
import { site } from '@/lib/site'

export function Testimonials() {
  const items = site.testimonials
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setI((n) => (n + 1) % items.length), 6000)
    return () => clearTimeout(t)
  }, [i, paused, items.length])

  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* ghost word behind the quote */}
      <p aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[22vw] leading-none text-transparent [-webkit-text-stroke:2px_rgb(246_185_9/0.22)]">
        Reviews
      </p>

      <div className="container-x relative text-center">
        <QuoteIcon className="mx-auto h-11 w-14 text-sun" />
        <h2 className="eyebrow-script mt-3 text-6xl md:text-7xl">Feedback</h2>

        <div className="relative mx-auto mt-8 grid max-w-3xl" aria-live="polite">
          {items.map((t, n) => (
            <figure
              key={n}
              aria-hidden={n !== i}
              className={`col-start-1 row-start-1 transition-all duration-700 ease-[var(--ease-power3)] ${n === i ? 'translate-x-0 opacity-100' : n < i ? '-translate-x-10 opacity-0' : 'translate-x-10 opacity-0'}`}
            >
              <blockquote className="font-display text-[clamp(26px,3vw,38px)] leading-[1.15] tracking-wide text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex flex-col items-center gap-1">
                <CutleryIcon className="h-9 w-9 text-ink" />
                <span className="text-sm font-semibold text-chili">{t.name}</span>
                {'placeholder' in t && t.placeholder && (
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] uppercase tracking-wider text-body">Sample text: replace before launch</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show review ${n + 1}`}
              aria-current={n === i}
              className={`h-2.5 rounded-full transition-all duration-500 ${n === i ? 'w-7 bg-sun' : 'w-2.5 bg-ink/80'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
