'use client';
import useUserQuery from '@/hooks/useUserQuery';
import { PersonalInfoData } from '@/lib/definitions';
import { validateEmail, validatePhoneNumber } from '@/lib/validateFields';
import { Box, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type PersonalInfoProps = {
  personalInfo: PersonalInfoData;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfoData>>;
  isLoggedIn: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function PersonalInfo({
  personalInfo,
  setPersonalInfo,
  isLoggedIn,
  setErrorMessage,
}: PersonalInfoProps) {
  const session = useSession();
  const jwt = session.data?.user?.jwt;
  const { data: userData } = useQuery(useUserQuery(jwt));
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

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
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));

    if (name === 'email' && !isLoggedIn) {
      setIsEmailValid(validateEmail(value));
    }

    if (name === 'phoneNumber' && !isLoggedIn) {
      setIsPhoneNumberValid(validatePhoneNumber(value));
    }

    const updatedPersonalInfo = { ...personalInfo, [name]: value };
    if (Object.values(updatedPersonalInfo).every(val => val.trim() !== '')) {
      setErrorMessage('');
    }
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
          error={!isEmailValid && !isLoggedIn}
          helperText={
            !isEmailValid && !isLoggedIn
              ? 'Please enter a valid email address'
              : ''
          }
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
          error={!isPhoneNumberValid && !isLoggedIn}
          helperText={
            !isPhoneNumberValid && !isLoggedIn
              ? 'Please enter a valid phone number: (299) 418-4677'
              : ''
          }
        />
      </Box>
    </Box>
  );
}
