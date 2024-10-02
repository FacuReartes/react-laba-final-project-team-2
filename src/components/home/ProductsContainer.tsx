import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { APIProductsType } from '@/lib/apiDataTypes';
import { useContext } from 'react';
import { CartContext, ICartContext } from '@/context/CartContext';
import EmptyProducts from './EmptyProducts';

interface Props {
  products: APIProductsType[];
}

export default function ProductsContainer({ products }: Props) {
  const { handleAddToCart } = useContext(CartContext) as ICartContext;

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
      {Array.isArray(products) && products.length > 0 ? (
        products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))
      ) : (
        <EmptyProducts />
      )}
    </Box>
  );
}
