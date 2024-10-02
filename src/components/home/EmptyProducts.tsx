import { Box, Typography } from '@mui/material';
import React from 'react';

export default function EmptyProducts() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          m: { md: '200px 0', xs: '100px 0' },
        }}
      >
        <Box
          component="img"
          alt="empty results"
          src="/bag-tick.svg"
          sx={{ margin: '0 26px 26px' }}
        />

        <Typography sx={{ fontWeight: 500, textAlign: 'center' }}>
          There are no products match search
        </Typography>
        <Typography sx={{ fontWeight: 300, textAlign: 'center' }}>
          Try to change filter values or search term to see results.
        </Typography>
      </Box>
    </Box>
  );
}
