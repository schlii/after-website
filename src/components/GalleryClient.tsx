"use client"

import { useState, FC } from 'react'
import styles from '@/styles/SiteGrid.module.css'
import grid from '@/app/gallery/GalleryGrid.module.css'
import { urlFor } from '@/sanity/lib/image'
import playerStyles from '@/components/AppleMusicPlayer.module.css'

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
    if (total <= pageSize) return
    const newPage = currentPage === 0 ? maxPage : currentPage - 1
    const newOffset = newPage * pageSize
    setCurrentOffset(newOffset)
    setActiveIndex(newOffset) // default to first img of new page
  }

  const goNext = () => {
    if (total <= pageSize) return
    const newPage = currentPage === maxPage ? 0 : currentPage + 1
    const newOffset = newPage * pageSize
    setCurrentOffset(newOffset)
    setActiveIndex(newOffset)
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

  const renderImage = (img: GalleryImage | null, extraClass = '') => {
    if (!img) return null
    return (
      <img
        src={urlFor(img).width(1024).height(800).url()}
        alt={img.alt || 'Gallery'}
        className={`${styles.panelImage} ${getFitModeClass(img.fitMode)} ${extraClass}`}
      />
    )
  }

  return (
    <>
      {panelClasses.map((cls, idx) => {
        if (idx === 0) {
          // Active image panel
          const img = images[activeIndex] || images[0]
          return (
            <section key={cls} className={`${styles.panelCommon} ${styles.panelImageVariant} ${grid.panel} ${cls}`}>
              {renderImage(img)}
            </section>
          )
        }
        // Thumbnails panels
        const thumbIdx = idx - 1 // 0..3
        const img = pageSlice[thumbIdx] || null
        const globalIndex = currentOffset + thumbIdx
        const isActive = globalIndex === activeIndex

        return (
          <section
            key={cls}
            className={`${styles.panelCommon} ${styles.panelImageVariant} ${grid.panel} ${cls}`}
            style={{ cursor: 'pointer', outline: isActive ? '2px solid #fff' : undefined }}
            onClick={() => setActiveIndex(globalIndex)}
            role="button"
            aria-label={`Show image ${globalIndex + 1}`}
          >
            {renderImage(img, isActive ? grid.activeThumb : '')}
          </section>
        )
      })}

      {total > pageSize && (
        <>
          <button
            className={`${playerStyles.control} ${grid.arrowPrev}`}
            aria-label="Previous"
            onClick={goPrev}
            style={{ position: 'absolute', left: '11cqw', top: '36rem', transform: 'translateY(-50%)' }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <polygon points="14,0 6,8 14,16" />
              <rect x="0" y="0" width="2" height="16" />
            </svg>
          </button>
          <button
            className={`${playerStyles.control} ${grid.arrowNext}`}
            aria-label="Next"
            onClick={goNext}
            style={{ position: 'absolute', right: '11cqw', top: '36rem', transform: 'translateY(-50%)' }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <polygon points="0,0 8,8 0,16" />
              <rect x="12" y="0" width="2" height="16" />
            </svg>
          </button>
        </>
      )}
    </>
  )
}
