import { client } from './sanity.client'
import type { SanityResponse, SanityListResponse } from '../types/sanity'

// Generic fetch function for single documents
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

// Generic fetch function for lists of documents
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

// Loading state hook for React components
import { useState, useEffect } from 'react'

interface UseSanityFetchResult<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export function useSanityFetch<T>(
  query: string,
  params = {}
): UseSanityFetchResult<T> {
  const [result, setResult] = useState<UseSanityFetchResult<T>>({
    data: null,
    error: null,
    loading: true
  })

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        const data = await client.fetch<T>(query, params)
        if (isMounted) {
          setResult({ data, error: null, loading: false })
        }
      } catch (error) {
        if (isMounted) {
          setResult({
            data: null,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
            loading: false
          })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [query, JSON.stringify(params)])

  return result
}