import { fetchSanityDocuments, fetchSanityDocument } from '../../lib/sanity-server'
import { newsPostsQuery, tourDatesQuery, siteSettingsQuery } from '../../lib/sanity-queries'
import type { NewsPost, TourDate, SiteSettings } from '../../types/sanity'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { NewsSection } from '@/components/NewsSection/NewsSection'
import { TourSection } from '@/components/TourSection/TourSection'

export default async function Home() {
  // Fetch data in parallel
  const [siteSettings, news, tourDates] = await Promise.all([
    fetchSanityDocument<SiteSettings>(siteSettingsQuery),
    fetchSanityDocuments<NewsPost>(newsPostsQuery),
    fetchSanityDocuments<TourDate>(tourDatesQuery)
  ])

  return (
    <div className="min-h-screen">
      <HeroSection siteSettings={siteSettings.data} />
      <NewsSection news={news.data} />
      <TourSection tourDates={tourDates.data} />
    </div>
  )
}
