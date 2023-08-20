import { Movie } from '../../common';
import { api } from '..';

async function getMovieByImdbId(imdbId: string): Promise<Movie> {
  const response = await api.get<Movie>(`movies/${imdbId}`);
  return response.data;
}

export const movieByImdbIdQuery = (imdbId: string) => ({
  queryKey: ['movie', imdbId],
  queryFn: async () => {
    const movie = await getMovieByImdbId(imdbId);
    if (!movie) {
      throw new Response('', {
        status: 404,
        statusText: `Uh oh, couldn't find a movie with imdbId "${imdbId}"`,
      });
    }
    return movie;
  },
});
