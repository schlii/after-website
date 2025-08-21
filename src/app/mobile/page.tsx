import React from 'react'

// Disable ISR so that presentation overlays and fresh content work as on desktop
export const revalidate = 0

import MobilePageClient from './MobilePageClient'

import { homeQuery, tourDatesQuery, aboutQuery } from 'lib/sanity-queries'
import { fetchSanityDocument, fetchSanityDocuments } from 'lib/sanity-fetch'
import { urlFor } from '@/sanity/lib/image'
import { shopifyHelpers } from 'lib/shopify'
import { serialiseProducts } from 'lib/serialiseShopify'
import type { PlainProduct } from '../../../types/PlainProduct'

interface HomePageData {
  heroImage?: any
}

interface AboutPageData {
  text1?: any
}

export default async function MobilePage() {
  // Fetch all required content in parallel for performance
  const [
    { data: homeData },
    { data: aboutData },
    { data: tourDates },
  ] = await Promise.all([
    fetchSanityDocument<HomePageData>(homeQuery),
    fetchSanityDocument<AboutPageData>(aboutQuery),
    fetchSanityDocuments<any>(`${tourDatesQuery} | order(date asc)`),
  ])

  // Fetch first 6 Shopify products (limit for mobile page)
  let merch: PlainProduct[] = []
  try {
    const products = await shopifyHelpers.fetchProducts()
    merch = serialiseProducts(products).slice(0, 6)
  } catch {
    // Silently fail – merch section will show empty state handled by ProductGrid
  }

  return (
    <MobilePageClient
      heroImageUrl={homeData?.heroImage ? urlFor(homeData.heroImage).width(800).height(600).url() : null}
      heroImageAlt={homeData?.heroImage?.alt ?? null}
      tourDates={tourDates}
      merch={merch}
      aboutText={aboutData?.text1 ? aboutData.text1.map((block: any) => block.children?.[0]?.text) : []}
    />
  )
}
