import { useLoaderData } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useTypedParams } from '../../hooks';
import { movieByImdbIdQuery, useAddReview } from '../../lib';
import { ErrorPage } from '..';
import { PendingPage } from '..';

import { loader } from './loader';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';

export function Reviews() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { imdbId } = useTypedParams('imdbId');
  const {
    isPending,
    isError,
    data: movie,
    error,
    isFetching,
  } = useQuery({
    ...movieByImdbIdQuery(imdbId),
    enabled: !!imdbId,
    initialData,
  });

  // NB `useMutation` i/o `useFetcher` for mutation w/o navigation, reasons: https://programmingarehard.com/2023/04/01/react-routers-data-utilities-are-awkward.html/
  const queryClient = useQueryClient();
  const addReviewMutation = useAddReview(queryClient, imdbId);

  return isPending ? (
    <PendingPage />
  ) : isError ? (
    <ErrorPage error={error.message} />
  ) : (
    <Box sx={{ flexGrow: 1, padding: { xs: 4, md: 6 } }}>
      <Grid container spacing={{ xs: 4, md: 3 }}>
        <Grid
          xs={12}
          md={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Card
            sx={{
              borderRadius: {
                xs: 1,
                xl: 2,
              },
            }}
          >
            <CardMedia
              component='img'
              alt={`Poster of ${movie.title}`}
              image={movie.poster}
            />
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={6}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <ReviewForm addReviewMutation={addReviewMutation} />
          <ReviewList
            addReviewMutation={addReviewMutation}
            reviews={movie.reviewIds}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
