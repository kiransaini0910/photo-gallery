import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  loadFavourites,
  saveFavourites,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    loadFavourites
  )

  useEffect(() => {
    saveFavourites(favourites)
  }, [favourites])

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const handleToggleFavourite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id })
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase()
    return photos.filter((photo) => photo.author.toLowerCase().includes(query))
  }, [photos, search])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    )
  }

  if (error) {
    return <p className="py-20 text-center text-red-600">{error}</p>
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by author..."
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none"
      />

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-gray-500">No photos found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  )
}