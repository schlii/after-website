'use client'

import React from 'react'
import { AudioPlayerProvider } from '@/contexts/GlobalAudioPlayerContext'
import { CartProvider } from '@/contexts/CartContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AudioPlayerProvider>{children}</AudioPlayerProvider>
    </CartProvider>
  )
}
