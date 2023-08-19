import { QueryClient, useQuery } from '@tanstack/react-query';

import { Movie } from '../common/movie';
import { getMovieByImdbId, getMovies } from '../lib/axios';

export function useMovies() {
  return useQuery({ queryKey: ['movies'], queryFn: getMovies });
}

// NB `QueryClient` instance is better to be returned by `useQueryClient()` within the component (inside the React render lifecycle) i/o imported here: https://stackoverflow.com/questions/71540973/why-use-usequeryclient-from-react-query-library
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
