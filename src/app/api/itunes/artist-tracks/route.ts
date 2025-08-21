import { NextRequest, NextResponse } from 'next/server'
import { fetchSanityDocument } from 'lib/sanity-fetch'
import { appleMusicSettingsQuery } from 'lib/sanity-queries'
import { stegaClean } from '@sanity/client/stega'
import type { AppleMusicSettings } from '../../../../../types/sanity'

interface ItunesLookupResponse {
  resultCount: number
  results: Array<{
    wrapperType?: string
    kind?: string
    trackId?: number
    trackName?: string
    artistName?: string
    collectionName?: string
    trackTimeMillis?: number
    previewUrl?: string
    artworkUrl100?: string
    releaseDate?: string
    trackViewUrl?: string
    primaryGenreName?: string
  }>
}

export interface NormalizedItunesTrack {
  id: string
  title: string
  artist: string
  album?: string
  duration: number
  previewUrl: string
  artworkUrl?: string
  releaseDate?: string
  trackViewUrl?: string
  genre?: string
}

function toHighResArtwork(url?: string): string | undefined {
  if (!url) return undefined
  // iTunes artwork URLs typically end with e.g. 100x100bb.jpg or 100x100bb.webp
  return url.replace(/\/[0-9]+x[0-9]+bb\./, '/600x600bb.')
}

function normalizeResults(payload: ItunesLookupResponse): NormalizedItunesTrack[] {
  if (!payload?.results?.length) return []
  return payload.results
    .filter((r) => r.kind === 'song' && !!r.previewUrl)
    .map((r) => {
      const durationSeconds = r.trackTimeMillis ? Math.round(r.trackTimeMillis / 1000) : 0
      return {
        id: String(r.trackId ?? ''),
        title: r.trackName ?? '',
        artist: r.artistName ?? '',
        album: r.collectionName,
        duration: durationSeconds,
        previewUrl: r.previewUrl as string,
        artworkUrl: toHighResArtwork(r.artworkUrl100),
        releaseDate: r.releaseDate,
        trackViewUrl: r.trackViewUrl,
        genre: r.primaryGenreName,
      }
    })
    .filter((t) => t.id && t.title && t.previewUrl)
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const artistIdParam = searchParams.get('artistId')
    const storefrontParam = searchParams.get('storefront')

    const settingsResult = await fetchSanityDocument<AppleMusicSettings>(appleMusicSettingsQuery)
    const settings = settingsResult.data || null

    const artistIdRaw = artistIdParam || (settings ? String(settings.appleArtistId) : null)
    const storefrontRaw = storefrontParam || settings?.appleStorefront || 'US'

    // Remove possible zero-width stega characters introduced by Visual Editing
    const artistId = artistIdRaw ? stegaClean(artistIdRaw) : null
    const storefront = stegaClean(storefrontRaw).toUpperCase()

    if (!artistId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'MISSING_ARTIST_ID', message: 'Apple Music Artist ID is not configured.' },
        },
        { status: 400 }
      )
    }

    const url = new URL('https://itunes.apple.com/lookup')
    url.searchParams.set('id', artistId)
    url.searchParams.set('entity', 'song')
    url.searchParams.set('limit', '200')
    url.searchParams.set('media', 'music')
    url.searchParams.set('country', storefront)

    const response = await fetch(url.toString(), { next: { revalidate: 3600 } })
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'ITUNES_REQUEST_FAILED', message: `Request failed with ${response.status}` },
        },
        { status: 502 }
      )
    }

    const json: ItunesLookupResponse = await response.json()
    const tracks = normalizeResults(json)

    return NextResponse.json(
      { success: true, data: tracks },
      { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } }
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: { code: 'UNEXPECTED_ERROR', message } },
      { status: 500 }
    )
  }
}


