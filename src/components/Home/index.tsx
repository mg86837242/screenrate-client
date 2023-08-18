import { useMovies } from '../../hooks';
import { BoxStatusError } from '..';
import { BoxStatusPending } from '..';
import { Hero } from '..';

export function Home() {
  const { status, data: movies, error } = useMovies();

  return status === 'pending' ? (
    <BoxStatusPending />
  ) : status === 'error' ? (
    <BoxStatusError error={error.message} />
  ) : (
    <Hero movies={movies} />
  );
}
