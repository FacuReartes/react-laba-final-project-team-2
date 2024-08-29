import { Box, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";

export interface ProductDescriptionInputProps {
  productDescription: string;
  onProductDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductDescriptionInput({
  productDescription,
  onProductDescriptionChange,
}: ProductDescriptionInputProps) {
  return (
    <Box>
      <InputLabel htmlFor="id-product-description" sx={{ mb: 1 }}>
        Description
      </InputLabel>
      <OutlinedInput
        id="id-product-description"
        name="product-description"
        type="text"
        placeholder="Do not exceed 300 characters."
        value={productDescription}
        onChange={onProductDescriptionChange}
        minRows={10}
        inputProps={{ maxLength: 300 }}
        multiline
        fullWidth
      />
    </Box>
  );
}
