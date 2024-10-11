import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { APIProductsType } from '@/lib/apiDataTypes';
import { useContext } from 'react';
import { CartContext, ICartContext } from '@/context/CartContext';
import EmptyProducts from './EmptyProducts';
import { InfiniteData } from '@tanstack/react-query';
import UserNotification from '../common/UserNotification';
import { IWishListContext, WishListContext } from '@/context/WishListContext';

interface Props {
  data: InfiniteData<any, unknown> | undefined;
}

export default function ProductsContainer({ data }: Props) {
  const { handleAddToCart } = useContext(CartContext) as ICartContext;
  const { isSuccess, handleClose, message } = useContext(
    WishListContext
  ) as IWishListContext;
  const allProducts = data?.pages.flatMap(page => page.data) || [];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        columnGap: { xs: '16px', md: '60px' },
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
                width="320px"
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
    </Box>
  );
}
