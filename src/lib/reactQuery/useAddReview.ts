import { QueryClient, useMutation } from '@tanstack/react-query';

import { AddReview } from '../../common';
import { getApiErrorMessage } from '../../utils';
import { api } from '..';

const addReviewByImdbId =
  (imdbId: string) =>
  async (newReview: AddReview): Promise<void> => {
    try {
      await api.post(`/movies/${imdbId}/reviews`, {
        reviewBody: newReview.reviewBody,
        rating: newReview.rating,
      });
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  };

export function useAddReview(queryClient: QueryClient, imdbId: string) {
  return useMutation({
    mutationFn: addReviewByImdbId(imdbId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['movie'] }),
  });
}
