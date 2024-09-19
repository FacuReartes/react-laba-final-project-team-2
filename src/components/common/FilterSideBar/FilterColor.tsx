import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';

export interface ColorType {
  name: string;
  selected: boolean;
}

interface Props {
  colors: ColorType[];
  onColorChange: (updatedColor: ColorType) => void;
}

export const FilterColor = ({ colors, onColorChange }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredColors, setFilteredColors] = useState<ColorType[]>(colors);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchQuery(term);
    setFilteredColors(
      colors.filter(color =>
        color.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleToggle = (colorName: string) => {
    const updatedColor = filteredColors.find(color => color.name === colorName);
    if (updatedColor) {
      updatedColor.selected = !updatedColor.selected;
      onColorChange(updatedColor);
    }
  };

  return (
    <Accordion
      defaultExpanded
      disableGutters
      sx={{ m: 0, p: '0 40px', boxShadow: 'none' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ m: 0, p: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
          Color
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ m: 0, p: 0, mb: '12px' }}>
        <FormGroup>
          <TextField
            placeholder="Search Colors"
            id="search-field-colors"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              input: {
                color: 'color.black',
                height: '33px',
                boxSizing: 'border-box',
                fontSize: '12px',
              },
              width: '100%',

              display: { xs: 'none', md: 'flex' },
              mt: '8px',
            }}
            InputLabelProps={{
              sx: { color: 'grey.100' },
            }}
            InputProps={{
              style: { borderRadius: '50px' },
              sx: { color: 'common.black' },
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="img" alt="search" src="/search.svg" />
                </InputAdornment>
              ),
            }}
          />
          <List
            sx={{
              height: '180px',
              overflowY: 'scroll',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              mt: '30px',
            }}
          >
            {filteredColors.map(color => (
              <ListItem
                key={'id-' + color.name}
                sx={{ height: '20px', boxSizing: 'border-box', p: 0 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={color.selected}
                      onChange={() => handleToggle(color.name)}
                      name={color.name}
                      size="small"
                    />
                  }
                  label={color.name}
                  sx={{ fontSize: '16px' }}
                />
              </ListItem>
            ))}
          </List>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
