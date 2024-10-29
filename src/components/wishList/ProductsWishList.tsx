'use client';
import { Box } from '@mui/material';
import ProductWish from './ProductWish';
import { APIProductsType } from '@/lib/apiDataTypes';
import ProductsEmptyState from '../common/ProductsEmptyState';
import { useContext } from 'react';
import {
  IWishListContext,
  WishListContext,
} from '@/context/wishlist/WishListContext';

export default function ProductsWishList() {
  const { wishList, removeWish } = useContext(
    WishListContext
  ) as IWishListContext;
  return (
    <Box
      sx={{
        my: { xs: '20px', sm: '40.8px' },
        p: 0,
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        },
        columnGap: { xs: '16px', md: '45px', xl: '60px' },
        rowGap: { xs: '16px', md: '40px' },
      }}
    >
      {wishList.length > 0 ? (
        wishList.map((wish: APIProductsType) => (
          <ProductWish product={wish} key={wish.id} removeWish={removeWish} />
        ))
      ) : (
        <ProductsEmptyState
          text="You don't have any products in your wishlist yet."
          path="/"
          buttonText="Add Products to Wishlist"
        />
      )}
    </Box>
  );
}
