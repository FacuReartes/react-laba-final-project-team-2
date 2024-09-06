'use client';
import Popup from '@/components/common/Popup';
import { SignUpFormData } from '@/lib/definitions';
import schema from '@/lib/schemas/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (data: SignUpFormData) => {
      return axios.post(
        'https://shoes-shop-strapi.herokuapp.com/api/auth/local/register',
        data
      );
    },
  });

  const submitData = (data: SignUpFormData) => {
    mutate(data, {
      onSuccess: response => {
        console.log('User registered successfully', response);
        setOpenDialog(true);
        setMessage('User registered successfully');
      },
      onError: error => {
        if (axios.isAxiosError(error)) {
          setOpenDialog(true);
          setMessage(error?.response?.data.error?.message);
          console.error(
            error?.response?.data.error?.message || 'Something went wrong'
          );
        } else {
          setOpenDialog(true);
          setMessage('Something went wrong');
          console.error('Error:', error.message || 'Something went wrong');
        }
      },
    });
  };

  return (
    <Box
      sx={{
        width: isDesktop ? '960px' : '360px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: isDesktop ? '208px' : '94px',
        bgcolor: '#fff',
      }}
    >
      <Typography variant={isDesktop ? 'h1' : 'h2'}>
        Create an account
      </Typography>
      <Typography
        variant={isDesktop ? 'subtitle1' : 'subtitle2'}
        sx={{ mb: '48px', pl: '20px' }}
      >
        Create an account to get an easy access to your dream shopping
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
          label="Name *"
          variant="outlined"
          placeholder="Hayman Andrews"
          {...register('username')}
          error={Boolean(errors.username)}
          helperText={errors.username && errors.username.message}
        />
        <TextField
          label="Email *"
          variant="outlined"
          placeholder="example@mail.com"
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
        />
        <TextField
          type="password"
          label="Password *"
          variant="outlined"
          placeholder="at least 8 characters"
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
        />
        <TextField
          type="password"
          label="Confirm Password *"
          variant="outlined"
          placeholder="at least 8 characters"
          {...register('confirmPassword')}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            mt: '90px',
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ color: '#fff', width: '100%', height: '48px' }}
          >
            Sign Up
          </Button>
          <Typography variant="subtitle1" color={'#000'}>
            Already have an account?{' '}
            <Link
              style={{
                textDecoration: 'none',
                color: '#FE645E',
                fontWeight: '500',
              }}
              href="/auth/sign-in"
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </form>

      <Popup
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={message}
        actions={
          <Button
            variant="contained"
            color={'info'}
            onClick={() => {
              setOpenDialog(false);
              router.push('/auth/sign-in');
            }}
          >
            Ok
          </Button>
        }
      ></Popup>
    </Box>
  );
};

export default SignupForm;
