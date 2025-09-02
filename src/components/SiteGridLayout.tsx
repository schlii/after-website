'use client'

import { type FC, type ReactNode, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/SiteGrid.module.css'

interface SiteGridLayoutProps {
  /**
   * Elements rendered inside the fixed 12×36 grid container.
   * Each child should assign its own grid-column / grid-row via CSS.
   */
  children: ReactNode
}

/**
 * SiteGridLayout
 * ----------------
 * Wraps content in the 1024 × 800 grid defined in `Playground.module.css`.
 * Re-use this component on every page to guarantee consistent panel sizing
 * while allowing each route to decide which elements occupy the grid.
 */
export const SiteGridLayout: FC<SiteGridLayoutProps> = ({ children }) => {
  const scaleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const designW = 1024
    const designH = 1065
    const margin = 1.05 // 5 % breathing room

    const applyScale = () => {
      const sX = window.innerWidth / designW
      const sY = window.innerHeight / (designH * margin)
      const scale = Math.min(sX, sY, 1)
      if (scaleRef.current !== null) {
        const barH = 56 // collapsed mobile cart bar height on desktop
        const extra = 40 // move slightly lower on laptops
        const vOffset = Math.max((window.innerHeight - designH * scale - barH) / 2 + extra, 0)
        scaleRef.current.style.transform = `translateX(-50%) scale(${scale})`
        scaleRef.current.style.top = `${vOffset}px`
      }
    }

    applyScale()
    window.addEventListener('resize', applyScale)
    return () => { window.removeEventListener('resize', applyScale) }
  }, [])

  return (
    <main className={styles.pageWrapper}>
      <div ref={scaleRef} className={styles.siteScale}>
      <header className={styles.siteHeading}>
        <Image
          src="/after-heading-vec-black.svg"
          alt="After logo"
          width={1024}
          height={200}
          priority
          className={styles.siteHeadingImage}
        />
      </header>
      <div className={styles.siteContainer}>{children}</div>
      <nav className={styles.siteNav}>
        <ul className={styles.navLinks}>
          {[
            { href: '/', label: 'home' },
            { href: '/tour', label: 'tour' },
            { href: '/merch', label: 'merch' },
            { href: '/music', label: 'music' },
            { href: '/gallery', label: 'gallery' },
            { href: '/contact', label: 'contact' },
          ].map(({ href, label }) => (
            <li key={label}>
              <Link href={href} className={styles.navLink} prefetch>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className={styles.siteFooter}>
        <p>© After 2025</p>
        <p>
          Website by <a href="https://instagram.com/bicflame" target="_blank" rel="noreferrer">bicflame</a>
        </p>
      </footer>
      </div>
    </main>
  )
}
