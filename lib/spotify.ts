import type { SpotifyAccessToken, SpotifyTrackPreview } from '@/types/spotify'

const ONE_SECOND_MS = 1000
const TOKEN_REFRESH_BUFFER_MS = 30 * ONE_SECOND_MS

/**
 * In-memory cache for the Spotify access token. This cache lives per
 * server process instance and will be refreshed shortly before expiry.
 */
let cachedToken: SpotifyAccessToken | null = null

const getEnv = () => {
  const clientId =
    process.env.PRIVATE_SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID
  const clientSecret =
    process.env.PRIVATE_SPOTIFY_CLIENT_SECRET || process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing Spotify credentials. Set PRIVATE_SPOTIFY_CLIENT_ID and PRIVATE_SPOTIFY_CLIENT_SECRET in .env.local'
    )
  }
  return { clientId, clientSecret }
}

const isTokenValid = (token: SpotifyAccessToken | null): boolean => {
  if (!token) return false
  const now = Date.now()
  return now + TOKEN_REFRESH_BUFFER_MS < token.expiresAtMs
}

export const getSpotifyAccessToken = async (): Promise<SpotifyAccessToken> => {
  if (isTokenValid(cachedToken)) {
    return cachedToken as SpotifyAccessToken
  }

  const { clientId, clientSecret } = getEnv()

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
    // Do not cache at the fetch layer; we manage caching explicitly
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to obtain Spotify access token: ${response.status} ${errorText}`)
  }

  const json = (await response.json()) as {
    access_token: string
    token_type: string
    expires_in: number
  }

  const token: SpotifyAccessToken = {
    accessToken: json.access_token,
    tokenType: json.token_type,
    expiresAtMs: Date.now() + json.expires_in * ONE_SECOND_MS,
  }

  cachedToken = token
  return token
}

export const fetchSpotifyTrack = async (
  trackId: string
): Promise<SpotifyTrackPreview> => {
  const token = await getSpotifyAccessToken()

  const resp = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `${token.tokenType} ${token.accessToken}`,
    },
    cache: 'no-store',
  })

  if (resp.status === 404) {
    throw new Error('Track not found')
  }

  if (!resp.ok) {
    const errorText = await resp.text()
    throw new Error(`Spotify tracks API error: ${resp.status} ${errorText}`)
  }

  const data = (await resp.json()) as any

  const preview: SpotifyTrackPreview = {
    id: data.id,
    name: data.name,
    artists: Array.isArray(data.artists)
      ? data.artists.map((a: any) => a.name)
      : [],
    album: {
      id: data.album?.id,
      name: data.album?.name,
      images: Array.isArray(data.album?.images) ? data.album.images : [],
    },
    preview_url: data.preview_url ?? null,
    duration_ms: data.duration_ms ?? 0,
  }

  return preview
}


