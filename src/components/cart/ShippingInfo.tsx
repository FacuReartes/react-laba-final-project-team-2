import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { countries } from '@/mock/countries';
import { City, ShippingFormData, ShippingInfoProps } from '@/lib/definitions';

export default function ShippingInfo({
  shippingInfo,
  setShippingInfo,
  errorMessage,
}: ShippingInfoProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    const selectedCountry = countries.find(
      c => c.name === shippingInfo.country
    );
    if (selectedCountry) {
      setCities(selectedCountry.cities);
      setStates(selectedCountry.states);
    } else {
      setCities([]);
      setStates([]);
    }
  }, [shippingInfo.country]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const name = e.target.name as keyof ShippingFormData;
    const value = e.target.value;

    if (name === 'city') {
      const selectedCity = cities.find(city => city.name === value);
      if (selectedCity) {
        setShippingInfo(prev => ({
          ...prev,
          [name]: value,
          zip: selectedCity.zipCode,
          state: selectedCity.state,
        }));
      }
    } else if (name === 'country') {
      setShippingInfo(prev => ({
        ...prev,
        [name]: value,
        city: '',
        state: '',
        zip: '',
      }));
    } else {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Box sx={{ mt: '30px' }}>
      <Typography mt={'15px'} mb={'5px'} variant="h3">
        Shipping Info
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        <FormControl sx={{ width: { xs: '100%', md: '182px' } }}>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            label="Country"
            name="country"
            value={shippingInfo.country}
            onChange={handleChange}
            required
          >
            {countries.map(country => (
              <MenuItem key={country.name} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: { xs: '100%', md: '182px' } }}>
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            label="City"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            required
            disabled={!shippingInfo.country}
          >
            {cities.map(city => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: { xs: '100%', md: '182px' } }}>
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            label="State"
            name="state"
            value={shippingInfo.state}
            onChange={handleChange}
            required
            disabled={true}
          >
            {states.map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          label="Zip Code"
          name="zip"
          value={shippingInfo.zip}
          onChange={handleChange}
          sx={{ width: { xs: '100%', md: '182px' } }}
          required
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          variant="outlined"
          label="Address"
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          sx={{ width: '100%' }}
          required
        />
      </Box>
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
