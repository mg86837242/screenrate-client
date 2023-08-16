import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
  const { handleSubmit, control, reset } = useForm<AddReview>({
    resolver: zodResolver(addReviewSchema),
    defaultValues: { reviewBody: '' },
  });

  const addReview: SubmitHandler<AddReview> = data => {
    api
      .post(`/movies/${imdbId}/reviews`, { reviewBody: data.reviewBody })
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
          render={({ field, fieldState: { error } }) => (
            <TextField
              error={!!error}
              fullWidth
              helperText={error?.message && error.message}
              id='filled-multiline-static'
              inputProps={{
                'aria-label': 'Textarea to input review',
              }}
              inputRef={field.ref}
              label='Review Text:'
              multiline
              onBlur={field.onBlur}
              onChange={field.onChange}
              placeholder='Add your review here ...'
              required
              rows={3}
              variant='filled'
            />
          )}
        />
        <BtnPrimaryWFull type='submit' onClick={() => reset()}>
          Submit
        </BtnPrimaryWFull>
      </Box>
    </>
  );
}

// TODO Star system
// TODO TSQuery
