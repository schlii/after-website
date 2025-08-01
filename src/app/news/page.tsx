import { fetchSanityDocuments } from '../../../lib/sanity-server'
import { newsPostsQuery } from '../../../lib/sanity-queries'
import type { NewsPost } from '../../../types/sanity'

export default async function NewsPage() {
  // Fetch all news posts
  const { data: posts, error } = await fetchSanityDocuments<NewsPost>(newsPostsQuery)

  // Sort posts by date, most recent first
  const sortedPosts = posts?.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ) || []

  return (
    <div className="min-h-screen">
      <section>
        <h1>Latest News</h1>

        {error && (
          <div role="alert">
            <p>Unable to load news posts. Please try again later.</p>
          </div>
        )}

        {sortedPosts.length > 0 ? (
          <div>
            {sortedPosts.map(post => (
              <article key={post._id}>
                <header>
                  <h2>
                    <a href={`/news/${post.slug}`}>
                      {post.title}
                    </a>
                  </h2>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </header>
                {/* We'll implement the image component later in the styling phase */}
                {post.featured_image && (
                  <div>
                    {/* Image placeholder */}
                  </div>
                )}
                <div>
                  {/* For now, we'll just show the first few lines of content */}
                  {typeof post.content === 'string' 
                    ? post.content.slice(0, 200) + '...'
                    : 'Read more'}
                </div>
                <footer>
                  <a href={`/news/${post.slug}`}>
                    Read more
                  </a>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <p>No news posts available.</p>
        )}
      </section>
    </div>
  )
}