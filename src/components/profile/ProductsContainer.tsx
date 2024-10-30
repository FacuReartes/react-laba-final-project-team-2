'use client';

import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { ProductType } from '@/lib/definitions';
import ProductsEmptyState from '../common/ProductsEmptyState';

interface ProductsContainerProps {
  products: ProductType[];
}

export default function ProductsContainer({
  products,
}: ProductsContainerProps) {
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
        {products && products.length > 0 ? (
          products.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <ProductsEmptyState
            text="You don't have any products yet."
            path="/profile/products/add-product"
            buttonText="Add Product"
          />
        )}
      </Box>
    </Box>
  );
}
