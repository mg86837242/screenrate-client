import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Movie } from '../common/movie';
import getApiErrorMessage from '../utils/getApiErrorMessage';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
  // withCredentials: true; // enable this line when necessary, e.g. when using cross-origin server-side session
});

export default api;

// `axios` snippet: https://rb.gy/5pmyk (source: google "axios react typescript example") => NB there's an error in the article - in catch block, use `e.status` instead
// `isAxiosError()` snippet: https://bobbyhadz.com/blog/typescript-http-request-axios
export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await api.get<Movie[]>(`api/v1/movies`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export function useMovies() {
  return useQuery({ queryKey: ['movies'], queryFn: getMovies });
}

export async function getMovieByImdbId(imdbId: string): Promise<Movie> {
  try {
    const response = await api.get<Movie>(`api/vi/movies/${imdbId}`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export function useMovie(imdbId: string) {
  return useQuery({
    queryKey: ['movie', imdbId],
    queryFn: () => getMovieByImdbId(imdbId),
    enabled: !!imdbId,
  });
}

export async function AddReviewByImdbId(
  imdbId: string,
  reviewBody: string,
  rating: number,
) {
  try {
    await api.post(`/movies/${imdbId}/reviews`, {
      reviewBody,
      rating,
    });
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}
