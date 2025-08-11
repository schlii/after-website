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
  itunesPreviewUrl: string
  spotifyUrl?: string
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
  _type: 'siteSettings'
  heroImage: SanityImageSource
  aboutText: any // Rich text content
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    spotify?: string
    appleMusic?: string
    bandcamp?: string
    soundcloud?: string
  }
  appleArtistId: number
  appleStorefront: string
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