import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import Link from 'next/link';

type Props = {};

const SignupForm = (props: Props) => {
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
            id="Email"
            variant="outlined"
            placeholder="example@mail.com"
            sx={textFieldStyles}
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
            id="Password"
            variant="outlined"
            placeholder="at least 8 characters"
            sx={textFieldStyles}
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
              href="/forgot-password"
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
              href="/sign-up"
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default SignupForm;
