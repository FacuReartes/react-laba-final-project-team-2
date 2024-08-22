"use client";

import { useEffect, useState } from "react";
import Product from "./Product";
import { ProductType } from "@/lib/definitions";
import { Container, Grid } from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const req = await fetch("api/products");
      if (!req.ok) {
        throw new Error("Something went wrong!");
      }
      const res = await req.json();
      return res;
    } catch (error: any) {
      console.log(error.message);
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
    <Container sx={{ mt: 6 }}>
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
