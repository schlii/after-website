'use client'

import { useState, useEffect } from 'react'
import { client } from './sanity.client'

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