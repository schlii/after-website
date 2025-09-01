'use client'

import styles from './MobilePage.module.css'
import site from '@/styles/SiteGrid.module.css'
// mobile panel chrome class
import AppleMusicPlayerClient from '@/components/AppleMusicPlayerClient'
import TabbedInfoPanel from '@/components/TabbedInfoPanel'
import { ProductGrid } from '@/components/ProductGrid'
import { ContactForm } from '@/components/ContactForm'
import React from 'react'

import type { PlainProduct } from '../../../types/PlainProduct'
import type { TourDateEntry } from '@/components/TourDatesPanel'
import type { NewsListItem } from '@/components/TabbedInfoPanel'
import MobileMerchStack from '@/components/MobileMerchStack'
import MobileCartBar from '@/components/MobileCartBar'
import MobileGalleryCarousel from '@/components/MobileGalleryCarousel'

interface Props {
  heroImageUrl?: string | null
  heroImageAlt?: string | null
  tourHeading?: string | null
  tourDates: TourDateEntry[] | null
  merch: PlainProduct[]
  aboutText: string[]
  galleryImages: any[]
  newsPosts: NewsListItem[] | null
  newsRich: any[] | null
}

const MobilePageClient: React.FC<Props> = ({ heroImageUrl, heroImageAlt, tourHeading, tourDates, merch, aboutText, galleryImages, newsPosts, newsRich }) => {
  return (
    <>
    <main className={styles.container}>
      {/* Heading SVG */}
      <img src="/after-heading-vec-black.svg" alt="After logo" className={styles.headingImg} />

      {/* Music Player */}
      <div className={`${styles.mobilePanel} ${styles.mobilePanelBlue}`}>
        <AppleMusicPlayerClient />
      </div>

      {/* Outbound GIF banner */}
      <img src="/outboundgif.gif" alt="" className={styles.mobileBanner} />

      {/* Hero Image */}
      {heroImageUrl && (
        <img src={heroImageUrl} alt={heroImageAlt ?? 'Hero'} className={styles.heroImage} />
      )}

      {/* Tour Dates */}
      <div className={`${styles.mobilePanel} ${styles.mobilePanelGray}`}>
        <div className={`${site.panelBox} ${styles.grainBox}`}>
          <TabbedInfoPanel tourDates={tourDates} newsPosts={newsPosts} newsRich={newsRich} compact />
        </div>
      </div>

      {/* Gallery Carousel */}
      {galleryImages?.length ? (
        <MobileGalleryCarousel images={galleryImages} />
      ) : null}

      {/* Merch */}
      <div className={styles.mobilePanel}>
        <div className={`${site.panelBox} ${styles.grainBox}`}>
          <MobileMerchStack products={merch} />
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