'use client';
import { APIProductsType } from '@/lib/apiDataTypes';

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Popup from '../common/Popup';
import { useRouter } from 'next/navigation';

interface PProps {
  product: APIProductsType;
  handleAddToCart: (
    product: APIProductsType,
    selectedSize: number | string
  ) => void;
}

export default function ProductCard({ product, handleAddToCart }: PProps) {
  const router = useRouter();
  const [onHover, setOnHover] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSizeChange = (event: SelectChangeEvent<number | string>) => {
    setSelectedSize(event.target.value as string | number);
  };

  const handleAddToCartClick = () => {
    handleAddToCart(product, selectedSize);
    handleClose();
    setOnHover(false);
  };

  return (
    product.attributes?.images.data && (
      <Box
        sx={{
          width: { md: '320px', xs: '152px' },
          margin: { md: '0 30px 60px', xs: '0 0 16px' },
          p: 2,
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          color: 'common.black',
          transition: 'transform 0.3s, box-shadow 0.3s',
          boxShadow: onHover
            ? '0 0 18px 10px rgba(0,0,0,0.15)'
            : '0 0 8px rgba(0,0,0,0.1)',
          transform: onHover ? 'scale(1.03)' : 'scale(1)',
        }}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <Box
          sx={{
            position: 'relative',
            width: { md: '320px', xs: '100%' },
            height: { md: '380px', xs: '180px' },
            overflow: 'hidden',
            borderRadius: '8px',
          }}
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
              columnGap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backdropFilter: 'brightness(50%)',
            }}
          >
            <IconButton
              sx={{
                width: '80px',
                height: '80px',
                bgcolor: 'rgba(255,255,255,0.9)',
                fontSize: '10px',
                borderRadius: '50%',
                transition: 'transform 0.3s',
                ':hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'scale(1.1)',
                },
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
              }}
              onClick={handleClickOpen}
            >
              <img src="./assets/add-shopping-basket.svg" />
              Add to Cart
            </IconButton>
            <IconButton
              sx={{
                width: '80px',
                height: '80px',
                bgcolor: 'rgba(255,255,255, 0.9)',
                fontSize: '10px',
                borderRadius: '50%',
                transition: 'transform 0.3s',
                ':hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'scale(1.1)',
                },
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
              }}
              onClick={() => router.push(`/product/${product?.id}`)}
            >
              <ManageSearchIcon />
              View details
            </IconButton>
          </Box>
          {product?.attributes?.images?.data[0]?.attributes?.url && (
            <Image
              src={product.attributes.images.data[0].attributes.url}
              alt={product.attributes.name}
              fill
              style={{
                objectFit: 'contain',
                transition: 'transform 0.5s ease',
                transform: onHover ? 'scale(1.1)' : 'scale(1)',
              }}
              sizes="800px"
            />
          )}
        </Box>
        <Link
          href={`product/${product.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
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
              ${Number(product.attributes.price.toFixed(2))}
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

        <Popup
          onClose={handleClose}
          title={product?.attributes?.name}
          open={open}
          actions={
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAddToCartClick} disabled={!selectedSize}>
                Add to Cart
              </Button>
            </>
          }
        >
          <FormControl fullWidth>
            <InputLabel id="size-select-label">Size</InputLabel>
            <Select
              labelId="size-select-label"
              value={selectedSize}
              onChange={handleSizeChange}
            >
              {product?.attributes?.sizes?.data?.map(size => (
                <MenuItem key={size?.id} value={size?.attributes?.value}>
                  {size?.attributes?.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Popup>
      </Box>
    )
  );
}
