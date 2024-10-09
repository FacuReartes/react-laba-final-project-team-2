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
        columnGap: { xs: '16px', md:'60px' },
        rowGap: { xs: '16px', md: '40px' },
        height: '100%',
      }}
    >
      {Array.isArray(products) && products.length > 0 ? (
        products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            width='320px' upperHeight='380px'
          />
        ))
      ) : (
        <EmptyProducts />
      )}
    </Box>
  );
}
