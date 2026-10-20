'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'
import { CartIcon, CloseIcon, CutleryIcon, MenuIcon, SearchIcon } from './Icons'
import { cart, cartCount, useCart } from '@/lib/cart'
import { nav, site } from '@/lib/site'

const left = nav.slice(0, 2)
const right = nav.slice(2)

export function Header() {
  const pathname = usePathname()
  const overHero = pathname === '/'
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const count = cartCount(useCart())

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y < 40)
      // hide while scrolling down past the header, reveal on any scroll up
      setHidden(y > 160 && y > lastY.current)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const solid = !overHero || !atTop
  const linkCls = (href: string) =>
    `relative font-display text-[22px] tracking-wider text-ink transition-colors hover:text-chili after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-chili after:transition-all ${
      pathname === href ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ${hidden && !open ? '-translate-y-full' : ''} ${
          solid ? 'bg-white/95 shadow-[0_6px_30px_-12px_rgb(0_0_0/0.18)] backdrop-blur' : 'bg-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${solid ? 'h-[72px]' : 'h-[72px] lg:h-[110px]'}`}>
          {/* desktop: order pill on the left */}
          <Link href="/menu" className="btn-sun hidden !px-6 !py-3 text-sm uppercase lg:inline-flex" data-cursor="grow">
            <CutleryIcon className="h-5 w-5" /> Order now
          </Link>

          {/* mobile logo */}
          <Link href="/" className="lg:hidden" aria-label={`${site.name} home`}>
            <Logo compact />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            {left.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls(l.href)}>
                {l.label}
              </Link>
            ))}
            <Link href="/" className="mx-4" aria-label={`${site.name} home`}>
              <Logo />
            </Link>
            {right.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/menu#search" aria-label="Search the menu" className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-butter">
              <SearchIcon />
            </Link>
            <button
              type="button"
              onClick={cart.open}
              aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
              className="relative grid h-12 w-12 place-items-center rounded-xl bg-sun text-ink shadow-[0_8px_20px_-8px_rgb(246_185_9/0.9)] transition hover:-translate-y-0.5"
            >
              <CartIcon />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-chili px-1 text-[11px] font-bold text-white" suppressHydrationWarning>
                {count}
              </span>
            </button>
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="grid h-11 w-11 place-items-center text-ink lg:hidden">
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* off-canvas mobile nav */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <nav
          aria-label="Mobile"
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-6 transition-transform duration-500 ease-[var(--ease-power3)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="mb-10 flex items-center justify-between">
            <Logo compact />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full bg-butter text-ink">
              <CloseIcon />
            </button>
          </div>
          {nav.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
              className={`border-b border-black/5 py-4 font-display text-4xl tracking-wide transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'} ${
                pathname === l.href ? 'text-chili' : 'text-ink'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="btn-sun mt-auto uppercase">
            <CutleryIcon className="h-5 w-5" /> Order now
          </Link>
        </nav>
      </div>
    </>
  )
}
