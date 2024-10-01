import { Box } from '@mui/material';
import Logo from '@/components/common/Logo';
import Image from 'next/image';
import sneakersResetPassword from '@/images/sneakers-reset-password.webp';
import { Metadata } from 'next';
import ResetPasswordForm from '@/components/auth/resetPassword/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Reset password',
};

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '100vw',
        minHeight: '100vh',
      }}
    >
      <Logo />
      <ResetPasswordForm />

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
  );
}
