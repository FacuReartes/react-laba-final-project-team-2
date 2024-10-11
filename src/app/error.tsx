'use client';

import GoBackButton from '@/components/common/GoBackButton';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import SickIcon from '@mui/icons-material/Sick';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      }}
    >
      <SickIcon sx={{ fontSize: '100px', color: 'secondary.light' }} />
      <Typography variant="h2" sx={{ color: 'grey.100', textAlign: 'center' }}>
        Something went wrong!
      </Typography>
      <GoBackButton text="Try again" />
    </Box>
  );
}
