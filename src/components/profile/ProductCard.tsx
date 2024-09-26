'use client';
import { ProductType } from '@/lib/definitions';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import ProductsModal from './ProductsModal';
import { useRef, useState } from 'react';
import useOutSideClick from '../../hooks/useOutsideClick';

interface PProps {
  product: ProductType;
}

export default function ProductCard({ product }: PProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutSideClick(ref, () => setOpen(false));

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
      <Box sx={{ position: 'relative', width: '320px' }}>
        {
          <Image
            src={product?.attributes?.images?.data[0]?.attributes?.url}
            alt={product?.attributes?.name}
            width={320}
            height={380}
            style={{ objectFit: 'contain' }}
          />
        }
        <Button
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            color: 'common.black',
            px: 1,
            fontSize: '24px',
          }}
          onClick={() => setOpen(true)}
        >
          ...
        </Button>
        <Box ref={ref}>
          <ProductsModal open={open} id={product.id} />
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: '12px' }}
      >
        <Typography
          sx={{
            fontSize: { xs: '10px', md: '22px' },
            fontWeight: '500',
            width: '220px',
          }}
        >
          {product?.attributes?.name}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
        >
          ${product?.attributes?.price}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '9px', md: '18px' },
          fontWeight: '500',
          color: 'common.100',
        }}
      >
        {product?.attributes?.gender?.data?.attributes?.name === 'Men'
          ? 'Men'
          : product?.attributes?.gender?.data?.attributes?.name === 'Women'
            ? 'Women'
            : 'Unisex'}
        {"'"}s Shoes
      </Typography>
    </Box>
  );
}
