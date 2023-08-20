import { QueryClient, useQuery } from '@tanstack/react-query';

import { Movie } from '../../common';
import { getApiErrorMessage } from '../../utils';
import { api } from '..';

async function getMovieByImdbId(imdbId: string): Promise<Movie> {
  try {
    const response = await api.get<Movie>(`movies/${imdbId}`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export function useMovie(queryClient: QueryClient, imdbId: string) {
  return useQuery({
    queryKey: ['movie', imdbId],
    queryFn: () => getMovieByImdbId(imdbId),
    enabled: !!imdbId,
    placeholderData: () => {
      const movies = queryClient.getQueryData<Movie[] | undefined>(['movies']);
      if (movies !== undefined) {
        return movies.find(movie => movie.imdbId === imdbId);
      }
    },
  });
}
