'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { shopifyHelpers } from '../../lib/shopify'

interface CartItem {
  id: string // variant id
  productId: string
  title: string
  quantity: number
  price: string
  image?: string | null
}

interface CartState {
  items: CartItem[]
  checkoutId: string | null
  checkoutUrl: string | null
}

interface CartContextValue extends CartState {
  addItem: (item: CartItem) => Promise<void>
  updateQuantity: (variantId: string, delta: number) => Promise<void>
  removeItem: (variantId: string) => Promise<void>
  toggle: () => void
  isOpen: boolean
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('CartContext not found')
  return ctx
}

const LOCAL_KEY = 'after_cart'

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CartState & { isOpen: boolean }>({
    items: [],
    checkoutId: null,
    checkoutUrl: null,
  })

  // Load from localStorage
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_KEY) : null
    if (stored) {
      try {
        setState({ ...JSON.parse(stored), isOpen: false })
      } catch (_) {
        /* ignore */
      }
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { isOpen, ...persist } = state
      localStorage.setItem(LOCAL_KEY, JSON.stringify(persist))
    }
  }, [state])

  const toggle = () => setState((p) => ({ ...p, isOpen: !p.isOpen }))

  const syncCheckout = async (items: CartItem[]) => {
    if (!state.checkoutId) return
    await shopifyHelpers.updateCheckout(
      state.checkoutId,
      items.map((it) => ({ variantId: it.id, quantity: it.quantity }))
    )
  }

  const addItem = async (item: CartItem) => {
    setState((prev) => {
      const existing = prev.items.find((i) => i.id === item.id)
      let newItems: CartItem[]
      if (existing) {
        newItems = prev.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      } else {
        newItems = [...prev.items, item]
      }
      return { ...prev, items: newItems }
    })

    if (state.checkoutId) {
      await syncCheckout(
        state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      )
    } else {
      const checkout = await shopifyHelpers.createCheckout()
      await shopifyHelpers.addToCheckout(checkout.id, [
        { variantId: item.id, quantity: item.quantity },
      ])
      setState((p) => ({ ...p, checkoutId: checkout.id, checkoutUrl: checkout.webUrl }))
    }
  }

  const updateQuantity = async (variantId: string, delta: number) => {
    setState((prev) => {
      const newItems = prev.items
        .map((i) => (i.id === variantId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
      return { ...prev, items: newItems }
    })
    await syncCheckout(state.items.map((i) => (i.id === variantId ? { ...i, quantity: i.quantity + delta } : i)).filter(i=>i.quantity>0))
  }

  const removeItem = async (variantId: string) => {
    setState((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== variantId) }))
    if (state.checkoutId) {
      await shopifyHelpers.removeFromCheckout(state.checkoutId, [variantId])
    }
  }

  return (
    <CartContext.Provider value={{ ...state, addItem, updateQuantity, removeItem, toggle, isOpen: state.isOpen ?? false }}>
      {children}
    </CartContext.Provider>
  )
}
