import { type FC } from 'react'
import Link from 'next/link'
import { type TourDate } from '../../../types/sanity'

interface TourSectionProps {
  tourDates: TourDate[] | null
}

export const TourSection: FC<TourSectionProps> = ({ tourDates }) => {
  const upcomingShows = tourDates?.filter(date => date.status === 'upcoming') || []

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Shows</h2>
          <Link 
            href="/tour" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            View All Shows
          </Link>
        </div>
        <div className="space-y-6">
          {upcomingShows.length > 0 ? (
            upcomingShows.slice(0, 5).map(show => (
              <article 
                key={show._id} 
                className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <time dateTime={show.date} className="text-sm text-gray-500 block mb-1">
                    {new Date(show.date).toLocaleDateString()}
                  </time>
                  <h3 className="text-xl font-semibold mb-1">{show.venue}</h3>
                  <p className="text-gray-600">{`${show.city}, ${show.country}`}</p>
                </div>
                {show.ticketUrl && (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-0 inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Get Tickets
                  </a>
                )}
              </article>
            ))
          ) : (
            <p className="text-gray-600 text-center py-8">Check back soon for upcoming shows.</p>
          )}
        </div>
      </div>
    </section>
  )
}