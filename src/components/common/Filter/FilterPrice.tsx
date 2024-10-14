import { Box, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import FilterField from './FilterField';
import useDebounce from '@/hooks/common/useDebounce';

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
  const debouncedValue = useDebounce(value, 750);

  useEffect(() => {
    setValue(selectedPrice);
  }, [selectedPrice]);

  useEffect(() => {
    onPriceChange(debouncedValue);
  }, [debouncedValue, onPriceChange]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
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
