import { useMovies } from '../../lib';
import { ErrorPage } from '..';
import { PendingPage } from '..';
import { Hero } from '..';

export function Home() {
  const { status, data: movies, error } = useMovies();

  return status === 'pending' ? (
    <PendingPage />
  ) : status === 'error' ? (
    <ErrorPage error={error.message} />
  ) : (
    <Hero movies={movies} />
  );
}
