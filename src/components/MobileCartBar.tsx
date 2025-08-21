'use client'

import { useCart } from '@/contexts/CartContext'
import css from '@/components/ContactForm.module.css'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import styles from '@/app/mobile/MobilePage.module.css'
import site from '@/styles/SiteGrid.module.css'

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
        <div className={`${site.panelBox} ${styles.grainBox}`} style={{flex:1, overflowY:'auto', padding:'0.75rem'}}>
          {items.length===0 ? (
            <p style={{fontFamily:'PixdorTwo, var(--font-mono)', textAlign:'center', marginTop:'1rem', color:'#000'}}>cart empty</p>
          ) : (
            <>
              {items.map((item, idx)=>(
                <div key={`${item.id}-${idx}`} style={{display:'flex', alignItems:'center', marginBottom:'0.75rem'}}>
                  {item.image && (
                    <Image src={item.image} alt={item.title} width={90} height={90} style={{border:'1px solid #000', objectFit:'cover'}} />
                  )}
                  <div style={{marginLeft:'0.5rem', fontFamily:'PixdorTwo, var(--font-mono)', color:'#000'}}>
                    <p style={{margin:'0 0 0.15rem', fontSize:'0.9rem'}}>{item.title}</p>
                    <p style={{margin:'0', fontSize:'0.85rem'}}>${typeof item.price==='string'?item.price:(item.price as any).amount}  × {item.quantity}</p>
                  </div>
                </div>
              ))}

              <p style={{marginTop:'0.5rem', fontFamily:'PixdorTwo, var(--font-mono)', fontWeight:600, textAlign:'right', color:'#000'}}>
                subtotal: $
                {items.reduce((s,i)=>{const p=typeof i.price==='string'?parseFloat(i.price):parseFloat((i.price as any).amount);return s+p*i.quantity},0).toFixed(2)}
              </p>

              {checkoutUrl && (
                <div style={{textAlign:'center'}}>
                  <Link href={checkoutUrl} target="_blank" className={css.sendBtn} style={{display:'inline-block',width:'110px',textAlign:'center',marginTop:'0.75rem'}}>checkout</Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
