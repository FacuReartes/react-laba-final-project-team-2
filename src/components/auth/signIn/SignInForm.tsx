'use client';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Backdrop,
} from '@mui/material';
import Link from 'next/link';
import { useSignInForm } from '@/lib/schemas/authSchemas';
import { SignInFormInputs } from '@/lib/definitions';
import Popup from '@/components/common/Popup';
import { useSignIn } from '@/hooks/useSignIn';
import Loading from '@/components/common/Loading';
import EmailInput from '../common/EmailInput';
import PasswordInput from '../common/PasswordInput';
import RememberMeInput from '../common/RememberMeInput';

const containerWidth = { md: '459px', xs: '320px' };
const inputWidth = { md: '436px', xs: '320px' };
const marginTop = { md: '289px', xs: '94px' };
const marginLeft = { md: '196px', xs: '20px' };
const marginRight = { md: '305px', xs: '20px' };

const SignInForm = () => {
  const isMdUp = useMediaQuery('( min-width: 600px )');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const { handleSignIn, openDialog, closeDialog, message, isLoading } =
    useSignIn();

  const submitData = async (data: SignInFormInputs) => {
    await handleSignIn(data);
  };

  return (
    <>
      <Backdrop open={isLoading} sx={{ zIndex: 99 }}>
        <Loading color="common.white" circularColor="secondary.main" />
      </Backdrop>
      <Box
        sx={{
          width: containerWidth,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          mt: marginTop,
          ml: marginLeft,
          mr: marginRight,
        }}
      >
        <Typography
          variant={'h1'}
          sx={{
            fontSize: { md: '45px', xs: '30px' },
            fontWeight: 500,
            mb: { md: '14px', xs: '4px' },
          }}
        >
          Welcome back
        </Typography>
        <Typography
          variant={'subtitle1'}
          sx={{
            mb: { md: '48px', xs: '24px' },
            width: { md: 'auto', xs: '300px' },
            lineHeight: { md: '17px', xs: '14px' },
            fontSize: { md: '15px', xs: '12px' },
          }}
          fontWeight={300}
        >
          Welcome back! Please enter your details to log into your account.
        </Typography>

        <Box sx={{ width: containerWidth }}>
          <form
            onSubmit={handleSubmit(submitData)}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { md: '8px', xs: '4px' },
                mb: '24px',
              }}
            >
              <EmailInput register={register} errors={errors} />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { md: '8px', xs: '4px' },
              }}
            >
              <PasswordInput register={register} errors={errors} />
            </Box>

            <Box
              height={{ md: '48px', xs: '13px' }}
              mt={{ md: '2px', xs: '13px' }}
              mb={{ md: '8px', xs: '0px' }}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: inputWidth,
              }}
            >
              <RememberMeInput register={register} />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: '300',
                  fontSize: { md: 'inherit', xs: '10px' },
                }}
              >
                <Link
                  style={{
                    textDecoration: 'none',
                  }}
                  href="/auth/forgot-password"
                >
                  <Typography sx={{ color: 'secondary.light' }}>
                    Forgot password?{' '}
                  </Typography>
                </Link>
              </Typography>
            </Box>

            <Box
              mt={{ md: '32px', xs: '30px' }}
              gap={{ md: '20px', xs: '14px' }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{
                  color: 'common.white',
                  width: inputWidth,
                  height: { md: '48px', xs: '33px' },
                  fontSize: { md: 'inherit', xs: '11px' },
                  alignSelf: 'flex-start',
                }}
                disabled={isLoading}
              >
                Sign in
              </Button>
              <Typography
                variant="subtitle1"
                sx={{ color: 'common.black' }}
                fontWeight={500}
                fontSize={{ md: '15px', xs: '10px' }}
              >
                Don&apos;t have an account?{' '}
                <Link
                  style={{
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                  href="/auth/sign-up"
                >
                  <Typography
                    sx={{ color: 'secondary.light', display: 'inline' }}
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
      <Popup
        open={openDialog}
        onClose={closeDialog}
        title="Sign in error"
        actions={
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={closeDialog}
          >
            {message === 'Invalid identifier or password' ? 'Try again' : 'Ok'}
          </Button>
        }
      >
        <Typography variant={isMdUp ? 'h6' : 'body1'}>{message}</Typography>
      </Popup>
    </>
  );
};

export default SignInForm;
