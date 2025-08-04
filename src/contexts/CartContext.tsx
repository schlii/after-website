'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { shopifyHelpers } from '../../lib/shopify'

interface CartItem {
  id: string // variant id
  lineItemId?: string
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
  updateQuantity: (lineId: string, delta: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
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
      items.filter((it) => it.lineItemId).map((it) => ({ id: it.lineItemId, quantity: it.quantity }))
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
      const checkout = await shopifyHelpers.addToCheckout(state.checkoutId, [
        { variantId: item.id, quantity: item.quantity }
      ])
      const added = checkout.lineItems.find((li: any) => li.variant.id === item.id)
      setState((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.id === item.id ? { ...i, lineItemId: i.lineItemId ?? added?.id } : i
        ),
        checkoutId: checkout.id,
        checkoutUrl: checkout.webUrl,
      }))
    } else {
      const checkout = await shopifyHelpers.createCheckout()
      const checkoutAfterAdd = await shopifyHelpers.addToCheckout(checkout.id, [
        { variantId: item.id, quantity: item.quantity },
      ])
      const addedLine = checkoutAfterAdd.lineItems.find((li: any) => li.variant.id === item.id)
      setState((p) => ({
        ...p,
        items: p.items.map((it) => it.id === item.id ? { ...it, lineItemId: addedLine?.id } : it),
        checkoutId: checkout.id,
        checkoutUrl: checkout.webUrl,
      }))
    }
  }

  const updateQuantity = async (lineId: string, delta: number) => {
    let updated: CartItem[] = []
    setState((prev) => {
      updated = prev.items
        .map((i) => ((i.lineItemId ?? i.id) === lineId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
      return { ...prev, items: updated }
    })
    await syncCheckout(updated)
  }

  const removeItem = async (lineId: string) => {
    setState((prev) => ({ ...prev, items: prev.items.filter((i) => (i.lineItemId ?? i.id) !== lineId) }))
    if (state.checkoutId) {
      await shopifyHelpers.removeFromCheckout(state.checkoutId, [lineId])
    }
  }

  return (
    <CartContext.Provider value={{ ...state, addItem, updateQuantity, removeItem, toggle, isOpen: state.isOpen ?? false }}>
      {children}
    </CartContext.Provider>
  )
}
