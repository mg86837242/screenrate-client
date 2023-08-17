import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MuiThemeProvider } from './context/MuiTheme';
import TanStackQueryProvider from './context/TanStackQuery';
import { Home, Layout, Reviews, Trailer } from './components';

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
