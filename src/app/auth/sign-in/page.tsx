import { Box } from '@mui/material';
import Logo from '@/components/common/Logo';
import SignInForm from '@/components/auth/signIn/SignInForm';
import Image from 'next/image';
import sneakersSignin from '@/images/sneakers-signin.webp';

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: { md: '100vh' },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Logo />
        <SignInForm />
      </Box>

      <Box
        sx={{
          position: { md: 'relative' },
          display: { xl: 'flex', xs: 'none' },
          flex: 1,
        }}
      >
        <Image
          src={sneakersSignin}
          alt="Sign in image"
          width={961}
          height={962}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          priority
          placeholder="blur"
        />
      </Box>
    </Box>
  );
}
