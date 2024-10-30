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
          fontSize: { xs: '30px', sm: '45px' },
          textAlign: { xs: 'center', md: 'left' },
        }}
        role="heading"
      >
        My Wishlist
      </Typography>
      <ProductsWishList />
    </Box>
  );
}
