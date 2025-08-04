'use client'

import { type FC, useState } from 'react'

interface Image {
  src: string
  altText: string | null
}

interface ProductGalleryProps {
  images: Image[]
  className?: string
}

/**
 * Simple image gallery with main display and clickable thumbnails.
 * Expects an array of Shopify image objects (src, altText).
 */
export const ProductGallery: FC<ProductGalleryProps> = ({ images, className }) => {
  if (images.length === 0) return null

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const active = images[activeIndex]

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Main image */}
      <img
        src={active.src}
        alt={active.altText ?? ''}
        style={{ width: '100%', maxWidth: '500px', height: 'auto', marginBottom: '0.75rem' }}
      />

      {/* Thumbnails */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setActiveIndex(idx)}
            style={{
              border: idx === activeIndex ? '2px solid #333' : '1px solid #ccc',
              padding: 0,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <img
              src={img.src}
              alt={img.altText ?? ''}
              style={{ width: '60px', height: '60px', objectFit: 'cover', display: 'block' }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
