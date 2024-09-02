'use client';
import { ResetPasswordFormData } from '@/lib/definitions';
import schema from '@/lib/schemas/resetPasswordSchema';
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

const ResetPasswordForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: ResetPasswordFormData) => {
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
      <Typography variant={isDesktop ? 'h1' : 'h2'}>Reset password</Typography>
      <Typography
        variant={isDesktop ? 'subtitle1' : 'subtitle2'}
        sx={{ mb: '48px', pl: '20px' }}
      >
        Please create a new password here
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
          label="Password *"
          variant="outlined"
          placeholder="at least 8 characters"
          sx={{ height: '48px' }}
          {...register('password')}
        />
        {errors.password && (
          <Typography color="error">{errors.password.message}</Typography>
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
          <Typography color="error">
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
            Reset password
          </Button>
          <Link
            style={{
              textDecoration: 'none',
              color: '#494949',
              fontWeight: '500',
            }}
            href="/sign-in"
          >
            Back to login
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
