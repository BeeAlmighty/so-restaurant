import type { Metadata } from 'next'
import { lounge } from '@/lib/menu'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Lounge menu',
  description: `Cocktails, mocktails and shots at the ${site.name} lounge.`,
  alternates: { canonical: '/lounge' },
}

function Badge() {
  return (
    <div className="relative mx-auto grid h-56 w-56 place-items-center rounded-full bg-[conic-gradient(from_200deg,#b8860b,#f7e08a,#c8961e,#fff3b0,#a8740a,#f1cf62,#b8860b)] p-3 shadow-[0_25px_50px_-20px_rgb(0_0_0/0.5)] md:h-64 md:w-64">
      <div className="grid h-full w-full place-items-center rounded-full bg-black text-center">
        <div>
          <p className="font-display text-7xl leading-[0.8] text-[#e2b33c] md:text-8xl">SO</p>
          <p className="font-display text-3xl tracking-[0.3em] text-[#e2b33c]">Lounge</p>
          <p className="font-script text-3xl leading-none text-white">after dark</p>
        </div>
      </div>
    </div>
  )
}

export default function LoungePage() {
  return (
    <div className="container-x pb-24 pt-[110px] lg:pt-[150px]">
      <div data-reveal="zoom">
        <Badge />
      </div>
      <h1 className="sr-only">SO Lounge drinks menu</h1>
      <div className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2">
        {lounge.map((section, s) => (
          <section key={section.title} data-reveal="up" style={{ '--delay': `${s * 120}ms` } as React.CSSProperties} className={s === 0 ? 'md:row-span-2' : ''}>
            <h2 className="text-[clamp(48px,5vw,64px)] leading-none !text-sun">{section.title}</h2>
            <ul className="mt-4 space-y-4">
              {section.items.map(([name, price]) => (
                <li key={name} className="flex items-baseline gap-3 text-lg font-semibold text-sun-deep">
                  <span>{name}</span>
                  <span aria-hidden className="flex-1 translate-y-[-4px] border-b-2 border-dotted border-chili/60" />
                  <span>{price.toLocaleString('en-NG')}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-14 text-center text-sm">Prices in naira. Please drink responsibly. 18+ only.</p>
    </div>
  )
}
