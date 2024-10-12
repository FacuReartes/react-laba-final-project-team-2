import { Box } from '@mui/material';
import React from 'react';
import OrderProductsItem from './OrderProductsItem';

export default function OrderProductsList({
  products,
}: {
  products: {
    id: number;
    size: { id: number; value: number };
    quantity: number;
  }[];
}) {
  return (
    <Box
      sx={{
        p: { md: '16px', xs: '16px 0' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {products.map(product => (
        <OrderProductsItem
          key={`order-product-${product.id}`}
          product={product}
        />
      ))}
    </Box>
  );
}
