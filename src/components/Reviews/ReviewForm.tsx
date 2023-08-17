import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { isAxiosError } from 'axios';

import { Review } from '../../common/review';
import { AddReview, addReviewSchema } from '../../common/review';
import api from '../../lib/axios';
import { BtnPrimaryWFull } from '../ui/BtnPrimary';

interface Props {
  imdbId: string;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export default function ReviewForm({
  imdbId,
  reviews,
  setReviews,
  setIsFetching,
  setError,
}: Props) {
  const initialRatingValue: number | null = null;
  const initialRating: number =
    initialRatingValue == null ? 0 : initialRatingValue;
  const [ratingValue, setRatingValue] = React.useState<number | null>(
    initialRatingValue,
  );

  const { control, handleSubmit, reset, formState } = useForm<AddReview>({
    resolver: zodResolver(addReviewSchema),
    defaultValues: {
      reviewBody: '',
      rating: initialRating,
    },
  });

  const addReview: SubmitHandler<AddReview> = data => {
    api
      .post(`/movies/${imdbId}/reviews`, {
        reviewBody: data.reviewBody,
        rating: ratingValue == null ? 0 : ratingValue,
      })
      .then(response => setReviews([...reviews, response.data]))
      .catch(e => {
        if (isAxiosError(e)) {
          const message =
            e.code === 'ECONNABORTED'
              ? 'A timeout has occurred'
              : e.status === 404
              ? 'Resource not found'
              : 'An unexpected error has occurred';
          setError(message);
          setIsFetching(false);
        } else {
          setError('An unexpected error has occurred');
          setIsFetching(false);
        }
      });
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setRatingValue(initialRatingValue);
      reset({ reviewBody: '', rating: initialRating });
    }
  }, [formState, reset, initialRating]);

  return (
    <>
      <Box
        component='form'
        sx={{
          width: '100%',
          maxWidth: '25rem',
          bgcolor: 'primary.main',
          '& .MuiTextField-root': { width: '100%' },
        }}
        noValidate
        autoComplete='off'
        // NB `Promise-returning function provided to attribute where a void return was expected.` => Reason: trying to assign a Promise returning function to onSubmit which expects void => Solution: https://github.com/orgs/react-hook-form/discussions/8622
        onSubmit={event => void handleSubmit(addReview)(event)}
      >
        <Controller
          name='reviewBody'
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              name={field.name}
              value={field.value}
              inputRef={field.ref}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!fieldState.error}
              helperText={fieldState.error?.message && fieldState.error.message}
              id='filled-multiline-static'
              InputLabelProps={{ sx: { color: 'text.primary' } }}
              inputProps={{
                'aria-label': 'Textarea to input review',
              }}
              label='Review Text:'
              multiline
              placeholder='Add your review here ...'
              required
              rows={3}
              variant='filled'
            />
          )}
        />
        <Box display='flex' justifyContent='center' alignItems='center' py={1}>
          <Typography component='legend'>Your rating: </Typography>
          <Rating
            name='simple-controlled'
            value={ratingValue}
            onChange={(_prevRatingValue, newRatingValue) => {
              setRatingValue(newRatingValue);
            }}
          />
        </Box>
        <BtnPrimaryWFull type='submit'>Submit</BtnPrimaryWFull>
      </Box>
    </>
  );
}
