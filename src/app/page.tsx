import { fetchSanityDocuments, fetchSanityDocument } from '../../lib/sanity-server'
import { newsPostsQuery, tourDatesQuery, siteSettingsQuery } from '../../lib/sanity-queries'
import type { NewsPost, TourDate, SiteSettings } from '../../types/sanity'

export default async function Home() {
  // Fetch data in parallel
  const [siteSettings, news, tourDates] = await Promise.all([
    fetchSanityDocument<SiteSettings>(siteSettingsQuery),
    fetchSanityDocuments<NewsPost>(newsPostsQuery),
    fetchSanityDocuments<TourDate>(tourDatesQuery)
  ])

  // Filter upcoming tour dates
  const upcomingShows = tourDates.data?.filter(date => date.status === 'upcoming') || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold">AFTER</h1>
          <p className="text-xl md:text-2xl">
            {siteSettings.data?.about_text || 'Experience the sound of tomorrow'}
          </p>
          {siteSettings.data?.social_links && (
            <div className="mt-8 space-x-4">
              {siteSettings.data.social_links.map(link => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-3xl font-bold">Latest News</h2>
        <div>
          {news.data ? (
            news.data.map(post => (
              <article key={post._id}>
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                <h3>{post.title}</h3>
                {/* We'll implement the image component later */}
              </article>
            ))
          ) : (
            <p>Stay tuned for the latest updates from After.</p>
          )}
        </div>
      </section>

      {/* Tour Dates Section */}
      <section>
        <h2 className="text-3xl font-bold">Upcoming Shows</h2>
        <div>
          {upcomingShows.length > 0 ? (
            upcomingShows.map(show => (
              <article key={show._id}>
                <time dateTime={show.date}>{new Date(show.date).toLocaleDateString()}</time>
                <h3>{show.venue}</h3>
                <p>{show.city}</p>
                {show.ticket_link && (
                  <a href={show.ticket_link} target="_blank" rel="noopener noreferrer">
                    Get Tickets
                  </a>
                )}
              </article>
            ))
          ) : (
            <p>Check back soon for upcoming shows.</p>
          )}
        </div>
      </section>
    </div>
  )
}
