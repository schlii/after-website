import { stegaClean } from 'next-sanity'
import { SiteGridLayout } from '@/components/SiteGridLayout'
import styles from '@/styles/SiteGrid.module.css'
import grid from './GalleryGrid.module.css'
import { fetchSanityDocument } from 'lib/sanity-fetch'
import { galleryQuery } from 'lib/sanity-queries'
import { urlFor } from '@/sanity/lib/image'
import { GalleryClient } from '@/components/GalleryClient'

export const revalidate = 0

interface GalleryImage {
  asset: any
  alt?: string
  fitMode?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
}

interface GalleryData {
  images?: GalleryImage[]
}

const getFitModeClass = (rawFit?: string) => {
  const fitMode = stegaClean(rawFit || 'cover') as string

  switch (fitMode) {
    case 'contain':
      return styles.panelImageContain
    case 'fill':
      return styles.panelImageFill
    case 'scale-down':
      return styles.panelImageScaleDown
    case 'none':
      return styles.panelImageNone
    default:
      return styles.panelImageCover
  }
}

export default async function GalleryPage() {
  const { data: galleryData } = await fetchSanityDocument<GalleryData>(galleryQuery)
  const images = galleryData?.images || []
  return (
    <SiteGridLayout>
      <GalleryClient images={images} />
    </SiteGridLayout>
  )
}
