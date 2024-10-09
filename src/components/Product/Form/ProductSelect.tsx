import { Box, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface ProductSelectProps {
  queryObj: {
    queryKey: string[];
    queryFn: () => Promise<any>;
  };
  value?: string | number;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
}

export default function ProductSelect({ queryObj, value, onChange }: ProductSelectProps) {
  const { queryKey, queryFn } = queryObj;

  const { data: properties } = useQuery({
    queryKey,
    queryFn,
  });

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 1, fontSize: { lg: '15px', xs: '12px' } }}>
        {queryKey[0].charAt(0).toUpperCase() + queryKey[0].slice(1)}
      </Typography>
      <Select
        value={value || ''}
        placeholder={`Select ${queryKey[0]}`}
        sx={{ width: '100%', fontSize: { xs: '12px', lg: '15px' } }}
        onChange={onChange}
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
    </Box>
  );
}
