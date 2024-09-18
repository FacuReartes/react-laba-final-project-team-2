import useGetSizes from '@/hooks/useGetSizes';
import { 
  Box, 
  Typography, 
  ToggleButton, 
  ToggleButtonGroup 
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { 
  Controller, 
  useFormContext 
} from 'react-hook-form';

export default function ProductSizesButtons() {

  const {  data: sizes } = useQuery(useGetSizes())

  const { control, setValue } = useFormContext()

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
              {sizes.map((size: { id: number, attributes: { value: number } }) => (
                <ToggleButton
                  key={size.id}
                  value={size.id}
                  sx={{
                    width: '100%',
                    fontSize: { sm: '15px' },
                    height: { sm: '48px' },
                    border: '1px solid rgba(0, 0, 0, 0.12) !important',
                    borderRadius: '4px !important',
                  }}
                  color="secondary"
                  >
                  {size.attributes.value}
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
