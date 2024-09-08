'use client';

import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Products() {
  const products = useQuery({
    queryKey: ['products'],
    queryFn: filterProducts,
  });

  async function getProducts() {
    const req = axios(
      'https://shoes-shop-strapi.herokuapp.com/api/products?populate=*'
    );
    const res = (await req).data.data;
    return res;
  }

  async function filterProducts() {
    const result = await getProducts();
    return result.filter(
      (item: { id: string; attributes: { teamName: string } }) =>
        item.attributes.teamName === 'team-2'
    );
  }

  if (products.isLoading)
    return <Typography variant="h1">Loading products...please wait</Typography>;
  if (products.isError)
    return <Typography>{JSON.stringify(products.error, null, 2)}</Typography>;

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
        {products.data &&
          products.data?.map(product => (
            <ProductCard key={product.id} product={{ ...product }} />
          ))}
      </Box>
    </Box>
  );
}
