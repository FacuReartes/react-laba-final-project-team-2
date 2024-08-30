import { Box, Typography, ToggleButton } from '@mui/material';
import React from 'react';

export interface ProductSizeButtonsProps {
  productSizes: { size: string; status: boolean }[];
  sizeOptions: string[];
  onProductSizesButtonsChange: (productSizes: { size: string; status: boolean }[]) => void;
}

export default function ProductSizesButtons({
  productSizes,
  // sizeOptions,
  onProductSizesButtonsChange,
}: ProductSizeButtonsProps) {
  const handleToggleSize = (size: string) => {
    const updatedSizes = productSizes.map((selected) =>
      selected.size === size ? { ...selected, status: !selected.status } : selected
    );
    onProductSizesButtonsChange(updatedSizes);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add size
      </Typography>
      <Box sx={{ display: 'flex', gap: { lg: '16px' }, justifyContent: { xs: 'space-between' } }}>
        {productSizes.map((selected) => (
          <ToggleButton
            id={`id-products-size-${selected.size}`}
            key={`key-size-${selected.size}`}
            name={`product-size-${selected.size}`}
            value={selected.size}
            selected={selected.status}
            onChange={() => handleToggleSize(selected.size)}
            sx={{
              width: { lg: '74px', xs: '56px' },
              fontSize: { lg: '15px', xs: '10px' },
              height: { lg: '48px', xs: '34px' },
            }}
            color="secondary"
          >
            {selected.size}
          </ToggleButton>
        ))}
      </Box>
    </Box>
  );
}
