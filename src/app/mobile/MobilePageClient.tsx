'use client'

import styles from './MobilePage.module.css'
import site from '@/styles/SiteGrid.module.css'
// mobile panel chrome class
import AppleMusicPlayerClient from '@/components/AppleMusicPlayerClient'
import TourDatesPanel from '@/components/TourDatesPanel'
import { ProductGrid } from '@/components/ProductGrid'
import { ContactForm } from '@/components/ContactForm'
import React from 'react'

import type { PlainProduct } from '../../../types/PlainProduct'
import type { TourDateEntry } from '@/components/TourDatesPanel'
import MobileMerchCarousel from '@/components/MobileMerchCarousel'
import MobileCartBar from '@/components/MobileCartBar'

interface Props {
  heroImageUrl?: string | null
  heroImageAlt?: string | null
  tourHeading?: string | null
  tourDates: TourDateEntry[] | null
  merch: PlainProduct[]
  aboutText: string[]
}

const MobilePageClient: React.FC<Props> = ({ heroImageUrl, heroImageAlt, tourHeading, tourDates, merch, aboutText }) => {
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
          <h2 className={styles.sectionHeading}>{tourHeading || 'upcoming tour'}</h2>
          <TourDatesPanel dates={tourDates} compact />
        </div>
      </div>

      {/* Merch */}
      <div className={styles.mobilePanel}>
        <div className={`${site.panelBox} ${styles.grainBox}`}>
          <MobileMerchCarousel products={merch} />
        </div>
      </div>

      {/* Contact */}
      <div className={`${styles.mobilePanel} ${styles.mobilePanelGray}`}>
        <div className={`${site.panelBox} ${styles.grainBox}`}>
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <footer style={{textAlign:'center', fontFamily:'PixdorTwo, var(--font-mono)', color:'#000', fontSize:'1rem', marginTop:'-1.2rem'}}>
        <p style={{margin:'0'}}>© After 2025</p>
        <p style={{margin:0}}>
          Website by <a href="https://instagram.com/bicflame" target="_blank" rel="noreferrer" style={{textDecoration:'underline', color:'#000'}}>bicflame</a>
        </p>
      </footer>

      <MobileCartBar />
    </main>
    </>
  )
}

export default MobilePageClient