'use client';

import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Products() {
  const products = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  async function getProducts() {
    const req = axios(
      'https://shoes-shop-strapi.herokuapp.com/api/products?populate=*'
    );
    const res = (await req).data.data.filter(
      item => item.attributes.teamName === 'team-2'
    );
    return res;
  }

  console.log(products.data);

  return (
    <Box
      sx={{
        mt: 6,
        width: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          rowGap: 4,
        }}
      >
        {products.data?.map(product => (
          <ProductCard key={product.id} product={{ ...product }} />
        ))}
      </Box>
    </Box>
  );
}
