import type { Photo } from '../types'

interface PhotoCardProps {
  photo: Photo
  isFavourite: boolean
  onToggleFavourite: (id: string) => void
}

export default function PhotoCard({
  photo,
  isFavourite,
  onToggleFavourite,
}: PhotoCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="flex items-center justify-between p-3">
        <p className="truncate text-sm font-medium text-gray-800">
          {photo.author}
        </p>
        <button
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="text-xl"
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}