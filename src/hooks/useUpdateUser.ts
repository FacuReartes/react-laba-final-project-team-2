import { SettingsFormData } from '@/lib/definitions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const useUpdateUser = (
  userId: string | undefined,
  jwt: string | undefined
) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (data: SettingsFormData) => {
      return axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/users/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setOpenDialog(true);
      setMessage('User updated successfully');
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        setOpenDialog(true);
        setMessage(
          error?.response?.data.error?.message || 'Something went wrong'
        );
      } else {
        console.error('Error:', error.message || 'Something went wrong');
      }
    },
  });

  return { mutate, openDialog, setOpenDialog, message, setMessage, ...rest };
};
