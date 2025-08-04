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
  const price = selectedVariant?.price ?? 'N/A'

  return (
    <div 
      className={className}
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    >
      {/* Product Image */}
      {primaryImage && (
        <img 
          src={primaryImage.src}
          alt={primaryImage.altText || product.title}
          style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
        />
      )}
      
      {/* Product Title */}
      <h3>{product.title}</h3>
      
      {/* Variant Selector */}
      <VariantSelector variants={variants} onSelect={setSelectedVariantId} />

      {/* Product Price */}
      <p>Price: ${price}</p>
      
      {/* Availability */}
      <p>
        Status: {product.available ? 'Available' : 'Out of Stock'}
      </p>
      
      {/* Product Type */}
      {product.productType && (
        <p>Type: {product.productType}</p>
      )}
      
      {/* Vendor */}
      {product.vendor && (
        <p>Vendor: {product.vendor}</p>
      )}
          <AddToCartButton product={product} variantId={selectedVariantId} />
    </div>
  )
}