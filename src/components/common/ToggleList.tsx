import { Box, ToggleButton } from '@mui/material';
import React from 'react';
import { SizesType } from './FilterSideBar/FilterForm';

interface Props {
  array: SizesType[];
  onToggleChange: (id: number) => void;
}

export default function ToggleList({ array, onToggleChange }: Props) {
  return (
    <Box>
      {array.map((element: SizesType) => (
        <ToggleButton
          id={`id-${element.value}`}
          key={`key-${element.value}`}
          name={`toggle-button-${element.value}`}
          value={element.value}
          selected={element.selected}
          onChange={() => onToggleChange(element.id)}
          sx={{
            width: { lg: '74px', xs: '56px' },
            fontSize: { lg: '15px', xs: '10px' },
            height: { lg: '48px', xs: '34px' },
          }}
          color="secondary"
        >
          {element.value}
        </ToggleButton>
      ))}
    </Box>
  );
}
