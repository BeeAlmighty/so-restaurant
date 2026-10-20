'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronIcon, FacebookIcon, InstagramIcon } from './Icons'
import { site } from '@/lib/site'

const SLIDES = 2
const AUTOPLAY_MS = 7000

type LayerProps = { children: React.ReactNode; fx?: string; fy?: string; delay?: number; dur?: number; depth?: number; className?: string; style?: React.CSSProperties }

/** One animated layer: outer div = mouse parallax, inner div = entrance tween (power3.inOut, like the reference slider). */
function Layer({ children, fx = '0px', fy = '0px', delay = 0, dur = 1000, depth, className = '', style }: LayerProps) {
  const tween = (
    <div className="hero-layer" style={{ '--fx': fx, '--fy': fy, '--delay': `${delay}ms`, '--dur': `${dur}ms` } as React.CSSProperties}>
      {children}
    </div>
  )
  return (
    <div className={className} style={style}>
      {depth ? (
        <div className="parallax" style={{ '--depth': `${depth}px` } as React.CSSProperties}>
          {tween}
        </div>
      ) : (
        tween
      )}
    </div>
  )
}

/** Paint-splash droplets around the plate (stand-in for the reference's sauce-splash PNG). */
const drops = [
  { l: '6%', t: '62%', w: 34, h: 14, r: -30, c: 'bg-sun-deep' },
  { l: '2%', t: '48%', w: 12, h: 12, r: 0, c: 'bg-sun-deep' },
  { l: '14%', t: '80%', w: 22, h: 9, r: 40, c: 'bg-chili' },
  { l: '86%', t: '14%', w: 14, h: 14, r: 0, c: 'bg-chili' },
  { l: '92%', t: '30%', w: 28, h: 11, r: 60, c: 'bg-sun-deep' },
  { l: '80%', t: '88%', w: 18, h: 18, r: 0, c: 'bg-sun-deep' },
  { l: '24%', t: '6%', w: 10, h: 10, r: 0, c: 'bg-chili' },
  { l: '96%', t: '62%', w: 9, h: 9, r: 0, c: 'bg-chili' },
]

