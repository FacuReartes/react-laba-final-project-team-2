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

export interface BrandType {
  name: string;
  selected: boolean;
}

interface Props {
  brands: BrandType[];
  onBrandChange: (updatedBrand: BrandType) => void;
}

export const FilterBrand = ({ brands, onBrandChange }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredBrands, setFilteredBrands] = useState<BrandType[]>(brands);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchQuery(term);
    setFilteredBrands(
      brands.filter(brand =>
        brand.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleToggle = (brandName: string) => {
    const updatedBrand = filteredBrands.find(brand => brand.name === brandName);
    if (updatedBrand) {
      updatedBrand.selected = !updatedBrand.selected;
      onBrandChange(updatedBrand);
    }
  };

  return (
    <Accordion defaultExpanded disableGutters sx={{ m: 0, p: '0 40px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ m: 0, p: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
          Brand
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ m: 0, p: 0, mb: '12px' }}>
        <FormGroup>
          <TextField
            placeholder="Search Brands"
            id="search-field-brands"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              input: {
                color: 'common.black',
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
              sx: { color: 'grey.100' },
              style: { borderRadius: '50px' },
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
            {filteredBrands.map(brand => (
              <ListItem
                key={'id-' + brand.name}
                sx={{ height: '20px', boxSizing: 'border-box', p: 0 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={brand.selected}
                      onChange={() => handleToggle(brand.name)}
                      name={brand.name}
                      size="small"
                    />
                  }
                  label={brand.name}
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
