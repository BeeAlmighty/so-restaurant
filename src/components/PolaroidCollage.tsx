'use client'

import Image from 'next/image'
import { useRef } from 'react'

type Shot = { src: string; alt: string }

/**
 * Main photo + two rotated "polaroids". Entrance = staggered fade-in-left (0/200/400ms);
 * polaroids track the mouse in opposite directions, main photo tilts in 3D.
 */
export function PolaroidCollage({ main, a, b }: { main: Shot; a: Shot; b: Shot }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    ref.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--px', '0')
    ref.current?.style.setProperty('--py', '0')
  }

  const track = (k: number): React.CSSProperties => ({
    transform: `translate3d(calc(var(--px,0) * ${k}px), calc(var(--py,0) * ${k}px), 0)`,
    transition: 'transform 600ms var(--ease-out3)',
  })

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="relative mx-auto aspect-[1/1.05] w-full max-w-[560px] [perspective:1000px]">
      <div data-reveal="left" className="absolute left-0 top-[4%] h-[82%] w-[78%]">
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            transform: 'rotateY(calc(var(--px,0) * 10deg)) rotateX(calc(var(--py,0) * -10deg))',
            transition: 'transform 600ms var(--ease-out3)',
          }}
        >
          <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 440px, 78vw" className="object-cover" />
        </div>
      </div>

      <div data-reveal="left" className="absolute right-0 top-0 w-[48%]" style={{ '--delay': '200ms', '--rot': '12deg' } as React.CSSProperties}>
        <div style={track(-36)}>
          <div className="bg-white p-2.5 shadow-[0_20px_40px_-14px_rgb(0_0_0/0.45)] md:p-3.5">
            <div className="relative aspect-[4/3]">
              <Image src={a.src} alt={a.alt} fill sizes="(min-width: 1024px) 270px, 48vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div data-reveal="left" className="absolute bottom-0 right-[2%] w-[46%]" style={{ '--delay': '400ms', '--rot': '-12deg' } as React.CSSProperties}>
        <div style={track(36)}>
          <div className="bg-white p-2.5 shadow-[0_20px_40px_-14px_rgb(0_0_0/0.45)] md:p-3.5">
            <div className="relative aspect-[4/3]">
              <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 260px, 46vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
