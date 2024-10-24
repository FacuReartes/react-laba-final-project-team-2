import AIButton from '@/components/chat/AIButton/AIButton';
import { Box, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProductDescriptionInput({ onClick, loading }: { onClick: () => void, loading: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      <InputLabel htmlFor="id-product-description" sx={{ mb: 1 }}>
        Description
      </InputLabel>
      <Box position='relative'>
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
        <Box position='absolute' right={10} bottom={10}>
          <AIButton onClick={onClick} disabled={loading} />
        </Box>
      </Box>
      {errors.description && <FormHelperText error>{errors.description.message as string}</FormHelperText>}
    </Box>
  );
}
