'use client';
import { Box, Button } from '@mui/material';
import ProductDetailsView from './ProductsDetailsView';
import ProductDetailsImageSlider from './ProductDetailsImageSlider';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/lib/definitions';

export default function ProductDetail({ product }: { product: ProductType }) {
  const router = useRouter();
  if (product) {
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', xl: 'row' },
            px: { xs: 2, lg: '0' },
            pt: 2,
            pr: { lg: 1 },
            gap: { xs: 1, md: 8 },
          }}
        >
          <ProductDetailsImageSlider
            imageUrls={product.attributes?.images?.data}
          />

          <ProductDetailsView {...product} />
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
}
