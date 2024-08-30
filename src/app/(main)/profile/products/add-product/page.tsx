'use client';
import AddProductForm from '@/components/AddProductForm/AddProductForm';
import { Box, Typography } from '@mui/material';

export default function AddProductPage() {
  return (
    <Box
      sx={{
        padding: { lg: '52px 68px', xs: '24px 20px 84px' },
        m: 0,
        width: { lg: '100%', xs: '100vw' },
        position: 'relative',
        flex: 1,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { lg: '45px', xs: '30px' } }}>
        Add a product
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: { lg: '40px', xs: '24px' },
          mt: { lg: '35px', xs: '12px' },
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti eveniet quia illum vel
        velit atque. Quibusdam cumque doloremque eveniet laboriosam dignissimos eligendi cupiditate
        molestias modi! Labore excepturi autem doloribus deleniti!
      </Typography>
      <AddProductForm />
    </Box>
  );
}
