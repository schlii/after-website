export interface SpotifyAccessToken {
  accessToken: string
  tokenType: 'Bearer' | string
  /** Epoch milliseconds when token expires */
  expiresAtMs: number
}

export interface SpotifyAlbumImage {
  url: string
  height?: number
  width?: number
}

export interface SpotifyTrackPreview {
  id: string
  name: string
  artists: string[]
  album: {
    id?: string
    name?: string
    images: SpotifyAlbumImage[]
  }
  preview_url: string | null
  duration_ms: number
}


