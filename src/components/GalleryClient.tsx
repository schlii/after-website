"use client"

import { useState, FC } from 'react'
import styles from '@/styles/SiteGrid.module.css'
import grid from '@/app/gallery/GalleryGrid.module.css'
import { urlFor } from '@/sanity/lib/image'
import playerStyles from '@/components/AppleMusicPlayer.module.css'
import { createPortal } from 'react-dom'
import lightboxStyles from './GalleryLightbox.module.css'

interface GalleryImage {
  asset: any
  alt?: string
  fitMode?: string
}

interface GalleryClientProps {
  images: GalleryImage[]
}

/**
 * GalleryClient handles pagination and image focus logic for the Gallery page.
 * - Displays an active image in panel1
 * - Shows up to 4 thumbnails (panels2-5) starting from currentOffset
 * - Arrow controls page through the gallery in blocks of 4
 * - If fewer than 4 images remain in a page slice, duplicates of the first image in that slice fill remaining slots
 */
export const GalleryClient: FC<GalleryClientProps> = ({ images }) => {
  const [currentOffset, setCurrentOffset] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const total = images.length
  const pageSize = 4
  const maxPage = Math.max(0, Math.ceil(total / pageSize) - 1)
  const currentPage = Math.floor(currentOffset / pageSize)

  // Build slice of exactly 4 thumbnails, wrapping around gallery length
  const pageSlice: GalleryImage[] = []
  for (let i = 0; i < pageSize; i++) {
    const idx = (currentOffset + i) % total
    pageSlice.push(images[idx])
  }

  const goPrev = () => {
    if (total <= 1) return
    const newIdx = (activeIndex - 1 + total) % total
    setActiveIndex(newIdx)
    if (!lightboxOpen) {
      const newPage = Math.floor(newIdx / pageSize)
      setCurrentOffset(newPage * pageSize)
    }
  }

  const goNext = () => {
    if (total <= 1) return
    const newIdx = (activeIndex + 1) % total
    setActiveIndex(newIdx)
    if (!lightboxOpen) {
      const newPage = Math.floor(newIdx / pageSize)
      setCurrentOffset(newPage * pageSize)
    }
  }

  const getFitModeClass = (fit?: string) => {
    switch (fit) {
      case 'contain':
        return styles.panelImageContain
      case 'fill':
        return styles.panelImageFill
      case 'scale-down':
        return styles.panelImageScaleDown
      case 'none':
        return styles.panelImageNone
      default:
        return styles.panelImageCover
    }
  }

  // Map panels
  const panelClasses = [grid.panel1, grid.panel2, grid.panel3, grid.panel4, grid.panel5]

  const renderImage = (img: GalleryImage | null, extraClass = '', lightbox = false) => {
    if (!img) return null
    return (
      <img
        src={lightbox ? urlFor(img).url() : urlFor(img).width(1024).height(800).url()}
        alt={img.alt || 'Gallery'}
        className={`${lightbox ? '' : styles.panelImage} ${getFitModeClass(img.fitMode)} ${extraClass}`}
        style={lightbox ? { maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' } : undefined}
      />
    )
  }

  const openLightbox = (idx: number) => {
    setActiveIndex(idx)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      {panelClasses.map((cls, idx) => {
        if (idx === 0) {
          // Active image panel
          const img = images[activeIndex] || images[0]
          return (
            <section key={cls} className={`${styles.panelCommon} ${styles.panelImageVariant} ${grid.panel} ${cls}`} onClick={() => openLightbox(activeIndex)}>
              {renderImage(img)}
            </section>
          )
        }
        // Thumbnails panels
        const thumbIdx = idx - 1 // 0..3
        const img = pageSlice[thumbIdx] || null
        const globalIndex = currentOffset + thumbIdx
        const isActive = globalIndex === activeIndex

        const isFirstThumb = idx === 1
        const isLastThumb = idx === 4
        return (
          <section
            key={cls}
            className={`${styles.panelCommon} ${styles.panelImageVariant} ${grid.panel} ${cls}`}
            style={{ cursor: 'pointer', outline: isActive ? '2px solid #fff' : undefined, position: 'relative', overflow: 'visible' }}
            onClick={() => setActiveIndex(globalIndex)}
            role="button"
            aria-label={`Show image ${globalIndex + 1}`}
          >
            {renderImage(img, isActive ? grid.activeThumb : '')}
            {total > pageSize && isFirstThumb && (
              <button className={`${grid.thumbArrowLeft}`} aria-label="Previous set" onClick={goPrev}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                  <polyline points="10,0 2,8 10,16" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </button>
            )}
            {total > pageSize && isLastThumb && (
              <button className={`${grid.thumbArrowRight}`} aria-label="Next set" onClick={goNext}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                  <polyline points="4,0 12,8 4,16" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </button>
            )}
          </section>
        )
      })}

      {/* no external arrows */}

      {lightboxOpen && typeof window !== 'undefined' &&
        createPortal(
          <div>
            <div className={lightboxStyles.backdrop} onClick={closeLightbox} />
            <div className={lightboxStyles.container} role="dialog" aria-modal="true">
              <div className={`${styles.panelCommon} ${styles.panelImageVariant} ${lightboxStyles.imageWrapper}`}>
                {/* Navigation arrows */}
                {total > 1 && (
                  <>
                    <button
                      className={`${lightboxStyles.nav} ${lightboxStyles.arrowLeft}`}
                      aria-label="Previous image"
                      onClick={goPrev}
                    >
                      ‹
                    </button>
                    <button
                      className={`${lightboxStyles.nav} ${lightboxStyles.arrowRight}`}
                      aria-label="Next image"
                      onClick={goNext}
                    >
                      ›
                    </button>
                  </>
                )}
                {renderImage(images[activeIndex], '', true)}
                <button className={lightboxStyles.close} aria-label="Close" onClick={closeLightbox}>×</button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
