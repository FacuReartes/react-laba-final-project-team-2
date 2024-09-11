'use client';

import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { ProductType } from '@/lib/definitions';
import ProductsEmptyState from './ProductsEmptyState';

export default function Products({
  loading,
  products,
}: {
  loading: boolean;
  products: ProductType[];
}) {
  if (loading)
    return <Typography variant="h1">Loading products...please wait</Typography>;

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
          columnGap: 1,
        }}
      >
        {products && products?.length > 0 ? (
          products.map((product: ProductType) => (
            <ProductCard key={product.id} product={{ ...product }} />
          ))
        ) : (
          <ProductsEmptyState />
        )}
      </Box>
    </Box>
  );
}
