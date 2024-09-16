import { 
  Box, 
  Typography, 
  Select, 
  MenuItem 
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { 
  Controller, 
  useFormContext 
} from 'react-hook-form';

export default function ProductCategorySelect() {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return axios.get(
        'https://shoes-shop-strapi.herokuapp.com/api/categories',
      )
    },
    staleTime: 1000 * 60 * 5,
  })

  const { formState: { errors }, control } = useFormContext()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Box sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Categories
      </Typography>
      <Controller
        name='categories'
        control={control}
        defaultValue={[data?.data.data[0].id]}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={'Select categories'}
            sx={{ width: '100%', fontSize: '15px' }}
            error={Boolean(errors.categories)}
            defaultValue={[data?.data.data[0].id]}
            multiple
          >
            { data?.data.data.map((x: { id: number, attributes: { name: string }}) => (
            <MenuItem 
              key={x.id} 
              value={x.id}>
              {x.attributes.name}
            </MenuItem>
            ))}
          </Select>
        )}
      />
    </Box>
  );
}
