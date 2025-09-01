"use client"
import { FC, useState } from 'react'
import Image from 'next/image'
import { PlainProduct } from '../../types/PlainProduct'
import { AddToCartButton } from '@/components/AddToCartButton'
import css from '@/components/ContactForm.module.css'

interface Props { products: PlainProduct[] }

const MobileMerchStack: FC<Props> = ({ products }) => {
  if (!products.length) return <p>No merch available.</p>
  const [variantIds, setVariantIds] = useState<Record<string,string>>({})

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', padding:'0.5rem 0 1.25rem' }}>
      {products.map(p=>{
        const availableVariants = p.variants.filter(v=>v.available)
        const defaultVariant = availableVariants[0] ?? p.variants[0]
        const selected = variantIds[p.id] ?? defaultVariant.id
        return (
          <div key={p.id} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            {p.image && (
              <Image src={p.image.src} alt={p.image.alt ?? p.title} width={280} height={280} style={{ objectFit:'contain', border:'1px solid #000' }} />
            )}
            <p style={{ margin:'0.5rem 0 0', fontFamily:'PixdorTwo, var(--font-mono)', fontSize:'1.1rem', color:'#000', textAlign:'center' }}>
              {p.title} <span style={{ opacity:0.6 }}>|</span> ${Number.parseFloat(defaultVariant.price ?? '0').toFixed(0)}
            </p>
            {availableVariants.length > 1 && (
              <select
                value={selected}
                onChange={e=> setVariantIds(v=>({...v, [p.id]: e.target.value}))}
                className={css.inputCapsule}
                style={{ width:'280px', marginTop:'0.4rem', fontFamily:'PixdorTwo, var(--font-mono)', color:'#000', fontSize:'1rem' }}
              >
                {availableVariants.map(v=> (<option key={v.id} value={v.id}>{v.title}</option>))}
              </select>
            )}
            <AddToCartButton
              product={p}
              variantId={selected}
              className={css.sendBtn}
              style={{minWidth:'125px', padding:'0.5rem 0.75rem', marginTop:'0.6rem', whiteSpace:'nowrap', textAlign:'center', display:'block'}}
            />
          </div>
        )
      })}
    </div>
  )
}

export default MobileMerchStack
