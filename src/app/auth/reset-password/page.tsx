import { Box } from '@mui/material';
import Logo from '@/components/common/Logo';
import ResetPasswordForm from '@/components/auth/resetPassword/ResetPasswordForm';
import Image from 'next/image';

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: { md: '100%' },
        height: { md: '100vh' },
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <Logo />
        <ResetPasswordForm />
      </Box>

      <Box
        sx={{
          position: { md: 'relative' },
          display: { md: 'flex', xs: 'none' },
          flex: 1,
        }}
      >
        <Image
          src="/sneakers-reset-password.svg"
          alt="Sneakers"
          width={961}
          height={962}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
}
