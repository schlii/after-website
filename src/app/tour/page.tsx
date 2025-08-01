import { fetchSanityDocuments } from '../../../lib/sanity-server'
import { tourDatesQuery } from '../../../lib/sanity-queries'
import type { TourDate } from '../../../types/sanity'

export default async function TourPage() {
  // Fetch all tour dates
  const { data: tourDates, error } = await fetchSanityDocuments<TourDate>(tourDatesQuery)

  // Separate upcoming and past shows
  const now = new Date()
  const upcomingShows = tourDates?.filter(show => new Date(show.date) >= now) || []
  const pastShows = tourDates?.filter(show => new Date(show.date) < now) || []

  // Sort shows by date
  upcomingShows.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  pastShows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Most recent first

  return (
    <div className="min-h-screen">
      <section>
        <h1>Tour Dates</h1>

        {error && (
          <div role="alert">
            <p>Unable to load tour dates. Please try again later.</p>
          </div>
        )}

        {/* Upcoming Shows */}
        <div>
          <h2>Upcoming Shows</h2>
          {upcomingShows.length > 0 ? (
            <div>
              {upcomingShows.map(show => (
                <article key={show._id}>
                  <time dateTime={show.date}>
                    {new Date(show.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <h3>{show.venue}</h3>
                  <p>{show.city}</p>
                  <div>
                    {show.status === 'upcoming' && show.ticketUrl && (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Tickets
                      </a>
                    )}
                    {show.status === 'sold-out' && (
                      <span>Sold Out</span>
                    )}
                    {show.status === 'cancelled' && (
                      <span>Cancelled</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>No upcoming shows scheduled. Check back soon!</p>
          )}
        </div>

        {/* Past Shows */}
        <div>
          <h2>Past Shows</h2>
          {pastShows.length > 0 ? (
            <div>
              {pastShows.map(show => (
                <article key={show._id}>
                  <time dateTime={show.date}>
                    {new Date(show.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <h3>{show.venue}</h3>
                  <p>{show.city}</p>
                </article>
              ))}
            </div>
          ) : (
            <p>No past shows to display.</p>
          )}
        </div>
      </section>
    </div>
  )
}