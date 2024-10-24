import { Box } from '@mui/material';
import React from 'react';
import OrderProductsItem from './OrderProductsItem';

interface Props {
  products: {
    id: number;
    size: string;
    quantity: number;
    gender: string;
  }[];
}
export default function OrderProductsList({ products }: Props) {
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
