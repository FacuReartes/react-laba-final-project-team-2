import { Box } from '@mui/material';
import Logo from '@/components/common/Logo';
import Image from 'next/image';
import { Suspense } from 'react';
import ResetPasswordFormContainer from '@/components/auth/resetPassword/ResetPasswordFormContainer';
import sneakersResetPassword from '@/images/sneakers-reset-password.webp';
import { Metadata } from 'next';
import Loading from '@/components/common/Loading';

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Reset password',
};

export default function Page() {
  return (
    <Suspense fallback={<Loading/>}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minWidth: '100vw',
          minHeight: '100vh',
        }}
      >
        <Logo />
        <ResetPasswordFormContainer />

        <Box
          sx={{
            width: '50%',
            height: '100vh',
            m: 0,
            p: 0,
            display: { xs: 'none', md: 'block' },
            position: 'relative',
          }}
        >
          <Image
            src={sneakersResetPassword}
            alt="Sneakers"
            fill
            objectFit="cover"
            priority
            placeholder="blur"
          />
        </Box>
      </Box>
    </Suspense>
  );
}
