'use client';
import { Box } from '@mui/material';
import Logo from '@/components/common/Logo';
import ResetPasswordForm from '@/components/auth/resetPassword/ResetPasswordForm';
import Image from 'next/image';
import useQueryParams from '@/hooks/useQueryParams';

export default function Page() {
  const code = useQueryParams('code') || '';

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Logo />
      <ResetPasswordForm code={code} />

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
  );
}
