'use client';
import useUserQuery from '@/hooks/useUserQuery';
import { Box, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function PersonalInfo() {
  const session = useSession();
  const jwt = session.data?.user?.jwt;
  const { data: userData } = useQuery(useUserQuery(jwt));
  const { firstName, lastName, email, phoneNumber } = userData || {};

  return (
    <Box>
      <Typography mb={'32px'} variant="h3">
        Personal Info
      </Typography>
      <Box
        sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        <TextField
          variant="outlined"
          label="Name"
          defaultValue={firstName}
          sx={{ width: '388px' }}
          disabled
        />
        <TextField
          variant="outlined"
          label="Surname"
          defaultValue={lastName}
          sx={{ width: '388px' }}
          disabled
        />
        <TextField
          variant="outlined"
          label="Email"
          defaultValue={email}
          sx={{ width: '388px' }}
          disabled
        />
        <TextField
          variant="outlined"
          label="Phone number"
          defaultValue={phoneNumber}
          sx={{ width: '388px' }}
          disabled
        />
      </Box>
    </Box>
  );
}
