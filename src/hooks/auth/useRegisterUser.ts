import { SignUpFormData } from '@/lib/definitions';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { env } from '../../../env';

export const useRegisterUser = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { mutate, ...rest } = useMutation({
    mutationFn: (data: SignUpFormData) => {
      return axios.post(`${env.BASE_URL}/auth/local/register`, data);
    },
    onSuccess: () => {
      setOpenDialog(true);
      setMessage(
        'User registered successfully. Confirm your email address and then login'
      );
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        setOpenDialog(true);
        setMessage(error?.response?.data.error?.message);
        console.error(
          error?.response?.data.error?.message || 'Something went wrong'
        );
      } else {
        setOpenDialog(true);
        setMessage('Something went wrong');
        console.error(error);
      }
    },
  });

  return {
    openDialog,
    setOpenDialog,
    message,
    setMessage,
    mutate,
    ...rest,
  };
};
