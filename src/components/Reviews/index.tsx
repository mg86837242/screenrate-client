import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useTypedParams } from '../../hooks';
import { useMovie } from '../../hooks';
import { addReviewByImdbId } from '../../lib/axios';
import { BoxStatusError } from '..';
import { BoxStatusPending } from '..';

import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';

export function Reviews() {
  const queryClient = useQueryClient();
  const { imdbId } = useTypedParams('imdbId');
  const {
    status,
    data: movie,
    error,
    isFetching,
  } = useMovie(queryClient, imdbId);

  const addReviewMutation = useMutation({
    mutationFn: addReviewByImdbId(imdbId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['movie'] }),
  });

  return status === 'pending' ? (
    <BoxStatusPending />
  ) : status === 'error' ? (
    <BoxStatusError error={error.message} />
  ) : (
    <Box sx={{ flexGrow: 1, padding: { xs: '1rem', md: '3rem' } }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
        <Grid
          xs={4}
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
          xs={4}
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
