'use client'

import React, { useEffect, useState } from 'react'

interface CircleGroupConfig {
  id: number
  rows: number
  cols: number
  size: number
  opacity: number
  duration: number
  delay: number
  direction: 'left' | 'right'
  yOffset: number
  style: 'filled' | 'outline'
  strokeWidth?: number
}

const circleGroups: CircleGroupConfig[] = [
  { id: 1, rows: 3, cols: 12, size: 8, opacity: 0.5, duration: 25, delay: 0, direction: 'right', yOffset: 15, style: 'filled' },
  { id: 2, rows: 6, cols: 8, size: 14, opacity: 0.4, duration: 30, delay: 5, direction: 'left', yOffset: 40, style: 'outline', strokeWidth: 2 },
  { id: 3, rows: 4, cols: 10, size: 6, opacity: 0.7, duration: 20, delay: 8, direction: 'right', yOffset: 70, style: 'filled' },
  { id: 4, rows: 8, cols: 6, size: 12, opacity: 0.45, duration: 35, delay: 12, direction: 'left', yOffset: 25, style: 'outline', strokeWidth: 1.5 },
  { id: 5, rows: 2, cols: 15, size: 10, opacity: 0.6, duration: 28, delay: 15, direction: 'right', yOffset: 60, style: 'outline', strokeWidth: 1 },
]

interface GroupWithSeed extends CircleGroupConfig { seed: number }

const groupsWithSeed: GroupWithSeed[] = circleGroups.map(cfg => ({ ...cfg, seed: Math.random() }))

const CircleOverlay: React.FC = () => {
  const [windowSize, setWindowSize] = useState<{ w: number; h: number }>({ w: typeof window !== 'undefined' ? window.innerWidth : 1920, h: typeof window !== 'undefined' ? window.innerHeight : 1080 })

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderCircleGroup = (group: GroupWithSeed) => {
    const circles: React.ReactElement[] = []
    const spacing = group.size * 3

    for (let row = 0; row < group.rows; row++) {
      for (let col = 0; col < group.cols; col++) {
        const commonProps = {
          key: `${group.id}-${row}-${col}`,
          cx: col * spacing + group.size + 20,
          cy: row * spacing + group.size + 20,
          r: group.size,
          opacity: group.opacity,
        }
        circles.push(
          <circle
            {...commonProps}
            fill={group.style === 'filled' ? 'white' : 'none'}
            stroke={group.style === 'outline' ? 'white' : undefined}
            strokeWidth={group.style === 'outline' ? group.strokeWidth ?? 1 : undefined}
          />
        )
      }
    }

    const groupWidth = group.cols * spacing + 40
    const groupHeight = group.rows * spacing + 40

    const maxTop = Math.max(0, windowSize.h - groupHeight)
    const topPix = group.seed * maxTop
    const startX = group.direction === 'right' ? -groupWidth : windowSize.w + 50
    const endX = group.direction === 'right' ? windowSize.w + 50 : -groupWidth

    const animationName = `moveGroup${group.id}`

    return (
      <div key={group.id} style={{ position: 'absolute', top: `${topPix}px`, left: 0, width: groupWidth, height: groupHeight }}>
        <style>{`
          @keyframes ${animationName} {
            0% { transform: translateX(${startX}px); }
            100% { transform: translateX(${endX}px); }
          }
        `}</style>
        <div style={{ width: groupWidth, height: groupHeight, animation: `${animationName} ${group.duration}s linear infinite`, animationDelay: `-${group.delay}s`, pointerEvents: 'none' }}>
          <svg width={groupWidth} height={groupHeight} viewBox={`0 0 ${groupWidth} ${groupHeight}`}>{circles}</svg>
        </div>
      </div>
    )
  }

  return <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -5, overflow: 'hidden' }}>{groupsWithSeed.map(renderCircleGroup)}</div>
}

export default CircleOverlay
