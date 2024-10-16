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
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      {wishList.length > 0 ? (
        wishList.map((wish: APIProductsType) => (
          <ProductWish product={wish} key={wish.id} removeWish={removeWish} />
        ))
      ) : (
        <ProductsEmptyState
          text="You dont have any products in your wishlist yet."
          path="/"
          buttonText="Add Products to Wishlist"
        />
      )}
    </Box>
  );
}
