"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './BackgroundSlideshow.module.css'

interface BackgroundSlideshowProps {
  images: { src: string; alt: string }[]
  interval?: number
}

export function BackgroundSlideshow({ images, interval = 8000 }: BackgroundSlideshowProps) {
  const [slotA, setSlotA] = useState(0) // index in images array
  const [slotB, setSlotB] = useState(1)
  const [showA, setShowA] = useState(true) // which slot has opacity 1
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // advance slideshow
  useEffect(() => {
    if (images.length < 2) return

    timerRef.current = setInterval(() => {
      setShowA(prevShowA => {
        // determine which slot will become hidden
        const incomingSlotIsA = !prevShowA
        const currentIndex = prevShowA ? slotA : slotB
        const nextIndex = (currentIndex + 1) % images.length

        // update src on the slot that will fade in next
        if (incomingSlotIsA) {
          setSlotA(nextIndex)
        } else {
          setSlotB(nextIndex)
        }
        return incomingSlotIsA
      })
    }, interval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, interval, slotA, slotB])

  if (images.length === 0) return null

  const imgA = images[slotA] ?? images[0]
  const imgB = images[slotB % images.length] ?? images[0]

  return (
    <div className={styles.root}>
      <Image
        key="slotA"
        src={imgA.src}
        alt=""
        fill
        unoptimized
        quality={100}
        className={`${styles.slide} ${showA ? styles.show : ''}`}
      />
      <Image
        key="slotB"
        src={imgB.src}
        alt=""
        fill
        unoptimized
        quality={100}
        className={`${styles.slide} ${!showA ? styles.show : ''}`}
      />
    </div>
  )
}