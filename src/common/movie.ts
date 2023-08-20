import { z } from 'zod';

import { reviewSchema } from './review';

export const movieSchema = {
  id: z.string().min(1, { message: 'Required' }),
  imdbId: z.string().min(1, { message: 'Required' }),
  title: z.string().min(1, { message: 'Required' }),
  releaseDAte: z.string().datetime().min(1, { message: 'Required' }),
  trailerLink: z.string().url().min(1, { message: 'Required' }),
  genre: z.array(z.string()),
  poster: z.string().url().min(1, { message: 'Required' }),
  backdrops: z.array(z.string().url()).optional(),
  reviewIds: z.array(reviewSchema).optional(),
};
