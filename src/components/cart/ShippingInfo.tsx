import { ShippingFormData } from '@/lib/definitions';
import { Box, TextField, Typography } from '@mui/material';

type ShippingInfoProps = {
  shippingInfo: ShippingFormData;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingFormData>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ShippingInfo({
  shippingInfo,
  setShippingInfo,
  errorMessage,
  setErrorMessage,
}: ShippingInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));

    const updatedShippingInfo = { ...shippingInfo, [name]: value };
    if (Object.values(updatedShippingInfo).every(val => val.trim() !== '')) {
      setErrorMessage('');
    }
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
          name="zip"
          value={shippingInfo.zip}
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
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
