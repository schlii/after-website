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

// Global
export const globalQuery = groq`
  *[_type == "global"][0] {
    siteTitle,
    tagline,
    socialLinks,
    seoDescription,
    ogImage
  }
`

// Home Page
export const homeQuery = groq`
  *[_type == "home"][0] {
    heroImage,
    heroHeading,
    heroSubheading
  }
`

// About Page
export const aboutQuery = groq`
  *[_type == "about"][0] {
    image1,
    text1,
    image2,
    text2
  }
`

// Apple Music Settings
export const appleMusicSettingsQuery = groq`
  *[_type == "appleMusicSettings"][0] {
    appleArtistId,
    appleStorefront,
    enabled
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

export const merchQuery = groq`
  *[_type == "merch"][0] {
    bannerImage,
    policyLinksText
  }
`

export const tourQuery = groq`
  *[_type == "tour"][0] {
    introHeading,
    photoImages
  }
`

export const contactQuery = groq`
  *[_type == "contact"][0] {
    formIntro
  }
`

export const musicQuery = groq`
  *[_type == "music"][0] {
    playlistHeading
  }
`

export const bandInfoQuery = groq`
  *[_type == "bandInfo"][0] {
    bandImage1,
    bandImage2,
    bio1,
    bio2
  }
`