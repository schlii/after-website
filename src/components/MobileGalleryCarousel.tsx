'use client'

import { FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { urlFor } from '@/sanity/lib/image'

interface GalleryImage {
  asset: any
  alt?: string
  fitMode?: string
}

interface Props {
  images: GalleryImage[]
}

const MobileGalleryCarousel: FC<Props> = ({ images }) => {
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  if (!images.length) return null

  const next = () => setIndex((index + 1) % images.length)
  const prev = () => setIndex((index - 1 + images.length) % images.length)

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

  const currentImg = images[index]

  const openLightbox = () => {
    setLightboxOpen(true)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.5rem' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Viewport */}
      <div style={{ width: '100%', position: 'relative', paddingBottom: '100%', overflow: 'hidden', borderRadius:'8px' }}>
        {/* Slider */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
            transition: 'transform 0.45s ease',
            transform: `translateX(-${index * 100}%)`,
          }}
          onClick={openLightbox}
        >
          {images.map((img, idx) => (
            <div key={idx} style={{ flex: '0 0 100%', position: 'relative', minWidth:'100%' }}>
              <img
                src={urlFor(img).width(800).height(800).url()}
                alt={img.alt || 'Gallery'}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && typeof window !== 'undefined' &&
        createPortal(
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
            {/* Backdrop */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)' }} onClick={() => setLightboxOpen(false)} />

            {/* Slider content */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={prev} aria-label="Prev" style={{ pointerEvents: 'auto', position: 'absolute', left: '1rem', background: 'none', border: 'none', color: '#fff', fontSize: '2.5rem' }}>‹</button>
                  <button onClick={next} aria-label="Next" style={{ pointerEvents: 'auto', position: 'absolute', right: '1rem', background: 'none', border: 'none', color: '#fff', fontSize: '2.5rem' }}>›</button>
                </>
              )}

              {/* Lightbox slider */}
              <div style={{ position: 'relative', width: '90vw', height: '90vh', maxWidth:'900px', maxHeight:'90vh', overflow:'hidden', pointerEvents:'auto' }}>
                <div style={{ display:'flex', height:'100%', transition:'transform 0.4s ease', transform:`translateX(-${index*100}%)` }}>
                  {images.map((img, idx)=>(
                    <div key={idx} style={{ flex:'0 0 100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <div style={{ position:'relative', display:'inline-block' }}>
                        <img src={urlFor(img).url()} alt={img.alt || 'Gallery'} style={{ maxWidth:'100%', maxHeight:'85vh', objectFit:'contain', display:'block' }} />
                        {idx===index && (
                          <button onClick={() => setLightboxOpen(false)} aria-label="Close" style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', fontSize: '1.75rem', width:'2rem', height:'2rem', lineHeight:'2rem', textAlign:'center', borderRadius:'50%' }}>×</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default MobileGalleryCarousel
