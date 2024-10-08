import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { APIProductsType } from '@/lib/apiDataTypes';
import { useContext } from 'react';
import { CartContext, ICartContext } from '@/context/CartContext';
import EmptyProducts from './EmptyProducts';
import { InfiniteData } from '@tanstack/react-query';

interface Props {
  data: InfiniteData<any, unknown> | undefined;
}

export default function ProductsContainer({ data }: Props) {
  const { handleAddToCart } = useContext(CartContext) as ICartContext;
  const allProducts = data?.pages.flatMap(page => page.data) || [];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: { xs: '16px', md: '0' },
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
              />
            ))
        )
      ) : (
        <EmptyProducts />
      )}
    </Box>
  );
}
