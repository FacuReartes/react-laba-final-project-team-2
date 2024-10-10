import { Box, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProductNameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      <InputLabel htmlFor="id-product-name" sx={{ mb: 1 }}>
        Product name
      </InputLabel>
      <OutlinedInput
        id="id-product-name"
        type="text"
        placeholder="Insert product name"
        sx={{ fontSize: '15px' }}
        fullWidth
        {...register('name')}
        error={Boolean(errors.name)}
      />
      {errors.name && <FormHelperText error>{errors.name.message as string}</FormHelperText>}
    </Box>
  );
}
