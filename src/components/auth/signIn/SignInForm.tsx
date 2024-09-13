'use client';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import { useSignInForm } from '@/lib/schemas/authSchemas';
import { SignInFormInputs } from '@/lib/definitions';
import Popup from '@/components/common/Popup';
import { useSignIn } from '@/hooks/useSignIn';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useShowPassword } from '@/hooks/useShowPassword';

const SignInForm = () => {
  const isDesktop = useMediaQuery('(min-width: 700px)');
  const containerWidth = isDesktop ? '459px' : '320px';
  const inputWidth = isDesktop ? '436px' : '320px';
  const marginTop = isDesktop ? '289px' : '94px';
  const marginLeft = isDesktop ? '196px' : '20px';
  const marginRight = isDesktop ? '305px' : '20px';

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      width: inputWidth,
      borderRadius: isDesktop ? '8px' : '6px',
      height: isDesktop ? '48px' : '33px',
    },
    '& .MuiOutlinedInput-input': {
      fontSize: isDesktop ? 'inherit' : '10px',
    },
    '& .MuiOutlinedInput-input::placeholder': {
      fontSize: isDesktop ? 'inherit' : '10px',
    },
  };

  const formLabelStyles = {
    fontWeight: '500',
    fontSize: isDesktop ? 'inherit' : '12px',
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
    <Box
      sx={{
        width: containerWidth,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        mt: marginTop,
        ml: marginLeft,
        mr: marginRight,
      }}
    >
      <Typography
        variant={isDesktop ? 'h1' : 'h2'}
        mb={isDesktop ? '14px' : '4px'}
        fontWeight={500}
      >
        Welcome back
      </Typography>
      <Typography
        variant={isDesktop ? 'subtitle1' : 'subtitle2'}
        sx={{
          mb: isDesktop ? '48px' : '24px',
          width: isDesktop ? 'auto' : '300px',
          lineHeight: isDesktop ? '17px' : '14px',
        }}
        fontWeight={300}
      >
        Welcome back! Please enter your details to log into your account.
      </Typography>

      <form
        onSubmit={handleSubmit(submitData)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: containerWidth,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: isDesktop ? '8px' : '4px',
            mb: '24px',
          }}
        >
          <label htmlFor="Email" style={formLabelStyles}>
            Email<span style={{ color: 'red', marginLeft: '5px' }}>*</span>
          </label>
          <TextField
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
            gap: isDesktop ? '8px' : '4px',
          }}
        >
          <label htmlFor="Password" style={formLabelStyles}>
            Password<span style={{ color: 'red', marginLeft: '5px' }}>*</span>
          </label>
          <TextField
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
          height={isDesktop ? '48px' : '13px'}
          mt={isDesktop ? '2px' : '13px'}
          mb={isDesktop ? '8px' : '0px'}
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
                sx={{ '& .MuiSvgIcon-root': { fontSize: isDesktop ? 16 : 12 } }}
              />
            }
            label="Remember me"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: isDesktop ? '16px' : '10px',
                ml: '-6px',
              },
            }}
          />
          <Typography variant="subtitle1">
            <Link
              style={{
                textDecoration: 'none',
                color: '#FE645E',
                fontWeight: '300',
                fontSize: isDesktop ? 'inherit' : '10px',
              }}
              href="/auth/forgot-password"
            >
              Forgot password?{' '}
            </Link>
          </Typography>
        </Box>

        <Box
          mt={isDesktop ? '32px' : '30px'}
          gap={isDesktop ? '20px' : '14px'}
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
              color: '#fff',
              width: inputWidth,
              height: isDesktop ? '48px' : '33px',
              fontSize: isDesktop ? 'inherit' : '11px',
              alignSelf: 'flex-start',
            }}
            disabled={isLoading}
          >
            Sign in
          </Button>
          <Typography
            variant="subtitle1"
            color={'#000'}
            fontWeight={500}
            fontSize={isDesktop ? '15px' : '10px'}
          >
            Don&apos;t have an account?{' '}
            <Link
              style={{
                textDecoration: 'none',
                color: '#FE645E',
                fontWeight: '600',
              }}
              href="/auth/sign-up"
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </form>
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
  );
};

export default SignInForm;
