'use client';
import { Box, useMediaQuery } from '@mui/material';
import Logo from '@/components/Logo';
import SignInForm from '@/components/SignInForm';
import Image from 'next/image';

export default function Page() {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Logo />
      <SignInForm />

      {isDesktop && (
        <Box sx={{ position: 'relative' }}>
          <Image
            src="/sneakers-signin.svg"
            alt="Sign in image"
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '960px', height: 'auto' }}
          />
        </Box>
      )}
    </Box>
  );
}
