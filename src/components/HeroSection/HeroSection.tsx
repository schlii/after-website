import { type FC } from 'react'
import Image from 'next/image'
import { type SiteSettings } from '../../../types/sanity'
import { urlForImage } from '../../../lib/sanity-server'

interface HeroSectionProps {
  siteSettings: SiteSettings | null
}

export const HeroSection: FC<HeroSectionProps> = ({ siteSettings }) => {
  const socialLinks = siteSettings?.socialLinks
  const socialEntries = socialLinks ? Object.entries(socialLinks).filter(([_, url]) => url) : []

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      {siteSettings?.heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlForImage(siteSettings.heroImage).url()}
            alt="After Band Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-4">AFTER</h1>
        <p className="text-xl md:text-2xl mb-8">
          {siteSettings?.aboutText || 'Experience the sound of tomorrow'}
        </p>
        {socialEntries.length > 0 && (
          <div className="mt-8 space-x-6">
            {socialEntries.map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:text-gray-300 transition-colors capitalize"
              >
                {platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}