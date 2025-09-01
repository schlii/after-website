'use client'

import { useCart } from '@/contexts/CartContext'
import { usePathname } from 'next/navigation'
import css from '@/components/ContactForm.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '@/app/mobile/MobilePage.module.css'
import site from '@/styles/SiteGrid.module.css'

export default function MobileCartBar () {
  const pathname = usePathname()
  // Hide the cart bar entirely inside Sanity Studio routes
  if (pathname?.startsWith('/studio')) {
    return null
  }

  const { items, checkoutUrl, updateQuantity, removeItem } = useCart()

  // Fluid dimension tokens
  const collapsedHeight = 'clamp(44px, 6vh, 56px)'
  const desktopWidth = 'clamp(260px, 28vw, 360px)'

  // Detect desktop viewport (min-width 1024px)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const handleMatch = (e: MediaQueryList | MediaQueryListEvent) => {
      // `matches` exists on both initial MediaQueryList and events
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      setIsDesktop(('matches' in e ? e.matches : (e as MediaQueryList).matches))
    }
    handleMatch(mql)
    // Newer browsers
    mql.addEventListener?.('change', handleMatch)
    return () => {
      mql.removeEventListener?.('change', handleMatch)
    }
  }, [])

  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const barHeight = open ? '60vh' : collapsedHeight // mobile default

  const commonStyles: React.CSSProperties = {
    background: '#dfe4ea',
    border: '1px solid #8d96a0',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.2)',
    transition: 'height 0.3s ease',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column'
  }

  const containerStyle: React.CSSProperties = isDesktop
    ? {
        ...commonStyles,
        position: 'fixed',
        right: '20px',
        bottom: 0,
        width: desktopWidth,
        height: open ? 'auto' : collapsedHeight,
        maxHeight: '60vh',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease, height 0.3s ease'
      }
    : {
        ...commonStyles,
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: barHeight,
        borderTop: '1px solid #8d96a0'
      }

  return (
    <div style={containerStyle}>
      {/* toggle button */}
      <div style={{padding:'8px 4px 4px', display:'flex', justifyContent:'center'}}>
        <button className={css.sendBtn} style={{width:'140px'}} onClick={toggle}>
          {open ? 'hide cart' : `view cart (${items.reduce((s,i)=>s+i.quantity,0)})`}
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
                  <div style={{marginLeft:'0.5rem', flex:1, fontFamily:'PixdorTwo, var(--font-mono)', color:'#000'}}>
                    <p style={{margin:'0 0 0.15rem', fontSize:'0.9rem'}}>{item.title}</p>
                    {item.variantTitle && item.variantTitle !== 'Default Title' && (
                      <p style={{margin:'0 0 0.15rem', fontSize:'0.85rem', opacity:0.8}}>{item.variantTitle}</p>
                    )}
                    <p style={{margin:'0', fontSize:'0.85rem'}}>
                      ${(()=>{const p=typeof item.price==='string'?parseFloat(item.price):parseFloat((item.price as any).amount);return p.toFixed(0)})()}
                    </p>
                  </div>
                  {/* quantity controls */}
                  <div style={{display:'flex', alignItems:'center', gap:'0.25rem', marginLeft:'0.25rem', fontFamily:'PixdorTwo, var(--font-mono)', color:'#000'}}>
                    <button onClick={()=>updateQuantity(item.lineItemId??item.id,-1)} style={{padding:'0 6px', fontFamily:'inherit', color:'#000'}}>−</button>
                    <span style={{minWidth:'1.5rem', textAlign:'center'}}>{item.quantity}</span>
                    <button onClick={()=>updateQuantity(item.lineItemId??item.id,1)} style={{padding:'0 6px', fontFamily:'inherit', color:'#000'}}>＋</button>
                  </div>
                  {/* remove */}
                  <button onClick={()=>removeItem(item.lineItemId??item.id)} style={{marginLeft:'0.5rem', background:'none', border:'none', color:'#000', textDecoration:'underline', cursor:'pointer', fontFamily:'PixdorTwo, var(--font-mono)', fontSize:'0.8rem'}}>remove</button>
                </div>
              ))}

              <p style={{marginTop:'0.5rem', fontFamily:'PixdorTwo, var(--font-mono)', fontWeight:600, textAlign:'right', color:'#000'}}>
                subtotal: $
                {items.reduce((s,i)=>{const p=typeof i.price==='string'?parseFloat(i.price):parseFloat((i.price as any).amount);return s+p*i.quantity},0).toFixed(0)}
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
