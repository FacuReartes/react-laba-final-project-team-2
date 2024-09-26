'use client';
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Backdrop,
} from '@mui/material';
import Link from 'next/link';
import { useSignInForm } from '@/lib/schemas/authSchemas';
import { SignInFormInputs } from '@/lib/definitions';
import Popup from '@/components/common/Popup';
import { useSignIn } from '@/hooks/useSignIn';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useShowPassword } from '@/hooks/useShowPassword';
import Loading from '@/components/common/Loading';

const SignInForm = () => {
  const containerWidth = { md: '459px', xs: '320px' };
  const inputWidth = { md: '436px', xs: '320px' };
  const marginTop = { md: '289px', xs: '94px' };
  const marginLeft = { md: '196px', xs: '20px' };
  const marginRight = { md: '305px', xs: '20px' };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      boxSizing: 'border-box',
      width: inputWidth,
      borderRadius: { md: '8px', xs: '6px' },
      height: { md: '48px', xs: '33px' },
    },
    '& .MuiOutlinedInput-input': {
      fontSize: { md: '15px', xs: '10px' },
    },
    '& .MuiOutlinedInput-input::placeholder': {
      fontSize: { md: '15px', xs: '10px' },
    },
  };

  const formLabelStyles = {
    fontWeight: '500',
    fontSize: { md: 'inherit', xs: '12px' },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const { handleSignIn, openDialog, closeDialog, message, isLoading } =
    useSignIn();

  const { handleClickShowPassword, showPassword } = useShowPassword();

  const submitData = async (data: SignInFormInputs) => {
    await handleSignIn(data);
  };

  return (
    <>
      <Backdrop
        open={isLoading}
        sx={{ zIndex: 99 }}
      >
        <Loading color='common.white' circularColor='secondary.main'/>
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
              <InputLabel htmlFor="id-email" sx={formLabelStyles}>
                Email<span style={{ color: 'red', marginLeft: '5px' }}>*</span>
              </InputLabel>
              <TextField
                id="id-email"
                variant="outlined"
                placeholder="example@mail.com"
                sx={textFieldStyles}
                autoFocus={true}
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message as string}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { md: '8px', xs: '4px' },
              }}
            >
              <InputLabel htmlFor="id-password" sx={formLabelStyles}>
                Password<span style={{ color: 'red', marginLeft: '5px' }}>*</span>
              </InputLabel>

              <TextField
                id="id-password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                placeholder="at least 8 characters"
                sx={textFieldStyles}
                {...register('password')}
                error={Boolean(errors.password)}
                helperText={errors.password?.message as string}
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
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('rememberMe')}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: { md: '16px', xs: '12px' },
                      },
                    }}
                  />
                }
                label="Remember me"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: { md: '16px', xs: '10px' },
                    ml: '-6px',
                  },
                }}
              />
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
        <Popup
          open={openDialog}
          onClose={closeDialog}
          title={message}
          actions={
            <Button variant="contained" color={'info'} onClick={closeDialog}>
              Ok
            </Button>
          }
        ></Popup>
      </Box>
    </>
  );
};

export default SignInForm;
