'use client';
import { Box } from '@mui/material';
import Logo from '@/components/common/Logo';
import ResetPasswordForm from '@/components/auth/resetPassword/ResetPasswordForm';
import Image from 'next/image';
import useCustomQuery from '@/hooks/useCustomQuery';

export default function Page() {
  const query = useCustomQuery();
  const code = query.get('code') ?? '';

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
