import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import { UseMutationResult } from '@tanstack/react-query';

import { Review } from '../../common';
import { getLocaleString } from '../../utils';
import { BtnPrimary } from '..';

interface Props {
  addReviewMutation: UseMutationResult<
    void,
    Error,
    {
      reviewBody: string;
      rating: number;
    },
    unknown
  >;
  reviews: Review[];
  isFetching: boolean;
}

export function ReviewList({ addReviewMutation, reviews, isFetching }: Props) {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '25rem',
        minHeight: '4.5rem',
        borderRadius: {
          xs: 1,
          xl: 2,
        },
      }}
    >
      {isFetching ? <LinearProgress color='secondary' /> : <Box height='4px' />}
      {addReviewMutation.status === 'pending' && (
        <React.Fragment key={addReviewMutation.submittedAt}>
          <ListItem
            alignItems='center'
            dense
            disableGutters
            sx={{ gap: 2, opacity: 0.5 }}
          >
            <Rating
              size='small'
              value={addReviewMutation.variables.rating}
              readOnly
            />
            <ListItemText
              primary={addReviewMutation.variables.reviewBody}
              secondary={`Created at: ${getLocaleString(
                new Date(addReviewMutation.submittedAt),
              )}`}
            />
          </ListItem>
          {reviews.length > 0 && <Divider component='li' />}
        </React.Fragment>
      )}
      {addReviewMutation.status === 'error' && (
        <React.Fragment key={addReviewMutation.submittedAt}>
          <ListItem alignItems='center' dense disableGutters sx={{ gap: 2 }}>
            <BtnPrimary
              onClick={() => addReviewMutation.reset()}
              width='90px'
              height='30px'
            >
              Reset
            </BtnPrimary>
            <ListItemText
              primary={addReviewMutation.variables.reviewBody}
              primaryTypographyProps={{ color: 'error.main' }}
              secondary={`Created at: ${getLocaleString(
                new Date(addReviewMutation.submittedAt),
              )}`}
              secondaryTypographyProps={{ color: 'error.main' }}
            />
          </ListItem>
          {reviews.length > 0 && <Divider component='li' />}
        </React.Fragment>
      )}
      {reviews.length > 0 ? (
        [...reviews].reverse().map((review, idx) => (
          <React.Fragment key={review.id}>
            <ListItem alignItems='center' dense disableGutters sx={{ gap: 2 }}>
              <Rating size='small' value={review.rating} readOnly />
              <ListItemText
                primary={review.reviewBody}
                secondary={`Created at: ${getLocaleString(review.createdAt)}`}
              />
            </ListItem>
            {idx < reviews.length && <Divider component='li' />}
          </React.Fragment>
        ))
      ) : (
        <ListItem alignItems='flex-start'>
          <ListItemText
            primary={
              'No reviews have been added, be the first one to leave a review?'
            }
          />
        </ListItem>
      )}
    </List>
  );
}
