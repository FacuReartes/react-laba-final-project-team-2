'use client';
import ProductDetail from '@/components/profile/ProductDetail';
import useGetProductDetail from '@/hooks/useGetProductDetail';
import { Box } from '@mui/material';

export default function Page({ params }: { params: { id: number } }) {
  const { product } = useGetProductDetail(params.id);
  return (
    <Box
      sx={{
        pb: 4,
        display: 'flex',
        ml: 1,
        width: 1,
      }}
    >
      <ProductDetail product={product} />
    </Box>
  );
}
