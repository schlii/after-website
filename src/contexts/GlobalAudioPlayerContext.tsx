'use client'

import { createContext, useContext, useEffect, useState, type ReactNode, type FC } from 'react'
import { useAudioPlayer, type Track } from '@/hooks/useAudioPlayer'
import type { NormalizedItunesTrack } from '@/app/api/itunes/artist-tracks/route'

interface AudioPlayerContextValue extends ReturnType<typeof useAudioPlayer> {}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null)

export const AudioPlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Track[]>([])

  // Instantiate audio player hook once
  const audio = useAudioPlayer({ playlist, autoPlay: true })

  // Fetch Apple Music tracks once on mount
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch('/api/itunes/artist-tracks')
        const json = await res.json()
        if (!json.success) return
        const newPlaylist: Track[] = (json.data as NormalizedItunesTrack[]).map((t) => ({
          id: t.id,
          title: t.title,
          artist: t.artist,
          album: t.album,
          duration: t.duration,
          previewUrl: t.previewUrl,
          artworkUrl: t.artworkUrl,
        }))
        setPlaylist(newPlaylist)
      } catch (err) {
        console.error('GlobalAudioPlayerContext: failed to fetch tracks', err)
      }
    }
    fetchTracks()
  }, [])

  return <AudioPlayerContext.Provider value={audio}>{children}</AudioPlayerContext.Provider>
}

export function useGlobalAudioPlayer() {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) {
    throw new Error('useGlobalAudioPlayer must be used within AudioPlayerProvider')
  }
  return ctx
}
