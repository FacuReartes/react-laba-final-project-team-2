import { Box, TextField, Typography } from '@mui/material';

type ShippingInfoProps = {
  shippingInfo: {
    country: string;
    city: string;
    state: string;
    zipCode: string;
    address: string;
  };
  setShippingInfo: React.Dispatch<
    React.SetStateAction<{
      country: string;
      city: string;
      state: string;
      zipCode: string;
      address: string;
    }>
  >;
};

export default function ShippingInfo({
  shippingInfo,
  setShippingInfo,
}: ShippingInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box>
      <Typography mt={'15px'} mb={'5px'} variant="h3">
        Shipping Info
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        <TextField
          variant="outlined"
          label="Country"
          name="country"
          value={shippingInfo.country}
          onChange={handleChange}
          sx={{ width: '182px' }}
          required
        />
        <TextField
          variant="outlined"
          label="City"
          name="city"
          value={shippingInfo.city}
          onChange={handleChange}
          sx={{ width: '182px' }}
          required
        />
        <TextField
          variant="outlined"
          label="State"
          name="state"
          value={shippingInfo.state}
          onChange={handleChange}
          sx={{ width: '182px' }}
          required
        />
        <TextField
          variant="outlined"
          label="Zip Code"
          name="zipCode"
          value={shippingInfo.zipCode}
          onChange={handleChange}
          sx={{ width: '182px' }}
          required
        />
        <TextField
          variant="outlined"
          label="Address"
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          sx={{ width: '800px' }}
          required
        />
      </Box>
    </Box>
  );
}
