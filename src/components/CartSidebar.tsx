'use client'

import { useCart } from '../contexts/CartContext'
import Link from 'next/link'

export default function CartSidebar() {
  const { items, checkoutUrl, isOpen, toggle, updateQuantity, removeItem } = useCart()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-320px',
        width: '320px',
        height: '100vh',
        background: '#111',
        color: '#fff',
        transition: 'right 0.3s ease-in-out',
        padding: '1rem',
        zIndex: 1000,
      }}
    >
      <button onClick={toggle} style={{ marginBottom: '1rem' }}>Close</button>
      <h3 style={{ marginBottom: '1rem' }}>Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item, idx) => (
              <li key={`${item.id}-${idx}`} style={{ marginBottom: '0.5rem' }}>
                {item.title} – ${item.price}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button onClick={() => removeItem(item.id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '1rem' }}>
            Subtotal: $
            {items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0).toFixed(2)}
          </p>
        </>
      )}
      {checkoutUrl && (
        <Link href={checkoutUrl} target="_blank" style={{
          display: 'block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#4B5563',
          textAlign: 'center',
        }}>Checkout</Link>
      )}
    </div>
  )
}
