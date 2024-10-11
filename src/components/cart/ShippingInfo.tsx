// import { useShippingForm } from '@/lib/schemas/shippingSchema';
import { Box, TextField, Typography } from '@mui/material';

export default function ShippingInfo() {
  // const {
  //   register,
  //   formState: { errors },
  // } = useShippingForm();

  return (
    <Box>
      <Typography mb={'32px'} variant="h3">
        Shipping Info
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        <TextField
          variant="outlined"
          label="Country"
          sx={{ width: '182px' }}
          required
          // {...register('country')}
        />
        <TextField
          variant="outlined"
          label="City"
          sx={{ width: '182px' }}
          required
          // {...register('city')}
        />
        <TextField
          variant="outlined"
          label="State"
          sx={{ width: '182px' }}
          required
          // {...register('state')}
        />
        <TextField
          variant="outlined"
          label="Zid Code"
          sx={{ width: '182px' }}
          required
          // {...register('zip')}
        />
        <TextField
          variant="outlined"
          label="Address"
          sx={{ width: '800px' }}
          required
          // {...register('address')}
        />
      </Box>
    </Box>
  );
}
