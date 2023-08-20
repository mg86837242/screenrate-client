import { FetchQueryOptions, UseQueryOptions } from '@tanstack/react-query';

import { Movie } from '../../common';
import { api } from '..';

async function getMovieByImdbId(imdbId: string): Promise<Movie> {
  const response = await api.get<Movie>(`movies/${imdbId}`);
  return response.data;
}

export const movieByImdbIdQuery = (
  imdbId: string,
): FetchQueryOptions | UseQueryOptions => ({
  queryKey: ['movie', imdbId],
  queryFn: async () => {
    const movie = await getMovieByImdbId(imdbId);
    if (!movie) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      });
    }
    return movie;
  },
  enabled: !!imdbId,
});
