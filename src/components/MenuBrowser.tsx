'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CloseIcon, PlusIcon, SearchIcon } from './Icons'
import { cart } from '@/lib/cart'
import { naira } from '@/lib/format'
import { categories, menu, type CategorySlug, type MenuItem } from '@/lib/menu'

/** Hand-drawn brush blob that sits behind each category label (the reference uses an icon-font glyph). */
function Blob({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M50 4c14 0 26 5 34 15 9 11 13 24 10 37-3 14-12 27-25 34-12 6-27 7-39 1C17 85 7 73 4 59 1 46 4 32 13 21 21 11 35 4 50 4zm-3 9c-11 1-21 7-27 16-5 8-6 18-3 27 3 10 11 18 21 22 9 3 20 2 28-3 9-6 15-15 16-26 1-10-3-20-11-27-7-6-15-9-24-9z"
        opacity=".35"
      />
      <path fill="currentColor" d="M48 10c12-1 24 4 31 13 8 10 11 22 8 34-3 13-13 23-25 28-13 5-28 3-38-6C14 71 9 58 11 45c2-12 9-23 20-29 5-3 11-5 17-6z" />
    </svg>
  )
}

export function MenuBrowser() {
  const params = useSearchParams()
  const router = useRouter()
  const fromUrl = params.get('c') as CategorySlug | null
  const active: CategorySlug = categories.some((c) => c.slug === fromUrl) ? (fromUrl as CategorySlug) : 'mains'
  const [q, setQ] = useState('')
  const [picking, setPicking] = useState<MenuItem | null>(null)

  const items = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (term) return menu.filter((m) => `${m.name} ${m.description}`.toLowerCase().includes(term))
    return menu.filter((m) => m.category === active)
  }, [active, q])

  const select = (slug: CategorySlug) => {
    setQ('')
    router.replace(`/menu?c=${slug}`, { scroll: false })
  }

  return (
    <>
      {/* category tabs: horizontal scroll on phones, wrapped row on desktop */}
      <div className="sticky top-0 z-30 -mx-4 bg-white/95 backdrop-blur sm:mx-0 lg:static lg:bg-transparent lg:backdrop-blur-none">
        <ul role="tablist" aria-label="Menu categories" className="flex gap-2 overflow-x-auto px-4 pb-4 pt-3 [scrollbar-width:none] sm:px-0 lg:flex-wrap lg:justify-center lg:gap-4 lg:overflow-visible">
          {categories.map((c) => {
            const on = !q && c.slug === active
            return (
              <li key={c.slug} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => select(c.slug)}
                  className={`group relative grid min-w-[112px] place-items-center rounded-[10px] px-5 pb-3 pt-4 transition-colors duration-300 lg:min-w-[150px] lg:px-7 lg:pb-5 lg:pt-6 ${
                    on ? 'bg-sun' : 'hover:bg-butter'
                  }`}
                >
                  <Blob
                    className={`absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 lg:h-[72px] lg:w-[72px] ${
                      on ? 'scale-110 text-white opacity-60' : 'text-ember opacity-[0.12] group-hover:scale-105 group-hover:opacity-30'
                    }`}
                  />
                  <span className={`relative whitespace-nowrap font-display text-lg tracking-[0.12em] lg:text-[21px] ${on ? 'text-ink' : 'text-ink'}`}>{c.label}</span>
                  {/* pointer triangle under the active tile */}
                  <span
                    aria-hidden
                    className={`absolute -bottom-[10px] left-1/2 h-0 w-0 -translate-x-1/2 origin-top border-x-[10px] border-t-[11px] border-x-transparent border-t-sun transition-all duration-300 ${
                      on ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                    }`}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div id="search" className="mx-auto mt-6 max-w-md scroll-mt-28">
        <label className="relative block">
          <span className="sr-only">Search the menu</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jollof, wings, shakes…"
            className="w-full rounded-full border border-black/10 bg-white py-3 pl-12 pr-4 text-sm text-ink outline-none transition focus:border-sun focus:ring-2 focus:ring-sun/40"
          />
        </label>
      </div>

      <h2 className="sr-only" aria-live="polite">
        {q ? `${items.length} results for ${q}` : categories.find((c) => c.slug === active)?.label}
      </h2>

      {items.length === 0 ? (
        <p className="py-20 text-center">Nothing matches “{q}”. Try another dish.</p>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5">
          {items.map((m, i) => (
            <li key={m.id} className="animate-[fade-up_600ms_var(--ease-out3)_both]" style={{ animationDelay: `${i * 50}ms` }}>
              <ProductCard item={m} onPick={() => setPicking(m)} />
            </li>
          ))}
        </ul>
      )}

      <OptionsDialog item={picking} onClose={() => setPicking(null)} />
    </>
  )
}

function ProductCard({ item, onPick }: { item: MenuItem; onPick: () => void }) {
  const add = () => cart.add({ id: item.id, name: item.name, price: item.price, image: item.image })
  return (
    <article className="group text-center">
      <div className="relative aspect-square overflow-hidden bg-butter">
        <Image src={item.image} alt={item.name} fill sizes="(min-width: 1280px) 240px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out3)] group-hover:scale-110" />
        {item.popular && <span className="absolute left-2 top-2 rounded-full bg-chili px-2.5 py-0.5 font-display text-sm tracking-wider text-white">Popular</span>}
      </div>
      <h3 className="mt-4 text-[19px] leading-tight tracking-wide lg:text-[21px]">{item.name}</h3>
      <p className="mx-auto mt-1 line-clamp-2 max-w-[24ch] text-xs leading-5">{item.description}</p>
      <div className="mt-3 flex flex-wrap-reverse items-center justify-center gap-x-3 gap-y-2">
        {item.options ? (
          <button type="button" onClick={onPick} className="inline-flex items-center gap-2 rounded-lg bg-sun px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-sun">
            <PlusIcon className="h-4 w-4 text-chili" /> Options
          </button>
        ) : (
          <button type="button" onClick={add} aria-label={`Add ${item.name} to cart`} className="grid h-11 w-11 place-items-center rounded-lg bg-butter text-chili transition hover:bg-sun hover:text-ink active:scale-90">
            <PlusIcon className="h-5 w-5" />
          </button>
        )}
        <span className="text-lg font-bold text-chili lg:text-xl">
          {item.options && <span className="mr-1 text-xs font-medium text-body">from</span>}
          {naira(item.price)}
        </span>
      </div>
    </article>
  )
}

function OptionsDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [choice, setChoice] = useState(0)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (item && !d.open) d.showModal()
    if (!item && d.open) d.close()
  }, [item])

  return (
    <dialog
      ref={ref}
      onClose={() => {
        setChoice(0)
        onClose()
      }}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      className="m-auto w-[min(92vw,420px)] rounded-2xl p-0 backdrop:bg-ink/60"
    >
      {item?.options && (
        <div>
          <div className="relative aspect-[16/9]">
            <Image src={item.image} alt="" fill sizes="420px" className="object-cover" />
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <h3 className="text-3xl">{item.name}</h3>
            <fieldset className="mt-4 space-y-2">
              <legend className="sr-only">Choose an option</legend>
              {item.options.map((o, i) => (
                <label key={o.label} className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm transition ${choice === i ? 'border-sun bg-butter text-ink' : 'border-black/10'}`}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="opt" checked={choice === i} onChange={() => setChoice(i)} className="accent-[#eb1c22]" />
                    {o.label}
                  </span>
                  <span className="font-semibold text-chili">{naira(item.price + o.price)}</span>
                </label>
              ))}
            </fieldset>
            <button
              type="button"
              className="btn-chili mt-5 w-full"
              onClick={() => {
                const o = item.options![choice]
                cart.add({ id: item.id, name: item.name, option: o.label, price: item.price + o.price, image: item.image })
                ref.current?.close()
              }}
            >
              Add to order · {naira(item.price + item.options[choice].price)}
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
