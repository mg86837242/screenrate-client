import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Review from './components/Review';
import Trailer from './components/Trailer';
import { MUIThemeProvider } from './context/Theme';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'trailer/:ytTrailerId',
        Component: Trailer,
      },
      {
        path: 'movies/:imdbId/reviews',
        Component: Review,
      },
    ],
  },
]);

export function App() {
  return (
    <MUIThemeProvider>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </MUIThemeProvider>
  );
}
