import { QueryClient } from '@tanstack/react-query';

import { Movie } from '../../common';
import { moviesQuery } from '../../lib';

export const loader =
  (queryClient: QueryClient) => async (): Promise<Movie[]> => {
    const query = moviesQuery;
    return await queryClient.ensureQueryData(query);
  };
