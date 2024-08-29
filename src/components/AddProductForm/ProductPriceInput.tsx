import { Box, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import React from "react";

export interface ProductPriceInputProps {
  productPrice: number | string;
  onProductPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const priceStylling = {
  "& input[type=number]": {
    MozAppearance: "textfield",
    fontSize: "15px",
  },
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
      fontSize: "15px",
    },
};

export default function ProductPriceInput({
  productPrice,
  onProductPriceChange,
}: ProductPriceInputProps) {
  return (
    <Box>
      <InputLabel htmlFor="id-product-price" sx={{ mb: 1 }}>
        Price
      </InputLabel>
      <OutlinedInput
        id="id-product-price"
        name="product-price"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        type="number"
        placeholder="Insert product price"
        value={productPrice}
        onChange={onProductPriceChange}
        sx={priceStylling}
        inputProps={{ min: 0, onWheel: (event) => event.currentTarget.blur(), step: "any" }}
        fullWidth
      />
    </Box>
  );
}
