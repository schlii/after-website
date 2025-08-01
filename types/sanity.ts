import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Base interface for all documents
interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Tour Date
export interface TourDate extends SanityDocument {
  _type: 'tourDate'
  title: string
  venue: string
  date: string
  city: string
  country: string
  ticketUrl?: string
  status: 'upcoming' | 'sold-out' | 'cancelled' | 'completed'
}

// News Post
export interface NewsPost extends SanityDocument {
  _type: 'news-post'
  title: string
  content: any // Rich text content
  date: string
  slug: string
  featured_image: SanityImageSource
}

// Song
export interface Song extends SanityDocument {
  _type: 'song'
  title: string
  artist: string
  duration: number
  audio_url: string
  album_art: SanityImageSource
}

// Band Member
export interface BandMember extends SanityDocument {
  _type: 'band-member'
  name: string
  role: string
  bio: any // Rich text content
  image: SanityImageSource
}

// Contact Submission
export interface ContactSubmission extends SanityDocument {
  _type: 'contact-submission'
  name: string
  email: string
  message: string
  date: string
  status: 'new' | 'in-progress' | 'resolved'
}

// Site Settings
export interface SiteSettings extends SanityDocument {
  _type: 'site-settings'
  hero_image: SanityImageSource
  about_text: any // Rich text content
  social_links: {
    platform: string
    url: string
  }[]
}

// Response Types
export interface SanityResponse<T> {
  data: T | null
  error?: string
}

export interface SanityListResponse<T> {
  data: T[] | null
  error?: string
}