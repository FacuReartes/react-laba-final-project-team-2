'use client';

import { useEffect, useState } from 'react';
import { ProductType } from '@/lib/definitions';
import { Box } from '@mui/material';
import ProductCard from './ProductCard';

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const req = await fetch('/api/products');
      if (!req.ok) {
        throw new Error('Something went wrong!');
      }
      const res = await req.json();
      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An error occurred');
      }
    }
  };

  const loaderProducts = async () => {
    const products = await fetchProducts();
    if (products.length > 0) {
      setProducts(products);
    }
  };

  useEffect(() => {
    loaderProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
