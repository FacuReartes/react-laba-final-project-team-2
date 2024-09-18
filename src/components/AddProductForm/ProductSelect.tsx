import { 
  Box, 
  Typography, 
  Select, 
  MenuItem 
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface ProductSelectProps {
  queryObj: {
    queryKey: string[];
    queryFn: () => Promise<any>;
  };
}

export default function ProductSelect( { queryObj }: ProductSelectProps) {

  const { queryKey, queryFn } = queryObj;

  const { data: properties } = useQuery({
    queryKey,
    queryFn
  })

  const { register, formState: { errors } } = useFormContext()

  return (
    <Box sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {queryKey[0].charAt(0).toUpperCase() + queryKey[0].slice(1)}
      </Typography>
      <Select
        placeholder={`Select ${queryKey[0]}`}
        sx={{ width: '100%', fontSize: '15px' }}
        {...register(queryKey[0])}
        error={Boolean(errors[queryKey[0]])}
        defaultValue={properties[0].id}
      >
        { properties.map((property: { id: number, attributes: { name: string } }) => (
          <MenuItem 
            key={property.id} 
            value={property.id}
          >
            {property.attributes.name}
          </MenuItem>
        )) }

      </Select>
    </Box>
  );
}
