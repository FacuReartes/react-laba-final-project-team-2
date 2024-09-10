'use client';
import { Box, Container } from '@mui/material';
import Image from 'next/image';
import Logo from '@/components/common/Logo';

import ForgotPasswordForm from '@/components/auth/forgotPassword/ForgotPasswordForm';

export default function Page() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        m: 0,
        p: 0,
        minWidth: '100vw',
        minHeight: '100vh',
        position: 'relative',
      }}
      disableGutters
    >
      <Logo />
      <ForgotPasswordForm />
      <Box
        sx={{
          width: '50%',
          height: '100vh',
          p: 0,
          display: { xs: 'none', md: 'block' },
          position: 'relative',
        }}
      >
        <Image
          src="/assets/forgot-password.png"
          alt="Sneakers"
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Container>
  );
}
