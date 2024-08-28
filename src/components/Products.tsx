'use client';

import { useEffect, useState } from 'react';
import Product from './Product';
import { ProductType } from '@/lib/definitions';
import { Box } from '@mui/material';

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
    } catch (error: unknown) {
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
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          justifyContent: {
            xs: 'center',
            md: 'normal',
          },
        }}
      >
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
