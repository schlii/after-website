import { type FC, type ReactNode } from 'react'
import Link from 'next/link'
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
  return (
    <main className={styles.pageWrapper}>
      <header className={styles.siteHeading}>After</header>
      <div className={styles.siteContainer}>{children}</div>
      <nav className={styles.siteNav}>
        <ul className={styles.navLinks}>
          {[
            { href: '/', label: 'home' },
            { href: '/tour', label: 'tour' },
            { href: '/merch', label: 'merch' },
            { href: '/music', label: 'music' },
            { href: '/contact', label: 'contact' },
            { href: '/about', label: 'about' },
          ].map(({ href, label }) => (
            <li key={label}>
              <Link href={href} className={styles.navLink} prefetch>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
