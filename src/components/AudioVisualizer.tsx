import { useEffect, useRef, useState, type FC } from 'react'

interface AudioVisualizerProps {
  width?: number
  height?: number
  dotColumns?: number
  dotSize?: number
  dotGap?: number
  smoothing?: number
  fftSize?: number
  sizeRandomness?: number
  isActive?: boolean
}

/**
 * AudioVisualizer
 * Attempts to visualise the provided audioElement using Web Audio API. If the
 * browser blocks access (typical for Apple-hosted previews that lack CORS
 * headers), it automatically falls back to a simulated visualisation so the UI
 * remains animated without impacting playback.
 */
const AudioVisualizer: FC<AudioVisualizerProps> = ({
  width = 600,
  height = 200,
  dotColumns = 40,
  dotSize = 3,
  dotGap = 5,
  smoothing = 4,
  fftSize = 2048,
  sizeRandomness = 0.8,
  isActive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number>(0)
  const simulateRef = useRef(true)
  const prevDataRef = useRef<number[]>([])
  const columnPropsRef = useRef(
    Array.from({ length: dotColumns }, () => ({
      smoothingFactor: 0.15 + Math.random() * 0.25,
      frequencyMultiplier: 0.8 + Math.random() * 0.4,
      phaseOffset: Math.random() * Math.PI * 2,
      sensitivity: 0.7 + Math.random() * 0.6,
      decay: 0.88 + Math.random() * 0.08,
    }))
  )
  const simTimeRef = useRef(0)
  const [ready, setReady] = useState(false)

  // track active state in ref for use inside animation loop
  const activeRef = useRef(isActive)
  useEffect(() => {
    activeRef.current = isActive
  }, [isActive])

  useEffect(() => {
    prevDataRef.current = new Array(dotColumns).fill(0)
    setReady(true)
  }, [])

  /* Draw loop */
  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      } else {
        canvas.width = width
        canvas.height = height
      }
    }
    resize()

    const genSimData = (t: number) => {
      const arr = new Uint8Array(256)
      for (let i = 0; i < arr.length; i++) {
        // independent phase per band to avoid visible travelling waves
        const phase1 = Math.sin(0.0006 * t + i * 0.17)
        const phase2 = Math.sin(0.0013 * t + i * 0.09 + 1.3)
        const phase3 = Math.sin(0.0021 * t - i * 0.05 + 2.1)

        const combined = phase1 * 90 + phase2 * 50 + phase3 * 35

        // random peaks to mimic beats
        const beat = Math.random() > 0.985 ? 120 : 0

        // column-specific subtle noise (deterministic-ish)
        const hash = Math.sin((i + 1) * 12.9898 + (t % 10000) * 0.0002) * 43758.5453
        const columnNoise = (hash - Math.floor(hash) - 0.5) * 30

        // frequency fall-off
        const falloff = Math.exp(-i * 0.0065)

        const value = combined * falloff + 100 + columnNoise + beat
        arr[i] = Math.max(0, Math.min(255, value))
      }
      return arr
    }

    const draw = () => {
      let freq: Uint8Array
      if (activeRef.current) {
        simTimeRef.current += 16
        freq = genSimData(simTimeRef.current)
      } else {
        // zero data to allow smooth decay
        freq = new Uint8Array(256)
      }

      // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const columnW = canvas.width / dotColumns
      const dotSpacing = dotSize + dotGap
      const maxDots = Math.floor(canvas.height / dotSpacing)

      for (let i = 0; i < dotColumns; i++) {
        const p = columnPropsRef.current[i]
        let raw = 0
        if (activeRef.current) {
          const baseIndex = (i / dotColumns) * freq.length * 0.5
          const dataIndex = Math.floor(baseIndex * p.frequencyMultiplier) % freq.length
          raw = (freq[dataIndex] / 255) * p.sensitivity
        }
        const current = prevDataRef.current[i]
        const target = raw
        let smoothed = target > current ? current + (target - current) * (1 - p.smoothingFactor) : current * p.decay
        smoothed = Math.max(0, Math.min(1, smoothed))
        prevDataRef.current[i] = smoothed

        let effectiveAmp: number
        if (isActive) {
          effectiveAmp = smoothed
        } else {
          const minAmp = 1 / maxDots
          effectiveAmp = Math.max(smoothed * 0.9, minAmp)
        }
        const numDots = Math.floor(effectiveAmp * maxDots)
        const x = i * columnW + columnW / 2
        for (let j = 0; j < numDots; j++) {
          const y = canvas.height - j * dotSpacing - dotSize * 2
          const heightRatio = j / maxDots
          const opacity = 1 - heightRatio * 0.4
          const baseSz = dotSize * (1 - heightRatio * 0.15)
          const randScale = 1 + (Math.random() - 0.5) * (activeRef.current ? sizeRandomness : sizeRandomness * 0.05)
          const r = Math.max(0.5, baseSz * randScale)
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${opacity * Math.min(1, smoothed + 0.1)})`
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [ready, dotColumns, dotSize, dotGap, sizeRandomness, width, height, isActive])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default AudioVisualizer;
