import React from 'react'
import { stegaClean } from 'next-sanity'
// Disable ISR on this page so that Sanity Presentation overlays work correctly
export const revalidate = 0
import { SiteGridLayout } from '@/components/SiteGridLayout'
import styles from '@/styles/SiteGrid.module.css'
import CartToggleButton from '@/components/CartToggleButton'
import AppleMusicPlayerClient from '@/components/AppleMusicPlayerClient'
import { homeQuery, tourQuery, tourDatesQuery, newsPageQuery } from 'lib/sanity-queries'
import TabbedInfoPanel from '@/components/TabbedInfoPanel'
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
    linkUrl?: string
  }
  heroHoverGif?: {
    asset: any
  }
  heroHeading?: string
  heroSubheading?: string
}

export default async function HomePage() {
  const [ { data: homeData }, { data: tourData }, { data: tourDates }, { data: newsPage } ] = await Promise.all([
    fetchSanityDocument<HomePageData>(homeQuery),
    fetchSanityDocument<{ introHeading?: string }>(tourQuery),
    fetchSanityDocuments<TourDate>(`${tourDatesQuery} | order(date asc)`),
    fetchSanityDocument<{ panelHeading?: string; panelContent: any }>(newsPageQuery),
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

      {/* Mobile banner above hero */}
      <img src="/outboundgif.gif" alt="" className={styles.mobileBanner} />

      {/* Hero Panel */}
      <div className={styles.heroWrapper}>
        {homeData?.heroImage && (
          <>
            <img
              src={urlFor(homeData.heroImage).width(1024).height(800).url()}
              alt={homeData.heroImage.alt || 'Hero'}
              className={`${styles.panelImage} ${getFitModeClass(homeData.heroImage.fitMode)}`}
            />
            {homeData.heroHoverGif && (
              <img
                src={urlFor(homeData.heroHoverGif).url()}
                alt=""
                className={styles.hoverGif}
              />
            )}

            {homeData.heroImage.linkUrl && (
              <a
                href={homeData.heroImage.linkUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.heroLink}
              />
            )}
          </>
        )}
        <section className={`${styles.panelCommon} ${styles.panelImageVariant} ${styles.hero}`}>
          <h2>{homeData?.heroHeading || 'Hero Area'}</h2>
        </section>
      </div>

      {/* Tour info panel */}
      <section className={`${styles.panelCommon} ${styles.panel}`}>
        <div className={`${styles.panelBox} ${styles.tourBox}`}>
          <TabbedInfoPanel tourDates={tourDates} newsRich={newsPage?.panelContent || null} compact />
        </div>
      </section>

      {/* Music player panel */}
      <nav className={`${styles.panelCommon} ${styles.nav}`}>
        <AppleMusicPlayerClient />
      </nav>
    </SiteGridLayout>
  )
}
