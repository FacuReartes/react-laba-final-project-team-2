'use client';
import { Box, Typography } from '@mui/material';
import ProductsWishList from './ProductsWishList';

export default function MyWishListContainer() {
  return (
    <Box sx={{ px: '60px', width: 1 }}>
      <Typography
        variant="h1"
        sx={{
          mt: '40px',
          fontWeight: '500',
          fontSize: { xs: '30px', sm: '45px' },
        }}
        role="heading"
      >
        My WishList
      </Typography>
      <ProductsWishList />
    </Box>
  );
}
