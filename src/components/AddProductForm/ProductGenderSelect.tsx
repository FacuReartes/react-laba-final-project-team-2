import { Box, Typography, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import React from "react";

export interface ProductGenderSelectProps {
  productGender: string;
  onProductGenderChange: (event: SelectChangeEvent<string>) => void;
}

export default function ProductGenderSelect({
  productGender,
  onProductGenderChange,
}: ProductGenderSelectProps) {
  return (
    <Box sx={{ width: "50%" }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Gender
      </Typography>
      <Select
        id="id-product-gender"
        name="product-gender"
        placeholder="Select gender"
        value={productGender}
        onChange={onProductGenderChange}
        sx={{ width: "100%", fontSize: "15px" }}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>
    </Box>
  );
}
