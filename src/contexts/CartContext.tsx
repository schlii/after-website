'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { shopifyHelpers } from '../../lib/shopify'

interface CartItem {
  id: string // variant id
  lineItemId: string
  productId: string
  title: string
  variantTitle?: string
  quantity: number
  price: string
  image?: string | null
}

interface CartState {
  items: CartItem[]
  checkoutId: string | null
  checkoutUrl: string | null
  isOpen: boolean
}

interface CartContextValue extends CartState {
  addItem: (base: Omit<CartItem, 'lineItemId' | 'quantity'> & { variantTitle?: string }) => Promise<void>
  updateQuantity: (lineItemId: string, delta: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  toggle: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('CartContext not found')
  return ctx
}

const LOCAL_KEY = 'after_cart'

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CartState>({
    items: [],
    checkoutId: null,
    checkoutUrl: null,
    isOpen: false,
  })

  // hydrate from storage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = localStorage.getItem(LOCAL_KEY)
    if (raw) {
      try {
        setState((p) => ({ ...p, ...JSON.parse(raw), isOpen: false }))
      } catch {}
    }
  }, [])

  // persist
  useEffect(() => {
    if (typeof window === 'undefined') return
    const { isOpen, ...persist } = state
    localStorage.setItem(LOCAL_KEY, JSON.stringify(persist))
  }, [state])

  const toggle = () => setState((p) => ({ ...p, isOpen: !p.isOpen }))

  // ---------- helpers ----------
  const refreshFromCheckout = (checkout: any) => {
    const items: CartItem[] = checkout.lineItems.map((li: any) => ({
      lineItemId: li.id,
      id: li.variant.id,
      productId: li.variant.product?.id ?? '',
      title: li.title,
      variantTitle: li.variant.title,
      quantity: li.quantity,
      price:
        typeof li.variant.price === 'string'
          ? li.variant.price
          : li.variant.price.amount,
      image: li.variant.image?.src ?? null,
    }))
    setState((p) => ({
      ...p,
      items,
      checkoutId: checkout.id,
      checkoutUrl: checkout.webUrl,
    }))
  }

  // ---------- actions ----------
  const addItem = async (base: Omit<CartItem, 'lineItemId' | 'quantity'> & { variantTitle?: string }) => {
    // if checkout already exists, check if variant present
    if (state.checkoutId) {
      const existing = state.items.find((i) => i.id === base.id)
      if (existing) {
        // update quantity +1
        const updated = await shopifyHelpers.updateCheckout(state.checkoutId, [
          { id: existing.lineItemId, quantity: existing.quantity + 1 },
        ])
        refreshFromCheckout(updated)
      } else {
        // add new variant
        const updated = await shopifyHelpers.addToCheckout(state.checkoutId, [
          { variantId: base.id, quantity: 1 },
        ])
        refreshFromCheckout(updated)
      }
    } else {
      // create new checkout
      const checkout = await shopifyHelpers.createCheckout()
      const updated = await shopifyHelpers.addToCheckout(checkout.id, [
        { variantId: base.id, quantity: 1 },
      ])
      refreshFromCheckout(updated)
    }
  }

  const updateQuantity = async (lineItemId: string, delta: number) => {
    if (!state.checkoutId) return
    const item = state.items.find((i) => i.lineItemId === lineItemId)
    if (!item) return
    const newQty = item.quantity + delta
    if (newQty <= 0) {
      await removeItem(lineItemId)
      return
    }
    const updated = await shopifyHelpers.updateCheckout(state.checkoutId, [
      { id: lineItemId, quantity: newQty },
    ])
    refreshFromCheckout(updated)
  }

  const removeItem = async (lineItemId: string) => {
    if (!state.checkoutId) return
    const updated = await shopifyHelpers.removeFromCheckout(state.checkoutId, [lineItemId])
    refreshFromCheckout(updated)
  }

  return (
    <CartContext.Provider value={{ ...state, addItem, updateQuantity, removeItem, toggle }}>
      {children}
    </CartContext.Provider>
  )
}
