'use client';

import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import useGetProducts from '@/hooks/useGetProducts';
import { ProductType } from '@/lib/definitions';
import ProductsEmptyState from './ProductsEmptyState';
import Loading from '@/components/common/Loading';

export default function Products() {
  const { products, loading } = useGetProducts();

  if (loading)
    return <Loading message="Loading products...please wait" overlay />;

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
