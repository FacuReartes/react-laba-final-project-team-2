import { Box, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import FilterField from './FilterField';

interface Props {
  Min: number;
  Max: number;
  selectedPrice: number[];
  onPriceChange: (prices: number[]) => void;
}

function valuetext(value: number) {
  return `$${value}`;
}

export const FilterPrice = ({
  selectedPrice,
  Min,
  Max,
  onPriceChange,
}: Props) => {
  const [value, setValue] = useState<number[]>(selectedPrice);

  useEffect(() => {
    setValue(selectedPrice);
  }, [selectedPrice]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onPriceChange(newValue as number[]);
  };

  return (
    <FilterField fieldName="Prices">
      <Box sx={{ p: '0 14px', m: '12px 0' }}>
        <Slider
          getAriaValueText={valuetext}
          shiftStep={200}
          step={100}
          marks
          min={Min}
          max={Max}
          getAriaLabel={() => 'Price Range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </FilterField>
  );
};
