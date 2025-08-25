'use client'

import { type FC, useState } from 'react'
import { AddToCartButton } from './AddToCartButton'
import { VariantSelector } from './VariantSelector'
import { type PlainProduct } from '../../types/PlainProduct'

interface ProductCardProps {
  product: PlainProduct
  className?: string
}

export const ProductCard: FC<ProductCardProps> = ({ product, className }) => {
  const { image: primaryImage, variants } = product
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0]?.id ?? '')
  const selectedVariant = variants.find(v => v.id === selectedVariantId) ?? variants[0]
  const rawPrice = selectedVariant?.price ?? '0'
  const price = Number.parseFloat(rawPrice).toFixed(0)

  return (
    <div
      className={className}
      style={{
        padding: '0.75rem',
        textAlign: 'center',
        color: '#000',
        fontFamily: 'PixdorTwo, var(--font-mono)',
        backgroundColor: 'transparent'
      }}
    >
      {/* Product Image */}
      {primaryImage && (
        <img
          src={primaryImage.src}
          alt={primaryImage.alt || product.title}
          style={{ width: '100%', maxWidth: 320, height: 'auto', border: '1px solid #000' }}
        />
      )}

      {/* Title + Price */}
      <p style={{ margin: '0.5rem 0 0', fontSize: '1.15rem' }}>
        {product.title} <span style={{ opacity: 0.6 }}>|</span> ${price}
      </p>

      {/* Variant Selector */}
      {variants.length > 1 && (
        <div style={{ marginTop: '0.4rem' }}>
          <VariantSelector variants={variants} onSelect={setSelectedVariantId} />
        </div>
      )}

      {/* Add to cart */}
      <div style={{ marginTop: '0.6rem' }}>
        <AddToCartButton product={product} variantId={selectedVariantId} />
      </div>
    </div>
  )
}