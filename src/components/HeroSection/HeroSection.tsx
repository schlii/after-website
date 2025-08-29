import { type FC } from 'react'
import styles from './HeroSection.module.css'
import Image from 'next/image'
import { type SiteSettings } from '../../../types/sanity'
import { urlFor } from '@/sanity/lib/image'

interface HeroSectionProps {
  siteSettings: SiteSettings | null
}

export const HeroSection: FC<HeroSectionProps> = ({ siteSettings }) => {
  const socialLinks = siteSettings?.socialLinks
  const socialEntries = socialLinks ? Object.entries(socialLinks).filter(([_, url]) => url) : []

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      {siteSettings?.heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(siteSettings.heroImage).url()}
            alt="After Band Hero"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} /> {/* Overlay */}
        </div>
      )}
      {siteSettings?.heroImage?.alt && (
        <span
          className={styles.altText}
        >
          {siteSettings.heroImage.alt}
        </span>
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