'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from './Icons'
import { cart, cartCount, cartTotal, useCart } from '@/lib/cart'
import { naira } from '@/lib/format'
import { site } from '@/lib/site'

export function CartDrawer() {
  const state = useCart()
  const { lines, open } = state
  const total = cartTotal(state)
  const panel = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'delivery' | 'pickup'>('delivery')
  const [branch, setBranch] = useState(site.branches[0].slug)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && cart.close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const checkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const b = site.branches.find((x) => x.slug === branch) ?? site.branches[0]
    const msg = [
      `Hello ${site.name} ${b.name}, I'd like to order:`,
      '',
      ...lines.map((l) => `• ${l.qty} × ${l.name}${l.option ? ` (${l.option})` : ''}: ${naira(l.qty * l.price)}`),
      '',
      `Subtotal: ${naira(total)}`,
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      mode === 'delivery' ? `Delivery to: ${f.get('address')}` : 'Pickup',
      f.get('note') ? `Note: ${f.get('note')}` : '',
    ]
      .filter((l) => l !== '')
      .join('\n')
    window.open(`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  const field = 'w-full rounded-lg border border-black/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-sun focus:ring-2 focus:ring-sun/40'

  return (
    <div className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={cart.close} />
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white outline-none transition-transform duration-500 ease-[var(--ease-power3)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
          <h2 className="text-4xl">Your order ({cartCount(state)})</h2>
          <button type="button" onClick={cart.close} aria-label="Close cart" className="grid h-11 w-11 place-items-center rounded-full bg-butter text-ink">
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="grid flex-1 place-items-center p-10 text-center">
            <div>
              <p className="font-display text-3xl text-ink">Your cart is empty</p>
              <p className="mt-2 text-sm">Add a few favourites from the menu to get started.</p>
              <a href="/menu" onClick={cart.close} className="btn-sun mt-6">
                Browse the menu
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={checkout} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              <ul className="space-y-4">
                {lines.map((l) => (
                  <li key={l.key} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={l.image} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xl leading-tight text-ink">{l.name}</p>
                      {l.option && <p className="text-xs">{l.option}</p>}
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center rounded-full bg-butter">
                          <button type="button" onClick={() => cart.setQty(l.key, l.qty - 1)} aria-label={`Remove one ${l.name}`} className="grid h-8 w-8 place-items-center text-chili">
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-ink">{l.qty}</span>
                          <button type="button" onClick={() => cart.setQty(l.key, l.qty + 1)} aria-label={`Add one ${l.name}`} className="grid h-8 w-8 place-items-center text-chili">
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-semibold text-chili">{naira(l.qty * l.price)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <fieldset className="space-y-3 border-t border-black/5 pt-5">
                <legend className="mb-3 font-display text-2xl text-ink">Delivery details</legend>
                <div className="grid grid-cols-2 gap-2 rounded-full bg-butter p-1 text-sm font-semibold">
                  {(['delivery', 'pickup'] as const).map((m) => (
                    <button key={m} type="button" onClick={() => setMode(m)} aria-pressed={mode === m} className={`rounded-full py-2 capitalize transition ${mode === m ? 'bg-sun text-ink' : 'text-body'}`}>
                      {m}
                    </button>
                  ))}
                </div>
                <label className="block text-sm">
                  Branch
                  <select value={branch} onChange={(e) => setBranch(e.target.value)} className={`${field} mt-1`}>
                    {site.branches.map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-sm">
                    Name
                    <input name="name" required autoComplete="name" className={`${field} mt-1`} />
                  </label>
                  <label className="block text-sm">
                    Phone
                    <input name="phone" required type="tel" autoComplete="tel" className={`${field} mt-1`} />
                  </label>
                </div>
                {mode === 'delivery' && (
                  <label className="block text-sm">
                    Delivery address
                    <input name="address" required autoComplete="street-address" className={`${field} mt-1`} />
                  </label>
                )}
                <label className="block text-sm">
                  Note (optional)
                  <input name="note" placeholder="Extra pepper, no onions…" className={`${field} mt-1`} />
                </label>
              </fieldset>
            </div>

            <div className="border-t border-black/5 px-6 py-5">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-sm">Subtotal</span>
                <span className="font-display text-3xl text-ink">{naira(total)}</span>
              </div>
              <p className="mb-4 text-xs">Delivery fee is confirmed on WhatsApp.</p>
              <button type="submit" className="btn w-full bg-[#25d366] text-white hover:brightness-95">
                <WhatsAppIcon className="h-5 w-5" /> Send order on WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
