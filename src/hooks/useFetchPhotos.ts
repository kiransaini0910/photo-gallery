import { useEffect, useState } from 'react'
import type { Photo } from '../types'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

export function useFetchPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPhotos() {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Failed to fetch photos')
        const data: Photo[] = await res.json()
        if (!cancelled) setPhotos(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Something went wrong')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPhotos()
    return () => {
      cancelled = true
    }
  }, [])

  return { photos, loading, error }
}