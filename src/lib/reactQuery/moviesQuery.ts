import { FetchQueryOptions, UseQueryOptions } from '@tanstack/react-query';

import { Movie } from '../../common';
import { api } from '..';

async function getMovies(): Promise<Movie[]> {
  const response = await api.get<Movie[]>(`movies`);
  return response.data;
}

export const moviesQuery: FetchQueryOptions | UseQueryOptions = {
  queryKey: ['movies'],
  queryFn: getMovies,
};
