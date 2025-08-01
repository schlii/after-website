import { type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type NewsPost } from '../../../types/sanity'
import { urlForImage } from '../../../lib/sanity-server'

interface NewsSectionProps {
  news: NewsPost[] | null
}

export const NewsSection: FC<NewsSectionProps> = ({ news }) => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news ? (
            news.map(post => (
              <article key={post._id} className="group">
                <Link href={`/news/${post.slug}`}>
                  <div className="relative aspect-video mb-4 overflow-hidden">
                    <Image
                      src={urlForImage(post.featured_image).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <time dateTime={post.date} className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  <h3 className="text-xl font-semibold mt-2 group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
              </article>
            ))
          ) : (
            <p className="text-gray-600">Stay tuned for the latest updates from After.</p>
          )}
        </div>
      </div>
    </section>
  )
}