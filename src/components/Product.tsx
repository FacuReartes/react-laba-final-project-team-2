import { ProductType } from "@/lib/definitions";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface PProps {
  product: ProductType;
}

export default function Product({ product }: PProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", color: "#000" }}>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={320}
        height={380}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "12px" }}
      >
        <Typography
          sx={{ fontSize: { xs: "10px", md: "22px" }, fontWeight: "500" }}
        >
          {product.name}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "10px", md: "22px" }, fontWeight: "500" }}
        >
          ${product.price}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "9px", md: "18px" },
          fontWeight: "500",
          color: "#5C5C5C",
        }}
      >
        {product.gender === "Man"
          ? "Men"
          : product.gender === "Woman"
          ? "Women"
          : "Unisex"}
        {"'"}s Shoes
      </Typography>
    </Box>
  );
}
