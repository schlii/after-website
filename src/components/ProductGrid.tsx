'use client'

import { type FC } from 'react'
import { type PlainProduct } from '../../types/PlainProduct'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: PlainProduct[]
  className?: string
}

export const ProductGrid: FC<ProductGridProps> = ({ products, className }) => {
  if (!products || products.length === 0) {
    return (
      <div className={className}>
        <p>No products available.</p>
      </div>
    )
  }

  return (
    <div 
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '1rem',
        padding: '0.5rem',
        justifyItems: 'center'
      }}
    >
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          className="product-card"
        />
      ))}
    </div>
  )
}