import { Movie } from '../../common';
import { api } from '..';

async function getMovies(): Promise<Movie[]> {
  const response = await api.get<Movie[]>(`/movies`);
  return response.data;
}

export const moviesQuery = {
  queryKey: ['movies'],
  queryFn: () => getMovies(),
};
