import { groq } from 'next-sanity'

// Tour Dates
export const tourDatesQuery = groq`
  *[_type == "tourDate"] | order(date asc) {
    _id,
    title,
    venue,
    date,
    city,
    country,
    ticketUrl,
    status
  }
`

// News Posts
export const newsPostsQuery = groq`
  *[_type == "news-post"] | order(date desc) {
    _id,
    title,
    content,
    date,
    "slug": slug.current,
    featured_image
  }
`

// Single News Post by Slug
export const newsPostBySlugQuery = groq`
  *[_type == "news-post" && slug.current == $slug][0] {
    _id,
    title,
    content,
    date,
    featured_image
  }
`

// Songs
export const songsQuery = groq`
  *[_type == "song"] | order(title asc) {
    _id,
    title,
    artist,
    duration,
    itunesPreviewUrl,
    spotifyUrl,
    album_art
  }
`

// Band Members
export const bandMembersQuery = groq`
  *[_type == "band-member"] {
    _id,
    name,
    role,
    bio,
    image
  }
`

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroImage,
    aboutText,
    socialLinks
  }
`

// Contact Submissions
export const contactSubmissionsQuery = groq`
  *[_type == "contact-submission"] | order(date desc) {
    _id,
    name,
    email,
    message,
    date,
    status
  }
`