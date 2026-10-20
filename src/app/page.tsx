import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { PolaroidCollage } from '@/components/PolaroidCollage'
import { TornEdge } from '@/components/TornEdge'
import { Testimonials } from '@/components/Testimonials'
import { Locations } from '@/components/Footer'
import { naira } from '@/lib/format'
import { menu } from '@/lib/menu'
import { site } from '@/lib/site'

export default function Home() {
  const popular = menu.filter((m) => m.popular).slice(0, 4)

  return (
    <>
      <Hero />

      {/* ---------- Fresh / from our kitchen ---------- */}
      <section className="container-x grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <PolaroidCollage
          main={{ src: '/img/interior-cozy.jpg', alt: 'Inside SO Restaurant' }}
          a={{ src: '/img/burger-wood.jpg', alt: 'Garden burger' }}
          b={{ src: '/img/egusi.jpg', alt: 'Egusi soup with assorted meat' }}
        />
        <div>
          <div data-reveal="up" className="relative">
            <p className="eyebrow-script relative z-10 -mb-6 -rotate-3 text-[clamp(64px,7vw,96px)]">Fresh</p>
            <h2 className="relative text-[clamp(44px,5vw,64px)] leading-[0.95]">From Lagos, with love</h2>
          </div>
          <p data-reveal="up" style={{ '--delay': '120ms' } as React.CSSProperties} className="mt-6 max-w-xl">
            At {site.name} we cook with the freshest market ingredients and recipes we&apos;ve spent years getting right. Jollof with real
            party smoke, soups that taste like home, grills straight off the coals. Eat in, pick up, or let us bring it to you hot.
          </p>
          <div data-reveal="up" style={{ '--delay': '220ms' } as React.CSSProperties} className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu" className="btn-sun !px-10 !py-4" data-cursor="grow">
              Order now
            </Link>
            <Link href="/about" className="btn border-2 border-ink !px-8 text-ink hover:bg-ink hover:text-white">
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Popular ---------- */}
      <section className="container-x pb-20 md:pb-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div data-reveal="up">
            <p className="eyebrow-script text-5xl">Popular</p>
            <h2 className="text-[clamp(40px,4.5vw,56px)] leading-none">Everyone&apos;s ordering</h2>
          </div>
          <Link href="/menu" data-reveal="up" className="font-display text-xl tracking-wider text-chili hover:underline">
            Full menu →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
          {popular.map((m, i) => (
            <li key={m.id} data-reveal="up" style={{ '--delay': `${i * 100}ms` } as React.CSSProperties}>
              <Link href={`/menu?c=${m.category}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                  <Image src={m.image} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-16">
                    <h3 className="text-2xl leading-none text-white md:text-3xl">{m.name}</h3>
                    <p className="mt-1 font-semibold text-sun">{naira(m.price)}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Cravings banner with torn edges ---------- */}
      <section className="relative mb-0 overflow-hidden py-[clamp(120px,14vw,205px)]">
        <TornEdge position="top" />
        <Image src="/img/grill-banner.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="container-x relative text-center">
          <h2 data-reveal="up" className="text-[clamp(44px,6.5vw,92px)] leading-[0.9] text-white">
            Cravings don&apos;t keep office hours
          </h2>
          <p data-reveal="up" style={{ '--delay': '150ms' } as React.CSSProperties} className="mt-2 font-script text-[clamp(44px,6vw,84px)] leading-none text-white">
            – So come hungry
          </p>
        </div>
        <TornEdge position="bottom" color="#fcf6ea" />
      </section>

      <Testimonials />
      <Locations />
    </>
  )
}
