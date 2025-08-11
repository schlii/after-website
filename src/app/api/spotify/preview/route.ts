import { NextResponse } from 'next/server'
import { fetchSpotifyTrack } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackId = searchParams.get('trackId')

  if (!trackId) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Missing required query param: trackId' },
      },
      { status: 400 }
    )
  }

  try {
    const track = await fetchSpotifyTrack(trackId)
    return NextResponse.json({ success: true, data: track })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    const status = message === 'Track not found' ? 404 : 500
    return NextResponse.json(
      { success: false, error: { code: 'SPOTIFY_ERROR', message } },
      { status }
    )
  }
}


