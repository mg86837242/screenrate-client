import * as React from 'react';
import { isAxiosError } from 'axios';

import { Movie } from '../../common/movie';
import api from '../../lib/axios';
import Hero from '../Hero';

export default function Home() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [isPending, setIsPending] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    let ignore = false;

    // `axios` snippet: https://rb.gy/5pmyk (source: google "axios react typescript example") => NB there's an error in the article - in catch block, use `e.status` instead
    api
      .get<Movie[]>(`movies`)
      .then(response => {
        if (!ignore) {
          setMovies(response.data);
          setIsPending(false);
        }
      })
      .catch(e => {
        // `isAxiosError()` snippet: https://bobbyhadz.com/blog/typescript-http-request-axios
        if (isAxiosError(e)) {
          const message =
            e.code === 'ECONNABORTED'
              ? 'A timeout has occurred'
              : e.status === 404
              ? 'Resource not found'
              : 'An unexpected error has occurred';
          setError(message);
          setIsPending(false);
        } else {
          setError('An unexpected error has occurred');
          setIsPending(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return <Hero movies={movies} isPending={isPending} error={error} />;
}
