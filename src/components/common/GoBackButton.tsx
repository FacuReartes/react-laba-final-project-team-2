'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: 'secondary.light',
        color: 'secondary.light',
        ':hover': { borderColor: 'secondary.light' },
        flexGrow: 1,
      }}
      onClick={() => router.back()}
    >
      Go back
    </Button>
  );
}
