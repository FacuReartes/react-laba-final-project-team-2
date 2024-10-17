'use client';
import { Box, Typography } from '@mui/material';
import ProductsWishList from './ProductsWishList';

export default function MyWishListContainer() {
  return (
    <Box sx={{ ml: '60px', width: 1 }}>
      <Typography variant="h1" sx={{ mt: '40px' }}>
        My WishList
      </Typography>
      <ProductsWishList />
    </Box>
  );
}
