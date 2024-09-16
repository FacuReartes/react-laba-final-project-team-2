import { 
  Box, 
  Typography, 
  Select, 
  MenuItem 
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProductSelect({ name }: { name: string }) {

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: [name],
    queryFn: () => {
      return axios.get(
        `https://shoes-shop-strapi.herokuapp.com/api/${name}s`,
      )
    },
    staleTime: 1000 * 60 * 5,
  })

  const { register, formState: { errors }, setValue } = useFormContext()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (isSuccess) {
    setValue(name, data?.data.data[0].id)
  }

  return (
    <Box sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>
      <Select
        placeholder={`Select ${name}`}
        sx={{ width: '100%', fontSize: '15px' }}
        {...register(name)}
        error={Boolean(errors[name])}
        defaultValue={data?.data.data[0].id}
      >
        { data?.data.data.map((x: { id: number, attributes: { name: string } }) => (
          <MenuItem key={x.id} value={x.id}>
            {x.attributes.name}
          </MenuItem>
        )) }

      </Select>
    </Box>
  );
}
