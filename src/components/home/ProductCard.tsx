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
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Popup from '../common/Popup';

interface PProps {
  product: APIProductsType;
  handleAddToCart: (
    product: APIProductsType,
    selectedSize: number | string
  ) => void;
}

export default function ProductCard({ product, handleAddToCart }: PProps) {
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
  };

  return (
    product.attributes.images.data && (
      <Box
        sx={{
          width: { md: '320px', xs: '152px' },
          margin: { md: '0 30px 60px', xs: '0 0 16px' },
          display: 'flex',
          flexDirection: 'column',
          color: 'common.black',
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
              onClick={handleClickOpen}
            >
              <img src="./assets/add-shopping-basket.svg" />
              Add to Cart
            </IconButton>
          </Box>
          {product?.attributes?.images?.data[0]?.attributes?.url && (
            <Image
              src={product.attributes.images.data[0].attributes.url}
              alt={product.attributes.name}
              fill
              style={{ objectFit: 'contain' }}
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
