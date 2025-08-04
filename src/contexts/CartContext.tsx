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

  const addItem = async (item: CartItem) => {
    if (state.checkoutId) {
      // existing checkout
      await shopifyHelpers.addToCheckout(state.checkoutId, [
        { variantId: item.id, quantity: item.quantity },
      ])
      setState((prev) => ({
        ...prev,
        items: [...prev.items, item],
      }))
    } else {
      // new checkout
      const checkout = await shopifyHelpers.createCheckout()
      await shopifyHelpers.addToCheckout(checkout.id, [
        { variantId: item.id, quantity: item.quantity },
      ])
      setState({
        items: [item],
        checkoutId: checkout.id,
        checkoutUrl: checkout.webUrl ?? checkout.webUrl ?? '',
      })
    }
  }

  return (
    <CartContext.Provider value={{ ...state, addItem, toggle, isOpen: state.isOpen ?? false }}>
      {children}
    </CartContext.Provider>
  )
}
