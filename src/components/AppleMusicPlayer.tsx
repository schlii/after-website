'use client'

import { FC, useCallback } from 'react'
import styles from './AppleMusicPlayer.module.css'
import { useGlobalAudioPlayer } from '@/contexts/GlobalAudioPlayerContext'
import AudioVisualizer from '@/components/AudioVisualizer'

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
interface AppleMusicPlayerProps { showPlaylist?: boolean }

const AppleMusicPlayer: FC<AppleMusicPlayerProps> = ({ showPlaylist = false }) => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    loading: audioLoading,
    currentTrack,
    currentTrackIndex,
    playlist: tracks,
    togglePlay,
    skipToNext,
    skipToPrevious,
    seekTo,
    setVolume,
    toggleMute,
    selectTrack,
    play,
  } = useGlobalAudioPlayer()

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

  if (!tracks.length) {
    return <div className={styles.player}>Loading...</div>
  }

  return (
    <div className={`${styles.player} flex flex-col min-h-0`}>
      {/* Visualizer canvas background */}
      <AudioVisualizer isActive={isPlaying} />
      {/* Background track title */}
      {currentTrack?.title && (
        <span className={styles.backgroundTitle}>{currentTrack.title}</span>
      )}
      <div className={styles.nowPlaying}>
        <span className={styles.trackTitle}>{currentTrack?.title || '—'}</span>
        {/* Removed old textual Spotify button */}
      </div>

      <div className={styles.controls}>
        {/* Spotify icon button */}
        <a
          href={currentTrack?.spotifyUrl || 'https://open.spotify.com/artist/7KfMR05zRrWyhQimnYa8li'}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.serviceControl}
          aria-label="Open in Spotify"
        >
          <img src="/spotify%20button.png" alt="Spotify" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </a>

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

        {/* Apple Music icon button */}
        {currentTrack?.appleMusicUrl ? (
          <a
            href={currentTrack.appleMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.serviceControl}
            aria-label="Open in Apple Music"
          >
            <img src="/apple%20button.png" alt="Apple Music" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </a>
        ) : (
          <button
            disabled
            className={`${styles.serviceControl} opacity-50 cursor-not-allowed`}
            aria-label="Open in Apple Music"
          >
            <img src="/apple%20button.png" alt="Apple Music" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </button>
        )}
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
          max="0.3"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={handleVolume}
          aria-label="Volume"
        />
      </div>

      {/* Playlist */}
      {showPlaylist && (
        <div className={styles.playlistContainer}>
          {tracks.map((track, index) => (
            <button
              key={track.id}
              className={`${styles.playlistItem} ${index === currentTrackIndex ? styles.playlistItemActive : ''}`}
              onClick={() => selectTrack(index)}
            >
              <span className={styles.trackIndex}>{index + 1}.</span>
              <span className={styles.trackTitle}>{track.title}</span>
              <span className={styles.trackDuration}>{formatTime(track.duration)}</span>
            </button>
          ))}
        </div>
      )}
      </div>
  )
}

export default AppleMusicPlayer
