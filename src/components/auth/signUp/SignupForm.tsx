'use client';
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
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        width: isDesktop ? '960px' : '360px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: isDesktop ? '288px' : '94px',
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
          id="outlined-basic"
          label="Name *"
          variant="outlined"
          placeholder="Hayman Andrews"
          sx={{ height: '48px' }}
          {...register('name')}
        />
        {errors.name && (
          <Typography sx={{ color: 'red' }}>{errors.name.message}</Typography>
        )}
        <TextField
          id="outlined-basic"
          label="Email *"
          variant="outlined"
          placeholder="example@mail.com"
          sx={{ height: '48px' }}
          {...register('email')}
        />
        {errors.email && (
          <Typography sx={{ color: 'red' }}>{errors.email.message}</Typography>
        )}
        <TextField
          id="outlined-basic"
          label="Password *"
          variant="outlined"
          placeholder="at least 8 characters"
          sx={{ height: '48px' }}
          {...register('password')}
        />
        {errors.password && (
          <Typography sx={{ color: 'red' }}>
            {errors.password.message}
          </Typography>
        )}
        <TextField
          id="outlined-basic"
          label="Confirm Password *"
          variant="outlined"
          placeholder="at least 8 characters"
          sx={{ height: '48px' }}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <Typography sx={{ color: 'red' }}>
            {errors.confirmPassword.message}
          </Typography>
        )}

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
              href="/sign-in"
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default SignupForm;
