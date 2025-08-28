'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export type AudioError = 
  | 'MEDIA_ERR_ABORTED'
  | 'MEDIA_ERR_NETWORK'
  | 'MEDIA_ERR_DECODE'
  | 'MEDIA_ERR_SRC_NOT_SUPPORTED'

export interface PlayerError {
  code: AudioError
  message: string
  timestamp: Date
}

export interface Track {
  id: string
  title: string
  artist: string
  album?: string
  duration: number
  previewUrl: string
  artworkUrl?: string
  spotifyUrl?: string
  /** URL to the track on Apple Music */
  appleMusicUrl?: string
}

export interface PlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  loading: boolean
  error: PlayerError | null
  currentTrack: Track | null
  playlist: Track[]
  currentTrackIndex: number
  playbackRate: number
  shuffle: boolean
  shuffledPlaylist: Track[]
  shuffledIndex: number
}

interface UseAudioPlayerProps {
  playlist: Track[]
  autoPlay?: boolean
  onTrackChange?: (track: Track) => void
  onError?: (error: PlayerError) => void
  onStateChange?: (state: PlayerState) => void
}

const INITIAL_STATE: PlayerState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.3,
  muted: false,
  loading: false,
  error: null,
  currentTrack: null,
  playlist: [],
  currentTrackIndex: 0,
  playbackRate: 1,
  shuffle: false,
  shuffledPlaylist: [],
  shuffledIndex: 0,
}

const STORAGE_KEY = 'after_music_player'

