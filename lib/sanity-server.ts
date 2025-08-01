import { client } from './sanity.client'
import type { SanityResponse, SanityListResponse } from '../types/sanity'

// Server-side fetch function for single documents
export async function fetchSanityDocument<T>(
  query: string,
  params = {}
): Promise<SanityResponse<T>> {
  try {
    const data = await client.fetch<T>(query, params)
    return { data }
  } catch (error) {
    console.error('Error fetching Sanity document:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

// Server-side fetch function for lists of documents
export async function fetchSanityDocuments<T>(
  query: string,
  params = {}
): Promise<SanityListResponse<T>> {
  try {
    const data = await client.fetch<T[]>(query, params)
    return { data }
  } catch (error) {
    console.error('Error fetching Sanity documents:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}