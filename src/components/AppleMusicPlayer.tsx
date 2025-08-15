'use client'

import { FC, useState, useEffect, useCallback } from 'react'
import styles from './AppleMusicPlayer.module.css'
import { useAudioPlayer, type Track } from '@/hooks/useAudioPlayer'
import type { NormalizedItunesTrack } from '@/app/api/itunes/artist-tracks/route'

const PlayIcon: FC = () => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="0,0 14,8 0,16" />
  </svg>
)

const PauseIcon: FC = () => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="0" y="0" width="4" height="16" />
    <rect x="10" y="0" width="4" height="16" />
  </svg>
)

const PrevIcon: FC = () => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="14,0 6,8 14,16" />
    <rect x="0" y="0" width="2" height="16" />
  </svg>
)

const NextIcon: FC = () => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="0,0 8,8 0,16" />
    <rect x="12" y="0" width="2" height="16" />
  </svg>
)

/**
 * AppleMusicPlayer (GUI only)
 * Renders a lightweight Apple-Music-styled player panel that fits the
 * surrounding panelCommon constraints. No playback logic at this stage.
 */
const AppleMusicPlayer: FC = () => {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    loading: audioLoading,
    currentTrack,
    togglePlay,
    skipToNext,
    skipToPrevious,
    seekTo,
    setVolume,
    toggleMute,
  } = useAudioPlayer({
    playlist: tracks,
    autoPlay: true,
  })

  // Fetch Apple Music tracks on mount
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/itunes/artist-tracks')
        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error?.message || 'Failed to load tracks')
        }

        const playerTracks: Track[] = (result.data as NormalizedItunesTrack[]).map((t) => ({
          id: t.id,
          title: t.title,
          artist: t.artist,
          album: t.album,
          duration: t.duration,
          previewUrl: t.previewUrl,
          artworkUrl: t.artworkUrl,
        }))

        setTracks(playerTracks)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load tracks'
        setError(message)
        console.error('AppleMusicPlayer fetchTracks error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])

  const formatTime = useCallback((seconds: number): string => {
    if (!Number.isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    seekTo(time)
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
  }

  if (loading) {
    return <div className={styles.player}>Loading...</div>
  }

  if (error) {
    return <div className={styles.player}>{error}</div>
  }

  if (!tracks.length) {
    return <div className={styles.player}>No tracks found</div>
  }

  return (
    <div className={styles.player}>
      <div className={styles.nowPlaying}>
        <span className={styles.trackTitle}>{currentTrack?.title || '—'}</span>
        <span className={styles.artistName}>{currentTrack?.artist || ''}</span>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.control}
          aria-label="Previous"
          onClick={skipToPrevious}
          disabled={audioLoading}
        >
          <PrevIcon />
        </button>
        <button
          className={styles.control}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          disabled={audioLoading}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={styles.control}
          aria-label="Next"
          onClick={skipToNext}
          disabled={audioLoading}
        >
          <NextIcon />
        </button>
      </div>

      <div className={styles.progressWrapper}>
        <span className={styles.time}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className={styles.progress}
          disabled={audioLoading || !currentTrack}
        />
        <span className={styles.time}>{formatTime(duration)}</span>
      </div>

      <div className={styles.volume}>
        <button
          className={styles.control}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted || volume === 0 ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12z" />
              <path d="M4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25 1.27-1.27L4.27 3z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={handleVolume}
          aria-label="Volume"
        />
      </div>
    </div>
  )
}

export default AppleMusicPlayer
