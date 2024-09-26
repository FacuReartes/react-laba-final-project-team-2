'use client';
import Popup from '@/components/common/Popup';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { SignUpFormData } from '@/lib/definitions';
import { useSignupForm } from '@/lib/schemas/signUpSchema';
import {
  Backdrop,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useShowPassword } from '@/hooks/useShowPassword';
import { Visibility } from '@mui/icons-material';
import Loading from '@/components/common/Loading';

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignupForm();

  const { mutate, setOpenDialog, openDialog, message, isPending } =
    useRegisterUser();

  const {
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    showPassword,
    showConfirmPassword,
  } = useShowPassword();

  const submitData = (data: SignUpFormData) => {
    mutate(data);
  };

  return (
    <>
      <Backdrop
        open={isPending}
        sx={{ zIndex: 99 }}
      >
        <Loading color='common.white' circularColor='secondary.main'/>
      </Backdrop>
      <Box
        sx={{
          width: { md: '960px', xs: '360px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { md: '208px', xs: '94px' },
          bgcolor: 'common.white',
        }}
      >
        <Typography variant={'h1'} sx={{ fontSize: { md: '45px', xs: '30px' } }}>
          Create an account
        </Typography>
        <Typography
          variant={'subtitle1'}
          sx={{ mb: '48px', pl: '20px', fontSize: { md: '15px', xs: '12px' } }}
        >
          Create an account to get an easy access to your dream shopping
        </Typography>
        <Box
          sx={{
            width: { md: '436px', xs: '320px' },
          }}
        >
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
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
              type={showPassword ? 'text' : 'password'}
              label="Password *"
              variant="outlined"
              placeholder="at least 8 characters"
              {...register('password')}
              error={Boolean(errors.password)}
              helperText={errors.password && errors.password.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password *"
              variant="outlined"
              placeholder="at least 8 characters"
              {...register('confirmPassword')}
              error={Boolean(errors.confirmPassword)}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                sx={{ color: 'common.white', width: '100%', height: '48px' }}
                disabled={isPending}
              >
                Sign Up
              </Button>
              <Typography variant="subtitle1" sx={{ color: 'common.black' }}>
                Already have an account?{' '}
                <Link
                  style={{
                    textDecoration: 'none',
                    fontWeight: '500',
                  }}
                  href="/auth/sign-in"
                >
                  <Typography
                    sx={{ color: 'secondary.light', display: 'inline' }}
                  >
                    Log in
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
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
    </>
  );
};

export default SignupForm;
