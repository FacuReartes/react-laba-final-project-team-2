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
    product.attributes.images.data && (
      <Box
        sx={{
          width: { md: '320px', xs: '152px' },
          margin: { md: '0 30px 60px', xs: '0 0 16px' },
          display: 'flex',
          flexDirection: 'column',
          color: '#000',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { md: '320px', xs: '100%' },
            height: { md: '380px', xs: '180px' },
          }}
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
        >
          <Box
            sx={{
              display: onHover ? 'flex' : 'none',
              position: 'absolute',
              width: { md: '320px', xs: '100%' },
              height: { md: '380px', xs: '180px' },
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
          style={{ textDecoration: 'none', color: '#000000' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: '12px',
            }}
          >
            <Typography
              sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
            >
              {product.attributes.name}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
            >
              ${product.attributes.price.toFixed(2)}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '9px', md: '18px' },
              fontWeight: '500',
              color: '#5C5C5C',
            }}
          >
            {`${product.attributes.gender.data.attributes.name}'s Shoes`}
          </Typography>
        </Link>
      </Box>
    )
  );
}
