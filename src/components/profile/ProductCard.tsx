'use client';

import { ProductType } from '@/lib/definitions';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import ProductsModal from './ProductsModal';
import { useRef, useState } from 'react';
import useOutSideClick from '../../hooks/common/useOutsideClick';

interface PProps {
  product: ProductType;
}

export default function ProductCard({ product }: PProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutSideClick(ref, () => setOpen(false));

  const productImage = product?.attributes?.images?.data[0]?.attributes?.url;
  const productName = product?.attributes?.name;
  const productPrice = product?.attributes?.price;
  const productGender = product?.attributes?.gender?.data?.attributes?.name;

  const handleModalOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        color: 'common.black',
        position: 'relative',
        width: 'auto',
      }}
    >
      <Box sx={{ position: 'relative', width: {xs: '300px', sm: '320px'}, height: '380px' }}>
        {productImage && (
          <Image
            src={productImage ?? '/no-img.webp'}
            alt={productName}
            fill
            sizes='100%'
            style={{ objectFit: productImage ? 'contain' : 'scale-down' }}
          />
        )}
        <Button
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            color: 'common.black',
            px: 1,
            fontSize: '24px',
          }}
          onClick={handleModalOpen}
        >
          ...
        </Button>
        <Box ref={ref}>
          <ProductsModal open={open} id={product.id} product={product} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '12px' }}>
        <Typography
          sx={{
            fontSize: { xs: '10px', md: '22px' },
            fontWeight: '500',
            width: '220px',
          }}
        >
          {productName}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
        >
          ${productPrice}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '9px', md: '18px' },
          fontWeight: '500',
          color: 'common.100',
        }}
      >
        {productGender === 'Men'
          ? 'Men'
          : productGender === 'Women'
          ? 'Women'
          : 'Unisex'}{"'"}s Shoes
      </Typography>
    </Box>
  );
}
