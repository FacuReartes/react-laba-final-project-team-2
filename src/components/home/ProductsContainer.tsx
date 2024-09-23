import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { APIProductsType } from '@/lib/apiDataTypes';
import useCart from '@/hooks/useCart';

interface ProductsContainerProps {
  searchTerm: string;
  products: APIProductsType[];
}

export default function ProductsContainer({
  products,
}: ProductsContainerProps) {
  const { handleAddToCart } = useCart();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: { xs: '16px', md: '0' },
      }}
    >
      {Array.isArray(products) && products.length > 0
        ? products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))
        : 'No products Found'}
    </Box>
  );
}
