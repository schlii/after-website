'use client'

import styles from './MobilePage.module.css'
import site from '@/styles/SiteGrid.module.css'
// mobile panel chrome class
import AppleMusicPlayerClient from '@/components/AppleMusicPlayerClient'
import TourDatesPanel from '@/components/TourDatesPanel'
import { ProductGrid } from '@/components/ProductGrid'
import { ContactForm } from '@/components/ContactForm'
import React from 'react'

import type { PlainProduct } from '@/types/PlainProduct'
import type { TourDateEntry } from '@/components/TourDatesPanel'
import MobileMerchCarousel from '@/components/MobileMerchCarousel'
import MobileCartBar from '@/components/MobileCartBar'

interface Props {
  heroImageUrl?: string | null
  heroImageAlt?: string | null
  tourDates: TourDateEntry[] | null
  merch: PlainProduct[]
  aboutText: string[]
}

const MobilePageClient: React.FC<Props> = ({ heroImageUrl, heroImageAlt, tourDates, merch, aboutText }) => {
  return (
    <>
    <main className={styles.container}>
      {/* Heading */}
      <h1 className={styles.heading}>After</h1>

      {/* Music Player */}
      <div className={`${styles.mobilePanel} ${styles.mobilePanelBlue}`}>
        <AppleMusicPlayerClient />
      </div>

      {/* Hero Image */}
      {heroImageUrl && (
        <img src={heroImageUrl} alt={heroImageAlt ?? 'Hero'} className={styles.heroImage} />
      )}

      {/* Tour Dates */}
      <div className={`${styles.mobilePanel} ${styles.mobilePanelGray}`}>
        <div className={`${site.panelBox} ${styles.grainBox}`}>
          <h2 className={styles.sectionHeading}>tour w/ kitty craft</h2>
          <TourDatesPanel dates={tourDates} compact />
        </div>
      </div>

      {/* Merch */}
      <div className={styles.mobilePanel}>
        <div className={`${site.panelBox} ${styles.grainBox}`}>
          <MobileMerchCarousel products={merch} />
        </div>
      </div>

      {/* About */}
      {aboutText.length > 0 && (
        <div className={styles.mobilePanel}>
          {aboutText.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      )}

      {/* Contact */}
      <div className={`${styles.mobilePanel} ${styles.mobilePanelGray}`}>
        <div className={`${site.panelBox} ${styles.grainBox}`}>
          <h2 className={styles.sectionHeading}>contact us</h2>
          <ContactForm />
        </div>
      </div>
    </main>
    <MobileCartBar />
    </>
  )
}

export default MobilePageClient
