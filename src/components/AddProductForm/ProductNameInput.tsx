import { Box, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';

export interface ProductNameInputProps {
  productName: string;
  onProductNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductNameInput({
  productName,
  onProductNameChange,
}: ProductNameInputProps) {
  return (
    <Box>
      <InputLabel htmlFor="id-product-name" sx={{ mb: 1 }}>
        Product name
      </InputLabel>
      <OutlinedInput
        id="id-product-name"
        name="product-name"
        type="text"
        placeholder="Insert product name"
        value={productName}
        onChange={onProductNameChange}
        sx={{ fontSize: '15px' }}
        fullWidth
      />
    </Box>
  );
}
