import { Box, Typography, Select, MenuItem, SelectChangeEvent, FormHelperText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface ProductSelectProps {
  queryObj: {
    queryKey: string[];
    queryFn: () => Promise<any>;
  };
  // value?: string | number;
  // onChange?: (event: SelectChangeEvent<string | number>) => void;
}

export default function ProductSelect({ queryObj }: ProductSelectProps) {
  const { queryKey, queryFn } = queryObj;

  const { data: properties } = useQuery({
    queryKey,
    queryFn,
  });

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValue = watch(queryKey[0]);

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    setValue(queryKey[0], event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 1, fontSize: { lg: '15px', xs: '12px' } }}>
        {queryKey[0].charAt(0).toUpperCase() + queryKey[0].slice(1)}
      </Typography>
      <Select
        {...register(queryKey[0])}
        value={selectedValue || ''}
        onChange={handleChange}
        placeholder={`Select ${queryKey[0]}`}
        sx={{ width: '100%', fontSize: { xs: '12px', lg: '15px' } }}
        defaultValue={properties ? properties[0].id : ''}
        error={Boolean(errors[queryKey[0]])}
      >
        {Array.isArray(properties) && properties.map(
          (property: { id: number; attributes: { name: string } }) => (
            <MenuItem key={property.id} value={property.id}>
              {property.attributes.name}
            </MenuItem>
          )
        )}
      </Select>
      {errors[queryKey[0]] && <FormHelperText error>{errors[queryKey[0]]?.message as string}</FormHelperText>}
    </Box>
  );
}
