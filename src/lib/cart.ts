'use client'

import { useSyncExternalStore } from 'react'

export type CartLine = { key: string; id: string; name: string; option?: string; price: number; qty: number; image: string }

type State = { lines: CartLine[]; open: boolean; toast: { id: number; text: string } | null }

const KEY = 'so-cart-v1'
const EMPTY: State = { lines: [], open: false, toast: null }

let state: State = EMPTY
let hydrated = false
const listeners = new Set<() => void>()

function load() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) state = { ...state, lines: JSON.parse(raw) as CartLine[] }
  } catch {
    // private mode or corrupted storage: start empty
  }
}

function set(next: Partial<State>) {
  state = { ...state, ...next }
  if (next.lines) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state.lines))
    } catch {}
  }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  load()
  listeners.add(l)
  return () => listeners.delete(l)
}

const getSnapshot = () => {
  load()
  return state
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)
}

let toastTimer: ReturnType<typeof setTimeout> | undefined

export const cart = {
  add(item: Omit<CartLine, 'key' | 'qty'>, qty = 1) {
    const key = item.option ? `${item.id}::${item.option}` : item.id
    const existing = state.lines.find((l) => l.key === key)
    const lines = existing
      ? state.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      : [...state.lines, { ...item, key, qty }]
    set({ lines, toast: { id: Date.now(), text: `${item.name}${item.option ? ` (${item.option})` : ''} added` } })
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => set({ toast: null }), 2600)
  },
  setQty(key: string, qty: number) {
    set({ lines: qty <= 0 ? state.lines.filter((l) => l.key !== key) : state.lines.map((l) => (l.key === key ? { ...l, qty } : l)) })
  },
  clear() {
    set({ lines: [] })
  },
  open() {
    set({ open: true })
  },
  close() {
    set({ open: false })
  },
}

export const cartCount = (s: State) => s.lines.reduce((n, l) => n + l.qty, 0)
export const cartTotal = (s: State) => s.lines.reduce((n, l) => n + l.qty * l.price, 0)
