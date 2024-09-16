import { 
  Box, 
  Typography, 
  ToggleButton, 
  ToggleButtonGroup 
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { 
  Controller, 
  useFormContext 
} from 'react-hook-form';

export default function ProductSizesButtons() {

  const {  data, isPending, isError, error } = useQuery({
    queryKey: ['sizes'],
    queryFn: () => {
      return axios.get(
        'https://shoes-shop-strapi.herokuapp.com/api/sizes',
      );
    },
    staleTime: 1000 * 60 * 5,
  })

  const { control, setValue } = useFormContext()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add size
      </Typography>
      <Box 
      sx={{ display: 'flex' , gap: { lg: '16px' }, 
        justifyContent: { xs: 'space-between' } 
      }}>
        <Controller
          name='sizes'
          control={control}
          render={({ field, formState: { errors } }) => (
            <ToggleButtonGroup
              {...field}
              
              onChange={(
                event: React.MouseEvent<HTMLElement>,
                value: string
              ) => {
                setValue(field.name, value)
              }}
              sx={{ display: 'grid', gap: '15px', 
                gridTemplateColumns: {xs: '1fr 1fr 1fr' ,sm: '1fr 1fr 1fr 1fr 1fr', lg: '1fr 1fr 1fr'}, 
                width: '100%', 
                border: errors.sizes && '1px solid #FE645E !important' 
              }}
            >
              {data.data.data.map((x: { id: number, attributes: { value: number } }) => (
                <ToggleButton
                  key={x.id}
                  value={x.id}
                  sx={{
                    width: '100%',
                    fontSize: { sm: '15px' },
                    height: { sm: '48px' },
                    border: '1px solid rgba(0, 0, 0, 0.12) !important',
                    borderRadius: '4px !important',
                  }}
                  color="secondary"
                  >
                  {x.attributes.value}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        >
        </Controller>
      </Box>
    </Box>
  );
}
