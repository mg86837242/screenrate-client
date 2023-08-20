import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home, Layout, Reviews, Trailer } from './components';
import { MuiThemeProvider, TanStackQueryProvider } from './context';

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
        Component: Reviews,
      },
    ],
  },
]);

export function App() {
  return (
    <MuiThemeProvider>
      <TanStackQueryProvider>
        <RouterProvider
          router={router}
          fallbackElement={<p>Initial Load...</p>}
        />
      </TanStackQueryProvider>
    </MuiThemeProvider>
  );
}
