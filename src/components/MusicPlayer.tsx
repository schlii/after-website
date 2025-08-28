'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAudioPlayer, type Track } from '../hooks/useAudioPlayer'
import Image from 'next/image'
import type { NormalizedItunesTrack } from '../app/api/itunes/artist-tracks/route'
import styles from './MusicPlayer.module.css'

interface MusicPlayerProps {
  className?: string
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
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
    error: audioError,
    currentTrack,
    playlist,
    currentTrackIndex,
    shuffle,
    togglePlay,
    skipToNext,
    skipToPrevious,
    seekTo,
    setVolume,
    toggleMute,
    selectTrack,
    toggleShuffle,
  } = useAudioPlayer({
    playlist: tracks,
    onError: (error) => {
      console.error('Audio player error:', error)
    },
  })

  // Fetch tracks from iTunes API
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/itunes/artist-tracks')
        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.error?.message || 'Failed to load tracks')
        }
        
        // Convert iTunes tracks to player tracks
        const playerTracks: Track[] = result.data.map((track: NormalizedItunesTrack) => ({
          id: track.id,
          title: track.title,
          artist: track.artist,
          album: track.album,
          duration: track.duration,
          previewUrl: track.previewUrl,
          artworkUrl: track.artworkUrl,
          spotifyUrl: undefined, // TODO: Add Spotify URL mapping if available
          appleMusicUrl: track.trackViewUrl,
        }))
        
        setTracks(playerTracks)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load tracks'
        setError(message)
        console.error('Error fetching tracks:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault()
          togglePlay()
          break
        case 'ArrowRight':
          event.preventDefault()
          skipToNext()
          break
        case 'ArrowLeft':
          event.preventDefault()
          skipToPrevious()
          break
        case 'ArrowUp':
          event.preventDefault()
          setVolume(Math.min(1, volume + 0.1))
          break
        case 'ArrowDown':
          event.preventDefault()
          setVolume(Math.max(0, volume - 0.1))
          break
        case 'KeyM':
          event.preventDefault()
          toggleMute()
          break
        case 'KeyS':
          event.preventDefault()
          toggleShuffle()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, skipToNext, skipToPrevious, setVolume, toggleMute, toggleShuffle, volume])

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  const handleSeek = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value)
    seekTo(time)
  }, [seekTo])

  const handleVolumeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
  }, [setVolume])

  if (loading) {
    return (
      <div className={`bg-gray-900 rounded-lg p-6 ${className || ''}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
          <div className="h-12 bg-gray-700 rounded mb-4"></div>
          <div className="h-8 bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-gray-900 rounded-lg p-6 ${className || ''}`}>
        <div className="text-center">
          <p className="text-red-400 mb-2">Failed to load music player</p>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!tracks.length) {
    return (
      <div className={`bg-gray-900 rounded-lg p-6 ${className || ''}`}>
        <div className="text-center">
          <p className="text-gray-400">No tracks available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gray-900 rounded-lg p-6 ${className || ''}`}>
      {/* Current Track Info */}
      {currentTrack && (
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            {currentTrack.artworkUrl && (
              <img
                src={currentTrack.artworkUrl}
                alt={`${currentTrack.title} artwork`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">
                {currentTrack.title}
              </h3>
              <p className="text-gray-400 truncate">{currentTrack.artist}</p>
              {currentTrack.album && (
                <p className="text-gray-500 text-sm truncate">{currentTrack.album}</p>
              )}
            </div>
            {/* Removed inline Spotify link; external buttons are in controls */}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
          <span>{formatTime(currentTime)}</span>
          <span className="flex-1"></span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className={`w-full h-2 bg-gray-700 rounded-lg ${styles.slider}`}
          disabled={!currentTrack || audioLoading}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={toggleShuffle}
          disabled={!tracks.length}
          className={`p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            shuffle 
              ? 'text-purple-400 hover:text-purple-300' 
              : 'text-gray-400 hover:text-white'
          }`}
          aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
          </svg>
        </button>

        {/* Spotify button */}
        {currentTrack?.spotifyUrl ? (
          <a
            href={currentTrack.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Open in Spotify"
          >
            <Image src="/spotify-button.png" alt="Spotify" width={40} height={40} className="w-full h-full object-contain" unoptimized />
          </a>
        ) : (
          <button
            disabled
            className={`${styles.serviceControl} opacity-50 cursor-not-allowed`}
            aria-label="Open in Spotify"
          >
            <Image src="/spotify-button.png" alt="Spotify" width={40} height={40} className="w-full h-full object-contain" unoptimized />
          </button>
        )}

        <button
          onClick={skipToPrevious}
          disabled={!currentTrack}
          className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous track"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button
          onClick={togglePlay}
          disabled={!currentTrack || audioLoading}
          className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {audioLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="m7 4 10 8L7 20V4z"/>
            </svg>
          )}
        </button>

        <button
          onClick={skipToNext}
          disabled={!currentTrack}
          className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next track"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>

        {/* Apple Music button */}
        {currentTrack?.appleMusicUrl ? (
          <a
            href={currentTrack.appleMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Open in Apple Music"
          >
            <Image src="/apple-button.png" alt="Apple Music" width={40} height={40} className="w-full h-full object-contain" unoptimized />
          </a>
        ) : (
          <button
            disabled
            className={`${styles.serviceControl} opacity-50 cursor-not-allowed`}
            aria-label="Open in Apple Music"
          >
            <Image src="/apple-button.png" alt="Apple Music" width={40} height={40} className="w-full h-full object-contain" unoptimized />
          </button>
        )}
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={toggleMute}
          className={`${styles.serviceControl}`}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted || volume === 0 ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          className={`flex-1 h-2 bg-gray-700 rounded-lg ${styles.slider}`}
        />
      </div>

      {/* Error Display */}
      {audioError && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-400 text-sm">
          {audioError.message}
        </div>
      )}

      {/* Playlist */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3">Playlist</h4>
        <div className={`max-h-64 overflow-y-auto space-y-1 ${styles['playlist-scroll']}`}>
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => selectTrack(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                index === currentTrackIndex
                  ? 'bg-purple-900/50 border border-purple-700'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                {track.artworkUrl && (
                  <img
                    src={track.artworkUrl}
                    alt={`${track.title} artwork`}
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{track.title}</p>
                  <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                </div>
                <span className="text-gray-500 text-sm">
                  {formatTime(track.duration)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <details className="text-sm text-gray-400">
          <summary className="cursor-pointer hover:text-white">
            Keyboard Shortcuts
          </summary>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between">
              <span>Play/Pause</span>
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Space</kbd>
            </div>
            <div className="flex justify-between">
              <span>Next Track</span>
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">→</kbd>
            </div>
            <div className="flex justify-between">
              <span>Previous Track</span>
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">←</kbd>
            </div>
            <div className="flex justify-between">
              <span>Volume Up/Down</span>
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">↑/↓</kbd>
            </div>
            <div className="flex justify-between">
              <span>Mute</span>
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">M</kbd>
            </div>
            <div className="flex justify-between">
              <span>Toggle Shuffle</span>
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">S</kbd>
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}
