import useGetCategories from '@/hooks/products/useGetCategories';
import { Box, Typography, Select, MenuItem, FormHelperText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function ProductCategorySelect() {
  const { data: categories } = useQuery(useGetCategories());

  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Box sx={{ width: '50%' }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Categories
      </Typography>
      { Array.isArray(categories) && 
        <Controller
          name="categories"
          control={control}
          defaultValue={[categories[0]?.id]}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={'Select categories'}
              sx={{ width: '100%', fontSize: '15px' }}
              error={Boolean(errors.categories)}
              defaultValue={[categories[0]?.id]}
              multiple
              data-testid='category-select'
            >
              {categories.map(
                (category: { id: number; attributes: { name: string } }) => (
                  <MenuItem key={category.id} value={category.id} data-testid={`category-option-${category.id}`}>
                    {category.attributes.name}
                  </MenuItem>
                )
              )}
            </Select>
          )}
        />
      }
      {errors.categories && <FormHelperText error>{errors.categories.message as string}</FormHelperText>}
    </Box>
  );
}
