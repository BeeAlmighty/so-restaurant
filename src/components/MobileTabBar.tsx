'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookIcon, CartIcon, HomeIcon, PhoneIcon } from './Icons'
import { cart, cartCount, useCart } from '@/lib/cart'
import { site } from '@/lib/site'

/** App-style bottom bar on phones (the reference has one too). */
export function MobileTabBar() {
  const pathname = usePathname()
  const count = cartCount(useCart())
  const item = 'flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium'

  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-black/5 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <Link href="/" className={`${item} ${pathname === '/' ? 'text-chili' : 'text-ink'}`}>
        <HomeIcon className="h-5 w-5" /> Home
      </Link>
      <Link href="/menu" className={`${item} ${pathname === '/menu' ? 'text-chili' : 'text-ink'}`}>
        <BookIcon className="h-5 w-5" /> Menu
      </Link>
      <button type="button" onClick={cart.open} className={`${item} text-ink`}>
        <span className="relative">
          <CartIcon className="h-5 w-5" />
          {count > 0 && <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-chili px-1 text-[10px] font-bold text-white">{count}</span>}
        </span>
        Cart
      </button>
      <a href={`tel:${site.helpline.replace(/\s/g, '')}`} className={`${item} text-ink`}>
        <PhoneIcon className="h-5 w-5" /> Call
      </a>
    </nav>
  )
}
