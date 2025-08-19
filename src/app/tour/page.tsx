import { SiteGridLayout } from '@/components/SiteGridLayout'
import pgStyles from '@/styles/SiteGrid.module.css'
import grid from './TourGrid.module.css'

import { fetchSanityDocument, fetchSanityDocuments } from 'lib/sanity-fetch'
import { tourQuery, tourDatesQuery } from 'lib/sanity-queries'
import { urlFor } from '@/sanity/lib/image'

interface TourPageData {
  introHeading?: string
  photoImages?: any[]
}

interface TourDate {
  _id: string
  date: string
  city: string
  country: string
  venue: string
  ticketUrl?: string
}

export default async function TourPage() {
  const [{ data: tourData }, { data: tourDates }] = await Promise.all([
    fetchSanityDocument<TourPageData>(tourQuery),
    fetchSanityDocuments<TourDate>(`${tourDatesQuery} | order(date asc)`),
  ])

  // Ensure we always have an array of exactly 15 entries (fill with nulls if less)
  const photoImages = (tourData?.photoImages || []).slice(0, 15)
  while (photoImages.length < 15) photoImages.push(null)

  const photoPanelClasses = [
    grid.photoPanel1,
    grid.photoPanel2,
    grid.photoPanel3,
    grid.photoPanel4,
    grid.photoPanel5,
    grid.photoPanel6,
    grid.photoPanel7,
    grid.photoPanel8,
    grid.photoPanel9,
    grid.photoPanel10,
    grid.photoPanel11,
    grid.photoPanel12,
    grid.photoPanel13,
    grid.photoPanel14,
    grid.photoPanel15,
  ]

  return (
    <SiteGridLayout>
      {/* Tour info panel – shares styling with home page */}
      <section className={`${pgStyles.panelCommon} ${grid.tourInfoPanel}`}>
        <div className={`${pgStyles.panelBox} ${pgStyles.tourBox}`}>
          <header className={pgStyles.tourHeader}>
            <p className={pgStyles.tourLine1}>{tourData?.introHeading || 'upcoming tour'}</p>
          </header>
          <ul className={pgStyles.tourList}>
            {tourDates?.map(td => (
              <li key={td._id}>
                <span className={pgStyles.date}>{new Date(td.date).toLocaleDateString()}</span>
                <span className={pgStyles.info}>{`${td.city}, ${td.country} – ${td.venue}`}</span>
                {td.ticketUrl && (
                  <a
                    href={td.ticketUrl}
                    className={pgStyles.tix}
                    target="_blank"
                    rel="noreferrer"
                  >
                    tickets
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photo panels */}
      {photoPanelClasses.map((cls, idx) => (
        <section
          key={cls}
          className={`${pgStyles.panelCommon} ${pgStyles.panelImageVariant} ${grid.panel} ${cls}`}
        >
          {photoImages[idx] && (
            <img
              src={urlFor(photoImages[idx]).width(600).height(800).url()}
              alt={photoImages[idx].alt || 'Tour'}
              className={pgStyles.panelImage}
            />
          )}
        </section>
      ))}
    </SiteGridLayout>
  )
}