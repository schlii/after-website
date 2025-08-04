'use client'

import { useState, type FC } from 'react'
import { type PlainProduct } from '../../types/PlainProduct'
import { VariantSelector } from './VariantSelector'
import { AddToCartButton } from './AddToCartButton'

interface ProductDetailClientProps {
  product: PlainProduct
}

/**
 * Client-side wrapper for product detail page.
 * Handles variant selection and Add-to-Cart interaction.
 */
export const ProductDetailClient: FC<ProductDetailClientProps> = ({ product }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id ?? ''
  )

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]
  const price = selectedVariant?.price ?? product.price

  return (
    <div>
      {/* Variant selector */}
      <VariantSelector variants={product.variants} onSelect={setSelectedVariantId} />

      {/* Price */}
      <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        ${price}
      </p>

      {/* Availability */}
      <p style={{ marginBottom: '1rem' }}>{product.available ? 'In stock' : 'Out of stock'}</p>

      {/* Add to Cart */}
      <AddToCartButton product={product} variantId={selectedVariantId} />
    </div>
  )
}
