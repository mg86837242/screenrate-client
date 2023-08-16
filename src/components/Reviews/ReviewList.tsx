import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Review } from '../../common/review';
import getLocaleString from '../../utils/getLocaleString';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
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
      {reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <React.Fragment key={review.id}>
            {idx > 0 && <Divider variant='middle' component='li' />}
            <ListItem alignItems='flex-start'>
              <ListItemText
                primary={review.reviewBody}
                secondary={`Created at: ${getLocaleString(review.createdAt)}`}
              />
            </ListItem>
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
