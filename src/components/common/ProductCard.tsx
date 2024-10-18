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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Popup from '../common/Popup';
import { useRouter } from 'next/navigation';
import {
  IWishListContext,
  WishListContext,
} from '@/context/wishlist/WishListContext';

interface PProps {
  product: APIProductsType;
  handleAddToCart: (
    product: APIProductsType,
    selectedSize: number | string
  ) => void;
  upperHeight: string;
}

export default function ProductCard({
  product,
  handleAddToCart,
  upperHeight,
}: PProps) {
  const { addWish, wishList, removeWish } = useContext(
    WishListContext
  ) as IWishListContext;

  const router = useRouter();
  const [onHover, setOnHover] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | string>('');

  const isInWishlist = wishList?.some(item => item.id === product.id);

  const handleWishListToggle = () => {
    if (isInWishlist) {
      removeWish(product.id);
    } else {
      addWish(product);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSizeChange = (event: SelectChangeEvent<number | string>) => {
    setSelectedSize(event.target.value as string | number);
  };

  const handleAddToCartClick = () => {
    handleAddToCart(product, selectedSize);
    handleCloseModal();
    setOnHover(false);
  };

  const imgUrl: string | undefined =
    product?.attributes?.images?.data[0]?.attributes?.url;

  return (
    product.attributes?.images.data && (
      <Box
        sx={{
          boxSizing: 'border-box',
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
            position: 'absolute',
            zIndex: 20,
            top: 25,
            right: 25,
            cursor: 'pointer',
          }}
          onClick={handleWishListToggle}
        >
          {isInWishlist ? (
            <FavoriteIcon sx={{ color: 'secondary.light' }} fontSize="large" />
          ) : (
            <FavoriteBorderIcon
              sx={{
                color: 'secondary.light',
              }}
              fontSize="large"
            />
          )}
        </Box>
        <Box
          sx={{
            position: 'relative',
            height: { md: upperHeight, xs: '180px' },
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              display: onHover ? 'flex' : 'none',
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 10,
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              backdropFilter: 'brightness(50%)',
            }}
          >
            <IconButton
              sx={{
                width: { xs: '60px', sm: '80px' },
                height: { xs: '60px', sm: '80px' },
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
              <img src="/assets/add-shopping-basket.svg" />
              <Typography
                sx={{
                  fontSize: '1em',
                  display: { xs: 'none', sm: 'inline-block' },
                }}
              >
                Add to Cart
              </Typography>
            </IconButton>
            <IconButton
              sx={{
                width: { xs: '60px', sm: '80px' },
                height: { xs: '60px', sm: '80px' },
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
              <Typography
                sx={{
                  fontSize: '1em',
                  display: { xs: 'none', sm: 'inline-block' },
                }}
              >
                View details
              </Typography>
            </IconButton>
          </Box>
          <Image
            src={imgUrl ?? '/no-img.webp'}
            alt={product.attributes.name}
            fill
            priority
            style={{
              transition: 'transform 0.5s ease',
              objectFit: imgUrl ? 'contain' : 'scale-down',
              transform: onHover ? 'scale(1.1)' : 'scale(1)',
            }}
            sizes="800px"
          />
        </Box>
        <Link
          href={`/product/${product.id}`}
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
              sx={{
                fontSize: { xs: '10px', md: '22px' },
                fontWeight: '500',
                maxHeight: { xs: '18px', md: '35px' },
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
          onClose={handleCloseModal}
          title={product?.attributes?.name}
          open={open}
          actions={
            <>
              <Button onClick={handleCloseModal}>Cancel</Button>
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
