'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function GoBackButton({ text }: { text: string }) {
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: 'secondary.light',
        color: 'secondary.light',
        ':hover': { borderColor: 'secondary.light' },
      }}
      onClick={() => router.back()}
    >
      {text}
    </Button>
  );
}
