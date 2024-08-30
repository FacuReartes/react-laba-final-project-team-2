import SignupCard from '@/components/auth/signUp/SignupCard';
import SignupForm from '@/components/auth/signUp/SignupForm';
import Logo from '@/components/common/Logo';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function Page() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Logo />
      <SignupForm />

      <Box
        sx={{
          position: { md: 'relative' },
          display: { md: 'flex', xs: 'none' },
        }}
      >
        <Image
          src="/sneakers-signup.svg"
          alt="Sneakers"
          width={961}
          height={962}
        />
        <SignupCard />
      </Box>
    </Box>
  );
}
