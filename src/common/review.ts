import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.string().min(1, { message: 'Required' }),
  reviewBody: z
    .string()
    .min(1, { message: 'Required' })
    .max(200, { message: 'Maximum 200 characters' }),
  rating: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const addReviewSchema = z.object({
  reviewBody: z
    .string()
    .min(1, { message: 'Required' })
    .max(200, { message: 'Maximum 200 characters' }),
  rating: z.number(),
});
