import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Layout } from './components';
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
        async loader() {
          const { loader } = await import('./components/Home/loader');
          return loader(queryClient);
        },
        async lazy() {
          const { Home } = await import('./components');
          return { Component: Home };
        },
      },
      {
        path: 'movies/:imdbId/reviews',
        async loader({ request, params }) {
          const { loader } = await import('./components/Reviews/loader');
          return loader(queryClient)({ request, params });
        },
        async lazy() {
          const { Reviews } = await import('./components');
          return { Component: Reviews };
        },
      },
      {
        path: 'movies/:imdbId/trailer/:ytTrailerId',
        async lazy() {
          const { Trailer } = await import('./components');
          return { Component: Trailer };
        },
      },
      {
        path: '*',
        async lazy() {
          const { NotFound } = await import('./components');
          return { Component: NotFound };
        },
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
