'use client';
import useUserQuery from '@/hooks/useUserQuery';
import { Box, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

type PersonalInfoProps = {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  setPersonalInfo: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    }>
  >;
  isLoggedIn: boolean;
};

export default function PersonalInfo({
  personalInfo,
  setPersonalInfo,
  isLoggedIn,
}: PersonalInfoProps) {
  const session = useSession();
  const jwt = session.data?.user?.jwt;
  const { data: userData } = useQuery(useUserQuery(jwt));

  useEffect(() => {
    if (isLoggedIn && userData) {
      setPersonalInfo({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
      });
    }
  }, [isLoggedIn, userData, setPersonalInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box>
      <Typography mt={'15px'} mb={'5px'} variant="h3">
        Personal Info
      </Typography>
      <Box
        sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        <TextField
          variant="outlined"
          label="Name"
          name="firstName"
          value={personalInfo.firstName}
          onChange={handleChange}
          sx={{ width: '388px' }}
          disabled={isLoggedIn}
          required
        />
        <TextField
          variant="outlined"
          label="Surname"
          name="lastName"
          value={personalInfo.lastName}
          onChange={handleChange}
          sx={{ width: '388px' }}
          disabled={isLoggedIn}
          required
        />
        <TextField
          variant="outlined"
          label="Email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          sx={{ width: '388px' }}
          disabled={isLoggedIn}
          required
        />
        <TextField
          variant="outlined"
          label="Phone number"
          name="phoneNumber"
          value={personalInfo.phoneNumber}
          onChange={handleChange}
          sx={{ width: '388px' }}
          disabled={isLoggedIn}
          required
        />
      </Box>
    </Box>
  );
}