export function Hero() {
  const [index, setIndex] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const root = useRef<HTMLElement>(null)

  const go = useCallback(
    (next: number) => {
      const n = (next + SLIDES) % SLIDES
      if (n === index) return
      setPrev(index)
      setIndex(n)
    },
    [index],
  )

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, paused, go])

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !root.current) return
    const r = root.current.getBoundingClientRect()
    // reference uses a "negative" direction: layers drift against the cursor
    root.current.style.setProperty('--mx', String(-((e.clientX - r.left) / r.width - 0.5) * 2))
    root.current.style.setProperty('--my', String(-((e.clientY - r.top) / r.height - 0.5) * 2))
  }

  const state = (i: number) => (i === index ? 'active' : i === prev ? 'leaving' : 'idle')

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Featured"
      onPointerMove={onPointerMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1)
        if (e.key === 'ArrowLeft') go(index - 1)
      }}
      className="relative h-[100svh] min-h-[680px] max-h-[1000px] overflow-hidden bg-white"
    >
      {/* ---------------- Slide 1: the white "SO GOOD" slide ---------------- */}
      <div className="hero-slide absolute inset-0" data-state={state(0)} aria-hidden={index !== 0} role="group" aria-roledescription="slide" aria-label="1 of 2">
        {/* giant rings (thick borders, not images) */}
        <Layer
          fx="-50px"
          depth={14}
          className="absolute"
          style={{ width: 'clamp(300px, 44vw, 630px)', left: 'clamp(-285px, -19.8vw, -150px)', top: 'clamp(-282px, -19.6vw, -150px)' }}
        >
          <div className="ring-shape !relative aspect-square w-full" style={{ '--ring-w': 'clamp(64px, 10.4vw, 150px)' } as React.CSSProperties} />
        </Layer>
        <Layer
          fx="50px"
          depth={8}
          className="absolute hidden md:block"
          style={{ width: 'clamp(600px, 69vw, 1000px)', right: 'clamp(-348px, -24vw, -200px)', top: 'clamp(-265px, -18vw, -160px)' }}
        >
          <div className="ring-shape !relative aspect-square w-full" />
        </Layer>

        {/* scattered dots */}
        {[
          ['58%', '35%', 20],
          ['13%', '74%', 20],
          ['93%', '12%', 15],
          ['95%', '50%', 15],
        ].map(([l, t, s], i) => (
          <span key={i} className="animate-bob absolute hidden rounded-full bg-sun-deep md:block" style={{ left: l, top: t, width: s, height: s, animationDelay: `${i * 0.7}s` }} />
        ))}

        <div className="container-x relative grid h-full grid-cols-1 items-center pt-[72px] md:grid-cols-[1.05fr_1fr] lg:pt-[110px]">
          {/* text group */}
          <div className="relative z-10 text-center md:-mt-6">
            <Layer dur={700} delay={150}>
              <p className="font-display text-[clamp(34px,4.2vw,60px)] leading-none tracking-wide text-ink">A taste of</p>
            </Layer>
            <Layer dur={800} delay={300} fy="20px">
              <h1 className="offset-shadow font-display text-[clamp(84px,10.5vw,150px)] leading-[0.82] tracking-[-0.01em] text-ink">SO good.</h1>
            </Layer>
            <Layer dur={700} delay={420}>
              <p className="mx-auto mt-5 max-w-md text-[15px] font-medium leading-6 text-ink/80">
                Smoky jollof, flame grills and proper soups, cooked fresh and on its way to you in minutes.
              </p>
            </Layer>
            <Layer fy="50px" delay={460}>
              <Link href="/menu" className="btn-chili mt-8 !px-12 !py-4 text-lg uppercase tracking-wide" data-cursor="grow">
                Order now
              </Link>
            </Layer>
          </div>

          {/* plate */}
          <div className="relative mx-auto mt-6 w-[min(78vw,340px)] md:mt-0 md:w-[min(42vw,600px)]">
            <Layer fx="50px" depth={22}>
              <div className="relative aspect-square">
                {drops.map((d, i) => (
                  <span
                    key={i}
                    className={`absolute rounded-full ${d.c}`}
                    style={{ left: d.l, top: d.t, width: d.w, height: d.h, transform: `rotate(${d.r}deg)` }}
                  />
                ))}
                <div className="absolute inset-[7%] rounded-full bg-white p-[3.5%] shadow-[0_40px_70px_-25px_rgb(0_0_0/0.45)]">
                  <div className="animate-spin-slow relative h-full w-full overflow-hidden rounded-full">
                    <Image src="/img/rice-meat.jpg" alt="SO native rice platter with assorted meat" fill priority sizes="(min-width: 768px) 42vw, 78vw" className="scale-[1.35] object-cover" />
                  </div>
                </div>
              </div>
            </Layer>
            <Layer fy="-50px" delay={700} depth={34} className="absolute -left-2 top-[6%] md:left-[-8%]">
              <div className="animate-wobble grid h-24 w-24 rotate-[-12deg] place-items-center rounded-full bg-chili text-center font-display text-white shadow-lg md:h-28 md:w-28">
                <span className="leading-none">
                  <span className="block text-sm tracking-widest">Open till</span>
                  <span className="block text-3xl md:text-4xl">11PM</span>
                </span>
              </div>
            </Layer>
          </div>
        </div>
      </div>

      {/* ---------------- Slide 2: yellow split "BURGER" slide ---------------- */}
      <div className="hero-slide absolute inset-0" data-state={state(1)} aria-hidden={index !== 1} role="group" aria-roledescription="slide" aria-label="2 of 2">
        <div className="absolute inset-y-0 left-0 w-full bg-sun md:w-1/2">
          <div className="ring-shape !border-white/10" style={{ width: 520, height: 520, left: -200, top: -220, '--ring-w': '90px' } as React.CSSProperties} />
          <Layer fx="-40px" delay={300} className="absolute bottom-[10%] left-[4%] hidden md:block">
            <div className="dot-grid h-36 w-20" />
          </Layer>
          <Layer fy="-40px" delay={500} className="absolute right-[4%] top-[18%]">
            <div className="dot-grid h-20 w-24" />
          </Layer>
        </div>

        <div className="container-x relative grid h-full grid-cols-1 items-center pt-[72px] md:grid-cols-2 lg:pt-[110px]">
          <div className="relative z-10 text-center">
            <Layer fy="-30px" delay={150}>
              <p className="font-script text-[clamp(64px,7vw,110px)] leading-[0.6] text-white">Tasty</p>
            </Layer>
            <Layer delay={300} fx="-50px">
              <h2 className="offset-shadow-red font-display text-[clamp(84px,10vw,150px)] leading-[0.85] text-white">Burger</h2>
            </Layer>
            <Layer delay={420} fx="50px">
              <p className="font-display text-[clamp(36px,4vw,60px)] leading-none tracking-wide text-white">SO special</p>
            </Layer>
            <Layer fy="50px" delay={560}>
              <Link href="/menu?c=burgers" className="btn-chili mt-7 !px-10 uppercase" data-cursor="grow">
                View menu
              </Link>
            </Layer>
            <Layer delay={700} className="mt-6 hidden justify-center gap-3 md:flex">
              <div className="flex justify-center gap-3">
                <a href={site.facebook} aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white text-chili transition hover:bg-ink hover:text-sun">
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a href={site.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white text-chili transition hover:bg-ink hover:text-sun">
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>
            </Layer>
          </div>

          <div className="relative mx-auto w-[min(70vw,300px)] md:w-[min(40vw,560px)]">
            <Layer fx="60px" depth={20}>
              <div className="relative aspect-square overflow-hidden rounded-[46%_54%_42%_58%/52%_44%_56%_48%] border-[10px] border-white shadow-[0_40px_70px_-25px_rgb(0_0_0/0.45)]">
                <Image src="/img/burger-classic.jpg" alt="The SO Burger" fill sizes="(min-width: 768px) 40vw, 70vw" className="object-cover" />
              </div>
            </Layer>
            <Layer fy="-50px" delay={650} depth={30} className="absolute -right-2 top-[2%]">
              <div className="animate-wobble grid h-24 w-24 place-items-center rounded-full bg-chili text-center font-display text-white shadow-lg md:h-28 md:w-28">
                <span className="leading-none">
                  <span className="block text-sm tracking-widest">Best offer</span>
                  <span className="block text-3xl">₦8,500</span>
                </span>
              </div>
            </Layer>
          </div>
        </div>
      </div>

      {/* arrows */}
      <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="group absolute left-1 top-1/2 z-20 hidden -translate-y-1/2 p-3 text-ink sm:block lg:left-6">
        <ChevronIcon className="h-14 w-5 rotate-180 transition-transform group-hover:-translate-x-1" />
      </button>
      <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="group absolute right-1 top-1/2 z-20 hidden -translate-y-1/2 p-3 text-ink sm:block lg:right-6">
        <ChevronIcon className="h-14 w-5 transition-transform group-hover:translate-x-1" />
      </button>

      {/* pager */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {Array.from({ length: SLIDES }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-chili' : 'w-2.5 bg-ink/25 hover:bg-ink/50'}`}
          />
        ))}
      </div>
    </section>
  )
}
