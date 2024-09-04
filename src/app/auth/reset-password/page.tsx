'use client';
import { Box } from '@mui/material';
import Logo from '@/components/common/Logo';
import Image from 'next/image';
import { Suspense } from 'react';
import ResetPasswordFormContainer from '@/components/auth/resetPassword/ResetPasswordFormContainer';

export default function Page() {
  return (
    <Suspense fallback={''}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Logo />
        <ResetPasswordFormContainer />

        <Box
          sx={{
            position: { md: 'relative' },
            display: { md: 'flex', xs: 'none' },
          }}
        >
          <Image
            src="/sneakers-reset-password.svg"
            alt="Sneakers"
            width={961}
            height={962}
          />
        </Box>
      </Box>
    </Suspense>
  );
}
