import { Box } from '@mui/material';
import Image from 'next/image';

const SignupLogo = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: { md: '40px', xs: '20px' },
        top: { md: '50px', xs: '18px' },
      }}
    >
      <Image src="/logo.webp" alt="logo" priority width={40} height={30} />
    </Box>
  );
};

export default SignupLogo;
