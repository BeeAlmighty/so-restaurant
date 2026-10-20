import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About us',
  description: `The story behind ${site.name}: Nigerian classics, grills and cocktails cooked fresh in ${site.city}.`,
  alternates: { canonical: '/about' },
}

// TODO: replace this copy with SO Restaurant's real story, founder name and photo.
export default function AboutPage() {
  return (
    <>
      <PageHero title="About us" sub="Great food, served SO well." image="/img/interior.jpg" />

      <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[400px_1fr] lg:gap-20">
        <div data-reveal="left" className="relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden">
          <Image src="/img/chefs.jpg" alt="Chef plating a dish in the SO kitchen" fill sizes="400px" className="object-cover" />
        </div>
        <div>
          <div data-reveal="up">
            <p className="eyebrow-script relative z-10 -mb-5 -rotate-3 text-[clamp(60px,7vw,90px)]">From</p>
            <h2 className="text-[clamp(44px,5vw,64px)] leading-[0.95]">Our kitchen with love</h2>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div data-reveal="up" style={{ '--delay': '100ms' } as React.CSSProperties} className="space-y-5">
              <p>
                {site.name} is where home-style Nigerian cooking meets a proper night out. Every pot starts from scratch each morning,
                with fresh peppers, real stock and recipes we&apos;ve been perfecting for years.
              </p>
              <p>
                Our mission is simple: <strong className="text-ink">make good food easy to get, whenever you want it.</strong> Eat in with
                friends, pick up on the way home, or order on WhatsApp and we&apos;ll bring it to you hot.
              </p>
            </div>
            <div data-reveal="up" style={{ '--delay': '200ms' } as React.CSSProperties} className="space-y-5">
              <p>Food here is more than fuel. It&apos;s connection, culture and a good time.</p>
              <p>
                With a growing menu, fast dispatch and a lounge for when the evening needs a cocktail, we&apos;re committed to giving you
                the best food experience in {site.city}.
              </p>
              <p className="font-script text-5xl leading-none text-ink">with love,</p>
              <p className="font-semibold">The {site.name} team</p>
            </div>
          </div>
          <Link href="/menu" data-reveal="up" className="btn-sun mt-10 !px-10">
            See the menu
          </Link>
        </div>
      </section>
    </>
  )
}
