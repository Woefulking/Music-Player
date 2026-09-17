import { createBrowserRouter } from 'react-router-dom';
import { SearchPage } from 'pages/SearchPage/SearchPage';
import App from '../App';
import { TrackPage } from 'pages/TrackPage/TrackPage';
import { ArtistPage } from 'pages/ArtistPage/ArtistPage';
import { HomePage } from 'pages/HomePage/HomePage';
import { FavoritesPage } from 'src/pages/FavoritesPage/FavoritesPage';
import { AlbumPage } from 'src/pages/AlbumPage/AlbumPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'track/:id',
        element: <TrackPage />,
      },
      {
        path: 'artist/:id',
        element: <ArtistPage />,
      },
      {
        path: 'album/:id',
        element: <AlbumPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
    ],
  },
]);
