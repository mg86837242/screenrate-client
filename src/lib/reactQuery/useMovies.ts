import { useQuery } from '@tanstack/react-query';

import { Movie } from '../../common';
import { getApiErrorMessage } from '../../utils';
import { api } from '..';

export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await api.get<Movie[]>(`movies`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export function useMovies() {
  return useQuery({ queryKey: ['movies'], queryFn: getMovies });
}
