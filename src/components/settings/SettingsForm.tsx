'use client';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SettingsCard from './SettingsCard';
import { useForm } from 'react-hook-form';
import { SettingsFormData } from '@/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '@/lib/schemas/settingsSchema';

const SettingsForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: SettingsFormData) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        width: isDesktop ? '436px' : '360px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: isDesktop ? '52px' : '24px',
        pb: '91px',
        bgcolor: '#fff',
      }}
    >
      <Typography
        variant={isDesktop ? 'h1' : 'h2'}
        sx={{ alignSelf: 'flex-start', ml: { xs: '34px', md: '29px' } }}
      >
        My Profile
      </Typography>
      <SettingsCard />
      <Typography
        variant={isDesktop ? 'subtitle1' : 'subtitle2'}
        sx={{ mb: '48px', px: { xs: '20px', md: '0' } }}
      >
        Welcome back! Please enter your details to log into your account.
      </Typography>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: isDesktop ? '436px' : '320px',
        }}
        onSubmit={handleSubmit(submitData)}
      >
        <TextField
          type="text"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          placeholder="Jane"
          sx={{ height: '48px' }}
          {...register('name')}
        />
        {errors.name && (
          <Typography sx={{ color: 'red' }}>{errors.name.message}</Typography>
        )}
        <TextField
          type="text"
          id="outlined-basic"
          label="Surname"
          variant="outlined"
          placeholder="Meldrum"
          sx={{ height: '48px' }}
          {...register('surname')}
        />
        {errors.surname && (
          <Typography sx={{ color: 'red' }}>
            {errors.surname.message}
          </Typography>
        )}
        <TextField
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          placeholder="example@mail.com"
          sx={{ height: '48px' }}
          {...register('email')}
        />
        {errors.email && (
          <Typography sx={{ color: 'red' }}>{errors.email.message}</Typography>
        )}
        <TextField
          type="tel"
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          placeholder="(949) 354-2574"
          sx={{ height: '48px' }}
          {...register('phone')}
        />
        {errors.phone && (
          <Typography sx={{ color: 'red' }}>{errors.phone.message}</Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{
            color: '#fff',
            width: '152px',
            height: '40px',
            mt: '56px',
            alignSelf: 'flex-end',
          }}
        >
          Save changes
        </Button>
      </form>
    </Box>
  );
};

export default SettingsForm;
