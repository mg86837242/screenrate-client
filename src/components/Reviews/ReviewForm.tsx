/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddReview, addReviewSchema } from '../../common/review';
import { addReviewByImdbId } from '../../lib/axios';
import { BtnPrimaryWFull } from '..';

interface Props {
  imdbId: string;
}

export function ReviewForm({ imdbId }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addReviewByImdbId(imdbId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['movie'] }),
  });

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
    mutation.mutate({
      reviewBody: data.reviewBody,
      rating: ratingValue === null ? 0 : ratingValue,
    });
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setRatingValue(initialRatingValue);
      reset({ reviewBody: '', rating: initialRating });
    }
  }, [formState, reset, initialRating]);

  // TODO re-import raw dataset, modify reviews and export a backup (both movies and reviews collections) && optimistic ui
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
          <Rating // <Rating /> is <input type='radio'> under the hood
            name='rating' // this input won't be "controlled" by RHF, despite with the name of 'rating'
            value={ratingValue}
            onChange={(_prevRatingValue, newRatingValue) => {
              setRatingValue(newRatingValue);
            }}
          />
        </Box>
        <BtnPrimaryWFull type='submit' disabled={mutation.isPending}>
          Submit
        </BtnPrimaryWFull>
      </Box>
    </>
  );
}
