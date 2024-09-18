import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

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
      return axios.delete(
        `https://shoes-shop-strapi.herokuapp.com/api/upload/files/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
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
