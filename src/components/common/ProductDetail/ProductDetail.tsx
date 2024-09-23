'use client';
import { Box, Button } from '@mui/material';
import ProductDetailsView from './ProductsDetailsView';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import useGetProductDetail from '@/hooks/useGetProductDetail';
import ProductDetailsImageSlider from './ProductDetailsImageSlider';

export default function ProductDetail({ params }: { params: number }) {
  const router = useRouter();
  const path = usePathname();
  const pathName = path.split('/');

  const { data: product } = useQuery(useGetProductDetail(params));

  function handleRedirect() {
    if (pathName.includes('product')) {
      router.push('/');
    } else {
      router.push('/profile/products');
    }
  }

  if (product) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
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
          onClick={handleRedirect}
          variant="contained"
          sx={{
            display: 'block',
            mx: 'auto',
            my: 4,
            color: 'common.white',
            bgcolor: 'secondary.light',
            ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
          }}
        >
          {pathName.includes('product')
            ? 'Go back Home'
            : 'Back to My Products'}
        </Button>
      </Box>
    );
  }
}