import * as React from 'react';

export interface Movie {
  _id: string;
  imdbId: string;
  title: string;
  releaseDate: string;
  trailerLink: string;
  genre: string[];
  poster: string;
  backdrops: string[];
  reviewIds: string[];
}

export interface Review {
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  _class: string;
}

export interface MoviesProps {
  movies: Movie[];
}

export type LayoutOutletContextType = [
  movies: Movie[],
  loading: boolean,
  error: string,
];
