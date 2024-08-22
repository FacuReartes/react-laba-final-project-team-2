import { ProductType } from "@/lib/definitions";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";

interface PProps {
  product: ProductType;
}

export default function Product({ product }: PProps) {
  return (
    <Grid xs={3} sx={{ display: "flex", flexDirection: "column" }}>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={320}
        height={380}
      />
      <Box>
        <Typography>{product.name}</Typography>
        <Typography>{product.price}</Typography>
      </Box>
      <Typography>
        {product.gender === "Man"
          ? "Men"
          : product.gender === "Woman"
          ? "Women"
          : "Unisex"}
        {"'"}s Shoes
      </Typography>
    </Grid>
  );
}
