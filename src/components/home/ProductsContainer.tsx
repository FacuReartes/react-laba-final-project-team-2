import { Box } from '@mui/material';
import ProductCard from '../common/ProductCard';
import { APIProductsType } from '@/lib/apiDataTypes';
import { useContext } from 'react';
import { CartContext, ICartContext } from '@/context/cart/CartContext';
import EmptyProducts from './EmptyProducts';
import { InfiniteData } from '@tanstack/react-query';
import UserNotification from '../common/UserNotification';
import {
  IWishListContext,
  WishListContext,
} from '@/context/wishlist/WishListContext';

interface Props {
  data: InfiniteData<any, unknown> | undefined;
  spanRef: React.Ref<HTMLSpanElement>;
}

export default function ProductsContainer({ data, spanRef }: Props) {
  const { handleAddToCart } = useContext(CartContext) as ICartContext;
  const { isSuccess, handleClose, message } = useContext(
    WishListContext
  ) as IWishListContext;
  const allProducts = data?.pages.flatMap(page => page.data) || [];
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        },
        columnGap: { xs: '16px', md: '50px' },
        rowGap: { xs: '16px', md: '40px' },
        height: '100%',
      }}
    >
      {data && allProducts.length > 0 ? (
        data.pages.flatMap(
          (products: {
            data: APIProductsType[];
            meta: {
              pagination: {
                page: number;
                pageCount: number;
                pageSize: number;
                total: number;
              };
            };
          }) =>
            products.data.map((product: APIProductsType) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                upperHeight="380px"
              />
            ))
        )
      ) : (
        <EmptyProducts />
      )}
      <UserNotification
        handleClose={handleClose}
        message={message}
        type={'success'}
        open={isSuccess}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 0,
        }}
        ref={spanRef}
      />
    </Box>
  );
}
