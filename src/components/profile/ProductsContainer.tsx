'use client';

import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import useGetProducts from '@/hooks/useGetProducts';

export default function Products() {
  const { filterProducts } = useGetProducts();
  const products = useQuery({
    queryKey: ['products'],
    queryFn: filterProducts,
  });

  if (products.isLoading)
    return <Typography variant="h1">Loading products...please wait</Typography>;
  if (products.isError)
    return <Typography>{JSON.stringify(products.error, null, 2)}</Typography>;

  return (
    <Box
      sx={{
        mt: 6,
        width: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          rowGap: 4,
        }}
      >
        {products.data &&
          products.data?.map(product => (
            <ProductCard key={product.id} product={{ ...product }} />
          ))}
      </Box>
    </Box>
  );
}
