import React from 'react'
import { stegaClean } from 'next-sanity'
// Disable ISR on this page so that Sanity Presentation overlays work correctly
export const revalidate = 0
import { SiteGridLayout } from '@/components/SiteGridLayout'
import styles from '@/styles/SiteGrid.module.css'
import CartToggleButton from '@/components/CartToggleButton'
import AppleMusicPlayerClient from '@/components/AppleMusicPlayerClient'
import { homeQuery, tourQuery, tourDatesQuery } from 'lib/sanity-queries'
import TourDatesPanel from '@/components/TourDatesPanel'
import { fetchSanityDocuments, fetchSanityDocument } from 'lib/sanity-fetch'
import { urlFor } from '@/sanity/lib/image'

interface TourDate {
  _id: string
  date: string
  city: string
  country: string
  venue: string
  ticketUrl?: string
}

interface HomePageData {
  heroImage: {
    _type: 'image'
    asset: any
    alt?: string
    fitMode?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  }
  heroHeading?: string
  heroSubheading?: string
}

export default async function HomePage() {
  const [ { data: homeData }, { data: tourData }, { data: tourDates } ] = await Promise.all([
    fetchSanityDocument<HomePageData>(homeQuery),
    fetchSanityDocument<{ introHeading?: string }>(tourQuery),
    fetchSanityDocuments<TourDate>(`${tourDatesQuery} | order(date asc)`),
  ])

  // Map fit mode to CSS class after stripping zero-width stega characters
  const getFitModeClass = (rawFit?: string) => {
    const fitMode = stegaClean(rawFit || 'cover') as string

    switch (fitMode) {
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

  return (
    <SiteGridLayout>
      <div className={styles.cartWrapper}>
        <CartToggleButton />
      </div>

      {/* Hero Panel */}
      <div className={styles.heroWrapper}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {homeData?.heroImage && (
          <img
            src={urlFor(homeData.heroImage).width(1024).height(800).url()}
            alt={homeData.heroImage.alt || 'Hero'}
            className={`${styles.panelImage} ${getFitModeClass(homeData.heroImage.fitMode)}`}
          />
        )}
        <section className={`${styles.panelCommon} ${styles.panelImageVariant} ${styles.hero}`}>
          <h2>{homeData?.heroHeading || 'Hero Area'}</h2>
        </section>
      </div>

      {/* Tour info panel */}
      <section className={`${styles.panelCommon} ${styles.panel}`}>
        <div className={`${styles.panelBox} ${styles.tourBox}`}>
          <header className={styles.tourHeader}>
            <p className={styles.tourLine1}>{tourData?.introHeading || 'upcoming tour'}</p>
          </header>
          <TourDatesPanel dates={tourDates} compact />
        </div>
      </section>

      {/* Music player panel */}
      <nav className={`${styles.panelCommon} ${styles.nav}`}>
        <AppleMusicPlayerClient />
      </nav>
    </SiteGridLayout>
  )
}
