import axios from 'axios';

import { Movie } from '../common/movie';
import { AddReview } from '../common/review';
import getApiErrorMessage from '../utils/getApiErrorMessage';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
  // withCredentials: true; // enable this line when necessary, e.g. when using cross-origin server-side session
});

export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await api.get<Movie[]>(`movies`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export async function getMovieByImdbId(imdbId: string): Promise<Movie> {
  try {
    const response = await api.get<Movie>(`movies/${imdbId}`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}
export function addReviewByImdbId(imdbId: string) {
  return async function (newReview: AddReview) {
    try {
      await api.post(`/movies/${imdbId}/reviews`, {
        reviewBody: newReview.reviewBody,
        rating: newReview.rating,
      });
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  };
}
