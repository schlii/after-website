'use client'

import { type FC } from 'react'
import { useCart } from '../contexts/CartContext'
import { type PlainProduct } from '../../types/PlainProduct'
import css from '@/components/ContactForm.module.css'

interface Props {
  product: PlainProduct
  variantId?: string // defaults to first variant
  className?: string
  style?: React.CSSProperties
}

export const AddToCartButton: FC<Props> = ({ product, variantId, className, style }) => {
  const { addItem } = useCart()

  const handleAdd = async () => {
    const variant = product.variants.find((v) => v.id === (variantId || product.variants[0]?.id))
    if (!variant) return
    await addItem({
      id: variant.id,
      productId: product.id,
      title: product.title,
      price: variant.price,
      image: product.image?.src ?? null,
    })
  }

  const btnClass = className ? `${css.sendBtn} ${className}` : css.sendBtn
  return (
    <button onClick={handleAdd} className={btnClass} style={style}>add to cart</button>
  )
}