export function useAudioPlayer({
  playlist,
  autoPlay = false,
  onTrackChange,
  onError,
  onStateChange,
}: UseAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<PlayerState>(INITIAL_STATE)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    // Enable CORS so Apple preview URLs can play on mobile Safari/Chrome
    audioRef.current.crossOrigin = 'anonymous'
    const audio = audioRef.current

    // Load persisted state
    try {
              const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          setState(prev => ({
            ...prev,
            volume: parsed.volume ?? 1,
            muted: parsed.muted ?? false,
            currentTrackIndex: parsed.currentTrackIndex ?? 0,
            shuffle: parsed.shuffle ?? false,
          }))
        }
    } catch (error) {
      console.warn('Failed to load player state from localStorage:', error)
    }

    return () => {
      if (audio) {
        audio.pause()
        audio.src = ''
      }
    }
  }, [])

  // Safety timeout: if the audio element stays in loading state for too long, surface an error
  useEffect(() => {
    if (!state.loading) return

    const timeoutId = setTimeout(() => {
      setState(prev => {
        if (!prev.loading) return prev // already resolved
        return {
          ...prev,
          loading: false,
          isPlaying: false,
          error: {
            code: 'MEDIA_ERR_NETWORK',
            message: 'Track failed to load. Check connection and try again.',
            timestamp: new Date(),
          },
        }
      })
    }, 10000) // 10-second watchdog

    return () => clearTimeout(timeoutId)
  }, [state.loading])

  // Shuffle function
  const shuffleArray = useCallback((array: Track[]): Track[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  // Update playlist
  useEffect(() => {
    setState(prev => {
      const newCurrentTrackIndex = prev.currentTrackIndex >= playlist.length ? 0 : prev.currentTrackIndex
      const shuffledPlaylist = prev.shuffle ? shuffleArray(playlist) : playlist
      const currentTrack = playlist[newCurrentTrackIndex] || playlist[0] || null
      
      // Find current track in shuffled playlist if shuffle is enabled
      const shuffledIndex = prev.shuffle && currentTrack 
        ? shuffledPlaylist.findIndex(track => track.id === currentTrack.id)
        : newCurrentTrackIndex

      return {
        ...prev,
        playlist,
        shuffledPlaylist,
        currentTrack,
        currentTrackIndex: newCurrentTrackIndex,
        shuffledIndex: shuffledIndex >= 0 ? shuffledIndex : 0,
      }
    })
  }, [playlist, shuffleArray])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadStart = () => {
      setState(prev => ({ ...prev, loading: true, error: null }))
    }

    const handleCanPlay = () => {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        duration: audio.duration || 0 
      }))
    }

    const handleTimeUpdate = () => {
      setState(prev => ({ 
        ...prev, 
        currentTime: audio.currentTime || 0 
      }))
    }

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false }))
      // Auto-advance to next track
      skipToNext()
    }

    const handleError = () => {
      const errorCode = getAudioErrorCode(audio.error?.code)
      const error: PlayerError = {
        code: errorCode,
        message: getErrorMessage(errorCode),
        timestamp: new Date(),
      }
      
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        isPlaying: false, 
        error 
      }))
      
      onError?.(error)
    }

    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true }))
    }

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }))
    }

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [onError])

  // Load current track
  useEffect(() => {
    const audio = audioRef.current
    const track = state.currentTrack
    
    if (!audio || !track) return

    audio.src = track.previewUrl
    audio.volume = state.volume
    audio.muted = state.muted

    // If player was already playing, continue automatically after source swap
    if (state.isPlaying) {
      audio.load()
      audio.play().catch(console.error)
    } else if (autoPlay && state.playlist.length > 0) {
      audio.play().catch(console.error)
    }

    onTrackChange?.(track)
  }, [state.currentTrack, autoPlay, onTrackChange])

  // Persist state changes
  useEffect(() => {
    const { volume, muted, currentTrackIndex, shuffle } = state
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        volume,
        muted,
        currentTrackIndex,
        shuffle,
      }))
    } catch (error) {
      console.warn('Failed to save player state:', error)
    }

    onStateChange?.(state)
  }, [state, onStateChange])

  // Control functions
  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !state.currentTrack) return

    try {
      await audio.play()
    } catch (error) {
      // Handle mobile browser autoplay restrictions
      if (error instanceof Error && error.name === 'NotAllowedError') {
        const mobileError: PlayerError = {
          code: 'MEDIA_ERR_ABORTED',
          message: 'Tap the play button to start audio (mobile browser restriction)',
          timestamp: new Date(),
        }
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          isPlaying: false, 
          error: mobileError 
        }))
        onError?.(mobileError)
      } else {
        console.error('Failed to play audio:', error)
      }
    }
  }, [state.currentTrack, onError])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
  }, [])

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause()
    } else {
      play()
    }
  }, [state.isPlaying, play, pause])

  const skipToNext = useCallback(() => {
    setState(prev => {
      if (prev.shuffle) {
        const nextShuffledIndex = (prev.shuffledIndex + 1) % prev.shuffledPlaylist.length
        const nextTrack = prev.shuffledPlaylist[nextShuffledIndex]
        const nextOriginalIndex = prev.playlist.findIndex(track => track.id === nextTrack?.id)
        
        return {
          ...prev,
          shuffledIndex: nextShuffledIndex,
          currentTrackIndex: nextOriginalIndex >= 0 ? nextOriginalIndex : 0,
          currentTrack: nextTrack || null,
        }
      } else {
        const nextIndex = (prev.currentTrackIndex + 1) % prev.playlist.length
        return {
          ...prev,
          currentTrackIndex: nextIndex,
          currentTrack: prev.playlist[nextIndex] || null,
        }
      }
    })
  }, [])

  const skipToPrevious = useCallback(() => {
    setState(prev => {
      if (prev.shuffle) {
        const prevShuffledIndex = prev.shuffledIndex === 0 
          ? prev.shuffledPlaylist.length - 1 
          : prev.shuffledIndex - 1
        const prevTrack = prev.shuffledPlaylist[prevShuffledIndex]
        const prevOriginalIndex = prev.playlist.findIndex(track => track.id === prevTrack?.id)
        
        return {
          ...prev,
          shuffledIndex: prevShuffledIndex,
          currentTrackIndex: prevOriginalIndex >= 0 ? prevOriginalIndex : 0,
          currentTrack: prevTrack || null,
        }
      } else {
        const prevIndex = prev.currentTrackIndex === 0 
          ? prev.playlist.length - 1 
          : prev.currentTrackIndex - 1
        return {
          ...prev,
          currentTrackIndex: prevIndex,
          currentTrack: prev.playlist[prevIndex] || null,
        }
      }
    })
  }, [])

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
  }, [])

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current
    if (!audio) return
    
    const MAX_VOL = 0.7
    const clampedVolume = Math.max(0, Math.min(MAX_VOL, volume))
    audio.volume = clampedVolume
    setState(prev => ({ ...prev, volume: clampedVolume }))
  }, [])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    
    const newMuted = !state.muted
    audio.muted = newMuted
    setState(prev => ({ ...prev, muted: newMuted }))
  }, [state.muted])

  const selectTrack = useCallback((index: number) => {
    if (index < 0 || index >= state.playlist.length) return
    
    setState(prev => {
      const selectedTrack = prev.playlist[index]
      const shuffledIndex = prev.shuffle && selectedTrack
        ? prev.shuffledPlaylist.findIndex(track => track.id === selectedTrack.id)
        : index

      return {
        ...prev,
        currentTrackIndex: index,
        shuffledIndex: shuffledIndex >= 0 ? shuffledIndex : index,
        currentTrack: selectedTrack || null,
      }
    })
  }, [state.playlist.length])

  const toggleShuffle = useCallback(() => {
    setState(prev => {
      const newShuffle = !prev.shuffle
      const newShuffledPlaylist = newShuffle ? shuffleArray(prev.playlist) : prev.playlist
      
      // Find current track in new playlist order
      const currentTrack = prev.currentTrack
      const newShuffledIndex = newShuffle && currentTrack
        ? newShuffledPlaylist.findIndex(track => track.id === currentTrack.id)
        : prev.currentTrackIndex

      return {
        ...prev,
        shuffle: newShuffle,
        shuffledPlaylist: newShuffledPlaylist,
        shuffledIndex: newShuffledIndex >= 0 ? newShuffledIndex : 0,
      }
    })
  }, [shuffleArray])

  return {
    ...state,
    audioRef,
    play,
    pause,
    togglePlay,
    skipToNext,
    skipToPrevious,
    seekTo,
    setVolume,
    toggleMute,
    selectTrack,
    toggleShuffle,
  }
}

function getAudioErrorCode(code?: number): AudioError {
  switch (code) {
    case 1: return 'MEDIA_ERR_ABORTED'
    case 2: return 'MEDIA_ERR_NETWORK'
    case 3: return 'MEDIA_ERR_DECODE'
    case 4: return 'MEDIA_ERR_SRC_NOT_SUPPORTED'
    default: return 'MEDIA_ERR_NETWORK'
  }
}

function getErrorMessage(code: AudioError): string {
  switch (code) {
    case 'MEDIA_ERR_ABORTED':
      return 'Audio playback was aborted'
    case 'MEDIA_ERR_NETWORK':
      return 'Network error occurred while loading audio'
    case 'MEDIA_ERR_DECODE':
      return 'Audio file could not be decoded'
    case 'MEDIA_ERR_SRC_NOT_SUPPORTED':
      return 'Audio format not supported'
    default:
      return 'Unknown audio error occurred'
  }
}
