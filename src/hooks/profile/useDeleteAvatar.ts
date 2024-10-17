import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { env } from '../../../env';

export const useDeleteAvatar = (
  jwt: string | undefined,
  id: number | undefined
) => {
  const [avatarData, setAvatarData] = useState<object | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => {
      return axios.delete(`${env.BASE_URL}/upload/files/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
      setAvatarData(null);
      setOpenDialog(true);
      setMessage('Avatar deleted.');
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        setOpenDialog(true);
        setMessage(
          error?.response?.data.error?.message || 'Something went wrong'
        );
      } else {
        setOpenDialog(true);
        setMessage('Something went wrong');
      }
    },
  });

  return {
    avatarData,
    mutate,
    openDialog,
    message,
    setOpenDialog,
    ...rest,
  };
};
