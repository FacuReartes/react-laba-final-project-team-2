import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { useProducts } from '@/context/ProductsContext';
import { APIProductsType } from '@/lib/apiDataTypes';
import { FilterTypes } from '@/hooks/useFilter';

interface ProductsContainerProps {
  filter: FilterTypes;
}

export default function ProductsContainer({ filter }: ProductsContainerProps) {
  const { products } = useProducts();

  const filterData = (data: APIProductsType[], filters: FilterTypes) => {
    return data.filter(product => {
      if (
        filters?.gender &&
        product.attributes.gender.data.attributes.name !== filters.gender
      ) {
        return false;
      }
      if (
        filters?.brands &&
        filters.brands.length > 0 &&
        !filters.brands.includes(product.attributes.brand.data.attributes.name)
      ) {
        return false;
      }
      if (filters.prices && filters.prices.length === 2) {
        const [minPrice, maxPrice] = filters.prices;
        if (
          product.attributes.price < minPrice ||
          product.attributes.price > maxPrice
        ) {
          return false;
        }
      }
      if (
        filters?.colors &&
        filters.colors.length > 0 &&
        !filters.colors.includes(product.attributes.color.data.attributes.name)
      ) {
        return false;
      }
      return true;
    });
  };

  return (
    <Box
      sx={{
        width: 'fit-content',
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-start' },
        flexWrap: 'wrap',
        gap: { md: '67px', xs: '16px' },
      }}
    >
      {products.length > 0
        ? filter !== undefined &&
          filterData(products, filter).map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        : 'No products Found'}
    </Box>
  );
}
