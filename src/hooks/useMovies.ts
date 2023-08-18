import { useQuery } from '@tanstack/react-query';

import { getMovieByImdbId, getMovies } from '../lib/axios';

export function useMovies() {
  return useQuery({ queryKey: ['movies'], queryFn: getMovies });
}

export function useMovie(imdbId: string) {
  return useQuery({
    queryKey: ['movie', imdbId],
    queryFn: () => getMovieByImdbId(imdbId),
    enabled: !!imdbId,
  });
}
