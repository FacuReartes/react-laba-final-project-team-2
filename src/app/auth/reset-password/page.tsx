import { Box } from '@mui/material';
import Logo from '@/components/common/Logo';
import Image from 'next/image';
import { Suspense } from 'react';
import ResetPasswordFormContainer from '@/components/auth/resetPassword/ResetPasswordFormContainer';

export default function Page() {
  return (
    <Suspense fallback={''}>
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
            src="/sneakers-reset-password.webp"
            alt="Sneakers"
            fill
            objectFit="cover"
            priority
          />
        </Box>
      </Box>
    </Suspense>
  );
}
