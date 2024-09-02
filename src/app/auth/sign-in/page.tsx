'use client';
import { Box, useMediaQuery } from '@mui/material';
import Logo from '@/components/common/Logo';
import SignInForm from '@/components/auth/signIn/SignInForm';
import Image from 'next/image';

export default function Page() {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Logo />
        <SignInForm />
      </Box>

      {isDesktop && (
        <Box sx={{ position: 'relative', flex: 1 }}>
          <Image
            src="/sneakers-signin.svg"
            alt="Sign in image"
            layout="fill"
            objectFit="cover"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      )}
    </Box>
  );
}
