import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../src/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  stega: {
    enabled: process.env.NODE_ENV !== 'production',
    studioUrl: '/studio',
  },
})

// Helper function for generating image URLs with the Sanity Image Pipeline
const builder = imageUrlBuilder(client)

export const urlForImage = (source: any) => {
  return builder.image(source)
}