'use client';
import Popup from '@/components/common/Popup';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { SignUpFormData } from '@/lib/definitions';
import { useSignupForm } from '@/lib/schemas/signUpSchema';
import {
  Backdrop,
  Box,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/Loading';
import PasswordInput from '../common/PasswordInput';
import ConfirmPasswordInput from '../common/ConfirmPasswordInput';
import EmailInput from '../common/EmailInput';
import NameInput from '../common/NameInput';

const SignupForm = () => {
  const isMdUp = useMediaQuery('( min-width: 600px )');
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useSignupForm();

  const { mutate, setOpenDialog, openDialog, message, isPending } =
    useRegisterUser();

  const submitData = (data: SignUpFormData) => {
    mutate(data);
  };

  return (
    <>
      <Backdrop open={isPending} sx={{ zIndex: 99 }}>
        <Loading color="common.white" circularColor="secondary.main" />
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
        <Typography
          variant={'h1'}
          sx={{ fontSize: { md: '45px', xs: '30px' } }}
        >
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
            <NameInput register={register} errors={errors} />
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <ConfirmPasswordInput register={register} errors={errors} />

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
      </Box>
      <Popup
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Sign up info"
        actions={
          <>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              Try again
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDialog(false);
                router.push('/auth/sign-in');
              }}
            >
              Go to sign in
            </Button>
          </>
        }
      >
        <Typography variant={isMdUp ? 'h6' : 'body1'}>{message}</Typography>
      </Popup>
    </>
  );
};

export default SignupForm;
