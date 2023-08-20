import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Home, Layout, NotFound, Reviews, Trailer } from './components';
import { MuiThemeProvider } from './context';

const config: QueryClientConfig = {};

const queryClient = new QueryClient(config);

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
        path: 'movies/:imdbId',
        Component: Reviews,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);

export function App() {
  return (
    <MuiThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={<p>Initial Load...</p>}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MuiThemeProvider>
  );
}
