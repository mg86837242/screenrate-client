export interface Movie {
  id: string;
  imdbId: string;
  title: string;
  releaseDate: string;
  trailerLink: string;
  genre: string[];
  poster: string;
  backdrops: string[];
  reviewIds: Review[];
}

export interface Review {
  id: string;
  reviewBody: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddReview {
  reviewBody: string;
  rating: number;
}
