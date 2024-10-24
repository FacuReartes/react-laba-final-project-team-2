import useGetProductDetail from '@/hooks/products/useGetProductDetail';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

interface Props {
  product: {
    id: number;
    size: string;
    quantity: number;
    gender: string;
  };
}
export default function OrderProductsItem({ product }: Props) {
  const { data, isLoading } = useQuery(useGetProductDetail(product.id));
  if (isLoading) {
    return <p>Loading product details...</p>;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: { md: '40px', xs: '10px' },
        flexWrap: { md: 'unset', xs: 'wrap' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          width: { md: '50%', xs: '100%' },
        }}
      >
        <Image
          src={data?.attributes.images.data[0].attributes.url}
          alt={data?.attributes.name}
          width={104}
          height={104}
          style={{ objectFit: 'contain' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            m: '14px 0',
          }}
        >
          <Typography sx={{ fontSize: '24px', fontWeight: 500 }}>
            {data?.attributes.name}
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 500, color: '#5C5C5C' }}
          >
            {data?.attributes.gender.data.attributes.name === 'Men'
              ? "Men's Shoes"
              : "Women's Shoes"}
          </Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>
            Size: {product.size} EU
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: { md: '50%', xs: '100%' },
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            Quantity:
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            {product.quantity}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: '14px', color: '#8C9196' }}
          >
            Price:
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            {data?.attributes.price * product.quantity}$
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
