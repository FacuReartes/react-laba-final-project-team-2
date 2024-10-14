import { Box, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const priceStylling = {
  '& input[type=number]': {
    MozAppearance: 'textfield',
    fontSize: '15px',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
    {
      WebkitAppearance: 'none',
      margin: 0,
      fontSize: '15px',
    },
};

export default function ProductPriceInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      <InputLabel htmlFor="id-product-price" sx={{ mb: 1 }}>
        Price
      </InputLabel>
      <OutlinedInput
        id="id-product-price"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        type="number"
        placeholder="Insert product price"
        sx={priceStylling}
        fullWidth
        {...register('price', { valueAsNumber: true })}
        error={Boolean(errors.price)}
      />
      {errors.price && <FormHelperText error>{errors.price.message as string}</FormHelperText>}
    </Box>
  );
}
