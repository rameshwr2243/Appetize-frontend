import React from 'react';
import { Box, Typography, Rating } from '@mui/material';

const ReviewsComponent = ({ reviews }) => {
  return (
    <Box>
      {reviews.map((review, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="body1">{review.comment}</Typography>
          <Rating value={review.rating} readOnly />
        </Box>
      ))}
    </Box>
  );
};

export default ReviewsComponent;
