import SignupCard from '@/components/auth/signUp/SignupCard';
import SignupForm from '@/components/auth/signUp/SignupForm';
import Logo from '@/components/common/Logo';
import { Box } from '@mui/material';
import Image from 'next/image';
import sneakerSignup from '@/images/sneakers-signup.webp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up to your account',
};

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: { md: '100vh' },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Logo />
        <SignupForm />
      </Box>

      <Box
        sx={{
          position: { md: 'relative' },
          display: { xl: 'flex', xs: 'none' },
          flex: 1,
        }}
      >
        <Image
          src={sneakerSignup}
          alt="Sneakers"
          width={961}
          height={962}
          style={{ width: '100%', objectFit: 'cover', height: '100%' }}
          priority
          placeholder="blur"
        />
        <SignupCard />
      </Box>
    </Box>
  );
}
