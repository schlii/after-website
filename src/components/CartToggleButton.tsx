'use client'

import { useCart } from '../contexts/CartContext'

export default function CartToggleButton() {
  const { toggle, items } = useCart()
  const qty = items.reduce((sum, i) => sum + i.quantity, 0)
  return (
    <button onClick={toggle} style={{ position: 'relative' }}>
      🛒
      {qty > 0 && (
        <span style={{ position: 'absolute', top: -4, right: -8, fontSize: '0.75rem' }}>{qty}</span>
      )}
    </button>
  )
}
