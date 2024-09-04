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
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const SettingsForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');
  const [avatar, setAvatar] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const user = session?.user.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
    },
  });

  const submitData = (data: SettingsFormData) => {
    const formData = {
      ...data,
      avatar,
    };
    console.log(formData);
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.firstName || '',
        surname: user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
      });
    }
  }, [user, reset, status]);

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
      <SettingsCard onAvatarChange={setAvatar} avatar={avatar} />
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
          label="Name"
          variant="outlined"
          placeholder="Jane"
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
        <TextField
          label="Surname"
          variant="outlined"
          placeholder="Meldrum"
          {...register('surname')}
          error={Boolean(errors.surname)}
          helperText={errors.surname?.message}
        />
        <TextField
          label="Email"
          variant="outlined"
          placeholder="example@mail.com"
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          label="Phone number"
          variant="outlined"
          placeholder="(949) 354-2574"
          {...register('phone')}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
        />

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
