import React from 'react'
import { SiteGridLayout } from '@/components/SiteGridLayout'
import styles from '@/styles/SiteGrid.module.css'
import CartToggleButton from '@/components/CartToggleButton'
import AppleMusicPlayerClient from '@/components/AppleMusicPlayerClient'
import { homeQuery, tourDatesQuery } from 'lib/sanity-queries'
import { fetchSanityDocument, fetchSanityDocuments } from 'lib/sanity-fetch'
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
  heroImage: any
  heroHeading?: string
  heroSubheading?: string
}

export default async function HomePage() {
  const [{ data: homeData }] = await Promise.all([
    fetchSanityDocument<HomePageData>(homeQuery),
  ])

  // Fetch next five upcoming tour dates
  const { data: tourDates } = await fetchSanityDocuments<TourDate>(`
    ${tourDatesQuery} [status == "upcoming" && date >= now()] | order(date asc)[0...5]
  `)

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
            className={styles.panelImage}
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
            <p className={styles.tourLine1}>upcoming tour</p>
          </header>
          <ul className={styles.tourList}>
            {tourDates?.map((td: TourDate) => (
              <li key={td._id}>
                <span className={styles.date}>{new Date(td.date).toLocaleDateString()}</span>
                <span className={styles.info}>{`${td.city}, ${td.country} – ${td.venue}`}</span>
                {td.ticketUrl && (
                  <a href={td.ticketUrl} className={styles.tix} target="_blank" rel="noreferrer">tickets</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Music player panel */}
      <nav className={`${styles.panelCommon} ${styles.nav}`}>
        <AppleMusicPlayerClient />
      </nav>
    </SiteGridLayout>
  )
}
