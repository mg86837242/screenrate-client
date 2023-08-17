import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Unstable_Grid2';
import { isAxiosError } from 'axios';

import { Movie } from '../../common/movie';
import { Review } from '../../common/review';
import api from '../../lib/axios';
import BoxFetchError from '../ui/BoxFetchError';
import BoxIsPending from '../ui/BoxIsPending';

import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function CenteredElementGrid() {
  const [movie, setMovie] = React.useState<Movie>();
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [isPending, setIsPending] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  const { imdbId } = useParams();

  React.useEffect(() => {
    let ignore = false;

    api
      .get<Movie>(`movies/${imdbId}`)
      .then(response => {
        if (!ignore) {
          setMovie(response.data);
          setReviews(response.data.reviewIds);
          setIsPending(false);
        }
      })
      .catch(e => {
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
  }, [imdbId]);

  if (isPending || movie === undefined) {
    return <BoxIsPending />;
  }

  if (error) {
    return <BoxFetchError error={error} />;
  }

  return (
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
          <ReviewForm
            imdbId={movie.imdbId}
            reviews={reviews}
            setReviews={setReviews}
            setIsPending={setIsPending}
            setError={setError}
          />
          <ReviewList reviews={reviews} />
        </Grid>
      </Grid>
    </Box>
  );
}
