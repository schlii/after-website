'use client'

import { useCart } from '@/contexts/CartContext'
import css from '@/components/ContactForm.module.css'
import Link from 'next/link'
import { useState } from 'react'

export default function MobileCartBar () {
  const { items, checkoutUrl } = useCart()
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const barHeight = open ? '60vh' : '56px'

  return (
    <div
      style={{
        position:'fixed', left:0, bottom:0, width:'100%', height:barHeight,
        background:'#dfe4ea', borderTop:'1px solid #8d96a0', boxShadow:'0 -2px 4px rgba(0,0,0,0.2)', transition:'height 0.3s ease', zIndex:2000,
        display:'flex', flexDirection:'column'
      }}>
      {/* toggle button */}
      <div style={{padding:'8px 4px 4px', display:'flex', justifyContent:'center'}}>
        <button className={css.sendBtn} style={{width:'110px'}} onClick={toggle}>
          {open ? 'hide cart' : 'view cart'}
        </button>
      </div>

      {open && (
        <div style={{flex:1, overflowY:'auto', padding:'0 1rem 1rem'}}>
          {items.length===0 ? (
            <p style={{fontFamily:'PixdorTwo, var(--font-mono)', textAlign:'center', marginTop:'1rem'}}>cart empty</p>
          ) : (
            <>
              <ul style={{listStyle:'none', padding:0, margin:0}}>
                {items.map((item, idx)=>(
                  <li key={`${item.id}-${idx}`} style={{marginBottom:'0.5rem', fontFamily:'PixdorTwo, var(--font-mono)', fontSize:'0.9rem', color:'#000'}}>
                    {item.title} – ${typeof item.price==='string'?item.price:(item.price as any).amount} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p style={{marginTop:'0.5rem', fontFamily:'PixdorTwo, var(--font-mono)', fontWeight:600}}>
                subtotal: $
                {items.reduce((s,i)=>{const p=typeof i.price==='string'?parseFloat(i.price):parseFloat((i.price as any).amount);return s+p*i.quantity},0).toFixed(2)}
              </p>
              {checkoutUrl && (
                <Link href={checkoutUrl} target="_blank" className={css.sendBtn} style={{display:'block',width:'110px',textAlign:'center',marginTop:'0.75rem'}}>checkout</Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
