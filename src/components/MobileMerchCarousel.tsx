'use client'

import { useState, type FC } from 'react'
import { PlainProduct } from '../../types/PlainProduct'
import Image from 'next/image'
import css from '@/components/ContactForm.module.css'
import { AddToCartButton } from '@/components/AddToCartButton'

interface TouchState { x: number; y: number }

interface Props {
  products: PlainProduct[]
}

const MobileMerchCarousel: FC<Props> = ({ products }) => {
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<TouchState | null>(null)
  if (!products.length) return <p>No merch available.</p>
  const [variantId, setVariantId] = useState<string | undefined>(undefined)

  const product = products[index]

  const next = () => { setIndex((index + 1) % products.length); setVariantId(undefined) }
  const prev = () => { setIndex((index - 1 + products.length) % products.length); setVariantId(undefined) }

  const firstVariant = product.variants[0]

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    setTouchStart({ x: t.clientX, y: t.clientY })
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.x
    const absDx = Math.abs(dx)
    if (absDx > 40) {
      if (dx < 0) next()
      else prev()
    }
    setTouchStart(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:'0.5rem' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* sliding viewport */}
      <div style={{ overflow:'hidden', width:'100%' }}>
        <div style={{ display:'flex', transition:'transform 0.4s ease', transform:`translateX(-${index*100}%)` }}>
          {products.map((p, idx)=>{
            const v=p.variants[0]
            return (
              <div key={p.id} style={{ flex:'0 0 100%', display:'flex', flexDirection:'column', alignItems:'center' }}>
                {p.image && (
                  <Image src={p.image.src} alt={p.image.alt ?? p.title} width={320} height={320} style={{ objectFit:'contain', border:'1px solid #000' }} />
                )}
                <p style={{ margin:'0.5rem 0 0', fontFamily:'PixdorTwo, var(--font-mono)', fontSize:'1.15rem', color:'#000' }}>
                  {p.title} <span style={{ opacity:0.6 }}>|</span> ${v?.price ?? '0.00'}
                </p>
                {p.variants.length>1 && (
                  <select value={index===idx? (variantId ?? p.variants[0].id):p.variants[0].id} onChange={(e)=>setVariantId(e.target.value)} style={{ marginTop:'0.4rem', padding:'0.25rem 0.5rem', borderRadius:4, fontFamily:'PixdorTwo, var(--font-mono)', color:'#000', fontSize:'1rem' }}>
                    {p.variants.map((vv)=>(<option key={vv.id} value={vv.id}>{vv.title}</option>))}
                  </select>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* swipe hints can be optional, no arrow buttons */}
      {/* add to cart */}
      <AddToCartButton product={product} variantId={variantId ?? product.variants[0]?.id} className={css.sendBtn} style={{minWidth:'125px', padding:'0.5rem 1rem', marginTop:'1rem', marginBottom:'1rem', whiteSpace:'nowrap', textAlign:'center', display:'block'}} />
    </div>
  )
}

export default MobileMerchCarousel
