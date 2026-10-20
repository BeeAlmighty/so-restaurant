import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Mrs_Saint_Delafield, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { Toast } from '@/components/Toast'
import { MobileTabBar } from '@/components/MobileTabBar'
import { CursorFollower } from '@/components/CursorFollower'
import { RevealObserver } from '@/components/RevealObserver'
import { site } from '@/lib/site'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })
const script = Mrs_Saint_Delafield({ weight: '400', subsets: ['latin'], variable: '--font-script-face', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    images: [{ url: '/img/jollof-fish.jpg', width: 1200, height: 800, alt: 'Party jollof with grilled fish at SO Restaurant' }],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#f6b909' }

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: site.name,
  url: site.url,
  description: site.description,
  servesCuisine: ['Nigerian', 'Grill', 'Burgers', 'Cocktails'],
  priceRange: '₦₦',
  hasMenu: `${site.url}/menu`,
  acceptsReservations: false,
  email: site.email,
  department: site.branches.map((b) => ({
    '@type': 'Restaurant',
    name: `${site.name} ${b.name}`,
    telephone: b.phone,
    address: { '@type': 'PostalAddress', streetAddress: b.address, addressLocality: site.city, addressCountry: 'NG' },
  })),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${bebas.variable} ${jakarta.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal animations may start hidden; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="pb-16 lg:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
        <Toast />
        <MobileTabBar />
        <CursorFollower />
        <RevealObserver />
      </body>
    </html>
  )
}
