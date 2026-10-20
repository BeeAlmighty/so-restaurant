'use client'

import { cart, useCart } from '@/lib/cart'

export function Toast() {
  const { toast } = useCart()
  if (!toast) return <div aria-live="polite" className="sr-only" />
  return (
    <div aria-live="polite" className="fixed bottom-20 left-1/2 z-[80] -translate-x-1/2 lg:bottom-8">
      <div key={toast.id} className="toast-in flex items-center gap-4 rounded-full bg-ink py-2 pl-5 pr-2 text-sm text-white shadow-xl">
        <span>{toast.text}</span>
        <button type="button" onClick={cart.open} className="rounded-full bg-sun px-4 py-1.5 font-semibold text-ink">
          View cart
        </button>
      </div>
    </div>
  )
}
