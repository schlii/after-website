'use client'

import { type FC } from 'react'
import { useCart } from '../contexts/CartContext'
import { type PlainProduct } from '../../types/PlainProduct'

interface Props {
  product: PlainProduct
  variantId?: string // defaults to first variant
}

export const AddToCartButton: FC<Props> = ({ product, variantId }) => {
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

  return (
    <button
      onClick={handleAdd}
      style={{
        marginTop: '0.5rem',
        padding: '0.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: '#333',
        color: '#fff',
      }}
    >
      Add to Cart
    </button>
  )
}
