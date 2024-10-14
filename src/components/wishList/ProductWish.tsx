'use client';
import { APIProductsType } from '@/lib/apiDataTypes';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Popup from '../common/Popup';
import { useState } from 'react';

export default function ProductWish({
  product,
  removeWish,
}: {
  product: APIProductsType;
  removeWish: (id: number | string) => void;
}) {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          width: { xs: '152px', md: '320px' },
          height: { xs: '180px', md: '380px' },
          position: 'relative',
        }}
      >
        <Image
          src={product.attributes.images.data[0].attributes.url}
          alt={product.attributes.name}
          fill
          priority
          sizes="800px"
          style={{ objectFit: 'contain' }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: '10px',
            top: '20px',
            cursor: 'pointer',
            width: { xs: '22px', md: '44px' },
            height: { xs: '22px', md: '44px' },
            transition: 'transform 0.5s ease',
            ':hover': { opacity: '.6', transform: 'scale(1.2)' },
          }}
          onClick={() => setOpenPopup(true)}
        >
          <Image
            src={'/assets/wishlist-remove.svg'}
            alt="wishlist-remove"
            fill
            priority
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontSize: { xs: '10px', md: '22px' },
            fontWeight: '500',
            maxHeight: '35px',
            overflow: 'hidden',
          }}
        >
          {product.attributes.name}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: '10px', md: '22px' }, fontWeight: '500' }}
        >
          ${Number(product.attributes.price.toFixed(2))}
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: { xs: '9px', md: '18px' },
            fontWeight: '500',
            color: 'grey.100',
          }}
        >
          {`${product.attributes.gender.data.attributes.name}'s Shoes`}
        </Typography>
      </Box>
      <Popup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        actions={
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={() => setOpenPopup(false)}
              variant="outlined"
              sx={{
                display: { xs: 'none', md: 'block' },
                color: 'secondary.main',
                borderColor: 'secondary.main',
                ':hover': { borderColor: 'inherit' },
                fontSize: { xs: '12px', lg: '20px' },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => removeWish(product.id)}
              variant="contained"
              sx={{
                backgroundColor: 'secondary.main',
                ':hover': { backgroundColor: 'secondary.main', opacity: '.9' },
                fontSize: { xs: '12px', lg: '20px' },
              }}
            >
              Delete Wish Product
            </Button>
          </Box>
        }
      >
        <Typography sx={{ fontSize: { xs: '12px', md: '24px' } }}>
          Are you sure you want to delete:{' '}
          <strong>{product.attributes.name}</strong> from your wishlist?
        </Typography>
      </Popup>
    </Box>
  );
}
