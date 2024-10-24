import { Box, ToggleButton, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Props {
  title: string;
  src: string;
  value: string;
}

export default function PaymentMethodItem({ title, src, value }: Props) {
  return (
    <ToggleButton
      value={value}
      aria-label={value}
      sx={{ p: '24px', width: '170px' }}
      key={`method-${value}`}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'flex-start',
        }}
      >
        <Image src={src} width={24} height={24} alt={title} />
        <Typography sx={{ textAlign: 'start' }} variant="h4">
          {title}
        </Typography>
      </Box>
    </ToggleButton>
  );
}
