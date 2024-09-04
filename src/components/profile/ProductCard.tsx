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

export default function Product({ product }: PProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutSideClick(ref, () => setOpen(false));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        color: '#000',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative', width: '320px' }}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={320}
          height={380}
        />
        <Button
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            color: '#292D32',
            px: 1,
            fontSize: '24px',
          }}
          onClick={() => setOpen(true)}
        >
          ...
        </Button>
        <Box ref={ref}>
          <ProductsModal open={open} />
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: '12px' }}
      >
        <Typography
          sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
        >
          {product.name}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
        >
          ${product.price}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '9px', md: '18px' },
          fontWeight: '500',
          color: '#5C5C5C',
        }}
      >
        {product.gender === 'Man'
          ? 'Men'
          : product.gender === 'Woman'
            ? 'Women'
            : 'Unisex'}
        {"'"}s Shoes
      </Typography>
    </Box>
  );
}
