import type { Metadata } from 'next'
import { Suspense } from 'react'
import { MenuBrowser } from '@/components/MenuBrowser'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Order online',
  description: `Browse the ${site.name} menu: jollof, grills, burgers, soups and shakes. Add to cart and send your order on WhatsApp.`,
  alternates: { canonical: '/menu' },
}

export default function MenuPage() {
  return (
    <div className="container-x pb-24 pt-[100px] lg:pt-[150px]">
      <header className="mb-8 text-center">
        <p className="eyebrow-script text-5xl md:text-6xl">Hungry?</p>
        <h1 className="text-[clamp(52px,7vw,96px)] leading-[0.9]">Order online</h1>
      </header>
      <Suspense fallback={<div className="h-40" />}>
        <MenuBrowser />
      </Suspense>
    </div>
  )
}
