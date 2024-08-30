import { Box, Typography, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import React from 'react';

export interface ProductBrandSelectProps {
  productBrand: string;
  brandOptions: { brand_id: number; brand_name: string }[];
  onProductBrandChange: (event: SelectChangeEvent<string>) => void;
}

export default function ProductBrandSelect({
  productBrand,
  brandOptions,
  onProductBrandChange,
}: ProductBrandSelectProps) {
  return (
    <Box sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Brand
      </Typography>
      <Select
        id="id-product-brand"
        name="product-brand"
        placeholder="Select brand"
        value={productBrand}
        onChange={onProductBrandChange}
        sx={{ width: '100%', fontSize: '15px' }}
      >
        {brandOptions.map((brand) => (
          <MenuItem
            key={`key-brand-${brand.brand_id}`}
            id={`id-brand-${brand.brand_id}`}
            value={brand.brand_id}
          >
            {brand.brand_name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
