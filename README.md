# Photo Gallery

A photo gallery web app built with React, Vite, TypeScript and Tailwind CSS for the Celebrare Frontend Intern pre-screening assignment.

## Features

- Fetches 30 photos from the Picsum Photos API, with a loading spinner and error message
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Real-time search by author name (filters already-fetched data)
- Favourite photos using `useReducer`, persisted in `localStorage`
- Custom hook `useFetchPhotos` for data fetching
- `useCallback` and `useMemo` for the search filter

## Run locally

    npm install
    npm run dev