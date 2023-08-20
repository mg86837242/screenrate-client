import type { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { Movie } from '../../common';
import { movieByImdbIdQuery } from '../../lib';

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs): Promise<Movie> => {
    if (!params.imdbId) {
      throw new Response('', {
        status: 400,
        statusText: 'Expected params.imdbId',
      });
    }
    const query = movieByImdbIdQuery(params.imdbId);
    return await queryClient.ensureQueryData(query);
  };
