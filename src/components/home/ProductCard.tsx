'use client';
import { APIProductsType } from '@/lib/apiDataTypes';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface PProps {
  product: APIProductsType;
}

export default function ProductCard({ product }: PProps) {
  const [onHover, setOnHover] = useState(false);

  return (
    <Box
      sx={{
        width: { md: '320px', xs: '152px' },
        display: 'flex',
        flexDirection: 'column',
        color: 'common.black',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { md: '320px', xs: '152px' },
          height: { md: '380px', xs: '180px' },
        }}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <Box
          sx={{
            display: onHover ? 'flex' : 'none',
            position: 'absolute',
            width: '320px',
            height: '380px',
            top: '0',
            left: '0',
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{
              width: '80px',
              height: '80px',
              bgcolor: 'rgba(255,255,255,0.75)',
              fontSize: '8px',
              borderRadius: '50%',
              ':hover': {
                bgcolor: 'rgba(255,255,255,0.75)',
              },
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
            }}
          >
            <img src="./assets/add-shopping-basket.svg" />
            Add to Chart
          </IconButton>
        </Box>
        {product?.attributes?.images?.data[0]?.attributes?.url && (
          <Image
            src={product.attributes.images.data[0].attributes.url}
            alt={product.attributes.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="800px"
          />
        )}
      </Box>
      <Link
        href={`/${product.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', mt: '12px' }}
        >
          <Typography
            sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
          >
            {product.attributes.name}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
          >
            ${product.attributes.price}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '9px', md: '18px' },
            fontWeight: '500',
            color: 'grey.100',
          }}
        >
          {`${product.attributes.gender.data.attributes.name}'s Shoes`}
        </Typography>
      </Link>
    </Box>
  );
}
