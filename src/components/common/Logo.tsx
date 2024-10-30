import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const SignupLogo = () => {
  return (
    <Link href='/'>
      <Box
        sx={{
          position: 'absolute',
          left: { md: '40px', xs: '20px' },
          top: { md: '50px', xs: '18px' },
        }}
      >
        <Image src="/logo.webp" alt="logo" priority width={40} height={30} />
      </Box>
    </Link>

  );
};

export default SignupLogo;
