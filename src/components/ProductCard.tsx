'use client'

import { type FC } from 'react'
import { type PlainProduct } from '../../types/PlainProduct'

interface ProductCardProps {
  product: PlainProduct
  className?: string
}

export const ProductCard: FC<ProductCardProps> = ({ product, className }) => {
  const { image: primaryImage, variants } = product
  const price = variants[0]?.price ?? 'N/A'

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
    </div>
  )
}