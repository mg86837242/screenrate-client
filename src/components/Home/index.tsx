import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { moviesQuery } from '../../lib';
import { ErrorPage } from '..';
import { PendingPage } from '..';
import { Hero } from '..';

import { loader } from './loader';

export function Home() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  // NB `status` returned from `useQuery` is missing `pending`, when using with React Router, therefore, using `isPending` as the workaround
  const {
    isPending,
    isError,
    data: movies,
    error,
  } = useQuery({
    ...moviesQuery,
    initialData,
  });

  return isPending ? (
    <PendingPage />
  ) : isError ? (
    <ErrorPage error={error.message} />
  ) : (
    <Hero movies={movies} />
  );
}
