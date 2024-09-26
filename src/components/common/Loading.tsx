import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
  size?: number;
  overlay?: boolean;
}

export default function Loading({
  message = 'Loading...',
  size = 50,
  overlay = false,
}: LoadingProps) {
  return (
    <Box
      width={overlay ? '100%' : 'auto'}
      height={overlay ? '100%' : 'auto'}
      position={overlay ? 'absolute' : 'relative'}
      top={0}
      left={0}
      zIndex={overlay ? 100 : 'auto'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={overlay ? 'rgba(255, 255, 255, 0.75)' : 'transparent'}
      my={5}
    >
      <Box textAlign="center">
        <CircularProgress size={size} />
        {message && (
          <Typography variant="subtitle3" margin={'30px'}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
