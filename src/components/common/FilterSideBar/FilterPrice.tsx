import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slider,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

interface Props {
  Min: number;
  Max: number;
  selectedPrice: number[];
  onPriceChange: (prices: number[]) => void;
}

export interface PriceTypes {
  Min: number;
  Max: number;
}

function valuetext(value: number) {
  return `${value}°C`;
}

export const FilterPrice = ({
  selectedPrice,
  Min,
  Max,
  onPriceChange,
}: Props) => {
  const [value, setValue] = useState<number[]>(selectedPrice);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onPriceChange(newValue as number[]);
  };

  return (
    <Accordion defaultExpanded disableGutters sx={{ m: 0, p: '0 40px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ m: 0, p: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
          Price
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ m: 0, p: '0 10px', mb: '12px' }}>
        <Slider
          getAriaValueText={valuetext}
          shiftStep={300}
          step={50}
          marks
          min={Min}
          max={Max}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          sx={{ m: '12px 0' }}
        />
      </AccordionDetails>
    </Accordion>
  );
};
