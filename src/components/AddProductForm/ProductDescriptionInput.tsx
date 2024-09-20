import { 
  Box, 
  InputLabel, 
  OutlinedInput 
} from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProductDescriptionInput() {

  const { register, formState: { errors } } = useFormContext()

  return (
    <Box>
      <InputLabel htmlFor="id-product-description" sx={{ mb: 1 }}>
        Description
      </InputLabel>
      <OutlinedInput
        id="id-product-description"
        type="text"
        placeholder="Do not exceed 300 characters."
        minRows={10}
        inputProps={{ maxLength: 300 }}
        multiline
        fullWidth
        {...register('description')}
        error={Boolean(errors.description)}
      />
    </Box>
  );
}
