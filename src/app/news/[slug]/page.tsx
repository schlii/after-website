import { fetchSanityDocument } from '../../../../lib/sanity-server'
import { newsPostBySlugQuery } from '../../../../lib/sanity-queries'
import type { NewsPost } from '../../../../types/sanity'

interface NewsPostPageProps {
  params: {
    slug: string
  }
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  // Fetch the specific post by slug
  const { data: post, error } = await fetchSanityDocument<NewsPost>(
    newsPostBySlugQuery,
    { slug: params.slug }
  )

  // Handle 404 case
  if (!post && !error) {
    return (
      <div>
        <h1>Post Not Found</h1>
        <p>The requested news post could not be found.</p>
        <a href="/news">Back to News</a>
      </div>
    )
  }

  // Handle error case
  if (error) {
    return (
      <div role="alert">
        <h1>Error</h1>
        <p>Unable to load the news post. Please try again later.</p>
        <a href="/news">Back to News</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <article>
        <header>
          <h1>{post.title}</h1>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>

        {post.featured_image && (
          <div>
            {/* We'll implement the image component later in the styling phase */}
          </div>
        )}

        <div>
          {/* For now, we'll just show the content as plain text */}
          {/* Later we'll implement proper rendering of the portable text */}
          {typeof post.content === 'string' 
            ? post.content
            : JSON.stringify(post.content)}
        </div>

        <footer>
          <a href="/news">Back to News</a>
        </footer>
      </article>
    </div>
  )
}

// Generate static params for all news posts at build time
export async function generateStaticParams() {
  const { data: posts } = await fetchSanityDocuments<NewsPost>(newsPostsQuery)
  
  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}