'use client';
import { Box, Button } from '@mui/material';
import ProductDetailsView from './ProductsDetailsView';
import ProductDetailsImageSlider from './ProductDetailsImageSlider';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ id }: { id: string | number }) {
  const router = useRouter();

  const productDetail = {
    title: 'Nike Air Max 270',
    price: '160',
    genre: 'Women',
    description:
      'Boasting the first-ever Max Air unit created specifically for Nike Sportswear, the Nike Air Max 270 delivers an Air unit that absorbs and gives back energy with every springy step. Updated for modern comfort, it nods to the original, 1991 Air Max 180 with its exaggerated tongue top and heritage tongue logo.',
    imageUrls: [
      '/product-details-mock/product-img-1.svg',
      '/product-details-mock/product-img-2.svg',
      '/product-details-mock/product-img-3.svg',
      '/product-details-mock/product-img-4.svg',
      '/product-details-mock/product-img-5.svg',
      '/product-details-mock/product-img-6.svg',
      '/product-details-mock/product-img-7.svg',
    ],
    sizes: [36, 37, 38, 39, 40, 42, 44, 46, 48, 50],
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', xl: 'row' },
          px: { xs: 2, lg: '0' },
          pr: { lg: 1 },
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <ProductDetailsImageSlider imageUrls={productDetail.imageUrls} />

        <ProductDetailsView id={id} {...productDetail} />
      </Box>
      <Button
        onClick={() => router.push('/profile/products')}
        variant="contained"
        sx={{
          display: 'block',
          mx: 'auto',
          my: 4,
          color: '#FFF',
          bgcolor: 'secondary.light',
          ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
        }}
      >
        Back to My Products
      </Button>
    </Box>
  );
}
