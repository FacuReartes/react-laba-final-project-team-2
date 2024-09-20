import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { APIProductsType } from '@/lib/apiDataTypes';

interface ProductsContainerProps {
  searchTerm: string;
  products: APIProductsType[];
}

export default function ProductsContainer({
  products,
}: ProductsContainerProps) {
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
            <ProductCard key={product.id} product={product} />
          ))
        : 'No products Found'}
    </Box>
  );
}
