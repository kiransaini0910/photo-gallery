export type FavouritesState = string[] // favourite photo ids

export type FavouritesAction = { type: 'TOGGLE_FAVOURITE'; payload: string }

export function favouritesReducer(
  state: FavouritesState,
  action: FavouritesAction
): FavouritesState {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      return state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload]
    default:
      return state
  }
}

const STORAGE_KEY = 'favourites'

export function loadFavourites(): FavouritesState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function saveFavourites(favourites: FavouritesState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
}