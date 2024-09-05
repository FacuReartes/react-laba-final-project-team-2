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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const SettingsForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');
  const [avatar, setAvatar] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return axios.get('https://shoes-shop-strapi.herokuapp.com/api/users/me', {
        headers: {
          Authorization: `Bearer ${session?.user.jwt}`,
        },
      });
    },
    enabled: status === 'authenticated',
  });

  const user = userData?.data;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: SettingsFormData) => {
      return axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/users/${user?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session?.user.jwt}`,
          },
        }
      );
    },
  });

  const submitData = (data: SettingsFormData) => {
    mutate(data, {
      onSuccess: response => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        console.log('User updated successfully', response);
      },
      onError: error => {
        if (axios.isAxiosError(error)) {
          console.error(error?.response?.data || 'Something went wrong');
        } else {
          console.error('Error:', error.message || 'Something went wrong');
        }
      },
    });
  };

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
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
          variant="outlined"
          placeholder="Name"
          {...register('firstName')}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
        />
        <TextField
          variant="outlined"
          placeholder="Surname"
          {...register('lastName')}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
        />
        <TextField
          variant="outlined"
          placeholder="example@mail.com"
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          variant="outlined"
          placeholder="(949) 354-2574"
          {...register('phoneNumber')}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber?.message}
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
